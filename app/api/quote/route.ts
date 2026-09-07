import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteRequestSchema } from "@/lib/validations/quote";
import { supabaseAdmin } from "@/lib/supabase/server-client";
import { QUOTE_ATTACHMENTS_BUCKET } from "@/lib/supabase/storage";
import { isRateLimited } from "@/lib/rate-limit";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_EMAIL = process.env.QUOTE_NOTIFY_EMAIL || "info@borisengineering.com";
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || "Boris Engineering Website <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`quote:${ip}`, { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX })) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = quoteRequestSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { message: "Please correct the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything,
  // but silently drop the submission.
  if (result.data.company) {
    return NextResponse.json({ message: "Received." }, { status: 200 });
  }

  const {
    fullName,
    phone,
    email,
    projectLocation,
    projectType,
    estimatedBudget,
    preferredStartDate,
    description,
    attachments,
  } = result.data;

  const receivedAt = new Date().toISOString();

  // 1. Persist to Supabase first — this is the source of truth. If this
  //    fails we tell the user something went wrong, because the request
  //    would otherwise be lost. If it succeeds but the email below fails,
  //    the submission is still safe in the database.
  let supabaseError: unknown = null;
  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("quote_requests").insert({
      full_name: fullName,
      phone,
      email,
      project_location: projectLocation,
      project_type: projectType ?? null,
      estimated_budget: estimatedBudget || null,
      preferred_start_date: preferredStartDate || null,
      description: description || null,
      ip_address: ip,
      received_at: receivedAt,
      attachments: attachments?.length ? attachments : null,
      // Recorded for accountability — proof the person ticked the box
      // for this specific submission, at this specific time.
      consent_given: true,
      consent_given_at: receivedAt,
    });
    supabaseError = error;
  } else {
    // Not configured yet — log so nothing is silently lost during setup.
    console.warn(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — quote request was not persisted:",
      { fullName, email, receivedAt }
    );
  }

  if (supabaseError) {
    console.error("Failed to save quote request to Supabase:", supabaseError);
    return NextResponse.json(
      { message: "We couldn't save your request right now. Please try again shortly." },
      { status: 502 }
    );
  }

  // 2. Notify the team by email. This is best-effort: if Resend isn't
  //    configured or the send fails, we still return success to the user
  //    because their request is already safely stored in Supabase.
  if (resend) {
    try {
      // Attachments live in a private bucket, so mint short-lived signed
      // read links (7 days) rather than requiring the team to log into
      // the Supabase dashboard just to view a submitted drawing/photo.
      let attachmentLines: string[] = [];
      if (attachments?.length && supabaseAdmin) {
        const admin = supabaseAdmin;
        const signed = await Promise.all(
          attachments.map(async (a) => {
            const { data, error } = await admin.storage
              .from(QUOTE_ATTACHMENTS_BUCKET)
              .createSignedUrl(a.path, 60 * 60 * 24 * 7);
            return error || !data ? `${a.name} (link unavailable)` : `${a.name}: ${data.signedUrl}`;
          })
        );
        attachmentLines = ["", "Attachments (links expire in 7 days):", ...signed];
      } else if (attachments?.length) {
        attachmentLines = ["", `Attachments: ${attachments.map((a) => a.name).join(", ")}`];
      }

      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: `New quote request — ${fullName} (${projectType ?? "General"})`,
        text: [
          `New quote request received ${receivedAt}`,
          "",
          `Name: ${fullName}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Location: ${projectLocation}`,
          `Project type: ${projectType ?? "Not specified"}`,
          `Estimated budget: ${estimatedBudget || "Not specified"}`,
          `Preferred start date: ${preferredStartDate || "Not specified"}`,
          "",
          "Description:",
          description || "(none provided)",
          ...attachmentLines,
        ].join("\n"),
      });
    } catch (err) {
      // Don't fail the whole request just because the email didn't send —
      // the submission is already safe in Supabase.
      console.error("Quote request saved, but the notification email failed to send:", err);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping notification email.");
  }

  return NextResponse.json(
    { message: "Quote request received. We'll be in touch shortly." },
    { status: 200 }
  );
}