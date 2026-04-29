/**
 * concepto-parser-options.test.tsx · v8 S3
 *
 * Verifica que createConceptoParserOptions es un superset de MDXWithHoverPreview:
 *   1. Sin sentinels → wikilinks y apa-cite siguen interceptándose
 *   2. Con sentinels → data-dv="X" redirige al componente correcto
 *   3. data-dv desconocido → ObsidianOnlyBlock (fallback)
 *
 * Estrategia: parse(html, options) → renderToString(result) para verificar
 * la salida HTML final sin necesitar jsdom.
 */

import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import parse from 'html-react-parser';
import type { ReactElement } from 'react';

// #site/content (velite) no existe en test env — mock antes de cualquier import
vi.mock('#site/content', () => ({
  canonicPaper: [], community: [], concepto: [], note: [],
  vocabularioRelaciones: [],
}));
// Componentes que dependen de contexto Next.js — stub mínimos
vi.mock('@/components/biblioteca/wikilink-preview', () => ({
  WikiLinkPreview: ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a className="wikilink-stub" href={href}>{children}</a>,
}));
vi.mock('@/components/biblioteca/apa-cite', () => ({
  ApaCite: ({ children, citeKey }: { children: React.ReactNode; citeKey: string }) =>
    <span className="apa-stub" data-cite-key={citeKey}>{children}</span>,
}));

import { renderDvBlock, createConceptoParserOptions } from './concepto-parser-options';

const EMPTY_DATA = {
  id: 'con-test',
  concepto_capabilities: [],
  concepto_prerequisitos: [],
  concepto_definitional_anchors: [],
  tupla__relations: [],
  assumptions: [],
  breaks_at: [],
  cited_in: [],
  cited_count: 0,
  habilita: [],
};

const DATA_WITH_PREREQS = {
  ...EMPTY_DATA,
  concepto_prerequisitos: ['[[con-x]]', '[[con-y]]'],
};

// ── renderDvBlock ─────────────────────────────────────────────────────────

describe('renderDvBlock · mapeo data-dv → componente', () => {
  it('"prereqs" → DvPrereqs con los prereqs del data', () => {
    const html = renderToString(renderDvBlock('prereqs', DATA_WITH_PREREQS));
    expect(html).toContain('href="/glosario/con-x"');
    expect(html).toContain('href="/glosario/con-y"');
  });

  it('"facet-normative" → DvFacetNormative (sin facet → mensaje vacío)', () => {
    const html = renderToString(renderDvBlock('facet-normative', EMPTY_DATA));
    expect(html).toContain('sin facet normative declarado');
  });

  it('"cited-in" → DvCitedIn', () => {
    const data = { ...EMPTY_DATA, cited_in: ['[[sec-MI12-00]]'], cited_count: 1 };
    const html = renderToString(renderDvBlock('cited-in', data));
    expect(html).toContain('Total citaciones: 1');
  });

  it('"habilita" → DvHabilita', () => {
    const data = { ...EMPTY_DATA, habilita: ['con-cca', 'con-omt'] };
    const html = renderToString(renderDvBlock('habilita', data));
    expect(html).toContain('href="/glosario/con-cca"');
  });

  it('"regimen-epistemico" → DvRegimenEpistemico', () => {
    const data = {
      ...EMPTY_DATA,
      applicable_domain: 'Universidad pública',
      assumptions: ['Autonomía garantizada'],
      breaks_at: [],
    };
    const html = renderToString(renderDvBlock('regimen-epistemico', data));
    expect(html).toContain('Universidad pública');
  });

  it('nombre desconocido → DvObsidianOnlyBlock (fallback)', () => {
    const html = renderToString(renderDvBlock('patron-inexistente', EMPTY_DATA));
    expect(html).toContain('Vista interactiva disponible en Obsidian');
    expect(html).toContain('role="note"');
  });
});

// ── createConceptoParserOptions ───────────────────────────────────────────

describe('createConceptoParserOptions · superset de MDXWithHoverPreview', () => {
  it('HTML sin sentinels pasa sin modificación (a-tags planos)', () => {
    const options = createConceptoParserOptions(EMPTY_DATA);
    const result = parse('<p>Texto simple sin links</p>', options);
    const html = renderToString(result as ReactElement);
    expect(html).toContain('Texto simple sin links');
  });

  it('<div data-dv="prereqs"> → renderiza DvPrereqs', () => {
    const options = createConceptoParserOptions(DATA_WITH_PREREQS);
    const result = parse('<div class="dv-block" data-dv="prereqs"></div>', options);
    const html = renderToString(result as ReactElement);
    expect(html).toContain('href="/glosario/con-x"');
    expect(html).toContain('href="/glosario/con-y"');
  });

  it('<span data-dv="..."> también funciona (inline sentinel)', () => {
    const options = createConceptoParserOptions(EMPTY_DATA);
    const result = parse('<span data-dv="obsidian-only"></span>', options);
    const html = renderToString(result as ReactElement);
    expect(html).toContain('Vista interactiva disponible en Obsidian');
  });

  it('<div data-dv="unknown"> → ObsidianOnlyBlock fallback', () => {
    const options = createConceptoParserOptions(EMPTY_DATA);
    const result = parse('<div data-dv="patron-que-no-existe"></div>', options);
    const html = renderToString(result as ReactElement);
    expect(html).toContain('Vista interactiva disponible en Obsidian');
  });

  it('HTML mixto: sentinel + texto preservado', () => {
    const options = createConceptoParserOptions(EMPTY_DATA);
    const result = parse(
      '<p>Antes</p><div data-dv="obsidian-only"></div><p>Después</p>',
      options
    );
    const html = renderToString(result as ReactElement);
    expect(html).toContain('Antes');
    expect(html).toContain('Vista interactiva');
    expect(html).toContain('Después');
  });

  it('sin data-dv no toca <div> normales', () => {
    const options = createConceptoParserOptions(EMPTY_DATA);
    const result = parse('<div class="normal">contenido</div>', options);
    const html = renderToString(result as ReactElement);
    expect(html).toContain('contenido');
    expect(html).not.toContain('Vista interactiva');
  });
});
