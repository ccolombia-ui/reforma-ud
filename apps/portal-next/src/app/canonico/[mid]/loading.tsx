export default function PaperLoading() {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 animate-in fade-in duration-200">
      <div className="mb-6 flex items-center gap-2 text-sm">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        <span className="text-muted-foreground/40">/</span>
        <div className="h-4 w-12 rounded bg-muted animate-pulse" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <main className="space-y-4">
          {/* Hero badges */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-12 rounded bg-muted animate-pulse" />
            <div className="h-5 w-32 rounded bg-muted animate-pulse" />
            <div className="h-5 w-16 rounded bg-muted animate-pulse" />
          </div>
          {/* Title */}
          <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted/70 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-muted/70 animate-pulse" />
          {/* Body paragraphs */}
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-11/12 rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-muted/50 animate-pulse" />
              </div>
            ))}
          </div>
        </main>
        {/* TOC sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-2">
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-full rounded bg-muted/50 animate-pulse" style={{ width: `${60 + (i * 5) % 40}%` }} />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
