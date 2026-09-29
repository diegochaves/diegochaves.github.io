# diegochav.es

Blog pessoal, feito com [Astro](https://astro.build) e publicado no GitHub Pages.

## Desenvolvimento

Requer Node 22.12 ou superior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o site em dist/
```

Cada push para `master` publica o site automaticamente (`.github/workflows/deploy.yml`).

## Como publicar um post

Crie um ficheiro em `src/content/blog/` com o nome:

```
YYYY-MM-DD-HHmm-slug.md
```

Exemplo: `2026-09-29-1430-tailwind-4.md` é publicado em `/blog/tailwind-4/`.

- O prefixo é a data e hora de publicação, no horário de Brasília. É ele que ordena os posts; não coloque `date` no frontmatter.
- O `slug` é o que aparece na URL. Dois posts não podem ter o mesmo slug.
- Um nome fora deste formato faz o build falhar.

Frontmatter:

```yaml
---
title: "Título do post"
description: "Resumo curto, usado na listagem e no RSS."
category: dev            # dev | carreira | curiosidades | pessoal
tags: [astro, tailwind]  # opcional
draft: true              # opcional; posts em rascunho não são publicados
---
```
