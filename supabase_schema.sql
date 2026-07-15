-- Bulk Contract Tracking System — Supabase schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → paste all → Run

create extension if not exists "pgcrypto";

-- ===================== Tables =====================

create table contracts (
  id uuid primary key default gen_random_uuid(),
  contract_no text unique not null,
  contract_amount numeric default 0,
  area text,
  start_date date,
  end_date date,
  guarantee_type text,
  guarantee_amount numeric default 0,
  guarantee_start_date date,
  guarantee_end_date date,
  company text,
  branch text,
  date_update date,
  created_at timestamptz default now()
);

create table purchase_orders (
  id uuid primary key default gen_random_uuid(),
  contract_no text not null references contracts(contract_no) on update cascade,
  display_name text,
  po_number text,
  po_amount numeric default 0,
  po_date date,
  saidi text,
  pmt text,
  project_secretary text,
  remark text,
  pic text,
  date_update date,
  status text default 'active',
  created_at timestamptz default now()
);

create table work_done (
  id uuid primary key default gen_random_uuid(),
  po_id uuid references purchase_orders(id) on delete cascade,
  contract_no text,
  display_name text,
  pmt text,
  po_number text,
  period text,
  target numeric default 0,
  actual numeric default 0,
  remark text,
  date_update date,
  created_at timestamptz default now()
);

create table permits (
  id uuid primary key default gen_random_uuid(),
  contract_no text references contracts(contract_no) on update cascade,
  company text,
  branch text,
  area text,
  display_name text,
  project_type text,
  code text,
  submission_ref_no text,
  owner text,
  status_permit text default 'pending',
  target_to_start_work date,
  permit_start date,
  permit_end date,
  pic text,
  action_remark text,
  date_update date,
  created_at timestamptz default now()
);

create table collection_targets (
  id uuid primary key default gen_random_uuid(),
  branch text unique not null,
  target_amount numeric default 0,
  total_invoice numeric default 0,
  date_update date,
  created_at timestamptz default now()
);

create table collection_summary (
  id int primary key default 1,
  od_utilization numeric default 0,
  creditors_outstanding numeric default 0,
  as_of_date date,
  constraint singleton check (id = 1)
);
insert into collection_summary (id) values (1);

-- ===================== Row Level Security =====================
-- Only logged-in users (via Supabase Auth) can read/write. No public/anonymous access.

alter table contracts enable row level security;
alter table purchase_orders enable row level security;
alter table work_done enable row level security;
alter table permits enable row level security;
alter table collection_targets enable row level security;
alter table collection_summary enable row level security;

create policy "authenticated full access" on contracts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on purchase_orders
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on work_done
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on permits
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on collection_targets
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on collection_summary
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
