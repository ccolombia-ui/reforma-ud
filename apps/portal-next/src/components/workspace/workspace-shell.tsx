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
import { PaneShell } from '@/components/workspace/pane-shell';

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  /**
   * v5.0b · onDragEnd unificado. Maneja 3 casos:
   *   1. Reorder dentro del mismo pane (active.data.pane === over.data.pane)
   *   2. Cross-pane via droppable de zona ("pane-a-drop" / "pane-b-drop")
   *   3. Cross-pane via drop sobre tab del pane destino (active.data.pane !== over.data.pane)
   */
  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const fromPane = active.data.current?.pane as 'a' | 'b' | undefined;
    const toPane = over.data.current?.pane as 'a' | 'b' | undefined;

    // Caso 2 · drop en zona droppable de pane (cross-pane via empty area)
    if (overId === 'pane-b-drop' && fromPane === 'a') {
      paneB.openTab(activeId);
      docTabs.closeTab(activeId);
      return;
    }
    if (overId === 'pane-a-drop' && fromPane === 'b') {
      const fromB = paneB.tabs.find((t) => t.id === activeId);
      paneB.closeTab(activeId);
      if (fromB) docTabs.openInNewTab(fromB.href);
      return;
    }

    // Caso 1 · reorder dentro del mismo pane
    if (fromPane && fromPane === toPane) {
      if (fromPane === 'a') {
        const fromIdx = docTabs.tabs.findIndex((t) => t.id === activeId);
        const toIdx = docTabs.tabs.findIndex((t) => t.id === overId);
        if (fromIdx >= 0 && toIdx >= 0) docTabs.reorderTabs(fromIdx, toIdx);
      } else {
        const fromIdx = paneB.tabs.findIndex((t) => t.id === activeId);
        const toIdx = paneB.tabs.findIndex((t) => t.id === overId);
        if (fromIdx >= 0 && toIdx >= 0) paneB.reorderTabs(fromIdx, toIdx);
      }
      return;
    }

    // Caso 3 · cross-pane via drop sobre otra tab
    if (fromPane === 'a' && toPane === 'b') {
      paneB.openTab(activeId);
      docTabs.closeTab(activeId);
      return;
    }
    if (fromPane === 'b' && toPane === 'a') {
      const fromB = paneB.tabs.find((t) => t.id === activeId);
      paneB.closeTab(activeId);
      if (fromB) docTabs.openInNewTab(fromB.href);
    }
  }, [paneB, docTabs]);

  // v5.0b · DndContext SIEMPRE montado para que sortable funcione tanto en
  // single-pane como multi-pane sin context-switching.
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {!paneB.isOpen ? (
        // Single-pane: render children directo, sin overhead visual
        <>{children}</>
      ) : (
        <MultiPaneLayout paneB={paneB}>{children}</MultiPaneLayout>
      )}
    </DndContext>
  );
}

function MultiPaneLayout({
  children, paneB,
}: Readonly<{
  children: React.ReactNode;
  paneB: ReturnType<typeof useSecondaryPaneTabs>;
}>) {
  return (
    <div className="h-[calc(100vh-3.5rem)] no-print">
      <Group
        orientation="horizontal"
        id="workspace-shell"
        autoSave="reforma-ud:workspace-v5.0"
        className="flex h-full"
      >
        <Panel id="pane-a" defaultSize={50} minSize={25} className="overflow-y-auto" data-pane="a">
          <PaneADroppable>
            <div className="px-4 md:px-6 py-2">{children}</div>
          </PaneADroppable>
        </Panel>

        <Separator className="group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>

        <Panel id="pane-b" defaultSize={50} minSize={25} className="overflow-y-auto" data-pane="b">
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
        </Panel>
      </Group>
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
