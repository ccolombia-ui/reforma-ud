---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-estudiantil-universitario
kd_title: "Consejo Estudiantil Universitario UDFJC (Art. 53 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Consejo Estudiantil Universitario UDFJC"

skos_prefLabel: "Consejo Estudiantil Universitario"
skos_altLabel: ["CEU UDFJC", "Student Council UDFJC"]
skos_definition: "Máxima instancia de organización de los estudiantes UDFJC. Representa al estamento estudiantil ante los órganos institucionales (CSU, CACAD, AU, Consejos de Escuela). Coordina la participación estudiantil en procesos de reforma, elaboración de políticas académicas y gestión del bienestar estudiantil. Es órgano deliberativo-propositivo elegido democráticamente por los estudiantes activos."
skos_scopeNote: "Su composición específica, periodicidad de elecciones y reglamento operativo se regulan por reglamento estudiantil cuya expedición es parte del Plan de Implementación (Art. 98). NO es ejecutivo de la institución, sino órgano de representación gremial-académica del estamento estudiantil."
skos_example: "Coordinar la participación de los 40 representantes estudiantiles a la Asamblea Universitaria; emitir conceptos sobre reformas curriculares; convocar consultas estudiantiles."
skos_notation: "CEU"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de representación estudiantil universitaria"
iso_differentia: "Máxima organización del estamento estudiantil; deliberativo-propositivo; electo democráticamente por estudiantes activos"
iso_subject_field: "Gobernanza estudiantil universitaria / Representación gremial-académica"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 53"

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
      adopter_locator: "ACU-004-25 Art. 53 (Consejo Estudiantil Universitario)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza CEU como máxima organización del estamento estudiantil"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 53"
  normative_text: "[Texto literal Art. 53 · CEU como máxima instancia organización estudiantil]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_estudiantil"
  ddd_aggregate_root: "ConsejoEstudiantilUniversitario"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Representación Estudiantil. Coordina representantes en órganos institucionales."
  ddd_invariants:
    - "Solo estudiantes activos pueden ser miembros"
    - "Elección democrática por estudiantes"
    - "Función deliberativa-propositiva"
  ddd_ubiquitous_terms:
    - "Consejo Estudiantil · CEU"
    - "Representación estudiantil"
    - "Estudiantes activos"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-53-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-53-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-comunidad-universitaria]]"

applicable_domain: "UDFJC desde 2025-05-06"
assumptions: ["Existe reglamento estudiantil específico (Estatuto Estudiantil Art. 98 §3)"]
breaks_at: ["Si se conforma sin elección democrática estudiantil"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-ceu-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-ceu-representa-estudiantes
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-comunidad-universitaria]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - consejo-estudiantil
  - art-53
  - representacion-estudiantil
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Consejo Estudiantil Universitario (Art. 53 ACU-004-25)

## Definición operativa

Máxima instancia de organización de los estudiantes UDFJC. Representa al estamento estudiantil ante los órganos institucionales (CSU, CACAD, AU, Consejos de Escuela). Coordina participación estudiantil en reforma, políticas académicas y bienestar estudiantil.

## Fuente primaria

> Art. 53 ACU-004-25.

## Invariantes operativas DDD

1. Solo **estudiantes activos** pueden ser miembros.
2. **Elección democrática** por estudiantes.
3. Función **deliberativa-propositiva** (no ejecutiva).

## Lenguaje ubicuo asociado

CEU · Consejo Estudiantil · Representación estudiantil · Estudiantes activos.

## Notas de aplicación

- **Composición específica** se regula por reglamento estudiantil (Plan Implementación Art. 98).
- Coordina los **40 representantes estudiantiles** en la Asamblea Universitaria.
