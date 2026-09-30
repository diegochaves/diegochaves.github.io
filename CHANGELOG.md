# Changelog

Mudanças relevantes no site [diegochav.es](https://diegochav.es).

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). O site é publicado a cada push para `master` e não tem números de versão, por isso as entradas são agrupadas pela data em que foram para o ar.

## Não publicado

### Alterado

- **Todos os dados pessoais passam para `src/consts.ts`.** Antes, vários ficavam fixos nos componentes:
  - `SITE.initials` (iniciais do avatar, antes repetidas em 3 arquivos) e `SITE.twitter` (usuário nos cartões de compartilhamento);
  - `HOME` para o cabeçalho da página inicial;
  - `ABOUT` para o título, os parágrafos, a stack e a descrição da página Sobre.
- As descrições das páginas Blog, Projetos e Agora passam a usar `SITE.author`.

O HTML gerado é idêntico ao de antes; só muda onde os dados são editados.

## 2026-09-30

### Adicionado

- **Data dos posts no nome do arquivo** ([#4], `0a6d93e`). Os posts passam a se chamar `YYYY-MM-DD-HHmm-slug.md`, com o horário de Brasília. A data sai do frontmatter e só o slug vai para a URL. Um nome fora do formato faz o build falhar com uma mensagem clara.
- **Estatísticas com GoatCounter** ([#3], `0996607`), sem cookies e só em produção. Conta visitas e os cliques em redes sociais (`social/<rede>`), RSS, cartões de projeto (`projeto/<nome>`) e no botão "copiar" dos blocos de código.
- Seção "privacidade" na página Sobre, explicando o uso do GoatCounter ([#3]).

### Alterado

- Datas exibidas e agrupamento por mês passam a usar o fuso `America/Sao_Paulo` (antes: UTC), já que os posts agora têm hora e o build roda em UTC ([#4]).
- `atualizadoEm` do Agora passa a ser meio-dia de Brasília, para o mês exibido não mudar com o fuso ([#4]).
- `bem-vindo.md` renomeado para `2024-08-19-1016-bem-vindo.md`; a URL continua `/blog/bem-vindo/` ([#4]).

### Corrigido

- Formatação do texto de privacidade na página Sobre (`6819fc1`).

### Documentação

- Documentação do projeto ([#5], `4ac692b`):
  - novo `README.md` com visão geral, stack, estrutura de pastas e publicação;
  - guia de posts em [`docs/publicar-posts.md`](docs/publicar-posts.md): nome do arquivo, frontmatter, `resumo`, rascunhos, imagens e modelo;
  - guia de edição em [`docs/editar-o-site.md`](docs/editar-o-site.md): cada campo de `src/consts.ts`, as páginas Início, Sobre, Agora e Projetos, receitas (nova categoria, item de menu, rede social) e GoatCounter;
  - este `CHANGELOG.md`.

## 2026-09-29

### Adicionado

- **Novo layout "Sálvia"** ([#2], `45e81a8`): barra lateral fixa no desktop (avatar, nome, cargo, bio, menu, Agora, redes sociais, tema) e barra no topo com menu no celular. Nova paleta clara e escura, fontes Geist e Geist Mono, tema de código `everforest-dark`.
- Posts agrupados por mês, filtro de categorias e páginas `/blog/categoria/<categoria>/`.
- Página do post com barra lateral própria: data, tempo de leitura, categoria, tags e índice "neste post" que acompanha a leitura.
- Campo opcional `resumo` (`problema`, `complicou`, `solucao`) para posts de "problema e solução".
- Blocos de código com barra de linguagem e botão "copiar"; seção "continue lendo" com 2 posts.
- Página **Projetos** (`/projetos`, dados em `src/data/projects.ts`) e página **Agora** (`/agora`, dados em `src/data/agora.ts`).
- LinkedIn e Instagram nos links sociais.
- `src/consts.ts` reúne os dados do site: `SITE`, `NAV_LINKS`, `SOCIAL_LINKS` e as categorias.

### Alterado

- Páginas Sobre e 404 refeitas no novo estilo.
- Busca e formatação de posts centralizadas em `src/utils/posts.ts`; o RSS passa a usar os dados de `src/consts.ts`.
- Cargo passa a "Engenheiro de Computação"; endereços do LinkedIn e do Instagram corrigidos (`115d0b8`).

### Removido

- Componentes `Header.astro` e `PostCard.astro`, substituídos pela barra lateral e pela nova lista de posts.

## 2026-09-28

### Alterado

- **Migração de Jekyll para Astro** ([#1]). O site passa a ser gerado pelo Astro 7 com Tailwind CSS 4 e TypeScript, e é publicado por GitHub Actions no GitHub Pages a cada push para `master` (Node 22). O domínio `diegochav.es` continua, agora via `public/CNAME`.

### Adicionado

- Posts em Markdown como Content Collection com frontmatter validado (`2a76d07`, `bf3abb5`).
- Páginas: início, `/blog`, `/blog/<slug>/`, `/sobre`, `/404`; feed RSS (`/rss.xml`) e sitemap.
- Modo claro e escuro, com a escolha guardada no navegador.
- Tempo de leitura calculado a partir do texto (`bf3abb5`).

### Removido

- Configuração Jekyll (`_config.yml`, `Gemfile`, tema Minima) e a pasta `_posts/` (`2a76d07`, `c029f00`).

<details>
<summary>Detalhes da migração</summary>

- `2a76d07`: projeto Astro inicial (Astro 4, Tailwind 3), layouts, componentes e workflow de deploy.
- `8a37629`: `.astro/` no `.gitignore`.
- `c029f00`: remove o post Jekyll que tinha sobrado e religa o sitemap.
- `b4cbebd`: deploy dispara em `master` (antes: `main`).
- `bf3abb5`: atualização para Astro 7 e Tailwind 4 (Content Layer API, `@tailwindcss/vite`, configuração no CSS), actions e Node 22 no workflow, `package-lock.json` regenerado.

</details>

## 2024-08-19

### Alterado

- HubPress substituído por **Jekyll** com o tema Minima e o plugin `jekyll-feed` (`2461538`, `cb302eb`).

## 2024-08-17

### Adicionado

- Domínio próprio `diegochav.es` via `CNAME` (`35c98ed`).

## 2015–2017: HubPress

O repositório começou como um fork do [HubPress](https://github.com/HubPress/hubpress.io), uma aplicação para blogs no GitHub Pages. Os commits dessa época, e as tags `v0.1.0+master`, `v0.1.0+gh-pages`, `v0.1.1`, `0.5.1+*` e `0.6.0+*`, são do projeto HubPress, não deste site.

[#1]: https://github.com/diegochaves/diegochaves.github.io/pull/1
[#2]: https://github.com/diegochaves/diegochaves.github.io/pull/2
[#3]: https://github.com/diegochaves/diegochaves.github.io/pull/3
[#4]: https://github.com/diegochaves/diegochaves.github.io/pull/4
[#5]: https://github.com/diegochaves/diegochaves.github.io/pull/5
