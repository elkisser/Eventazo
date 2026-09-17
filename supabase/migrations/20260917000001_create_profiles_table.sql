-- ============================================================
-- MIGRACIÓN 2: TABLA DE PERFILES DE USUARIO PARA VENTAS SAAS
-- ============================================================

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text default 'user' check (role in ('user', 'admin')),
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  is_pro boolean default false,
  subscription_status text default 'none',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

drop policy if exists "Los perfiles son visibles por su dueño" on public.profiles;
create policy "Los perfiles son visibles por su dueño"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Los usuarios pueden actualizar su propio perfil" on public.profiles;
create policy "Los usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, plan, is_pro)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'free',
    false
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, email, full_name, plan, is_pro)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  'free',
  false
from auth.users
on conflict (id) do nothing;

create index if not exists idx_profiles_email on public.profiles(email);
