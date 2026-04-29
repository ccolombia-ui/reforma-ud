---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:ecuacion-smmlv-pais
kd_title: "Ecuaciones SMMLV-País — Normalización de costos y Ratio de Eficiencia Cross-IES (M08 §7.5 + M09 §6)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Ecuaciones SMMLV-País — Normalización cross-IES"

skos_prefLabel: "Ecuaciones SMMLV-País (M08-M09)"
skos_altLabel: ["SMMLV-país normalización", "eficiencia cross-IES", "costo SMMLV equivalente"]
skos_definition: "Par de fórmulas propuestas en M08 §7.5 y M09 §6 (Madera Sepúlveda 2026) para **normalizar costos universitarios entre países** usando el Salario Mínimo Mensual Legal Vigente (SMMLV) de cada país como denominador común, resolviendo el problema de comparar costos en monedas y estructuras salariales distintas. **Ecuación A (normalización)**: C_SMMLV = C_local / SMMLV_país, donde C_local es el costo en moneda nacional y SMMLV_país es el salario mínimo mensual del país en la misma moneda. El resultado C_SMMLV es adimensional (número de salarios mínimos mensuales). **Ecuación B (ratio de eficiencia cross-IES)**: η_{i,j} = C_SMMLV^{IES_i} / C_SMMLV^{IES_j}, donde un ratio <1 indica que IES_i es más eficiente que IES_j en unidades SMMLV-país comparables. La normalización SMMLV resuelve tres problemas: (a) inflación diferencial entre países; (b) poder adquisitivo distinto; (c) base salarial distinta. Limitación reconocida: es un proxy útil para order-of-magnitude, no equivalente a PPP (Purchasing Power Parity) riguroso."
skos_scopeNote: "El SMMLV-país NO es idéntico para todos los países — varía de federal (FLSA USA), estatal/provincial (Massachusetts, California, Quebec), sectorial (Finlandia TES), o por zona geográfica (México zona libre frontera). M08 usa el SMMLV más representativo del país donde opera la IES benchmark. El denominador siempre debe ser el SMMLV mensual (no diario, no horario) para comparabilidad. Colombia 2026 = $1.423.500 COP (Decreto 1571/2025)."
skos_example: "Normalización: UDFJC (S0) costo/egresado ≈ 150M COP. C_SMMLV = 150.000.000 / 1.423.500 ≈ 105 SMMLV-meses. MIT costo/grad ≈ $300K USD, SMMLV Massachusetts = $2.595 USD/mes. C_SMMLV^MIT = 300.000 / 2.595 ≈ 116 SMMLV-meses. Ratio η = 105/116 ≈ 0.90 — UDFJC(S0) es ligeramente más eficiente que MIT en SMMLV-país, PERO sin producir los mismos outputs. UDFJC(S5) proyectado = 32 SMMLV → η(S5/MIT) = 32/116 = 0.28 → 4× más eficiente que MIT."
skos_notation: "C_SMMLV = C_local/SMMLV; η_{i,j} = C_SMMLV^i/C_SMMLV^j"

concepto_formula_latex: |
  C_{\text{SMMLV}} = \frac{C_{\text{local}}}{\text{SMMLV}_{\text{país}}}
  \quad\quad
  \eta_{i,j} = \frac{C_{\text{SMMLV}}^{IES_i}}{C_{\text{SMMLV}}^{IES_j}}

concepto_formula_variables:
  - var: "C_{\\text{SMMLV}}"
    desc: "Costo normalizado en unidades de salario mínimo mensual (adimensional)"
  - var: "C_{\\text{local}}"
    desc: "Costo en moneda nacional del país de la IES (COP, USD, EUR, etc.)"
  - var: "\\text{SMMLV}_{\\text{país}}"
    desc: "Salario mínimo mensual legal vigente en el país de la IES (misma moneda que C_local)"
  - var: "\\eta_{i,j}"
    desc: "Ratio de eficiencia entre IES_i e IES_j — ratio < 1 significa IES_i más eficiente"
  - var: "\\eta < 1"
    desc: "IES_i más eficiente en costo-por-egresado que IES_j (misma calidad supuesta)"
  - var: "\\text{Colombia 2026}"
    desc: "SMMLV = $1.423.500 COP/mes (Decreto 1571/2025)"

concepto_prerequisitos:
  - "[[con-bmk-001-21-ies]]"
  - "[[con-ecuacion-ccr-tdabc]]"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Fórmula de normalización de costos universitarios cross-país"
iso_differentia: "Usa SMMLV-país como denominador; produce ratio adimensional comparables entre IES de distintos países; proxy PPP para order-of-magnitude"
iso_subject_field: "Comparative higher education economics / Benchmarking"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda, C. C. (2026). M08 §7.5 + M09 §6. *Capítulo MI-12*. UDFJC."

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M08 §7.5 + M09 §6 — elaboración propia"
  neon_alignment_confidence: 0.85

applicable_domain: "Benchmarking cross-IES UDFJC con 21 IES internacionales de BMK-001"
assumptions:
  - "El SMMLV-país es un proxy razonable de la estructura de costos de vida del país"
  - "Se compara 'costo por egresado' — implica que los egresados tienen calidad comparable (supuesto fuerte)"
  - "Los SMMLV no-colombianos son proyecciones 2026 (tabla viva — actualizar trimestralmente)"
breaks_at:
  - "Si se usa para comparar países con hiperinflación o control de cambios (proxy colapsa)"
  - "Si se equipara con PPP riguroso (es order-of-magnitude, no exacto)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-smmlv-habilita-bmk
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-bmk-001-21-ies]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La normalización SMMLV-país habilita la comparación cross-IES del BMK-001 (21 universidades de 12 países) sin distorsiones por diferencias monetarias."
  - rel_id: rel-smmlv-aplica-ccr
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-ecuacion-ccr-tdabc]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El CCR UDFJC (COP/hora) se convierte a SMMLV-país para comparar eficiencia con IES extranjeras vía la ecuación de normalización."

cited_in: ["[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-09--ds-presupuesto-nicsp]]"]
cited_count: 2

tags:
  - glosario-universal
  - t5-sintesis-investigacion
  - ecuacion
  - smmlv-pais
  - benchmarking
  - eficiencia-cross-ies
  - m08-corpus
  - m09-corpus
  - propietario-udfjc
  - audit-v2-2
---


# Ecuaciones SMMLV-País — Normalización cross-IES

## Fórmulas

**Ecuación A — Normalización de costo:**
$$
C_{\text{SMMLV}} = \frac{C_{\text{local}}}{\text{SMMLV}_{\text{país}}}
$$

**Ecuación B — Ratio de eficiencia cross-IES:**
$$
\eta_{i,j} = \frac{C_{\text{SMMLV}}^{IES_i}}{C_{\text{SMMLV}}^{IES_j}}
$$

## Variables

| Símbolo | Significado | Unidad |
|---|---|---|
| $C_{\text{SMMLV}}$ | Costo normalizado | SMMLV-meses (adimensional) |
| $C_{\text{local}}$ | Costo en moneda nacional | COP / USD / EUR / ... |
| $\text{SMMLV}_{\text{país}}$ | Salario mínimo mensual | moneda nacional/mes |
| $\eta_{i,j}$ | Ratio de eficiencia IES_i vs IES_j | adimensional |

## Comparación clave UDFJC (M08 §7.5)

| IES | País | Costo/egresado | SMMLV mensual | $C_{\text{SMMLV}}$ |
|---|---|---:|---:|---:|
| UDFJC (S0) | Colombia | ~150M COP | 1.423.500 COP | **~105** |
| UDFJC (S5) | Colombia | ~45M COP | 1.423.500 COP | **~32** |
| MIT | USA-MA | ~$300K USD | $2.595 USD | **~116** |
| ÉTS | Canadá-QC | ~$110K CAD | $2.785 CAD | **~40** |
| ITESM | México | ~$1.2M MXN | $8.866 MXN | **~135** |

> **Insight**: UDFJC(S5) ≈ ÉTS (~32-40) — eficiencia comparable a IES referente N4.

## Prerequisitos conceptuales

1. `[[con-bmk-001-21-ies]]` — los 21 IES del benchmark a comparar
2. `[[con-ecuacion-ccr-tdabc]]` — el CCR que provee C_local

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M08 §7.5 + M09 §6. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

SMMLV-país · normalización cross-IES · ratio eficiencia · order-of-magnitude PPP · costo/egresado SMMLV.

## Notas de aplicación

- **No es PPP riguroso**: es proxy para comparación de magnitudes. Suficiente para decisiones estratégicas S0-S5.
- **Tabla SMMLV viva**: los SMMLV no-colombianos son proyecciones — actualizar trimestralmente (DT-MI12-08-09).
- **Supuesto fuerte**: asume que un "egresado" de UDFJC es comparable a uno de MIT/ÉTS. En realidad hay gap C1-C5. El insight correcto es: "con S5, UDFJC produce outputs similares a ÉTS a costo similar".
