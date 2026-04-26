'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { ChevronLeft, Box, Square, Filter, GripVertical, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import { useGraph3DController, Graph3DCanvas, Graph3DFilters, Graph3DDetail } from '@/components/graph/graph-3d';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewMode = '2d' | '3d';

export default function GrafoGlobalPage() {
  const [mode, setMode] = useState<ViewMode>('3d');

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8 space-y-4">
      {/* Top nav */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/canonico" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Canónico
        </Link>
        <span>/</span>
        <span className="text-foreground">Grafo global</span>
      </div>

      {/* Hero compacto */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Grafo global del corpus</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Red de conocimiento: 12 papers canónicos M01-M12 + comunidades + notas de los vaults.
            Las aristas son citas (<code>cites</code>) y wikilinks.
          </p>
        </div>
        {/* Toggle 2D / 3D */}
        <div className="inline-flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
          <button
            onClick={() => setMode('2d')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              mode === '2d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            title="Vista 2D — vis-network con física forceAtlas2"
          >
            <Square className="h-3.5 w-3.5" />
            2D
          </button>
          <button
            onClick={() => setMode('3d')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              mode === '3d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            title="Vista 3D — three.js con filtros laterales tipo Obsidian"
          >
            <Box className="h-3.5 w-3.5" />
            3D + filtros
          </button>
        </div>
      </header>

      {mode === '2d' ? (
        <VisNetworkGraph src="/static/graph-global.json" />
      ) : (
        <Graph3DSplitWorkspace src="/static/graph-global.json" />
      )}
    </div>
  );
}

/* ============================================================
 * Layout Obsidian-style: filtros (izquierda) | canvas (centro) | detalle (derecha)
 * ============================================================ */

function Graph3DSplitWorkspace({ src }: Readonly<{ src: string }>) {
  const controller = useGraph3DController(src);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const detailVisible = !!controller.selected;

  return (
    <div className={cn(
      'rounded-lg border bg-background overflow-hidden',
      fullscreen ? 'fixed inset-3 z-50 shadow-2xl' : 'h-[calc(100vh-14rem)] min-h-[560px]',
    )}>
      <Group orientation="horizontal" id="graph-3d-workspace" className="flex h-full">
        {/* LEFT — Filtros */}
        {filtersOpen && (
          <>
            <Panel id="filters" defaultSize={18} minSize={14} maxSize={32} className="overflow-hidden">
              <Graph3DFilters controller={controller} onClose={() => setFiltersOpen(false)} />
            </Panel>
            <Separator className="group relative w-1 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Separator>
          </>
        )}

        {/* CENTER — Canvas */}
        <Panel id="canvas" defaultSize={detailVisible ? (filtersOpen ? 60 : 75) : (filtersOpen ? 82 : 100)} minSize={30} className="overflow-hidden relative">
          <Graph3DCanvas controller={controller} />
          {/* Floating controls top-right del canvas */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            {!filtersOpen && (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 shadow-md"
                onClick={() => setFiltersOpen(true)}
                aria-label="Mostrar filtros"
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={() => {
                const ref = controller.fgRef.current as { zoomToFit?: (ms?: number) => void } | null;
                ref?.zoomToFit?.(400);
              }}
              aria-label="Centrar grafo"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={() => setFullscreen((v) => !v)}
              aria-label="Pantalla completa"
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </Panel>

        {/* RIGHT — Detalle del nodo seleccionado */}
        {detailVisible && (
          <>
            <Separator className="group relative w-1 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Separator>
            <Panel id="detail" defaultSize={22} minSize={16} maxSize={35} className="overflow-hidden">
              <Graph3DDetail controller={controller} />
            </Panel>
          </>
        )}
      </Group>
    </div>
  );
}
