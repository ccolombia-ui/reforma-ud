import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvRelations } from './dv-relations';

const SAMPLE = [
  { rel_nombre: 'norm_implements', rel_target: '[[con-conpes-4069]]', rel_frame: 'normativo', rel_propiedades: { norm_evidence: 'Art. 5' } },
  { rel_nombre: 'norm_mandates', rel_target: '[[con-estatuto]]', rel_frame: 'normativo' }, // filtrado
  { rel_nombre: 'skos_broader', rel_target: '[[con-norma-superior]]', rel_frame: 'skos' },
];

describe('<DvRelations>', () => {
  it('filtra norm_mandates — solo muestra otras relaciones', () => {
    const html = renderToString(<DvRelations relations={SAMPLE} />);
    expect(html).toContain('con-conpes-4069');
    expect(html).toContain('con-norma-superior');
    expect(html).not.toContain('con-estatuto');
  });

  it('agrupa por frame con labels humanizados', () => {
    const html = renderToString(<DvRelations relations={SAMPLE} />);
    expect(html).toContain('⚖️ Normativo');
    expect(html).toContain('🔤 SKOS');
  });

  it('muestra evidencia cuando existe', () => {
    const html = renderToString(<DvRelations relations={SAMPLE} />);
    expect(html).toContain('Art. 5');
  });

  it('relación sin evidencia → "—"', () => {
    const html = renderToString(
      <DvRelations relations={[{ rel_nombre: 'skos_broader', rel_target: '[[con-x]]' }]} />
    );
    expect(html).toContain('—');
  });

  it('sin relaciones (o solo norm_mandates) → mensaje informativo', () => {
    const html = renderToString(
      <DvRelations relations={[{ rel_nombre: 'norm_mandates', rel_target: '[[x]]' }]} />
    );
    expect(html).toContain('Sin relaciones outgoing');
  });

  it('relations vacío → mensaje informativo', () => {
    const html = renderToString(<DvRelations relations={[]} />);
    expect(html).toContain('Sin relaciones outgoing');
  });

  it('a11y: usa <section> por frame + <table> por tipo relación', () => {
    const html = renderToString(<DvRelations relations={SAMPLE} />);
    expect((html.match(/<section/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((html.match(/<table/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(html).toContain('scope="col"');
  });
});
