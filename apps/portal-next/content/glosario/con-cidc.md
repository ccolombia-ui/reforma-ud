---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cidc
kd_title: "CIDC — Centro de Investigaciones y Desarrollo Científico UDFJC"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "CIDC UDFJC"

skos_prefLabel: "CIDC — Centro de Investigaciones y Desarrollo Científico"
skos_altLabel: ["Centro de Investigaciones UDFJC", "CIDC"]
skos_definition: "Dependencia institucional UDFJC actual responsable de gestionar la actividad investigativa: Banco de Proyectos UDFJC, convocatorias internas, soporte a grupos COL en Minciencias, articulación con el SNCTI. Bajo el ACU-004-25 reformado, sus funciones se redistribuyen progresivamente entre la Vicerrectoría de Investigación-Creación e Innovación (coordinación de Institutos) y los Institutos mismos (operación investigativa). Durante el Período de Transición coexiste con la nueva estructura. Es el actor institucional que debe verificar la matriz de trazabilidad PIIOM (DT-MI12-01-02) — qué proyectos vigentes UDFJC están alineados con las 5 misiones nacionales."
skos_scopeNote: "El CIDC es estructura previa al ACU-004-25. Su transformación durante 2025-2029 hacia la nueva arquitectura (VRICI + Institutos + CABAs investigativas) es parte del Plan de Implementación. Hasta esa transformación, sigue siendo el punto de contacto operativo para la actividad investigativa UDFJC."
skos_example: "El CIDC gestiona el Banco de Proyectos UDFJC, las convocatorias internas anuales, la actualización de CvLAC docentes y GrupLAC institucional, y la articulación con convocatorias MinCiencias."
skos_notation: "CIDC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia institucional universitaria de gestión investigativa"
iso_differentia: "Estructura UDFJC pre-ACU-004-25 en transición hacia nueva arquitectura VRICI + Institutos"
iso_subject_field: "Estructura administrativa UDFJC / Gestión investigativa universitaria"
iso_term_status: preferred
iso_standardized_by: "UDFJC — estructura administrativa pre-ACU-004-25"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acuerdos-cidc-udfjc-pre-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 régimen transitorio · CIDC coexiste con VRICI durante 2025-2029"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 NO deroga el CIDC explícitamente · sus funciones se redistribuyen progresivamente a VRICI + Institutos durante el Período de Transición Art. 96"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: INSTITUCIONAL
  normative_source: "[[cita-acuerdos-cidc-udfjc-pre-2025]]"
  normative_locator: "Acuerdos previos UDFJC sobre estructura administrativa · transición a VRICI ACU-004-25"
  normative_text: "[Estructura UDFJC pre-ACU-004-25 · CIDC en transición durante 2025-2029]"
  normative_authority_level: INSTITUCIONAL
  derogated_by: ""
  derogates: []
  modification_type: "Transición progresiva hacia VRICI + Institutos durante Período de Transición Art. 96"
  chain_status: BRANCHING
  conflicts_with: []

concepto_definitional_anchors:
  - "[[def-norm-cidc-udfjc-pre-2025]]"
concepto_current_anchor: "[[def-norm-cidc-udfjc-pre-2025]]"
concepto_anchor_chain_status: BRANCHING

concepto_prerequisitos:
  - "[[con-vicerrectoria-investigacion-creacion-innovacion]]"

applicable_domain: "UDFJC durante Período de Transición 2025-2029"
assumptions: ["El CIDC continúa operando hasta consolidación de Institutos VRICI"]
breaks_at: ["Cuando los Institutos asuman plenamente las funciones investigativas (2027-2029)"]

valid_from: ""
valid_to: ""
rol_seleccionado: docente-investigador-pasteur


tupla__relations:
  - rel_id: rel-cidc-related-vrici
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Funciones CIDC se redistribuyen progresivamente a VRICI + Institutos durante transición"

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - cidc
  - gestion-investigativa
  - transitorio
  - m01-corpus
  - audit-v2-2
  - tpl-v2
---


# CIDC — Centro de Investigaciones y Desarrollo Científico UDFJC

## Definición operativa

Dependencia institucional UDFJC actual responsable de gestionar la **actividad investigativa**: Banco de Proyectos, convocatorias internas, soporte a grupos COL Minciencias, articulación SNCTI. Bajo ACU-004-25 reformado, sus funciones se redistribuyen progresivamente a [[con-vicerrectoria-investigacion-creacion-innovacion|VRICI]] + Institutos.

## Funciones actuales (transición)

| Función | Detalle |
|---|---|
| Banco de Proyectos | Repositorio investigativo institucional |
| Convocatorias internas | Anuales, articuladas con PND |
| GrupLAC + CvLAC | Actualización institucional |
| SNCTI | Articulación con convocatorias MinCiencias |

## Lenguaje ubicuo asociado

CIDC · Banco de Proyectos UDFJC · GrupLAC · CvLAC · Investigación institucional.

## Notas de aplicación

- **Estado transitorio**: ACTIVE durante 2025-2029; sus funciones migrarán a VRICI + Institutos.
- **Conexión M01 DT-01-02**: el CIDC + VRICI son responsables de la matriz de trazabilidad PIIOM (qué proyectos vigentes están alineados con 5 misiones).
