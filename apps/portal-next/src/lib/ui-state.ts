'use client';

import { useEffect, useState } from 'react';

const KEYS = {
  leftSidebar: 'reforma-ud:left-sidebar-collapsed',
  leftSidebarWidth: 'reforma-ud:left-sidebar-width',
  rightPanel: 'reforma-ud:right-panel-collapsed',
  rightPanelWidth: 'reforma-ud:right-panel-width',
  rightTab: 'reforma-ud:right-tab',
  conexionesSubTab: 'reforma-ud:conexiones-subtab',
  activeRole: 'reforma-ud:active-role',
  userName: 'reforma-ud:user-name',
  focusedPane: 'reforma-ud:focused-pane',
  focusMode: 'reforma-ud:focus-mode',  // v6.1 G-WS-02 · ambas barras colapsadas
  workspaceOrientation: 'reforma-ud:workspace-orientation', // v6.2 G-WS-01 · horizontal | vertical
  splitMode: 'reforma-ud:split-mode',                       // v7.6 · split on/off (default OFF)
} as const;

export const LEFT_SIDEBAR_MIN = 200;
export const LEFT_SIDEBAR_MAX = 480;
export const LEFT_SIDEBAR_DEFAULT = 288; // ~ w-72

export const RIGHT_SIDEBAR_MIN = 280;
export const RIGHT_SIDEBAR_MAX = 720;
export const RIGHT_SIDEBAR_DEFAULT = 320; // ~ w-80

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

/** Ancho del right panel en px. Persiste y se sincroniza entre instancias. v4.4 */
export function useRightWidth() {
  const [width, setWidth] = useState<number>(RIGHT_SIDEBAR_DEFAULT);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(KEYS.rightPanelWidth);
      if (raw) {
        const n = parseInt(raw, 10);
        if (Number.isFinite(n) && n >= RIGHT_SIDEBAR_MIN && n <= RIGHT_SIDEBAR_MAX) {
          setWidth(n);
        }
      }
    } catch {}

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string | number }>).detail;
      if (detail?.key === KEYS.rightPanelWidth) {
        const n = typeof detail.value === 'number' ? detail.value : parseInt(String(detail.value), 10);
        if (Number.isFinite(n)) setWidth(n);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.rightPanelWidth && e.newValue) {
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

  const setRightWidth = (n: number) => {
    const clamped = Math.max(RIGHT_SIDEBAR_MIN, Math.min(RIGHT_SIDEBAR_MAX, Math.round(n)));
    setWidth(clamped);
    try {
      localStorage.setItem(KEYS.rightPanelWidth, String(clamped));
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key: KEYS.rightPanelWidth, value: clamped } }));
    } catch {}
  };

  return [width, setRightWidth] as const;
}

// v5.0aa — Tabs PLANAS (sin agrupador "Conexiones"). Antes había 4 tabs
// con conexiones como wrapper de esquema/grafo/evolucion (accordion). Para
// MVP el usuario prefiere todo flat: 6 tabs directas en el icon rail.
// Migración: legacy 'chat' → 'asistente', 'backlinks' → 'refs',
// 'conexiones' → 'esquema' (default razonable del antiguo accordion).
export type RightTab = 'esquema' | 'grafo' | 'evolucion' | 'refs' | 'comunidad' | 'asistente';
const VALID_RIGHT_TABS: readonly RightTab[] = ['esquema', 'grafo', 'evolucion', 'refs', 'comunidad', 'asistente'] as const;
function isRightTab(v: string): v is RightTab {
  return (VALID_RIGHT_TABS as readonly string[]).includes(v);
}
function normalizeRightTab(v: string | null): RightTab | null {
  if (!v) return null;
  if (v === 'chat') return 'asistente';
  if (v === 'backlinks') return 'refs';
  if (v === 'conexiones') return 'esquema';  // wrapper colapsado → su sub-tab default
  return isRightTab(v) ? v : null;
}

// Legacy export retenido para compat con setSubTab del Kanban CTA.
// Ahora redirige al RightTab plano correspondiente (esquema/grafo/evolucion).
export type ConexionesSubTab = 'esquema' | 'grafo' | 'evolucion';
const VALID_CONEXIONES_SUB: readonly ConexionesSubTab[] = ['esquema', 'grafo', 'evolucion'] as const;
function isConexionesSubTab(v: string): v is ConexionesSubTab {
  return (VALID_CONEXIONES_SUB as readonly string[]).includes(v);
}

/** Default: EXPANDIDO. Tab Esquema por defecto cuando hay doc activo. */
export function useRightPanel(defaultTab: RightTab = 'esquema') {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [tab, setTabState] = useState<RightTab>(defaultTab);

  useEffect(() => {
    setCollapsed(read(KEYS.rightPanel, false) as boolean);
    const t = read(KEYS.rightTab, defaultTab) as string;
    const normalized = normalizeRightTab(t);
    if (normalized) {
      setTabState(normalized);
      // Si vino del legacy, sobrescribir storage para no migrar de nuevo
      if (t !== normalized) write(KEYS.rightTab, normalized);
    }

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: boolean | string }>).detail;
      if (detail?.key === KEYS.rightPanel) {
        setCollapsed(detail.value as boolean);
      } else if (detail?.key === KEYS.rightTab) {
        const v = detail.value as string;
        const n = normalizeRightTab(v);
        if (n) setTabState(n);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.rightPanel) {
        setCollapsed(e.newValue === 'true');
      }
      if (e.key === KEYS.rightTab) {
        const n = normalizeRightTab(e.newValue);
        if (n) setTabState(n);
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

/* ============================================================
 * v5.0c · Focused pane (A | B) — qué pane recibe foco para shortcuts y RightPanel
 * ============================================================ */

// v5.1 · Generalizado a string para soportar N panes (a, b, c, d, ...).
// El componente WorkspaceShell valida que el id corresponda a un pane existente.
export type FocusedPane = string;

function isFocusedPane(v: string): v is FocusedPane {
  return /^[a-z]$|^pane-\d+$/.test(v);
}

export function useFocusedPane(defaultPane: FocusedPane = 'a') {
  const [pane, setPaneState] = useState<FocusedPane>(defaultPane);

  useEffect(() => {
    const v = read(KEYS.focusedPane, defaultPane) as string;
    if (isFocusedPane(v)) setPaneState(v);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string }>).detail;
      if (detail?.key === KEYS.focusedPane && isFocusedPane(detail.value)) {
        setPaneState(detail.value);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.focusedPane && e.newValue && isFocusedPane(e.newValue)) {
        setPaneState(e.newValue);
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [defaultPane]);

  const setPane = (p: FocusedPane) => {
    setPaneState(p);
    write(KEYS.focusedPane, p);
  };
  return [pane, setPane] as const;
}

/** Sub-tab del tab Conexiones (esquema | grafo | evolucion). v4.5b D2. */
export function useConexionesSubTab(defaultSub: ConexionesSubTab = 'esquema') {
  const [sub, setSubState] = useState<ConexionesSubTab>(defaultSub);

  useEffect(() => {
    const v = read(KEYS.conexionesSubTab, defaultSub) as string;
    if (isConexionesSubTab(v)) setSubState(v);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string }>).detail;
      if (detail?.key === KEYS.conexionesSubTab && isConexionesSubTab(detail.value)) {
        setSubState(detail.value);
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.conexionesSubTab && e.newValue && isConexionesSubTab(e.newValue)) {
        setSubState(e.newValue);
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [defaultSub]);

  const setSub = (s: ConexionesSubTab) => {
    setSubState(s);
    write(KEYS.conexionesSubTab, s);
  };
  return [sub, setSub] as const;
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

/* ============================================================
 * v6.1 G-WS-02 · Focus mode (oculta ambas barras simultáneamente)
 * ============================================================ */

export function useFocusMode() {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(read(KEYS.focusMode, false) as boolean);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: boolean }>).detail;
      if (detail?.key === KEYS.focusMode) setActive(detail.value);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEYS.focusMode) setActive(e.newValue === 'true');
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    setActive((v) => {
      const next = !v;
      write(KEYS.focusMode, next);
      // Sincroniza ambas barras: si activo focus → colapsar ambas.
      // Si lo desactivo → re-abrir ambas.
      write(KEYS.leftSidebar, next);
      write(KEYS.rightPanel, next);
      return next;
    });
  };
  return [active, toggle] as const;
}

/* ============================================================
 * v6.2 G-WS-01 · Orientación del workspace (horizontal | vertical).
 * Permite split vertical (panes apilados arriba/abajo) en lugar del
 * default lado-a-lado.
 * ============================================================ */

export type WorkspaceOrientation = 'horizontal' | 'vertical';

export function useWorkspaceOrientation() {
  const [orient, setOrientState] = useState<WorkspaceOrientation>('horizontal');
  useEffect(() => {
    const v = read(KEYS.workspaceOrientation, 'horizontal') as string;
    if (v === 'horizontal' || v === 'vertical') setOrientState(v);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string | boolean }>).detail;
      if (detail?.key === KEYS.workspaceOrientation && (detail.value === 'horizontal' || detail.value === 'vertical')) {
        setOrientState(detail.value);
      }
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const setOrient = (o: WorkspaceOrientation) => {
    setOrientState(o);
    write(KEYS.workspaceOrientation, o);
  };
  const toggle = () => setOrient(orient === 'horizontal' ? 'vertical' : 'horizontal');
  return { orientation: orient, setOrientation: setOrient, toggle } as const;
}

/**
 * v7.6 · useSplitMode — toggle binary split-on/off del header.
 *
 * Default OFF: clicks en wikilinks/refs van a pane A (URL change).
 * ON: clicks van al último pane secundario usado (B/C/...).
 *
 * El usuario activa/desactiva con icono SplitSquareHorizontal en header.
 */
export function useSplitMode() {
  const [split, setSplitState] = useState<boolean>(false);
  useEffect(() => {
    const v = read(KEYS.splitMode, false) as boolean;
    setSplitState(!!v);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; value: string | boolean }>).detail;
      if (detail?.key === KEYS.splitMode) setSplitState(!!detail.value);
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const setSplit = (v: boolean) => {
    setSplitState(v);
    write(KEYS.splitMode, v);
  };
  const toggle = () => setSplit(!split);
  return { splitMode: split, setSplitMode: setSplit, toggle } as const;
}
