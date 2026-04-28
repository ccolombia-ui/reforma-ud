---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-ivc
kd_title: "Ecuación IVC — Índice de Viabilidad Cultural ponderado (M08 §5.5)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Ecuación IVC (M08)"
skos_altLabel: ["IVC formula", "Índice Viabilidad Cultural", "IVC ponderado"]
skos_definition: "Fórmula del **Índice de Viabilidad Cultural (IVC)** definida en M08 §5.5 (Madera Sepúlveda 2026). El IVC agrega los 20 **Indicadores de Variación Cultural (QV)** en una métrica 0-100 usando **promedio ponderado** por valor (V1-V5). A diferencia del IUCA (pesos uniformes), el IVC pondera los valores culturales según su importancia para la reforma vinculante: V3 (Participación) recibe el mayor peso (0.30) porque la legitimidad de la reforma depende de la participación vinculante; V1 (Soberanía) = 0.25; V2 (Emprendimiento) = 0.20; V5 (Austeridad) = 0.15; V4 (Ética) = 0.10. Fórmula: IVC(S_n) = Σ_{V=1}^{5} w_V × QV_V̄(S_n), con Σ w_V = 1. QV_V̄(S_n) es el promedio simple de los 4 indicadores QV del valor V (uno por rol: EST, DOC, DIR, ADM) en el escenario S_n. Trayectoria proyectada: S0≈15, S1≈25, S2≈40, S3≈58, S4≈73, S5≈88."
skos_scopeNote: "IVC NO llega a 100 en S5 (solo ~88) porque la cultura cambia más lento que las capacidades o la organización — es la perspectiva más inercial. Los pesos w_V son propuestos por M08 y calibrables; la justificación para w_V3=0.30 es que sin participación vinculante la reforma UDFJC se percibe como imposición (diagnóstico sociológico del corpus M04). V1-V5 son valores CULTURALES (M04 JTBD) — NO confundir con V1-V3 del CCA (M06 Comprensiva/Experimental/Transformativa)."
skos_example: "Cálculo S1: QV-V3 promedio (4 roles) ≈ 0.13 → contribución V3 = 0.30 × 0.13 × 100 = 3.9. QV-V1 promedio ≈ 0.12 → 0.25 × 0.12 × 100 = 3.0. Total ≈ 25 (coincide con IVC(S1)≈25). El riesgo dominante es V3 bloqueante S2→S3: directivos que no ceden poder Decanatura→Escuela."
skos_notation: "IVC"




iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de índice ponderado de viabilidad cultural"
iso_differentia: "Agrega 20 QV culturales con pesos diferenciados por valor V1-V5; Σw=1; escala 0-100; ≤88 en S5"
iso_subject_field: "Change management / University culture / Strategic transformation"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 §5.5. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 1

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - ivc
  - indices-iuca-ivc-ivo
  - m08-corpus
  - propietario-udfjc
  - audit-v2-2
---


# Ecuación IVC — Índice de Viabilidad Cultural ponderado

## Fórmula

$$
\text{IVC}(S_n) = \sum_{V=1}^{5} w_V \cdot \overline{\text{QV}_V}(S_n) \quad \text{con} \quad \sum_{V=1}^{5} w_V = 1
$$

## Variables

| Símbolo | Significado | Valor / Rango |
|---|---|---|
| $\text{IVC}(S_n)$ | Valor del índice en escenario $S_n$ | 0 – 100 (≤88 en S5) |
| $w_V$ | Peso del valor cultural $V$ | ver tabla abajo |
| $\overline{\text{QV}_V}(S_n)$ | Promedio de 4 QV del valor $V$ en $S_n$ | 0 – 1 (fracción) |

## Pesos $w_V$ (calibrados M08)

| Valor | Código | $w_V$ | Justificación |
|---|:-:|:-:|---|
| Participación vinculante | V3 | **0.30** | Base de legitimidad de la reforma |
| Soberanía epistémica | V1 | 0.25 | Evita reforma mimética sin raíces propias |
| Emprendimiento | V2 | 0.20 | Generación de valor desde investigación |
| Austeridad | V5 | 0.15 | Costo de la reforma < beneficio |
| Ética | V4 | 0.10 | Gobernanza confiable |
| **TOTAL** | | **1.00** | |

## Trayectoria UDFJC proyectada

| Escenario | Año | IVC |
|:-:|:-:|:-:|
| S0 | 2026 | ~15 |
| S2 | 2028 | ~40 |
| S3 | 2030 | ~58 |
| S5 | 2034 | ~88 |

## Prerequisitos conceptuales

1. `[[con-iuca-ivc-ivo-indices]]` — contexto del sistema de 3 índices
2. `[[con-framework-86-indicadores-s0-s5]]` — los 20 QV usados como inputs

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 §5.5. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

IVC · 20 QV · pesos w_V · V1-V5 culturales · S0-S5 · viabilidad cultural.

## Notas de aplicación

- **Anti-confusión**: V1-V5 aquí son **valores culturales** del JTBD M04. En M06 CCA, V1-V3 son Comprensiva/Experimental/Transformativa — contexto distinto.
- **Riesgo dominante**: V3 es el más ponderado y el que más resiste en transición S2→S3 (directivos que no ceden poder a Escuelas).
