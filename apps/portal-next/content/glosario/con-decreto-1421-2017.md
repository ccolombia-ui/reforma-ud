---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:decreto-1421-2017
kd_title: "Decreto 1421 de 2017 — reglamenta atención educativa población con discapacidad (mandato UDL/DUA)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Decreto 1421 de 2017"
tupla_descripcion: "Decreto MEN que adopta el Diseño Universal de Aprendizaje (DUA/UDL) como marco obligatorio para todas las instituciones educativas colombianas, incluyendo IES — modifica el Decreto 1075/2015"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Decreto 1421 de 2017 — atención educativa población con discapacidad"
skos_altLabel:
  - "Decreto 1421/2017"
  - "Decreto MEN 1421"
  - "Decreto educación inclusiva 2017"
  - "Mandato DUA Colombia"
skos_definition: "Decreto del Ministerio de Educación Nacional de Colombia, expedido el 29 de agosto de 2017 por la ministra Yaneth Giha, **'por el cual se reglamenta en el marco de la educación inclusiva la atención educativa de la población con discapacidad'**, modificando el Decreto 1075 de 2015 (Decreto Único Reglamentario del Sector Educación). El decreto **incorpora normativamente el Diseño Universal del Aprendizaje (DUA/UDL)** como marco obligatorio para las instituciones educativas colombianas, incluyendo Instituciones de Educación Superior (IES). Define los **ajustes razonables** vinculados al DUA, exige incorporar el enfoque de educación inclusiva y diseño universal en el Proyecto Educativo Institucional (PEI), procesos de autoevaluación y plan de mejoramiento. Para IES específicamente: modifica el Art. 2.5.3.2.2.1 del Decreto 1075/2015 obligando a remitir información sobre cómo se formalizan políticas de inclusión en las condiciones de calidad. Marco complementario: Ley 1618 de 2013 (estatutaria de derechos personas con discapacidad) + Convención ONU sobre Derechos de Personas con Discapacidad."
skos_scopeNote: "ESTE es el acto normativo que convierte UDL/DUA de marco aspiracional voluntario (CAST) a obligación jurídica vinculante para TODAS las instituciones educativas en Colombia. Aplica a IES desde 2017 con implementación progresiva a 5 años (vencido 2022). NO confundir con accesibilidad para discapacidad — UDL es marco universal aplicable a toda población estudiantil."
skos_example: "UDFJC, en cumplimiento del Decreto 1421/2017, debe (i) incorporar UDL en el PEI institucional, (ii) reportar SIMAT estudiantes con discapacidad, (iii) demostrar UDL en condiciones de calidad para registro calificado (Decreto 1330/2019), (iv) elaborar PIAR (Plan Individual de Ajustes Razonables) cuando aplique."
skos_notation: "Decreto 1421/2017"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Decreto reglamentario del Ministerio de Educación Nacional de Colombia"
iso_differentia: "Reglamenta atención educativa población con discapacidad · adopta DUA/UDL como obligatorio · modifica Dec 1075/2015 · aplicable IES"
iso_subject_field: "Derecho educativo colombiano · Educación inclusiva · Marco regulatorio IES"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional, República de Colombia (Decreto 1421 del 29 de agosto de 2017)"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-decreto-1421-2017-men]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-1618-2013]]"
      adopter_locator: "Ley 1618/2013 Art. 11"
      adopter_authority_level: LEGAL
      adopted_at: "2013-02-27"
      adoption_evidence: "Ley 1618/2013 Art. 11 demanda al sector educativo reglamentar educación inclusiva personas con discapacidad — el Decreto 1421/2017 es la reglamentación operativa de esa ley estatutaria"
    - adopter: "[[con-cast-udl-3-0]]"
      adopter_locator: "CAST UDL Guidelines 2.0 (vigente al 2017) → 3.0 (2024)"
      adopter_authority_level: DOCTRINAL
      adopted_at: "2017-08-29"
      adoption_evidence: "Decreto 1421/2017 incorpora explícitamente el DUA (CAST) como marco normativo obligatorio · Art. 'ajustes razonables' lo invoca como referente"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: REGLAMENTARIO

  normative_source: "[[cita-decreto-1421-2017-men]]"
  normative_locator: "Decreto 1421 de 2017 · 11 artículos + transitorios"
  normative_text: "[Texto literal · ver atomics en 0-normatividad/1--normas-nacionales/decreto-men-1421-2017/]"
  normative_authority_level: REGLAMENTARIO
  derogated_by: ""
  derogates: []
  modification_type: "Modifica Decreto 1075 de 2015 (Decreto Único Reglamentario Sector Educación)"
  chain_status: LINEAR
  conflicts_with: []
  conflict_evidence: ""

concepto_definitional_anchors:
  - "[[def-norm-decreto-1421-2017-2017-08-29]]"
concepto_current_anchor: "[[def-norm-decreto-1421-2017-2017-08-29]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-ley-1618-2013]]"
  - "[[con-constitucion-1991-art-69]]"

concepto_diagram_ref: ""
concepto_alignment_table_ref: ""
concepto_qhu_refs: []
concepto_formula_refs: []
concepto_imagen_ref: ""

applicable_domain: "Todas las instituciones educativas colombianas (preescolar a IES); aplicable UDFJC desde 2017 con implementación progresiva 5 años"
assumptions:
  - "El DUA/UDL es operacionalizable en educación superior"
  - "Las IES tienen capacidad institucional para implementar UDL en condiciones de calidad"
breaks_at:
  - "Si se reduce a 'accesibilidad para discapacidad' (es marco universal)"
  - "Si nuevo decreto MEN lo deroga (no documentado al 2026-04-27)"

valid_from: "2017-08-29"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-dec1421-implements-ley1618
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-1618-2013]]"
    rel_frame: normativo
    bc_domain: derecho-educacion-inclusiva
    rel_propiedades:
      norm_evidence: "Decreto 1421/2017 reglamenta el Art. 11 de la Ley 1618/2013 que demanda al sector educativo regular educación inclusiva"
  - rel_id: rel-dec1421-adopts-udl
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-udl-3]]"
    rel_frame: normativo
    bc_domain: educacion-superior
    rel_propiedades:
      norm_evidence: "Decreto 1421/2017 incorpora normativamente el DUA/UDL (CAST) como marco obligatorio · adopción nacional de marco internacional voluntario"
  - rel_id: rel-dec1421-modifies-dec1075
    rel_nombre: norm_amends
    rel_direccion: post
    rel_target: "[[con-decreto-1075-2015]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Decreto 1421/2017 modifica el Art. 2.5.3.2.2.1 del Decreto 1075/2015 (Decreto Único Reglamentario Sector Educación)"
  - rel_id: rel-dec1421-articula-dec1330
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-decreto-1330-2019]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Decreto 1330/2019 (registro calificado IES) incorpora principios de inclusión articulados con UDL del Decreto 1421/2017"
  - rel_id: rel-dec1421-binding-acu
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: derecho-universitario
    rel_propiedades:
      norm_evidence: "ACU-004-25 debe operar dentro del marco del Decreto 1421/2017 — UDL es obligatorio para UDFJC como IES colombiana"

cited_in:
  - "[[sec-MI12-01--mandato-normativo]]"
  - "[[sec-MI12-03--estandares-internacionales]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - decreto-men-1421
  - educacion-inclusiva
  - udl-mandato
  - m01-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# Decreto 1421 de 2017 — atención educativa población con discapacidad

> [!quote]+ ⚖️ Mandato nacional de UDL/DUA para IES colombianas
> El **Decreto 1421/2017** es el acto normativo que convierte UDL/DUA de marco aspiracional voluntario (CAST) a **obligación jurídica vinculante** para todas las instituciones educativas en Colombia, incluyendo UDFJC. Modifica el Decreto 1075/2015 (Decreto Único Reglamentario Sector Educación). Vigente desde **2017-08-29** con implementación progresiva a 5 años. **Es el primer eslabón de la cadena de adopción que vuelve UDL vinculante para UDFJC.**

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Decreto del Ministerio de Educación Nacional de Colombia, expedido el 29 de agosto de 2017 por la ministra Yaneth Giha, **'por el cual se reglamenta en el marco de la educación inclusiva la atención educativa de la población con discapacidad'**, modificando el Decreto 1075 de 2015 (Decreto Único Reglamentario del Sector Educación). El decreto **incorpora normativamente el Diseño Universal del Aprendizaje (DUA/UDL)** como marco obligatorio para las instituciones educativas colombianas, incluyendo

| Sub-tipo | Pasteur | Authority level |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🔻 Pre-requisitos cognitivos


<div class="dv-block" data-dv="prereqs"></div>


## §4 · 🔺 Conceptos que declaran este como pre-requisito cognitivo


<div class="dv-block" data-dv="habilita"></div>


## §6 · 🌳 Evolución longitudinal · provenance


<div class="dv-block" data-dv="evolucion"></div>


## §7 · 🤝 Relaciones semánticas tipadas (outgoing)


<div class="dv-block" data-dv="relations"></div>


## §8 · 🎭 Vista por rol seleccionado


<div class="dv-block" data-dv="vista-por-rol"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | **Concepto creado en PRE-Sprint 1A · cadena de adopción**. T1 NORMATIVO con `concepto_facet_normative.adoption_chain` poblado: el Decreto 1421/2017 es el acto que convierte UDL de voluntario (CAST) a vinculante para IES colombianas (incluyendo UDFJC). Reemplaza la mención narrativa en `con-udl-3.skos_scopeNote` por wikilink tipado. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-decreto-1421-2017` v1.0.0 · TPL T1 NORMATIVO*
