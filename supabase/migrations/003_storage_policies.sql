-- Storage buckets
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('product-models', 'product-models', true)
on conflict (id) do update set public = true;

-- product-images: public read
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

-- product-images: authenticated upload
create policy "product_images_auth_upload" on storage.objects
  for insert with check (
    bucket_id = 'product-images' and auth.role() = 'authenticated'
  );

-- product-images: admin delete/update
create policy "product_images_admin_manage" on storage.objects
  for all using (
    bucket_id = 'product-images' and
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- product-models: public read
create policy "product_models_public_read" on storage.objects
  for select using (bucket_id = 'product-models');

-- product-models: authenticated upload
create policy "product_models_auth_upload" on storage.objects
  for insert with check (
    bucket_id = 'product-models' and auth.role() = 'authenticated'
  );
