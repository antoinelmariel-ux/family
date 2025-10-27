import { marked } from 'https://esm.sh/marked@9.1.6?target=es2019&dev=false';

marked.setOptions({
  breaks: true,
  gfm: true
});

export function renderMarkdown(md) {
  return marked.parse(md);
}
