---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:caba
kd_title: "CABA — Comunidad Académica de Base UDFJC (Art. 73 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "CABA — Comunidad Académica de Base"

skos_prefLabel: "CABA — Comunidad Académica de Base"
skos_altLabel:
  - "Comunidad Académica Básica"
  - "Super-CoP UDFJC"
  - "Comunidad de Práctica transversal"
  - "Nicho transformativo (Geels)"
skos_definition: "Estructura básica, dinámica y flexible de las Escuelas UDFJC, organizada de acuerdo con el interés cognitivo de los docentes desde su área específica del campo del conocimiento-saber. Todo profesor está adscrito a mínimo una CABA. Es **célula organizativa transversal**: puede atravesar una o varias Escuelas, articulando docentes-investigadores-estudiantes alrededor de un par específico de conocimiento-saber. Activa simultáneamente las seis retroalimentaciones R1-R6 del ciclo virtuoso ΩMT. Opera como **nicho transformativo** (Geels 2002) dentro del régimen Sub-N1 dominante. NO requiere decreto estatutario para existir: puede nacer como CoP informal y madurar a unidad formal con reconocimiento CSU."
skos_scopeNote: "La CABA es el dispositivo MÁS NOVEDOSO de la nueva estructura organizativa. Articula la pluralidad epistémica del Art. 5g (Soberanía Cognitiva) en la práctica académica cotidiana. Es la materialización del 'salto cuántico Sub-N1 → N4' del corpus MI-12. NO confundir con grupo de investigación (que tiene reconocimiento Minciencias) ni con departamento (que es estructura administrativa)."
skos_example: "La CABA 'Soberanía Energética Comunitaria' atraviesa la Escuela de Física (electromagnetismo y termodinámica), la Escuela de Ingeniería Eléctrica (sistemas de potencia) y la Escuela de Estudios Comunitarios (saberes territoriales sobre microgrids comunales). Articula docentes de las tres + estudiantes de pregrado y posgrado + investigadores con grupos Minciencias. Activa R1 (semilleros) + R2 (currículo vivo) + R3 (transferencia) + R4 (problemas reales) + R5 (egresados agentes) + R6 (gobernanza CABA)."
skos_notation: "CABA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Estructura básica dinámica y flexible de las Escuelas universitarias"
iso_differentia: "Organizada por interés cognitivo + área específica del campo de conocimiento-saber + transversal entre Escuelas + adscripción mínima obligatoria de docentes"
iso_subject_field: "Estructura académica reformada UDFJC / Comunidades de práctica académica / Sustainability transitions"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 73"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE
  - DDD
  - NEON

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 73 (CABA)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 Art. 73 institucionaliza la CABA como estructura básica obligatoria de las Escuelas — concepto NUEVO sin precedente en ACU 003/1997"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 73"
  normative_text: "La Comunidad Académica de Base es la estructura básica, dinámica y flexible de las escuelas, que se organiza de acuerdo con el interés cognitivo de los docentes, desde su área específica del campo de conocimiento-saber. Todo profesor está adscrito a mínimo una CABA."
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates:
    - "Concepto NUEVO en ACU-004-25 (sin precedente exacto en ACU 003/1997 — superseded el modelo departamental)"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []
  conflict_evidence: ""

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[wenger1998cop]] Wenger (1998) Communities of Practice + [[geels2002mlp]] Geels (2002) Multi-Level Perspective + ACU-004-25"
  neon_alignment_confidence: 0.9
  neon_methodological_notes: "Fusión NeOn S5 de tres marcos: (a) Wenger 1998 — Communities of Practice como aprendizaje situado; (b) Geels 2002 — Multi-Level Perspective con nichos transformativos dentro de regímenes; (c) ACU-004-25 — institucionalización formal de la CABA como estructura mandatada en cada Escuela. La adopción UDFJC es propietaria — captura el aprendizaje de cómo R002 reforma vinculante materializa la CoP académica como dispositivo de cambio sistémico."

concepto_facet_ddd:
  ddd_id: "caba"
  ddd_aggregate_root: "CABA"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Comunidades Transversales. Atraviesa múltiples Escuelas. Encapsula identidad colectiva (campo de conocimiento-saber específico), agrupa actores de roles distintos como Entities, mantiene invariantes de activación R1-R6."
  ddd_invariants:
    - "Una CABA agrupa al menos 3 actores de roles distintos (estudiante, docente, investigador)"
    - "Una CABA se organiza alrededor de un par específico conocimiento-saber"
    - "Todo profesor de planta TC está adscrito a mínimo UNA CABA (Art. 73)"
    - "Una CABA puede atravesar 1 a N Escuelas (transversal)"
    - "Una CABA activa simultáneamente las 6 retroalimentaciones R1-R6 con intensidad ≥ 0.7"
    - "Una CABA puede nacer informal y madurar a unidad formal con reconocimiento CSU"
  ddd_ubiquitous_terms:
    - "CABA"
    - "Comunidad Académica de Base"
    - "Comunidad de Práctica · CoP"
    - "Nicho transformativo"
    - "Salto cuántico Sub-N1 → N4"
    - "Activación R1-R6 simultánea"
    - "Adscripción docente mínima"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-73-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-73-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-soberania-cognitiva]]"
  - "[[con-campo-conocimiento-saber]]"
  - "[[con-escuela]]"

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva en cada Escuela"
assumptions:
  - "El reconocimiento simétrico de saberes posibilita CABAs interdisciplinares y transdisciplinares"
  - "Los docentes activos pueden gestionar adscripción a múltiples CABAs según interés cognitivo"
breaks_at:
  - "Si una CABA es monorrol o monodisciplinar (deja de ser transversal)"
  - "Si un docente de planta TC NO está adscrito a ninguna CABA (incumple Art. 73)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-caba-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-caba-related-soberania-cognitiva
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_strength: 0.9
      skos_evidence: "CABAs articulan pluralidad epistémica del Art. 5g en práctica cotidiana"
  - rel_id: rel-caba-atraviesa-escuelas
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-escuela]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Art. 73: CABAs son estructura básica de las Escuelas, transversales"
  - rel_id: rel-caba-activa-omt
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-omt]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CABA es dispositivo activador del ciclo virtuoso ΩMT (M02): activa simultáneamente las retroalimentaciones R1-R6 que aceleran capacidad transformativa institucional"
  # — v1.2.0 cross-references M02 (Fase B audit refactor) ——————————
  - rel_id: rel-caba-activa-r1r6
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs son los dispositivos institucionales que activan las 6 retroalimentaciones R1-R6 simultáneamente — son el vehículo del ciclo virtuoso completo a nivel de Escuela."
  - rel_id: rel-caba-vehiculo-salto
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-salto-cuantico-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs son el vehículo institucional del salto cuántico Sub-N1 → N4 (M02 §4.4.2): nichos protegidos que saltan directamente al estadio N4 en su dominio."
  - rel_id: rel-caba-super-cop
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-cops-wenger]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs son super-CoPs institucionales (Wenger 1998): articulan múltiples Comunidades de Práctica disciplinares en torno a un dominio transversal."
  - rel_id: rel-caba-ba-seci
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-seci-ba-nonaka]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs operan como *Ba* (Nonaka 1995) — contextos compartidos donde la espiral SECI se mantiene viva al integrar PM1-PM2-PM3."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 7

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - caba
  - comunidad-academica-base
  - art-73
  - m00-base
  - refundacional
  - audit-v2-2
  - tpl-v2
---


# CABA — Comunidad Académica de Base

> [!important]+ ⚛️ Concepto refundacional · célula transversal del nuevo modelo
> La CABA es el **dispositivo MÁS NOVEDOSO** de la estructura organizativa post-ACU-004-25. Articula la pluralidad epistémica del Art. 5g (Soberanía Cognitiva) en la práctica académica cotidiana. Es la materialización del **salto cuántico Sub-N1 → N4**.

---

## §0 · 🎭 Vista por rol institucional

<span class="dv-block" data-dv="selector-rol"></span>

---

## §1 · Definición canónica (cita literal)

> Estructura básica, dinámica y flexible de las Escuelas UDFJC, organizada de acuerdo con el interés cognitivo de los docentes desde su área específica del campo del conocimiento-saber. Todo profesor está adscrito a mínimo una CABA. Es **célula organizativa transversal**: puede atravesar una o varias Escuelas, articulando docentes-investigadores-estudiantes alrededor de un par específico de conocimiento-saber. Activa simultáneamente las seis retroalimentaciones R1-R6 del ciclo virtuoso ΩMT. Opera 

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| DEFINITION | PASTEUR | — |

> **Cita literal Art. 73**: "La Comunidad Académica de Base es la estructura básica, dinámica y flexible de las escuelas, que se organiza de acuerdo con el interés cognitivo de los docentes, desde su área específica del campo de conocimiento-saber. Todo profesor está adscrito a mínimo una CABA."

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

- **NO confundir** con grupo de investigación (Minciencias-COL) ni con departamento administrativo.
- **Cuándo invocarla**: como dispositivo activador de R1-R6 + materializador de Soberanía Cognitiva en práctica académica.
- **Riesgo monorrol**: una "CABA" con un solo rol deja de ser transversal — viola Art. 73.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| v1.0.0 | 2026-04-26 | Concepto inicial v5.2 legacy |
| **v2.0.0** | **2026-04-27** | **Migración Sprint 1A** (audit v2.2): facets v2.0 SOTA + adoption_chain (ACU-004-25 Art. 73) + concepto_prerequisitos + body Metabind/DataviewJS reactivo + 12 secciones canónicas + cssclass tpl-t1-normativo. Preservadas: cita literal Art. 73 + invariantes DDD (renderizadas dinámicamente desde `concepto_facet_ddd`). |
