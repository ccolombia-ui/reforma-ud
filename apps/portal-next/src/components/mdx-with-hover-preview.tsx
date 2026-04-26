'use client';

import parse, { domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';

/**
 * MDXWithHoverPreview — drop-in para MDXContent que activa hover-preview en wikilinks.
 *
 * Velite output ahora es HTML string (markdown puro). Usamos html-react-parser para
 * convertir a React y, en el proceso, reemplazamos `<a class="wikilink">` por
 * `<WikiLinkPreview>` que monta el HoverCard con preview MDX del destino.
 *
 * Cualquier otro elemento se renderiza tal cual (KaTeX, callouts, tablas, etc.).
 */

const options: HTMLReactParserOptions = {
  replace: (node) => {
    if (!(node instanceof Element)) return undefined;
    if (node.name !== 'a') return undefined;
    const className = (node.attribs?.class ?? '') + (node.attribs?.className ?? '');
    if (!className.includes('wikilink')) return undefined;
    const href = node.attribs?.href;
    if (typeof href !== 'string') return undefined;
    return (
      <WikiLinkPreview href={href} className={className}>
        {domToReact(node.children as DOMNode[], options)}
      </WikiLinkPreview>
    );
  },
};

export function MDXWithHoverPreview({ code }: Readonly<{ code: string }>) {
  return <>{parse(code, options)}</>;
}
