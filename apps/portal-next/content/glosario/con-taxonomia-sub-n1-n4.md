---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:taxonomia-sub-n1-n4
kd_title: "Taxonomía Sub-N1 a N4 — niveles de transformación universitaria UDFJC"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Taxonomía Sub-N1 a N4"

skos_prefLabel: "Taxonomía de Niveles Sub-N1 a N4"
skos_altLabel: ["Niveles N1-N4", "Taxonomía transformativa", "Salto cuántico Sub-N1→N4"]
skos_definition: "Taxonomía propietaria UDFJC (Madera Sepúlveda, 2026) que clasifica el grado de transformación de una unidad organizativa universitaria en cinco niveles: (Sub-N1) Régimen tradicional pre-reforma — Departamentos jerárquicos, autonomía defensiva, Frame 1 productivista; (N1) Adopción superficial — cambia nombres pero mantiene lógicas; (N2) Transición operativa — implementa estructuras nuevas pero coexisten lógicas; (N3) Adopción sustantiva — operación coherente con principios refundacionales; (N4) Transformación integrada — institución plenamente reformada con CABAs activas, Frame 3 implementado, autonomía positiva ejercida. El 'salto cuántico Sub-N1 → N4' designa la transformación deseada en horizonte 2026-2034 (M12 roadmap), activada principalmente por las CABAs como nichos transformativos."
skos_scopeNote: "La taxonomía es de granularidad institucional (aplicable a Escuelas, Programas, CABAs). Una IES como UDFJC puede tener simultáneamente unidades en distintos niveles durante el período de transición."
skos_example: "En 2026: Escuela de Física en N2 (transición operativa); CABA de Soberanía Energética en N3 (adopción sustantiva); algunas unidades aún en Sub-N1 (régimen tradicional). El roadmap 2026-2034 busca que el promedio institucional pase de N1.5 actual a N3.5 en 2034."
skos_notation: "Sub-N1 → N4"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Taxonomía de niveles de transformación organizacional"
iso_differentia: "5 niveles ordinales (Sub-N1 a N4); aplicable a unidades de granularidad variable; 'salto cuántico' como meta agregada"
iso_subject_field: "Reforma UDFJC / Sustainability transitions / Madurez organizacional"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) — elaboración propia"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Inspirada en MLP Geels 2002 (régimen-nicho-transición) + capability maturity models + síntesis UDFJC"
  neon_alignment_confidence: 0.8

applicable_domain: "Diagnóstico + roadmap de transformación de unidades organizativas UDFJC"
assumptions: ["Los niveles son ordinales (no exactamente cuantitativos)"]
breaks_at: ["Si se aplica como métrica cuantitativa rígida sin juicio cualitativo"]

valid_from: "2026-04-26"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-taxonomia-related-caba
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-caba]]"
    rel_frame: skos
  # — v1.1.0 cross-references M02 (Fase B audit refactor) ——————————
  - rel_id: rel-taxonomia-fundamenta-salto
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-salto-cuantico-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La taxonomía Sub-N1 → N4 (M05 BMK-001) es el insumo del diagnóstico previo del salto cuántico (M02 §4.4.2). Sin la taxonomía, no hay diagnóstico honesto del estadio actual."
  - rel_id: rel-taxonomia-mapea-mlp
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mlp-geels]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Sub-N1 = régimen frágil; N4 = nuevo régimen reconfigurado. La taxonomía mapea los niveles institucionales en lenguaje MLP."
  # — v1.2.0 cross-references M05 (Fase B audit refactor) ——————————
  - rel_id: rel-taxonomia-fuente-bmk001
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-bmk-001-21-ies]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "BMK-001 (M05) es la fuente formal de la taxonomía Sub-N1 → N4: la taxonomía emerge del análisis empírico de las 21 IES."
  - rel_id: rel-taxonomia-clag
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-culture-lag]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La taxonomía Sub-N1 → N4 es el dominio sobre el cual opera la métrica culture_lag = max(0, N - G_equivalente)."

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-sintesis
  - t5-sintesis-investigacion
  - taxonomia-n1-n4
  - salto-cuantico
  - propietario-udfjc
  - m01-corpus
  - audit-v2-2
---


# Taxonomía Sub-N1 a N4

## Definición operativa

Taxonomía propietaria UDFJC que clasifica el grado de transformación de una unidad organizativa universitaria en **5 niveles ordinales**:

| Nivel | Estado | Características |
|:-:|---|---|
| **Sub-N1** | Régimen tradicional | Departamentos jerárquicos, autonomía defensiva, Frame 1 |
| **N1** | Adopción superficial | Cambia nombres, mantiene lógicas previas |
| **N2** | Transición operativa | Implementa estructuras nuevas, coexisten lógicas |
| **N3** | Adopción sustantiva | Opera coherente con principios refundacionales |
| **N4** | Transformación integrada | CABAs activas, Frame 3, autonomía positiva |

> **"Salto cuántico Sub-N1 → N4"** = meta agregada de la reforma, activada por CABAs como nichos transformativos.

## Lenguaje ubicuo asociado

Taxonomía N1-N4 · Salto cuántico · Niveles de transformación · Madurez organizacional · CABA como nicho transformativo.

## Notas de aplicación

- **Aplicable a unidades de granularidad variable**: Escuelas, Programas, CABAs.
- **Una IES tiene unidades en niveles distintos** durante transición.
- **Conexión M12 roadmap**: meta promedio institucional pasar de N1.5 (2026) a N3.5 (2034).
