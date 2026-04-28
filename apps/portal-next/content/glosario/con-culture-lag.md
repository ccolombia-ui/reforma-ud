---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:culture-lag
kd_title: "Culture Lag · fórmula del desfase estructural-cultural en transformación universitaria"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


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





"@type": DefinedTerm


cited_in: ["[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags: [glosario-universal, concepto-meta-instrumental, culture-lag, ogburn, m05-corpus, propietario-udfjc, audit-v1]
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
