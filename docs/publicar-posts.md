# Publicar posts

Cada post é um arquivo Markdown (`.md`) em [`src/content/blog/`](../src/content/blog/). Não há painel nem base de dados: escrever um post é criar um arquivo, e publicá-lo é fazer push para `master`.

## Passo a passo

1. **Crie o arquivo** em `src/content/blog/`, com a data e hora de publicação no nome:

   ```
   src/content/blog/2026-10-02-0930-cache-no-github-actions.md
   ```

2. **Escreva o frontmatter e o texto.** Você pode partir do [modelo](#modelo) no fim desta página.

3. **Veja o resultado** com `npm run dev` e abra `http://localhost:4321/blog/cache-no-github-actions/`. A página atualiza sozinha a cada salvamento.

4. **Publique:** faça commit e push para `master`, diretamente ou através de um PR. O GitHub Actions faz o build e o post fica no ar em poucos minutos.

   ```bash
   git add src/content/blog/2026-10-02-0930-cache-no-github-actions.md
   git commit -m "Post: cache no GitHub Actions"
   git push
   ```

## Nome do arquivo

```
YYYY-MM-DD-HHmm-slug.md
```

| Parte | Exemplo | Para que serve |
|---|---|---|
| `YYYY-MM-DD` | `2026-10-02` | Data de publicação |
| `HHmm` | `0930` | Hora de publicação, em 24 h, **no horário de Brasília** |
| `slug` | `cache-no-github-actions` | O endereço do post: `/blog/cache-no-github-actions/` |

- **A data vem só do nome.** Não existe campo `date` no frontmatter. É ela que ordena os posts no site e no RSS, e o prefixo também deixa a pasta em ordem cronológica.
- **O slug** usa letras minúsculas, números e hífens, sem acentos nem espaços. Precisa ser único entre todos os posts.
- **Não mude o slug de um post já publicado.** O endereço antigo deixa de funcionar (links compartilhados passam a dar 404) e, no GoatCounter, as visitas passam a ser contadas em outra página.
- Mudar só a data ou a hora no nome é seguro: a URL não muda e o post é reordenado.
- **Um nome fora do formato faz o build falhar** com a mensagem `Nome de post inválido: "…". Use YYYY-MM-DD-HHmm-slug.md`. O site continua na versão anterior até o nome ser corrigido.

## Frontmatter

É o bloco entre `---` no topo do arquivo. Os campos são validados no build (regras em [`src/content.config.ts`](../src/content.config.ts)), e um campo faltando ou com valor inválido faz o build falhar com uma mensagem indicando qual é.

| Campo | Obrigatório | O que é | Onde aparece |
|---|---|---|---|
| `title` | sim | Título do post | Listagens, topo do post, título da aba, RSS |
| `description` | sim | Resumo de 1 ou 2 frases | Listagens (só em telas médias ou maiores), subtítulo do post, pré-visualização em redes sociais e buscadores, RSS |
| `category` | sim | Uma de `dev`, `carreira`, `curiosidades`, `pessoal` | Etiqueta colorida no post e nas listagens; decide em que página de categoria o post entra |
| `tags` | não | Lista de palavras-chave, ex. `[astro, ci]` | Barra lateral do post, como `#tag` (ainda não há página por tag) |
| `draft` | não | `true` para rascunho (o padrão é `false`) | Veja [Rascunhos](#rascunhos) |
| `resumo` | não | Quadro "problema / o que complicou / como resolvi" | Veja [Resumo](#resumo-posts-de-problema-e-solução) |

As categorias estão definidas em [`src/consts.ts`](../src/consts.ts). Para criar uma nova, veja [editar-o-site.md](editar-o-site.md#adicionar-uma-categoria).

### Resumo (posts de problema e solução)

Para posts do tipo "como resolvi X", o campo `resumo` mostra um quadro antes do texto, e o índice do post ganha a entrada "Resumo":

```yaml
resumo:
  problema: "O build do Actions demorava 6 minutos."
  complicou: "O cache do npm era invalidado a cada push."   # opcional
  solucao: "Cachear pelo hash do package-lock.json."
```

`problema` e `solucao` são obrigatórios quando se usa `resumo`; `complicou` é opcional.

## Escrever o texto

Markdown normal. Algumas convenções têm efeito no site:

- **Títulos de seção com `##`.** Cada `##` entra no índice "neste post", na barra lateral do post, que só aparece quando há 2 ou mais entradas. Use `###` para subseções (estas não entram no índice). Não use `#`: o título do post já vem do `title`.
- **Blocos de código com a linguagem indicada** (```` ```ts ````, ```` ```bash ````…). A linguagem aparece numa barra acima do bloco, com um botão "copiar", e é usada no realce de sintaxe (tema `everforest-dark`).
- **Imagens** vão para `public/`, por exemplo `public/images/2026/cache-actions.png`, e são referenciadas a partir da raiz do site:

  ```md
  ![Descrição da imagem para leitores de tela](/images/2026/cache-actions.png)
  ```

- **Citações** (`>`) aparecem como um quadro destacado.
- **Links externos** usam a sintaxe normal: `[texto](https://…)`.

## O que o site faz sozinho

Você não precisa fazer nada para ter:

- **Tempo de leitura**, calculado a partir do texto (cerca de 200 palavras por minuto).
- **Listagens:** o post entra na página inicial (os 8 mais recentes), em `/blog` e na página da categoria. Em todas, os posts são agrupados por mês.
- **"Continue lendo"**, no fim do post: mais 2 posts, primeiro os da mesma categoria.
- **RSS** (`/rss.xml`) e **sitemap**.
- **Estatísticas** no GoatCounter: visitas à página e cliques no botão "copiar" dos blocos de código.

## Rascunhos

Com `draft: true`, o post não é publicado: não gera página, não aparece em nenhuma listagem nem no RSS. Isso vale também no `npm run dev`. Para pré-visualizar um rascunho, mude temporariamente para `draft: false` e não faça commit dessa alteração.

Um rascunho pode ficar no repositório sem problema. Para publicá-lo, remova a linha `draft` (ou mude para `false`) e **atualize a data e hora no nome do arquivo** para o momento da publicação.

## Modelo

`src/content/blog/2026-10-02-0930-meu-post.md`:

````md
---
title: "Título do post"
description: "Uma ou duas frases sobre o que o leitor vai encontrar."
category: dev
tags: [astro, github-actions]
# draft: true
# resumo:
#   problema: "..."
#   complicou: "..."
#   solucao: "..."
---

Parágrafo de abertura.

## Primeira seção

Texto.

```bash
npm run build
```

## Segunda seção

Texto.
````
