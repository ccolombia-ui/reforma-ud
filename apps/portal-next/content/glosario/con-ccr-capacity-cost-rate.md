---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ccr-capacity-cost-rate
kd_title: "CCR · Capacity Cost Rate (TDABC Kaplan & Anderson 2007)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "CCR · Capacity Cost Rate (TDABC)"
skos_altLabel: ["CCR", "Tasa de Costo de Capacidad", "Time-Driven Activity-Based Costing rate"]
skos_definition: "Métrica fundamental del sistema **Time-Driven Activity-Based Costing (TDABC)** desarrollado por Robert S. Kaplan y Steven R. Anderson (2007, *Harvard Business Review* + monografía homónima 2007) que cuantifica el **costo unitario por unidad de tiempo de capacidad práctica disponible** en un recurso organizacional. La fórmula es: **CCR = Cost_total_de_capacidad / Tiempo_de_capacidad_práctica_disponible** (típicamente expresado en unidad-monetaria / minuto). Por ejemplo: si un docente de tiempo completo cuesta $5.000.000/mes y dispone de 7.200 minutos de capacidad práctica mensual (después de descontar vacaciones, formación, descansos), el CCR docente = $694/min. El CCR permite **costear actividades** multiplicando CCR × tiempo demandado por la actividad — sin necesidad de prorratear gastos generales arbitrariamente. Aplicado al M08 framework prospectivo: CCR es el insumo para calcular CAPEX/OPEX por BPA × unidad académica × escenario S0-S5, normalizado en SMMLV-país-2026 para benchmark cross-IES."
skos_scopeNote: "CCR NO es 'costo total' — es tasa por minuto/hora de capacidad **práctica** disponible (no nominal). La diferencia es estructural: el ABC tradicional usa capacidad nominal e infla costos; TDABC usa capacidad práctica observable y produce costeo realista. El CCR es el centro técnico del cambio."
skos_example: "CCR aplicado a UDFJC: docente_TC = $694/min · técnico_lab = $250/min · espacio_aula_estándar = $80/min. BPA-INT01 (Living Lab Sumapaz) demanda: 200 min docente + 400 min técnico + 600 min espacio = $200K + $100K + $48K = $348K/sesión. Multiplicado por 30 sesiones/año = $10.4M/año (18 SMMLV-2026)."
skos_notation: "CCR"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Métrica de costeo basada en tiempo de capacidad práctica"
iso_differentia: "Cost_total / Tiempo_capacidad_PRÁCTICA (no nominal); fundamento del TDABC; insumo para costeo de actividades por tiempo demandado"
iso_subject_field: "Cost accounting / TDABC / Activity-based costing"
iso_term_status: preferred
iso_standardized_by: "Kaplan, R. S., & Anderson, S. R. (2007). *Time-Driven Activity-Based Costing: A Simpler and More Powerful Path to Higher Profits*. Harvard Business School Press."

pasteur_quadrant: EDISON





"@type": DefinedTerm


cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-10--tdabc]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - ccr-tdabc
  - kaplan-anderson
  - m08-corpus
  - audit-v2-2
---


# CCR · Capacity Cost Rate (TDABC)

## Definición operativa

> **CCR = Cost_total_de_capacidad / Tiempo_de_capacidad_práctica_disponible**

Métrica fundamental del **Time-Driven Activity-Based Costing** (Kaplan & Anderson 2007).

## Ejemplo UDFJC

| Recurso | CCR estimado |
|---|:-:|
| Docente TC | $694/min |
| Técnico laboratorio | $250/min |
| Espacio aula estándar | $80/min |

## Fuente primaria

> Kaplan, R. S., & Anderson, S. R. (2007). *Time-Driven Activity-Based Costing*. Harvard Business School Press.

## Lenguaje ubicuo asociado

CCR · TDABC · Capacidad práctica · Costo unitario por tiempo.

## Notas de aplicación

- **Conexión M08**: insumo costos BPA × escenario.
- **Conexión M10**: TDABC paper específico.
- **NO confundir**: capacidad práctica ≠ capacidad nominal (anti-patrón ABC tradicional).
