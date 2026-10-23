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

-- Storage bucket for photos (create via dashboard or SQL):
-- insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true);

-- RLS
alter table public.pessoas enable row level security;
alter table public.historias enable row level security;
alter table public.eventos enable row level security;

-- Leitura pública
create policy "pessoas leitura publica" on public.pessoas for select using (true);
create policy "historias leitura publica" on public.historias for select using (true);
create policy "eventos leitura publica" on public.eventos for select using (true);

-- Escrita apenas para usuários autenticados (admin definido no app via email/metadata)
create policy "pessoas escrita autenticada" on public.pessoas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "historias escrita autenticada" on public.historias for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "eventos escrita autenticada" on public.eventos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage policies (bucket 'fotos')
create policy "fotos leitura publica" on storage.objects for select using (bucket_id = 'fotos');
create policy "fotos upload autenticado" on storage.objects for insert
  with check (bucket_id = 'fotos' and auth.role() = 'authenticated');
create policy "fotos update autenticado" on storage.objects for update
  using (bucket_id = 'fotos' and auth.role() = 'authenticated');
create policy "fotos delete autenticado" on storage.objects for delete
  using (bucket_id = 'fotos' and auth.role() = 'authenticated');
