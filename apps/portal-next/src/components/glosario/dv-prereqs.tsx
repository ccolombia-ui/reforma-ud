/**
 * <DvPrereqs> · Lista de pre-requisitos cognitivos.
 * v8 S2 · Renderiza el reemplazo de DataviewJS §3 del concepto-universal.
 *
 * Server component (sin estado · safe en SSG/SSR).
 */
import { slugFromWikilink, labelFromWikilink } from './types';

export function DvPrereqs({ prereqs }: Readonly<{ prereqs: string[] }>) {
  if (!prereqs || prereqs.length === 0) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        Sin pre-requisitos formales declarados.
      </p>
    );
  }

  return (
    <ul className="dv-prereqs my-3 space-y-1.5 list-none p-0">
      {prereqs.map((raw) => {
        const slug = slugFromWikilink(raw);
        const label = labelFromWikilink(raw);
        return (
          <li key={slug || raw}>
            <a
              href={`/glosario/${slug}`}
              className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-1.5 text-xs hover:bg-accent/40 hover:text-primary transition-colors"
            >
              <span className="font-mono">{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
