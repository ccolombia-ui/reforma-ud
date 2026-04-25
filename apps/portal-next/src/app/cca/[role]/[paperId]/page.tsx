'use client';

import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import { ChevronLeft, Printer, Award, ShieldCheck, Calendar, Hash, Trophy, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper } from '#site/content';
import { COMPREHENSION_REGISTRY } from '@/lib/comprehension';
import { getReadingState, type ReadingState } from '@/lib/reading-state';
import { useActiveProfile, ROLES, type RoleId } from '@/lib/ui-state';
import { calcMission } from '@/lib/mission-state';

const ROLE_TITLES: Record<RoleId, string> = {
  'estudiante':           'Estudiante Soberano',
  'docente-disenador':    'Docente Diseñador (Arquitecto CCA)',
  'docente-formador':     'Docente Formador (Active Learning)',
  'docente-investigador': 'Docente Investigador (Pasteur Pleno)',
  'docente-emprendedor':  'Docente Emprendedor (Agente Territorial)',
  'docente-director':     'Docente Director (Visionario Estratégico)',
};

export default function CCAPage({ params }: { params: Promise<{ role: string; paperId: string }> }) {
  const { role: roleParam, paperId } = use(params);
  const paper = canonicPaper.find((p) => p.id === paperId);
  if (!paper) notFound();

  const validRole = ROLES.some((r) => r.id === roleParam);
  if (!validRole) notFound();
  const role = roleParam as RoleId;

  const { name } = useActiveProfile();
  const [readingState, setReadingState] = useState<ReadingState | null>(null);

  useEffect(() => {
    setReadingState(getReadingState());
    const onChange = () => setReadingState(getReadingState());
    window.addEventListener('reading-state-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('reading-state-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  // El CCA solo se "emite" si la misión está completada
  const mission = useMemo(
    () => calcMission(paperId, readingState, true), // tratamos prevCompleted=true porque el usuario está aquí explícitamente
    [paperId, readingState],
  );
  const compr = COMPREHENSION_REGISTRY[paperId];

  const issued = useMemo(() => {
    const docState = readingState?.docs[paperId];
    if (!docState) return null;
    const date = docState.lastReadAt ? new Date(docState.lastReadAt) : new Date();
    return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  }, [readingState, paperId]);

  // Hash determinístico simple para "código de verificación" demo (sin backend)
  const verificationCode = useMemo(() => {
    const seed = `${role}|${paperId}|${name}|${issued ?? ''}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return `CCA-${paperId.toUpperCase()}-${Math.abs(hash).toString(16).slice(0, 8).toUpperCase()}`;
  }, [role, paperId, name, issued]);

  const roleTitle = ROLE_TITLES[role] ?? role;

  if (mission.status !== 'completed' || !mission.hasCCA) {
    return <NotEarnedView paperId={paperId} mission={mission} />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
      {/* Top nav (no-print) */}
      <div className="mb-6 flex items-center justify-between gap-2 text-sm text-muted-foreground no-print">
        <Link href={`/mision/${paperId}`} className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver a la misión
        </Link>
        <Button onClick={() => window.print()} size="sm" variant="outline" className="gap-1.5">
          <Printer className="h-3.5 w-3.5" /> Imprimir / PDF
        </Button>
      </div>

      {/* Constancia (printable) */}
      <article className="cca-certificate rounded-lg border-4 border-double border-primary/30 bg-background p-8 md:p-12 shadow-md">
        {/* Encabezado oficial */}
        <header className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Acuerdo CSU 04/2025 · Reforma Vinculante UDFJC
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight">
            Universidad Distrital Francisco José de Caldas
          </h1>
          <p className="text-xs text-muted-foreground">Bogotá, Colombia · Sistema de Constancias de Comprensión Acreditada</p>
        </header>

        {/* Sello CCA */}
        <div className="text-center mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg ring-4 ring-amber-200 dark:ring-amber-900/40">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Constancia de Comprensión Acreditada
          </h2>
          <p className="mt-1 text-xs uppercase tracking-widest font-mono text-muted-foreground">CCA · Misión M{String(mission.number).padStart(2, '0')}</p>
        </div>

        {/* Cuerpo */}
        <div className="space-y-5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">Se hace constar que</p>
          <p className="text-2xl font-serif font-semibold border-b-2 border-primary/30 pb-2 inline-block px-8">
            {name}
          </p>
          <p className="text-sm text-muted-foreground">
            en su rol de <strong className="text-foreground">{roleTitle}</strong>, ha completado satisfactoriamente la lectura comprensiva del documento canónico
          </p>
          <p className="text-lg font-semibold leading-snug px-4">
            «{paper.title}»
          </p>
          <p className="text-xs text-muted-foreground italic max-w-xl mx-auto">
            {paper.description}
          </p>
        </div>

        {/* Métricas verificables */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <MetricBox label="Secciones leídas" value={`${mission.sectionsRead}/${mission.sectionsTotal}`} />
          <MetricBox label="Preguntas verificadas" value={`${mission.questionsVerified}/${mission.questionsTotal}`} />
          <MetricBox label="Avance" value={`${mission.progress}%`} />
          <MetricBox label="Fecha de emisión" value={issued ?? '—'} />
        </div>

        {/* Pie con código de verificación */}
        <footer className="mt-10 pt-6 border-t border-primary/20 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span className="font-mono">{verificationCode}</span>
          </div>
          <p className="text-[10px] text-muted-foreground italic max-w-md mx-auto">
            Esta constancia documenta lectura comprensiva trazada vía rúbrica xAPI v3 sobre el corpus MI-12.
            Acreditación local sin backend en MVP. Verificación criptográfica W3C VC + Open Badge 3.0 disponible en v4.
          </p>
          <div className="text-[10px] font-mono text-muted-foreground pt-1">
            reforma·ud · CC BY-SA 4.0
          </div>
        </footer>
      </article>

      {/* Acciones (no-print) */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center no-print">
        <Button onClick={() => window.print()} className="gap-1.5">
          <Printer className="h-3.5 w-3.5" /> Descargar PDF
        </Button>
        <Button asChild variant="outline">
          <Link href="/mision">Continuar mi ruta</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={paper.href}>Releer el paper</Link>
        </Button>
      </div>
    </div>
  );
}

/* ============================================================
 * MetricBox
 * ============================================================ */

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-2.5">
      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-bold">{value}</div>
    </div>
  );
}

/* ============================================================
 * NotEarnedView
 * ============================================================ */

function NotEarnedView({ paperId, mission }: { paperId: string; mission: ReturnType<typeof calcMission> }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 md:px-8 text-center space-y-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
        <AlertCircle className="h-7 w-7 text-amber-600 dark:text-amber-400" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Aún no has ganado este CCA</h1>
      <p className="text-muted-foreground">
        Para emitir tu Constancia de Comprensión Acreditada de M{String(mission.number).padStart(2, '0')} debes completar
        toda la misión: leer todas las secciones y verificar las preguntas de comprensión.
      </p>
      <Card className="text-left max-w-md mx-auto">
        <CardContent className="p-4 space-y-2">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tu progreso</div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${mission.progress}%` }} />
            </div>
            <span className="text-xs font-mono">{mission.progress}%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {mission.sectionsRead}/{mission.sectionsTotal} secciones · {mission.questionsVerified}/{mission.questionsTotal} preguntas verificadas
          </div>
          <Button asChild size="sm" className="w-full mt-2 gap-1.5">
            <Link href={`/mision/${paperId}`}>
              <Trophy className="h-3.5 w-3.5" /> Continuar misión
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
