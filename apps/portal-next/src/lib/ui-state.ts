'use client';

import { useEffect, useState } from 'react';

const KEYS = {
  leftSidebar: 'reforma-ud:left-sidebar-collapsed',
  leftSidebarWidth: 'reforma-ud:left-sidebar-width',
  rightPanel: 'reforma-ud:right-panel-collapsed',
  rightTab: 'reforma-ud:right-tab',
  activeRole: 'reforma-ud:active-role',
  userName: 'reforma-ud:user-name',
} as const;

export const LEFT_SIDEBAR_MIN = 200;
export const LEFT_SIDEBAR_MAX = 480;
export const LEFT_SIDEBAR_DEFAULT = 288; // ~ w-72

export const ROLES = [
  { id: 'estudiante',           name: 'Estudiante Soberano',           emoji: '🎓' },
  { id: 'docente-disenador',    name: 'Docente Diseñador (Arquitecto CCA)', emoji: '🎨' },
  { id: 'docente-formador',     name: 'Docente Formador (Active Learning)', emoji: '👨‍🏫' },
  { id: 'docente-investigador', name: 'Docente Investigador (Pasteur Pleno)', emoji: '🔬' },
  { id: 'docente-emprendedor',  name: 'Docente Emprendedor (Agente Territorial)', emoji: '🚀' },
  { id: 'docente-director',     name: 'Docente Director (Visionario Estratégico)', emoji: '🏛️' },
] as const;

export type RoleId = typeof ROLES[number]['id'];

const DEFAULT_ROLE: RoleId = 'docente-investigador';
const DEFAULT_NAME = 'Carlos C.';

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

/** Ancho del sidebar izquierdo en px. Persiste y se sincroniza entre instancias. */
export function useLeftWidth() {
  const [width, setWidth] = useState<number>(LEFT_SIDEBAR_DEFAULT);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(KEYS.leftSidebarWidth);
      if (raw) {
        const n = parseInt(raw, 10);
        if (Number.isFinite(n) && n >= LEFT_SIDEBAR_MIN && n <= LEFT_SIDEBAR_MAX) {
          setWidth(n);
        }
      }
    } catch {}

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string | number }>).detail;
      if (detail?.key === KEYS.leftSidebarWidth) {
        const n = typeof detail.value === 'number' ? detail.value : parseInt(String(detail.value), 10);
        if (Number.isFinite(n)) setWidth(n);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.leftSidebarWidth && e.newValue) {
        const n = parseInt(e.newValue, 10);
        if (Number.isFinite(n)) setWidth(n);
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setLeftWidth = (n: number) => {
    const clamped = Math.max(LEFT_SIDEBAR_MIN, Math.min(LEFT_SIDEBAR_MAX, Math.round(n)));
    setWidth(clamped);
    try {
      localStorage.setItem(KEYS.leftSidebarWidth, String(clamped));
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key: KEYS.leftSidebarWidth, value: clamped } }));
    } catch {}
  };

  return [width, setLeftWidth] as const;
}

export type RightTab = 'preguntas' | 'chat' | 'outline' | 'backlinks';
const VALID_RIGHT_TABS: readonly RightTab[] = ['preguntas', 'chat', 'outline', 'backlinks'] as const;
function isRightTab(v: string): v is RightTab {
  return (VALID_RIGHT_TABS as readonly string[]).includes(v);
}

/** Default: EXPANDIDO. Tab Preguntas por defecto. */
export function useRightPanel(defaultTab: RightTab = 'preguntas') {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [tab, setTabState] = useState<RightTab>(defaultTab);

  useEffect(() => {
    setCollapsed(read(KEYS.rightPanel, false) as boolean);
    const t = read(KEYS.rightTab, defaultTab) as string;
    if (isRightTab(t)) setTabState(t);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: boolean | string }>).detail;
      if (detail?.key === KEYS.rightPanel) {
        setCollapsed(detail.value as boolean);
      } else if (detail?.key === KEYS.rightTab) {
        const v = detail.value as string;
        if (isRightTab(v)) setTabState(v);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.rightPanel) {
        setCollapsed(e.newValue === 'true');
      }
      if (e.key === KEYS.rightTab) {
        const v = e.newValue;
        if (v && isRightTab(v)) setTabState(v);
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
  const setTab = (t: RightTab) => {
    setTabState(t);
    write(KEYS.rightTab, t);
  };
  return { collapsed, toggle, tab, setTab } as const;
}

/** Hook para rol activo + nombre del usuario. Sincronizado entre componentes. */
export function useActiveProfile() {
  const [role, setRoleState] = useState<RoleId>(DEFAULT_ROLE);
  const [name, setNameState] = useState<string>(DEFAULT_NAME);

  useEffect(() => {
    const r = read(KEYS.activeRole, DEFAULT_ROLE) as RoleId;
    const n = read(KEYS.userName, DEFAULT_NAME) as string;
    if (ROLES.some((x) => x.id === r)) setRoleState(r);
    if (typeof n === 'string' && n.length > 0) setNameState(n);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string | boolean }>).detail;
      if (detail?.key === KEYS.activeRole && typeof detail.value === 'string') {
        if (ROLES.some((x) => x.id === detail.value)) setRoleState(detail.value as RoleId);
      } else if (detail?.key === KEYS.userName && typeof detail.value === 'string') {
        setNameState(detail.value);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.activeRole && e.newValue && ROLES.some((x) => x.id === e.newValue)) {
        setRoleState(e.newValue as RoleId);
      }
      if (e.key === KEYS.userName && e.newValue) setNameState(e.newValue);
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setRole = (r: RoleId) => {
    setRoleState(r);
    write(KEYS.activeRole, r);
  };
  const setName = (n: string) => {
    setNameState(n);
    write(KEYS.userName, n);
  };

  const meta = ROLES.find((x) => x.id === role) ?? ROLES[3];
  return { role, name, setRole, setName, meta } as const;
}
