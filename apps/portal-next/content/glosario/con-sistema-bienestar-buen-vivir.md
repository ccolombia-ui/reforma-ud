---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:sistema-bienestar-buen-vivir
kd_title: "Sistema de Bienestar y Buen Vivir UDFJC (Arts. 88-90 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Sistema de Bienestar y Buen Vivir UDFJC"

skos_prefLabel: "Sistema de Bienestar y Buen Vivir"
skos_altLabel: ["SBBV UDFJC", "Wellbeing & Good Living System", "Sistema de Bienestar Universitario reformado"]
skos_hiddenLabel: ["sistema-bienestar", "bienestar-buen-vivir"]
skos_definition: "Articulación institucional UDFJC que materializa el principio Buen Vivir (Art. 5a) en programas, servicios y actividades dirigidas al desarrollo integral de la Comunidad Universitaria. Incorpora explícitamente la dimensión de Buen Vivir como categoría rectora — diferenciándolo del modelo previo de 'Bienestar Universitario' del Acuerdo 003/1997 que se enfocaba en servicios asistenciales (salud, deporte, cultura). El nuevo modelo es relacional: bienestar entendido como armonía comunidad-naturaleza-cultura, no acumulación de servicios. Pendiente desarrollo en Estatuto de Bienestar y Buen Vivir (Art. 98 §7, plazo 2027-05-05)."
skos_scopeNote: "El sistema NO sustituye programas asistenciales (que se mantienen) — los reorienta hacia el principio Buen Vivir. La denominación 'Bienestar Y Buen Vivir' refleja la coexistencia de dimensiones individuales (bienestar) y colectivas-relacionales (buen vivir)."
skos_example: "Programa de salud mental que articula apoyo psicológico individual + comunidades de apoyo entre pares + diálogos comunitarios sobre carga académica + propuestas de reformas curriculares para reducir presiones sistémicas."
skos_notation: "SBBV"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema institucional articulado de Bienestar Universitario reformado"
iso_differentia: "Incorpora dimensión relacional Buen Vivir (Art. 5a); reorienta programas asistenciales hacia armonía comunidad-naturaleza-cultura"
iso_subject_field: "Bienestar universitario reformado / Política institucional UDFJC"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 88-90; pendiente Estatuto de Bienestar Art. 98 §7"

align_schema_type: Organization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NORMATIVE, NEON]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 88-90; pendiente Estatuto de Bienestar Art. 98 §7"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda actividad de bienestar universitario UDFJC"
  norm_supersedes: "Sistema de Bienestar Universitario del Acuerdo 003/1997 (sin componente Buen Vivir)"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[con-buen-vivir]] (cosmovisiones andinas + Const. Ecuador 2008/Bolivia 2009 + literatura crítica) + tradición Bienestar Universitario CO"
  neon_alignment_confidence: 0.85
  neon_methodological_notes: "Fusión de tradición de Bienestar Universitario colombiano + concepto Buen Vivir andino"

applicable_domain: "UDFJC desde 2025-05-06; desarrollo pleno pendiente Estatuto Bienestar"
assumptions: ["El Estatuto de Bienestar Art. 98 §7 se expedirá en plazo legal"]
breaks_at: []
extends_to: "[[con-buen-vivir]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Organization

tupla__relations:
  - rel_id: rel-sbbv-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-sbbv-operacionaliza-buen-vivir
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-buen-vivir]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El SBBV es la operacionalización institucional del principio Buen Vivir"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, sistema-bienestar-buen-vivir, sbbv, arts-88-90, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Sistema de Bienestar y Buen Vivir (Arts. 88-90 ACU-004-25)

## Definición operativa

Articulación institucional UDFJC que **materializa el principio Buen Vivir (Art. 5a)** en programas, servicios y actividades dirigidas al desarrollo integral de la Comunidad Universitaria. Reorienta el modelo previo de 'Bienestar Universitario' (servicios asistenciales) hacia un modelo relacional (armonía comunidad-naturaleza-cultura).

## Doble dimensión

| Bienestar (individual) | Buen Vivir (colectivo-relacional) |
|---|---|
| Servicios asistenciales (salud, deporte, cultura) | Armonía comunidad-naturaleza-cultura |
| Atención individual | Comunidades de apoyo + diálogos colectivos |
| Modelo 003/1997 | Modelo refundacional ACU-004-25 |

## Fuente primaria

> Arts. 88-90 ACU-004-25; pendiente desarrollo en **Estatuto de Bienestar y Buen Vivir** (Art. 98 §7, plazo 2027-05-05).

## Notas de aplicación

- **NO sustituye** programas asistenciales — los reorienta.
- **Coexistencia**: durante transición conviven el modelo 003/1997 y el nuevo modelo Buen Vivir.
