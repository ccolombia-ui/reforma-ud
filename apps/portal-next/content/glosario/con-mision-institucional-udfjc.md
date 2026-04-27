---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:mision-institucional-udfjc
kd_title: "Misión institucional UDFJC (Art. 4 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Misión institucional UDFJC"

skos_prefLabel: "Misión institucional UDFJC"
skos_altLabel:
  - "Misión UDFJC"
  - "Mission of Universidad Distrital"
skos_hiddenLabel: ["mision UD", "vision-mision UD"]
skos_definition: "Razón de ser declarada de la UDFJC: apropiar saberes, producir conocimiento, formar integralmente a las nuevas generaciones y propugnar por la transformación de la sociedad y la cultura hacia la vida digna, bajo principios colectivos de convivencia, paz, equidad, inclusión social, no discriminación, buen vivir y defensa del medio ambiente, en la ciudad región de Bogotá D.C., el territorio nacional, con perspectiva global."
skos_scopeNote: "La misión enmarca toda la acción institucional. Cualquier programa académico, proyecto de investigación, contrato de extensión o decisión de gobernanza debe poder justificarse como contribuyente a esta misión. El carácter 'institución pública' es vinculante (no se puede privatizar el interés público)."
skos_example: "Un proyecto de investigación PM2 que desarrolle conocimiento sobre soberanía energética para una comunidad rural alinea con la misión UDFJC porque combina apropiación de saberes (V1) + producción de conocimiento (V2) + transformación social hacia vida digna (V3 con dimensión Buen Vivir)."
skos_notation: "Misión UDFJC"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Declaración de razón de ser institucional pública"
iso_differentia: "Articula apropiación de saberes + producción de conocimiento + formación integral + transformación social hacia vida digna, con perspectiva local-nacional-global"
iso_subject_field: "Gobernanza universitaria / Filosofía institucional / Educación pública"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 4"

align_schema_type: DefinedTerm
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.9
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 4 (Misión)"
  norm_jurisdiction: "Consejo Superior Universitario UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Marco vinculante para todo programa, proyecto, contrato y decisión institucional"
  norm_supersedes: "Misión declarada en Acuerdo CSU 003/1997 (versión previa)"

applicable_domain: "UDFJC, vigente desde 2025-05-06; criterio de validez de cualquier propuesta institucional."
assumptions:
  - "La UDFJC mantiene su carácter público distrital"
  - "El concepto de 'vida digna' se interpreta progresivamente según consensos sociales"
breaks_at:
  - "Si la UDFJC perdiera su carácter público (improbable)"
  - "Si se reformara la misión vía nuevo Acuerdo CSU"
extends_to: "[[con-funciones-misionales]] (operacionalización mediante PM1-PM2-PM3)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-mision-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: gobernanza-udfjc
    rel_propiedades:
      norm_evidence: "Texto literal Art. 4 ACU-004-25"
  - rel_id: rel-mision-articula-buen-vivir
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-buen-vivir]]"
    rel_frame: skos
    bc_domain: filosofia-institucional
    rel_propiedades:
      skos_evidence: "La misión cita explícitamente 'buen vivir' como uno de los principios colectivos"
  - rel_id: rel-mision-operacionalizada-funciones
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: skos
    bc_domain: gobernanza-udfjc
    rel_propiedades:
      skos_evidence: "Las 3 funciones misionales (Art. 7) operacionalizan la misión del Art. 4"
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-mision-implements-art6
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-ley-30-1992-art-6]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "La misión 'apropia saberes / produce conocimiento / forma integralmente / propugna transformación social' materializa el deber del Art. 6 Ley 30/1992 'solucionar las necesidades del país'"
  - rel_id: rel-mision-aligns-mcu2020
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mcu-2020]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La misión expresa autonomía positiva MCU 2020: libertad PARA contribuir a transformación social y sostenibilidad"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags: [glosario-universal, concepto-normativo, mision, art-4, identidad-institucional, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Misión institucional UDFJC (Art. 4 ACU-004-25)

## Definición operativa

La razón de ser declarada de la UDFJC: como institución pública de educación superior, **apropia saberes**, **produce conocimiento**, **forma integralmente** a las nuevas generaciones y **propugna por la transformación de la sociedad y la cultura hacia la vida digna**, bajo principios colectivos de convivencia, paz, equidad, inclusión social y no discriminación, buen vivir y defensa del medio ambiente, en la ciudad región de Bogotá D.C., el territorio nacional, con perspectiva global.

## Fuente primaria (cita textual)

> "La Universidad Distrital Francisco José de Caldas, como institución pública de educación superior, apropia saberes, produce conocimiento, forma integralmente a las nuevas generaciones y propugna, en tal calidad, por la transformación de la sociedad y la cultura hacia la vida digna, bajo los principios colectivos de convivencia, de paz, de equidad, de inclusión social y no discriminación, del buen vivir y de la defensa del medio ambiente, en la ciudad región de Bogotá, D. C., y en el territorio nacional, con perspectiva global." — **ACU-004-25 Art. 4**.

## Estructura de la misión (4 verbos misionales + 3 horizontes geográficos + 6 principios colectivos)

| Componente | Detalle |
|---|---|
| **Verbos misionales** | (1) Apropia saberes · (2) Produce conocimiento · (3) Forma integralmente · (4) Propugna transformación social |
| **Horizontes geográficos** | (1) Ciudad región Bogotá D.C. · (2) Territorio nacional · (3) Perspectiva global |
| **Principios colectivos** | (1) Convivencia · (2) Paz · (3) Equidad · (4) Inclusión social y no discriminación · (5) Buen vivir · (6) Defensa del medio ambiente |
| **Telos** | "Vida digna" como horizonte transformativo |

## Lenguaje ubicuo asociado

Misión UDFJC · Apropiación de saberes · Producción de conocimiento · Formación integral · Transformación social · Vida digna · Buen vivir · Inclusión social · Equidad · Perspectiva global.

## Notas de aplicación

- **Cuándo invocarla**: como criterio de validez de cualquier nuevo programa, proyecto o contrato. Si una propuesta no se puede justificar como contribuyente a uno o más verbos misionales, debe replantearse.
- **Reconciliación con M01-M12**: la misión es la **función objetivo** del ciclo virtuoso ΩMT (M02), de las 21 BPAs (M07) y del roadmap 2026-2034 (M12). Cualquier indicador BMK-001/BMK-002 debe poder trazarse a un componente misional.
