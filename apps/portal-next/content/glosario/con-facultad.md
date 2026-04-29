---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:facultad
kd_title: "Facultad UDFJC (Arts. 64-67 ACU-004-25) — unidad académico-administrativa del campo de Formación"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Facultad UDFJC"

skos_prefLabel: "Facultad UDFJC (post-ACU-004-25)"
skos_altLabel:
  - "Facultad reformada"
  - "Faculty UDFJC"
  - "Faculty (post-2025)"
skos_definition: "Unidad académico-administrativa de la UDFJC reformada responsable de la dirección, gestión y seguimiento del campo de Formación (PM1). Adscrita a la Vicerrectoría de Formación. Dirigida por un(a) Decano(a) elegido(a) por elección ponderada (docentes 30% + estudiantes 30% + egresados 10% + hoja de vida 20% + entrevista 10%). Coexiste con [[con-escuela|Escuelas]] como unidades de adscripción docente sobre campos del conocimiento-saber: la Facultad coordina la oferta formativa (Programas Académicos), las Escuelas adscriben a docentes y articulan investigación-extensión-formación. Diferente y NO equivalente a la Facultad del Acuerdo CSU 003/1997 (que era unidad de mayor nivel con Departamentos hijos)."
skos_scopeNote: "ATENCIÓN — la palabra 'Facultad' tiene DOS sentidos en el corpus MI-12: (a) **'Facultad reformada' = sentido vigente post-ACU-004-25 Arts. 64-67** (este glosario): unidad académico-administrativa del campo de Formación, coexistente con Escuelas; (b) 'Facultad histórica' del Acuerdo 003/1997 (DEROGADO Art. 109): unidad de mayor nivel con Departamentos hijos, sustituida estructuralmente por Escuelas. NO confundir. Cuando un texto del corpus usa 'Facultad' debe explicitar el sentido."
skos_example: "La 'Facultad de Ciencias y Educación' del Acuerdo 003/1997 está en transición hacia un modelo donde sus Programas Académicos pasan a estar adscritos a Escuelas reformadas (ej. Escuela de Física, Escuela de Matemáticas) que se coordinan vía Facultad reformada bajo VRF."
skos_notation: "Facultad"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad académico-administrativa universitaria del campo de Formación"
iso_differentia: "Adscrita a VRF; dirige Programas de Formación; Decano por elección ponderada multi-estamento; coexiste con Escuelas (no las contiene jerárquicamente)"
iso_subject_field: "Estructura académica reformada UDFJC / Gobernanza de Formación"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 64-67"

align_dbpedia: ""
align_wikidata: ""

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
      adopter_locator: "ACU-004-25 Arts. 64-67 (Facultad reformada · Decano · elección ponderada 70-20-10 · Consejo de Facultad)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 reforma Facultad como unidad académico-administrativa del campo de Formación · supersede el modelo Facultad-Departamento jerárquico del ACU 003/1997"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 64-67"
  normative_text: "[Texto literal Arts. 64-67 · Facultad reformada coexistente con Escuelas]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates:
    - "Facultad del Acuerdo CSU 003/1997 (estructura jerárquica con Departamentos hijos) — supersede por modelo Escuelas-CABAs Art. 69+"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "facultad"
  ddd_aggregate_root: "Facultad"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Coordinación de Formación. Coexiste con Escuelas como Aggregate Roots paralelos (no jerárquicos)."
  ddd_invariants:
    - "Una Facultad coordina al menos un campo de Formación"
    - "El Decano debe ser docente de planta tiempo completo"
    - "El Decano se elige por ponderación: docentes 30% + estudiantes 30% + egresados 10% + CV 20% + entrevista 10%"
    - "El Decano dura 4 años, sin reelección inmediata"
    - "El Consejo de Facultad incluye representantes de los estamentos"
  ddd_ubiquitous_terms:
    - "Facultad"
    - "Decano(a)"
    - "Consejo de Facultad"
    - "Elección ponderada multi-estamento"
    - "Coordinación de Programas"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-64-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-64-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-vicerrectoria-formacion]]"
  - "[[con-funciones-misionales]]"

applicable_domain: "UDFJC desde 2025-05-06; transición progresiva durante Período de Transición Art. 96 (4 años máximo)"
assumptions:
  - "Las Facultades históricas se transforman gradualmente al nuevo modelo conservando algunos elementos"
  - "Coexisten con Escuelas en lógica complementaria (no jerárquica)"
breaks_at:
  - "Si una Facultad opera con estructura jerárquica Facultad-Departamento como en Acuerdo 003/1997 (incumple ACU-004-25)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-facultad-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-facultad-coord-vrf
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-formacion]]"
    rel_frame: skos
  - rel_id: rel-facultad-related-escuela
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-escuela]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Facultades coordinan Formación; Escuelas adscriben docentes por campo del conocimiento-saber. Coexistencia complementaria post-ACU-004-25"
  - rel_id: rel-facultad-supersedes-facultad-003-97
    rel_nombre: norm_supersedes
    rel_direccion: post
    rel_target: "Facultad-Departamentos modelo Acuerdo CSU 03/1997 (modelo institucional derogado — referencia externa)"
    rel_frame: bibliografico
    rel_propiedades:
      norm_evidence: "Modelo Facultad-Departamentos sustituido por modelo coexistente Facultad-Escuela-CABA"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-04--jtbd-comunidad]]"]
cited_count: 3

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - facultad-reformada
  - arts-64-67
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Facultad UDFJC reformada (Arts. 64-67 ACU-004-25)

## Definición operativa

Unidad académico-administrativa de la UDFJC reformada responsable de la **dirección, gestión y seguimiento del campo de Formación** (PM1). Adscrita a la Vicerrectoría de Formación. Dirigida por un(a) **Decano(a)** elegido(a) por **elección ponderada multi-estamento**:

| Componente | Peso |
|---|:---:|
| Voto docentes de la Facultad | 30% |
| Voto estudiantes de la Facultad | 30% |
| Voto egresados | 10% |
| Hoja de vida (CV) | 20% |
| Entrevista | 10% |

> **Coexiste** con [[con-escuela|Escuelas]] (no las contiene jerárquicamente): la Facultad coordina la oferta formativa; las Escuelas adscriben a docentes y articulan PM1+PM2+PM3 sobre campos del conocimiento-saber.

## ⚠️ Doble sentido del término "Facultad" (anti-confusión)

| Sentido | Contexto | Estatus |
|---|---|---|
| **(a) Facultad reformada** | ACU-004-25 Arts. 64-67 — este glosario | ✅ ACTIVO desde 2025-05-06 |
| **(b) Facultad histórica** | Acuerdo CSU 003/1997 — unidad de mayor nivel con Departamentos | 🔴 SUPERSEDED — derogada Art. 109 |

Cuando un texto del corpus usa "Facultad", **debe explicitar el sentido**.

## Fuente primaria

> Arts. 64-67 ACU-004-25 (Facultad reformada, Decano, elección ponderada, Consejo de Facultad).

## Invariantes operativas DDD

1. Una Facultad coordina **al menos un campo de Formación**.
2. El **Decano** debe ser docente de planta tiempo completo.
3. **Elección ponderada** 30+30+10+20+10.
4. Decano dura **4 años, sin reelección inmediata**.
5. **Consejo de Facultad** incluye representantes de los estamentos.

## Lenguaje ubicuo asociado

Facultad · Decano(a) · Consejo de Facultad · Elección ponderada multi-estamento · Coordinación de Programas.

## Notas de aplicación

- **Cuándo invocarla**: como unidad coordinadora del campo de Formación. NO confundir con la "Facultad histórica" del 003/1997.
- **Coexistencia con Escuelas**: la Facultad reformada **NO contiene jerárquicamente** a las Escuelas — son aggregates paralelos. Cada Escuela adscribe docentes y articula PM1+PM2+PM3; la Facultad coordina el campo de Formación de manera transversal.
