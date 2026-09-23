# Decisões Técnicas - Árvore Genealógica Família Kato

## Estrutura
- [ ] HTML/CSS/JavaScript
- [x] Astro
- Motivo: o site vai ter atualização frequente e mais de uma pessoa vai cadastrar parentes, subir fotos e editar textos — isso pede algum gerenciamento de conteúdo por trás, o que HTML/CSS/JS puro não oferece nativamente. Astro mantém páginas rápidas e simples (bom pra SEO e performance) e se conecta facilmente a um CMS ou banco de dados leve depois, sem precisar reescrever o site do zero.

## Atualização de conteúdo
- Frequência: semanalmente (ou mais, no começo — sempre aparecem informações novas)
- CMS: precisa. Sugestão: Notion como CMS simples, ou um headless CMS leve (Sanity ou Directus), com plano gratuito e interface fácil para quem não mexe com código.

## Hospedagem
- Plataforma: Vercel
- Motivo: integra muito bem com Astro, tem deploy simples direto do Git e um plano gratuito suficiente para o estágio inicial do projeto. Vale ficar de olho no limite de banda do plano gratuito (100 GB) conforme o site crescer em fotos e acessos da família — se um dia isso virar um problema, dá para migrar ou fazer upgrade de plano sem reescrever o site.

## Limites do MVP
- Entra agora: árvore genealógica navegável, cadastro básico de pessoa (nome, datas, foto, parentesco), linha do tempo, acesso de administrador para cadastrar/editar conteúdo
- Fica para depois: formulário público de sugestão/correção, galeria de fotos separada por álbum, histórias/depoimentos em texto longo, suporte a multiidioma
