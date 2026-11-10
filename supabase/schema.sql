-- Supabase schema for Família Kato
-- Execute este SQL no SQL Editor do Supabase (uma vez).

create table if not exists public.pessoas (
  id text primary key,
  nome text not null,
  apelido text,
  nascimento text,
  falecimento text,
  geracao int default 0,
  pais text[] default '{}',
  conjuges text[] default '{}',
  exde text[] default '{}',
  foto text,
  bio text,
  local text,
  profissao text,
  observacao text,
  agregado boolean default false,
  sexo text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.historias (
  id text primary key,
  titulo text not null,
  texto text not null,
  autor text,
  publicado text,
  created_at timestamptz default now()
);

create table if not exists public.eventos (
  id text primary key,
  ano text,
  titulo text not null,
  descricao text,
  tipo text,
  pessoa text references public.pessoas(id),
  created_at timestamptz default now()
);

-- Storage bucket for photos (público para leitura; upload exige login)
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = excluded.public;

-- RLS
alter table public.pessoas enable row level security;
alter table public.historias enable row level security;
alter table public.eventos enable row level security;

-- Leitura pública
drop policy if exists "pessoas leitura publica" on public.pessoas;
create policy "pessoas leitura publica" on public.pessoas for select using (true);
drop policy if exists "historias leitura publica" on public.historias;
create policy "historias leitura publica" on public.historias for select using (true);
drop policy if exists "eventos leitura publica" on public.eventos;
create policy "eventos leitura publica" on public.eventos for select using (true);

-- Escrita apenas para usuários autenticados (admin definido no app via email/metadata)
drop policy if exists "pessoas escrita autenticada" on public.pessoas;
create policy "pessoas escrita autenticada" on public.pessoas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "historias escrita autenticada" on public.historias;
create policy "historias escrita autenticada" on public.historias for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "eventos escrita autenticada" on public.eventos;
create policy "eventos escrita autenticada" on public.eventos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage policies (bucket 'fotos')
drop policy if exists "fotos leitura publica" on storage.objects;
create policy "fotos leitura publica" on storage.objects for select using (bucket_id = 'fotos');
drop policy if exists "fotos upload autenticado" on storage.objects;
create policy "fotos upload autenticado" on storage.objects for insert
  with check (bucket_id = 'fotos' and auth.role() = 'authenticated');
drop policy if exists "fotos update autenticado" on storage.objects;
create policy "fotos update autenticado" on storage.objects for update
  using (bucket_id = 'fotos' and auth.role() = 'authenticated');
drop policy if exists "fotos delete autenticado" on storage.objects;
create policy "fotos delete autenticado" on storage.objects for delete
  using (bucket_id = 'fotos' and auth.role() = 'authenticated');

-- Grants explícitos (o Supabase normalmente já aplica default privileges, mas
-- isso garante leitura pública e escrita autenticada mesmo em projetos novos).
grant usage on schema public to anon, authenticated, service_role;
grant select on public.pessoas, public.historias, public.eventos to anon;
grant select, insert, update, delete on public.pessoas, public.historias, public.eventos to authenticated;
grant all on public.pessoas, public.historias, public.eventos to service_role;
grant select on storage.objects to anon;
grant select, insert, update, delete on storage.objects to authenticated;
grant all on storage.objects to service_role;
