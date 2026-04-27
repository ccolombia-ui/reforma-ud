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
import { useRightPanel, useConexionesSubTab, useFocusedPane } from '@/lib/ui-state';

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
  const [, setFocused] = useFocusedPane();

  // v5.0q · CTA grafo activa el right panel · sub-tab Grafo (en lugar de navegar)
  const openGrafoInRightPanel = useCallback(() => {
    setTab('conexiones');
    setSubTab('grafo');
  }, [setTab, setSubTab]);

  // v5.0v · "Ventana derecha" abre el M## en pane B + transfiere foco a B.
  // Sin setFocused el right panel sigue mostrando el contexto de pane A
  // (Kanban infografía) en lugar del M## recién abierto.
  const openInRightPane = useCallback((paperId: string) => {
    panesState.openInNextPane(paperId);
    setFocused('b');
  }, [panesState, setFocused]);

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

      {/* TESIS CARD · 3 actos + narrativa de hallazgos por paper */}
      <div className="tesis">
        <div className="tesis-eq">
          DIAGNÓSTICO <span className="arrow">→</span> EVIDENCIA GLOBAL <span className="arrow">→</span> PROSPECTIVA OPERATIVA
        </div>
      </div>

      {/* HALLAZGOS · v5.0u · 12 párrafos independientes (uno por paper),
          verificados contra el body de cada .mdx. Pensados para principiantes. */}
      <h2>Qué encontró cada investigación</h2>
      <div className="si">// 12 hallazgos consolidados M01→M12 · cada uno aporta una pieza específica al diagnóstico, la evidencia o la prospectiva</div>
      <div className="hallazgos">
        <p className="hallazgo h-bu">
          <span className="h-id">M01</span>
          encontró un <strong>mandato vinculante triple</strong>: CONPES 4069/2021 (política nacional), PIIOM (Plan Integral Institucional Misional Operativo) y Acuerdo CSU 04/2025 obligan reorganización estatutaria — no ajustes cosméticos.
        </p>
        <p className="hallazgo h-bu">
          <span className="h-id">M02</span>
          identificó el <strong>ciclo virtuoso ΩMT</strong> como meta-telos de la universidad emprendedora-transformativa: 6 retroalimentaciones R1-R6 entre 3 vicerrectorías (Académica, Investigaciones, Extensión); el salto Sub-N1 → N4 se logra mediante CABAs (Comunidades Académicas de Base) activando las 5 vías de Clark. Casos referentes: Aalto, Twente, Stanford d.school, MIT, ECIU.
        </p>
        <p className="hallazgo h-bu">
          <span className="h-id">M03</span>
          mapeó <strong>12 estándares internacionales en 4 capas</strong> — aspiracional (OECD Learning Compass + UDL 3.0), epistemológica (Cuadrante Pasteur + MIT UROP), disciplinar (ABET + CDIO + EUR-ACE + TUNING-AL + ARCU-SUR) y gestión (ISO 21001:2018) — con heatmap de aplicabilidad 9 Escuelas UDFJC × 8 estándares y gaps críticos.
        </p>
        <p className="hallazgo h-du">
          <span className="h-id">M04</span>
          reveló los <strong>Jobs-to-be-Done de los 6 roles que pueblan las unidades organizativas claves de la reforma — la Escuela y la CABA</strong>. Estos roles (🎓 Estudiante Soberano · 🎨 Docente Diseñador · 🎤 Facilitador · 🔬 Pasteur · 🤝 Coop · 🏛️ Director) y la forma en que se organizan determinan el éxito o fracaso de la reforma. Arquetipos de madurez V1-V5 mapeados a 5 valores culturales: Soberanía, Emprendimiento, Participación, Ética, Austeridad.
        </p>
        <p className="hallazgo h-du">
          <span className="h-id">M05</span>
          documentó con BMK-001 (21 IES × 12 dimensiones × 9 métricas) que <strong>UDFJC opera en estado Sub-N1</strong>: programas-isla pre-departamentales, 0 living labs activados, 5/6 retroalimentaciones rotas, culture_lag = 2 contra los referentes globales (MIT, Stanford, Aalto, Twente, ÉTS, ITESM, KAIST, SNU, UNAM, UNAL, UDEA, UNAD). El benchmark se organiza en 4 funciones misionales (Formación · Investigación · Extensión · Integración Living-Labs) × 5 categorías de impacto.
        </p>
        <p className="hallazgo h-du">
          <span className="h-id">M06</span>
          modeló el <strong>CCA (Competencia-Conocimiento-Atómica)</strong> como unidad mínima INDIVISIBLE de creditización que certifica simultáneamente 3 dimensiones: V1 Comprensiva (Escuela) + V2 Experimental (Instituto) + V3 Transformativa (Centro). Resultado de BMK-002 (11 IES + 751 docs normativos). Reinterpreta el Decreto MEN 1330/2019 sin cambio normativo nacional.
        </p>
        <p className="hallazgo h-du">
          <span className="h-id">M07</span>
          especificó <strong>21 BPAs activadoras</strong> transferibles desde BMK-001: F01-F05 (Formación), I01-I05 (Investigación), E01-E04 (Extensión), INT01-INT07 (Living-Labs / Integración). Cada BPA documentada con árbol RBM-GAC y matriz de activación R1-R6. Piloto: CABA Escuela de Física UDFJC.
        </p>
        <p className="hallazgo h-mo">
          <span className="h-id">M08</span>
          ensambló el framework <strong>BSC-s × RBM-GAC × CRISP-DM</strong> con cadena causal P4 (Capacidades) → P3 (Organización) → P2 (Cultura) → P1 (Impacto Misional) y 86 preguntas-indicador. Calibrado con 6 escenarios prospectivos S0-S5 (S0 AS-IS Sub-N1 IUCA≈8 → S5 ΩMT pleno IUCA≈100, ROI año 8-9).
        </p>
        <p className="hallazgo h-mo">
          <span className="h-id">M09</span>
          aterrizó el presupuesto bajo <strong>NICSP</strong> (Resolución 533/2015 CGN) con clasificación CCP por rubro CAPEX/OPEX para IES públicas — la pieza fiscal-presupuestal que hace ejecutable el framework de M08.
        </p>
        <p className="hallazgo h-mo">
          <span className="h-id">M10</span>
          aplicó <strong>TDABC (Time-Driven Activity-Based Costing)</strong> calculando el Capacity Cost Rate por actividad académica — costeo trazable de cada hora docente, cada actividad de investigación y cada hora de extensión.
        </p>
        <p className="hallazgo h-mo">
          <span className="h-id">M11</span>
          armó la línea base con <strong>datasets MEN</strong>: SNIES (estadísticas de educación superior) + OLE (empleabilidad de egresados) + SPADIES (deserción y permanencia) — evidencia objetiva del desfase contra los referentes globales.
        </p>
        <p className="hallazgo h-ev">
          <span className="h-id">M12</span>
          sintetizó las 5 fases CRISP-DM en <strong>5 escenarios prospectivos S0-S5 + roadmap 2026-2034</strong>, sometidos a deliberación abierta de la comunidad universitaria. El Deployment NO está pre-decidido: depende de los acuerdos que la comunidad construya sobre estos escenarios.
        </p>
      </div>

      {/* v5.0t · sección "Las 5 Fases CRISP-DM" eliminada: el Kanban
          de abajo cumple la misma función con UX más rica (cards con
          M## badge + pregunta + botones Ir directo / Ventana derecha). */}

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
                  onSplitRight={() => openInRightPane(p.id)}
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

/* v5.0t · CSS de .stack/.stk-* eliminado: la sección 5 fases CRISP-DM se removió
   (redundante con el Kanban). El Kanban es la única vista de los M##. */

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

/* HALLAZGOS · v5.0u · narrativa de 12 párrafos independientes (uno por paper)
   con badge M## coloreada por fase CRISP-DM. Pensado para principiantes. */
.infografia-root .hallazgos { display: flex; flex-direction: column; gap: 0.55rem; margin: 0.4rem 0 0.6rem; }
.infografia-root .hallazgo {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-left: 4px solid var(--pur);
  border-radius: 6px;
  padding: 0.55rem 0.7rem;
  font-size: 8.5pt;
  line-height: 1.55;
  color: var(--text-card);
  margin: 0;
}
.infografia-root .hallazgo strong { color: var(--pur-d); font-weight: 700; }
.dark .infografia-root .hallazgo strong { color: var(--pur-l); }
.infografia-root .h-id {
  display: inline-block;
  font-family: 'Courier New', monospace;
  font-size: 8pt;
  font-weight: 700;
  color: white;
  background: var(--pur);
  padding: 0.1rem 0.45rem;
  border-radius: 3px;
  margin-right: 0.45rem;
  letter-spacing: 0.02em;
}
/* Color de la pildora M## por fase CRISP-DM (alineado con KANBAN_COLUMNS) */
.infografia-root .hallazgo.h-bu { border-left-color: #059669; }
.infografia-root .hallazgo.h-bu .h-id { background: #059669; }
.infografia-root .hallazgo.h-du { border-left-color: #0284c7; }
.infografia-root .hallazgo.h-du .h-id { background: #0284c7; }
.infografia-root .hallazgo.h-mo { border-left-color: #d97706; }
.infografia-root .hallazgo.h-mo .h-id { background: #d97706; }
.infografia-root .hallazgo.h-ev { border-left-color: #ea580c; }
.infografia-root .hallazgo.h-ev .h-id { background: #ea580c; }

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
