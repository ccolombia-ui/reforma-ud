import { news } from '#site/content';
import { ExternalLink, Newspaper, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SOURCE_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  twitter: 'X / Twitter',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  web: 'Web',
  'medio-prensa': 'Prensa',
  otro: 'Otro',
};

const SOURCE_ICON: Record<string, string> = {
  instagram: '📷',
  twitter: '𝕏',
  youtube: '▶',
  tiktok: '♪',
  linkedin: '💼',
  facebook: 'f',
  web: '🌐',
  'medio-prensa': '📰',
  otro: '🔗',
};

/**
 * NoticiasRelacionadas · v5.0z — distribución contextual del feed central.
 *
 * Cada comunidad ve solo las noticias del feed cuyo `comunidades[]`
 * incluye su slug normalizado (sin prefijo "comunidades/"), o cuyas
 * `cites[]` interseccionan con las `cites[]` propias de la comunidad.
 *
 * Patrón SOTA: ingestión central + distribución por relación tag-based
 * (Reddit subreddits, Notion linked databases, Slack channels).
 */
export function NoticiasRelacionadas({
  communitySlug,
  communityCites = [],
  limit = 5,
}: Readonly<{
  communitySlug: string;          // ej. "comunidades/gobierno"
  communityCites?: string[];      // ej. ["m01", "m02", "m03"]
  limit?: number;
}>) {
  // Normalizar el slug de comunidad: "comunidades/gobierno" → "gobierno"
  const normalizedSlug = communitySlug.replace(/^comunidades\//, '');
  const segments = normalizedSlug.split('/');

  // Match: la noticia pertenece a esta comunidad si declara su slug en
  // cualquiera de los segmentos jerárquicos (gobierno O formacion O ...).
  const matched = news
    .filter((n) => {
      const byComunidad = n.comunidades.some((c) => segments.includes(c));
      const byCites = communityCites.length > 0 && n.cites.some((m) => communityCites.includes(m));
      return byComunidad || byCites;
    })
    .sort((a, b) => b.captured_at.localeCompare(a.captured_at))
    .slice(0, limit);

  if (matched.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Newspaper className="h-4 w-4 text-primary" />
          Noticias relacionadas
          <Badge variant="secondary" className="text-[10px]">{matched.length}</Badge>
        </h2>
        <span className="text-xs text-muted-foreground">
          Inductor de opinión · feed centralizado tagged
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {matched.map((n) => (
          <a
            key={n.id}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="h-full p-3 transition-colors hover:border-primary/50 hover:bg-accent/30">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-base leading-none" aria-hidden>
                  {SOURCE_ICON[n.source] ?? '🔗'}
                </span>
                <Badge variant="outline" className="text-[9px] font-mono">
                  {SOURCE_LABEL[n.source] ?? n.source}
                </Badge>
                <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {n.captured_at}
                </span>
              </div>
              <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-tight group-hover:text-primary">
                {n.title}
              </h3>
              <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                {n.excerpt}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                {n.cites.slice(0, 3).map((m) => (
                  <Badge key={m} variant="secondary" className="font-mono text-[9px]">
                    {m.toUpperCase()}
                  </Badge>
                ))}
                {n.tags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="outline" className="text-[9px]">
                    #{t}
                  </Badge>
                ))}
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground/60 group-hover:text-primary" />
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
