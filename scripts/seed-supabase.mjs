// Popula a tabela `pessoas` do Supabase com o seed de src/data/familia.ts.
// Uso:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs [arquivo.json]
//
// A chave service_role é necessária porque as políticas de RLS só permitem
// escrita para usuários autenticados. Nunca versione essa chave.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.')
  process.exit(1)
}

const file = process.argv[2] || '.seed.json'
const pessoas = JSON.parse(readFileSync(file, 'utf8'))

const rows = pessoas.map((p) => ({
  id: p.id,
  nome: p.nome,
  apelido: p.apelido ?? null,
  nascimento: p.nascimento ?? null,
  falecimento: p.falecimento ?? null,
  geracao: p.geracao ?? 0,
  pais: p.pais ?? [],
  conjuges: p.conjuges ?? [],
  exde: p.exDe ?? p.exde ?? [],
  foto: p.foto ?? null,
  bio: p.bio ?? null,
  local: p.local ?? null,
  profissao: p.profissao ?? null,
  observacao: p.observacao ?? null,
  agregado: !!p.agregado,
  sexo: p.sexo ?? null,
}))

const sb = createClient(url, key, { auth: { persistSession: false } })

let enviados = 0
for (let i = 0; i < rows.length; i += 50) {
  const lote = rows.slice(i, i + 50)
  const { error } = await sb.from('pessoas').upsert(lote, { onConflict: 'id' })
  if (error) {
    console.error('Falha no lote', i, error.message)
    process.exit(1)
  }
  enviados += lote.length
  console.log(`enviados ${enviados}/${rows.length}`)
}

const { count, error } = await sb.from('pessoas').select('*', { count: 'exact', head: true })
if (error) {
  console.error('Erro ao contar:', error.message)
  process.exit(1)
}
console.log(`OK: tabela pessoas tem ${count} registros`)
