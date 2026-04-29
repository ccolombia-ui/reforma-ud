import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvObsidianOnlyBlock } from './dv-obsidian-only';

describe('<DvObsidianOnlyBlock>', () => {
  it('renderiza el mensaje de bloque Obsidian-only', () => {
    const html = renderToString(<DvObsidianOnlyBlock />);
    expect(html).toContain('Vista interactiva disponible en Obsidian');
  });

  it('a11y: usa role="note" + aria-label', () => {
    const html = renderToString(<DvObsidianOnlyBlock />);
    expect(html).toContain('role="note"');
    expect(html).toContain('aria-label');
  });

  it('no contiene código DV crudo', () => {
    const html = renderToString(<DvObsidianOnlyBlock />);
    expect(html).not.toContain('dv.current()');
    expect(html).not.toContain('dv.table');
    expect(html).not.toContain('```');
  });
});
