/**
 * Layout Config — v8g-l1
 *
 * Fallback inline con la misma data declarativa de content/config/layout.yaml.
 *
 * TODO v8g-l1-postbuild: Una vez que `pnpm build` genere layoutConfig en
 * #site/content, migrar este archivo a:
 *   export { layoutConfig } from '#site/content';
 */

import type { LayoutConfig } from './types';

export const layoutConfig: LayoutConfig = {
  header: {
    segmentLabels: {
      canonico: 'Reforma Vinculante',
      comunidades: 'Comunidades',
      gobierno: 'Gobierno',
      formacion: 'VR Formación',
      investigacion: 'VR Investigación',
      extension: 'VR Extensión',
      facultades: 'Facultades',
      escuelas: 'Escuelas',
      programas: 'Programas',
      cabas: 'CABAs',
      institutos: 'Institutos',
      centros: 'Centros',
      direcciones: 'Direcciones',
      biblioteca: 'Biblioteca',
      grafo: 'Grafo',
      glosario: 'Glosario',
      about: 'Acerca de',
      mision: 'Misión',
    },
  },
  sidebar: {
    sections: [
      {
        id: 'vault-explorer',
        emoji: '🌲',
        title: 'VAULT',
        type: 'vault-tree',
        icon: 'FolderTree',
        filterable: true,
        href: '/',
        vaultConfig: {
          mode: 'obsidian',
          excludePatterns: ['^_.*', '^\\..*'],
          folderMappings: { 'canonico': 'Canónico MI-12' },
        },
      },
      {
        id: 'biblioteca',
        emoji: '📚',
        title: 'Biblioteca reforma·ud',
        type: 'collection',
        source: 'canonico',
        icon: 'Atom',
        filterable: true,
        sortBy: 'number',
        href: '/canonico',
      },
      {
        id: 'glosario',
        emoji: '🗂️',
        title: 'Glosario',
        type: 'collection',
        source: 'concepto',
        icon: 'BookMarked',
        filterable: true,
        groupBy: 'tags',
        href: '/glosario',
      },
      {
        id: 'comunidades',
        emoji: '🏛️',
        title: 'Comunidades',
        type: 'tree',
        source: 'community',
        icon: 'GraduationCap',
        filterable: true,
        showMissions: true,
        href: '/comunidades',
      },
      {
        id: 'estatutos',
        emoji: '⚖️',
        title: 'CSU — Estatutos',
        type: 'collection',
        source: 'csuAcuerdo',
        icon: 'Scale',
        filterable: false,
        visibleIf: "project == 'udfjc'",
        href: '/acuerdos',
      },
    ],
    collapsedNav: [
      { href: '/', label: 'Inicio', icon: 'Home' },
      { href: '/canonico', label: 'Biblioteca', icon: 'Library' },
      { href: '/canonico/grafo', label: 'Grafo', icon: 'Network' },
      { href: '/comunidades', label: 'Comunidades', icon: 'GraduationCap' },
      { href: '/comunidades/gobierno', label: 'Gobierno', icon: 'Landmark' },
      { href: '/comunidades/formacion', label: 'VR Formación', icon: 'BookMarked' },
      { href: '/comunidades/investigacion', label: 'VR Investigación', icon: 'Microscope' },
      { href: '/comunidades/extension', label: 'VR Extensión', icon: 'Globe' },
    ],
  },
  rightPanel: {
    tabs: [
      { id: 'esquema', label: 'Esquema', icon: 'ListTree', component: 'EsquemaTab', requiresDoc: true },
      { id: 'grafo', label: 'Grafo local', icon: 'Network', component: 'PaperLocalGraph', requiresDoc: false },
      { id: 'evolucion', label: 'Evolución', icon: 'GitCommit', component: 'EvolutionTab', requiresDoc: true },
      { id: 'refs', label: 'Referencias', icon: 'Link2', component: 'RefsPanel', requiresDoc: true, badgeSource: 'backlinkCount' },
      { id: 'comunidad', label: 'Comunidad', icon: 'Users', component: 'ComunidadPanel', requiresDoc: true },
      { id: 'misiones', label: 'Misiones', icon: 'Target', component: 'MissionPanel', requiresDoc: false, visibleIf: 'gamification.enabled' },
      { id: 'asistente', label: 'Asistente', icon: 'Sparkles', component: 'AIChatPanel', requiresDoc: false },
    ],
    defaultTab: 'esquema',
    keyboardShortcuts: [
      { key: '1', tab: 'esquema' },
      { key: '2', tab: 'grafo' },
      { key: '3', tab: 'evolucion' },
      { key: '4', tab: 'refs' },
      { key: '5', tab: 'comunidad' },
      { key: '6', tab: 'misiones' },
      { key: '7', tab: 'asistente' },
    ],
  },
};
