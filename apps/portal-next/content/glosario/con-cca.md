---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:cca
kd_title: "CCA — Paquete Comprensivo-Experimental-Transformativo (unidad creditizable triádica M06)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Paquete CCA"

skos_prefLabel: "CCA — Paquete creditizable Comprensivo-Experimental-Transformativo"
skos_altLabel: ["Paquete CCA", "CCA Package", "Unidad creditizable triádica"]
skos_definition: "Unidad creditizable propuesta en el modelo BMK-002 del paper M06 (Madera Sepúlveda 2026) que articula los 3 vectores de las funciones misionales como una sola unidad indivisible: (V1) Comprensivo — apropiación crítica del conocimiento (PM1 Formación); (V2) Experimental — generación de evidencia y prototipos (PM2 Investigación); (V3) Transformativo — aplicación en contexto territorial (PM3 Extensión). Un Paquete CCA típico vale 4-12 créditos académicos SNIES y se diseña para que el estudiante curse los 3 vectores en simultaneidad temporal. Es una operacionalización del Art. 7 ACU-004-25 (funciones misionales) que rompe el silo curricular tradicional de cursos PM1 separados de proyectos PM2 separados de prácticas PM3."
skos_scopeNote: "CCA NO sustituye al crédito académico (Decreto 1330) — el CCA es un PAQUETE que se mide en créditos. Su novedad está en la triada V1∧V2∧V3 simultánea, no en una nueva unidad de medida. Las CABAs (Art. 73) son las estructuras institucionales que activan paquetes CCA en las Escuelas."
skos_example: "Un Paquete CCA típico de 8 créditos en una Escuela de Bioeconomía: V1 (12 horas/semana lectura + tutoría sobre biotecnología territorial), V2 (8 horas/semana laboratorio con datos reales del territorio), V3 (8 horas/semana acompañamiento a JACs en proyecto productivo)."
skos_notation: "CCA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad curricular agregada articuladora de funciones misionales"
iso_differentia: "Triada V1∧V2∧V3 simultánea (Comprensivo + Experimental + Transformativo); creditizable según Decreto 1330; activable por CABAs (Art. 73)"
iso_subject_field: "Diseño curricular / Articulación misional / Educación universitaria pública"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M06 BMK-002 — elaboración propia"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "paquete_cca"
  ddd_aggregate_root: "PaqueteCCA"
  ddd_bc_ref: "[[bc-curriculo-udfjc]]"
  ddd_role_in_context: "Aggregate Root de la unidad curricular triádica. Encapsula los 3 vectores V1∧V2∧V3 con sus respectivos créditos parciales sumando el total del paquete. Las CABAs son los Aggregate Coordinators que activan paquetes en Escuelas."
  ddd_invariants:
    - "Un Paquete CCA debe articular simultáneamente V1 (Comprensivo) ∧ V2 (Experimental) ∧ V3 (Transformativo) — no son 3 cursos separados"
    - "El total de créditos del paquete debe respetar el Decreto 1330 (1 crédito SNIES = 48 horas-reloj)"
    - "Un paquete CCA es activable solo por una CABA (Art. 73 ACU-004-25)"

applicable_domain: "Diseño curricular post-ACU-004-25; rediseño de programas académicos en Escuelas"
assumptions:
  - "La triada V1∧V2∧V3 es operativamente integrable en una sola unidad curricular"
  - "Las Escuelas tienen capacidad institucional para coordinar paquetes (vía CABAs)"
breaks_at:
  - "Si los 3 vectores se ofrecen secuencialmente (no simultáneamente) — degenera a 3 cursos tradicionales"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-cca-mide-en-creditos
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-credito-academico]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El Paquete CCA es una unidad agregada que se mide en créditos académicos según Decreto 1330. Coexiste con el crédito como unidad de medición (no lo sustituye)."
  - rel_id: rel-cca-operacionaliza-funciones
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-funciones-misionales]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Art. 7 ACU-004-25 establece PM1+PM2+PM3 como funciones misionales; el Paquete CCA las articula como triada V1∧V2∧V3 simultánea — operacionalización curricular del mandato misional."
  - rel_id: rel-cca-activado-por-caba
    rel_nombre: ddd_part_of
    rel_direccion: pre
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs (Art. 73 ACU-004-25) son las estructuras institucionales que activan paquetes CCA en las Escuelas. Un CCA sin CABA no es operativo."
  - rel_id: rel-cca-en-escuela
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-escuela]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las Escuelas (Arts. 69-72) son el contenedor institucional donde se ofrecen los paquetes CCA, activados por CABAs transversales."
  # — v1.1.0 cross-references M02 (Fase B audit refactor) ——————————
  - rel_id: rel-cca-creditiza-r1r6
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-retroalimentaciones-r1-r6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los Paquetes CCA creditizan las R1-R6 como una sola unidad indivisible: V1 Comprensiva (R2 + R6) ∧ V2 Experimental (R1 + R4) ∧ V3 Transformativa (R3 + R5)."
  # — v1.1.0 cross-references M06 (Fase B audit refactor) ——————————
  - rel_id: rel-cca-fuente-bmk002
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-bmk-002-cca-11-ies]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "BMK-002 (M06) es el proyecto investigativo que diseña formalmente el modelo CCA — la creditización V1∧V2∧V3 simultánea es contribución original."
  - rel_id: rel-cca-fundamento-dublin
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-dublin-descriptors-bologna]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Dublin Descriptors fundamentan los V1∧V2∧V3 del CCA: V1 Comprensiva mapea a categorías (i)+(ii); V2 Experimental a (iii)+(v); V3 Transformativa a (iv)+aplicación."
  - rel_id: rel-cca-stack-tecnico
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-stack-certificacion-open-badges]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El stack OB+xAPI+CLR es la infraestructura técnica que materializa la certificación de cada Paquete CCA con verificabilidad criptográfica."

cited_in: ["[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - cca
  - paquete-creditizable
  - m06-corpus
  - audit-v2-2
---


# CCA — Paquete Comprensivo-Experimental-Transformativo

## Definición operativa

Unidad creditizable propuesta en **M06 BMK-002** (Madera Sepúlveda 2026) que articula los 3 vectores de las funciones misionales como **una sola unidad indivisible**:

| Vector | Significado | Función misional ACU-004-25 |
|:-:|---|---|
| **V1** | Comprensivo (apropiación crítica del conocimiento) | PM1 Formación |
| **V2** | Experimental (generación de evidencia + prototipos) | PM2 Investigación |
| **V3** | Transformativo (aplicación territorial) | PM3 Extensión |

Un Paquete CCA típico vale **4-12 créditos académicos** SNIES y se diseña para que el estudiante curse los 3 vectores **en simultaneidad temporal** — rompiendo el silo curricular tradicional.

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). *M06 BMK-002 — Modelo CCA para articulación misional UDFJC*. Capítulo MI-12 §06.

## Invariantes operativas DDD

1. Un Paquete CCA articula simultáneamente V1 ∧ V2 ∧ V3 — **no son 3 cursos separados**.
2. El total de créditos respeta el **Decreto 1330** (1 crédito SNIES = 48 horas-reloj).
3. Un paquete CCA es activable **solo por una CABA** (Art. 73 ACU-004-25).

## Lenguaje ubicuo asociado

CCA · Paquete CCA · Triada V1∧V2∧V3 · Comprensivo · Experimental · Transformativo · Activación por CABA.

## Notas de aplicación

- **NO confundir V1-V3 (CCA) con V1-V5 (culturales M04)**: son sistemas distintos. V1-V3 son vectores curriculares; V1-V5 son valores institucionales (Soberanía/Emprendimiento/Participación/Ética/Austeridad).
- **NO confundir con módulos integrados tradicionales**: el CCA exige simultaneidad temporal real, no secuencia.
- **Conexión con M00**: operacionalización curricular del Art. 7 ACU-004-25.
