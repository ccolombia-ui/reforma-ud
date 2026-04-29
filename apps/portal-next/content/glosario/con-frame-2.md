---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:frame-2
kd_title: "Frame 2 — Sistemas de Innovación (Schot & Steinmueller, 2018)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Frame 2 — Sistemas de Innovación"

skos_prefLabel: "Frame 2 — Sistemas de Innovación"
skos_altLabel: ["Innovation Systems Approach", "NIS", "Triple Helix Frame", "Política CTI Frame 2"]
skos_definition: "Segundo marco conceptual de política de innovación dominante 1980s-2010s. Reemplaza el modelo lineal Frame 1 con enfoque sistémico: la innovación emerge de la interacción entre actores (universidad-industria-gobierno = Triple Hélice de Etzkowitz-Leydesdorff 1995). Su pregunta rectora es '¿cómo conectar actores?'. Mide éxito en redes, clústeres regionales, transferencia tecnológica y capital social del ecosistema. Asume que mejorando las conexiones se producen externalidades positivas — pero NO cuestiona la dirección del crecimiento económico subyacente."
skos_scopeNote: "Frame 2 representa un avance sobre Frame 1 al reconocer que la innovación es interactiva, no lineal. Sin embargo su limitación crítica es que asume crecimiento económico como fin natural sin cuestionar SI el tipo de crecimiento generado es deseable. Frame 3 supera esta omisión añadiendo direccionalidad transformativa explícita."
skos_example: "Indicadores típicos Frame 2: # convenios universidad-empresa, # spin-offs creados, índice triple hélice regional, transferencia tecnológica, parques tecnológicos. UDFJC produce datos Frame 2 vía CIDC, contratos de extensión, acuerdos con sector productivo."
skos_notation: "Frame 2"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Marco conceptual histórico-sistémico de política de innovación"
iso_differentia: "Enfoque interactivo entre actores (universidad-industria-gobierno); supera modelo lineal de Frame 1; no incorpora dimensión normativa de direccionalidad"
iso_subject_field: "Política CTI sistémica / Triple Hélice / National Innovation Systems"
iso_term_status: preferred
iso_standardized_by: "Schot & Steinmueller (2018); Etzkowitz & Leydesdorff (1995); Lundvall (1992); Freeman (1987)"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[schot2018frame3]] + [[etzkowitz1995triplehelix]] + Lundvall 1992 + Freeman 1987"
  neon_alignment_confidence: 0.95

applicable_domain: "Análisis de ecosistemas de innovación / clústeres regionales / política CTI 1980s-2010s"
assumptions:
  - "El crecimiento económico es deseable per se"
  - "Mejorar conexiones produce externalidades positivas automáticas"
breaks_at:
  - "No cuestiona la dirección del crecimiento (sostenible vs extractivo)"
  - "Crisis ecológica + desigualdad sistémica refutan la suficiencia de Frame 2"

valid_from: "1985-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-frame2-extends-frame1
    rel_nombre: skos_broader
    rel_direccion: post
    rel_target: "[[con-frame-1]]"
    rel_frame: skos
  - rel_id: rel-frame2-precedes-frame3
    rel_nombre: skos_narrower
    rel_direccion: pre
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
  - rel_id: rel-frame2-related-quintuple-helix
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-quintuple-helix]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - frame-2
  - sistemas-innovacion
  - triple-helix
  - m01-corpus
  - audit-v2-2
---


# Frame 2 — Sistemas de Innovación (Schot & Steinmueller, 2018)

## Definición operativa

Segundo marco conceptual de política de innovación dominante 1980s-2010s. **Enfoque sistémico**: la innovación emerge de la interacción entre actores (universidad-industria-gobierno = Triple Hélice). Pregunta rectora: *"¿cómo conectar actores?"*.

## Fuente primaria

> Schot, J., & Steinmueller, W. E. (2018). Three frames for innovation policy. *Research Policy*, 47(9), 1554-1567.

## Lenguaje ubicuo asociado

Frame 2 · Sistemas de Innovación · NIS · Triple Hélice · Clústeres · Transferencia tecnológica · Etzkowitz-Leydesdorff.

## Notas de aplicación

- **Cuándo invocarlo**: al describir ecosistemas de innovación, redes universidad-empresa, contratos de extensión.
- **Limitación**: no cuestiona la dirección del crecimiento; asume crecimiento económico como fin.
- **Integrado en [[con-frame-3|Frame 3]]**: la conexión de actores sigue siendo necesaria, pero ahora orientada por misiones transformativas (no crecimiento per se).
