---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:dublin-descriptors-bologna
kd_title: "Dublin Descriptors (Bologna Process EHEA) · niveles de cualificación universitaria"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Dublin Descriptors (Bologna Process EHEA)"

skos_prefLabel: "Dublin Descriptors (Bologna Process EHEA, 2004)"
skos_altLabel: ["Dublin Descriptors", "Descriptores de Dublín", "EHEA descriptors", "Bologna descriptors"]
skos_definition: "Marco genérico de descriptores de cualificación universitaria desarrollado en el contexto del **Bologna Process** (acordados en Dublín en 2004) que define los **resultados de aprendizaje esperados** para los tres ciclos de educación superior del European Higher Education Area (EHEA): (1) **First Cycle** (pregrado, ~180-240 ECTS); (2) **Second Cycle** (maestría, ~90-120 ECTS); (3) **Third Cycle** (doctorado). Los descriptores se organizan en **5 categorías** generales para cada ciclo: (i) conocimiento y comprensión; (ii) aplicación de conocimiento y comprensión; (iii) hacer juicios; (iv) habilidades comunicativas; (v) habilidades de aprendizaje. Los Dublin Descriptors son **genéricos** (no disciplinares) — proveen el marco para que cada disciplina/programa derive descriptores específicos. Aplicado al contexto UDFJC: los Dublin Descriptors fundamentan el modelo CCA (M06 §2): V1 Comprensiva mapea a categorías (i) y (ii); V2 Experimental mapea a (iii) y (v); V3 Transformativa mapea a (iv) y aplicación territorial."
skos_scopeNote: "Los Dublin Descriptors NO son acreditación ni currículo prescriptivo — son marco genérico de resultados de aprendizaje. Han sido adoptados de facto globalmente (más allá de EHEA) como estándar de descripción de cualificaciones. NO confundir con TUNING-AL (que sí incluye competencias específicas disciplinares)."
skos_example: "Programa de Ingeniería UDFJC adoptando Dublin Descriptors: First Cycle define resultados en las 5 categorías; cada Paquete CCA contribuye a uno o más descriptores específicos del First Cycle; el portafolio del estudiante demuestra cumplimiento global al graduarse."
skos_notation: "Dublin Descriptors"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco genérico de descriptores de cualificación universitaria"
iso_differentia: "3 ciclos × 5 categorías; genéricos (no disciplinares); contexto Bologna Process EHEA; 2004"
iso_subject_field: "Higher education / Bologna Process / Qualifications frameworks"
iso_term_status: preferred
iso_standardized_by: "Joint Quality Initiative (2004). *Shared 'Dublin' descriptors for Short Cycle, First Cycle, Second Cycle and Third Cycle Awards*. Bologna Process."

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Joint Quality Initiative (2004) Dublin Descriptors"
  neon_alignment_confidence: 0.95

applicable_domain: "Diseño curricular UDFJC + descripción de programas + articulación con TUNING-AL"
assumptions:
  - "Los descriptores genéricos son aplicables transversalmente a disciplinas"
breaks_at: []

valid_from: "2004-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-dublin-fundamenta-cca
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-cca]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Dublin Descriptors fundamentan los V1∧V2∧V3 del modelo CCA: V1 Comprensiva mapea a categorías (i)+(ii); V2 Experimental a (iii)+(v); V3 Transformativa a (iv)+aplicación."
  - rel_id: rel-dublin-articula-tuning
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-tuning-america-latina]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Dublin Descriptors (genéricos EHEA) y TUNING-AL (específicos LatAm) son complementarios: Dublin provee marco genérico, TUNING aterrizaje disciplinar."

cited_in: ["[[sec-MI12-06--bmk-creditos-cca]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t7-referencia-internacional
  - dublin-descriptors
  - bologna-process
  - aspirational-reference
  - m06-corpus
  - audit-v2-2
---


# Dublin Descriptors (Bologna Process EHEA, 2004)

## Definición operativa

Marco genérico de resultados de aprendizaje para 3 ciclos universitarios EHEA:

| Ciclo | ECTS | Equivalente |
|---|:-:|---|
| First | 180-240 | Pregrado |
| Second | +90-120 | Maestría |
| Third | — | Doctorado |

## 5 categorías por ciclo

(i) Conocimiento y comprensión · (ii) Aplicación · (iii) Juicio · (iv) Comunicación · (v) Aprendizaje.

## Fuente primaria

> Joint Quality Initiative (2004). *Shared 'Dublin' descriptors*. Bologna Process.

## Lenguaje ubicuo asociado

Dublin Descriptors · 3 ciclos · 5 categorías · Bologna Process · EHEA.

## Notas de aplicación

- **Conexión M06 §2**: marco que fundamenta los V1∧V2∧V3 del CCA.
- **Articulación**: Dublin (genérico) + TUNING-AL (específico) son complementarios.
