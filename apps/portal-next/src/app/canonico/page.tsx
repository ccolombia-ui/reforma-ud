import Link from 'next/link';
import { ArrowRight, BookMarked, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper } from '#site/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canónico MI-12 — Biblioteca',
  description: '12 investigaciones que sustentan la Reforma Vinculante UDFJC.',
};

const PHASE_LABEL: Record<string, string> = {
  business: 'Business Understanding',
  'data-understanding': 'Data Understanding',
  'data-prep': 'Data Preparation',
  modeling: 'Modeling',
  evaluation: 'Evaluation',
  deployment: 'Deployment',
};

const PHASE_COLOR: Record<string, string> = {
  business: 'var(--color-brand-emerald)',
  'data-understanding': 'var(--color-brand-blue)',
  'data-prep': 'var(--color-brand-purple)',
  modeling: 'var(--color-brand-gold)',
  evaluation: 'var(--color-brand-orange)',
  deployment: 'var(--color-brand-navy)',
};

const RUTAS_LABEL: Record<string, string> = {
  R1: 'Gobernanza',
  R2: 'Periferia',
  R3: 'Sector',
  R4: 'Misión',
  R5: 'Cultura',
};

export default function CanonicoIndex() {
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);
  const byPhase = papers.reduce<Record<string, typeof papers>>((acc, p) => {
    (acc[p.crispPhase] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Biblioteca</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
          Canónico MI-12
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Las 12 investigaciones que sustentan teóricamente la Reforma Vinculante UDFJC. Sustrato
          conceptual compartido que las comunidades de práctica citan y aplican.
        </p>
        <div className="mt-5 flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/canonico/grafo">
              <Network className="h-4 w-4" />
              Ver grafo global
            </Link>
          </Button>
        </div>
      </div>

      {Object.entries(PHASE_LABEL).map(([phase, label]) => {
        const list = byPhase[phase] ?? [];
        if (!list.length) return null;
        return (
          <section key={phase} className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: PHASE_COLOR[phase] }}
              />
              <h2 className="text-lg font-semibold tracking-tight">
                {label}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  · {list.length} investigación{list.length === 1 ? '' : 'es'}
                </span>
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link key={p.id} href={p.href} className="group block">
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <span className="font-mono text-xs text-primary">
                          M{String(p.number).padStart(2, '0')}
                        </span>
                        <span className={`tdd-${p.status}`}>
                          {p.status === 'red' ? 'RED' : p.status === 'yellow' ? 'PR' : 'LIVE'}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug">
                        <span className="inline-flex items-center gap-1">
                          <BookMarked className="h-3.5 w-3.5 opacity-60" />
                          {p.title}
                        </span>
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-sm">
                        {p.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-1 pt-0">
                      {p.rutaClark.map((r) => (
                        <Badge key={r} variant="outline" className="text-[10px]">
                          {RUTAS_LABEL[r] ?? r}
                        </Badge>
                      ))}
                      <span className="ml-auto inline-flex items-center text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        Leer <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
