---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:direccion-instituto
kd_title: "Dirección de Instituto UDFJC (Arts. 18k, 75-76 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Dirección de Instituto UDFJC"
tupla_descripcion: "Autoridad ejecutiva unipersonal del Instituto UDFJC declarada en Arts. 18k + 75-76 · designación por votación ponderada 50% docentes investigadores + 50% estudiantes · 4 años · sin reelección inmediata"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Dirección de Instituto"
skos_altLabel: ["Director(a) de Instituto", "Institute Director"]

skos_definition: "Autoridad ejecutiva unipersonal del Instituto UDFJC declarada como **órgano del Gobierno Universitario** en el Art. 18k del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Su titular —el(la) **Director(a) de Instituto**— es designado por **votación directa ponderada con composición distintiva**: 50% docentes investigadores + 50% estudiantes (Art. 76) · período **4 años · sin reelección inmediata** (Art. 83). Dirige las actividades de investigación-creación e innovación + divulgación interdisciplinarias y transdisciplinarias del Instituto. Adscrita a la Vicerrectoría de Investigación-Creación e Innovación (Art. 62)."
skos_scopeNote: "La Dirección de Instituto se diferencia de Director(a) de Escuela en el mecanismo de elección: Instituto tiene composición 50%-50% docentes investigadores-estudiantes (más participativa estudiantil) · Escuela tiene 70% votación docentes + 30% HV. La diferencia refleja la naturaleza del Instituto como espacio investigativo donde estudiantes son co-investigadores."
skos_example: "El proceso de designación de Director(a) de Instituto sigue el Art. 76: convocatoria + inscripción + votación 50% docentes investigadores + 50% estudiantes vinculados al Instituto + designación. Período 4 años · sin reelección inmediata."
skos_notation: "DI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Autoridad ejecutiva unipersonal universitaria a nivel de Instituto"
iso_differentia: "Designación 50% docentes investigadores + 50% estudiantes · período 4 años · sin reelección inmediata · adscrita a Vicerrectoría I+C+I"
iso_subject_field: "Gobernanza investigativa universitaria · Dirección de unidades transdisciplinares"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18k + 75-76 + 83"

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
      adopter_locator: "ACU-004-25 Arts. 18k + 75-76 + 83"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Dirección de Instituto con elección participativa estudiantil · invariante de no reelección Art. 83"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18k + 75-76 + 83"
  normative_text: "Art. 76 - Director de Instituto: Periodo 4 años · Mecanismo: Votación directa ponderada (50% docentes investigadores, 50% estudiantes). Sin reelección inmediata (Art. 83)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "direccion_instituto"
  ddd_term: "Dirección de Instituto"
  ddd_aggregate_root: "DireccionInstituto"
  ddd_article_ref: "Arts. 18k + 75-76 + 83"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
  ddd_invariants:
    - "Dirección de Instituto es autoridad UNIPERSONAL · un único titular en cada momento"
    - "Periodo 4 años · sin reelección inmediata (Art. 83)"
    - "Designación por votación 50% docentes investigadores + 50% estudiantes (composición participativa estudiantil distintiva)"
    - "Excepción transitoria Art. 107 · 2025-2027 designación rectoral"
  ddd_ubiquitous_terms:
    - "Dirección de Instituto · DI"
    - "Votación 50%-50%"
    - "Director(a) de Instituto"
    - "Período 4 años · no reelección inmediata"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-76-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-76-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-instituto]]"
  - "[[con-vicerrectoria-investigacion-creacion-innovacion]]"

applicable_domain: "Todo Instituto UDFJC desde 2025-05-06 con régimen transitorio Art. 107"
assumptions: ["Composición 50%-50% reconoce a estudiantes como co-investigadores"]
breaks_at: ["Si Director ejerce > 4 años continuos (Art. 83)", "Si designación post 2027-05-05 omite votación democrática"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-investigador-pasteur


tupla__relations:
  - rel_id: rel-di-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Dirección de Instituto declarada Arts. 18k + 75-76"
  - rel_id: rel-di-dirige-instituto
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-instituto]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Dirección de Instituto es autoridad ejecutiva del Instituto"
  - rel_id: rel-di-coordinada-vri
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Direcciones de Instituto coordinadas por Vicerrectoría I+C+I (Art. 62)"
  - rel_id: rel-di-miembro-cacad
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 31i · Director de Instituto representa al estamento en CACAD"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, direccion-instituto, art-76, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Dirección de Instituto

> [!note]+ Autoridad ejecutiva de Instituto · elección 50%-50% participativa
> La **Dirección de Instituto** se elige por votación 50% docentes investigadores + 50% estudiantes · 4 años · sin reelección inmediata. Composición participativa estudiantil distintiva (vs Escuelas).

---

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Autoridad ejecutiva unipersonal del Instituto UDFJC declarada como **órgano del Gobierno Universitario** en el Art. 18k del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Su titular —el(la) **Director(a) de Instituto**— es designado por **votación directa ponderada con composición distintiva**: 50% docentes investigadores + 50% estudiantes (Art. 76) · período **4 años · sin reelección inmediata** (Art. 83). Dirige las actividades de investigación-creación e in

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Dirección de Instituto con elección 50%-50% participativa estudiantil. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-direccion-instituto` v1.0.0 · CoP fundacional*
