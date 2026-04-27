---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:csu-consejo-superior-universitario
kd_title: "CSU — Consejo Superior Universitario UDFJC (Arts. 22-29 ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Consejo Superior Universitario UDFJC"

skos_prefLabel: "Consejo Superior Universitario (CSU)"
skos_altLabel: ["CSU UDFJC", "Consejo Superior", "University Council UDFJC"]
skos_hiddenLabel: ["consejo-superior", "csu"]
skos_definition: "Máximo órgano de dirección y gobierno de la Universidad Distrital Francisco José de Caldas. Expide los estatutos y los acuerdos generales que rigen la vida institucional. Está integrado por: alcalde(sa) de Bogotá D.C. o su delegado(a) (presidencia natural), ministro(a) de Educación Nacional o su delegado(a), un(a) designado(a) de la Presidencia de la República, rector(a) (con voz pero sin voto), representantes de la academia (un docente y un estudiante elegidos por sus pares), representantes de egresados, exrector(a) y representante del sector productivo. Sus actos administrativos (acuerdos numerados) son la fuente normativa interna de mayor jerarquía dentro de la UDFJC."
skos_scopeNote: "El ACU-004-25 mismo es un acto del CSU. La composición mixta (autoridades distritales/nacionales + comunidad universitaria + sector productivo) refleja el carácter público distrital de la UDFJC y materializa el principio de Autonomía Universitaria del Art. 5b en su dimensión institucional. NO es electo por sufragio universitario — es ente colegiado mixto con membresías designadas o representativas."
skos_example: "El Acuerdo CSU 04/2025 (la carta constitucional misma) fue expedido por el CSU el 5 de mayo de 2025. Otros actos típicos: aprobación de presupuesto anual, expedición de estatutos derivados (Art. 98), aprobación de creación/supresión de Programas Académicos."
skos_notation: "CSU"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano colegiado de dirección y gobierno universitario"
iso_differentia: "Máxima autoridad institucional UDFJC; composición mixta (autoridades públicas + comunidad universitaria + sector productivo); fuente de los Acuerdos CSU"
iso_subject_field: "Gobernanza universitaria / Derecho universitario público colombiano"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 22-29; Ley 30/1992 Art. 64-65"

align_schema_type: GovernmentOrganization
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.3

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 22-29 (composición, funciones, sesiones)"
  norm_jurisdiction: "Acuerdo Superior + Ley 30/1992 Arts. 64-65"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Sus acuerdos numerados son la fuente normativa interna de mayor jerarquía UDFJC"

concepto_facet_ddd:
  ddd_id: "csu"
  ddd_aggregate_root: "ConsejoSuperiorUniversitario"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del bounded context Gobierno Académico — máxima autoridad. Encapsula identidad institucional (composición), agrega Sesiones como Entities, mantiene invariantes de quórum, mayorías y procedimiento de Acuerdos."
  ddd_invariants:
    - "El CSU debe sesionar con quórum reglamentario para que sus actos sean válidos"
    - "Los Acuerdos CSU son numerados y fechados para trazabilidad"
    - "El rector tiene voz pero NO voto en el CSU"
    - "La presidencia natural es del alcalde(sa) de Bogotá D.C. o su delegado(a)"
    - "Los Acuerdos del CSU son la fuente normativa interna de mayor jerarquía"
  ddd_ubiquitous_terms:
    - "CSU"
    - "Acuerdo CSU"
    - "Quórum"
    - "Composición mixta"
    - "Presidencia (alcalde/delegado)"
    - "Acto administrativo institucional"

applicable_domain: "Toda actuación institucional UDFJC que requiera fuente normativa interna de máxima jerarquía."
assumptions:
  - "La composición mixta funciona como balance entre autonomía universitaria y rectoría política pública"
  - "Los actos del CSU respetan marco Const. + Ley 30 + jurisprudencia"
breaks_at:
  - "Si Ley 30 se reforma con composición distinta de Consejos Superiores"
extends_to: "[[con-cacad-consejo-academico]] (autoridad académica complementaria)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": GovernmentOrganization

tupla__relations:
  - rel_id: rel-csu-fuente-acu00425
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "El CSU expidió el ACU-004-25 mismo el 2025-05-05"
  - rel_id: rel-csu-related-cacad
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-cacad-consejo-academico]]"
    rel_frame: skos
    bc_domain: gobernanza
    rel_propiedades:
      skos_evidence: "CSU = autoridad de dirección y gobierno; CACAD = máxima autoridad académica; complementarios sin jerarquía"
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-csu-mandates-comision-art100
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-comision-implementacion-art-100]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "CSU debe conformar Comisión de Implementación según Art. 100 ACU-004-25 (M01 §5.1 brecha verificada: PENDIENTE a 2026-04-26)"
  - rel_id: rel-csu-mandates-plan-implementacion
    rel_nombre: norm_mandates
    rel_direccion: post
    rel_target: "[[con-plan-implementacion]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "CSU debe aprobar Plan de Implementación dentro de 45 días según Art. 98 (M01 §4.7: VENCIDO 2025-06-19)"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, csu, gobernanza-suprema, arts-22-29, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# CSU — Consejo Superior Universitario (Arts. 22-29 ACU-004-25)

## Definición operativa

Máximo órgano de dirección y gobierno de la UDFJC. Expide los estatutos (incluyendo el ACU-004-25 mismo) y los acuerdos generales que rigen la vida institucional. Composición mixta:

| Miembro | Origen | Voto |
|---|---|:---:|
| Alcalde(sa) Bogotá D.C. o delegado(a) | Distrito Capital — **Presidencia natural** | ✅ |
| Ministro(a) de Educación Nacional o delegado(a) | Gobierno Nacional | ✅ |
| Designado(a) Presidencia de la República | Presidencia | ✅ |
| Rector(a) | UDFJC | Voz, NO voto |
| Representante docentes | Elección por sus pares | ✅ |
| Representante estudiantes | Elección por sus pares | ✅ |
| Representante egresados | Elección por egresados | ✅ |
| Exrector(a) | Designación | ✅ |
| Representante sector productivo | Designación | ✅ |

## Fuente primaria

> Arts. 22-29 ACU-004-25 (composición, funciones, sesiones, quórum, mayorías). Marco superior: Ley 30/1992 Arts. 64-65.

## Invariantes operativas DDD

1. **Quórum reglamentario** obligatorio para validez de actos.
2. **Acuerdos numerados y fechados** para trazabilidad jurídica.
3. **Rector con voz, sin voto** (Art. 22).
4. **Presidencia del alcalde(sa)** o delegado(a).
5. Sus Acuerdos son **fuente normativa interna de máxima jerarquía**.

## Lenguaje ubicuo asociado

CSU · Acuerdo CSU · Quórum · Acto administrativo institucional · Presidencia (alcalde/delegado) · Composición mixta.

## Notas de aplicación

- **Cuándo citarlo**: como fuente de cualquier Acuerdo institucional UDFJC (numero/año).
- **Conexión M01**: el CSU es el **emisor** del ACU-004-25 que M01 trazara como eslabón final de la cadena normativa multinivel.
- **Conexión M12**: el CSU es el **stakeholder responsable** de aprobar los 7 estatutos derivados (Art. 98) y de tomar las decisiones críticas del roadmap 2026-2034.
