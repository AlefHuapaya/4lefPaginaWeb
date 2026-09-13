-- Reemplazado por validadores_semana (texto, no imágenes) a pedido del usuario.
-- El bucket de Storage "weekly-highlights" se limpia aparte vía CLI (no se puede
-- borrar storage.* con SQL directo).
drop table if exists weekly_highlight_images;
drop table if exists weekly_highlights;
