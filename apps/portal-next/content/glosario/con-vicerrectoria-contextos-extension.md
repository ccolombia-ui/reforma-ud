---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vicerrectoria-contextos-extension
kd_title: "Vicerrectoría de Contextos · Extensión y Proyección Social UDFJC (Art. 63 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "Vicerrectoría de Contextos · Extensión y Proyección Social"

skos_prefLabel: "Vicerrectoría de Contextos · Extensión y Proyección Social"
skos_altLabel: ["VRC", "Vicerrectoría de Contextos", "Vice-Rectorate of Contexts and Outreach"]
skos_hiddenLabel: ["vrc", "vicerrectoria-extension", "vicerrectoria-contextos"]
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

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 63"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Coordinación de Centros + políticas de extensión-proyección social"
  norm_supersedes: "Vicerrectoría de Extensión del Acuerdo 003/1997 (sin componente 'Contextos' explícito)"

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

applicable_domain: "UDFJC desde 2025-05-06; campo PM3"
assumptions: []
breaks_at: []
extends_to: "[[con-centro]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

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

tags: [glosario-universal, concepto-normativo, vrc, contextos-extension, art-63, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
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
