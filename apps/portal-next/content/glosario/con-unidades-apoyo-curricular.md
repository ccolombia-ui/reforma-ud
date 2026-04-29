---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:unidades-apoyo-curricular
kd_title: "Unidades de Apoyo a la Gestión Curricular UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Unidades de Apoyo a la Gestión Curricular UDFJC"
tupla_descripcion: "Sub-unidades operativas internas de Facultad UDFJC que apoyan la gestión curricular de programas y áreas · soporte pedagógico, evaluación y articulación curricular"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Unidades de Apoyo a la Gestión Curricular"
skos_altLabel: ["Unidades de Apoyo Curricular", "UAC", "Curricular Management Support Units"]

skos_definition: "Sub-unidades operativas internas de las Facultades UDFJC declaradas en el **Art. 65 del ACU-004-25** como componente obligatorio de la estructura facultativa. Apoyan la **gestión curricular** de los Programas Académicos y Áreas de Formación: diseño curricular, evaluación pedagógica, prácticas profesionales, movilidad académica, articulación pregrado-posgrado, evaluación docente, certificación y acreditación de programas. Su composición específica se desarrolla en el Estatuto Académico nuevo (Art. 98 §1). Pueden incluir: Comité Curricular, Coordinación de Prácticas, Coordinación de Movilidad, Comité de Autoevaluación, Comité de Investigación-Creación facultativa, según necesidades de cada Facultad."
skos_scopeNote: "UAC son ESPECIALIZACIONES OPERATIVAS de la Facultad — no órganos de gobierno (esos son Decanatura + Consejo de Facultad). Su rol es soporte técnico-pedagógico para que los programas operen con coherencia curricular. Pueden ser permanentes o temporales según ciclo de los programas. Articuladas con CIDC (investigación) cuando aplique."
skos_example: "Un Comité Curricular de Facultad de Ingeniería que articula 3 Áreas de Formación + 12 programas y se reúne mensualmente para revisar planes de estudio, evaluar Paquetes CCA y proponer ajustes al Consejo de Facultad."
skos_notation: "UAC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sub-unidades operativas internas de Facultad universitaria"
iso_differentia: "Soporte técnico-pedagógico a la gestión curricular · obligatorio Art. 65 estructura facultativa · composición específica desarrollada en Estatuto Académico"
iso_subject_field: "Gestión curricular universitaria · Soporte pedagógico facultativo"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 65"

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
      adopter_locator: "ACU-004-25 Art. 65"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara UAC como componente obligatorio de estructura facultativa"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 65"
  normative_text: "Estructura de Facultades: ... Unidades de apoyo a la gestión curricular ..."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "unidades_apoyo_curricular"
  ddd_term: "Unidades de Apoyo a la Gestión Curricular"
  ddd_aggregate_root: "UnidadesApoyoCurricular"
  ddd_article_ref: "Art. 65"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: DOMAIN_SERVICE
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-decanatura]]"
    - "[[con-consejo-facultad]]"
  ddd_invariants:
    - "Cada Facultad debe tener UAC (Art. 65) · número y composición específica varía"
    - "UAC son sub-unidades operativas · NO órganos de gobierno"
    - "Composición y funciones se desarrollan en Estatuto Académico Art. 98 §1"
    - "Articuladas con Áreas de Formación + Programas Académicos · soporte transversal"
  ddd_ubiquitous_terms:
    - "UAC"
    - "Comité Curricular"
    - "Coordinación de Prácticas"
    - "Comité de Autoevaluación"
    - "Soporte pedagógico facultativo"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-65-uac-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-65-uac-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-facultad]]"
  - "[[con-area-formacion]]"

applicable_domain: "Toda Facultad UDFJC para soporte técnico-pedagógico curricular"
assumptions: ["Composición se desarrollará en Estatuto Académico"]
breaks_at: ["Si una Facultad opera sin UAC"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-disenador


tupla__relations:
  - rel_id: rel-uac-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "UAC declaradas Art. 65 ACU-004-25"
  - rel_id: rel-uac-componente-facultad
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Componente obligatorio estructura facultativa"
  - rel_id: rel-uac-soporta-areas
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-area-formacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "UAC apoyan transversalmente la gestión curricular de Áreas de Formación"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, unidades-apoyo-curricular, art-65, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Unidades de Apoyo a la Gestión Curricular

> [!note]+ Soporte técnico-pedagógico facultativo
> Las **UAC** son sub-unidades operativas de Facultad que apoyan la gestión curricular · Comité Curricular, Coordinación de Prácticas, Comité de Autoevaluación, etc.

---

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Sub-unidades operativas internas de las Facultades UDFJC declaradas en el **Art. 65 del ACU-004-25** como componente obligatorio de la estructura facultativa. Apoyan la **gestión curricular** de los Programas Académicos y Áreas de Formación: diseño curricular, evaluación pedagógica, prácticas profesionales, movilidad académica, articulación pregrado-posgrado, evaluación docente, certificación y acreditación de programas. Su composición específica se desarrolla en el Estatuto Académico nuevo (Art

## §2 · Anclaje + cadena


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · DDD invariantes


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · Relaciones tipadas


<div class="dv-block" data-dv="obsidian-only"></div>


## §10 · Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo C. UAC como soporte técnico-pedagógico facultativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-unidades-apoyo-curricular` v1.0.0*
