/** Persistencia local de progreso de lectura. localStorage; sin backend. */

export type SectionStatus = 'unread' | 'reading' | 'completed' | 'verified';

export type ReadingDoc = {
  sections: Record<string, SectionStatus>;
  progress: number; // 0-100
  startedAt: string;
  lastReadAt: string;
};

export type ReadingState = {
  docs: Record<string, ReadingDoc>;
};

const KEY = 'reforma-ud:reading-state';

export function getReadingState(): ReadingState {
  if (typeof localStorage === 'undefined') return { docs: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { docs: {} };
    return JSON.parse(raw) as ReadingState;
  } catch {
    return { docs: {} };
  }
}

export function saveReadingState(s: ReadingState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent('reading-state-change'));
  } catch {}
}

export function markSection(docId: string, sectionAnchor: string, status: SectionStatus, totalSections: number): ReadingState {
  const state = getReadingState();
  const now = new Date().toISOString();
  const doc = state.docs[docId] ?? {
    sections: {},
    progress: 0,
    startedAt: now,
    lastReadAt: now,
  };
  doc.sections[sectionAnchor] = status;
  doc.lastReadAt = now;
  const completed = Object.values(doc.sections).filter((s) => s === 'completed' || s === 'verified').length;
  doc.progress = totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0;
  state.docs[docId] = doc;
  saveReadingState(state);
  return state;
}

export function getDocProgress(docId: string): number {
  const state = getReadingState();
  return state.docs[docId]?.progress ?? 0;
}

export function getSectionStatus(docId: string, anchor: string): SectionStatus {
  const state = getReadingState();
  return state.docs[docId]?.sections[anchor] ?? 'unread';
}

export function clearAll(): void {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent('reading-state-change'));
  } catch {}
}
