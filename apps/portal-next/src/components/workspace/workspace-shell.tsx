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
import { usePanesState, hydrateFromCompareParam, type PaneId } from '@/lib/panes-state';
import { useDocTabs } from '@/lib/doc-tabs';
import { useFocusedPane } from '@/lib/ui-state';
import { PaneShell } from '@/components/workspace/pane-shell';
import { cn } from '@/lib/utils';

const COMPARE_PARAM = 'compare';

/**
 * WorkspaceShell · v5.1 — N panes secundarios + el pane primario A.
 *
 * Layout: [A | B | C | D | ...] horizontal, cada pane con tab strip
 * independiente. Drag inter-pane via @dnd-kit (data.pane discrimina).
 *
 * Pane A = URL-driven (Next router, useDocTabs).
 * Panes B+ = client state (localStorage, usePanesState).
 *
 * Single-pane fallback: si no hay panes secundarios, render directo
 * de children sin overhead visual.
 */
export function WorkspaceShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<>{children}</>}>
      <WorkspaceShellInner>{children}</WorkspaceShellInner>
    </Suspense>
  );
}

function WorkspaceShellInner({ children }: Readonly<{ children: React.ReactNode }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const compareId = searchParams.get(COMPARE_PARAM);

  // Hidratación legacy ?compare=
  useEffect(() => {
    if (!compareId) return;
    hydrateFromCompareParam(compareId);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(COMPARE_PARAM);
    const newSearch = params.toString();
    router.replace(`${pathname}${newSearch ? '?' + newSearch : ''}`, { scroll: false });
  }, [compareId, searchParams, router, pathname]);

  const panesState = usePanesState();
  const docTabs = useDocTabs();
  const [focused, setFocused] = useFocusedPane();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Helpers para drag end
  const moveAtoPane = useCallback((toPaneId: PaneId, tabId: string) => {
    panesState.openTabInPane(toPaneId, tabId);
    docTabs.closeTab(tabId);
  }, [panesState, docTabs]);

  const movePaneToA = useCallback((fromPaneId: PaneId, tabId: string) => {
    const fromPane = panesState.panes.find((p) => p.id === fromPaneId);
    const tab = fromPane?.tabsResolved.find((t) => t.id === tabId);
    panesState.closeTab(fromPaneId, tabId);
    if (tab) docTabs.openInNewTab(tab.href);
  }, [panesState, docTabs]);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const fromPane = active.data.current?.pane as PaneId | undefined;
    const toPane = over.data.current?.pane as PaneId | undefined;

    // Drop en zona droppable de pane (sin tab destino concreto)
    const dropZoneMatch = overId.match(/^pane-([a-z]+)-drop$/);
    const targetPaneId = dropZoneMatch ? (dropZoneMatch[1] as PaneId) : null;

    if (targetPaneId) {
      if (fromPane === targetPaneId) return; // mismo pane no mueve
      if (fromPane === 'a' && targetPaneId !== 'a') {
        return moveAtoPane(targetPaneId, activeId);
      }
      if (fromPane && fromPane !== 'a' && targetPaneId === 'a') {
        return movePaneToA(fromPane, activeId);
      }
      if (fromPane && fromPane !== 'a' && targetPaneId !== 'a') {
        return panesState.moveTab(activeId, fromPane, targetPaneId);
      }
    }

    // Reorder mismo pane (drop sobre otra tab del mismo pane)
    if (fromPane && fromPane === toPane) {
      if (fromPane === 'a') {
        const fromIdx = docTabs.tabs.findIndex((t) => t.id === activeId);
        const toIdx = docTabs.tabs.findIndex((t) => t.id === overId);
        if (fromIdx >= 0 && toIdx >= 0) docTabs.reorderTabs(fromIdx, toIdx);
      } else {
        const pane = panesState.panes.find((p) => p.id === fromPane);
        if (!pane) return;
        const fromIdx = pane.tabs.indexOf(activeId);
        const toIdx = pane.tabs.indexOf(overId);
        if (fromIdx >= 0 && toIdx >= 0) panesState.reorderTabs(fromPane, fromIdx, toIdx);
      }
      return;
    }

    // Cross-pane via drop sobre tab destino
    if (fromPane === 'a' && toPane && toPane !== 'a') return moveAtoPane(toPane, activeId);
    if (fromPane && fromPane !== 'a' && toPane === 'a') return movePaneToA(fromPane, activeId);
    if (fromPane && toPane && fromPane !== 'a' && toPane !== 'a') {
      return panesState.moveTab(activeId, fromPane, toPane);
    }
  }, [docTabs, panesState, moveAtoPane, movePaneToA]);

  // Atajos teclado workspace
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;

      if (e.key === '\\' && !e.shiftKey) {
        e.preventDefault();
        if (panesState.isOpen) {
          // Cerrar el último pane secundario
          const last = panesState.panes[panesState.panes.length - 1];
          panesState.closePane(last.id);
          if (focused !== 'a') setFocused('a');
        } else {
          const candidate = docTabs.tabs.find((t) => t.id !== docTabs.activeTabId);
          if (candidate) {
            panesState.openTabInPane('b', candidate.id);
            setFocused('b');
          }
        }
      } else if (e.key === '\\' && e.shiftKey) {
        // Crear nuevo pane (split right) con el tab activo de A
        e.preventDefault();
        if (docTabs.activeTabId) panesState.splitToNewPane(docTabs.activeTabId);
      } else if (/^[1-9]$/.test(e.key)) {
        // Ctrl+1 = pane A, Ctrl+2 = pane B, ..., Ctrl+9 = pane I
        const index = Number(e.key) - 1;
        if (index === 0) {
          e.preventDefault();
          setFocused('a');
        } else if (index - 1 < panesState.panes.length) {
          e.preventDefault();
          setFocused(panesState.panes[index - 1].id as 'a' | 'b');
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [docTabs, panesState, focused, setFocused]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {panesState.isOpen ? (
        <MultiPaneLayout
          panes={panesState.panes}
          activateTab={panesState.activateTab}
          closeTab={panesState.closeTab}
          closePane={panesState.closePane}
          reorderTabs={panesState.reorderTabs}
          splitToNewPane={panesState.splitToNewPane}
          focused={focused}
          setFocused={setFocused}
        >
          {children}
        </MultiPaneLayout>
      ) : (
        <>{children}</>
      )}
    </DndContext>
  );
}

function MultiPaneLayout({
  children, panes, activateTab, closeTab, closePane, reorderTabs, splitToNewPane, focused, setFocused,
}: Readonly<{
  children: React.ReactNode;
  panes: ReturnType<typeof usePanesState>['panes'];
  activateTab: ReturnType<typeof usePanesState>['activateTab'];
  closeTab: ReturnType<typeof usePanesState>['closeTab'];
  closePane: ReturnType<typeof usePanesState>['closePane'];
  reorderTabs: ReturnType<typeof usePanesState>['reorderTabs'];
  splitToNewPane: ReturnType<typeof usePanesState>['splitToNewPane'];
  focused: string;
  setFocused: (p: 'a' | 'b') => void;
}>) {
  // Distribución equitativa de tamaño entre A + N panes
  const total = panes.length + 1;
  const eachSize = Math.max(15, Math.floor(100 / total));

  return (
    <div className="h-[calc(100vh-3.5rem)] no-print">
      <Group
        orientation="horizontal"
        id="workspace-shell"
        autoSave="reforma-ud:workspace-v5.1"
        className="flex h-full"
      >
        <Panel
          id="pane-a"
          defaultSize={eachSize}
          minSize={20}
          className={cn(
            'overflow-y-auto transition-shadow',
            focused === 'a' && 'ring-2 ring-primary/30 ring-inset',
          )}
          data-pane="a"
        >
          <PaneFocusable onFocus={() => setFocused('a')} label="Pane A · principal">
            <PaneADroppable>
              <div className="px-4 md:px-6 py-2">{children}</div>
            </PaneADroppable>
          </PaneFocusable>
        </Panel>

        {panes.map((pane) => (
          <PaneSegment
            key={pane.id}
            paneId={pane.id}
            tabs={pane.tabsResolved}
            activeTab={pane.activeTab}
            activeTabId={pane.activeTabId}
            defaultSize={eachSize}
            focused={focused === pane.id}
            onFocus={() => setFocused(pane.id as 'b')}
            activateTab={(id) => activateTab(pane.id, id)}
            closeTab={(id) => closeTab(pane.id, id)}
            closePane={() => closePane(pane.id)}
            reorderTabs={(from, to) => reorderTabs(pane.id, from, to)}
            splitToNewPane={(tabId) => splitToNewPane(tabId)}
          />
        ))}
      </Group>
    </div>
  );
}

function PaneSegment({
  paneId, tabs, activeTab, activeTabId, defaultSize, focused, onFocus,
  activateTab, closeTab, closePane, reorderTabs, splitToNewPane,
}: Readonly<{
  paneId: PaneId;
  tabs: ReturnType<typeof usePanesState>['panes'][number]['tabsResolved'];
  activeTab: ReturnType<typeof usePanesState>['panes'][number]['activeTab'];
  activeTabId: string | null;
  defaultSize: number;
  focused: boolean;
  onFocus: () => void;
  activateTab: (id: string) => void;
  closeTab: (id: string) => void;
  closePane: () => void;
  reorderTabs: (fromIdx: number, toIdx: number) => void;
  splitToNewPane: (tabId: string) => void;
}>) {
  return (
    <>
      <Separator className="group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Separator>
      <Panel
        id={`pane-${paneId}`}
        defaultSize={defaultSize}
        minSize={15}
        className={cn(
          'overflow-y-auto transition-shadow',
          focused && 'ring-2 ring-primary/30 ring-inset',
        )}
        data-pane={paneId}
      >
        <PaneFocusable onFocus={onFocus} label={`Pane ${paneId.toUpperCase()}`}>
          <PaneShell
            paneId={paneId}
            tabs={tabs}
            activeTab={activeTab}
            activeTabId={activeTabId}
            activateTab={activateTab}
            closeTab={closeTab}
            reorderTabs={reorderTabs}
            onClosePane={closePane}
            onSplitToNewPane={splitToNewPane}
          />
        </PaneFocusable>
      </Panel>
    </>
  );
}

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
 * Compat: <ComparativeSplit> alias del WorkspaceShell.
 * `[mid]/page.tsx` lo importa desde aquí.
 * ============================================================ */
export function ComparativeSplit({ children }: Readonly<{ children: React.ReactNode }>) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}

/**
 * CompareButton · v5.1 — abre paper en nuevo pane (split right).
 * Si ya hay panes abiertos, añade al último; si no, crea pane B con la 2da tab.
 */
export function CompareButton({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  return (
    <Suspense fallback={null}>
      <CompareButtonInner currentPaperId={currentPaperId} />
    </Suspense>
  );
}

function CompareButtonInner({ currentPaperId }: Readonly<{ currentPaperId: string }>) {
  const panesState = usePanesState();
  const { tabs } = useDocTabs();
  const candidates = useMemo(
    () => tabs.filter((t) => t.id !== currentPaperId),
    [tabs, currentPaperId],
  );

  if (panesState.isOpen) {
    return (
      <Button
        variant="default"
        size="sm"
        className="gap-1.5 no-print"
        onClick={() => panesState.panes.forEach((p) => panesState.closePane(p.id))}
        title="Cerrar todos los panes"
      >
        <X className="h-3.5 w-3.5" />
        Cerrar split ({panesState.panes.length})
      </Button>
    );
  }

  if (candidates.length === 0) {
    return (
      <span className="text-[10px] text-muted-foreground italic no-print">
        Click derecho en una tab → "Abrir a la derecha"
      </span>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 no-print"
      onClick={() => panesState.openInNextPane(candidates[0].id)}
      title={`Abrir ${candidates[0].title} a la derecha`}
    >
      Comparar con {candidates[0].kind === 'paper' ? `M${String(candidates[0].number ?? 0).padStart(2, '0')}` : candidates[0].title.slice(0, 16)}
    </Button>
  );
}
