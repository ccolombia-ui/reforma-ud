---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:spadies-snies-dataset-men
kd_title: "SPADIES · Sistema para la Prevención de la Deserción de Educación Superior (MEN Colombia)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "SPADIES · Sistema Prevención Deserción Educación Superior"

skos_prefLabel: "SPADIES · Sistema Prevención de la Deserción ES (MEN Colombia)"
skos_altLabel: ["SPADIES", "Sistema Prevención Deserción", "MEN SPADIES"]
skos_definition: "Sistema del **Ministerio de Educación Nacional (MEN) Colombia** especializado en monitoreo y análisis de **deserción y trayectorias estudiantiles** en educación superior. Operado conjuntamente por MEN + Universidad de los Andes (CEDE), SPADIES rastrea: (i) **tasas de deserción por programa-cohorte** (anual + acumulada); (ii) **trayectorias de estudiantes** (avance, retención, suspensiones); (iii) **factores de riesgo** asociados a deserción (académicos + financieros + sociodemográficos); (iv) **comparación cross-IES** (cuando hay cobertura). Granularidad: estudiante anonimizado-cohorte-programa-año. Limitación: SPADIES nacional consolidado para todas las IES está incompleto; UDFJC tiene datos accesibles pero comparación cross-IES es limitada. Aplicado al cap-MI12: SPADIES alimenta P1 del framework M08 (tasa deserción acumulada como métrica de eficiencia) y permite identificar factores de riesgo para diseño de R5 (Aprendizaje Experiencial: co-op territorial reduce deserción)."
skos_scopeNote: "SPADIES NO mide solamente 'deserción' sino trayectorias completas (incluyendo retomas y suspensiones). NO confundir con OLE (post-egreso) ni SNIES (matrícula activa). Su valor diferencial es el seguimiento longitudinal del estudiante."
skos_example: "Análisis UDFJC SPADIES cohorte 2018: tasa deserción acumulada 6 años = 38%; factores riesgo dominantes: estrato socioeconómico (r²=0.27) + desempeño académico primer semestre (r²=0.42). Implicación M02: R5 (Aprendizaje Experiencial creditizado) podría reducir deserción 5-8 pp basado en literatura."
skos_notation: "SPADIES"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema oficial de monitoreo de deserción y trayectorias en educación superior"
iso_differentia: "Operado MEN + Andes-CEDE; trayectorias longitudinales; factores de riesgo identificados; cobertura nacional incompleta"
iso_subject_field: "Higher education / Student retention / Government data Colombia"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional Colombia + Universidad de los Andes-CEDE"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "MEN Colombia + Universidad de los Andes CEDE SPADIES"
  neon_alignment_confidence: 0.92

applicable_domain: "Análisis deserción UDFJC + diseño intervenciones R5 + alimentación P1 framework M08"
assumptions:
  - "Los factores de riesgo identificados son aplicables UDFJC"
breaks_at:
  - "Si se confunde con OLE (post-egreso) o SNIES (matrícula activa)"

valid_from: "2006-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-spadies-alimenta-fwk
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-framework-86-indicadores-s0-s5]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "SPADIES alimenta P1 framework M08 con tasa deserción acumulada como métrica de eficiencia (categoría C3 del Marco P1)."
  - rel_id: rel-spadies-mide-r5
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "SPADIES permite medir el impacto de R5 (Aprendizaje Experiencial: co-op + PBL) en reducción de deserción."

cited_in: ["[[sec-MI12-11--datasets-men]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t6-datos-sistemas
  - spadies
  - men-colombia
  - dataset-oficial
  - desercion-trayectorias
  - m11-corpus
  - audit-v2-2
---


# SPADIES · Sistema Prevención de la Deserción Educación Superior

## Definición operativa

Sistema MEN + Andes-CEDE de seguimiento longitudinal de trayectorias estudiantiles.

## Cobertura

- Tasas deserción anual + acumulada · Trayectorias · Factores de riesgo · Comparación cross-IES (limitada).

## Fuente primaria

> Ministerio de Educación Nacional Colombia + Universidad de los Andes (CEDE). SPADIES.

## Lenguaje ubicuo asociado

SPADIES · Deserción · Trayectorias · Factores de riesgo · Cohorte longitudinal.

## Notas de aplicación

- **Conexión M11**: dataset 3/3.
- **Conexión M02 R5**: medición empírica de Aprendizaje Experiencial.
