import type { LucideIcon } from 'lucide-react';
import { BookMarked, MessageSquare, GraduationCap, Calendar, Folder, Network } from 'lucide-react';

export type CopServiceId = 'biblioteca' | 'foro' | 'aprendizaje' | 'calendario' | 'proyectos' | 'grafo';
export type CopServiceStatus = 'active' | 'soon' | 'disabled';

export type CopService = {
  id: CopServiceId;
  name: string;
  emoji: string;
  description: string;
  Icon: LucideIcon;
  status: CopServiceStatus;
  href: (copSlug: string) => string;
};

export const COP_SERVICES: CopService[] = [
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    emoji: '📚',
    description: 'Documentos canónicos y notas del vault con progreso de lectura.',
    Icon: BookMarked,
    status: 'active',
    href: (slug) => `/${slug}/biblioteca`,
  },
  {
    id: 'grafo',
    name: 'Grafo',
    emoji: '🕸️',
    description: 'Grafo de conocimiento local con vis-network estilo pyvis.',
    Icon: Network,
    status: 'active',
    href: (slug) => `/${slug}/grafo`,
  },
  {
    id: 'foro',
    name: 'Foro',
    emoji: '💬',
    description: 'Discusión asíncrona por hilo con menciones y referencias.',
    Icon: MessageSquare,
    status: 'soon',
    href: (slug) => `/${slug}/foro`,
  },
  {
    id: 'aprendizaje',
    name: 'Aprendizaje',
    emoji: '🎓',
    description: 'Rutas formativas con evaluación, XP y certificados.',
    Icon: GraduationCap,
    status: 'soon',
    href: (slug) => `/${slug}/aprendizaje`,
  },
  {
    id: 'proyectos',
    name: 'Proyectos',
    emoji: '🚀',
    description: 'Tablero de BPAs activas con workflow FIDA.',
    Icon: Folder,
    status: 'soon',
    href: (slug) => `/${slug}/proyectos`,
  },
  {
    id: 'calendario',
    name: 'Calendario',
    emoji: '📅',
    description: 'Eventos, deadlines y reuniones de la comunidad.',
    Icon: Calendar,
    status: 'soon',
    href: (slug) => `/${slug}/calendario`,
  },
];
