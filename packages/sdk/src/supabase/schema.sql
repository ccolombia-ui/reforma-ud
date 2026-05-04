-- ============================================================
-- Schema: aleia_multi_tenant
-- Propósito: backend agnóstico para gestión documental +
--            gamificación de comunidades multi-tenant.
-- Requisito: ejecutar en un proyecto Supabase con Auth habilitado.
-- ============================================================

-- ------------------------------------------------------------
-- 1. TENANTS
-- ------------------------------------------------------------
create table if not exists public.tenants (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  config        jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

comment on table public.tenants is 'Comunidades/proyectos aislados (multi-tenancy)';

-- ------------------------------------------------------------
-- 2. PROFILES (por tenant)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  display_name  text,
  avatar_url    text,
  role          text default 'member',
  metadata      jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique (tenant_id, user_id)
);

comment on table public.profiles is 'Perfil de un usuario dentro de un tenant';

-- ------------------------------------------------------------
-- 3. GAMIFICATION CONFIG (por tenant)
-- ------------------------------------------------------------
create table if not exists public.gamification_configs (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  config        jsonb not null default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique (tenant_id)
);

comment on table public.gamification_configs is 'Configuración de XP, niveles y badges por comunidad';

-- Ejemplo de config JSONB:
-- {
--   "enabled": true,
--   "xpPerAction": { "sectionRead": 10, "paperCompleted": 100, "comprehensionVerified": 50, "firstLogin": 25 },
--   "levels": [
--     { "name": "Novato", "minXp": 0, "icon": "🌱" },
--     { "name": "Aprendiz", "minXp": 200, "icon": "🌿" }
--   ],
--   "badges": [
--     { "id": "primer-paso", "name": "Primer Paso", "icon": "👣", "condition": "sectionsRead >= 1" }
--   ]
-- }

-- ------------------------------------------------------------
-- 4. DOCUMENTS (gestión documental)
-- ------------------------------------------------------------
create table if not exists public.documents (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  slug          text not null,
  title         text not null,
  content       text,
  source_url    text,
  metadata      jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique (tenant_id, slug)
);

comment on table public.documents is 'Documentos Markdown gestionados por tenant';

-- ------------------------------------------------------------
-- 5. USER PROGRESS (lectura por documento)
-- ------------------------------------------------------------
create table if not exists public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  document_slug text not null,
  section_id    text not null,
  status        text not null default 'pending', -- pending | completed | verified
  xp_earned     int  not null default 0,
  completed_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique (tenant_id, user_id, document_slug, section_id)
);

comment on table public.user_progress is 'Progreso de lectura sección por sección';

-- ------------------------------------------------------------
-- 6. USER XP (snapshot acumulado)
-- ------------------------------------------------------------
create table if not exists public.user_xp (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  total_xp      int not null default 0,
  sections_read int not null default 0,
  missions_completed int not null default 0,
  questions_verified int not null default 0,
  updated_at    timestamptz default now(),
  unique (tenant_id, user_id)
);

comment on table public.user_xp is 'XP y estadísticas agregadas por usuario/tenant';

-- ------------------------------------------------------------
-- 7. BADGE EARNINGS
-- ------------------------------------------------------------
create table if not exists public.badge_earnings (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  badge_id      text not null,
  earned_at     timestamptz default now(),
  unique (tenant_id, user_id, badge_id)
);

comment on table public.badge_earnings is 'Relación de badges ganados por usuario';

-- ------------------------------------------------------------
-- 8. LEADERBOARD ENTRIES (materializado)
-- ------------------------------------------------------------
create table if not exists public.leaderboard_entries (
  id            uuid primary key default gen_random_uuid(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  total_xp      int not null default 0,
  rank          int,
  period        text not null default 'alltime', -- daily | weekly | monthly | alltime
  updated_at    timestamptz default now(),
  unique (tenant_id, user_id, period)
);

comment on table public.leaderboard_entries is 'Tabla de clasificación por periodo';

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.gamification_configs enable row level security;
alter table public.documents enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_xp enable row level security;
alter table public.badge_earnings enable row level security;
alter table public.leaderboard_entries enable row level security;

-- Función auxiliar: extraer tenant_id del JWT claim 'tenant_id'
create or replace function public.get_tenant_id()
returns uuid as $$
  select nullif(current_setting('request.jwt.claims', true)::jsonb->>'tenant_id', '')::uuid;
$$ language sql stable;

-- Función auxiliar: extraer user_id del JWT
-- (supabase auth usa auth.uid() en RLS, pero la dejamos documentada)

-- Policies TENANTS: lectura pública (cualquiera puede listar tenants para login/select)
create policy "tenants_select_public"
  on public.tenants for select
  using (true);

-- Policies PROFILES: un usuario solo ve/edita su propio perfil dentro del tenant
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Policies GAMIFICATION CONFIGS: lectura pública por tenant
create policy "gamification_select_public"
  on public.gamification_configs for select
  using (true);

-- Policies DOCUMENTS: lectura pública por tenant (gestión documental abierta)
create policy "documents_select_public"
  on public.documents for select
  using (true);

create policy "documents_insert_admin"
  on public.documents for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.user_id = auth.uid()
        and profiles.tenant_id = documents.tenant_id
        and profiles.role = 'admin'
    )
  );

-- Policies USER PROGRESS: CRUD propio
create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Policies USER XP: lectura propia + leaderboard (lectura pública de otros en mismo tenant)
create policy "user_xp_select_own"
  on public.user_xp for select
  using (auth.uid() = user_id);

create policy "user_xp_insert_own"
  on public.user_xp for insert
  with check (auth.uid() = user_id);

create policy "user_xp_update_own"
  on public.user_xp for update
  using (auth.uid() = user_id);

-- Policies BADGE EARNINGS: lectura propia
create policy "badge_earnings_select_own"
  on public.badge_earnings for select
  using (auth.uid() = user_id);

create policy "badge_earnings_insert_own"
  on public.badge_earnings for insert
  with check (auth.uid() = user_id);

-- Policies LEADERBOARD: lectura pública (para mostrar rankings)
create policy "leaderboard_select_public"
  on public.leaderboard_entries for select
  using (true);

create policy "leaderboard_insert_own"
  on public.leaderboard_entries for insert
  with check (auth.uid() = user_id);

create policy "leaderboard_update_own"
  on public.leaderboard_entries for update
  using (auth.uid() = user_id);

-- ============================================================
-- ÍNDICES
-- ============================================================
create index if not exists idx_profiles_tenant on public.profiles(tenant_id);
create index if not exists idx_profiles_user   on public.profiles(user_id);
create index if not exists idx_user_progress_tenant_user on public.user_progress(tenant_id, user_id);
create index if not exists idx_user_xp_tenant_user on public.user_xp(tenant_id, user_id);
create index if not exists idx_badge_earnings_tenant_user on public.badge_earnings(tenant_id, user_id);
create index if not exists idx_leaderboard_tenant_period_rank on public.leaderboard_entries(tenant_id, period, rank);
