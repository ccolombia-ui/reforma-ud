import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { VisNetworkGraph } from '@/components/graph/vis-network-graph';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grafo global del corpus MI-12',
  description: 'Visualización en red de los 12 papers canónicos, las comunidades y sus interconexiones.',
};

export default function GrafoGlobalPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/canonico" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Canónico
        </Link>
        <span>/</span>
        <span className="text-foreground">Grafo global</span>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Grafo global del corpus
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Red de conocimiento: 12 papers canónicos M01-M12 + las comunidades organizativas
          (Gobierno, vicerrectorías, facultades, escuelas, CABAs, institutos, centros) +
          notas de los vaults. Las aristas son citas (`cites`) y wikilinks. Estilo pyvis con
          física interactiva.
        </p>
      </header>

      <VisNetworkGraph src="/static/graph-global.json" />
    </div>
  );
}
