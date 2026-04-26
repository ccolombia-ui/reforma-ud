/**
 * MDXContent — drop-in renderer.
 *
 * Velite ahora compila el body como HTML string (markdown puro con remark+rehype +
 * obsidian-callouts + wikilinks + KaTeX + Mermaid). Lo renderizamos via
 * `dangerouslySetInnerHTML` cuando no necesitamos interceptar elementos.
 *
 * Para hover-preview de wikilinks, ver `mdx-with-hover-preview.tsx` que usa
 * html-react-parser para convertir HTML → React y reemplazar `<a class="wikilink">`
 * con `<WikiLinkPreview>`.
 */

export function MDXContent({ code }: Readonly<{ code: string }>) {
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
