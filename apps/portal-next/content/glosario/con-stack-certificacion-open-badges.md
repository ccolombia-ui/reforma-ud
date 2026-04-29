---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:stack-certificacion-open-badges
kd_title: "Stack de Certificación Verificable · Open Badges + xAPI + CLR (infraestructura técnica del CCA)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Stack Certificación · Open Badges + xAPI + CLR"

skos_prefLabel: "Stack de Certificación Verificable · Open Badges + xAPI + CLR"
skos_altLabel: ["Open Badges xAPI CLR", "Stack certificación CCA", "Verifiable credentials stack"]
skos_definition: "Conjunto de tres estándares técnicos abiertos que conforman la **infraestructura técnica de certificación verificable** propuesta en M06 §8 (Madera Sepúlveda 2026) para implementar el modelo CCA: (i) **Open Badges** (IMS Global Learning Consortium, v3.0 2023) — estándar para credenciales digitales portables, verificables y compartibles, basado en JSON-LD + Verifiable Credentials W3C; (ii) **xAPI** (ADL — Experience API, también llamado Tin Can API) — estándar para registrar experiencias de aprendizaje granulares como statements (actor-verbo-objeto-resultado) en un Learning Record Store (LRS); (iii) **CLR** (Comprehensive Learner Record, AACRAO) — registro académico institucional integrado que combina transcript tradicional + badges + xAPI events + co-curricular activities. Los tres estándares se complementan: Open Badges certifica logros discretos; xAPI registra el proceso de aprendizaje; CLR consolida el registro institucional completo. Aplicado al CCA UDFJC: cada Paquete CCA certificado emite un Open Badge V1∧V2∧V3 firmado criptográficamente; los eventos de aprendizaje se registran como statements xAPI; el CLR consolida el portafolio institucional completo del estudiante."
skos_scopeNote: "El stack es **soberano cognitivamente** (Art. 5g): los 3 estándares son abiertos, sin lock-in propietario, y permiten que UDFJC implemente con infraestructura propia o federada. NO confundir con plataformas privadas (Coursera, edX) que usan estándares similares pero con dependencia."
skos_example: "Una estudiante UDFJC completando un Paquete CCA en Bioeconomía Territorial: recibe Open Badge V1∧V2∧V3 firmado por la CABA; sus actividades (asistencia a campo, entrega de prototipos, presentación a JAC) quedan registradas como statements xAPI en LRS UDFJC; al graduarse su CLR consolida transcript + 30 badges + 1.500 statements xAPI."
skos_notation: "OB+xAPI+CLR"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Stack tecnológico de certificación digital verificable"
iso_differentia: "3 estándares abiertos (Open Badges + xAPI + CLR); soberano cognitivamente; infraestructura del CCA"
iso_subject_field: "Educational technology / Verifiable credentials / Learning analytics"
iso_term_status: preferred
iso_standardized_by: "IMS Global Learning Consortium (Open Badges v3.0) + ADL (xAPI 1.0.3) + AACRAO (CLR 2.0)"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "IMS Open Badges v3.0 + ADL xAPI 1.0.3 + AACRAO CLR 2.0"
  neon_alignment_confidence: 0.95

applicable_domain: "Implementación técnica del modelo CCA UDFJC + plataforma comunitaria 9 módulos (M9 Trazabilidad)"
assumptions:
  - "Los 3 estándares son técnicamente compatibles entre sí"
breaks_at:
  - "Si se implementa con plataformas privadas dependientes (viola E2 soberanía)"

valid_from: "2023-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-stack-certifica-cca
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-cca]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El stack OB+xAPI+CLR es la infraestructura técnica que materializa la certificación de cada Paquete CCA con verificabilidad criptográfica."
  - rel_id: rel-stack-soberania
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El stack es soberano cognitivamente — los 3 estándares son abiertos, sin lock-in. Materializa Soberanía Cognitiva (Art. 5g) en infraestructura técnica."
  - rel_id: rel-stack-plataforma9
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-plataforma-comunitaria-9-modulos]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Módulo M9 (Trazabilidad deliberación-decisión) de la plataforma 9 módulos M04 incorpora xAPI + CLR como infraestructura técnica."

cited_in: ["[[sec-MI12-06--bmk-creditos-cca]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - open-badges
  - xapi
  - clr
  - verifiable-credentials
  - m06-corpus
  - audit-v2-2
---


# Stack Certificación Verificable · Open Badges + xAPI + CLR

## Definición operativa

3 estándares técnicos abiertos que materializan la certificación CCA:

| Estándar | Fuente | Función |
|---|---|---|
| **Open Badges** v3.0 | IMS Global | Credenciales digitales portables firmadas |
| **xAPI** 1.0.3 | ADL | Statements granulares actor-verbo-objeto |
| **CLR** 2.0 | AACRAO | Registro académico integrado |

> Los 3 son **abiertos** y **complementarios** — soberanía cognitiva en infraestructura técnica.

## Lenguaje ubicuo asociado

Open Badges · xAPI · CLR · Verifiable credentials · LRS · JSON-LD.

## Notas de aplicación

- **Conexión M06 §8**: implementación técnica del CCA.
- **Conexión M00 Art. 5g**: materializa Soberanía Cognitiva.
- **Anti-patrón**: NO usar plataformas privadas (Coursera, edX) que dependen de servidor propietario.
