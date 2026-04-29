---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:programa-academico
kd_title: "Programa Académico (Decreto MEN 1330/2019; ACU-004-25 implícito) — unidad de oferta formativa con registro calificado"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Programa Académico"

skos_prefLabel: "Programa Académico"
skos_altLabel: ["Proyecto Curricular", "Oferta formativa registrada SNIES", "Academic program"]
skos_definition: "Conjunto coherente y planificado de actividades académicas (cursos, prácticas, investigación formativa, electivas) conducente a un título profesional, técnico, tecnológico o de posgrado. Está adscrito a una Escuela / Facultad de la UDFJC, requiere créditos académicos cuantificados según Decreto MEN 1330/2019 Arts. 11-12, y debe contar con registro calificado MEN para poder ser ofertado y otorgar título. Se reporta al SNIES, OLE y SPADIES del Ministerio de Educación Nacional. Bajo el ACU-004-25 reformado, los Programas Académicos pasan a estar adscritos a Escuelas reformadas (sobre campos del conocimiento-saber) coordinados vía Facultades reformadas bajo VRF."
skos_scopeNote: "El concepto 'Programa Académico' tiene fuente nacional (Decreto MEN 1330/2019) más que estatutaria UDFJC: el ACU-004-25 NO redefine 'Programa', sino que lo articula a la nueva estructura Escuela-Facultad reformada. La operativa de creación-modificación-renovación de Programas sigue Decreto 1330. La distinción crítica con sentido coloquial: NO es 'asignatura' ni 'curso', sino la unidad mínima de oferta formativa con título terminal."
skos_example: "El Programa Académico de Ingeniería Eléctrica (pregrado profesional, 165 créditos, modalidad presencial, 10 semestres) está adscrito a la Escuela de Ingeniería Eléctrica reformada y coordinado por la Facultad reformada que cubre el campo de Formación. Reporta al SNIES con código institucional MEN."
skos_notation: "Programa"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad de oferta formativa con registro calificado MEN"
iso_differentia: "Conjunto coherente de actividades académicas conducente a título; requisitos de creditización Decreto 1330; reportable a SNIES/OLE/SPADIES; adscrito a Escuela bajo modelo ACU-004-25"
iso_subject_field: "Educación superior / Aseguramiento de la calidad / Registro calificado MEN"
iso_term_status: preferred
iso_standardized_by: "Decreto MEN 1330/2019 Arts. 2-3, 11-12; ACU-004-25 (articulación a Escuelas-Facultades reformadas)"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-decreto-1330-2019-men]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-decreto-1330-2019]]"
      adopter_locator: "Decreto MEN 1330/2019 Arts. 2-3 (definición programa) + Arts. 11-12 (créditos) + Art. 35 (renovación 7 años)"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2019-07-25"
      adoption_evidence: "Decreto 1330/2019 reglamenta el registro calificado y la definición de Programa Académico para todas las IES colombianas"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 68 (Programa Académico como unidad de Facultad)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 articula los Programas Académicos a la nueva estructura Facultad-Escuela reformada · adopción institucional del marco MEN"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: REGLAMENTARIO

  normative_source: "[[cita-decreto-1330-2019-men]]"
  normative_locator: "Decreto MEN 1330/2019 + ACU-004-25 Art. 68"
  normative_text: "[Texto literal Decreto 1330 Arts. 2-3, 11-12, 35 + ACU Art. 68]"
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates:
    - "Decreto MEN 1295/2010 (definición previa de programa)"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "programa_academico"
  ddd_aggregate_root: "ProgramaAcademico"
  ddd_bc_ref: "[[bc-programacion-academica-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio Programación Académica. Adscrito a Escuela; coordinado vía Facultad."
  ddd_invariants:
    - "Tiene registro calificado vigente para ofertarse"
    - "Adscrito a UNA Escuela como anclaje primario"
    - "Suma créditos según Decreto 1330: pregrado profesional ≥144 cr; tecnológico ≥96 cr; técnico profesional ≥60 cr"
    - "Renovación de registro calificado cada 7 años (Decreto 1330 Art. 35)"
    - "Reporta al SNIES, OLE, SPADIES"
  ddd_ubiquitous_terms:
    - "Programa Académico"
    - "Proyecto Curricular"
    - "Registro Calificado"
    - "Crédito Académico"
    - "Modalidad (presencial/virtual/dual)"
    - "SACES · CONACES"

concepto_definitional_anchors:
  - "[[def-norm-decreto-1330-2019-2019-07-25]]"
  - "[[def-norm-acu-004-25-art-68-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-68-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-decreto-1330-2019]]"
  - "[[con-acu-004-25]]"
  - "[[con-credito-academico]]"
  - "[[con-area-formacion]]"

applicable_domain: "Programas UDFJC vigentes desde 2019-07-25 (Decreto 1330) en transición a estructura ACU-004-25"
assumptions: ["El Decreto MEN 1330 sigue vigente como marco de registro calificado"]
breaks_at: ["Si MEN reforma con marco distinto (eventual nuevo Decreto)"]

valid_from: "2019-07-25"
valid_to: ""
rol_seleccionado: docente-disenador


tupla__relations:
  - rel_id: rel-programa-defined-by-decreto1330
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[decreto1330_2019]]"
    rel_frame: normativo
  - rel_id: rel-programa-articulado-acu00425
    rel_nombre: norm_complements
    rel_direccion: co
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "ACU-004-25 articula Programas a Escuelas reformadas y Facultades reformadas"
  - rel_id: rel-programa-adscrito-escuela
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-escuela]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 5

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - programa-academico
  - decreto-1330
  - snies
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Programa Académico (Decreto MEN 1330/2019 + ACU-004-25 articulación)

## Definición operativa

Conjunto coherente y planificado de actividades académicas (cursos, prácticas, investigación formativa, electivas) **conducente a un título** profesional, técnico, tecnológico o de posgrado. Adscrito a una **Escuela** de la UDFJC. Requiere créditos académicos según Decreto 1330/2019. Debe contar con **registro calificado MEN** para ofertarse. Reporta al SNIES, OLE y SPADIES.

## Fuente primaria

> **Decreto MEN 1330/2019 Arts. 2-3, 11-12** (marco nacional). **ACU-004-25** articula Programas a Escuelas-Facultades reformadas (sin redefinir el concepto base).

## Invariantes operativas DDD

1. **Registro calificado vigente** para ofertarse.
2. Adscrito a **UNA Escuela** como anclaje primario.
3. Cumple **suma de créditos** según nivel (pregrado profesional ≥ 144 cr).
4. **Renovación cada 7 años** (Decreto 1330 Art. 35).
5. Reporta a **SNIES, OLE, SPADIES**.

## Lenguaje ubicuo asociado

Programa Académico · Proyecto Curricular · Registro Calificado · Crédito Académico · Modalidad · SACES · CONACES.

## Notas de aplicación

- **Diferencia con Escuela**: la Escuela es la **unidad organizativa** (con Director, Consejo); el Programa es la **oferta formativa** que la Escuela ofrece. Una Escuela contiene N Programas.
- Bajo ACU-004-25, los Programas pasan progresivamente a adscribirse a Escuelas reformadas (estructura Escuela-CABA) coordinados vía Facultad reformada bajo VRF.
