---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:mipg-funcion-publica
kd_title: "MIPG — Modelo Integrado de Planeación y Gestión (Decreto 1083/2015 + Ley 1753/2015)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "MIPG · Modelo Integrado de Planeación y Gestión (Función Pública)"
skos_altLabel:
  - "MIPG"
  - "Modelo Integrado Planeación Gestión"
  - "Decreto 1083/2015 MIPG"

skos_definition: "Marco nacional colombiano de gestión institucional **vinculante para entidades públicas** (incluyendo IES públicas como UDFJC), establecido en el **Art. 133 de la Ley 1753 de 2015** (Plan Nacional de Desarrollo 2014-2018) y reglamentado mediante el **Decreto 1083 de 2015** modificado por el Decreto 1499 de 2017. MIPG **articula la gestión institucional** bajo 7 dimensiones operativas (Talento humano, Direccionamiento estratégico, Gestión con valores para resultados, Evaluación de resultados, Información y comunicación, Gestión del conocimiento, Control interno) y 19 políticas. Adopta principios y estructura compatibles con **ISO 9001 (gestión de calidad)**, **ISO 14001 (gestión ambiental)**, **MECI (Modelo Estándar de Control Interno)**, **NTCGP 1000 (norma técnica colombiana de calidad pública)** — convirtiendo estos referentes voluntarios en **vinculantes para entidades públicas** vía adopción legal nacional. Para UDFJC: aplicable como entidad pública del orden distrital con autonomía universitaria; articulado con SIGUD (Resolución Rectoría 207/2016) bajo el principio de coherencia entre marco nacional y sistema institucional."
skos_scopeNote: "MIPG NO es ISO directamente — es un marco nacional que ADOPTA principios ISO y los vuelve vinculantes para entidades públicas colombianas. Para UDFJC, la cadena es: Ley 1753/2015 Art. 133 → Decreto 1083/2015 → MIPG → SIGUD UDFJC (Resolución Rectoría 207/2016) → operación institucional. La autonomía universitaria (Const. Art. 69 + Ley 30/1992) modula la aplicación pero NO la suspende."
skos_example: "Cuando UDFJC reporta a la Función Pública mediante FURAG (Formulario Único Reporte Avances Gestión), lo hace bajo MIPG · esto evidencia adopción nacional de principios ISO 9001 vía marco vinculante público."
skos_notation: "MIPG"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Marco nacional colombiano de gestión institucional pública"
iso_differentia: "Articula 7 dimensiones + 19 políticas · vinculante para entidades públicas · adopta principios ISO + MECI + NTCGP"
iso_subject_field: "Derecho administrativo colombiano · Gestión pública · Función pública"
iso_term_status: preferred
iso_standardized_by: "Departamento Administrativo de la Función Pública, República de Colombia (Decreto 1083/2015 modificado por 1499/2017)"

pasteur_quadrant: EDISON







rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-01--mandato-normativo]]"
  - "[[sec-MI12-03--estandares-internacionales]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - mipg
  - funcion-publica
  - gestion-publica
  - m01-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ ⚖️ Marco nacional · adopta principios ISO en sector público
> MIPG (Modelo Integrado de Planeación y Gestión) es el marco nacional vinculante para entidades públicas colombianas que **articula 7 dimensiones operativas y 19 políticas**, **adoptando principios ISO 9001** y volviéndolos vinculantes para el sector público. Base: Art. 133 Ley 1753/2015 + Decreto 1083/2015. Para UDFJC: articulado con SIGUD vía Resolución Rectoría 207/2016.

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
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A (cadena de adopción ISO). Modela MIPG como marco nacional que adopta principios ISO 9001 y los vuelve vinculantes para sector público colombiano. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-mipg-funcion-publica` v1.0.0 · TPL T1 NORMATIVO*
