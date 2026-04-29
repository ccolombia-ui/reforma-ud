---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:rbm-gac
kd_title: "RBM-GAC — Results-Based Management + Governance, Accountability, Compliance"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "RBM-GAC"

skos_prefLabel: "RBM-GAC — Results-Based Management + Governance Accountability Compliance"
skos_altLabel: ["Results-Based Management", "Gestión por Resultados", "GAC", "Marco RBM"]
skos_definition: "Combinación propietaria UDFJC de dos marcos: (RBM) Results-Based Management — gestión por resultados desarrollada por OECD-DAC y agencias UN para evaluación de programas públicos; (GAC) Governance, Accountability, Compliance — marco de gobernanza institucional que articula gobierno (decisiones), rendición de cuentas (accountability) y cumplimiento normativo (compliance). Define 4 niveles operacionales de gobernanza universitaria: (L0) Operacional cotidiano; (L1) Táctico semestral; (L2) Estratégico anual; (L3) Sistémico institucional. Articula con BSC-s (4 perspectivas) y CRISP-DM (6 fases) en el framework prospectivo M08."
skos_scopeNote: "RBM provee la metodología (cadena objetivos→outputs→outcomes→impactos); GAC provee la estructura institucional (gobierno, rendición, compliance). Combinados, dan al BSC-s su soporte operativo."
skos_example: "Una iniciativa I3 (Articulación PM2 con misiones PIIOM): RBM define cadena objetivos (ej. 70% proyectos PM2 alineados a PIIOM 2027) → outputs (matriz trazabilidad) → outcomes (productos investigativos por misión) → impactos (contribución a transformación social). GAC define gobierno (Comisión Art. 100), accountability (reporte trimestral CSU), compliance (verificable contra Ley 30 Art. 6)."
skos_notation: "RBM-GAC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco combinado de gestión por resultados + gobernanza"
iso_differentia: "RBM (OECD-DAC metodología) + GAC (gobernanza institucional) + 4 niveles L0-L3 propietarios UDFJC"
iso_subject_field: "Gestión pública / Gobernanza universitaria / Rendición de cuentas"
iso_term_status: preferred
iso_standardized_by: "OECD-DAC (RBM) + Madera Sepúlveda (2026) adaptación GAC + L0-L3 UDFJC"

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "OECD-DAC RBM + literatura governance compliance + adaptación UDFJC L0-L3"
  neon_alignment_confidence: 0.8

applicable_domain: "Gestión universitaria pública por resultados + auditoría compliance"
assumptions: ["RBM y GAC son complementarios; sus tradiciones se pueden integrar"]
breaks_at: ["Si se confunde con métricas burocráticas sin direccionalidad transformativa"]

valid_from: "2026-04-26"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-rbm-complementa-bsc
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-bsc-s]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RBM-GAC provee la metodología por resultados (RBM) + estructura de gobernanza (GAC) que da soporte operativo a las 4 perspectivas del BSC-s. Marcos hermanos en el framework M08."
  - rel_id: rel-rbm-aplica-iniciativas
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-iniciativas-i0-i4]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Las 5 iniciativas estratégicas I0-I4 se gestionan con cadenas RBM (objetivos → outputs → outcomes → impactos) en los 4 niveles L0-L3 del marco GAC."
  - rel_id: rel-rbm-aplica-misiones-piiom
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-cinco-misiones-piiom]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "RBM-GAC aplicado a la trazabilidad PIIOM: cada iniciativa declara contribución a misión M1-M5 con cadena verificable (RT3 mitigado)."
  - rel_id: rel-rbm-gobernanza-comision-art100
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-comision-implementacion-art-100]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "GAC (Governance + Accountability + Compliance) define el rol institucional de la Comisión Art. 100 como instancia de gobierno + rendición + cumplimiento del Plan de Implementación."
  - rel_id: rel-rbm-monitorea-plan-implementacion
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-plan-implementacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RBM provee la metodología de seguimiento del Plan de Implementación Art. 98: cadena objetivos → outputs → outcomes → impactos con accountability semestral."
  - rel_id: rel-rbm-mitiga-rt5
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "RBM-GAC es el complemento metodológico al BSC-s para mitigación de RT5 (Ausencia de sistema de seguimiento)."

cited_in: ["[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-08--framework-bsc-rbm-crisp]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - rbm-gac
  - results-based-management
  - governance
  - oecd-dac
  - m01-corpus
  - audit-v2-2
---


# RBM-GAC — Results-Based Management + Governance Accountability Compliance

## Definición operativa

Combinación propietaria UDFJC de dos marcos:

| Marco | Tradición | Aporte |
|---|---|---|
| **RBM** Results-Based Management | OECD-DAC + UN agencies | Cadena objetivos → outputs → outcomes → impactos |
| **GAC** Governance Accountability Compliance | Governance contemporáneo | Gobierno + rendición + cumplimiento |

## 4 niveles operacionales L0-L3

| Nivel | Horizonte | Ejemplo |
|:-:|---|---|
| **L0** Operacional | Cotidiano | Gestión diaria de PM1-PM2-PM3 |
| **L1** Táctico | Semestral | Programación de cursos + convocatorias |
| **L2** Estratégico | Anual | Plan operativo + presupuesto |
| **L3** Sistémico | Institucional | Plan de Desarrollo + reforma |

## Lenguaje ubicuo asociado

RBM-GAC · Results-Based Management · GAC · L0-L3 · Cadena objetivos-outputs-outcomes-impactos.

## Notas de aplicación

- **Conexión M08**: framework BSC-s × RBM-GAC × CRISP-DM (modelos prospectivos).
- **RBM provee metodología; GAC provee estructura institucional**.
