-- Alertas: vista recalculada al vuelo (sin cron, ver justificación en el plan)
create view v_alertas as
  select id as trabajo_id, df, enlace, 'ACCESO_MOP_PENDIENTE' as tipo_alerta,
         current_date - fecha_entrega as dias
  from trabajos
  where fecha_entrega is not null and estado <> 'EJECUTADO'
    and current_date - fecha_entrega >= 5
  union all
  select id, df, enlace, 'PEDIDO_ORACLE_PENDIENTE', current_date - created_at::date
  from trabajos
  where not pedido_oracle_generado and current_date - created_at::date >= 2
  union all
  select id, df, enlace, 'FORECAST_VENCIDO', current_date - fecha_forecast
  from trabajos
  where fecha_forecast is not null and estado <> 'EJECUTADO' and current_date > fecha_forecast;

-- KPIs del dashboard en un solo round-trip
create function get_dashboard_kpis() returns json language sql stable as $$
  select json_build_object(
    'por_estado', (select coalesce(json_agg(json_build_object('estado', estado, 'total', total)), '[]'::json)
                   from (select estado, count(*) as total from trabajos group by estado) s),
    'por_contrata', (select coalesce(json_agg(json_build_object('contrata', contrata, 'total', total)), '[]'::json)
                     from (select c.nombre as contrata, count(*) as total
                           from trabajos t join contratas c on c.id = t.contrata_id
                           group by c.nombre) s),
    'tiempo_promedio_dias', (select avg(fecha_real_ejecucion - fecha_entrega)
                             from trabajos where fecha_real_ejecucion is not null and fecha_entrega is not null),
    'forecast_vencidos', (select count(*) from v_alertas where tipo_alerta = 'FORECAST_VENCIDO')
  );
$$;
