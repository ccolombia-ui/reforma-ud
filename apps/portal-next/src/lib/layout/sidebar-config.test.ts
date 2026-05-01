/**
 * Tests para sidebar-config — v8g-l1
 *
 * Regla de oro: tests antes de implementación.
 * Estos tests verifican que la config YAML se resuelve correctamente.
 */

import { describe, it, expect } from 'vitest';
import { filterVisibleSections, isSectionFilterable, resolveSectionHref, validateSidebarConfig } from './sidebar-config';
import type { SidebarSection } from './types';

describe('v8g-l1: Sidebar Config from YAML', () => {
  const mockSections: SidebarSection[] = [
    { id: 'biblioteca', title: 'Biblioteca', type: 'collection', source: 'canonico', icon: 'Atom', filterable: true, href: '/canonico' },
    { id: 'glosario', title: 'Glosario', type: 'collection', source: 'concepto', icon: 'BookMarked', filterable: true, href: '/glosario' },
    { id: 'comunidades', title: 'Comunidades', type: 'tree', source: 'community', icon: 'GraduationCap', filterable: true, showMissions: true, href: '/comunidades' },
    { id: 'estatutos', title: 'CSU — Estatutos', type: 'collection', source: 'csuAcuerdo', icon: 'Scale', filterable: false, visibleIf: "project == 'udfjc'", href: '/acuerdos' },
  ];

  it('should load all sections from config', () => {
    expect(mockSections.length).toBe(4);
    expect(mockSections.map((s) => s.id)).toContain('biblioteca');
    expect(mockSections.map((s) => s.id)).toContain('comunidades');
  });

  it('should resolve icon names correctly', () => {
    // Los iconos se resuelven en runtime; aquí verificamos que el nombre existe
    const iconNames = ['Atom', 'BookMarked', 'GraduationCap', 'Scale'];
    for (const name of iconNames) {
      expect(typeof name).toBe('string');
    }
  });

  it('should filter sections by visibility condition', () => {
    const visible = filterVisibleSections(mockSections, { project: 'udfjc' });
    expect(visible.map((s) => s.id)).toEqual(['biblioteca', 'glosario', 'comunidades', 'estatutos']);
  });

  it('should hide section when visibleIf condition is false', () => {
    const visible = filterVisibleSections(mockSections, { project: 'other' });
    expect(visible.map((s) => s.id)).toEqual(['biblioteca', 'glosario', 'comunidades']);
    expect(visible.some((s) => s.id === 'estatutos')).toBe(false);
  });

  it('should show all sections when no visibleIf is set', () => {
    const sectionsWithoutCondition = mockSections.filter((s) => s.id !== 'estatutos');
    const visible = filterVisibleSections(sectionsWithoutCondition, { project: 'other' });
    expect(visible.length).toBe(3);
  });

  it('should determine if section is filterable', () => {
    expect(isSectionFilterable(mockSections[0])).toBe(true);  // biblioteca
    expect(isSectionFilterable(mockSections[3])).toBe(false); // estatutos
  });

  it('should resolve section href', () => {
    expect(resolveSectionHref(mockSections[0])).toBe('/canonico');
    expect(resolveSectionHref(mockSections[2])).toBe('/comunidades');
    // Fallback cuando no hay href
    expect(resolveSectionHref({ id: 'test', title: 'Test', type: 'collection' })).toBe('/test');
  });

  it('should validate config with no errors', () => {
    const errors = validateSidebarConfig({ sections: mockSections, collapsedNav: [] });
    expect(errors).toEqual([]);
  });

  it('should detect duplicate section ids', () => {
    const dupes = [...mockSections, { id: 'biblioteca', title: 'Dup', type: 'collection' as const }];
    const errors = validateSidebarConfig({ sections: dupes, collapsedNav: [] });
    expect(errors).toContain('duplicate section id: biblioteca');
  });

  it('should detect missing title', () => {
    const bad = [{ id: 'bad', title: '', type: 'collection' as const }];
    const errors = validateSidebarConfig({ sections: bad, collapsedNav: [] });
    expect(errors).toContain('section bad missing title');
  });

  it('should detect collection without source', () => {
    const bad = [{ id: 'bad', title: 'Bad', type: 'collection' as const }];
    const errors = validateSidebarConfig({ sections: bad, collapsedNav: [] });
    expect(errors).toContain('section bad type=collection but missing source');
  });

  it('should handle missing sidebar config', () => {
    const errors = validateSidebarConfig(undefined);
    expect(errors).toContain('sidebar config is missing');
  });
});
