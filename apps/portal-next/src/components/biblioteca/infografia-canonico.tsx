'use client';

/**
 * InfografiaCanonico · v5.0p — réplica del patrón visual de
 * `infografia-acopio-creciverso-v2.html` adaptado al corpus M01-M12.
 *
 * Estructura (one-pager dashboard):
 *   1. Header con título + subtitle mono púrpura + meta a la derecha
 *   2. Stats hero (6 columnas): 12·6·74·125·35·5
 *   3. Tagline tagline (definición concisa con emphasis)
 *   4. Tesis card navy con ecuación gigante: ACU-004-25 → BUENAS PRÁCTICAS → DEPLOYMENT
 *   5. Stack 6 fases CRISP-DM con sus papers
 *   6. 2-col chart-boxes: actores → papers + cobertura por ruta Clark
 *   7. Tabla papers en orden de lectura sugerido
 *   8. CMT grid: stats del grafo
 *   9. Footer institucional
 *
 * Estilos en línea via JSX inline-style (no CSS-in-JS deps). Usa CSS
 * variables del theme para dark-mode automático.
 */

import { canonicPaper } from '#site/content';
import { Network, ExternalLink, ArrowRight, SplitSquareHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import { usePanesState } from '@/lib/panes-state';
import { useRightPanel, useConexionesSubTab } from '@/lib/ui-state';

// v5.0s · pregunta narrativa por paper (storytelling M01→M12).
// Source mental-model: M03=Estándares (business), M08=Framework (modeling),
// M09-M11=Data Prep, M12=Evaluation (5 escenarios + deliberación), Deployment=∅.
// El badge M## queda como único locator visible (sin título) por instrucción.
const PAPER_QUESTIONS: Record<string, string> = {
  m01: '¿Qué se nos pide hacer y por qué? El mandato.',
  m02: '¿Cómo otras universidades saltaron de N1 a N4?',
  m03: '¿Con qué estándares globales nos alineamos?',
  m04: '¿Qué necesita realmente cada actor UDFJC?',
  m05: '¿Qué hacen las 21 IES líderes mundiales?',
  m06: '¿Cómo modelamos el crédito académico CCA?',
  m07: '¿Qué prácticas concretas activan el ciclo?',
  m08: '¿Con qué framework medimos el progreso?',
  m09: '¿Cómo presupuestamos bajo NICSP pública?',
  m10: '¿Cuánto cuesta cada actividad académica?',
  m11: '¿Qué dice la realidad de los datos MEN?',
  m12: '¿Cuáles son los 5 escenarios para deliberación comunitaria?',
};

// v5.0s · 5 columnas (Data Understanding + Preparation se fusionan visualmente).
// Override eliminado: ahora derivamos de crispPhase del source (.mdx alineados).
type KanbanSlot = Readonly<{
  key: string;
  label: string;
  emoji: string;
  color: string;
  phases: readonly string[]; // crispPhase values mapeadas a esta columna
  emptyHint?: string;
}>;

const KANBAN_COLUMNS: readonly KanbanSlot[] = [
  { key: 'business', label: 'Business Understanding', emoji: '🎯', color: '#059669',
    phases: ['business'] },
  { key: 'data', label: 'Data Understanding + Preparation', emoji: '🔍', color: '#0284c7',
    phases: ['data-understanding', 'data-prep'] },
  { key: 'modeling', label: 'Modeling', emoji: '🏗️', color: '#d97706',
    phases: ['modeling'] },
  { key: 'evaluation', label: 'Evaluation', emoji: '📊', color: '#ea580c',
    phases: ['evaluation'] },
  { key: 'deployment', label: 'Deployment', emoji: '🚀', color: '#0f172a',
    phases: ['deployment'], emptyHint: 'Pendiente · aún sin acuerdos comunitarios' },
];

export function InfografiaCanonico() {
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);
  const panesState = usePanesState();
  const { setTab } = useRightPanel();
  const [, setSubTab] = useConexionesSubTab();

  // v5.0q · CTA grafo activa el right panel · sub-tab Grafo (en lugar de navegar)
  const openGrafoInRightPanel = useCallback(() => {
    setTab('conexiones');
    setSubTab('grafo');
  }, [setTab, setSubTab]);

  // v5.0s · 5 columnas derivadas de crispPhase (source aligned).
  // Data Understanding + Data Preparation se fusionan en una sola columna.
  const phases = KANBAN_COLUMNS.map((slot) => ({
    ...slot,
    papers: papers.filter((p) => slot.phases.includes(p.crispPhase)),
  }));

  // Tabla actores · papers prioritarios + concepto-puente al glosario
  // v5.0s · alineado con M03=Estándares (OECD/CONPES), M08=Framework (BSC-s/RBM-GAC)
  const actores = [
    { rol: '🎓 Estudiante / Egresado', q: '¿Cómo recupero soberanía cognitiva?', papers: ['m02', 'm04', 'm06'], puente: 'Soberanía cognitiva · JTBD' },
    { rol: '🎨 Docente Diseñador', q: '¿Cómo diseño bajo modelo CCA?', papers: ['m06', 'm03', 'm07'], puente: 'CCA · UDL · CDIO' },
    { rol: '🔬 Docente Investigador', q: '¿Cómo activo el ciclo Pasteur?', papers: ['m02', 'm07', 'm05'], puente: 'Pasteur · 5 vías Clark' },
    { rol: '🏛️ Director / Decanatura', q: '¿Cómo aterriza la gobernanza?', papers: ['m01', 'm08', 'm09'], puente: 'ACU-004-25 · BSC-s · RBM-GAC' },
    { rol: '📊 Veedor / Auditor', q: '¿Cómo se cuestea y auditea?', papers: ['m10', 'm11', 'm09'], puente: 'TDABC · NICSP · Veeduría' },
    { rol: '🚀 Diseñador política', q: '¿Cómo se despliega en 8 años?', papers: ['m12', 'm01', 'm03'], puente: 'PIIOM · CONPES 4069 · OECD' },
  ];

  return (
    <div className="infografia-root">
      <style>{INFOGRAFIA_CSS}</style>

      {/* HEADER */}
      <div className="hdr">
        <div>
          <h1>Inv. Buenas Prácticas · Reforma UDFJC</h1>
          <div className="sub">
            12_investigaciones · 5_fases_CRISP-DM · sustrato_teórico · ACU-004-25 vinculante
          </div>
        </div>
        <div className="hdr-meta">
          reforma·ud · v1.0
          <br />
          CSU 04/2025 · CC BY-SA 4.0
          <br />
          12 papers · 74 conceptos · 125 aristas
        </div>
      </div>

      {/* STATS HERO */}
      <div className="stats-hero">
        <div className="sh"><span className="sh-n">12</span><span className="sh-l">papers M01-M12</span></div>
        <div className="sh"><span className="sh-n">5</span><span className="sh-l">fases CRISP-DM</span></div>
        <div className="sh"><span className="sh-n">74</span><span className="sh-l">conceptos glosario</span></div>
        <div className="sh"><span className="sh-n">125</span><span className="sh-l">aristas grafo</span></div>
        <div className="sh"><span className="sh-n">35</span><span className="sh-l">refs APA</span></div>
        <div className="sh"><span className="sh-n">5</span><span className="sh-l">rutas Clark R1-R5</span></div>
      </div>

      {/* TAGLINE · narrativa storytelling */}
      <div className="tagline">
        La <strong>Reforma UDFJC</strong> es un <strong>salto cuántico</strong> de la universidad <em>actual</em> (N1 frágil)
        hacia la <strong>universidad que opera buenas prácticas globales</strong> (N4 transformativa).
        Para que el salto sea <strong>posible y verificable</strong>, hace falta responder
        <strong> 12 preguntas</strong> en cadena. Cada paper M## resuelve UNA pregunta.
        En conjunto producen el <strong>diagnóstico + framework + dataset</strong> para
        construir <strong>prospectiva por escenarios</strong> (M12) y operar la reforma con
        <strong> rigor metodológico CRISP-DM</strong>.
      </div>

      {/* TESIS CARD · narrativa de 3 actos */}
      <div className="tesis">
        <div className="tesis-eq">
          DIAGNÓSTICO <span className="arrow">→</span> EVIDENCIA GLOBAL <span className="arrow">→</span> PROSPECTIVA OPERATIVA
        </div>
        <div className="tesis-sub">
          M01-M03 dan <strong style={{ color: '#fcd34d' }}>mandato + ciclo + estándares globales</strong> (qué resolver y cómo medir).
          M04-M07 + M09-M11 traen <strong style={{ color: '#fcd34d' }}>la evidencia y datos de IES líderes</strong> (JTBD, 21 IES, CCA, BPAs, NICSP, TDABC, datasets MEN).
          M08 ensambla el <strong style={{ color: '#fcd34d' }}>framework de monitoreo BSC-S + RBM-GAC</strong>.
          M12 plantea <strong style={{ color: '#fcd34d' }}>5 escenarios prospectivos para deliberación comunitaria</strong>.
          Deployment queda abierto · pendiente de acuerdos.
        </div>
      </div>

      {/* SECTION: 5 FASES CRISP-DM (Data Understanding + Preparation merged) */}
      <h2>Las 5 Fases CRISP-DM · 12 Papers Encadenados</h2>
      <div className="si">// Data Understanding + Preparation se fusionan (mismo dataset MEN/SNIES + mismo flujo ETL); Deployment queda pendiente · sin acuerdos comunitarios aún</div>
      <div className="stack">
        {phases.map((phase) => (
          <div key={phase.key} className="stk" style={{ borderLeft: `3px solid ${phase.color}` }}>
            <div className="stk-icon">{phase.emoji}</div>
            <div className="stk-name">{phase.label}</div>
            <div className="stk-tech">
              {phase.papers.length === 0
                ? '— sin papers —'
                : phase.papers.map((p) => `M${String(p.number).padStart(2, '0')}`).join(' · ')}
            </div>
            <div className="stk-bpa">
              {phase.papers.length === 0 && phase.emptyHint ? (
                <span className="stk-empty">{phase.emptyHint}</span>
              ) : (
                phase.papers.map((p) => (
                  <Link key={p.id} href={p.href} className="stk-link" title={p.title}>
                    M{String(p.number).padStart(2, '0')} · {PAPER_QUESTIONS[p.id] ?? p.title.slice(0, 36)}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2-COL CHART BOXES */}
      <h2>Mapa de Actores · qué leer según tu rol</h2>
      <div className="charts-2col">
        <div className="chart-box">
          <div className="chart-title">6 Roles Institucionales · Pregunta Clave + Papers Prioritarios</div>
          <div className="chart-sub">// jobs-to-be-done por rol UDFJC + concepto-puente al glosario</div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Rol</th>
                <th>Pregunta clave</th>
                <th>Papers</th>
              </tr>
            </thead>
            <tbody>
              {actores.map((a) => (
                <tr key={a.rol}>
                  <td>{a.rol}</td>
                  <td>{a.q}</td>
                  <td className="mono">
                    {a.papers.map((pid) => (
                      <Link key={pid} href={`/canonico/${pid}`} className="paper-pill">
                        {pid.toUpperCase()}
                      </Link>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="chart-foot">Cada rol enfoca 3 papers como entrada · concepto-puente del glosario alinea expectativas</div>
        </div>

        <div className="chart-box">
          <div className="chart-title">Cobertura por Ruta Clark · 5 dimensiones de la universidad emprendedora</div>
          <div className="chart-sub">// Burton Clark 1998 — 5 vías de transformación universitaria</div>
          <div className="ruta-grid">
            <RutaRow label="R1 · Gobernanza fortalecida" ids={papers.filter((p) => p.rutaClark.includes('R1')).map((p) => p.id)} color="#059669" />
            <RutaRow label="R2 · Periferia de desarrollo" ids={papers.filter((p) => p.rutaClark.includes('R2')).map((p) => p.id)} color="#7c3aed" />
            <RutaRow label="R3 · Diversificación de fondeo" ids={papers.filter((p) => p.rutaClark.includes('R3')).map((p) => p.id)} color="#0284c7" />
            <RutaRow label="R4 · Misión académica integrada" ids={papers.filter((p) => p.rutaClark.includes('R4')).map((p) => p.id)} color="#d97706" />
            <RutaRow label="R5 · Cultura emprendedora" ids={papers.filter((p) => p.rutaClark.includes('R5')).map((p) => p.id)} color="#ea580c" />
          </div>
          <div className="chart-foot">12 papers cubren las 5 rutas · M07 (BPAs) y M12 (Hoja ruta) son meta-rutas</div>
        </div>
      </div>

      {/* KANBAN · 5 columnas (Data merged) · cada card = M## + pregunta + 2 botones */}
      <h2>Las 12 Investigaciones · Kanban Narrativo</h2>
      <div className="si">
        // cada card es <strong>M## + pregunta</strong> · hover muestra
        <strong style={{ color: 'var(--pur)', marginLeft: '0.4rem' }}>Ir directo</strong> (reemplaza tab actual) ·
        <strong style={{ color: 'var(--pur)', marginLeft: '0.4rem' }}>Ventana derecha</strong> (split pane B preserva contexto)
      </div>
      <div className="kanban">
        {phases.map((phase) => (
          <div key={phase.key} className="kanban-col" style={{ borderTopColor: phase.color }}>
            <div className="kanban-col-hdr" style={{ background: phase.color }}>
              <span className="kanban-col-emoji">{phase.emoji}</span>
              <span className="kanban-col-label">{phase.label}</span>
              <span className="kanban-col-count">· {phase.papers.length}</span>
            </div>
            <div className="kanban-cards">
              {phase.papers.length === 0 && phase.emptyHint && (
                <div className="kanban-empty">{phase.emptyHint}</div>
              )}
              {phase.papers.map((p) => (
                <KanbanCard
                  key={p.id}
                  paper={p}
                  question={PAPER_QUESTIONS[p.id] ?? p.description.slice(0, 50)}
                  color={phase.color}
                  onSplitRight={() => panesState.openInNextPane(p.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CMT GRID */}
      <h2>Métricas del Corpus · Grafo Semántico</h2>
      <div className="cmt-grid">
        <div className="cmt"><span className="cmt-n">107</span><span className="cmt-l">nodos en grafo</span></div>
        <div className="cmt"><span className="cmt-n">125</span><span className="cmt-l">aristas tipadas</span></div>
        <div className="cmt"><span className="cmt-n">45</span><span className="cmt-l">paper→concepto</span></div>
        <div className="cmt"><span className="cmt-n">27</span><span className="cmt-l">concepto→concepto</span></div>
      </div>
      <div className="kpi-mini" style={{ marginTop: '0.4rem' }}>
        <div className="kpi"><strong>Hub central:</strong> M01 (11 conexiones)</div>
        <div className="kpi"><strong>Concepto top:</strong> funciones-misionales (8)</div>
        <div className="kpi"><strong>Frame teórico:</strong> Pasteur Quadrant + Quintuple Helix</div>
        <div className="kpi"><strong>Cobertura BPA:</strong> Aalto · Twente · MIT · Stanford</div>
      </div>

      {/* CTA · v5.0q activa right panel sub-tab Grafo (no navega afuera) */}
      <div className="cta">
        <button type="button" onClick={openGrafoInRightPanel} className="cta-btn">
          <Network style={{ width: 16, height: 16 }} />
          Activar Grafo semántico en panel derecho
        </button>
        <Link href="/canonico/grafo" className="cta-btn cta-btn-secondary" title="Vista full-screen del grafo (otra pestaña conceptual)">
          <ExternalLink style={{ width: 12, height: 12 }} />
          Vista completa
        </Link>
      </div>

      {/* FOOTER */}
      <div className="ft">
        <div>reforma·ud · Acuerdo CSU 04/2025 · Universidad Distrital Francisco José de Caldas</div>
        <div className="ft-r">CC BY-SA 4.0 · 2026</div>
      </div>
    </div>
  );
}

/**
 * KanbanCard · v5.0q — card de paper en el Kanban con dos botones.
 * Hover revela "Ir directo" (Link normal) y "Ventana derecha" (split pane B).
 */
function KanbanCard({
  paper, question, color, onSplitRight,
}: Readonly<{
  paper: { id: string; title: string; href: string; number: number };
  question: string;
  color: string;
  onSplitRight: () => void;
}>) {
  // v5.0r · card minimal: solo M## + pregunta. El título físico se omite porque
  // el badge M## + la pregunta narrativa son suficientes (instrucción explícita).
  return (
    <div className="kanban-card" style={{ borderLeftColor: color }}>
      <div className="kanban-card-hdr">
        <span className="kanban-card-id" style={{ color }}>
          M{String(paper.number).padStart(2, '0')}
        </span>
      </div>
      <div className="kanban-card-q" title={question}>
        <strong>?</strong> {question}
      </div>
      <div className="kanban-card-actions">
        <Link href={paper.href} className="kanban-btn kanban-btn-primary">
          <ArrowRight style={{ width: 11, height: 11 }} />
          Ir directo
        </Link>
        <button type="button" onClick={onSplitRight} className="kanban-btn kanban-btn-secondary" title="Abrir en ventana derecha (pane B)">
          <SplitSquareHorizontal style={{ width: 11, height: 11 }} />
          Ventana derecha
        </button>
      </div>
    </div>
  );
}

function RutaRow({ label, ids, color }: Readonly<{ label: string; ids: string[]; color: string }>) {
  return (
    <div className="ruta-row">
      <div className="ruta-label" style={{ color }}>{label}</div>
      <div className="ruta-papers">
        {ids.length === 0 ? (
          <span className="muted" style={{ fontSize: '7pt' }}>—</span>
        ) : (
          ids.map((id) => (
            <Link key={id} href={`/canonico/${id}`} className="paper-pill" style={{ borderColor: color, color }}>
              {id.toUpperCase()}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

const INFOGRAFIA_CSS = `
.infografia-root {
  --navy: #0f172a; --navy-l: #1e3a5f;
  --pur: #7c3aed; --pur-d: #6d28d9; --pur-l: #a78bfa; --pur-bg: #f5f3ff;
  --gld-l: #fcd34d;
  --bg-card: #fff;
  --text-card: #334155;
  --muted-card: #64748b;
  --border-card: rgba(0,0,0,0.08);
  --bg-soft: #f8fafc;
  background: #fff;
  color: var(--text-card);
  padding: 1.5rem 1.75rem;
  border-radius: 12px;
  border: 1px solid var(--border-card);
  font-family: Calibri, Carlito, Arial, sans-serif;
  font-size: 9.5pt;
  line-height: 1.42;
}
.dark .infografia-root {
  --bg-card: #0f172a;
  --text-card: #e2e8f0;
  --muted-card: #94a3b8;
  --border-card: rgba(255,255,255,0.1);
  --bg-soft: #1e293b;
  --pur-bg: rgba(124,58,237,0.1);
  background: #0f172a;
}
.infografia-root h1 { font-size: 20pt; font-weight: 700; color: var(--text-card); line-height: 1.08; margin: 0; }
.infografia-root h2 { font-size: 11pt; font-weight: 700; color: var(--text-card); margin: 0.9rem 0 0.4rem; border-bottom: 2px solid var(--pur); padding-bottom: 0.2rem; }
.infografia-root .mono { font-family: 'Courier New', Courier, monospace; }
.infografia-root .muted { color: var(--muted-card); }

.infografia-root .hdr { display: grid; grid-template-columns: 1fr auto; gap: 1rem; align-items: end; margin-bottom: 0.5rem; padding-bottom: 0.6rem; border-bottom: 3px solid var(--pur); }
.infografia-root .hdr .sub { font-size: 7.5pt; color: var(--pur); font-weight: 700; font-family: 'Courier New', monospace; margin-top: 0.2rem; letter-spacing: 0.01em; }
.infografia-root .hdr-meta { text-align: right; font-size: 7pt; color: var(--muted-card); line-height: 1.7; font-family: 'Courier New', monospace; }

.infografia-root .stats-hero { display: grid; grid-template-columns: repeat(6,1fr); background: linear-gradient(135deg, var(--pur-d) 0%, var(--navy) 100%); border-radius: 9px; overflow: hidden; margin: 0.6rem 0 0.5rem; }
.infografia-root .sh { padding: 0.6rem 0.5rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
.infografia-root .sh:last-child { border-right: none; }
.infografia-root .sh-n { font-size: 14pt; font-weight: 700; color: var(--pur-l); display: block; font-family: 'Courier New', monospace; }
.infografia-root .sh-l { font-size: 6.5pt; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.1rem; display: block; }

.infografia-root .tagline { font-size: 9pt; color: var(--text-card); line-height: 1.5; background: var(--pur-bg); padding: 0.6rem 0.85rem; border-left: 3.5px solid var(--pur); border-radius: 0 6px 6px 0; margin: 0.5rem 0 0.4rem; }
.infografia-root .tagline strong { color: var(--pur-d); font-weight: 700; }
.dark .infografia-root .tagline strong { color: var(--pur-l); }

.infografia-root .tesis { background: var(--navy); border-radius: 10px; padding: 0.85rem 1.1rem; margin: 0.5rem 0; color: #fff; }
.infografia-root .tesis-eq { font-family: Georgia, serif; font-size: 12pt; font-weight: 700; color: var(--pur-l); text-align: center; line-height: 1.3; margin-bottom: 0.3rem; }
.infografia-root .tesis-eq .arrow { color: var(--gld-l); padding: 0 0.3rem; }
.infografia-root .tesis-sub { font-size: 8pt; color: rgba(255,255,255,0.78); text-align: center; font-style: italic; }

.infografia-root .si { font-size: 8pt; color: var(--muted-card); margin-bottom: 0.4rem; }

.infografia-root .charts-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin: 0.4rem 0; }
@media (max-width: 900px) { .infografia-root .charts-2col { grid-template-columns: 1fr; } }
.infografia-root .chart-box { border: 1px solid var(--border-card); border-radius: 8px; padding: 0.7rem 0.85rem; background: var(--bg-card); }
.infografia-root .chart-title { font-size: 8.5pt; font-weight: 700; color: var(--text-card); margin-bottom: 0.35rem; padding-bottom: 0.25rem; border-bottom: 1.2px solid var(--bg-soft); }
.infografia-root .chart-sub { font-size: 7pt; color: var(--muted-card); font-family: 'Courier New', monospace; margin: -0.1rem 0 0.35rem; }
.infografia-root .chart-foot { font-size: 7pt; color: var(--muted-card); margin-top: 0.4rem; padding-top: 0.3rem; border-top: 1px dashed var(--border-card); }

.infografia-root table.tbl { width: 100%; border-collapse: collapse; font-size: 8pt; }
.infografia-root table.tbl th { background: var(--navy); color: white; font-weight: 700; padding: 0.35rem 0.5rem; text-align: left; font-size: 7.5pt; }
.infografia-root table.tbl td { padding: 0.32rem 0.5rem; border-bottom: 1px solid var(--border-card); vertical-align: top; }
.infografia-root table.tbl tr:last-child td { border-bottom: none; }
.infografia-root table.tbl tr:nth-child(even) { background: var(--bg-soft); }

.infografia-root .stack { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; margin: 0.4rem 0; }
@media (max-width: 900px) { .infografia-root .stack { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .infografia-root .stack { grid-template-columns: 1fr; } }
.infografia-root .stk { border-radius: 7px; padding: 0.6rem 0.7rem; border: 1px solid var(--border-card); background: var(--bg-card); }
.infografia-root .stk-icon { font-size: 16pt; line-height: 1; }
.infografia-root .stk-name { font-size: 9pt; font-weight: 700; color: var(--text-card); margin: 0.3rem 0 0.15rem; }
.infografia-root .stk-tech { font-size: 7pt; color: var(--muted-card); font-family: 'Courier New', monospace; margin-bottom: 0.3rem; }
.infografia-root .stk-bpa { font-size: 7.5pt; color: var(--pur-d); display: flex; flex-direction: column; gap: 0.15rem; }
.dark .infografia-root .stk-bpa { color: var(--pur-l); }
.infografia-root .stk-link { color: inherit; text-decoration: none; line-height: 1.35; }
.infografia-root .stk-link:hover { text-decoration: underline; }
/* v5.0r · color del border-left ahora viene inline desde phase.color */
.infografia-root .stk-empty { font-style: italic; color: var(--muted-card); font-size: 7pt; }

.infografia-root .paper-pill { display: inline-block; font-family: 'Courier New', monospace; font-size: 7pt; font-weight: 700; padding: 0.1rem 0.35rem; border: 1px solid var(--pur); color: var(--pur-d); border-radius: 4px; margin: 0 0.15rem 0.15rem 0; text-decoration: none; }
.infografia-root .paper-pill:hover { background: var(--pur); color: white; }
.dark .infografia-root .paper-pill { color: var(--pur-l); }
.dark .infografia-root .paper-pill:hover { background: var(--pur); color: white; }
.infografia-root .paper-id { color: var(--pur-d); font-weight: 700; text-decoration: none; }
.dark .infografia-root .paper-id { color: var(--pur-l); }
.infografia-root .paper-id:hover { text-decoration: underline; }
.infografia-root .phase-pill { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }

.infografia-root .ruta-grid { display: flex; flex-direction: column; gap: 0.35rem; }
.infografia-root .ruta-row { display: grid; grid-template-columns: 180px 1fr; gap: 0.5rem; align-items: center; }
.infografia-root .ruta-label { font-size: 8pt; font-weight: 700; }
.infografia-root .ruta-papers { display: flex; flex-wrap: wrap; gap: 0.15rem; }

.infografia-root .cmt-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.5rem; margin: 0.3rem 0; }
.infografia-root .cmt { background: var(--bg-card); border: 1px solid var(--border-card); border-top: 3px solid var(--pur); border-radius: 6px; padding: 0.55rem 0.6rem; text-align: center; }
.infografia-root .cmt-n { font-size: 14pt; font-weight: 700; font-family: 'Courier New', monospace; color: var(--pur-d); display: block; line-height: 1; }
.dark .infografia-root .cmt-n { color: var(--pur-l); }
.infografia-root .cmt-l { font-size: 6.2pt; color: var(--muted-card); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.22rem; display: block; }

.infografia-root .kpi-mini { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.45rem; }
@media (min-width: 900px) { .infografia-root .kpi-mini { grid-template-columns: repeat(4,1fr); } }
.infografia-root .kpi { background: var(--bg-soft); border-radius: 6px; padding: 0.5rem 0.55rem; border: 1px solid var(--border-card); font-size: 7.5pt; line-height: 1.5; }
.infografia-root .kpi strong { color: var(--pur-d); }
.dark .infografia-root .kpi strong { color: var(--pur-l); }

.infografia-root .cta { margin: 0.75rem 0 0.4rem; text-align: center; display: flex; gap: 0.5rem; justify-content: center; align-items: center; flex-wrap: wrap; }
.infografia-root .cta-btn { display: inline-flex; align-items: center; gap: 0.45rem; background: var(--pur); color: #fff; padding: 0.55rem 1.1rem; border-radius: 7px; font-size: 9pt; font-weight: 700; text-decoration: none; border: none; cursor: pointer; font-family: inherit; }
.infografia-root .cta-btn:hover { background: var(--pur-d); }
.infografia-root .cta-btn-secondary { background: transparent; color: var(--pur-d); border: 1px solid var(--pur); }
.infografia-root .cta-btn-secondary:hover { background: var(--pur-bg); }
.dark .infografia-root .cta-btn-secondary { color: var(--pur-l); }
.dark .infografia-root .cta-btn-secondary:hover { background: rgba(124,58,237,0.15); }

/* KANBAN · v5.0r · 5 columnas (Data Understanding + Preparation merged) · cards minimales */
.infografia-root .kanban {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0.4rem 0;
  align-items: start;
}
@media (max-width: 1100px) { .infografia-root .kanban { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 700px) { .infografia-root .kanban { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .infografia-root .kanban { grid-template-columns: 1fr; } }
.infografia-root .kanban-empty {
  padding: 0.6rem 0.5rem;
  font-size: 7pt;
  color: var(--muted-card);
  font-style: italic;
  text-align: center;
  border: 1px dashed var(--border-card);
  border-radius: 5px;
  background: var(--bg-soft);
}
.infografia-root .kanban-col {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-top: 3px solid var(--pur);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.infografia-root .kanban-col-hdr {
  padding: 0.45rem 0.55rem;
  color: white;
  font-weight: 700;
  font-size: 7.5pt;
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}
.infografia-root .kanban-col-emoji { font-size: 11pt; line-height: 1; }
.infografia-root .kanban-col-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.infografia-root .kanban-col-count { font-family: 'Courier New', monospace; opacity: 0.85; font-size: 7pt; }
.infografia-root .kanban-cards {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.45rem;
  background: var(--bg-soft);
  flex: 1;
  min-height: 60px;
}
.infografia-root .kanban-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-left: 3px solid var(--pur);
  border-radius: 5px;
  padding: 0.45rem 0.55rem;
  font-size: 7.5pt;
  position: relative;
  transition: box-shadow 0.15s, transform 0.15s;
}
.infografia-root .kanban-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-1px);
}
.dark .infografia-root .kanban-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.infografia-root .kanban-card-hdr {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
}
.infografia-root .kanban-card-id {
  font-family: 'Courier New', monospace;
  font-weight: 800;
  font-size: 8.5pt;
  flex-shrink: 0;
}
.infografia-root .kanban-card-q {
  font-size: 7pt;
  color: var(--muted-card);
  line-height: 1.45;
  margin-bottom: 0.4rem;
  font-style: italic;
}
.infografia-root .kanban-card-q strong {
  color: var(--pur-d);
  font-style: normal;
  font-size: 8pt;
  margin-right: 0.15rem;
}
.dark .infografia-root .kanban-card-q strong { color: var(--pur-l); }
.infografia-root .kanban-card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  opacity: 0;
  max-height: 0;
  transition: opacity 0.18s, max-height 0.18s;
  overflow: hidden;
}
.infografia-root .kanban-card:hover .kanban-card-actions,
.infografia-root .kanban-card:focus-within .kanban-card-actions {
  opacity: 1;
  max-height: 40px;
}
.infografia-root .kanban-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.25rem 0.35rem;
  border-radius: 4px;
  font-size: 6.8pt;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.infografia-root .kanban-btn-primary {
  background: var(--pur);
  color: white;
}
.infografia-root .kanban-btn-primary:hover { background: var(--pur-d); }
.infografia-root .kanban-btn-secondary {
  background: transparent;
  color: var(--pur-d);
  border: 1px solid var(--pur);
}
.infografia-root .kanban-btn-secondary:hover { background: var(--pur-bg); }
.dark .infografia-root .kanban-btn-secondary { color: var(--pur-l); }
.dark .infografia-root .kanban-btn-secondary:hover { background: rgba(124,58,237,0.15); }


.infografia-root .ft { margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1.5px solid var(--border-card); display: grid; grid-template-columns: 1fr auto; font-size: 7pt; color: var(--muted-card); }
.infografia-root .ft-r { text-align: right; font-family: 'Courier New', monospace; }
`;
