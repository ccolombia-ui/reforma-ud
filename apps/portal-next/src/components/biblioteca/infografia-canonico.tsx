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
import { Network, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function InfografiaCanonico() {
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);

  // 6 fases CRISP-DM con sus papers
  const phases = [
    { key: 'business', label: 'Business Understanding', emoji: '🎯', color: '#059669', papers: papers.filter((p) => p.crispPhase === 'business') },
    { key: 'data-understanding', label: 'Data Understanding', emoji: '🔍', color: '#0284c7', papers: papers.filter((p) => p.crispPhase === 'data-understanding') },
    { key: 'data-prep', label: 'Data Preparation', emoji: '🧪', color: '#7c3aed', papers: papers.filter((p) => p.crispPhase === 'data-prep') },
    { key: 'modeling', label: 'Modeling', emoji: '🏗️', color: '#d97706', papers: papers.filter((p) => p.crispPhase === 'modeling') },
    { key: 'evaluation', label: 'Evaluation', emoji: '📊', color: '#ea580c', papers: papers.filter((p) => p.crispPhase === 'evaluation') },
    { key: 'deployment', label: 'Deployment', emoji: '🚀', color: '#0f172a', papers: papers.filter((p) => p.crispPhase === 'deployment') },
  ];

  // Tabla actores
  const actores = [
    { rol: '🎓 Estudiante / Egresado', q: '¿Cómo recupero soberanía cognitiva?', papers: ['m02', 'm04', 'm06'], puente: 'Soberanía cognitiva · JTBD' },
    { rol: '🎨 Docente Diseñador', q: '¿Cómo diseño bajo modelo CCA?', papers: ['m06', 'm08', 'm07'], puente: 'CCA · Crédito académico' },
    { rol: '🔬 Docente Investigador', q: '¿Cómo activo el ciclo Pasteur?', papers: ['m02', 'm07', 'm05'], puente: 'Pasteur · 5 vías Clark' },
    { rol: '🏛️ Director / Decanatura', q: '¿Cómo aterriza la gobernanza?', papers: ['m01', 'm03', 'm09'], puente: 'ACU-004-25 · BSC-S' },
    { rol: '📊 Veedor / Auditor', q: '¿Cómo se cuestea y auditea?', papers: ['m10', 'm11', 'm09'], puente: 'RBM-GAC · Veeduría' },
    { rol: '🚀 Diseñador política', q: '¿Cómo se despliega en 8 años?', papers: ['m12', 'm01', 'm08'], puente: 'PIIOM · CONPES 4069' },
  ];

  return (
    <div className="infografia-root">
      <style>{INFOGRAFIA_CSS}</style>

      {/* HEADER */}
      <div className="hdr">
        <div>
          <h1>Inv. Buenas Prácticas · Reforma UDFJC</h1>
          <div className="sub">
            12_investigaciones · 6_fases_CRISP-DM · sustrato_teórico · ACU-004-25 vinculante
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
        <div className="sh"><span className="sh-n">6</span><span className="sh-l">fases CRISP-DM</span></div>
        <div className="sh"><span className="sh-n">74</span><span className="sh-l">conceptos glosario</span></div>
        <div className="sh"><span className="sh-n">125</span><span className="sh-l">aristas grafo</span></div>
        <div className="sh"><span className="sh-n">35</span><span className="sh-l">refs APA</span></div>
        <div className="sh"><span className="sh-n">5</span><span className="sh-l">rutas Clark R1-R5</span></div>
      </div>

      {/* TAGLINE */}
      <div className="tagline">
        Corpus de <strong>investigaciones canónicas</strong> que sustentan la <strong>Reforma Vinculante UDFJC</strong>:
        del <strong>mandato normativo</strong> (ACU-004-25 + CONPES 4069 + PIIOM)
        al <strong>deployment integrador</strong> (CRISP-DM 8 años),
        pasando por <strong>JTBD de la comunidad</strong>, <strong>benchmark 21 IES</strong>,
        <strong> modelo CCA</strong>, <strong>estándares OECD/UDL/ABET/CDIO</strong>,
        <strong> presupuesto NICSP</strong>, <strong>costeo TDABC</strong> y <strong>datasets MEN</strong>.
      </div>

      {/* TESIS CARD */}
      <div className="tesis">
        <div className="tesis-eq">
          MANDATO NORMATIVO <span className="arrow">→</span> BUENAS PRÁCTICAS GLOBALES <span className="arrow">→</span> DEPLOYMENT INTEGRADOR
        </div>
        <div className="tesis-sub">
          La reforma se sustenta NO en opiniones, sino en evidencia empírica de 21 IES líderes mundiales (Aalto, Twente, Stanford, MIT)
          + estándares ISO/OECD/UNESCO + ciclo virtuoso Clark-Etzkowitz-Geels
        </div>
      </div>

      {/* SECTION: 6 FASES CRISP-DM */}
      <h2>Las 6 Fases CRISP-DM · 12 Papers Encadenados</h2>
      <div className="si">// metodología canónica de data science adaptada al diseño institucional · cada fase resuelve una pregunta clave</div>
      <div className="stack">
        {phases.map((phase, idx) => (
          <div key={phase.key} className={`stk s${idx + 1}`}>
            <div className="stk-icon">{phase.emoji}</div>
            <div className="stk-name">{phase.label}</div>
            <div className="stk-tech">
              {phase.papers.map((p) => `M${String(p.number).padStart(2, '0')}`).join(' · ')}
            </div>
            <div className="stk-bpa">
              {phase.papers.map((p) => (
                <Link key={p.id} href={p.href} className="stk-link" title={p.title}>
                  {p.title.slice(0, 36)}
                  {p.title.length > 36 ? '…' : ''}
                </Link>
              ))}
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

      {/* TABLA — ORDEN DE LECTURA */}
      <h2>Las 12 Investigaciones · Orden de Lectura Sugerido</h2>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>ID</th>
            <th>Título</th>
            <th>Pregunta que resuelve</th>
            <th style={{ width: '120px' }}>Fase</th>
            <th style={{ width: '90px' }}>Rutas</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((p) => (
            <tr key={p.id}>
              <td>
                <Link href={p.href} className="mono paper-id">
                  M{String(p.number).padStart(2, '0')}
                </Link>
              </td>
              <td><strong>{p.title}</strong></td>
              <td className="muted">{p.description}</td>
              <td>
                <span className="phase-pill" style={{ color: phases.find((ph) => ph.key === p.crispPhase)?.color }}>
                  {phases.find((ph) => ph.key === p.crispPhase)?.label.split(' ')[0] ?? p.crispPhase}
                </span>
              </td>
              <td className="mono">{p.rutaClark.join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* CTA */}
      <div className="cta">
        <Link href="/canonico/grafo" className="cta-btn">
          <Network style={{ width: 16, height: 16 }} />
          Explorar grafo semántico interactivo
          <ExternalLink style={{ width: 12, height: 12, opacity: 0.7 }} />
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
.infografia-root .stk.s1 { border-left: 3px solid #059669; }
.infografia-root .stk.s2 { border-left: 3px solid #0284c7; }
.infografia-root .stk.s3 { border-left: 3px solid #7c3aed; }
.infografia-root .stk.s4 { border-left: 3px solid #d97706; }
.infografia-root .stk.s5 { border-left: 3px solid #ea580c; }
.infografia-root .stk.s6 { border-left: 3px solid #0f172a; }
.dark .infografia-root .stk.s6 { border-left-color: #94a3b8; }

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

.infografia-root .cta { margin: 0.75rem 0 0.4rem; text-align: center; }
.infografia-root .cta-btn { display: inline-flex; align-items: center; gap: 0.45rem; background: var(--pur); color: #fff; padding: 0.55rem 1.1rem; border-radius: 7px; font-size: 9pt; font-weight: 700; text-decoration: none; }
.infografia-root .cta-btn:hover { background: var(--pur-d); }

.infografia-root .ft { margin-top: 0.8rem; padding-top: 0.5rem; border-top: 1.5px solid var(--border-card); display: grid; grid-template-columns: 1fr auto; font-size: 7pt; color: var(--muted-card); }
.infografia-root .ft-r { text-align: right; font-family: 'Courier New', monospace; }
`;
