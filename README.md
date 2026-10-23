# AulaDaora

Site da árvore genealógica da **Família Kato** — projeto da Aula Rede Daora 23/09/2026.

Rascunho do site em Astro (estático), com a documentação do projeto na mesma pasta.

## Rodando

```bash
npm install
npm run dev      # ambiente local
npm run build    # gera dist/
npm run preview  # serve dist/
npm run check    # checagem de tipos dos arquivos .astro
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
- **Onde as alterações ficam:** no `localStorage` do navegador do dispositivo atual (chave `kato-arvore-v1`). É um armazenamento **por dispositivo**. Para compartilhar as alterações entre a família com sincronia e controle de acesso, o próximo passo é conectar um banco persistente (ex.: Vercel + Supabase/KV) com login e permissões — sem serviço/credencial definidos ainda pela família.
- **Restaurar o original:** apaga alterações locais, sempre com confirmação. Export antes!

## Próximos passos

1. Associar as fotos restantes às pessoas (pelas legendas do grupo).
2. Banco persistente + login/papéis (admin, editor, colaborador) para as alterações valerem em todos os dispositivos.
3. Envio de fotos pelo painel (exige serviço de armazenamento).

## Deploy

- O site é estático (Astro). Build: `npm run build` → `dist/`.
- Vercel já conectado ao GitHub: **todo push no `main` faz deploy automático** (projeto `familiakato`). Config fixada em `vercel.json` (framework Astro, saída `dist/`).
- Não há segredos nem variáveis de ambiente em produção hoje. Quando entrarmos a etapa de banco/login, serão usadas variáveis documentadas aqui (ex.: `DATABASE_URL`, `ADMIN_TOKEN`) — nomes apenas, sem valores.
