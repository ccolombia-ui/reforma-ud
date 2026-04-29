---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:escuela
kd_title: "Escuela UDFJC (Arts. 69-72 ACU-004-25) — unidad académica básica de adscripción docente por campo del conocimiento-saber"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.1.0

tupla_tipo: DEFINITION
tupla_concepto: "Escuela UDFJC"

skos_prefLabel: "Escuela UDFJC"
skos_altLabel:
  - "Unidad académica básica UDFJC"
  - "Campo del conocimiento-saber organizado"
  - "School (UDFJC reformada)"
skos_definition: "Unidad académica básica de la UDFJC reformada donde están adscritos los docentes y su productividad académica en torno a un campo del conocimiento-saber. Permea las demás unidades a través de investigación-creación, extensión y formación. Coexiste con Facultades, Institutos y Centros como estructuras paralelas no jerárquicas. Es atravesada transversalmente por CABAs (Comunidades Académicas de Base). Cada Escuela está dirigida por un(a) Director(a) elegido(a) por los docentes (4 años, sin reelección inmediata). El Art. 71 prevé la creación de aproximadamente 25 Escuelas vía decreto del CSU. Las Escuelas reemplazan estructuralmente la combinación Facultad-Departamento del Acuerdo CSU 003/1997."
skos_scopeNote: "El término 'Escuela' aparece en al menos 4 contextos en el corpus MI-12: (a) NORMATIVO-estructural (este glosario): unidad académica básica post-ACU-004-25; (b) JTBD-ecosistema (M04 BPA-003): ecosistema de 6 roles institucionales; (c) MLP-transformativa (M02): nicho transformativo Geels donde operan PM1-PM2-PM3 con R1-R6; (d) BMK-TDABC (M05/M10): unidad de comparación o piloto de costeo. Los contextos (b)(c)(d) son **wrappers** que aplican al átomo NORMATIVO de este glosario."
skos_example: "La 'Escuela de Física' del corpus MI-12 (ej-MI12-01) es la unidad NORMATIVA + estructural: agrupa los docentes-investigadores adscritos al campo Energía-Materia-Información, dirigida por su Director electo, atravesada por las CABAs activas (Electromagnetismo, Mecánica Cuántica, Astrofísica), y coordinada para PM1 vía Facultad reformada bajo VRF, para PM2 vía Instituto bajo VRICI, para PM3 vía Centro bajo VRC."
skos_notation: "Escuela"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Unidad académico-administrativa básica universitaria de adscripción docente"
iso_differentia: "Organizada por campo del conocimiento-saber (Art. 59); con Director y Consejo de Escuela; permea las demás unidades; reemplaza estructuralmente la Facultad-Departamento del Acuerdo 003/1997"
iso_subject_field: "Estructura académica reformada UDFJC / Gobernanza de Escuelas"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 69-72"

align_dbpedia: "http://dbpedia.org/resource/School"
align_wikidata: ""

pasteur_quadrant: EDISON

concepto_capabilities:
  - NORMATIVE
  - DDD
  - TYPE

# ═══════════════════════════════════════════════════════════════════════════
#  Facet TYPE — Capa 1 del patrón Type → Schema → Instance (v1.1.0)
# ═══════════════════════════════════════════════════════════════════════════
concepto_facet_type:
  type_pattern_role: "Capa 1 (Type jurídico abstracto) del patrón 3-capas Type → Schema → Instance"
  schema_layer: "[[con-escuela-generica-udfjc]] (Capa 2 · schema metodológico de instanciación)"
  instances_count_mandatory: 7
  instances_mandate: "Art. 105 ACU-004-25 — plazo 2025-05-05 → 2027-05-05"
  instance_blocks:
    ciencias_basicas: 4
    ciencias_salud: 3
  pilot_instance: "[[con-escuela-fisica]]"
  type_invariants_inherited_by_all_instances:
    - "Art. 69 — adscripción exclusiva a Vicerrectoría de Formación"
    - "Art. 70 — estructura mínima (dirección + consejo + claustro + CABAs + secretaría)"
    - "Art. 71 — proceso de creación CSU previo aval Consejo Académico"
    - "Art. 71c — singularidad y no redundancia del campo conocimiento-saber"
    - "Art. 72 — designación director por elección directa ponderada (4 años, sin reelección inmediata)"
    - "Art. 73 — CABAs como estructura básica dinámica de las escuelas"
    - "Art. 81 — no reelección inmediata de directores"

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Arts. 58-59 + 69-72 (Escuelas, Director, Consejo, ~25 Escuelas)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Escuela como unidad académica básica · refundación estructural que sustituye Facultad-Departamento del ACU 003/1997"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Arts. 58-59 + 69-72 + 71 (~25 Escuelas por decreto CSU)"
  normative_text: "[Texto literal Arts. 69-72 · Escuelas + Director + Consejo + creación]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates:
    - "Estructura Facultad-Departamento del Acuerdo CSU 003/1997 (organizada por afinidad disciplinar amplia)"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_ddd:
  ddd_id: "escuela"
  ddd_aggregate_root: "Escuela"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "Aggregate Root del subdominio Estructura Académica Básica. Encapsula identidad institucional (id, nombre, campo del conocimiento-saber), agrupa docentes adscritos como Entities, mantiene invariantes de coherencia presupuestal y curricular. Coexiste con Facultad, Instituto, Centro como Aggregate Roots paralelos NO jerárquicos."
  ddd_invariants:
    - "Una Escuela debe declarar al menos un campo del conocimiento-saber"
    - "Los docentes de planta tiempo completo están adscritos a una Escuela como anclaje primario"
    - "El Director debe ser docente de planta tiempo completo"
    - "El Director se elige por voto de los docentes de la Escuela; periodo 4 años; sin reelección inmediata"
    - "El Consejo de Escuela tiene representación 70% docentes + 30% CV+entrevista (Art. 72)"
    - "Una Escuela puede ser atravesada por N CABAs transversales (≥0)"
    - "Una Escuela desarrolla simultáneamente PM1+PM2+PM3 (no compartimentada)"
  ddd_ubiquitous_terms:
    - "Escuela"
    - "Director(a) de Escuela"
    - "Consejo de Escuela"
    - "Docente adscrito"
    - "Campo del conocimiento-saber"
    - "CABA (atraviesa Escuelas)"

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-69-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-69-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-campo-conocimiento-saber]]"
  - "[[con-vicerrectoria-formacion]]"

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva de las ~25 Escuelas durante Período de Transición Art. 96 (4 años máximo)"
assumptions:
  - "El CSU expide los decretos creadores de las ~25 Escuelas según Art. 71"
  - "Los docentes históricamente adscritos a Departamentos transitan a adscripción a Escuelas"
breaks_at:
  - "Una Escuela sin campo del conocimiento-saber declarado viola Art. 69"
  - "Si retorna a estructura Facultad-Departamento (incumple ACU-004-25)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-director


tupla__relations:
  - rel_id: rel-escuela-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-escuela-organizada-por-campo
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-campo-conocimiento-saber]]"
    rel_frame: skos
    rel_propiedades:
      skos_strength: 1.0
      skos_evidence: "Art. 69: Escuelas se organizan por campo del conocimiento-saber"
  - rel_id: rel-escuela-atravesada-cabas
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Art. 73: CABAs son células transversales que atraviesan Escuelas"
  - rel_id: rel-escuela-coexiste-facultad
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-facultad]]"
    rel_frame: skos
  # ── v1.1.0 · Patrón Type → Schema → Instance ─────────────────────────
  - rel_id: rel-escuela-schema-generico
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-escuela-generica-udfjc]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Capa 2 · Escuela Genérica UDFJC es el schema metodológico que materializa este Type jurídico para análisis transversal e instanciación específica. Hereda todos los invariantes Art. 69-72 + añade cardinalidades operativas (~25 docentes, ~600-1.200 estudiantes, 2-4 CABAs)."
  - rel_id: rel-escuela-instance-piloto-fisica
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-escuela-fisica]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Capa 3 · La Escuela de Física es la instancia piloto del patrón Type → Schema → Instance. Materializa este Type jurídico al campo conocimiento-saber Física en el bloque mandatorio de 4 escuelas de Ciencias Básicas (Art. 105 ACU-004-25)."
  - rel_id: rel-escuela-mandato-art-105
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      norm_evidence: "Art. 105 ACU-004-25 mandata la conformación de 7 escuelas (4 Ciencias Básicas + 3 Ciencias de la Salud) en plazo máximo de 2 años a partir del 2025-05-05 (deadline 2027-05-05). Cada escuela mandatoria es una instancia de este Type."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-10--tdabc]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 8

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - escuela
  - unidad-academica-basica
  - arts-69-72
  - m00-base
  - polisemia-reconciliada
  - patron-capa-1-type
  - mandato-art-105
  - audit-v2-3
  - tpl-v2
---


# Escuela UDFJC reformada (Arts. 69-72 ACU-004-25)

## Definición operativa

Unidad académica básica de la UDFJC reformada donde **están adscritos los docentes** y su productividad académica en torno a **un campo del conocimiento-saber**. Permea las demás unidades a través de investigación-creación, extensión y formación. Coexiste con Facultades, Institutos y Centros como estructuras paralelas **no jerárquicas**. Es atravesada transversalmente por **CABAs**.

## Reconciliación de los 4 contextos del término "Escuela" en el corpus

| # | Contexto | Sección dominante | Naturaleza | Resolución |
|---|---|---|---|---|
| (a) | NORMATIVO-estructural | sec-MI12-00, 01 | NORMATIVO | **Este glosario es la SSOT** |
| (b) | JTBD-ecosistema | sec-MI12-04 (BPA-003) | ACADÉMICO | Wrapper sobre el átomo |
| (c) | MLP-transformativa | sec-MI12-02 (Geels) | ACADÉMICO | Wrapper sobre el átomo |
| (d) | BMK-TDABC | sec-MI12-05, 10 | DATO-CALCULADO | Wrapper sobre el átomo |

> Los contextos (b)(c)(d) son **wrappers** que aplican al átomo NORMATIVO. Cualquier mención debe primero anclarse a este glosario.

## Fuente primaria

> Arts. 58-59 (campo del conocimiento-saber); 69-72 (Escuelas, Director, Consejo); 71 (~25 Escuelas por decreto CSU). ACU-004-25.

## Invariantes operativas DDD

1. Una Escuela declara **al menos un campo del conocimiento-saber**.
2. Docentes de planta TC adscritos a una Escuela como anclaje primario.
3. **Director** docente de planta TC, electo por voto docente, 4 años, sin reelección inmediata.
4. **Consejo de Escuela**: 70% docentes + 30% CV+entrevista (Art. 72).
5. Atravesada por **N CABAs** transversales (≥0).
6. Desarrolla **simultáneamente** PM1+PM2+PM3.

## Lenguaje ubicuo asociado

Escuela · Director(a) de Escuela · Consejo de Escuela · Docente adscrito · Campo del conocimiento-saber · CABA (transversal).

## Notas de aplicación

- **Cuándo invocarla**: cuando se hable de la unidad académica básica de adscripción docente. Si el contexto es JTBD ecosistema, MLP nicho o BMK comparativa, citar wrapper aplicable.
- **Sustitución estructural**: las Escuelas reemplazan al modelo Facultad-Departamento del Acuerdo 003/1997. Coexisten complementariamente con la Facultad reformada (no jerárquicamente).

## Patrón Type → Schema → Instance (v1.1.0 · 2026-04-27)

Este concepto es la **Capa 1 (Type jurídico abstracto)** de un patrón 3-capas que materializa el mandato Art. 105 ACU-004-25:

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TB
    C1["★ Capa 1 · Type jurídico abstracto<br/>[[con-escuela]] · este archivo"]:::c1activa
    C2["Capa 2 · Schema metodológico<br/>[[con-escuela-generica-udfjc]]"]:::c2
    C3["Capa 3 · Instances mandatorias<br/>7 escuelas Art. 105"]:::c3
    F["[[con-escuela-fisica]]<br/>★ piloto"]:::piloto

    C1 -->|inherits jurídico| C2
    C2 -->|generates schema| C3
    C3 --> F

    classDef c1activa fill:#0891b2,color:#fff,stroke:#fbbf24,stroke-width:4px
    classDef c2 fill:#7c3aed,color:#fff,stroke:#5b21b6,stroke-width:2px
    classDef c3 fill:#10b981,color:#fff,stroke:#047857,stroke-width:2px
    classDef piloto fill:#a78bfa,color:#fff,stroke:#7c3aed,stroke-width:3px
```

### Mandato Art. 105 — 7 escuelas mandatorias

El Art. 105 ACU-004-25 ordena la conformación de **nuevas escuelas** en plazo de 2 años (deadline **2027-05-05**), distribuidas en:

- **Bloque Ciencias Básicas (4 escuelas)** — incluye [[con-escuela-fisica|Escuela de Física]] (piloto del patrón) + 3 escuelas adicionales pendientes de confirmación nominal.
- **Bloque Ciencias de la Salud (3 escuelas)** — pendientes de confirmación nominal.

Cada instancia (Capa 3) hereda jurídicamente este Type (Capa 1) vía el schema metodológico (Capa 2). Ver dashboard agregado: [[_dash-escuelas]].
