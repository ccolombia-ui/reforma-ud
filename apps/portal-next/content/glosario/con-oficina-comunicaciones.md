---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-comunicaciones
kd_title: "Oficina de Comunicaciones UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Oficina de Comunicaciones UDFJC"
tupla_descripcion: "Dependencia adscrita a la Rectoría UDFJC responsable de la comunicación institucional interna y externa · materializa Ley 1712/2014 Transparencia + MIPG D5"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Oficina de Comunicaciones"
skos_altLabel:
  - "OComUD"
  - "Communications Office UDFJC"
  - "Oficina Asesora de Comunicaciones"

skos_definition: "Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable de la **comunicación institucional interna y externa**: comunicación organizacional (entre estamentos), comunicación pública (con sociedad y stakeholders externos), comunicación digital (web institucional, redes sociales, intranet), gestión de medios institucionales (Editorial UD, Emisora UD, sistemas digitales), atención a periodistas y eventos institucionales. Materializa el cumplimiento de la **Ley 1712 de 2014** (Transparencia y Derecho de Acceso a la Información Pública Nacional) que obliga a entidades públicas a publicar información mínima en sitio web institucional, y de la **Dimensión 5 del MIPG** (Información y Comunicación · gestión integral)."
skos_scopeNote: "OComUD NO es Editorial UD ni Emisora UD (medios institucionales con autonomía editorial relativa) — es la dependencia que **coordina** la política comunicacional institucional integrada. Su rol es transversal: apoya a Rectoría, vicerrectorías, Asamblea Universitaria, Consejos · NO compite con la comunicación académica de Escuelas/Facultades sino la articula institucionalmente."
skos_example: "Cuando UDFJC emite comunicación oficial (e.g., expedición de Acuerdo CSU, posicionamiento ante medios, convocatoria pública, evento institucional), la OComUD coordina la política comunicacional articulando todos los canales (web, redes, medios institucionales, prensa)."
skos_notation: "OComUD"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia rectoral de comunicación institucional pública"
iso_differentia: "Coordina comunicación interna + externa + digital + medios institucionales · materializa Ley 1712/2014 + MIPG D5"
iso_subject_field: "Comunicación organizacional pública · Transparencia · Comunicación universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33 + Ley 1712/2014 + Decreto 1083/2015 D5"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-1712-2014]]"
      adopter_locator: "Ley 1712/2014 · Transparencia y Acceso a la Información Pública"
      adopter_authority_level: LEGAL
      adopted_at: "2014-03-06"
      adoption_evidence: "Ley 1712/2014 obliga a entidades públicas a publicar información mínima en sitio web · OComUD materializa este mandato"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "MIPG · Dimensión 5 (Información y Comunicación)"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "MIPG D5 establece marco nacional de Información y Comunicación · OComUD lo materializa en UDFJC"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 33 (dependencias rectorales)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 mantiene OComUD como dependencia rectoral en marco normativo nacional"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: LEGAL

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 33 + Ley 1712/2014 + MIPG D5"
  normative_text: "Dependencias de la Rectoría: ... Oficina de Comunicaciones, y las demás que determine el CSU."
  normative_authority_level: LEGAL
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "oficina_comunicaciones"
  ddd_term: "Oficina de Comunicaciones"
  ddd_aggregate_root: "OficinaComunicaciones"
  ddd_article_ref: "Art. 33"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-comunicacion-institucional-udfjc]]"
  ddd_role_in_context: ENTITY
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_governed_by:
    - "[[con-rectoria]]"
  ddd_invariants:
    - "OComUD coordina pero no controla la comunicación académica de Escuelas/Facultades · respeta autonomía académica"
    - "Cumplimiento de Ley 1712/2014 (publicación información mínima en web) es obligatorio · auditable por OCI + Procuraduría"
    - "OComUD coordina con OAP/DGEP para presentar avance institucional · con OCI para reportar transparencia"
    - "Editorial UD y Emisora UD son medios con autonomía editorial relativa · OComUD los articula sin censurarlos"
  ddd_ubiquitous_terms:
    - "OComUD"
    - "Comunicación interna · externa · digital"
    - "Editorial UD · Emisora UD"
    - "Ley 1712/2014 · MIPG D5"
    - "Transparencia institucional"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-33-comunicaciones-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-33-comunicaciones-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-mipg-funcion-publica]]"

applicable_domain: "Toda comunicación institucional UDFJC interna y externa desde 2025-05-06"
assumptions:
  - "La política comunicacional puede coordinarse sin invadir autonomía editorial de medios institucionales"
breaks_at:
  - "Si OComUD interfiere con la autonomía editorial de Editorial/Emisora"
  - "Si la información obligatoria de Ley 1712/2014 no se publica oportunamente en web"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-ocom-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "OComUD declarada en Art. 33 del ACU-004-25"
  - rel_id: rel-ocom-implementa-ley1712
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-1712-2014]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Ley 1712/2014 obliga a publicar información pública mínima · OComUD materializa el mandato"
  - rel_id: rel-ocom-articula-mipg-d5
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "OComUD materializa MIPG D5 (Información y Comunicación) en UDFJC"
  - rel_id: rel-ocom-adscrita-rectoria
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rectoria]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 33 · OComUD adscrita a Rectoría"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oficina-comunicaciones
  - art-33
  - ley-1712-2014
  - transparencia
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Oficina de Comunicaciones

> [!note]+ Dependencia rectoral · materializa Ley 1712/2014 + MIPG D5
> La **OComUD** coordina la comunicación institucional UDFJC (interna + externa + digital) bajo marco vinculante de **Transparencia (Ley 1712/2014)** y **MIPG D5**.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable de la **comunicación institucional interna y externa**: comunicación organizacional (entre estamentos), comunicación pública (con sociedad y stakeholders externos), comunicación digital (web institucional, redes sociales, intranet), gestión de medios institucionales (Editorial UD, Emisora UD, sistemas digitales), atención a periodistas y eventos institucionales. Materializa el cumplimiento de la **Ley 171

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OComUD bajo cadena Ley 1712/2014 + MIPG D5 + ACU-004-25 Art. 33. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-comunicaciones` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
