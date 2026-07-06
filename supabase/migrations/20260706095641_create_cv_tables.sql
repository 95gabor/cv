-- CV content schema (editor-first hybrid)

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.site_config (
  id text primary key default 'default',
  url text not null,
  title text not null,
  description text not null,
  keywords text[] not null default '{}',
  favicon_path text
);

create table public.cv_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_hu text not null,
  title_en text not null,
  title_hu text not null,
  picture_path text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.personal_links (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  platform text not null,
  url text not null,
  icon_dark_path text not null,
  icon_light_path text not null
);

create table public.personal_contacts (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  type text not null check (type in ('location', 'phone', 'email', 'link')),
  value text not null
);

create table public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  title_en text not null,
  title_hu text not null,
  company_name text not null,
  company_link text,
  location text not null,
  from_year int not null,
  from_month int check (from_month between 1 and 12),
  end_year int,
  end_month int check (end_month between 1 and 12),
  employment_type text,
  description_en text not null,
  description_hu text not null
);

create table public.work_experience_technologies (
  id uuid primary key default gen_random_uuid(),
  work_experience_id uuid not null references public.work_experiences (id) on delete cascade,
  sort_order int not null,
  name text not null,
  link text
);

create table public.educations (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  degree_en text not null,
  degree_hu text not null,
  institution_name_en text not null,
  institution_name_hu text not null,
  institution_link text,
  location text not null,
  from_year int not null,
  from_month int check (from_month between 1 and 12),
  end_year int,
  end_month int check (end_month between 1 and 12),
  note_en text,
  note_hu text
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  name text not null,
  link text
);

create table public.hobbies (
  id uuid primary key default gen_random_uuid(),
  cv_profile_id uuid not null references public.cv_profiles (id) on delete cascade,
  sort_order int not null,
  name_en text not null,
  name_hu text not null,
  link text
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index personal_links_cv_profile_id_idx on public.personal_links (cv_profile_id);
create index personal_contacts_cv_profile_id_idx on public.personal_contacts (cv_profile_id);
create index work_experiences_cv_profile_id_idx on public.work_experiences (cv_profile_id);
create index work_experience_technologies_work_experience_id_idx
  on public.work_experience_technologies (work_experience_id);
create index educations_cv_profile_id_idx on public.educations (cv_profile_id);
create index skills_cv_profile_id_idx on public.skills (cv_profile_id);
create index hobbies_cv_profile_id_idx on public.hobbies (cv_profile_id);

-- ---------------------------------------------------------------------------
-- updated_at bump triggers (webhook source: cv_profiles.updated_at)
-- ---------------------------------------------------------------------------

create or replace function public.bump_cv_profile_updated_at()
returns trigger
language plpgsql
as $$
begin
  update public.cv_profiles
  set updated_at = now()
  where id = coalesce(new.cv_profile_id, old.cv_profile_id);
  return coalesce(new, old);
end;
$$;

create or replace function public.bump_cv_profile_from_technology()
returns trigger
language plpgsql
as $$
declare
  profile_id uuid;
begin
  select we.cv_profile_id
  into profile_id
  from public.work_experiences we
  where we.id = coalesce(new.work_experience_id, old.work_experience_id);

  if profile_id is not null then
    update public.cv_profiles
    set updated_at = now()
    where id = profile_id;
  end if;

  return coalesce(new, old);
end;
$$;

create trigger personal_links_bump_cv_profile
after insert or update or delete on public.personal_links
for each row execute function public.bump_cv_profile_updated_at();

create trigger personal_contacts_bump_cv_profile
after insert or update or delete on public.personal_contacts
for each row execute function public.bump_cv_profile_updated_at();

create trigger work_experiences_bump_cv_profile
after insert or update or delete on public.work_experiences
for each row execute function public.bump_cv_profile_updated_at();

create trigger educations_bump_cv_profile
after insert or update or delete on public.educations
for each row execute function public.bump_cv_profile_updated_at();

create trigger skills_bump_cv_profile
after insert or update or delete on public.skills
for each row execute function public.bump_cv_profile_updated_at();

create trigger hobbies_bump_cv_profile
after insert or update or delete on public.hobbies
for each row execute function public.bump_cv_profile_updated_at();

create trigger work_experience_technologies_bump_cv_profile
after insert or update or delete on public.work_experience_technologies
for each row execute function public.bump_cv_profile_from_technology();

-- ---------------------------------------------------------------------------
-- Row level security (public read for static build via anon key)
-- ---------------------------------------------------------------------------

alter table public.site_config enable row level security;
alter table public.cv_profiles enable row level security;
alter table public.personal_links enable row level security;
alter table public.personal_contacts enable row level security;
alter table public.work_experiences enable row level security;
alter table public.work_experience_technologies enable row level security;
alter table public.educations enable row level security;
alter table public.skills enable row level security;
alter table public.hobbies enable row level security;

create policy "Public read site_config"
  on public.site_config for select
  to anon, authenticated
  using (true);

create policy "Public read active cv_profiles"
  on public.cv_profiles for select
  to anon, authenticated
  using (is_active = true);

create policy "Public read personal_links"
  on public.personal_links for select
  to anon, authenticated
  using (true);

create policy "Public read personal_contacts"
  on public.personal_contacts for select
  to anon, authenticated
  using (true);

create policy "Public read work_experiences"
  on public.work_experiences for select
  to anon, authenticated
  using (true);

create policy "Public read work_experience_technologies"
  on public.work_experience_technologies for select
  to anon, authenticated
  using (true);

create policy "Public read educations"
  on public.educations for select
  to anon, authenticated
  using (true);

create policy "Public read skills"
  on public.skills for select
  to anon, authenticated
  using (true);

create policy "Public read hobbies"
  on public.hobbies for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Grants (anon read for static build)
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;
grant select on all tables in schema public to anon, authenticated;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;


insert into storage.buckets (id, name, public)
values ('cv-assets', 'cv-assets', true)
on conflict (id) do nothing;

create policy "Public read cv-assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cv-assets');
