---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:plataforma-comunitaria-9-modulos
kd_title: "Plataforma Comunitaria UDFJC · 9 Módulos (especificación M04 §4.3)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Plataforma Comunitaria UDFJC · 9 Módulos"

skos_prefLabel: "Plataforma Comunitaria UDFJC · 9 Módulos (M04 §4.3)"
skos_altLabel: ["Plataforma 9 módulos", "PCU 9", "Plataforma comunitaria UDFJC"]
skos_definition: "Especificación funcional propuesta en M04 §4.3 (Madera Sepúlveda 2026) de una **plataforma comunitaria sostenible** para la UDFJC que opera como infraestructura material de E2 (Aprendizaje Soberano del ciclo virtuoso ΩMT) + soporte de los 6 roles JTBD + dispositivo de mitigación de RT5 (ausencia de sistema de seguimiento) + RT6 (resistencia al cambio). Compuesta por **9 módulos interdependientes**: (M1) Wiki diferenciado por micro-investigación; (M2) Foros por estamento (4 estamentos + sector productivo); (M3) Dashboard heatmap 5R×4Cap (5 Reglas × 4 Capacidades); (M4) Micro-formación dirigida por rol; (M5) Knowledge graph 12 MI (Macro-Iniciativas) + 21 BPA (Buenas Prácticas Académicas); (M6) Propuestas comunitarias deliberativas; (M7) SSO UDFJC (single sign-on institucional); (M8) Gamificación por rol JTBD; (M9) Trazabilidad deliberación-decisión (con auditoría pública). La plataforma debe ser construida con **soberanía cognitiva** (Art. 5g): código abierto, datos propietarios institucionales, hospedaje en infraestructura no-dependiente de plataformas privadas (E2 del ciclo virtuoso ΩMT)."
skos_scopeNote: "La plataforma NO es 'red social institucional' ni reemplazo de SISGRAL. Es infraestructura específica de **participación informada democrática** para la implementación del ACU-004-25. Los 9 módulos son interdependientes — implementar solo algunos genera plataforma incompleta."
skos_example: "Sprint de implementación 2026-2028: M7 SSO + M2 Foros + M4 Micro-formación primero (6 meses); M1 Wiki + M5 Knowledge graph después (12 meses); M3 Dashboard + M6 Propuestas + M9 Trazabilidad por último (otros 12 meses); M8 Gamificación transversal (continuo)."
skos_notation: "Plataforma 9M"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Especificación funcional de plataforma digital comunitaria universitaria"
iso_differentia: "9 módulos interdependientes; soberanía cognitiva como restricción arquitectónica; mitigación de RT5+RT6; soporte E2 ciclo virtuoso ΩMT"
iso_subject_field: "Educational technology / Knowledge management systems / Sovereign infrastructure"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M04 §4.3 — elaboración propia"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M04 §4.3 — elaboración propia"
  neon_alignment_confidence: 0.85

applicable_domain: "Diseño + implementación de infraestructura de participación democrática UDFJC"
assumptions:
  - "Es viable construir plataforma soberana con presupuesto institucional + alianzas"
  - "Los 9 módulos son exhaustivos para participación informada"
breaks_at:
  - "Si se implementa con plataformas privadas dependientes (viola E2)"
  - "Si se implementan solo algunos módulos (interdependencia exige completitud)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-plataforma-materializa-e2
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-resultados-emergentes-e1-e3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La plataforma es la infraestructura material concreta de E2 (Aprendizaje Soberano) — sin plataforma soberana, E2 es retórica."
  - rel_id: rel-plataforma-soporta-roles
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-seis-roles-jtbd-comunidad-udfjc]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Cada uno de los 9 módulos soporta JTBD diferenciados de los 6 roles JTBD (M04): wiki para Investigador Pasteur, foros para Estudiante Soberano + Director, etc."
  - rel_id: rel-plataforma-mitiga-rt5-rt6
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Módulos M3 (Dashboard) y M9 (Trazabilidad) mitigan RT5 (sistema de seguimiento); M8 (Gamificación) y M2 (Foros) mitigan RT6 (resistencia al cambio)."

cited_in: ["[[sec-MI12-04--jtbd-comunidad]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - plataforma-comunitaria
  - propietario-udfjc
  - soberania-cognitiva
  - m04-corpus
  - audit-v2-2
---


# Plataforma Comunitaria UDFJC · 9 Módulos

## Definición operativa

Especificación funcional de plataforma de participación informada democrática:

| # | Módulo | Función |
|:-:|---|---|
| **M1** | Wiki diferenciado | Micro-investigación |
| **M2** | Foros | Por estamento + sector productivo |
| **M3** | Dashboard | Heatmap 5R×4Cap |
| **M4** | Micro-formación | Dirigida por rol |
| **M5** | Knowledge graph | 12 MI + 21 BPA |
| **M6** | Propuestas comunitarias | Deliberativas |
| **M7** | SSO UDFJC | Single sign-on |
| **M8** | Gamificación | Por rol JTBD |
| **M9** | Trazabilidad | Deliberación-decisión + auditoría |

## Restricción arquitectónica · Soberanía Cognitiva

> Código abierto · Datos propietarios institucionales · Hospedaje no-dependiente de plataformas privadas (E2 ciclo virtuoso ΩMT).

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §04 · JTBD de la Comunidad UDFJC. *Capítulo MI-12* §4.3. UDFJC.

## Lenguaje ubicuo asociado

Plataforma 9M · SSO UDFJC · Knowledge graph · Trazabilidad deliberación-decisión.

## Notas de aplicación

- **Conexión M04 §4.3**: especificación funcional concreta.
- **Conexión M00 Art. 5g**: soberanía cognitiva como restricción arquitectónica.
