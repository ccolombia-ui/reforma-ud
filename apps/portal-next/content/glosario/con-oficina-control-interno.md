---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-control-interno
kd_title: "Oficina de Control Interno UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Oficina de Control Interno UDFJC"
tupla_descripcion: "Dependencia adscrita a la Rectoría UDFJC responsable del Sistema de Control Interno bajo Ley 87/1993 + MIPG D7 · auditoría interna + evaluación independiente + cultura del control"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Oficina de Control Interno (OCI)"
skos_altLabel:
  - "OCI UDFJC"
  - "Internal Control Office"
  - "Auditoría Interna UDFJC"

skos_definition: "Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable del **Sistema de Control Interno** institucional bajo el marco vinculante nacional de la **Ley 87 de 1993** (que establece normas para el ejercicio del control interno en entidades públicas) y de la **Dimensión 7 del MIPG** (Control Interno · Decreto 1083/2015). Su jefe es designado por el Rector(a) por período de **4 años** (Art. 8° Ley 87/1993 modificado por Ley 1474/2011) y goza de **independencia técnica** respecto de las dependencias auditadas. Funciones canónicas: (i) **valoración del riesgo institucional**; (ii) **auditoría interna** sobre legalidad, eficiencia, eficacia y transparencia; (iii) **fomento de cultura del control**; (iv) **evaluación independiente** del Sistema de Control Interno; (v) **relación con organismos de control externos** (Contraloría General, Personería Distrital, Procuraduría)."
skos_scopeNote: "OCI NO depende jerárquicamente del Consejo de Gestión Administrativa (CGA) ni puede ser auditada por dependencias bajo su control · su independencia es invariante de la Ley 87/1993. Diferente del **Comité Institucional de Coordinación de Control Interno** (CICCI) que es órgano colegiado consultivo del Sistema. La OCI reporta directamente a la Rectoría y al CSU."
skos_example: "Cuando UDFJC presenta su informe anual de Control Interno a la Contraloría General o al CSU, lo hace bajo responsabilidad técnica de la OCI · cuyo jefe (Auditor Interno) firma el documento con independencia técnica."
skos_notation: "OCI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia rectoral de control interno universitaria pública"
iso_differentia: "Autonomía técnica garantizada por Ley 87/1993 · jefe designado por 4 años · función auditora independiente · materializa MIPG D7"
iso_subject_field: "Control interno público · Auditoría gubernamental · Derecho administrativo público"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33 + Ley 87 de 1993 + Decreto 1083/2015"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: NATIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-87-1993]]"
      adopter_locator: "Ley 87/1993 Arts. 8-9 (jefe Control Interno) + Ley 1474/2011 Art. 8 (modificación)"
      adopter_authority_level: LEGAL
      adopted_at: "1993-11-29"
      adoption_evidence: "Ley 87/1993 obliga a entidades públicas a tener Sistema de Control Interno · marco superior de la OCI"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "MIPG · Dimensión 7 Control Interno · Modelo Estándar de Control Interno (MECI)"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "MIPG incorpora MECI como modelo nacional vinculante de Control Interno"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 33 (dependencias rectorales)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 mantiene OCI como dependencia rectoral en marco Ley 87/1993"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-ley-87-1993-control-interno]]"
  normative_locator: "Ley 87/1993 + Decreto 1083/2015 D7 + ACU-004-25 Art. 33"
  normative_text: "Dependencias de la Rectoría: Secretaría General, Oficina de Planeación, Oficina de Control Interno, Oficina de Comunicaciones... (Art. 33 ACU-004-25). Marco superior: Ley 87/1993 establece normas para el ejercicio del control interno en entidades del Estado."
  normative_authority_level: LEGAL
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "oficina_control_interno"
  ddd_term: "Oficina de Control Interno"
  ddd_aggregate_root: "OficinaControlInterno"
  ddd_article_ref: "Art. 33 + Ley 87/1993"
  ddd_source_norm: "[[cita-ley-87-1993-control-interno]]"
  ddd_bc_ref: "[[bc-control-interno-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_governed_by:
    - "[[con-rectoria]]"
  ddd_invariants:
    - "El Jefe de OCI es designado por el Rector(a) por período de 4 años (Ley 87/1993 modificada por Ley 1474/2011)"
    - "OCI goza de INDEPENDENCIA TÉCNICA respecto de las dependencias auditadas (invariante Ley 87/1993)"
    - "OCI NO puede ser auditada por dependencias que ella audita (separación de funciones)"
    - "OCI debe presentar reportes periódicos a Rectoría + CSU + Contraloría sin restricción"
    - "La cultura del control debe ser fomentada institucionalmente (Art. 2° Ley 87/1993)"
  ddd_ubiquitous_terms:
    - "OCI · Oficina de Control Interno"
    - "Auditoría interna"
    - "Evaluación independiente"
    - "Sistema de Control Interno · MECI"
    - "Cultura del control"
    - "Reporte FURAG D7"

concepto_facet_neon:
  neon_imports:
    - "[[con-mipg-funcion-publica]]"
  neon_aligns_with:
    - "[[con-iso-9001]]"
  neon_scenario_origin: "S3"
  neon_alignment_strategy: DERIVED_FROM
  neon_in_scheme: "frame-control-interno-publico"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-33-oci-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-33-oci-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-mipg-funcion-publica]]"

applicable_domain: "Toda función de control interno + auditoría + evaluación independiente UDFJC desde 2025-05-06"
assumptions:
  - "La independencia técnica del Jefe de OCI se respeta operativamente"
  - "OCI tiene capacidad técnica para auditar todas las dependencias institucionales"
breaks_at:
  - "Si OCI es auditada por dependencias bajo su control (incumple Ley 87/1993)"
  - "Si la designación del Jefe excede las facultades rectorales"
  - "Si reportes a Contraloría / CSU se obstruyen institucionalmente"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-oci-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "OCI declarada en Art. 33 del ACU-004-25 como dependencia rectoral"
  - rel_id: rel-oci-implementa-ley87
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-87-1993]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Ley 87/1993 establece marco superior del Sistema de Control Interno · OCI lo materializa en UDFJC"
  - rel_id: rel-oci-adscrita-rectoria
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rectoria]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 33 · OCI adscrita a Rectoría con independencia técnica"
  - rel_id: rel-oci-articula-mipg
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "OCI materializa MIPG D7 (Control Interno) en operación UDFJC"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oficina-control-interno
  - oci
  - art-33
  - ley-87-1993
  - meci
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Oficina de Control Interno (OCI)

> [!important]+ Dependencia rectoral con independencia técnica · Ley 87/1993
> La **OCI** ejerce el Control Interno institucional bajo marco vinculante **Ley 87/1993** + **MIPG D7**. Su jefe es designado por la Rectoría por 4 años con **independencia técnica garantizada por ley** · NO puede ser auditada por dependencias bajo su control.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable del **Sistema de Control Interno** institucional bajo el marco vinculante nacional de la **Ley 87 de 1993** (que establece normas para el ejercicio del control interno en entidades públicas) y de la **Dimensión 7 del MIPG** (Control Interno · Decreto 1083/2015). Su jefe es designado por el Rector(a) por período de **4 años** (Art. 8° Ley 87/1993 modificado por Ley 1474/2011) y goza de **independencia técn

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="facet-normative"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="facet-ddd"></div>


## §7 · 🤝 Relaciones tipadas


<div class="dv-block" data-dv="relations"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OCI bajo cadena Ley 87/1993 + MIPG D7 + ACU-004-25 Art. 33 · independencia técnica como invariante. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-control-interno` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
