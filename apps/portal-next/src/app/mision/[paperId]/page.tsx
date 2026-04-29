'use client';

import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { notFound } from 'next/navigation';
import { ChevronLeft, BookMarked, CheckCircle2, Circle, Trophy, Sparkles, Lock, Lightbulb, AlertCircle, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canonicPaper } from '#site/content';
import { isPublished } from '@/lib/show-drafts';
import { COMPREHENSION_REGISTRY, type ComprehensionSection } from '@/lib/comprehension';
import { getReadingState, markSection, type ReadingState, type SectionStatus } from '@/lib/reading-state';
import { useActiveProfile, ROLES } from '@/lib/ui-state';
import { calcAllMissions, calcMission, type MissionState } from '@/lib/mission-state';
import { SectionGate } from '@/components/biblioteca/section-gate';
import { cn } from '@/lib/utils';

export default function MissionDetailPage({ params }: { params: Promise<{ paperId: string }> }) {
  const { paperId } = use(params);
  const paper = canonicPaper.find((p) => p.id === paperId);
  if (!paper || !isPublished(paper)) notFound();

  const { role, name, meta } = useActiveProfile();
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

  // Resolver el estado de TODAS las misiones para saber si esta está locked
  const allMissions = useMemo(() => calcAllMissions(readingState, role), [readingState, role]);
  const mission: MissionState = useMemo(
    () => allMissions.find((m) => m.paperId === paperId) ?? calcMission(paperId, readingState, false),
    [allMissions, paperId, readingState],
  );
  const compr = COMPREHENSION_REGISTRY[paperId];
  const isDirector = role === 'docente-director';
  const locked = mission.status === 'locked';

  if (locked) {
    const blockerIdx = allMissions.findIndex((m) => m.paperId === paperId);
    const blocker = blockerIdx > 0 ? allMissions[blockerIdx - 1] : null;
    return <LockedView paperId={paperId} mission={mission} blocker={blocker} />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 space-y-6">
      {/* Top nav */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          Inicio
        </Link>
        <span>/</span>
        <Link href="/mision" className="hover:text-foreground">Misión</Link>
        <span>/</span>
        <span className="font-mono">M{String(mission.number).padStart(2, '0')}</span>
      </div>

      {/* Hero */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge className="font-mono">M{String(mission.number).padStart(2, '0')}</Badge>
          <Badge variant="outline" className="capitalize">
            {mission.status === 'completed' ? '✓ Misión completada' :
             mission.status === 'in-progress' ? '⚡ En curso' : '🟢 Disponible'}
          </Badge>
          {mission.hasCCA && (
            <Badge variant="outline" className="gap-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-3 w-3" /> CCA ganado
            </Badge>
          )}
          <span className="text-muted-foreground">· {meta.emoji} {name}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{paper.title}</h1>
        <p className="text-muted-foreground max-w-3xl">{paper.description}</p>

        {/* Progress big */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', mission.status === 'completed' ? 'bg-emerald-500' : 'bg-primary')}
              style={{ width: `${mission.progress}%` }}
            />
          </div>
          <span className="text-sm font-mono tabular-nums w-12 text-right">{mission.progress}%</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{mission.sectionsRead}/{mission.sectionsTotal || '–'} secciones leídas</span>
          {mission.questionsTotal > 0 && (
            <span>{mission.questionsVerified}/{mission.questionsTotal} preguntas verificadas</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm" className="gap-1.5">
            <Link href={paper.href}>
              <BookMarked className="h-3.5 w-3.5" /> Leer paper completo
            </Link>
          </Button>
          {mission.hasCCA && (
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href={`/cca/${role}/${paperId}`}>
                <Trophy className="h-3.5 w-3.5" /> Ver mi CCA
              </Link>
            </Button>
          )}
        </div>
      </header>

      {/* Aviso modo misión */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-3 flex items-start gap-2">
          <Target className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs">
            <p className="font-medium text-amber-900 dark:text-amber-200">Estás en modo misión</p>
            <p className="text-muted-foreground mt-0.5">
              El AI te dará <strong>pistas</strong> orientadoras, no respuestas directas. Lee el paper, responde la pregunta de comprensión, gana tu CCA.
              Para conversación libre, usa el panel derecho con <em>Modo libre</em>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lista de secciones */}
      {compr ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Secciones de la misión</h2>
          <ol className="space-y-2">
            {compr.sections.map((sec, idx) => (
              <SectionRow
                key={sec.anchor}
                section={sec}
                index={idx}
                paperId={paperId}
                paperHref={paper.href}
                totalSections={compr.sections.length}
                readingState={readingState}
              />
            ))}
          </ol>
        </section>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            <AlertCircle className="h-5 w-5 mx-auto mb-2 opacity-60" />
            Esta misión aún no tiene preguntas de comprensión configuradas. <br />
            Lee el paper completo y vuelve para reclamar tu CCA cuando esté disponible.
          </CardContent>
        </Card>
      )}

      {/* Footer: rol explainer */}
      <RoleExplainer role={role} />
    </div>
  );
}

/* ============================================================
 * SectionRow — fila de UNA sección de la misión
 * ============================================================ */

function SectionRow({
  section,
  index,
  paperId,
  paperHref,
  totalSections,
  readingState,
}: {
  section: ComprehensionSection;
  index: number;
  paperId: string;
  paperHref: string;
  totalSections: number;
  readingState: ReadingState | null;
}) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const status: SectionStatus = readingState?.docs[paperId]?.sections[section.anchor] ?? 'unread';
  const isVerified = status === 'verified';
  const isRead = status === 'completed' || isVerified;
  const hasQuestion = !!section.question;

  function handleMarkRead() {
    markSection(paperId, section.anchor, 'completed', totalSections);
  }

  function handleQuestionComplete(outcome: 'correct' | 'incorrect' | 'skipped') {
    if (outcome === 'correct') {
      markSection(paperId, section.anchor, 'verified', totalSections);
    } else {
      markSection(paperId, section.anchor, 'completed', totalSections);
    }
    setShowQuestion(false);
  }

  return (
    <li>
      <Card className={cn('transition-colors', isVerified && 'border-emerald-500/30 bg-emerald-500/5')}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            {/* Status icon */}
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5 text-xs font-bold',
              isVerified ? 'bg-emerald-500 text-white' : isRead ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}>
              {isVerified ? <CheckCircle2 className="h-4 w-4" /> : isRead ? <Circle className="h-4 w-4 fill-current" /> : index + 1}
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold">{section.heading}</h3>
                {isVerified && <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Verificada ✓</Badge>}
                {!isVerified && isRead && <Badge variant="outline" className="text-[9px]">Leída</Badge>}
                {hasQuestion && !isVerified && <Badge variant="outline" className="text-[9px]">Tiene pregunta</Badge>}
              </div>
              {section.summary && (
                <p className="text-xs text-muted-foreground mt-1">{section.summary}</p>
              )}

              {/* Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline" className="gap-1.5 h-8 text-xs">
                  <Link href={`${paperHref}#${section.anchor}`}>
                    <BookMarked className="h-3 w-3" /> Leer sección
                  </Link>
                </Button>
                {!isRead && (
                  <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-xs" onClick={handleMarkRead}>
                    Marcar leída
                  </Button>
                )}
                {hasQuestion && !isVerified && (
                  <Button size="sm" variant={isRead ? 'default' : 'secondary'} className="gap-1.5 h-8 text-xs" onClick={() => setShowQuestion((v) => !v)}>
                    <Sparkles className="h-3 w-3" />
                    {showQuestion ? 'Ocultar pregunta' : 'Responder pregunta'}
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-xs text-amber-600 dark:text-amber-400" onClick={() => setShowTip((v) => !v)}>
                  <Lightbulb className="h-3 w-3" />
                  {showTip ? 'Ocultar pista' : 'Pedir pista AI'}
                </Button>
              </div>

              {/* Pista AI inline */}
              {showTip && (
                <MissionTip section={section} />
              )}

              {/* Pregunta inline */}
              {showQuestion && section.question && (
                <div className="mt-3">
                  <SectionGate question={section.question} onComplete={handleQuestionComplete} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

/* ============================================================
 * MissionTip — pista AI (modo misión: pistas heurísticas, NO respuesta)
 * ============================================================ */

function MissionTip({ section }: { section: ComprehensionSection }) {
  const heuristicTips = useMemo(() => buildTipsFromSection(section), [section]);

  return (
    <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 space-y-2">
      <div className="flex items-center gap-2 text-xs font-medium text-amber-900 dark:text-amber-200">
        <Lightbulb className="h-3.5 w-3.5" />
        Pistas — modo misión
      </div>
      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
        {heuristicTips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      <p className="text-[10px] text-muted-foreground italic pt-1 border-t border-amber-500/20">
        💡 No te damos la respuesta directa. La meta es que la encuentres tú leyendo la sección y reflexionando.
      </p>
    </div>
  );
}

function buildTipsFromSection(section: ComprehensionSection): string[] {
  const tips: string[] = [];
  if (section.summary) {
    tips.push(`Concentrate en: "${section.summary}"`);
  }
  tips.push(`Lee con atención el encabezado "${section.heading}" y los párrafos inmediatamente posteriores — la idea clave suele estar en las primeras 2-3 frases.`);
  if (section.question) {
    const q = section.question;
    tips.push(`La pregunta busca distinguir entre ${q.options.length} opciones plausibles — pon atención a verbos y sustantivos específicos del texto.`);
    tips.push(`Una de las opciones repite palabras del texto pero las usa fuera de contexto. Cuidado con los distractores que "suenan bien".`);
    if (q.explain) {
      tips.push(`Hay un detalle que la sección explicita y que diferencia la respuesta correcta de las demás.`);
    }
  }
  tips.push(`Si no la sabes después de leer, marca como leída sin verificar — puedes regresar más tarde con la mente fresca.`);
  return tips;
}

/* ============================================================
 * LockedView — cuando esta misión aún no se ha desbloqueado
 * ============================================================ */

function LockedView({ paperId, mission, blocker }: { paperId: string; mission: MissionState; blocker: MissionState | null }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 text-center space-y-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Lock className="h-7 w-7 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Misión bloqueada</h1>
      <p className="text-muted-foreground">
        Para acceder a <span className="font-mono font-bold">M{String(mission.number).padStart(2, '0')} — {mission.title}</span>{' '}
        primero debes completar tu misión anterior.
      </p>
      {blocker && (
        <Card className="text-left max-w-md mx-auto">
          <CardContent className="p-4 space-y-2">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Misión a completar primero</div>
            <h3 className="text-base font-semibold">M{String(blocker.number).padStart(2, '0')} — {blocker.title}</h3>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${blocker.progress}%` }} />
              </div>
              <span className="text-xs font-mono">{blocker.progress}%</span>
            </div>
            <Button asChild size="sm" className="w-full mt-2">
              <Link href={`/mision/${blocker.paperId}`}>Continuar M{String(blocker.number).padStart(2, '0')}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center gap-2 pt-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/mision">Ver mi ruta completa</Link>
        </Button>
      </div>
    </div>
  );
}

/* ============================================================
 * RoleExplainer — recuerda al usuario su perspectiva por rol
 * ============================================================ */

function RoleExplainer({ role }: { role: string }) {
  const meta = ROLES.find((r) => r.id === role);
  if (!meta) return null;
  const lensByRole: Record<string, string> = {
    'estudiante':           'Como Estudiante Soberano, busca cómo este paper te ayuda a tomar decisiones sobre tu propio aprendizaje y trayectoria.',
    'docente-disenador':    'Como Docente Diseñador (Arquitecto CCA), identifica conceptos que puedan operacionalizarse en rúbricas, evidencias y constancias.',
    'docente-formador':     'Como Docente Formador (Active Learning), busca tácticas concretas para tu aula: dinámicas, intervenciones, evaluaciones formativas.',
    'docente-investigador': 'Como Docente Investigador (Pasteur Pleno), atiende los hallazgos empíricos, las brechas de evidencia y las preguntas abiertas.',
    'docente-emprendedor':  'Como Docente Emprendedor (Agente Territorial), busca implicaciones para extensión, contratos territoriales y articulación con sectores externos.',
    'docente-director':     'Como Director Estratégico, identifica los KPIs, las palancas de gestión y los riesgos que esta investigación implica.',
  };
  return (
    <Card className="bg-muted/30">
      <CardContent className="p-3 flex items-start gap-2">
        <span className="text-xl">{meta.emoji}</span>
        <div className="text-xs">
          <p className="font-medium">{meta.name}</p>
          <p className="text-muted-foreground mt-0.5">{lensByRole[role] ?? 'Lee desde tu perspectiva profesional.'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
