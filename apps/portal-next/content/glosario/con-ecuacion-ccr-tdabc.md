---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-ccr-tdabc
kd_title: "Ecuación CCR — Capacity Cost Rate TDABC (M09 §5 + M10)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Ecuación CCR TDABC (M09-M10)"
skos_altLabel: ["CCR formula", "Capacity Cost Rate formula", "Costo por hora docente"]
skos_definition: "Fórmula del **Capacity Cost Rate (CCR)** del método TDABC (Kaplan & Anderson 2004), calibrada para la UDFJC en M09 §5 y M10 §3 (Madera Sepúlveda 2026). El CCR expresa el **costo por unidad de tiempo del recurso** (COP/hora) calculado como el cociente entre el costo total del recurso en el período y su capacidad práctica de horas en ese mismo período. Fórmula: CCR = Costo_total / Capacidad_práctica_horas. **Calibración UDFJC**: (i) Docente planta promedio: CCR = 95.000.000 COP/año ÷ 1.760 horas/año ≈ **54.000 COP/hora** (equivale a ~694 COP/min). La capacidad práctica descuenta vacaciones (15 días), festivos (~18 días), formación docente (~2 sem) sobre 52 semanas × 40 h/sem. (ii) Docente Vinculación Especial (DVE): CCR ≈ **28.500 COP/hora**, calibrado empíricamente con 13.715 contratos ejecutados 2020-2025 en SIGUD. El CCR es el insumo fundamental de TDABC: Costo_actividad = CCR × tiempo_demandado (del Time Equation)."
skos_scopeNote: "La 'capacidad práctica' NO es la capacidad teórica (52×40h=2.080h). Se descuentan: vacaciones, festivos, reuniones, formación, tiempo de desplazamiento. En UDFJC el denominador típico es 1.760h (docente planta) vs. las horas contractuales del DVE. El CCR DVE (28.500) << CCR planta (54.000) por diferente estructura de costos: el DVE no recibe prestaciones sociales plenas. Esta diferencia es el driver principal del 'tiempo libre' del plan de contratación UDFJC."
skos_example: "TE-D-02 (clase magistral 75 min): Costo = CCR_planta × t = 694 COP/min × 75 min = 52.050 COP/clase. Si el docente dicta 16 clases/semestre × 4 cursos = 64 clases → solo en magistral = 64 × 52.050 ≈ 3,3M COP/semestre/docente. Con DVE: 28.500/3.600 = 7.9 COP/s × 75×60 s = 35.625 COP/clase → 2,3M COP/semestre. Ahorro DVE vs planta en solo magistral: ~1M COP/sem/docente."
skos_notation: "CCR"




iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de costeo por unidad de tiempo en TDABC"
iso_differentia: "Costo total / capacidad práctica (no teórica); calibrada UDFJC con datos reales; dos valores: planta 54K y DVE 28.5K COP/hora"
iso_subject_field: "Cost accounting / TDABC / Higher education economics"
iso_term_status: preferred
iso_standardized_by: "Kaplan, R. S., & Anderson, S. R. (2004). Time-driven activity-based costing. *Harvard Business Review*, 82(11), 131-138. Adaptación UDFJC: Madera Sepúlveda (2026) M09+M10."

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-09--ds-presupuesto-nicsp]]", "[[sec-MI12-10--tdabc]]"]
cited_count: 2

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - ccr
  - tdabc
  - m09-corpus
  - m10-corpus
  - kaplan-anderson
  - propietario-udfjc
  - audit-v2-2
---


# Ecuación CCR — Capacity Cost Rate TDABC

## Fórmula

$$
\text{CCR} = \frac{\text{Costo total del recurso en el período}}{\text{Capacidad práctica del recurso (horas)}}
$$

## Variables

| Símbolo | Significado | Unidad |
|---|---|---|
| CCR | Capacity Cost Rate | COP/hora |
| Costo total | Salarios + prestaciones + indirectos | COP/año |
| Capacidad práctica | Horas disponibles (descontadas vacaciones, festivos, formación) | horas/año |

## Calibración UDFJC 2026

| Tipo docente | Costo total/año | Capacidad práctica | CCR |
|---|---:|---:|---:|
| **Planta (promedio)** | ~95.000.000 COP | 1.760 h/año | **~54.000 COP/h** |
| **DVE** | calibrado empíricamente | — | **~28.500 COP/h** |

> DVE calibrado con **13.715 contratos 2020-2025** (fuente: SIGUD M09).

## Uso en TDABC: encadenamiento con Time Equation

$$
\text{Costo}_{\text{actividad}} = \text{CCR} \times t(X)
$$

donde $t(X)$ es el tiempo estimado de la actividad (de `[[con-ecuacion-time-equation-tdabc]]`).

## Prerequisitos conceptuales

1. `[[con-ccr-capacity-cost-rate]]` — definición conceptual del CCR
2. `[[con-tdabc-lite-12-time-equations]]` — las 12 TE donde se usa el CCR

## Fuente primaria

> Kaplan, R. S., & Anderson, S. R. (2004). Time-driven activity-based costing. *Harvard Business Review*, 82(11), 131-138.
> Calibración UDFJC: Madera Sepúlveda, C. C. (2026). M09 §5 + M10. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

CCR · Capacity Cost Rate · costo/hora · 54K planta · 28.5K DVE · TDABC · capacidad práctica.
