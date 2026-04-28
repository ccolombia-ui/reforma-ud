---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-escuela
kd_title: "Consejo de Escuela UDFJC (Arts. 18f, 70 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Escuela"
skos_altLabel: ["CE", "School Council"]

skos_definition: "Órgano de gobierno colegiado de la Escuela UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18f del ACU-004-25 y como componente obligatorio de la estructura de Escuela en el Art. 70. Presidido por la Dirección de Escuela, articula deliberación académica entre docentes adscritos (vía CABAs) + representación estudiantil + apoyo administrativo. Sus decisiones afectan la operación de la Escuela como **unidad académico-administrativa de adscripción docente por campo del conocimiento-saber** (Art. 69) — distinta de las Áreas de Formación que organizan currículo en Facultades. La composición específica se desarrollará en el Estatuto Académico nuevo (Art. 98 §1)."
skos_scopeNote: "Cada Escuela UDFJC tiene su propio Consejo de Escuela · son N consejos paralelos coordinados por sus Direcciones. NO confundir con Consejo de Facultad (que coordina Áreas de Formación) ni con Claustro de Escuelas (deliberativo agregado). El Consejo de Escuela articula CABAs específicas de su Escuela, donde residen los docentes."
skos_example: "Cuando una Escuela debe decidir adscripción docente a CABAs, evaluación de docentes, distribución de carga académica para Áreas de Formación servidas, o aprobación de proyectos de investigación-creación PM2, lo decide el Consejo de Escuela presidido por la Dirección."
skos_notation: "CE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Escuela"
iso_differentia: "Presidido por la Dirección de Escuela · deliberación académica de la Escuela como unidad de adscripción docente por campo conocimiento-saber · obligatorio Art. 70"
iso_subject_field: "Gobernanza académica universitaria · Coordinación docente · Campo del conocimiento-saber"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18f + 70"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-director



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-escuela, art-18f, art-70, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Órgano colegiado de Escuela · presidido por Dirección
> El **Consejo de Escuela** delibera sobre asuntos académicos de la Escuela como unidad de adscripción docente por campo del conocimiento-saber. Articula CABAs y campos.

---

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo D. Consejo de Escuela como órgano colegiado del Gobierno Universitario. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-escuela` v1.0.0 · CoP fundacional*
