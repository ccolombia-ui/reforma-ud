---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:framework-86-indicadores-s0-s5
kd_title: "Framework 86 Preguntas-Indicador × 6 Escenarios S0-S5 (M08 BSC-s × RBM-GAC × CRISP-DM)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Framework 86 Indicadores × 6 Escenarios S0-S5"

skos_prefLabel: "Framework 86 Preguntas-Indicador × 6 Escenarios S0-S5 (M08)"
skos_altLabel: ["Framework M08", "86 indicadores", "S0-S5 escenarios", "BSC-s × RBM-GAC × CRISP-DM"]
skos_definition: "Sistema decisional integrado propuesto en M08 (Madera Sepúlveda 2026 v2.0.0) que articula tres marcos canónicos — **BSC-s** (Balanced Scorecard 4 perspectivas) × **RBM-GAC** (cadena objetivos-outputs-outcomes-impactos) × **CRISP-DM** (6 fases) — produciendo un sistema de **86 preguntas-indicador** organizadas por perspectiva BSC-s: (i) **20 QI Impacto Misional** (Marco P1: 4 funciones × 5 categorías M05); (ii) **20 QV Variación Cultural** (Marco P2: V1-V5 culturales × 4 estamentos M04); (iii) **25 QO Variación Organizacional** (Marco P3: PM1+PM2+PM3 + Living Labs + estructura administrativa); (iv) **21 BPA × CAPEX/OPEX** (Marco P4: 21 BPAs M07 con costeo CCR). Cada conjunto se evalúa contra **6 escenarios prospectivos S0-S5**: S0 = AS-IS UDFJC (Sub-N1 mayoritario, IUCA ≈ 8); S1-S4 = escenarios intermedios; S5 = ΩMT pleno (IUCA ≈ 100, ROI equilibrio año 8-9). El framework establece la **cadena causal P4→P3→P2→P1** como invariante: se diseña leyendo P1→P4 (impacto deseado → cultura → organización → capacidades) y se ejecuta leyendo P4→P1 (capacidades adquiridas → organización transformada → cultura migrada → impacto realizado). Es la **arquitectura prospectiva única** del cap-MI12."
skos_scopeNote: "El framework es de DECISIÓN, no de gestión cotidiana. Sus 86 indicadores son para evaluación de escenarios y planificación estratégica trianual; no se reportan mensualmente. NO confundir con dashboards operativos (RBM-GAC L0) — el framework opera en L3 (estratégico) y L2 (sistémico)."
skos_example: "Aplicado a UDFJC: cálculo de IUCA en escenario S0 (AS-IS) = 8/100 (sólo 8 BPAs entre L1-L2, resto L0); en S5 objetivo IUCA = 100 (todas BPAs ≥ L3). Inversión necesaria: ~5.000 SMMLV-país-2026 acumulado en horizonte 8-9 años para alcanzar S5. Decisión basada en evidencia: vale la pena vs. mantenerse en S0."
skos_notation: "Framework 86×6"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema decisional prospectivo integrado de transformación universitaria"
iso_differentia: "86 indicadores (20+20+25+21) × 6 escenarios S0-S5; integración tridimensional BSC-s × RBM-GAC × CRISP-DM; cadena causal P4→P1 invariante"
iso_subject_field: "Strategic management / Higher education transformation / Decision support"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 v2.0.0 — Framework BSC-s × RBM-GAC × CRISP-DM. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M08 v2.0.0 — síntesis original"
  neon_alignment_confidence: 0.9

applicable_domain: "Decisión estratégica UDFJC + planificación trianual + evaluación inversión + Comisión Art. 100"
assumptions:
  - "Los 86 indicadores son exhaustivos para decisión estratégica"
  - "La cadena causal P4→P1 es invariante en transformaciones universitarias"
breaks_at:
  - "Si se usa para reporte operativo cotidiano (es estratégico)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-fwk-integra-bsc
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-bsc-s]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 4 perspectivas P1-P4 del framework son las 4 perspectivas del BSC-s desagregadas en 86 indicadores."
  - rel_id: rel-fwk-integra-rbm
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rbm-gac]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RBM-GAC provee la cadena causal objetivos → outputs → outcomes → impactos que estructura cada uno de los 86 indicadores."
  - rel_id: rel-fwk-integra-crisp
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-crisp-dm]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CRISP-DM provee las 6 fases iterativas para la decisión basada en evidencia: el framework opera dentro del ciclo CRISP-DM aplicado al cap-MI12."
  - rel_id: rel-fwk-incluye-marco-p1
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-marco-p1-impacto-misional]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 20 QI son exactamente el Marco P1 (4×5) de M05 incorporado al framework integral M08."
  - rel_id: rel-fwk-incluye-bpas
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-bpa-001-21-buenas-practicas]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 21 BPAs (M07) constituyen P4 del framework, con CAPEX/OPEX calculado vía CCR."
  - rel_id: rel-fwk-usa-ccr
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-ccr-capacity-cost-rate]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El framework usa CCR (TDABC) para costear cada BPA × escenario; la tabla SMMLV-país-2026 normaliza para benchmark."

cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t5-sintesis-investigacion
  - framework-m08
  - 86-indicadores
  - s0-s5
  - propietario-udfjc
  - m08-corpus
  - audit-v2-2
---


# Framework 86 Indicadores × 6 Escenarios S0-S5

## Definición operativa

Sistema decisional integrado **BSC-s × RBM-GAC × CRISP-DM** = 86 indicadores × 6 escenarios:

| Perspectiva BSC-s | Indicadores | Cantidad | Origen |
|---|---|:-:|---|
| **P1 Impacto** | QI | 20 | Marco P1 (M05) |
| **P2 Cultura** | QV | 20 | V1-V5 × 4 estamentos (M04) |
| **P3 Organización** | QO | 25 | PM + Living Labs + admin |
| **P4 Capacidades** | BPA × CAPEX/OPEX | 21 | BPA-001 (M07) |
| **TOTAL** | | **86** | |

## 6 escenarios S0-S5

| | S0 | S1 | S2 | S3 | S4 | S5 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| **Estado** | AS-IS | … | … | … | … | ΩMT pleno |
| **IUCA** | 8 | 25 | 50 | 70 | 90 | 100 |

## Cadena causal invariante

> **Diseño**: P1 → P2 → P3 → P4 (¿qué impacto? → cultura → organización → capacidades)
> **Ejecución**: P4 → P3 → P2 → P1 (capacidades → organización → cultura → impacto)

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 v2.0.0. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

Framework 86×6 · 20 QI · 20 QV · 25 QO · S0-S5 · IUCA · IVC · IVO · Cadena P4→P1.

## Notas de aplicación

- **Conexión M08**: paper integral.
- **Decisión estratégica**, no reporte operativo.
