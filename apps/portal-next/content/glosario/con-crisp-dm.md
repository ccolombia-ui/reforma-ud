---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:crisp-dm
kd_title: "CRISP-DM — Cross-Industry Standard Process for Data Mining"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "CRISP-DM — Cross-Industry Standard Process for Data Mining"
skos_altLabel: ["Cross Industry Standard Process Data Mining", "CRISP-DM 1.0", "CRISP-DM Methodology"]
skos_definition: "Metodología estándar de minería de datos formulada por un consorcio europeo (Chapman et al. 1999-2000) que estructura cualquier proyecto de análisis de datos en seis fases iterativas: (1) Business Understanding — entender el problema y los objetivos; (2) Data Understanding — explorar los datos disponibles; (3) Data Preparation — limpiar y transformar; (4) Modeling — construir y entrenar modelos; (5) Evaluation — verificar resultados contra objetivos; (6) Deployment — implementar en producción. Es la metodología más usada en data science empresarial y académico. Aplicada al cap-MI12, CRISP-DM se usa para estructurar la transformación universitaria como proyecto analítico de gran escala: M01-M07 corresponden a fases 1-3 (entendimiento + datos), M08-M11 a fases 2-4, y M12 (síntesis) a fases 5-6 (evaluación + deployment del roadmap)."
skos_scopeNote: "CRISP-DM NO es exclusivamente para machine learning — su valor para reforma UDFJC es metodológico-estructural: provee disciplina iterativa para procesos de transformación complejos. Permite identificar qué fase falta o está incompleta en cualquier momento del proyecto."
skos_example: "Aplicado al cap-MI12: Fase 1 Business Understanding = ¿qué obliga la reforma? (M01); Fase 2 Data Understanding = ¿qué evidencia tenemos? (M05 BMK-001 21 IES); Fase 5 Evaluation = ¿qué tan cerca está UDFJC del objetivo? (M11 datasets MEN); Fase 6 Deployment = ¿cuál es el roadmap operativo? (M12)."
skos_notation: "CRISP-DM"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Metodología de proyecto de minería de datos / análisis de transformación"
iso_differentia: "6 fases iterativas (Business → Data → Preparation → Modeling → Evaluation → Deployment); aplicable a transformaciones organizacionales complejas no solo a ML"
iso_subject_field: "Data Science / Metodologías de proyecto / Transformación organizacional"
iso_term_status: preferred
iso_standardized_by: "Chapman, P., Clinton, J., Kerber, R., Khabaza, T., Reinartz, T., Shearer, C., Wirth, R. (2000). CRISP-DM 1.0: Step-by-step Data Mining Guide. *SPSS White Paper*"

align_dbpedia: "http://dbpedia.org/resource/Cross-industry_standard_process_for_data_mining"
align_wikidata: "https://www.wikidata.org/wiki/Q1142891"

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-08--framework-bsc-rbm-crisp]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 4

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t3-metodologico-instrumental
  - crisp-dm
  - data-science
  - chapman-2000
  - m01-corpus
  - audit-v2-2
---


# CRISP-DM — Cross-Industry Standard Process for Data Mining

## Definición operativa

Metodología estándar de minería de datos (Chapman et al. 1999-2000) con **6 fases iterativas**:

| # | Fase | Pregunta rectora |
|:-:|---|---|
| 1 | **Business Understanding** | ¿Qué problema resolvemos? |
| 2 | **Data Understanding** | ¿Qué datos tenemos? |
| 3 | **Data Preparation** | ¿Cómo los limpiamos? |
| 4 | **Modeling** | ¿Qué modelo construimos? |
| 5 | **Evaluation** | ¿Cumplió los objetivos? |
| 6 | **Deployment** | ¿Cómo lo implementamos? |

## Aplicación al cap-MI12

| Fase CRISP-DM | Sección cap-MI12 |
|---|---|
| 1 Business + 2 Data + 3 Preparation | M01 mandato + M02-M07 análisis |
| 2-4 Data + Modeling | M05-M08 BMK-001/002 + framework |
| 5-6 Evaluation + Deployment | **M12 meta-paper integrador** |

## Fuente primaria

> Chapman, P. et al. (2000). *CRISP-DM 1.0: Step-by-step Data Mining Guide*. SPSS White Paper.

## Lenguaje ubicuo asociado

CRISP-DM · 6 fases · Data Mining · Business Understanding · Deployment.

## Notas de aplicación

- **Conexión M12**: el meta-paper materializa fases 5-6.
- **NO es solo para ML**: aplicable a transformaciones organizacionales complejas.
