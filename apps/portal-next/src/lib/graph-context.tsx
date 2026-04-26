'use client';

import { createContext, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useGraph3DController, type Graph3DController } from '@/components/graph/graph-3d';

const GraphCtx = createContext<Graph3DController | null>(null);

const SRC = '/static/graph-global.json';

/**
 * GraphProvider — provee el controller del grafo global SOLO cuando el usuario
 * está en /canonico/grafo. Esto permite que tanto la página como el sidebar
 * izquierdo accedan al mismo estado (filtros, search, selected) sin duplicar fetches.
 */
export function GraphProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isOnGraph = pathname === '/canonico/grafo' || pathname?.startsWith('/canonico/grafo/');

  if (!isOnGraph) {
    return <GraphCtx.Provider value={null}>{children}</GraphCtx.Provider>;
  }
  return <GraphProviderActive>{children}</GraphProviderActive>;
}

function GraphProviderActive({ children }: Readonly<{ children: React.ReactNode }>) {
  const controller = useGraph3DController(SRC);
  // Memo opcional: el controller ya está estable internamente
  const value = useMemo(() => controller, [controller]);
  return <GraphCtx.Provider value={value}>{children}</GraphCtx.Provider>;
}

/** Devuelve el controller del grafo si la ruta lo provee, o null. */
export function useGraphContext(): Graph3DController | null {
  return useContext(GraphCtx);
}
