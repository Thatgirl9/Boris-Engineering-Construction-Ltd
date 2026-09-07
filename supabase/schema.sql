-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- to create the table the quote form writes to.

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  project_location text not null,
  project_type text,
  estimated_budget text,
  preferred_start_date text,
  description text,
  ip_address text,
  received_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  created_at timestamptz not null default now()
);

-- Row Level Security: locked down by default. The API route uses the
-- SERVICE ROLE key, which bypasses RLS, so this table stays private —
-- nobody can read or write to it from the browser with the public
-- (anon) key. Leave RLS enabled with no policies unless you later build
-- an authenticated internal dashboard that needs its own policy.
alter table quote_requests enable row level security;

create index if not exists quote_requests_received_at_idx on quote_requests (received_at desc);


-- --------------------------------------------------------------------
-- Storage bucket for quote form attachments (drawings, site photos, BOQ)
-- --------------------------------------------------------------------
-- Private bucket — files are never publicly listable or downloadable by
-- URL. Uploads happen via short-lived signed upload URLs minted by
-- app/api/quote/upload-url/route.ts (service-role only); the team views
-- files via the signed read links included in the notification email,
-- or by browsing Storage in the Supabase dashboard.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quote-attachments',
  'quote-attachments',
  false,
  20971520, -- 20MB, matches MAX_ATTACHMENT_BYTES in lib/supabase/storage.ts
  array['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/octet-stream']
)
on conflict (id) do nothing;

-- No storage.objects RLS policies are added on purpose: every upload is
-- authorized by a per-file signed token (bypasses RLS by design), and
-- every read is authorized by a signed read link — so the anon key
-- should never be granted direct read/write access to this bucket.

-- Consent to the Privacy Policy / Terms & Conditions, recorded per
-- submission (see app/(site)/privacy-policy and app/(site)/terms).
alter table quote_requests add column if not exists consent_given boolean not null default false;
alter table quote_requests add column if not exists consent_given_at timestamptz;
