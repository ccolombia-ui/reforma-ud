'use client';

import { useEffect, useState } from 'react';

const KEYS = {
  leftSidebar: 'reforma-ud:left-sidebar-collapsed',
  rightPanel: 'reforma-ud:right-panel-collapsed',
  rightTab: 'reforma-ud:right-tab',
} as const;

function read(key: string, fallback: string | boolean): string | boolean {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === 'true' ? true : v === 'false' ? false : v;
  } catch {
    return fallback;
  }
}

function write(key: string, value: string | boolean): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
}

export function useLeftCollapsed() {
  const [c, setC] = useState<boolean>(false);
  useEffect(() => setC(read(KEYS.leftSidebar, false) as boolean), []);
  const toggle = () => {
    setC((v) => {
      const next = !v;
      write(KEYS.leftSidebar, next);
      return next;
    });
  };
  return [c, toggle] as const;
}

export function useRightPanel(defaultTab: 'preguntas' | 'chat' = 'preguntas') {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [tab, setTabState] = useState<'preguntas' | 'chat'>(defaultTab);
  useEffect(() => {
    setCollapsed(read(KEYS.rightPanel, false) as boolean);
    const t = read(KEYS.rightTab, defaultTab) as string;
    if (t === 'preguntas' || t === 'chat') setTabState(t);
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
