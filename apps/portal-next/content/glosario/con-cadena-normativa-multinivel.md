---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cadena-normativa-multinivel
kd_title: "Cadena Normativa Multinivel UDFJC (síntesis M01: MCU 2020 → ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Cadena Normativa Multinivel"

skos_prefLabel: "Cadena Normativa Multinivel UDFJC"
skos_altLabel: ["Multilevel Normative Chain", "Cascada normativa reforma UDFJC", "Cadena vinculante M01"]
skos_hiddenLabel: ["cadena-normativa-multinivel", "cadena-normativa"]
skos_definition: "Síntesis conceptual propietaria UDFJC (Madera Sepúlveda, 2026, M01) que designa la jerarquía de instrumentos normativos vinculantes que convierte la reforma de la UDFJC en mandato (no opción discrecional). La cadena tiene siete eslabones encadenados: (1) Magna Charta Universitatum 2020 [referente internacional]; (2) Frame 3 Schot-Steinmueller 2018 [marco teórico]; (3) UNESCO Reimagining Our Futures 2021 [referente internacional]; (4) Constitución Política 1991 Art. 69 [norma constitucional]; (5) Ley 30/1992 Art. 6 [eslabón vinculante — convierte cadena en obligación legal]; (6) CONPES 4069/2021 + CONPES 3934/2018 + PIIOM 2022-2026 [política nacional + operacionalización]; (7) Acuerdo CSU 04/2025 [norma institucional — operacionaliza al interior UDFJC]. La cadena demuestra que ACU-004-25 es respuesta institucional **obligada**, no preferencia discrecional."
skos_scopeNote: "La cadena combina niveles internacionales (referentes no vinculantes directos pero informadores), nacionales constitucionales (vinculantes máximos), legales (vinculantes operativos), de política pública (vinculantes vía Ley 30 Art. 6) e institucionales (vinculantes internos UDFJC). El eslabón crítico que hace TODA la cadena vinculante es Ley 30 Art. 6: sin él, la cadena se rompería en el nivel CONPES."
skos_example: "Una unidad UDFJC que invoque autonomía universitaria del Art. 69 para no implementar el ACU-004-25 enfrenta: (a) Const. Art. 69 dice 'de acuerdo con la ley'; (b) Ley 30 Art. 6 obliga a 'solucionar necesidades nacionales'; (c) CONPES 4069 define cuáles son esas necesidades (5 misiones PIIOM); (d) ACU-004-25 operacionaliza Frame 3 al interior UDFJC. La cadena cierra: no implementar el ACU-004-25 viola la cadena multinivel vinculante."
skos_notation: "Cadena normativa multinivel"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Síntesis conceptual de jerarquía normativa multi-nivel aplicada a reforma universitaria"
iso_differentia: "Construcción propietaria UDFJC; siete eslabones desde MCU 2020 hasta ACU-004-25; vinculatividad asegurada por Ley 30 Art. 6"
iso_subject_field: "Análisis normativo multinivel / Jerarquía de fuentes / Reforma UDFJC"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) — elaboración propia M01"

align_schema_type: DefinedTerm
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.85

concepto_capabilities: [NORMATIVE, NEON]

concepto_facet_normative:
  norm_legal_ref: "Múltiples — ver eslabones de la cadena"
  norm_article: "Síntesis articulada"
  norm_jurisdiction: "Internacional + Constitución + Ley + CONPES + IES"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda actuación institucional UDFJC"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Síntesis propietaria de [[con-mcu-2020]] + [[con-frame-3]] + [[con-constitucion-1991-art-69]] + [[con-ley-30-1992-art-6]] + [[con-conpes-4069]] + [[con-conpes-3934]] + [[con-piiom]] + [[con-acu-004-25]]"
  neon_alignment_confidence: 0.9
  neon_methodological_notes: "Cadena documentada en M01 §4.1-§4.7; base argumentativa de toda la reforma vinculante UDFJC."

applicable_domain: "Argumentación jurídica + interpretativa de reforma UDFJC"
assumptions: ["Los eslabones de la cadena permanecen vigentes (vencen escalonadamente: PIIOM 2026, MCU permanente, Const indefinido)"]
breaks_at: ["Si se reforma Ley 30/1992 Art. 6 (proyecto en discusión 2024-2026)"]
extends_to: ""

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-cadena-implements-mcu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-mcu-2020]]"
    rel_frame: skos
  - rel_id: rel-cadena-implements-frame3
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
  - rel_id: rel-cadena-implements-art69
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-constitucion-1991-art-69]]"
    rel_frame: normativo
  - rel_id: rel-cadena-implements-art6
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-30-1992-art-6]]"
    rel_frame: normativo
  - rel_id: rel-cadena-implements-conpes4069
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-conpes-4069]]"
    rel_frame: normativo
  - rel_id: rel-cadena-implements-piiom
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-piiom]]"
    rel_frame: normativo
  - rel_id: rel-cadena-converge-acu
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags: [glosario-universal, concepto-sintesis, cadena-normativa-multinivel, m01-corpus, propietario-udfjc, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# Cadena Normativa Multinivel UDFJC

## Definición operativa

Síntesis conceptual propietaria UDFJC (Madera Sepúlveda, 2026, M01) que designa la **jerarquía de instrumentos normativos vinculantes** que convierte la reforma de la UDFJC en **mandato** (no opción discrecional).

## Los siete eslabones

| # | Nivel | Instrumento | Función |
|:-:|---|---|---|
| 1 | Internacional | [[con-mcu-2020\|MCU 2020]] | Referente de autonomía positiva |
| 2 | Teórico | [[con-frame-3\|Frame 3]] (Schot-Steinmueller 2018) | Marco direccionalidad transformativa |
| 3 | Internacional | UNESCO Reimagining 2021 | Bien común + sostenibilidad |
| 4 | Constitucional | [[con-constitucion-1991-art-69\|Const. 1991 Art. 69]] | Autonomía universitaria |
| 5 | **Legal — eslabón vinculante** | [[con-ley-30-1992-art-6\|Ley 30/1992 Art. 6]] | **Convierte cadena en obligación legal** |
| 6 | Política pública | [[con-conpes-4069\|CONPES 4069]] + [[con-conpes-3934\|3934]] + [[con-piiom\|PIIOM]] | Define necesidades + operacionaliza |
| 7 | Institucional | [[con-acu-004-25\|ACU-004-25]] | Operacionaliza al interior UDFJC |

## Lenguaje ubicuo asociado

Cadena normativa multinivel · Eslabones · Eslabón vinculante · Cascada normativa · Síntesis M01.

## Notas de aplicación

- **Argumentación principal M01**: la cadena demuestra que ACU-004-25 es **respuesta institucional obligada**, no preferencia discrecional.
- **Eslabón crítico**: Ley 30 Art. 6 — sin él, la cadena se rompería en CONPES.
