// Shared between the upload-url route (creates signed upload URLs) and
// the quote route (creates signed *read* URLs for the notification
// email) so the bucket name only needs to change in one place.
export const QUOTE_ATTACHMENTS_BUCKET = "quote-attachments";
export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024; // 20MB, matches the form copy
export const ALLOWED_ATTACHMENT_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "dwg"];