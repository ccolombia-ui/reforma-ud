---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:glosario-universal:readme
kd_title: "Glosario Universal — README · corpus conceptual de la reforma UDFJC"
kd_type: glosario-universal-readme
kd_status: ACTIVE
kd_version: v1.0.0
kd_created: 2026-04-26
kd_responsible: urn:aleia:hu:ccolombia
tags: [glosario-universal, readme, corpus-conceptual, m00-base]
---

# Glosario Universal — corpus conceptual de la reforma vinculante UDFJC

> **Propósito**: este folder contiene los **conceptos-universales** que sustentan el grafo de conocimiento de la reforma UDFJC, modelados con el estándar `concepto-universal` v5.2 de aleia-zen y con el **máximo rigor** posible para conceptos normativos institucionales.

## Origen del corpus (M00)

El corpus se inicializa en M00 (`sec-MI12-00--carta-constitucional-acu-004-25.md`) extrayendo todos los conceptos canónicos del **Acuerdo CSU UDFJC 04 de 2025** —la carta constitucional que refunda la Universidad. M01-M11 enriquecen este corpus incrementalmente.

## Convenciones de modelado

Cada archivo `con-X.md` sigue concepto-universal v5.2 con capabilities mínimas `[NORMATIVE, DDD]` para conceptos institucionales del ACU-004-25.

### Frontmatter mínimo obligatorio

- **Identidad**: `kd_id` (URN único), `kd_title`, `kd_type`, `kd_parent`, `kd_status`, `kd_version`, `kd_created`, `kd_updated`, `kd_responsible`.
- **SKOS** (vocabulario controlado): `skos_prefLabel`, `skos_altLabel[]`, `skos_hiddenLabel[]`, `skos_definition`, `skos_scopeNote`, `skos_example`, `skos_notation`.
- **ISO 1087** (terminografía formal): `iso_designation_type`, `iso_definition_type`, `iso_genus`, `iso_differentia`, `iso_subject_field`, `iso_term_status`, `iso_standardized_by`.
- **Alignment KG**: `align_schema_type`, `align_dbpedia`, `align_wikidata`.
- **Pasteur quadrant**: `pasteur_quadrant`, `pasteur_axis_use`, `pasteur_axis_knowledge`.
- **Capabilities + facets v5.2**: `concepto_capabilities`, `concepto_facet_normative` (con `norm_legal_ref`, `norm_article`, `norm_jurisdiction`, `norm_effective_date`, `norm_legal_force`, `norm_compliance_scope`, `norm_supersedes` si aplica).
- **DDD facet** (cuando aplica): `concepto_facet_ddd` con `ddd_id`, `ddd_aggregate_root`, `ddd_bc_ref`, `ddd_role_in_context`, `ddd_invariants[]`, `ddd_ubiquitous_terms[]`.
- **Régimen epistémico**: `applicable_domain`, `assumptions[]`, `breaks_at[]`, `extends_to`.
- **Bitemporal**: `recorded_at`, `valid_from`, `valid_to`, `lifecycle_state`, `concepto_anchor_chain_status`.
- **Schema.org JSON-LD**: `@type`, `@context`.
- **Relations tipadas**: `tupla__relations[]` con frame `skos` o `normativo`.
- **Obsidian rendering**: `tags`, `cssclasses`.

### Body mínimo

- **§ Definición operativa** (3-5 líneas, primer párrafo).
- **§ Fuente primaria** (cita textual del artículo + año + URL).
- **§ Invariantes operativas DDD** (cuando aplica — 3-5 invariantes verificables).
- **§ Lenguaje ubicuo asociado**.
- **§ Notas de aplicación** (cuándo usar / cuándo NO usar / reconciliación de contextos polisémicos).

## Vocabulario CERRADO de relaciones tipadas (NORMATIVE)

Inspirado en ConceptNet 5.5 + LegalRuleML + W3C PROV-O:

| Relación | Significado |
|---|---|
| `norm_supersedes` | Esta norma deroga / sustituye a otra |
| `norm_predecessor` | Norma previa que existía sobre el mismo tema |
| `norm_mandates` | Esta norma obliga a expedir otra |
| `norm_mandated_by` | Esta norma fue obligada por otra |
| `norm_implements` | Operacionaliza un mandato general |
| `norm_amends` | Modifica parcialmente sin derogar |
| `norm_complements` | Complementa sin contradecir |
| `skos_broader` | Concepto padre en jerarquía |
| `skos_narrower` | Concepto hijo en jerarquía |
| `skos_related` | Relación lateral no jerárquica |
| `skos_closeMatch` | Equivalencia conceptual cercana |
| `skos_exactMatch` | Equivalencia conceptual exacta |
| `ddd_part_of` | Pertenece a un agregado mayor |
| `ddd_contains` | Agrupa entidades hijas |

## Inventario fundacional (M00 — corpus ACU-004-25)

38 conceptos identificados en M00 (ver `sec-MI12-00--carta-constitucional-acu-004-25.md` §4):

### Concepto raíz
- [`con-acu-004-25`](con-acu-004-25.md) — el Acuerdo mismo

### Título I — Identidad institucional (Arts. 1-17) · 7 conceptos
1. [`con-udfjc-ente-autonomo`](con-udfjc-ente-autonomo.md) (Art. 1)
2. [`con-mision-institucional-udfjc`](con-mision-institucional-udfjc.md) (Art. 4)
3. [`con-buen-vivir`](con-buen-vivir.md) (Arts. 5a, 1, 88-90)
4. [`con-soberania-cognitiva`](con-soberania-cognitiva.md) (Art. 5g)
5. [`con-10-principios-generales`](con-10-principios-generales.md) (Art. 5)
6. [`con-funciones-misionales`](con-funciones-misionales.md) (Art. 7)
7. [`con-comunidad-universitaria`](con-comunidad-universitaria.md) (Arts. 8-17)

### Título II — Gobierno y participación democrática (Arts. 18-57) · 11 conceptos
8. [`con-csu-consejo-superior-universitario`](con-csu-consejo-superior-universitario.md) (Arts. 22-29)
9. [`con-cacad-consejo-academico`](con-cacad-consejo-academico.md) (Arts. 30-32)
10. [`con-rectoria`](con-rectoria.md) (Arts. 33-39)
11. [`con-secretaria-general-sisgral`](con-secretaria-general-sisgral.md) (Arts. 40-42)
12. [`con-asamblea-universitaria`](con-asamblea-universitaria.md) (Arts. 45-48)
13. [`con-consejo-participacion-universitaria`](con-consejo-participacion-universitaria.md) (Arts. 49-50)
14. [`con-consejo-electoral`](con-consejo-electoral.md) (Arts. 51-52)
15. [`con-consejo-estudiantil-universitario`](con-consejo-estudiantil-universitario.md) (Art. 53)
16. [`con-claustro-general-docente`](con-claustro-general-docente.md) (Art. 54)
17. [`con-claustro-escuelas`](con-claustro-escuelas.md) (Art. 55)
18. [`con-veeduria-universitaria`](con-veeduria-universitaria.md) (Art. 57)

### Título III · Cap. 1 — Estructura académica (Arts. 58-83) · 12 conceptos
19. [`con-campo-conocimiento-saber`](con-campo-conocimiento-saber.md) (Art. 59)
20. [`con-vicerrectoria-formacion`](con-vicerrectoria-formacion.md) (Art. 61)
21. [`con-vicerrectoria-investigacion-creacion-innovacion`](con-vicerrectoria-investigacion-creacion-innovacion.md) (Art. 62)
22. [`con-vicerrectoria-contextos-extension`](con-vicerrectoria-contextos-extension.md) (Art. 63)
23. [`con-facultad`](con-facultad.md) (Arts. 64-67) · transición
24. [`con-escuela`](con-escuela.md) (Arts. 69-72)
25. [`con-caba`](con-caba.md) (Art. 73)
26. [`con-instituto`](con-instituto.md) (Arts. 74-77)
27. [`con-centro`](con-centro.md) (Arts. 78-81)
28. [`con-programa-academico`](con-programa-academico.md) (Decreto 1330)
29. [`con-credito-academico`](con-credito-academico.md) (Decreto 1330)
30. [`con-director-escuela`](con-director-escuela.md) (Art. 72)

### Título III · Cap. 2 — Estructura administrativa (Arts. 84-87) · 1 concepto
31. [`con-estructura-administrativa-soporte`](con-estructura-administrativa-soporte.md) (Arts. 84-87)

### Título III · Cap. 3 — Bienestar (Arts. 88-90) · 1 concepto
32. [`con-sistema-bienestar-buen-vivir`](con-sistema-bienestar-buen-vivir.md) (Arts. 88-90)

### Título IV — Disposiciones y régimen de transición (Arts. 91-109) · 5 conceptos
33. [`con-presupuesto-participativo`](con-presupuesto-participativo.md) (Art. 95)
34. [`con-periodo-transicion`](con-periodo-transicion.md) (Art. 96)
35. [`con-plan-implementacion`](con-plan-implementacion.md) (Art. 98)
36. [`con-potestad-rectoral-transitoria`](con-potestad-rectoral-transitoria.md) (Art. 107)
37. [`con-vigencia-transitoria-estatutos-previos`](con-vigencia-transitoria-estatutos-previos.md) (Art. 99)

### DAG del glosario
- [`_dag-glosario-universal.md`](_dag-glosario-universal.md) — diagrama Mermaid de las 38 entidades y sus relaciones tipadas

## Próximas adiciones (incrementales)

Cada investigación M01-M12 puede aportar nuevos conceptos al corpus. La regla:

- **NORMATIVO** (con capability NORMATIVE): solo si está anclado a artículo de norma vinculante.
- **ACADÉMICO/PEDAGÓGICO** (capability NEON): conceptos teóricos con autor referencial.
- **DATO-CALCULADO** (capability EQUATION): ecuaciones, métricas, fórmulas.

Ver `_audit/AUDIT-modelado-conceptos-clave-M01-M12-v1.md` §4-§5 para el manual de modelado.

## Patrón BOHR / wrapper (separación crítica)

> El concepto NORMATIVO base vive solo, inmaculado. Los wrappers de aplicación (un Decreto que opera el concepto, una Resolución que lo ejecuta, un análisis estratégico que lo aplica) viven como **conceptos hermanos** que enlazan al átomo NORMATIVO vía `applies_concept` o `norm_implements`.

## Origen de los archivos previos

Los glosarios anteriores residían en `60-glosario/` (ahora `_archived/60-glosario/`) con formato simplificado. Este corpus los **re-construye con máximo rigor** sin perder trazabilidad histórica (ver campo `kd_supersedes` en cada archivo cuando aplica).
