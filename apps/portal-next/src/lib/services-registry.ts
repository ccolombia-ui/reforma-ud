import type { LucideIcon } from 'lucide-react';
import { BookMarked, MessageSquare, GraduationCap, Calendar, Folder, Network, Newspaper, BookOpen } from 'lucide-react';

export type CopServiceId = 'biblioteca' | 'noticias' | 'glosario' | 'grafo' | 'foro' | 'aprendizaje' | 'proyectos' | 'calendario';
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
    id: 'noticias',
    name: 'Noticias',
    emoji: '📰',
    description: 'Feed de actualidad sobre la reforma: noticias, papers y resoluciones.',
    Icon: Newspaper,
    status: 'active',
    href: (slug) => `/${slug}#noticias`,
  },
  {
    id: 'glosario',
    name: 'Glosario',
    emoji: '📖',
    description: 'Conceptos clave de esta comunidad del glosario universal.',
    Icon: BookOpen,
    status: 'active',
    href: (slug) => `/${slug}#glosario`,
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
    name: 'Discusiones',
    emoji: '💬',
    description: 'Discusión asíncrona vía GitHub Discussions (giscus). Cuenta GitHub requerida.',
    Icon: MessageSquare,
    status: 'active',
    href: (slug) => `/${slug}#discusiones`,
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
