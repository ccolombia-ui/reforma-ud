---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:mit-urop
kd_title: "MIT UROP — Undergraduate Research Opportunities Program (research-based learning paradigmático)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "MIT UROP — Undergraduate Research Opportunities Program"

skos_prefLabel: "MIT UROP — Undergraduate Research Opportunities Program"
skos_altLabel: ["MIT UROP", "Undergraduate Research", "UROP", "Research-based learning paradigm"]
skos_definition: "Programa institucional del Massachusetts Institute of Technology (fundado en 1969) que integra estudiantes de pregrado en proyectos de investigación de frontera con créditos académicos formales. Modelo paradigmático global de **research-based learning** (Boyer 1990; Healey 2005). Características: (i) estudiantes de pregrado trabajan con grupos de investigación reales en problemas de frontera; (ii) participación creditizada (3-12 créditos por semestre) con calificación; (iii) opciones de salario o crédito según preferencia del estudiante; (iv) ~85% del estudiantado MIT participa antes de graduarse. UROP es la realización empírica más rigurosa del **Cuadrante Pasteur** (Stokes 1997) a nivel curricular: integra búsqueda fundamental Y uso desde el inicio del pregrado. Aplicado al contexto UDFJC: UROP es el referente para la retroalimentación R1 (Semilleros) del ciclo virtuoso ΩMT (M02 §4.2) — donde la AS-IS UDFJC es <5% creditizado y la TO-BE objetivo es ≥70% creditizado."
skos_scopeNote: "UROP NO es 'semilleros voluntarios' (la práctica AS-IS UDFJC dominante) — es investigación CREDITIZADA con calificación formal, integrada al currículo de pregrado. Esa diferencia es estructural, no meramente terminológica. Sin creditización, no hay UROP."
skos_example: "Estudiante de Ingeniería Mecánica MIT: cursa 4 créditos UROP en Lab de Robótica trabajando en algoritmos de visión computacional aplicados a vehículos autónomos. Su trabajo aparece como segundo autor en paper IEEE. Equivalente UDFJC: estudiante UDFJC en CABA bioeconomía con 6 créditos UROP en biorefinería territorial Sumapaz."
skos_notation: "UROP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Programa institucional de research-based learning"
iso_differentia: "Pregrado + creditizado + calificado + integrado a grupos reales + ~85% participación; modelo paradigmático global"
iso_subject_field: "Higher education / Research-based learning / Engineering education"
iso_term_status: preferred
iso_standardized_by: "Massachusetts Institute of Technology — UROP Office (programa institucional fundado en 1969)"

align_dbpedia: ""
align_wikidata: ""
pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "MIT UROP Office (institucional) + Boyer (1990) + Healey (2005)"
  neon_alignment_confidence: 0.95

applicable_domain: "Diseño de R1 (Semilleros) en ciclo virtuoso UDFJC + reforma curricular pregrado"
assumptions:
  - "Es viable creditizar investigación de pregrado en una IES pública"
breaks_at:
  - "Si se confunde con semilleros voluntarios sin creditización (es la diferencia clave)"

valid_from: "1969-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-urop-realiza-pasteur
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-cuadrante-pasteur-stokes]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "UROP es la realización empírica más rigurosa del Cuadrante Pasteur a nivel curricular de pregrado: integra búsqueda fundamental Y uso desde el inicio."
  - rel_id: rel-urop-fundamenta-r1
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "UROP es el referente paradigmático de R1 (Semilleros: PM1→PM2) del ciclo virtuoso ΩMT — la AS-IS UDFJC <5% creditizado debe migrar a TO-BE ≥70%."

cited_in: ["[[sec-MI12-03--estandares-internacionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-academico
  - t7-referencia-internacional
  - mit-urop
  - research-based-learning
  - aspirational-reference
  - m03-corpus
  - audit-v2-2
---


# MIT UROP

## Definición operativa

Programa institucional MIT (fundado 1969) que integra estudiantes de pregrado en proyectos de investigación reales con créditos académicos. Modelo paradigmático global de **research-based learning**.

## Características

- Estudiantes pregrado en grupos de investigación reales
- **Creditizado** (3-12 créditos por semestre) con calificación
- Opciones salario o crédito
- **~85% del estudiantado MIT** participa antes de graduarse

## Lenguaje ubicuo asociado

UROP · Undergraduate Research · Research-based learning · Cuadrante Pasteur curricular.

## Notas de aplicación

- **Conexión M03 §4.5**: realización empírica del Cuadrante Pasteur.
- **Conexión M02 R1**: referente para Semilleros creditizados en UDFJC.
- **Diferencia clave**: NO es semillero voluntario — es CREDITIZADO con calificación.
