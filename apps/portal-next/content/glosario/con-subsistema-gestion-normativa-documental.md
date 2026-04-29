---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-gestion-normativa-documental
kd_title: "Subsistema 3 · Gestión Normativa y Documental UDFJC (Art. 85 §3 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Subsistema 3 · Gestión Normativa y Documental UDFJC"
tupla_descripcion: "Tercero de los 3 subsistemas del Sistema de Gestión Administrativa UDFJC · orienta seguridad jurídica, capacidad institucional, gestión documental y trazabilidad normativa de las decisiones"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Subsistema 3 · Gestión Normativa y Documental"
skos_altLabel:
  - "Subsistema Normativo Documental"
  - "Subsistema 3 SGA"
  - "Normative and Documentary Management Subsystem"

skos_definition: "Tercero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §3 del ACU-004-25. Su función canónica es **orientar con fundamento en el marco legal, las capacidades institucionales y de gobierno, la seguridad jurídica en la toma de decisiones y la gestión general de la Institución**. Operacionalmente liderado por la Secretaría General (SISGRAL · Arts. 40-42), articula tres macroprocesos críticos: (i) **Gestión jurídica institucional** (consultoría jurídica + defensa judicial + control de legalidad de actos); (ii) **Gestión documental** (custodia archivos + expedición certificaciones + trazabilidad documental); (iii) **Gestión normativa** (sistematización + difusión + actualización del marco normativo institucional · SISGRAL). Es el subsistema que materializa la **fe pública institucional** y la **trazabilidad jurídica** de las decisiones administrativas y misionales. Sin S3, los actos institucionales (Acuerdos, Resoluciones, Circulares) carecerían de soporte normativo coherente."
skos_scopeNote: "El Subsistema 3 NO es la Secretaría General que lo lidera — es la **función estructural** del SGA que la Secretaría General ejecuta. Articulado upstream con S1 (planificación de actos institucionales) y con S2 (soporte jurídico-documental a actos administrativos). Es el subsistema más dependiente de **cumplimiento normativo legal** (Constitución + Ley General de Archivos 594/2000 + Estatuto Anticorrupción + Ley de Transparencia + ACU-004-25 + estatutos derivados Art. 98)."
skos_example: "Cuando UDFJC expide un Acuerdo del CSU o una Resolución de Rectoría, el Subsistema 3 (vía Secretaría General) garantiza: (i) revisión jurídica previa, (ii) numeración y fecha trazables, (iii) publicación en SISGRAL, (iv) custodia documental, (v) certificación de copias auténticas."
skos_notation: "S3-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de gestión normativa + documental + jurídica · liderado por Secretaría General SISGRAL · tercero de 3 subsistemas Art. 85"
iso_subject_field: "Derecho administrativo universitario · Gestión documental pública · Sistema normativo institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §3"

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
      adopter_locator: "ACU-004-25 Art. 85 §3"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara el Subsistema 3 como uno de los 3 subsistemas estructurales del SGA"
    - adopter: "[[con-mipg-funcion-publica]]"
      adopter_locator: "MIPG · Dimensión 7 (Control Interno) + Dimensión 6 (Gestión del Conocimiento)"
      adopter_authority_level: REGLAMENTARIO
      adopted_at: "2015-05-26"
      adoption_evidence: "Subsistema 3 materializa MIPG D6+D7 en operación UDFJC"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 85 §3"
  normative_text: "Subsistema 3: Gestión Normativa y Documental · Orienta con fundamento en el marco legal, las capacidades institucionales y de gobierno, la seguridad jurídica en la toma de decisiones y la gestión general de la Institución."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: []
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "subsistema_gestion_normativa_documental"
  ddd_term: "Subsistema 3 · Gestión Normativa y Documental"
  ddd_aggregate_root: "SubsistemaGestionNormativaDocumental"
  ddd_article_ref: "Art. 85 §3"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gestion-administrativa-udfjc]]"
  ddd_role_in_context: DOMAIN_SERVICE
  ddd_aggregate_root_flag: false
  ddd_domain_type: Supporting
  ddd_invariants:
    - "El Subsistema 3 debe ser ejecutado por una dependencia institucional explícita (Secretaría General SISGRAL)"
    - "Las 3 funciones canónicas son Gestión Jurídica + Gestión Documental + Gestión Normativa"
    - "Todo acto institucional (Acuerdo, Resolución, Circular) debe pasar por revisión jurídica previa S3"
    - "Toda numeración y fecha de actos institucionales debe ser trazable en SISGRAL"
    - "S3 garantiza fe pública de los actos institucionales · su omisión vicia jurídicamente las decisiones"
    - "Cumplimiento de Ley 594/2000 (Archivos Generales) · Ley 1712/2014 (Transparencia) · Estatuto Anticorrupción"
  ddd_ubiquitous_terms:
    - "Subsistema 3 · S3-SGA"
    - "Gestión jurídica institucional"
    - "Gestión documental"
    - "Gestión normativa institucional"
    - "Fe pública institucional"
    - "SISGRAL · Sistema Normativo UDFJC"
    - "Ley 594/2000 · Ley 1712/2014"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-85-s3-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-85-s3-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-secretaria-general-sisgral]]"
  - "[[con-mipg-funcion-publica]]"

applicable_domain: "Toda función jurídica, documental y normativa institucional UDFJC"
assumptions:
  - "La separación funcional entre Subsistema 3 y Secretaría General permite trazabilidad"
breaks_at:
  - "Si los actos institucionales se expiden sin revisión jurídica previa S3"
  - "Si la trazabilidad documental se rompe (incumple Ley 594/2000)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-s3-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 3 declarado en Art. 85 §3"
  - rel_id: rel-s3-ejecutado-secretaria
    rel_nombre: ddd_part_of
    rel_direccion: post
    rel_target: "[[con-secretaria-general-sisgral]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Arts. 40-42 + 86b · Secretaría General es la instancia ejecutiva del Subsistema 3 + miembro CGA"
  - rel_id: rel-s3-articula-mipg
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mipg-funcion-publica]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Subsistema 3 materializa MIPG D6+D7 en operación UDFJC"
  - rel_id: rel-s3-coordina-s1
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-subsistema-gestion-estrategica]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S3 da soporte jurídico-documental a planes y actos producidos por S1"
  - rel_id: rel-s3-coordina-s2
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-subsistema-talento-financiero-infraestructura]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "S3 da soporte jurídico-documental a actos administrativos ejecutados por S2"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-3
  - gestion-normativa
  - gestion-documental
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Subsistema 3 · Gestión Normativa y Documental

> [!note]+ Subsistema funcional del SGA · ejecutado por Secretaría General
> Tercero de los 3 subsistemas del SGA. Garantiza la **seguridad jurídica + gestión documental + gestión normativa**. Ejecutado por la **Secretaría General SISGRAL** · materializa MIPG D6+D7 + Ley 594/2000 + Ley 1712/2014.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica

> Tercero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §3 del ACU-004-25. Su función canónica es **orientar con fundamento en el marco legal, las capacidades institucionales y de gobierno, la seguridad jurídica en la toma de decisiones y la gestión general de la Institución**. Operacionalmente liderado por la Secretaría General (SISGRAL · Arts. 40-42), articula tres macroprocesos críticos: (i) **Gestión jurídica institucional** (cons

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela Subsistema 3 del SGA como función estructural ejecutada por Secretaría General SISGRAL. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-gestion-normativa-documental` v1.0.0 · TPL T1 NORMATIVO*
