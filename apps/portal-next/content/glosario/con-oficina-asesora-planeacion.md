---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-asesora-planeacion
kd_title: "Oficina Asesora de Planeación UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Oficina Asesora de Planeación UDFJC"
tupla_descripcion: "Dependencia asesora adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 — antecedente directo de la Dirección de Gestión Estratégica y de Planeación que la eleva con asiento en CGA"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Oficina Asesora de Planeación (OAP)"
skos_altLabel:
  - "OAP UDFJC"
  - "Planning Advisory Office"

skos_definition: "Dependencia asesora adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 entre las dependencias rectorales (junto con Secretaría General, Oficina de Control Interno y Oficina de Comunicaciones). Su función es **asesorar técnicamente a la Rectoría en planeación institucional**: producción de Plan de Acción Anual, monitoreo de indicadores, articulación con MIPG nacional, soporte técnico al PED 2018-2030. **Coexiste en transición** con la Dirección de Gestión Estratégica y de Planeación (Art. 86c) que el ACU-004-25 crea como dependencia elevada con asiento en CGA. Durante el Período de Transición (Art. 96 · 4 años), la OAP migra progresivamente hacia DGEP, manteniendo continuidad operativa de funciones de planeación. Antecedente histórico: existió bajo régimen ACU 003/1997 como Oficina Asesora · ACU-004-25 la mantiene transitoriamente y la eleva estructuralmente a Dirección."
skos_scopeNote: "El ACU-004-25 declara DOS instancias de planeación que pueden generar confusión: (a) Oficina Asesora de Planeación (Art. 33) como dependencia rectoral asesora histórica, (b) Dirección de Gestión Estratégica y de Planeación (Art. 86c) como dependencia elevada con asiento en CGA. La Oficina opera como asesoría rectoral; la Dirección opera como instancia ejecutiva del Subsistema 1 con representación colegiada. Durante la transición, sus funciones convergen progresivamente bajo la Dirección."
skos_example: "Cuando la Rectoría requiere insumos técnicos para planeación inmediata (e.g., presentación al CSU), la Oficina Asesora de Planeación opera como asesoría rectoral · cuando la decisión planificada cruza el CGA, la Dirección de Gestión Estratégica y de Planeación lo conduce."
skos_notation: "OAP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia asesora adscrita a la Rectoría universitaria"
iso_differentia: "Función asesora histórica · antecedente directo de DGEP · coexiste en transición con dependencia elevada · adscrita directamente a Rectoría"
iso_subject_field: "Planeación universitaria · Asesoría rectoral · Gestión pública"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33"

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
      adopter_locator: "ACU-004-25 Art. 33 (dependencias de la Rectoría)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 mantiene la OAP como dependencia rectoral asesora · transición progresiva hacia DGEP"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 33"
  normative_text: "Dependencias de la Rectoría: Secretaría General, Oficina de Planeación, Oficina de Control Interno, Oficina de Comunicaciones, y las demás que determine el CSU."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: "Coexistencia transitoria con DGEP (Art. 86c) · transición progresiva durante Período Transición Art. 96"
  chain_status: BRANCHING
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "oficina_asesora_planeacion"
  ddd_term: "Oficina Asesora de Planeación"
  ddd_aggregate_root: "OficinaAsesoraPlaneacion"
  ddd_article_ref: "Art. 33"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gestion-administrativa-udfjc]]"
  ddd_role_in_context: ENTITY
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-rectoria]]"
  ddd_invariants:
    - "OAP es dependencia ASESORA · sin competencia ejecutiva propia"
    - "OAP se adscribe directamente a la Rectoría · no al CGA"
    - "Durante el Período de Transición, OAP coordina funciones con la DGEP en proceso de elevación"
    - "Reportes técnicos producidos por OAP sirven a la Rectoría para decisiones inmediatas"
  ddd_ubiquitous_terms:
    - "OAP · Oficina Asesora de Planeación"
    - "Asesoría rectoral"
    - "Insumos técnicos de planeación"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-33-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-33-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"

applicable_domain: "Planeación institucional UDFJC en régimen transitorio · función asesora rectoral"
assumptions:
  - "OAP migra progresivamente sus funciones a DGEP durante el Período de Transición"
breaks_at:
  - "Si OAP y DGEP duplican funciones sin transición clara"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-oap-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "OAP declarada en Art. 33 del ACU-004-25 como dependencia rectoral asesora"
  - rel_id: rel-oap-adscrita-rectoria
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rectoria]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 33 · OAP adscrita directamente a la Rectoría"
  - rel_id: rel-oap-transicion-dgep
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-direccion-gestion-estrategica-planeacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OAP coexiste con DGEP en transición · funciones convergen progresivamente bajo la Dirección elevada"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oficina-asesora-planeacion
  - oap
  - art-33
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Oficina Asesora de Planeación (OAP)

> [!note]+ Dependencia asesora rectoral · transición a DGEP
> La **OAP** es la dependencia asesora rectoral de planeación declarada en el Art. 33 del ACU-004-25. Coexiste en transición con la **DGEP** (Art. 86c) que la eleva con asiento en CGA. Durante el Período de Transición, sus funciones convergen progresivamente bajo la Dirección elevada.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Dependencia asesora adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 entre las dependencias rectorales (junto con Secretaría General, Oficina de Control Interno y Oficina de Comunicaciones). Su función es **asesorar técnicamente a la Rectoría en planeación institucional**: producción de Plan de Acción Anual, monitoreo de indicadores, articulación con MIPG nacional, soporte técnico al PED 2018-2030. **Coexiste en transición** con la Dirección de Gestión Estratégica y de Planeac

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · 🤝 Relaciones tipadas


<div class="dv-block" data-dv="obsidian-only"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OAP como dependencia asesora rectoral · antecedente directo de DGEP en transición. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-asesora-planeacion` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
