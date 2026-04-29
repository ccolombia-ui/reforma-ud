---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:resultados-emergentes-e1-e3
kd_title: "3 Resultados Emergentes E1-E3 del Ciclo Virtuoso ΩMT (Competencias de Núcleo + Aprendizaje Soberano + Nichos Transformativos)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "3 Resultados Emergentes E1-E3 del Ciclo Virtuoso ΩMT"

skos_prefLabel: "Resultados Emergentes E1 (Competencias de Núcleo) · E2 (Aprendizaje Soberano) · E3 (Nichos Transformativos)"
skos_altLabel: ["E1-E3", "Tres resultados emergentes", "Outcomes emergentes ΩMT", "Three emergent outcomes"]
skos_definition: "Conjunto de tres resultados institucionales que **emergen** (no se 'producen' en ningún proceso específico) de la interacción virtuosa de PM1-PM2-PM3 cuando es orientada por ΩMT y conectada por las 6 retroalimentaciones R1-R6. Los tres resultados son: **E1 Competencias de Núcleo** (Prahalad & Hamel 1990) — capacidades institucionales únicas que dan acceso a múltiples mercados, contribuyen significativamente al valor percibido y son difíciles de imitar; emergen como propiedad sistémica, no como producto departamental; **E2 Aprendizaje Soberano** (UNESCO 2021 Reimagining) — plataformas de producción y circulación de conocimiento que NO dependen de infraestructuras privadas; el equivalente cognitivo de la soberanía alimentaria/energética; **E3 Nichos Transformativos** (Geels 2002 + Schot 2018) — espacios protegidos donde se ensayan modelos institucionales alternativos (CABAs, Escuelas-piloto) que pueden escalar mediante el patrón Reconfiguración. Los E1-E3 NO son outputs medibles departamentalmente; son outcomes sistémicos verificables a nivel institucional."
skos_scopeNote: "E1-E3 NO son métricas de productividad departamental sino outcomes institucionales. NO se miden contando papers (E1), descargas de plataformas (E2) o número de pilotos (E3) sino dimensiones cualitativas + cuantitativas verificables. Son los criterios de éxito de ΩMT — sin E1-E3, ΩMT es retórica."
skos_example: "Una UDFJC en estado N4 demuestra E1-E3 así: **E1** = Competencias de Núcleo en bioeconomía territorial (única en Colombia); **E2** = repositorio institucional + LMS soberano (no dependiente de plataformas privadas); **E3** = 5+ CABAs activas operando como nichos protegidos durante el período de transición 2025-2034."
skos_notation: "E1-E3"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de outcomes institucionales emergentes del ciclo virtuoso ΩMT"
iso_differentia: "3 resultados verificables (Competencias de Núcleo + Aprendizaje Soberano + Nichos Transformativos); emergencia sistémica no producción departamental; criterio de éxito de ΩMT"
iso_subject_field: "Estrategia institucional universitaria / Capacidades organizacionales / Sustainability transitions"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M02 §4.3 — síntesis de Prahalad & Hamel (1990) + UNESCO (2021) + Geels (2002) + Schot (2018)"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "resultados_emergentes_e1_e3"
  ddd_aggregate_root: "CicloVirtuosoOMT"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: "Value Objects que representan outcomes sistémicos del Aggregate ΩMT. Cada E es un VO con: definición operativa, dimensiones de medición, indicadores AS-IS/TO-BE, mecanismo de emergencia."
  ddd_invariants:
    - "Los E1-E3 NO se producen en un proceso específico — emergen del sistema completo"
    - "La medición es a nivel institucional, no departamental"
    - "Los 3 outcomes son condición del éxito de ΩMT (sin E1-E3, ΩMT es retórica)"
    - "Cada E tiene una literatura externa de respaldo (Prahalad/UNESCO/Geels)"
  ddd_ubiquitous_terms:
    - "E1 Competencias de Núcleo · E2 Aprendizaje Soberano · E3 Nichos Transformativos"
    - "Outcome emergente · Resultado sistémico · Capacidad organizacional"
    - "Soberanía cognitiva"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M02 §4.3 — síntesis sobre Prahalad & Hamel 1990 + UNESCO 2021 + Geels 2002 + Schot 2018"
  neon_alignment_confidence: 0.85

applicable_domain: "Estrategia institucional UDFJC + monitoreo de transformación + comunicación con stakeholders externos"
assumptions:
  - "Los 3 resultados son exhaustivos para capturar el éxito de ΩMT"
  - "Los outcomes emergentes son medibles aunque no por outputs departamentales clásicos"
breaks_at:
  - "Si se reducen E1-E3 a métricas departamentales (anti-patrón)"
  - "Si se mide solo uno de los 3 (los E1-E3 son inseparables)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-e1e3-resultado-omt
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-omt]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los E1-E3 son los outcomes que emergen del ciclo virtuoso ΩMT cuando las 6 R están activas simultáneamente. Sin E1-E3 verificables, ΩMT es retórica."
  - rel_id: rel-e1e3-emerge-r1r6
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los E1-E3 emergen específicamente de la activación simultánea de las 6 R: E1 emerge de R1+R2+R4 (capacidades transversales); E2 de R2+R6 (plataformas soberanas); E3 de R4+R5 (nichos territoriales)."
  - rel_id: rel-e3-fundamentado-mlp
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-mlp-geels]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "E3 (Nichos Transformativos) es directamente derivado de la MLP de Geels: los nichos son el dispositivo de transición por excelencia."
  - rel_id: rel-e2-converge-soberania
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "E2 (Aprendizaje Soberano) materializa el principio refundacional de Soberanía Cognitiva (Art. 5g ACU-004-25) en plataformas concretas no-dependientes de infraestructuras privadas."
  - rel_id: rel-e2-converge-unesco21
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-unesco-reimagining-2021]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "E2 está conceptualmente alineado con el principio 'educación como bien común' del reporte UNESCO 2021 — plataformas soberanas son condición material del bien común educativo."
  - rel_id: rel-e1-articula-funciones
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "E1 (Competencias de Núcleo) emerge cuando las 3 funciones misionales operan articuladamente — son capacidades institucionales únicas no atribuibles a una sola PM."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - resultados-emergentes-e1-e3
  - outcomes
  - propietario-udfjc
  - m02-corpus
  - audit-v2-2
---


# Los 3 Resultados Emergentes E1-E3 del Ciclo Virtuoso ΩMT

## Definición operativa

Tres outcomes institucionales que **emergen** (no se producen departamentalmente) cuando PM1-PM2-PM3 son orientados por ΩMT y conectados por las 6 R1-R6:

| # | Resultado | Definición | Fuente externa |
|:-:|---|---|---|
| **E1** | Competencias de Núcleo | Capacidades institucionales únicas, dificiles de imitar, transversales a múltiples mercados | Prahalad & Hamel 1990 |
| **E2** | Aprendizaje Soberano | Plataformas de conocimiento NO dependientes de infraestructuras privadas | UNESCO 2021 Reimagining |
| **E3** | Nichos Transformativos | Espacios protegidos donde se ensayan modelos institucionales alternativos | Geels 2002 + Schot 2018 |

> [!important] Emergencia sistémica
> E1-E3 NO son outputs de una vicerrectoría específica. **Emergen** del sistema cuando las 6 R están en 🟢 simultáneas. Sin emergencia → ΩMT es retórica.

## Articulación con R1-R6

| Resultado | Activado por |
|---|---|
| **E1** Competencias de Núcleo | R1 (semilleros) + R2 (currículo vivo) + R4 (problemas reales) |
| **E2** Aprendizaje Soberano | R2 (CRIS al aula) + R6 (egresados agentes) |
| **E3** Nichos Transformativos | R4 (territorio→pregunta) + R5 (aprendizaje experiencial) |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §02 · Ciclo Virtuoso ΩMT. *Capítulo MI-12* §4.3. UDFJC. — síntesis sobre Prahalad & Hamel (1990), UNESCO (2021), Geels (2002), Schot (2018).

## Invariantes operativas DDD

1. E1-E3 **NO se producen** en un proceso específico — emergen del sistema completo.
2. La medición es **institucional**, no departamental.
3. Los 3 outcomes son **inseparables** — sin alguno, ΩMT es incompleto.
4. Cada E tiene **literatura externa de respaldo** (Prahalad / UNESCO / Geels).

## Lenguaje ubicuo asociado

E1 Competencias de Núcleo · E2 Aprendizaje Soberano · E3 Nichos Transformativos · Outcome emergente · Resultado sistémico · Soberanía cognitiva · Nicho transformativo.

## Notas de aplicación

- **Conexión M02 §4.3**: los E1-E3 son los criterios de éxito del modelo ΩMT.
- **Conexión M00 Art. 5g**: E2 (Aprendizaje Soberano) materializa Soberanía Cognitiva refundacional.
- **Conexión M00 Art. 73**: E3 (Nichos Transformativos) opera vía CABAs como dispositivo institucional.
- **Anti-métrica**: NO contar papers para E1, descargas para E2, o número-pilotos-en-PowerPoint para E3.
