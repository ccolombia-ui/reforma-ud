---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cuadrante-pasteur-stokes
kd_title: "Cuadrante de Pasteur (Stokes 1997) — investigación uso-inspirada de búsqueda fundamental"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Cuadrante de Pasteur (Stokes 1997)"

skos_prefLabel: "Cuadrante de Pasteur (Stokes 1997)"
skos_altLabel: ["Pasteur's Quadrant", "Use-inspired basic research", "Cuadrante Stokes", "Investigación uso-inspirada"]
skos_definition: "Marco conceptual desarrollado por Donald E. Stokes (1997) que desmonta la falsa dicotomía investigación básica vs. investigación aplicada mediante una matriz 2×2 sobre dos ejes independientes: (i) **eje de búsqueda fundamental** (¿busca conocimiento por sí mismo?); (ii) **eje de uso** (¿busca utilidad práctica?). La intersección produce 4 cuadrantes: **BOHR** (Sí búsqueda · No uso) — investigación pura; **EDISON** (No búsqueda · Sí uso) — investigación aplicada utilitaria; **PETER** (No búsqueda · No uso) — investigación curiosidad-driven sin pretensiones; **PASTEUR** (Sí búsqueda · Sí uso) — *use-inspired basic research* — investigación que persigue simultáneamente la frontera del conocimiento Y la utilidad práctica. El cuadrante Pasteur es el más productivo histórica y económicamente: Pasteur descubrió la teoría microbiana mientras buscaba salvar la industria del vino francesa. Aplicado al contexto UDFJC, el Cuadrante Pasteur es la lente epistémica para PM2 (Investigación-Creación-Innovación) bajo Frame 3: investigación con direccionalidad transformativa hacia misiones territoriales."
skos_scopeNote: "El Cuadrante Pasteur NO desplaza a Bohr ni Edison — los cuatro cuadrantes coexisten en una IES sana. Pero las universidades transformativas Frame 3 priorizan Pasteur como eje epistémico transversal (cf. ABET, CDIO, MIT The Engine, Stanford d.school)."
skos_example: "Una CABA UDFJC trabajando bioeconomía territorial: investigar nuevas rutas metabólicas (búsqueda fundamental) Y aplicarlas a transformar bagazo de caña en biopolímeros para JACs locales (uso). Cuadrante Pasteur, no Bohr ni Edison."
skos_notation: "Pasteur"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco conceptual sobre tipologías de investigación científica"
iso_differentia: "Matriz 2×2 (búsqueda fundamental × uso); 4 cuadrantes (Bohr/Edison/Peter/Pasteur); Pasteur = use-inspired basic research; desmonta falsa dicotomía básica/aplicada"
iso_subject_field: "Política científica / Sociología de la ciencia / Innovation studies"
iso_term_status: preferred
iso_standardized_by: "Stokes, D. E. (1997). *Pasteur's Quadrant: Basic Science and Technological Innovation*. Brookings Institution Press."

align_dbpedia: "http://dbpedia.org/resource/Pasteur%27s_quadrant"
align_wikidata: "https://www.wikidata.org/wiki/Q7142884"
pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Stokes (1997) Pasteur's Quadrant + literatura policy science"
  neon_alignment_confidence: 0.98

applicable_domain: "Política investigación UDFJC + diseño PM2 + articulación con Frame 3 + criterios de financiación"
assumptions:
  - "Los ejes búsqueda y uso son independientes (no antagónicos)"
breaks_at:
  - "Si se aplica como dicotomía básica/aplicada (es matriz 2×2, no eje único)"

valid_from: "1997-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-pasteur-orienta-pm2
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-procesos-misionales-pm1-pm2-pm3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El Cuadrante Pasteur es la lente epistémica preferente de PM2 (Investigación-Creación-Innovación) bajo Frame 3: investigación con direccionalidad transformativa."
  - rel_id: rel-pasteur-articula-frame3
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Frame 3 (Schot & Steinmueller 2018) y Cuadrante Pasteur (Stokes 1997) convergen: ambos rechazan investigación descontextualizada y demandan direccionalidad uso-inspirada."
  - rel_id: rel-pasteur-r4-territorio
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "R4 (Problemas Reales: territorio surfacea preguntas) opera específicamente en Cuadrante Pasteur — territorios no surfacean preguntas Edison ni Bohr puras."
  # — v1.2.0 cross-references M03 (Fase B audit refactor) ——————————
  - rel_id: rel-pasteur-realizacion-urop
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-mit-urop]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "MIT UROP es la realización empírica más rigurosa del Cuadrante Pasteur a nivel curricular de pregrado: integra búsqueda fundamental Y uso desde el inicio."
  - rel_id: rel-pasteur-articulado-oecd
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-oecd-learning-compass-2030]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OECD Learning Compass (capa aspiracional M03) y Cuadrante Pasteur (capa epistemológica M03) son complementarios en el sistema multinivel de calidad."
  - rel_id: rel-pasteur-eje-abet
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-abet-acreditacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ABET adopta Cuadrante Pasteur como eje epistemológico de calidad: el criterio 2 (student outcomes) incluye 'capacidad de investigación uso-inspirada'."
  - rel_id: rel-pasteur-eje-cdio
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cdio-syllabus]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CDIO Syllabus articula con Pasteur: las competencias 'Designing' y 'Implementing' son use-inspired basic research aplicado a producto/sistema."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-03--estandares-internacionales]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - cuadrante-pasteur
  - stokes-1997
  - use-inspired-research
  - m02-corpus
  - audit-v2-2
---


# Cuadrante de Pasteur (Stokes 1997)

## Definición operativa

Matriz 2×2 que desmonta la dicotomía investigación básica vs. aplicada:

| | **NO uso** | **SÍ uso** |
|---|---|---|
| **SÍ búsqueda fundamental** | **BOHR** (pura) | **PASTEUR** (use-inspired basic) |
| **NO búsqueda fundamental** | **PETER** (curiosidad) | **EDISON** (aplicada) |

> Pasteur descubrió la teoría microbiana mientras intentaba salvar la industria del vino francesa.

## Fuente primaria

> Stokes, D. E. (1997). *Pasteur's Quadrant: Basic Science and Technological Innovation*. Brookings Institution Press.

## Lenguaje ubicuo asociado

Cuadrante Pasteur · Use-inspired basic research · Bohr / Edison / Peter / Pasteur · Direccionalidad uso-inspirada.

## Notas de aplicación

- **Conexión M02 §2.6**: marco epistémico transversal del paper.
- **Conexión M03**: estándares ABET/CDIO usan Pasteur como eje de calidad investigativa.
- **Aplicación PM2**: el Cuadrante Pasteur es la lente preferente del proceso de investigación bajo Frame 3.
