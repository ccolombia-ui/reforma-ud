/** Skeleton para página de comunidad · G02 v7.4 */
export default function ComunidadLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-32 rounded bg-muted animate-pulse" />
      </div>

      {/* Hero */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="h-5 w-24 rounded bg-muted animate-pulse" />
              <div className="h-5 w-20 rounded bg-muted animate-pulse" />
              <div className="h-5 w-28 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-9 w-2/3 rounded bg-muted animate-pulse" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded bg-muted/50 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-muted/50 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-24 rounded bg-muted animate-pulse" />
            <div className="h-8 w-20 rounded bg-muted animate-pulse" />
            <div className="h-8 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </header>

      {/* Definición card */}
      <div className="mb-8 rounded-lg border bg-primary/5 p-5">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded bg-muted animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-muted/70 animate-pulse" />
          <div className="h-4 w-10/12 rounded bg-muted/70 animate-pulse" />
        </div>
      </div>

      {/* Tabs sticky */}
      <div className="sticky top-14 z-30 -mx-4 mb-6 border-b bg-background/80 px-4 py-2 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-7 w-24 rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      {/* Dashboard KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg border bg-muted/30 animate-pulse" />
        ))}
      </div>

      {/* Service tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 rounded-lg border bg-muted/30 animate-pulse" />
        ))}
      </div>

      {/* Misiones colectivas */}
      <div className="mt-10 space-y-3">
        <div className="h-5 w-44 rounded bg-muted animate-pulse" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
            <div className="mt-2 h-3 w-1/2 rounded bg-muted/60 animate-pulse" />
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary/40 animate-pulse"
                style={{ width: `${30 + i * 20}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
