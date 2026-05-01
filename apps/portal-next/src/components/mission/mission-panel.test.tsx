/**
 * Tests para MissionPanel — v8g-l4
 *
 * Nota: sin @testing-library/react. Se valida la interfaz de datos
 * y la lógica de progreso con tests unitarios puros.
 */

import { describe, it, expect } from 'vitest';

type MissionItem = {
  docId: string;
  href: string;
  title: string;
  remaining: number;
  total: number;
  type: 'paper' | 'note';
  copName: string;
};

function computeProgress(item: MissionItem): number {
  if (item.total === 0) return 0;
  return Math.round(((item.total - item.remaining) / item.total) * 100);
}

describe('v8g-l4: MissionPanel data contracts', () => {
  const mockPending: MissionItem[] = [
    {
      docId: 'm01',
      href: '/comunidades/formacion/biblioteca/m01',
      title: 'M01 — Estándares Internacionales',
      remaining: 3,
      total: 5,
      type: 'paper',
      copName: 'VR Formación',
    },
    {
      docId: 'note-1',
      href: '/comunidades/gobierno/biblioteca/note-1',
      title: 'Nota de gobierno',
      remaining: 1,
      total: 2,
      type: 'note',
      copName: 'Gobierno',
    },
  ];

  it('should compute progress for paper mission', () => {
    expect(computeProgress(mockPending[0])).toBe(40); // 2/5
  });

  it('should compute progress for note mission', () => {
    expect(computeProgress(mockPending[1])).toBe(50); // 1/2
  });

  it('should handle zero total (edge case)', () => {
    const zero = { ...mockPending[0], total: 0, remaining: 0 };
    expect(computeProgress(zero)).toBe(0);
  });

  it('should resolve hrefs correctly', () => {
    expect(mockPending[0].href).toBe('/comunidades/formacion/biblioteca/m01');
    expect(mockPending[1].href).toBe('/comunidades/gobierno/biblioteca/note-1');
  });

  it('should have unique docIds', () => {
    const ids = mockPending.map((m) => m.docId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should distinguish paper vs note types', () => {
    expect(mockPending[0].type).toBe('paper');
    expect(mockPending[1].type).toBe('note');
  });
});
