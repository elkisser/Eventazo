-- ============================================================
-- ESQUEMA DE BASE DE DATOS PARA EVENTAZO PRO EN SUPABASE
-- ============================================================

-- 1. Tabla de Perfiles de Usuario (Para gestión comercial, clientes y ventas SaaS)
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

-- Habilitar Row Level Security (RLS) en profiles
alter table public.profiles enable row level security;

drop policy if exists "Los perfiles son visibles por su dueño" on public.profiles;
create policy "Los perfiles son visibles por su dueño"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Los usuarios pueden actualizar su propio perfil" on public.profiles;
create policy "Los usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger automático para crear perfil comercial cuando se registra un usuario en Supabase Auth
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

-- Backfill automático para sincronizar usuarios que ya se hayan registrado (ej: andreaarceguet@gmail.com)
insert into public.profiles (id, email, full_name, plan, is_pro)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  'free',
  false
from auth.users
on conflict (id) do nothing;

-- 2. Crear tabla para almacenar diseños de boletos/rifas
create table if not exists public.saved_tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  ticket_config jsonb not null default '{}'::jsonb,
  print_config jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS) en saved_tickets
alter table public.saved_tickets enable row level security;

drop policy if exists "Los usuarios pueden ver sus propios boletos" on public.saved_tickets;
create policy "Los usuarios pueden ver sus propios boletos"
  on public.saved_tickets for select
  using (auth.uid() = user_id);

drop policy if exists "Los usuarios pueden insertar sus propios boletos" on public.saved_tickets;
create policy "Los usuarios pueden insertar sus propios boletos"
  on public.saved_tickets for insert
  with check (auth.uid() = user_id);

drop policy if exists "Los usuarios pueden actualizar sus propios boletos" on public.saved_tickets;
create policy "Los usuarios pueden actualizar sus propios boletos"
  on public.saved_tickets for update
  using (auth.uid() = user_id);

drop policy if exists "Los usuarios pueden eliminar sus propios boletos" on public.saved_tickets;
create policy "Los usuarios pueden eliminar sus propios boletos"
  on public.saved_tickets for delete
  using (auth.uid() = user_id);

-- 3. Índices para acelerar búsquedas
create index if not exists idx_saved_tickets_user_id on public.saved_tickets(user_id);
create index if not exists idx_saved_tickets_updated_at on public.saved_tickets(updated_at desc);
create index if not exists idx_profiles_email on public.profiles(email);

-- ================================================================
-- 4. Confirmación automática de emails (Desarrollo y SaaS sin SMTP)
-- ================================================================

-- Confirmar inmediatamente andreaarceguet@gmail.com
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
    confirmed_at = COALESCE(confirmed_at, NOW()),
    last_sign_in_at = NOW()
WHERE email = 'andreaarceguet@gmail.com';

-- Confirmar cualquier usuario pendiente
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
    confirmed_at = COALESCE(confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- Función RPC para confirmar email desde el frontend
CREATE OR REPLACE FUNCTION public.confirm_user(email_to_confirm text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = NOW(),
      confirmed_at = NOW()
  WHERE email = LOWER(TRIM(email_to_confirm));
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.confirm_user(text) TO anon, authenticated;

-- Trigger para auto-confirmar emails en futuros registros
CREATE OR REPLACE FUNCTION public.handle_auto_confirm_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, NOW());
  NEW.confirmed_at = COALESCE(NEW.confirmed_at, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_auto_confirm ON auth.users;
CREATE TRIGGER on_auth_user_auto_confirm
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auto_confirm_email();

