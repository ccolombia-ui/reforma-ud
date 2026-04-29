---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:acuerdo-csu-011-2018-pui
kd_title: "Acuerdo CSU 011 de 2018 — Proyecto Universitario Institucional (PUI)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Acuerdo CSU 011/2018 · PUI"
tupla_descripcion: "Acuerdo CSU UDFJC que actualiza y adopta el Proyecto Universitario Institucional (PUI) — declara misión-visión-valores y articula marcos internacionales aspiracionales con la identidad institucional"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Acuerdo CSU 011 de 2018 · Proyecto Universitario Institucional (PUI)"
skos_altLabel:
  - "Acuerdo 011/2018"
  - "PUI UDFJC 2018"
  - "Proyecto Universitario Institucional"

skos_definition: "Acuerdo expedido por el Consejo Superior Universitario UDFJC el **17 de mayo de 2018** mediante el cual **se actualiza y adopta el Proyecto Universitario Institucional (PUI)** de la Universidad Distrital Francisco José de Caldas. El PUI es la declaración formal de **misión, visión, principios y valores institucionales** que da sentido al horizonte estratégico (PED 2018-2030 · Acuerdo CSU 009/2018 mismo día). Vinculante institucionalmente, articula la identidad universitaria con marcos internacionales aspiracionales: democratización del conocimiento, formación integral, investigación, extensión territorial, sostenibilidad. **Actúa como puente conceptual** entre los marcos aspiracionales globales (OECD Learning Compass, UDL, ODS) y la operacionalización institucional (PED + SIGUD + procesos misionales). Tras ACU-004-25 (2025) — que reforma el Estatuto General — el PUI debe re-articularse con la nueva arquitectura misional (3 vicerrectorías + CABAs + frame-3 transformativo + Buen Vivir + Soberanía Cognitiva) — proceso pendiente."
skos_scopeNote: "ESTE es el acto institucional que declara la identidad UDFJC en términos de misión-visión-valores. Es el complemento conceptual del PED (Acuerdo CSU 009/2018 mismo día): el PUI define EL HORIZONTE de identidad, el PED define LA RUTA estratégica. Subordinado al ACU-004-25 (carta constitucional UDFJC) cuando aplica. NO es el Estatuto General (ese rol lo cumple el ACU-004-25 desde 2025), sino el documento de identidad-misión-visión que articula los marcos aspiracionales con la institución."
skos_example: "Cuando UDFJC declara que adopta OECD Learning Compass 2030 como referente aspiracional, lo hace bajo el paraguas de la misión-visión-valores del PUI Acuerdo 011/2018, que invoca formación integral + ciudadanía global + sostenibilidad — articulando coherentemente los marcos internacionales con la identidad institucional."
skos_notation: "ACU-CSU-011/2018"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Acuerdo del Consejo Superior Universitario UDFJC"
iso_differentia: "Adopta PUI · misión-visión-valores institucionales · articulación con marcos internacionales aspiracionales"
iso_subject_field: "Identidad institucional · Política universitaria · Filosofía educativa"
iso_term_status: preferred
iso_standardized_by: "Consejo Superior Universitario, Universidad Distrital Francisco José de Caldas (Acuerdo 011 del 17 de mayo de 2018)"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acuerdo-csu-011-2018-udfjc]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 · estatuto general · prevalece sobre PUI"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "PUI 2018 debe re-articularse bajo ACU-004-25 (estatuto general 2025) — pendiente al 2026-04-27"
    - adopter: "[[con-oecd-learning-compass-2030]]"
      adopter_locator: "OECD Learning Compass 2030 · marco aspiracional"
      adopter_authority_level: DOCTRINAL
      adopted_at: "2018-05-17"
      adoption_evidence: "PUI invoca formación integral + ciudadanía global compatibles con OECD Learning Compass (aspiracional)"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: INSTITUCIONAL

  normative_source: "[[cita-acuerdo-csu-011-2018-udfjc]]"
  normative_locator: "Acuerdo CSU 011 de 2018 · PUI"
  normative_text: "[Texto literal · ver atomics en 0-normatividad/2--normas-institucionales/csu-acu-011-2018/]"
  normative_authority_level: INSTITUCIONAL
  derogated_by: ""
  derogates: []
  modification_type: "Actualiza el PUI previo (1ra versión 2007 · 2da actualización 2018 · 3ra pendiente post-ACU-004-25)"
  chain_status: BRANCHING
  conflicts_with: []
  conflict_evidence: "Tras ACU-004-25 (2025) el PUI debe re-articularse con nueva arquitectura misional · pendiente"

concepto_definitional_anchors:
  - "[[def-norm-acuerdo-csu-011-2018-2018-05-17]]"
concepto_current_anchor: "[[def-norm-acuerdo-csu-011-2018-2018-05-17]]"
concepto_anchor_chain_status: BRANCHING

concepto_prerequisitos:
  - "[[con-acu-004-25]]"

applicable_domain: "Identidad institucional UDFJC · marco filosófico de la planeación estratégica · referente para todos los actos institucionales"
assumptions:
  - "Una declaración formal de misión-visión-valores aporta coherencia a las decisiones institucionales"
  - "El PUI puede actualizarse sin reformar el Estatuto General (operó así en 2007 y 2018)"
breaks_at:
  - "Si nuevo PUI tras ACU-004-25 reemplaza este (en evaluación)"

valid_from: "2018-05-17"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-acu011-implements-acu004
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: gobernanza-udfjc
    rel_propiedades:
      norm_evidence: "PUI debe re-articularse bajo ACU-004-25 estatuto general · pendiente"
  - rel_id: rel-acu011-mandates-ped
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-acuerdo-csu-009-2018-ped]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "PUI define identidad y horizonte → PED operacionaliza · ambos del mismo día CSU 2018-05-17"
  - rel_id: rel-acu011-articula-oecd
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-oecd-learning-compass-2030]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "PUI declara formación integral + ciudadanía global compatibles con OECD Learning Compass — adopción aspiracional implícita en la misión institucional"
  - rel_id: rel-acu011-articula-udl
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-udl-3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "PUI invoca diversidad e inclusión compatibles con UDL — articulado con Decreto 1421/2017"
  - rel_id: rel-acu011-articula-ods
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-ods-agenda-2030]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "PUI invoca sostenibilidad y responsabilidad social · alinea con ODS Agenda 2030"

cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - acuerdo-csu
  - pui
  - identidad-institucional
  - m00-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# Acuerdo CSU 011 de 2018 · Proyecto Universitario Institucional (PUI)

> [!quote]+ 🌟 Proyecto Universitario Institucional · identidad UDFJC
> Acuerdo CSU 011/2018 que actualiza el **PUI** — declaración formal de misión-visión-valores institucionales. Es el puente conceptual entre los marcos aspiracionales globales (OECD 2030 · UDL · ODS) y la operacionalización institucional (PED · SIGUD). **Re-articulación pendiente** post-ACU-004-25 (2025).

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Acuerdo expedido por el Consejo Superior Universitario UDFJC el **17 de mayo de 2018** mediante el cual **se actualiza y adopta el Proyecto Universitario Institucional (PUI)** de la Universidad Distrital Francisco José de Caldas. El PUI es la declaración formal de **misión, visión, principios y valores institucionales** que da sentido al horizonte estratégico (PED 2018-2030 · Acuerdo CSU 009/2018 mismo día). Vinculante institucionalmente, articula la identidad universitaria con marcos internacio

| Sub-tipo | Pasteur | Authority level |
|---|:-:|:-:|
| DEFINITION | PASTEUR | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🔻 Pre-requisitos cognitivos


<div class="dv-block" data-dv="prereqs"></div>


## §4 · 🔺 Conceptos que declaran este como pre-requisito


<div class="dv-block" data-dv="habilita"></div>


## §5 · 📋 Mandatos derivados


<div class="dv-block" data-dv="mandatos"></div>


## §7 · 🤝 Relaciones tipadas (outgoing)


<div class="dv-block" data-dv="mandatos"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A. Modela Acuerdo CSU 011/2018 PUI como puente conceptual entre marcos aspiracionales globales y operacionalización institucional UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-acuerdo-csu-011-2018-pui` v1.0.0 · TPL T1 NORMATIVO*
