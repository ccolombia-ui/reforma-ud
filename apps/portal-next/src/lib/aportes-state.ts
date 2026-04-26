'use client';

/**
 * Aportes — contribuciones bottom-up (lector → documento).
 *
 * MVP: persistencia local. v5+ migrará a Vercel KV / Supabase con auth + roles BPA-003.
 */

export type AporteIntent = 'idea' | 'warning' | 'thumbs-up' | 'question';

export type Aporte = {
  id: string;
  paperId: string;
  sectionAnchor?: string;       // null = comentario al doc completo
  intent: AporteIntent;
  content: string;              // markdown corto
  authorName: string;
  authorRole?: string;
  createdAt: string;            // ISO
};

const STORAGE_KEY = 'reforma-ud:aportes';

export const INTENT_META: Record<AporteIntent, { emoji: string; label: string; color: string }> = {
  idea:        { emoji: '💡', label: 'Idea',        color: 'amber' },
  warning:     { emoji: '⚠️', label: 'Atención',    color: 'red' },
  'thumbs-up': { emoji: '👍', label: 'Útil',         color: 'emerald' },
  question:    { emoji: '❓', label: 'Pregunta',    color: 'blue' },
};

function readAll(): Aporte[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Aporte[];
  } catch {
    return [];
  }
}

function writeAll(items: Aporte[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('aportes-change'));
  } catch {}
}

export function getAportes(paperId: string, sectionAnchor?: string): Aporte[] {
  const all = readAll();
  return all
    .filter((a) => a.paperId === paperId && (sectionAnchor === undefined || a.sectionAnchor === sectionAnchor))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addAporte(input: Omit<Aporte, 'id' | 'createdAt'>): Aporte {
  const aporte: Aporte = {
    ...input,
    id: `apo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.push(aporte);
  writeAll(all);
  return aporte;
}

export function removeAporte(id: string): void {
  const all = readAll().filter((a) => a.id !== id);
  writeAll(all);
}

export function getAportesCountByPaper(paperId: string): number {
  return readAll().filter((a) => a.paperId === paperId).length;
}
