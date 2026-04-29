---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vicerrectoria-formacion
kd_title: "Vicerrectoría de Formación UDFJC (Art. 61 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Vicerrectoría de Formación UDFJC"

skos_prefLabel: "Vicerrectoría de Formación"
skos_altLabel: ["VRF", "Vicerrectoría Académica reformada", "Vice-Rectorate of Education"]
skos_definition: "Dependencia institucional UDFJC responsable de liderar el campo de Formación (PM1) y coordinar las Facultades. Sustituye a la previa Vicerrectoría Académica del Acuerdo 003/1997, reorientándola hacia el campo de Formación reformado (Art. 7a). Define políticas curriculares, articula la oferta de Programas Académicos, supervisa la calidad pedagógica y coordina la transición de la oferta formativa al nuevo modelo Escuelas-CABAs. Su titular es el(la) Vicerrector(a) de Formación, miembro del CACAD."
skos_scopeNote: "La VRF es ejecutiva (no deliberativa). Sus actos son Resoluciones de la Vicerrectoría que operacionalizan políticas del CACAD/CSU. Articula la coordinación entre Facultades, sin invadir competencias de Decanos ni Directores de Escuela."
skos_example: "Coordinar la actualización curricular del cohorte de Programas Académicos 2026 alineada con el ACU-004-25; supervisar el avance del nuevo Estatuto Académico (Art. 98 §1)."
skos_notation: "VRF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Vicerrectoría temática del campo de Formación universitaria"
iso_differentia: "Coordina Facultades; lidera campo de Formación PM1; sustituye antigua Vicerrectoría Académica del Acuerdo 003/1997"
iso_subject_field: "Gobernanza académica universitaria / Política curricular institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 61"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 61 (Vicerrectoría de Formación)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 reforma la Vicerrectoría Académica 1997 hacia Vicerrectoría de Formación con campo PM1 explícito"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 61"
  normative_text: "[Texto literal Art. 61 · VRF coordina Facultades · campo de Formación PM1]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: ["Vicerrectoría Académica del Acuerdo 003/1997"]
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "vicerrectoria_formacion"
  ddd_aggregate_root: "VicerrectoriaFormacion"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio Formación-Docencia (PM1). Coordina Facultades."
  ddd_invariants:
    - "Su titular es miembro del CACAD"
    - "Coordina Facultades sin invadir competencia de Decanos"
    - "Ejecuta políticas curriculares del CACAD"
  ddd_ubiquitous_terms:
    - "VRF"
    - "Campo de Formación"
    - "Coordinación de Facultades"
    - "Política curricular"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-61-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-61-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-funciones-misionales]]"

applicable_domain: "UDFJC desde 2025-05-06; campo PM1 Formación-Docencia"
assumptions: ["Las Facultades coexisten en transición hacia estructura Escuelas plenas"]
breaks_at: ["Si excede competencias coordinando, invadiendo decanaturas"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-disenador


tupla__relations:
  - rel_id: rel-vrf-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-vrf-coordina-facultades
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-facultad]]"
    rel_frame: skos
  - rel_id: rel-vrf-pm1
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "VRF lidera PM1 Formación"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - vicerrectoria-formacion
  - vrf
  - art-61
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Vicerrectoría de Formación (Art. 61 ACU-004-25)

## Definición operativa

Dependencia institucional UDFJC responsable de **liderar el campo de Formación (PM1)** y **coordinar las Facultades**. Sustituye a la previa Vicerrectoría Académica del Acuerdo 003/1997, reorientándola hacia el campo de Formación reformado (Art. 7a). Su titular es miembro del CACAD.

## Funciones principales

- Definir políticas curriculares
- Articular la oferta de Programas Académicos
- Supervisar calidad pedagógica
- Coordinar transición de oferta formativa al nuevo modelo Escuelas-CABAs

## Fuente primaria

> Art. 61 ACU-004-25.

## Invariantes operativas DDD

1. Su titular es **miembro del CACAD**.
2. **Coordina** Facultades sin invadir competencia de Decanos.
3. **Ejecuta** políticas curriculares del CACAD.

## Lenguaje ubicuo asociado

VRF · Campo de Formación · Coordinación de Facultades · Política curricular.
