/**
 * <DvMandatos> · Mandatos derivados norm_mandates (Art. 98).
 * v8 S2 · Reemplazo del DV block §5 del concepto-universal (T1 NORMATIVO).
 * Server component.
 */
import type { TuplaRelation } from './types';
import { labelFromWikilink } from './types';

export function DvMandatos({ relations }: Readonly<{ relations: TuplaRelation[] }>) {
  const mandates = (relations ?? []).filter((r) => r.rel_nombre === 'norm_mandates');

  if (mandates.length === 0) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        Sin mandatos derivados declarados en tupla__relations.
      </p>
    );
  }

  return (
    <div className="dv-mandatos my-4 rounded-lg border bg-card overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b bg-muted/40">
            <th scope="col" className="px-4 py-2 text-left font-semibold w-8">§</th>
            <th scope="col" className="px-4 py-2 text-left font-semibold">Estatuto derivado</th>
            <th scope="col" className="px-4 py-2 text-left font-semibold">Evidencia · plazo</th>
          </tr>
        </thead>
        <tbody>
          {mandates.map((r, i) => {
            const evidence =
              (r.rel_propiedades?.norm_evidence as string | undefined) ?? '—';
            return (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-2 font-mono text-muted-foreground">§{i + 1}</td>
                <td className="px-4 py-2">{labelFromWikilink(r.rel_target)}</td>
                <td className="px-4 py-2 text-muted-foreground">{evidence}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
