---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:secretaria-academica-facultad
kd_title: "Secretaría Académica de Facultad UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Secretaría Académica de Facultad UDFJC"
tupla_descripcion: "Dependencia administrativa interna de cada Facultad UDFJC declarada en Art. 65 · soporte técnico-documental al Decanato y Consejo de Facultad"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Secretaría Académica de Facultad"
skos_altLabel: ["SAF", "Faculty Academic Secretariat"]

skos_definition: "Dependencia administrativa interna obligatoria de cada Facultad UDFJC declarada en el **Art. 65 del ACU-004-25** como componente estructural facultativo. Es el **soporte técnico-documental** del Decanato y del Consejo de Facultad: gestiona expedientes académicos, certificaciones, actas del Consejo de Facultad, registros de programas, articulación con SISGRAL central. Su titular —el(la) Secretario(a) Académico(a) de Facultad— actúa como secretario(a) del Consejo de Facultad. Articulada con la Secretaría General SISGRAL nacional para garantizar coherencia documental y trazabilidad jurídica."
skos_scopeNote: "Cada Facultad UDFJC tiene su propia Secretaría Académica · son N secretarías facultativas paralelas. NO confundir con Secretaría General SISGRAL (institucional · Arts. 40-42). La Secretaría Académica de Facultad opera bajo coordinación de la Decanatura y articulación documental con SISGRAL."
skos_example: "Cuando un estudiante solicita certificación académica, expediente o tránsito de programa, la Secretaría Académica de Facultad lo procesa y articula con SISGRAL si requiere fe pública institucional."
skos_notation: "SAF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia administrativa interna facultativa"
iso_differentia: "Soporte técnico-documental obligatorio en estructura de Facultad · secretario del Consejo de Facultad · articulada con SISGRAL"
iso_subject_field: "Gestión documental académica facultativa · Soporte administrativo universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 65"

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
      adopter_locator: "ACU-004-25 Art. 65"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Secretaría Académica como componente obligatorio de Facultad"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 65"
  normative_text: "Estructura de Facultades: ... Una secretaría académica."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "secretaria_academica_facultad"
  ddd_term: "Secretaría Académica de Facultad"
  ddd_aggregate_root: "SecretariaAcademicaFacultad"
  ddd_article_ref: "Art. 65"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: ENTITY
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-decanatura]]"
  ddd_invariants:
    - "Cada Facultad debe tener UNA Secretaría Académica (Art. 65)"
    - "Soporta documental + jurídicamente al Decanato y Consejo de Facultad"
    - "Articulada con Secretaría General SISGRAL nacional para fe pública institucional"
  ddd_ubiquitous_terms:
    - "Secretaría Académica · SAF"
    - "Soporte técnico-documental"
    - "Articulación con SISGRAL"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-65-saf-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-65-saf-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-facultad]]"
  - "[[con-decanatura]]"

applicable_domain: "Toda Facultad UDFJC"
assumptions: ["Estatuto Académico Art. 98 §1 desarrollará funciones específicas"]
breaks_at: ["Si una Facultad opera sin Secretaría Académica"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-saf-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "SAF declarada Art. 65 ACU-004-25"
  - rel_id: rel-saf-componente-facultad
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Componente obligatorio estructura facultativa"
  - rel_id: rel-saf-articula-sisgral
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-secretaria-general-sisgral]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Articulación documental con SISGRAL central para fe pública"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, secretaria-academica-facultad, art-65, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Secretaría Académica de Facultad

> [!note]+ Soporte técnico-documental facultativo
> Cada Facultad UDFJC tiene su Secretaría Académica · soporte al Decanato y Consejo de Facultad · articulada con SISGRAL central.

---

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Dependencia administrativa interna obligatoria de cada Facultad UDFJC declarada en el **Art. 65 del ACU-004-25** como componente estructural facultativo. Es el **soporte técnico-documental** del Decanato y del Consejo de Facultad: gestiona expedientes académicos, certificaciones, actas del Consejo de Facultad, registros de programas, articulación con SISGRAL central. Su titular —el(la) Secretario(a) Académico(a) de Facultad— actúa como secretario(a) del Consejo de Facultad. Articulada con la Sec

## §2 · Anclaje + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · DDD invariantes


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · Relaciones tipadas


<div class="dv-block" data-dv="relations"></div>


## §10 · Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo C. SAF como soporte técnico-documental facultativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-secretaria-academica-facultad` v1.0.0*
