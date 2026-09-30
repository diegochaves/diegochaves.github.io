# Editar o site

Guia de onde fica cada informação do site e como alterá-la. Para escrever posts, veja [publicar-posts.md](publicar-posts.md).

Depois de qualquer alteração, confira com `npm run dev`. Ao fazer push para `master`, o site é publicado de novo automaticamente.

- [Dados gerais: `src/consts.ts`](#dados-gerais-srcconststs)
- [Páginas](#páginas): [Início](#início-), [Sobre](#sobre-sobre), [Agora](#agora-agora), [Projetos](#projetos-projetos), [Blog e categorias](#blog-e-categorias-blog)
- [Receitas](#receitas): [categoria](#adicionar-uma-categoria), [item no menu](#adicionar-um-item-ao-menu), [rede social](#adicionar-ou-trocar-uma-rede-social)
- [O que fica fora do `consts.ts`](#o-que-fica-fora-do-conststs)
- [Estatísticas (GoatCounter)](#estatísticas-goatcounter)

## Dados gerais: `src/consts.ts`

[`src/consts.ts`](../src/consts.ts) concentra os dados usados em várias páginas. Altere aqui, e a mudança vale para o site todo.

### `SITE`

```ts
export const SITE = {
  title: 'diegochav.es',
  author: 'Diego Chaves',
  role: 'Engenheiro de Computação',
  description: 'Portfólio e blog de Diego Chaves — …',
  bio: 'Escrevo sobre o que construo, …',
};
```

| Campo | Onde aparece |
|---|---|
| `title` | Título da aba (`Post — diegochav.es`), título da página inicial, nome do feed RSS |
| `author` | Barra lateral, barra do topo no celular, barra lateral dos posts, rodapé (`© 2026 Diego Chaves`) |
| `role` | Abaixo do nome na barra lateral; na página inicial, no celular |
| `bio` | Barra lateral; na página inicial, no celular |
| `description` | Descrição padrão das páginas para buscadores e redes sociais (quando a página não define outra) e descrição do feed RSS |

### `NAV_LINKS`

Os itens do menu, na ordem em que aparecem (barra lateral no desktop, menu ☰ no celular):

```ts
export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
  …
];
```

O item da página atual fica destacado. Para criar uma página nova, veja [Adicionar um item ao menu](#adicionar-um-item-ao-menu).

### `SOCIAL_LINKS`

Redes sociais e contato. Aparecem na barra lateral, no rodapé do celular e na seção "onde me encontrar" da página Sobre (menos o RSS).

```ts
{ href: 'https://github.com/diegochaves', label: 'github', name: 'GitHub' },
```

| Campo | Para que serve |
|---|---|
| `href` | Endereço. Links `https://…` abrem em outra aba. Para e-mail, use `mailto:…` |
| `label` | Texto curto exibido (em minúsculas, na barra lateral e no rodapé). Também dá nome ao evento no GoatCounter: `social/<label>` (`rss` para o RSS) |
| `name` | Nome completo: lido por leitores de tela e exibido na página Sobre |

### `CATEGORIES` e `CATEGORY_INFO`

As categorias possíveis de um post e os textos da página de cada uma (`/blog/categoria/<categoria>/`):

```ts
export const CATEGORIES = ['dev', 'carreira', 'curiosidades', 'pessoal'] as const;

export const CATEGORY_INFO = {
  dev: { label: 'Dev', description: 'Linguagens, frameworks, arquitetura e boas práticas.' },
  …
};
```

- O valor em `CATEGORIES` é o que se usa no `category:` do post, e é também o texto das etiquetas e do filtro.
- `label` e `description` são o título e o subtítulo da página da categoria.

Uma categoria nova precisa de mais do que isso; veja [Adicionar uma categoria](#adicionar-uma-categoria).

### `TIME_ZONE`

`'America/Sao_Paulo'`: fuso em que as datas dos posts são exibidas e agrupadas por mês. **Não altere só esta constante.** O deslocamento `-03:00` usado para ler a hora do nome dos posts fica em [`src/content.config.ts`](../src/content.config.ts) e precisa mudar junto.

### `GOATCOUNTER_ENDPOINT`

Endereço da conta no GoatCounter. Veja [Estatísticas](#estatísticas-goatcounter).

## Páginas

### Início (`/`)

Arquivo: [`src/pages/index.astro`](../src/pages/index.astro).

| Parte | De onde vem |
|---|---|
| "caderno de bordo" e o título *Anotações sobre construir software…* | Texto fixo no próprio `index.astro` |
| Cargo e bio (só no celular) | `SITE.role` e `SITE.bio` |
| Lista de posts | Os 8 posts mais recentes, agrupados por mês |
| Projetos | Até 3 projetos com `featured: true` em [`src/data/projects.ts`](../src/data/projects.ts). A seção some se nenhum tiver `featured` |
| Quadro "agora" (só no celular) | [`src/data/agora.ts`](../src/data/agora.ts) |

### Sobre (`/sobre`)

Arquivo: [`src/pages/sobre.astro`](../src/pages/sobre.astro). O texto desta página fica no próprio arquivo, e não no `consts.ts`:

- **Apresentação:** os parágrafos `<p>…</p>` dentro de `<div class="prose-blog …">`. Edite o texto e, para um parágrafo novo, copie um `<p>` existente.
- **Stack atual:** a lista no topo do arquivo:

  ```ts
  const stack = [
    'TypeScript', 'Python', 'React', 'Node.js',
    'Docker', 'PostgreSQL', 'AWS', 'Git',
  ];
  ```

- **Onde me encontrar:** vem de `SOCIAL_LINKS`; edite lá.
- **Privacidade:** o texto sobre o GoatCounter. Mantenha-o se continuar usando estatísticas.
- **Descrição para buscadores:** o atributo `description` do `<BaseLayout>`, no início do arquivo.

### Agora (`/agora`)

Uma nota curta sobre o que você está fazendo no momento (a ideia vem de [nownownow.com](https://nownownow.com/about)). Os dados ficam em [`src/data/agora.ts`](../src/data/agora.ts) e aparecem em três lugares: na página `/agora`, na barra lateral (desktop) e num quadro no fim da página inicial (celular).

Exemplo preenchido (o arquivo atual ainda tem textos provisórios entre colchetes):

```ts
export const AGORA = {
  // Noon in Brasília, so the month shown doesn't depend on the time zone.
  atualizadoEm: new Date('2026-09-01T12:00:00-03:00'),
  itens: [
    { rotulo: 'construindo', texto: 'O novo layout deste site.' },
    { rotulo: 'lendo', texto: 'Designing Data-Intensive Applications.' },
    { rotulo: 'rotina', texto: 'Corrida às terças e quintas.' },
  ],
};
```

Para atualizar:

1. Mude os `texto` e, se quiser, os `rotulo` (o rótulo é a palavra em destaque à esquerda). Pode ter quantos itens quiser; na barra lateral, poucos itens curtos funcionam melhor.
2. Mude a data em `atualizadoEm` para o dia da atualização, **mantendo `T12:00:00-03:00`**. Só o mês e o ano aparecem ("setembro 2026"). O meio-dia evita que a data caia no mês anterior por causa do fuso.

### Projetos (`/projetos`)

Os projetos ficam em [`src/data/projects.ts`](../src/data/projects.ts). Cada um vira um cartão:

```ts
{
  name: 'diegochav.es',
  description: 'Este site: portfólio e blog estático, escrito em Markdown.',
  href: 'https://github.com/diegochaves/diegochaves.github.io',
  stack: ['astro', 'tailwind', 'actions'],
  featured: true,
},
```

| Campo | Obrigatório | Para que serve |
|---|---|---|
| `name` | sim | Título do cartão. Também nomeia o clique no GoatCounter: `projeto/<name>` |
| `description` | sim | Uma ou duas frases |
| `href` | sim | Link do cartão (repositório, site, demo). Links `https://…` abrem em outra aba |
| `stack` | sim | Tecnologias, exibidas como etiquetas. Pode ser `[]` |
| `featured` | não | `true` para mostrar na página inicial (no máximo 3) |

A ordem na página é a ordem da lista. Para adicionar um projeto, copie um bloco `{ … },` e altere os campos.

### Blog e categorias (`/blog`)

Os posts são escritos em Markdown; veja [publicar-posts.md](publicar-posts.md). As páginas de listagem não precisam de edição:

- `/blog` ([`src/pages/blog/index.astro`](../src/pages/blog/index.astro)): todos os posts, agrupados por mês. O título "Todos os escritos" está no próprio arquivo.
- `/blog/categoria/<categoria>/`: gerada automaticamente para cada item de `CATEGORIES`, com o título e o subtítulo de `CATEGORY_INFO`.

## Receitas

### Adicionar uma categoria

Exemplo: uma categoria `livros`.

1. Em [`src/consts.ts`](../src/consts.ts), inclua-a em `CATEGORIES` e em `CATEGORY_INFO`:

   ```ts
   export const CATEGORIES = ['dev', 'carreira', 'curiosidades', 'pessoal', 'livros'] as const;
   …
   livros: { label: 'Livros', description: 'Notas de leitura.' },
   ```

2. Em [`src/styles/global.css`](../src/styles/global.css), dê cores à etiqueta. São três lugares:

   ```css
   :root {              /* modo claro */
     --cat-livros-bg: #efe8dc;
     --cat-livros-fg: #6b5634;
   }
   .dark {              /* modo escuro */
     --cat-livros-bg: #332c22;
     --cat-livros-fg: #e0cba8;
   }
   /* dentro de @layer components, junto das outras .badge-* */
   .badge-livros { --badge-bg: var(--cat-livros-bg); --badge-fg: var(--cat-livros-fg); }
   ```

   Sem este passo, a etiqueta aparece sem cor.

3. Rode `npm run build`. A página `/blog/categoria/livros/` e a opção no filtro de categorias são criadas sozinhas.

Para **renomear ou remover** uma categoria, altere também o `category:` dos posts que a usam; senão o build falha, indicando qual post.

### Adicionar um item ao menu

1. Crie a página em `src/pages/`. O nome do arquivo vira a URL: `src/pages/palestras.astro` → `/palestras`. Uma página simples pode copiar a estrutura de [`src/pages/projetos.astro`](../src/pages/projetos.astro):

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---

   <BaseLayout title="Palestras" description="Palestras de Diego Chaves.">
     <p class="font-mono text-xs text-accent sm:text-[13px]">palestras</p>
     <h1 class="mt-3 text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[40px] sm:leading-[1.15]">Palestras</h1>
     <div class="prose-blog mt-8 max-w-[720px]">
       <p>Conteúdo.</p>
     </div>
   </BaseLayout>
   ```

2. Adicione o item em `NAV_LINKS`, na posição desejada: `{ href: '/palestras', label: 'Palestras' }`.

### Adicionar ou trocar uma rede social

Edite `SOCIAL_LINKS` em [`src/consts.ts`](../src/consts.ts). Por exemplo, para Bluesky:

```ts
{ href: 'https://bsky.app/profile/diegochav.es', label: 'bluesky', name: 'Bluesky' },
```

A ordem da lista é a ordem de exibição. O link passa a aparecer na barra lateral, no rodapé do celular e na página Sobre, e os cliques são contados como `social/bluesky`.

## O que fica fora do `consts.ts`

Alguns dados pessoais estão direto nos componentes. Para trocá-los, edite os arquivos abaixo:

| O quê | Onde |
|---|---|
| Iniciais **DC** do avatar | [`Sidebar.astro`](../src/components/Sidebar.astro) (barra lateral), [`BaseLayout.astro`](../src/layouts/BaseLayout.astro) (topo no celular), [`PostLayout.astro`](../src/layouts/PostLayout.astro) (barra lateral dos posts) |
| Usuário do X/Twitter para os cartões de compartilhamento (`@diegochaves`) | `twitter:site` e `twitter:creator` em [`BaseLayout.astro`](../src/layouts/BaseLayout.astro) |
| Título da página inicial | [`src/pages/index.astro`](../src/pages/index.astro) |
| Texto e stack da página Sobre | [`src/pages/sobre.astro`](../src/pages/sobre.astro) |
| Rodapé ("feito com Astro · hospedado no GitHub Pages") | [`Footer.astro`](../src/components/Footer.astro) |
| Ícone da aba | [`public/favicon.svg`](../public/favicon.svg) |
| Cores (claro e escuro) e fontes (Geist, Geist Mono) | Variáveis no início de [`src/styles/global.css`](../src/styles/global.css) |
| Tema de cores dos blocos de código (`everforest-dark`) | `shikiConfig.theme` em [`astro.config.mjs`](../astro.config.mjs). Temas disponíveis: [shiki.style/themes](https://shiki.style/themes) |
| Domínio | [`public/CNAME`](../public/CNAME) e `site` em [`astro.config.mjs`](../astro.config.mjs) |

## Estatísticas (GoatCounter)

O site usa o [GoatCounter](https://www.goatcounter.com), que conta visitas sem cookies e sem identificar visitantes. O painel fica em [diegochaves.goatcounter.com](https://diegochaves.goatcounter.com).

- O script só é incluído em produção (`npm run build`). O `npm run dev` não conta visitas.
- Para não contar as suas próprias visitas, abra `https://diegochav.es/#toggle-goatcounter` uma vez em cada navegador.
- Para trocar de conta, altere `GOATCOUNTER_ENDPOINT` em `src/consts.ts`.

Além das visitas, estes cliques são contados como eventos:

| Clique | Evento |
|---|---|
| Redes sociais (barra lateral, rodapé do celular, página Sobre) | `social/<label>`, ex. `social/github` |
| Link do RSS | `rss` |
| Cartão de projeto | `projeto/<name>` |
| Botão "copiar" de um bloco de código | `copiar-codigo/blog/<slug>/` |
