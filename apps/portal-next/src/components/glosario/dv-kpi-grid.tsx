/**
 * <DvKpiGrid> · KPI grid in/out degree + centralidad.
 * v8 S8 · Reemplazo del DV block §11.1 del concepto-universal.
 * Server component — datos pre-computados server-side.
 */
import type { TuplaRelation } from './types';

type KpiGridProps = {
  slug: string;
  tupla__relations: TuplaRelation[];
  habilita: string[];
  concepto_prerequisitos: string[];
};

export function DvKpiGrid({ tupla__relations, habilita, concepto_prerequisitos }: Readonly<KpiGridProps>) {
  const outDeg = tupla__relations?.length ?? 0;
  const habilitaCount = habilita?.length ?? 0;
  const prereqCount = concepto_prerequisitos?.length ?? 0;

  const cards = [
    { label: 'Out-degree', value: outDeg, sub: 'relaciones salientes', color: 'from-violet-600 to-violet-800' },
    { label: 'Habilita comprensión', value: habilitaCount, sub: 'conceptos lo declaran prereq', color: 'from-emerald-600 to-emerald-800' },
    { label: 'Pre-requisitos', value: prereqCount, sub: 'necesarios para comprenderlo', color: 'from-amber-500 to-amber-700' },
    { label: 'Centralidad aprox.', value: outDeg + habilitaCount, sub: 'out + habilita', color: 'from-sky-600 to-sky-800' },
  ];

  return (
    <div className="dv-kpi-grid my-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map(({ label, value, sub, color }) => (
        <div
          key={label}
          className={`rounded-xl bg-gradient-to-br ${color} p-4 text-white`}
        >
          <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
          <div className="my-1.5 text-3xl font-extrabold leading-none">{value}</div>
          <div className="text-[10px] opacity-80">{sub}</div>
        </div>
      ))}
    </div>
  );
}
