'use client';

/**
 * usePanesState · v5.1 Gap B — generalización a N panes secundarios.
 *
 * Antes (v5.0b): un solo pane B en localStorage. Ahora: array de panes
 * (b, c, d, ...), cada uno con su propia lista de tabs y activeTabId.
 * El pane A sigue siendo URL-driven via useDocTabs (Next router).
 *
 * Layout resultante en el centro: [A | B | C | ...] panes horizontales
 * lado-a-lado, cada uno con su tab strip independiente y drag cross-pane
 * via DnD-kit con `data.pane = paneId`.
 *
 * Persistencia: localStorage key `reforma-ud:panes` con shape:
 *   [{ id: 'b', tabs: ['m04', 'm08'], activeTabId: 'm04' }, ...]
 *
 * Compat v5.0b: si existe legacy key `reforma-ud:pane-b` se migra una
 * sola vez al array.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { canonicPaper, note, community } from '#site/content';

const STORAGE_KEY = 'reforma-ud:panes';
const LEGACY_PANE_B = 'reforma-ud:pane-b';
const EVENT = 'reforma-ud:panes-change';

export type PaneId = string; // 'b', 'c', 'd', ...

export type PaneState = {
  id: PaneId;
  tabs: string[];
  activeTabId: string | null;
};

export type SecondaryTab = {
  id: string;
  href: string;
  title: string;
  kind: 'paper' | 'note' | 'community' | 'unknown';
  number?: number;
};

const EMPTY: PaneState[] = [];

function migrateLegacy(): PaneState[] | null {
  try {
    const legacy = localStorage.getItem(LEGACY_PANE_B);
    if (!legacy) return null;
    const parsed = JSON.parse(legacy) as { tabs: string[]; activeTabId: string | null };
    if (!parsed.tabs?.length) return null;
    const migrated: PaneState[] = [{ id: 'b', tabs: parsed.tabs, activeTabId: parsed.activeTabId }];
    localStorage.removeItem(LEGACY_PANE_B);
    return migrated;
  } catch {
    return null;
  }
}

function readState(): PaneState[] {
  if (typeof localStorage === 'undefined') return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PaneState[];
    const migrated = migrateLegacy();
    if (migrated) {
      writeState(migrated);
      return migrated;
    }
    return EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeState(panes: PaneState[]): void {
  try {
    if (panes.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(panes));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT));
    }
  } catch {}
}

function resolveTab(id: string): SecondaryTab {
  if (/^m\d{2}$/i.test(id)) {
    const paper = canonicPaper.find((p) => p.id === id.toLowerCase());
    if (paper) {
      return { id: paper.id, href: paper.href, title: paper.title, kind: 'paper', number: paper.number };
    }
  }
  const decoded = decodeURIComponent(id);
  const noteDoc = note.find((n) => n.slug === decoded);
  if (noteDoc) {
    return { id: encodeURIComponent(noteDoc.slug), href: noteDoc.href, title: noteDoc.title, kind: 'note' };
  }
  const cop = community.find((c) => c.slug === decoded);
  if (cop) {
    return { id: encodeURIComponent(cop.slug), href: `/${cop.slug}`, title: cop.shortName ?? cop.name, kind: 'community' };
  }
  return { id, href: `/${decoded}`, title: id, kind: 'unknown' };
}

function nextPaneId(existing: PaneState[]): PaneId {
  // Asigna 'b', 'c', 'd', ... evitando colisión
  const used = new Set(existing.map((p) => p.id));
  for (let code = 'b'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
    const id = String.fromCharCode(code);
    if (!used.has(id)) return id;
  }
  return `pane-${Date.now()}`;
}

export function usePanesState() {
  const [panes, setPanes] = useState<PaneState[]>(EMPTY);

  useEffect(() => {
    setPanes(readState());
    const onChange = () => setPanes(readState());
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const update = useCallback((next: PaneState[]) => {
    setPanes(next);
    writeState(next);
  }, []);

  /** Abre un tab en un pane específico. Si el pane no existe, lo crea. */
  const openTabInPane = useCallback((paneId: PaneId, tabId: string) => {
    setPanes((prev) => {
      const idx = prev.findIndex((p) => p.id === paneId);
      let next: PaneState[];
      if (idx < 0) {
        next = [...prev, { id: paneId, tabs: [tabId], activeTabId: tabId }];
      } else {
        const cur = prev[idx];
        const exists = cur.tabs.includes(tabId);
        next = [...prev];
        next[idx] = {
          ...cur,
          tabs: exists ? cur.tabs : [...cur.tabs, tabId],
          activeTabId: tabId,
        };
      }
      writeState(next);
      return next;
    });
  }, []);

  /** Atajo: abre tab en el siguiente pane disponible (b si está vacío, sino c, etc.). */
  const openInNextPane = useCallback((tabId: string) => {
    setPanes((prev) => {
      // Si pane b ya tiene este tab, no-op
      const existing = prev.find((p) => p.tabs.includes(tabId));
      if (existing) {
        const i = prev.findIndex((p) => p.id === existing.id);
        const updated = [...prev];
        updated[i] = { ...updated[i], activeTabId: tabId };
        writeState(updated);
        return updated;
      }
      // Si no hay panes secundarios, abre en b
      if (prev.length === 0) {
        const fresh: PaneState[] = [{ id: 'b', tabs: [tabId], activeTabId: tabId }];
        writeState(fresh);
        return fresh;
      }
      // Si hay panes pero ninguno tiene espacio (todos tienen >=3 tabs?), abre en pane nuevo
      // Heurística simple: abre en el último pane existente
      const lastIdx = prev.length - 1;
      const next = [...prev];
      const last = next[lastIdx];
      if (!last.tabs.includes(tabId)) {
        next[lastIdx] = { ...last, tabs: [...last.tabs, tabId], activeTabId: tabId };
      } else {
        next[lastIdx] = { ...last, activeTabId: tabId };
      }
      writeState(next);
      return next;
    });
  }, []);

  /** Crea un nuevo pane a la derecha con el tab especificado. */
  const splitToNewPane = useCallback((tabId: string) => {
    setPanes((prev) => {
      const newId = nextPaneId(prev);
      const next: PaneState[] = [...prev, { id: newId, tabs: [tabId], activeTabId: tabId }];
      writeState(next);
      return next;
    });
  }, []);

  const activateTab = useCallback((paneId: PaneId, tabId: string) => {
    setPanes((prev) => {
      const idx = prev.findIndex((p) => p.id === paneId);
      if (idx < 0 || !prev[idx].tabs.includes(tabId)) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], activeTabId: tabId };
      writeState(next);
      return next;
    });
  }, []);

  const closeTab = useCallback((paneId: PaneId, tabId: string) => {
    setPanes((prev) => {
      const idx = prev.findIndex((p) => p.id === paneId);
      if (idx < 0) return prev;
      const cur = prev[idx];
      const tabIdx = cur.tabs.indexOf(tabId);
      if (tabIdx < 0) return prev;
      const newTabs = cur.tabs.filter((t) => t !== tabId);
      let next: PaneState[];
      if (newTabs.length === 0) {
        // pane queda vacío → eliminarlo
        next = prev.filter((p) => p.id !== paneId);
      } else {
        next = [...prev];
        next[idx] = {
          ...cur,
          tabs: newTabs,
          activeTabId: cur.activeTabId === tabId ? newTabs[Math.max(0, tabIdx - 1)] : cur.activeTabId,
        };
      }
      writeState(next);
      return next;
    });
  }, []);

  const closePane = useCallback((paneId: PaneId) => {
    setPanes((prev) => {
      const next = prev.filter((p) => p.id !== paneId);
      writeState(next);
      return next;
    });
  }, []);

  const reorderTabs = useCallback((paneId: PaneId, fromIdx: number, toIdx: number) => {
    setPanes((prev) => {
      const idx = prev.findIndex((p) => p.id === paneId);
      if (idx < 0) return prev;
      const cur = prev[idx];
      const arr = [...cur.tabs];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      const next = [...prev];
      next[idx] = { ...cur, tabs: arr };
      writeState(next);
      return next;
    });
  }, []);

  /** Mueve un tab desde origen a destino (puede ser de A externo). */
  const moveTab = useCallback((tabId: string, fromPaneId: PaneId | null, toPaneId: PaneId | null) => {
    if (fromPaneId === toPaneId) return;
    setPanes((prev) => {
      let next = [...prev];
      // Quitar de origen si era pane secundario
      if (fromPaneId) {
        const fi = next.findIndex((p) => p.id === fromPaneId);
        if (fi >= 0) {
          const cur = next[fi];
          const newTabs = cur.tabs.filter((t) => t !== tabId);
          if (newTabs.length === 0) {
            next = next.filter((p) => p.id !== fromPaneId);
          } else {
            next[fi] = {
              ...cur,
              tabs: newTabs,
              activeTabId: cur.activeTabId === tabId ? newTabs[0] : cur.activeTabId,
            };
          }
        }
      }
      // Añadir a destino si es pane secundario
      if (toPaneId) {
        const ti = next.findIndex((p) => p.id === toPaneId);
        if (ti < 0) {
          next = [...next, { id: toPaneId, tabs: [tabId], activeTabId: tabId }];
        } else {
          const cur = next[ti];
          if (!cur.tabs.includes(tabId)) {
            next[ti] = { ...cur, tabs: [...cur.tabs, tabId], activeTabId: tabId };
          } else {
            next[ti] = { ...cur, activeTabId: tabId };
          }
        }
      }
      writeState(next);
      return next;
    });
  }, []);

  // Vistas derivadas
  const panesView = useMemo(
    () => panes.map((p) => ({
      ...p,
      tabsResolved: p.tabs.map(resolveTab),
      activeTab: p.activeTabId ? resolveTab(p.activeTabId) : null,
    })),
    [panes],
  );

  return {
    panes: panesView,
    rawPanes: panes,
    isOpen: panes.length > 0,
    openTabInPane,
    openInNextPane,
    splitToNewPane,
    activateTab,
    closeTab,
    closePane,
    reorderTabs,
    moveTab,
  } as const;
}

/** Compat v5.0b · hidrata desde `?compare=m04` legacy URL. */
export function hydrateFromCompareParam(compareId: string | null): void {
  if (!compareId) return;
  const cur = readState();
  const id = compareId.toLowerCase();
  // Si ya existe en algún pane, no-op
  if (cur.some((p) => p.tabs.includes(id))) return;
  if (cur.length === 0) {
    writeState([{ id: 'b', tabs: [id], activeTabId: id }]);
  } else {
    const next = [...cur];
    next[0] = { ...next[0], tabs: [...next[0].tabs, id], activeTabId: id };
    writeState(next);
  }
}
