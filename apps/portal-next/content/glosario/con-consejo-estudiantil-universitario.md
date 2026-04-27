---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-estudiantil-universitario
kd_title: "Consejo Estudiantil Universitario UDFJC (Art. 53 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "Consejo Estudiantil Universitario UDFJC"

skos_prefLabel: "Consejo Estudiantil Universitario"
skos_altLabel: ["CEU UDFJC", "Student Council UDFJC"]
skos_hiddenLabel: ["consejo-estudiantil"]
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

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 53"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Representación legítima del estamento estudiantil"

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

applicable_domain: "UDFJC desde 2025-05-06"
assumptions: ["Existe reglamento estudiantil específico"]
breaks_at: []
extends_to: "[[con-asamblea-universitaria]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

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

tags: [glosario-universal, concepto-normativo, consejo-estudiantil, art-53, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
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
