'use client';

import { useEffect, useState } from 'react';

const KEYS = {
  leftSidebar: 'reforma-ud:left-sidebar-collapsed',
  rightPanel: 'reforma-ud:right-panel-collapsed',
  rightTab: 'reforma-ud:right-tab',
} as const;

const EVENT = 'reforma-ud:ui-state-change';

function read(key: string, fallback: string | boolean): string | boolean {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    if (v === 'true') return true;
    if (v === 'false') return false;
    return v;
  } catch {
    return fallback;
  }
}

function write(key: string, value: string | boolean): void {
  try {
    localStorage.setItem(key, String(value));
    // Notificar a TODAS las instancias del hook (mismo tab)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key, value } }));
    }
  } catch {}
}

/** Default: EXPANDIDO (false). Se persiste en localStorage. */
export function useLeftCollapsed() {
  const [c, setC] = useState<boolean>(false);

  useEffect(() => {
    setC(read(KEYS.leftSidebar, false) as boolean);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: boolean }>).detail;
      if (detail?.key === KEYS.leftSidebar) {
        setC(detail.value);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.leftSidebar) {
        setC(e.newValue === 'true');
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    setC((v) => {
      const next = !v;
      write(KEYS.leftSidebar, next);
      return next;
    });
  };
  return [c, toggle] as const;
}

/** Default: EXPANDIDO. Tab Preguntas por defecto. */
export function useRightPanel(defaultTab: 'preguntas' | 'chat' = 'preguntas') {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [tab, setTabState] = useState<'preguntas' | 'chat'>(defaultTab);

  useEffect(() => {
    setCollapsed(read(KEYS.rightPanel, false) as boolean);
    const t = read(KEYS.rightTab, defaultTab) as string;
    if (t === 'preguntas' || t === 'chat') setTabState(t);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: boolean | string }>).detail;
      if (detail?.key === KEYS.rightPanel) {
        setCollapsed(detail.value as boolean);
      } else if (detail?.key === KEYS.rightTab) {
        const v = detail.value as string;
        if (v === 'preguntas' || v === 'chat') setTabState(v);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.rightPanel) {
        setCollapsed(e.newValue === 'true');
      }
      if (e.key === KEYS.rightTab) {
        const v = e.newValue;
        if (v === 'preguntas' || v === 'chat') setTabState(v);
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [defaultTab]);

  const toggle = () => {
    setCollapsed((v) => {
      const next = !v;
      write(KEYS.rightPanel, next);
      return next;
    });
  };
  const setTab = (t: 'preguntas' | 'chat') => {
    setTabState(t);
    write(KEYS.rightTab, t);
  };
  return { collapsed, toggle, tab, setTab } as const;
}
