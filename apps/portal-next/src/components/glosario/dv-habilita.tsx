/**
 * <DvHabilita> · Reverse-lookup: conceptos que declaran ESTE como prereq.
 * v8 S2 · Reemplazo del DV block §4 del concepto-universal.
 *
 * `habilita` es un array de slugs (sin wikilink syntax) pre-computado server-side
 * por la página /glosario/[conceptoId] iterando todo el corpus.
 *
 * Server component.
 */

export function DvHabilita({ habilita }: Readonly<{ habilita: string[] }>) {
  const total = habilita?.length ?? 0;

  const label = total === 1
    ? '📚 1 concepto declara este como pre-requisito directo'
    : `📚 ${total} conceptos declaran este como pre-requisito directo`;

  return (
    <div className="dv-habilita my-3">
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h4>
      {total === 0 ? (
        <p className="dv-empty text-xs text-muted-foreground italic">
          Ningún concepto del corpus declara prereq apuntando aquí todavía.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-1.5 list-none p-0">
          {habilita.map((slug) => (
            <li key={slug}>
              <a
                href={`/glosario/${slug}`}
                className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono hover:bg-accent/50 transition-colors"
              >
                {slug}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
