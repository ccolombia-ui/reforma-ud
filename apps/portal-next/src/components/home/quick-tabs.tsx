'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Scale, Building2, Vote, FileText, ChevronRight, GraduationCap, Microscope, Globe, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { canonicPaper, community } from '#site/content';
import { ESTANTES } from '@/lib/estantes';
import { cn } from '@/lib/utils';

type TabId = 'normas' | 'comunidades' | 'encuestas' | 'deliberaciones';

const TABS: Array<{ id: TabId; label: string; emoji: string; Icon: typeof Scale }> = [
  { id: 'normas',         label: 'Normas',         emoji: '📜', Icon: Scale },
  { id: 'comunidades',    label: 'Comunidades',    emoji: '🏛️', Icon: Building2 },
  { id: 'encuestas',      label: 'Encuestas',      emoji: '📊', Icon: FileText },
  { id: 'deliberaciones', label: 'Deliberaciones', emoji: '🗳️', Icon: Vote },
];

const COMUNIDAD_ICONS: Record<string, typeof GraduationCap> = {
  'comunidades/gobierno':       Landmark,
  'comunidades/formacion':      GraduationCap,
  'comunidades/investigacion':  Microscope,
  'comunidades/extension':      Globe,
};

export function QuickTabs() {
  const [active, setActive] = useState<TabId>('comunidades');

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Acceso rápido</h2>
          <p className="text-xs text-muted-foreground">
            Normas activas · comunidades · encuestas · deliberaciones
          </p>
        </div>
      </header>

      <div className="rounded-lg border bg-background">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b p-1.5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap',
                active === tab.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground',
              )}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-3">
          {active === 'normas' && <NormasContent />}
          {active === 'comunidades' && <ComunidadesContent />}
          {active === 'encuestas' && <PlaceholderContent label="Encuestas" emoji="📊" />}
          {active === 'deliberaciones' && <DeliberacionesContent />}
        </div>
      </div>
    </section>
  );
}

function NormasContent() {
  // Estante normas — tomamos los papers del corpus que el clasificador detectaria como norma.
  // Como MVP, mostramos los estantes con conteos a nivel del corpus global.
  const normaEstante = ESTANTES.find((e) => e.id === 'normas');
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Acuerdos, leyes y decretos vinculantes. Cita directa al fundamento normativo de la reforma.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <NormaCard
          title="Acuerdo CSU 04/2025"
          subtitle="Reforma Estatutaria UDFJC · 173 artículos"
          status="vigente"
          color="var(--color-brand-blue)"
        />
        <NormaCard
          title="CONPES 4069/2021"
          subtitle="Política CTI 2022-2031 · misiones transformativas"
          status="vigente"
          color="var(--color-brand-blue)"
        />
        <NormaCard
          title="Ley 30/1992"
          subtitle="Educación Superior · Art. 117 autonomía"
          status="vigente"
          color="var(--color-brand-blue)"
        />
      </div>
      <div className="text-right">
        <Link href="/canonico" className="text-xs text-primary hover:underline">
          Ver todas las normas en biblioteca →
        </Link>
      </div>
    </div>
  );
}

function NormaCard({ title, subtitle, status, color }: { title: string; subtitle: string; status: string; color: string }) {
  return (
    <div className="rounded-md border p-2.5 border-l-4 hover:border-primary/60 transition-colors" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between gap-2">
        <Scale className="h-4 w-4 shrink-0 mt-0.5" style={{ color }} />
        <Badge variant="outline" className="text-[9px] capitalize">{status}</Badge>
      </div>
      <h4 className="text-sm font-semibold mt-1.5 line-clamp-2">{title}</h4>
      <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">{subtitle}</p>
    </div>
  );
}

function ComunidadesContent() {
  const main = community.filter((c) => /^comunidades\/(gobierno|formacion|investigacion|extension)$/.test(c.slug));
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        4 ramas según el organigrama oficial Reforma 2024 UDFJC.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {main.map((c) => {
          const Icon = COMUNIDAD_ICONS[c.slug] ?? Building2;
          return (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block rounded-md border p-2.5 hover:border-primary/60 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </div>
              <h4 className="text-xs font-semibold line-clamp-1">{c.shortName ?? c.name}</h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function DeliberacionesContent() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Decisiones colegiadas en curso. Cada deliberación tiene 5 fases: Propuesta → Discusión → Enmiendas → Votación → Decisión.
      </p>
      <div className="space-y-2">
        <DeliberacionItem
          title="¿Adoptamos la rúbrica xAPI v3 como estándar?"
          phase="Discusión"
          phaseIdx={2}
          interventions={24}
          amendments={3}
          deadline="3 días"
          urgent
          href="/comunidades/formacion/escuelas/fisica"
        />
        <DeliberacionItem
          title="Ratificación del Plan de Mejoramiento institucional 2026"
          phase="Enmiendas"
          phaseIdx={3}
          interventions={42}
          amendments={6}
          deadline="9 días"
          href="/comunidades/gobierno"
        />
      </div>
    </div>
  );
}

function DeliberacionItem({
  title,
  phase,
  phaseIdx,
  interventions,
  amendments,
  deadline,
  urgent,
  href,
}: {
  title: string;
  phase: string;
  phaseIdx: number;
  interventions: number;
  amendments: number;
  deadline: string;
  urgent?: boolean;
  href: string;
}) {
  const phases = ['Propuesta', 'Discusión', 'Enmiendas', 'Votación', 'Decisión'];
  const colors = ['#10b981', '#f59e0b', '#7c3aed', '#0284c7', '#6b7280'];
  return (
    <Link href={href} className="block rounded-md border p-3 hover:border-primary/60 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold line-clamp-2">{title}</h4>
        <Badge variant={urgent ? 'destructive' : 'secondary'} className="text-[10px] shrink-0">
          {urgent ? '⚠ ' : ''}{deadline}
        </Badge>
      </div>
      {/* Stepper */}
      <div className="flex gap-1 mb-1.5">
        {phases.map((p, i) => (
          <div
            key={p}
            className="flex-1 h-1.5 rounded-full"
            style={{ background: i + 1 <= phaseIdx ? colors[i] : 'var(--color-muted)' }}
            title={p}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Fase actual: <strong className="text-foreground">{phase}</strong></span>
        <span>{interventions} intervenciones · {amendments} enmiendas</span>
      </div>
    </Link>
  );
}

function PlaceholderContent({ label, emoji }: { label: string; emoji: string }) {
  return (
    <div className="rounded-md border border-dashed bg-muted/20 p-6 text-center">
      <div className="text-3xl mb-2">{emoji}</div>
      <h4 className="text-sm font-semibold">{label} · próximamente</h4>
      <p className="text-[10px] text-muted-foreground mt-1 max-w-sm mx-auto">
        El servicio de {label.toLowerCase()} se habilitará en v4.3 cuando integremos la colección Velite
        de eventos y formularios.
      </p>
    </div>
  );
}
