
=== DIAGNÓSTICO DAS FOTOGRAFIAS ===

Fotos cadastradas: 25 (arquivo: /fotos/IMG-XXXX.jpg)
Pessoas sem foto: 113 (do total de 139 pessoas no modelo)
Pessoas com foto confirmada: 26 (inclui 1 duplicação — Guilherme Primogenito / Sandro compartilhavam /fotos/IMG-20261007-WA0010.jpg, corrigida: removido do Guilherme, mantido no Sandro com identificação por contexto)

Correções aplicadas:
- Tamae Suzuki (tamae-suzuki): adicionada foto /fotos/IMG-20260907-WA0008.jpg (confirmada pelo álbum 'tamae-suzuki' — período: 'Fotos antigas e aniversário de 80 anos')

Não inventadas (Yotaro, Toyo, Yoshiharu, Yoshinobu, Kioko, Ayako, Yoshitaka, Yoshihiro): continuam com placeholder premium (avatar tipográfico em gradiente verde-musgo com borda dourada)

Sem imagens quebradas (404): 40/40 verificações, todas rotas 200.

=== ALTERAÇÕES REALIZADAS NO KIZUNA ===

1. src/data/familia.ts — foto confirmada adicionada (Tamae Suzuki), duplicação removida (Guilherme Primogenito)
2. src/pages/kizuna.astro — fotoHTML: foto real (kz-retrato--real, borda dourada 3px) vs placeholder premium (gradiente verde-escuro 150deg); cartão selecionado removido (não fazia sentido — a seleção é o centro, não os cartões das zonas); linhas distintas no cartão (nome serif, anos, geração); janela de overlay para grupos grandes; grid determinístico mantido
3. src/components/Header.astro — botão "Entrar" para acesso Supabase (sem Clerk ativo); botão social desativado quando Clerk inativo
4. src/lib/clerk.ts — predicado único (chave pública no build + chave secreta no runtime)
5. src/middleware.ts + astro.config.mjs — Clerk só aplica middleware quando chaves existem; cloudflare:workers externalizado no rollupOptions (resolve 500 do Vercel)
6. src/pages/sign-in.astro / sign-up.astro — fallback amigável para acesso sem Clerk
7. CSS (is:global) — retratos com borda dourada; placeholder premium; linhas douradas SVG com pontos circulares; hero japonês intacto; paleta marfim/verde-floresta/ouro discreto

=== TESTES ===

Desktop (1440px):
- Yotaro Kato: placeholder premium (YK), dados corretos, painel atualizado, 4 parentes, 4 linhas SVG, eixo 0.50
- Toyo Kato: placeholder premium (TK), painel com cônjuge (Yotaro) e 7 filhos
- Kiyoe Kadita: foto real, borda dourada no cartão central, dados corretos, painel com 14 parentes relacionados, painel aberto
- Ayako Saito: placeholder premium (AS), 8 parentes visíveis

Mobile (390px):
- Kiyoe Kadita: foto real, painel fechado (folha inferior, conforme design), painel aberto após clique no cartão central, conteúdo correto
- Todos os cartões legíveis, nenhuma rolagem horizontal, nenhuma imagem quebrada

=== CAPTURAS ===

/screenshot-kizuna-final/desktop-final.png — produção real
/screenshot-kizuna-final/mobile-final.png — produção real (390px)

=== ENDEREÇO DA PRÉVIA ===

Produção (autorizado pelo usuário): https://familiakato.vercel.app/kizuna
Branch (não mergeada em main sem autorização): feat/kizuna-fotos
Preview local (para desenvolvimento): http://127.0.0.1:4399/kizuna

=== NÃO ALTERADO ===

- /arvore (200, intacto)
- /login (200, acesso Supabase/e-mail)
- /historias, /galeria, /linha-do-tempo, /sobre
- estrutura dos dados (pessoas, eventos, albuns) — apenas correção de associação de foto + remoção de duplicação

=== NOTAS ===

- A feature de reveal animation (animejs + reveal.ts + HeroArt/PersonCard/StoryBlock/TimelineEvent + Base script) foi identificada no working tree, validada (0 console errors, 0 imagens quebradas), mas NÃO commitada — permanece intacta para decisão separada do usuário.
- A correção principal foi resolver o erro 500 que derrubava TODAS as rotas do site (incluindo /, /arvore, /login) — causado pela integração Clerk + middleware + adapter SSR que veio com a branch remota `origin/main`, mas sem as variáveis de ambiente `CLERK_SECRET_KEY` configuradas no Vercel.
