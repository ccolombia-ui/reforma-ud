'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { ChevronLeft, Box, Square, GripVertical, Maximize2, Minimize2, RefreshCw, Tag } from 'lucide-react';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import { Graph3DCanvas, Graph3DDetail } from '@/components/graph/graph-3d';
import { useGraphContext } from '@/lib/graph-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewMode = '2d' | '3d';

export default function GrafoGlobalPage() {
  const [mode, setMode] = useState<ViewMode>('3d');

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 space-y-3">
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
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Grafo global del corpus</h1>
          <p className="mt-1 max-w-3xl text-xs text-muted-foreground">
            Red de conocimiento: 12 papers M01-M12 + comunidades + notas.
            Filtros y categorías en el sidebar izquierdo.
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
            title="Vista 3D — three.js con detalle a la derecha"
          >
            <Box className="h-3.5 w-3.5" />
            3D
          </button>
        </div>
      </header>

      {mode === '2d' ? (
        <VisNetworkGraph src="/static/graph-global.json" />
      ) : (
        <Graph3DWorkspace />
      )}
    </div>
  );
}

/* ============================================================
 * Workspace 3D: canvas full + detalle del nodo a la derecha (filtros vienen del sidebar global)
 * ============================================================ */

function Graph3DWorkspace() {
  const controller = useGraphContext();
  const [fullscreen, setFullscreen] = useState(false);

  if (!controller) {
    // Fallback (no debería pasar — el Provider activa cuando estamos en /canonico/grafo)
    return (
      <div className="h-[calc(100vh-14rem)] min-h-[560px] rounded-lg border bg-muted/20 flex items-center justify-center text-sm text-muted-foreground">
        Inicializando contexto del grafo...
      </div>
    );
  }

  const detailVisible = !!controller.selected;

  return (
    <div className={cn(
      'rounded-lg border bg-background overflow-hidden',
      fullscreen ? 'fixed inset-3 z-50 shadow-2xl' : 'h-[calc(100vh-12rem)] min-h-[560px]',
    )}>
      <Group orientation="horizontal" id="graph-3d-workspace" className="flex h-full">
        {/* CENTER — Canvas */}
        <Panel id="canvas" defaultSize={detailVisible ? 75 : 100} minSize={30} className="overflow-hidden relative">
          <Graph3DCanvas controller={controller} />
          {/* Floating controls top-right del canvas */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            <Button
              variant={controller.showLabels ? 'default' : 'secondary'}
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={controller.toggleLabels}
              aria-label={controller.showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
              title={controller.showLabels ? 'Ocultar etiquetas de nodos' : 'Mostrar etiquetas de nodos'}
            >
              <Tag className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={() => {
                const ref = controller.fgRef.current as { zoomToFit?: (ms?: number) => void } | null;
                ref?.zoomToFit?.(400);
              }}
              aria-label="Centrar grafo"
              title="Centrar grafo"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={() => setFullscreen((v) => !v)}
              aria-label="Pantalla completa"
              title="Pantalla completa"
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
            <Panel id="detail" defaultSize={25} minSize={18} maxSize={40} className="overflow-hidden">
              <Graph3DDetail controller={controller} />
            </Panel>
          </>
        )}
      </Group>
    </div>
  );
}
