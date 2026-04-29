---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:iuca-ivc-ivo-indices
kd_title: "IUCA · IVC · IVO — 3 índices ponderados del framework prospectivo M08"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "IUCA · IVC · IVO (3 índices ponderados M08)"

skos_prefLabel: "IUCA · IVC · IVO — 3 índices ponderados del framework M08"
skos_altLabel: ["IUCA IVC IVO", "Índices ponderados M08", "Métricas escenario S0-S5"]
skos_definition: "Conjunto de **tres índices ponderados** propuestos en M08 (Madera Sepúlveda 2026) que sintetizan los 86 indicadores del framework prospectivo en métricas agregadas comparables por escenario S0-S5: (i) **IUCA · Índice Único de Capacidad Adquirida** (escala 0-100) — agrega los 21 indicadores P4 (BPAs × CAPEX/OPEX × niveles L0-L4) ponderados por tipo de BPA; mide capacidad institucional acumulada; (ii) **IVC · Índice de Variación Cultural** (escala 0-100) — agrega los 20 indicadores P2 (V1-V5 culturales × 4 estamentos) ponderados por estamento; mide migración cultural simétrica; (iii) **IVO · Índice de Variación Organizacional** (escala 0-100) — agrega los 25 indicadores P3 (PM1-PM2-PM3 + Living Labs + estructura administrativa) ponderados por proceso; mide reconfiguración organizacional. Los 3 índices son **ortogonales** (no redundantes) y combinables: el escenario S0 = (IUCA 8, IVC 12, IVO 5) AS-IS UDFJC; S5 = (IUCA 100, IVC 100, IVO 100) ΩMT pleno. El framework asume **causalidad temporal**: IUCA cambia primero (capacidades), IVO sigue (organización se reconfigura), IVC al final (cultura migra) — coherente con la cadena causal P4→P3→P2."
skos_scopeNote: "Los 3 índices son agregados ponderados, NO promedios simples. Las ponderaciones son específicas por tipo de BPA, estamento y proceso (M08 §K). NO confundir con IUCA del SNIES (que mide indicadores diferentes a nivel SNIES nacional)."
skos_example: "Diagnóstico UDFJC AS-IS S0 = (IUCA 8, IVC 12, IVO 5). Roadmap proyectado: 2027 S1 = (15, 18, 12); 2030 S3 = (60, 50, 55); 2034 S5 = (100, 100, 100). Inversión total ≈ 5.000 SMMLV-país-2026 distribuida temporalmente."
skos_notation: "IUCA·IVC·IVO"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de índices ponderados sintéticos de transformación universitaria"
iso_differentia: "3 índices ortogonales (capacidad adquirida + variación cultural + variación organizacional); escala 0-100; agregan los 86 indicadores del framework"
iso_subject_field: "Higher education metrics / Strategic management / Institutional transformation"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M08 — elaboración propia"

pasteur_quadrant: PASTEUR

concepto_formula_latex_iuca: |
  \text{IUCA}(S_n) = \frac{1}{20} \sum_{i=1}^{20} \frac{\text{QI}_i^{S_n}}{\text{QI}_i^{S_5}} \times 100

concepto_formula_latex_ivc: |
  \text{IVC}(S_n) = \sum_{V=1}^{5} w_V \cdot \overline{\text{QV}_V}(S_n)
  \quad w_{V3}=0.30,\; w_{V1}=0.25,\; w_{V2}=0.20,\; w_{V5}=0.15,\; w_{V4}=0.10

concepto_formula_latex_ivo: |
  \text{IVO}(S_n) = \sum_{S=1}^{5} w_S \cdot \overline{\text{QO}_S}(S_n)
  \quad w_{S1}=0.30,\; w_{S2}=0.25,\; w_{S3}=0.20,\; w_{S4}=0.15,\; w_{S5}=0.10

concepto_prerequisitos:
  - "[[con-framework-86-indicadores-s0-s5]]"
  - "[[con-bsc-s]]"
  - "[[con-taxonomia-sub-n1-n4]]"
  - "[[con-bmk-001-21-ies]]"

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M08 — elaboración propia"
  neon_alignment_confidence: 0.85

applicable_domain: "Diagnóstico institucional UDFJC + comunicación con CSU + dashboard estratégico"
assumptions:
  - "Las ponderaciones son razonables para contexto UDFJC (calibrables)"
  - "La causalidad temporal IUCA → IVO → IVC es válida"
breaks_at:
  - "Si se confunde con IUCA SNIES nacional"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-indices-sintetizan-fwk
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-framework-86-indicadores-s0-s5]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "IUCA + IVC + IVO sintetizan los 86 indicadores del framework en 3 métricas agregadas comparables por escenario."
  - rel_id: rel-indices-causalidad-p4-p1
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-bsc-s]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "IUCA mide P4 (capacidades), IVO mide P3 (organización), IVC mide P2 (cultura) — coherente con la cadena causal P4→P3→P2→P1 del BSC-s."

cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t5-sintesis-investigacion
  - indices-iuca-ivc-ivo
  - propietario-udfjc
  - m08-corpus
  - audit-v2-2
---


# IUCA · IVC · IVO — 3 índices ponderados M08

## Definición operativa

| Índice | Significado | Escala | Mide |
|:-:|---|:-:|---|
| **IUCA** | Índice Único de Capacidad Adquirida | 0-100 | P4 (21 BPAs × L0-L4) |
| **IVC** | Índice de Variación Cultural | 0-100 | P2 (V1-V5 × estamentos) |
| **IVO** | Índice de Variación Organizacional | 0-100 | P3 (PM + Living Labs + admin) |

## Trayectoria UDFJC AS-IS → ΩMT pleno

| Año | Escenario | IUCA | IVC | IVO |
|:-:|:-:|:-:|:-:|:-:|
| 2026 | S0 | 8 | 12 | 5 |
| 2030 | S3 | 60 | 50 | 55 |
| 2034 | S5 | 100 | 100 | 100 |

## Causalidad temporal

> IUCA primero (capacidades) → IVO sigue (organización) → IVC al final (cultura).

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

IUCA · IVC · IVO · Índices ponderados · S0-S5.

## Notas de aplicación

- **Conexión M08**: agregación ejecutiva del framework.
- **NO confundir** con IUCA SNIES nacional.
