import type { LucideIcon } from 'lucide-react';
import { Scale, FlaskConical, BookOpen, Vote, GraduationCap } from 'lucide-react';

export type EstanteId = 'normas' | 'investigaciones' | 'guias' | 'deliberaciones' | 'secciones';

export type Estante = {
  id: EstanteId;
  name: string;
  emoji: string;
  description: string;
  Icon: LucideIcon;
  color: string; // CSS var
  /** función para clasificar un documento en este estante a partir de tags + frontmatter */
  matches: (doc: { tags?: string[]; estante?: string; type?: string; id?: string }) => boolean;
};

export const ESTANTES: Estante[] = [
  {
    id: 'normas',
    name: 'Normas',
    emoji: '📜',
    description: 'Acuerdos, leyes, decretos, resoluciones y reglamentos vigentes.',
    Icon: Scale,
    color: 'var(--color-brand-blue)',
    matches: (doc) =>
      doc.estante === 'norma' ||
      doc.tags?.some((t) => /^norma|acuerdo|ley|decreto|resolucion|reglamento$/i.test(t)) ||
      false,
  },
  {
    id: 'investigaciones',
    name: 'Investigaciones',
    emoji: '🔬',
    description: 'Papers, datasets FAIR, metodologías y análisis del corpus MI-12.',
    Icon: FlaskConical,
    color: 'var(--color-brand-purple)',
    matches: (doc) =>
      doc.estante === 'investigacion' ||
      (doc.id?.startsWith('m') && /^m\d{2}$/.test(doc.id ?? '')) ||
      doc.tags?.some((t) => /^investigacion|paper|research|m\d+$/i.test(t)) ||
      false,
  },
  {
    id: 'guias',
    name: 'Guías',
    emoji: '📘',
    description: 'BPAs, manuales, tutoriales y rúbricas de buenas prácticas.',
    Icon: BookOpen,
    color: 'var(--color-brand-emerald)',
    matches: (doc) =>
      doc.estante === 'guia' ||
      doc.tags?.some((t) => /^guia|bpa|tutorial|manual|rubric/i.test(t)) ||
      false,
  },
  {
    id: 'deliberaciones',
    name: 'Deliberaciones',
    emoji: '🗳️',
    description: 'Discusiones formales, propuestas en revisión y decisiones colegiadas.',
    Icon: Vote,
    color: 'var(--color-brand-orange)',
    matches: (doc) =>
      doc.estante === 'deliberacion' ||
      doc.tags?.some((t) => /^deliberacion|propuesta|votacion|consejo/i.test(t)) ||
      false,
  },
  {
    id: 'secciones',
    name: 'Secciones',
    emoji: '📚',
    description: 'Secciones de libros académicos, capítulos y notas de estudio.',
    Icon: GraduationCap,
    color: 'var(--color-brand-gold)',
    matches: (doc) =>
      doc.estante === 'seccion-libro' ||
      doc.tags?.some((t) => /^seccion|capitulo|libro|young|freedman/i.test(t)) ||
      false,
  },
];

export function classifyDoc(doc: { tags?: string[]; estante?: string; type?: string; id?: string }): EstanteId {
  for (const est of ESTANTES) {
    if (est.matches(doc)) return est.id;
  }
  // default: investigaciones (papers M01-M12)
  if (doc.id && /^m\d{2}$/.test(doc.id)) return 'investigaciones';
  return 'guias';
}

export function getEstante(id: EstanteId): Estante {
  return ESTANTES.find((e) => e.id === id)!;
}
