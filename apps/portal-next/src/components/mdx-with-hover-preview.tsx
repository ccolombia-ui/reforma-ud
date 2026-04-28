'use client';

import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { useMemo } from 'react';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';
import { ApaCite } from '@/components/biblioteca/apa-cite';
import { wrapHeadingsInCollapsibles } from '@/lib/collapsible-headings';

/**
 * MDXWithHoverPreview — drop-in para MDXContent que activa hover-preview en:
 *   • Wikilinks Obsidian-style: <a class="wikilink"> → <WikiLinkPreview>
 *   • Citas APA Pandoc-style:    <a class="apa-cite"> → <ApaCite>  (v4.5c D5)
 *
 * Velite output es HTML string (markdown puro). Usamos html-react-parser para
 * convertir a React e interceptamos esos anchors específicos.
 *
 * v7.9 · Bug atrapado por TDD: `node instanceof Element` falla en bundles de
 * producción cuando html-react-parser y el código consumidor tienen copias
 * diferentes de la clase Element. Resultado: callback skipped, wikilinks
 * renderizan como <a> plano sin HoverCard. Fix: duck-typing con node.type.
 */

interface DomElementShape {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: DOMNode[];
}

const options: HTMLReactParserOptions = {
  replace: (node) => {
    const el = node as unknown as DomElementShape;
    if (el.type !== 'tag' || el.name !== 'a') return undefined;
    const className = (el.attribs?.class ?? '') + (el.attribs?.className ?? '');
    // v4.5c D5 — APA citation interceptor
    if (className.includes('apa-cite')) {
      const citeKey = el.attribs?.['data-cite-key'];
      if (typeof citeKey !== 'string') return undefined;
      return (
        <ApaCite citeKey={citeKey} className={className}>
          {domToReact(el.children ?? [], options)}
        </ApaCite>
      );
    }
    if (!className.includes('wikilink')) return undefined;
    const href = el.attribs?.href;
    if (typeof href !== 'string') return undefined;
    return (
      <WikiLinkPreview href={href} className={className}>
        {domToReact((el.children ?? []) as DOMNode[], options)}
      </WikiLinkPreview>
    );
  },
};

export function MDXWithHoverPreview({ code, collapsible = false }: Readonly<{ code: string; collapsible?: boolean }>) {
  // v7.9 · collapsible default OFF — wrapHeadingsInCollapsibles (regex-based)
  // corrompía SVG inline (Mermaid) inyectando </div></details> como valor de
  // atributos SVG (`<line y1="...">`, `<path d="...">`). Eso rompía hidratación
  // y la HoverCard de Radix nunca se abría aunque el wrapper estuviera presente.
  // Re-activable por consumer si en algún caso el body NO tiene Mermaid.
  const transformed = useMemo(() => {
    if (!collapsible) return code;
    try {
      return wrapHeadingsInCollapsibles(code);
    } catch {
      return code;
    }
  }, [code, collapsible]);
  try {
    return <>{parse(transformed, options)}</>;
  } catch {
    return <>{parse(code, options)}</>;
  }
}
