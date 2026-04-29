import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvFacetNormative } from './dv-facet-normative';

describe('<DvFacetNormative>', () => {
  it('renderiza los 7 campos canónicos del facet', () => {
    const html = renderToString(
      <DvFacetNormative
        facet={{
          normative_source: '[[bib-csu-acu-004-2025]]',
          normative_locator: 'Art. 109',
          normative_authority_level: 'ESTATUTARIO',
          chain_status: 'LINEAR',
          derogates: ['[[con-acu-csu-003-1997]]'],
          derogated_by: '',
          conflicts_with: [],
        }}
      />
    );
    expect(html).toContain('Fuente normativa');
    expect(html).toContain('bib-csu-acu-004-2025');
    expect(html).toContain('Art. 109');
    expect(html).toContain('ESTATUTARIO');
    expect(html).toContain('LINEAR');
    expect(html).toContain('con-acu-csu-003-1997');
    expect(html).toContain('Vigente'); // derogated_by vacío → "Vigente"
  });

  it('campos ausentes → "—"', () => {
    const html = renderToString(<DvFacetNormative facet={{}} />);
    expect(html).toContain('—');
    expect(html).toContain('Vigente'); // derogated_by por defecto
  });

  it('facet null/undefined → mensaje informativo', () => {
    const html = renderToString(<DvFacetNormative facet={null} />);
    expect(html).toContain('sin facet normative declarado');
    expect(html).not.toContain('<table');
  });

  it('a11y: usa <table> + <th scope="row">', () => {
    const html = renderToString(<DvFacetNormative facet={{ normative_locator: 'Art. 1' }} />);
    expect(html).toContain('<table');
    expect(html).toContain('scope="row"');
  });

  it('derogates múltiples se unen con · separator', () => {
    const html = renderToString(
      <DvFacetNormative
        facet={{
          derogates: ['[[con-x]]', '[[con-y]]'],
        }}
      />
    );
    expect(html).toContain('con-x');
    expect(html).toContain('con-y');
    expect(html).toContain('·');
  });
});
