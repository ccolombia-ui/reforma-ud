---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:conpes-4069
kd_title: "CONPES 4069/2021 — Política Nacional CTI 2022-2031"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "CONPES 4069/2021"

skos_prefLabel: "CONPES 4069/2021 — Política Nacional CTI"
skos_altLabel: ["CONPES 4069", "Política Nacional CTI 2022-2031", "Document CONPES 4069"]
skos_hiddenLabel: ["conpes-4069", "conpes-4069-2021"]
skos_definition: "Documento del Consejo Nacional de Política Económica y Social (CONPES) número 4069 de 2021 que establece la Política Nacional de Ciencia, Tecnología e Innovación (CTI) para el período 2022-2031. Sus tres aportes fundamentales: (1) **adopta Frame 3** de Schot & Steinmueller como paradigma rector — la CTI debe asumir direccionalidad transformativa, no solo producir conocimiento (Frame 1) ni conectar actores (Frame 2); (2) **establece 5 misiones nacionales** que el SNCTI debe operacionalizar vía PIIOM 2022-2026; (3) **adopta Quintuple Helix** (Carayannis 2012) incorporando universidad-industria-gobierno-sociedad civil-medio ambiente. Es el instrumento que convierte el deber misional del Art. 6 Ley 30/1992 en mandato CTI vinculante para IES públicas en el decenio 2022-2031."
skos_scopeNote: "El CONPES 4069 NO es ley pero es política pública vinculante para entidades del Estado vía Plan Nacional de Desarrollo. Para las IES públicas, su mandato se vuelve obligación legal vía cadena Const. 1991 Art. 69 → Ley 30/1992 Art. 6 → CONPES 4069. Sin esta cadena, sería orientación; con esta cadena, es objetivo legal cuya omisión viola Ley 30."
skos_example: "El CONPES 4069 define 5 misiones nacionales (Bioeconomía, Alimentaria, Energética, Sanitaria, Equitativa). UDFJC debe poder demostrar que sus proyectos PM2 contribuyen a al menos una de estas 5 misiones. Si no, está omitiendo el Art. 6 Ley 30 según define el CONPES 4069 las necesidades nacionales del decenio."
skos_notation: "CONPES 4069"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Documento de política pública del Consejo Nacional de Política Económica y Social"
iso_differentia: "Adopta Frame 3 + 5 misiones PIIOM + Quintuple Helix; rige Política Nacional CTI 2022-2031"
iso_subject_field: "Política pública CTI Colombia / Direccionalidad transformativa nacional"
iso_term_status: preferred
iso_standardized_by: "Consejo Nacional de Política Económica y Social — DNP / Colombia"

align_schema_type: Legislation
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[conpes2021cti]]"
  norm_article: "Documento CONPES 4069 (completo) — referenciado por Plan Nacional de Desarrollo"
  norm_jurisdiction: "Consejo Nacional de Política Económica y Social (CONPES) - DNP - Colombia"
  norm_effective_date: "2021-12-21"
  norm_legal_force: BINDING
  norm_compliance_scope: "Sistema Nacional de CTI (SNCTI), todas las IES públicas, entidades del Estado vía PND"

applicable_domain: "Sistema Nacional CTI Colombia 2022-2031 + Plan Nacional Desarrollo + IES públicas"
assumptions: ["El PND 2022-2026 incorpora CONPES 4069 como referente"]
breaks_at: ["Si nuevo CONPES revisa la política CTI antes de 2031"]
extends_to: "[[con-piiom]] (operacionalización vía MinCiencias 2022-2026)"

recorded_at: "2026-04-26"
valid_from: "2021-12-21"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Legislation

tupla__relations:
  - rel_id: rel-conpes-fuente
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[conpes2021cti]]"
    rel_frame: bibliografico
  - rel_id: rel-conpes-implements-art6
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-30-1992-art-6]]"
    rel_frame: normativo
  - rel_id: rel-conpes-adopts-frame3
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
  - rel_id: rel-conpes-adopts-quintuple
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-quintuple-helix]]"
    rel_frame: skos
  - rel_id: rel-conpes-mandates-piiom
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-piiom]]"
    rel_frame: normativo

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]"]
cited_count: 3

tags: [glosario-universal, concepto-normativo, conpes-4069, politica-cti, frame-3, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# CONPES 4069/2021 — Política Nacional CTI 2022-2031

## Definición operativa

Documento del **Consejo Nacional de Política Económica y Social** que establece la **Política Nacional de Ciencia, Tecnología e Innovación** para 2022-2031.

## Tres aportes fundamentales

| # | Aporte | Detalle |
|:-:|---|---|
| 1 | **Adopta [[con-frame-3\|Frame 3]]** | CTI debe asumir direccionalidad transformativa (no solo Frame 1 producir o Frame 2 conectar) |
| 2 | **Establece 5 misiones nacionales** | Operacionalizadas vía [[con-piiom\|PIIOM 2022-2026]]: Bioeconomía, Alimentaria, Energética, Sanitaria, Equitativa |
| 3 | **Adopta [[con-quintuple-helix\|Quintuple Helix]]** | Universidad + Industria + Gobierno + Sociedad civil + Medio ambiente |

## Fuente primaria

> CONPES (2021). *Documento CONPES 4069: Política Nacional de Ciencia, Tecnología e Innovación 2022-2031*. DNP, Colombia.

## Lenguaje ubicuo asociado

CONPES 4069 · Política Nacional CTI · 5 misiones · SNCTI · Decenio 2022-2031 · Frame 3 + Q5.

## Notas de aplicación

- **Cadena vinculante**: Const. Art. 69 → Ley 30 Art. 6 → CONPES 4069 → PIIOM → ACU-004-25 (institucional UDFJC).
- **Conexión M01 §4.4**: tres aportes desarrollados en detalle.
