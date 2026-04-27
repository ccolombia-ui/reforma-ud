---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:bsc-s
kd_title: "BSC-s — Balanced Scorecard sistémico (Kaplan-Norton + adaptación UDFJC)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-08, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "BSC-s (Balanced Scorecard sistémico)"

skos_prefLabel: "BSC-s — Balanced Scorecard sistémico"
skos_altLabel: ["Balanced Scorecard adaptado UDFJC", "BSC sistémico", "Sistema de gestión estratégica BSC"]
skos_hiddenLabel: ["bsc-s", "balanced-scorecard"]
skos_definition: "Adaptación propietaria UDFJC (Madera Sepúlveda, 2026) del Balanced Scorecard de Kaplan-Norton (1992-1996) para contextos de reforma universitaria sistémica. El BSC tradicional define 4 perspectivas de desempeño organizacional: (P1) Financiera, (P2) Cliente/Stakeholders, (P3) Procesos Internos, (P4) Aprendizaje y Crecimiento. La adaptación BSC-s reorienta cada perspectiva al contexto universitario público con direccionalidad transformativa: (P1) Sostenibilidad financiera y diversificación (Clark R-3); (P2) Comunidades + estamentos + sector productivo + medio ambiente (Quintuple Helix); (P3) PM1+PM2+PM3 + procesos administrativos integrados; (P4) Capacidad transformativa + cultura emprendedora + ciclo virtuoso ΩMT. La cadena causal P4→P3→P2→P1 representa cómo la transformación ocurre desde aprendizaje organizacional hasta sostenibilidad financiera."
skos_scopeNote: "BSC-s NO es BSC tradicional — el sufijo 's' (sistémico) marca la adaptación a contexto universitario público con principios refundacionales. Se articula con [[con-rbm-gac|RBM-GAC]] (Results-Based Management + Governance, Accountability, Compliance) y CRISP-DM en el framework prospectivo M08."
skos_example: "Para una Escuela UDFJC en BSC-s: P4 (Aprendizaje) = capacitación en CABAs interdisciplinares; P3 (Procesos) = articulación PM1-PM2-PM3; P2 (Stakeholders) = diálogo con JACs territoriales + sector productivo; P1 (Financiera) = diversificación con contratos PM3 + proyectos competitivos PM2."
skos_notation: "BSC-s"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Adaptación de marco de gestión estratégica multinivel"
iso_differentia: "BSC Kaplan-Norton + adaptación sistémica universitaria + cadena causal P4→P3→P2→P1"
iso_subject_field: "Gestión estratégica universitaria / Marcos de desempeño institucional"
iso_term_status: preferred
iso_standardized_by: "Kaplan & Norton (1996) BSC + Madera Sepúlveda (2026) adaptación UDFJC"

align_schema_type: DefinedTerm
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NEON]

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[kaplan1996bsc]] + adaptación UDFJC Madera Sepúlveda 2026"
  neon_alignment_confidence: 0.85

applicable_domain: "Gestión estratégica de Escuelas + Facultades + IES públicas en transformación"
assumptions: ["Las 4 perspectivas son suficientes para capturar el desempeño universitario sistémico"]
breaks_at: ["Si se aplica como métrica financiera tradicional sin considerar misión pública"]
extends_to: "[[con-rbm-gac]]"

recorded_at: "2026-04-26"
valid_from: "2026-04-26"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-bsc-complementa-rbm
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-rbm-gac]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "BSC-s y RBM-GAC son marcos complementarios: BSC-s mide desempeño en 4 perspectivas P1-P4; RBM-GAC provee la metodología por resultados + estructura de gobernanza. Articulados en el framework prospectivo M08."
  - rel_id: rel-bsc-articula-funciones-misionales
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Perspectiva P3 (Procesos Internos) del BSC-s se mapea directamente a la articulación de PM1 (Formación) + PM2 (Investigación) + PM3 (Extensión) — las funciones misionales del Art. 7 ACU-004-25."
  - rel_id: rel-bsc-stakeholders-quintuple
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-quintuple-helix]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Perspectiva P2 (Cliente/Stakeholders) del BSC-s adopta el modelo Quintuple Helix: comunidades + estamentos + sector productivo + medio ambiente."
  - rel_id: rel-bsc-aprendizaje-omt
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-omt]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Perspectiva P4 (Aprendizaje y Crecimiento) del BSC-s se materializa en el ciclo virtuoso ΩMT (M02): retroalimentaciones R1-R6 que aceleran capacidad transformativa."
  - rel_id: rel-bsc-direccionalidad-frame3
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-frame-3]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "BSC-s implementa direccionalidad transformativa Frame 3 — sin ese marco conceptual, BSC degenera a métrica financiera tradicional."
  - rel_id: rel-bsc-mitiga-rt5
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "BSC-s es el instrumento institucional de mitigación de RT5 (Ausencia de sistema de seguimiento) identificado en M01 §5.2."

cited_in: ["[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 2

tags: [glosario-universal, concepto-meta-instrumental, bsc-s, balanced-scorecard, kaplan-norton, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-neon, layer-disenador]
---

# BSC-s — Balanced Scorecard sistémico

## Definición operativa

Adaptación propietaria UDFJC del **Balanced Scorecard** de Kaplan-Norton (1992-1996) para reforma universitaria sistémica.

## Las 4 perspectivas BSC-s

| Perspectiva | BSC tradicional | BSC-s adaptación UDFJC |
|---|---|---|
| **P1** Financiera | Crecimiento + utilidad | **Sostenibilidad + diversificación** (Clark R-3) |
| **P2** Cliente | Cliente + segmentos | **Quintuple Helix**: comunidades + estamentos + productivo + ambiente |
| **P3** Procesos | Internos eficientes | **PM1+PM2+PM3 articulados** + administrativos integrados |
| **P4** Aprendizaje | Capital humano | **Capacidad transformativa + ciclo virtuoso ΩMT** |

> **Cadena causal**: P4 → P3 → P2 → P1 (la transformación ocurre desde aprendizaje hasta sostenibilidad financiera).

## Lenguaje ubicuo asociado

BSC-s · Balanced Scorecard sistémico · 4 perspectivas · Cadena P4→P3→P2→P1 · Kaplan-Norton.

## Notas de aplicación

- **Conexión M08**: framework prospectivo BSC-s × RBM-GAC × CRISP-DM.
- **Adaptación**: el sufijo 's' marca la sistemicidad universitaria pública.
