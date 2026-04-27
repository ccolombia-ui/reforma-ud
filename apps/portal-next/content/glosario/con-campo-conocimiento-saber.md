---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:campo-conocimiento-saber
kd_title: "Campo de Conocimiento-Saber (Art. 59 ACU-004-25) — concepto refundacional ontológico"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-04, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Campo de Conocimiento-Saber"

skos_prefLabel: "Campo de Conocimiento-Saber"
skos_altLabel:
  - "Campo de Formación"
  - "Campo de Contexto"
  - "Campo (UDFJC)"
  - "Knowledge-Knowing Field"
skos_hiddenLabel: ["campo", "campo conocimiento", "campo-saber"]
skos_definition: "Escenario social, de interacción y comunicación, que promueve la conformación e integración de comunidades académicas alrededor de intereses comunes, para generar, desarrollar, difundir y apropiar conocimientos y saberes. Es el organizador ontológico fundamental de la estructura académica reformada UDFJC: las Escuelas se organizan por campos del conocimiento-saber (no por afinidad disciplinar amplia como las Facultades del Acuerdo 003/1997). El concepto introduce simétricamente 'conocimientos' (académicos formales) y 'saberes' (populares, tradicionales, ancestrales, comunitarios), materializando el principio de Soberanía Cognitiva (Art. 5g) en la estructura académica. Existen tres modalidades: campo de formación, campo de investigación-creación-innovación, campo de contextos."
skos_scopeNote: "Tercero de los conceptos refundacionales sin precedente en el Acuerdo CSU 003/1997 (junto con Buen Vivir y Soberanía Cognitiva). Reordena ontológicamente la institución: NO es 'área disciplinar' ni 'departamento' ni 'línea temática' — es escenario social-comunicativo de comunidades alrededor de pares conocimiento-saber. La distinción 'conocimientos y saberes' es deliberada y refleja la pluralidad epistémica del nuevo Estatuto."
skos_example: "El campo del conocimiento-saber 'Energías y Sostenibilidad Comunitaria' organiza una Escuela donde coexisten conocimientos académicos (termodinámica, electromagnetismo, electroquímica) y saberes territoriales (gestión comunitaria de microgrids, agroecología, sistemas hidráulicos campesinos), con docentes-investigadores-estudiantes y CABAs transversales que articulan ambos."
skos_notation: "Campo"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Escenario social-comunicacional ontológico"
iso_differentia: "Organiza comunidades académicas alrededor de pares conocimientos-saberes (académicos formales + populares-tradicionales-ancestrales); base estructurante de Escuelas reformadas; reemplaza 'afinidad disciplinar' del Acuerdo 003/1997"
iso_subject_field: "Estructura académica reformada / Epistemología institucional / Ontología organizativa universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 59"

align_schema_type: DefinedTerm
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.9
pasteur_axis_knowledge: 0.95

concepto_capabilities: [NORMATIVE, NEON]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 59 (definición); Art. 69 (Escuelas se organizan por campo del conocimiento-saber)"
  norm_jurisdiction: "Acuerdo Superior UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Toda Escuela debe organizarse explícitamente por uno o varios campos del conocimiento-saber declarados"
  norm_supersedes: "Concepto NUEVO en ACU-004-25; sin precedente exacto en Acuerdo CSU 003/1997 (que organizaba por 'afinidad disciplinar amplia')"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Bourdieu (1971-1990) 'campo' como espacio social estructurado + Foucault (1969) 'episteme' + de Sousa Santos (2009) 'ecología de saberes' + tradiciones de pueblos originarios + ACU-004-25"
  neon_alignment_confidence: 0.85
  neon_methodological_notes: "Fusión NeOn S5 de tres corrientes: (a) sociología del campo (Bourdieu) que aporta la noción de espacio social estructurado de relaciones de poder y capital simbólico; (b) ecología de saberes (de Sousa Santos) que aporta el reconocimiento simétrico de conocimientos y saberes; (c) cosmovisiones de pueblos originarios que aportan el par 'conocimiento-saber' como sustantivo conjunto. La adopción institucional UDFJC es propietaria — adaptada a contexto universitario público colombiano."

applicable_domain: "Estructura académica UDFJC desde 2025-05-06; criterio de validez para creación de Escuelas, definición de Programas Académicos y articulación con CABAs"
assumptions:
  - "El reconocimiento simétrico conocimientos-saberes es operacionalizable curricularmente"
  - "Los Claustros de Escuela son espacios para definir colectivamente el campo específico"
breaks_at:
  - "Si una Escuela se organiza por afinidad administrativa (no por campo) viola Art. 59"
  - "Si se interpreta solo 'conocimientos' omitiendo 'saberes' (incumple pluralidad epistémica)"
extends_to: "[[con-escuela]] · [[con-caba]] (operacionalizan el campo)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-campo-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
  - rel_id: rel-campo-operacionaliza-soberania-cognitiva
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_strength: 0.95
      skos_evidence: "El par 'conocimiento-saber' materializa estructuralmente la pluralidad epistémica del Art. 5g"
  - rel_id: rel-campo-organiza-escuelas
    rel_nombre: ddd_contains
    rel_direccion: post
    rel_target: "[[con-escuela]]"
    rel_frame: skos
    rel_propiedades:
      ddd_evidence: "Art. 69: las Escuelas se organizan por campo del conocimiento-saber"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 4

tags: [glosario-universal, concepto-normativo, refundacional, campo-conocimiento-saber, art-59, m00-base, concepto-nuevo, organizador-ontologico, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# Campo de Conocimiento-Saber (Art. 59 ACU-004-25)

> [!important]+ 🌍 Concepto refundacional · organizador ontológico de la nueva estructura académica
> Tercero de los **conceptos refundacionales sin precedente** en el Acuerdo CSU 003/1997 (junto con Buen Vivir y Soberanía Cognitiva). Reordena ontológicamente la institución: las Escuelas ya **NO se organizan por afinidad disciplinar amplia** (modelo Facultad del 003/1997) sino por **campo del conocimiento-saber** — escenario social-comunicacional de comunidades alrededor de pares de conocimientos académicos formales **y** saberes populares-tradicionales-ancestrales.

## Definición operativa (cita literal)

> "Es un escenario social, de interacción y comunicación, que promueve la conformación e integración de comunidades académicas alrededor de intereses comunes, para generar, desarrollar, difundir y apropiar, conocimientos y saberes." — **ACU-004-25 Art. 59**.

## Tres modalidades de campo (Art. 60)

| Modalidad | Vicerrectoría coordinadora | Unidad organizativa anclaje |
|---|---|---|
| **Campo de Formación** | [[con-vicerrectoria-formacion]] | [[con-facultad]] |
| **Campo de Investigación-Creación-Innovación** | [[con-vicerrectoria-investigacion-creacion-innovacion]] | [[con-instituto]] |
| **Campo de Contextos** | [[con-vicerrectoria-contextos-extension]] | [[con-centro]] |

## La distinción "conocimientos" vs "saberes" (clave epistémica)

| Conocimientos | Saberes |
|---|---|
| Académicos formales | Populares, tradicionales, ancestrales, comunitarios |
| Validados por método científico | Validados por experiencia colectiva |
| Producidos por academia | Producidos por comunidades portadoras |
| Curriculo formal | Currículo experiencial-territorial |

> El par **es deliberadamente simétrico**: ningún componente es subordinado al otro. Materializa el principio (g) Pluralidad y Diversidad de Saberes (Art. 5g) = [[con-soberania-cognitiva|Soberanía Cognitiva]].

## Genealogía conceptual (NeOn S5)

| Fuente | Aporte |
|---|---|
| **Bourdieu (1971-1990)** | Concepto de "campo" como espacio social estructurado de relaciones de poder y capital simbólico |
| **Foucault (1969) 'episteme'** | Marco para entender la diversidad de regímenes de verdad |
| **de Sousa Santos (2009) 'ecología de saberes'** | Reconocimiento simétrico de conocimientos y saberes |
| **Tradiciones de pueblos originarios** | El par 'conocimiento-saber' como sustantivo conjunto |
| **Adopción UDFJC ACU-004-25** | Aplicación propietaria a estructura universitaria pública |

## Lenguaje ubicuo asociado

Campo · Campo de Conocimiento-Saber · Campo de Formación · Campo de Investigación · Campo de Contextos · Conocimientos y saberes · Pluralidad epistémica · Comunidades académicas alrededor de pares.

## Notas de aplicación

- **Cuándo invocarlo**: como criterio de validez para crear/reformar Escuelas. Una Escuela DEBE poder declarar explícitamente el o los campos del conocimiento-saber que la organizan.
- **NO confundir con departamento ni con área**: el campo es un **escenario social** (no una unidad administrativa). Una Escuela puede organizarse por uno o varios campos articulados.
- **Riesgo aplicación reduccionista**: si solo se conserva 'conocimientos' omitiendo 'saberes', se incumple la pluralidad epistémica del Art. 59 + Art. 5g. La distinción NO es ornamental.
- **Conexión con CABAs**: las CABAs (Art. 73) son **células dinámicas** que pueden atravesar varios campos transversalmente, materializando interdisciplinariedad y transdisciplinariedad.
