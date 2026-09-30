# diegochav.es

Portfólio e blog pessoal de Diego Chaves: o que construo, os problemas que deram trabalho e um pouco da rotina.

O site é estático, feito com [Astro](https://astro.build), e é publicado no GitHub Pages em [diegochav.es](https://diegochav.es). Os posts são arquivos Markdown neste repositório.

## Guias

| Quero… | Leia |
|---|---|
| Escrever e publicar um post | [docs/publicar-posts.md](docs/publicar-posts.md) |
| Mudar meus dados, o menu, as redes sociais, as páginas Sobre, Agora ou Projetos | [docs/editar-o-site.md](docs/editar-o-site.md) |
| Ver o que mudou no site ao longo do tempo | [CHANGELOG.md](CHANGELOG.md) |

## Stack

- **[Astro 7](https://astro.build)**: gera o site estático. Os posts são uma [Content Collection](https://docs.astro.build/en/guides/content-collections/).
- **[Tailwind CSS 4](https://tailwindcss.com)**: estilos. Configurado no próprio CSS (`src/styles/global.css`), sem `tailwind.config`.
- **GitHub Pages + GitHub Actions**: build e publicação automáticos a cada push para `master`.
- **[GoatCounter](https://www.goatcounter.com)**: estatísticas de visitas, sem cookies. Só é carregado em produção.
- **RSS** (`/rss.xml`) e **sitemap** (`/sitemap-index.xml`), gerados no build.

## Rodar localmente

Requer **Node 22.12 ou superior**.

```bash
npm install
npm run dev       # servidor local em http://localhost:4321, com recarregamento automático
npm run build     # gera o site final em dist/
npm run preview   # serve o dist/ para conferir o build
```

## Estrutura

```
src/
├── consts.ts             ← dados do site: nome, cargo, bio, menu, redes sociais, categorias
├── content.config.ts     ← regras dos posts: nome do arquivo e campos do frontmatter
├── content/blog/         ← os posts (YYYY-MM-DD-HHmm-slug.md)
├── data/
│   ├── agora.ts          ← conteúdo da página /agora
│   └── projects.ts       ← lista de projetos (/projetos)
├── pages/                ← uma página por arquivo; o caminho vira a URL
│   ├── index.astro       ← início
│   ├── sobre.astro       ← /sobre (texto e stack ficam aqui)
│   ├── agora.astro       ← /agora
│   ├── projetos.astro    ← /projetos
│   ├── blog/             ← /blog, /blog/<slug>/ e /blog/categoria/<categoria>/
│   ├── rss.xml.js        ← feed RSS
│   └── 404.astro
├── components/           ← barra lateral, lista de posts, cartões, etc.
├── layouts/              ← BaseLayout (todas as páginas) e PostLayout (página de post)
├── styles/global.css     ← cores, fontes e estilos do texto dos posts
└── utils/posts.ts        ← busca de posts e formatação de datas
public/                   ← arquivos servidos do jeito que estão (CNAME, favicon, imagens)
```

## Publicação

Cada push para `master` roda o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): instala as dependências, faz o build e publica o `dist/` no GitHub Pages. Também dá para rodar manualmente em **Actions → Deploy to GitHub Pages → Run workflow**.

- O domínio vem de [`public/CNAME`](public/CNAME) (`diegochav.es`).
- Em **Settings → Pages**, a opção **Source** precisa estar em **GitHub Actions**.
- Um erro no build (por exemplo, um post com nome ou frontmatter inválido) faz o deploy falhar, e o site continua na versão anterior.
