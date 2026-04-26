export default function GrafoLoading() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 space-y-3 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="h-8 w-72 rounded bg-muted animate-pulse" />
          <div className="h-3 w-96 rounded bg-muted/60 animate-pulse" />
        </div>
        <div className="h-9 w-32 rounded bg-muted animate-pulse" />
      </div>
      <div className="rounded-lg border bg-background overflow-hidden h-[calc(100vh-12rem)] min-h-[560px] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary">
              <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
              Inicializando three.js
            </div>
            <p className="text-xs text-muted-foreground">Cargando grafo 3D · 33 nodos · 38 aristas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
