---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:direccion-centro
kd_title: "Dirección de Centro UDFJC (Arts. 18i, 79-80 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Dirección de Centro UDFJC"
tupla_descripcion: "Autoridad ejecutiva unipersonal del Centro UDFJC declarada en Arts. 18i + 79-80 · designación por votación directa de docentes · 4 años · sin reelección inmediata"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Dirección de Centro"
skos_altLabel: ["Director(a) de Centro", "Center Director"]

skos_definition: "Autoridad ejecutiva unipersonal del Centro UDFJC declarada como **órgano del Gobierno Universitario** en el Art. 18i del ACU-004-25 y como componente obligatorio de la estructura de Centro en el Art. 79. Su titular —el(la) **Director(a) de Centro**— es designado por **votación directa de docentes** del Centro (Art. 80) · período **4 años · sin reelección inmediata** (Art. 83). Dirige las actividades de **contextos-extensión y proyección social** del Centro. Adscrita a la Vicerrectoría de Contextos · Extensión y Proyección Social (Art. 63)."
skos_scopeNote: "La Dirección de Centro se diferencia de Director de Instituto en mecanismo electoral: Centro es votación directa solo de docentes (Art. 80) · Instituto es 50% docentes investigadores + 50% estudiantes (Art. 76). La diferencia refleja la naturaleza del Centro como espacio de contextos-extensión (donde estudiantes participan menos en gobernanza interna) vs Instituto como espacio investigativo participativo."
skos_example: "El proceso de designación de Director(a) de Centro sigue el Art. 80: convocatoria + inscripción + votación directa de docentes adscritos al Centro + designación. Período 4 años · sin reelección inmediata."
skos_notation: "DC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Autoridad ejecutiva unipersonal universitaria a nivel de Centro"
iso_differentia: "Designación por votación directa de docentes · período 4 años · sin reelección inmediata · adscrita a Vicerrectoría Contextos-Extensión"
iso_subject_field: "Gobernanza de extensión universitaria · Dirección de unidades territoriales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18i + 79-80 + 83"

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
      adopter_locator: "ACU-004-25 Arts. 18i + 79-80 + 83"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Dirección de Centro · invariante de no reelección inmediata Art. 83"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18i + 79-80 + 83"
  normative_text: "Art. 80 - Director de Centro: Periodo 4 años · Mecanismo: Votación directa de docentes. Sin reelección inmediata (Art. 83)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "direccion_centro"
  ddd_term: "Dirección de Centro"
  ddd_aggregate_root: "DireccionCentro"
  ddd_article_ref: "Arts. 18i + 79-80 + 83"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-vicerrectoria-contextos-extension]]"
  ddd_invariants:
    - "Dirección de Centro es autoridad UNIPERSONAL · un único titular en cada momento"
    - "Periodo 4 años · sin reelección inmediata (Art. 83)"
    - "Designación por votación directa de docentes adscritos al Centro"
    - "Excepción transitoria Art. 107 · 2025-2027 designación rectoral"
  ddd_ubiquitous_terms:
    - "Dirección de Centro · DC"
    - "Director(a) de Centro"
    - "Votación directa de docentes"
    - "Período 4 años · no reelección inmediata"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-80-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-80-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-centro]]"
  - "[[con-vicerrectoria-contextos-extension]]"

applicable_domain: "Todo Centro UDFJC desde 2025-05-06 con régimen transitorio Art. 107"
assumptions: ["Composición electoral solo docentes refleja naturaleza extensiva del Centro"]
breaks_at: ["Si Director ejerce > 4 años continuos (Art. 83)", "Si designación post 2027-05-05 omite votación democrática"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-dc-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Dirección de Centro declarada Arts. 18i + 79-80"
  - rel_id: rel-dc-dirige-centro
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-centro]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Dirección de Centro es autoridad ejecutiva del Centro"
  - rel_id: rel-dc-coordinada-vce
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-contextos-extension]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Direcciones de Centro coordinadas por Vicerrectoría Contextos-Extensión (Art. 63)"
  - rel_id: rel-dc-miembro-cacad
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 31j · Director de Centro representa al estamento en CACAD"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, direccion-centro, art-80, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Dirección de Centro

> [!note]+ Autoridad ejecutiva de Centro · votación directa docente
> La **Dirección de Centro** se elige por votación directa de docentes · 4 años · sin reelección inmediata. Coordina actividades de contextos-extensión y proyección social.

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Autoridad ejecutiva unipersonal del Centro UDFJC declarada como **órgano del Gobierno Universitario** en el Art. 18i del ACU-004-25 y como componente obligatorio de la estructura de Centro en el Art. 79. Su titular —el(la) **Director(a) de Centro**— es designado por **votación directa de docentes** del Centro (Art. 80) · período **4 años · sin reelección inmediata** (Art. 83). Dirige las actividades de **contextos-extensión y proyección social** del Centro. Adscrita a la Vicerrectoría de Context

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Dirección de Centro con votación directa docente. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-direccion-centro` v1.0.0*
