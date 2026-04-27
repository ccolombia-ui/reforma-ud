---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:comision-implementacion-art-100
kd_title: "Comisión de Implementación (Art. 100 ACU-004-25) — órgano operativo de transición"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: PENDIENTE_CONFORMACION
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Comisión de Implementación Art. 100"

skos_prefLabel: "Comisión de Implementación de la Reforma (Art. 100)"
skos_altLabel: ["Comisión Art. 100", "Implementation Commission UDFJC"]
skos_hiddenLabel: ["comision-implementacion", "comision-art-100"]
skos_definition: "Órgano colegiado mandatado por el Art. 100 del ACU-004-25 que tiene la función de coordinar la implementación operativa de la reforma estatutaria durante el Período de Transición (2025-05-06 a 2029-05-05). Responsable de monitorear cumplimiento de los plazos del Plan de Implementación (Art. 98), articular la conformación progresiva de Escuelas-Institutos-Centros, supervisar la expedición de los 7 estatutos derivados y reportar avance al CSU. **Estado actual (2026-04-26): NO CONFORMADA** — riesgo crítico identificado en M01 §5.1 brechas verificadas. La ausencia de Comisión coincide con incumplimiento del Plan de Implementación (vencido 2025-06-19) y del Estatuto Académico (vencido 2025-11-05)."
skos_scopeNote: "La Comisión NO es ejecutiva (no sustituye al rector ni a las Vicerrectorías) sino coordinadora-supervisora. Su composición específica debe determinarse por reglamento (parte del Plan de Implementación). Si nunca se conforma, los riesgos RT3 (desalineación PIIOM) y RT5 (ausencia de seguimiento) se materializan."
skos_example: "Una Comisión de Implementación efectiva incluiría: rector(a) o delegado(a), un(a) representante de cada Vicerrectoría temática, decanos(as) de Facultades en transición, directores designados de Escuelas piloto, representante CACAD, secretario(a) general, asesores externos. Sesiona quincenalmente para reportar avance."
skos_notation: "Comisión Art. 100"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado coordinador de implementación de reforma"
iso_differentia: "Mandatado por Art. 100 ACU-004-25; función coordinadora-supervisora durante Período de Transición; pendiente de conformación a 2026-04-26"
iso_subject_field: "Implementación reforma UDFJC / Régimen de transición"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 100"

align_schema_type: GovernmentOrganization
concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 100 (Comisión de Implementación)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Coordinación supervisora de implementación reforma 2025-2029"

applicable_domain: "Período de Transición UDFJC 2025-05-06 a 2029-05-05"
assumptions: ["La Comisión se conforma en plazo razonable"]
breaks_at: ["2026-04-26 — sin conformación, riesgo crítico"]
extends_to: "[[con-plan-implementacion]] · [[con-periodo-transicion]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
valid_to: "2029-05-05"
lifecycle_state: PENDIENTE_CONFORMACION
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-comision-mandated-by-art100
    rel_nombre: norm_mandated_by
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-comision-reporta-csu
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-csu-consejo-superior-universitario]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La Comisión Art. 100 reporta avances al CSU como instancia coordinadora-supervisora; el CSU es la autoridad que la conforma y a quien rinde cuentas."
  - rel_id: rel-comision-monitorea-plan
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-plan-implementacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Función primaria de la Comisión: monitorear el cumplimiento del Plan de Implementación Art. 98 y reportar avance al CSU. Sin Plan aprobado, la Comisión carece de objeto."
  - rel_id: rel-comision-coordina-periodo
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-periodo-transicion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La Comisión opera durante el Período de Transición (4 años post-promulgación); su función expira con el cierre del período."
  - rel_id: rel-comision-mitiga-rt3-rt5
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "La conformación de la Comisión Art. 100 mitiga directamente RT3 (desalineación PIIOM) y RT5 (ausencia sistema seguimiento); su NO conformación los materializa."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, comision-implementacion, art-100, pendiente-conformacion, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Comisión de Implementación (Art. 100 ACU-004-25)

> [!warning]+ ⚠️ Estado actual: PENDIENTE_CONFORMACION
> A 2026-04-26 la Comisión Art. 100 NO ha sido conformada (M01 §5.1). Riesgo crítico para implementación reforma.

## Definición operativa

Órgano colegiado mandatado por el **Art. 100 del ACU-004-25** que coordina la implementación operativa de la reforma durante el Período de Transición. Función **coordinadora-supervisora**, NO ejecutiva.

## Funciones principales

- Monitorear cumplimiento Plan de Implementación (Art. 98)
- Articular conformación progresiva Escuelas-Institutos-Centros
- Supervisar expedición de los 7 estatutos derivados
- Reportar avance al CSU

## Fuente primaria

> Art. 100 ACU-004-25.

## Lenguaje ubicuo asociado

Comisión Art. 100 · Comisión de Implementación · Coordinación supervisora · Período de Transición.

## Notas de aplicación

- **Conexión M01 §5.1**: brecha verificada — Comisión NO conformada (riesgo crítico).
- **Si nunca se conforma**: los riesgos RT3 y RT5 (M01 §5.2) se materializan.
