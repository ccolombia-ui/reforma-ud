---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:omt
kd_title: "ΩMT — Omega-Meta-Telos: meta-propósito institucional UDFJC"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Omega-Meta-Telos (ΩMT)"

skos_prefLabel: "Omega-Meta-Telos (ΩMT)"
skos_altLabel: ["ΩMT", "Meta-propósito institucional", "Omega Meta Telos", "Telos universitario integrado"]
skos_definition: "Constructo conceptual propietario UDFJC (Madera Sepúlveda, 2026) que designa el meta-propósito institucional integrado que orienta todos los procesos misionales de la universidad reformada. Es análogo al **System 5** del Modelo de Sistemas Viables de Stafford Beer (1979) — la función auto-referencial de identidad y propósito que cohesiona el resto del sistema. Bajo MCU 2020 (autonomía positiva), una universidad responsable requiere un meta-propósito explícito que articule formación-investigación-extensión hacia transformación social. Para UDFJC el ΩMT integra los principios del Art. 5 ACU-004-25 (Buen Vivir, Soberanía Cognitiva, Defensa de lo Público, etc.) en una orientación operativa única."
skos_scopeNote: "El ΩMT NO es un objetivo estratégico ni una visión del Plan de Desarrollo. Es categoría meta-institucional: el horizonte ético-político que da coherencia direccional a todos los demás propósitos. Análogo al System 5 de Beer 1979 que distingue entre operaciones (Sistema 1), coordinación (Sistema 2), gestión integrada (Sistema 3), inteligencia (Sistema 4), e identidad-propósito (Sistema 5). El ΩMT es identidad operativa; sin él, una universidad puede tener excelentes Sistemas 1-4 pero ser incoherente direccionalmente."
skos_example: "El ΩMT de la UDFJC reformada combina: (a) Buen Vivir como horizonte ético; (b) Soberanía Cognitiva como base epistémica; (c) Defensa de lo Público como compromiso político; (d) 5 Misiones PIIOM como direccionalidad operativa. Este meta-propósito orienta la articulación de PM1-PM2-PM3 vía Escuelas-CABAs-Institutos-Centros."
skos_notation: "ΩMT"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Constructo meta-institucional de identidad-propósito universitario"
iso_differentia: "Análogo a System 5 VSM Beer 1979 aplicado a universidad emprendedora-transformativa post-MCU 2020"
iso_subject_field: "Filosofía institucional universitaria / Cibernética organizacional / Reforma UDFJC"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) — elaboración propia con base en Beer (1979) VSM + MCU (2020)"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[beer1979heart]] (System 5 VSM) + [[mcu2020]] (autonomía positiva) + ACU-004-25 Art. 5 (10 principios)"
  neon_alignment_confidence: 0.85
  neon_methodological_notes: "Fusión NeOn S5 de cibernética organizacional (Beer VSM) + responsabilidad universitaria contemporánea (MCU 2020) + principios constitutivos UDFJC (ACU-004-25). Constructo propietario."

applicable_domain: "Diseño de Plan de Desarrollo UDFJC reformado + criterio de coherencia direccional para PM1-PM2-PM3"
assumptions:
  - "Una universidad sin meta-propósito explícito carece de coherencia direccional"
breaks_at: ["Si se confunde con visión estratégica o con objetivos del Plan de Desarrollo"]

valid_from: "2026-04-26"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-omt-derived-from-vsm
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-vsm-system-5]]"
    rel_frame: skos
  - rel_id: rel-omt-derived-from-mcu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-mcu-2020]]"
    rel_frame: skos
  # — v1.2.0 cross-references M02 (Fase B audit refactor) ——————————
  - rel_id: rel-omt-materializa-r1r6
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 6 retroalimentaciones R1-R6 son la materialización operativa del ciclo virtuoso ΩMT — sin las 6 simultáneas, ΩMT es retórica vacía."
  - rel_id: rel-omt-produce-e1e3
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-resultados-emergentes-e1-e3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los 3 resultados emergentes E1-E3 son los outcomes que emergen del ciclo virtuoso ΩMT cuando las 6 R están en 🟢 simultáneas."
  - rel_id: rel-omt-orienta-pm
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-procesos-misionales-pm1-pm2-pm3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ΩMT (System 5 VSM) orienta a PM1-PM2-PM3 (Systems 1-3 VSM) sin ser un cuarto proceso. Es meta-telos, no nivel operativo."
  - rel_id: rel-omt-rechaza-anti-patron
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-anti-patron-departamentalizacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ΩMT es la alternativa correcta al anti-patrón de departamentalización: meta-telos transversal vs. unidad operativa separada."

cited_in: ["[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - omt
  - meta-proposito
  - beer-vsm
  - mcu-2020
  - m01-corpus
  - audit-v2-2
---


# Omega-Meta-Telos (ΩMT)

## Definición operativa

Constructo conceptual propietario UDFJC (Madera Sepúlveda, 2026) que designa el **meta-propósito institucional integrado** que orienta todos los procesos misionales de la universidad reformada. Análogo al **System 5** del VSM de Stafford Beer (1979) — la función auto-referencial de identidad-propósito que cohesiona el resto del sistema.

## Composición del ΩMT UDFJC

| Componente | Contribución al ΩMT |
|---|---|
| [[con-buen-vivir\|Buen Vivir]] (Art. 5a) | Horizonte ético |
| [[con-soberania-cognitiva\|Soberanía Cognitiva]] (Art. 5g) | Base epistémica |
| Defensa de lo Público (Art. 5a) | Compromiso político |
| 5 Misiones PIIOM | Direccionalidad operativa |

## Lenguaje ubicuo asociado

ΩMT · Omega-Meta-Telos · Meta-propósito · System 5 VSM · Identidad institucional · Coherencia direccional.

## Notas de aplicación

- **NO es** visión estratégica del Plan de Desarrollo.
- **Es** categoría meta-institucional: el horizonte ético-político que da coherencia direccional a todos los demás propósitos.
- **Conexión M01-M02**: M01 introduce ΩMT como horizonte de la responsabilidad institucional; M02 lo desarrolla como motor del ciclo virtuoso.
