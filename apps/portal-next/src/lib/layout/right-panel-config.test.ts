/**
 * Tests para right-panel config — v8g-l3
 *
 * Verifica que las tabs del right panel se resuelven desde layoutConfig.
 */

import { describe, it, expect } from 'vitest';
import { layoutConfig } from './config';

describe('v8g-l3: Right Panel Config from YAML', () => {
  it('should have tabs defined', () => {
    expect(layoutConfig.rightPanel?.tabs.length).toBeGreaterThan(0);
  });

  it('should have defaultTab defined', () => {
    expect(layoutConfig.rightPanel?.defaultTab).toBeTruthy();
  });

  it('should have keyboard shortcuts defined', () => {
    expect(layoutConfig.rightPanel?.keyboardShortcuts.length).toBeGreaterThan(0);
  });

  it('should resolve tab ids uniquely', () => {
    const ids = layoutConfig.rightPanel!.tabs.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should mark requiresDoc correctly for refs tab', () => {
    const refs = layoutConfig.rightPanel!.tabs.find((t) => t.id === 'refs');
    expect(refs?.requiresDoc).toBe(true);
  });

  it('should mark requiresDoc=false for grafo tab', () => {
    const grafo = layoutConfig.rightPanel!.tabs.find((t) => t.id === 'grafo');
    expect(grafo?.requiresDoc).toBe(false);
  });

  it('should have misiones tab with visibleIf condition', () => {
    const misiones = layoutConfig.rightPanel!.tabs.find((t) => t.id === 'misiones');
    expect(misiones).toBeDefined();
    expect(misiones?.visibleIf).toBe('gamification.enabled');
  });

  it('should have asistente tab without requiresDoc', () => {
    const asistente = layoutConfig.rightPanel!.tabs.find((t) => t.id === 'asistente');
    expect(asistente?.requiresDoc).toBe(false);
  });
});
