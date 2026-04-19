-- EXTENSIONS
create extension if not exists "uuid-ossp";

-- CATEGORIES
create table categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  image      text,
  created_at timestamptz default now()
);

-- PRODUCTS
create table products (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  description text,
  price       numeric(10,2) not null,
  category_id uuid references categories(id) on delete set null,
  images      text[] default '{}',
  model_url   text,
  stock       integer not null default 0,
  featured    boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index idx_products_slug     on products(slug);
create index idx_products_category on products(category_id);
create index idx_products_featured on products(featured) where featured = true;

-- PROFILES (extends auth.users)
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  address    jsonb,
  role       text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- ORDERS
create table orders (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete set null,
  status            text not null default 'pending'
                      check (status in ('pending','paid','processing','shipped','delivered','cancelled')),
  total             numeric(10,2) not null,
  stripe_payment_id text unique,
  shipping_address  jsonb,
  customer_email    text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create index idx_orders_user   on orders(user_id);
create index idx_orders_status on orders(status);

-- ORDER ITEMS
create table order_items (
  id         uuid primary key default uuid_generate_v4(),
  order_id   uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity   integer not null check (quantity > 0),
  price      numeric(10,2) not null,
  created_at timestamptz default now()
);

create index idx_order_items_order on order_items(order_id);

-- AUTO-UPDATE updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at before update on products
  for each row execute function update_updated_at();

create trigger orders_updated_at before update on orders
  for each row execute function update_updated_at();

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- RLS
alter table categories  enable row level security;
alter table products    enable row level security;
alter table profiles    enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- Categories: public read, admin write
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Products: public read, admin write
create policy "products_public_read"  on products for select using (true);
create policy "products_admin_write"  on products for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Profiles: own row only
create policy "profiles_own_read"   on profiles for select using (auth.uid() = id);
create policy "profiles_own_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_own_update" on profiles for update using (auth.uid() = id);

-- Orders: own + admin
create policy "orders_own_read"  on orders for select using (auth.uid() = user_id);
create policy "orders_own_insert" on orders for insert with check (true);
create policy "orders_admin_all" on orders for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Order items: own + admin
create policy "order_items_own_read" on order_items for select
  using (exists (select 1 from orders where id = order_id and user_id = auth.uid()));
create policy "order_items_own_insert" on order_items for insert with check (true);
create policy "order_items_admin_all" on order_items for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
