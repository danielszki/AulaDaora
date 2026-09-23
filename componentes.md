# Componentes do Projeto - Árvore Genealógica Família Kato

## Componentes globais

| Componente | Onde aparece | O que muda |
| --- | --- | --- |
| Menu | Todas as páginas | Link ativo |
| Footer | Todas as páginas | — |
| Botão "Ver a árvore" | Home, Sobre | Link (sempre leva para `/arvore`) |
| Botão de login/admin | Todas as páginas (rodapé ou menu) | Visível para todos; painel só abre se autorizado |

## Componentes de página

| Componente | Onde aparece | Conteúdo ou props |
| --- | --- | --- |
| Hero | Home | frase de boas-vindas, imagem de fundo, CTA |
| Cartão de pessoa | Árvore Genealógica, Galeria, prévias na Home | foto, nome, anos (nascimento–falecimento), link para página da pessoa |
| Nó da árvore | Árvore Genealógica | pessoa, geração, conexões (pai/mãe/filhos/cônjuge), expandir/recolher galho |
| Marco da linha do tempo | Linha do Tempo, prévia na Home | ano, título do evento, descrição curta, foto (opcional) |
| Bloco de história | Histórias e Memórias, Página da Pessoa | título, texto, autor do relato, data de publicação |
| Álbum de fotos | Galeria | capa, título do álbum, geração/década, quantidade de fotos |
| Formulário de sugestão | Página da Pessoa | nome de quem sugere, campo de correção/complemento, mensagem |
| Painel de edição | Área de Administração | formulário de cadastro de pessoa, upload de foto, editor de texto |
