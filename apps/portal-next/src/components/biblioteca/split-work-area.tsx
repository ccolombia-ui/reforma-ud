'use client';

import { useEffect, useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { Network, X, GripVertical, Columns2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaperLocalGraph } from '@/components/graph/paper-local-graph';
import { cn } from '@/lib/utils';

const SPLIT_KEY = 'reforma-ud:split-open';

/**
 * SplitWorkArea — área de trabajo Obsidian-style.
 * Renderiza children (lectura) en el panel izquierdo y un PaperLocalGraph en el derecho.
 * Toggle persiste en localStorage; deshabilitado en mobile (graph requiere ancho).
 */
export function SplitWorkArea({ paperId, children }: Readonly<{ paperId: string; children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setOpen(localStorage.getItem(SPLIT_KEY) === 'true');
    } catch {}
    setHydrated(true);
  }, []);

  function toggle() {
    setOpen((v) => {
      const next = !v;
      try { localStorage.setItem(SPLIT_KEY, String(next)); } catch {}
      return next;
    });
  }

  if (!hydrated) {
    // SSR-safe placeholder: render solo el contenido sin split
    return <div>{children}</div>;
  }

  if (!open) {
    return (
      <div className="relative">
        {/* Toggle flotante */}
        <div className="hidden lg:block sticky top-16 z-30 float-right -mr-2 mt-2 no-print">
          <Button
            onClick={toggle}
            size="sm"
            variant="outline"
            className="gap-1.5 shadow-sm"
            title="Abrir vista dividida (grafo + lectura)"
          >
            <Columns2 className="h-3.5 w-3.5" /> Vista dividida
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] no-print">
      <Group orientation="horizontal" id={`reforma-ud:split:${paperId}`} className="flex h-full">
        <Panel id="reading" defaultSize={62} minSize={35} className="overflow-y-auto">
          {children}
        </Panel>
        <Separator className={cn(
          'group relative w-1.5 bg-border hover:bg-primary/40 data-[dragging=true]:bg-primary transition-colors cursor-col-resize',
        )}>
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Separator>
        <Panel id="graph" defaultSize={38} minSize={25} className="overflow-hidden bg-background">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Network className="h-3.5 w-3.5 text-primary" />
                Grafo del documento
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={toggle}
                aria-label="Cerrar vista dividida"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 min-h-0">
              <PaperLocalGraph paperId={paperId} hops={2} />
            </div>
          </div>
        </Panel>
      </Group>
    </div>
  );
}
