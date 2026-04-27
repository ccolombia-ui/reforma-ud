---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:credito-academico
kd_title: "Crédito Académico (Decreto MEN 1330/2019 Art. 11) — unidad de medida del trabajo académico estudiantil (Colombia)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_supersedes: 60-glosario/con-credito-academico (formato previo SUPERSEDED)
kd_transcluible_en: [sec-MI12-00, sec-MI12-06, sec-MI12-07, sec-MI12-10, sec-MI12-11]

tupla_tipo: EQUATION
tupla_concepto: "Crédito Académico (Colombia)"

skos_prefLabel: "Crédito Académico"
skos_altLabel: ["Crédito SNIES", "Unidad de trabajo académico", "Academic credit (Colombia)"]
skos_hiddenLabel: ["credito", "credito-academico"]
skos_definition: "Unidad de medida del trabajo académico estudiantil en la educación superior colombiana, equivalente a 48 horas-reloj de trabajo total por período académico, distribuidas entre acompañamiento docente directo (h_doc) y trabajo independiente del estudiante (h_ind). La proporción h_doc:h_ind varía por modalidad: presencial típicamente 1:2; virtual con mayor flexibilidad. Estandarizado por Decreto MEN 1330/2019 Arts. 11-12 que reglamentó el registro calificado. Formula vinculante: h_total = 48 × n_cr ; h_total = h_doc + h_ind."
skos_scopeNote: "Es uno de los pocos conceptos del corpus M00 que tiene tanto naturaleza NORMATIVA (Decreto 1330) como CALCULADA (fórmula vinculante en la norma). Coexiste con CCA (M06): el CCA es un Paquete que se mide en créditos académicos. NO se confunde con ECTS europeo (1 cr SNIES ≈ 1.6-1.8 ECTS)."
skos_example: "Un curso de Mecánica I de 4 créditos exige h_total = 48 × 4 = 192 h totales en el período académico. En modalidad presencial 1:2 son 64 h docente + 128 h independiente. Un Programa de pregrado profesional de 165 cr exige 7920 h totales."
skos_notation: "n_cr"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Unidad de medida del trabajo académico estudiantil"
iso_differentia: "48 horas-reloj de trabajo total por período (CO); descompuesta en h_doc + h_ind con proporción variable por modalidad"
iso_subject_field: "Educación superior / Política pública educativa / Registro calificado"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional Colombia (MEN); SACES; CONACES; Decreto 1330/2019"

align_schema_type: QuantitativeValue
align_dbpedia: ""
align_wikidata: ""

concept_subtype: EQUATION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.2

concepto_capabilities: [NORMATIVE, EQUATION]

concepto_facet_normative:
  norm_legal_ref: "[[decreto1330_2019]]"
  norm_article: "Art. 11 (definición); Art. 12 (composición horas)"
  norm_jurisdiction: "Ministerio de Educación Nacional, República de Colombia"
  norm_effective_date: "2019-07-25"
  norm_legal_force: BINDING
  norm_compliance_scope: "Todas las IES colombianas con registro calificado o acreditación"
  norm_supersedes: "Decreto MEN 1295/2010 Art. 11 (definición previa con rango sin fórmula vinculante)"

concepto_facet_equation:
  eq_latex_canonical: "h_{total} = 48 \\cdot n_{cr} \\quad ; \\quad h_{total} = h_{doc} + h_{ind}"
  eq_dimensions_si: "[h] = h (hora-reloj 60 min); [n_cr] = adimensional"
  eq_qudt_quantity_kind: "http://qudt.org/vocab/quantitykind/Time"
  eq_ucum_unit: "h"
  eq_variables:
    - "h_total — horas totales de trabajo académico por período"
    - "n_cr — número de créditos académicos del curso/programa"
    - "h_doc — horas de acompañamiento docente directo"
    - "h_ind — horas de trabajo independiente del estudiante"

applicable_domain: "Programas Académicos IES colombianas registradas en SNIES, vigentes desde 2019-07-25"
assumptions:
  - "Período académico de 16 semanas efectivas (estándar UDFJC y mayoría IES)"
  - "Hora-reloj 60 min (Decreto define hora-reloj, no 50-min)"
  - "Modalidad presencial: ratio típico 1:2 (1 hora docente : 2 horas independiente)"
breaks_at:
  - "Si MEN reforma con definición distinta de crédito"
  - "Programas internacionales con créditos ECTS requieren conversión 1 cr SNIES ≈ 1.6-1.8 ECTS"
  - "SENA niveles 1-2 NO se mide en créditos académicos sino en competencias laborales"
extends_to: "[[con-conversion-creditos-snies-ects]] (eventual)"

recorded_at: "2026-04-26"
valid_from: "2019-07-25"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": QuantitativeValue

tupla__relations:
  - rel_id: rel-credito-defined-by-decreto1330
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[decreto1330_2019]]"
    rel_frame: normativo
  - rel_id: rel-credito-mide-programa
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-programa-academico]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Programas Académicos miden su tamaño en créditos académicos"
  - rel_id: rel-credito-base-cca
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-cca]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CCA son Paquetes que se miden en créditos académicos (M06 BMK-002)"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-10--tdabc]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 5

tags: [glosario-universal, concepto-normativo, concepto-calculado, credito-academico, decreto-1330, snies, cca, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Crédito Académico (Decreto MEN 1330/2019 Art. 11)

## Definición operativa + fórmula vinculante

Unidad de medida del trabajo académico estudiantil en la educación superior colombiana, equivalente a **48 horas-reloj de trabajo total por período académico**, distribuidas entre acompañamiento docente directo ($h_{doc}$) y trabajo independiente ($h_{ind}$):

$$h_{total} = 48 \cdot n_{cr} \quad ; \quad h_{total} = h_{doc} + h_{ind}$$

## Modalidades estándar UDFJC

| Modalidad | Ratio típico h_doc : h_ind | h_doc por crédito | h_ind por crédito |
|---|---|---|---|
| Presencial | 1 : 2 | 16 h | 32 h |
| Virtual / a distancia | 1 : 3 a 1 : 5 | 8–12 h | 36–40 h |
| Dual (alternancia) | Variable según convenio | — | — |

## Fuente primaria

> **Decreto MEN 1330/2019 Art. 11** (definición), **Art. 12** (composición de horas). Deroga el Decreto 1295/2010 Art. 11.

## Lenguaje ubicuo asociado

Crédito Académico · Crédito SNIES · Hora-reloj 60 min · h_doc · h_ind · Modalidad · Período Académico · Paquete CCA.

## Notas de aplicación

- **Coexiste con CCA**: el CCA (M06) es un Paquete que se mide en créditos. Un Paquete CCA típico vale 4-12 créditos.
- **NO confundir con ECTS**: 1 cr SNIES (48 h) ≈ 1.6-1.8 ECTS (1 ECTS ~ 25-30 h).
