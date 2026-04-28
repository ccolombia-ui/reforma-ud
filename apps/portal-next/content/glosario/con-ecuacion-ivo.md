---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-ivo
kd_title: "Ecuación IVO — Índice de Viabilidad Organizacional ponderado (M08 §6.3)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Ecuación IVO (M08)"
skos_altLabel: ["IVO formula", "Índice Viabilidad Organizacional", "IVO ponderado"]
skos_definition: "Fórmula del **Índice de Viabilidad Organizacional (IVO)** definida en M08 §6.3 (Madera Sepúlveda 2026). El IVO agrega los 25 **Indicadores de Variación Organizacional (QO)** en una métrica 0-100 usando **promedio ponderado** por sistema VSM (S1-S5). Los pesos reflejan la importancia de cada sistema Beer para la transformación institucional: S1 (Operaciones) = 0.30 porque sin Escuelas funcionando no hay transformación; S2 (Coordinación/CABA) = 0.25 porque el CABA es el diferenciador distintivo de la reforma; S3 (Control) = 0.20; S4 (Inteligencia) = 0.15; S5 (Identidad) = 0.10. Fórmula: IVO(S_n) = Σ_{S=1}^{5} w_S × QO_S̄(S_n), con Σ w_S = 1. QO_S̄(S_n) es el promedio simple de los QO correspondientes al sistema VSM-S en el escenario S_n. Trayectoria proyectada: S0≈10, S1≈22, S2≈38, S3≈58, S4≈75, S5≈90."
skos_scopeNote: "IVO(S5)≈90 (no 100) porque la dimensión identidad (S5=VSM) puede mantenerse parcialmente en S5 sin llegar al máximo teórico. Los 5 sistemas VSM en notación de este índice (S1..S5) son los 5 sistemas de Beer — NO son los escenarios S0-S5 del framework (contexto diferente). Para evitar confusión, M08 usa 'Sistema VSM-1..VSM-5' en el texto narrativo y 'S1..S5' solo en la fórmula matemática del IVO."
skos_example: "S0: IVO-VSM1 (operaciones: Escuelas con 1/3 funciones) ≈ 0.08; IVO-VSM2 (CABA: 0 CCA integradas) = 0.00; resto ≈ 0.06. Total IVO(S0) = 0.30×0.08 + 0.25×0.00 + 0.20×0.06 + 0.15×0.02 + 0.10×0.05 ≈ 0.10 → 10. Coincide con IVO(S0)≈10."
skos_notation: "IVO"




iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de índice ponderado de viabilidad organizacional"
iso_differentia: "Agrega 25 QO con pesos por sistema VSM S1-S5; S2 (CABA-coordinación) recibe segundo mayor peso; escala 0-100; ≤90 en S5"
iso_subject_field: "Organizational transformation / VSM / University management"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 §6.3. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR







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
