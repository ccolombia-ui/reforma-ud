---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:secretaria-general-sisgral
kd_title: "Secretaría General — SISGRAL UDFJC (Arts. 40-42 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01]

tupla_tipo: DEFINITION
tupla_concepto: "Secretaría General SISGRAL"

skos_prefLabel: "Secretaría General (SISGRAL)"
skos_altLabel: ["SGRAL", "SISGRAL", "Secretary General UDFJC"]
skos_hiddenLabel: ["secretaria-general", "sisgral"]
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

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.2

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 40-42 (composición, funciones de fe pública)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Sus registros son fuente oficial de verificación; ausencia de un acto en SISGRAL = inexistencia jurídica"

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

applicable_domain: "Toda actuación institucional UDFJC que requiera fe pública o verificación de existencia jurídica de un acto."
assumptions:
  - "El portal xdata mantiene disponibilidad operativa razonable"
  - "Los índices SISGRAL están actualizados trimestralmente"
breaks_at:
  - "Si xdata sufre falla técnica prolongada"
  - "Si se descubre alteración del registro (riesgo crítico de fe pública)"
extends_to: ""

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

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

tags: [glosario-universal, concepto-normativo, secretaria-general, sisgral, fe-publica, arts-40-42, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
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
