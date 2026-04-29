/**
 * selector-rol-jtbd.test.tsx · v8 S6
 *
 * SelectorRolJTBD usa useSearchParams/useRouter — hooks solo disponibles
 * en runtime Next.js. Testeamos la lógica del componente via el renderDvBlock
 * mock + verificamos que el barrel lo exporta correctamente.
 *
 * Los 6 roles JTBD se verifican con un test de smoke en el renderDvBlock.
 */

import { describe, it, expect, vi } from 'vitest';

// Mock Next.js navigation (no disponible en node env)
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/glosario/con-test',
}));

vi.mock('#site/content', () => ({
  canonicPaper: [], community: [], concepto: [], note: [],
}));
vi.mock('@/components/biblioteca/wikilink-preview', () => ({
  WikiLinkPreview: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));
vi.mock('@/components/biblioteca/apa-cite', () => ({
  ApaCite: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

import { renderToString } from 'react-dom/server';
import { renderDvBlock } from './concepto-parser-options';

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

describe('SelectorRolJTBD · vía renderDvBlock', () => {
  it('"selector-rol" → renderiza un <select> con los 6 roles', () => {
    const html = renderToString(renderDvBlock('selector-rol', EMPTY_DATA));
    expect(html).toContain('<select');
    expect(html).toContain('estudiante-soberano');
    expect(html).toContain('docente-disenador');
    expect(html).toContain('docente-director');
    expect((html.match(/<option/g) ?? []).length).toBe(6);
  });

  it('"selector-rol" → tiene aria-label para a11y', () => {
    const html = renderToString(renderDvBlock('selector-rol', EMPTY_DATA));
    expect(html).toContain('aria-label');
  });

  it('"vista-por-rol" con vistas vacías → mensaje informativo', () => {
    const html = renderToString(renderDvBlock('vista-por-rol', EMPTY_DATA));
    expect(html).toContain('Vistas por rol no declaradas');
  });
});
