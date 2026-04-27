import Link from 'next/link';
import { BookOpen, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { concepto } from '#site/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glosario Universal',
  description: 'Corpus conceptual de la reforma vinculante UDFJC · ~74 conceptos canónicos con SKOS + ISO 1087.',
};

/**
 * /glosario · v5.0h — index del Glosario Universal.
 *
 * Lista los 74 conceptos canónicos del corpus cap-MI12 ordenados
 * alfabéticamente. Cada concepto es un átomo `.md` con frontmatter
 * SKOS/ISO 1087 que vive en `content/glosario/con-*.md`.
 *
 * Independiente de las investigaciones (M01-M12) — es la base conceptual
 * compartida por todo el corpus reforma·ud.
 */
export default function GlosarioPage() {
  const conceptos = [...concepto].sort((a, b) =>
    (a.skos_prefLabel ?? a.kd_title).localeCompare(b.skos_prefLabel ?? b.kd_title, 'es')
  );

  // Indexar por primera letra para navegación A-Z
  const byLetter: Record<string, typeof conceptos> = {};
  for (const c of conceptos) {
    const label = c.skos_prefLabel ?? c.kd_title;
    const letter = label.charAt(0).toUpperCase();
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(c);
  }
  const letters = Object.keys(byLetter).sort();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <Badge variant="outline" className="font-mono text-[10px]">M00</Badge>
          <Badge variant="secondary" className="text-[10px]">{conceptos.length} conceptos</Badge>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Glosario Universal
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Corpus conceptual canónico de la reforma vinculante UDFJC. Cada concepto es un átomo modelado
          con <strong>SKOS</strong> + <strong>ISO 1087</strong> + <strong>schema.org</strong>, con
          relaciones tipadas que forman el grafo semántico de la reforma.
        </p>
      </header>

      {/* Anchor nav A-Z */}
      <nav className="sticky top-16 z-10 mb-6 flex flex-wrap gap-1 rounded-lg border bg-background/95 px-2 py-2 backdrop-blur">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded text-xs font-mono font-medium hover:bg-accent hover:text-foreground transition-colors"
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="mb-3 inline-flex items-center gap-2 border-b pb-1 text-2xl font-bold">
              <span className="font-mono text-primary">{letter}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {byLetter[letter].length}
              </span>
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {byLetter[letter].map((c) => (
                <Link key={c.id} href={c.href}>
                  <Card className="group h-full p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Hash className="h-3 w-3 text-muted-foreground/60" />
                      <span className="font-mono text-[9px] text-muted-foreground/70 uppercase">
                        {c.id}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-tight group-hover:text-primary">
                      {c.skos_prefLabel ?? c.kd_title}
                    </h3>
                    {c.skos_definition && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-3">
                        {c.skos_definition}
                      </p>
                    )}
                    {c.iso_subject_field && (
                      <Badge variant="outline" className="mt-2 text-[9px]">
                        {c.iso_subject_field}
                      </Badge>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
