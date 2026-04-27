---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:instituto
kd_title: "Instituto UDFJC (Arts. 74-77 ACU-004-25) — unidad de investigación-creación-innovación interdisciplinar"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04, sec-MI12-05]

tupla_tipo: DEFINITION
tupla_concepto: "Instituto UDFJC"

skos_prefLabel: "Instituto UDFJC"
skos_altLabel: ["Institute UDFJC", "Instituto de Investigación-Creación-Innovación"]
skos_hiddenLabel: ["instituto"]
skos_definition: "Unidad académico-administrativa UDFJC reformada que desarrolla actividades de investigación-creación e innovación, así como de divulgación, con carácter interdisciplinario y transdisciplinario. Adscrita a la Vicerrectoría de Investigación-Creación e Innovación (VRICI). Para su creación requiere mínimo TRES grupos de investigación reconocidos en MinCiencias. Coexiste con Escuelas (no jerárquicamente) y articula líneas investigativas transversales a múltiples campos del conocimiento-saber."
skos_scopeNote: "Los Institutos NO son sustitutos de los grupos de investigación — los integran. La distinción crítica: grupo Minciencias = unidad de productividad investigativa con líneas específicas; Instituto = unidad organizativa institucional que agrega ≥3 grupos para una estrategia institucional integrada. El Instituto también incluye 'creación' (artes) y 'innovación' (transferencia tecnológica + emprendimiento), no solo 'investigación' tradicional."
skos_example: "El 'Instituto de Energías y Sostenibilidad' agrupa 4 grupos Minciencias (Energías Renovables COL-A1, Sistemas de Potencia COL-B, Sostenibilidad Comunitaria COL-A, Innovación en Microgrid COL-B) de las Escuelas de Física, Ingeniería Eléctrica y Estudios Comunitarios."
skos_notation: "Instituto"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad académico-administrativa universitaria de investigación-creación-innovación"
iso_differentia: "Carácter interdisciplinario y transdisciplinario; mínimo 3 grupos Minciencias reconocidos; adscrita a VRICI"
iso_subject_field: "Estructura investigativa universitaria / Política científica institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 74-77"

align_schema_type: ResearchOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 74-77 (Institutos, requisito 3 grupos, dirección, articulación)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda creación o reforma de Instituto UDFJC"

concepto_facet_ddd:
  ddd_id: "instituto"
  ddd_aggregate_root: "Instituto"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Investigación-Creación-Innovación. Agrupa grupos Minciencias como Entities."
  ddd_invariants:
    - "Un Instituto requiere mínimo 3 grupos de investigación reconocidos por MinCiencias"
    - "Carácter interdisciplinario y transdisciplinario obligatorio"
    - "Adscrito a VRICI"
    - "Coexiste con Escuelas sin jerarquizarlas"
    - "Director electo (modalidad por reglamentar) durante transición Art. 107 designado por rector"
  ddd_ubiquitous_terms:
    - "Instituto"
    - "Director(a) de Instituto"
    - "Grupo de investigación Minciencias"
    - "Interdisciplinariedad"
    - "Transdisciplinariedad"

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva en Período de Transición Art. 96"
assumptions: ["Existen grupos Minciencias institucionalmente reconocidos disponibles para integrarse"]
breaks_at: ["Si un Instituto se crea con menos de 3 grupos (incumple Art. 74)"]
extends_to: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": ResearchOrganization

tupla__relations:
  - rel_id: rel-instituto-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-instituto-coordinado-vrici
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, instituto, investigacion-creacion-innovacion, arts-74-77, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Instituto UDFJC (Arts. 74-77 ACU-004-25)

## Definición operativa

Unidad académico-administrativa UDFJC reformada que desarrolla actividades de **investigación-creación e innovación**, así como de **divulgación**, con carácter **interdisciplinario y transdisciplinario**. Adscrita a la Vicerrectoría de Investigación-Creación e Innovación (VRICI). Requisito de creación: **mínimo 3 grupos de investigación reconocidos en MinCiencias**.

## Fuente primaria

> Arts. 74-77 ACU-004-25.

## Invariantes operativas DDD

1. **Mínimo 3 grupos Minciencias** reconocidos.
2. Carácter **interdisciplinario y transdisciplinario** obligatorio.
3. Adscrito a **VRICI**.
4. **Coexiste con Escuelas** sin jerarquizarlas.
5. Director electo (durante transición Art. 107: designado por rector hasta 2027-05-05).

## Lenguaje ubicuo asociado

Instituto · Director(a) de Instituto · Grupo de investigación Minciencias · Interdisciplinariedad · Transdisciplinariedad.

## Notas de aplicación

- **Diferencia con grupo Minciencias**: grupo = unidad de productividad investigativa con líneas específicas; Instituto = unidad organizativa institucional que agrega ≥3 grupos.
- **Inclusión de creación + innovación**: NO solo investigación tradicional — también artes y transferencia tecnológica.
