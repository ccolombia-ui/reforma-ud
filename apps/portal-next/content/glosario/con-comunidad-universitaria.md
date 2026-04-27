---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:comunidad-universitaria
kd_title: "Comunidad Universitaria UDFJC (Arts. 8-17 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-04, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Comunidad Universitaria UDFJC"

skos_prefLabel: "Comunidad Universitaria UDFJC"
skos_altLabel: ["Comunidad UDFJC", "Universitarios UDFJC", "University Community"]
skos_hiddenLabel: ["estamentos UD", "comunidad-academica"]
skos_definition: "Conjunto de personas que componen institucionalmente la UDFJC y participan en su acción misional con derechos y deberes correlativos. Está integrada por cuatro estamentos primarios —docentes, estudiantes, egresados y personal administrativo— a los que se suma el sector productivo en ciertos espacios consultivos. Cada estamento tiene representación democrática en los órganos de gobierno (CSU, CACAD, Asamblea Universitaria, Consejos de Escuela, Claustros) según ponderaciones específicas establecidas en el Acuerdo. Sus derechos y deberes se desarrollan en los Arts. 8-17 del ACU-004-25."
skos_scopeNote: "El concepto NO es meramente administrativo (lista de personas en nómina + lista de matrícula) sino constitutivo: la Comunidad Universitaria es el sujeto colectivo de la autonomía universitaria del Art. 5b. Sus decisiones colectivas, mediadas por órganos democráticos, son la fuente legítima del autogobierno universitario."
skos_example: "La Asamblea Universitaria (Art. 45-48), con 105 miembros (40 docentes + 40 estudiantes + 15 egresados + 10 administrativos), es la materialización institucional más completa de la Comunidad Universitaria como sujeto deliberativo."
skos_notation: "Comunidad UDFJC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sujeto colectivo institucional con derechos políticos universitarios"
iso_differentia: "Compuesta por 4 estamentos primarios (docentes, estudiantes, egresados, administrativos) + sector productivo en ciertos espacios; con representación democrática ponderada en órganos de gobierno"
iso_subject_field: "Gobernanza universitaria / Derecho político universitario / Sociología de la educación"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 8-17"

align_schema_type: Organization
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 8-17 (estamentos, derechos, deberes)"
  norm_jurisdiction: "Consejo Superior Universitario UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Reconocimiento de membresía + derechos + deberes correlativos para cada miembro de los estamentos"

concepto_facet_ddd:
  ddd_id: "comunidad_universitaria"
  ddd_aggregate_root: "ComunidadUniversitaria"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del bounded context Gobierno Académico que agrupa Estamentos como Entities. Cada Estamento contiene Personas con identidad propia (Docente, Estudiante, Egresado, Administrativo)."
  ddd_invariants:
    - "Toda persona que pertenezca a la Comunidad Universitaria está adscrita a UN Estamento primario"
    - "Cada Estamento tiene representación democrática garantizada en órganos de gobierno"
    - "Los derechos y deberes son correlativos (no se pueden ejercer derechos sin asumir deberes)"
    - "El sector productivo participa en espacios consultivos limitados (no es estamento primario)"
  ddd_ubiquitous_terms:
    - "Comunidad Universitaria"
    - "Estamentos"
    - "Docentes · Estudiantes · Egresados · Administrativos"
    - "Sector productivo"
    - "Representación democrática"
    - "Derechos y deberes correlativos"

applicable_domain: "Toda persona vinculada institucionalmente a la UDFJC bajo modalidades reconocidas (matrícula, nómina, contrato, calidad de egresado)."
assumptions:
  - "El reconocimiento de estamentos es operacionalizable vía registros institucionales (SNIES estudiantes, nómina docentes, base de egresados)"
breaks_at:
  - "Si la institución pierde su carácter público (improbable)"
  - "Si se reforma vía nuevo Acuerdo CSU"
extends_to: "[[con-asamblea-universitaria]] (representación deliberativa máxima)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": Organization

tupla__relations:
  - rel_id: rel-comunidad-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-comunidad-representada-asamblea
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-asamblea-universitaria]]"
    rel_frame: skos
    bc_domain: gobernanza
    rel_propiedades:
      skos_evidence: "Asamblea Universitaria es la representación deliberativa máxima de la Comunidad Universitaria"
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-comunidad-afectada-rt6
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RT6 (resistencia al cambio no gestionada) afecta directamente la apropiación de la reforma por los estamentos. Mitigación crítica: comunicación + capacitación dirigidas a Comunidad Universitaria (M01 §5.2)"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-04--jtbd-comunidad]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, comunidad-universitaria, estamentos, arts-8-17, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Comunidad Universitaria UDFJC (Arts. 8-17 ACU-004-25)

## Definición operativa

Conjunto de personas que componen institucionalmente la UDFJC y participan en su acción misional con derechos y deberes correlativos. Es el **sujeto colectivo** de la autonomía universitaria del Art. 5b. Está integrada por cuatro estamentos primarios + sector productivo en ciertos espacios:

| # | Estamento | Modalidad de vinculación | Representación en órganos |
|:-:|---|---|---|
| 1 | **Docentes** | Nómina académica | CSU, CACAD, Asamblea (40), Claustros, Consejos de Escuela |
| 2 | **Estudiantes** | Matrícula vigente | CSU, CACAD, Asamblea (40), Consejo Estudiantil |
| 3 | **Egresados** | Calidad de egresado | CSU, CACAD, Asamblea (15), Comisiones |
| 4 | **Personal Administrativo** | Nómina administrativa | CSU, Asamblea (10) |
| (5) | *Sector productivo* | Espacios consultivos | CSU (en ciertos espacios) — NO es estamento primario |

## Fuente primaria

> Arts. 8-17 ACU-004-25: regulación detallada de cada estamento, sus derechos y deberes correlativos, y los mecanismos de representación democrática en los órganos de gobierno.

## Invariantes operativas DDD

1. Toda persona en la Comunidad Universitaria está adscrita a **UN** Estamento primario.
2. Cada Estamento tiene **representación democrática garantizada** en los órganos de gobierno.
3. Los derechos y deberes son **correlativos** (no separables).
4. El sector productivo participa en espacios consultivos limitados (no es estamento primario con voto deliberativo pleno).

## Lenguaje ubicuo asociado

Comunidad Universitaria · Estamentos · Docentes · Estudiantes · Egresados · Personal Administrativo · Sector productivo · Representación democrática · Derechos y deberes correlativos.

## Notas de aplicación

- **Cuándo invocarla**: para verificar legitimidad democrática de decisiones institucionales (¿están representados todos los estamentos?).
- **NO confundir con M04 JTBD 6 roles**: M04 desagrega el estamento docente en 4 roles JTBD (Docente Diseñador, Formador, Investigador, Emprendedor) + Director, agregándose al Estudiante. Los 6 roles JTBD son una desagregación analítica del estamento docente; los 4 estamentos del Art. 8-17 son la categorización jurídico-política.
