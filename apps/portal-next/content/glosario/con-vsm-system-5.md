---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:vsm-system-5
kd_title: "VSM System 5 (Beer 1979) — función de identidad-propósito en sistemas viables"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-01, sec-MI12-08, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "VSM System 5"

skos_prefLabel: "VSM System 5 (Beer 1979)"
skos_altLabel: ["System 5", "Sistema 5 Viable Systems Model", "Identity & Ethos VSM"]
skos_hiddenLabel: ["vsm-s5", "system-5-beer", "modelo-sistemas-viables"]
skos_definition: "Quinto subsistema del Modelo de Sistemas Viables (Viable Systems Model, VSM) formulado por Stafford Beer (*The Heart of Enterprise*, 1979). Representa la función auto-referencial de **identidad y propósito** (ethos) de una organización viable. Mientras los Sistemas 1-4 gestionan operaciones, coordinación, control e inteligencia, el Sistema 5 responde a la pregunta '¿qué somos y para qué existimos?'. Sin Sistema 5 explícito, una organización puede tener excelentes operaciones internas pero carecer de coherencia direccional. En el contexto de reforma UDFJC, el constructo Omega-Meta-Telos (ΩMT) opera análogamente al Sistema 5: provee la identidad-propósito que da coherencia al resto de subsistemas institucionales."
skos_scopeNote: "VSM tiene 5 subsistemas jerárquicos: S1 (Operaciones), S2 (Coordinación), S3 (Gestión integrada del aquí-y-ahora + S3* auditoría), S4 (Inteligencia + Adaptación al entorno), S5 (Identidad-Ethos). El S5 es función esencial: en su ausencia los demás operan sin direccionalidad coherente. Aplicado a universidades, es el espacio natural del meta-propósito ético-político."
skos_example: "Una IES con S5 explícito (ej. ΩMT UDFJC = Buen Vivir + Soberanía Cognitiva + 5 Misiones PIIOM) puede orientar coherentemente sus PM1-PM2-PM3. Una IES sin S5 explícito puede ser eficiente operativamente (S1-S4) pero direccionalmente incoherente."
skos_notation: "S5"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Subsistema del Modelo de Sistemas Viables (cibernética organizacional)"
iso_differentia: "Función de identidad-propósito (ethos); auto-referencial; cohesiona S1-S4"
iso_subject_field: "Cibernética organizacional / Modelo de Sistemas Viables / Diseño institucional"
iso_term_status: preferred
iso_standardized_by: "Beer, S. (1979). *The Heart of Enterprise*. Wiley."

align_schema_type: DefinedTerm
align_dbpedia: "http://dbpedia.org/resource/Viable_system_model"
align_wikidata: "https://www.wikidata.org/wiki/Q1762523"

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.6
pasteur_axis_knowledge: 0.95

concepto_capabilities: [NEON]

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[beer1979heart]] — Beer, S. (1979). *The Heart of Enterprise*. Wiley."
  neon_alignment_confidence: 0.95

applicable_domain: "Diseño organizacional sistémico / Cibernética de segundo orden / Universidades como sistemas viables"
assumptions: ["Una organización viable requiere los 5 subsistemas operando coherentemente"]
breaks_at: ["Si se aplica reduccionistamente sin entender el resto del VSM"]
extends_to: "[[con-omt]] (operacionalización UDFJC del System 5)"

recorded_at: "2026-04-26"
valid_from: "1979-01-01"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-vsm-s5-fuente-beer
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[beer1979heart]]"
    rel_frame: bibliografico
  - rel_id: rel-vsm-s5-aplicado-omt
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-omt]]"
    rel_frame: skos

cited_in: ["[[sec-MI12-01--mandato-normativo]]"]
cited_count: 1

tags: [glosario-universal, concepto-academico, vsm-system-5, beer-1979, cibernetica-organizacional, m01-corpus, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-neon, layer-investigador]
---

# VSM System 5 — Beer (1979)

## Definición operativa

Quinto subsistema del **Modelo de Sistemas Viables (VSM)** de Stafford Beer. Función auto-referencial de **identidad y propósito (ethos)**. Responde la pregunta: *"¿qué somos y para qué existimos?"*.

## Los 5 subsistemas VSM

| Subsistema | Función | Pregunta rectora |
|:-:|---|---|
| **S1** | Operaciones | ¿Cómo hacemos? |
| **S2** | Coordinación | ¿Cómo evitamos conflicto? |
| **S3** + S3* | Gestión integrada + auditoría | ¿Cómo está hoy? |
| **S4** | Inteligencia + adaptación al entorno | ¿Qué viene mañana? |
| **S5** | **Identidad + Ethos** | **¿Qué somos? ¿Para qué?** |

## Fuente primaria

> Beer, S. (1979). *The Heart of Enterprise*. Wiley.

## Lenguaje ubicuo asociado

S5 · System 5 · Identidad-Ethos · Cibernética organizacional · VSM · Sistemas Viables.

## Notas de aplicación

- **Conexión M01**: §2.2 invoca System 5 como base teórica del [[con-omt|ΩMT]] universitario.
- **Operacionalización UDFJC**: el ΩMT (Buen Vivir + Soberanía Cognitiva + Defensa de lo Público + 5 Misiones PIIOM) materializa institucionalmente la función S5.
