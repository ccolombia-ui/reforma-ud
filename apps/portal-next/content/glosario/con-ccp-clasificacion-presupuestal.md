---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ccp-clasificacion-presupuestal
kd_title: "CCP · Catálogo de Clasificación Presupuestal del MHCP Colombia"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "CCP · Catálogo Clasificación Presupuestal"

skos_prefLabel: "CCP · Catálogo de Clasificación Presupuestal MHCP"
skos_altLabel: ["CCP", "Catálogo Clasificación Presupuestal", "MHCP CCP"]
skos_definition: "Catálogo oficial del **Ministerio de Hacienda y Crédito Público (MHCP) de Colombia** que estandariza la clasificación, codificación y presentación del presupuesto público para todas las entidades del Presupuesto General de la Nación + entidades territoriales + entidades públicas autónomas como UDFJC. Estructurado en **8 niveles jerárquicos** (Sección, Tipo, Cuenta, Subcuenta, Objeto, Subobjeto, Concepto, Subconcepto) que descomponen ingresos, gastos de funcionamiento, gastos de inversión y servicio de deuda. El CCP opera dentro del marco normativo del **Decreto 111/1996** (Estatuto Orgánico de Presupuesto) y se actualiza anualmente. Aplicado a UDFJC: el presupuesto 2026 ($548.568M COP) se clasifica en 3 fondos × 8 niveles CCP — la granularidad permite analizar costos por unidad académica + por proceso misional + por BPA × CAPEX/OPEX (M08 P4)."
skos_scopeNote: "CCP NO es contabilidad — es clasificación PRESUPUESTAL. Coexiste con NICSP (contabilidad): el CCP organiza el presupuesto ex-ante; las NICSP rigen el reporte ex-post. Ambos son obligatorios y complementarios."
skos_example: "Una BPA INT01 (Living Lab Sumapaz) UDFJC con costo anual $10.4M COP se clasifica en CCP así: Sección 1116 (UDFJC) → Tipo 02 (Inversión) → Cuenta 02-04 (Investigación + Innovación) → Subcuenta 02-04-001 (Living Labs) → Objeto 02-04-001-001 (Bioeconomía Sumapaz). La granularidad de 8 niveles permite trazabilidad PIIOM."
skos_notation: "CCP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Catálogo de clasificación presupuestal pública nacional"
iso_differentia: "8 niveles jerárquicos; emitido MHCP Colombia; actualizado anualmente; coexiste con NICSP"
iso_subject_field: "Public budget / Government finance / Colombia public sector"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Hacienda y Crédito Público de Colombia · Catálogo de Clasificación Presupuestal (anual)"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - NEON

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-mhcp-ccp-decreto-111-1996]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-decreto-111-1996-estatuto-presupuesto]]"
      adopter_locator: "Decreto 111/1996 · Estatuto Orgánico de Presupuesto"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "1996-01-15"
      adoption_evidence: "Decreto 111/1996 establece marco legal del CCP nacional"
    - adopter: "[[con-mhcp-ccp-anual]]"
      adopter_locator: "Catálogo CCP MHCP · actualización anual"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2018-01-01"
      adoption_evidence: "MHCP actualiza CCP anualmente · vinculante para entidades públicas incluida UDFJC"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: REGLAMENTARIO
  normative_source: "[[cita-mhcp-ccp-anual]]"
  normative_locator: "Decreto 111/1996 + CCP MHCP anual · 8 niveles jerárquicos"
  normative_text: "[Catálogo CCP · 8 niveles: Sección/Tipo/Cuenta/Subcuenta/Objeto/Subobjeto/Concepto/Subconcepto]"
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "MHCP Colombia CCP"
  neon_alignment_confidence: 0.95

concepto_definitional_anchors:
  - "[[def-norm-mhcp-ccp-decreto-111-1996]]"
concepto_current_anchor: "[[def-norm-mhcp-ccp-decreto-111-1996]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos: []

applicable_domain: "Clasificación presupuestal UDFJC + trazabilidad PIIOM por rubro + benchmarking BMK-001"
assumptions: ["MHCP actualiza CCP anualmente sin reformas estructurales"]
breaks_at: ["Si se confunde con NICSP (clasificación presupuestal vs contable)"]

valid_from: "1996-01-01"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-ccp-coexiste-nicsp
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-nicsp-marco-estado-resultados]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CCP (clasificación presupuestal ex-ante) y NICSP (contabilidad ex-post) son obligatorios complementarios."

cited_in: ["[[sec-MI12-09--ds-presupuesto-nicsp]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - ccp
  - mhcp
  - presupuesto-publico
  - m09-corpus
  - audit-v2-2
  - tpl-v2
---


# CCP · Catálogo de Clasificación Presupuestal MHCP

## Definición operativa

Catálogo oficial del MHCP Colombia · 8 niveles jerárquicos · actualizado anualmente.

## 8 niveles

Sección · Tipo · Cuenta · Subcuenta · Objeto · Subobjeto · Concepto · Subconcepto.

## Fuente primaria

> Decreto 111/1996 + CCP MHCP anual.

## Lenguaje ubicuo asociado

CCP · MHCP · 8 niveles · Decreto 111.

## Notas de aplicación

- **Conexión M09**: estructura presupuesto UDFJC 2026.
- **Coexiste con NICSP** (presupuesto + contabilidad).
