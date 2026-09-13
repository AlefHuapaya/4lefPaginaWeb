insert into storage.buckets (id, name, public) values ('weekly-highlights', 'weekly-highlights', true);

create policy "weekly_highlights_read" on storage.objects for select
  using (bucket_id = 'weekly-highlights');
create policy "weekly_highlights_write" on storage.objects for insert with check (
  bucket_id = 'weekly-highlights' and auth.role() = 'authenticated');
create policy "weekly_highlights_update" on storage.objects for update using (
  bucket_id = 'weekly-highlights' and auth.role() = 'authenticated');
create policy "weekly_highlights_delete" on storage.objects for delete using (
  bucket_id = 'weekly-highlights' and auth.role() = 'authenticated');
