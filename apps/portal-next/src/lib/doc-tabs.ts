'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { canonicPaper, note, community } from '#site/content';

export type DocTab = {
  id: string;          // raw id stored in URL (e.g. m04 or comunidades/.../slug-encoded)
  href: string;        // navigable url
  title: string;
  kind: 'paper' | 'note' | 'community' | 'unknown';
  number?: number;
  pinned?: boolean;
};

const TABS_PARAM = 'tabs';
const PINNED_KEY = 'reforma-ud:pinned-tabs';
const PINNED_EVENT = 'reforma-ud:pinned-tabs-change';

/* ============================================================
 * Resolución id → DocTab
 * ============================================================ */

function resolveTab(id: string): DocTab {
  // Paper canónico: m##
  if (/^m\d{2}$/i.test(id)) {
    const paper = canonicPaper.find((p) => p.id === id.toLowerCase());
    if (paper) {
      return {
        id: paper.id,
        href: paper.href,
        title: paper.title,
        kind: 'paper',
        number: paper.number,
      };
    }
  }
  // Comunidad o nota: id codifica slug con guiones (slash → /)
  // Convención: en URL guardamos paths con `/` originales, URL-encode en serialización
  const decoded = decodeURIComponent(id);
  const noteDoc = note.find((n) => n.slug === decoded);
  if (noteDoc) {
    return {
      id: encodeURIComponent(noteDoc.slug),
      href: noteDoc.href,
      title: noteDoc.title,
      kind: 'note',
    };
  }
  const cop = community.find((c) => c.slug === decoded);
  if (cop) {
    return {
      id: encodeURIComponent(cop.slug),
      href: `/${cop.slug}`,
      title: cop.shortName ?? cop.name,
      kind: 'community',
    };
  }
  return { id, href: `/${decoded.replace(/^\//, '')}`, title: id, kind: 'unknown' };
}

/** Convierte un href a id de tab (paper id o slug encoded). */
export function hrefToTabId(href: string): string | null {
  if (!href || href.startsWith('http')) return null;
  const clean = href.split('#')[0].split('?')[0];
  if (clean.startsWith('/canonico/')) {
    const id = clean.replace('/canonico/', '').replace(/\/$/, '');
    if (/^m\d{2}$/i.test(id)) return id.toLowerCase();
  }
  if (clean.startsWith('/comunidades/')) {
    const slug = clean.replace(/^\//, '').replace(/\/$/, '');
    return encodeURIComponent(slug);
  }
  return null;
}

/* ============================================================
 * Pin tabs · v5.0a — persistido en localStorage (no URL).
 * Pinneadas no se cierran con Ctrl+W ni mid-click; van primero en el orden.
 * ============================================================ */

function readPinned(): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(PINNED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function writePinned(set: Set<string>): void {
  try {
    localStorage.setItem(PINNED_KEY, JSON.stringify(Array.from(set)));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PINNED_EVENT));
    }
  } catch {}
}

function usePinnedTabs(): { pinned: Set<string>; setPinned: (s: Set<string>) => void } {
  const [pinned, setPinnedState] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    setPinnedState(readPinned());
    const onChange = () => setPinnedState(readPinned());
    window.addEventListener(PINNED_EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(PINNED_EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);
  const setPinned = useCallback((s: Set<string>) => {
    setPinnedState(s);
    writePinned(s);
  }, []);
  return { pinned, setPinned };
}

/* ============================================================
 * Hook: useDocTabs
 * ============================================================ */

export function useDocTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { pinned, setPinned } = usePinnedTabs();

  // Tab activo = pathname actual
  const activeTabId = useMemo(() => (pathname ? hrefToTabId(pathname) : null), [pathname]);

  // Lista de tabs desde ?tabs=m01,m04 — más las pinneadas (siempre presentes)
  const tabIds = useMemo<string[]>(() => {
    const raw = searchParams?.get(TABS_PARAM);
    const fromUrl = raw ? raw.split(',').filter(Boolean) : (activeTabId ? [activeTabId] : []);
    // Inyectar pinneadas que no estén en URL
    const pinnedArray = Array.from(pinned);
    const merged = [
      ...pinnedArray.filter((p) => !fromUrl.includes(p)),
      ...fromUrl,
    ];
    if (activeTabId && !merged.includes(activeTabId)) merged.push(activeTabId);
    return merged;
  }, [searchParams, activeTabId, pinned]);

  // Sort: pinneadas primero (en su orden de inserción), no-pinneadas después
  const sortedTabIds = useMemo(() => {
    const pinnedIds = tabIds.filter((id) => pinned.has(id));
    const unpinnedIds = tabIds.filter((id) => !pinned.has(id));
    return [...pinnedIds, ...unpinnedIds];
  }, [tabIds, pinned]);

  const tabs = useMemo<DocTab[]>(
    () => sortedTabIds.map((id) => ({ ...resolveTab(id), pinned: pinned.has(id) })),
    [sortedTabIds, pinned],
  );

  /** Construye URL con la lista de tabs especificada. */
  const buildUrl = useCallback(
    (targetHref: string, ids: string[]) => {
      const url = new URL(targetHref, 'http://x');
      if (ids.length > 1) {
        url.searchParams.set(TABS_PARAM, ids.join(','));
      } else {
        url.searchParams.delete(TABS_PARAM);
      }
      return url.pathname + url.search + url.hash;
    },
    [],
  );

  /** Reemplaza el tab activo por destinationHref (default click). */
  const replaceActive = useCallback(
    (destinationHref: string) => {
      const newId = hrefToTabId(destinationHref);
      if (!newId) {
        router.push(destinationHref);
        return;
      }
      const nextIds = sortedTabIds.map((id) => (id === activeTabId ? newId : id));
      // Deduplicar (si ya existía el destino)
      const deduped = Array.from(new Set(nextIds));
      router.push(buildUrl(destinationHref, deduped));
    },
    [sortedTabIds, activeTabId, router, buildUrl],
  );

  /** Abre un nuevo tab (Ctrl+click). Navega a él. */
  const openInNewTab = useCallback(
    (destinationHref: string) => {
      const newId = hrefToTabId(destinationHref);
      if (!newId) {
        router.push(destinationHref);
        return;
      }
      const nextIds = sortedTabIds.includes(newId) ? sortedTabIds : [...sortedTabIds, newId];
      router.push(buildUrl(destinationHref, nextIds));
    },
    [sortedTabIds, router, buildUrl],
  );

  /** Abre tab en background (Mid-click): añade pero NO navega. */
  const openInBackground = useCallback(
    (destinationHref: string) => {
      const newId = hrefToTabId(destinationHref);
      if (!newId || !pathname) return;
      if (sortedTabIds.includes(newId)) return;
      const nextIds = [...sortedTabIds, newId];
      router.replace(buildUrl(pathname, nextIds), { scroll: false });
    },
    [sortedTabIds, pathname, router, buildUrl],
  );

  /** Cierra un tab. Si era el activo, navega al previo. Pinneadas se ignoran. */
  const closeTab = useCallback(
    (tabId: string) => {
      if (pinned.has(tabId)) return; // v5.0a · pinned no se cierra
      const idx = sortedTabIds.indexOf(tabId);
      if (idx < 0) return;
      // v6.2 G-WS-04 · push al stack de tabs cerradas para Ctrl+Shift+T
      pushClosedTab(tabId);
      const nextIds = sortedTabIds.filter((id) => id !== tabId);
      if (nextIds.length === 0) {
        router.push('/canonico');
        return;
      }
      if (tabId === activeTabId) {
        const target = nextIds[Math.max(0, idx - 1)];
        const targetTab = resolveTab(target);
        router.push(buildUrl(targetTab.href, nextIds));
      } else if (pathname) {
        router.replace(buildUrl(pathname, nextIds), { scroll: false });
      }
    },
    [sortedTabIds, activeTabId, pathname, router, buildUrl, pinned],
  );

  // v6.2 G-WS-04 · Reabre la última tab cerrada (Ctrl+Shift+T).
  const reopenLastClosed = useCallback(() => {
    const lastId = popClosedTab();
    if (!lastId) return;
    const tab = resolveTab(lastId);
    if (sortedTabIds.includes(lastId)) {
      router.push(buildUrl(tab.href, sortedTabIds));
      return;
    }
    const nextIds = [...sortedTabIds, lastId];
    router.push(buildUrl(tab.href, nextIds));
  }, [sortedTabIds, router, buildUrl]);

  /** Activa un tab existente. */
  const activateTab = useCallback(
    (tabId: string) => {
      const tab = resolveTab(tabId);
      router.push(buildUrl(tab.href, sortedTabIds));
    },
    [sortedTabIds, router, buildUrl],
  );

  /** v5.0a · Cierra todas las tabs excepto la indicada. Pinneadas se preservan. */
  const closeOthers = useCallback(
    (keepId: string) => {
      const nextIds = sortedTabIds.filter((id) => id === keepId || pinned.has(id));
      const target = resolveTab(keepId);
      router.push(buildUrl(target.href, nextIds));
    },
    [sortedTabIds, router, buildUrl, pinned],
  );

  /** v5.0a · Cierra todas las tabs a la derecha de la indicada. Pinneadas se preservan. */
  const closeToRight = useCallback(
    (fromId: string) => {
      const idx = sortedTabIds.indexOf(fromId);
      if (idx < 0) return;
      const nextIds = sortedTabIds.filter(
        (id, i) => i <= idx || pinned.has(id),
      );
      // Si el activo se cerró, navegar al fromId
      if (activeTabId && !nextIds.includes(activeTabId)) {
        const target = resolveTab(fromId);
        router.push(buildUrl(target.href, nextIds));
      } else if (pathname) {
        router.replace(buildUrl(pathname, nextIds), { scroll: false });
      }
    },
    [sortedTabIds, activeTabId, pathname, router, buildUrl, pinned],
  );

  /** v5.0a · Toggle pin de una tab. Pinneada → fija al inicio + persiste localStorage. */
  const togglePin = useCallback(
    (tabId: string) => {
      const next = new Set(pinned);
      if (next.has(tabId)) next.delete(tabId);
      else next.add(tabId);
      setPinned(next);
    },
    [pinned, setPinned],
  );

  /**
   * v5.0a · Reordena tabs no-pinneadas. Las pinneadas mantienen orden estable
   * al inicio (el drag-reorder no las mueve); solo las no-pinneadas son sortable.
   */
  const reorderTabs = useCallback(
    (fromIdx: number, toIdx: number) => {
      const arr = [...sortedTabIds];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      // Pinneadas siempre van primero, no se mueven
      const pinnedIds = arr.filter((id) => pinned.has(id));
      const unpinnedIds = arr.filter((id) => !pinned.has(id));
      const newOrder = [...pinnedIds, ...unpinnedIds];
      if (pathname) {
        router.replace(buildUrl(pathname, newOrder), { scroll: false });
      }
    },
    [sortedTabIds, pinned, pathname, router, buildUrl],
  );

  return {
    tabs,
    activeTabId,
    pinned,
    replaceActive,
    openInNewTab,
    openInBackground,
    closeTab,
    activateTab,
    closeOthers,
    closeToRight,
    togglePin,
    reorderTabs,
    reopenLastClosed,
  } as const;
}

/* ============================================================
 * v6.2 G-WS-04 · Stack de tabs cerradas (Ctrl+Shift+T para reabrir)
 * ============================================================ */

const CLOSED_TABS_KEY = 'reforma-ud:closed-tabs-history';
const CLOSED_TABS_LIMIT = 10;

function pushClosedTab(tabId: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(CLOSED_TABS_KEY);
    const stack: string[] = raw ? JSON.parse(raw) : [];
    // Evitar duplicado consecutivo
    if (stack[stack.length - 1] !== tabId) stack.push(tabId);
    while (stack.length > CLOSED_TABS_LIMIT) stack.shift();
    localStorage.setItem(CLOSED_TABS_KEY, JSON.stringify(stack));
  } catch { /* localStorage full or denied */ }
}

function popClosedTab(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CLOSED_TABS_KEY);
    if (!raw) return null;
    const stack: string[] = JSON.parse(raw);
    const last = stack.pop();
    localStorage.setItem(CLOSED_TABS_KEY, JSON.stringify(stack));
    return last ?? null;
  } catch {
    return null;
  }
}

/* ============================================================
 * SSR-safe wrapper: returns null until mounted
 * ============================================================ */

export function useMounted(): boolean {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
