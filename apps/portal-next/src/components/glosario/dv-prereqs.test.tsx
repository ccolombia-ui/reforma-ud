import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvPrereqs } from './dv-prereqs';

describe('<DvPrereqs>', () => {
  it('renderiza lista de wikilinks como <a> con href /glosario/<slug>', () => {
    const html = renderToString(
      <DvPrereqs prereqs={['[[con-constitucion-1991-art-69]]', '[[con-ley-30-1992-art-6]]']} />
    );
    expect(html).toContain('href="/glosario/con-constitucion-1991-art-69"');
    expect(html).toContain('href="/glosario/con-ley-30-1992-art-6"');
    expect(html).toContain('con-constitucion-1991-art-69');
  });

  it('renderiza alias cuando wikilink tiene alias', () => {
    const html = renderToString(
      <DvPrereqs prereqs={['[[con-x|Mi alias]]']} />
    );
    expect(html).toContain('href="/glosario/con-x"');
    expect(html).toContain('Mi alias');
  });

  it('lista vacía → mensaje "Sin pre-requisitos formales declarados"', () => {
    const html = renderToString(<DvPrereqs prereqs={[]} />);
    expect(html).toContain('Sin pre-requisitos');
    expect(html).not.toContain('<a ');
    expect(html).not.toContain('<ul');
  });

  it('null/undefined → mensaje vacío sin error', () => {
    // @ts-expect-error testing null safety
    const html = renderToString(<DvPrereqs prereqs={null} />);
    expect(html).toContain('Sin pre-requisitos');
  });

  it('a11y: usa <ul> + <li> semántico (no divs)', () => {
    const html = renderToString(
      <DvPrereqs prereqs={['[[con-x]]', '[[con-y]]']} />
    );
    expect(html).toContain('<ul');
    expect((html.match(/<li/g) ?? []).length).toBe(2);
  });
});
