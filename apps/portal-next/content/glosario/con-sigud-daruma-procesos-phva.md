---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:sigud-daruma-procesos-phva
kd_title: "SIGUD + DARUMA · Sistemas operacionales UDFJC (45 procedimientos PHVA)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "SIGUD + DARUMA · Sistemas operacionales UDFJC"

skos_prefLabel: "SIGUD + DARUMA · Sistemas operacionales UDFJC con 45 procedimientos PHVA"
skos_altLabel: ["SIGUD", "DARUMA", "Sistemas operacionales UDFJC"]
skos_definition: "Conjunto de **dos sistemas de información operacionales** existentes en UDFJC que documentan procesos institucionales con metodología PHVA (Planificar-Hacer-Verificar-Actuar) y son insumos clave para TDABC Lite (M10): (i) **SIGUD** — Sistema de Información de Gestión de la Universidad Distrital, plataforma institucional que centraliza información académica, financiera, de personal, contratación, presupuesto. Es la fuente de datos de horas-docencia, costo-personal, asignación de planta. (ii) **DARUMA** — Sistema de Documentación y Repositorio Universitario que publica los **45 procedimientos PHVA institucionales** documentados (procedimientos académicos, administrativos, de bienestar, de extensión). Cada procedimiento PHVA tiene flujo definido + responsables + recursos. Aplicado al M10: SIGUD provee datos cuantitativos de capacidad (horas, costos); DARUMA provee la estructura de procesos (qué actividad sigue qué actividad). Juntos permiten implementar TDABC Lite en 2-3 semanas sin requerir BPMN nuevo."
skos_scopeNote: "SIGUD + DARUMA son sistemas EXISTENTES UDFJC pre-reforma — el M10 aprovecha lo que YA existe. NO son sistemas nuevos por construir. Su debilidad es fragmentación (no son BPMN integral) — pero son suficientes para TDABC Lite. La migración a TDABC Completa exigiría BPMN consolidado en horizonte mayor."
skos_example: "Cálculo CCR docente plana usando SIGUD + DARUMA: SIGUD provee salario base + prestaciones + aportes + carga lectiva; DARUMA provee procedimiento PHVA-DOC-001 (preparación clase) con horas estimadas. Combinación: CCR = 95M COP/año / 1.760 horas práctica = ~$54K/h."
skos_notation: "SIGUD + DARUMA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistemas de información operacionales universitarios públicos"
iso_differentia: "SIGUD (datos cuantitativos académicos-financieros) + DARUMA (procedimientos PHVA documentados); 45 procedimientos PHVA; insumo TDABC Lite"
iso_subject_field: "Higher education information systems / Process management / UDFJC institutional"
iso_term_status: preferred
iso_standardized_by: "Universidad Distrital Francisco José de Caldas — sistemas institucionales SIGUD + DARUMA"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "UDFJC sistemas institucionales existentes"
  neon_alignment_confidence: 0.95

applicable_domain: "Implementación TDABC Lite UDFJC + cálculo CCR + monitoreo procesos misionales"
assumptions:
  - "Los datos SIGUD son confiables y actualizados"
  - "Los 45 procedimientos PHVA cubren mayoría de actividades académicas"
breaks_at:
  - "Si se asume que SIGUD + DARUMA son BPMN integral (no lo son)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-sigud-alimenta-tdabc
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-tdabc-lite-12-time-equations]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "SIGUD + DARUMA son los insumos empíricos del TDABC Lite — sin estos sistemas, la implementación 'Lite' no sería viable en 2-3 semanas."

cited_in: ["[[sec-MI12-10--tdabc]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t6-datos-sistemas
  - sigud
  - daruma
  - sistema-interno-udfjc
  - m10-corpus
  - audit-v2-2
---


# SIGUD + DARUMA · Sistemas operacionales UDFJC

## Definición operativa

| Sistema | Función |
|---|---|
| **SIGUD** | Sistema de Información Gestión UD · datos académicos + financieros + personal |
| **DARUMA** | Repositorio · 45 procedimientos PHVA documentados |

## Fuente primaria

> Universidad Distrital Francisco José de Caldas — sistemas institucionales.

## Lenguaje ubicuo asociado

SIGUD · DARUMA · 45 procedimientos PHVA · Sistemas operacionales UDFJC.

## Notas de aplicación

- **Conexión M10**: insumos empíricos del TDABC Lite.
- **NO confundir** con BPMN integral (son fragmentarios pero suficientes para Lite).
