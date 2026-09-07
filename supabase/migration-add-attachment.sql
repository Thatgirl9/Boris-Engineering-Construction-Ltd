-- Run this if you already ran schema.sql before file attachments were
-- added — it only adds what's new (safe to run even if some parts
-- already exist, thanks to IF NOT EXISTS / ON CONFLICT).

alter table quote_requests add column if not exists attachments jsonb;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quote-attachments',
  'quote-attachments',
  false,
  20971520,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/octet-stream']
)
on conflict (id) do nothing;