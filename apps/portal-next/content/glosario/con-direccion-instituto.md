---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:direccion-instituto
kd_title: "Dirección de Instituto UDFJC (Arts. 18k, 75-76 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Dirección de Instituto"
skos_altLabel: ["Director(a) de Instituto", "Institute Director"]

skos_definition: "Autoridad ejecutiva unipersonal del Instituto UDFJC declarada como **órgano del Gobierno Universitario** en el Art. 18k del ACU-004-25 y como componente obligatorio de estructura de Instituto en el Art. 75. Su titular —el(la) **Director(a) de Instituto**— es designado por **votación directa ponderada con composición distintiva**: 50% docentes investigadores + 50% estudiantes (Art. 76) · período **4 años · sin reelección inmediata** (Art. 83). Dirige las actividades de investigación-creación e innovación + divulgación interdisciplinarias y transdisciplinarias del Instituto. Adscrita a la Vicerrectoría de Investigación-Creación e Innovación (Art. 62)."
skos_scopeNote: "La Dirección de Instituto se diferencia de Director(a) de Escuela en el mecanismo de elección: Instituto tiene composición 50%-50% docentes investigadores-estudiantes (más participativa estudiantil) · Escuela tiene 70% votación docentes + 30% HV. La diferencia refleja la naturaleza del Instituto como espacio investigativo donde estudiantes son co-investigadores."
skos_example: "El proceso de designación de Director(a) de Instituto sigue el Art. 76: convocatoria + inscripción + votación 50% docentes investigadores + 50% estudiantes vinculados al Instituto + designación. Período 4 años · sin reelección inmediata."
skos_notation: "DI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Autoridad ejecutiva unipersonal universitaria a nivel de Instituto"
iso_differentia: "Designación 50% docentes investigadores + 50% estudiantes · período 4 años · sin reelección inmediata · adscrita a Vicerrectoría I+C+I"
iso_subject_field: "Gobernanza investigativa universitaria · Dirección de unidades transdisciplinares"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18k + 75-76 + 83"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-investigador-pasteur



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, direccion-instituto, art-76, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Autoridad ejecutiva de Instituto · elección 50%-50% participativa
> La **Dirección de Instituto** se elige por votación 50% docentes investigadores + 50% estudiantes · 4 años · sin reelección inmediata. Composición participativa estudiantil distintiva (vs Escuelas).

---

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo E. Dirección de Instituto con elección 50%-50% participativa estudiantil. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-direccion-instituto` v1.0.0 · CoP fundacional*
