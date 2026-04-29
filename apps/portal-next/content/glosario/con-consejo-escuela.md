---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-escuela
kd_title: "Consejo de Escuela UDFJC (Arts. 18f, 70 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Consejo de Escuela UDFJC"
tupla_descripcion: "Órgano de gobierno colegiado de la Escuela UDFJC declarado en Art. 18f + Art. 70 · presidido por la Dirección de Escuela · deliberación académica de la Escuela como unidad básica de adscripción docente por campo del conocimiento-saber"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Consejo de Escuela"
skos_altLabel: ["CE", "School Council"]

skos_definition: "Órgano de gobierno colegiado de la Escuela UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18f del ACU-004-25 y como componente obligatorio de la estructura de Escuela en el Art. 70. Presidido por la Dirección de Escuela, articula deliberación académica entre docentes adscritos (vía CABAs) + representación estudiantil + apoyo administrativo. Sus decisiones afectan la operación de la Escuela como **unidad académico-administrativa de adscripción docente por campo del conocimiento-saber** (Art. 69) — distinta de las Áreas de Formación que organizan currículo en Facultades. La composición específica se desarrollará en el Estatuto Académico nuevo (Art. 98 §1)."
skos_scopeNote: "Cada Escuela UDFJC tiene su propio Consejo de Escuela · son N consejos paralelos coordinados por sus Direcciones. NO confundir con Consejo de Facultad (que coordina Áreas de Formación) ni con Claustro de Escuelas (deliberativo agregado). El Consejo de Escuela articula CABAs específicas de su Escuela, donde residen los docentes."
skos_example: "Cuando una Escuela debe decidir adscripción docente a CABAs, evaluación de docentes, distribución de carga académica para Áreas de Formación servidas, o aprobación de proyectos de investigación-creación PM2, lo decide el Consejo de Escuela presidido por la Dirección."
skos_notation: "CE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Escuela"
iso_differentia: "Presidido por la Dirección de Escuela · deliberación académica de la Escuela como unidad de adscripción docente por campo conocimiento-saber · obligatorio Art. 70"
iso_subject_field: "Gobernanza académica universitaria · Coordinación docente · Campo del conocimiento-saber"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18f + 70"

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
      adopter_locator: "ACU-004-25 Arts. 18f + 70"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Consejo de Escuela como órgano de gobierno + componente estructural de Escuela"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18f + 70"
  normative_text: "Órganos del Gobierno: f) Los Consejos de Escuela (Art. 18f). Estructura de Escuelas: Una dirección, Un consejo de escuela, Un claustro de profesores, CABAs, Una secretaría académica (Art. 70)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_escuela"
  ddd_term: "Consejo de Escuela"
  ddd_aggregate_root: "ConsejoEscuela"
  ddd_article_ref: "Arts. 18f + 70"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-director-escuela]]"
  ddd_invariants:
    - "Cada Escuela UDFJC debe tener UN Consejo de Escuela (Art. 70)"
    - "El Consejo de Escuela es presidido por la Dirección de Escuela"
    - "Composición específica desarrollada en Estatuto Académico Art. 98 §1"
    - "Articula CABAs específicas de la Escuela respectiva"
    - "Decisiones que excedan competencias de Escuela se elevan al CACAD"
  ddd_ubiquitous_terms:
    - "Consejo de Escuela · CE"
    - "Deliberación académica de Escuela"
    - "Adscripción CABAs"
    - "Coordinación docente por campo"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-70-ce-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-70-ce-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-escuela]]"
  - "[[con-director-escuela]]"
  - "[[con-caba]]"

applicable_domain: "Toda Escuela UDFJC desde 2025-05-06"
assumptions: ["Composición específica desarrollada en Estatuto Académico Art. 98 §1"]
breaks_at: ["Si una Escuela opera sin Consejo (incumple Art. 70)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-ce-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Consejo de Escuela declarado Arts. 18f + 70"
  - rel_id: rel-ce-presidido-direccion
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-director-escuela]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 70 · Consejo presidido por Dirección de Escuela"
  - rel_id: rel-ce-componente-escuela
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-escuela]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 70 · Consejo es componente obligatorio de Escuela"
  - rel_id: rel-ce-articula-cabas
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-caba]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 70 · CABAs forman parte de la estructura de Escuela articulada por Consejo"
  - rel_id: rel-ce-eleva-cacad
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Decisiones que excedan competencias de Escuela se elevan al CACAD"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-escuela, art-18f, art-70, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Consejo de Escuela

> [!note]+ Órgano colegiado de Escuela · presidido por Dirección
> El **Consejo de Escuela** delibera sobre asuntos académicos de la Escuela como unidad de adscripción docente por campo del conocimiento-saber. Articula CABAs y campos.

---

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Órgano de gobierno colegiado de la Escuela UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18f del ACU-004-25 y como componente obligatorio de la estructura de Escuela en el Art. 70. Presidido por la Dirección de Escuela, articula deliberación académica entre docentes adscritos (vía CABAs) + representación estudiantil + apoyo administrativo. Sus decisiones afectan la operación de la Escuela como **unidad académico-administrativa de adscripción docente por campo del conocimi

## §2 · Anclaje + cadena


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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo D. Consejo de Escuela como órgano colegiado del Gobierno Universitario. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-escuela` v1.0.0 · CoP fundacional*
