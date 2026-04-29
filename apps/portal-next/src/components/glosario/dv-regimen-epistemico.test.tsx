import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvRegimenEpistemico } from './dv-regimen-epistemico';

describe('<DvRegimenEpistemico>', () => {
  it('renderiza las 3 secciones cuando todas están presentes', () => {
    const html = renderToString(
      <DvRegimenEpistemico
        applicable_domain="Universidad pública colombiana"
        assumptions={['Autonomía universitaria garantizada']}
        breaks_at={['Cierre institucional', 'Derogación expresa']}
      />
    );
    expect(html).toContain('Dominio de aplicación');
    expect(html).toContain('Universidad pública colombiana');
    expect(html).toContain('Supuestos explícitos');
    expect(html).toContain('Autonomía universitaria garantizada');
    expect(html).toContain('Condiciones que invalidan');
    expect(html).toContain('Cierre institucional');
    expect(html).toContain('Derogación expresa');
  });

  it('muestra solo domain si assumptions y breaks_at están vacíos', () => {
    const html = renderToString(
      <DvRegimenEpistemico applicable_domain="Derecho público" assumptions={[]} breaks_at={[]} />
    );
    expect(html).toContain('Dominio de aplicación');
    expect(html).not.toContain('Supuestos explícitos');
    expect(html).not.toContain('Condiciones que invalidan');
  });

  it('sin datos → mensaje informativo', () => {
    const html = renderToString(
      <DvRegimenEpistemico assumptions={[]} breaks_at={[]} />
    );
    expect(html).toContain('Régimen epistémico no declarado');
    expect(html).not.toContain('<section');
  });

  it('a11y: usa <section> + <h4> por sección', () => {
    const html = renderToString(
      <DvRegimenEpistemico
        assumptions={['a']}
        breaks_at={['b']}
      />
    );
    expect((html.match(/<section/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((html.match(/<h4/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });
});
