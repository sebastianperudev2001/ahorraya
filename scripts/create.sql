create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  amount numeric not null check (amount >= 0),
  category text not null,
  note text,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilita RLS
alter table public.transactions enable row level security;

-- Permite que el usuario logueado lea solo sus transacciones
create policy "Users can view their own transactions"
on public.transactions
for select
using (auth.uid() = user_id);

-- Permite que el usuario logueado inserte transacciones
create policy "Users can insert their own transactions"
on public.transactions
for insert
with check (auth.uid() = user_id);

-- Permite actualizar solo las suyas
create policy "Users can update their own transactions"
on public.transactions
for update
using (auth.uid() = user_id);

-- Permite eliminar solo las suyas
create policy "Users can delete their own transactions"
on public.transactions
for delete
using (auth.uid() = user_id);

