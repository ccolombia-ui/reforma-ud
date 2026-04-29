---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cops-wenger
kd_title: "Comunidades de Práctica (Wenger 1998) — unidad social primaria de aprendizaje"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Comunidades de Práctica (CoPs - Wenger 1998)"

skos_prefLabel: "CoPs — Comunidades de Práctica (Wenger 1998)"
skos_altLabel: ["Communities of Practice", "CoPs", "Comunidades-Práctica Wenger"]
skos_definition: "Concepto sociológico desarrollado por Etienne Wenger (1998, *Communities of Practice: Learning, Meaning, and Identity*) que define las CoPs como **'grupos que comparten una preocupación o pasión por algo que hacen y aprenden a hacerlo mejor mientras interactúan regularmente'**. Las CoPs tienen tres dimensiones constitutivas: (i) **dominio compartido** — área de conocimiento o pasión común; (ii) **comunidad** — relaciones de aprendizaje mutuo entre miembros; (iii) **práctica** — repertorio compartido de recursos, herramientas, lenguaje. Son la **unidad social primaria de aprendizaje** — no el individuo ni la organización formal sino la comunidad. Aplicado al contexto UDFJC (M02 §2.9): las CABAs (Comunidades Académicas de Base) son **super-CoPs** institucionales que articulan múltiples CoPs disciplinares en torno a un dominio transversal (bioeconomía territorial, educación digital, etc.). Las redes de CoPs convergiendo en CABA producen aprendizaje organizacional emergente que ningún departamento puede planificar."
skos_scopeNote: "Las CoPs NO son equipos de proyecto ni departamentos formales — son auto-organizadas, emergentes, sostenidas por interés genuino. Tienen ciclos de vida (formación, madurez, declive) que no se administran top-down. Diferencia con team formal: una CoP puede atravesar múltiples equipos formales."
skos_example: "Una CABA UDFJC en bioeconomía territorial: agrupa CoPs disciplinares (microbiólogos + ingenieros químicos + sociólogos rurales + economistas) en torno al dominio compartido 'biorefinería territorial'. La CABA no es CoP única sino *red de CoPs convergentes* en super-CoP."
skos_notation: "CoPs"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad social de aprendizaje organizacional"
iso_differentia: "3 dimensiones (dominio + comunidad + práctica); auto-organizada; ciclo de vida propio; unidad social primaria de aprendizaje"
iso_subject_field: "Organizational learning / Sociology of knowledge / Knowledge management"
iso_term_status: preferred
iso_standardized_by: "Wenger, E. (1998). *Communities of Practice: Learning, Meaning, and Identity*. Cambridge University Press."

align_dbpedia: "http://dbpedia.org/resource/Community_of_practice"
align_wikidata: "https://www.wikidata.org/wiki/Q1078117"
pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Wenger (1998) Communities of Practice"
  neon_alignment_confidence: 0.95

applicable_domain: "Diseño de CABAs + análisis de aprendizaje organizacional + cultivo de comunidades académicas"
assumptions:
  - "El aprendizaje organizacional ocurre primariamente en comunidades, no en individuos ni organizaciones formales"
  - "Las CoPs pueden cultivarse pero no fabricarse top-down"
breaks_at:
  - "Si se confunde con equipos de proyecto formales"
  - "Si se intenta administración top-down (anti-patrón)"

valid_from: "1998-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-cops-fundamenta-caba
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs (Art. 73 ACU-004-25) son super-CoPs institucionales que articulan múltiples CoPs disciplinares en torno a un dominio transversal."
  # — v1.1.0 cross-references M04 (Fase B audit refactor) ——————————
  - rel_id: rel-cops-extendido-trayner
    rel_nombre: skos_narrower
    rel_direccion: post
    rel_target: "[[con-wenger-trayner-landscapes]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Wenger-Trayner 2015 (Landscapes of Practice) extiende Wenger 1998 al nivel de gobernanza de múltiples CoPs interconectadas — aplicable a la red institucional UDFJC."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - cops-wenger
  - communities-of-practice
  - cop-fundacional
  - m02-corpus
  - audit-v2-2
---


# CoPs · Comunidades de Práctica (Wenger 1998)

## Definición operativa

> "Grupos que comparten una preocupación o pasión por algo que hacen y aprenden a hacerlo mejor mientras interactúan regularmente."

| Dimensión | Pregunta |
|---|---|
| **Dominio** | ¿Qué pasión/conocimiento comparten? |
| **Comunidad** | ¿Cómo aprenden juntos? |
| **Práctica** | ¿Qué herramientas/lenguaje comparten? |

## Fuente primaria

> Wenger, E. (1998). *Communities of Practice: Learning, Meaning, and Identity*. Cambridge University Press.

## Lenguaje ubicuo asociado

CoPs · Comunidades de Práctica · Dominio · Práctica compartida · Aprendizaje social.

## Notas de aplicación

- **Conexión M02 §2.9**: las CABAs son super-CoPs institucionales convergentes.
- **NO confundir con equipos formales**: las CoPs son auto-organizadas y emergentes.
