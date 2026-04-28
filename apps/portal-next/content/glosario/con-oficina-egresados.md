---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-egresados
kd_title: "Oficina de Egresados UDFJC (Art. 82 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Oficina de Egresados"
skos_altLabel: ["OE", "Alumni Office"]

skos_definition: "Dependencia institucional UDFJC declarada en el **Art. 82 del ACU-004-25** encargada de **gestionar, proponer y desarrollar el Sistema de Egresados**. Adscrita a la Vicerrectoría de Contextos · Extensión y Proyección Social (PM3). Articula relación con egresados como cuarto estamento de la Comunidad Universitaria (Arts. 8-17): mantiene base de egresados activa + canaliza retroalimentación curricular + facilita movilidad egresados-territorio + soporta articulación de egresados en órganos de gobierno (CSU Art. 22h, CACAD Art. 31h, Asamblea Universitaria Art. 45-48). Conexión crítica con datasets MEN: SNIES (registro graduados) + OLE (Observatorio Laboral · trayectorias salariales)."
skos_scopeNote: "La Oficina de Egresados NO es independiente — está adscrita a Vicerrectoría de Contextos. Sus servicios alimentan los indicadores institucionales que DGEP reporta y son insumos críticos para el Sistema de Aseguramiento de Calidad (Decreto 1330/2019 condiciones de calidad). Articulada con CIDC para investigaciones sobre trayectorias de egresados."
skos_example: "Cuando UDFJC reporta a OLE-MEN trayectorias salariales de egresados o consolida indicadores institucionales para registro calificado de programas, la Oficina de Egresados es la dependencia que gestiona los datos primarios."
skos_notation: "OE"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia institucional universitaria de relación con egresados"
iso_differentia: "Adscrita a Vicerrectoría de Contextos · gestiona Sistema de Egresados · articula representación egresados en órganos de gobierno"
iso_subject_field: "Gestión de egresados universitarios · Proyección social · Trayectorias laborales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 82"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-emprendedor-coop



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-11--datasets-men]]"]
cited_count: 2

tags: [glosario-universal, concepto-normativo, t1-normativo, oficina-egresados, art-82, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Dependencia adscrita a Vicerrectoría de Contextos
> La **OE** gestiona el Sistema de Egresados · articula representación en órganos de gobierno + datos para OLE/SNIES.

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo G. OE como dependencia adscrita a Vicerrectoría de Contextos · articulación con datasets MEN. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-egresados` v1.0.0*
