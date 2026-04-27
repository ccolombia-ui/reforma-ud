---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:claustro-escuelas
kd_title: "Claustro de Escuelas UDFJC (Art. 55 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "Claustro de Escuelas UDFJC"

skos_prefLabel: "Claustro de Escuelas"
skos_altLabel: ["Claustros de Escuela", "School Cloister", "CdE UDFJC"]
skos_hiddenLabel: ["claustro-escuelas"]
skos_definition: "Espacios de participación, discusión y reflexión crítica disciplinar, interdisciplinar y transdisciplinar, organizados en torno a uno o varios campos de conocimiento-saber, en el ámbito de cada Escuela UDFJC. Reúnen docentes, investigadores y estudiantes alrededor de su Escuela para deliberar políticas académicas específicas, líneas de investigación, productos de extensión territorial y articulación con CABAs. Son la materialización local del Claustro General Docente al nivel de la Escuela."
skos_scopeNote: "Los Claustros de Escuelas operan al nivel local (cada Escuela tiene el suyo) mientras el Claustro General Docente opera al nivel institucional. Ambos coexisten complementariamente. Los Claustros de Escuelas son el espacio natural para definir el campo del conocimiento-saber específico (Art. 59) que organiza cada Escuela."
skos_example: "Claustro de la Escuela de Física delibera el campo del conocimiento-saber de la Escuela (subtemas: electromagnetismo, mecánica cuántica, astrofísica), las líneas de investigación prioritarias, las CABAs activas, las políticas de admisión y graduación específicas."
skos_notation: "CdE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Espacio colegiado de participación deliberativa al nivel de la Escuela"
iso_differentia: "Reúne docentes-investigadores-estudiantes de UNA Escuela; deliberación disciplinar/interdisciplinar/transdisciplinar; vinculado al campo del conocimiento-saber específico"
iso_subject_field: "Gobernanza local de Escuela / Participación al nivel disciplinar"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 55"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 55"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Cada Escuela debe organizar su Claustro como parte de su gobernanza local"

concepto_facet_ddd:
  ddd_id: "claustro_escuelas"
  ddd_aggregate_root: "ClaustroDeEscuela"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Gobernanza Local de Escuela. Cada Escuela tiene su propio Claustro."
  ddd_invariants:
    - "Cada Escuela tiene UN Claustro propio"
    - "Reúne docentes-investigadores-estudiantes de la Escuela"
    - "Delibera sobre el campo del conocimiento-saber específico"
    - "Articula con CABAs transversales activas"
  ddd_ubiquitous_terms:
    - "Claustro de Escuela · CdE"
    - "Campo del conocimiento-saber"
    - "Articulación con CABAs"

applicable_domain: "Cada Escuela UDFJC desde 2025-05-06; los Claustros se constituyen progresivamente conforme se reorganizan las Escuelas (Período de Transición Art. 96)"
assumptions: ["Las Escuelas se constituyen formalmente durante el Período de Transición"]
breaks_at: ["Una Escuela sin Claustro propio incumple Art. 55"]
extends_to: "[[con-claustro-general-docente]] (instancia institucional)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-cde-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-cde-part-of-escuela
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-escuela]]"
    rel_frame: skos
  - rel_id: rel-cde-articula-caba
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-caba]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, claustro-escuelas, gobernanza-local, art-55, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Claustro de Escuelas (Art. 55 ACU-004-25)

## Definición operativa

Espacios de **participación, discusión y reflexión crítica disciplinar, interdisciplinar y transdisciplinar**, organizados en torno a uno o varios campos de conocimiento-saber, **en el ámbito de cada Escuela** UDFJC. Reúnen docentes, investigadores y estudiantes para deliberar:

- Políticas académicas específicas
- Líneas de investigación de la Escuela
- Productos de extensión territorial
- Articulación con CABAs transversales

## Fuente primaria

> Art. 55 ACU-004-25.

## Invariantes operativas DDD

1. **Cada Escuela tiene UN Claustro propio**.
2. Reúne **docentes-investigadores-estudiantes** de la Escuela.
3. Delibera sobre el **campo del conocimiento-saber** específico.
4. **Articula** con CABAs transversales activas.

## Lenguaje ubicuo asociado

Claustro de Escuela · CdE · Campo del conocimiento-saber · Articulación con CABAs.

## Notas de aplicación

- **Diferencia con CGD**: CGD opera al nivel institucional; CdE opera al nivel local de cada Escuela. Coexisten complementariamente.
- **Conexión con Campo (Art. 59)**: el Claustro es el espacio natural para definir colectivamente el campo del conocimiento-saber específico de la Escuela.
