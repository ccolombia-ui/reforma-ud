---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:decanatura
kd_title: "Decanatura UDFJC (Arts. 18e, 65, 67 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Decanatura UDFJC"
tupla_descripcion: "Autoridad ejecutiva unipersonal de la Facultad UDFJC · órgano de gobierno declarado en Art. 18e + Art. 65 + Art. 67 (designación por elección directa ponderada · 4 años · sin reelección inmediata)"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Decanatura"
skos_altLabel:
  - "Decano(a) de Facultad"
  - "Dean's Office"

skos_definition: "Autoridad ejecutiva unipersonal de la Facultad UDFJC declarada como **órgano de gobierno** en el Art. 18e del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Su titular —el(la) **Decano(a)**— es designado por elección directa ponderada conforme al Art. 67 con escala de **100 puntos**: votación ponderada **70 puntos** (docentes 30 + estudiantes 30 + egresados 10) + evaluación de hoja de vida **20 puntos** + entrevista con Rector **10 puntos**. Período de **4 años · sin reelección inmediata** (Art. 83). Funciones: dirige, representa y administra la Facultad bajo coordinación de la Vicerrectoría de Formación · preside el Consejo de Facultad · coordina las Áreas de Formación · representa la Facultad ante CACAD y CSU."
skos_scopeNote: "La Decanatura NO es Consejo de Facultad (órgano colegiado deliberativo · Art. 18d) — es la autoridad ejecutiva que lo preside. Sustituye a la figura del Decano del régimen ACU 003/1997 con cambios sustanciales en mecanismo de designación: la elección directa ponderada con votación 70% + HV 20% + entrevista 10% es invariante democrática nueva. La invariante de **NO reelección inmediata** (Art. 83) es deliberada · evita captura institucional."
skos_example: "El proceso de designación de Decano(a) en una Facultad UDFJC sigue el Art. 67: convocatoria pública → inscripción → votación ponderada (docentes/estudiantes/egresados) → evaluación HV → entrevista con Rector → designación. El Decano(a) electo asume por 4 años sin posibilidad de reelección inmediata."
skos_notation: "Decanatura"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Autoridad ejecutiva unipersonal universitaria a nivel facultativo"
iso_differentia: "Designación por elección directa ponderada (70% votación + 20% HV + 10% entrevista) · período 4 años · sin reelección inmediata · preside Consejo de Facultad · coordina Áreas de Formación"
iso_subject_field: "Gobernanza académica universitaria · Dirección facultativa · Derecho universitario público"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18e + 65 + 67 + 83"

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
      adopter_locator: "ACU-004-25 Art. 18e (órgano gobierno) + Art. 65 (estructura) + Art. 67 (designación) + Art. 83 (no reelección)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Decanatura con mecanismo de designación democrático ponderado · invariante de no reelección inmediata Art. 83"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 18e + 65 + 67 + 83"
  normative_text: "Art. 67 - Designación del Decano: Periodo 4 años; Mecanismo: Elección directa ponderada (100 puntos): Votación ponderada 70 puntos (docentes 30, estudiantes 30, egresados 10), Evaluación hoja de vida 20 puntos, Entrevista con rector 10 puntos. No hay reelección inmediata (Art. 83)."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "decanatura"
  ddd_term: "Decanatura"
  ddd_aggregate_root: "Decanatura"
  ddd_article_ref: "Arts. 18e + 65 + 67 + 83"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_lifecycle_states:
    - ELECTO
    - EJERCIENDO
    - SALIENTE
    - VACANTE
  ddd_governed_by:
    - "[[con-vicerrectoria-formacion]]"
    - "[[con-csu-consejo-superior-universitario]]"
  ddd_invariants:
    - "Decanatura es autoridad UNIPERSONAL · un único titular en cada momento"
    - "El Decano(a) preside el Consejo de Facultad (Art. 65)"
    - "Periodo es 4 años · sin reelección inmediata (Art. 83)"
    - "Designación es por elección directa ponderada (Art. 67) · NO designación rectoral discrecional (excepto Art. 107 · 2025-2027 transitorio)"
    - "El Decano(a) coordina Áreas de Formación · NO interviene en decisiones de CABAs"
    - "Las Decanaturas son representadas en el Consejo Académico (Art. 31c)"
  ddd_ubiquitous_terms:
    - "Decanatura · Decano(a)"
    - "Elección directa ponderada"
    - "70-20-10 (votación-HV-entrevista)"
    - "Período 4 años"
    - "No reelección inmediata"
    - "Coordinación Áreas de Formación"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-67-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-67-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-facultad]]"
  - "[[con-vicerrectoria-formacion]]"
  - "[[con-rectoria]]"

applicable_domain: "Toda Facultad UDFJC desde 2025-05-06 con régimen transitorio Art. 107 (2025-2027 designación rectoral excepcional)"
assumptions:
  - "El mecanismo electoral 70-20-10 produce Decanos legítimos democráticamente"
  - "La invariante de no reelección inmediata previene captura institucional"
breaks_at:
  - "Si el Decano(a) ejerce más de 4 años continuos (incumple Art. 67 + Art. 83)"
  - "Si la designación se hace sin elección democrática post 2027-05-05 (vence potestad rectoral Art. 107)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-decanatura-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Decanatura declarada Arts. 18e + 65 + 67 del ACU-004-25"
  - rel_id: rel-decanatura-dirige-facultad
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Decanatura es autoridad ejecutiva de la Facultad"
  - rel_id: rel-decanatura-coordina-areas
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-area-formacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · Decanatura coordina las Áreas de Formación de su Facultad"
  - rel_id: rel-decanatura-coordinada-vrf
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-formacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Decanaturas son coordinadas por la Vicerrectoría de Formación (Art. 61)"
  - rel_id: rel-decanatura-preside-consejo-facultad
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-consejo-facultad]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 65 · Decanatura preside el Consejo de Facultad"
  - rel_id: rel-decanatura-miembro-cacad
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 31c · Decanos(as) son miembros del Consejo Académico"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - decanatura
  - decano
  - art-65
  - art-67
  - art-83
  - autoridad-ejecutiva-facultad
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Decanatura

> [!note]+ Autoridad ejecutiva facultativa · elección democrática 70-20-10
> La **Decanatura** es la autoridad ejecutiva unipersonal de la Facultad. Designación por elección directa ponderada (votación 70% + HV 20% + entrevista 10%) · período 4 años · **sin reelección inmediata** (Art. 83 invariante anti-captura).

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Autoridad ejecutiva unipersonal de la Facultad UDFJC declarada como **órgano de gobierno** en el Art. 18e del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Su titular —el(la) **Decano(a)**— es designado por elección directa ponderada conforme al Art. 67 con escala de **100 puntos**: votación ponderada **70 puntos** (docentes 30 + estudiantes 30 + egresados 10) + evaluación de hoja de vida **20 puntos** + entrevista con Rector **10 puntos**. Período de **4 a

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · 🤝 Relaciones tipadas


<div class="dv-block" data-dv="relations"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo C. Modela Decanatura con elección 70-20-10 + no reelección inmediata + invariantes anti-captura. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-decanatura` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
