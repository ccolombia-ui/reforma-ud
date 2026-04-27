---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:caba
kd_title: "CABA — Comunidad Académica de Base UDFJC (Art. 73 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_supersedes: 60-glosario/con-caba (v1.1.0 previo SUPERSEDED — re-construido aquí con rigor v5.2 máximo)
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-05, sec-MI12-06, sec-MI12-07, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "CABA — Comunidad Académica de Base"

skos_prefLabel: "CABA — Comunidad Académica de Base"
skos_altLabel:
  - "Comunidad Académica Básica"
  - "Super-CoP UDFJC"
  - "Comunidad de Práctica transversal"
  - "Nicho transformativo (Geels)"
skos_hiddenLabel: ["caba", "comunidad-academica-base", "comunidad-academica-basica"]
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

align_schema_type: Organization
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.9

concepto_capabilities: [NORMATIVE, DDD, NEON]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 73 (CABA — estructura básica, dinámica y flexible)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda Escuela UDFJC; todo docente adscrito a mínimo una CABA"
  norm_supersedes: "Concepto NUEVO en ACU-004-25; sin precedente exacto en Acuerdo CSU 003/1997 (que tenía 'grupos de investigación' pero no CABAs como células transversales obligatorias)"

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

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva en cada Escuela"
assumptions:
  - "El reconocimiento simétrico de saberes posibilita CABAs interdisciplinares y transdisciplinares"
  - "Los docentes activos pueden gestionar adscripción a múltiples CABAs según interés cognitivo"
breaks_at:
  - "Si una CABA es monorrol o monodisciplinar (deja de ser transversal)"
  - "Si un docente de planta TC NO está adscrito a ninguna CABA (incumple Art. 73)"
extends_to: "[[con-escuela]] (CABAs atraviesan Escuelas) · [[con-cca]] (CABAs activan paquetes CCA)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Organization

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

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 7

tags: [glosario-universal, concepto-normativo, caba, comunidad-academica-base, art-73, m00-base, refundacional, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# CABA — Comunidad Académica de Base (Art. 73 ACU-004-25)

> [!important]+ ⚛️ Concepto refundacional · célula transversal del nuevo modelo
> La CABA es el **dispositivo MÁS NOVEDOSO** de la estructura organizativa post-ACU-004-25. Articula la **pluralidad epistémica** del Art. 5g ([[con-soberania-cognitiva|Soberanía Cognitiva]]) en la práctica académica cotidiana. Es la materialización del **salto cuántico Sub-N1 → N4** del corpus MI-12.

## Definición operativa (cita literal)

> "La Comunidad Académica de Base es la estructura básica, dinámica y flexible de las escuelas, que se organiza de acuerdo con el interés cognitivo de los docentes, desde su área específica del campo de conocimiento-saber. Todo profesor está adscrito a mínimo una CABA." — **ACU-004-25 Art. 73**.

## Características distintivas

| Atributo | Detalle |
|---|---|
| **Naturaleza** | Estructura básica, dinámica, flexible |
| **Organizador** | Interés cognitivo de los docentes + área específica del campo conocimiento-saber |
| **Adscripción** | Obligatoria — todo docente de planta TC en al menos UNA CABA |
| **Transversalidad** | Puede atravesar 1 a N Escuelas |
| **Formalización** | Puede nacer informal; madurar a formal con reconocimiento CSU |
| **Función** | Activar R1-R6 simultáneamente (ciclo virtuoso ΩMT) |

## Fuentes primaria + genealogía

| Fuente | Aporte |
|---|---|
| **ACU-004-25 Art. 73** | Institucionalización mandatada |
| **Wenger (1998) Communities of Practice** | Aprendizaje situado en comunidades |
| **Geels (2002) MLP** | Nicho transformativo dentro de regímenes |

## Invariantes operativas DDD

1. **≥ 3 actores de roles distintos** (estudiante + docente + investigador como mínimo).
2. Organizada por **par específico conocimiento-saber**.
3. **Todo profesor** de planta TC adscrito a mínimo UNA CABA.
4. Puede atravesar **1 a N Escuelas** (transversal).
5. Activa las **6 retroalimentaciones R1-R6** simultáneamente con intensidad ≥ 0.7.
6. Puede nacer informal; madurar a formal con reconocimiento CSU.

## Lenguaje ubicuo asociado

CABA · Comunidad Académica de Base · CoP · Nicho transformativo · Salto cuántico Sub-N1 → N4 · Activación R1-R6 simultánea · Adscripción docente mínima.

## Notas de aplicación

- **NO confundir** con grupo de investigación (Minciencias-COL) ni con departamento administrativo.
- **Cuándo invocarla**: como dispositivo activador de R1-R6 + materializador de Soberanía Cognitiva en práctica académica.
- **Riesgo monorrol**: una "CABA" con un solo rol (solo docentes / solo estudiantes) deja de ser transversal — viola Art. 73.
