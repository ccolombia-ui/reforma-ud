---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ole-observatorio-laboral
kd_title: "OLE · Observatorio Laboral para la Educación (MEN Colombia)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "OLE · Observatorio Laboral para la Educación"

skos_prefLabel: "OLE · Observatorio Laboral para la Educación (MEN Colombia)"
skos_altLabel: ["OLE", "Observatorio Laboral", "MEN OLE"]
skos_definition: "Sistema del **Ministerio de Educación Nacional (MEN) Colombia** que mide la **vinculación laboral post-egreso** de los graduados de educación superior mediante cruce con datos de Cotización a Salud y Pensiones (PILA). Cobertura: (i) **tasa de vinculación al mercado laboral formal** post-graduación (1, 3, 5 años); (ii) **salario mediana primer empleo** por programa-cohorte; (iii) **sectorización CIIU** del primer empleo; (iv) **movilidad geográfica** post-egreso. Granularidad: cohorte-año-programa. Limitación: rezago 2-3 años respecto a graduación (los empleos se miden en años post-egreso). Aplicado al cap-MI12: OLE alimenta P1 del framework M08 (salario mediana primer empleo como métrica de impacto misional) + R6 (Egresados Agentes) del ciclo virtuoso ΩMT."
skos_scopeNote: "OLE mide solo empleo formal (con cotización PILA) — subestima trayectorias informales o emprendedoras. NO confundir con SPADIES (deserción) ni SNIES (matrícula)."
skos_example: "Análisis OLE programa Ingeniería Eléctrica UDFJC cohorte 2018: tasa vinculación 3 años = 87%; salario mediana primer empleo = 2.8 SMMLV-CO; sector dominante CIIU 35 (suministro electricidad)."
skos_notation: "OLE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema oficial de medición de empleabilidad post-egreso"
iso_differentia: "Operado por MEN; cruce con PILA; rezago 2-3 años; granularidad cohorte-año-programa"
iso_subject_field: "Higher education / Labor outcomes / Government data"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional - República de Colombia"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "MEN Colombia OLE"
  neon_alignment_confidence: 0.93

applicable_domain: "Análisis empleabilidad UDFJC + alimentación P1 M08 + diagnóstico R6 egresados"
assumptions:
  - "El empleo formal con PILA es proxy razonable de empleabilidad"
breaks_at:
  - "Si se subestima informalidad y emprendimiento (ambos invisibles a OLE)"

valid_from: "2007-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-ole-mide-r6
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OLE mide empíricamente R6 (Egresados Agentes) del ciclo virtuoso ΩMT — empleabilidad + sectorización + movilidad geográfica son indicadores."
  - rel_id: rel-ole-complementa-snies
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-snies-dataset-men]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OLE complementa SNIES: SNIES da matrícula y graduación; OLE da trayectoria laboral post-egreso."

cited_in: ["[[sec-MI12-11--datasets-men]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t6-datos-sistemas
  - ole
  - men-colombia
  - dataset-oficial
  - empleabilidad-pila
  - m11-corpus
  - audit-v2-2
---


# OLE · Observatorio Laboral para la Educación

## Definición operativa

Sistema MEN que mide vinculación post-egreso vía cruce PILA.

## Cobertura

- Tasa vinculación 1/3/5 años · Salario mediana primer empleo · Sectorización CIIU · Movilidad geográfica.

## Limitación

Rezago 2-3 años respecto graduación. Subestima informalidad y emprendimiento.

## Fuente primaria

> Ministerio de Educación Nacional Colombia. OLE.

## Notas de aplicación

- **Conexión M11**: dataset 2/3.
- **Conexión M02 R6**: indicador empírico de Egresados Agentes.
