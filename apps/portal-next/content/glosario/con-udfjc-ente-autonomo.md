---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:udfjc-ente-autonomo
kd_title: "UDFJC como ente autónomo (Art. 1 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "UDFJC ente autónomo"

skos_prefLabel: "Universidad Distrital Francisco José de Caldas (ente autónomo)"
skos_altLabel:
  - "UDFJC"
  - "UD"
  - "Universidad Distrital"
  - "Universidad ente autónomo del Distrito Capital"
skos_definition: "Ente autónomo perteneciente al sector educativo del Distrito Capital de Bogotá, con personería jurídica, autonomía académica, administrativa, financiera y presupuestal, vinculado al Ministerio de Educación Nacional. Su carácter académico de Universidad la faculta para ofrecer programas de educación superior en cualquier nivel y modalidad, así como educación para el trabajo y el desarrollo humano, y desarrollar investigación-creación e innovación, extensión y proyección social en cualquier campo del conocimiento."
skos_scopeNote: "La autonomía de la UDFJC es funcional e instrumental (no soberanía absoluta): se ejerce dentro del marco de la Constitución Política, la Ley 30 de 1992 y la jurisprudencia. NO se confunde con autonomía territorial. Está vinculada al Ministerio de Educación Nacional para fines de regulación de educación superior."
skos_example: "Como ente autónomo, la UDFJC puede expedir su propio Estatuto General (ACU-004-25) sin requerir aprobación previa del Congreso, pero debe respetar los marcos de la Const. Art. 69 y la Ley 30 de 1992 Art. 28."
skos_notation: "UDFJC"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Ente público autónomo del orden distrital con carácter de Universidad"
iso_differentia: "Vinculado al MEN para fines de educación superior; con personería jurídica + autonomía académica/administrativa/financiera/presupuestal en marco Const. Art. 69 y Ley 30/92"
iso_subject_field: "Derecho universitario público colombiano / Naturaleza jurídica IES públicas distritales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 1; Const. Política 1991 Art. 69; Ley 30/1992 Art. 28, 57"

align_dbpedia: "http://dbpedia.org/resource/Francisco_José_de_Caldas_District_University"
align_wikidata: "https://www.wikidata.org/wiki/Q4807037"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-constitucion-1991-art-69]]"
      adopter_locator: "Const. 1991 Art. 69"
      adopter_authority_level: CONSTITUCIONAL
      adopted_at: "1991-07-04"
      adoption_evidence: "Art. 69 garantiza autonomía universitaria como base constitucional · UDFJC ejerce su autonomía 'de acuerdo con la ley'"
    - adopter: "[[con-ley-30-1992-art-6]]"
      adopter_locator: "Ley 30/1992 Arts. 28 + 57 + 6"
      adopter_authority_level: LEGAL
      adopted_at: "1992-12-28"
      adoption_evidence: "Ley 30/1992 reconoce a la UDFJC como ente universitario autónomo del orden distrital"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 1 (Naturaleza Jurídica)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara expresamente naturaleza de ente autónomo del Distrito Capital · vinculado al MEN"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: CONSTITUCIONAL
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 1 + Const. Art. 69 + Ley 30/1992 Arts. 28+57"
  normative_text: "[Texto literal Art. 1 ACU · ente autónomo del sector educativo del Distrito Capital con personería jurídica + autonomía académica/admin/financiera/presupuestal]"
  normative_authority_level: CONSTITUCIONAL
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "udfjc"
  ddd_aggregate_root: "Universidad"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root supremo del bounded context Gobierno Académico. Encapsula toda la institución como unidad jurídica con capacidad de auto-gobierno limitada por marco Constitucional + Ley 30."
  ddd_invariants:
    - "La UDFJC tiene una y solo una personería jurídica"
    - "Su autonomía es funcional/instrumental, NO absoluta (limitada por Const. + Ley 30)"
    - "Está adscrita al sector educativo del Distrito Capital de Bogotá"
    - "Vinculada al MEN para fines de regulación educación superior"
    - "Puede ofrecer programas en cualquier nivel y modalidad académica"
  ddd_ubiquitous_terms:
    - "UDFJC"
    - "Ente autónomo"
    - "Personería jurídica"
    - "Autonomía universitaria"
    - "Sector educativo Distrito Capital"
    - "Vinculación al MEN"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-1-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-1-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-constitucion-1991-art-69]]"
  - "[[con-ley-30-1992-art-6]]"

applicable_domain: "Toda actuación jurídica, académica, administrativa, financiera o presupuestal de la UDFJC desde 2025-05-06."
assumptions:
  - "El régimen jurídico colombiano de educación superior (Const. + Ley 30) sigue vigente"
  - "La UDFJC mantiene su carácter público distrital"
breaks_at:
  - "Si Ley 30/1992 se reforma con marco distinto"
  - "Si la UDFJC fuera transformada en otra modalidad jurídica (improbable)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-udfjc-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: derecho-universitario
    rel_propiedades:
      norm_relation_type: defined_by
      norm_evidence: "ACU-004-25 Art. 1 (texto literal de naturaleza jurídica)"
  - rel_id: rel-udfjc-ejerce-autonomia
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-autonomia-funcional-instrumental]]"
    rel_frame: skos
    bc_domain: derecho-constitucional
    rel_propiedades:
      skos_relation_type: related
      skos_strength: 1.0
      skos_evidence: "Como ente autónomo, ejerce la autonomía universitaria del Art. 69 Const. en lectura funcional-instrumental (M01 §2.3): autonomía NO es soberanía absoluta, es capacidad operativa dentro del marco legal Ley 30."
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-udfjc-implements-art69
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-constitucion-1991-art-69]]"
    rel_frame: normativo
  - rel_id: rel-udfjc-implements-ley30
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-30-1992-art-6]]"
    rel_frame: normativo
  - rel_id: rel-udfjc-pertenece-sncti
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-sncti]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Como IES pública, UDFJC pertenece al Sistema Nacional CTI por mandato Ley 1286/2009"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-01--mandato-normativo]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - udfjc
  - ente-autonomo
  - art-1
  - naturaleza-juridica
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# UDFJC como ente autónomo (Art. 1 ACU-004-25)

## Definición operativa

La Universidad Distrital Francisco José de Caldas es un **ente autónomo** del sector educativo del Distrito Capital de Bogotá, con **personería jurídica** propia y **autonomía académica, administrativa, financiera y presupuestal**, vinculada al Ministerio de Educación Nacional para fines de regulación de educación superior. Su carácter de Universidad la faculta para ofrecer programas de educación superior en cualquier nivel académico (técnico, tecnológico, profesional, posgrado) y modalidad (presencial, virtual, dual), así como educación para el trabajo y el desarrollo humano, y desarrollar las tres funciones misionales —formación-docencia, investigación-creación-innovación, contextos-extensión-proyección social— en cualquier campo del conocimiento.

## Fuente primaria (cita textual)

> "La Universidad Distrital Francisco José de Caldas es un ente autónomo, perteneciente al sector educativo del Distrito Capital, con personería jurídica, autonomía académica, administrativa, financiera y presupuestal, vinculada al Ministerio de Educación Nacional. Su carácter académico de Universidad la faculta para ofrecer programas de educación superior en cualquier nivel académico, nivel de formación y modalidad, así como programas de educación para el trabajo y el desarrollo humano, y para desarrollar investigación-creación e innovación, extensión y proyección social, en cualquier campo del conocimiento..." — **ACU-004-25 Art. 1**.

## Invariantes operativas DDD

1. La UDFJC tiene **una y solo una** personería jurídica.
2. Su autonomía es **funcional e instrumental**, NO absoluta — está limitada por la Constitución Política Art. 69 y la Ley 30/1992 Art. 28.
3. Está adscrita al **sector educativo del Distrito Capital de Bogotá** (no es nacional).
4. Está **vinculada al MEN** para fines de regulación de educación superior (registro calificado, acreditación).
5. Puede ofrecer programas en cualquier nivel académico y cualquier modalidad sin restricciones distintas a las legales generales.

## Lenguaje ubicuo asociado

UDFJC · Universidad Distrital · Ente autónomo · Personería jurídica · Autonomía funcional instrumental · Sector educativo Distrito Capital · Vinculación al MEN.

## Notas de aplicación

- **No confundir con autonomía absoluta**: la UDFJC NO puede contradecir la Constitución, la Ley 30 ni los Decretos reglamentarios del MEN. Cualquier acto administrativo institucional debe respetar este marco.
- **No confundir con universidad nacional**: la UDFJC es **distrital** (orden territorial Bogotá D.C.), distinta de la Universidad Nacional de Colombia y de las universidades departamentales.
- **Conexión con Art. 5b** (autonomía universitaria como principio): la naturaleza jurídica del Art. 1 se complementa operativamente con el principio de autonomía del Art. 5b que define cómo se ejerce.
