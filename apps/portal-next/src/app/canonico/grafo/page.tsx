'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, Box, Square } from 'lucide-react';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import { Graph3D } from '@/components/graph/graph-3d';
import { cn } from '@/lib/utils';

type ViewMode = '2d' | '3d';

export default function GrafoGlobalPage() {
  const [mode, setMode] = useState<ViewMode>('3d');

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/canonico" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Canónico
        </Link>
        <span>/</span>
        <span className="text-foreground">Grafo global</span>
      </div>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Grafo global del corpus
          </h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Red de conocimiento: 12 papers canónicos M01-M12 + las comunidades organizativas
            (Gobierno, vicerrectorías, facultades, escuelas, CABAs, institutos, centros) +
            notas de los vaults. Las aristas son citas (<code>cites</code>) y wikilinks.
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
            title="Vista 3D — three.js con filtros semánticos"
          >
            <Box className="h-3.5 w-3.5" />
            3D + filtros
          </button>
        </div>
      </header>

      {mode === '2d' ? (
        <VisNetworkGraph src="/static/graph-global.json" />
      ) : (
        <Graph3D src="/static/graph-global.json" />
      )}
    </div>
  );
}
