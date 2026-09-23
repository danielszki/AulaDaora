# Arquitetura do Site - Árvore Genealógica Família Kato

## Mapa do site

```
Home
├── Árvore Genealógica (visualização interativa)
│   └── Página da Pessoa (uma por membro da família)
├── Linha do Tempo da Família
├── Histórias e Memórias
├── Galeria de Fotos
├── Sobre o Projeto
└── Login / Área do Administrador
    └── Painel de Edição (adicionar pessoas, fotos, textos)
```

## Wireframe Home

Blocos de cima para baixo:

1. **Topo**: logo/nome "Família Kato" + menu principal
2. **Destaque**: ilustração ou foto de fundo (estilo montanha/árvore, ver `design.md`) com frase de boas-vindas contada como se fosse um parente falando
3. **Bloco "Comece por aqui"**: atalho grande para entrar na Árvore Genealógica
4. **Bloco "Linha do tempo"**: prévia com 3-4 marcos históricos da família, com link para ver a linha completa
5. **Bloco "Últimas atualizações"**: fotos ou histórias adicionadas recentemente (mostra que o site está vivo)
6. **Rodapé**: contato, aviso de que é um projeto da família, link de login para administradores

## Páginas

| Página | URL | Objetivo | Conteúdo principal |
| --- | --- | --- | --- |
| Home | `/` | Dar boas-vindas e guiar o visitante para a árvore | Mensagem de abertura, atalhos para árvore e linha do tempo, destaques recentes |
| Árvore Genealógica | `/arvore` | Visualizar todos os parentes e como se conectam | Árvore interativa (gerações, pais/filhos/cônjuges), busca por nome |
| Página da Pessoa | `/pessoa/[nome]` | Mostrar os detalhes de um membro específico | Nome completo, datas de nascimento/falecimento, foto, história pessoal, parentes diretos |
| Linha do Tempo | `/linha-do-tempo` | Contar a trajetória da família em ordem cronológica | Eventos importantes (nascimentos, migrações, marcos), fotos históricas |
| Histórias e Memórias | `/historias` | Reunir relatos e memórias contadas pela família | Textos, depoimentos, curiosidades |
| Galeria de Fotos | `/galeria` | Centralizar fotos da família por época | Álbuns organizados por geração ou década |
| Sobre o Projeto | `/sobre` | Explicar o motivo do site existir | Texto explicando o propósito, quem mantém, como contribuir |
| Painel de Administração | `/admin` | Permitir que Zoza e outros familiares autorizados editem o conteúdo | Upload de fotos, cadastro de pessoas, edição de textos |

## Navegação

- **Menu principal**: Início · Árvore Genealógica · Linha do Tempo · Histórias · Galeria · Sobre
- **Rodapé**: "Um projeto da Família Kato" · link de contato/sugestão · acesso à área de administração
- **CTA principal**: "Ver a árvore da família" (leva direto para `/arvore`)

## Fluxo principal

Home → Árvore Genealógica → Página da Pessoa → (explora parentes ligados) → Linha do Tempo ou Histórias

Fluxo secundário (colaboração):
Login → Painel de Administração → Adicionar pessoa/foto/história → Publicar
