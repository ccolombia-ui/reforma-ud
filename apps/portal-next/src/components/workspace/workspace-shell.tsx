'use client';

import { Suspense, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Group, Panel, Separator } from 'react-resizable-panels';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSecondaryPaneTabs, hydrateFromCompareParam } from '@/lib/secondary-pane-tabs';
import { useDocTabs } from '@/lib/doc-tabs';
import { useFocusedPane, type FocusedPane } from '@/lib/ui-state';
import { PaneShell } from '@/components/workspace/pane-shell';
import { cn } from '@/lib/utils';

const COMPARE_PARAM = 'compare';

/**
 * WorkspaceShell · v5.0b — wrapper de la zona center con soporte para 2 panes
 * lado-a-lado. Reemplaza a ComparativeSplit preservando compat con `?compare=`.
 *
 * Modelo:
 *   • Pane A (izq) = "primary" · controlado por Next router (pathname + ?tabs=)
 *   • Pane B (der) = "secondary" · localStorage (useSecondaryPaneTabs)
 *
 * Si pane B está vacío (sin tabs en localStorage y sin ?compare=), el shell
 * degrada a single-pane y renderiza children directo. Cero overhead frente
 * a v4.5 para usuarios que no usan multi-pane.
 *
 * Drag-drop:
 *   • Drag tab desde Pane A → drop en Pane B drop-zone → mueve la tab a B
 *   • Drag tab desde Pane B → drop en Pane A drop-zone → mueve la tab a A
 *
 * El sub-Group horizontal aísla el resize del split del shell exterior
 * (sidebars laterales no se ven afectados, paridad con v4.5a).
 */
export function WorkspaceShell({ children, paperId }: Readonly<{ children: React.ReactNode; paperId?: string }>) {
  return (
    <Suspense fallback={<>{children}</>}>
      <WorkspaceShellInner paperId={paperId}>{children}</WorkspaceShellInner>
    </Suspense>
  );
}

function WorkspaceShellInner({ children, paperId }: Readonly<{ children: React.ReactNode; paperId?: string }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const compareId = searchParams.get(COMPARE_PARAM);

  // Hidratación del legacy ?compare= → pane B en localStorage (idempotente)
  useEffect(() => {
    if (!compareId) return;
    hydrateFromCompareParam(compareId);
    // Limpiar el param del URL para que no se hidrate de nuevo en cada render
    const params = new URLSearchParams(searchParams.toString());
    params.delete(COMPARE_PARAM);
    const newSearch = params.toString();
    router.replace(`${pathname}${newSearch ? '?' + newSearch : ''}`, { scroll: false });
  }, [compareId, searchParams, router, pathname]);

  const paneB = useSecondaryPaneTabs();
  const docTabs = useDocTabs();
  const [focused, setFocused] = useFocusedPane();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // v5.0c · Atajos teclado workspace
  // Ctrl+\\        → toggle split (abrir B con segunda tab disponible / cerrar B)
  // Ctrl+Shift+\\  → swap A↔B (intercambia el doc activo entre panes)
  // Ctrl+1         → focus pane A
  // Ctrl+2         → focus pane B (si está abierto)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;

      if (e.key === '\\' && !e.shiftKey) {
        e.preventDefault();
        if (paneB.isOpen) {
          paneB.closePane();
          setFocused('a');
        } else {
          // Abrir el segundo tab disponible en B; si solo hay 1 tab, no-op
          const candidate = docTabs.tabs.find((t) => t.id !== docTabs.activeTabId);
          if (candidate) {
            paneB.openTab(candidate.id);
            setFocused('b');
          }
        }
      } else if (e.key === '\\' && e.shiftKey) {
        e.preventDefault();
        if (!paneB.isOpen || !paneB.activeTabId || !docTabs.activeTabId) return;
        const aId = docTabs.activeTabId;
        const bId = paneB.activeTabId;
        // Swap: B recibe A active, A activa lo que estaba en B (si ya está en A) o lo abre
        paneB.closeTab(bId);
        paneB.openTab(aId);
        docTabs.closeTab(aId);
        const inA = docTabs.tabs.find((t) => t.id === bId);
        if (inA) docTabs.activateTab(bId);
        else {
          const fromBOriginal = paneB.tabs.find((t) => t.id === bId);
          if (fromBOriginal) docTabs.openInNewTab(fromBOriginal.href);
        }
      } else if (e.key === '1') {
        e.preventDefault();
        setFocused('a');
      } else if (e.key === '2' && paneB.isOpen) {
        e.preventDefault();
        setFocused('b');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [docTabs, paneB, setFocused]);

  // Helpers extraídos para reducir complejidad cognitiva del onDragEnd
  const moveAtoB = useCallback((activeId: string) => {
    paneB.openTab(activeId);
    docTabs.closeTab(activeId);
  }, [paneB, docTabs]);

  const moveBtoA = useCallback((activeId: string) => {
    const fromB = paneB.tabs.find((t) => t.id === activeId);
    paneB.closeTab(activeId);
    if (fromB) docTabs.openInNewTab(fromB.href);
  }, [paneB, docTabs]);

  const reorderInPane = useCallback((pane: 'a' | 'b', activeId: string, overId: string) => {
    const tabs = pane === 'a' ? docTabs.tabs : paneB.tabs;
    const reorder = pane === 'a' ? docTabs.reorderTabs : paneB.reorderTabs;
    const fromIdx = tabs.findIndex((t) => t.id === activeId);
    const toIdx = tabs.findIndex((t) => t.id === overId);
    if (fromIdx >= 0 && toIdx >= 0) reorder(fromIdx, toIdx);
  }, [docTabs, paneB]);

  /**
   * v5.0b · onDragEnd unificado. Casos: reorder mismo pane · cross-pane via
   * drop-zone vacía · cross-pane via tab del pane destino.
   */
  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const fromPane = active.data.current?.pane as 'a' | 'b' | undefined;
    const toPane = over.data.current?.pane as 'a' | 'b' | undefined;

    // Drop en zona droppable cross-pane
    if (overId === 'pane-b-drop' && fromPane === 'a') return moveAtoB(activeId);
    if (overId === 'pane-a-drop' && fromPane === 'b') return moveBtoA(activeId);

    // Reorder mismo pane
    if (fromPane && fromPane === toPane) {
      reorderInPane(fromPane, activeId, overId);
      return;
    }

    // Cross-pane via tab del destino
    if (fromPane === 'a' && toPane === 'b') return moveAtoB(activeId);
    if (fromPane === 'b' && toPane === 'a') return moveBtoA(activeId);
  }, [moveAtoB, moveBtoA, reorderInPane]);

  // v5.0b · DndContext SIEMPRE montado para que sortable funcione tanto en
  // single-pane como multi-pane sin context-switching.
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {paneB.isOpen ? (
        <MultiPaneLayout
          paneB={paneB}
          focused={focused}
          setFocused={setFocused}
        >
          {children}
        </MultiPaneLayout>
      ) : (
        // Single-pane: render children directo, sin overhead visual
        <>{children}</>
      )}
    </DndContext>
  );
}

function MultiPaneLayout({
  children, paneB, focused, setFocused,
}: Readonly<{
  children: React.ReactNode;
  paneB: ReturnType<typeof useSecondaryPaneTabs>;
  focused: FocusedPane;
  setFocused: (p: FocusedPane) => void;
}>) {
  return (
    <div className="h-[calc(100vh-3.5rem)] no-print">
      <Group
        orientation="horizontal"
        id="workspace-shell"
        autoSave="reforma-ud:workspace-v5.0"
        className="flex h-full"
      >
        <Panel
          id="pane-a"
          defaultSize={50}
          minSize={25}
          className={cn(
            'overflow-y-auto transition-shadow',
            focused === 'a' && 'ring-2 ring-primary/30 ring-inset',
          )}
          data-pane="a"
        >
          <PaneFocusable onFocus={() => setFocused('a')} label="Pane izquierdo">
            <PaneADroppable>
              <div className="px-4 md:px-6 py-2">{children}</div>
            </PaneADroppable>
          </PaneFocusable>
        </Panel>

        <Separator className="group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>

        <Panel
          id="pane-b"
          defaultSize={50}
          minSize={25}
          className={cn(
            'overflow-y-auto transition-shadow',
            focused === 'b' && 'ring-2 ring-primary/30 ring-inset',
          )}
          data-pane="b"
        >
          <PaneFocusable onFocus={() => setFocused('b')} label="Pane derecho">
            <PaneShell
              paneId="b"
              tabs={paneB.tabs}
              activeTab={paneB.activeTab}
              activeTabId={paneB.activeTabId}
              activateTab={paneB.activateTab}
              closeTab={paneB.closeTab}
              reorderTabs={paneB.reorderTabs}
              onClosePane={paneB.closePane}
            />
          </PaneFocusable>
        </Panel>
      </Group>
    </div>
  );
}

/** v5.0c · Wrapper que captura focus al click en cualquier parte del pane.
 * Implementación con role="region" + onMouseDown — `<button>` no puede
 * contener children interactivos (article, links, forms). */
function PaneFocusable({
  children, onFocus, label,
}: Readonly<{
  children: React.ReactNode;
  onFocus: () => void;
  label: string;
}>) {
  return (
    <div
      role="region"
      aria-label={label}
      onMouseDown={onFocus}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFocus();
      }}
      tabIndex={-1}
      className="h-full"
    >
      {children}
    </div>
  );
}

/** Droppable wrapper para pane A (recibe tabs movidas desde B). */
function PaneADroppable({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setNodeRef, isOver } = useDroppable({ id: 'pane-a-drop' });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-full transition-colors ${isOver ? 'bg-primary/5 ring-2 ring-primary/40 ring-inset' : ''}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
 * Compat: <ComparativeSplit> ahora alias del WorkspaceShell.
 * Las páginas existentes (canonico/[mid]/page.tsx) siguen importándolo.
 * ============================================================ */
export function ComparativeSplit({ children, paperId }: Readonly<{ children: React.ReactNode; paperId?: string }>) {
  return <WorkspaceShell paperId={paperId}>{children}</WorkspaceShell>;
}

/**
 * CompareButton · v5.0b — abre un paper en pane B (split right).
 * Sustituto del CompareButton v4.4: en lugar de un dropdown con ?compare=,
 * cualquier paper se puede abrir en pane B desde el sidebar / cmd-K /
 * tab context menu "Abrir a la derecha".
 *
 * Mantiene la API del v4.4 para no romper el `[mid]/page.tsx`.
 */
export function CompareButton({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  return (
    <Suspense fallback={null}>
      <CompareButtonInner currentPaperId={currentPaperId} />
    </Suspense>
  );
}

function CompareButtonInner({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  const paneB = useSecondaryPaneTabs();
  const { tabs } = useDocTabs();
  const candidates = useMemo(
    () => tabs.filter((t) => t.id !== currentPaperId),
    [tabs, currentPaperId],
  );

  if (candidates.length === 0 && !paneB.isOpen) {
    return null;
  }

  if (paneB.isOpen) {
    return (
      <Button
        variant="default"
        size="sm"
        className="gap-1.5 no-print"
        onClick={paneB.closePane}
        title="Cerrar pane derecho"
      >
        <X className="h-3.5 w-3.5" />
        Cerrar split
      </Button>
    );
  }

  // Si solo hay 1 tab abierta (la actual), no hay candidato auto. El usuario
  // debe abrir la 2da con sidebar/cmd-K/click contextual. Render hint:
  if (candidates.length === 0) {
    return (
      <span className="text-[10px] text-muted-foreground italic no-print">
        Click derecho en una tab → "Abrir a la derecha"
      </span>
    );
  }

  // Auto-quick: abrir la 2da tab abierta en pane B
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 no-print"
      onClick={() => paneB.openTab(candidates[0].id)}
      title={`Abrir ${candidates[0].title} a la derecha`}
    >
      Comparar con {candidates[0].kind === 'paper' ? `M${String(candidates[0].number ?? 0).padStart(2, '0')}` : candidates[0].title.slice(0, 16)}
    </Button>
  );
}
