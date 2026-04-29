---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:funciones-misionales
kd_title: "Funciones Misionales (Art. 7 ACU-004-25) — PM1 Formación · PM2 Investigación-Creación-Innovación · PM3 Contextos-Extensión-Proyección Social"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Funciones Misionales UDFJC"

skos_prefLabel: "Funciones Misionales (PM1, PM2, PM3)"
skos_altLabel:
  - "Procesos Misionales"
  - "Tres funciones de la educación superior"
  - "PM1-PM2-PM3"
  - "Misiones académicas universitarias"
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

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE
  - DDD

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-ley-30-1992-art-6]]"
      adopter_locator: "Ley 30/1992 Art. 6 · objetivos misionales IES vinculantes"
      adopter_authority_level: LEGAL
      adopted_at: "1992-12-28"
      adoption_evidence: "Ley 30/1992 establece el deber misional vinculante para IES colombianas · base legal del Art. 7 ACU-004-25"
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 7 (literales a, b, c)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 declara 3 funciones misionales · supersede denominaciones del ACU 003/1997 incorporando 'investigación-creación-innovación' y 'contextos'"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO
  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 7 (a, b, c)"
  normative_text: "[Texto literal Art. 7 · 3 funciones misionales: PM1 Formación + PM2 Investigación-Creación-Innovación + PM3 Contextos-Extensión-Proyección Social]"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates: ["Funciones declaradas en Acuerdo CSU 003/1997 (denominaciones distintas)"]
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

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

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-7-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-7-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"
  - "[[con-ley-30-1992-art-6]]"

applicable_domain: "UDFJC, vigente desde 2025-05-06; criterio de validez de cualquier programa o proyecto institucional."
assumptions:
  - "La integración de las 3 funciones es operacionalizable institucionalmente"
  - "Las Vicerrectorías temáticas coordinan eficazmente sus funciones respectivas"
breaks_at:
  - "Si una Escuela elimina alguna de las 3 funciones (violación del Art. 7)"
  - "Si las Vicerrectorías compiten en lugar de coordinar (riesgo de fragmentación)"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: docente-disenador


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
  # — v1.2.0 cross-references M02 (Fase B audit refactor) ——————————
  - rel_id: rel-funciones-equivale-pm
    rel_nombre: skos_closeMatch
    rel_direccion: co
    rel_target: "[[con-procesos-misionales-pm1-pm2-pm3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Funciones Misionales (M00 Art. 7) ≅ Procesos Misionales PM1-PM2-PM3 (M02). Mismo referente conceptual con dos etiquetados distintos según contexto del paper."

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 5

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - funciones-misionales
  - pm1-pm2-pm3
  - art-7
  - m00-base
  - audit-v2-2
  - tpl-v2
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
