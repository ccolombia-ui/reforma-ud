---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-participacion-universitaria
kd_title: "Consejo de Participación Universitaria UDFJC (Arts. 49-50 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "Consejo de Participación Universitaria"

skos_prefLabel: "Consejo de Participación Universitaria"
skos_altLabel: ["CPU UDFJC", "Consejo Participación", "Participation Council"]
skos_hiddenLabel: ["consejo-participacion"]
skos_definition: "Organismo colegiado que se ocupa de promover la cultura de la democracia participativa al interior de la UDFJC. Diseña y propone ante el CSU políticas de participación. Articula la participación entre los Estamentos y los órganos de gobierno (CSU, CACAD, Asamblea Universitaria). Funciona como puente operativo entre la deliberación bianual de la Asamblea y las decisiones cotidianas de los órganos de dirección, asegurando que la participación democrática NO se reduzca a sesiones esporádicas."
skos_scopeNote: "El Consejo de Participación complementa a la Asamblea Universitaria: mientras la AU sesiona cada 2 años, el Consejo opera de forma sostenida diseñando mecanismos de participación. Es órgano consultivo-propositivo (no ejecutivo)."
skos_example: "Diseñar el reglamento operativo de los Claustros, las metodologías de consulta a estudiantes sobre reformas curriculares, o los protocolos de presupuestos participativos (Art. 95)."
skos_notation: "CPU"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de gestión de la cultura democrática institucional"
iso_differentia: "Diseña y propone políticas de participación; articula AU con órganos de gobierno; función consultiva-propositiva sostenida"
iso_subject_field: "Gobernanza universitaria democrática / Participación institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 49-50"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.9
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 49-50"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Sus propuestas son insumo para CSU; no ejecutivo"
  norm_supersedes: "Concepto NUEVO en ACU-004-25"

concepto_facet_ddd:
  ddd_id: "consejo_participacion"
  ddd_aggregate_root: "ConsejoParticipacionUniversitaria"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Cultura Democrática. Articula AU con órganos ejecutivos."
  ddd_invariants:
    - "Función consultiva-propositiva, no ejecutiva"
    - "Sus propuestas se elevan al CSU"
    - "Articula entre AU bianual y deliberación cotidiana"
  ddd_ubiquitous_terms:
    - "Consejo de Participación · CPU"
    - "Cultura democrática"
    - "Política de participación"

applicable_domain: "UDFJC desde 2025-05-06"
assumptions: ["Sesiona con regularidad sostenida (no bianual como AU)"]
breaks_at: []
extends_to: "[[con-asamblea-universitaria]] · [[con-consejo-electoral]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-cpu-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-cpu-articula-au
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-asamblea-universitaria]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, consejo-participacion, arts-49-50, m00-base, concepto-nuevo, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Consejo de Participación Universitaria (Arts. 49-50 ACU-004-25)

## Definición operativa

Organismo colegiado que **promueve la cultura de la democracia participativa** al interior de la UDFJC. Diseña y propone ante el CSU políticas de participación. **Articula la participación** entre Estamentos y órganos de gobierno (CSU, CACAD, AU). Asegura que la participación democrática NO se reduzca a sesiones esporádicas (la AU sesiona cada 2 años; el CPU opera de forma sostenida).

## Fuente primaria

> Arts. 49-50 ACU-004-25.

## Invariantes operativas DDD

1. Función **consultiva-propositiva, NO ejecutiva**.
2. Sus propuestas se elevan al CSU.
3. Articula entre AU bianual y deliberación cotidiana.

## Lenguaje ubicuo asociado

Consejo de Participación · CPU · Cultura democrática · Política de participación.

## Notas de aplicación

- **Cuándo invocarlo**: para diseñar reglamento de Claustros, metodologías de consulta estudiantil, protocolos de presupuestos participativos.
- **Diferencia con AU**: AU sesiona cada 2 años (deliberación intensa); CPU opera sostenidamente (diseño cotidiano).
