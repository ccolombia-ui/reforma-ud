'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ListTree, Network, BookOpen } from 'lucide-react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { OutlinePanel } from '@/components/biblioteca/outline-panel';
import { PaperLocalGraph } from '@/components/graph/paper-local-graph';
import { getActiveDocFromPath } from '@/lib/active-doc';

/**
 * InfographicQuickstart · v5.0n — vista 3-zone para documentos marcados con
 * `kd_doc_layout: 'infografia-quickstart'`.
 *
 * Layout horizontal:
 *   [TOC sticky izq · 20%] | [Body central · 55%] | [Grafo local der · 25%]
 *
 * Pensada para que un principiante pueda:
 *   - Navegar el índice del documento sin scroll
 *   - Leer el body con todas las secciones colapsables
 *   - Ver el vecindario semántico del paper (papers/conceptos relacionados)
 *
 * Auto-resizable via react-resizable-panels (autoSave persiste ratios).
 *
 * Renderiza solo en md+ (≥768px). En mobile colapsa a layout standard
 * (los aside laterales se ocultan y el body ocupa 100%).
 */
export function InfographicQuickstart({
  paperId,
  children,
}: Readonly<{
  paperId: string;
  children: React.ReactNode;
}>) {
  // Resolución client-side del activeDoc (con su toc) desde el pathname
  const pathname = usePathname();
  const doc = useMemo(() => getActiveDocFromPath(pathname), [pathname]);
  return (
    <div className="h-[calc(100vh-3.5rem)] no-print">
      <Group
        orientation="horizontal"
        id="infographic-quickstart"
        autoSave="reforma-ud:infographic-quickstart-v1"
        className="flex h-full"
      >
        {/* TOC izquierdo (md+ solo) */}
        <Panel
          id="toc"
          defaultSize={20}
          minSize={15}
          maxSize={30}
          className="hidden md:block overflow-y-auto border-r bg-muted/10"
        >
          <div className="sticky top-0 flex items-center gap-1.5 border-b bg-background/95 backdrop-blur px-3 py-2 text-[10px] uppercase tracking-wide text-muted-foreground">
            <ListTree className="h-3 w-3" />
            Índice
          </div>
          <OutlinePanel doc={doc} />
        </Panel>

        <Separator className="hidden md:flex group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>

        {/* Body central */}
        <Panel id="body" defaultSize={55} minSize={35} className="overflow-y-auto">
          <div className="px-4 md:px-6 py-2">
            {children}
          </div>
        </Panel>

        <Separator className="hidden lg:flex group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>

        {/* Grafo local derecho (lg+ solo, en md el body ocupa 80%) */}
        <Panel
          id="graph"
          defaultSize={25}
          minSize={20}
          maxSize={35}
          className="hidden lg:block overflow-hidden border-l bg-muted/10"
        >
          <div className="sticky top-0 flex items-center gap-1.5 border-b bg-background/95 backdrop-blur px-3 py-2 text-[10px] uppercase tracking-wide text-muted-foreground">
            <Network className="h-3 w-3" />
            Vecindario semántico
          </div>
          <div className="h-[calc(100%-2rem)]">
            <PaperLocalGraph paperId={paperId} hops={1} />
          </div>
        </Panel>
      </Group>
    </div>
  );
}

/**
 * Badge visual para mostrar en el header del paper cuando el layout es
 * infografia-quickstart, para indicar al lector que está en modo overview.
 */
export function InfographicBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
      <BookOpen className="h-2.5 w-2.5" />
      Infografía · quickstart
    </span>
  );
}
