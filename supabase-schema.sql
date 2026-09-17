-- ============================================================
-- ESQUEMA DE BASE DE DATOS PARA EVENTAZO PRO EN SUPABASE
-- ============================================================

-- 1. Crear tabla para almacenar diseños de boletos/rifas
create table if not exists public.saved_tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  ticket_config jsonb not null default '{}'::jsonb,
  print_config jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.saved_tickets enable row level security;

-- 3. Políticas de seguridad: Cada usuario solo puede ver, crear, modificar y eliminar sus propios diseños
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

-- 4. Índices para acelerar búsquedas
create index if not exists idx_saved_tickets_user_id on public.saved_tickets(user_id);
create index if not exists idx_saved_tickets_updated_at on public.saved_tickets(updated_at desc);
