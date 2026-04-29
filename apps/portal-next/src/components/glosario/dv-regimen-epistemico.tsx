/**
 * <DvRegimenEpistemico> · Régimen epistémico del concepto.
 * v8 S2 · Reemplazo del DV block §12 del concepto-universal.
 * Server component.
 */

export function DvRegimenEpistemico({
  applicable_domain,
  assumptions,
  breaks_at,
}: Readonly<{
  applicable_domain?: string;
  assumptions?: string[];
  breaks_at?: string[];
}>) {
  const hasContent =
    applicable_domain ||
    (assumptions && assumptions.length > 0) ||
    (breaks_at && breaks_at.length > 0);

  if (!hasContent) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        Régimen epistémico no declarado todavía.
      </p>
    );
  }

  return (
    <div className="dv-regimen-epistemico my-3 space-y-3 text-xs">
      {applicable_domain && (
        <section>
          <h4 className="mb-1 font-semibold text-foreground/80">Dominio de aplicación</h4>
          <p className="text-muted-foreground">{applicable_domain}</p>
        </section>
      )}

      {assumptions && assumptions.length > 0 && (
        <section>
          <h4 className="mb-1 font-semibold text-foreground/80">Supuestos explícitos</h4>
          <ul className="space-y-0.5 pl-4 list-disc text-muted-foreground">
            {assumptions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>
      )}

      {breaks_at && breaks_at.length > 0 && (
        <section>
          <h4 className="mb-1 font-semibold text-foreground/80">
            Condiciones que invalidan el concepto (breaks_at)
          </h4>
          <ul className="space-y-0.5 pl-4 list-disc text-muted-foreground">
            {breaks_at.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
