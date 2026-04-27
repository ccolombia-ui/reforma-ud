---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:decreto-1330-2019
kd_title: "Decreto MEN 1330/2019 (Registro Calificado IES)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-03, sec-MI12-06, sec-MI12-11]

tupla_tipo: DEFINITION
tupla_concepto: "Decreto MEN 1330/2019"

skos_prefLabel: "Decreto MEN 1330 de 2019 — Registro Calificado IES"
skos_altLabel: ["Decreto 1330", "Decreto Registro Calificado", "Decreto MEN 1330/2019"]
skos_hiddenLabel: ["decreto-1330", "decreto-1330-2019", "registro-calificado-decreto"]
skos_definition: "Decreto del Ministerio de Educación Nacional de Colombia, expedido el 25 de julio de 2019, que reglamenta el registro calificado de programas académicos en educación superior, modificando el Decreto 1075/2015 (compilatorio sector educación). Define las condiciones de calidad obligatorias para que una IES pueda ofertar y otorgar título en cualquier nivel y modalidad. Sus artículos clave: Art. 2 (definición de programa académico); Art. 3 (composición de programa); Arts. 11-12 (créditos académicos: 1 cr = 48 h trabajo total/período + composición h_doc + h_ind); Art. 35 (renovación cada 7 años). Es la norma operativa que da contenido cuantitativo (créditos, horas) a la oferta formativa UDFJC bajo coordinación de Vicerrectoría de Formación + Facultades reformadas."
skos_scopeNote: "Aplica a TODA IES colombiana que oferte programas con título terminal. NO regula contenido curricular específico (eso es autonomía universitaria del Art. 69 CP) sino las condiciones formales de calidad. UDFJC debe cumplirlo en todos sus Programas Académicos."
skos_example: "Un Programa Académico de Ingeniería Eléctrica UDFJC (165 créditos pregrado profesional) cumple Decreto 1330 si: (a) tiene registro calificado vigente del MEN; (b) cada crédito = 48 h totales (h_doc + h_ind); (c) registra en SNIES; (d) renueva registro cada 7 años."
skos_notation: "Decreto 1330/2019"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Decreto reglamentario del MEN sobre registro calificado IES"
iso_differentia: "Reglamenta condiciones de calidad obligatorias para Programas Académicos; define créditos académicos cuantitativamente"
iso_subject_field: "Derecho de educación superior / Aseguramiento de la calidad / Registro calificado"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional - República de Colombia"

align_schema_type: Legislation
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[decreto1330_2019]]"
  norm_article: "Arts. 2-3 (definición programa); 11-12 (créditos); 35 (renovación)"
  norm_jurisdiction: "Ministerio de Educación Nacional - Colombia"
  norm_effective_date: "2019-07-25"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda IES colombiana con programas de educación superior"
  norm_supersedes: "Decreto MEN 1295/2010 (modificado por 1330/2019)"

applicable_domain: "Programas Académicos UDFJC en cualquier nivel y modalidad"
assumptions: ["MEN no expide nuevo decreto sustancial antes de 2027"]
breaks_at: ["Si se reforma Decreto 1330 con criterios distintos"]
extends_to: "[[con-credito-academico]] · [[con-programa-academico]]"

recorded_at: "2026-04-26"
valid_from: "2019-07-25"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Legislation

tupla__relations:
  - rel_id: rel-decreto1330-fuente
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[decreto1330_2019]]"
    rel_frame: bibliografico
  - rel_id: rel-decreto1330-mandates-credito
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-credito-academico]]"
    rel_frame: normativo
  - rel_id: rel-decreto1330-mandates-programa
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-programa-academico]]"
    rel_frame: normativo

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-03--estandares-internacionales]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 4

tags: [glosario-universal, concepto-normativo, decreto-1330, registro-calificado, men-co, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Decreto MEN 1330/2019 — Registro Calificado IES

## Definición operativa

Decreto MEN del **25 de julio de 2019** que reglamenta el **registro calificado** de programas académicos en educación superior. Modifica el Decreto 1075/2015 (compilatorio).

## Artículos clave

| Artículo | Contenido |
|:-:|---|
| **Art. 2** | Definición de programa académico |
| **Art. 3** | Composición de programa |
| **Arts. 11-12** | Créditos: 1 cr = 48 h totales/período + composición h_doc + h_ind |
| **Art. 35** | Renovación cada 7 años |

## Fuente primaria

> Ministerio de Educación Nacional (2019). *Decreto 1330 del 25 de julio de 2019, por el cual se sustituye el Capítulo 2 y se suprime el Capítulo 7 del Título 3 de la Parte 5 del Libro 2 del Decreto 1075 de 2015*. Bogotá D.C.

## Lenguaje ubicuo asociado

Decreto 1330 · Registro calificado · MEN · 1 cr = 48 h · Renovación 7 años · SACES · CONACES.

## Notas de aplicación

- **Aplicable a todo Programa Académico UDFJC**.
- **Conexión M00**: norma fuente directa de [[con-credito-academico]] y [[con-programa-academico]].
