/**
 * Icon resolver — v8g-l1
 *
 * Resuelve nombres de iconos (strings desde YAML) a componentes Lucide.
 * Agnóstico de React — retorna el constructor de icono o null.
 */

import {
  Home,
  Library,
  Network,
  GraduationCap,
  Landmark,
  BookMarked,
  Microscope,
  Globe,
  Atom,
  Scale,
  BookOpen,
  Hammer,
  FileText,
  Building2,
  Folder,
  ListTree,
  GitCommit,
  Link2,
  Users,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Library,
  Network,
  GraduationCap,
  Landmark,
  BookMarked,
  Microscope,
  Globe,
  Atom,
  Scale,
  BookOpen,
  Hammer,
  FileText,
  Building2,
  Folder,
  ListTree,
  GitCommit,
  Link2,
  Users,
  Sparkles,
  Target,
};

export function resolveIcon(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  return ICON_MAP[name] ?? null;
}

export function getIconNames(): string[] {
  return Object.keys(ICON_MAP);
}
