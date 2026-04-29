/**
 * <DvEvolucion> · Evolución longitudinal / provenance normativa.
 * v8 S2 · Reemplazo del DV block §6 del concepto-universal.
 * Server component.
 */
import { labelFromWikilink } from './types';

export function DvEvolucion({
  anchors,
  currentAnchor,
  chainStatus,
  validFrom,
  validTo,
}: Readonly<{
  anchors: string[];
  currentAnchor?: string;
  chainStatus?: string;
  validFrom?: string;
  validTo?: string;
}>) {
  const hasAnchors = anchors && anchors.length > 0;

  return (
    <div className="dv-evolucion my-3 space-y-2 text-xs">
      <dl className="flex flex-wrap gap-x-6 gap-y-1 rounded-md border bg-muted/20 px-4 py-2.5">
        <div className="flex gap-1.5">
          <dt className="font-semibold">Chain status:</dt>
          <dd className="font-mono">{chainStatus ?? '—'}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold">Anchor ACTIVE:</dt>
          <dd className="font-mono">
            {currentAnchor ? labelFromWikilink(currentAnchor) : '—'}
          </dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold">Vigente desde:</dt>
          <dd>{validFrom ?? '—'}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold">Hasta:</dt>
          <dd>{validTo || 'actualmente · ACTIVE'}</dd>
        </div>
      </dl>

      {!hasAnchors ? (
        <p className="dv-empty text-muted-foreground italic">
          (Sin definitional anchors poblados todavía · TODO Sprint 1)
        </p>
      ) : (
        <>
          <h4 className="font-semibold">Cadena de definitional anchors (cronológica)</h4>
          <ul className="space-y-1 pl-4 list-disc">
            {anchors.map((a, i) => (
              <li key={i} className="text-muted-foreground">
                {labelFromWikilink(a)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
