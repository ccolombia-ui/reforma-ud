---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:retroalimentaciones-r1-r6
kd_title: "6 Retroalimentaciones R1-R6 del Ciclo Virtuoso ΩMT (bucles bidireccionales PM1-PM2-PM3)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "6 Retroalimentaciones R1-R6 del Ciclo Virtuoso ΩMT"

skos_prefLabel: "Retroalimentaciones R1-R6 del Ciclo Virtuoso ΩMT"
skos_altLabel: ["R1-R6", "Seis retroalimentaciones misionales", "Bucles bidireccionales PM1-PM2-PM3", "Six feedback loops"]
skos_definition: "Conjunto de seis bucles bidireccionales propuestos en M02 §4.2 (Madera Sepúlveda 2026) que conectan los procesos misionales PM1-PM2-PM3 entre sí, formando el ciclo virtuoso ΩMT cuando operan simultáneamente. Las 6 retroalimentaciones son: **R1 Semilleros** (PM1→PM2) — estudiantes UROP creditizados; **R2 Currículo Vivo** (PM2→PM1) — hallazgos de investigación incorporados al aula desde CRIS institucional; **R3 Transferencia** (PM2→PM3) — TTO, spin-offs, contratos territoriales; **R4 Problemas Reales** (PM3→PM2) — territorio surfacea preguntas Cuadrante Pasteur; **R5 Aprendizaje Experiencial** (PM3→PM1) — co-op creditizado, PBL territorial; **R6 Egresados Agentes** (PM1→PM3) — red viva al territorio. Cada R tiene 3 estados verificables (🟢 Activa, 🟡 Parcial, 🔴 Rota) con métricas AS-IS/TO-BE específicas. La condición de **ciclo virtuoso completo** exige las 6 R en estado 🟢 simultáneamente — romper cualquiera degrada el sistema (cf. Eq-MI12-02 condición de ciclo virtuoso)."
skos_scopeNote: "ATENCIÓN nomenclatura crítica — R1-R6 (bucles ciclo virtuoso ΩMT, este concepto) ≠ R-1..R-5 (cinco vías Clark, con guion) ≠ RT1-RT6 (riesgos de transición M01) ≠ M01-M12 (papers cap-MI12) ≠ I0-I4 (iniciativas estratégicas) ≠ PIIOM-M1..M5 (misiones nacionales). 6 sistemas distintos con letras similares — protocolo: SIEMPRE usar prefijo identificador."
skos_example: "Una Escuela UDFJC en condición Sub-N1 típicamente tiene: R1 🔴 (semilleros sin crédito <5%), R2 🟡 (currículo actualizado cada 5-7 años), R3 🔴 ($0 COP en TTO), R4 🔴 (sin mecanismo formal), R5 🔴 (co-op no creditizado), R6 🔴 (red de egresados inactiva). Salto a N4 vía CABAs: las 6 R deben pasar a 🟢 simultáneamente."
skos_notation: "R1-R6"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de bucles de retroalimentación bidireccional entre procesos misionales"
iso_differentia: "6 bucles específicos PM1↔PM2↔PM3↔PM1 con métricas AS-IS/TO-BE; condición de ciclo virtuoso exige las 6 simultáneas; nomenclatura R1-R6 distinta de R-1..R-5 Clark y RT1-RT6 riesgos"
iso_subject_field: "Diseño organizacional universitario / Cibernética institucional / Gestión de transiciones"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M02 §4.2 — elaboración propia derivada de Clark (1998), Etzkowitz (2003), Geels (2002), Beer (1979)"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "retroalimentaciones_r1_r6"
  ddd_aggregate_root: "CicloVirtuosoOMT"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: "Conjunto de Value Objects que conectan los Aggregates PM1-PM2-PM3 entre sí. Cada R es un VO inmutable con: estado (🟢/🟡/🔴), métrica AS-IS, métrica TO-BE, mecanismo de activación, indicador de medición."
  ddd_invariants:
    - "Las 6 R existen como bucles bidireccionales — cada flecha tiene su par direccional"
    - "Cada R tiene exactamente 3 estados posibles: 🟢 Activa, 🟡 Parcial, 🔴 Rota"
    - "Condición de ciclo virtuoso: las 6 R en 🟢 simultáneamente (cf. Eq-MI12-02)"
    - "Romper cualquier R degrada el sistema completo (no hay R 'menos importante')"
    - "Cada R tiene métricas AS-IS y TO-BE verificables"
  ddd_ubiquitous_terms:
    - "R1 Semilleros · R2 Currículo Vivo · R3 Transferencia"
    - "R4 Problemas Reales · R5 Aprendizaje Experiencial · R6 Egresados Agentes"
    - "Bucle bidireccional"
    - "Estado 🟢 / 🟡 / 🔴"
    - "Ciclo virtuoso completo"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M02 §4.2 — síntesis sobre Clark 1998 + Etzkowitz 2003 + Beer 1979 + Geels 2002"
  neon_alignment_confidence: 0.85

applicable_domain: "Diagnóstico institucional UDFJC + diseño curricular Escuelas + monitoreo transición Sub-N1 → N4"
assumptions:
  - "Las 6 R son exhaustivas para capturar la conectividad PM1-PM2-PM3 (sin retroalimentaciones omitidas)"
  - "Los estados 🟢/🟡/🔴 son operacionalizables con datos SICIUD/CRIS"
breaks_at:
  - "Si se aplica como métrica de output departamental (las R son sistémicas, no por unidad)"
  - "Si se mide cualitativamente sin métricas AS-IS/TO-BE explícitas"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-r1r6-conecta-pm
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-procesos-misionales-pm1-pm2-pm3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 6 R son los bucles bidireccionales que conectan PM1-PM2-PM3 entre sí; sin R1-R6 los 3 procesos operan en silos (anti-patrón)."
  - rel_id: rel-r1r6-materializa-omt
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-omt]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las R1-R6 son la materialización operativa del ciclo virtuoso ΩMT — sin las 6 retroalimentaciones simultáneas, ΩMT es retórica vacía."
  - rel_id: rel-r1r6-activadas-por-caba
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs (Art. 73 ACU-004-25) son los dispositivos institucionales que activan las 6 R simultáneamente — son el vehículo del salto cuántico Sub-N1 → N4."
  - rel_id: rel-r1r6-creditizada-cca
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cca]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los Paquetes CCA (M06 BMK-002) creditizan las R1-R6 como una sola unidad indivisible: V1 Comprensiva (R2 + R6) ∧ V2 Experimental (R1 + R4) ∧ V3 Transformativa (R3 + R5)."
  - rel_id: rel-r1r6-mitiga-rt5
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El monitoreo de R1-R6 con métricas AS-IS/TO-BE es la mitigación primaria de RT5 (Ausencia de sistema de seguimiento). Sin medición continua, las 6 R degeneran a retórica."
  - rel_id: rel-r1r6-implica-clark
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-cinco-vias-clark]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 6 R y las 5 vías Clark son marcos complementarios: R1-R6 describen QUÉ conexiones activar entre PM; R-1..R-5 Clark describen CÓMO transformar institucionalmente. Distintas dimensiones de la misma transición."
  # — v1.1.0 cross-references M03 (Fase B audit refactor) ——————————
  - rel_id: rel-r1-referente-urop
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-mit-urop]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "MIT UROP es el referente paradigmático de R1 (Semilleros: PM1→PM2) — la AS-IS UDFJC <5% creditizado debe migrar a TO-BE ≥70% emulando el modelo UROP."
  - rel_id: rel-r1-fundamento-boyer
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-boyer-healey-research-teaching]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "R1 (Semilleros) depende conceptualmente de la modalidad 'research-based' de Boyer-Healey. Sin ese marco, no hay justificación epistémica para creditizar investigación de pregrado."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - retroalimentaciones-r1-r6
  - ciclo-virtuoso
  - propietario-udfjc
  - m02-corpus
  - audit-v2-2
---


# Las 6 Retroalimentaciones R1-R6 del Ciclo Virtuoso ΩMT

## Definición operativa

Seis **bucles bidireccionales** entre PM1-PM2-PM3 cuya activación simultánea produce el ciclo virtuoso ΩMT.

| # | Retroalimentación | Dirección | AS-IS UDFJC típica | TO-BE objetivo |
|:-:|---|:-:|---|---|
| **R1** | Semilleros · UROP creditizados | PM1→PM2 | <5% creditizado 🔴 | ≥70% creditizado 🟢 |
| **R2** | Currículo Vivo · CRIS al aula | PM2→PM1 | 5-7 años actualización 🔴 | Semestral 🟢 |
| **R3** | Transferencia · TTO + spin-offs | PM2→PM3 | $0 COP TTO 🔴 | >3 disclosures/año 🟢 |
| **R4** | Problemas Reales · territorio→pregunta | PM3→PM2 | Sin mecanismo 🔴 | >10 proyectos CABA/año 🟢 |
| **R5** | Aprendizaje Experiencial · co-op + PBL | PM3→PM1 | ≈0% creditizado 🔴 | 40%+ co-op pre-grado 🟢 |
| **R6** | Egresados Agentes · red viva al territorio | PM1→PM3 | Red inactiva 🔴 | >20 localidades PIIOM 🟢 |

> [!warning] Condición de ciclo virtuoso (Eq-MI12-02)
> Una Escuela alcanza estado **N4 (ciclo virtuoso completo)** ⟺ las 6 R están en estado 🟢 simultáneamente. Romper cualquiera degrada el sistema. NO existe jerarquía entre R — todas pesan igual.

## Distinción nomenclatura crítica

| Sistema | Cardinalidad | Significado |
|---|:-:|---|
| **R1-R6** | 6 | Retroalimentaciones bucles ciclo virtuoso (ESTE concepto) |
| **R-1..R-5** | 5 | Cinco vías Clark transformación universidad emprendedora |
| **RT1-RT6** | 6 | Riesgos de transición reforma (M01) |
| **M01-M12** | 12 | Papers cap-MI12 |
| **I0-I4** | 5 | Iniciativas estratégicas internas |
| **PIIOM-M1..M5** | 5 | Misiones nacionales MinCiencias |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §02 · Ciclo Virtuoso ΩMT. *Capítulo MI-12* §4.2. UDFJC. — síntesis derivada de Clark (1998), Etzkowitz (2003), Beer (1979), Geels (2002).

## Invariantes operativas DDD

1. Las 6 R existen como **bucles bidireccionales** — cada flecha tiene su par direccional.
2. Cada R tiene exactamente **3 estados**: 🟢 Activa · 🟡 Parcial · 🔴 Rota.
3. **Condición de ciclo virtuoso**: las 6 R en 🟢 simultáneamente.
4. Romper cualquier R **degrada el sistema completo**.
5. Cada R tiene **métricas AS-IS y TO-BE** verificables.

## Lenguaje ubicuo asociado

R1 Semilleros · R2 Currículo Vivo · R3 Transferencia · R4 Problemas Reales · R5 Aprendizaje Experiencial · R6 Egresados Agentes · Bucle bidireccional · Ciclo virtuoso completo · Estado 🟢/🟡/🔴.

## Notas de aplicación

- **Conexión M02 §4.2**: las 6 R son el corazón operativo del modelo ΩMT.
- **Activador**: las CABAs (Art. 73) son el dispositivo que activa las 6 R simultáneamente.
- **Creditizador**: los Paquetes CCA (M06 BMK-002) certifican R1-R6 como unidad triádica V1∧V2∧V3.
- **Mitigación RT5**: el monitoreo de R1-R6 con métricas concretas es la mitigación primaria del riesgo de "ausencia de sistema de seguimiento".
