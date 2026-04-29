---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-ivo
kd_title: "Ecuación IVO — Índice de Viabilidad Organizacional ponderado (M08 §6.3)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Ecuación IVO — Índice de Viabilidad Organizacional ponderado"

skos_prefLabel: "Ecuación IVO (M08)"
skos_altLabel: ["IVO formula", "Índice Viabilidad Organizacional", "IVO ponderado"]
skos_definition: "Fórmula del **Índice de Viabilidad Organizacional (IVO)** definida en M08 §6.3 (Madera Sepúlveda 2026). El IVO agrega los 25 **Indicadores de Variación Organizacional (QO)** en una métrica 0-100 usando **promedio ponderado** por sistema VSM (S1-S5). Los pesos reflejan la importancia de cada sistema Beer para la transformación institucional: S1 (Operaciones) = 0.30 porque sin Escuelas funcionando no hay transformación; S2 (Coordinación/CABA) = 0.25 porque el CABA es el diferenciador distintivo de la reforma; S3 (Control) = 0.20; S4 (Inteligencia) = 0.15; S5 (Identidad) = 0.10. Fórmula: IVO(S_n) = Σ_{S=1}^{5} w_S × QO_S̄(S_n), con Σ w_S = 1. QO_S̄(S_n) es el promedio simple de los QO correspondientes al sistema VSM-S en el escenario S_n. Trayectoria proyectada: S0≈10, S1≈22, S2≈38, S3≈58, S4≈75, S5≈90."
skos_scopeNote: "IVO(S5)≈90 (no 100) porque la dimensión identidad (S5=VSM) puede mantenerse parcialmente en S5 sin llegar al máximo teórico. Los 5 sistemas VSM en notación de este índice (S1..S5) son los 5 sistemas de Beer — NO son los escenarios S0-S5 del framework (contexto diferente). Para evitar confusión, M08 usa 'Sistema VSM-1..VSM-5' en el texto narrativo y 'S1..S5' solo en la fórmula matemática del IVO."
skos_example: "S0: IVO-VSM1 (operaciones: Escuelas con 1/3 funciones) ≈ 0.08; IVO-VSM2 (CABA: 0 CCA integradas) = 0.00; resto ≈ 0.06. Total IVO(S0) = 0.30×0.08 + 0.25×0.00 + 0.20×0.06 + 0.15×0.02 + 0.10×0.05 ≈ 0.10 → 10. Coincide con IVO(S0)≈10."
skos_notation: "IVO"

concepto_formula_latex: |
  \text{IVO}(S_n) = \sum_{S=1}^{5} w_S \cdot \overline{\text{QO}_S}(S_n)
  \quad \text{con} \quad \sum_{S=1}^{5} w_S = 1

concepto_formula_variables:
  - var: "\\text{IVO}(S_n)"
    desc: "Valor del Índice de Viabilidad Organizacional en el escenario S_n (escala 0-100)"
  - var: "w_S"
    desc: "Peso del sistema VSM-S (S1=0.30, S2=0.25, S3=0.20, S4=0.15, S5=0.10)"
  - var: "\\overline{\\text{QO}_S}(S_n)"
    desc: "Promedio simple de los QO del sistema VSM-S en el escenario S_n (fracción 0-1)"
  - var: "S \\in [1,5]"
    desc: "Índice de sistemas VSM Beer: S1=Operaciones, S2=Coordinación, S3=Control, S4=Inteligencia, S5=Identidad"

concepto_prerequisitos:
  - "[[con-iuca-ivc-ivo-indices]]"
  - "[[con-framework-86-indicadores-s0-s5]]"
  - "[[con-vsm-system-5]]"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de índice ponderado de viabilidad organizacional"
iso_differentia: "Agrega 25 QO con pesos por sistema VSM S1-S5; S2 (CABA-coordinación) recibe segundo mayor peso; escala 0-100; ≤90 en S5"
iso_subject_field: "Organizational transformation / VSM / University management"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 §6.3. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M08 §6.3 — elaboración propia sobre Beer (1979)"
  neon_alignment_confidence: 0.87

applicable_domain: "Diagnóstico de viabilidad organizacional + dashboard VSM × escenarios"
assumptions:
  - "Los 5 sistemas VSM Beer son los adecuados para IES pública colombiana"
  - "S2 (CABA) es el diferenciador: mayor peso que S3-S5"
  - "IVO(S5)≈90, no 100 — la identidad institucional plena toma más de 8 años"
breaks_at:
  - "Si CABA no existe (IVO quedaría artificialmente bajo sin que el resto falle)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-eq-ivo-define-indice
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-iuca-ivc-ivo-indices]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La ecuación IVO es la formalización matemática del índice IVO del sistema M08."
  - rel_id: rel-eq-ivo-usa-vsm
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-vsm-system-5]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los pesos w_S del IVO están estructurados sobre los 5 sistemas del Viable System Model (Beer 1979): S1=Operaciones, S2=Coordinación, S3=Control, S4=Inteligencia, S5=Identidad."

cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 1

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - ivo
  - indices-iuca-ivc-ivo
  - vsm
  - m08-corpus
  - propietario-udfjc
  - audit-v2-2
---


# Ecuación IVO — Índice de Viabilidad Organizacional ponderado

## Fórmula

$$
\text{IVO}(S_n) = \sum_{S=1}^{5} w_S \cdot \overline{\text{QO}_S}(S_n) \quad \text{con} \quad \sum_{S=1}^{5} w_S = 1
$$

## Variables

| Símbolo | Significado | Valor / Rango |
|---|---|---|
| $\text{IVO}(S_n)$ | Valor del índice en escenario $S_n$ | 0 – 100 (≤90 en S5) |
| $w_S$ | Peso del sistema VSM-$S$ | ver tabla abajo |
| $\overline{\text{QO}_S}(S_n)$ | Promedio de QO del sistema VSM-$S$ en $S_n$ | 0 – 1 |

## Pesos $w_S$ (calibrados M08)

| Sistema VSM | Código | $w_S$ | Justificación |
|---|:-:|:-:|---|
| Operaciones (Escuelas) | VSM-S1 | **0.30** | Sin operaciones no hay transformación |
| Coordinación (CABA) | VSM-S2 | **0.25** | El CABA es el diferenciador distintivo |
| Control (Dirección Escuela) | VSM-S3 | 0.20 | Monitoreo de QI por semestre |
| Inteligencia (Centro/Planeación) | VSM-S4 | 0.15 | Adaptación al entorno territorial |
| Identidad (Rectoría/CSU) | VSM-S5 | 0.10 | Misión institucional |
| **TOTAL** | | **1.00** | |

## Trayectoria UDFJC proyectada

| Escenario | Año | IVO |
|:-:|:-:|:-:|
| S0 | 2026 | ~10 |
| S2 | 2028 | ~38 |
| S3 | 2030 | ~58 |
| S5 | 2034 | ~90 |

## Prerequisitos conceptuales

1. `[[con-iuca-ivc-ivo-indices]]` — sistema de 3 índices
2. `[[con-framework-86-indicadores-s0-s5]]` — los 25 QO como inputs
3. `[[con-vsm-system-5]]` — estructura VSM Beer que da los pesos

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 §6.3. *Capítulo MI-12*. UDFJC. — sobre Beer (1979).

## Lenguaje ubicuo asociado

IVO · 25 QO · pesos VSM S1-S5 · CABA como coordinador diferenciador · viabilidad organizacional.

## Notas de aplicación

- **Alerta terminológica**: S1..S5 aquí son **sistemas VSM Beer** — NO los escenarios S0-S5. En el texto narrativo se usa "VSM-S1..VSM-S5" para evitar confusión.
- **CABA como diferenciador**: el IVO es especialmente sensible a VSM-S2 (CABA). Si CABA no opera, IVO queda limitado sin importar qué tan bien funcionen S1, S3-S5.
