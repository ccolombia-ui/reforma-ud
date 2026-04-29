/**
 * concepto-parser-options.tsx
 * v8 S3 · 2026-04-28 · CC BY-SA 4.0
 *
 * Pure function: createConceptoParserOptions(data) → HTMLReactParserOptions
 *
 * Produce las opciones de html-react-parser para ConceptoBodyClient.
 * Es un SUPERSET de las opciones de MDXWithHoverPreview:
 *   1. Wikilinks   → <WikiLinkPreview>   (misma lógica de MDXWithHoverPreview)
 *   2. APA-cite    → <ApaCite>           (misma lógica de MDXWithHoverPreview)
 *   3. data-dv="X" → <DvXXX>            (nuevo en v8 S3)
 *
 * Separada del componente cliente para poder testarla en node (renderToString).
 */

import { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { WikiLinkPreview } from '@/components/biblioteca/wikilink-preview';
import { ApaCite } from '@/components/biblioteca/apa-cite';
import {
  DvFacetNormative,
  DvPrereqs,
  DvHabilita,
  DvMandatos,
  DvEvolucion,
  DvRelations,
  DvVistaPorRol,
  DvCitedIn,
  DvRegimenEpistemico,
  DvObsidianOnlyBlock,
} from './index';
import type { ConceptoTPLData } from './types';

interface DomElementShape {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: DOMNode[];
}

/** Mapea data-dv="X" al componente React correspondiente. */
export function renderDvBlock(dvName: string, data: ConceptoTPLData): React.ReactElement {
  switch (dvName) {
    case 'facet-normative':
      return <DvFacetNormative facet={data.concepto_facet_normative} />;
    case 'prereqs':
      return <DvPrereqs prereqs={data.concepto_prerequisitos} />;
    case 'habilita':
      return <DvHabilita habilita={data.habilita} />;
    case 'mandatos':
      return <DvMandatos relations={data.tupla__relations} />;
    case 'evolucion':
      return (
        <DvEvolucion
          anchors={data.concepto_definitional_anchors}
          currentAnchor={data.concepto_current_anchor}
          chainStatus={data.concepto_anchor_chain_status}
          validFrom={data.valid_from}
          validTo={data.valid_to}
        />
      );
    case 'relations':
      return <DvRelations relations={data.tupla__relations} />;
    case 'vista-por-rol':
      return (
        <DvVistaPorRol
          // vistas se poblará cuando S5 active el transformer.
          // Hasta entonces, muestra mensaje vacío.
          vistas={{}}
          rol={data.rol_seleccionado}
        />
      );
    case 'cited-in':
      return <DvCitedIn cited_in={data.cited_in} cited_count={data.cited_count} />;
    case 'regimen-epistemico':
      return (
        <DvRegimenEpistemico
          applicable_domain={data.applicable_domain}
          assumptions={data.assumptions}
          breaks_at={data.breaks_at}
        />
      );
    default:
      return <DvObsidianOnlyBlock />;
  }
}

/** Crea opciones html-react-parser para ConceptoBodyClient. */
export function createConceptoParserOptions(data: ConceptoTPLData): HTMLReactParserOptions {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      const el = node as unknown as DomElementShape;
      if (el.type !== 'tag') return undefined;

      // ── data-dv sentinels (v8 S3) ─────────────────────────────────────
      if (
        (el.name === 'div' || el.name === 'span') &&
        el.attribs?.['data-dv']
      ) {
        return renderDvBlock(el.attribs['data-dv'], data);
      }

      // ── Wikilinks + APA-cite (igual que MDXWithHoverPreview) ──────────
      if (el.name !== 'a') return undefined;

      const className = (el.attribs?.class ?? '') + (el.attribs?.className ?? '');

      if (className.includes('apa-cite')) {
        const citeKey = el.attribs?.['data-cite-key'];
        if (typeof citeKey !== 'string') return undefined;
        return (
          <ApaCite citeKey={citeKey} className={className}>
            {domToReact(el.children ?? [], options)}
          </ApaCite>
        );
      }

      if (className.includes('wikilink')) {
        const href = el.attribs?.href;
        if (typeof href !== 'string') return undefined;
        return (
          <WikiLinkPreview href={href} className={className}>
            {domToReact((el.children ?? []) as DOMNode[], options)}
          </WikiLinkPreview>
        );
      }

      return undefined;
    },
  };
  return options;
}
