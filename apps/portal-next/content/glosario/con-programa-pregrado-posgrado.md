---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:programa-pregrado-posgrado
kd_title: "Programas Académicos de Pregrado y Posgrado UDFJC (Art. 68 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Programas de Pregrado y Posgrado"
skos_altLabel:
  - "Programas Pregrado/Posgrado"
  - "Undergraduate and Graduate Programs"

skos_definition: "Distinción tipológica de los Programas Académicos UDFJC declarada en el **Art. 68 del ACU-004-25** que diferencia: (i) **Pregrado** — programas de formación inicial conducentes a títulos de Técnico Profesional, Tecnólogo o Profesional Universitario (Decreto MEN 1330/2019); (ii) **Posgrado** — programas de formación avanzada conducentes a títulos de Especialista, Magíster o Doctor. Ambos niveles operan como **unidades académico-administrativas de la facultad** (Art. 68) adscritos a Áreas de Formación específicas (Art. 65). La articulación pregrado-posgrado dentro de un Área de Formación es **invariante de coherencia curricular** del modelo post-reforma. Cada programa requiere registro calificado MEN bajo Decreto 1330/2019 (acto vinculante) y está sometido a renovación cada 7 años (Art. 35 Decreto 1330)."
skos_scopeNote: "La distinción pregrado/posgrado NO crea dos conceptos paralelos · es una tipología del concepto Programa Académico (Art. 68). Las diferencias operativas son: créditos académicos (pregrado típico 144-180 cr · posgrado 24-90 cr), duración (pregrado 4-5 años · posgrado 1-4 años), titulación, y vinculación con Investigación-Creación (posgrado intensivo, pregrado emergente con CABA)."
skos_example: "La Facultad de Ingeniería contiene Áreas de Formación con Programas de Pregrado (Ing. Eléctrica · Ing. Civil · Ing. Industrial) y Programas de Posgrado (Esp. en Sistemas Distribuidos · Maestría en Bioingeniería · Doctorado en Ingeniería). La articulación pregrado→posgrado dentro del Área es coherencia curricular invariante."
skos_notation: "Pregrado/Posgrado"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Tipología de Programas Académicos universitarios"
iso_differentia: "Distinción declarada Art. 68 · pregrado (técnico/tecnológico/profesional) vs posgrado (especialización/maestría/doctorado) · ambos adscritos a Áreas de Formación · regulados por Decreto 1330/2019"
iso_subject_field: "Tipología programática universitaria · Sistema de Educación Superior colombiano"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 68 + Decreto MEN 1330/2019"

pasteur_quadrant: EDISON







rol_seleccionado: estudiante-soberano

"@type": EducationalOrganization


cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-06--bmk-creditos-cca]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, t1-normativo, programa-pregrado-posgrado, art-68, decreto-1330, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Tipología de Programas Académicos · pregrado + posgrado
> Distinción declarada Art. 68 · pregrado (técnico/tecnológico/profesional) + posgrado (especialización/maestría/doctorado) · ambos adscritos a Áreas de Formación · regulados por Decreto 1330/2019.

## §0 · 🎭 Vista por rol

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · Anclaje + cadena

```dataviewjs
const f = dv.current().concepto_facet_normative;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.table(["Campo", "Valor"], [["Origen", `${f.origin_type} · ${f.origin_force}`], ["Authority", f.normative_authority_level], ["Effective force", `**${f.effective_force_in_udfjc}**`]]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) { dv.header(4, `🔗 Cadena · ${chain.length}`); dv.table(["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"], chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence])); }
}
```

## §3 · DDD

```dataviewjs
const f = dv.current().concepto_facet_ddd;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.header(4, `DDD · ${f.ddd_id}`);
  if ((f.ddd_invariants ?? []).length) { dv.header(5, "🔒 Invariantes"); dv.list(f.ddd_invariants); }
  if ((f.ddd_ubiquitous_terms ?? []).length) { dv.header(5, "🗣️ Lenguaje ubicuo"); dv.paragraph(f.ddd_ubiquitous_terms.join(" · ")); }
}
```

## §7 · Relaciones

```dataviewjs
const rels = dv.current().tupla__relations ?? [];
const vocab = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocab?.relaciones ?? {};
const hL = (n, d) => { const e = relMap[n]?.[d ?? "co"] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post; return e?.label ?? `\`${n}\``; };
for (const r of rels) dv.paragraph(`**${hL(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
```

## §10 · Citado en

```dataviewjs
dv.list(dv.current().cited_in ?? []);
dv.paragraph(`**Total**: ${dv.current().cited_count ?? 0}`);
```

---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo G. Distinción tipológica pregrado-posgrado en marco Decreto 1330/2019 + Art. 68 ACU. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-programa-pregrado-posgrado` v1.0.0*
