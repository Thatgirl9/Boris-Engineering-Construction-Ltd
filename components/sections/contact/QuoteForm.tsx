"use client";

import { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Loader2, Paperclip, X, FileText } from "lucide-react";
import { PROJECT_TYPES } from "@/lib/validations/quote";
import { supabaseBrowser, isSupabaseStorageConfigured } from "@/lib/supabase/browser-client";
import {
  MAX_ATTACHMENT_BYTES,
  ALLOWED_ATTACHMENT_EXTENSIONS,
  QUOTE_ATTACHMENTS_BUCKET,
} from "@/lib/supabase/storage";

type Status = "idle" | "uploading" | "submitting" | "success" | "error";

interface AttachmentMeta {
  name: string;
  path: string;
  size: number;
  type: string;
};

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-primary-text placeholder:text-secondary-text/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

const labelClasses = "text-sm font-semibold font-ibm text-primary-text";
const MAX_FILES = 5;
const REQUIRED_FIELDS = ["fullName", "phone", "email", "projectLocation"] as const;


function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
};


export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(files, "FILES");
  }, [files])

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFileError(null);

    const nextFiles = [...selected, ...files];

    if (nextFiles.length > MAX_FILES) {
      setFileError(`Please attach up to ${MAX_FILES} files.`);
      e.target.value = "";
      return;
    }
    for (const file of selected) {
      if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(getExtension(file.name))) {
        setFileError(`"${file.name}" isn't a supported file type (PDF, JPG, PNG, DWG only).`);
        e.target.value = "";
        return;
      }
      if (file.size > MAX_ATTACHMENT_BYTES) {
        setFileError(`"${file.name}" is over the 20MB limit.`);
        e.target.value = "";
        return;
      }
    }

    setFiles(nextFiles);
  };

  function clearFiles() {
    setFiles([]);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function getRequiredFieldErrors(formData: FormData) {
    const missingFields = REQUIRED_FIELDS.filter((field) => {
      const value = formData.get(field);
      return typeof value !== "string" || !value.trim();
    });

    if (!missingFields.length) return null;

    return {
      message: "Fill all the fields marked with * to continue.",
      fieldErrors: Object.fromEntries(missingFields.map((field) => [field, "This field is required."])),
    };
  }


  async function uploadAttachments(): Promise<AttachmentMeta[]> {
    if (!files.length) return [];

    if (!isSupabaseStorageConfigured || !supabaseBrowser) {
      throw new Error(
        "File uploads aren't set up yet on this site. Please submit without attachments, or reach out directly."
      );
    }

    const uploaded: AttachmentMeta[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Uploading attachment ${i + 1} of ${files.length}…`);

      const urlRes = await fetch("/api/quote/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, size: file.size }),
      });
      const urlData = await urlRes.json();
      if (!urlRes.ok) {
        throw new Error(urlData?.message ?? `Couldn't upload "${file.name}".`);
      }

      const { path, token } = urlData as { path: string; token: string };

      const { error: uploadError } = await supabaseBrowser.storage
        .from(QUOTE_ATTACHMENTS_BUCKET)
        .uploadToSignedUrl(path, token, file);

      if (uploadError) {
        throw new Error(`"${file.name}" failed to upload. Please try again.`);
      }

      uploaded.push({ name: file.name, path, size: file.size, type: file.type });
    };




    return uploaded;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError(null);
    setUploadProgress(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const requiredFieldErrors = getRequiredFieldErrors(formData);
    if (requiredFieldErrors) {
      setErrors(requiredFieldErrors.fieldErrors);
      setServerError(requiredFieldErrors.message);
      return;
    }

    if (!consentChecked) {
      setErrors((prev) => ({
        ...prev,
        consent: "You must agree to the Privacy Policy and Terms & Conditions to continue.",
      }));
      return;
    }



    setStatus(files.length ? "uploading" : "submitting");

    try {
      const attachments = await uploadAttachments();
      setStatus("submitting");
      setUploadProgress(null);

      const formData = new FormData(form);
      const payload: Record<string, unknown> = Object.fromEntries(
        Array.from(formData.entries()).filter(([, value]) => typeof value === "string")
      );
      if (attachments.length) payload.attachments = attachments;
      payload.consent = consentChecked;
      // payload.consentGivenAt = new Date();
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setServerError(data?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      clearFiles();
      setConsentChecked(false);
      // e.currentTarget.reset();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "We couldn't reach the server. Check your connection and try again."
      );
      setStatus("error");
      setUploadProgress(null);
    }
  };

  const isBusy = status === "uploading" || status === "submitting";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" strokeWidth={1.75} />
        <h2 className="mt-4 text-lg font-bold text-primary-text">Quote request received</h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary-text">
          Thank you for reaching out. Our team will review your project details and respond with
          a transparent quotation, usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-primary-text hover:bg-bg-sec"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-2xl sm:p-8">
      <h2 className="text-lg font-semibold text-primary-text font-archivo">Request a Quote Form</h2>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Honeypot — visually hidden, real users never fill this in */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {serverError ? (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span>{serverError}</span>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClasses}>
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Your full name"
              className={`mt-2 ${inputClasses}`}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName ? <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="080..."
              className={`mt-2 ${inputClasses}`}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className={`mt-2 ${inputClasses}`}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="mt-1.5 text-xs text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="projectLocation" className={labelClasses}>
              Project Location *
            </label>
            <input
              id="projectLocation"
              name="projectLocation"
              type="text"
              required
              placeholder="City / State"
              className={`mt-2 ${inputClasses}`}
              aria-invalid={Boolean(errors.projectLocation)}
            />
            {errors.projectLocation ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.projectLocation}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="projectType" className={labelClasses}>
              Project Type
            </label>
            <select id="projectType" name="projectType" className={`mt-2 ${inputClasses}`} defaultValue="">
              <option value="" disabled>
                Select a project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="estimatedBudget" className={labelClasses}>
              Estimated Budget (optional)
            </label>
            <input
              id="estimatedBudget"
              name="estimatedBudget"
              type="text"
              placeholder="₦"
              className={`mt-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor="preferredStartDate" className={labelClasses}>
              Preferred Start Date (optional)
            </label>
            <input
              id="preferredStartDate"
              name="preferredStartDate"
              type="date"
              className={`mt-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor="attachments" className={labelClasses}>
              Drawings / Site Photos / BOQ (optional)
            </label>
            <div className="relative mt-2">
              <Paperclip
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                strokeWidth={1.75}
              />
              <input
                ref={fileInputRef}
                id="attachments"
                name="attachments"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                onChange={handleFileChange}
                disabled={isBusy}
                aria-invalid={Boolean(fileError)}
                aria-describedby="attachments-help"
                className={`${inputClasses} pl-10 file:mr-3 file:rounded-md file:border-0 file:bg-bg-sec file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-text`}
              />
            </div>
            <p className="mt-1.5 text-xs text-secondary-text">
              Optional: .pdf, .jpg, .png, .dwg — up to 20MB each,
              {MAX_FILES} files max
            </p>
            {fileError ? <p className="mt-1.5 text-xs text-red-600">{fileError}</p> : null}

            {files.length ? (
              <ul className="mt-3 space-y-2">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between gap-2 rounded-md bg-bg-sec/60 px-3 py-2 text-xs text-primary-text"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FileText className="h-3.5 w-3.5 shrink-0 text-secondary-text" strokeWidth={1.75} />
                      <span className="truncate">{file.name}</span>
                      <span className="shrink-0 text-secondary-text">{formatBytes(file.size)}</span>
                    </span>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={clearFiles}
                    disabled={isBusy}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary-text hover:text-primary-text disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Clear attachments
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClasses}>
            Description of Project
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe the scope, size, and any specific requirements."
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              checked={consentChecked}
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                if (e.target.checked) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.consent;
                    return next;
                  });
                }
              }}
              aria-invalid={Boolean(errors.consent)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-secondary focus:ring-2 focus:ring-secondary/30"
            />
            <span className="text-sm leading-relaxed text-secondary-text">
              I agree to the{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-text underline underline-offset-2 hover:text-secondary"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-text underline underline-offset-2 hover:text-secondary"
              >
                Terms &amp; Conditions
              </a>
              , and consent to Boris Engineering &amp; Construction Ltd storing and using the
              information above to respond to my request. *
            </span>
          </label>
          {errors.consent ? <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary/90 disabled:opacity-70 font-ibm"
        >
          {isBusy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              {status === "uploading" ? uploadProgress ?? "Uploading…" : "Submitting..."}
            </>
          ) : (
            "Submit Quote Request"
          )}
        </button>
      </form>
    </div>
  );
}
