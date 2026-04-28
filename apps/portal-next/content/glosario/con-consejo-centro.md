---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-centro
kd_title: "Consejo de Centro UDFJC (Arts. 18h, 79 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Centro"
skos_altLabel: ["CC", "Center Council"]

skos_definition: "Órgano de gobierno colegiado del Centro UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18h del ACU-004-25 y como componente obligatorio de estructura de Centro en el Art. 79. Presidido por la Dirección de Centro, articula deliberación entre docentes + equipo de soporte académico-administrativo + (eventualmente) representación territorial. Sus decisiones afectan la operación del Centro como **unidad académico-administrativa de contextos-extensión y proyección social** (Art. 78). Composición específica desarrollada en Estatuto de Contextos-Extensión y Proyección Social nuevo (Art. 98 §5)."
skos_scopeNote: "Cada Centro UDFJC tiene su propio Consejo. Se diferencia de Consejo de Instituto por la naturaleza de extensión-territorial del Centro (vs investigación-transdisciplinaria del Instituto). Articulado con la Oficina de Egresados (Art. 82) y con la Vicerrectoría de Contextos-Extensión."
skos_example: "Cuando un Centro debe decidir convenios con territorio, articulación con redes de extensión, programas de proyección social, lo decide el Consejo de Centro presidido por la Dirección."
skos_notation: "CC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel de Centro"
iso_differentia: "Presidido por Dirección de Centro · deliberación de extensión-proyección social · obligatorio Art. 79 · articulado con Oficina de Egresados"
iso_subject_field: "Gobernanza de extensión universitaria · Proyección social · Contextos territoriales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18h + 79"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-emprendedor-coop

"@type": GovernmentOrganization


cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-centro, art-18h, art-79, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Órgano colegiado de Centro · deliberación extensión-territorio
> El **Consejo de Centro** delibera sobre contextos-extensión y proyección social.

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Consejo de Centro como órgano colegiado de extensión-territorio. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-centro` v1.0.0*
