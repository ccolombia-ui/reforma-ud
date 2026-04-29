---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:rectoria
kd_title: "Rectoría UDFJC (Arts. 33-39 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Rectoría UDFJC"

skos_prefLabel: "Rectoría UDFJC"
skos_altLabel: ["Rector(a)", "Despacho Rectoral", "Rectorate UDFJC"]
skos_definition: "Órgano ejecutivo unipersonal que ejerce la representación legal de la UDFJC y la dirección administrativa, financiera y académica institucional. El/la rector(a) es elegido(a) según los procedimientos del Estatuto vigente y de la Ley 30/1992. Sus actos administrativos son Resoluciones de Rectoría. Tiene voz sin voto en el CSU (Art. 22) pero preside el CACAD (Art. 30). Durante el período de transición de 4 años (Arts. 96-100), conforme al Art. 107, ejerce potestad rectoral discrecional para designar directores de Escuelas, Centros e Institutos en los primeros 2 años (excepción al régimen electoral)."
skos_scopeNote: "La Rectoría es el órgano ejecutivo único: NO es colegiado. Sus competencias se distribuyen entre dirección política (representación legal, ejecución de Acuerdos del CSU), dirección administrativa (gestión presupuestal y de personal), y presidencia del CACAD. Las Resoluciones de Rectoría operacionalizan los Acuerdos del CSU y las Resoluciones del CACAD."
skos_example: "Las Resoluciones de Rectoría 334/2025 y 335/2025 (registradas en SISGRAL) ejecutan disposiciones del ACU-004-25 sobre transición administrativa."
skos_notation: "Rectoría"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano ejecutivo unipersonal de dirección institucional universitaria"
iso_differentia: "Representa legalmente a la UDFJC; preside el CACAD; con voz sin voto en CSU; ejerce potestad rectoral discrecional 2025-2027 en designación de directores"
iso_subject_field: "Dirección universitaria / Derecho administrativo universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 33-39; Art. 107 (potestad transitoria)"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-30-1992-art-6]]"
      adopter_locator: "Ley 30/1992 · figura del Rector como representante legal IES"
      adopter_authority_level: LEGAL
      adopted_at: "1992-12-28"
      adoption_evidence: "Ley 30/1992 establece la figura del Rector como representante legal y ejecutivo de las IES públicas"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Arts. 33-39 + Art. 107 (potestad transitoria 2025-2027)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 actualiza funciones rectorales + introduce potestad transitoria Art. 107 (2025-2027)"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 33-39 + Art. 107"
  normative_text: "[Texto literal Arts. 33-39]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "rectoria"
  ddd_aggregate_root: "Rectoria"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root unipersonal — único órgano ejecutivo. Representa legalmente, ejecuta acuerdos del CSU/CACAD, preside CACAD."
  ddd_invariants:
    - "La Rectoría es órgano unipersonal (un único titular en cada momento)"
    - "El rector(a) preside CACAD pero tiene solo voz en CSU"
    - "Resoluciones de Rectoría son numeradas y fechadas"
    - "La potestad rectoral discrecional Art. 107 es válida solo durante 2025-05-05 a 2027-05-05"
  ddd_ubiquitous_terms:
    - "Rectoría · Rector(a)"
    - "Resolución de Rectoría"
    - "Representación legal"
    - "Potestad rectoral transitoria"
    - "Despacho Rectoral"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-arts-33-39-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-arts-33-39-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-csu-consejo-superior-universitario]]"
  - "[[con-ley-30-1992-art-6]]"

applicable_domain: "UDFJC vigente desde 2025-05-06; potestad rectoral discrecional Art. 107 vigente solo hasta 2027-05-05."
assumptions:
  - "La potestad transitoria Art. 107 NO se confunde con discrecionalidad permanente"
breaks_at:
  - "2027-05-05: vence la potestad rectoral discrecional Art. 107 — los directores deben pasar a régimen electoral"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-rectoria-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-rectoria-preside-cacad
    rel_nombre: ddd_part_of
    rel_direccion: co
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: skos
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-rectoria-responsable-plan-implementacion
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-plan-implementacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Rectoría es responsable operativa de elaborar y presentar al CSU el Plan de Implementación Art. 98 (M01 §4.7: VENCIDO 2025-06-19)"
  - rel_id: rel-rectoria-ejerce-potestad-art107
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-potestad-rectoral-transitoria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Durante 2025-2027 (Art. 107) ejerce potestad excepcional de designar Directores de Escuelas/Institutos/Centros sin elección"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - rectoria
  - organo-ejecutivo
  - arts-33-39
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Rectoría UDFJC (Arts. 33-39 ACU-004-25)

## Definición operativa

Órgano ejecutivo **unipersonal** que ejerce la representación legal de la UDFJC y la dirección administrativa, financiera y académica institucional. El/la rector(a) es elegido(a) según procedimientos del Estatuto y de la Ley 30/1992. Sus actos son **Resoluciones de Rectoría** numeradas y fechadas.

## Posiciones del/de la rector(a) en órganos colegiados

| Órgano | Posición | Voto |
|---|---|:---:|
| CSU | Miembro | Voz, NO voto (Art. 22) |
| CACAD | **Presidencia** (Art. 30) | ✅ decisorio en empates |
| Asamblea Universitaria | Convoca y participa | Según reglamento |

## Régimen excepcional Art. 107 (2025-2027)

> Durante los **dos (2) años siguientes** a partir de la publicación del Estatuto, la designación de los directores de escuelas, centros e institutos será **potestativa del rector(a)** — única excepción al régimen electoral durante la transición.

**Vencimiento legal**: 2027-05-05.

## Fuente primaria

> Arts. 33-39 ACU-004-25 (composición, funciones, periodo); Art. 107 (potestad rectoral transitoria); Art. 22 (relación con CSU); Art. 30 (presidencia CACAD).

## Invariantes operativas DDD

1. Órgano **unipersonal** (un único titular en cada momento).
2. Rector(a) **preside CACAD** pero tiene solo voz en CSU.
3. Resoluciones de Rectoría **numeradas y fechadas**.
4. Potestad rectoral Art. 107 vigente **solo** entre 2025-05-05 y 2027-05-05.

## Lenguaje ubicuo asociado

Rectoría · Rector(a) · Resolución de Rectoría · Representación legal · Potestad rectoral transitoria · Despacho Rectoral.

## Notas de aplicación

- **Cuándo citarla**: como fuente de Resoluciones de Rectoría (número/año) — ejecuta los Acuerdos del CSU.
- **Riesgo Art. 107**: la potestad transitoria NO debe extenderse de hecho más allá de 2027-05-05. Cualquier designación rectoral discrecional posterior viola la transitoriedad legal.
