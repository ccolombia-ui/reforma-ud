---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:iso-9001
kd_title: "ISO 9001:2015 — Sistema de Gestión de Calidad (QMS · Annex SL)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "ISO 9001:2015"
tupla_descripcion: "Norma ISO base de Sistema de Gestión de Calidad (QMS) — voluntaria en su origen pero adoptada por UDFJC vía SIGUD (Resolución Rectoría 207/2016)"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "ISO 9001:2015 — Sistema de Gestión de Calidad (Quality Management System)"
skos_altLabel:
  - "ISO 9001"
  - "QMS ISO"
  - "Sistema Gestión Calidad ISO"
  - "ISO 9001:2015"

skos_definition: "Norma internacional ISO publicada en septiembre de 2015 (revisión vigente al 2026) que **especifica los requisitos para un Sistema de Gestión de Calidad (Quality Management System — QMS)** que una organización puede implementar para demostrar su capacidad de proveer consistentemente productos y servicios que satisfacen requisitos del cliente y reglamentarios. Estructurada bajo el marco común **Annex SL** de las normas ISO de sistema de gestión: 10 cláusulas (1-3 introductorias, 4-10 requisitos): (4) contexto de la organización, (5) liderazgo, (6) planificación, (7) soporte, (8) operación, (9) evaluación de desempeño, (10) mejora. Sus 7 principios son: enfoque al cliente, liderazgo, compromiso del personal, enfoque a procesos, mejora, toma de decisiones basada en evidencia, gestión de relaciones. Es la **norma base** de la familia ISO 9000 y precursora estructural de ISO 21001 (educación) e ISO 14001 (ambiental). Aplicada al contexto UDFJC: ISO 9001 es referente voluntario en su origen pero **adoptada institucionalmente vía Resolución de Rectoría 207/2016** que conforma SIGUD bajo sus principios."
skos_scopeNote: "ISO 9001 NO es 'norma legal' en Colombia — es norma técnica voluntaria. Su adopción institucional UDFJC ocurre vía SIGUD (Res. Rectoría 207/2016), articulado con MIPG nacional (Decreto 1083/2015). UDFJC NO está certificada externamente por ICONTEC en ISO 9001 (al 2026-04-27) pero opera bajo sus principios. NO confundir con CNA (acreditación institucional MEN) ni con ISO 21001 (específica educación)."
skos_example: "Cuando un proceso UDFJC (e.g. PM1 Formación) se documenta en SIGUD, la estructura sigue ISO 9001 Annex SL: definir contexto + partes interesadas (Cl. 4) + liderazgo + política de calidad (Cl. 5) + planificación con objetivos medibles (Cl. 6) + recursos + comunicación (Cl. 7) + ejecución del proceso (Cl. 8) + indicadores + auditoría interna (Cl. 9) + acciones correctivas y oportunidades de mejora (Cl. 10)."
skos_notation: "ISO 9001:2015"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Norma ISO de sistema de gestión de calidad"
iso_differentia: "QMS genérico aplicable a todo tipo de organización · 7 principios · estructura Annex SL 10 cláusulas · base de la familia ISO 9000"
iso_subject_field: "Quality management · ISO standards · Management systems"
iso_term_status: preferred
iso_standardized_by: "ISO (2015). *ISO 9001:2015 — Quality management systems — Requirements*. International Organization for Standardization."

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - NEON

concepto_facet_normative:
  origin_type: INTERNATIONAL_VOLUNTARY
  origin_source: "[[cita-iso-9001-2015]]"
  origin_force: VOLUNTARY
  adoption_chain:
    - adopter: "[[con-resolucion-rectoria-207-2016-sigud]]"
      adopter_locator: "Resolución 207/2016 · SIGUD · Modelo Operativo por Procesos"
      adopter_authority_level: INSTITUCIONAL
      adopted_at: "2016-04-29"
      adoption_evidence: "SIGUD adopta los 7 principios y la estructura procesal Annex SL de ISO 9001:2015 como marco operativo interno (sin certificación externa)"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "Decreto 1083/2015 · Ley 1753/2015 Art. 133"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "MIPG nacional incorpora principios ISO 9001 en su Modelo Integrado de Planeación y Gestión vinculante para entidades públicas"
  effective_force_in_udfjc: BINDING_BY_ADOPTION
  effective_authority_level: INSTITUCIONAL

  normative_source: "[[cita-resolucion-rectoria-207-2016-udfjc]]"
  normative_locator: "Resolución Rectoría 207/2016 · adopción institucional"
  normative_text: "[Adopción institucional vía SIGUD; texto canónico de ISO 9001:2015 en standard ISO]"
  normative_authority_level: INSTITUCIONAL
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_neon:
  neon_imports:
    - "[[con-pdca-shewhart-deming]]"
  neon_aligns_with:
    - "[[con-iso-21001]]"
    - "[[con-mipg-funcion-publica]]"
  neon_scenario_origin: "S3"
  neon_in_scheme: "frame-gestion-calidad"

concepto_definitional_anchors:
  - "[[def-norm-iso-9001-2015-2015-09-15]]"
concepto_current_anchor: "[[def-norm-iso-9001-2015-2015-09-15]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-pdca-shewhart-deming]]"

applicable_domain: "Toda organización que busque sistematizar gestión de calidad; aplicable UDFJC vía SIGUD desde 2016"
assumptions:
  - "Los 7 principios son universales y aplicables a cualquier organización"
  - "El enfoque a procesos es operacionalizable en universidades públicas"
breaks_at:
  - "Si nueva versión ISO 9001 supersede 2015 (en monitoreo continuo)"
  - "Si UDFJC opta por adoptar exclusivamente ISO 21001 sin ISO 9001"

valid_from: "2015-09-15"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-iso9001-base-iso21001
    rel_nombre: skos_broader
    rel_direccion: pre
    rel_target: "[[con-iso-21001]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ISO 9001 es la norma base genérica de la cual ISO 21001 (educación) deriva especializaciones sectoriales bajo la misma estructura Annex SL"
  - rel_id: rel-iso9001-adopted-sigud
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-resolucion-rectoria-207-2016-sigud]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "ISO 9001 se vuelve vinculante para UDFJC vía adopción institucional por Resolución de Rectoría 207/2016 que conforma SIGUD"
  - rel_id: rel-iso9001-articula-mipg
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "MIPG nacional incorpora principios ISO 9001 en su Modelo Integrado · convergencia entre estándar internacional y marco nacional"

cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - iso-9001
  - qms
  - gestion-calidad
  - m03-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# ISO 9001:2015 — Sistema de Gestión de Calidad (Quality Management System)

> [!quote]+ 📋 Norma base de gestión de calidad
> ISO 9001:2015 es la norma ISO base para Sistemas de Gestión de Calidad (QMS) — **voluntaria en su origen** pero **adoptada institucionalmente** por UDFJC vía SIGUD (Resolución de Rectoría 207/2016). Bajo estructura Annex SL (10 cláusulas) y 7 principios (cliente · liderazgo · personal · procesos · mejora · evidencia · relaciones). Norma base de la cual deriva ISO 21001 (educación).

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Norma internacional ISO publicada en septiembre de 2015 (revisión vigente al 2026) que **especifica los requisitos para un Sistema de Gestión de Calidad (Quality Management System — QMS)** que una organización puede implementar para demostrar su capacidad de proveer consistentemente productos y servicios que satisfacen requisitos del cliente y reglamentarios. Estructurada bajo el marco común **Annex SL** de las normas ISO de sistema de gestión: 10 cláusulas (1-3 introductorias, 4-10 requisitos):

| Sub-tipo | Pasteur | Authority level |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · 🔻 Pre-requisitos cognitivos


<div class="dv-block" data-dv="prereqs"></div>


## §4 · 🔺 Conceptos que declaran este como pre-requisito


<div class="dv-block" data-dv="habilita"></div>


## §7 · 🤝 Relaciones tipadas (outgoing)


<div class="dv-block" data-dv="relations"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A (cadena de adopción ISO). Modela ISO 9001:2015 como norma base voluntaria adoptada vía SIGUD para UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-iso-9001` v1.0.0 · TPL T1 NORMATIVO*
