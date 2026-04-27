---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:centro
kd_title: "Centro UDFJC (Arts. 78-81 ACU-004-25) — unidad de contextos-extensión-proyección social"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04]

tupla_tipo: DEFINITION
tupla_concepto: "Centro UDFJC"

skos_prefLabel: "Centro UDFJC"
skos_altLabel: ["Center UDFJC", "Centro de Extensión-Proyección Social"]
skos_hiddenLabel: ["centro"]
skos_definition: "Unidad académico-administrativa UDFJC reformada responsable del desarrollo de actividades de contextos · extensión y proyección social (PM3). Adscrita a la Vicerrectoría de Contextos-Extensión-Proyección Social (VRC). Articula proyectos territoriales, contratos con entidades públicas y privadas, proyección comunitaria, alianzas con organizaciones sociales y diálogo simétrico con saberes locales. Coexiste con Escuelas e Institutos como Aggregate Root paralelo. Cada Centro tiene Director electo (durante transición Art. 107: designado por rector)."
skos_scopeNote: "Los Centros son la materialización institucional del giro 'Contextos antes que Extensión' del ACU-004-25. NO son sucursales de la universidad en territorios — son **espacios de diálogo simétrico** universidad-territorio con identidad propia. Contienen tanto programas de extensión convencional (consultoría, obras, contratos) como proyectos de proyección social comunitaria."
skos_example: "El 'Centro de Energías Comunitarias' opera proyectos PM3 con JACs de Cundinamarca para diseñar microgrids comunales (Track B BPA-003). Articula con Escuelas de Física e Ingeniería Eléctrica (PM1+PM2) y con CABAs como 'Soberanía Energética Comunitaria'."
skos_notation: "Centro"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad académico-administrativa universitaria de extensión-proyección social"
iso_differentia: "Adscrita a VRC; opera campo PM3; privilegia diálogo simétrico con territorios; coexiste con Escuelas e Institutos como Aggregate Root paralelo"
iso_subject_field: "Estructura de extensión universitaria / Diálogo universidad-territorio"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 78-81"

align_schema_type: Organization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.5

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 78-81 (Centros, dirección, articulación)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda creación o reforma de Centro UDFJC"

concepto_facet_ddd:
  ddd_id: "centro"
  ddd_aggregate_root: "Centro"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root subdominio Contextos-Extensión-Proyección Social (PM3). Coexiste con Escuelas e Institutos paralelo."
  ddd_invariants:
    - "Adscrito a VRC"
    - "Privilegia diálogo simétrico con territorios"
    - "Director electo (modalidad por reglamentar)"
    - "Articula con Escuelas e Institutos vía CABAs cuando aplica"
  ddd_ubiquitous_terms:
    - "Centro"
    - "Director(a) de Centro"
    - "Contextos-Extensión-Proyección Social"
    - "Diálogo universidad-territorio"

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva en Período de Transición"
assumptions: ["Existen alianzas territoriales y contractuales activas para anclar Centros"]
breaks_at: []
extends_to: "[[con-vicerrectoria-contextos-extension]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Organization

tupla__relations:
  - rel_id: rel-centro-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-centro-coordinado-vrc
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-contextos-extension]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, centro, contextos-extension-proyeccion, arts-78-81, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Centro UDFJC (Arts. 78-81 ACU-004-25)

## Definición operativa

Unidad académico-administrativa UDFJC reformada responsable del desarrollo de actividades de **contextos · extensión y proyección social (PM3)**. Adscrita a la VRC. Articula proyectos territoriales, contratos públicos/privados, proyección comunitaria, alianzas con organizaciones sociales y **diálogo simétrico con saberes locales**.

## Fuente primaria

> Arts. 78-81 ACU-004-25.

## Invariantes operativas DDD

1. Adscrito a **VRC**.
2. **Privilegia diálogo simétrico** con territorios (no transferencia unidireccional).
3. **Director electo** (modalidad por reglamentar; transición Art. 107 designado por rector).
4. **Articula** con Escuelas e Institutos vía CABAs cuando aplica.

## Lenguaje ubicuo asociado

Centro · Director(a) de Centro · Contextos-Extensión-Proyección Social · Diálogo universidad-territorio.

## Notas de aplicación

- Los Centros NO son sucursales — son **espacios de diálogo simétrico** universidad-territorio con identidad propia.
- Contienen extensión convencional (consultoría, obras, contratos) **+** proyección social comunitaria.
