'use client';

import parse, { domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';
import { ApaCite } from '@/components/biblioteca/apa-cite';

/**
 * MDXWithHoverPreview — drop-in para MDXContent que activa hover-preview en:
 *   • Wikilinks Obsidian-style: <a class="wikilink"> → <WikiLinkPreview>
 *   • Citas APA Pandoc-style:    <a class="apa-cite"> → <ApaCite>  (v4.5c D5)
 *
 * Velite output es HTML string (markdown puro). Usamos html-react-parser para
 * convertir a React e interceptamos esos anchors específicos.
 */

const options: HTMLReactParserOptions = {
  replace: (node) => {
    if (!(node instanceof Element)) return undefined;
    if (node.name !== 'a') return undefined;
    const className = (node.attribs?.class ?? '') + (node.attribs?.className ?? '');
    // v4.5c D5 — APA citation interceptor
    if (className.includes('apa-cite')) {
      const citeKey = node.attribs?.['data-cite-key'];
      if (typeof citeKey !== 'string') return undefined;
      return (
        <ApaCite citeKey={citeKey} className={className}>
          {domToReact(node.children as DOMNode[], options)}
        </ApaCite>
      );
    }
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
