# AulaDaora

Site da árvore genealógica da **Família Kato** — projeto da Aula Rede Daora 23/09/2026.

Rascunho do site em Astro (estático), com a documentação do projeto na mesma pasta.

## Rodando

```bash
npm install
cp .env.example .env   # preencha Supabase/Clerk (opcional: sem chaves roda local)
npm run dev            # ambiente local
npm run build          # gera dist/ + .vercel/output
npm run preview        # serve dist/
npm run check          # checagem de tipos dos arquivos .astro
```

## Estrutura

```
descoberta.md      briefing do projeto + panorama dos dados reais
arquitetura.md     mapa do site e páginas
tecnologia.md      decisões técnicas (Astro, CMS, Vercel)
design.md          paleta, tipografia e tom
componentes.md     componentes globais e de página
src/
  data/familia.ts  dados da árvore (122 pessoas, 6 gerações, 14 marcos, 6 histórias, 4 álbuns)
  layouts/         Base.astro (html, menu e rodapé)
  components/      Header, Footer, PersonCard, TimelineEvent, StoryBlock, HeroArt
  pages/           /, /arvore, /pessoa/[id], /linha-do-tempo, /historias, /galeria, /sobre, /admin, 404
public/fotos/      55 fotos da família (IMG-*.jpg)
```

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Apresentação, destaques, gerações, memórias, álbum e participação |
| `/arvore` | Árvore inteira (padrão, Yotaro e Toyo no topo), lista completa e foco por pessoa |
| `/pessoa/[id]` | Ficha da pessoa, pais, cônjuge e filhos |
| `/linha-do-tempo` | Marcos cronológicos |
| `/historias` | Relatos e memórias |
| `/galeria` | Álbuns por época (fotos entram depois) |
| `/sobre` | Propósito do site e quem mantém |
| `/admin` | Ferramentas reais: cadastrar pessoa, buscar, exportar/importar backup |

## Administrar o conteúdo

- **Cadastrar pessoa:** `/admin` → "Cadastrar pessoa nova". Escolha (opcional) "Filho(a) de" para já criar o vínculo; a pessoa aparece na árvore em seguida.
- **Backup:** `/admin` → **Exportar** baixa um JSON; **Importar** restaura esse backup. Faça export **antes** de trocar de dispositivo ou limpar o navegador.
- **Onde as alterações ficam:** no `localStorage` do navegador do dispositivo atual (chave `kato-arvore-v1`) **e** no Supabase quando a nuvem está configurada. A árvore carrega os dados da nuvem ao abrir; se a nuvem falhar, continua com o que está no dispositivo/seed.
- **Nuvem (Supabase):** execute `supabase/schema.sql` no SQL Editor do projeto, crie o bucket público `fotos` e preencha `PUBLIC_SUPABASE_URL` (URL **base**, sem `/rest/v1/`) e `PUBLIC_SUPABASE_ANON_KEY`.
- **Popular a nuvem:** abra `/admin` → **Exportar arquivo (JSON)**, salve como `.seed.json` e rode `SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs`.
- **Login:** `/login` usa e-mail/senha (Supabase) e `/sign-in` usa login social (Clerk, quando as chaves existem). Os botões sociais do Supabase em `/login` só funcionam depois de habilitar cada provedor em *Authentication → Providers* (hoje nenhum está habilitado no projeto). Para o Clerk também gravar no Supabase, configure o Clerk como *Third-Party Auth* no painel do Supabase (passo a passo em `.env.example`).
- **Restaurar o original:** apaga alterações locais, sempre com confirmação. Export antes!

## Próximos passos

1. Associar as fotos restantes às pessoas (pelas legendas do grupo).
2. Banco persistente + login/papéis (admin, editor, colaborador) para as alterações valerem em todos os dispositivos.
3. Envio de fotos pelo painel (exige serviço de armazenamento).

## Deploy

- Astro com **SSR** (`output: 'server'`) e adapter da Vercel. Build: `npm run build`.
- Vercel já conectado ao GitHub: **todo push no `main` faz deploy automático** (projeto `familiakato`).
- Variáveis de ambiente na Vercel (**Production** e **Preview**):
  - `PUBLIC_SUPABASE_URL` (URL base, sem `/rest/v1/`)
  - `PUBLIC_SUPABASE_ANON_KEY`
  - `PUBLIC_ADMIN_EMAIL`
  - `PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- Sem as variáveis do Clerk o site funciona normalmente; o login social fica desativado e aparece um aviso no log. Sem as do Supabase, o site opera em modo local (localStorage).
- Nos painéis dos provedores, cadastre as URLs de produção: Supabase → Auth → URL Configuration (Site URL/Redirect URLs com o domínio da Vercel) e Clerk → Domains/Redirect URLs (`/sign-in`, `/sign-up`).
- **Quem pode editar:** as políticas de RLS liberam escrita para qualquer usuário autenticado. Para manter o acesso restrito à família, desative o cadastro público (Supabase → Authentication → Providers → Email → *Allow new users to sign up*; Clerk → *Restrictions* / allowlist) e crie as contas manualmente.
- `PUBLIC_*` são embutidas no build: ao trocar esses valores, refaça o deploy (não basta reiniciar a função).
