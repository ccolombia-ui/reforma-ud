import { describe, it, expect } from 'vitest';
import {
  isPublished,
  filterPublished,
  buildPublishedConceptIds,
  isConceptVisible,
  type PaperLifecycle,
} from './show-drafts';

// Fixtures
const makePaper = (kd_status: PaperLifecycle, glosario: string[] = []) => ({
  kd_status,
  draft: kd_status !== 'PUBLISHED' && kd_status !== 'DEPRECATED',
  relations: { custom: { glosario } },
});

describe('isPublished', () => {
  it('PUBLISHED → true', () => expect(isPublished(makePaper('PUBLISHED'))).toBe(true));
  it('DEPRECATED → true (visible con aviso)', () => expect(isPublished(makePaper('DEPRECATED'))).toBe(true));
  it('DRAFT → false', () => expect(isPublished(makePaper('DRAFT'))).toBe(false));
  it('IN_REVIEW → false', () => expect(isPublished(makePaper('IN_REVIEW'))).toBe(false));

  it('sin kd_status usa draft boolean como fallback', () => {
    expect(isPublished({ draft: false })).toBe(true);
    expect(isPublished({ draft: true })).toBe(false);
    expect(isPublished({})).toBe(true); // sin ninguno → visible (backward compat)
  });
});

describe('filterPublished', () => {
  const papers = [
    makePaper('PUBLISHED'),
    makePaper('DRAFT'),
    makePaper('IN_REVIEW'),
    makePaper('DEPRECATED'),
  ];

  it('retorna solo PUBLISHED y DEPRECATED', () => {
    const result = filterPublished(papers);
    expect(result).toHaveLength(2);
    expect(result.every(p => p.kd_status === 'PUBLISHED' || p.kd_status === 'DEPRECATED')).toBe(true);
  });

  it('array vacío → retorna vacío', () => {
    expect(filterPublished([])).toHaveLength(0);
  });

  it('todos PUBLISHED → retorna todos', () => {
    const all = [makePaper('PUBLISHED'), makePaper('PUBLISHED')];
    expect(filterPublished(all)).toHaveLength(2);
  });
});

describe('buildPublishedConceptIds', () => {
  it('incluye conceptos de papers PUBLISHED', () => {
    const papers = [
      makePaper('PUBLISHED', ['con-cca', 'con-caba']),
      makePaper('DRAFT', ['con-nicsp', 'con-snies']),
    ];
    const ids = buildPublishedConceptIds(papers);
    expect(ids.has('con-cca')).toBe(true);
    expect(ids.has('con-caba')).toBe(true);
  });

  it('excluye conceptos de papers DRAFT', () => {
    const papers = [
      makePaper('PUBLISHED', ['con-cca']),
      makePaper('DRAFT', ['con-nicsp']),
    ];
    const ids = buildPublishedConceptIds(papers);
    expect(ids.has('con-nicsp')).toBe(false);
  });

  it('incluye conceptos de papers DEPRECATED', () => {
    const papers = [makePaper('DEPRECATED', ['con-deprecated-concept'])];
    const ids = buildPublishedConceptIds(papers);
    expect(ids.has('con-deprecated-concept')).toBe(true);
  });

  it('concepto citado por PUBLISHED y DRAFT → visible (PUBLISHED gana)', () => {
    const papers = [
      makePaper('PUBLISHED', ['con-bsc-s']),
      makePaper('DRAFT', ['con-bsc-s', 'con-nicsp']),
    ];
    const ids = buildPublishedConceptIds(papers);
    expect(ids.has('con-bsc-s')).toBe(true);   // visible porque M01-M07 lo cita
    expect(ids.has('con-nicsp')).toBe(false);   // oculto solo en M08+
  });

  it('sin papers → Set vacío', () => {
    expect(buildPublishedConceptIds([])).toEqual(new Set());
  });

  it('paper PUBLISHED sin glosario → no añade nada', () => {
    const papers = [makePaper('PUBLISHED', [])];
    expect(buildPublishedConceptIds(papers).size).toBe(0);
  });
});

describe('isConceptVisible', () => {
  const publishedIds = new Set(['con-cca', 'con-caba', 'con-bsc-s']);

  it('concepto en Set → visible', () => {
    expect(isConceptVisible('con-cca', publishedIds)).toBe(true);
  });

  it('concepto fuera del Set → oculto', () => {
    expect(isConceptVisible('con-nicsp', publishedIds)).toBe(false);
  });

  it('Set vacío → todo oculto', () => {
    expect(isConceptVisible('con-cca', new Set())).toBe(false);
  });
});

describe('regla de cascada completa · M01-M07 published, M08-M12 draft', () => {
  const corpus = [
    makePaper('PUBLISHED', ['con-cca', 'con-caba', 'con-bsc-s', 'con-crisp-dm']),  // M01-M07
    makePaper('DRAFT',     ['con-nicsp', 'con-snies', 'con-bsc-s']),               // M08
    makePaper('DRAFT',     ['con-ccr-capacity-cost-rate']),                         // M09
  ];

  it('buildPublishedConceptIds incluye exactamente los de papers publicados', () => {
    const ids = buildPublishedConceptIds(corpus);
    // publicados
    expect(ids.has('con-cca')).toBe(true);
    expect(ids.has('con-caba')).toBe(true);
    expect(ids.has('con-bsc-s')).toBe(true);   // citado también por M08 pero M01-M07 lo ancla
    expect(ids.has('con-crisp-dm')).toBe(true);
    // solo-draft
    expect(ids.has('con-nicsp')).toBe(false);
    expect(ids.has('con-snies')).toBe(false);
    expect(ids.has('con-ccr-capacity-cost-rate')).toBe(false);
  });
});
