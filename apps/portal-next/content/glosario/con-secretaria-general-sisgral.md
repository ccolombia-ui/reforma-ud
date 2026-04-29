---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:secretaria-general-sisgral
kd_title: "Secretaría General — SISGRAL UDFJC (Arts. 40-42 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Secretaría General SISGRAL"

skos_prefLabel: "Secretaría General (SISGRAL)"
skos_altLabel: ["SGRAL", "SISGRAL", "Secretary General UDFJC"]
skos_definition: "Dependencia institucional UDFJC encargada de la fe pública institucional: numeración, registro, custodia y publicación de los actos administrativos del CSU, CACAD y Rectoría. Mantiene el Sistema de Información de Secretaría General (SISGRAL) que indexa los actos en `https://sgral.udistrital.edu.co/xdata/`. Es la fuente oficial de verificación de cualquier Acuerdo CSU, Resolución CACAD o Resolución de Rectoría. Actúa también como secretaría técnica del CSU y del CACAD."
skos_scopeNote: "La fe pública del SISGRAL es vinculante: si un acto administrativo no está en SISGRAL, jurídicamente no existe. La verificación de cumplimiento del Art. 98 (estatutos derivados) y de cualquier acto institucional debe pasar por consulta al SISGRAL. El portal `xdata` es URL pública con los PDFs primarios."
skos_example: "El Acuerdo CSU 04/2025 (la carta constitucional) está registrado en SISGRAL con URL `https://sgral.udistrital.edu.co/xdata/ca/acu_2025-004.pdf`. Los índices SISGRAL del corpus aleia se reflejan en `0-normatividad/1--indices-sisgral/` (2.508 documentos indexados 1995-2026)."
skos_notation: "SISGRAL"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia institucional con función de fe pública universitaria"
iso_differentia: "Numera, registra, custodia y publica actos administrativos UDFJC; mantiene SISGRAL con URLs públicas en sgral.udistrital.edu.co/xdata/"
iso_subject_field: "Derecho administrativo universitario / Fe pública / Información pública"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 40-42"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Arts. 40-42 (Secretaría General · fe pública institucional)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Secretaría General SISGRAL como dependencia rectoral con fe pública institucional · miembro del CGA (Art. 87c)"
    - adopter: "[[con-ley-1712-2014]]"
      adopter_locator: "Ley 1712/2014 · Transparencia y Acceso Información Pública"
      adopter_authority_level: LEGAL
      adopted_at: "2014-03-06"
      adoption_evidence: "SISGRAL implementa Ley 1712/2014 publicando actos administrativos en portal xdata"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 40-42 + 86b + 87c"
  normative_text: "[Texto literal Arts. 40-42 · Secretaría General + función fe pública + portal xdata]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "secretaria_general"
  ddd_aggregate_root: "SecretariaGeneralSisgral"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio fe pública. Mantiene Repository de Actos Administrativos (Acuerdos CSU, Resoluciones CACAD, Resoluciones Rectoría) con identidad inmutable: número + año + tipo + fecha."
  ddd_invariants:
    - "Cada acto administrativo tiene número único + año + tipo (Acuerdo CSU, Resolución CACAD, Resolución Rectoría)"
    - "La numeración es secuencial y no admite huecos sin justificación"
    - "Todo acto debe estar publicado en xdata/ con URL estable"
    - "La fe pública se ejerce solo por el(la) Secretario(a) General o delegado(a)"
  ddd_ubiquitous_terms:
    - "Secretaría General · SGRAL"
    - "SISGRAL · Sistema de Información"
    - "xdata · Portal público"
    - "Fe pública institucional"
    - "Acto administrativo numerado"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-arts-40-42-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-arts-40-42-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-ley-1712-2014]]"

applicable_domain: "Toda actuación institucional UDFJC que requiera fe pública o verificación de existencia jurídica de un acto."
assumptions:
  - "El portal xdata mantiene disponibilidad operativa razonable"
  - "Los índices SISGRAL están actualizados trimestralmente"
breaks_at:
  - "Si xdata sufre falla técnica prolongada"
  - "Si se descubre alteración del registro (riesgo crítico de fe pública)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-sgral-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-sgral-custodia-acu00425
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-acu-004-25]]"
    rel_frame: skos
    rel_propiedades:
      ddd_evidence: "El ACU-004-25 está custodiado y publicado por SISGRAL en xdata/ca/acu_2025-004.pdf"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - secretaria-general
  - sisgral
  - fe-publica
  - arts-40-42
  - m00-base
  - audit-v2-2
  - tpl-v2
---


# Secretaría General — SISGRAL (Arts. 40-42 ACU-004-25)

## Definición operativa

Dependencia institucional UDFJC encargada de la **fe pública institucional**: numeración, registro, custodia y publicación de los actos administrativos del CSU, CACAD y Rectoría. Mantiene el **Sistema de Información de Secretaría General (SISGRAL)** que indexa los actos en `https://sgral.udistrital.edu.co/xdata/`.

> **Fe pública del SISGRAL es vinculante**: si un acto administrativo no está en SISGRAL, jurídicamente **no existe**.

## Funciones principales

| Función | Detalle |
|---|---|
| Numeración | Asigna número secuencial a cada acto |
| Registro | Mantiene libro oficial + base de datos digital |
| Custodia | Guarda original y respaldos |
| Publicación | Pone en `xdata/` con URL estable |
| Fe pública | Certifica autenticidad ante terceros |
| Secretaría técnica | Apoya CSU y CACAD en sesiones |

## Fuente primaria

> Arts. 40-42 ACU-004-25 (composición, funciones de fe pública institucional).

## Invariantes operativas DDD

1. Cada acto tiene **número único + año + tipo** (Acuerdo CSU / Resolución CACAD / Resolución Rectoría).
2. La numeración es **secuencial** (no admite huecos sin justificación).
3. Todo acto debe estar **publicado en xdata/** con URL estable.
4. La fe pública se ejerce **solo** por el(la) Secretario(a) General o delegado(a).

## Lenguaje ubicuo asociado

Secretaría General · SGRAL · SISGRAL · xdata · Fe pública institucional · Acto administrativo numerado.

## Notas de aplicación

- **Cuándo consultarlo**: para verificar existencia jurídica de cualquier Acuerdo o Resolución UDFJC; para descargar PDFs primarios.
- **Conexión M00**: el corpus `0-normatividad/1--indices-sisgral/` refleja 2.508 documentos indexados 1995-2026. La verificación de los 7 estatutos derivados (Art. 98) pasa por consulta SISGRAL.
- **URL canónica**: `https://sgral.udistrital.edu.co/xdata/`.
