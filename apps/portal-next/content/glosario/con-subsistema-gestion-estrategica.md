---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-gestion-estrategica
kd_title: "Subsistema 1 · Gestión Estratégica y de Planeación UDFJC (Art. 85 §1 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Subsistema 1 · Gestión Estratégica y de Planeación UDFJC"
tupla_descripcion: "Primero de los 3 subsistemas del Sistema de Gestión Administrativa UDFJC · define líneas de acción institucional, optimización de recursos, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Subsistema 1 · Gestión Estratégica y de Planeación"
skos_altLabel:
  - "Subsistema Gestión Estratégica"
  - "Subsistema 1 SGA"
  - "Strategic Management Subsystem"

skos_definition: "Primero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 del ACU-004-25. Su función canónica es **definir las líneas de acción institucional para la optimización de recursos, eficacia de los planes, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad**. Operacionalmente liderado por la Dirección de Gestión Estratégica y de Planeación (Art. 86c). Articula horizonte estratégico (PED 2018-2030 · ACU CSU 009/2018) con planes operativos anuales · indicadores institucionales · reporte FURAG-MIPG · aseguramiento de calidad ISO 21001/9001 vía SIGUD. Es el subsistema que materializa la **función de planeación pública** que MIPG nacional exige a las entidades del Estado (Decreto 1083/2015 + Ley 1753/2015 Art. 133)."
skos_scopeNote: "El Subsistema 1 NO es la Dirección que lo lidera (DGEP) — es la **función estructural** del Sistema de Gestión Administrativa que la DGEP ejecuta. La distinción es importante: el subsistema vive como invariante institucional (función), la DGEP es la dependencia que lo opera (entidad). Sin el Subsistema 1, los Subsistemas 2 (Talento+Financiera+Infra) y 3 (Normativa+Documental) operarían sin dirección estratégica."
skos_example: "El Plan de Implementación de la Reforma (Art. 98 · vencido 2025-06-19), el Plan de Acción Anual UDFJC, los reportes FURAG anuales y el monitoreo de indicadores institucionales son productos del Subsistema 1 ejecutados por la DGEP."
skos_notation: "S1-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de planeación estratégica + evaluación + mejoramiento continuo + aseguramiento de calidad · liderado por DGEP · primero de 3 subsistemas Art. 85"
iso_subject_field: "Planeación estratégica universitaria pública · Aseguramiento de la calidad · MIPG"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §1"

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
      adopter_locator: "ACU-004-25 Art. 85 §1 (subsistema 1)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara el Subsistema 1 como uno de los 3 subsistemas estructurales del Sistema de Gestión Administrativa"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "MIPG · Dimensión 2 Direccionamiento Estratégico y Planeación"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "El Subsistema 1 materializa la Dimensión 2 de MIPG en la operación UDFJC"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 85 §1"
  normative_text: "Subsistema 1: Gestión Estratégica y de Planeación · Define líneas de acción institucional para la optimización de recursos, eficacia de los planes, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "subsistema_gestion_estrategica"
  ddd_term: "Subsistema 1 · Gestión Estratégica y de Planeación"
  ddd_aggregate_root: "SubsistemaGestionEstrategica"
  ddd_article_ref: "Art. 85 §1"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gestion-administrativa-udfjc]]"
  ddd_role_in_context: DOMAIN_SERVICE
  ddd_aggregate_root_flag: false
  ddd_domain_type: Core
  ddd_invariants:
    - "El Subsistema 1 debe ser ejecutado por una dependencia institucional explícita (DGEP) · no puede operar sin dirección"
    - "Las 5 funciones canónicas del Subsistema 1 son: (i) líneas de acción, (ii) optimización de recursos, (iii) evaluación de procesos, (iv) mejoramiento continuo, (v) aseguramiento de calidad"
    - "El Subsistema 1 articula el horizonte estratégico (PED) con planes operativos anuales"
    - "Los indicadores institucionales son responsabilidad estructural del Subsistema 1"
    - "El reporte FURAG-MIPG anual es producto obligatorio del Subsistema 1"
  ddd_ubiquitous_terms:
    - "Subsistema 1 · S1-SGA"
    - "Líneas de acción institucional"
    - "Optimización de recursos"
    - "Evaluación continua de procesos"
    - "Mejoramiento continuo"
    - "Aseguramiento de la calidad"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-85-s1-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-85-s1-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-direccion-gestion-estrategica-planeacion]]"
  - "[[con-mipg-funcion-publica]]"

applicable_domain: "Toda función de planeación estratégica + evaluación + mejoramiento continuo + aseguramiento de calidad UDFJC"
assumptions:
  - "La separación funcional Subsistema 1 vs DGEP permite trazabilidad institucional clara"
breaks_at:
  - "Si las 5 funciones canónicas se distribuyen sin coordinación entre dependencias"
  - "Si DGEP no puede operar el subsistema por falta de capacidad técnica"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-s1-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 1 declarado en Art. 85 §1 del ACU-004-25"
  - rel_id: rel-s1-ejecutado-dgep
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-direccion-gestion-estrategica-planeacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 86c · DGEP es la instancia ejecutiva del Subsistema 1"
  - rel_id: rel-s1-articula-mipg
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 1 materializa MIPG D2 (Direccionamiento Estratégico y Planeación) a nivel UDFJC"
  - rel_id: rel-s1-coordina-s2
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-subsistema-talento-financiero-infraestructura]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S1 planifica · S2 provisiona los recursos planificados"
  - rel_id: rel-s1-coordina-s3
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-subsistema-gestion-normativa-documental]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S1 planifica · S3 da soporte jurídico-documental a planes y actos"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-1
  - gestion-estrategica
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Subsistema 1 · Gestión Estratégica y de Planeación

> [!note]+ Subsistema funcional del SGA · ejecutado por DGEP
> Primero de los 3 subsistemas del Sistema de Gestión Administrativa. Define líneas de acción institucional, optimización de recursos, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad. Ejecutado por la **DGEP** · materializa MIPG D2 en operación UDFJC.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Primero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 del ACU-004-25. Su función canónica es **definir las líneas de acción institucional para la optimización de recursos, eficacia de los planes, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad**. Operacionalmente liderado por la Dirección de Gestión Estratégica y de Planeación (Art. 86c). Articula horizonte estratégico (PED 2018-2030 · ACU CSU 00

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · 🤝 Relaciones tipadas (outgoing)


<div class="dv-block" data-dv="relations"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela el Subsistema 1 del SGA como función estructural ejecutada por DGEP. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-gestion-estrategica` v1.0.0 · TPL T1 NORMATIVO*
