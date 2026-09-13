alter table profiles enable row level security;
alter table contratas enable row level security;
alter table trabajos enable row level security;
alter table pagos enable row level security;
alter table weekly_highlights enable row level security;
alter table weekly_highlight_images enable row level security;
alter table links enable row level security;
alter table zona_asignaciones enable row level security;

-- Datos compartidos por todo el equipo: cualquier cuenta autenticada puede leer/escribir.
-- No hay registro público (anon) ni aislamiento por usuario.
create policy "authenticated_full_access" on contratas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on trabajos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on pagos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on weekly_highlights for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on weekly_highlight_images for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on links for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated_full_access" on zona_asignaciones for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- profiles: todos leen, cada quien edita solo su propia fila
create policy "profiles_select_all" on profiles for select using (auth.role() = 'authenticated');
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
