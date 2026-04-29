---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vicerrectoria-investigacion-creacion-innovacion
kd_title: "Vicerrectoría de Investigación-Creación e Innovación UDFJC (Art. 62 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Vicerrectoría de Investigación-Creación e Innovación"

skos_prefLabel: "Vicerrectoría de Investigación-Creación e Innovación"
skos_altLabel: ["VRICI", "VRI", "Vice-Rectorate of Research-Creation-Innovation"]
skos_definition: "Dependencia institucional UDFJC responsable de liderar el campo de Investigación-Creación e Innovación (PM2) y coordinar los Institutos. Reorienta la antigua Vicerrectoría de Investigaciones del Acuerdo 003/1997 incorporando explícitamente la 'creación' (artístico-cultural) y la 'innovación' como componentes del proceso misional. Define políticas de investigación, articula líneas de los Institutos, coordina convocatorias internas, gestiona Banco de Proyectos UDFJC y CIDC, y supervisa producción científica indexada (Q1-Q4 + libros + patentes + ponencias). Su titular es el(la) Vicerrector(a), miembro del CACAD."
skos_scopeNote: "El triple par 'investigación-creación-innovación' refleja la integración de tres tradiciones epistémicas: investigación (ciencia + ciencias sociales), creación (artes + humanidades), innovación (tecnología + emprendimiento). NO son tres vicerrectorías distintas — es una integrada que reconoce la pluralidad."
skos_example: "Coordinar la formulación de proyectos PM2 en convocatorias MinCiencias 2025; supervisar el cumplimiento de indicadores BMK-001 sobre productividad investigativa; gestionar la transición del nuevo Estatuto de Investigación-Creación-Innovación (Art. 98 §4)."
skos_notation: "VRICI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Vicerrectoría temática del campo de Investigación-Creación-Innovación"
iso_differentia: "Coordina Institutos; lidera PM2; integra investigación + creación + innovación como triada"
iso_subject_field: "Gobernanza investigativa universitaria / Política científica institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 62"

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
      adopter_locator: "ACU-004-25 Art. 62 (VRICI)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 reforma la antigua Vicerrectoría de Investigaciones 1997 incorporando explícitamente creación + innovación · campo PM2"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 62"
  normative_text: "[Texto literal Art. 62 · VRICI coordina Institutos · triada investigación-creación-innovación]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: ["Vicerrectoría de Investigaciones del Acuerdo 003/1997 (sin 'creación' ni 'innovación' explícitos)"]
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "vicerrectoria_investigacion"
  ddd_aggregate_root: "VicerrectoriaInvestigacionCreacionInnovacion"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio Investigación-Creación-Innovación (PM2). Coordina Institutos."
  ddd_invariants:
    - "Su titular es miembro del CACAD"
    - "Coordina Institutos (no los dirige operativamente)"
    - "Integra las tres dimensiones investigación + creación + innovación"
  ddd_ubiquitous_terms:
    - "VRICI · VRI"
    - "Investigación-creación-innovación"
    - "Coordinación de Institutos"
    - "Banco de Proyectos UDFJC · CIDC"
    - "Productividad investigativa"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-62-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-62-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-funciones-misionales]]"

applicable_domain: "UDFJC desde 2025-05-06; campo PM2"
assumptions: ["Los Institutos se constituyen progresivamente en transición"]
breaks_at: ["Si se separan investigación · creación · innovación en vicerrectorías distintas"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-investigador-pasteur


tupla__relations:
  - rel_id: rel-vrici-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-vrici-coordina-institutos
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-instituto]]"
    rel_frame: skos
  - rel_id: rel-vrici-pm2
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - vrici
  - investigacion-creacion-innovacion
  - art-62
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Vicerrectoría de Investigación-Creación e Innovación (Art. 62 ACU-004-25)

## Definición operativa

Dependencia institucional UDFJC responsable de **liderar el campo PM2 (Investigación-Creación e Innovación)** y **coordinar los Institutos**. Reorienta la antigua Vicerrectoría de Investigaciones del Acuerdo 003/1997 incorporando explícitamente la **creación** (artístico-cultural) y la **innovación** como componentes del proceso misional.

## Tres dimensiones integradas

| Dimensión | Tradición epistémica |
|---|---|
| **Investigación** | Ciencias naturales + sociales |
| **Creación** | Artes + humanidades |
| **Innovación** | Tecnología + emprendimiento |

> El triple par no es tres vicerrectorías distintas — es **una integrada** que reconoce la pluralidad epistémica del Art. 5g.

## Fuente primaria

> Art. 62 ACU-004-25.

## Invariantes operativas DDD

1. Su titular es **miembro del CACAD**.
2. Coordina Institutos (no los dirige operativamente).
3. **Integra** las tres dimensiones investigación + creación + innovación.

## Lenguaje ubicuo asociado

VRICI · VRI · Investigación-creación-innovación · Coordinación de Institutos · Banco de Proyectos · CIDC · Productividad investigativa.
