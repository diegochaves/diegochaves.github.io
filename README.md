# diegochav.es

Portfólio e blog pessoal, feito com [Astro](https://astro.build) e publicado no GitHub Pages.

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
- O `slug` é o que aparece na URL e tem de ser único. Depois de publicado, não o mude: quebra links já partilhados e divide as estatísticas do post no GoatCounter.
- Um nome fora deste formato faz o build falhar.

Frontmatter:

```yaml
---
title: "Título do post"
description: "Resumo curto, usado nas listagens e no RSS."
category: dev            # dev | carreira | curiosidades | pessoal (src/consts.ts)
tags: [astro, tailwind]  # opcional
draft: true              # opcional; rascunhos não são publicados
resumo:                  # opcional; quadro "problema / como resolvi" no topo do post
  problema: "..."
  complicou: "..."       # opcional
  solucao: "..."
---
```
