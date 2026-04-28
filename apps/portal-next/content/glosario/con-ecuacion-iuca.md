---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-iuca
kd_title: "Ecuación IUCA — Índice Universitario de Cumplimiento Misional Agregado (M08 §4.5)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Ecuación IUCA (M08)"
skos_altLabel: ["IUCA formula", "IUCA index formula", "Índice Cumplimiento Misional"]
skos_definition: "Fórmula de cálculo del **Índice Universitario de Cumplimiento Misional Agregado (IUCA)** definida en M08 §4.5 (Madera Sepúlveda 2026). El IUCA agrega los 20 **Indicadores de Impacto Misional (QI)** en una única métrica normalizada en escala 0-100, donde 0 = estado AS-IS Sub-N1 (UDFJC S0) y 100 = estado ΩMT pleno (S5, referente N4). La agregación usa **promedio simple** (pesos iguales = 1/20 por QI) y normaliza cada indicador dividiendo por su valor meta en S5. Fórmula: IUCA(S_n) = (1/20) × Σᵢ₌₁²⁰ [QI_i^(S_n) / QI_i^(S_5)] × 100. Los 20 QI se distribuyen en la matriz 4 Funciones × 5 Categorías (F1-F4 × C1-C5), donde F1=Formación, F2=Investigación, F3=Extensión, F4=Integración; C1=Producto, C2=Calidad, C3=Eficiencia, C4=Pertinencia, C5=Reconocimiento. Trayectoria UDFJC proyectada: S0≈8, S1≈20, S2≈38, S3≈58, S4≈74, S5≈100."
skos_scopeNote: "El IUCA usa promedio simple (1/20) — pesos iguales a los 20 QI. Esto contrasta con IVC (pesos por valor cultural V1-V5) e IVO (pesos por sistema VSM S1-S5), que son ponderados. Si se quiere ponderar el IUCA por función, se puede generalizar con w_Fi × w_Ci. NO confundir con IUCA del SNIES (indicador nacional de universidades públicas diferente). El valor numérico del IUCA(S0)≈8 proviene de calibración con datos UDFJC 2026: de 20 QI, solo ~1.6 se cumplen en promedio al nivel S5."
skos_example: "UDFJC S0: F1.C1 (egresados/cohorte) = 42% vs S5=70% → QI1 = (42/70)×100 = 60. F2.C1 (patentes) = 0 vs S5=10 → QI2 = 0. F3.C1 (spin-offs) = 0 vs S5=10 → QI3 = 0. F4.C1 (R# activas) = 0/6 vs S5=6/6 → QI4 = 0. Promedio ≈ 15+otros ≈ 8. Confirma IUCA(S0)≈8."
skos_notation: "IUCA"




iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de índice compuesto normalizado"
iso_differentia: "Agrega 20 QI misionales con pesos uniformes 1/20; normaliza contra S5 referente N4; escala 0-100"
iso_subject_field: "Higher education metrics / Strategic management"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 §4.5. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 1

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - iuca
  - indices-iuca-ivc-ivo
  - m08-corpus
  - propietario-udfjc
  - audit-v2-2
---


# Ecuación IUCA — Índice Universitario de Cumplimiento Misional Agregado

## Fórmula

$$
\text{IUCA}(S_n) = \frac{1}{20} \sum_{i=1}^{20} \frac{\text{QI}_i^{S_n}}{\text{QI}_i^{S_5}} \times 100
$$

## Variables

| Símbolo | Significado | Rango / Unidad |
|---|---|---|
| $\text{IUCA}(S_n)$ | Valor del índice en escenario $S_n$ | 0 – 100 |
| $\text{QI}_i^{S_n}$ | i-ésimo indicador de impacto en $S_n$ | unidades propias del QI |
| $\text{QI}_i^{S_5}$ | i-ésimo indicador meta en S5 (referente N4) | mismas unidades |
| $i$ | Índice de los 20 QI (matriz 4F × 5C) | 1..20 |

## Trayectoria UDFJC proyectada

| Escenario | Año aprox. | IUCA |
|:-:|:-:|:-:|
| S0 (AS-IS) | 2026 | ~8 |
| S1 | 2027 | ~20 |
| S2 | 2028 | ~38 |
| S3 | 2030 | ~58 |
| S4 | 2032 | ~74 |
| S5 (ΩMT) | 2034 | ~100 |

## Prerequisitos conceptuales

1. `[[con-iuca-ivc-ivo-indices]]` — definición del sistema de 3 índices
2. `[[con-framework-86-indicadores-s0-s5]]` — los 20 QI usados como inputs
3. `[[con-taxonomia-sub-n1-n4]]` — escala Sub-N1→N4 calibradora
4. `[[con-bmk-001-21-ies]]` — los benchmarks N4 que definen S5

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 §4.5. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

IUCA · 20 QI · promedio simple · S0-S5 · normalización S5 · 4F × 5C.

## Notas de aplicación

- **Cálculo AS-IS**: aplicar las 86 preguntas → extraer los 20 QI → calcular IUCA(S0).
- **Anti-patrón**: no ponderar C5 (Reconocimiento) más que C1-C4 — riesgo Goodhart (ver M08 §4.2).
- **Versión ponderada** (futura): $\text{IUCA}_w(S_n) = \sum_{F,C} w_{FC} \cdot \frac{\text{QI}_{FC}^{S_n}}{\text{QI}_{FC}^{S_5}} \times 100$ — requiere workshop de calibración participativo.
