-- Enums
create type contrata_tipo as enum ('FO', 'NODOS, IB Y MW');
create type trabajo_tipo as enum ('Cableado nuevo sin afectación', 'Reubicaciones con afectación');
create type trabajo_estado as enum ('EJECUTADO', 'STAND BY', 'NO');
create type pago_estado as enum ('PAGADO', 'PENDIENTE', 'NO');
create type link_seccion as enum ('plataformas', 'manuales');
create type zona_tipo_trabajo as enum ('FO PINT', 'FO PEXT', 'MW', 'Desmontaje', 'CONTRATA FIJA');

-- Profiles (1:1 con auth.users, un registro por cada cuenta del equipo)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre_completo text,
  created_at timestamptz not null default now()
);

-- Contratas / proveedores (semilla: hoja "Nros de Acuerdo")
create table contratas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  aliases text[] not null default '{}',
  tipo contrata_tipo not null,
  nro_acuerdo text unique,
  fecha_inicio_acuerdo date,
  fecha_fin_acuerdo date,
  created_at timestamptz not null default now()
);

-- Trabajos de campo (semilla: hoja "CABLEADOS", identificados por DF)
create table trabajos (
  id uuid primary key default gen_random_uuid(),
  df integer not null unique,
  enlace text not null,
  contrata_id uuid references contratas(id),
  tipo_trabajo trabajo_tipo,
  estado trabajo_estado not null default 'NO',
  fecha_entrega date,
  fecha_forecast date,
  fecha_real_ejecucion date,
  rq text,
  comentario text,
  pedido_oracle_generado boolean not null default false,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pagos asociados 1:1 a cada trabajo
create table pagos (
  id uuid primary key default gen_random_uuid(),
  trabajo_id uuid not null unique references trabajos(id) on delete cascade,
  estado_pago pago_estado not null default 'PENDIENTE',
  lpu_recibida boolean not null default false,
  sustento_lpu text,
  proveedor_referencia_id uuid references contratas(id),
  costo numeric(12,2),
  moneda text check (moneda in ('PEN','USD')),
  proyecto_cierre boolean not null default false,
  fecha_cierre date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- "Validadores de la semana" (Inicio)
create table weekly_highlights (
  id uuid primary key default gen_random_uuid(),
  titulo text not null default 'TX-IP-N3',
  semana_inicio date not null,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

create table weekly_highlight_images (
  id uuid primary key default gen_random_uuid(),
  highlight_id uuid not null references weekly_highlights(id) on delete cascade,
  storage_path text not null,
  orden smallint not null default 0,
  created_at timestamptz not null default now()
);

-- Enlaces editables (Plataformas y Manuales, mismo modelo)
create table links (
  id uuid primary key default gen_random_uuid(),
  seccion link_seccion not null,
  nombre text not null,
  url text not null,
  descripcion text,
  orden smallint not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

-- Zonas: asignación de contrata + coordinador por departamento (independiente de trabajos)
create table zona_asignaciones (
  id uuid primary key default gen_random_uuid(),
  departamento text not null,
  tipo_trabajo zona_tipo_trabajo not null,
  coordinador_id uuid references profiles(id),
  contrata_id uuid references contratas(id),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- Crea automáticamente el profile al dar de alta una cuenta en auth.users
create function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, nombre_completo)
  values (new.id, new.raw_user_meta_data->>'nombre_completo');
  return new;
end; $$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
