---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:valores-culturales-v1-v5
kd_title: "Valores Culturales V1-V5 UDFJC (Soberanía + Emprendimiento + Participación + Ética + Austeridad)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Valores Culturales V1-V5 UDFJC"

skos_prefLabel: "Valores Culturales V1-V5 UDFJC (Soberanía · Emprendimiento · Participación · Ética · Austeridad)"
skos_altLabel: ["V1-V5 culturales", "5 valores institucionales UDFJC", "Cultura V1-V5"]
skos_definition: "Conjunto de **cinco valores culturales** institucionales propuestos en M04 §4.2 (Madera Sepúlveda 2026 + sprint BPA-003) que dan estructura cualitativa a la cultura organizacional de la UDFJC post-ACU-004-25, con arquetipos de madurez de menos a más maduro: (V1) **Soberanía** — del estudiante dependiente al soberano cognitivo del conocimiento (Art. 5g); (V2) **Emprendimiento** — del receptor pasivo al creador de valor real para territorio; (V3) **Participación** — del consultor formal al vinculante con poder real (Art. 5d); (V4) **Ética** — del cumplimiento nominal al integral con rendición de cuentas pública; (V5) **Austeridad** — del manejo dispendioso al optimizador colaborativo de recursos públicos. Cada valor tiene **arquetipos de madurez** (escala cualitativa institucional) que permiten diagnóstico por Escuela. Aplicado al contexto UDFJC: V1-V5 culturales son uno de los componentes principales del análisis JTBD (M04) y se mapean a los 6 roles institucionales (Estudiante Soberano, Docentes 5 tipos)."
skos_scopeNote: "ATENCIÓN nomenclatura crítica — V1-V5 culturales (este concepto, M04) ≠ V1-V3 CCA (Comprensiva-Experimental-Transformativa, M06). Son sistemas distintos: V1-V5 son valores institucionales; V1-V3 son vectores curriculares. Misma letra V, distinta cardinalidad y referente."
skos_example: "Diagnóstico V1-V5 de Escuela UDFJC en Sub-N1: V1 (Soberanía) = 🔴 dependiente; V2 (Emprendimiento) = 🟡 receptor; V3 (Participación) = 🔴 consultor formal; V4 (Ética) = 🟡 nominal; V5 (Austeridad) = 🔴 dispendioso. Salto a N4 vía CABA exige migración simultánea de los 5 a estados maduros."
skos_notation: "V1-V5"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de valores culturales institucionales con arquetipos de madurez"
iso_differentia: "5 valores específicos (Soberanía + Emprendimiento + Participación + Ética + Austeridad); arquetipos cualitativos de madurez; distintos de V1-V3 CCA curriculares (homonimia parcial)"
iso_subject_field: "Cultura organizacional / Reforma universitaria / Diagnóstico institucional"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M04 §4.2 + sprint BPA-003 — elaboración propia derivada del ACU-004-25 Arts. 5a-g"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "valores_culturales_v1_v5"
  ddd_aggregate_root: "CulturaInstitucionalUDFJC"
  ddd_bc_ref: "[[bc-cultura-organizacional-udfjc]]"
  ddd_role_in_context: "Value Objects que representan dimensiones culturales del Aggregate Cultura Institucional. Cada V tiene: definición, arquetipos de madurez (escala cualitativa), indicadores observacionales, mecanismos de migración."
  ddd_invariants:
    - "Los 5 valores son inseparables — sin alguno la cultura institucional es incompleta"
    - "Los arquetipos de madurez son cualitativos, no cuantitativos"
    - "La migración requiere intervenciones culturales (no solo normativas)"
  ddd_ubiquitous_terms:
    - "V1 Soberanía · V2 Emprendimiento · V3 Participación · V4 Ética · V5 Austeridad"
    - "Arquetipo de madurez"
    - "Cultura institucional"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M04 §4.2 + sprint BPA-003 + ACU-004-25 Arts. 5a-g"
  neon_alignment_confidence: 0.85

applicable_domain: "Diagnóstico cultural Escuelas UDFJC + diseño de intervenciones culturales + monitoreo transición Sub-N1 → N4"
assumptions:
  - "Los 5 valores son exhaustivos para capturar la cultura institucional UDFJC"
  - "Los arquetipos de madurez son operacionalizables con observación cualitativa estructurada"
breaks_at:
  - "Si se confunden con los V1-V3 CCA curriculares (homonimia parcial)"
  - "Si se reducen a métricas cuantitativas simplistas"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-v1v5-deriva-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los V1-V5 culturales operacionalizan los principios refundacionales del Art. 5 ACU-004-25: V1 Soberanía ⊃ Art. 5g Soberanía Cognitiva; V3 Participación ⊃ Art. 5d Democracia Representativa-Participativa; V4 Ética ⊃ principios refundacionales generales."
  - rel_id: rel-v1-soberania-converge
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "V1 Soberanía cultural converge con Soberanía Cognitiva refundacional (Art. 5g) — el primero es dimensión cultural del segundo."
  - rel_id: rel-v1v5-aplica-roles
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-seis-roles-jtbd-comunidad-udfjc]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los V1-V5 culturales se mapean diferencialmente a los 6 roles JTBD (M04): cada rol tiene arquetipos específicos de madurez en cada V."
  - rel_id: rel-v1v5-rt6
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RT6 (Resistencia al cambio no gestionada) se diagnostica y mitiga mediante el sistema V1-V5: la resistencia es síntoma de inmadurez en V3 (Participación) o V4 (Ética)."

cited_in: ["[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - valores-culturales
  - v1-v5-culturales
  - propietario-udfjc
  - m04-corpus
  - audit-v2-2
---


# Valores Culturales V1-V5 UDFJC

## Definición operativa

Cinco valores culturales institucionales con arquetipos de madurez:

| # | Valor | Arquetipo inmaduro | Arquetipo maduro |
|:-:|---|---|---|
| **V1** | Soberanía | Dependiente | Soberano cognitivo |
| **V2** | Emprendimiento | Receptor pasivo | Creador valor real |
| **V3** | Participación | Consultor formal | Vinculante con poder |
| **V4** | Ética | Cumplimiento nominal | Integral con rendición |
| **V5** | Austeridad | Dispendioso | Optimizador colaborativo |

## ⚠️ Distinción nomenclatura

| Sistema | Cardinalidad | Referente |
|---|:-:|---|
| **V1-V5 culturales** | 5 | Valores institucionales (M04) |
| **V1-V3 CCA** | 3 | Vectores curriculares Comprensiva-Experimental-Transformativa (M06) |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §04 · JTBD de la Comunidad UDFJC. *Capítulo MI-12* §4.2. UDFJC. + Sprint BPA-003.

## Lenguaje ubicuo asociado

V1 Soberanía · V2 Emprendimiento · V3 Participación · V4 Ética · V5 Austeridad · Arquetipos de madurez · Cultura institucional.

## Notas de aplicación

- **Conexión M04 §4.2**: marco diagnóstico cultural.
- **Conexión M00 Art. 5**: derivado de los principios refundacionales.
