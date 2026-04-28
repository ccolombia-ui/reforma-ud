import Link from 'next/link';
import { BookMarked, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { concepto } from '#site/content';

/**
 * ComunidadDefinicion — muestra el concepto del glosario que define/constituye
 * la comunidad (su "carta magna"). Extrae el primer párrafo no-vacío del body
 * compilado y enlaza al concepto completo.
 *
 * G-V7-02 · v7.0
 */
export function ComunidadDefinicion({ conceptoId }: Readonly<{ conceptoId?: string }>) {
  if (!conceptoId) return null;

  const con = concepto.find((c) => c.id === conceptoId);
  if (!con) return null;

  // Extrae la definición SKOS del cuerpo o usa skos_definition del frontmatter
  const definition = (con as unknown as { skos_definition?: string }).skos_definition;
  const label = (con as unknown as { skos_prefLabel?: string }).skos_prefLabel ?? con.kd_title;

  // Truncar a ~280 chars para el teaser
  const teaser = definition
    ? definition.replace(/\*\*/g, '').slice(0, 280) + (definition.length > 280 ? '…' : '')
    : null;

  return (
    <Card className="border-primary/20 bg-primary/5 p-5">
      <div className="flex items-start gap-3">
        <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/30 text-[10px] font-mono">
              Concepto fundante
            </Badge>
            <span className="text-xs font-semibold text-foreground">{label}</span>
          </div>
          {teaser && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {teaser}
            </p>
          )}
          <Link
            href={`/glosario/${conceptoId}/`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Ver concepto completo <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
