'use client';

/**
 * InfografiaGlosario · v5.0p — réplica del patrón visual del HTML ref
 * adaptado al Glosario Universal (74 conceptos canónicos).
 *
 * Concepto sombrilla: ACU-004-25 (carta constitucional UDFJC).
 * Estructura del corpus M00:
 *   - 47 normativos (raíz: ACU-004-25)
 *   - 9 académicos
 *   - 7 meta-instrumentales (frameworks)
 *   - 6 síntesis
 *   - 6 refundacionales
 *   - 4 internacionales (UNESCO/OECD/MCU/UDL)
 *
 * Reusa el mismo CSS del componente InfografiaCanonico (variables CSS).
 */

import { concepto } from '#site/content';
import { Network, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type ConceptoLite = {
  id: string;
  href: string;
  skos_prefLabel: string;
  kd_title: string;
  iso_subject_field?: string;
  tags: string[];
};

const CATEGORIAS = [
  { key: 'concepto-normativo',         emoji: '📜', label: 'Normativos',           color: '#059669', desc: 'derivados del ACU-004-25 + Constitución + Ley 30 + CONPES' },
  { key: 'concepto-academico',         emoji: '🎓', label: 'Académicos',           color: '#0284c7', desc: 'pedagogía + currículo + autonomía positiva' },
  { key: 'concepto-meta-instrumental', emoji: '🛠️', label: 'Meta-instrumentales',  color: '#7c3aed', desc: 'frameworks BSC-S · JTBD · TDABC · CRISP-DM · VSM · Pasteur' },
  { key: 'concepto-sintesis',          emoji: '✨', label: 'Síntesis',             color: '#d97706', desc: 'ensamblajes que articulan normativo + académico' },
  { key: 'concepto-nuevo',             emoji: '🌱', label: 'Refundacionales',      color: '#ea580c', desc: 'introducidos por la reforma 2025 (sin precedente)' },
  { key: 'concepto-internacional',     emoji: '🌐', label: 'Internacionales',      color: '#0f172a', desc: 'UNESCO Beyond · MCU 2020 · OECD · UDL · CDIO' },
] as const;

function classify(c: ConceptoLite): string {
  for (const cat of CATEGORIAS) {
    if (c.tags.includes(cat.key)) return cat.key;
  }
  return 'otros';
}

export function InfografiaGlosario() {
  const conceptos = [...concepto].sort(
    (a, b) => (a.skos_prefLabel ?? a.kd_title).localeCompare(b.skos_prefLabel ?? b.kd_title, 'es'),
  );

  // Conteo por categoría
  const counts: Record<string, number> = {};
  const examples: Record<string, ConceptoLite[]> = {};
  for (const c of conceptos as unknown as ConceptoLite[]) {
    const cat = classify(c);
    counts[cat] = (counts[cat] ?? 0) + 1;
    if (!examples[cat]) examples[cat] = [];
    if (examples[cat].length < 3) examples[cat].push(c);
  }

  // Concepto sombrilla
  const acu = conceptos.find((c) => c.id === 'con-acu-004-25');

  // Conceptos sombrilla por categoría (los más conectados / centrales)
  const sombrillas = [
    { id: 'con-acu-004-25',                      label: 'ACU-004-25',                 cat: 'concepto-normativo',         hijos: ['con-10-principios-generales', 'con-funciones-misionales', 'con-comunidad-universitaria', 'con-mision-institucional-udfjc'] },
    { id: 'con-soberania-cognitiva',             label: 'Soberanía Cognitiva',        cat: 'concepto-academico',         hijos: ['con-autonomia-positiva', 'con-buen-vivir', 'con-re-ontologizacion'] },
    { id: 'con-bsc-s',                           label: 'BSC-S',                      cat: 'concepto-meta-instrumental', hijos: ['con-rbm-gac', 'con-vsm-system-5', 'con-jtbd-christensen'] },
    { id: 'con-cca',                             label: 'CCA · Modelo Crédito',       cat: 'concepto-sintesis',          hijos: ['con-credito-academico', 'con-funciones-misionales'] },
    { id: 'con-buen-vivir',                      label: 'Buen Vivir',                 cat: 'concepto-nuevo',             hijos: ['con-soberania-cognitiva', 'con-sistema-bienestar-buen-vivir'] },
    { id: 'con-unesco-reimagining-2021',         label: 'UNESCO Reimagining',         cat: 'concepto-internacional',     hijos: ['con-mcu-2020', 'con-cinco-misiones-piiom'] },
  ];

  return (
    <div className="infografia-root">
      <style>{INFOGRAFIA_GLO_CSS}</style>

      {/* HEADER */}
      <div className="hdr">
        <div>
          <h1>Glosario Universal · Reforma UDFJC</h1>
          <div className="sub">
            74_conceptos · SKOS+ISO_1087+Schema.org · ACU-004-25 raíz · 6 categorías · v1.0
          </div>
        </div>
        <div className="hdr-meta">
          glosario M00 · v1.0
          <br />
          modelo concepto-universal v5.2
          <br />
          74 átomos · 27 aristas concepto→concepto
        </div>
      </div>

      {/* STATS HERO */}
      <div className="stats-hero">
        <div className="sh"><span className="sh-n">74</span><span className="sh-l">conceptos</span></div>
        <div className="sh"><span className="sh-n">6</span><span className="sh-l">categorías</span></div>
        <div className="sh"><span className="sh-n">{counts['concepto-normativo'] ?? 0}</span><span className="sh-l">normativos</span></div>
        <div className="sh"><span className="sh-n">109</span><span className="sh-l">arts. ACU-004-25</span></div>
        <div className="sh"><span className="sh-n">7</span><span className="sh-l">estatutos hijos</span></div>
        <div className="sh"><span className="sh-n">M00</span><span className="sh-l">corpus base</span></div>
      </div>

      {/* TAGLINE */}
      <div className="tagline">
        Cada concepto del glosario es un <strong>átomo .md</strong> modelado con <strong>SKOS</strong> (vocabulario controlado),
        <strong> ISO 1087</strong> (terminografía formal: género próximo + diferencia específica),
        <strong> Schema.org</strong> (alineación con grafos de conocimiento),
        <strong> Pasteur Quadrant</strong> (uso × conocimiento),
        y <strong>relaciones tipadas</strong> via <code>tupla__relations[]</code> con frame
        <strong> normativo</strong> · <strong>skos</strong> · <strong>ddd</strong> · <strong>bibliografico</strong>.
      </div>

      {/* TESIS CARD */}
      <div className="tesis">
        <div className="tesis-eq">
          ACU-004-25 <span className="arrow">→</span> 73 CONCEPTOS HIJOS <span className="arrow">→</span> REFORMA REFUNDACIONAL
        </div>
        <div className="tesis-sub">
          El Acuerdo CSU 04 de 2025 (Estatuto General reformado, vigente 2025-05-06) es el
          <strong style={{ color: '#fcd34d' }}> concepto sombrilla</strong> del que se derivan, por inferencia normativa,
          los demás conceptos del corpus M00.
        </div>
      </div>

      {/* CONCEPTO SOMBRILLA (ACU-004-25) */}
      {acu && (
        <>
          <h2>Concepto Sombrilla · ACU-004-25</h2>
          <div className="charts-2col">
            <div className="chart-box">
              <div className="chart-title">📜 {acu.skos_prefLabel ?? acu.kd_title}</div>
              <div className="chart-sub">// urn:aleia:udfjc:reforma:cap-mi12:con:acu-004-25 · v1.0.0 · APPROVED</div>
              <p style={{ fontSize: '8pt', lineHeight: 1.5, marginTop: '0.2rem' }}>
                Acto administrativo del CSU UDFJC, expedido el <strong>5 de mayo de 2025</strong>, que
                <strong> reforma íntegramente el Estatuto General</strong> y deroga el Acuerdo CSU 003/1997.
                Compuesto por <strong>109 artículos en 4 Títulos</strong>:
              </p>
              <ul style={{ fontSize: '7.5pt', marginTop: '0.3rem', paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li><strong>Título I</strong> · Naturaleza Jurídica, Principios y Comunidad (Arts. 1-17)</li>
                <li><strong>Título II</strong> · Gobierno y Participación Democrática (Arts. 18-57)</li>
                <li><strong>Título III</strong> · Estructura y Organización (Arts. 58-90)</li>
                <li><strong>Título IV</strong> · Régimen de Transición (Arts. 91-109)</li>
              </ul>
              <div className="chart-foot">
                <Link href={acu.href} className="paper-id">
                  Abrir átomo completo →
                </Link>
              </div>
            </div>

            <div className="chart-box">
              <div className="chart-title">7 Estatutos Hijos Mandatados · Art. 98</div>
              <div className="chart-sub">// plazos 6m a 2a · cascada normativa derivada</div>
              <ul className="estatuto-list">
                <li><span className="mono">§1</span> Estatuto Académico nuevo · <strong>6m</strong> · vence 2025-11-05</li>
                <li><span className="mono">§2</span> Estatuto Docente nuevo · <strong>2a</strong> · vence 2027-05-05</li>
                <li><span className="mono">§3</span> Estatuto Estudiantil nuevo · <strong>2a</strong></li>
                <li><span className="mono">§4</span> Estatuto Investigación-Creación-Innovación · <strong>2a</strong></li>
                <li><span className="mono">§5</span> Estatuto Contextos-Extensión · <strong>2a</strong></li>
                <li><span className="mono">§6</span> Estatuto Personal Administrativo · <strong>2a</strong></li>
                <li><span className="mono">§7</span> Estatuto Bienestar y Buen Vivir · <strong>2a</strong></li>
              </ul>
              <div className="chart-foot">7 estatutos = 7 cascadas conceptuales que enriquecerán el glosario en M01-M11</div>
            </div>
          </div>
        </>
      )}

      {/* SECTION: 6 CATEGORÍAS */}
      <h2>Las 6 Categorías del Corpus M00</h2>
      <div className="si">// agrupación por <code>tag concepto-*</code> del frontmatter · 73 conceptos hijos del ACU-004-25</div>
      <div className="stack">
        {CATEGORIAS.map((cat, idx) => (
          <div key={cat.key} className={`stk s${idx + 1}`}>
            <div className="stk-icon">{cat.emoji}</div>
            <div className="stk-name">
              {cat.label}
              <span className="stk-count" style={{ color: cat.color }}>· {counts[cat.key] ?? 0}</span>
            </div>
            <div className="stk-tech">{cat.desc}</div>
            <div className="stk-bpa">
              {(examples[cat.key] ?? []).map((c) => (
                <Link key={c.id} href={c.href} className="stk-link" title={c.skos_prefLabel ?? c.kd_title}>
                  · {(c.skos_prefLabel ?? c.kd_title).slice(0, 32)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TABLA — CONCEPTOS SOMBRILLA POR CATEGORÍA */}
      <h2>Conceptos-Sombrilla por Categoría · Hub Semántico</h2>
      <div className="charts-2col">
        <div className="chart-box">
          <div className="chart-title">Hub Semántico · Concepto raíz → conceptos clave hijos</div>
          <div className="chart-sub">// los conceptos-sombrilla concentran las relaciones tipadas más fuertes del corpus</div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Sombrilla</th>
                <th>Categoría</th>
                <th>Conceptos clave hijos</th>
              </tr>
            </thead>
            <tbody>
              {sombrillas.map((s) => {
                const cat = CATEGORIAS.find((c) => c.key === s.cat);
                return (
                  <tr key={s.id}>
                    <td>
                      <Link href={`/glosario/${s.id}`} className="paper-id">
                        {s.label}
                      </Link>
                    </td>
                    <td>
                      <span style={{ color: cat?.color, fontWeight: 700, fontSize: '7pt' }}>
                        {cat?.emoji} {cat?.label}
                      </span>
                    </td>
                    <td className="mono" style={{ fontSize: '7pt' }}>
                      {s.hijos.map((h) => (
                        <Link key={h} href={`/glosario/${h}`} className="paper-pill" style={{ borderColor: cat?.color, color: cat?.color }}>
                          {h.replace(/^con-/, '').slice(0, 22)}
                        </Link>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="chart-foot">Cada sombrilla está modelada con capabilities <code>[NORMATIVE]</code> o <code>[NORMATIVE, DDD]</code></div>
        </div>

        <div className="chart-box">
          <div className="chart-title">Modelado Concepto-Universal v5.2 · Stack de Capas</div>
          <div className="chart-sub">// cada concepto extiende tupla-universal vía CUE unification &</div>
          <ul className="layer-list">
            <li><span className="layer-ico">🆔</span><span><strong>Identidad</strong> · kd_id (URN), kd_title, kd_status, kd_version, kd_responsible</span></li>
            <li><span className="layer-ico">📚</span><span><strong>SKOS</strong> · prefLabel, altLabel[], hiddenLabel[], definition, scopeNote, example, notation</span></li>
            <li><span className="layer-ico">📐</span><span><strong>ISO 1087</strong> · genus + differentia + subject_field + designation_type + term_status</span></li>
            <li><span className="layer-ico">🔗</span><span><strong>Schema.org</strong> · @type DefinedTerm/Legislation/etc · @context @vocab</span></li>
            <li><span className="layer-ico">🧪</span><span><strong>Pasteur</strong> · pasteur_quadrant + pasteur_axis_use + pasteur_axis_knowledge</span></li>
            <li><span className="layer-ico">🛡️</span><span><strong>Capabilities</strong> · [NORMATIVE], [DDD], [BIBLIOGRAPHIC] + facets discriminados</span></li>
            <li><span className="layer-ico">🕸️</span><span><strong>Relaciones</strong> · tupla__relations[] con frame normativo|skos|ddd|bibliografico</span></li>
            <li><span className="layer-ico">⏰</span><span><strong>Bitemporal</strong> · valid_from/to + recorded_at + lifecycle_state + anchor_chain</span></li>
          </ul>
          <div className="chart-foot">Cada átomo .md es <strong>compile-able</strong> a JSONL via compile.py de tupla-universal</div>
        </div>
      </div>

      {/* CMT GRID · MÉTRICAS DEL GLOSARIO */}
      <h2>Métricas del Glosario · Salud Semántica</h2>
      <div className="cmt-grid">
        <div className="cmt"><span className="cmt-n">{counts['concepto-normativo'] ?? 0}</span><span className="cmt-l">normativos</span></div>
        <div className="cmt"><span className="cmt-n">{counts['concepto-academico'] ?? 0}</span><span className="cmt-l">académicos</span></div>
        <div className="cmt"><span className="cmt-n">{counts['concepto-meta-instrumental'] ?? 0}</span><span className="cmt-l">meta-instr.</span></div>
        <div className="cmt"><span className="cmt-n">{counts['concepto-sintesis'] ?? 0}</span><span className="cmt-l">síntesis</span></div>
        <div className="cmt"><span className="cmt-n">{counts['concepto-nuevo'] ?? 0}</span><span className="cmt-l">refundacionales</span></div>
        <div className="cmt"><span className="cmt-n">{counts['concepto-internacional'] ?? 0}</span><span className="cmt-l">internacionales</span></div>
      </div>
      <div className="kpi-mini" style={{ marginTop: '0.4rem' }}>
        <div className="kpi"><strong>Concepto raíz:</strong> ACU-004-25 (109 arts.)</div>
        <div className="kpi"><strong>Top hub:</strong> funciones-misionales (8 aristas)</div>
        <div className="kpi"><strong>Aristas concepto→concepto:</strong> 27</div>
        <div className="kpi"><strong>Aristas paper→concepto:</strong> 45</div>
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
        <div>reforma·ud · Glosario Universal M00 · concepto-universal v5.2 · Universidad Distrital Francisco José de Caldas</div>
        <div className="ft-r">CC BY-SA 4.0 · 2026</div>
      </div>
    </div>
  );
}

const INFOGRAFIA_GLO_CSS = `
.infografia-root .stk-count { font-size: 8pt; font-weight: 800; margin-left: 0.4rem; font-family: 'Courier New', monospace; }
.infografia-root .estatuto-list { list-style: none; padding: 0; margin: 0; font-size: 7.8pt; line-height: 1.6; }
.infografia-root .estatuto-list li { padding: 0.15rem 0; border-bottom: 1px dashed var(--border-card); }
.infografia-root .estatuto-list li:last-child { border-bottom: none; }
.infografia-root .estatuto-list .mono { color: var(--pur-d); font-weight: 700; margin-right: 0.4rem; }
.dark .infografia-root .estatuto-list .mono { color: var(--pur-l); }
.infografia-root .layer-list { list-style: none; padding: 0; margin: 0; font-size: 7.8pt; line-height: 1.55; }
.infografia-root .layer-list li { display: flex; gap: 0.5rem; padding: 0.2rem 0; border-bottom: 1px dashed var(--border-card); align-items: flex-start; }
.infografia-root .layer-list li:last-child { border-bottom: none; }
.infografia-root .layer-ico { font-size: 11pt; line-height: 1; flex-shrink: 0; }
.infografia-root code { background: var(--bg-soft); padding: 0.05rem 0.3rem; border-radius: 3px; font-size: 0.9em; }
`;
