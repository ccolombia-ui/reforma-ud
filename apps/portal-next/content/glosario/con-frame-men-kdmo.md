---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:frame-men-kdmo
kd_title: "Frame MEN KDMO · arquitectura de ingesta semántica datasets MEN (M11)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "Frame MEN KDMO · arquitectura de ingesta semántica datasets MEN"
skos_altLabel: ["frame-men", "Frame MEN KDMO", "Arquitectura ingesta MEN"]
skos_definition: "Arquitectura propuesta en M11 §4 (Madera Sepúlveda 2026) que aplica el patrón **KDMO frame + profile + entidades** del vault-builder UDFJC (modelo análogo a `frame-nicsp`) para la ingesta semántica de los 3 datasets oficiales del MEN: SNIES + OLE + SPADIES. Estructura: **1 frame-men** (vocabulario controlado de educación superior colombiana) + **3 profiles** (profile-snies, profile-ole, profile-spadies) + **12 entidades**: programa, cohorte, estudiante-anonimizado, egresado-anonimizado, planta, deserción-evento, vinculación-evento, salario-mediana, sector, ies, departamento, modalidad. Cada entidad se modela como JSONL Schema con propiedades tipadas + relaciones tipadas + alineación SKOS/ISO 1087 análoga al patrón concepto-universal v5.2. Aplicado al cap-MI12: frame-men es la **infraestructura técnica** de ingesta de datasets MEN al corpus analítico UDFJC; sin frame-men, los datasets se mantendrían como CSVs aislados sin trazabilidad semántica."
skos_scopeNote: "Frame MEN KDMO NO es dataset — es ARQUITECTURA de ingesta. Permite que SNIES + OLE + SPADIES se consulten con queries semánticas unificadas en lugar de joins ad-hoc. NO confundir con frame-nicsp (presupuestal) que es análogo arquitectónicamente pero distinto en dominio."
skos_example: "Query semántica frame-men: '¿Cuál es la correlación entre tasa graduación SNIES (P1) y salario mediana OLE (R6) por programa UDFJC, controlando por deserción acumulada SPADIES?' — sin frame-men sería join SQL multidominio frágil; con frame-men es query SPARQL/GraphQL trazable."
skos_notation: "frame-men KDMO"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Arquitectura de ingesta semántica de datasets oficiales gubernamentales"
iso_differentia: "1 frame + 3 profiles + 12 entidades; modelo KDMO concepto-universal v5.2; aplicado a SNIES + OLE + SPADIES"
iso_subject_field: "Knowledge engineering / Data architecture / Semantic ingestion"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M11 §4 — diseño propio sobre patrón vault-builder UDFJC"

pasteur_quadrant: PASTEUR







cited_in: ["[[sec-MI12-11--datasets-men]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t6-datos-sistemas
  - frame-men-kdmo
  - arquitectura-ingesta-semantica
  - propietario-udfjc
  - m11-corpus
  - audit-v2-2
---


# Frame MEN KDMO · arquitectura de ingesta semántica

## Definición operativa

Arquitectura **1 frame + 3 profiles + 12 entidades** para ingesta semántica de SNIES + OLE + SPADIES.

## 12 entidades

programa · cohorte · estudiante-anonimizado · egresado-anonimizado · planta · deserción-evento · vinculación-evento · salario-mediana · sector · ies · departamento · modalidad.

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). M11 §4. *Capítulo MI-12*. UDFJC.

## Lenguaje ubicuo asociado

frame-men KDMO · profile-snies/ole/spadies · 12 entidades · JSONL Schema.

## Notas de aplicación

- **Conexión M11**: arquitectura técnica del paper.
- **Análogo** a frame-nicsp (vault-builder UDFJC) en otro dominio.
