---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:jtbd-christensen
kd_title: "JTBD — Jobs To Be Done (Christensen 1997-2016)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-01, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "JTBD — Jobs To Be Done"

skos_prefLabel: "JTBD — Jobs To Be Done"
skos_altLabel: ["Jobs Theory", "Trabajos por hacer", "Christensen JTBD"]
skos_hiddenLabel: ["jtbd", "jtbd-christensen", "jobs-to-be-done"]
skos_definition: "Teoría de innovación formulada por Clayton M. Christensen et al. (consolidada en *Competing Against Luck* 2016) que reconceptualiza la motivación de los usuarios: las personas NO compran productos sino 'contratan' productos para hacer un 'trabajo' (job) específico en su vida. Aplicado al diseño organizacional, una IES puede mapearse desde la perspectiva de qué 'trabajos' diferentes actores (estudiantes, docentes, egresados, sector productivo, comunidades) 'contratan' a la universidad para hacer. Tres tipos de trabajos: funcional (lo que necesitan resolver), emocional (cómo quieren sentirse), social (cómo quieren ser percibidos). Aplicado al M04 cap-MI12, JTBD se usa para mapear los 6 roles institucionales UDFJC y sus respectivos jobs core."
skos_scopeNote: "JTBD complementa pero NO sustituye estructuras DDD (bounded contexts) ni Quintuple Helix. Su valor metodológico es centrar el análisis en la motivación-función del actor en lugar de en sus atributos demográficos/jerárquicos."
skos_example: "Job to be done de un estudiante UDFJC: NO 'obtener un título' sino 'desarrollar capacidad para ejercer profesión digna que contribuye a su comunidad'. Este reframing cambia el diseño del Programa Académico: ya no es secuencia de cursos para acumular créditos, sino currículo que articula esos tres componentes (saber + ser + hacer)."
skos_notation: "JTBD"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Teoría de innovación centrada en motivación-función del usuario"
iso_differentia: "Reconceptualiza necesidades como 'jobs' (funcional + emocional + social); aplicable a diseño organizacional educativo"
iso_subject_field: "Teoría de innovación / Diseño centrado en usuario / Estrategia"
iso_term_status: preferred
iso_standardized_by: "Christensen, C. M., Hall, T., Dillon, K., Duncan, D. S. (2016). *Competing Against Luck*. HarperBusiness"

align_schema_type: DefinedTerm
align_dbpedia: "http://dbpedia.org/resource/Jobs_to_be_Done"
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NEON]

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[christensen2016jobs]] + literatura JTBD contemporánea"
  neon_alignment_confidence: 0.95

applicable_domain: "Diseño curricular + análisis de roles institucionales + extensión territorial"
assumptions: ["Los actores tienen jobs identificables y verbalizables"]
breaks_at: ["Si se aplica como segmentación demográfica tradicional"]
extends_to: "[[con-odi-ulwick]]"

recorded_at: "2026-04-26"
valid_from: "1997-01-01"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-jtbd-extends-odi
    rel_nombre: skos_broader
    rel_direccion: post
    rel_target: "[[con-odi-ulwick]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "JTBD (Christensen) es el marco general; ODI (Ulwick) es la metodología operativa que cuantifica los outcomes que cada job desea optimizar. JTBD broader → ODI narrower."
  - rel_id: rel-jtbd-mapea-comunidad
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-comunidad-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "JTBD aplicado al M04: mapea los jobs (funcional + emocional + social) que cada estamento de la Comunidad Universitaria 'contrata' a la UDFJC. Provee la lente metodológica para análisis JTBD de los 4 estamentos."
  - rel_id: rel-jtbd-mapea-funciones
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "JTBD reconceptualiza las funciones misionales PM1-PM2-PM3 desde la perspectiva del actor: ¿qué job contrata el estudiante en PM1? ¿el sector productivo en PM3? ¿la comunidad científica en PM2?"
  - rel_id: rel-jtbd-discovery-crisp
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-crisp-dm]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "JTBD provee el método de descubrimiento en la fase 1 Business Understanding de CRISP-DM aplicado al cap-MI12."
  - rel_id: rel-jtbd-articula-quintuple
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-quintuple-helix]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "JTBD complementa Quintuple Helix: la helix identifica QUIÉNES son los actores (universidad + industria + gobierno + sociedad civil + ambiente); JTBD identifica QUÉ trabajos contrata cada uno a la universidad."

cited_in: ["[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-04--jtbd-comunidad]]"]
cited_count: 2

tags: [glosario-universal, concepto-meta-instrumental, jtbd, christensen, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-neon, layer-disenador]
---

# JTBD — Jobs To Be Done (Christensen)

## Definición operativa

Teoría de innovación de **Clayton M. Christensen** (consolidada en *Competing Against Luck* 2016): las personas NO compran productos sino "contratan" productos para hacer un "trabajo" (job) específico en su vida.

## Tres tipos de jobs

| Tipo | Pregunta |
|---|---|
| **Funcional** | ¿Qué necesitan resolver? |
| **Emocional** | ¿Cómo quieren sentirse? |
| **Social** | ¿Cómo quieren ser percibidos? |

## Fuente primaria

> Christensen, C. M., Hall, T., Dillon, K., Duncan, D. S. (2016). *Competing Against Luck: The Story of Innovation and Customer Choice*. HarperBusiness.

## Lenguaje ubicuo asociado

JTBD · Jobs To Be Done · Job funcional · Job emocional · Job social · Christensen.

## Notas de aplicación

- **Conexión M04**: 6 roles institucionales UDFJC mapeados con sus jobs core.
- **Complementario** (no sustitutivo) de Quintuple Helix + DDD bounded contexts.
