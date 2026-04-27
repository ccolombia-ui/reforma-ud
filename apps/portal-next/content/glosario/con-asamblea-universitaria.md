---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:asamblea-universitaria
kd_title: "Asamblea Universitaria UDFJC (Arts. 45-48 ACU-004-25) — máximo órgano de participación"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-04, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Asamblea Universitaria UDFJC"

skos_prefLabel: "Asamblea Universitaria UDFJC"
skos_altLabel: ["Asamblea UDFJC", "University Assembly", "AU UDFJC"]
skos_hiddenLabel: ["asamblea-universitaria", "asamblea ud"]
skos_definition: "Máximo órgano de participación democrática de la Comunidad Universitaria UDFJC, creado en el ACU-004-25 (Arts. 45-48) sin precedente en el Acuerdo CSU 003/1997. Está integrado por 105 miembros distribuidos por estamento: 40 docentes, 40 estudiantes, 15 egresados y 10 administrativos, todos con voto. Sesiona ordinariamente cada dos años y extraordinariamente cuando se convoque. Sus competencias incluyen: proponer políticas institucionales de mediano y largo plazo; deliberar sobre la marcha de la reforma; proponer al CSU reformas estatutarias; emitir conceptos sobre asuntos de interés institucional. NO sustituye al CSU pero sí es el espacio deliberativo más amplio de la institución."
skos_scopeNote: "Es uno de los mecanismos institucionales más novedosos del ACU-004-25: introduce participación democrática deliberativa de masa (105 miembros) que no existía formalmente antes. La frecuencia bianual hace que entre sesiones la deliberación se sostiene por Claustros, Consejos de Participación y Consejo Estudiantil. La AU NO ejerce funciones ejecutivas — es órgano consultivo deliberativo de máxima legitimidad democrática."
skos_example: "La primera Asamblea Universitaria UDFJC bajo el nuevo Estatuto debería sesionar dentro de los 24 meses posteriores a 2025-05-05 (vencimiento aprox. 2027-05-05). Su agenda probable incluiría evaluación del avance de los 7 estatutos derivados Art. 98 y proposición de ajustes."
skos_notation: "AU"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de máxima participación democrática institucional universitaria"
iso_differentia: "105 miembros (40+40+15+10) con voto pleno; sesiona bianualmente; función deliberativa-propositiva (no ejecutiva); concepto refundacional sin precedente en Acuerdo 003/1997"
iso_subject_field: "Gobernanza universitaria democrática / Participación universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 45-48"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.95
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 45-48 (composición 105 miembros, sesiones bianuales, funciones)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Sus conceptos y propuestas son insumo deliberativo vinculante para CSU y CACAD; NO sustituyen sus competencias ejecutivas pero crean obligación de respuesta motivada"
  norm_supersedes: "Concepto NUEVO en ACU-004-25; sin precedente en Acuerdo CSU 003/1997"

concepto_facet_ddd:
  ddd_id: "asamblea_universitaria"
  ddd_aggregate_root: "AsambleaUniversitaria"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Participación Democrática. Encapsula composición 105 miembros con identidad por estamento + Sesiones como Entities con orden del día y conceptos emitidos."
  ddd_invariants:
    - "La AU debe tener exactamente 105 miembros (40 docentes + 40 estudiantes + 15 egresados + 10 administrativos)"
    - "Todos los miembros tienen voto pleno (sin asimetrías)"
    - "Las sesiones ordinarias son cada 2 años; las extraordinarias por convocatoria"
    - "Sus conceptos son deliberativos-propositivos, no ejecutivos"
    - "La AU NO sustituye al CSU; sus propuestas requieren tramitación posterior por CSU/CACAD"
  ddd_ubiquitous_terms:
    - "Asamblea Universitaria"
    - "AU"
    - "Sesión ordinaria bianual"
    - "Sesión extraordinaria"
    - "Concepto deliberativo"
    - "Reforma estatutaria propuesta"

applicable_domain: "UDFJC, vigente desde 2025-05-06; primera sesión ordinaria estimada antes de 2027-05-05."
assumptions:
  - "La distribución 40-40-15-10 refleja un balance equitativo entre estamentos"
  - "Los procesos electorales internos de cada estamento producen representantes legítimos"
breaks_at:
  - "Si la primera AU no sesiona dentro de los 2 años posteriores a la promulgación del Estatuto"
  - "Si se altera la composición sin reforma estatutaria"
extends_to: "[[con-claustro-general-docente]] · [[con-consejo-estudiantil-universitario]] (deliberación entre sesiones bianuales)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-au-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-au-representa-comunidad
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-comunidad-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "AU = representación deliberativa máxima de la Comunidad Universitaria"
  - rel_id: rel-au-propone-csu
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-csu-consejo-superior-universitario]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las propuestas AU se elevan al CSU para tramitación"
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-au-brecha-pendiente-m01
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "M01 §5.1 documenta brecha verificada: Asamblea Universitaria PENDIENTE de constituirse a 2026-04-26 — riesgo crítico para legitimidad democrática de la implementación"
  - rel_id: rel-au-materializa-autonomia-positiva
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-autonomia-positiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "AU es dispositivo institucional para ejercer autonomía positiva (libertad PARA contribuir) mediante deliberación democrática vinculante"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, refundacional, asamblea-universitaria, participacion-democratica, arts-45-48, m00-base, concepto-nuevo, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# Asamblea Universitaria UDFJC (Arts. 45-48 ACU-004-25)

> [!important]+ 🏛️ Concepto refundacional · participación democrática deliberativa de masa
> La Asamblea Universitaria es **uno de los mecanismos institucionales más novedosos del ACU-004-25**: introduce participación democrática deliberativa de masa (105 miembros con voto pleno) **sin precedente en el Acuerdo CSU 003/1997**. Es el espacio deliberativo de máxima legitimidad democrática.

## Definición operativa

Máximo órgano de participación democrática de la Comunidad Universitaria UDFJC. Compuesto por **105 miembros** todos con voto pleno:

| Estamento | Miembros | % |
|---|:---:|:---:|
| Docentes | 40 | 38% |
| Estudiantes | 40 | 38% |
| Egresados | 15 | 14% |
| Administrativos | 10 | 10% |
| **Total** | **105** | **100%** |

Sesiona **ordinariamente cada dos años** y extraordinariamente cuando se convoque. Funciones: proponer políticas institucionales de mediano y largo plazo; deliberar sobre la marcha de la reforma; proponer al CSU reformas estatutarias; emitir conceptos sobre asuntos de interés institucional.

## Fuente primaria

> Arts. 45-48 ACU-004-25 (composición 105 miembros, sesiones bianuales, funciones deliberativas-propositivas).

## Invariantes operativas DDD

1. La AU debe tener **exactamente 105 miembros** (40+40+15+10).
2. Todos los miembros tienen **voto pleno** sin asimetrías.
3. **Sesiones ordinarias bianuales**; extraordinarias por convocatoria.
4. Sus conceptos son **deliberativos-propositivos, NO ejecutivos**.
5. **NO sustituye al CSU** — sus propuestas requieren tramitación posterior por CSU/CACAD.

## Lenguaje ubicuo asociado

Asamblea Universitaria · AU · Sesión ordinaria bianual · Sesión extraordinaria · Concepto deliberativo · Reforma estatutaria propuesta · Participación democrática deliberativa.

## Notas de aplicación

- **Cuándo invocarla**: como espacio legítimo para deliberar reformas o evaluar la marcha institucional. Sus conceptos NO obligan jurídicamente al CSU pero crean obligación de respuesta motivada.
- **Riesgo de inactividad**: si la primera AU no sesiona dentro de 2 años desde 2025-05-05, hay incumplimiento del Estatuto.
- **Conexión con el ciclo virtuoso ΩMT** (M02): la AU es activador R5 (egresados como agentes) + R6 (gobernanza democrática) si sesiona efectivamente.
- **Diferencia con CSU**: CSU es órgano de dirección y gobierno (ejecutivo + estatutario); AU es órgano de participación deliberativa (no ejecutivo). NO compiten — se complementan.
