---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:mlp-geels
kd_title: "MLP — Multi-Level Perspective de Geels (perspectiva multinivel sobre transiciones sociotécnicas)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Multi-Level Perspective (MLP) de Geels"

skos_prefLabel: "MLP — Multi-Level Perspective (Geels 2002)"
skos_altLabel: ["Perspectiva Multinivel", "MLP de Geels", "Multi-Level Perspective on Socio-Technical Transitions", "Geels MLP"]
skos_definition: "Marco analítico desarrollado por Frank W. Geels (2002) para explicar cómo ocurren las **transiciones sociotécnicas** mediante la interacción dinámica entre tres niveles anidados: (i) **Nicho** (niche) — espacios protegidos donde se ensayan innovaciones radicales con reglas alternativas; (ii) **Régimen** (regime) — el conjunto dominante de prácticas, instituciones, tecnologías y reglas que estabilizan el sistema actual; (iii) **Paisaje** (landscape) — el entorno macro de tendencias estructurales (demografía, política, ecología) que ejerce presión externa sobre el régimen. La MLP explica que las transiciones ocurren cuando la presión del paisaje desestabiliza el régimen y crea ventanas de oportunidad para que los nichos maduros emerjan y reconfiguren el sistema. En 2007, Geels & Schot extienden el modelo identificando **cuatro patrones de transición** según la naturaleza de la presión del paisaje y la madurez de los nichos: (P1) Reproducción, (P2) Transformación, (P3) Reconfiguración, (P4) Sustitución. Aplicada al contexto UDFJC, la MLP modela la reforma estatutaria ACU-004-25 como una **perturbación de paisaje** que abre ventana para que las CABAs (nichos transformativos) reconfiguren el régimen sub-N1 dominante."
skos_scopeNote: "MLP NO es teoría predictiva — es marco analítico ex-post para entender por qué ciertas transiciones ocurren y otras no. Aplicada a reformas universitarias: el régimen es la 'universidad-departamento-silo'; los nichos son CABAs/escuelas-piloto; el paisaje son fuerzas como crisis ecológica + Frame 3 + ODS. La MLP es complementaria (no contradictoria) con el Frame 3 de Schot & Steinmueller — la MLP explica el cómo, Frame 3 el por qué transformativo."
skos_example: "Aplicada a UDFJC 2025-2034: el ACU-004-25 (paisaje/perturbación de régimen) abre ventana para que las CABAs (nichos) escalen de pilotos protegidos a la nueva configuración institucional N4. El patrón esperado es **Reconfiguración** (P3 de Geels & Schot 2007): el régimen incorpora elementos del nicho sin colapsar — coexistencia Facultad-Escuela-CABA durante el período de transición."
skos_notation: "MLP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco analítico de transiciones sociotécnicas multinivel"
iso_differentia: "3 niveles anidados (nicho-régimen-paisaje); 4 patrones de transición Geels-Schot 2007; co-evolutivo no determinista; aplicable a transformaciones organizacionales complejas"
iso_subject_field: "Sustainability transitions / Innovation studies / Sociotechnical change"
iso_term_status: preferred
iso_standardized_by: "Geels, F. W. (2002). Technological transitions as evolutionary reconfiguration processes: a multi-level perspective and a case-study. *Research Policy* 31(8-9): 1257-1274. + Geels & Schot (2007). Typology of sociotechnical transition pathways. *Research Policy* 36(3): 399-417."

align_dbpedia: "http://dbpedia.org/resource/Multi-level_perspective_on_sustainability_transitions"
align_wikidata: ""

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "[[geels2002mlp]] + [[geels2007typology]] + literatura sustainability transitions contemporánea"
  neon_alignment_confidence: 0.95

applicable_domain: "Análisis de transiciones sociotécnicas + reformas universitarias sistémicas + transformaciones institucionales con coexistencia régimen-nicho"
assumptions:
  - "Las transiciones requieren co-evolución de nichos maduros y desestabilización de régimen"
  - "El paisaje opera como factor exógeno relativamente lento pero estructural"
  - "Los nichos protegidos son condición necesaria (no suficiente) de transición exitosa"
breaks_at:
  - "Si se aplica como teoría predictiva determinista (es marco analítico)"
  - "Si los nichos no tienen mecanismos formales de protección (los absorbe el régimen)"

valid_from: "2002-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-mlp-explica-transicion-acu
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-acu-004-25]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El ACU-004-25 opera como perturbación de paisaje en términos MLP: legitima los nichos (CABAs), les da marco legal y los conecta con financiamiento PIIOM. Es la ventana de oportunidad que la MLP identifica como condición necesaria de transición."
  - rel_id: rel-mlp-complementa-frame3
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-frame-3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "MLP y Frame 3 son marcos complementarios: MLP explica el CÓMO de las transiciones (mecánica multinivel); Frame 3 explica el POR QUÉ transformativo (direccionalidad hacia misiones)."
  - rel_id: rel-mlp-fundamenta-salto-cuantico
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-salto-cuantico-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El salto cuántico Sub-N1 → N4 vía CABAs es una aplicación directa del patrón Reconfiguración (P3 de Geels & Schot 2007): los nichos protegidos (CABAs) reconfiguran el régimen sin colapsarlo."
  - rel_id: rel-mlp-fundamenta-nichos-emergentes
    rel_nombre: norm_implements
    rel_direccion: post
    rel_target: "[[con-resultados-emergentes-e1-e3]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "E3 (Nichos Transformativos) es un resultado emergente del modelo ΩMT directamente derivado de la MLP — los nichos son el dispositivo MLP por excelencia."
  - rel_id: rel-mlp-articula-conpes
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-conpes-4069]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El CONPES 4069 adopta direccionalidad Frame 3 (que MLP fundamenta): legitima nichos transformativos como dispositivos de política CTI nacional."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-academico
  - t2-academico-teorico
  - mlp-geels
  - transiciones-sociotecnicas
  - geels-2002
  - m02-corpus
  - audit-v2-2
---


# MLP — Multi-Level Perspective (Geels 2002)

## Definición operativa

Marco analítico de **transiciones sociotécnicas** desarrollado por Frank W. Geels (2002) que articula tres niveles anidados:

| Nivel | Naturaleza | Velocidad de cambio | Ejemplo UDFJC |
|---|---|---|---|
| **Paisaje** (landscape) | Tendencias macro estructurales | Décadas | Crisis ecológica · ODS · Frame 3 |
| **Régimen** (regime) | Prácticas, instituciones, tecnologías dominantes | Años | Universidad-departamento-silo (sub-N1) |
| **Nicho** (niche) | Espacios protegidos de innovación radical | Meses | CABAs · Escuelas-piloto |

## Cuatro patrones de transición (Geels & Schot 2007)

| Patrón | Presión paisaje | Madurez nicho | Resultado |
|:-:|:-:|:-:|---|
| **P1 Reproducción** | Baja | Baja | Statu quo |
| **P2 Transformación** | Alta | Baja | Régimen se ajusta sin reemplazo |
| **P3 Reconfiguración** | Alta | Media | Régimen incorpora elementos del nicho |
| **P4 Sustitución** | Alta | Alta | Nicho reemplaza al régimen |

## Fuente primaria

> Geels, F. W. (2002). Technological transitions as evolutionary reconfiguration processes: a multi-level perspective and a case-study. *Research Policy* 31(8-9): 1257-1274.
>
> Geels, F. W., & Schot, J. (2007). Typology of sociotechnical transition pathways. *Research Policy* 36(3): 399-417.

## Lenguaje ubicuo asociado

MLP · Multi-Level Perspective · Nicho-Régimen-Paisaje · Ventana de oportunidad · Transición sociotécnica · Reconfiguración · Geels.

## Notas de aplicación

- **Conexión M02 §2.4**: marco teórico fundacional del ciclo virtuoso ΩMT.
- **NO es teoría predictiva**: es marco analítico ex-post para entender mecánicas de transición.
- **Aplicación UDFJC**: ACU-004-25 = perturbación de paisaje + CABAs = nichos + universidad-departamento = régimen. Patrón esperado: P3 Reconfiguración.
- **NO confundir** con frameworks departamentales (no propone una "vicerrectoría de transiciones").
