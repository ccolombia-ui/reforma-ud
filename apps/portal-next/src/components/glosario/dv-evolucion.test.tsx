import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvEvolucion } from './dv-evolucion';

describe('<DvEvolucion>', () => {
  it('renderiza los 4 campos de estado temporal', () => {
    const html = renderToString(
      <DvEvolucion
        anchors={[]}
        chainStatus="LINEAR"
        currentAnchor="[[anchor-2025-05-05]]"
        validFrom="2025-05-05"
        validTo=""
      />
    );
    expect(html).toContain('Chain status');
    expect(html).toContain('LINEAR');
    expect(html).toContain('anchor-2025-05-05');
    expect(html).toContain('2025-05-05');
    expect(html).toContain('actualmente · ACTIVE');
  });

  it('sin anchors → mensaje TODO', () => {
    const html = renderToString(<DvEvolucion anchors={[]} />);
    expect(html).toContain('Sin definitional anchors');
    expect(html).not.toContain('<ul');
  });

  it('con anchors → lista cronológica', () => {
    const html = renderToString(
      <DvEvolucion
        anchors={['[[anchor-v1]]', '[[anchor-v2|Segunda versión]]']}
      />
    );
    expect(html).toContain('anchor-v1');
    expect(html).toContain('Segunda versión');
    expect(html).toContain('<ul');
    expect((html.match(/<li/g) ?? []).length).toBe(2);
  });

  it('campos ausentes → "—" graceful', () => {
    const html = renderToString(<DvEvolucion anchors={[]} />);
    expect(html).toContain('—');
    expect(html).not.toThrow;
  });
});
