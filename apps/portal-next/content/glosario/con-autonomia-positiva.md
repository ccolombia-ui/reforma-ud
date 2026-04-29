---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:autonomia-positiva
kd_title: "Autonomía Positiva (MCU 2020) — libertad PARA contribuir"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Autonomía Positiva"

skos_prefLabel: "Autonomía Positiva"
skos_altLabel: ["Positive Autonomy", "Libertad para contribuir", "Autonomía con responsabilidad"]
skos_definition: "Concepto introducido por la Magna Charta Universitatum 2020 que extiende la noción tradicional de autonomía universitaria de libertad NEGATIVA (freedom from coercion: ausencia de interferencia externa) a libertad POSITIVA (freedom to contribute: capacidad activa de contribuir a la sostenibilidad y a las comunidades). La universidad ya no se define por aquello de lo que está libre (interferencia política, religiosa, económica), sino por aquello PARA lo que es libre (transformar la sociedad hacia el bien común, sostenibilidad, equidad). Aplicado a la reforma UDFJC, refuta la lectura defensiva de la autonomía del Art. 69 CO como escudo frente a políticas públicas de CTI: la autonomía es el INSTRUMENTO de la responsabilidad institucional, no su sustituto."
skos_scopeNote: "La distinción libertad negativa vs positiva proviene de Isaiah Berlin (1958, *Two Concepts of Liberty*). Aplicada a universidades, la transición conceptual de MCU 1988 → MCU 2020 marca el giro responsable: la autonomía ya no es 'derecho a no ser intervenida' sino 'capacidad para contribuir activamente'. Esta lectura se refuerza vía cadena normativa multinivel CO: Art. 6 Ley 30/1992 establece como deber universitario 'solucionar las necesidades del país'."
skos_example: "Cuando una unidad organizativa UDFJC invoca la autonomía universitaria del Art. 69 para no implementar el ACU-004-25 está apelando a libertad NEGATIVA. La lectura correcta MCU 2020 + Ley 30 Art. 6 es libertad POSITIVA: 'precisamente porque tienes autonomía, tienes la capacidad de reformarte sin esperar al Congreso; la Ley 30 te da la obligación de hacerlo'."
skos_notation: "Autonomía positiva"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Concepto de filosofía política aplicado a autonomía universitaria"
iso_differentia: "Libertad PARA contribuir (positiva) vs libertad DE coerción (negativa); introducida formalmente por MCU 2020"
iso_subject_field: "Filosofía política universitaria / Teoría de la autonomía / Berlin two concepts"
iso_term_status: preferred
iso_standardized_by: "MCU Observatory 2020; raíz filosófica Berlin 1958"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[mcu2020]] (formulación contemporánea aplicada a universidades) + Berlin (1958) Two Concepts of Liberty (raíz filosófica)"
  neon_alignment_confidence: 0.9
  neon_methodological_notes: "Fusión NeOn S5 de filosofía política liberal (Berlin) + teoría universitaria contemporánea (MCU Observatory). La aplicación al contexto colombiano (UDFJC) hace doble interpretación: refuta la lectura defensiva de la autonomía y la convierte en palanca constructiva."

concepto_prerequisitos:
  - "[[con-mcu-2020]]"
  - "[[con-constitucion-1991-art-69]]"

applicable_domain: "Interpretación constitucional de la autonomía universitaria + diseño de políticas institucionales con responsabilidad social"
assumptions:
  - "La autonomía universitaria opera dentro del marco del Estado de Derecho"
  - "La libertad positiva NO niega la libertad negativa; la complementa"
breaks_at:
  - "Si se reduce a retórica sin métricas de contribución verificable"

valid_from: "2020-09-16"
valid_to: ""
rol_seleccionado: docente-director
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-autonomia-pos-introduced-mcu2020
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-mcu-2020]]"
    rel_frame: skos
  - rel_id: rel-autonomia-pos-related-funcional
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-autonomia-funcional-instrumental]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Autonomía positiva (MCU 2020) y autonomía funcional instrumental (Const+Ley 30) son complementarias: la primera es ético-política, la segunda es jurídico-institucional"

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - autonomia-positiva
  - mcu-2020
  - berlin-1958
  - m01-corpus
  - audit-v2-2
---


# Autonomía Positiva (MCU 2020)

## Definición operativa

Concepto introducido por la **Magna Charta Universitatum 2020** que extiende la autonomía universitaria de **libertad NEGATIVA** (*freedom from* coercion) a **libertad POSITIVA** (*freedom to* contribute):

| Tipo libertad | Énfasis | MCU |
|---|---|---|
| **Negativa** | Ausencia de interferencia externa | MCU 1988 |
| **Positiva** | **Capacidad activa de contribuir** a sostenibilidad + comunidades | MCU 2020 |

> Raíz filosófica: Isaiah Berlin (1958), *Two Concepts of Liberty*.

## Aplicación al contexto UDFJC

| Lectura defensiva (incorrecta) | Lectura constructiva (correcta MCU 2020) |
|---|---|
| "Tengo autonomía → no me obligan políticas CTI" | "Tengo autonomía → puedo reformarme sin esperar al Congreso; Ley 30 Art. 6 me obliga a hacerlo" |
| Libertad NEGATIVA | Libertad POSITIVA |

## Lenguaje ubicuo asociado

Autonomía positiva · Libertad para contribuir · Berlin 1958 · MCU 2020 · Responsabilidad universitaria · Autonomía con responsabilidad.

## Notas de aplicación

- **Cuándo invocarla**: para refutar lecturas defensivas de la autonomía universitaria.
- **Conexión M01**: §2.2 + §5.3 desarrollan la paradoja de la autonomía instrumentalizada.
- **Complementariedad**: autonomía positiva (ético-política, MCU 2020) + [[con-autonomia-funcional-instrumental|autonomía funcional instrumental]] (jurídico-institucional, Const+Ley 30) operan integradas.
