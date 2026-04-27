'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Pin, PinOff, BookMarked, FileText, Building2, ChevronLeft, ChevronRight, ChevronDown, SplitSquareHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePanesState } from '@/lib/panes-state';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDocTabs, useMounted, type DocTab } from '@/lib/doc-tabs';
import { Badge } from '@/components/ui/badge';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/**
 * DocTabsBar · v5.0a — barra Obsidian-grade con:
 *   • Drag-reorder (dnd-kit sortable, accesible con keyboard)
 *   • Right-click context menu (close · close-others · close-to-right · pin)
 *   • Pin tab (persistido en localStorage, no se cierra con Ctrl+W)
 *   • Overflow chevrons + dropdown "ver todas" cuando supera ancho del strip
 *   • Atajos Ctrl+Tab / Ctrl+Shift+Tab / Ctrl+W (preserva v3.4)
 */
export function DocTabsBar() {
  return (
    <Suspense fallback={<TabsBarSkeleton />}>
      <DocTabsBarInner />
    </Suspense>
  );
}

function DocTabsBarInner() {
  const mounted = useMounted();
  const router = useRouter();
  const {
    tabs, activeTabId,
    activateTab, closeTab, closeOthers, closeToRight, togglePin,
  } = useDocTabs();

  // v5.0j Gap 2 · Back/Forward del browser. Pane A es URL-driven, así que
  // usamos history nativo. Atajos Alt+← / Alt+→ ya son default del browser
  // pero los botones explícitos dan descubribilidad Obsidian-style.
  const goBack = useCallback(() => router.back(), [router]);
  const goForward = useCallback(() => router.forward(), [router]);

  // Atajos Ctrl+Tab / Ctrl+Shift+Tab / Ctrl+W (preservados de v3.4)
  useEffect(() => {
    if (!mounted || tabs.length < 2) return;
    function onKey(e: KeyboardEvent) {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        const idx = tabs.findIndex((t) => t.id === activeTabId);
        if (idx < 0) return;
        const next = e.shiftKey
          ? (idx - 1 + tabs.length) % tabs.length
          : (idx + 1) % tabs.length;
        activateTab(tabs[next].id);
      } else if (e.key === 'w' || e.key === 'W') {
        if (activeTabId) {
          e.preventDefault();
          closeTab(activeTabId);
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, tabs, activeTabId, activateTab, closeTab]);

  // Overflow detection (chevrons + dropdown when scrollWidth > clientWidth)
  const stripRef = useRef<HTMLDivElement>(null);
  const [overflowState, setOverflowState] = useState<{ hasLeft: boolean; hasRight: boolean }>({
    hasLeft: false,
    hasRight: false,
  });

  const updateOverflow = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setOverflowState({
      hasLeft: el.scrollLeft > 4,
      hasRight: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updateOverflow();
    const el = stripRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateOverflow);
    ro.observe(el);
    el.addEventListener('scroll', updateOverflow, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', updateOverflow);
    };
  }, [mounted, updateOverflow, tabs.length]);

  const scrollBy = useCallback((dir: 'left' | 'right') => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  }, []);

  const tabIds = useMemo(() => tabs.map((t) => t.id), [tabs]);

  // v5.0j Gap 2 · Strip se muestra siempre que haya tabs (los botones
  // Back/Forward son útiles incluso con 1 tab abierta).
  if (!mounted || tabs.length === 0) return null;

  return (
    <div className="no-print sticky top-14 z-20 -mx-4 md:-mx-8 mb-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-1 px-4 md:px-8 py-1.5">
        {/* v5.0j Gap 2 · Botones Back/Forward (pane A · navegación browser) */}
        <button
          type="button"
          onClick={goBack}
          aria-label="Atrás"
          title="Doc anterior · Alt+←"
          className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-accent text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={goForward}
          aria-label="Adelante"
          title="Doc siguiente · Alt+→"
          className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-accent text-muted-foreground hover:text-foreground mr-1 border-r pr-1"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        {/* Chevron izquierda · solo si overflow */}
        {overflowState.hasLeft && (
          <button
            type="button"
            onClick={() => scrollBy('left')}
            aria-label="Tabs anteriores"
            className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}

        {/* SortableContext sin DndContext propio · v5.0b — el DndContext lo
            provee WorkspaceShell para soportar drag cross-pane. En single-pane
            (sin WorkspaceShell activo) el sortable usa el DndContext del shell
            que siempre está montado. */}
        <SortableContext items={tabIds} strategy={horizontalListSortingStrategy}>
          <div
            ref={stripRef}
            className="flex flex-1 min-w-0 items-center gap-0.5 overflow-x-auto no-chrome-scroll"
          >
            {tabs.map((tab) => (
              <SortableTabPill
                key={tab.id}
                tab={tab}
                active={tab.id === activeTabId}
                onActivate={() => activateTab(tab.id)}
                onClose={() => closeTab(tab.id)}
                onCloseOthers={() => closeOthers(tab.id)}
                onCloseToRight={() => closeToRight(tab.id)}
                onTogglePin={() => togglePin(tab.id)}
              />
            ))}
          </div>
        </SortableContext>

        {/* Chevron derecha · solo si overflow */}
        {overflowState.hasRight && (
          <button
            type="button"
            onClick={() => scrollBy('right')}
            aria-label="Tabs siguientes"
            className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Dropdown "▾" — siempre visible, lista todas las tabs */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Ver todas las pestañas"
              title="Ver todas las pestañas"
              className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-accent text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 max-h-80 overflow-y-auto">
            <div className="px-2 py-1 text-[9px] uppercase tracking-wide text-muted-foreground">
              {tabs.length} pestañas abiertas
            </div>
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.id}
                onClick={() => activateTab(tab.id)}
                className={cn('flex items-center gap-2', tab.id === activeTabId && 'bg-accent')}
              >
                {tab.pinned && <Pin className="h-3 w-3 text-primary shrink-0" />}
                {tab.kind === 'paper' && tab.number !== undefined && (
                  <span className="font-mono text-[9px] text-muted-foreground shrink-0">
                    M{String(tab.number).padStart(2, '0')}
                  </span>
                )}
                <span className="truncate flex-1">{tab.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="ml-1 pl-2 hidden lg:inline-flex items-center gap-1 text-[10px] text-muted-foreground border-l">
          <kbd className="rounded border px-1 py-0.5 font-mono text-[9px]">Ctrl+Tab</kbd>
        </span>
      </div>
    </div>
  );
}

function tabIcon(kind: DocTab['kind']): typeof BookMarked {
  if (kind === 'paper') return BookMarked;
  if (kind === 'community') return Building2;
  return FileText;
}

function SortableTabPill({
  tab, active, onActivate, onClose, onCloseOthers, onCloseToRight, onTogglePin,
}: Readonly<{
  tab: DocTab;
  active: boolean;
  onActivate: () => void;
  onClose: () => void;
  onCloseOthers: () => void;
  onCloseToRight: () => void;
  onTogglePin: () => void;
}>) {
  // v5.0b · data.pane='a' permite a WorkspaceShell.onDragEnd discriminar el origen
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tab.id,
    data: { pane: 'a' },
  });
  const panesState = usePanesState();
  const Icon = tabIcon(tab.kind);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <span
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onAuxClick={(e) => {
            // mid-click: cerrar (excepto pinneada)
            if (e.button === 1 && !tab.pinned) {
              e.preventDefault();
              onClose();
            }
          }}
          className={cn(
            'group relative inline-flex shrink-0 items-stretch rounded-md border text-xs select-none',
            isDragging
              ? 'cursor-grabbing border-primary shadow-lg z-10'
              : 'cursor-grab transition-all',
            active
              ? 'bg-accent border-primary/30 text-foreground shadow-sm'
              : 'border-transparent text-muted-foreground hover:bg-accent/40 hover:text-foreground',
          )}
        >
          <button
            type="button"
            onClick={(e) => {
              // Evitar que click activo conflictúe con drag start
              if (isDragging) return;
              e.stopPropagation();
              onActivate();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1"
            title={tab.title}
          >
            {tab.pinned && <Pin className="h-3 w-3 text-primary shrink-0" />}
            <Icon className={cn('h-3 w-3 shrink-0', active && !tab.pinned && 'text-primary')} />
            {tab.kind === 'paper' && tab.number !== undefined && (
              <Badge variant="secondary" className="font-mono text-[9px] h-4 px-1">
                M{String(tab.number).padStart(2, '0')}
              </Badge>
            )}
            <span className="max-w-[200px] truncate font-medium">{tab.title}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (tab.pinned) onTogglePin();
              else onClose();
            }}
            aria-label={tab.pinned ? `Desfijar ${tab.title}` : `Cerrar ${tab.title}`}
            className={cn(
              'inline-flex h-full w-5 items-center justify-center rounded-r-md transition-opacity',
              active ? 'opacity-100 hover:bg-destructive/20' : 'opacity-0 group-hover:opacity-100 hover:bg-accent',
            )}
          >
            {tab.pinned ? <PinOff className="h-3 w-3" /> : <X className="h-3 w-3" />}
          </button>
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onActivate}>Activar</ContextMenuItem>
        <ContextMenuItem onClick={() => panesState.openInNextPane(tab.id)}>
          <SplitSquareHorizontal className="mr-2 h-3.5 w-3.5" />
          Abrir a la derecha
        </ContextMenuItem>
        <ContextMenuItem onClick={() => panesState.splitToNewPane(tab.id)}>
          <SplitSquareHorizontal className="mr-2 h-3.5 w-3.5 rotate-180" />
          Abrir en nuevo pane (split)
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onClose} disabled={tab.pinned}>
          Cerrar
          <kbd className="ml-auto text-[9px] font-mono opacity-60">Ctrl+W</kbd>
        </ContextMenuItem>
        <ContextMenuItem onClick={onCloseOthers}>Cerrar otras</ContextMenuItem>
        <ContextMenuItem onClick={onCloseToRight}>Cerrar todas a la derecha</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onTogglePin}>
          {tab.pinned ? (
            <>
              <PinOff className="mr-2 h-3.5 w-3.5" />
              Desfijar
            </>
          ) : (
            <>
              <Pin className="mr-2 h-3.5 w-3.5" />
              Fijar
            </>
          )}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function TabsBarSkeleton() {
  return (
    <div className="no-print h-10 border-b bg-background/95 -mx-4 md:-mx-8 mb-4">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-1.5 flex gap-1">
        <div className="h-6 w-32 rounded-md bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}
