---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-egresados
kd_title: "Oficina de Egresados UDFJC (Art. 82 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Oficina de Egresados UDFJC"
tupla_descripcion: "Dependencia institucional UDFJC adscrita a la Vicerrectoría de Contextos · gestiona, propone y desarrolla el Sistema de Egresados (Art. 82)"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Oficina de Egresados"
skos_altLabel: ["OE", "Alumni Office"]

skos_definition: "Dependencia institucional UDFJC declarada en el **Art. 82 del ACU-004-25** encargada de **gestionar, proponer y desarrollar el Sistema de Egresados**. Adscrita a la Vicerrectoría de Contextos · Extensión y Proyección Social (PM3). Articula relación con egresados como cuarto estamento de la Comunidad Universitaria (Arts. 8-17): mantiene base de egresados activa + canaliza retroalimentación curricular + facilita movilidad egresados-territorio + soporta articulación de egresados en órganos de gobierno (CSU Art. 22h, CACAD Art. 31h, Asamblea Universitaria Art. 45-48). Conexión crítica con datasets MEN: SNIES (registro graduados) + OLE (Observatorio Laboral · trayectorias salariales)."
skos_scopeNote: "La Oficina de Egresados NO es independiente — está adscrita a Vicerrectoría de Contextos. Sus servicios alimentan los indicadores institucionales que DGEP reporta y son insumos críticos para el Sistema de Aseguramiento de Calidad (Decreto 1330/2019 condiciones de calidad). Articulada con CIDC para investigaciones sobre trayectorias de egresados."
skos_example: "Cuando UDFJC reporta a OLE-MEN trayectorias salariales de egresados o consolida indicadores institucionales para registro calificado de programas, la Oficina de Egresados es la dependencia que gestiona los datos primarios."
skos_notation: "OE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia institucional universitaria de relación con egresados"
iso_differentia: "Adscrita a Vicerrectoría de Contextos · gestiona Sistema de Egresados · articula representación egresados en órganos de gobierno"
iso_subject_field: "Gestión de egresados universitarios · Proyección social · Trayectorias laborales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 82"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 82"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Oficina de Egresados como dependencia del Sistema de Egresados"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 82"
  normative_text: "La oficina de egresados está encargada de gestionar, proponer y desarrollar el Sistema de Egresados. Adscrita a la Vicerrectoría de Contextos-Extensión y Proyección Social."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "oficina_egresados"
  ddd_term: "Oficina de Egresados"
  ddd_aggregate_root: "OficinaEgresados"
  ddd_article_ref: "Art. 82"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-extension-territorial-udfjc]]"
  ddd_role_in_context: ENTITY
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-vicerrectoria-contextos-extension]]"
  ddd_invariants:
    - "Oficina de Egresados adscrita a Vicerrectoría de Contextos (Art. 82)"
    - "Gestiona Sistema de Egresados · articula representación de egresados en órganos de gobierno"
    - "Mantiene base de egresados activa para reportes MEN (OLE, SNIES)"
    - "Articula con CIDC para investigaciones sobre trayectorias de egresados"
  ddd_ubiquitous_terms:
    - "Oficina de Egresados · OE"
    - "Sistema de Egresados"
    - "OLE · SNIES · trayectorias laborales"
    - "Cuarto estamento Comunidad Universitaria"

concepto_definitional_anchors: ["[[def-norm-acu-004-25-art-82-2025-05-05]]"]
concepto_current_anchor: "[[def-norm-acu-004-25-art-82-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-vicerrectoria-contextos-extension]]"
  - "[[con-comunidad-universitaria]]"

applicable_domain: "Gestión de egresados UDFJC desde 2025-05-06 · articulación con datasets MEN"
assumptions: ["La articulación egresados-territorio es operacionalizable institucionalmente"]
breaks_at: ["Si la base de egresados queda desactualizada (incumple reportes MEN)"]

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-emprendedor-coop


tupla__relations:
  - rel_id: rel-oe-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Oficina de Egresados declarada Art. 82 del ACU-004-25"
  - rel_id: rel-oe-adscrita-vce
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-contextos-extension]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 82 · OE adscrita a Vicerrectoría de Contextos-Extensión"
  - rel_id: rel-oe-articula-ole
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-ole-observatorio-laboral]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OE alimenta datos a OLE-MEN sobre trayectorias laborales"
  - rel_id: rel-oe-articula-snies
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-snies-dataset-men]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "OE consolida datos para reportes SNIES sobre graduados"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, t1-normativo, oficina-egresados, art-82, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# Oficina de Egresados

> [!note]+ Dependencia adscrita a Vicerrectoría de Contextos
> La **OE** gestiona el Sistema de Egresados · articula representación en órganos de gobierno + datos para OLE/SNIES.

## §0 · 🎭 Vista por rol

<span class="dv-block" data-dv="selector-rol"></span>

## §1 · Definición

> Dependencia institucional UDFJC declarada en el **Art. 82 del ACU-004-25** encargada de **gestionar, proponer y desarrollar el Sistema de Egresados**. Adscrita a la Vicerrectoría de Contextos · Extensión y Proyección Social (PM3). Articula relación con egresados como cuarto estamento de la Comunidad Universitaria (Arts. 8-17): mantiene base de egresados activa + canaliza retroalimentación curricular + facilita movilidad egresados-territorio + soporta articulación de egresados en órganos de gobie

## §2 · Anclaje


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · DDD


<div class="dv-block" data-dv="obsidian-only"></div>


## §7 · Relaciones


<div class="dv-block" data-dv="obsidian-only"></div>


## §10 · Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo G. OE como dependencia adscrita a Vicerrectoría de Contextos · articulación con datasets MEN. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-egresados` v1.0.0*
