---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:acuerdo-csu-009-2018-ped
kd_title: "Acuerdo CSU 009 de 2018 — Plan Estratégico de Desarrollo 2018-2030 (PED)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Acuerdo CSU 009 de 2018 · Plan Estratégico de Desarrollo 2018-2030"
skos_altLabel:
  - "Acuerdo 009/2018"
  - "PED UDFJC 2018-2030"
  - "Plan Estratégico Desarrollo UDFJC"

skos_definition: "Acuerdo expedido por el Consejo Superior Universitario de la Universidad Distrital Francisco José de Caldas el **17 de mayo de 2018** mediante el cual **se adopta el Plan Estratégico de Desarrollo 2018-2030 (PED)** de la Universidad Distrital. El PED es el instrumento de planeación de largo plazo que **articula el horizonte estratégico institucional con marcos internacionales de calidad** (ISO 9001/21001), **inclusión** (UDL/Decreto 1421-2017), **sostenibilidad** (ODS Agenda 2030), y **direccionalidad transformativa** (compatible con OECD Learning Compass 2030). El PED 2018-2030 estructura objetivos estratégicos, indicadores y líneas de acción que articulan: gobernanza democrática, formación integral, investigación-creación-innovación, extensión territorial, gestión institucional, internacionalización. Tras la entrada en vigor del ACU-004-25 (2025), el PED 2018-2030 debe **re-articularse** con la nueva arquitectura misional (3 vicerrectorías + CABAs + frame-3 transformativo) — proceso pendiente al 2026-04-27."
skos_scopeNote: "ESTE es uno de los actos institucionales que vuelven vinculantes para UDFJC los marcos internacionales aspiracionales. El PED 2018-2030 declara el HORIZONTE estratégico que da sentido a la adopción de OECD Learning Compass, UDL, ISO 9001/21001 y ODS. NO es derogado por ACU-004-25 (que es estatuto general · norma constitucional UDFJC) sino articulado bajo él. Subordinado al Acuerdo CSU 011/2018 (Proyecto Universitario Institucional · PUI) que define la misión-visión-valores."
skos_example: "Cuando UDFJC reporta avances al MEN en condiciones de calidad para registro calificado (Decreto 1330/2019), invoca el PED 2018-2030 como evidencia de planeación estratégica orientada a inclusión, calidad y sostenibilidad — articulando los marcos internacionales como componentes del horizonte adoptado institucionalmente."
skos_notation: "ACU-CSU-009/2018"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Acuerdo del Consejo Superior Universitario UDFJC"
iso_differentia: "Adopta PED 2018-2030 · horizonte estratégico institucional · articula marcos internacionales de calidad/inclusión/sostenibilidad"
iso_subject_field: "Planeación estratégica universitaria · Gobernanza pública · Política institucional"
iso_term_status: preferred
iso_standardized_by: "Consejo Superior Universitario, Universidad Distrital Francisco José de Caldas (Acuerdo 009 del 17 de mayo de 2018)"

pasteur_quadrant: EDISON



normative_source: "[[cita-acuerdo-csu-009-2018-udfjc]]"
normative_locator: "Acuerdo CSU 009 de 2018 · PED 2018-2030"
normative_text: "[Texto literal · ver atomics en 0-normatividad/2--normas-institucionales/csu-acu-009-2018/]"
normative_authority_level: INSTITUCIONAL
derogated_by: ""
derogates: []
modification_type: ""
chain_status: BRANCHING
conflicts_with: []
conflict_evidence: "Tras ACU-004-25 (2025), el PED 2018-2030 debe re-articularse con la nueva arquitectura misional · pendiente"




rol_seleccionado: estudiante-soberano

"@type": GovernmentService


cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - acuerdo-csu
  - ped-2018-2030
  - planeacion-estrategica
  - m00-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ 🎯 Plan Estratégico Desarrollo 2018-2030 · horizonte institucional
> Acuerdo CSU 009/2018 que **adopta el PED 2018-2030** — instrumento de planeación de largo plazo que articula el horizonte estratégico UDFJC con marcos internacionales de calidad (ISO), inclusión (UDL/Decreto 1421), sostenibilidad (ODS) y direccionalidad transformativa (OECD 2030). **Re-articulación pendiente** post-ACU-004-25.

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

---

## §1 · Definición canónica

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

| Sub-tipo | Pasteur | Authority level |
|---|:-:|:-:|
| `INPUT[text(class(meta-bind-readonly)):concept_subtype]` | `INPUT[text(class(meta-bind-readonly)):pasteur_quadrant]` | `INPUT[text(class(meta-bind-readonly)):concepto_facet_normative.normative_authority_level]` |

## §2 · 📜 Anclaje normativo + cadena de adopción

```dataviewjs
const me = dv.current();
const f = me.concepto_facet_normative;
if (!f) {
  dv.paragraph("(sin facet normative)");
} else {
  dv.table(["Campo", "Valor"], [
    ["**Origen**", `${f.origin_type ?? "—"} · ${f.origin_force ?? "—"}`],
    ["**Authority level**", f.normative_authority_level ?? "—"],
    ["**Effective force en UDFJC**", f.effective_force_in_udfjc ?? "—"],
    ["**Chain status**", f.chain_status ?? "—"]
  ]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) {
    dv.header(4, `🔗 Cadena de adopción · ${chain.length} eslabón(es)`);
    dv.table(["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"],
      chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence]));
  }
}
```

## §3 · 🔻 Pre-requisitos cognitivos

```dataviewjs
const prereq = dv.current().concepto_prerequisitos ?? [];
if (prereq.length === 0) dv.paragraph("Sin pre-requisitos formales.");
else dv.list(prereq);
```

## §4 · 🔺 Conceptos que declaran este como pre-requisito

```dataviewjs
const me = dv.current();
const here = me.file.name;
const folder = me.file.folder;
const all = dv.pages(`"${folder}"`).where(p => p.kd_type === "glosario-universal");
const matchHere = (target) => {
  if (!target) return false;
  if (typeof target === "object" && target.path !== undefined) return String(target.path).split("/").pop().replace(/\.md$/, "").trim() === here;
  const s = String(target);
  const m = s.match(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/);
  if (m) return m[1].split("/").pop().replace(/\.md$/, "").trim() === here;
  return s.split("/").pop().replace(/\.md$/, "").trim() === here;
};
const habilitados = all.where(p => (p.concepto_prerequisitos ?? []).some(matchHere)).array();
dv.header(4, `📚 ${habilitados.length} concepto(s) declaran este como pre-requisito`);
if (habilitados.length === 0) dv.paragraph("_Sin reverse declaraciones todavía._");
else dv.list(habilitados.map(p => p.file.link));
```

## §7 · 🤝 Relaciones tipadas (outgoing)

```dataviewjs
const me = dv.current();
const rels = me.tupla__relations ?? [];
const vocabPage = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocabPage?.relaciones ?? {};
const frameMap = vocabPage?.frames ?? {};

const lookupRel = (n, d) => {
  const dir = d ?? "co";
  return relMap[n]?.[dir] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post ?? null;
};
const humanLabel = (n, d) => lookupRel(n, d)?.label ?? `\`${n}\``;
const humanDesc = (n, d) => lookupRel(n, d)?.description ?? "—";
const humanFrame = (f) => frameMap[f ?? "general"]?.label ?? `\`${f ?? "general"}\``;

const groups = {};
for (const r of rels) {
  const k = r.rel_frame ?? "general";
  groups[k] = groups[k] ?? [];
  groups[k].push(r);
}
for (const [frame, rs] of Object.entries(groups)) {
  dv.header(4, `${humanFrame(frame)} · ${rs.length} relación(es)  \`[frame: ${frame}]\``);
  const byRel = {};
  for (const r of rs) {
    const key = `${r.rel_nombre}::${r.rel_direccion ?? "co"}`;
    byRel[key] = byRel[key] ?? { rel_nombre: r.rel_nombre, rel_direccion: r.rel_direccion, items: [] };
    byRel[key].items.push(r);
  }
  for (const grp of Object.values(byRel)) {
    dv.header(5, `${humanLabel(grp.rel_nombre, grp.rel_direccion)}  \`(${grp.rel_nombre} · ${grp.rel_direccion ?? "co"})\``);
    dv.paragraph(`> ${humanDesc(grp.rel_nombre, grp.rel_direccion)}`);
    dv.table(["→ Target", "Evidencia"],
      grp.items.map(r => [r.rel_target, r.rel_propiedades?.norm_evidence ?? r.rel_propiedades?.skos_evidence ?? "—"]));
  }
}
```

## §10 · 📜 Citado en

```dataviewjs
const me = dv.current();
dv.list(me.cited_in ?? []);
dv.paragraph(`**Total citaciones**: ${me.cited_count ?? 0}`);
```

---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A. Modela Acuerdo CSU 009/2018 PED 2018-2030 como acto institucional que articula horizonte estratégico con marcos internacionales (ISO, UDL, ODS, OECD 2030). |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-acuerdo-csu-009-2018-ped` v1.0.0 · TPL T1 NORMATIVO*
