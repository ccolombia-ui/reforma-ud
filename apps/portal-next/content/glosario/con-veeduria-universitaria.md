---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:veeduria-universitaria
kd_title: "Veeduría Universitaria UDFJC (Art. 57 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00]

tupla_tipo: DEFINITION
tupla_concepto: "Veeduría Universitaria UDFJC"

skos_prefLabel: "Veeduría Universitaria"
skos_altLabel: ["University Oversight Committee", "Veeduría UDFJC"]
skos_hiddenLabel: ["veeduria"]
skos_definition: "Instancia de control ciudadano sobre la gestión pública institucional UDFJC. La Universidad garantiza la conformación permanente, autónoma e independiente de veedurías universitarias para fortalecer mecanismos de control sobre la gestión pública institucional y la participación democrática. Pueden ser conformadas por miembros de la Comunidad Universitaria, organizaciones sociales o ciudadanos interesados, en línea con la Ley 850/2003 sobre veedurías ciudadanas. Sus informes son públicos y vinculan a la institución a respuesta motivada."
skos_scopeNote: "Las veedurías son externas al organigrama institucional pero internas a la lógica democrática del Acuerdo. Su garantía constitucional dentro del Estatuto fortalece la transparencia y compromiso ético (principio 5h) y la democracia representativa y participativa (principio 5d). NO sustituyen los controles internos (auditoría, control disciplinario) sino los complementan con vigilancia ciudadana."
skos_example: "Una veeduría conformada por exrectores y profesionales independientes que vigile el avance de los 7 estatutos derivados (Art. 98) y emita informes públicos trimestrales sobre cumplimiento de plazos legales."
skos_notation: "Veeduría"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Instancia de control ciudadano sobre gestión pública institucional"
iso_differentia: "Conformación permanente + autónoma + independiente; complementa controles internos; alineada con Ley 850/2003 sobre veedurías ciudadanas"
iso_subject_field: "Control ciudadano universitario / Transparencia institucional / Participación democrática"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 57; Ley 850/2003 (marco general veedurías)"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.9
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 57; complementa Ley 850/2003"
  norm_jurisdiction: "Acuerdo Superior UDFJC + Ley 850/2003 nacional"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "La institución garantiza conformación permanente, autónoma e independiente; sus informes públicos vinculan a respuesta motivada"

applicable_domain: "Toda actuación institucional UDFJC sujeta a control ciudadano"
assumptions: ["La Ley 850/2003 sobre veedurías ciudadanas sigue vigente"]
breaks_at: ["Si la institución obstruye la conformación o funcionamiento de veedurías"]
extends_to: ""

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-veeduria-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-veeduria-implements-ley850
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[colombia2003ley850]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Ley 850/2003 sobre veedurías ciudadanas"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, veeduria-universitaria, control-ciudadano, art-57, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Veeduría Universitaria (Art. 57 ACU-004-25)

## Definición operativa

Instancia de **control ciudadano** sobre la gestión pública institucional UDFJC. La Universidad **garantiza la conformación permanente, autónoma e independiente** de veedurías universitarias.

> "La Universidad garantiza la conformación permanente, autónoma e independiente de veedurías universitarias para fortalecer los mecanismos de control sobre su gestión pública y la participación democrática." — **Art. 57 ACU-004-25**.

Pueden ser conformadas por miembros de la Comunidad Universitaria, organizaciones sociales o ciudadanos. Alineadas con la **Ley 850/2003** sobre veedurías ciudadanas. Sus informes públicos vinculan a la institución a **respuesta motivada**.

## Fuente primaria

> Art. 57 ACU-004-25; complementado por Ley 850/2003 (marco general).

## Notas de aplicación

- **Cuándo invocarla**: cuando un grupo de ciudadanos o miembros de la Comunidad Universitaria desea ejercer control sobre alguna gestión institucional específica.
- **Diferencia con auditoría interna**: auditoría es control técnico-administrativo institucional; veeduría es control externo ciudadano.
- **Conexión con principios**: materializa el principio (h) Transparencia y Compromiso Ético + (d) Democracia Representativa y Participativa del Art. 5.
