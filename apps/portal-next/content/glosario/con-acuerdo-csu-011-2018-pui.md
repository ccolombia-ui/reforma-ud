---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:acuerdo-csu-011-2018-pui
kd_title: "Acuerdo CSU 011 de 2018 — Proyecto Universitario Institucional (PUI)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Acuerdo CSU 011 de 2018 · Proyecto Universitario Institucional (PUI)"
skos_altLabel:
  - "Acuerdo 011/2018"
  - "PUI UDFJC 2018"
  - "Proyecto Universitario Institucional"

skos_definition: "Acuerdo expedido por el Consejo Superior Universitario UDFJC el **17 de mayo de 2018** mediante el cual **se actualiza y adopta el Proyecto Universitario Institucional (PUI)** de la Universidad Distrital Francisco José de Caldas. El PUI es la declaración formal de **misión, visión, principios y valores institucionales** que da sentido al horizonte estratégico (PED 2018-2030 · Acuerdo CSU 009/2018 mismo día). Vinculante institucionalmente, articula la identidad universitaria con marcos internacionales aspiracionales: democratización del conocimiento, formación integral, investigación, extensión territorial, sostenibilidad. **Actúa como puente conceptual** entre los marcos aspiracionales globales (OECD Learning Compass, UDL, ODS) y la operacionalización institucional (PED + SIGUD + procesos misionales). Tras ACU-004-25 (2025) — que reforma el Estatuto General — el PUI debe re-articularse con la nueva arquitectura misional (3 vicerrectorías + CABAs + frame-3 transformativo + Buen Vivir + Soberanía Cognitiva) — proceso pendiente."
skos_scopeNote: "ESTE es el acto institucional que declara la identidad UDFJC en términos de misión-visión-valores. Es el complemento conceptual del PED (Acuerdo CSU 009/2018 mismo día): el PUI define EL HORIZONTE de identidad, el PED define LA RUTA estratégica. Subordinado al ACU-004-25 (carta constitucional UDFJC) cuando aplica. NO es el Estatuto General (ese rol lo cumple el ACU-004-25 desde 2025), sino el documento de identidad-misión-visión que articula los marcos aspiracionales con la institución."
skos_example: "Cuando UDFJC declara que adopta OECD Learning Compass 2030 como referente aspiracional, lo hace bajo el paraguas de la misión-visión-valores del PUI Acuerdo 011/2018, que invoca formación integral + ciudadanía global + sostenibilidad — articulando coherentemente los marcos internacionales con la identidad institucional."
skos_notation: "ACU-CSU-011/2018"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Acuerdo del Consejo Superior Universitario UDFJC"
iso_differentia: "Adopta PUI · misión-visión-valores institucionales · articulación con marcos internacionales aspiracionales"
iso_subject_field: "Identidad institucional · Política universitaria · Filosofía educativa"
iso_term_status: preferred
iso_standardized_by: "Consejo Superior Universitario, Universidad Distrital Francisco José de Caldas (Acuerdo 011 del 17 de mayo de 2018)"

pasteur_quadrant: PASTEUR







rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - acuerdo-csu
  - pui
  - identidad-institucional
  - m00-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ 🌟 Proyecto Universitario Institucional · identidad UDFJC
> Acuerdo CSU 011/2018 que actualiza el **PUI** — declaración formal de misión-visión-valores institucionales. Es el puente conceptual entre los marcos aspiracionales globales (OECD 2030 · UDL · ODS) y la operacionalización institucional (PED · SIGUD). **Re-articulación pendiente** post-ACU-004-25 (2025).

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

## §5 · 📋 Mandatos derivados

```dataviewjs
const mandates = (dv.current().tupla__relations ?? []).filter(r => r.rel_nombre === "norm_mandates");
if (mandates.length === 0) dv.paragraph("Sin mandatos derivados.");
else dv.table(["§", "Mandato", "Evidencia"],
  mandates.map((r, i) => [`§${i+1}`, r.rel_target, r.rel_propiedades?.norm_evidence ?? "—"]));
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
  if (r.rel_nombre === "norm_mandates") continue;
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
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A. Modela Acuerdo CSU 011/2018 PUI como puente conceptual entre marcos aspiracionales globales y operacionalización institucional UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-acuerdo-csu-011-2018-pui` v1.0.0 · TPL T1 NORMATIVO*
