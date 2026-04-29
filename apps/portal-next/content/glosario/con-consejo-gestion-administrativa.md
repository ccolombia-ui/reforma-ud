---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-gestion-administrativa
kd_title: "Consejo de Gestión Administrativa UDFJC (Art. 87 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: CONCEPT
tupla_concepto: "Consejo de Gestión Administrativa UDFJC"
tupla_descripcion: "Instancia colegiada de dirección y coordinación del Sistema de Gestión Administrativa UDFJC presidida por la Rectoría — articula vicerrectorías, secretaría general, dirección de planeación, gerencia administrativa y dirección de bienestar"
tupla__container_jsonl: "00-glosoario-universal/conceptos-normativos.jsonl"

skos_prefLabel: "Consejo de Gestión Administrativa (CGA)"
skos_altLabel:
  - "CGA UDFJC"
  - "Consejo de Gestión Administrativa Universidad Distrital"
  - "Administrative Management Council"

skos_definition: "Instancia colegiada UDFJC creada por el Art. 87 del ACU-004-25 que actúa como **dirección y coordinación del Sistema de Gestión Administrativa**. Articula la operación administrativa institucional bajo el liderazgo del Rector(a) que lo preside, sumando a vicerrectores misionales, secretario(a) general, director(a) de Gestión Estratégica y de Planeación, gerente administrativo(a) y financiero(a), y director(a) de Bienestar Universitario y Buen Vivir. Su función es **integrar los 3 subsistemas administrativos** (Gestión Estratégica + Talento Humano-Financiera-Infraestructura + Normativa Documental) con las funciones misionales (PM1+PM2+PM3) y el Sistema de Bienestar. Concepto NUEVO sin precedente exacto en el Acuerdo CSU 003/1997 — refleja la transición desde la antigua Vicerrectoría Administrativa y Financiera (autoridad unipersonal) a un órgano colegiado horizontal de gestión articulada. Se da su propio reglamento (PARÁGRAFO Art. 87)."
skos_scopeNote: "El CGA NO es la máxima autoridad administrativa (esa función la ejerce la Rectoría que lo preside), sino la **instancia de COORDINACIÓN** entre las dependencias administrativas y misionales. Es órgano deliberativo de orientación operativa — sus decisiones se ejecutan vía Resoluciones de Rectoría o actos de la dependencia respectiva. NO confundir con el CSU (gobierno) ni con el CACAD (autoridad académica) — el CGA opera en el plano de gestión operativa institucional. Sin el CGA, los 3 subsistemas administrativos quedarían desarticulados."
skos_example: "Cuando UDFJC debe decidir la priorización presupuestal anual articulando demandas misionales (vicerrectorías) + capacidad financiera (gerencia administrativa) + planeación estratégica (dirección planeación) + sostenibilidad bienestar (dirección bienestar) + soporte legal-documental (secretaría general), la decisión coordinada se toma en el CGA presidido por la Rectoría."
skos_notation: "CGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Instancia colegiada de dirección y coordinación administrativa universitaria"
iso_differentia: "Preside el Rector(a) · integra 6 cargos directivos · articula 3 subsistemas administrativos con misionales y bienestar · concepto NUEVO en ACU-004-25 sin precedente en ACU 003/1997 · se da su propio reglamento"
iso_subject_field: "Gobernanza administrativa universitaria · Derecho administrativo universitario público · Coordinación interdireccional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 87"

align_dbpedia: ""
align_wikidata: ""

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
      adopter_locator: "ACU-004-25 Art. 87 (composición + funciones) + Art. 86 (estructura)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza el CGA como instancia colegiada NUEVA · sin precedente en ACU 003/1997 · refleja transición de Vicerrectoría Administrativa unipersonal a órgano colegiado horizontal de coordinación"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 87 (composición de 6 cargos + reglamento propio)"
  normative_text: "El Consejo de Gestión Administrativa actúa como la instancia de dirección y coordinación del Sistema de Gestión Administrativa. Composición: a) Rector(a), quien lo preside; b) Vicerrectores(as); c) Secretario(a) general; d) Director(a) de Gestión Estratégica y de Planeación; e) Gerente administrativo y financiero; f) Director(a) de Bienestar Universitario y Buen Vivir. PARÁGRAFO: El Consejo de Gestión Administrativa se da su propio reglamento."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates:
    - "Concepto NUEVO en ACU-004-25 (no existía órgano colegiado de coordinación administrativa en ACU 003/1997)"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "consejo_gestion_administrativa"
  ddd_term: "Consejo de Gestión Administrativa"
  ddd_aggregate_root: "ConsejoGestionAdministrativa"
  ddd_article_ref: "Art. 87"
  ddd_source_norm: "[[cita-acu-004-25-csu-udfjc-2025]]"
  ddd_bc_ref: "[[bc-gestion-administrativa-udfjc]]"
  ddd_role_in_context: AGGREGATE_ROOT
  ddd_aggregate_root_flag: true
  ddd_domain_type: Core
  ddd_lifecycle_states:
    - SESIONANDO
    - RECESO
  ddd_governed_by:
    - "[[con-rectoria]]"
  ddd_invariants:
    - "El CGA debe ser presidido por el Rector(a) — no por otro miembro"
    - "El CGA debe tener exactamente 6 cargos titulares: 1 Rector + 3 Vicerrectores + 1 Secretario + 1 Director Planeación + 1 Gerente AdminFin + 1 Director Bienestar (algunos rangos pueden tener delegados)"
    - "El CGA debe darse su propio reglamento operativo (PARÁGRAFO Art. 87)"
    - "Los actos del CGA son orientativos-coordinativos, no ejecutivos directos · se ejecutan vía Resoluciones de Rectoría o actos de cada dependencia"
    - "Toda priorización presupuestal anual debe pasar por el CGA antes de elevarse al CSU para aprobación final"
  ddd_ubiquitous_terms:
    - "Consejo de Gestión Administrativa · CGA"
    - "Sistema de Gestión Administrativa · SGA"
    - "Coordinación interdireccional"
    - "3 subsistemas administrativos"
    - "Reglamento operativo propio"
    - "Acto deliberativo-coordinativo"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-87-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-87-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-rectoria]]"
  - "[[con-vicerrectoria-formacion]]"
  - "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
  - "[[con-vicerrectoria-contextos-extension]]"
  - "[[con-secretaria-general-sisgral]]"

applicable_domain: "Toda decisión de coordinación operativa entre dependencias administrativas y misionales UDFJC desde 2025-05-06 con plazo de instalación dentro del Período de Transición Art. 96"
assumptions:
  - "La coordinación colegiada entre 6 cargos directivos es operacionalizable institucionalmente"
  - "El reglamento propio del CGA permite agilidad operativa sin sacrificar trazabilidad"
  - "Los Directores de Gestión Estratégica + Gerencia Administrativa + Bienestar deben designarse antes de poder instalar el CGA"
breaks_at:
  - "Si el CGA sesiona sin presidencia rectoral (incumple Art. 87a)"
  - "Si los 6 cargos no están completos por vacancia prolongada de alguno"
  - "Si el CGA invade competencias del CSU (estatutarias) o CACAD (académicas) tomando decisiones que excedan su ámbito coordinativo"
  - "Si el reglamento propio no se expide dentro del Período de Transición (riesgo de operación informal)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-cga-implements-acu
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: gestion-administrativa-udfjc
    rel_propiedades:
      norm_evidence: "El CGA es creado por el Art. 87 del ACU-004-25 como instancia NUEVA"
  - rel_id: rel-cga-presidido-rectoria
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rectoria]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87a · El Rector(a) preside el CGA"
  - rel_id: rel-cga-coordina-vicerrectorias
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-formacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87b · vicerrectores son miembros del CGA — articulación misional"
  - rel_id: rel-cga-coordina-vri
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87b · vicerrector(a) de investigación-creación es miembro del CGA"
  - rel_id: rel-cga-coordina-vce
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-contextos-extension]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87b · vicerrector(a) de contextos-extensión es miembro del CGA"
  - rel_id: rel-cga-secretaria
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-secretaria-general-sisgral]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87c · secretario(a) general es miembro del CGA · soporte normativo-documental"
  - rel_id: rel-cga-coordina-direccion-planeacion
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-direccion-gestion-estrategica-planeacion]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87d · director(a) de Gestión Estratégica y Planeación es miembro del CGA"
  - rel_id: rel-cga-coordina-gerencia
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-gerencia-administrativa-financiera]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87e · gerente administrativo(a) y financiero(a) es miembro del CGA"
  - rel_id: rel-cga-coordina-direccion-bienestar
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-direccion-bienestar-buen-vivir]]"
    rel_frame: ddd
    rel_propiedades:
      norm_evidence: "Art. 87f · director(a) de Bienestar Universitario y Buen Vivir es miembro del CGA"
  - rel_id: rel-cga-related-csu
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-csu-consejo-superior-universitario]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El CGA opera bajo el marco general que el CSU define · sus decisiones se ejecutan respetando políticas del CSU/CACAD"
  - rel_id: rel-cga-articula-sigud
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-resolucion-rectoria-207-2016-sigud]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "El CGA opera articulado con SIGUD (Res. Rectoría 207/2016) bajo principios ISO 9001/21001 + MIPG"

cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - consejo-gestion-administrativa
  - cga
  - art-87
  - sistema-gestion-administrativa
  - m00-base
  - concepto-nuevo
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# Consejo de Gestión Administrativa (CGA)

> [!important]+ ⚛️ Concepto NUEVO · órgano colegiado de coordinación administrativa
> El **CGA** es la instancia colegiada **NUEVA** que crea el ACU-004-25 para coordinar el Sistema de Gestión Administrativa. Sin precedente en ACU 003/1997 — refleja la transición de Vicerrectoría Administrativa unipersonal a órgano colegiado horizontal. Presidido por la Rectoría, articula 6 cargos directivos con los 3 subsistemas administrativos.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica (cita literal Art. 87)

> Instancia colegiada UDFJC creada por el Art. 87 del ACU-004-25 que actúa como **dirección y coordinación del Sistema de Gestión Administrativa**. Articula la operación administrativa institucional bajo el liderazgo del Rector(a) que lo preside, sumando a vicerrectores misionales, secretario(a) general, director(a) de Gestión Estratégica y de Planeación, gerente administrativo(a) y financiero(a), y director(a) de Bienestar Universitario y Buen Vivir. Su función es **integrar los 3 subsistemas adm

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | EDISON | — |

> **Cita literal Art. 87**: "El Consejo de Gestión Administrativa actúa como la instancia de dirección y coordinación del Sistema de Gestión Administrativa. Composición: a) Rector(a), quien lo preside; b) Vicerrectores(as); c) Secretario(a) general; d) Director(a) de Gestión Estratégica y de Planeación; e) Gerente administrativo y financiero; f) Director(a) de Bienestar Universitario y Buen Vivir. PARÁGRAFO: El Consejo de Gestión Administrativa se da su propio reglamento."

## §2 · 📜 Anclaje normativo + cadena de adopción


<div class="dv-block" data-dv="obsidian-only"></div>


## §3 · 🧩 Estructura DDD · invariantes operativas


<div class="dv-block" data-dv="obsidian-only"></div>


## §4 · 🔻 Pre-requisitos cognitivos


<div class="dv-block" data-dv="prereqs"></div>


## §5 · 🔺 Conceptos que declaran este como pre-requisito


<div class="dv-block" data-dv="habilita"></div>


## §7 · 🤝 Relaciones tipadas (outgoing)


<div class="dv-block" data-dv="relations"></div>


## §8 · 🎭 Vista por rol seleccionado


<div class="dv-block" data-dv="vista-por-rol"></div>


## §10 · 📜 Citado en


<div class="dv-block" data-dv="cited-in"></div>


---

## Notas de aplicación

- **Concepto NUEVO sin precedente** en ACU 003/1997 — refleja la transición desde Vicerrectoría Administrativa unipersonal a órgano colegiado horizontal.
- **Riesgo Período Transición**: si el reglamento propio (PARÁGRAFO Art. 87) no se expide, el CGA puede operar informalmente durante 2025-2029, fragmentando la coordinación.
- **Anclaje CoP**: la Comunidad de Práctica del CGA articula directivos administrativos y misionales · base de futuras prácticas de gestión integrada.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | **Concepto creado en Sprint 1A.6** (audit v2.2 · gap unidades organizativas). Modela el CGA como instancia colegiada NUEVA del ACU-004-25 Art. 87. Incluye: facet `[NORMATIVE, DDD]` + adoption_chain estatutaria + 5 invariantes operativas + 11 relaciones tipadas hacia los 6 cargos directivos del CGA + cadena de articulación con SIGUD/CSU. Body completo TPL T1 v2.2. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-gestion-administrativa` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
