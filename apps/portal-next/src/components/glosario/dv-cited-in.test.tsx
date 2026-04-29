import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvCitedIn } from './dv-cited-in';

describe('<DvCitedIn>', () => {
  it('renderiza lista de papers citados + total', () => {
    const html = renderToString(
      <DvCitedIn
        cited_in={['[[sec-MI12-00--carta-constitucional]]', '[[sec-MI12-01--mandato]]']}
        cited_count={8}
      />
    );
    expect(html).toContain('sec-MI12-00--carta-constitucional');
    expect(html).toContain('sec-MI12-01--mandato');
    expect(html).toContain('Total citaciones: 8');
  });

  it('si no se pasa cited_count, usa length de cited_in', () => {
    const html = renderToString(
      <DvCitedIn cited_in={['[[sec-MI12-00]]', '[[sec-MI12-01]]']} />
    );
    expect(html).toContain('Total citaciones: 2');
  });

  it('lista vacía → mensaje informativo', () => {
    const html = renderToString(<DvCitedIn cited_in={[]} cited_count={0} />);
    expect(html).toContain('No citado en papers');
    expect(html).not.toContain('<ul');
  });

  it('a11y: usa <ul> + <li> semántico', () => {
    const html = renderToString(
      <DvCitedIn cited_in={['[[sec-MI12-00]]']} cited_count={1} />
    );
    expect(html).toContain('<ul');
    expect((html.match(/<li/g) ?? []).length).toBe(1);
  });
});
