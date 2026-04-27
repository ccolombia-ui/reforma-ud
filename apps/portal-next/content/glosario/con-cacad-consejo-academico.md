---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cacad-consejo-academico
kd_title: "CACAD — Consejo Académico UDFJC (Arts. 30-32 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01]

tupla_tipo: DEFINITION
tupla_concepto: "Consejo Académico UDFJC"

skos_prefLabel: "Consejo Académico (CACAD)"
skos_altLabel: ["CACAD UDFJC", "Consejo Académico UDFJC", "Academic Council"]
skos_hiddenLabel: ["consejo-academico", "cacad"]
skos_definition: "Máxima autoridad académica de la UDFJC. Decide el desarrollo académico institucional, diseña políticas docentes y curriculares, aprueba currículos y nuevos programas académicos, y propone al CSU las reformas académicas estructurales. Está integrado por el rector(a) (presidencia), vicerrectores temáticos, representantes de docentes y de estudiantes elegidos democráticamente, y representante de egresados. Sus actos administrativos (resoluciones académicas) son de máxima jerarquía en materia académica, sin perjuicio de la potestad superior del CSU para Acuerdos generales."
skos_scopeNote: "El CACAD complementa al CSU: el CSU dirige y gobierna (jurídicamente y políticamente); el CACAD decide la sustancia académica. Sin embargo, las propuestas académicas del CACAD que requieran reforma estatutaria deben elevarse al CSU. La línea divisoria es: si afecta el Estatuto (norma de norma), va al CSU; si es académicamente operativo, lo decide el CACAD."
skos_example: "Aprobación de un nuevo Programa Académico de pregrado: lo decide el CACAD vía resolución académica, salvo que requiera reforma estatutaria (en cuyo caso se eleva al CSU)."
skos_notation: "CACAD"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de máxima autoridad académica universitaria"
iso_differentia: "Decide sustancia académica (currículos, programas, políticas docentes); preside el rector(a); integrado por vicerrectores + representantes electos"
iso_subject_field: "Gobernanza académica universitaria / Política académica institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 30-32"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 30-32 (composición, funciones, sesiones)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Resoluciones académicas máxima jerarquía en materia académica institucional"

concepto_facet_ddd:
  ddd_id: "cacad"
  ddd_aggregate_root: "ConsejoAcademico"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio académico dentro del BC Gobierno Académico. Encapsula decisiones académicas (currículos, programas, políticas docentes) sin invadir competencias del CSU sobre el Estatuto."
  ddd_invariants:
    - "El rector(a) preside el CACAD"
    - "Las decisiones académicas son resoluciones numeradas y fechadas"
    - "Las propuestas que requieran reforma estatutaria se elevan al CSU"
    - "Los representantes docente y estudiantil tienen voto pleno"
  ddd_ubiquitous_terms:
    - "CACAD"
    - "Resolución Académica"
    - "Vicerrectores temáticos"
    - "Política docente"
    - "Aprobación de programa académico"

applicable_domain: "Decisiones de sustancia académica UDFJC: currículos, programas, políticas docentes, calendarios académicos, criterios de admisión y graduación."
assumptions:
  - "La separación CSU (estatutaria) vs CACAD (académica) se respeta operativamente"
breaks_at:
  - "Si una decisión académica requiere reforma estatutaria sin elevarse al CSU"
extends_to: "[[con-csu-consejo-superior-universitario]] (instancia superior para temas estatutarios)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-cacad-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-cacad-related-csu
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-csu-consejo-superior-universitario]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "CSU autoridad estatutaria; CACAD autoridad académica; complementarios"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, cacad, autoridad-academica, arts-30-32, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# CACAD — Consejo Académico (Arts. 30-32 ACU-004-25)

## Definición operativa

**Máxima autoridad académica** UDFJC. Decide currículos, programas académicos, políticas docentes y calendarios académicos. Está presidido por el rector(a). Sus resoluciones son la fuente normativa interna de máxima jerarquía **en materia académica**, complementaria a los Acuerdos del CSU.

| Miembro | Voto |
|---|:---:|
| Rector(a) — presidencia | ✅ (decisorio en empates) |
| Vicerrectoras/es temáticas/os (Formación, Investigación-Creación-Innovación, Contextos) | ✅ |
| Representante docentes (electo) | ✅ |
| Representante estudiantes (electo) | ✅ |
| Representante egresados | ✅ |

## Fuente primaria

> Arts. 30-32 ACU-004-25 (composición, funciones, sesiones).

## Invariantes operativas DDD

1. El **rector(a) preside** el CACAD.
2. Resoluciones académicas **numeradas y fechadas** para trazabilidad.
3. Si una decisión requiere **reforma estatutaria**, se eleva al CSU (no la decide el CACAD).
4. Representantes docente y estudiantil tienen **voto pleno**.

## Lenguaje ubicuo asociado

CACAD · Resolución Académica · Vicerrectores temáticos · Política docente · Aprobación de programa · Calendario académico.

## Notas de aplicación

- **Cuándo citarlo**: como fuente de Resoluciones Académicas (número/año) que aprueban programas, modificaciones curriculares o políticas docentes.
- **Línea divisoria con CSU**: si la decisión académica requiere reforma del Estatuto (Art. 5, Art. 7, Arts. 58-90), debe elevarse al CSU. Si es operacional dentro del marco estatutario vigente, lo decide el CACAD.
