/**
 * <DvCitedIn> · Papers cap-MI12 que citan este concepto.
 * v8 S2 · Reemplazo del DV block §10 del concepto-universal.
 *
 * Acepta `cited_in` (array de wikilinks a sec-MI12-XX-*) + `cited_count`.
 * Server component.
 */
import { slugFromWikilink, labelFromWikilink } from './types';

export function DvCitedIn({
  cited_in,
  cited_count,
}: Readonly<{ cited_in: string[]; cited_count?: number }>) {
  const total = cited_count ?? cited_in?.length ?? 0;

  if (!cited_in || cited_in.length === 0) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        No citado en papers cap-MI12 todavía.
      </p>
    );
  }

  return (
    <div className="dv-cited-in my-3 space-y-2">
      <ul className="space-y-1 list-none p-0">
        {cited_in.map((raw) => {
          const slug = slugFromWikilink(raw);
          const label = labelFromWikilink(raw);
          return (
            <li key={slug || raw} className="text-xs">
              <span className="font-mono text-muted-foreground">{label}</span>
            </li>
          );
        })}
      </ul>
      <p className="text-[11px] font-semibold text-muted-foreground">
        {`Total citaciones: ${total}`}
      </p>
    </div>
  );
}
