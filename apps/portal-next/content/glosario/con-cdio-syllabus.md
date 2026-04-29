---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cdio-syllabus
kd_title: "CDIO Syllabus v3.0 — Conceive · Design · Implement · Operate (framework de educación en ingeniería)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "CDIO Syllabus v3.0"

skos_prefLabel: "CDIO Syllabus v3.0 (Crawley et al. 2014)"
skos_altLabel: ["CDIO", "Conceive Design Implement Operate", "CDIO Initiative", "MIT CDIO"]
skos_definition: "Framework de educación en ingeniería desarrollado por MIT, Chalmers, KTH y otras universidades en la *CDIO Initiative* (iniciada 2000, Syllabus v3.0 publicado 2014 por Crawley et al.). Su tesis central es que los ingenieros deben formarse para el ciclo completo de **Conceive · Design · Implement · Operate** (concebir + diseñar + implementar + operar) productos, procesos y sistemas en contextos empresariales y sociales modernos. CDIO articula 4 elementos: (i) **Syllabus** — taxonomía detallada de competencias en 4 niveles jerárquicos; (ii) **12 estándares CDIO** — qué debe cumplir un programa para ser CDIO-compliant; (iii) **CDIO standards** que cubren currículo, espacios, métodos de enseñanza-aprendizaje, evaluación y mejora continua; (iv) red global de universidades que comparten experiencias y casos. CDIO es **complementario** (no sustituto) de ABET: muchos programas adoptan CDIO como framework de implementación que facilita acreditación ABET posterior. Aplicado al contexto UDFJC: CDIO es el estándar disciplinar de capa 3 más operativo y aterrizado para programas de ingeniería UDFJC."
skos_scopeNote: "CDIO NO es acreditación per se — es framework de educación + red colaborativa. Una universidad puede ser 'CDIO-collaborator' sin que sus programas estén formalmente certificados. Eso lo distingue de ABET (acreditación formal con 6 años de validez)."
skos_example: "Programa de Ingeniería de Sistemas UDFJC adoptando CDIO: declara los 4 verbos (Conceive, Design, Implement, Operate) en su PEI; mapea sus cursos al CDIO Syllabus v3.0 (~600 ítems en 4 niveles); cumple los 12 CDIO standards; participa en CDIO regional meetings."
skos_notation: "CDIO v3.0"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Framework de educación en ingeniería con red colaborativa global"
iso_differentia: "4 verbos Conceive-Design-Implement-Operate; Syllabus jerárquico ~600 ítems; 12 CDIO standards; complementario a ABET; v3.0 (2014)"
iso_subject_field: "Engineering education / Curriculum design / Higher education frameworks"
iso_term_status: preferred
iso_standardized_by: "Crawley, E. F., Malmqvist, J., Östlund, S., Brodeur, D. R., & Edström, K. (2014). *Rethinking Engineering Education: The CDIO Approach* (2nd ed.). Springer."

align_dbpedia: ""
align_wikidata: ""
pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Crawley et al. (2014) Rethinking Engineering Education + CDIO Initiative"
  neon_alignment_confidence: 0.97

applicable_domain: "Diseño curricular UDFJC programas Ingeniería + framework de implementación pre-ABET"
assumptions:
  - "El ciclo Conceive-Design-Implement-Operate captura el trabajo ingenieril contemporáneo"
breaks_at:
  - "Si se confunde con acreditación formal (es framework, no acreditación)"

valid_from: "2014-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-cdio-articula-abet
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-abet-acreditacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CDIO opera como framework de implementación que facilita acreditación ABET posterior — complementarios, no sustitutos."
  - rel_id: rel-cdio-pasteur
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-cuadrante-pasteur-stokes]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CDIO adopta Cuadrante Pasteur en su Syllabus: las competencias 'Designing' y 'Implementing' son use-inspired basic research aplicado a producto/sistema."

cited_in: ["[[sec-MI12-03--estandares-internacionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-academico
  - t7-referencia-internacional
  - cdio-syllabus
  - ingenieria-educacion
  - crawley-2014
  - aspirational-reference
  - m03-corpus
  - audit-v2-2
---


# CDIO Syllabus v3.0

## Definición operativa

Framework de educación en ingeniería con 4 verbos rectores:

| Verbo | Significado |
|:-:|---|
| **C** Conceive | Concebir necesidades y oportunidades |
| **D** Design | Diseñar productos, procesos, sistemas |
| **I** Implement | Implementar lo diseñado |
| **O** Operate | Operar, mantener, mejorar |

> Iniciado por MIT + Chalmers + KTH (2000); Syllabus v3.0 publicado por Crawley et al. (2014).

## 4 elementos del marco

1. **Syllabus** — taxonomía jerárquica de competencias (~600 ítems, 4 niveles)
2. **12 CDIO standards** — qué cumplir para ser CDIO-compliant
3. **CDIO standards 2.0** — currículo, espacios, métodos, evaluación, mejora
4. **Red global colaborativa**

## Fuente primaria

> Crawley, E. F. et al. (2014). *Rethinking Engineering Education: The CDIO Approach* (2nd ed.). Springer.

## Lenguaje ubicuo asociado

CDIO · Conceive-Design-Implement-Operate · 12 CDIO standards · Red colaborativa.

## Notas de aplicación

- **Conexión M03 §4.7**: estándar disciplinar capa 3.
- **Complementario** a ABET (no sustituto).
