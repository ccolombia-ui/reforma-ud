---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:mipg-funcion-publica
kd_title: "MIPG — Modelo Integrado de Planeación y Gestión (Decreto 1083/2015 + Ley 1753/2015)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "MIPG · Modelo Integrado Planeación y Gestión"
tupla_descripcion: "Marco nacional vinculante para entidades públicas colombianas que articula gestión institucional bajo principios ISO + control interno + ética + atención al ciudadano"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "MIPG · Modelo Integrado de Planeación y Gestión (Función Pública)"
skos_altLabel:
  - "MIPG"
  - "Modelo Integrado Planeación Gestión"
  - "Decreto 1083/2015 MIPG"

skos_definition: "Marco nacional colombiano de gestión institucional **vinculante para entidades públicas** (incluyendo IES públicas como UDFJC), establecido en el **Art. 133 de la Ley 1753 de 2015** (Plan Nacional de Desarrollo 2014-2018) y reglamentado mediante el **Decreto 1083 de 2015** modificado por el Decreto 1499 de 2017. MIPG **articula la gestión institucional** bajo 7 dimensiones operativas (Talento humano, Direccionamiento estratégico, Gestión con valores para resultados, Evaluación de resultados, Información y comunicación, Gestión del conocimiento, Control interno) y 19 políticas. Adopta principios y estructura compatibles con **ISO 9001 (gestión de calidad)**, **ISO 14001 (gestión ambiental)**, **MECI (Modelo Estándar de Control Interno)**, **NTCGP 1000 (norma técnica colombiana de calidad pública)** — convirtiendo estos referentes voluntarios en **vinculantes para entidades públicas** vía adopción legal nacional. Para UDFJC: aplicable como entidad pública del orden distrital con autonomía universitaria; articulado con SIGUD (Resolución Rectoría 207/2016) bajo el principio de coherencia entre marco nacional y sistema institucional."
skos_scopeNote: "MIPG NO es ISO directamente — es un marco nacional que ADOPTA principios ISO y los vuelve vinculantes para entidades públicas colombianas. Para UDFJC, la cadena es: Ley 1753/2015 Art. 133 → Decreto 1083/2015 → MIPG → SIGUD UDFJC (Resolución Rectoría 207/2016) → operación institucional. La autonomía universitaria (Const. Art. 69 + Ley 30/1992) modula la aplicación pero NO la suspende."
skos_example: "Cuando UDFJC reporta a la Función Pública mediante FURAG (Formulario Único Reporte Avances Gestión), lo hace bajo MIPG · esto evidencia adopción nacional de principios ISO 9001 vía marco vinculante público."
skos_notation: "MIPG"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Marco nacional colombiano de gestión institucional pública"
iso_differentia: "Articula 7 dimensiones + 19 políticas · vinculante para entidades públicas · adopta principios ISO + MECI + NTCGP"
iso_subject_field: "Derecho administrativo colombiano · Gestión pública · Función pública"
iso_term_status: preferred
iso_standardized_by: "Departamento Administrativo de la Función Pública, República de Colombia (Decreto 1083/2015 modificado por 1499/2017)"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-decreto-1083-2015-funcion-publica]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-1753-2015-pnd]]"
      adopter_locator: "Ley 1753 de 2015 Art. 133 · Plan Nacional de Desarrollo 2014-2018"
      adopter_authority_level: LEGAL
      adopted_at: "2015-06-09"
      adoption_evidence: "Art. 133 Ley 1753/2015 ordena establecer MIPG · base legal del decreto reglamentario"
    - adopter: "[[con-iso-9001]]"
      adopter_locator: "ISO 9001:2015 · principios y estructura"
      adopter_authority_level: DOCTRINAL
      adopted_at: "2015-09-15"
      adoption_evidence: "MIPG adopta los 7 principios y estructura procesal de ISO 9001 como marco de gestión por resultados"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: REGLAMENTARIO

  normative_source: "[[cita-decreto-1083-2015-funcion-publica]]"
  normative_locator: "Decreto 1083 de 2015 · modificado por Decreto 1499/2017 · Art. 133 Ley 1753/2015"
  normative_text: "[Texto literal · ver atomics en 0-normatividad/1--normas-nacionales/decreto-1083-2015-mipg/]"
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates: []
  modification_type: "Modificado por Decreto 1499 de 2017 (versión vigente al 2026-04-27)"
  chain_status: LINEAR
  conflicts_with: []

concepto_definitional_anchors:
  - "[[def-norm-decreto-1083-2015-2015-05-26]]"
  - "[[def-norm-decreto-1499-2017-2017-09-11]]"
concepto_current_anchor: "[[def-norm-decreto-1499-2017-2017-09-11]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-constitucion-1991-art-69]]"
  - "[[con-ley-30-1992-art-6]]"

applicable_domain: "Todas las entidades públicas colombianas (incluyendo IES públicas con autonomía universitaria modulada); aplicable UDFJC como ente universitario autónomo del orden distrital"
assumptions:
  - "Los principios ISO son operacionalizables como marco normativo nacional"
  - "La autonomía universitaria modula pero no suspende MIPG"
breaks_at:
  - "Si nuevo Plan Nacional de Desarrollo deroga el Art. 133 Ley 1753/2015"
  - "Si la Corte Constitucional declara inexequible la aplicación a IES (no documentado)"

valid_from: "2015-09-15"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-mipg-implements-ley1753
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-1753-2015-pnd]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "MIPG es la reglamentación operativa del Art. 133 Ley 1753/2015 (PND 2014-2018)"
  - rel_id: rel-mipg-adopts-iso9001
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-iso-9001]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "MIPG incorpora principios ISO 9001 al marco nacional vinculante · convergencia entre estándar internacional y normativa pública"
  - rel_id: rel-mipg-articula-sigud
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-resolucion-rectoria-207-2016-sigud]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "SIGUD UDFJC se articula con MIPG nacional por mandato de coherencia entre marco nacional y sistema institucional"

cited_in:
  - "[[sec-MI12-01--mandato-normativo]]"
  - "[[sec-MI12-03--estandares-internacionales]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - mipg
  - funcion-publica
  - gestion-publica
  - m01-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# MIPG · Modelo Integrado de Planeación y Gestión (Función Pública)

> [!quote]+ ⚖️ Marco nacional · adopta principios ISO en sector público
> MIPG (Modelo Integrado de Planeación y Gestión) es el marco nacional vinculante para entidades públicas colombianas que **articula 7 dimensiones operativas y 19 políticas**, **adoptando principios ISO 9001** y volviéndolos vinculantes para el sector público. Base: Art. 133 Ley 1753/2015 + Decreto 1083/2015. Para UDFJC: articulado con SIGUD vía Resolución Rectoría 207/2016.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Marco nacional colombiano de gestión institucional **vinculante para entidades públicas** (incluyendo IES públicas como UDFJC), establecido en el **Art. 133 de la Ley 1753 de 2015** (Plan Nacional de Desarrollo 2014-2018) y reglamentado mediante el **Decreto 1083 de 2015** modificado por el Decreto 1499 de 2017. MIPG **articula la gestión institucional** bajo 7 dimensiones operativas (Talento humano, Direccionamiento estratégico, Gestión con valores para resultados, Evaluación de resultados, Inf

| Sub-tipo | Pasteur | Authority level |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


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
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A (cadena de adopción ISO). Modela MIPG como marco nacional que adopta principios ISO 9001 y los vuelve vinculantes para sector público colombiano. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-mipg-funcion-publica` v1.0.0 · TPL T1 NORMATIVO*
