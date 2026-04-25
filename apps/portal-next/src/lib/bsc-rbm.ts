/**
 * BSC-S / RBM-GAC v4 — calcula 4 KPIs (P1-P4) por Comunidad de Práctica
 * a partir de Velite collections + reading state local.
 *
 * Marco conceptual: M03 (Framework BSC-S + RBM-GAC v4 — Kaplan + Global Affairs Canada)
 * - P1 Compromiso       (BSC: Aprendizaje · RBM: Outcomes)
 * - P2 Producción       (BSC: Procesos    · RBM: Outputs)
 * - P3 Impacto          (BSC: Sociedad    · RBM: Impact)
 * - P4 Sostenibilidad   (BSC: Recursos    · RBM: Inputs)
 */
import { canonicPaper, community, note } from '#site/content';
import type { KPIData } from '@/components/dashboard/kpi-card';
import { calculateRAG, type RAGStatus } from '@/components/dashboard/rag-indicator';
import type { ReadingState } from '@/lib/reading-state';

type Community = (typeof community)[number];
type Note = (typeof note)[number];
type CanonicPaper = (typeof canonicPaper)[number];

/** Genera una sparkline de 8 puntos plausible alrededor del valor actual. */
function makeSparkline(value: number, trendBias: 'up' | 'down' | 'stable'): number[] {
  const out: number[] = [];
  const seed = value * 37;
  for (let i = 0; i < 8; i++) {
    const phase = Math.sin((seed + i * 7) * 0.13);
    const trendOffset = trendBias === 'up' ? -i * 1.2 : trendBias === 'down' ? i * 1.2 : 0;
    out.push(Math.max(0, Math.min(100, Math.round(value + phase * 6 + trendOffset - 4))));
  }
  out[7] = Math.max(0, Math.min(100, value));
  return out;
}

function ragFromValue(v: number, thresholds: { good: number; warn: number }): RAGStatus {
  if (v >= thresholds.good) return 'green';
  if (v >= thresholds.warn) return 'amber';
  if (v > 0) return 'red';
  return 'gray';
}

export type CopKPIInputs = {
  cop: Community;
  notesInVault: Note[];
  subCommunities: Community[];
  citedPapers: CanonicPaper[];
  citedByOtherCops: Community[];
  readingState?: ReadingState | null;
};

export function gatherCopInputs(copSlug: string): CopKPIInputs | null {
  const cop = community.find((c) => c.slug === copSlug);
  if (!cop) return null;
  const notesInVault = note.filter((n) => n.communitySlug === copSlug || n.communitySlug.startsWith(copSlug + '/'));
  const subCommunities = community.filter((c) => c.slug !== copSlug && c.slug.startsWith(copSlug + '/'));
  const cites = cop.cites ?? [];
  const citedPapers = canonicPaper.filter((p) => cites.includes(p.id));
  const citedByOtherCops = community.filter(
    (c) => c.slug !== copSlug && c.slug !== 'comunidades' && (c.cites ?? []).some((p) => cites.includes(p)),
  );
  return { cop, notesInVault, subCommunities, citedPapers, citedByOtherCops };
}

export function calcCopKPIs(copSlug: string, readingState?: ReadingState | null): KPIData[] {
  const data = gatherCopInputs(copSlug);
  if (!data) return [];
  const { cop, notesInVault, subCommunities, citedPapers, citedByOtherCops } = data;

  const totalDocsForCop = citedPapers.length + notesInVault.length;
  let readDocs = 0;
  if (readingState) {
    for (const p of citedPapers) {
      const st = readingState.docs[p.id];
      if (st && st.progress > 0) readDocs += 1;
    }
    for (const n of notesInVault) {
      const st = readingState.docs[n.slug];
      if (st && st.progress > 0) readDocs += 1;
    }
  }
  const p1Value = totalDocsForCop > 0 ? Math.round((readDocs / totalDocsForCop) * 100) : 0;

  const p2Value = notesInVault.length;

  const p3Value = citedByOtherCops.length;

  const p4Value = subCommunities.length;

  const p1: KPIData = {
    id: 'p1',
    title: 'Compromiso',
    description: 'Outcomes RBM · BSC Aprendizaje',
    value: p1Value,
    target: 100,
    unit: '%',
    status: ragFromValue(p1Value, { good: 70, warn: 30 }),
    trend: p1Value > 50 ? 'up' : p1Value > 0 ? 'stable' : 'down',
    sparkline: makeSparkline(p1Value, p1Value > 50 ? 'up' : 'stable'),
  };

  const p2: KPIData = {
    id: 'p2',
    title: 'Producción',
    description: 'Outputs RBM · Notas del vault',
    value: p2Value,
    status: p2Value >= 5 ? 'green' : p2Value >= 1 ? 'amber' : 'gray',
    trend: p2Value > 0 ? 'up' : 'stable',
    sparkline: makeSparkline(p2Value * 10, 'up'),
  };

  const p3: KPIData = {
    id: 'p3',
    title: 'Impacto',
    description: 'Cross-citas con otras CoPs',
    value: p3Value,
    status: p3Value >= 3 ? 'green' : p3Value >= 1 ? 'amber' : 'gray',
    trend: p3Value > 1 ? 'up' : 'stable',
    sparkline: makeSparkline(p3Value * 15, 'stable'),
  };

  const p4: KPIData = {
    id: 'p4',
    title: 'Sostenibilidad',
    description: 'Sub-comunidades activas',
    value: p4Value,
    status: p4Value >= 2 ? 'green' : p4Value >= 1 ? 'amber' : 'gray',
    trend: 'stable',
    sparkline: makeSparkline(p4Value * 18, 'stable'),
  };

  return [p1, p2, p3, p4];
}

export type CopDashboardItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: RAGStatus;
  progress: number;
  href: string;
  type: 'paper' | 'note' | 'community';
  meta?: Record<string, string>;
};

export function buildCopItems(copSlug: string, readingState?: ReadingState | null): CopDashboardItem[] {
  const data = gatherCopInputs(copSlug);
  if (!data) return [];
  const { notesInVault, citedPapers, subCommunities } = data;

  const items: CopDashboardItem[] = [];

  for (const p of citedPapers) {
    const rs = readingState?.docs[p.id];
    const progress = rs?.progress ?? 0;
    items.push({
      id: p.id,
      code: `M${String(p.number).padStart(2, '0')}`,
      title: p.title,
      description: p.description,
      status: progress >= 70 ? 'green' : progress >= 30 ? 'amber' : progress > 0 ? 'red' : 'gray',
      progress,
      href: p.href,
      type: 'paper',
      meta: { phase: p.crispPhase },
    });
  }

  for (const n of notesInVault) {
    const rs = readingState?.docs[n.slug];
    const progress = rs?.progress ?? 0;
    items.push({
      id: n.slug,
      code: 'N',
      title: n.title,
      description: n.tags.slice(0, 4).map((t) => `#${t}`).join(' '),
      status: calculateRAG(progress),
      progress,
      href: n.href,
      type: 'note',
    });
  }

  for (const sc of subCommunities) {
    items.push({
      id: sc.slug,
      code: sc.type.toUpperCase(),
      title: sc.shortName ?? sc.name,
      description: sc.description,
      status: 'gray',
      progress: 0,
      href: `/${sc.slug}`,
      type: 'community',
    });
  }

  return items;
}
