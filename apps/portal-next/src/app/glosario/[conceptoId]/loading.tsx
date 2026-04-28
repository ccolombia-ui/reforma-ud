/** Skeleton para concepto del glosario · G02 v7.4 */
export default function ConceptoLoading() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-32 rounded bg-muted animate-pulse" />
      </div>

      {/* Hero badges */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="h-5 w-20 rounded bg-muted animate-pulse" />
        <div className="h-5 w-16 rounded bg-muted animate-pulse" />
        <div className="h-5 w-24 rounded bg-muted animate-pulse" />
      </div>

      {/* Title (skos_prefLabel) */}
      <div className="space-y-3">
        <div className="h-9 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-muted/50 animate-pulse" />
      </div>

      {/* SKOS definition card */}
      <div className="mt-8 rounded-lg border bg-primary/5 p-5">
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted/70 animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-muted/70 animate-pulse" />
          <div className="h-4 w-9/12 rounded bg-muted/70 animate-pulse" />
          <div className="h-4 w-10/12 rounded bg-muted/70 animate-pulse" />
        </div>
      </div>

      {/* Body paragraphs */}
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full rounded bg-muted/50 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-muted/50 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Cross-references */}
      <div className="mt-10 space-y-3">
        <div className="h-4 w-40 rounded bg-muted animate-pulse" />
        <div className="grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 rounded border bg-muted/30 animate-pulse" />
          ))}
        </div>
      </div>
    </article>
  );
}
