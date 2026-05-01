/**
 * Tipos locales para LayoutConfig — v8g-l1
 *
 * Estos tipos son duplicados de lo que Velite generará en #site/content
 * cuando se haga build. Se mantienen aquí para permitir desarrollo
 * sin necesidad de regenerar Velite en cada cambio.
 */

export interface SidebarSection {
  id: string;
  emoji?: string;
  title: string;
  type: 'collection' | 'tree' | 'links' | 'custom';
  source?: string;
  icon?: string;
  filterable?: boolean;
  sortBy?: 'number' | 'title' | 'date';
  groupBy?: string;
  showMissions?: boolean;
  visibleIf?: string;
  href?: string;
}

export interface CollapsedNavItem {
  href: string;
  label: string;
  icon: string;
}

export interface LayoutConfig {
  kd_id?: string;
  kd_version?: string;
  branding?: {
    name: string;
    logo: string;
    altLogo?: string;
    primaryColor: string;
  };
  sidebar?: {
    sections: SidebarSection[];
    collapsedNav: CollapsedNavItem[];
  };
  header?: {
    segmentLabels: Record<string, string>;
    documentTitleBar?: {
      enabled: boolean;
      showWorkflowStatus: boolean;
    };
  };
  rightPanel?: {
    tabs: Array<{
      id: string;
      label: string;
      icon: string;
      component: string;
      requiresDoc?: boolean;
      badgeSource?: string;
      visibleIf?: string;
    }>;
    defaultTab: string;
    keyboardShortcuts: Array<{ key: string; tab: string }>;
  };
}
