---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-facultad
kd_title: "Consejo de Facultad UDFJC (Arts. 18d, 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Consejo de Facultad UDFJC"
tupla_descripcion: "Órgano de gobierno colegiado de la Facultad UDFJC declarado en Art. 18d + Art. 65 · presidido por la Decanatura · deliberación académica facultativa"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Consejo de Facultad"
skos_altLabel: ["CF UDFJC", "Faculty Council"]

skos_definition: "Órgano de gobierno colegiado de la Facultad UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18d del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Es el espacio deliberativo de discusión académica facultativa que articula representación de docentes, estudiantes, egresados y administración facultativa. Presidido por la Decanatura, propone políticas curriculares de la Facultad, evalúa programas académicos y articula las Áreas de Formación con el campo de Formación general (PM1). Sus decisiones se elevan al Consejo Académico (CACAD) cuando exceden competencias facultativas."
skos_scopeNote: "Cada Facultad UDFJC tiene su propio Consejo de Facultad — son N consejos paralelos coordinados por sus Decanaturas. NO confundir con el Consejo Académico (CACAD) que es nacional-institucional. La composición específica del Consejo de Facultad se desarrollará en el Estatuto Académico nuevo (Art. 98 §1 · vencido 2025-11-05)."
skos_example: "Cuando una Facultad debe decidir la modificación curricular de un programa o aprobación de un nuevo Paquete CCA, lo decide el Consejo de Facultad presidido por la Decanatura · si la decisión requiere modificación de plan de estudios, eleva al CACAD."
skos_notation: "CF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel facultativo"
iso_differentia: "Presidido por la Decanatura · deliberación académica facultativa · representación multi-estamento · obligatorio Art. 65 estructura facultativa"
iso_subject_field: "Gobernanza académica facultativa universitaria · Política curricular"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18d + 65"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Arts. 18d + 65"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Consejo de Facultad como órgano de gobierno + componente estructural de Facultad"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18d + 65"
  normative_text: "Órganos del Gobierno: d) Los Consejos de Facultad (Art. 18d). Estructura de Facultad: Una Decanatura, Un Consejo de Facultad, Áreas de formación... (Art. 65)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_facultad"
  ddd_term: "Consejo de Facultad"
  ddd_aggregate_root: "ConsejoFacultad"
  ddd_article_ref: "Arts. 18d + 65"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-decanatura]]"
  ddd_invariants:
    - "Cada Facultad UDFJC debe tener UN Consejo de Facultad (Art. 65)"
    - "El Consejo de Facultad es presidido por la Decanatura"
    - "Composición específica desarrollada en Estatuto Académico Art. 98 §1 (vencido 2025-11-05)"
    - "Decisiones que excedan competencias facultativas se elevan al CACAD"
  ddd_ubiquitous_terms:
    - "Consejo de Facultad · CF"
    - "Deliberación académica facultativa"
    - "Representación multi-estamento"
    - "Coordinación curricular"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-65-cf-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-65-cf-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-facultad]]"
  - "[[con-decanatura]]"

applicable_domain: "Toda Facultad UDFJC desde 2025-05-06"
assumptions: ["Composición se desarrollará en Estatuto Académico nuevo Art. 98 §1"]
breaks_at: ["Si una Facultad opera sin Consejo (incumple Art. 65)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-cf-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Consejo de Facultad declarado Arts. 18d + 65"
  - rel_id: rel-cf-presidido-decanatura
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-decanatura]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · Consejo de Facultad presidido por Decanatura"
  - rel_id: rel-cf-componente-facultad
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · Consejo de Facultad es componente obligatorio de la estructura facultativa"
  - rel_id: rel-cf-eleva-cacad
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Decisiones que excedan competencias facultativas se elevan al CACAD"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - consejo-facultad
  - art-18d
  - art-65
  - organo-gobierno
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Consejo de Facultad

> [!note]+ Órgano colegiado facultativo · presidido por Decanatura
> El **Consejo de Facultad** es el órgano deliberativo de gobierno facultativo. Presidido por la Decanatura · representación multi-estamento · coordinación curricular de Áreas.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición canónica

> Órgano de gobierno colegiado de la Facultad UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18d del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Es el espacio deliberativo de discusión académica facultativa que articula representación de docentes, estudiantes, egresados y administración facultativa. Presidido por la Decanatura, propone políticas curriculares de la Facultad, evalúa programas académicos y articula las Áreas de Formación

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · 🧩 Estructura DDD


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · 🤝 Relaciones tipadas


<div class="dv-block" data-dv="obsidian-only"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado Sprint 1A.6 Grupo C. Modela Consejo de Facultad como órgano colegiado del Gobierno Universitario presidido por Decanatura. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-facultad` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
