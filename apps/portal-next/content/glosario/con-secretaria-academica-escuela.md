---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:secretaria-academica-escuela
kd_title: "Secretaría Académica de Escuela UDFJC (Art. 70 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Secretaría Académica de Escuela UDFJC"
tupla_descripcion: "Dependencia administrativa interna de cada Escuela UDFJC declarada en Art. 70 · soporte técnico-documental al Director y Consejo de Escuela"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Secretaría Académica de Escuela"
skos_altLabel: ["SAE", "School Academic Secretariat"]

skos_definition: "Dependencia administrativa interna obligatoria de cada Escuela UDFJC declarada en el **Art. 70 del ACU-004-25** como componente estructural de Escuela. Es el **soporte técnico-documental** del Director(a) de Escuela y del Consejo de Escuela: gestiona expedientes docentes, registros de adscripción a CABAs, actas del Consejo, articulación documental con Secretaría General SISGRAL, certificación de productividad académica de docentes, soporte a procesos electorales internos de Escuela. Su titular —el(la) Secretario(a) Académico(a) de Escuela— actúa como secretario(a) del Consejo de Escuela."
skos_scopeNote: "Cada Escuela UDFJC tiene su propia Secretaría Académica · son N secretarías por escuela paralelas. NO confundir con Secretaría Académica de Facultad (ámbito facultativo de programas) ni con Secretaría General SISGRAL (institucional). La SAE focaliza en docentes adscritos y CABAs de la Escuela."
skos_example: "Cuando un docente solicita certificación de su productividad académica, registro de adscripción a CABA, o evaluación docente, la SAE lo procesa y articula con SISGRAL si requiere fe pública institucional."
skos_notation: "SAE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia administrativa interna de Escuela universitaria"
iso_differentia: "Soporte técnico-documental obligatorio en estructura de Escuela · secretario del Consejo de Escuela · articulada con SISGRAL"
iso_subject_field: "Gestión documental académica de Escuela · Soporte administrativo universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 70"

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
      adopter_locator: "ACU-004-25 Art. 70"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara Secretaría Académica como componente obligatorio de Escuela"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 70"
  normative_text: "Estructura de Escuelas: ... Una secretaría académica."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "secretaria_academica_escuela"
  ddd_term: "Secretaría Académica de Escuela"
  ddd_aggregate_root: "SecretariaAcademicaEscuela"
  ddd_article_ref: "Art. 70"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: ENTITY
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-director-escuela]]"
  ddd_invariants:
    - "Cada Escuela debe tener UNA Secretaría Académica (Art. 70)"
    - "Soporta documental y jurídicamente al Director y Consejo de Escuela"
    - "Articulada con Secretaría General SISGRAL para fe pública institucional"
  ddd_ubiquitous_terms:
    - "Secretaría Académica · SAE"
    - "Soporte técnico-documental de Escuela"
    - "Registro de adscripción CABAs"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-70-sae-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-70-sae-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-escuela]]"
  - "[[con-director-escuela]]"

applicable_domain: "Toda Escuela UDFJC"
assumptions: ["Estatuto Académico Art. 98 §1 desarrollará funciones específicas"]
breaks_at: ["Si una Escuela opera sin Secretaría Académica"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-sae-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "SAE declarada Art. 70 ACU-004-25"
  - rel_id: rel-sae-componente-escuela
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-escuela]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Componente obligatorio estructura de Escuela"
  - rel_id: rel-sae-articula-sisgral
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-secretaria-general-sisgral]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Articulación documental con SISGRAL central"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, secretaria-academica-escuela, art-70, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Secretaría Académica de Escuela

> [!note]+ Soporte técnico-documental de Escuela
> Cada Escuela UDFJC tiene su Secretaría Académica · soporte al Director y Consejo de Escuela · articulada con SISGRAL.

---

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Dependencia administrativa interna obligatoria de cada Escuela UDFJC declarada en el **Art. 70 del ACU-004-25** como componente estructural de Escuela. Es el **soporte técnico-documental** del Director(a) de Escuela y del Consejo de Escuela: gestiona expedientes docentes, registros de adscripción a CABAs, actas del Consejo, articulación documental con Secretaría General SISGRAL, certificación de productividad académica de docentes, soporte a procesos electorales internos de Escuela. Su titular —

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo D. SAE como soporte técnico-documental de Escuela. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-secretaria-academica-escuela` v1.0.0*
