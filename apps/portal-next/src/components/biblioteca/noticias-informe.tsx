'use client';

import { news } from '#site/content';
import { Newspaper, ExternalLink, Calendar, FlaskConical, Building, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NewsThumbnail } from '@/components/biblioteca/news-thumbnail';

const SOURCE_ICON: Record<string, string> = {
  instagram: '📷',
  twitter: '𝕏',
  youtube: '▶',
  tiktok: '♪',
  linkedin: '💼',
  facebook: 'f',
  web: '🌐',
  'medio-prensa': '📰',
  'paper-academico': '📚',
  'informe-institucional': '🏛️',
  otro: '🔗',
};

const SOURCE_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  twitter: 'X / Twitter',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  web: 'Web',
  'medio-prensa': 'Prensa',
  'paper-academico': 'Paper académico',
  'informe-institucional': 'Informe MEN/CSU',
  otro: 'Otro',
};

type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  captured_at: string;
  excerpt?: string;
  tags?: string[];
  cites?: string[];
  isMock?: boolean;
};

/**
 * MOCK_NEWS · v7.5 — datos de ejemplo para demostrar la diversidad del feed
 * mientras el pipeline sync-actualidad.mjs se conceptualiza (v7.1).
 *
 * Cuando el pipeline esté listo, estos mocks se reemplazan automáticamente
 * por items del collection `news` (filtrados por relevancia >= media).
 */
const MOCK_NEWS: NewsItem[] = [
  {
    id: 'mock-csu-cronograma',
    title: 'CSU aprueba cronograma de implementación de la Reforma Vinculante 2026-2034',
    source: 'informe-institucional',
    url: 'https://www.udistrital.edu.co/',
    captured_at: '2026-04-22',
    excerpt: 'El Consejo Superior Universitario aprobó por unanimidad el cronograma de despliegue del ACU 004-25, con hitos trimestrales hasta 2034. Define las CABA piloto y los pilares BSC×RBM×CRISP.',
    tags: ['csu', 'cronograma', 'acu-004-25'],
    cites: ['m01', 'm12'],
    isMock: true,
  },
  {
    id: 'mock-tdabc-scielo',
    title: 'Time-Driven Activity-Based Costing en universidades públicas latinoamericanas: caso comparativo',
    source: 'paper-academico',
    url: 'https://scielo.org/',
    captured_at: '2026-03-15',
    excerpt: 'Estudio comparativo TDABC en U. Chile, USP y UNAM (2018-2024). Confirma viabilidad metodológica con CCR calibrado a partir de 10K+ contratos. Benchmark relevante para M10.',
    tags: ['tdabc', 'benchmarking', 'ies-publica'],
    cites: ['m10', 'm05'],
    isMock: true,
  },
  {
    id: 'mock-men-creditos',
    title: 'MEN expide resolución sobre homologación de créditos académicos SENA→IES',
    source: 'informe-institucional',
    url: 'https://www.mineducacion.gov.co/',
    captured_at: '2026-04-08',
    excerpt: 'Resolución ministerial habilita homologación de créditos del SENA en programas de IES públicas. Impacto directo en CCA UDFJC para Escuelas Emprendedoras Transformativas.',
    tags: ['men', 'creditos', 'sena'],
    cites: ['m06', 'm04'],
    isMock: true,
  },
  {
    id: 'mock-oecd-education',
    title: 'OECD publica Education 2030 Learning Compass: agencia estudiantil y co-agencia',
    source: 'paper-academico',
    url: 'https://www.oecd.org/education/2030-project/',
    captured_at: '2026-02-20',
    excerpt: 'Marco de competencias OECD para 2030 enfatiza "student agency" y "co-agency" como ejes. Convergente con Soberanía Cognitiva del ACU 004-25 Art. 5g.',
    tags: ['oecd', 'estandares', 'competencias'],
    cites: ['m03', 'm04'],
    isMock: true,
  },
];

export function NoticiasInforme({ limit = 6 }: Readonly<{ limit?: number }>) {
  // Usa news del collection + completa con mocks hasta llegar a `limit`
  const realNews = [...news]
    .sort((a, b) => b.captured_at.localeCompare(a.captured_at))
    .slice(0, limit);

  const needed = limit - realNews.length;
  const mocks = needed > 0 ? MOCK_NEWS.slice(0, needed) : [];
  const items: NewsItem[] = [...realNews, ...mocks];

  if (items.length === 0) return null;

  // Categoría visual del item
  const itemKind = (item: NewsItem): { Icon: React.ElementType; color: string } => {
    if (item.source === 'paper-academico') return { Icon: FlaskConical, color: 'text-violet-600 dark:text-violet-400' };
    if (item.source === 'informe-institucional') return { Icon: Building, color: 'text-amber-600 dark:text-amber-400' };
    if (['medio-prensa', 'web'].includes(item.source)) return { Icon: FileText, color: 'text-blue-600 dark:text-blue-400' };
    return { Icon: Newspaper, color: 'text-emerald-600 dark:text-emerald-400' };
  };

  return (
    <section id="noticias-informe" className="my-8 rounded-lg border bg-card p-6 scroll-mt-32">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Newspaper className="h-4 w-4 text-primary" />
          Noticias e investigaciones recientes
          <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
        </h2>
        <span className="text-xs text-muted-foreground">
          Feed centralizado · actualidad de la reforma {mocks.length > 0 && '· demo con mocks'}
        </span>
      </header>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => {
          const { Icon, color } = itemKind(n);
          return (
            <a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-md border bg-background transition-colors hover:border-primary/50 hover:bg-accent/30"
            >
              {/* v7.7 · thumbnail og:image */}
              <NewsThumbnail
                url={n.url}
                source={n.source}
                stored={(n as { image?: string }).image}
                alt={n.title}
                className="h-32 w-full"
              />
              <div className="p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <Badge variant="outline" className="font-mono text-[9px]">
                  {SOURCE_ICON[n.source] ?? '🔗'} {SOURCE_LABEL[n.source] ?? n.source}
                </Badge>
                {n.isMock && (
                  <Badge variant="outline" className="border-dashed text-[8px] text-muted-foreground">
                    mock
                  </Badge>
                )}
                <span className="ml-auto inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <Calendar className="h-2.5 w-2.5" />
                  {n.captured_at}
                </span>
              </div>
              <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight group-hover:text-primary">
                {n.title}
              </h3>
              {n.excerpt && (
                <p className="mb-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {n.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-1">
                {(n.cites ?? []).slice(0, 3).map((m) => (
                  <Badge key={m} variant="secondary" className="font-mono text-[9px]">
                    {m.toUpperCase()}
                  </Badge>
                ))}
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground/60 group-hover:text-primary" />
              </div>
              </div>
            </a>
          );
        })}
      </div>

      {mocks.length > 0 && (
        <p className="mt-4 text-[10px] italic text-muted-foreground">
          Las noticias marcadas como <Badge variant="outline" className="border-dashed text-[8px] mx-0.5">mock</Badge>
          son ejemplos para demostrar el potencial del feed. Cuando el pipeline
          <code className="mx-1 rounded bg-muted px-1 font-mono text-[9px]">sync-actualidad.mjs</code>
          esté operativo (v7.1), se reemplazarán automáticamente por noticias reales del vault Obsidian.
        </p>
      )}
    </section>
  );
}
