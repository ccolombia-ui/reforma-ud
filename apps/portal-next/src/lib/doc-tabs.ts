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
};

const TABS_PARAM = 'tabs';

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
 * Hook: useDocTabs
 * ============================================================ */

export function useDocTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab activo = pathname actual
  const activeTabId = useMemo(() => (pathname ? hrefToTabId(pathname) : null), [pathname]);

  // Lista de tabs desde ?tabs=m01,m04
  const tabIds = useMemo<string[]>(() => {
    const raw = searchParams?.get(TABS_PARAM);
    if (!raw) return activeTabId ? [activeTabId] : [];
    const ids = raw.split(',').filter(Boolean);
    // Asegurar que el activo esté en la lista
    if (activeTabId && !ids.includes(activeTabId)) ids.push(activeTabId);
    return ids;
  }, [searchParams, activeTabId]);

  const tabs = useMemo<DocTab[]>(() => tabIds.map(resolveTab), [tabIds]);

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
      const nextIds = tabIds.map((id) => (id === activeTabId ? newId : id));
      // Deduplicar (si ya existía el destino)
      const deduped = Array.from(new Set(nextIds));
      router.push(buildUrl(destinationHref, deduped));
    },
    [tabIds, activeTabId, router, buildUrl],
  );

  /** Abre un nuevo tab (Ctrl+click). Navega a él. */
  const openInNewTab = useCallback(
    (destinationHref: string) => {
      const newId = hrefToTabId(destinationHref);
      if (!newId) {
        router.push(destinationHref);
        return;
      }
      const nextIds = tabIds.includes(newId) ? tabIds : [...tabIds, newId];
      router.push(buildUrl(destinationHref, nextIds));
    },
    [tabIds, router, buildUrl],
  );

  /** Abre tab en background (Mid-click): añade pero NO navega. */
  const openInBackground = useCallback(
    (destinationHref: string) => {
      const newId = hrefToTabId(destinationHref);
      if (!newId || !pathname) return;
      if (tabIds.includes(newId)) return;
      const nextIds = [...tabIds, newId];
      router.replace(buildUrl(pathname, nextIds), { scroll: false });
    },
    [tabIds, pathname, router, buildUrl],
  );

  /** Cierra un tab. Si era el activo, navega al previo. */
  const closeTab = useCallback(
    (tabId: string) => {
      const idx = tabIds.indexOf(tabId);
      if (idx < 0) return;
      const nextIds = tabIds.filter((id) => id !== tabId);
      if (nextIds.length === 0) {
        router.push('/canonico');
        return;
      }
      // Si cerramos el activo, navegar al hermano (idx-1 o 0)
      if (tabId === activeTabId) {
        const target = nextIds[Math.max(0, idx - 1)];
        const targetTab = resolveTab(target);
        router.push(buildUrl(targetTab.href, nextIds));
      } else if (pathname) {
        // Mantener tab activo, sólo actualizar lista
        router.replace(buildUrl(pathname, nextIds), { scroll: false });
      }
    },
    [tabIds, activeTabId, pathname, router, buildUrl],
  );

  /** Activa un tab existente. */
  const activateTab = useCallback(
    (tabId: string) => {
      const tab = resolveTab(tabId);
      router.push(buildUrl(tab.href, tabIds));
    },
    [tabIds, router, buildUrl],
  );

  return {
    tabs,
    activeTabId,
    replaceActive,
    openInNewTab,
    openInBackground,
    closeTab,
    activateTab,
  } as const;
}

/* ============================================================
 * SSR-safe wrapper: returns null until mounted
 * ============================================================ */

export function useMounted(): boolean {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
