---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-centro
kd_title: "Consejo de Centro UDFJC (Arts. 18h, 79 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Consejo de Centro UDFJC"
tupla_descripcion: "Órgano de gobierno colegiado del Centro UDFJC declarado en Arts. 18h + 79 · presidido por la Dirección de Centro · deliberación de actividades de contextos-extensión y proyección social"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Consejo de Centro"
skos_altLabel: ["CC", "Center Council"]

skos_definition: "Órgano de gobierno colegiado del Centro UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18h del ACU-004-25 y como componente obligatorio de estructura de Centro en el Art. 79. Presidido por la Dirección de Centro, articula deliberación entre docentes + equipo de soporte académico-administrativo + (eventualmente) representación territorial. Sus decisiones afectan la operación del Centro como **unidad académico-administrativa de contextos-extensión y proyección social** (Art. 78). Composición específica desarrollada en Estatuto de Contextos-Extensión y Proyección Social nuevo (Art. 98 §5)."
skos_scopeNote: "Cada Centro UDFJC tiene su propio Consejo. Se diferencia de Consejo de Instituto por la naturaleza de extensión-territorial del Centro (vs investigación-transdisciplinaria del Instituto). Articulado con la Oficina de Egresados (Art. 82) y con la Vicerrectoría de Contextos-Extensión."
skos_example: "Cuando un Centro debe decidir convenios con territorio, articulación con redes de extensión, programas de proyección social, lo decide el Consejo de Centro presidido por la Dirección."
skos_notation: "CC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Centro"
iso_differentia: "Presidido por Dirección de Centro · deliberación de extensión-proyección social · obligatorio Art. 79 · articulado con Oficina de Egresados"
iso_subject_field: "Gobernanza de extensión universitaria · Proyección social · Contextos territoriales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18h + 79"

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
      adopter_locator: "ACU-004-25 Arts. 18h + 79"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Consejo de Centro como órgano de gobierno + componente estructural"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18h + 79"
  normative_text: "Órganos del Gobierno: h) Los Consejos de Centro (Art. 18h). Estructura de Centros: Dirección, consejo de centro y equipo de soporte académico y administrativo (Art. 79)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_centro"
  ddd_term: "Consejo de Centro"
  ddd_aggregate_root: "ConsejoCentro"
  ddd_article_ref: "Arts. 18h + 79"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-direccion-centro]]"
  ddd_invariants:
    - "Cada Centro UDFJC debe tener UN Consejo (Art. 79)"
    - "Presidido por Dirección de Centro"
    - "Composición específica desarrollada en Estatuto Extensión Art. 98 §5"
    - "Articulado con Oficina de Egresados (Art. 82)"
  ddd_ubiquitous_terms:
    - "Consejo de Centro · CC"
    - "Deliberación de extensión-proyección social"
    - "Articulación territorial"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-79-cc-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-79-cc-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-centro]]"
  - "[[con-direccion-centro]]"

applicable_domain: "Todo Centro UDFJC desde 2025-05-06"
assumptions: ["Composición específica en Estatuto Extensión Art. 98 §5"]
breaks_at: ["Si un Centro opera sin Consejo (incumple Art. 79)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-cc-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Consejo de Centro declarado Arts. 18h + 79"
  - rel_id: rel-cc-presidido-direccion
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-direccion-centro]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Presidido por Dirección de Centro"
  - rel_id: rel-cc-componente-centro
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-centro]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Componente obligatorio estructura de Centro"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-centro, art-18h, art-79, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Consejo de Centro

> [!note]+ Órgano colegiado de Centro · deliberación extensión-territorio
> El **Consejo de Centro** delibera sobre contextos-extensión y proyección social.

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Órgano de gobierno colegiado del Centro UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18h del ACU-004-25 y como componente obligatorio de estructura de Centro en el Art. 79. Presidido por la Dirección de Centro, articula deliberación entre docentes + equipo de soporte académico-administrativo + (eventualmente) representación territorial. Sus decisiones afectan la operación del Centro como **unidad académico-administrativa de contextos-extensión y proyección social** (Art.

## §2 · Anclaje


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · DDD


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · Relaciones


<div class="dv-block" data-dv="relations"></div>


## §10 · Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Consejo de Centro como órgano colegiado de extensión-territorio. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-centro` v1.0.0*
