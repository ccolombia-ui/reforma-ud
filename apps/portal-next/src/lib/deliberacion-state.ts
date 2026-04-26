'use client';

/**
 * Deliberación — espacio bidireccional de la comunidad sobre un documento.
 * Cada unidad es una `Contribucion` (idea, alerta, marca de utilidad, pregunta).
 *
 * Renombrado en v4.5b D8 desde `aportes-state.ts`. Migra automáticamente la
 * key vieja `reforma-ud:aportes` → `reforma-ud:deliberacion` en la primera
 * lectura para no perder histórico de los betatesters.
 *
 * MVP: persistencia local. v5+ migrará a Vercel KV / Supabase con auth + roles BPA-003.
 */

export type ContribucionIntent = 'idea' | 'warning' | 'thumbs-up' | 'question';

export type Contribucion = {
  id: string;
  paperId: string;
  sectionAnchor?: string;       // null = comentario al doc completo
  intent: ContribucionIntent;
  content: string;              // markdown corto
  authorName: string;
  authorRole?: string;
  createdAt: string;            // ISO
};

const STORAGE_KEY = 'reforma-ud:deliberacion';
const LEGACY_KEY = 'reforma-ud:aportes';

export const INTENT_META: Record<ContribucionIntent, { emoji: string; label: string; color: string }> = {
  idea:        { emoji: '💡', label: 'Idea',        color: 'amber' },
  warning:     { emoji: '⚠️', label: 'Atención',    color: 'red' },
  'thumbs-up': { emoji: '👍', label: 'Útil',         color: 'emerald' },
  question:    { emoji: '❓', label: 'Pregunta',    color: 'blue' },
};

let migrated = false;

function migrateLegacyOnce(): void {
  if (migrated || typeof localStorage === 'undefined') return;
  migrated = true;
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_KEY);
    }
  } catch {}
}

function readAll(): Contribucion[] {
  if (typeof localStorage === 'undefined') return [];
  migrateLegacyOnce();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Contribucion[];
  } catch {
    return [];
  }
}

function writeAll(items: Contribucion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('deliberacion-change'));
  } catch {}
}

export function getDeliberacion(paperId: string, sectionAnchor?: string): Contribucion[] {
  const all = readAll();
  return all
    .filter((a) => a.paperId === paperId && (sectionAnchor === undefined || a.sectionAnchor === sectionAnchor))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addContribucion(input: Omit<Contribucion, 'id' | 'createdAt'>): Contribucion {
  const item: Contribucion = {
    ...input,
    id: `con-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.push(item);
  writeAll(all);
  return item;
}

export function removeContribucion(id: string): void {
  const all = readAll().filter((a) => a.id !== id);
  writeAll(all);
}

export function getDeliberacionCountByPaper(paperId: string): number {
  return readAll().filter((a) => a.paperId === paperId).length;
}
