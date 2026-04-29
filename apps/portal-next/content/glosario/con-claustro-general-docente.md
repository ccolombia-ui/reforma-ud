---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:claustro-general-docente
kd_title: "Claustro General Docente UDFJC (Art. 54 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Claustro General Docente UDFJC"

skos_prefLabel: "Claustro General Docente"
skos_altLabel: ["CGD UDFJC", "General Faculty Council", "Faculty Cloister"]
skos_definition: "Máxima instancia de participación docente para discutir y reflexionar sobre políticas académicas. Convocado por el rector(a). Sesiona mínimo una (1) vez al semestre. Está abierto a todos los docentes activos UDFJC. Función deliberativa-propositiva: emite conceptos sobre reformas docentes, políticas curriculares, evaluaciones académicas, y otras materias de interés del estamento docente. Sus conceptos son insumo para CACAD y CSU."
skos_scopeNote: "El Claustro General Docente es deliberativo (sesiones reflexivas) más que decisorio. Su periodicidad semestral asegura participación sostenida del estamento docente entre sesiones bianuales de la Asamblea Universitaria. NO sustituye al CACAD ni al CSU — los alimenta con insumos deliberados colectivamente."
skos_example: "Discutir la propuesta de Estatuto Docente nuevo (Art. 98 §2) en sesión semestral antes de su elevación al CSU."
skos_notation: "CGD"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de máxima participación deliberativa docente"
iso_differentia: "Sesiona semestralmente; convocado por rector(a); abierto a todos los docentes activos; función deliberativa-propositiva"
iso_subject_field: "Gobernanza docente universitaria / Participación estamento docente"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 54"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 54 (Claustro General Docente)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza CGD como máxima instancia deliberativa docente · sesiona mínimo 1 vez por semestre"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 54"
  normative_text: "[Texto literal Art. 54 · CGD convocado por rector · sesiona ≥ 1 vez/semestre]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "claustro_docente"
  ddd_aggregate_root: "ClaustroGeneralDocente"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio Participación Docente. Sesión = Entity con orden del día y conceptos."
  ddd_invariants:
    - "Sesiona mínimo 1 vez por semestre"
    - "Convocado por el rector(a)"
    - "Abierto a todos los docentes activos"
    - "Función deliberativa-propositiva, no ejecutiva"
  ddd_ubiquitous_terms:
    - "Claustro General Docente · CGD"
    - "Sesión semestral"
    - "Concepto deliberativo docente"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-54-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-54-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-comunidad-universitaria]]"

applicable_domain: "UDFJC desde 2025-05-06"
assumptions: ["Convocatoria rectoral oportuna garantiza periodicidad mínima"]
breaks_at: ["Si no se convoca al menos 1 sesión por semestre (incumplimiento Art. 54)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-formador


tupla__relations:
  - rel_id: rel-cgd-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-cgd-related-au
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-asamblea-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CGD = participación docente sostenida entre sesiones bianuales AU"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - claustro-docente
  - art-54
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Claustro General Docente (Art. 54 ACU-004-25)

## Definición operativa

Máxima instancia de participación docente para **discutir y reflexionar sobre políticas académicas**. Convocado por el rector(a). Sesiona **mínimo una (1) vez al semestre**. Abierto a todos los docentes activos UDFJC. Función deliberativa-propositiva — sus conceptos son insumo para CACAD y CSU.

## Fuente primaria

> Art. 54 ACU-004-25.

## Invariantes operativas DDD

1. Sesiona **mínimo 1 vez por semestre**.
2. **Convocado por el rector(a)**.
3. Abierto a **todos los docentes activos**.
4. Función **deliberativa-propositiva, no ejecutiva**.

## Lenguaje ubicuo asociado

Claustro General Docente · CGD · Sesión semestral · Concepto deliberativo docente.

## Notas de aplicación

- **Cuándo invocarlo**: para deliberar reformas docentes (Estatuto Docente nuevo Art. 98 §2), políticas curriculares, evaluaciones académicas.
- **Diferencia con AU**: AU bianual (105 miembros multi-estamento); CGD semestral (todos los docentes activos).
