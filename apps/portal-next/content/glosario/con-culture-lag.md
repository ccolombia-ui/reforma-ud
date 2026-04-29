---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:culture-lag
kd_title: "Culture Lag · fórmula del desfase estructural-cultural en transformación universitaria"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Culture Lag · Desfase Estructural-Cultural"

skos_prefLabel: "Culture Lag · fórmula del desfase estructural-cultural"
skos_altLabel: ["Desfase Estructural-Cultural", "Culture Lag UDFJC", "N - G_equivalente"]
skos_definition: "Métrica formal propuesta en M05 §3.2 (Madera Sepúlveda 2026) que cuantifica el **desfase entre estructura decretada normativamente y cultura operante observable** en una IES en transición. La fórmula es: **culture_lag(unidad, función) = max(0, N_estructura − G_equivalente)** donde: (i) **N_estructura** = nivel decretado por norma (ej. ACU-004-25 decreta N3+: Escuelas, Institutos, Centros, CABAs); (ii) **G_equivalente** = nivel cultural observable que efectivamente opera (ej. UDFJC opera Sub-N1 en formación: programas-isla pre-departamentales). Aplicado a UDFJC 2026: estructura decretada N3 + cultura operante Sub-N1 → **culture_lag = 2** (gap crítico). El concepto es síntesis original del autor inspirada en el clásico *cultural lag* de William F. Ogburn (1922) — desfase entre cambio material/tecnológico y cambio cultural/normativo. La aplicación universitaria invierte la dirección: aquí el cambio normativo (estatuto) precede al cultural (operación). Es métrica diagnóstica que permite planificar intervenciones culturales explícitas durante transición."
skos_scopeNote: "El concepto NO es de Ogburn 1922 directamente — es síntesis original aplicada a contexto universitario. La diferencia clave: en Ogburn el rezago es CULTURA detrás de TECNOLOGÍA; aquí es CULTURA detrás de NORMA. La operacionalización con N - G_equivalente es contribución propia M05."
skos_example: "Cálculo culture_lag UDFJC 2026 por función misional: F1 Formación = 3 - 0 = 3 (decretada N3 Escuelas, opera Sub-N1 = 0); F2 Investigación = 3 - 1 = 2; F3 Extensión = 3 - 1 = 2; F4 Integración = 4 - 0 = 4 (peor caso). Promedio institucional: ~2.75. Implicación: la reforma normativa fracasará sin intervenciones culturales explícitas."
skos_notation: "culture_lag"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Métrica formal de desfase entre estructura normativa y cultura operante"
iso_differentia: "Fórmula max(0, N - G_equivalente); aplicada a transición universitaria; síntesis original derivada de Ogburn 1922 invertida"
iso_subject_field: "Higher education research / Sociology of organizations / Change management"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M05 §3.2 — elaboración propia inspirada en Ogburn (1922)"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M05 §3.2 (síntesis original) + Ogburn (1922) Cultural Lag (referente histórico)"
  neon_alignment_confidence: 0.85

applicable_domain: "Diagnóstico transición UDFJC + planificación intervenciones culturales + monitoreo Comisión Art. 100"
assumptions:
  - "El nivel cultural G es observable cualitativamente"
  - "El cambio normativo precede al cultural en reformas top-down"
breaks_at:
  - "Si se confunde con Ogburn 1922 directamente (es inversión)"
  - "Si G no es observable o se asume = N (anula la métrica)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-clag-aplica-taxonomia
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-taxonomia-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "culture_lag opera sobre la taxonomía Sub-N1 → N4: N es nivel decretado, G_equivalente es nivel observable, ambos en la misma escala."
  - rel_id: rel-clag-justifica-salto
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-salto-cuantico-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Un culture_lag ≥ 2 justifica el salto cuántico vía nichos (CABAs) en lugar de reforma lineal: cuanto mayor el lag, más necesaria la estrategia de nichos protegidos."
  - rel_id: rel-clag-mide-rt6
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "culture_lag es métrica observable de RT6 (Resistencia al cambio no gestionada): cultura no migra al ritmo de la norma."

cited_in: ["[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t5-sintesis-investigacion
  - culture-lag
  - ogburn
  - propietario-udfjc
  - m05-corpus
  - audit-v2-2
---


# Culture Lag · Desfase Estructural-Cultural

## Definición operativa

> **culture_lag(unidad, función) = max(0, N_estructura − G_equivalente)**

| Variable | Significado |
|---|---|
| **N_estructura** | Nivel decretado por norma |
| **G_equivalente** | Nivel cultural observable operando |

## Cálculo UDFJC 2026

| Función | N decretada | G observada | Lag |
|---|:-:|:-:|:-:|
| F1 Formación | 3 | 0 (Sub-N1) | **3** |
| F2 Investigación | 3 | 1 | 2 |
| F3 Extensión | 3 | 1 | 2 |
| F4 Integración | 4 | 0 | **4** |

> **Promedio institucional ≈ 2.75** → reforma normativa fracasará sin intervenciones culturales.

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M05 BMK-001 §3.2. *Capítulo MI-12*. UDFJC. — síntesis derivada de Ogburn (1922) *Cultural Lag* aplicada e invertida.

## Lenguaje ubicuo asociado

culture_lag · Desfase estructural-cultural · N - G_equivalente · Ogburn invertido.

## Notas de aplicación

- **Conexión M05 §3.2**: contribución original como métrica formal.
- **NO confundir**: la versión Ogburn 1922 mide cultura tras tecnología; aquí cultura tras norma.
