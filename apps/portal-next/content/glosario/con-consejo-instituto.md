---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-instituto
kd_title: "Consejo de Instituto UDFJC (Arts. 18j, 75 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Instituto"
skos_altLabel: ["CI", "Institute Council"]

skos_definition: "Órgano de gobierno colegiado del Instituto UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18j del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Presidido por la Dirección de Instituto, articula deliberación entre docentes investigadores + estudiantes co-investigadores + equipo de soporte académico-administrativo. Sus decisiones afectan la operación del Instituto como **unidad académico-administrativa de investigación-creación e innovación interdisciplinarias y transdisciplinarias** (Art. 74). Composición específica desarrollada en Estatuto de Investigación-Creación e Innovación nuevo (Art. 98 §4)."
skos_scopeNote: "Cada Instituto UDFJC tiene su propio Consejo · son N consejos paralelos coordinados por sus Direcciones. Articulado con CIDC (Centro de Investigaciones y Desarrollo Científico) para coherencia investigativa institucional. Se diferencia de Consejo de Centro por la naturaleza investigativa-transdisciplinaria del Instituto (vs extensión-territorial del Centro)."
skos_example: "Cuando un Instituto debe decidir aprobación de un nuevo grupo de investigación, articulación con redes de innovación, distribución presupuestal de proyectos PM2, lo decide el Consejo de Instituto presidido por la Dirección."
skos_notation: "CI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Instituto"
iso_differentia: "Presidido por Dirección de Instituto · deliberación investigativa interdisciplinaria · obligatorio Art. 75 · articulación con CIDC"
iso_subject_field: "Gobernanza investigativa universitaria · Investigación-creación-innovación interdisciplinar"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18j + 75"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-investigador-pasteur

"@type": GovernmentOrganization


cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-instituto, art-18j, art-75, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Órgano colegiado de Instituto · deliberación investigativa
> El **Consejo de Instituto** delibera sobre investigación-creación e innovación interdisciplinaria. Articulado con CIDC institucional.

## §0 · 🎭 Vista por rol

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · Anclaje

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Consejo de Instituto como órgano colegiado investigativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-instituto` v1.0.0*
