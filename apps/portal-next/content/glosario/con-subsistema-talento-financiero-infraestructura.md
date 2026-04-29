---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-talento-financiero-infraestructura
kd_title: "Subsistema 2 · Talento Humano, Gestión Financiera e Infraestructura UDFJC (Art. 85 §2 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Subsistema 2 · Talento Humano + Financiera + Infraestructura UDFJC"
tupla_descripcion: "Segundo de los 3 subsistemas del Sistema de Gestión Administrativa UDFJC · garantiza disposición de infraestructura física-tecnológica + recursos financieros + talento humano"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Subsistema 2 · Talento Humano, Gestión Financiera e Infraestructura"
skos_altLabel:
  - "Subsistema Talento + Financiera + Infraestructura"
  - "Subsistema 2 SGA"
  - "Operations Subsystem"

skos_definition: "Segundo de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §2 del ACU-004-25. Su función canónica es **garantizar la disposición de infraestructura física y tecnológica, recursos financieros y talento humano para el óptimo desarrollo de las funciones universitarias**. Operacionalmente liderado por la Gerencia Administrativa y Financiera (Art. 86d). Articula tres macroprocesos críticos: (i) **Talento Humano** (selección, vinculación, desarrollo, evaluación, retiro · personal docente y administrativo); (ii) **Gestión Financiera** (presupuesto, tesorería, contabilidad, costos · NICSP-CGN, CCP-MHCP, Estatuto Tributario); (iii) **Infraestructura** (planta física, sedes, laboratorios, sistemas de información, conectividad). Es el subsistema que **provisiona materialmente** las condiciones operativas para que las funciones misionales (PM1+PM2+PM3) y unidades académicas (Escuelas, Institutos, Centros) operen sin discontinuidad."
skos_scopeNote: "El Subsistema 2 NO es la GAF que lo lidera — es la **función estructural** del SGA que la GAF ejecuta. Garantiza la disponibilidad operativa pero NO ejerce competencias misionales. Articulado upstream con Subsistema 1 (planificación) y downstream con Subsistema 3 (soporte normativo-documental). Sin Subsistema 2, las decisiones del Subsistema 1 quedarían sin materialización operativa."
skos_example: "Cuando una Escuela necesita renovar laboratorio especializado, el Subsistema 2 provisiona en 3 vías: Talento Humano (técnicos + auxiliares) + Financiera (presupuesto + tesorería) + Infraestructura (equipamiento + adecuación física + sistemas de información)."
skos_notation: "S2-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de provisión operacional · 3 macroprocesos integrados (Talento + Financiera + Infraestructura) · liderado por GAF · segundo de 3 subsistemas Art. 85"
iso_subject_field: "Gestión administrativa pública · Gestión financiera · Talento humano universitario · Infraestructura universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §2"

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
      adopter_locator: "ACU-004-25 Art. 85 §2"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara el Subsistema 2 como uno de los 3 subsistemas estructurales del SGA"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "MIPG · Dimensión 1 (Talento Humano) + Dimensión 5 (Gestión Financiera)"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "Subsistema 2 materializa MIPG D1 + D5 en operación UDFJC"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 85 §2"
  normative_text: "Subsistema 2: Talento Humano, Gestión Financiera e Infraestructura · Garantiza la disposición de infraestructura física y tecnológica, recursos financieros y talento humano para el óptimo desarrollo de las funciones universitarias."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "subsistema_talento_financiero_infraestructura"
  ddd_term: "Subsistema 2 · Talento + Financiera + Infraestructura"
  ddd_aggregate_root: "SubsistemaTalentoFinancieroInfraestructura"
  ddd_article_ref: "Art. 85 §2"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gestion-administrativa-udfjc]]"
  ddd_role_in_context: DOMAIN_SERVICE
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_invariants:
    - "El Subsistema 2 debe ser ejecutado por una dependencia institucional explícita (GAF) · no puede operar sin gerencia"
    - "Las 3 funciones canónicas son Talento Humano + Gestión Financiera + Infraestructura · ninguna puede ausentarse"
    - "Los recursos provisionados por S2 deben respetar prioridades planificadas por S1"
    - "Los actos de S2 deben respetar marco normativo público (NICSP, CCP, MIPG, Estatuto Tributario, Ley 80/Contratación)"
    - "Las funciones misionales NO pueden ser suspendidas por fallas operacionales del S2 (invariante de continuidad)"
  ddd_ubiquitous_terms:
    - "Subsistema 2 · S2-SGA"
    - "Talento humano docente y administrativo"
    - "Gestión financiera pública"
    - "Infraestructura física-tecnológica"
    - "NICSP · CCP · MIPG · Ley 80"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-85-s2-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-85-s2-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-gerencia-administrativa-financiera]]"
  - "[[con-mipg-funcion-publica]]"

applicable_domain: "Toda función operacional UDFJC que requiera disposición de talento + recursos financieros + infraestructura"
assumptions:
  - "La integración de los 3 macroprocesos permite continuidad operativa institucional"
breaks_at:
  - "Si los 3 macroprocesos operan en silos sin coordinación interna del Subsistema"
  - "Si las funciones misionales se suspenden por fallas de S2"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-s2-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 2 declarado en Art. 85 §2"
  - rel_id: rel-s2-ejecutado-gaf
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-gerencia-administrativa-financiera]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 86d · GAF es la instancia ejecutiva del Subsistema 2"
  - rel_id: rel-s2-articula-mipg
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 2 materializa MIPG D1+D5 a nivel UDFJC"
  - rel_id: rel-s2-aplica-nicsp
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-nicsp-marco-estado-resultados]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Función Financiera del S2 aplica NICSP obligatorias para sector público colombiano"
  - rel_id: rel-s2-coordina-s1
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-subsistema-gestion-estrategica]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S2 provisiona recursos planificados por S1 · upstream"
  - rel_id: rel-s2-coordina-s3
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-subsistema-gestion-normativa-documental]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S2 ejecuta actos · S3 da soporte jurídico-documental a esos actos"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-09--ds-presupuesto-nicsp]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-2
  - talento-humano
  - gestion-financiera
  - infraestructura
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Subsistema 2 · Talento Humano, Gestión Financiera e Infraestructura

> [!note]+ Subsistema funcional del SGA · ejecutado por GAF
> Segundo de los 3 subsistemas del SGA. Garantiza la **disposición de infraestructura física-tecnológica + recursos financieros + talento humano** para el óptimo desarrollo de las funciones universitarias. Ejecutado por la **GAF** · materializa MIPG D1+D5 en operación UDFJC.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Segundo de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §2 del ACU-004-25. Su función canónica es **garantizar la disposición de infraestructura física y tecnológica, recursos financieros y talento humano para el óptimo desarrollo de las funciones universitarias**. Operacionalmente liderado por la Gerencia Administrativa y Financiera (Art. 86d). Articula tres macroprocesos críticos: (i) **Talento Humano** (selección, vinculación, desa

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · 🤝 Relaciones tipadas (outgoing)


<div class="dv-block" data-dv="relations"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela Subsistema 2 del SGA como función estructural ejecutada por GAF · 3 macroprocesos integrados. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-talento-financiero-infraestructura` v1.0.0 · TPL T1 NORMATIVO*
