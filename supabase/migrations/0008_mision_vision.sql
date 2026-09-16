create type mision_vision_clave as enum ('mision', 'vision');

create table mision_vision (
  clave mision_vision_clave primary key,
  contenido text,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

insert into mision_vision (clave) values ('mision'), ('vision');

alter table mision_vision enable row level security;
create policy "authenticated_full_access" on mision_vision for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
