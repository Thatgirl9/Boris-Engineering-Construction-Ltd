import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server-client";
import { isRateLimited } from "@/lib/rate-limit";
import {
  QUOTE_ATTACHMENTS_BUCKET,
  MAX_ATTACHMENT_BYTES,
  ALLOWED_ATTACHMENT_EXTENSIONS,
} from "@/lib/supabase/storage";

const requestSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  size: z.number().positive().max(MAX_ATTACHMENT_BYTES),
});

function sanitizeExtension(fileName: string): string | null {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_ATTACHMENT_EXTENSIONS.includes(ext)) return null;
  return ext;
}

/**
 * Mints a short-lived signed upload URL/token for one file. The browser
 * then uploads directly to Supabase Storage with that token — the file
 * bytes never pass through this server, so there's no serverless
 * body-size limit to worry about for the 20MB attachments the form
 * allows.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`quote-upload:${ip}`, { windowMs: 10 * 60 * 1000, max: 30 })) {
    return NextResponse.json(
      { message: "Too many upload requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        message:
          "File uploads aren't configured yet. You can still submit the form without attachments.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = requestSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Invalid file." },
      { status: 422 }
    );
  }

  const ext = sanitizeExtension(result.data.fileName);
  if (!ext) {
    return NextResponse.json(
      { message: "Unsupported file type. Allowed: PDF, JPG, PNG, DWG." },
      { status: 422 }
    );
  }

  // Server-generated path (never trust a client-supplied path) — grouped
  // by date so files are easy to browse in the Supabase dashboard.
  const today = new Date().toISOString().slice(0, 10);
  const path = `quote/${today}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabaseAdmin.storage
    .from(QUOTE_ATTACHMENTS_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("Failed to create signed upload URL:", error);
    return NextResponse.json(
      { message: "Couldn't prepare the file upload. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    path: data.path,
    token: data.token,
    originalName: result.data.fileName,
  });
}
