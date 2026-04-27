---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:plan-implementacion
kd_title: "Plan de Implementación de la Reforma UDFJC (Art. 98 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Plan de Implementación UDFJC"

skos_prefLabel: "Plan de Implementación de la Reforma"
skos_altLabel: ["Plan de Implementación", "Implementation Plan"]
skos_hiddenLabel: ["plan-implementacion", "plan implementacion"]
skos_definition: "Documento institucional que el Consejo Superior Universitario debe presentar dentro de los 45 días siguientes a la publicación del ACU-004-25 (vencimiento legal 2025-06-19) y que detalla: (a) la conformación de la nueva estructura académico-administrativa; (b) el plazo y el cronograma de expedición de los 7 estatutos derivados (Art. 98 §1-§7); (c) los órganos de participación y procesos electorales; (d) el Sistema de Bienestar y Buen Vivir; (e) el régimen de transitoriedad de unidades existentes. Es la pieza estratégica que hace posible la implementación coherente del Período de Transición (Art. 96)."
skos_scopeNote: "El Plan de Implementación NO es opcional — es una obligación legal con plazo definido (45 días desde publicación). Su ausencia o incumplimiento constituye infracción al Art. 98. Verificar su expedición y publicación en SISGRAL es el primer hito de auditoría institucional."
skos_example: "Un Plan de Implementación bien elaborado debe incluir Gantt detallado por hito, asignación de responsables (CSU, Rectoría, Vicerrectorías), presupuesto estimado, métricas de avance trimestral y mecanismos de rendición de cuentas a la Comunidad Universitaria."
skos_notation: "PI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Documento institucional estratégico de implementación de reforma estatutaria"
iso_differentia: "Plazo legal 45 días desde publicación ACU-004-25; contenido mínimo definido por Art. 98; obligatorio + auditable"
iso_subject_field: "Implementación de reforma estatutaria universitaria / Planificación institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 98"

align_schema_type: DefinedTerm
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 98 (Plan de Implementación + 7 estatutos derivados)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "CSU debe aprobar el Plan dentro de 45 días desde publicación"

applicable_domain: "UDFJC desde 2025-05-06; ejecución durante Período de Transición"
assumptions:
  - "El Plan se elabora con participación de CSU + Rectoría + Vicerrectorías + estamentos"
breaks_at:
  - "Si no se expide en plazo legal (vencido 2025-06-19)"
  - "Si carece de cronograma verificable y rendición de cuentas"
extends_to: "[[con-periodo-transicion]] · [[con-vigencia-transitoria-estatutos-previos]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-pi-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags: [glosario-universal, concepto-normativo, plan-implementacion, art-98, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Plan de Implementación de la Reforma (Art. 98 ACU-004-25)

## Definición operativa

Documento institucional que el CSU debe presentar **dentro de los 45 días** siguientes a la publicación del ACU-004-25 (vencimiento legal **2025-06-19**). Contenido mínimo:

| Componente | Detalle |
|---|---|
| (a) Estructura | Conformación nueva estructura académico-administrativa |
| (b) Estatutos derivados | Plazo y cronograma de los 7 estatutos (Art. 98 §1-§7) |
| (c) Participación | Órganos electos + procesos electorales |
| (d) Bienestar | Sistema de Bienestar y Buen Vivir |
| (e) Transitoriedad | Régimen de unidades existentes |

## Fuente primaria

> Art. 98 ACU-004-25.

## Notas de aplicación

- **Obligación legal**: NO es opcional.
- **Vencimiento**: 2025-06-19 (verificar en SISGRAL).
- **Auditable**: contenido mínimo definido + rendición de cuentas.
