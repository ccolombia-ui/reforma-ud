---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:smmlv-pais-2026
kd_title: "SMMLV-país-2026 · normalización cross-país de costos para benchmark BMK-001"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "SMMLV-país-2026 · normalización cross-país de costos"
skos_altLabel: ["SMMLV-país", "Tabla SMMLV cross-country", "Normalización salario mínimo país"]
skos_definition: "Tabla de **normalización cross-país** propuesta en M08 + M09 (Madera Sepúlveda 2026) que expresa costos institucionales en **múltiplos del Salario Mínimo Mensual Legal Vigente (SMMLV) del país de cada IES**, permitiendo comparaciones BMK-001 sin distorsiones por inflación, tipos de cambio o poder adquisitivo. La fórmula es: **Costo_normalizado = Costo_local / SMMLV_país_año**. Tabla SMMLV-país-2026 (referente para 16+ países BMK-001): Colombia $1.423.500 COP; USA federal minimum $7.25/h × 173h = ~$1.255 USD; Francia SMIC ~€1.802; Alemania Mindestlohn ~€2.151; México ~$7.467 MXN; Corea ~₩2.060.000; etc. Aplicado a comparación: una BPA cuesta 18 SMMLV-CO en UDFJC (~$25K USD) vs. 12 SMMLV-USA en MIT (~$15K USD nominales pero 17.5K USD ajustado). Sin SMMLV-país, comparación nominal en USD inflaría artificialmente costos UDFJC (apreciación COP) o subestimaría costos MIT (ajuste poder adquisitivo)."
skos_scopeNote: "SMMLV-país NO es PPP (Purchasing Power Parity) ni Big Mac Index — es métrica más conservadora de poder adquisitivo del trabajador mínimo, aplicable específicamente a contextos universitarios públicos. Su valor: simplicidad + datos públicos disponibles + relevancia política (coste como múltiplo del salario mínimo es proxy de equidad)."
skos_example: "Comparación CAPEX BPA Living Lab: UDFJC = 18 SMMLV-CO; MIT = 12 SMMLV-USA; Aalto = 9 SMMLV-FI. Conclusión: Living Lab es relativamente más caro en UDFJC (Colombia con menor capacidad presupuestal relativa). Decisión: priorizar BPAs con menor SMMLV-CO en UDFJC primero."
skos_notation: "SMMLV-país-2026"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Métrica de normalización cross-país de costos institucionales"
iso_differentia: "Múltiplos de SMMLV nacional; conservadora vs PPP/Big Mac; aplicable a benchmark BMK-001 16+ países"
iso_subject_field: "Cross-country comparison / Higher education economics / Cost benchmarking"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M08 + M09 §6 — elaboración propia"

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-09--ds-presupuesto-nicsp]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t6-datos-sistemas
  - smmlv-pais
  - normalizacion-cross-country
  - propietario-udfjc
  - m09-corpus
  - audit-v2-2
---


# SMMLV-país-2026

## Definición operativa

Normalización cross-país de costos: **Costo_normalizado = Costo_local / SMMLV_país_año**.

## Tabla SMMLV-país-2026 (referente)

| País | SMMLV 2026 | Moneda |
|---|:-:|---|
| Colombia | 1.423.500 | COP |
| USA federal | ~1.255 | USD |
| Francia SMIC | ~1.802 | EUR |
| Alemania Mindestlohn | ~2.151 | EUR |
| México | ~7.467 | MXN |
| Corea | ~2.060.000 | KRW |
| (otros 10+ países BMK-001) | … | … |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 + M09 §6. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

SMMLV-país · Normalización cross-country · 16+ países · BMK-001.

## Notas de aplicación

- **Conexión M08 + M09**: insumo para CAPEX/OPEX comparables.
- **NO confundir** con PPP o Big Mac Index.
