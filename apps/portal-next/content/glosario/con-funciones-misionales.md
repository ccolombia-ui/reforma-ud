---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:funciones-misionales
kd_title: "Funciones Misionales (Art. 7 ACU-004-25) — PM1 Formación · PM2 Investigación-Creación-Innovación · PM3 Contextos-Extensión-Proyección Social"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-04, sec-MI12-05, sec-MI12-07, sec-MI12-08, sec-MI12-10, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Funciones Misionales UDFJC"

skos_prefLabel: "Funciones Misionales (PM1, PM2, PM3)"
skos_altLabel:
  - "Procesos Misionales"
  - "Tres funciones de la educación superior"
  - "PM1-PM2-PM3"
  - "Misiones académicas universitarias"
skos_hiddenLabel: ["procesos-misionales", "funciones-academicas"]
skos_definition: "Tres funciones constitutivas de la UDFJC enunciadas en el Art. 7 del ACU-004-25: (a) Formación-Docencia (PM1), que brinda al estudiante educación integral mediante currículos flexibles que atienden ritmos diferentes de aprendizaje; (b) Investigación-Creación e Innovación (PM2), que genera conocimientos, saberes y expresiones artístico-culturales mediante un sistema dialógico que asume apropiación, transferencia e innovación como componentes fundamentales; (c) Contextos, Extensión y Proyección Social (PM3), que promueve interacción y diálogo permanente entre la Comunidad Universitaria y el entorno local, regional, nacional e internacional para coadyuvar en la solución de los problemas sociales. Las tres funciones operan integradamente: cada Escuela las desarrolla simultáneamente, atravesada por CABAs transversales."
skos_scopeNote: "Las funciones son INDIVISIBLES en su totalidad institucional pero pueden tener intensidades distintas en cada Escuela/CABA. NO son tres compartimentos estancos: PM1, PM2 y PM3 se enriquecen mutuamente. La estructura organizativa post-ACU-004-25 refleja esto con tres Vicerrectorías temáticas (Formación, Investigaciones, Contextos) que coordinan respectivamente las Facultades, Institutos y Centros, todos atravesados por las Escuelas."
skos_example: "Un proyecto de investigación PM2 sobre soberanía energética comunitaria que (a) involucra a estudiantes con créditos en formación PM1, y (b) co-diseña soluciones con una JAC territorial PM3, materializa las tres funciones misionales en un solo objeto institucional."
skos_notation: "PM1 / PM2 / PM3"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Conjunto de funciones constitutivas universitarias"
iso_differentia: "Tres funciones (formación, investigación-creación-innovación, contextos-extensión) integradas e indivisibles institucionalmente, cada una con Vicerrectoría coordinadora y unidad organizativa anclada"
iso_subject_field: "Educación superior / Procesos misionales universitarios / Gobernanza académica"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 7; alineado con Ley 30/1992 Art. 6"

align_schema_type: DefinedTerm
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 1.0
pasteur_axis_knowledge: 0.7

concepto_capabilities: [NORMATIVE, DDD]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 7 (literales a, b, c)"
  norm_jurisdiction: "Consejo Superior Universitario UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda Escuela, Instituto, Centro y Programa Académico debe materializar las 3 funciones misionales (con intensidades variables, pero ninguna ausente)"
  norm_supersedes: "Funciones declaradas en Acuerdo CSU 003/1997 (versión previa con denominaciones distintas y sin la articulación 'investigación-creación-innovación' ni 'contextos')"

concepto_facet_ddd:
  ddd_id: "funciones_misionales"
  ddd_aggregate_root: "FuncionesMisionales"
  ddd_bc_ref: "[[bc-gobierno-academico-udfjc]]"
  ddd_role_in_context: "ValueObject inmutable que agrupa las 3 funciones como unidad indivisible institucional. Cada Escuela/Instituto/Centro la implementa concretamente."
  ddd_invariants:
    - "Las 3 funciones siempre deben coexistir institucionalmente (ninguna puede eliminarse)"
    - "Toda Escuela debe desarrollar PM1 al menos como anchor de su existencia"
    - "Toda Vicerrectoría temática (Formación, Investigaciones, Contextos) coordina su función misional respectiva"
    - "Las tres funciones se enriquecen mutuamente (no son estancas)"
  ddd_ubiquitous_terms:
    - "Funciones Misionales"
    - "PM1 Formación-Docencia"
    - "PM2 Investigación-Creación-Innovación"
    - "PM3 Contextos-Extensión-Proyección Social"
    - "Vicerrectoría temática"

applicable_domain: "UDFJC, vigente desde 2025-05-06; criterio de validez de cualquier programa o proyecto institucional."
assumptions:
  - "La integración de las 3 funciones es operacionalizable institucionalmente"
  - "Las Vicerrectorías temáticas coordinan eficazmente sus funciones respectivas"
breaks_at:
  - "Si una Escuela elimina alguna de las 3 funciones (violación del Art. 7)"
  - "Si las Vicerrectorías compiten en lugar de coordinar (riesgo de fragmentación)"
extends_to: "[[con-vicerrectoria-formacion]] · [[con-vicerrectoria-investigacion-creacion-innovacion]] · [[con-vicerrectoria-contextos-extension]]"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-funciones-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-funciones-pm1-coord-vrf
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-formacion]]"
    rel_frame: skos
    rel_propiedades:
      ddd_evidence: "Vicerrectoría de Formación coordina PM1"
  - rel_id: rel-funciones-pm2-coord-vri
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-investigacion-creacion-innovacion]]"
    rel_frame: skos
    rel_propiedades:
      ddd_evidence: "Vicerrectoría de Investigación-Creación-Innovación coordina PM2"
  - rel_id: rel-funciones-pm3-coord-vrc
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-vicerrectoria-contextos-extension]]"
    rel_frame: skos
    rel_propiedades:
      ddd_evidence: "Vicerrectoría de Contextos-Extensión-Proyección Social coordina PM3"
  # — v1.1.0 cross-references M01 (Fase B audit refactor) ——————————
  - rel_id: rel-funciones-aligned-piiom
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-cinco-misiones-piiom]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Cada PM debe alinearse con al menos una misión PIIOM; M01 §4.6 establece esta trazabilidad como condición de cumplimiento Art. 6 Ley 30"
  - rel_id: rel-funciones-frame3-direccionalidad
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las 3 funciones operan bajo Frame 3 (direccionalidad transformativa) — no basta producir o conectar, deben transformar"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 5

tags: [glosario-universal, concepto-normativo, funciones-misionales, pm1-pm2-pm3, art-7, m00-base, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-disenador]
---

# Funciones Misionales (Art. 7 ACU-004-25)

## Definición operativa

Tres funciones constitutivas de la UDFJC enunciadas en el Art. 7 del ACU-004-25, **integradas e indivisibles** institucionalmente, cada una con Vicerrectoría coordinadora y unidad organizativa anclada:

| Función | PM | Vicerrectoría coordinadora | Unidad anclaje | Definición Art. 7 |
|---|:---:|---|---|---|
| **Formación-Docencia** | PM1 | [[con-vicerrectoria-formacion]] | [[con-facultad]] | "Brinda al estudiante una educación integral para el desarrollo de sus potencialidades en la búsqueda de su realización personal, profesional y ciudadana... mediante enfoques y estrategias pedagógicas que orientan los procesos de enseñanza hacia la atención de los diferentes ritmos de aprendizaje, con currículos flexibles." |
| **Investigación-Creación e Innovación** | PM2 | [[con-vicerrectoria-investigacion-creacion-innovacion]] | [[con-instituto]] | "Genera conocimientos, saberes y expresiones artístico-culturales, mediante un sistema incluyente, flexible y dialógico, que desarrolla diversos tipos y modelos de investigación-creación e innovación, y que asume apropiación, transferencia e innovación como componentes fundamentales." |
| **Contextos, Extensión y Proyección Social** | PM3 | [[con-vicerrectoria-contextos-extension]] | [[con-centro]] | "Promueve la interacción y el diálogo permanente entre la Comunidad Universitaria y el entorno local, regional, nacional e internacional, para proyectar y desarrollar las fortalezas institucionales... con el objeto de coadyuvar en la solución de los problemas sociales." |

> Las tres funciones son atravesadas transversalmente por [[con-escuela|Escuelas]] y [[con-caba|CABAs]] que las articulan sobre campos del conocimiento-saber.

## Fuente primaria (cita textual condensada)

> "Son funciones de la Universidad Distrital Francisco José de Caldas: a) Formación-Docencia... b) Investigación-Creación e Innovación... c) Contextos, Extensión y Proyección Social..." — **ACU-004-25 Art. 7** (literales a, b, c).

## Invariantes operativas DDD

1. Las **3 funciones siempre deben coexistir** institucionalmente — ninguna puede eliminarse.
2. **Toda Escuela** debe desarrollar PM1 como anclaje mínimo de su existencia.
3. **Toda Vicerrectoría temática** coordina su función misional respectiva.
4. Las tres funciones **se enriquecen mutuamente** (no son compartimentos estancos).

## Lenguaje ubicuo asociado

Funciones Misionales · PM1 Formación-Docencia · PM2 Investigación-Creación-Innovación · PM3 Contextos-Extensión-Proyección Social · Vicerrectorías temáticas · Articulación misional · Indivisibilidad funcional.

## Notas de aplicación

- **Cuándo invocarlas**: para evaluar la coherencia de cualquier programa, proyecto o contrato. Si una Escuela solo desarrolla PM1 sin PM2 ni PM3, viola el Art. 7 (omisión funcional).
- **Articulación con CCA** (M06): el modelo CCA propone "creditizar V1∧V2∧V3" como unidad indivisible, donde V1=Comprensiva (PM1), V2=Experimental (PM2), V3=Transformativa (PM3). El CCA es **una operacionalización** de las 3 funciones misionales.
- **NO confundir con V1-V5 culturales**: V1-V5 son valores (Soberanía, Emprendimiento, Participación, Ética, Austeridad — M04), distintos de las V1-V3 del CCA y distintos de PM1-PM2-PM3.
