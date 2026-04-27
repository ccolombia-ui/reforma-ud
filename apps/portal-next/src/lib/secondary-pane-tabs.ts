'use client';

/**
 * useSecondaryPaneTabs · v5.0b D2/D4 — gestión de tabs del pane secundario
 * (a la derecha del split). Independiente del Next router: estado local en
 * localStorage, no afecta `pathname` ni `?tabs=`.
 *
 * Modelo:
 *   • paneA (izquierdo) usa `useDocTabs()` → URL-driven (pathname + ?tabs=)
 *   • paneB (derecho) usa este hook → cliente puro, persistido en localStorage
 *
 * Esto permite que cada pane tenga sus propias tabs sin que el navegador back/
 * forward "rompa" el split. Al recargar, paneB se restaura desde localStorage;
 * paneA desde la URL.
 *
 * Compat con `?compare=m04` legacy (v4.4): si el URL trae compare y paneB está
 * vacío, hidratamos paneB con esa tab antes de hacer caso al localStorage.
 *
 * Persistencia v5.0c: cuando el árbol de panes crezca a N>2, este hook se
 * generaliza a `usePaneTabs(paneId)` con keys por pane.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { canonicPaper, note, community } from '#site/content';

const STORAGE_KEY = 'reforma-ud:pane-b';
const EVENT = 'reforma-ud:pane-b-change';

export type SecondaryTab = {
  id: string;
  href: string;
  title: string;
  kind: 'paper' | 'note' | 'community' | 'unknown';
  number?: number;
};

type PersistedState = {
  tabs: string[];          // ids
  activeTabId: string | null;
};

const EMPTY: PersistedState = { tabs: [], activeTabId: null };

function readState(): PersistedState {
  if (typeof localStorage === 'undefined') return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return EMPTY;
  }
}

function writeState(s: PersistedState): void {
  try {
    if (s.tabs.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
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

export function useSecondaryPaneTabs() {
  const [state, setState] = useState<PersistedState>(EMPTY);

  useEffect(() => {
    setState(readState());
    const onChange = () => setState(readState());
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const tabs = useMemo<SecondaryTab[]>(
    () => state.tabs.map(resolveTab),
    [state.tabs],
  );

  const update = useCallback((next: PersistedState) => {
    setState(next);
    writeState(next);
  }, []);

  /** Añade un tab al pane B (lo activa). Idempotente: si ya existe, solo activa. */
  const openTab = useCallback((id: string) => {
    setState((prev) => {
      const exists = prev.tabs.includes(id);
      const next: PersistedState = {
        tabs: exists ? prev.tabs : [...prev.tabs, id],
        activeTabId: id,
      };
      writeState(next);
      return next;
    });
  }, []);

  /** Activa un tab existente. */
  const activateTab = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.tabs.includes(id)) return prev;
      const next: PersistedState = { ...prev, activeTabId: id };
      writeState(next);
      return next;
    });
  }, []);

  /** Cierra un tab. Si era activo, salta al hermano. Si era el último, vacía pane. */
  const closeTab = useCallback((id: string) => {
    setState((prev) => {
      const idx = prev.tabs.indexOf(id);
      if (idx < 0) return prev;
      const newTabs = prev.tabs.filter((t) => t !== id);
      const newActive = prev.activeTabId === id
        ? (newTabs[Math.max(0, idx - 1)] ?? null)
        : prev.activeTabId;
      const next: PersistedState = { tabs: newTabs, activeTabId: newActive };
      writeState(next);
      return next;
    });
  }, []);

  /** Cierra todo el pane B (vacía la lista). */
  const closePane = useCallback(() => {
    update(EMPTY);
  }, [update]);

  /** Reordena tabs del pane B (drag-reorder dentro de B). */
  const reorderTabs = useCallback((fromIdx: number, toIdx: number) => {
    setState((prev) => {
      const arr = [...prev.tabs];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      const next: PersistedState = { ...prev, tabs: arr };
      writeState(next);
      return next;
    });
  }, []);

  return {
    tabs,
    activeTabId: state.activeTabId,
    activeTab: state.activeTabId ? resolveTab(state.activeTabId) : null,
    isOpen: state.tabs.length > 0,
    openTab,
    activateTab,
    closeTab,
    closePane,
    reorderTabs,
  } as const;
}

/** Hidrata pane B desde el query param legacy `?compare=m04` (v4.4 compat). */
export function hydrateFromCompareParam(compareId: string | null): void {
  if (!compareId) return;
  const cur = readState();
  const target = compareId.toLowerCase();
  if (cur.tabs.includes(target)) return;
  writeState({
    tabs: [...cur.tabs, target],
    activeTabId: target,
  });
}
