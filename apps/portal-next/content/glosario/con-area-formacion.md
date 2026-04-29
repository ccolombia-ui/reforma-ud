---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:area-formacion
kd_title: "Área de Formación UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Área de Formación UDFJC"
tupla_descripcion: "Sub-unidad estructural de las Facultades UDFJC (Art. 65) que agrupa programas de pregrado y posgrado por afinidad temática del campo de Formación · célula curricular básica del campo PM1"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Área de Formación"
skos_altLabel:
  - "Área Académica de Formación"
  - "Formation Area"
  - "Área programática"

skos_definition: "Sub-unidad estructural interna de las Facultades UDFJC declarada en el **Art. 65 del ACU-004-25** como uno de los componentes obligatorios de la estructura facultativa. Las Áreas de Formación **agrupan programas académicos de pregrado y posgrado por afinidad temática del campo de Formación** (PM1 · Art. 7a). Cada Área articula los Programas Académicos (Art. 68) bajo un eje temático coherente, facilitando coordinación curricular, articulación pregrado-posgrado, definición de líneas pedagógicas comunes y gestión integrada de Paquetes CCA. Operan **transversalmente con las CABAs (Art. 73)**: mientras las Áreas de Formación organizan **programas** desde la lógica del campo de Formación (currículo · pedagogía · evaluación), las CABAs organizan **docentes** desde la lógica del campo de Conocimiento-Saber (interés cognitivo · investigación-creación). Una misma Escuela puede tener docentes adscritos a CABAs distintas que enseñan en programas de Áreas de Formación distintas — la transversalidad CABA × Área es la riqueza estructural del modelo post-reforma."
skos_scopeNote: "Las Áreas de Formación NO son programas académicos (los programas están adscritos a Áreas) NI son CABAs (que organizan docentes por campo de conocimiento-saber). La distinción es ontológica: **Áreas organizan currículo**, **CABAs organizan investigación-docencia-extensión** alrededor de pares de conocimiento-saber. Una Facultad puede tener N Áreas de Formación; un Área puede contener múltiples Programas Académicos pregrado/posgrado del mismo eje temático."
skos_example: "La Facultad de Ingeniería puede organizarse en Áreas de Formación tales como: (i) Área de Ingeniería Eléctrica-Electrónica (con programas de Ingeniería Eléctrica + Electrónica + Maestría en Sistemas); (ii) Área de Ingeniería Civil-Ambiental (Ing. Civil + Ambiental + especialización + maestría); (iii) Área de Ingeniería Industrial-Sistemas. Cada Área coordina sus programas con autonomía pedagógica relativa bajo dirección de Decanatura."
skos_notation: "AF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sub-unidad estructural interna de Facultad universitaria"
iso_differentia: "Agrupa programas académicos de pregrado y posgrado por afinidad temática del campo de Formación · transversal con CABAs · obligatoria en estructura de Facultad Art. 65"
iso_subject_field: "Estructura académica universitaria · Gestión curricular · Campo de Formación PM1"
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
      adopter_locator: "ACU-004-25 Art. 65 (estructura de Facultades · Áreas de formación con programas pregrado y posgrado)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 Art. 65 institucionaliza Áreas de Formación como componente obligatorio de la estructura de Facultades · primera vez articuladas explícitamente con programas pregrado-posgrado"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 65 (estructura de Facultades)"
  normative_text: "Estructura de Facultades: Una Decanatura, Un Consejo de Facultad, Áreas de formación con programas de pregrado y posgrado, Unidades de apoyo a la gestión curricular, Una secretaría académica."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "area_formacion"
  ddd_term: "Área de Formación"
  ddd_aggregate_root: "AreaFormacion"
  ddd_article_ref: "Art. 65"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-decanatura]]"
  ddd_invariants:
    - "Toda Área de Formación está adscrita a UNA Facultad (no puede ser cross-facultad simultáneamente)"
    - "Una Facultad debe tener al menos UNA Área de Formación (Art. 65 obligatorio)"
    - "Los Programas Académicos de pregrado y posgrado están adscritos a un Área de Formación específica"
    - "Áreas de Formación se rigen por lógica del campo de Formación (PM1) · NO por campo de conocimiento-saber (que organiza CABAs)"
    - "Áreas son transversales con CABAs · un Programa de un Área puede ser servido por docentes de múltiples CABAs"
    - "La articulación pregrado-posgrado dentro del Área es invariante de coherencia curricular"
  ddd_ubiquitous_terms:
    - "Área de Formación · AF"
    - "Programas pregrado y posgrado"
    - "Eje temático curricular"
    - "Campo de Formación PM1"
    - "Transversalidad CABA × Área"
    - "Articulación pregrado-posgrado"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-65-area-formacion-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-65-area-formacion-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-facultad]]"
  - "[[con-funciones-misionales]]"
  - "[[con-campo-conocimiento-saber]]"

applicable_domain: "Toda Facultad UDFJC desde 2025-05-06 · estructura curricular obligatoria"
assumptions:
  - "La agrupación temática de programas en Áreas optimiza coordinación curricular"
  - "La transversalidad CABA × Área es operacionalizable institucionalmente"
breaks_at:
  - "Si un Área de Formación es monoprograma (degrada a sinónimo de programa)"
  - "Si las Áreas se confunden con CABAs (violación de la separación ontológica Formación vs Conocimiento-Saber)"
  - "Si los programas pregrado-posgrado no tienen articulación curricular dentro del Área"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-disenador


tupla__relations:
  - rel_id: rel-af-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Áreas de Formación declaradas en Art. 65 del ACU-004-25 como componente estructural de Facultades"
  - rel_id: rel-af-parte-facultad
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · Áreas de Formación son sub-unidades estructurales de las Facultades"
  - rel_id: rel-af-contiene-programas
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-programa-academico]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · cada Área de Formación contiene programas de pregrado y posgrado"
  - rel_id: rel-af-articula-funciones
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Áreas de Formación operan en campo PM1 (Formación-Docencia · Art. 7a)"
  - rel_id: rel-af-transversal-caba
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Áreas de Formación organizan PROGRAMAS desde campo Formación · CABAs organizan DOCENTES desde campo Conocimiento-Saber · transversalidad ortogonal"
  - rel_id: rel-af-coordinada-decanatura
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-decanatura]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Áreas de Formación operan bajo dirección de la Decanatura de la Facultad respectiva"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-04--jtbd-comunidad]]"
  - "[[sec-MI12-06--bmk-creditos-cca]]"
cited_count: 3

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - area-formacion
  - art-65
  - estructura-facultad
  - campo-formacion
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Área de Formación

> [!important]+ ⚛️ Sub-unidad estructural facultativa · transversal con CABAs
> Las **Áreas de Formación** agrupan programas pregrado y posgrado por afinidad temática del campo de Formación. Operan **transversalmente con CABAs**: Áreas organizan **programas** (campo Formación), CABAs organizan **docentes** (campo Conocimiento-Saber). La transversalidad ortogonal es la riqueza estructural del modelo post-reforma.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica (cita literal Art. 65)

> Sub-unidad estructural interna de las Facultades UDFJC declarada en el **Art. 65 del ACU-004-25** como uno de los componentes obligatorios de la estructura facultativa. Las Áreas de Formación **agrupan programas académicos de pregrado y posgrado por afinidad temática del campo de Formación** (PM1 · Art. 7a). Cada Área articula los Programas Académicos (Art. 68) bajo un eje temático coherente, facilitando coordinación curricular, articulación pregrado-posgrado, definición de líneas pedagógicas co

> **Cita literal Art. 65 (estructura de Facultades)**: "Una Decanatura, Un Consejo de Facultad, **Áreas de formación con programas de pregrado y posgrado**, Unidades de apoyo a la gestión curricular, Una secretaría académica."

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | PASTEUR | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · 🤝 Relaciones tipadas


<div class="dv-block" data-dv="relations"></div>


## §8 · 🎭 Vista por rol seleccionado


<div class="dv-block" data-dv="vista-por-rol"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Notas de aplicación

- **Distinción ontológica clave**: Áreas de Formación (campo Formación · programas) ⊥ CABAs (campo Conocimiento-Saber · docentes). Esta es la **transversalidad ortogonal** que la reforma introduce.
- **Anclaje CoP**: cada Área de Formación es base de Comunidad de Práctica curricular · coordina diseño pedagógico de programas afines.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo C. Modela Áreas de Formación como sub-unidad estructural de Facultades · transversalidad ortogonal con CABAs · agrupa programas pregrado-posgrado por eje temático. Bound context arquitectura misional UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-area-formacion` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
