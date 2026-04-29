---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:programa-pregrado-posgrado
kd_title: "Programas Académicos de Pregrado y Posgrado UDFJC (Art. 68 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Programas Académicos de Pregrado y Posgrado UDFJC"
tupla_descripcion: "Distinción tipológica de Programas Académicos UDFJC declarada en Art. 68 · pregrado (técnico, tecnológico, profesional universitario) + posgrado (especialización, maestría, doctorado) · adscritos a Áreas de Formación de Facultad"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Programas de Pregrado y Posgrado"
skos_altLabel:
  - "Programas Pregrado/Posgrado"
  - "Undergraduate and Graduate Programs"

skos_definition: "Distinción tipológica de los Programas Académicos UDFJC declarada en el **Art. 68 del ACU-004-25** que diferencia: (i) **Pregrado** — programas de formación inicial conducentes a títulos de Técnico Profesional, Tecnólogo o Profesional Universitario (Decreto MEN 1330/2019); (ii) **Posgrado** — programas de formación avanzada conducentes a títulos de Especialista, Magíster o Doctor. Ambos niveles operan como **unidades académico-administrativas de la facultad** (Art. 68) adscritos a Áreas de Formación específicas (Art. 65). La articulación pregrado-posgrado dentro de un Área de Formación es **invariante de coherencia curricular** del modelo post-reforma. Cada programa requiere registro calificado MEN bajo Decreto 1330/2019 (acto vinculante) y está sometido a renovación cada 7 años (Art. 35 Decreto 1330)."
skos_scopeNote: "La distinción pregrado/posgrado NO crea dos conceptos paralelos · es una tipología del concepto Programa Académico (Art. 68). Las diferencias operativas son: créditos académicos (pregrado típico 144-180 cr · posgrado 24-90 cr), duración (pregrado 4-5 años · posgrado 1-4 años), titulación, y vinculación con Investigación-Creación (posgrado intensivo, pregrado emergente con CABA)."
skos_example: "La Facultad de Ingeniería contiene Áreas de Formación con Programas de Pregrado (Ing. Eléctrica · Ing. Civil · Ing. Industrial) y Programas de Posgrado (Esp. en Sistemas Distribuidos · Maestría en Bioingeniería · Doctorado en Ingeniería). La articulación pregrado→posgrado dentro del Área es coherencia curricular invariante."
skos_notation: "Pregrado/Posgrado"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Tipología de Programas Académicos universitarios"
iso_differentia: "Distinción declarada Art. 68 · pregrado (técnico/tecnológico/profesional) vs posgrado (especialización/maestría/doctorado) · ambos adscritos a Áreas de Formación · regulados por Decreto 1330/2019"
iso_subject_field: "Tipología programática universitaria · Sistema de Educación Superior colombiano"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 68 + Decreto MEN 1330/2019"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-decreto-1330-2019]]"
      adopter_locator: "Decreto MEN 1330/2019 · niveles de formación + registro calificado"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2019-07-25"
      adoption_evidence: "Decreto 1330/2019 reconoce niveles de formación (técnico, tecnológico, profesional, especialización, maestría, doctorado) y exige registro calificado por programa"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 68"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 Art. 68 institucionaliza Programa Académico como unidad académico-administrativa de Facultad con niveles pregrado y posgrado"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: REGLAMENTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 68 + Decreto 1330/2019"
  normative_text: "Art. 68 - Programa Académico: Unidad académico-administrativa de la facultad, donde se realiza la formación integral de los estudiantes de pregrado y posgrado."
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "programa_pregrado_posgrado"
  ddd_term: "Programas de Pregrado y Posgrado"
  ddd_aggregate_root: "ProgramaPregradoPosgrado"
  ddd_article_ref: "Art. 68 + Decreto 1330/2019"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: VALUE_OBJECT
  ddd_aggregate_root_flag: false
  ddd_domain_type: Core
  ddd_invariants:
    - "Cada Programa Académico está adscrito a UN Área de Formación de UNA Facultad"
    - "Pregrado y posgrado son niveles complementarios · articulación curricular es invariante de coherencia"
    - "Todo programa requiere registro calificado MEN vigente (Decreto 1330/2019)"
    - "Renovación cada 7 años (Art. 35 Decreto 1330)"
    - "Créditos respetan el estándar 1 cr = 48 horas (Art. 11-12 Decreto 1330)"
  ddd_ubiquitous_terms:
    - "Pregrado · Posgrado"
    - "Técnico · Tecnólogo · Profesional"
    - "Especialista · Magíster · Doctor"
    - "Registro calificado · MEN"
    - "Crédito académico = 48 horas"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-68-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-68-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-programa-academico]]"
  - "[[con-area-formacion]]"
  - "[[con-decreto-1330-2019]]"
  - "[[con-credito-academico]]"

applicable_domain: "Toda oferta formativa UDFJC desde 2025-05-06 · pregrado y posgrado"
assumptions:
  - "La articulación pregrado-posgrado dentro del Área es operacionalizable curricularmente"
breaks_at:
  - "Si un programa carece de registro calificado vigente (MEN)"
  - "Si la articulación pregrado-posgrado se pierde dentro del Área (rompe coherencia curricular)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-pgpg-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Pregrado y Posgrado declarados Art. 68 del ACU-004-25"
  - rel_id: rel-pgpg-implements-dec1330
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-decreto-1330-2019]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Niveles de formación regulados por Decreto MEN 1330/2019"
  - rel_id: rel-pgpg-tipo-programa
    rel_nombre: skos_narrower
    rel_direccion: pre
    rel_target: "[[con-programa-academico]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Pregrado y Posgrado son tipos del concepto general Programa Académico"
  - rel_id: rel-pgpg-en-area
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-area-formacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Programas pregrado y posgrado adscritos a Áreas de Formación (Art. 65)"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-06--bmk-creditos-cca]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, t1-normativo, programa-pregrado-posgrado, art-68, decreto-1330, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Programas de Pregrado y Posgrado

> [!note]+ Tipología de Programas Académicos · pregrado + posgrado
> Distinción declarada Art. 68 · pregrado (técnico/tecnológico/profesional) + posgrado (especialización/maestría/doctorado) · ambos adscritos a Áreas de Formación · regulados por Decreto 1330/2019.

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Distinción tipológica de los Programas Académicos UDFJC declarada en el **Art. 68 del ACU-004-25** que diferencia: (i) **Pregrado** — programas de formación inicial conducentes a títulos de Técnico Profesional, Tecnólogo o Profesional Universitario (Decreto MEN 1330/2019); (ii) **Posgrado** — programas de formación avanzada conducentes a títulos de Especialista, Magíster o Doctor. Ambos niveles operan como **unidades académico-administrativas de la facultad** (Art. 68) adscritos a Áreas de Forma

## §2 · Anclaje + cadena


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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo G. Distinción tipológica pregrado-posgrado en marco Decreto 1330/2019 + Art. 68 ACU. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-programa-pregrado-posgrado` v1.0.0*
