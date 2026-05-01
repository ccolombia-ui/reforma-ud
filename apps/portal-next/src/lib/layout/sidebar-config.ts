/**
 * Sidebar Config — v8g-l1
 *
 * Funciones puras para resolver configuración declarativa del sidebar
 * desde layout.yaml (Velite) hacia estructura renderizable.
 */

import type { LayoutConfig, SidebarSection } from './types';

export type SidebarSectionConfig = SidebarSection;
export type CollapsedNavItem = NonNullable<LayoutConfig['sidebar']>['collapsedNav'][number];

/**
 * Filtra secciones según condiciones `visibleIf`.
 * Soporta condiciones simples: "project == 'udfjc'".
 */
export function filterVisibleSections(
  sections: SidebarSectionConfig[],
  context: { project?: string; gamificationEnabled?: boolean },
): SidebarSectionConfig[] {
  return sections.filter((s) => {
    if (!s.visibleIf) return true;
    // Parse simple conditions: "project == 'udfjc'"
    const match = s.visibleIf.match(/^(\w+)\s*==\s*['"](.+?)['"]$/);
    if (!match) return true; // unknown condition format = visible by default
    const [, key, value] = match;
    const ctxValue = context[key as keyof typeof context];
    return String(ctxValue) === value;
  });
}

/**
 * Determina si una sección debe mostrar el search filter.
 */
export function isSectionFilterable(section: SidebarSectionConfig): boolean {
  return section.filterable ?? false;
}

/**
 * Resuelve el href por defecto de una sección.
 */
export function resolveSectionHref(section: SidebarSectionConfig): string {
  return section.href ?? `/${section.id}`;
}

/**
 * Valida que la configuración del sidebar tenga coherencia mínima.
 */
export function validateSidebarConfig(config: LayoutConfig['sidebar']): string[] {
  const errors: string[] = [];
  if (!config) {
    errors.push('sidebar config is missing');
    return errors;
  }
  const ids = new Set<string>();
  for (const s of config.sections) {
    if (ids.has(s.id)) errors.push(`duplicate section id: ${s.id}`);
    ids.add(s.id);
    if (!s.title) errors.push(`section ${s.id} missing title`);
    if (s.type === 'collection' && !s.source) {
      errors.push(`section ${s.id} type=collection but missing source`);
    }
  }
  return errors;
}
