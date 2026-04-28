---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-time-equation-tdabc
kd_title: "Ecuación Time Equation TDABC — Forma canónica t = t₀ + Σ βᵢXᵢ (M10 §3)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Time Equation TDABC (M10)"
skos_altLabel: ["TE TDABC", "time equation canónica", "t = t0 + Σβi·Xi"]
skos_definition: "Forma canónica de las **Time Equations** del método TDABC (Kaplan & Anderson 2004), implementadas en 12 variantes para IES públicas colombianas en M10 (Madera Sepúlveda 2026). Una Time Equation (TE) es una función lineal que estima el **tiempo demandado** por una actividad académica a partir de sus **drivers** (factores que determinan cuánto tiempo tarda): t(X) = t₀ + Σᵢ₌₁ⁿ βᵢ × Xᵢ. Donde: t = tiempo total demandado por la actividad (minutos); t₀ = tiempo base fijo (setup/overhead independiente de los drivers); βᵢ = coeficiente de tiempo del i-ésimo driver (minutos por unidad del driver); Xᵢ = valor observado del i-ésimo driver (número de estudiantes, número de visitas, etc.). El costo de la actividad se obtiene multiplicando por el CCR: Costo = CCR × t(X). M10 define **12 TE** para los 3 procesos misionales (4 TE × Docencia, Investigación, Extensión). Los coeficientes βᵢ se calibran desde SIGUD + DARUMA (45 procedimientos PHVA) y tienen precisión ±15-20% en variante Lite."
skos_scopeNote: "La forma lineal de la Time Equation es una simplificación elegante: asume que el tiempo escala linealmente con cada driver. Para casos no lineales (ej. un grupo de 5 estudiantes NO demanda 5× más que uno solo en tutoría), se puede introducir términos cuadráticos o logarítmicos, pero Kaplan & Anderson (2004) demuestran que la forma lineal es suficiente para decisiones estratégicas. Los βᵢ son 'pendientes de demanda de tiempo' — se calibran empíricamente midiendo el tiempo real de docentes durante un período piloto."
skos_example: "TE-D-02 (Clase magistral): t = 60 + 0.5 × num_estudiantes. Para grupo de 30: t = 60 + 0.5×30 = 75 min. Interpretación: 60 min de clase más 0.5 min por estudiante (atención, preguntas, adaptación). Costo = CCR_DVE × 75 min = (28.500/60) × 75 = 35.625 COP/clase. TE-D-04 (Tutoría): t = 20 × num_estudiantes → 20 min/estudiante = 100% driver, sin base fija (β₀=0)."
skos_notation: "TE: t = t₀ + Σβᵢ·Xᵢ"




iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Función lineal de estimación de tiempo en TDABC"
iso_differentia: "Forma canónica t = t₀ + Σβᵢ·Xᵢ; drivers observables en SIGUD; calibrada para 12 actividades misionales UDFJC; precisión ±15-20%"
iso_subject_field: "Cost accounting / TDABC / Time equation"
iso_term_status: preferred
iso_standardized_by: "Kaplan, R. S., & Anderson, S. R. (2004). Time-driven activity-based costing. *HBR*, 82(11), 131-138. Adaptación UDFJC: Madera Sepúlveda (2026) M10."

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-10--tdabc]]"]
cited_count: 1

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - time-equation
  - tdabc
  - m10-corpus
  - kaplan-anderson
  - propietario-udfjc
  - audit-v2-2
---


# Time Equation TDABC — Forma canónica

## Fórmula

$$
t(X) = t_0 + \sum_{i=1}^{n} \beta_i \cdot X_i
$$

$$
\text{Costo}_{\text{actividad}} = \text{CCR} \times t(X)
$$

## Variables

| Símbolo | Significado | Unidad |
|---|---|---|
| $t(X)$ | Tiempo total demandado | minutos |
| $t_0$ | Tiempo base (overhead fijo) | minutos |
| $\beta_i$ | Coeficiente del driver $X_i$ | minutos/unidad driver |
| $X_i$ | Valor del driver $i$ | unidades propias |
| CCR | Capacity Cost Rate | COP/minuto |

## Las 12 Time Equations UDFJC (M10) — drivers y estructura

| TE | Proceso | Actividad | Forma |
|---|---|---|---|
| TE-D-01 | Docencia | Preparación clase | $t_0 + \beta_1 \cdot \text{min\_clase} \times \text{factor\_complejidad}$ |
| TE-D-02 | Docencia | Clase magistral | $t_0 + \beta_1 \cdot \text{min\_clase} \times \text{factor\_grupo}$ |
| TE-D-03 | Docencia | Evaluación | $t_0 + \beta_1 \cdot \text{num\_est} \times \text{factor\_examen}$ |
| TE-D-04 | Docencia | Tutoría | $\beta_1 \cdot \text{num\_est} \times \text{min\_tutoria}$ |
| TE-I-01 | Investigación | Diseño experimental | $t_0 + \beta_1 \cdot \text{complejidad}$ |
| TE-I-02 | Investigación | Trabajo de campo | $\beta_1 \cdot \text{num\_visitas} \times \text{min\_visita}$ |
| TE-I-03 | Investigación | Análisis y publicación | $t_0 + \beta_1 \cdot \text{productos}$ |
| TE-I-04 | Investigación | Mentoring investigación | $\beta_1 \cdot \text{num\_est} \times \text{min\_mentor}$ |
| TE-E-01 | Extensión | Diseño proyecto | $t_0 + \beta_1 \cdot \text{complejidad\_ext}$ |
| TE-E-02 | Extensión | Ejecución territorial | $\beta_1 \cdot \text{num\_jornadas} \times \text{min\_jornada}$ |
| TE-E-03 | Extensión | Acompañamiento | $\beta_1 \cdot \text{num\_benef} \times \text{min\_acomp}$ |
| TE-E-04 | Extensión | Sistematización | $t_0 + \beta_1 \cdot \text{productos\_ext}$ |

> DT-MI12-10-01: Los valores específicos de $t_0$ y $\beta_i$ para cada TE se calibran desde SIGUD + DARUMA (pendiente en M10).

## Prerequisitos conceptuales

1. `[[con-ecuacion-ccr-tdabc]]` — el CCR que convierte tiempo → costo
2. `[[con-tdabc-lite-12-time-equations]]` — las 12 instancias de esta forma canónica

## Fuente primaria

> Kaplan, R. S., & Anderson, S. R. (2004). Time-driven activity-based costing. *Harvard Business Review*, 82(11), 131-138.
> Adaptación UDFJC: Madera Sepúlveda, C. C. (2026). M10 §3. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

Time Equation · t₀ + Σβᵢ·Xᵢ · driver · TDABC · CCR · coeficiente de tiempo.
