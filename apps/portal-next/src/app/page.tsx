import Link from 'next/link';
import { ArrowRight, BookMarked, Building2, GraduationCap, Microscope, Globe, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { canonicPaper } from '#site/content';
import { filterPublished } from '@/lib/show-drafts';
import { MiActividad } from '@/components/home/mi-actividad';
import { MissionTrackerWidget } from '@/components/home/mission-tracker-widget';
import { QuickTabs } from '@/components/home/quick-tabs';

const COMUNIDADES = [
  {
    slug: '/comunidades/gobierno',
    name: 'Gobierno',
    description: 'CSU, Rectoría y direcciones de gobernanza universitaria.',
    Icon: Building2,
    color: 'var(--color-brand-navy)',
  },
  {
    slug: '/comunidades/formacion',
    name: 'VR Formación',
    description: 'Facultades, programas, escuelas emprendedoras y CABAs.',
    Icon: GraduationCap,
    color: 'var(--color-brand-blue)',
  },
  {
    slug: '/comunidades/investigacion',
    name: 'VR Investigación',
    description: 'Institutos, RITA, OTRI y laboratorios de investigación.',
    Icon: Microscope,
    color: 'var(--color-brand-purple)',
  },
  {
    slug: '/comunidades/extension',
    name: 'VR Extensión',
    description: 'Centros, relaciones interinstitucionales y proyección social.',
    Icon: Globe,
    color: 'var(--color-brand-orange)',
  },
];

const RUTAS_LABEL: Record<string, string> = {
  R1: 'Gobernanza',
  R2: 'Periferia',
  R3: 'Sector',
  R4: 'Misión',
  R5: 'Cultura',
};

export default function HomePage() {
  const papers = filterPublished([...canonicPaper]).sort((a, b) => a.number - b.number);
  const counts = {
    total: papers.length,
    red: papers.filter((p) => p.status === 'red').length,
  };

  return (
    <div className="w-full">
      {/* L1 — Hero + Mission Tracker (primario, above-the-fold) */}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10 space-y-8">
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary" className="font-mono uppercase">CSU 04/2025</Badge>
              <span className="text-muted-foreground">Reforma Vinculante UDFJC</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              La Reforma UDFJC <span className="text-primary">explicada desde tu rol.</span>
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Portal de la <strong className="text-foreground">Reforma Vinculante</strong> UDFJC · Anclado en
              CONPES 4069/2021 + PIIOM · Corpus de <strong className="text-foreground">12 investigaciones</strong> +
              comunidades organizativas + grafos de conocimiento.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/canonico">
                <BookMarked className="h-3.5 w-3.5" /> Canónico
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/canonico/grafo">
                <Network className="h-3.5 w-3.5" /> Grafo
              </Link>
            </Button>
          </div>
        </section>

        {/* Mission Tracker en L1 — pertenencia + ruta visible al primer scroll */}
        <MissionTrackerWidget />
      </div>

      {/* L2 — Banda secundaria: actividad + KPIs (fondo muted) */}
      <div className="bg-muted/30 border-y border-border/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 space-y-6">
          <MiActividad />

          <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPICard label="Investigaciones" value={`${counts.total}`} sub="canónico MI-12" accent="var(--color-brand-blue)" sparkline={[3,5,7,9,10,11,12,12]} sparkColor="#0284c7" />
            <KPICard label="En revisión" value={`${counts.red}`} sub="estado RED · TDD" accent="var(--color-brand-orange)" sparkline={[12,12,11,11,10,9,9,counts.red]} sparkColor="#ea580c" />
            <KPICard label="Comunidades" value="5" sub="tipos por organigrama" accent="var(--color-brand-purple)" sparkline={[1,2,3,3,4,5,5,5]} sparkColor="#7c3aed" />
            <KPICard label="BPAs" value="21" sub="buenas prácticas activadoras" accent="var(--color-brand-emerald)" sparkline={[8,12,15,17,18,20,21,21]} sparkColor="#059669" />
          </section>
        </div>
      </div>

      {/* L3 — Acceso rápido + Comunidades + Corpus */}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 space-y-10">
        <QuickTabs />

      {/* Comunidades cards detalladas */}
      <section className="pt-2 border-t border-border/30">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Comunidades de la reforma</h2>
            <p className="text-sm text-muted-foreground">
              Organizadas según el organigrama oficial Reforma 2024 UDFJC.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/comunidades">
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMUNIDADES.map((c) => (
            <Link key={c.slug} href={c.slug} className="group">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white"
                    style={{ background: c.color }}
                  >
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <CardDescription className="text-sm">{c.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Corpus */}
      <section className="pt-2 border-t border-border/30">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Corpus MI-12 · Hoja de ruta CRISP-DM</h2>
            <p className="text-sm text-muted-foreground">
              Cada investigación responde a una pregunta trazadora del Acuerdo CSU 04/2025.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/canonico">
              Biblioteca completa <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {papers.map((p) => (
            <Link key={p.id} href={p.href} className="group block">
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs text-primary">
                      M{String(p.number).padStart(2, '0')}
                    </span>
                    <span className={`tdd-${p.status}`}>
                      {p.status === 'red' ? 'RED' : p.status === 'yellow' ? 'PR' : 'LIVE'}
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">{p.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1 pt-0">
                  {p.rutaClark.map((r) => (
                    <span
                      key={r}
                      className={`ruta-${r.toLowerCase()} rounded-full px-2 py-0.5 text-[10px] font-semibold`}
                    >
                      {RUTAS_LABEL[r] ?? r}
                    </span>
                  ))}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}

function KPICard({
  label,
  value,
  sub,
  accent,
  sparkline,
  sparkColor,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
  sparkline?: number[];
  sparkColor?: string;
}) {
  const max = sparkline ? Math.max(...sparkline) : 0;
  const min = sparkline ? Math.min(...sparkline) : 0;
  const range = max - min || 1;
  const points = sparkline?.map((v, i) => {
    const x = (i / (sparkline.length - 1)) * 80;
    const y = 28 - ((v - min) / range) * 24 - 2;
    return `${x},${y}`;
  });
  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: accent }}>
      <CardContent className="p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-1 flex items-end justify-between gap-2">
          <div>
            <div className="text-3xl font-bold tracking-tight" style={{ color: accent }}>{value}</div>
            <div className="text-xs text-muted-foreground">{sub}</div>
          </div>
          {points && sparkColor && (
            <svg viewBox="0 0 80 28" width="80" height="28" className="overflow-visible">
              <polyline points={points.join(' ')} fill="none" stroke={sparkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="80" cy={28 - ((sparkline![sparkline!.length - 1] - min) / range) * 24 - 2} r="2.5" fill={sparkColor} />
            </svg>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
