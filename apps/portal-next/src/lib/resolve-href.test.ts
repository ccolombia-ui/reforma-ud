import { describe, it, expect } from 'vitest';
import { resolveHref, type ResolveCollections } from './resolve-href';

const fixtures: ResolveCollections = {
  canonicPaper: [
    {
      id: 'm01',
      title: 'Mandato normativo',
      description: 'CONPES 4069 + PIIOM + ACU 04/2025',
      href: '/canonico/m01',
      body: '<p>m01 body</p>',
      number: 1,
    },
    {
      id: 'm12',
      title: 'Hoja de ruta CRISP-DM',
      description: 'meta-paper integrador',
      href: '/canonico/m12',
      body: '<p>m12 body</p>',
      number: 12,
    },
  ],
  community: [
    {
      slug: 'comunidades/gobierno',
      name: 'Gobierno Universitario',
      shortName: 'Gobierno',
      description: 'Órganos colegiados',
    },
  ],
  concepto: [
    {
      slug: 'glosario/con-frame-3',
      href: '/glosario/con-frame-3',
      kd_title: 'Frame 3 — Cambio Transformativo',
      skos_prefLabel: 'Frame 3',
      skos_definition: 'El tercer frame Schot & Steinmueller 2018',
      body: '<p>frame-3 body</p>',
    },
    {
      slug: 'glosario/con-cca',
      href: '/glosario/con-cca',
      skos_prefLabel: 'Competencia-Conocimiento-Atómica',
      skos_definition: 'unidad indivisible de creditización',
      body: '<p>cca body</p>',
    },
    {
      slug: 'glosario/con-trailing',
      href: '/glosario/con-trailing/',
      kd_title: 'Test trailing slash',
      skos_definition: 'Para probar match con trailing',
      body: '<p>trailing body</p>',
    },
  ],
  note: [
    {
      slug: 'comunidades/gobierno/csu',
      title: 'Consejo Superior Universitario',
      href: '/comunidades/gobierno/csu',
      body: '<p>csu note</p>',
    },
  ],
};

describe('resolveHref · entradas inválidas', () => {
  it('href vacío → broken', () => {
    expect(resolveHref('', fixtures)).toEqual({ kind: 'broken', href: '' });
  });

  it('href "#" → broken', () => {
    expect(resolveHref('#', fixtures)).toEqual({ kind: 'broken', href: '#' });
  });

  it('path no reconocido → broken', () => {
    const r = resolveHref('/algo/random', fixtures);
    expect(r.kind).toBe('broken');
  });
});

describe('resolveHref · /canonico/', () => {
  it('paper existente → kind paper con metadata', () => {
    const r = resolveHref('/canonico/m01', fixtures);
    expect(r).toMatchObject({
      kind: 'paper',
      id: 'm01',
      title: 'Mandato normativo',
      number: 1,
    });
  });

  it('paper con trailing slash → resuelve igual', () => {
    const r = resolveHref('/canonico/m12/', fixtures);
    expect(r.kind).toBe('paper');
    if (r.kind === 'paper') expect(r.id).toBe('m12');
  });

  it('paper con anchor → ignora hash y resuelve', () => {
    const r = resolveHref('/canonico/m01#section-2', fixtures);
    expect(r.kind).toBe('paper');
    if (r.kind === 'paper') expect(r.id).toBe('m01');
  });

  it('paper inexistente → broken', () => {
    const r = resolveHref('/canonico/m99', fixtures);
    expect(r.kind).toBe('broken');
  });
});

describe('resolveHref · /glosario/ (regresión G-HOVER-02)', () => {
  it('concepto existente con kd_title → kind concepto', () => {
    const r = resolveHref('/glosario/con-frame-3', fixtures);
    expect(r).toMatchObject({
      kind: 'concepto',
      slug: 'glosario/con-frame-3',
      title: 'Frame 3 — Cambio Transformativo',
      definition: 'El tercer frame Schot & Steinmueller 2018',
      href: '/glosario/con-frame-3',
    });
  });

  it('concepto sin kd_title → cae a skos_prefLabel', () => {
    const r = resolveHref('/glosario/con-cca', fixtures);
    expect(r.kind).toBe('concepto');
    if (r.kind === 'concepto') expect(r.title).toBe('Competencia-Conocimiento-Atómica');
  });

  it('concepto cuyo href en Velite tiene trailing slash → matchea sin él', () => {
    const r = resolveHref('/glosario/con-trailing', fixtures);
    expect(r.kind).toBe('concepto');
  });

  it('concepto cuyo href en Velite NO tiene trailing slash → matchea con trailing', () => {
    const r = resolveHref('/glosario/con-frame-3/', fixtures);
    expect(r.kind).toBe('concepto');
  });

  it('concepto con hash anchor → ignora hash y resuelve', () => {
    const r = resolveHref('/glosario/con-cca#definicion', fixtures);
    expect(r.kind).toBe('concepto');
  });

  it('concepto inexistente → broken', () => {
    const r = resolveHref('/glosario/con-no-existe', fixtures);
    expect(r.kind).toBe('broken');
  });

  it('NO devuelve broken cuando concepto existe (regresión bug original)', () => {
    // Bug pre-v7.8: cualquier href /glosario/* devolvía broken porque el
    // resolveHref no tenía caso para esa ruta. Este test atrapa la regresión.
    const r = resolveHref('/glosario/con-frame-3', fixtures);
    expect(r.kind).not.toBe('broken');
  });
});

describe('resolveHref · /comunidades/', () => {
  it('community → kind community con shortName', () => {
    const r = resolveHref('/comunidades/gobierno', fixtures);
    expect(r).toMatchObject({
      kind: 'community',
      slug: 'comunidades/gobierno',
      name: 'Gobierno',
    });
  });

  it('note dentro de community → kind note (note tiene precedencia)', () => {
    const r = resolveHref('/comunidades/gobierno/csu', fixtures);
    expect(r.kind).toBe('note');
    if (r.kind === 'note') expect(r.slug).toBe('comunidades/gobierno/csu');
  });

  it('community inexistente → broken', () => {
    const r = resolveHref('/comunidades/no-existe', fixtures);
    expect(r.kind).toBe('broken');
  });
});

describe('resolveHref · pureza', () => {
  it('mismas entradas → mismas salidas (referential transparency)', () => {
    const a = resolveHref('/canonico/m01', fixtures);
    const b = resolveHref('/canonico/m01', fixtures);
    expect(a).toEqual(b);
  });

  it('no muta las colecciones', () => {
    const before = JSON.stringify(fixtures);
    resolveHref('/canonico/m01', fixtures);
    resolveHref('/glosario/con-frame-3', fixtures);
    resolveHref('/comunidades/gobierno', fixtures);
    expect(JSON.stringify(fixtures)).toBe(before);
  });
});
