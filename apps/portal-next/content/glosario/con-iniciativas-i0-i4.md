---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:iniciativas-i0-i4
kd_title: "Iniciativas I0-I4 UDFJC — palancas estratégicas de implementación reforma"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-01, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Iniciativas I0-I4 UDFJC"

skos_prefLabel: "Iniciativas I0-I4 UDFJC"
skos_altLabel: ["I0-I4", "5 Iniciativas estratégicas reforma", "Initiatives Framework UDFJC"]
skos_hiddenLabel: ["iniciativas-i0-i4", "i0-i4"]
skos_definition: "Conjunto de cinco iniciativas estratégicas (I0 a I4) propuestas por el corpus M01-M12 (Madera Sepúlveda, 2026) como palancas de implementación de la reforma vinculante UDFJC: (I0) Activar la cadena normativa multinivel — capacitación + apropiación; (I1) Reformar la malla curricular hacia los 5 campos del conocimiento-saber + 5 misiones PIIOM; (I2) Constitución progresiva de las ~25 Escuelas con CABAs transversales; (I3) Articulación PM2 (Investigación-Creación-Innovación) con 5 misiones nacionales; (I4) Campus Regenerativo — bioeconomía + economía circular en operación institucional. Cada iniciativa tiene metas, indicadores y responsables específicos definidos en el roadmap 2026-2034 (M12)."
skos_scopeNote: "I0-I4 NO son las 5 misiones PIIOM (que son nacionales); son palancas internas UDFJC para implementar la reforma. Su nomenclatura I0..I4 tampoco se confunde con M01..M12 (papers) ni con PIIOM-M1..M5 (misiones nacionales) ni con R-1..R-5 Clark (vías universidad emprendedora) ni con R1..R6 retroalimentaciones (ciclo virtuoso)."
skos_example: "I4 Campus Regenerativo articula CONPES 3934 Pilar 1 (Bioeconomía) + Pilar 2 (Economía Circular) en la operación física del campus universitario UDFJC: gestión de residuos, eficiencia energética, biorremediación, jardines de biodiversidad — todo como dispositivo pedagógico para los Programas Académicos."
skos_notation: "I0..I4"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de palancas estratégicas de implementación reforma universitaria"
iso_differentia: "5 iniciativas internas UDFJC (I0-I4); palancas operativas; distintas de misiones nacionales PIIOM-M1..M5"
iso_subject_field: "Implementación reforma UDFJC / Estrategia operativa institucional"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) — elaboración propia M01-M12"

align_schema_type: DefinedTermSet
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NEON]

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Síntesis propietaria UDFJC sobre [[con-acu-004-25]] + [[con-cinco-misiones-piiom]] + [[con-conpes-3934]]"
  neon_alignment_confidence: 0.8

applicable_domain: "Plan de implementación reforma UDFJC + roadmap 2026-2034"
assumptions: ["Las 5 iniciativas son palancas suficientes (sin solapamiento ni omisión)"]
breaks_at: ["Si surge nueva palanca crítica no contemplada"]
extends_to: ""

recorded_at: "2026-04-26"
valid_from: "2026-04-26"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTermSet

tupla__relations:
  - rel_id: rel-i0-i4-related-acu
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: skos
  - rel_id: rel-i0-i4-activa-omt
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-omt]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Las 5 iniciativas I0-I4 son los activadores institucionales del ciclo virtuoso ΩMT (M02): I0 condiciona R1, I1 R2, I2 R3+R4, I3 R5, I4 R6. Sin iniciativas concretas, las retroalimentaciones del ciclo virtuoso no se materializan."
  - rel_id: rel-i0-i4-implementa-funciones-misionales
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "I1 (Reforma curricular) implementa PM1; I3 (Articulación PM2) implementa PM2; I4 (Campus Regenerativo) implementa PM3. I0 e I2 son iniciativas habilitadoras transversales de las 3 funciones misionales del Art. 7 ACU-004-25."
  - rel_id: rel-i0-i4-aplica-piiom
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-cinco-misiones-piiom]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "I1 e I3 alinean malla curricular y PM2 con las 5 misiones nacionales PIIOM (mitigación RT3 desalineación)."
  - rel_id: rel-i0-i4-bsc-rbm-tracking
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-rbm-gac]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Cada iniciativa I0-I4 se gestiona con cadenas RBM (objetivos → outputs → outcomes → impactos) en los 4 niveles L0-L3 del marco GAC."

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags: [glosario-universal, concepto-sintesis, iniciativas-i0-i4, m01-corpus, propietario-udfjc, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-neon, layer-disenador]
---

# Iniciativas I0-I4 UDFJC

## Definición operativa

Cinco **palancas estratégicas internas** de implementación de la reforma vinculante UDFJC (Madera Sepúlveda, 2026, M01-M12).

## Las 5 iniciativas

| # | Iniciativa | Descripción |
|:-:|---|---|
| **I0** | Activar cadena normativa | Capacitación + apropiación del corpus normativo |
| **I1** | Reforma malla curricular | Hacia 5 campos conocimiento-saber + 5 misiones PIIOM |
| **I2** | Constitución de Escuelas | ~25 Escuelas con CABAs transversales |
| **I3** | Articulación PM2 | Investigación-Creación-Innovación con 5 misiones |
| **I4** | Campus Regenerativo | Bioeconomía + economía circular en operación institucional |

## ⚠️ Distinción crítica con otros sistemas

| Sistema | Cardinalidad | Significado |
|---|:---:|---|
| **I0-I4** | 5 | Iniciativas internas UDFJC (este glosario) |
| **PIIOM-M1..M5** | 5 | Misiones MinCiencias nacionales |
| **M01..M12** | 12 | Papers cap-MI12 (corpus interno) |
| **R-1..R-5 Clark** | 5 | Vías universidad emprendedora |
| **R1..R6** | 6 | Retroalimentaciones ciclo virtuoso |

## Lenguaje ubicuo asociado

I0..I4 · 5 iniciativas · Palancas estratégicas · Roadmap 2026-2034.

## Notas de aplicación

- **NO confundir** con misiones PIIOM ni con papers M01-M12.
- **Conexión M01 §4.9 + M12**: las iniciativas se ejecutan en el roadmap 2026-2034.
