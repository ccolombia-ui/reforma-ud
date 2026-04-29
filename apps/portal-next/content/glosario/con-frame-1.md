---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:frame-1
kd_title: "Frame 1 — R&D / Investigación y Desarrollo (Schot & Steinmueller, 2018)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Frame 1 — R&D"

skos_prefLabel: "Frame 1 — R&D / Investigación y Desarrollo"
skos_altLabel: ["Modelo lineal de innovación", "R&D Frame", "Política CTI Frame 1"]
skos_definition: "Primer marco conceptual de política de innovación dominante entre 1945 y 1980s. Asume modelo lineal de innovación: la inversión en investigación básica genera conocimiento → desarrollo aplicado → comercialización → bienestar social vía spillovers. Su pregunta rectora es '¿cuánta ciencia debemos producir?'. Mide éxito en publicaciones indexadas, patentes y producción científica. Origen postguerra (Vannevar Bush, *Science: The Endless Frontier*, 1945)."
skos_scopeNote: "Frame 1 NO está derogado — sigue siendo correcto producir ciencia y publicar. Pero su autosuficiencia (asumir que produciendo ciencia automáticamente se resuelven problemas sociales) está superada empíricamente: décadas de inversión en R&D no han eliminado la desigualdad, la insostenibilidad ni la injusticia."
skos_example: "Indicadores típicos Frame 1 en una IES: # papers Q1, # patentes registradas, # citaciones promedio, ranking SCImago, monto inversión I+D / PIB. UDFJC produce datos Frame 1 vía CvLAC, OJS, OLE."
skos_notation: "Frame 1"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Marco conceptual histórico de política de innovación"
iso_differentia: "Modelo lineal R&D → spillovers; pregunta cuantitativa sobre producción científica"
iso_subject_field: "Historia de política CTI / Estudios CTI"
iso_term_status: preferred
iso_standardized_by: "Schot & Steinmueller (2018) Research Policy 47(9)"

pasteur_quadrant: BOHR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[schot2018frame3]] + Bush (1945) Science: The Endless Frontier"
  neon_alignment_confidence: 0.95
  neon_imports:
    - "[[con-frame-2]]"
    - "[[con-frame-3]]"

concepto_prerequisitos: []

applicable_domain: "Análisis histórico de política CTI; complementario a Frame 3"
assumptions: ["La producción científica genera bienestar vía spillovers automáticos"]
breaks_at: ["Empíricamente refutado: décadas de R&D no eliminan desafíos sociales sistémicos"]

valid_from: "1945-01-01"
valid_to: ""
rol_seleccionado: docente-investigador-pasteur
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-frame1-precedes-frame2
    rel_nombre: skos_narrower
    rel_direccion: pre
    rel_target: "[[con-frame-2]]"
    rel_frame: skos
  - rel_id: rel-frame1-fuente-schot
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[schot2018frame3]]"
    rel_frame: bibliografico

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - frame-1
  - schot-steinmueller
  - modelo-lineal-innovacion
  - m01-corpus
  - audit-v2-2
---


# Frame 1 — R&D (Schot & Steinmueller, 2018)

## Definición operativa

Primer marco conceptual de política de innovación dominante 1945-1980s. **Modelo lineal**: investigación básica → desarrollo aplicado → comercialización → bienestar vía spillovers. Pregunta rectora: *"¿cuánta ciencia producir?"*. Origen postguerra con Vannevar Bush (*Science: The Endless Frontier*, 1945).

## Fuente primaria

> Schot, J., & Steinmueller, W. E. (2018). Three frames for innovation policy. *Research Policy*, 47(9), 1554-1567.

## Lenguaje ubicuo asociado

Frame 1 · R&D · Investigación básica · Modelo lineal de innovación · Spillovers · Producción científica · Política Bush 1945.

## Notas de aplicación

- **Cuándo invocarlo**: al describir indicadores históricos de productividad académica (publicaciones, patentes, citaciones).
- **Limitación**: la autosuficiencia Frame 1 (asumir que producir ciencia es suficiente) está empíricamente superada.
- **Integrado en [[con-frame-3|Frame 3]]**: sigue siendo válido producir ciencia, pero ahora con direccionalidad transformativa explícita.
