-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Syncs with auth.users via Client or Trigger)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  business_name text,
  instagram_handle text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUBSCRIPTION PAYMENTS TABLE
create table public.subscription_payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  order_id text not null, -- Paytm Order ID
  payment_id text, -- Paytm Transaction ID
  amount decimal(10,2) not null,
  status text default 'pending',
  plan_type text not null, -- 'pro' or 'business'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Subscription Payments
alter table public.subscription_payments enable row level security;
create policy "Users can view own subscription payments" on public.subscription_payments for select using (auth.uid() = user_id);

-- CUSTOMERS TABLE
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  name text not null,
  phone text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS TABLE
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  name text not null,
  price decimal(10,2) not null,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDERS TABLE
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  customer_id uuid references public.customers(id),
  status text check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) default 'pending',
  payment_status text check (payment_status in ('pending', 'paid', 'failed')) default 'pending',
  payment_id text,
  total_amount decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS TABLE
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) not null,
  product_id uuid references public.products(id),
  quantity integer not null default 1,
  price decimal(10,2) not null
);

-- ADDRESSES TABLE
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) not null,
  full_name text not null,
  phone text,
  address_line text not null,
  city text not null,
  state text,
  postal_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Row Level Security)
alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;

-- Policies
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can update own data" on public.users for update using (auth.uid() = id);

create policy "Users can view own customers" on public.customers for select using (auth.uid() = user_id);
create policy "Users can insert own customers" on public.customers for insert with check (auth.uid() = user_id);
create policy "Users can update own customers" on public.customers for update using (auth.uid() = user_id);

create policy "Users can view own products" on public.products for select using (auth.uid() = user_id);
create policy "Users can insert own products" on public.products for insert with check (auth.uid() = user_id);
create policy "Users can update own products" on public.products for update using (auth.uid() = user_id);

create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users can update own orders" on public.orders for update using (auth.uid() = user_id);

-- Addresses might be public insertable if linked to an order?
-- For now, restrict to user. Public page dealing dealing with addresses needs special handling (e.g. signed URL or specific RLS)
create policy "Users can view own addresses" on public.addresses for select using (EXISTS (SELECT 1 FROM orders WHERE orders.id = addresses.order_id AND orders.user_id = auth.uid()));
