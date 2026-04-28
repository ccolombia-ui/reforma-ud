---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:potestad-rectoral-transitoria
kd_title: "Potestad Rectoral Transitoria UDFJC (Art. 107 ACU-004-25) — 2025-2027"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: ACTIVE_TRANSITORIO
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Potestad Rectoral Transitoria UDFJC"

skos_prefLabel: "Potestad Rectoral Transitoria (Art. 107)"
skos_altLabel: ["Designación discrecional del rector", "Régimen excepcional Art. 107"]
skos_hiddenLabel: ["potestad-rectoral", "art-107"]
skos_definition: "Régimen excepcional vigente durante los primeros dos (2) años desde la publicación del ACU-004-25 (2025-05-05 hasta 2027-05-05) que faculta al rector(a) UDFJC para designar discrecionalmente a los Directores de Escuelas, Centros e Institutos. Es la ÚNICA excepción al régimen electoral establecido en el Estatuto: Decanos (Art. 64-67), Directores de Escuela (Art. 72), Directores de Instituto (Arts. 74-77) y Directores de Centro (Arts. 78-81) son normalmente elegidos democráticamente, pero durante este período transitorio el rector los designa para asegurar la materialización rápida de la nueva estructura académica."
skos_scopeNote: "La potestad NO es permanente: vence el 2027-05-05. A partir de esa fecha, todas las designaciones DEBEN ser por elección. La extensión de hecho de esta potestad después del vencimiento constituye violación al Art. 107. Es el riesgo institucional más sensible del Período de Transición — si se prolonga, vulnera el principio (d) Democracia Representativa y Participativa del Art. 5."
skos_example: "Entre 2025-05-05 y 2027-05-05, el(la) rector(a) puede designar al(la) primer(a) Director(a) de la Escuela de Física sin mediar elección docente. A partir de 2027-05-05, su sucesor(a) deberá ser electo(a) por los docentes de la Escuela según procedimiento del Art. 72."
skos_notation: "Art. 107"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Régimen administrativo transitorio excepcional al régimen electoral universitario"
iso_differentia: "Vigente solo 2025-05-05 a 2027-05-05; aplicable solo a Directores de Escuelas/Centros/Institutos; no aplicable a Decanos"
iso_subject_field: "Régimen de transición universitario / Excepciones al régimen electoral"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 107"

align_schema_type: DefinedTerm
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
norm_legal_ref: "[[con-acu-004-25]]"
norm_article: "Art. 107"
norm_jurisdiction: "Acuerdo Superior UDFJC"
norm_effective_date: "2025-05-06"
norm_legal_force: BINDING
norm_compliance_scope: "Designaciones de Directores de Escuelas, Centros e Institutos durante 2025-05-05 a 2027-05-05"

applicable_domain: "UDFJC, vigente exclusivamente entre 2025-05-05 y 2027-05-05"
assumptions: ["El régimen electoral general retoma plena vigencia el 2027-05-05"]
breaks_at: ["Si se extiende de hecho la potestad rectoral después de 2027-05-05 (violación Art. 107)"]
extends_to: "[[con-director-escuela]] · [[con-instituto]] · [[con-centro]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-05"
valid_to: "2027-05-05"
lifecycle_state: ACTIVE_TRANSITORIO
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-prt-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-prt-aplica-directores
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-director-escuela]]"
    rel_frame: skos
  - rel_id: rel-prt-ejercida-por-rectoria
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-rectoria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La Potestad Rectoral Transitoria es una facultad excepcional ejercida por la Rectoría (Arts. 33-39) durante el período 2025-05-05 a 2027-05-05. Sin Rectoría no hay potestad; con Rectoría posterior a 2027-05-05 tampoco — es competencia delimitada temporalmente."
  - rel_id: rel-prt-vence-periodo-transicion
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-periodo-transicion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La Potestad Rectoral Transitoria está acotada al Período de Transición (4 años post-promulgación); su vencimiento 2027-05-05 coincide con el cierre de los primeros 2 años transitorios."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, potestad-rectoral, transitorio, art-107, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# Potestad Rectoral Transitoria (Art. 107 ACU-004-25)

> [!warning]+ ⚠️ Régimen excepcional con vencimiento legal 2027-05-05
> Esta potestad **NO es permanente**. Vence el 2027-05-05. A partir de esa fecha, todas las designaciones de Directores de Escuelas/Centros/Institutos DEBEN ser por elección.

## Definición operativa (cita literal)

> "Dentro de los **dos (2) años siguientes** a partir de la publicación de este Estatuto General, la designación de los directores de escuelas, centros e institutos será **potestativa del rector**." — **ACU-004-25 Art. 107**.

## Alcance (qué cubre y qué NO cubre)

| Cargo | Régimen general | Bajo Art. 107 |
|---|---|---|
| Director de Escuela | Electo por docentes (Art. 72) | Designado por rector hasta 2027-05-05 |
| Director de Instituto | Electo (Arts. 74-77) | Designado por rector hasta 2027-05-05 |
| Director de Centro | Electo (Arts. 78-81) | Designado por rector hasta 2027-05-05 |
| **Decano** | Electo ponderado (Arts. 64-67) | **NO aplica Art. 107** — siempre electo |
| Rector | Régimen propio | NO aplica |

## Fuente primaria

> Art. 107 ACU-004-25.

## Notas de aplicación

- **Riesgo crítico**: si la potestad se extiende de hecho después de 2027-05-05, viola el Art. 107 y vulnera principio (d) Democracia Representativa y Participativa.
- **Fin de la transitoriedad**: el cronograma del Plan de Implementación (Art. 98) debe garantizar elecciones democráticas ANTES del 2027-05-05.
