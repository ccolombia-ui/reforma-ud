/**
 * <DvRelations> · Relaciones semánticas outgoing agrupadas por frame.
 * v8 S2 · Reemplazo del DV block §7 del concepto-universal.
 * Server component.
 */
import type { TuplaRelation } from './types';
import { labelFromWikilink } from './types';

const FRAME_LABELS: Record<string, string> = {
  normativo: '⚖️ Normativo',
  skos: '🔤 SKOS',
  bibliografico: '📚 Bibliográfico',
  ddd: '🗺️ DDD',
  general: '🔗 General',
};

function groupBy<T>(items: T[], key: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const item of items) {
    const k = key(item);
    (out[k] ??= []).push(item);
  }
  return out;
}

export function DvRelations({ relations }: Readonly<{ relations: TuplaRelation[] }>) {
  const filtered = (relations ?? []).filter((r) => r.rel_nombre !== 'norm_mandates');

  if (filtered.length === 0) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        Sin relaciones outgoing declaradas (excluyendo norm_mandates).
      </p>
    );
  }

  const byFrame = groupBy(filtered, (r) => r.rel_frame ?? 'general');

  return (
    <div className="dv-relations my-3 space-y-5 text-xs">
      {Object.entries(byFrame).map(([frame, rels]) => {
        const byRelKey = groupBy(
          rels,
          (r) => `${r.rel_nombre}::${r.rel_direccion ?? 'co'}`
        );

        return (
          <section key={frame}>
            <h4 className="mb-2 flex items-center gap-2 font-semibold">
              {FRAME_LABELS[frame] ?? `\`${frame}\``}
              <span className="font-mono text-[10px] text-muted-foreground">
                ({rels.length} relación{rels.length !== 1 ? 'es' : ''})
              </span>
            </h4>

            {Object.entries(byRelKey).map(([key, items]) => {
              const [relNombre, relDir] = key.split('::');
              return (
                <div key={key} className="mb-3">
                  <p className="mb-1 font-mono text-[10px] text-muted-foreground">
                    {relNombre} · {relDir}
                  </p>
                  <table className="w-full rounded border bg-card">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th scope="col" className="px-3 py-1.5 text-left font-semibold">→ Target</th>
                        <th scope="col" className="px-3 py-1.5 text-left font-semibold">Evidencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((r, i) => {
                        const evidence =
                          (r.rel_propiedades?.norm_evidence as string | undefined) ??
                          (r.rel_propiedades?.skos_evidence as string | undefined) ??
                          '—';
                        return (
                          <tr key={i} className="border-b last:border-0">
                            <td className="px-3 py-1.5 font-mono">
                              {labelFromWikilink(r.rel_target)}
                            </td>
                            <td className="px-3 py-1.5 text-muted-foreground">{evidence}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
