---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vicerrectoria-contextos-extension
kd_title: "Vicerrectoría de Contextos · Extensión y Proyección Social UDFJC (Art. 63 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Vicerrectoría de Contextos · Extensión y Proyección Social"

skos_prefLabel: "Vicerrectoría de Contextos · Extensión y Proyección Social"
skos_altLabel: ["VRC", "Vicerrectoría de Contextos", "Vice-Rectorate of Contexts and Outreach"]
skos_definition: "Dependencia institucional UDFJC responsable de liderar el campo de Contextos · Extensión y Proyección Social (PM3) y coordinar los Centros. Articula la interacción y el diálogo permanente entre la Comunidad Universitaria y el entorno local, regional, nacional e internacional. Promueve proyectos de extensión territorial, contratos con entidades públicas y privadas (consultoría, obras), proyección comunitaria y articulación con organizaciones sociales. La denominación 'Contextos' es central: refleja que la extensión NO es solo 'transferencia desde la universidad' sino diálogo en territorios concretos. Su titular es el(la) Vicerrector(a), miembro del CACAD."
skos_scopeNote: "La denominación 'Contextos' antes de 'Extensión' es deliberada: invierte la jerarquía implícita del modelo 003/1997 donde la extensión era 'salida hacia afuera'. Aquí, los contextos territoriales (comunidades, organizaciones, gobiernos locales) son interlocutores legítimos en diálogo simétrico. Materializa estructuralmente el principio (g) Pluralidad y Diversidad de Saberes en la dimensión territorial."
skos_example: "Coordinar el portafolio de contratos de extensión 2025; supervisar proyectos comunitarios PM3 con JACs de Cundinamarca; gestionar la transición del nuevo Estatuto de Contextos-Extensión-Proyección Social (Art. 98 §5)."
skos_notation: "VRC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Vicerrectoría temática del campo de Contextos-Extensión-Proyección Social"
iso_differentia: "Coordina Centros; lidera PM3; reorienta extensión hacia diálogo simétrico con contextos territoriales (no transferencia unidireccional)"
iso_subject_field: "Gobernanza de extensión universitaria / Diálogo universidad-territorio"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 63"

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
      adopter_locator: "ACU-004-25 Art. 63 (VRC)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 reforma Vicerrectoría de Extensión 1997 incorporando 'Contextos' como componente central · invierte la jerarquía implícita extensión > contextos hacia diálogo simétrico"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 63"
  normative_text: "[Texto literal Art. 63 · VRC coordina Centros · campo Contextos-Extensión-Proyección Social]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: ["Vicerrectoría de Extensión del Acuerdo 003/1997 (sin componente 'Contextos' explícito)"]
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "vicerrectoria_contextos"
  ddd_aggregate_root: "VicerrectoriaContextosExtension"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio PM3 Contextos-Extensión. Coordina Centros."
  ddd_invariants:
    - "Su titular es miembro del CACAD"
    - "Coordina Centros (no los dirige operativamente)"
    - "Privilegia diálogo simétrico con contextos territoriales"
  ddd_ubiquitous_terms:
    - "VRC"
    - "Contextos · Extensión · Proyección Social"
    - "Coordinación de Centros"
    - "Diálogo universidad-territorio"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-63-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-63-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-funciones-misionales]]"

applicable_domain: "UDFJC desde 2025-05-06; campo PM3"
assumptions: ["El diálogo simétrico universidad-territorio es operacionalizable institucionalmente"]
breaks_at: ["Si la VRC opera como transferencia unidireccional · incumple principio de Contextos"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-vrc-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-vrc-coordina-centros
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-centro]]"
    rel_frame: skos
  - rel_id: rel-vrc-pm3
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
  - vrc
  - contextos-extension
  - art-63
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Vicerrectoría de Contextos · Extensión y Proyección Social (Art. 63 ACU-004-25)

## Definición operativa

Dependencia institucional UDFJC responsable de **liderar el campo PM3 (Contextos · Extensión y Proyección Social)** y **coordinar los Centros**. Articula la interacción y el diálogo permanente entre la Comunidad Universitaria y el entorno local, regional, nacional e internacional.

## El sentido de "Contextos" antes de "Extensión"

| Modelo 003/1997 | Modelo ACU-004-25 |
|---|---|
| Extensión = salida desde la universidad | Contextos primero, luego extensión |
| Universidad transfiere conocimiento | Universidad dialoga simétricamente con territorios |
| Lógica unidireccional | Lógica de diálogo de saberes |

> La inversión denominativa **NO es ornamental** — refleja el giro del Art. 5g (Pluralidad y Diversidad de Saberes) en la dimensión territorial.

## Fuente primaria

> Art. 63 ACU-004-25.

## Invariantes operativas DDD

1. Su titular es **miembro del CACAD**.
2. Coordina Centros (no los dirige operativamente).
3. **Privilegia diálogo simétrico** con contextos territoriales.

## Lenguaje ubicuo asociado

VRC · Contextos · Extensión · Proyección Social · Coordinación de Centros · Diálogo universidad-territorio.
