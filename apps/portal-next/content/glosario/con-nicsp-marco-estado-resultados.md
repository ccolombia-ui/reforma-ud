---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:nicsp-marco-estado-resultados
kd_title: "NICSP · Normas Internacionales de Contabilidad del Sector Público (IPSAS)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "NICSP · Normas Internacionales Contabilidad Sector Público"

skos_prefLabel: "NICSP · Normas Internacionales de Contabilidad del Sector Público (IPSAS)"
skos_altLabel: ["NICSP", "IPSAS", "International Public Sector Accounting Standards", "Normas Contabilidad Sector Público"]
skos_definition: "Conjunto de **normas internacionales de contabilidad del sector público** (NICSP, traducción de IPSAS — *International Public Sector Accounting Standards*) emitidas por el **IPSASB** (International Public Sector Accounting Standards Board) bajo IFAC (International Federation of Accountants) que estandarizan los criterios de reconocimiento, medición, presentación y revelación de transacciones en estados financieros de entidades públicas. Las NICSP son el referente global; en Colombia, la **Contaduría General de la Nación** ha adoptado el marco mediante Resoluciones 533/2015 + 116/2017 + actualizaciones, aplicable a todas las entidades públicas incluidas IES estatales como UDFJC. Las **18 NICSP críticas para UDFJC** documentadas en M09 §4 son: NICSP 1 (presentación), 3 (políticas contables), 5 (costos por intereses), 9 (ingresos transacciones de intercambio), 11 (contratos construcción), 12 (inventarios), 17 (PPE), 19 (provisiones), 21 (deterioro), 23 (ingresos sin contraprestación), 24 (presupuesto), 26 (deterioro generadoras efectivo), 27 (agricultura), 31 (intangibles), 32 (acuerdos concesión), 33 (adopción primera vez), 36 (asociadas), 38 (revelaciones partes relacionadas). Aplicado al M09 + M10 + M11: las NICSP son el lenguaje contable estándar para reportes financieros UDFJC + entrada al cálculo CCR (TDABC) + benchmarking BMK-001."
skos_scopeNote: "NICSP NO es Decreto Único Reglamentario MEN — son normas contables específicas. NO confundir con NIIF (Normas Internacionales de Información Financiera) que aplican a sector privado. Las IES públicas colombianas aplican NICSP, no NIIF."
skos_example: "UDFJC reporta provisiones por demandas judiciales aplicando NICSP 19; deprecia activos de equipo de cómputo aplicando NICSP 17; revela transacciones con CSU + Alcaldía + MEN aplicando NICSP 38."
skos_notation: "NICSP/IPSAS"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco internacional de normas contables del sector público"
iso_differentia: "Emitidas por IPSASB-IFAC; adoptadas en Colombia vía Resoluciones CGN; 18 NICSP críticas aplicables a IES públicas UDFJC"
iso_subject_field: "Public sector accounting / Financial reporting / Government accounting"
iso_term_status: preferred
iso_standardized_by: "IPSASB-IFAC + Contaduría General de la Nación Colombia (Resolución 533/2015 + 116/2017)"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - NEON

concepto_facet_normative:
  origin_type: INTERNATIONAL_VOLUNTARY
  origin_source: "[[cita-ipsasb-ipsas-international]]"
  origin_force: VOLUNTARY
  adoption_chain:
    - adopter: "[[con-resolucion-cgn-533-2015]]"
      adopter_locator: "Resolución CGN 533/2015 · adopción nacional"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-10-08"
      adoption_evidence: "Contaduría General de la Nación adopta IPSAS como NICSP vinculantes para sector público colombiano"
    - adopter: "[[con-resolucion-cgn-116-2017]]"
      adopter_locator: "Resolución CGN 116/2017 · actualización"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2017-04-26"
      adoption_evidence: "CGN actualiza marco NICSP · vigente desde 2018-01-01"
  effective_force_in_udfjc: BINDING_BY_ADOPTION
  effective_authority_level: REGLAMENTARIO
  normative_source: "[[cita-cgn-resolucion-533-2015]]"
  normative_locator: "Resoluciones CGN 533/2015 + 116/2017 + 18 NICSP críticas (1, 3, 5, 9, 11, 12, 17, 19, 21, 23, 24, 26, 27, 31, 32, 33, 36, 38)"
  normative_text: "[Marco IPSAS internacional + adopción nacional CGN · vinculante IES públicas]"
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "IPSASB IPSAS + CGN Colombia"
  neon_alignment_confidence: 0.97

concepto_definitional_anchors:
  - "[[def-norm-cgn-resolucion-533-2015]]"
  - "[[def-norm-cgn-resolucion-116-2017]]"
concepto_current_anchor: "[[def-norm-cgn-resolucion-116-2017]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos: []

applicable_domain: "Reporte financiero UDFJC + cálculo CCR + benchmark BMK-001 financiero"
assumptions:
  - "Las 18 NICSP cubren mayoría de transacciones UDFJC"
breaks_at:
  - "Si se confunde con NIIF (sector privado)"

valid_from: "2018-01-01"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-nicsp-alimenta-ccr
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-ccr-capacity-cost-rate]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "NICSP 17 (PPE) + NICSP 24 (presupuesto) son insumos críticos para el cálculo CCR (TDABC) — sin reportes NICSP, no hay datos para TDABC."
  - rel_id: rel-nicsp-fuente-presupuesto-udfjc
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-ccp-clasificacion-presupuestal]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CCP (Catálogo de Clasificación Presupuestal MHCP) opera dentro del marco NICSP — son complementarios."

cited_in: ["[[sec-MI12-09--ds-presupuesto-nicsp]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - nicsp
  - ipsas
  - cgn-colombia
  - cadena-adopcion
  - m09-corpus
  - audit-v2-2
  - tpl-v2
---


# NICSP · Normas Internacionales de Contabilidad del Sector Público

## Definición operativa

Marco contable internacional aplicable a entidades públicas. Adoptado en Colombia vía Resoluciones CGN.

## 18 NICSP críticas para UDFJC

NICSP 1, 3, 5, 9, 11, 12, 17, 19, 21, 23, 24, 26, 27, 31, 32, 33, 36, 38.

## Fuente primaria

> IPSASB-IFAC + Resolución CGN 533/2015.

## Lenguaje ubicuo asociado

NICSP · IPSAS · 18 NICSP · CGN · Contabilidad sector público.

## Notas de aplicación

- **Conexión M09**: marco contable principal.
- **NO confundir** con NIIF (sector privado).
