import { describe, it, expect } from 'vitest';
import { decideGraphClick, type GraphClickInput } from './graph-click-action';

// Helper para construir input con defaults
function input(overrides: Partial<GraphClickInput>): GraphClickInput {
  return { nodeId: 'm05', focusId: 'm01', splitMode: false, ...overrides };
}

describe('decideGraphClick · noop sobre nodo focal', () => {
  it('click en mismo nodo que focusId (splitMode OFF) → noop', () => {
    expect(decideGraphClick(input({ nodeId: 'm01', focusId: 'm01' }))).toEqual({ kind: 'noop' });
  });

  it('click en mismo nodo que focusId (splitMode ON) → noop', () => {
    expect(decideGraphClick(input({ nodeId: 'm01', focusId: 'm01', splitMode: true }))).toEqual({
      kind: 'noop',
    });
  });

  it('click en mismo nodo (concepto) → noop', () => {
    expect(
      decideGraphClick(input({ nodeId: 'con-cca', focusId: 'con-cca' })),
    ).toEqual({ kind: 'noop' });
  });
});

describe('decideGraphClick · splitMode OFF (caso primario · activación implícita)', () => {
  it('click en nodo distinto → activateSplitAndOpen', () => {
    expect(decideGraphClick(input({ nodeId: 'm05', focusId: 'm01' }))).toEqual({
      kind: 'activateSplitAndOpen',
      docId: 'm05',
    });
  });

  it('focusId null (página global) + splitMode OFF → activateSplitAndOpen', () => {
    expect(decideGraphClick(input({ nodeId: 'm08', focusId: null }))).toEqual({
      kind: 'activateSplitAndOpen',
      docId: 'm08',
    });
  });

  it('click sobre concepto del glosario → activateSplitAndOpen', () => {
    expect(
      decideGraphClick(input({ nodeId: 'con-frame-3', focusId: 'm01' })),
    ).toEqual({ kind: 'activateSplitAndOpen', docId: 'con-frame-3' });
  });
});

describe('decideGraphClick · splitMode ON (preserva pane A · abre en último secundario)', () => {
  it('click en nodo distinto → openInLastUsed', () => {
    expect(
      decideGraphClick(input({ nodeId: 'm05', focusId: 'm01', splitMode: true })),
    ).toEqual({ kind: 'openInLastUsed', docId: 'm05' });
  });

  it('focusId null + splitMode ON → openInLastUsed', () => {
    expect(
      decideGraphClick(input({ nodeId: 'm05', focusId: null, splitMode: true })),
    ).toEqual({ kind: 'openInLastUsed', docId: 'm05' });
  });
});

describe('decideGraphClick · modifier key (Cmd/Ctrl forza split-mode-like)', () => {
  it('Ctrl+click en splitMode OFF → openInLastUsed (no activa toggle global)', () => {
    expect(
      decideGraphClick(
        input({ nodeId: 'm05', focusId: 'm01', splitMode: false, modifierKey: true }),
      ),
    ).toEqual({ kind: 'openInLastUsed', docId: 'm05' });
  });

  it('Ctrl+click en splitMode ON → openInLastUsed (idempotente)', () => {
    expect(
      decideGraphClick(
        input({ nodeId: 'm05', focusId: 'm01', splitMode: true, modifierKey: true }),
      ),
    ).toEqual({ kind: 'openInLastUsed', docId: 'm05' });
  });
});

describe('decideGraphClick · pureza (referential transparency)', () => {
  it('mismas entradas → mismas salidas', () => {
    const a = decideGraphClick({ nodeId: 'm05', focusId: 'm01', splitMode: false });
    const b = decideGraphClick({ nodeId: 'm05', focusId: 'm01', splitMode: false });
    expect(a).toEqual(b);
  });

  it('no muta el input', () => {
    const i: GraphClickInput = { nodeId: 'm05', focusId: 'm01', splitMode: false };
    const before = JSON.stringify(i);
    decideGraphClick(i);
    expect(JSON.stringify(i)).toBe(before);
  });
});
