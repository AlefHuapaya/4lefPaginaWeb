create type validador_area as enum ('PEXT', 'TX', 'N3', 'CORE IP');

create table validadores_semana (
  area validador_area primary key,
  persona text,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

insert into validadores_semana (area) values ('PEXT'), ('TX'), ('N3'), ('CORE IP');

alter table validadores_semana enable row level security;
create policy "authenticated_full_access" on validadores_semana for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
