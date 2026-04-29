import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvMandatos } from './dv-mandatos';

const SAMPLE_RELATIONS = [
  {
    rel_nombre: 'norm_mandates',
    rel_target: '[[con-estatuto-academico-nuevo]]',
    rel_frame: 'normativo',
    rel_propiedades: { norm_evidence: 'Art. 98 §1 · plazo 6 meses' },
  },
  {
    rel_nombre: 'norm_mandates',
    rel_target: '[[con-estatuto-docente-nuevo]]',
    rel_frame: 'normativo',
    rel_propiedades: { norm_evidence: 'Art. 98 §2 · plazo 1 año' },
  },
  {
    rel_nombre: 'norm_implements', // debe ser filtrado
    rel_target: '[[con-conpes-4069]]',
    rel_frame: 'normativo',
  },
];

describe('<DvMandatos>', () => {
  it('renderiza solo relaciones norm_mandates (filtra otras)', () => {
    const html = renderToString(<DvMandatos relations={SAMPLE_RELATIONS} />);
    expect(html).toContain('con-estatuto-academico-nuevo');
    expect(html).toContain('con-estatuto-docente-nuevo');
    expect(html).not.toContain('con-conpes-4069');
  });

  it('numera con §1, §2, ...', () => {
    const html = renderToString(<DvMandatos relations={SAMPLE_RELATIONS} />);
    expect(html).toContain('§1');
    expect(html).toContain('§2');
  });

  it('muestra la evidencia/plazo', () => {
    const html = renderToString(<DvMandatos relations={SAMPLE_RELATIONS} />);
    expect(html).toContain('Art. 98 §1 · plazo 6 meses');
  });

  it('sin mandatos → mensaje informativo', () => {
    const html = renderToString(
      <DvMandatos relations={[{ rel_nombre: 'skos_broader', rel_target: '[[x]]' }]} />
    );
    expect(html).toContain('Sin mandatos derivados');
    expect(html).not.toContain('<table');
  });

  it('relations vacío → mensaje informativo', () => {
    const html = renderToString(<DvMandatos relations={[]} />);
    expect(html).toContain('Sin mandatos derivados');
  });

  it('a11y: usa <table> con <th scope="col">', () => {
    const html = renderToString(<DvMandatos relations={SAMPLE_RELATIONS} />);
    expect(html).toContain('scope="col"');
    expect(html).toContain('<tbody');
  });
});
