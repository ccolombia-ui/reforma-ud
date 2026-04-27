---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:soberania-cognitiva
kd_title: "Soberanía Cognitiva (principio constitutivo UDFJC, Art. 5g ACU-004-25)"
kd_type: glosario-universal
kd_parent: urn:aleia:udfjc:reforma:cap-mi12
kd_status: APPROVED
kd_version: v1.0.0
kd_created: 2026-04-26
kd_updated: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
kd_transcluible_en: [sec-MI12-00, sec-MI12-01, sec-MI12-02, sec-MI12-04, sec-MI12-12]

tupla_tipo: DEFINITION
tupla_concepto: "Soberanía Cognitiva"

skos_prefLabel: "Soberanía Cognitiva"
skos_altLabel:
  - "Pluralidad y Diversidad de Saberes"
  - "Soberanía epistémica"
  - "Soberanía del conocimiento"
  - "Cognitive Sovereignty"
skos_hiddenLabel: ["soberania-cognitiva", "pluralidad de saberes", "epistemic sovereignty"]
skos_definition: "Principio constitutivo de la UDFJC reformada que reconoce la pluralidad y diversidad de saberes —académicos formales, populares, tradicionales, ancestrales, comunitarios— como bases legítimas y complementarias para la búsqueda de la excelencia y el mantenimiento del Buen Vivir. Implica capacidad institucional de producir conocimiento propio (no solo importar conocimiento del Norte global) y de dialogar simétricamente con saberes locales, indígenas, campesinos y populares sin jerarquizarlos como inferiores. Conceptualizado en el ACU-004-25 Art. 5g (principio de Pluralidad y Diversidad de Saberes) e implícito en la categoría 'campo del conocimiento-saber' (Art. 59)."
skos_scopeNote: "Es el segundo de los tres conceptos refundacionales sin precedente en el Acuerdo CSU 003/1997 (junto con Buen Vivir y Campo). Marca un giro epistémico desde el modelo positivista monológico hacia una pluralidad metodológica y ontológica de saberes."
skos_example: "Un proyecto de investigación PM2 que sistematice saberes agroecológicos campesinos sobre suelos andinos colombianos y los publique como conocimiento académico válido (con coautoría comunitaria) materializa Soberanía Cognitiva. Un proyecto que importa modelo agroindustrial estandarizado del Norte sin diálogo con saberes locales no la materializa."
skos_notation: "Soberanía Cognitiva"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Principio epistémico-político de pluralidad de saberes"
iso_differentia: "Reconoce simétricamente saberes académicos, populares, tradicionales y ancestrales como complementarios; rechaza jerarquías epistémicas coloniales"
iso_subject_field: "Epistemología decolonial / Filosofía de la educación / Sociología del conocimiento / Estudios poscoloniales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 5g (Pluralidad y Diversidad de Saberes); implícito en Art. 59 (campo del conocimiento-saber)"

align_schema_type: DefinedTerm
align_dbpedia: ""
align_wikidata: ""

concept_subtype: DEFINITION
pasteur_quadrant: PASTEUR
pasteur_axis_use: 0.85
pasteur_axis_knowledge: 0.95

concepto_capabilities: [NORMATIVE, NEON]

concepto_facet_normative:
  norm_legal_ref: "[[con-acu-004-25]]"
  norm_article: "Art. 5g (Pluralidad y Diversidad de Saberes); implícito Art. 59 (campo conocimiento-saber)"
  norm_jurisdiction: "Consejo Superior Universitario UDFJC"
  norm_effective_date: "2025-05-06"
  norm_legal_force: BINDING
  norm_compliance_scope: "Criterio orientador de toda la producción y reconocimiento de conocimiento institucional UDFJC"
  norm_supersedes: "Concepto NUEVO en ACU-004-25; el Acuerdo 003/1997 no lo contemplaba"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Pensamiento decolonial latinoamericano (de Sousa Santos 2009 'Una epistemología del Sur', Quijano 2000 'Colonialidad del Poder', Walsh 2010 'Pedagogía decolonial', Mignolo 2007 'Geopolítica del Conocimiento') + tradiciones de los pueblos originarios + ACU-004-25"
  neon_alignment_confidence: 0.85
  neon_methodological_notes: "Fusión S5 NeOn de tradición epistemológica decolonial (de Sousa Santos, Quijano, Walsh, Mignolo) + saberes ancestrales + adopción institucional UDFJC. La adopción es propietaria — adaptada a contexto universitario público colombiano. Conecta con la 'ecología de saberes' (de Sousa Santos 2009) y con el reconocimiento de la 'colonialidad del saber' como obstáculo a la diversidad epistémica."

applicable_domain: "UDFJC, vigente desde 2025-05-06; criterio para evaluar diseños metodológicos de investigación, currículos pedagógicos y proyectos de extensión que involucren comunidades portadoras de saberes no académicos."
assumptions:
  - "El reconocimiento simétrico de saberes es operacionalizable en programas curriculares e investigativos"
  - "Las comunidades portadoras de saberes locales pueden ser coautoras y no solo objeto de investigación"
breaks_at:
  - "Si se aplica con literalidad romántica que niega el rigor metodológico"
  - "Si los saberes ancestrales se descontextualizan o se folclorizan"
extends_to: "[[con-campo-conocimiento-saber]] (operacionalización del principio en estructura académica)"

recorded_at: "2026-04-26"
valid_from: "2025-05-06"
lifecycle_state: ACTIVE
concepto_anchor_chain_status: LINEAR

"@type": DefinedTerm

tupla__relations:
  - rel_id: rel-soberaniacog-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: epistemologia-institucional
  - rel_id: rel-soberaniacog-related-buen-vivir
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-buen-vivir]]"
    rel_frame: skos
    bc_domain: filosofia-institucional
    rel_propiedades:
      skos_strength: 0.9
      skos_evidence: "Ambos son principios refundacionales sin precedente; complementarios (Soberanía Cognitiva como dimensión epistémica del Buen Vivir)"
  - rel_id: rel-soberaniacog-operacionalizada-campo
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-campo-conocimiento-saber]]"
    rel_frame: skos
    bc_domain: estructura-academica
    rel_propiedades:
      skos_evidence: "Art. 59 (campo del conocimiento-saber) operacionaliza el principio en la estructura académica al reconocer múltiples comunidades alrededor de saberes diversos"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, refundacional, soberania-cognitiva, pluralidad-saberes, decolonial, art-5g, m00-base, concepto-nuevo, audit-v1]
cssclasses: [keter-iso, concepto-universal, concepto-normativo, layer-investigador]
---

# Soberanía Cognitiva (principio constitutivo UDFJC)

> [!important]+ 🌍 Concepto refundacional sin precedente · giro epistémico decolonial
> Segundo de los **tres conceptos refundacionales sin precedente** en el Acuerdo 003/1997 (junto con Buen Vivir y Campo del conocimiento-saber). Marca un giro epistémico desde el modelo positivista monológico hacia una **pluralidad metodológica y ontológica de saberes** — académicos formales, populares, tradicionales, ancestrales, comunitarios — reconocidos simétricamente como bases legítimas y complementarias del conocimiento institucional UDFJC.

## Definición operativa

Principio constitutivo de la UDFJC reformada que reconoce la **pluralidad y diversidad de saberes** —académicos formales, populares, tradicionales, ancestrales, comunitarios— como bases **legítimas y complementarias** para la búsqueda de la excelencia y el mantenimiento del Buen Vivir.

Implica:
1. **Capacidad institucional** de producir conocimiento propio (no solo importar conocimiento del Norte global).
2. **Diálogo simétrico** con saberes locales, indígenas, campesinos y populares **sin jerarquizarlos como inferiores**.
3. **Coautoría posible** entre la academia y las comunidades portadoras de saberes ancestrales.
4. **Reconocimiento curricular** de epistemologías no eurocéntricas en programas académicos.

## Fuentes primarias (citas textuales)

> "Pluralidad y Diversidad de Saberes — Reconocimiento diverso de saberes, en la búsqueda de la excelencia y el mantenimiento del buen vivir." — **ACU-004-25 Art. 5g** (paráfrasis del principio).

> "El campo es un escenario social, de interacción y comunicación, que promueve la conformación e integración de comunidades académicas alrededor de intereses comunes, para generar, desarrollar, difundir y apropiar, **conocimientos y saberes**." — **ACU-004-25 Art. 59** (uso del par "conocimientos y saberes" como reconocimiento de pluralidad).

## Genealogía conceptual (NeOn S5)

Fusión de tres corrientes:

| Fuente | Aporte |
|---|---|
| **Pensamiento decolonial latinoamericano** | de Sousa Santos (2009) *Una epistemología del Sur*; Quijano (2000) *Colonialidad del Poder*; Walsh (2010) *Pedagogía decolonial*; Mignolo (2007) *Geopolítica del Conocimiento* |
| **Saberes ancestrales** de pueblos originarios | Andinos, amazónicos, afrocolombianos, raizales, rom |
| **Adopción institucional UDFJC** | ACU-004-25 Art. 5g + Art. 59 (campo del conocimiento-saber) |

## Lenguaje ubicuo asociado

Soberanía Cognitiva · Pluralidad de Saberes · Diversidad epistémica · Ecología de saberes (de Sousa Santos) · Conocimientos y saberes (par lingüístico recurrente en ACU-004-25) · Diálogo simétrico de saberes · Decolonialidad del saber.

## Notas de aplicación

- **Cuándo invocarla**: diseño metodológico de investigaciones que involucren comunidades portadoras de saberes; currículos con enfoque intercultural; programas de extensión territorial con comunidades étnicas o campesinas; criterios de productos investigativos no convencionales (videos, podcasts, sistematización oral).
- **Cuándo NO basta**: cuando el problema es estrictamente científico-experimental sin componente epistémico-cultural (ej. caracterizar propiedades térmicas de un material — ahí basta el método estándar).
- **Riesgo aplicación romántica**: la Soberanía Cognitiva NO niega el rigor metodológico, lo expande. NO debe confundirse con relativismo "todo vale".
- **Riesgo folclorización**: el reconocimiento de saberes ancestrales debe respetar a las comunidades portadoras y evitar extracción epistémica sin retribución.
- **Conexión con M02-M12**: el ciclo virtuoso ΩMT (M02) y los 6 roles JTBD (M04) deben operacionalizar este principio en sus indicadores de éxito (no solo papers Q1, también productos investigativos no convencionales legítimos).
