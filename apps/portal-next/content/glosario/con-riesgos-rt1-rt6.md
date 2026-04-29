---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:riesgos-rt1-rt6
kd_title: "6 Riesgos de Transición RT1-RT6 — anti-patrones del proceso de reforma UDFJC"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "6 Riesgos de Transición RT1-RT6"

skos_prefLabel: "6 Riesgos de Transición RT1-RT6"
skos_altLabel: ["RT1-RT6", "6 riesgos transición reforma", "Anti-patrones reforma UDFJC"]
skos_definition: "Conjunto de seis riesgos sistémicos identificados en M01 §5.2 (Madera Sepúlveda 2026) que amenazan la implementación efectiva de la reforma vinculante UDFJC. Etiquetados con prefijo RT (Riesgo de Transición) para distinguirlos de las retroalimentaciones R1-R6 del ciclo virtuoso ΩMT (M02): (RT1) Fragmentación organizacional — cada dependencia interpreta el Acuerdo a su manera; (RT2) Conflictos normativos — contradicciones con reglamentación previa; (RT3) Desalineación con PIIOM — implementar sin verificar contribución a 5 misiones; (RT4) Pérdida de memoria institucional — no documentar decisiones; (RT5) Ausencia de sistema de seguimiento — sin métricas verificables; (RT6) Resistencia al cambio no gestionada — bloqueo cultural-político. Cada riesgo tiene probabilidad + impacto + mitigación recomendada."
skos_scopeNote: "ATENCIÓN nomenclatura — RT1-RT6 (riesgos transición) ≠ R1-R6 (retroalimentaciones ciclo virtuoso ΩMT M02) ≠ R-1..R-5 (cinco vías Clark) ≠ M01..M12 (papers cap-MI12) ≠ I0..I4 (iniciativas) ≠ PIIOM-M1..M5 (misiones nacionales). Total de 6 sistemas distintos con letras similares — protocolo: SIEMPRE usar el prefijo identificador (RT, R, R-, M, I, PIIOM-M)."
skos_example: "RT3 (Desalineación PIIOM) probabilidad MEDIA + impacto CRÍTICO. Mitigación: matriz de trazabilidad PIIOM por iniciativa — cada proyecto/programa declara explícitamente a qué misión PIIOM contribuye, y CIDC verifica la suma agregada institucional."
skos_notation: "RT1-RT6"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de riesgos sistémicos de transformación universitaria"
iso_differentia: "6 riesgos identificados M01 §5.2; nomenclatura RT distinta de R/R-/M/I/PIIOM-M"
iso_subject_field: "Gestión de riesgos / Reforma universitaria / Anti-patrones organizacionales"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) — elaboración propia M01 §5.2"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Análisis crítico Madera Sepúlveda 2026 + literatura gestión del cambio"
  neon_alignment_confidence: 0.85

applicable_domain: "Gestión de riesgos de implementación reforma UDFJC + diseño de monitoreo institucional"
assumptions: ["Los 6 riesgos son exhaustivos para el contexto UDFJC"]
breaks_at: ["Si surge nuevo riesgo crítico no contemplado"]

valid_from: "2026-04-26"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-rt-amenaza-acu00425
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-acu-004-25]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RT1-RT6 son los riesgos sistémicos que amenazan la implementación efectiva del ACU-004-25 (M01 §5.2). El glosario universal M00 mismo es la mitigación de RT1 (marco interpretativo único)."
  - rel_id: rel-rt6-afecta-comunidad
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-comunidad-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RT6 (resistencia al cambio no gestionada) afecta directamente la apropiación de la reforma por los estamentos. Mitigación crítica: comunicación + capacitación dirigidas a Comunidad Universitaria."
  - rel_id: rel-rt-deliberacion-asamblea
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-asamblea-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La Asamblea Universitaria es el espacio deliberativo legítimo para tematizar los RT1-RT6 con la Comunidad Universitaria; su no-constitución agrava RT6 (resistencia)."
  - rel_id: rel-rt5-mitigado-bsc
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-bsc-s]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Mitigación RT5 (ausencia de sistema de seguimiento): Balanced Scorecard sectorial (BSC-s) como instrumento de monitoreo institucional con indicadores verificables."
  - rel_id: rel-rt5-mitigado-rbm
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-rbm-gac]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Mitigación RT5 complementaria: Results-Based Management + Gestión por Áreas Críticas (RBM-GAC) como marco de gestión orientada a resultados."
  - rel_id: rel-rt3-mitigado-piiom
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cinco-misiones-piiom]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Mitigación RT3 (desalineación PIIOM): matriz de trazabilidad — cada iniciativa declara explícitamente a qué misión PIIOM-M1..M5 contribuye."
  - rel_id: rel-rt5-monitorea-plan
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-plan-implementacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RT5 (ausencia de sistema de seguimiento) se materializa en el incumplimiento del Plan de Implementación Art. 98 (vencido 2025-06-19); el sistema de seguimiento que mitiga RT5 debe partir de un Plan formalmente aprobado."

cited_in: ["[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - rt1-rt6
  - riesgos-transicion
  - propietario-udfjc
  - m01-corpus
  - audit-v2-2
---


# 6 Riesgos de Transición RT1-RT6

## Definición operativa

Seis **riesgos sistémicos** identificados en M01 §5.2 que amenazan la implementación efectiva de la reforma UDFJC.

## Los 6 riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación recomendada |
|:-:|---|:-:|:-:|---|
| **RT1** | Fragmentación organizacional | ALTA | CRÍTICO | Marco interpretativo único (glosario universal M00) |
| **RT2** | Conflictos normativos | ALTA | ALTO | Auditoría normativa automatizada |
| **RT3** | Desalineación con PIIOM | MEDIA | CRÍTICO | Matriz de trazabilidad PIIOM por iniciativa |
| **RT4** | Pérdida de memoria institucional | ALTA | MEDIO | Knowledge Graph institucional |
| **RT5** | Ausencia de sistema de seguimiento | ALTA | ALTO | Framework BSC-s + RBM-GAC |
| **RT6** | Resistencia al cambio no gestionada | MUY ALTA | CRÍTICO | Comunicación + capacitación + quick wins |

## ⚠️ Distinción nomenclatura crítica

| Sistema | Significado |
|---|---|
| **RT1-RT6** | Riesgos transición (este glosario) |
| **R1-R6** | Retroalimentaciones ciclo virtuoso ΩMT (M02) |
| **R-1..R-5 Clark** | Vías universidad emprendedora |
| **M01..M12** | Papers cap-MI12 |
| **I0..I4** | Iniciativas estratégicas UDFJC |
| **PIIOM-M1..M5** | Misiones nacionales MinCiencias |

## Lenguaje ubicuo asociado

RT1-RT6 · Riesgos de transición · Anti-patrones reforma · Gestión del cambio.

## Notas de aplicación

- **Conexión M01 §5.2**: análisis crítico de la implementación.
- **Mitigación RT1**: el corpus M00 (glosario universal) ES la mitigación al riesgo RT1 (marco interpretativo único).
