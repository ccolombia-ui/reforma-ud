---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:tdabc-lite-12-time-equations
kd_title: "TDABC Lite · 12 Time Equations UDFJC (M10 Madera Sepúlveda 2026)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "TDABC Lite · 12 Time Equations UDFJC"

skos_prefLabel: "TDABC Lite UDFJC · 12 Time Equations (M10 2026)"
skos_altLabel: ["TDABC Lite", "12 Time Equations UDFJC", "TDABC UDFJC"]
skos_definition: "Implementación adaptada del **Time-Driven Activity-Based Costing (TDABC)** Kaplan & Anderson (2004) en su variante **'Lite'** propuesta por Madera Sepúlveda (2026, M10) para IES públicas colombianas que aprovecha sistemas operativos existentes (SIGUD + DARUMA) sin requerir BPMN completo ni BIM-7D. Se compone de **12 Time Equations** organizadas en 3 procesos misionales × 4 actividades cada uno: (i) **Docencia (TE-D-01..04)** — Preparación + Magistral + Evaluación + Tutoría; (ii) **Investigación (TE-I-01..04)** — Diseño experimental + Trabajo de campo + Análisis-publicación + Mentoring; (iii) **Extensión (TE-E-01..04)** — Diseño proyecto + Ejecución territorial + Acompañamiento + Sistematización. Cada Time Equation tiene la forma **t = t₀ + Σ βᵢ × Xᵢ** donde t es tiempo demandado, t₀ tiempo base, βᵢ coeficientes del driver Xᵢ. Combinada con CCR (Capacity Cost Rate) calibrado empíricamente (~13.715 contratos DVE 2020-2025) produce costeo de actividades académicas con precisión ±15-20% en 2-3 semanas vs ±5% en 3-6 meses de TDABC Completo."
skos_scopeNote: "TDABC Lite NO sustituye a TDABC Completa — la complementa pragmáticamente para urgencia CSU 2026-2Q. Cuando BPMN institucional UDFJC madure, se puede migrar a TDABC Completa con mayor precisión. Mientras tanto, Lite es decisional-suficiente."
skos_example: "Aplicación TE-D-02 (Clase magistral): t = 60 + 0.5 × num_estudiantes (β para grupo 30 = 75 min/clase). CCR docente plana = $694/min × 75 min = $52K/clase. Si curso tiene 16 clases/semestre × 4 cursos/semestre = $3.3M/docente/semestre solo en clase magistral (sin preparación, evaluación, tutoría)."
skos_notation: "TDABC Lite UDFJC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Implementación adaptada de TDABC para IES pública"
iso_differentia: "Variante 'Lite' (no Completa); 12 Time Equations 4×3 procesos misionales; aprovecha SIGUD + DARUMA; ±15-20% precisión en 2-3 semanas"
iso_subject_field: "Cost accounting / TDABC / Higher education economics"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M10 — variante 'Lite' sobre Kaplan & Anderson (2004)"

pasteur_quadrant: PASTEUR

concepto_formula_latex: |
  t(X) = t_0 + \sum_{i=1}^{n} \beta_i \cdot X_i
  \quad\Rightarrow\quad
  \text{Costo}_{\text{actividad}} = \text{CCR} \times t(X)

concepto_formula_variables:
  - var: "t(X)"
    desc: "Tiempo total demandado por la actividad (minutos)"
  - var: "t_0"
    desc: "Tiempo base fijo (overhead/setup)"
  - var: "\\beta_i"
    desc: "Coeficiente de tiempo del driver i (min/unidad)"
  - var: "X_i"
    desc: "Valor del driver i (num_estudiantes, num_visitas, etc.)"
  - var: "\\text{CCR}"
    desc: "Capacity Cost Rate: ~54.000 COP/h (planta) o ~28.500 COP/h (DVE)"

concepto_prerequisitos:
  - "[[con-ecuacion-ccr-tdabc]]"
  - "[[con-ccr-capacity-cost-rate]]"

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M10 + Kaplan & Anderson (2004) TDABC original"
  neon_alignment_confidence: 0.85

applicable_domain: "Costeo actividades académicas UDFJC + alimentación M08 framework + decisión inversión BPA"
assumptions:
  - "Las 12 TE son exhaustivas para procesos misionales típicos"
  - "SIGUD + DARUMA contienen datos suficientes para calibración"
breaks_at:
  - "Si se aplica como sustituto de TDABC Completa cuando BPMN está disponible"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-tdabc-usa-ccr
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ccr-capacity-cost-rate]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "TDABC Lite usa CCR como insumo: tiempo demandado (Time Equation) × CCR = costo de la actividad."
  - rel_id: rel-tdabc-fuente-sigud
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-sigud-daruma-procesos-phva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "TDABC Lite UDFJC se calibra empíricamente con datos de SIGUD + 45 procedimientos PHVA en DARUMA."
  - rel_id: rel-tdabc-alimenta-fwk
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-framework-86-indicadores-s0-s5]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "TDABC Lite alimenta P4 del framework M08 con costos por actividad × BPA × escenario S0-S5."

cited_in: ["[[sec-MI12-10--tdabc]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t5-sintesis-investigacion
  - tdabc-lite
  - kaplan-anderson
  - propietario-udfjc
  - m10-corpus
  - audit-v2-2
---


# TDABC Lite · 12 Time Equations UDFJC

## Definición operativa

Variante "Lite" de TDABC (Kaplan & Anderson 2004) para IES pública. **12 Time Equations** = 3 procesos × 4 actividades:

| Proceso | TEs |
|---|---|
| **Docencia** | TE-D-01 Preparación · TE-D-02 Magistral · TE-D-03 Evaluación · TE-D-04 Tutoría |
| **Investigación** | TE-I-01 Diseño · TE-I-02 Campo · TE-I-03 Análisis · TE-I-04 Mentoring |
| **Extensión** | TE-E-01 Diseño · TE-E-02 Ejecución · TE-E-03 Acompañamiento · TE-E-04 Sistematización |

> Forma genérica: **t = t₀ + Σ βᵢ × Xᵢ**

## Comparación Lite vs Completa

| | Lite | Completa |
|---|:-:|:-:|
| Precisión | ±15-20% | ±5% |
| Tiempo | 2-3 semanas | 3-6 meses |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M10. *Capítulo MI-12*. UDFJC. — variante 'Lite' sobre Kaplan & Anderson (2004).

## Lenguaje ubicuo asociado

TDABC Lite · 12 TE · t = t₀ + βᵢXᵢ · SIGUD + DARUMA.

## Notas de aplicación

- **Conexión M10**: paper integral.
- **Insumo M08**: alimenta P4 framework con costos por BPA.
