/**
 * <DvFacetNormative> · Tabla anclaje normativo.
 * v8 S2 · Reemplazo del DV block §2 del concepto-universal (T1 NORMATIVO).
 *
 * Renderiza los 7 campos canónicos #FacetNormative en formato tabla.
 * Server component.
 */
import { labelFromWikilink } from './types';
import type { FacetNormative } from './types';

export function DvFacetNormative({
  facet,
}: Readonly<{ facet: FacetNormative | undefined | null }>) {
  if (!facet) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        (sin facet normative declarado)
      </p>
    );
  }

  const rows: Array<readonly [string, string]> = [
    ['Fuente normativa', labelFromWikilink(facet.normative_source)],
    ['Locator', facet.normative_locator ?? '—'],
    ['Authority level', facet.normative_authority_level ?? '—'],
    ['Chain status', facet.chain_status ?? '—'],
    [
      'Deroga a',
      (facet.derogates ?? []).map(labelFromWikilink).filter((s) => s !== '—').join(' · ') || '—',
    ],
    ['Derogada por', facet.derogated_by ? labelFromWikilink(facet.derogated_by) : 'Vigente'],
    [
      'Conflicts with',
      (facet.conflicts_with ?? []).map(labelFromWikilink).filter((s) => s !== '—').join(' · ') || '—',
    ],
  ];

  return (
    <div className="dv-facet-normative my-4 rounded-lg border bg-card overflow-hidden">
      <div className="border-b bg-muted/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Anclaje normativo · facet-normative
      </div>
      <table className="w-full text-xs">
        <tbody>
          {rows.map(([campo, valor]) => (
            <tr key={campo} className="border-b last:border-0">
              <th
                scope="row"
                className="px-4 py-2 text-left font-medium text-foreground/70 w-44 align-top"
              >
                {campo}
              </th>
              <td className="px-4 py-2 font-mono text-[11px] align-top">{valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
