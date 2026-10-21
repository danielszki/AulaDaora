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
| `/` | Hero, atalho para a árvore, prévia da linha do tempo, últimas atualizações |
| `/arvore` | Árvore por gerações com busca por nome |
| `/pessoa/[id]` | Ficha da pessoa, pais, cônjuge e filhos |
| `/linha-do-tempo` | Marcos cronológicos |
| `/historias` | Relatos e memórias |
| `/galeria` | Álbuns por época (fotos entram depois) |
| `/sobre` | Propósito do site e quem mantém |
| `/admin` | Painel de edição (rascunho, sem login/gravação ainda) |

## Próximos passos

1. Associar as fotos restantes às pessoas (pelas legendas do grupo).
2. Login + CMS (Notion ou headless leve) para o painel de `/admin`.
3. Deploy na Vercel.
