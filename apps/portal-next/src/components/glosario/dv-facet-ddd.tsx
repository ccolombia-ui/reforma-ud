/**
 * <DvFacetDdd> · Facet DDD (Domain-Driven Design) del concepto.
 * v8 S7 · Reemplazo del DV block §3 del concepto-universal (T2 DDD).
 * Server component.
 */

type FacetDDD = {
  ddd_id?: string;
  ddd_invariants?: string[];
  ddd_ubiquitous_terms?: string[];
  [key: string]: unknown;
};

export function DvFacetDdd({ facet }: Readonly<{ facet: Record<string, unknown> | undefined | null }>) {
  if (!facet) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">(sin facet DDD declarado)</p>
    );
  }
  const f = facet as FacetDDD;

  return (
    <div className="dv-facet-ddd my-4 rounded-lg border bg-card">
      <div className="border-b bg-muted/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        DDD · {f.ddd_id ?? '—'}
      </div>
      <div className="divide-y text-xs">
        {f.ddd_invariants && f.ddd_invariants.length > 0 && (
          <div className="px-4 py-2">
            <p className="mb-1 font-semibold">🔒 Invariantes</p>
            <ul className="space-y-0.5 pl-4 list-disc text-muted-foreground">
              {f.ddd_invariants.map((inv, i) => <li key={i}>{inv}</li>)}
            </ul>
          </div>
        )}
        {f.ddd_ubiquitous_terms && f.ddd_ubiquitous_terms.length > 0 && (
          <div className="px-4 py-2">
            <p className="mb-1 font-semibold">🗣️ Lenguaje ubicuo</p>
            <p className="text-muted-foreground">{f.ddd_ubiquitous_terms.join(' · ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
