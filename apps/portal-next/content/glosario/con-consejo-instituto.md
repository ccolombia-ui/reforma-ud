---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-instituto
kd_title: "Consejo de Instituto UDFJC (Arts. 18j, 75 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Consejo de Instituto UDFJC"
tupla_descripcion: "Órgano de gobierno colegiado del Instituto UDFJC declarado en Arts. 18j + 75 · presidido por la Dirección de Instituto · deliberación interdisciplinaria de investigación-creación e innovación"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Consejo de Instituto"
skos_altLabel: ["CI", "Institute Council"]

skos_definition: "Órgano de gobierno colegiado del Instituto UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18j del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Presidido por la Dirección de Instituto, articula deliberación entre docentes investigadores + estudiantes co-investigadores + equipo de soporte académico-administrativo. Sus decisiones afectan la operación del Instituto como **unidad académico-administrativa de investigación-creación e innovación interdisciplinarias y transdisciplinarias** (Art. 74). Composición específica desarrollada en Estatuto de Investigación-Creación e Innovación nuevo (Art. 98 §4)."
skos_scopeNote: "Cada Instituto UDFJC tiene su propio Consejo · son N consejos paralelos coordinados por sus Direcciones. Articulado con CIDC (Centro de Investigaciones y Desarrollo Científico) para coherencia investigativa institucional. Se diferencia de Consejo de Centro por la naturaleza investigativa-transdisciplinaria del Instituto (vs extensión-territorial del Centro)."
skos_example: "Cuando un Instituto debe decidir aprobación de un nuevo grupo de investigación, articulación con redes de innovación, distribución presupuestal de proyectos PM2, lo decide el Consejo de Instituto presidido por la Dirección."
skos_notation: "CI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Instituto"
iso_differentia: "Presidido por Dirección de Instituto · deliberación investigativa interdisciplinaria · obligatorio Art. 75 · articulación con CIDC"
iso_subject_field: "Gobernanza investigativa universitaria · Investigación-creación-innovación interdisciplinar"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18j + 75"

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
      adopter_locator: "ACU-004-25 Arts. 18j + 75"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Consejo de Instituto como órgano de gobierno + componente estructural"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18j + 75"
  normative_text: "Órganos del Gobierno: j) Los Consejos de Instituto (Art. 18j). Estructura de Institutos: Dirección, consejo de instituto y equipo de soporte académico y administrativo (Art. 75)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_instituto"
  ddd_term: "Consejo de Instituto"
  ddd_aggregate_root: "ConsejoInstituto"
  ddd_article_ref: "Arts. 18j + 75"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-direccion-instituto]]"
  ddd_invariants:
    - "Cada Instituto UDFJC debe tener UN Consejo (Art. 75)"
    - "Presidido por Dirección de Instituto"
    - "Composición específica desarrollada en Estatuto Investigación Art. 98 §4"
    - "Articulado con CIDC (institucional) para coherencia investigativa"
  ddd_ubiquitous_terms:
    - "Consejo de Instituto · CI"
    - "Deliberación investigativa transdisciplinar"
    - "Articulación con CIDC"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-75-ci-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-75-ci-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-instituto]]"
  - "[[con-direccion-instituto]]"

applicable_domain: "Todo Instituto UDFJC desde 2025-05-06"
assumptions: ["Composición específica en Estatuto Investigación Art. 98 §4"]
breaks_at: ["Si un Instituto opera sin Consejo (incumple Art. 75)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-investigador-pasteur


tupla__relations:
  - rel_id: rel-ci-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Consejo de Instituto declarado Arts. 18j + 75"
  - rel_id: rel-ci-presidido-direccion
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-direccion-instituto]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Presidido por Dirección de Instituto"
  - rel_id: rel-ci-componente-instituto
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-instituto]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Componente obligatorio estructura de Instituto"
  - rel_id: rel-ci-articula-cidc
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-cidc]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Articulado con CIDC para coherencia investigativa institucional"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-instituto, art-18j, art-75, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Consejo de Instituto

> [!note]+ Órgano colegiado de Instituto · deliberación investigativa
> El **Consejo de Instituto** delibera sobre investigación-creación e innovación interdisciplinaria. Articulado con CIDC institucional.

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Órgano de gobierno colegiado del Instituto UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18j del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Presidido por la Dirección de Instituto, articula deliberación entre docentes investigadores + estudiantes co-investigadores + equipo de soporte académico-administrativo. Sus decisiones afectan la operación del Instituto como **unidad académico-administrativa de investigación-creación e innovaci

## §2 · Anclaje


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · DDD


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · Relaciones


<div class="dv-block" data-dv="obsidian-only"></div>


## §10 · Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Consejo de Instituto como órgano colegiado investigativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-instituto` v1.0.0*
