'use client';

import { useDroppable } from '@dnd-kit/core';
import { useSortable, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, BookMarked, FileText, Building2, SplitSquareHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { canonicPaper } from '#site/content';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { MermaidRenderer } from '@/components/biblioteca/mermaid-renderer';
import type { SecondaryTab, PaneId } from '@/lib/panes-state';
import { cn } from '@/lib/utils';

/**
 * PaneShell · v5.1 — pane secundario genérico (B, C, D, ...).
 *
 * Cada tab tiene `data.pane = paneId` para que `WorkspaceShell.onDragEnd`
 * discrimine origen/destino correctamente con N panes.
 *
 * Toda la zona del pane es `useDroppable` con id `pane-{paneId}-drop`
 * para recibir tabs movidas desde A o cualquier otro pane.
 */
export function PaneShell({
  paneId,
  tabs,
  activeTab,
  activeTabId,
  activateTab,
  closeTab,
  reorderTabs,
  onClosePane,
  onSplitToNewPane,
}: Readonly<{
  paneId: PaneId;
  tabs: SecondaryTab[];
  activeTab: SecondaryTab | null;
  activeTabId: string | null;
  activateTab: (id: string) => void;
  closeTab: (id: string) => void;
  reorderTabs: (fromIdx: number, toIdx: number) => void;
  onClosePane: () => void;
  onSplitToNewPane?: (tabId: string) => void;
}>) {
  const dropId = `pane-${paneId}-drop`;
  const { isOver, setNodeRef: setDropRef } = useDroppable({ id: dropId });

  const tabIds = tabs.map((t) => t.id);
  const paneLetter = paneId.toUpperCase();

  return (
    <div
      ref={setDropRef}
      className={cn(
        'flex flex-col h-full transition-colors',
        isOver && 'bg-primary/5 ring-2 ring-primary/40 ring-inset',
      )}
    >
      {/* Tab strip */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto no-chrome-scroll">
          <Badge variant="secondary" className="font-mono text-[9px] shrink-0 mr-1">
            {paneLetter}
          </Badge>
          <SortableContext items={tabIds} strategy={horizontalListSortingStrategy}>
            <div className="flex items-center gap-0.5 flex-1 min-w-0">
              {tabs.map((tab) => (
                <SortableSecondaryTab
                  key={tab.id}
                  paneId={paneId}
                  tab={tab}
                  active={tab.id === activeTabId}
                  onActivate={() => activateTab(tab.id)}
                  onClose={() => closeTab(tab.id)}
                  onSplitRight={onSplitToNewPane ? () => onSplitToNewPane(tab.id) : undefined}
                />
              ))}
            </div>
          </SortableContext>
          <button
            type="button"
            onClick={onClosePane}
            aria-label={`Cerrar pane ${paneLetter}`}
            title={`Cerrar pane ${paneLetter} (todas sus tabs se descartan)`}
            className="ml-auto shrink-0 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-destructive/15 hover:text-destructive text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab ? (
          <PaneContent tab={activeTab} />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
            Pane vacío. Arrastra una tab aquí o usa "Abrir a la derecha" desde el menú contextual.
          </div>
        )}
      </div>
    </div>
  );
}

function SortableSecondaryTab({
  paneId, tab, active, onActivate, onClose, onSplitRight,
}: Readonly<{
  paneId: PaneId;
  tab: SecondaryTab;
  active: boolean;
  onActivate: () => void;
  onClose: () => void;
  onSplitRight?: () => void;
}>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tab.id,
    data: { pane: paneId },
  });
  const Icon = tabIcon(tab.kind);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onAuxClick={(e) => {
        if (e.button === 1) {
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
          if (isDragging) return;
          e.stopPropagation();
          onActivate();
        }}
        className="inline-flex items-center gap-1.5 px-2 py-1"
        title={tab.title}
      >
        <Icon className={cn('h-3 w-3 shrink-0', active && 'text-primary')} />
        {tab.kind === 'paper' && tab.number !== undefined && (
          <Badge variant="secondary" className="font-mono text-[9px] h-4 px-1">
            M{String(tab.number).padStart(2, '0')}
          </Badge>
        )}
        <span className="max-w-[140px] truncate font-medium">{tab.title}</span>
      </button>
      {onSplitRight && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSplitRight();
          }}
          aria-label={`Abrir ${tab.title} en nuevo pane a la derecha`}
          title="Split right · abre este tab en nuevo pane"
          className={cn(
            'inline-flex h-full w-5 items-center justify-center transition-opacity',
            active ? 'opacity-60 hover:opacity-100 hover:bg-primary/15' : 'opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-accent',
          )}
        >
          <SplitSquareHorizontal className="h-3 w-3" />
        </button>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={`Cerrar ${tab.title}`}
        className={cn(
          'inline-flex h-full w-5 items-center justify-center rounded-r-md transition-opacity',
          active ? 'opacity-100 hover:bg-destructive/20' : 'opacity-0 group-hover:opacity-100 hover:bg-accent',
        )}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function PaneContent({ tab }: Readonly<{ tab: SecondaryTab }>) {
  if (tab.kind === 'paper') {
    const paper = canonicPaper.find((p) => p.id === tab.id);
    if (!paper) {
      return <div className="p-6 text-sm text-muted-foreground">Paper {tab.id} no encontrado.</div>;
    }
    return (
      <article className="prose-paper px-4 md:px-6 py-6">
        <header className="mb-6">
          <Badge className="font-mono mb-2">M{String(paper.number).padStart(2, '0')}</Badge>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight">{paper.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{paper.description}</p>
        </header>
        <hr className="my-4" />
        <MDXWithHoverPreview code={paper.body} />
        <MermaidRenderer deps={[paper.id]} />
      </article>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">{tab.title}</h1>
      <p className="text-sm text-muted-foreground">
        Vista de {tab.kind} en pane secundario. Soporte completo en v6.0.
      </p>
    </div>
  );
}

function tabIcon(kind: SecondaryTab['kind']): typeof BookMarked {
  if (kind === 'paper') return BookMarked;
  if (kind === 'community') return Building2;
  return FileText;
}
