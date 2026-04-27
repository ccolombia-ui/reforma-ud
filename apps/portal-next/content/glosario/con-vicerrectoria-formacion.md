---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vicerrectoria-formacion
kd_title: "Vicerrectoría de Formación UDFJC (Art. 61 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04, sec-MI12-05]

tupla_tipo: DEFINITION
tupla_concepto: "Vicerrectoría de Formación UDFJC"

skos_prefLabel: "Vicerrectoría de Formación"
skos_altLabel: ["VRF", "Vicerrectoría Académica reformada", "Vice-Rectorate of Education"]
skos_hiddenLabel: ["vrf", "vicerrectoria-formacion", "vicerrectoria-academica"]
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

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 61"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Coordinación de Facultades + políticas curriculares"
  norm_supersedes: "Vicerrectoría Académica del Acuerdo 003/1997"

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

applicable_domain: "UDFJC desde 2025-05-06; campo PM1 Formación-Docencia"
assumptions: ["Las Facultades coexisten en transición hacia estructura Escuelas plenas"]
breaks_at: ["Si excede competencias coordinando, invadiendo decanaturas"]
extends_to: "[[con-facultad]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

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

tags: [glosario-universal, concepto-normativo, vicerrectoria-formacion, vrf, art-61, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
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
