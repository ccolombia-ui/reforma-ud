import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvHabilita } from './dv-habilita';

describe('<DvHabilita>', () => {
  it('renderiza lista de slugs como links + count plural', () => {
    const html = renderToString(
      <DvHabilita habilita={['con-cca', 'con-omt', 'con-mlp-geels']} />
    );
    expect(html).toContain('3 conceptos declaran');
    expect(html).toContain('href="/glosario/con-cca"');
    expect(html).toContain('href="/glosario/con-omt"');
    expect(html).toContain('href="/glosario/con-mlp-geels"');
  });

  it('singular cuando habilita.length === 1', () => {
    const html = renderToString(<DvHabilita habilita={['con-x']} />);
    expect(html).toContain('1 concepto declara');
    expect(html).not.toContain('1 conceptos');
  });

  it('lista vacía → mensaje informativo + count 0', () => {
    const html = renderToString(<DvHabilita habilita={[]} />);
    expect(html).toContain('0 conceptos declaran');
    expect(html).toContain('Ningún concepto del corpus');
  });

  it('a11y: usa <ul> + <li> semántico', () => {
    const html = renderToString(<DvHabilita habilita={['con-x', 'con-y']} />);
    expect(html).toContain('<ul');
    expect((html.match(/<li/g) ?? []).length).toBe(2);
  });
});
