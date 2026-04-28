---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:snies-dataset-men
kd_title: "SNIES · Sistema Nacional de Información de la Educación Superior (MEN Colombia)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "SNIES · Sistema Nacional de Información de la Educación Superior (MEN)"
skos_altLabel: ["SNIES", "Sistema Nacional Información Educación Superior", "MEN SNIES"]
skos_definition: "Sistema oficial del **Ministerio de Educación Nacional (MEN) de Colombia** que centraliza información estadística y administrativa de la educación superior colombiana. Operado por la Subdirección de Apoyo a la Gestión de las IES, el SNIES recopila datos sobre: (i) **matrícula activa por programa académico** (todas las IES con registro calificado vigente); (ii) **planta docente** (cantidad por modalidad de vinculación + nivel de formación); (iii) **graduación** (egresados por programa-año); (iv) **oferta académica** (programas activos + nivel + modalidad). La actualización es anual con corte al 31 de marzo y publicación al 30 de septiembre. Granularidad típica: programa-año-IES. Aplicado al cap-MI12: SNIES alimenta P1 del framework M08 (tasa graduación 6 años) + cálculo CCR (M09 + M10) con num_estudiantes y planta docente UDFJC. Es el dataset oficial obligatorio para reportes a MEN."
skos_scopeNote: "SNIES es de acceso público para datos agregados nacionales; las IES individuales tienen acceso ampliado a sus propios datos. NO confundir con datos internos UDFJC en SIGUD (sistema institucional)."
skos_example: "Análisis UDFJC con SNIES 2024: 32 programas pregrado + 28 posgrado; matrícula 30.421 estudiantes activos; 2.516 docentes (planta + DVE); tasa graduación 6 años cohorte 2018 = 42%. Datos SNIES son la fuente para benchmark BMK-001 cross-IES Colombia."
skos_notation: "SNIES"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema oficial de información de educación superior nacional"
iso_differentia: "Operado por MEN Colombia; granularidad programa-año-IES; cubre matrícula + planta + graduación + oferta; actualización anual"
iso_subject_field: "Higher education information / Government data / Colombia education"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional - República de Colombia"

pasteur_quadrant: EDISON







cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-academico
  - t6-datos-sistemas
  - snies
  - men-colombia
  - dataset-oficial
  - m11-corpus
  - audit-v2-2
---


# SNIES · Sistema Nacional de Información de Educación Superior

## Definición operativa

Sistema oficial del MEN Colombia. Granularidad: programa-año-IES.

## Cobertura

| Dimensión | Detalle |
|---|---|
| Matrícula activa | Por programa académico |
| Planta docente | Por modalidad + nivel formación |
| Graduación | Egresados por programa-año |
| Oferta académica | Programas activos + nivel + modalidad |

## Fuente primaria

> Ministerio de Educación Nacional - República de Colombia. SNIES: <https://snies.mineducacion.gov.co/>

## Lenguaje ubicuo asociado

SNIES · MEN · Programa-año-IES · Registro calificado.

## Notas de aplicación

- **Conexión M08**: alimenta P1 del framework.
- **Conexión M11**: paper integral.
- **NO confundir** con SIGUD (sistema interno UDFJC).
