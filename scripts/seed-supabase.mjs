// Popula a tabela `pessoas` do Supabase com o seed de src/data/familia.ts.
// Uso:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs [arquivo.json]
//
// O arquivo JSON é a lista de pessoas no formato exportado pela página /admin
// (botão "Exportar arquivo (JSON)"). Salve como `.seed.json` na raiz do projeto
// ou passe o caminho como argumento.
//
// A chave service_role é necessária porque as políticas de RLS só permitem
// escrita para usuários autenticados. Nunca versione essa chave.
import { existsSync, readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.')
  process.exit(1)
}

// Aceita a URL com ou sem `/rest/v1/` (o SDK concatena o caminho sozinho).
const baseUrl = (() => {
  try {
    return new URL(url).origin
  } catch {
    return url.replace(/\/+$/, '').replace(/\/(rest|auth|storage)\/v1$/i, '')
  }
})()

const file = process.argv[2] || '.seed.json'
if (!existsSync(file)) {
  console.error(
    `Arquivo não encontrado: ${file}\n` +
      'Abra /admin, clique em "Exportar arquivo (JSON)" e salve o download como .seed.json,\n' +
      'ou passe o caminho do backup: node scripts/seed-supabase.mjs caminho/backup.json',
  )
  process.exit(1)
}
const pessoas = JSON.parse(readFileSync(file, 'utf8'))
if (!Array.isArray(pessoas) || !pessoas.length) {
  console.error('O arquivo precisa conter uma lista de pessoas (array).')
  process.exit(1)
}

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

const sb = createClient(baseUrl, key, { auth: { persistSession: false } })

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
