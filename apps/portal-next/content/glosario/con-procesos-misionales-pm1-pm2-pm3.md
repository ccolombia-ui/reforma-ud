---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:procesos-misionales-pm1-pm2-pm3
kd_title: "Procesos Misionales PM1-PM2-PM3 (operacionalización del Art. 7 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Procesos Misionales PM1-PM2-PM3"

skos_prefLabel: "Procesos Misionales PM1 (Formación) · PM2 (Investigación) · PM3 (Extensión)"
skos_altLabel: ["PM1-PM2-PM3", "Procesos Misionales UDFJC", "Tres procesos misionales", "Triada misional UDFJC"]
skos_definition: "Triada estructural de procesos misionales mandatada por el Art. 7 del ACU-004-25 que articula la operación misional de la UDFJC en tres pilares interdependientes: **PM1 Formación** (Vicerrectoría Académica) — desarrollo de capacidades y competencias en estudiantes vía currículo, pedagogía y aprendizaje; **PM2 Investigación-Creación-Innovación** (Vicerrectoría de Investigación, Creación e Innovación) — generación de conocimiento, evidencia, prototipos y nichos transformativos; **PM3 Extensión-Contextos** (Vicerrectoría de Contextos y Extensión) — articulación con territorio, sector productivo, comunidades y ambiente. Los tres procesos son **simétricos en jerarquía** (no hay PM 'principal' y PM 'auxiliares') y **complementarios funcionalmente** — su interacción retroalimentada (R1-R6) bajo orientación de ΩMT produce los tres resultados emergentes (E1 Competencias de Núcleo, E2 Aprendizaje Soberano, E3 Nichos Transformativos). PM1-PM2-PM3 son la operacionalización organizacional concreta de las funciones misionales del Art. 7 dentro de la nueva arquitectura de tres vicerrectorías."
skos_scopeNote: "PM1-PM2-PM3 NO son sinónimos directos de 'Formación-Investigación-Extensión' tradicionales — implican coexistencia obligatoria con retroalimentaciones bidireccionales (R1-R6) y orientación por ΩMT. La diferencia con la triada Mode 1 humboldtiana es esencial: aquí los tres procesos son co-productores de conocimiento, no jerarquía descendente desde Investigación. NO se debe agregar un 'PM4 Innovación' porque la innovación es propiedad emergente de los tres (anti-patrón de departamentalización)."
skos_example: "Una Escuela UDFJC en estado N4 articula PM1 (currículo con CCAs creditizables), PM2 (CABAs investigando problemas Pasteur del territorio) y PM3 (egresados como agentes en JACs y empresas) simultáneamente — los tres procesos comparten estudiantes, docentes, infraestructura y agenda misional, sin que ninguno sea 'el principal'."
skos_notation: "PM1-PM2-PM3"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Triada estructural de procesos misionales universitarios mandatada por norma interna"
iso_differentia: "Tres pilares simétricos (Formación + Investigación-Creación-Innovación + Extensión-Contextos); retroalimentaciones bidireccionales R1-R6; orientados por ΩMT; mandatados por Art. 7 ACU-004-25"
iso_subject_field: "Gobernanza universitaria / Diseño organizacional IES públicas / Reforma curricular"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 7 + nomenclatura M02 Madera Sepúlveda 2026"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 7 + Arts. 61-63"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza triada PM1-PM2-PM3 en 3 vicerrectorías separadas y simétricas · invariante anti-departamentalización"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 7 + Arts. 61-63"
  normative_text: "[Texto literal Art. 7 funciones misionales + Arts. 61-63 vicerrectorías]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "procesos_misionales"
  ddd_aggregate_root: "ProcesosMisionales"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Arquitectura Misional. Encapsula PM1, PM2, PM3 como Entities con identidad propia + retroalimentaciones R1-R6 como Value Objects que conectan los procesos. Las Vicerrectorías son los Aggregate Coordinators."
  ddd_invariants:
    - "Toda función misional UDFJC debe asignarse a UNO Y SOLO UNO de PM1, PM2 o PM3 (sin solapamiento de propiedad)"
    - "Los 3 procesos son simétricos en jerarquía institucional (no hay PM 'principal')"
    - "Las retroalimentaciones R1-R6 conectan los 3 procesos bidireccionalmente"
    - "NO se puede agregar PM4 (la innovación es propiedad emergente, no proceso)"
    - "PM1, PM2, PM3 son orientados por ΩMT como meta-telos compartido"
  ddd_ubiquitous_terms:
    - "PM1 · PM2 · PM3"
    - "Procesos misionales"
    - "Tres vicerrectorías"
    - "Triada misional"
    - "Funciones misionales"
    - "Retroalimentaciones R1-R6"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-7-pm-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-7-pm-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-funciones-misionales]]"
  - "[[con-vicerrectoria-formacion]]"
  - "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
  - "[[con-vicerrectoria-contextos-extension]]"

applicable_domain: "Diseño organizacional UDFJC + asignación de funciones a vicerrectorías + arquitectura curricular Escuelas/Institutos/Centros"
assumptions:
  - "La distribución tripartita captura la totalidad de funciones misionales (sin necesidad de 4to proceso)"
  - "Los 3 procesos pueden retroalimentarse efectivamente con mecanismos institucionales adecuados"
breaks_at:
  - "Si se agrega un 4to proceso paralelo (anti-patrón de departamentalización)"
  - "Si los procesos operan en silos sin retroalimentación R1-R6"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-disenador


tupla__relations:
  - rel_id: rel-pm-defined-by-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Art. 7 ACU-004-25 establece las 3 funciones misionales; Arts. 61-63 las institucionalizan en 3 vicerrectorías separadas y simétricas."
  - rel_id: rel-pm-equivale-funciones
    rel_nombre: skos_closeMatch
    rel_direccion: co
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "PM1-PM2-PM3 (M02 nomenclatura) ≅ Funciones Misionales (M00 nomenclatura). Mismo referente conceptual con dos etiquetados distintos según contexto del paper."
  - rel_id: rel-pm-orientado-por-omt
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-omt]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ΩMT (System 5 VSM) orienta a PM1-PM2-PM3 (Systems 1-3 VSM) sin ser un cuarto proceso. ΩMT es meta-telos, no nivel operativo."
  - rel_id: rel-pm-conectados-r1r6
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 6 retroalimentaciones R1-R6 son los bucles bidireccionales que conectan PM1-PM2-PM3 entre sí; sin R1-R6 los 3 procesos operan en silos."
  - rel_id: rel-pm-implementa-piiom
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-cinco-misiones-piiom]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Cada función misional debe trazarse a las 5 misiones PIIOM nacionales (Art. 6 Ley 30 + CONPES 4069); PM2 (Investigación) tiene la articulación más directa, pero PM1 y PM3 también deben mapearse."
  - rel_id: rel-pm-articulan-cca
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-cca]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los Paquetes CCA (M06 BMK-002) son la operacionalización curricular concreta que articula PM1∧PM2∧PM3 en una sola unidad indivisible (V1 Comprensiva ∧ V2 Experimental ∧ V3 Transformativa)."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 5

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - procesos-misionales
  - pm1-pm2-pm3
  - art-7
  - arquitectura-misional
  - m02-corpus
  - audit-v2-2
  - tpl-v2
---


# Procesos Misionales PM1-PM2-PM3

## Definición operativa

Triada estructural de procesos misionales mandatada por **Art. 7 del ACU-004-25**, simétrica en jerarquía y complementaria funcionalmente:

| # | Proceso | Vicerrectoría | Pregunta rectora | Output |
|:-:|---|---|---|---|
| **PM1** | Formación | Académica (Art. 61) | ¿Qué capacidades desarrolla? | Egresados competentes + currículo vivo |
| **PM2** | Investigación-Creación-Innovación | Inv. Creación e Innovación (Art. 62) | ¿Qué conocimiento genera? | Evidencia + prototipos + nichos |
| **PM3** | Extensión-Contextos | Contextos y Extensión (Art. 63) | ¿Cómo articula con el territorio? | Agencia territorial + sector productivo |

> [!important] Simetría sin jerarquía
> PM1, PM2 y PM3 son **simétricos en jerarquía institucional** y **complementarios funcionalmente**. NO existe PM 'principal' y PM 'auxiliares'. La innovación NO es PM4 — es propiedad emergente de los 3 (cf. ΩMT).

## Fuente primaria

> Art. 7 ACU-004-25 (funciones misionales); Arts. 61-63 ACU-004-25 (vicerrectorías de Formación, Investigación-Creación-Innovación, Contextos-Extensión).

## Invariantes operativas DDD

1. Toda función misional UDFJC se asigna a **UNO Y SOLO UNO** de PM1, PM2 o PM3 (sin solapamiento).
2. Los 3 procesos son **simétricos en jerarquía** (no hay PM 'principal').
3. Las **6 retroalimentaciones R1-R6** conectan los 3 procesos bidireccionalmente.
4. **NO se puede agregar PM4** — la innovación es propiedad emergente, no proceso paralelo.
5. PM1-PM2-PM3 son **orientados por ΩMT** como meta-telos compartido.

## Lenguaje ubicuo asociado

PM1 · PM2 · PM3 · Procesos misionales · Tres vicerrectorías · Triada misional · Funciones misionales · Retroalimentaciones R1-R6.

## Notas de aplicación

- **Equivalencia con M00**: PM1-PM2-PM3 (M02) ≅ Funciones Misionales (M00 Art. 7). Misma referencia, etiquetado distinto.
- **Conexión M02 §2.1**: la triada no es Mode 1 jerárquica sino Mode 3 retroalimentada.
- **Conexión M06 BMK-002**: los Paquetes CCA (V1∧V2∧V3) operacionalizan PM1∧PM2∧PM3 a nivel curricular.
- **Riesgo histórico**: la tentación de añadir 'Vicerrectoría de Innovación' viola la triada — ΩMT NO es PM4.
