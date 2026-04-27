---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:escuela
kd_title: "Escuela UDFJC (Arts. 69-72 ACU-004-25) — unidad académica básica de adscripción docente por campo del conocimiento-saber"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_supersedes: 60-glosario/con-escuela (formato previo SUPERSEDED — re-construido aquí con rigor v5.2)
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-04, sec-MI12-05, sec-MI12-07, sec-MI12-10, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Escuela UDFJC"

skos_prefLabel: "Escuela UDFJC"
skos_altLabel:
  - "Unidad académica básica UDFJC"
  - "Campo del conocimiento-saber organizado"
  - "School (UDFJC reformada)"
skos_hiddenLabel: ["escuela", "school"]
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

align_schema_type: EducationalOrganization
align_dbpedia: "http://dbpedia.org/resource/School"
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: EDISON
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.4

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Arts. 58-59 (campo del conocimiento-saber) + 69-72 (Escuelas, Director, Consejo de Escuela) + 71 (~25 Escuelas por decreto CSU)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda Escuela UDFJC reformada"
  norm_supersedes: "Estructura Facultad-Departamento del Acuerdo CSU 003/1997 (organizada por afinidad disciplinar amplia)"

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

applicable_domain: "UDFJC desde 2025-05-06; constitución progresiva de las ~25 Escuelas durante Período de Transición Art. 96 (4 años máximo)"
assumptions:
  - "El CSU expide los decretos creadores de las ~25 Escuelas según Art. 71"
  - "Los docentes históricamente adscritos a Departamentos transitan a adscripción a Escuelas"
breaks_at:
  - "Una Escuela sin campo del conocimiento-saber declarado viola Art. 69"
  - "Si retorna a estructura Facultad-Departamento (incumple ACU-004-25)"
extends_to: "[[con-caba]] (células dinámicas que atraviesan Escuelas)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": EducationalOrganization

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

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-10--tdabc]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 8

tags: [glosario-universal, concepto-normativo, escuela, unidad-academica-basica, arts-69-72, m00-base, polisemia-reconciliada, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
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
