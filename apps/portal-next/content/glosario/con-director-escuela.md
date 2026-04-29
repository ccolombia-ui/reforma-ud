---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:director-escuela
kd_title: "Director(a) de Escuela UDFJC (Art. 72 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Director de Escuela UDFJC"

skos_prefLabel: "Director(a) de Escuela"
skos_altLabel: ["School Director", "Director de Unidad Académica Básica"]
skos_definition: "Cargo de dirección unipersonal de una Escuela UDFJC reformada. Debe ser docente de planta tiempo completo. Es elegido(a) por voto de los docentes de la Escuela según el régimen general electoral universitario. Periodo: 4 años, sin reelección inmediata. Convoca y preside el Consejo de Escuela. Representa a la Escuela ante VRF, Facultad, otras Vicerrectorías, Institutos, Centros y CABAs. Durante el Período de Transición (Art. 107, hasta 2027-05-05), su designación es POTESTATIVA del rector(a) — única excepción al régimen electoral."
skos_scopeNote: "El cargo de Director de Escuela es UNIPERSONAL ejecutivo, distinto del Decano (que dirige la Facultad reformada coordinando Programas) y del Director de Instituto / Centro (que dirige unidades de PM2/PM3). El Art. 107 introduce excepción transitoria 2025-2027: rector designa discrecionalmente — pero a partir de 2027-05-05, todas las designaciones DEBEN ser por elección docente."
skos_example: "El Director de la Escuela de Física, electo por los docentes de planta TC adscritos a la Escuela en 2027 (cuando termine la potestad rectoral del Art. 107), preside el Consejo de Escuela para definir colectivamente el campo del conocimiento-saber, las CABAs activas y la articulación con Programas Académicos."
skos_notation: "Dir-Escuela"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Cargo de dirección unipersonal de unidad académica básica universitaria"
iso_differentia: "Docente planta TC; electo por docentes de la Escuela; 4 años sin reelección inmediata; preside Consejo de Escuela; durante 2025-2027 designación rectoral discrecional Art. 107"
iso_subject_field: "Gobernanza de Escuelas / Régimen electoral universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 72; régimen transitorio Art. 107"

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
      adopter_locator: "ACU-004-25 Art. 72 (Director · 4 años · sin reelección · elección 70% docentes + 30% HV) + Art. 107 (potestad transitoria 2025-2027) + Art. 83"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Director(a) de Escuela con elección 70-30 + invariante de no reelección Art. 83 + excepción transitoria Art. 107"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 72 + Art. 107 + Art. 83"
  normative_text: "[Texto literal Art. 72 · Director electo por docentes · 70% votación + 30% HV · 4 años]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "director_escuela"
  ddd_aggregate_root: "DirectorEscuela"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Cargo unipersonal de dirección de Escuela. Entity con identidad por persona + periodo + Escuela."
  ddd_invariants:
    - "Debe ser docente de planta tiempo completo"
    - "Periodo: 4 años, sin reelección inmediata"
    - "Modo de designación: ELECTO por docentes (régimen general); TRANSITORIO 2025-2027 designado por rector (Art. 107)"
    - "Preside el Consejo de Escuela"
    - "No puede ejercer simultáneamente otra función de elección colegiada"
  ddd_ubiquitous_terms:
    - "Director(a) de Escuela"
    - "Consejo de Escuela"
    - "Régimen electoral docente"
    - "Potestad rectoral transitoria"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-72-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-72-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-escuela]]"
  - "[[con-rectoria]]"

applicable_domain: "Toda Escuela UDFJC desde 2025-05-06"
assumptions: ["La transición Art. 107 vence efectivamente el 2027-05-05"]
breaks_at: ["Si el rector designa Director después del 2027-05-05 (incumplimiento Art. 107)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-director-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-director-dirige-escuela
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-escuela]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - director-escuela
  - art-72
  - art-107
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Director(a) de Escuela (Art. 72 ACU-004-25)

## Definición operativa

Cargo de dirección **unipersonal** de una Escuela UDFJC reformada. Debe ser **docente de planta tiempo completo**. Elegido(a) por voto de los docentes de la Escuela. Periodo: **4 años, sin reelección inmediata**. Preside el Consejo de Escuela.

## Régimen de designación

| Período | Régimen | Base normativa |
|---|---|---|
| **2025-2027** (transición) | Designación discrecional por rector(a) | Art. 107 (excepción transitoria) |
| **2027-05-05 en adelante** | Elección por docentes de la Escuela | Art. 72 (régimen general) |

## Fuente primaria

> Art. 72 ACU-004-25 (Director y Consejo de Escuela); Art. 107 (potestad rectoral transitoria 2025-2027).

## Invariantes operativas DDD

1. **Docente de planta TC** obligatorio.
2. Periodo **4 años, sin reelección inmediata**.
3. **Electo** (régimen general) o **designado por rector** (transición Art. 107).
4. **Preside** el Consejo de Escuela.
5. NO puede ejercer simultáneamente otra función de elección colegiada.

## Lenguaje ubicuo asociado

Director(a) de Escuela · Consejo de Escuela · Régimen electoral docente · Potestad rectoral transitoria.

## Notas de aplicación

- **Riesgo Art. 107**: la potestad rectoral transitoria NO puede extenderse de hecho más allá de 2027-05-05. Después de esa fecha, toda designación debe ser por elección.
