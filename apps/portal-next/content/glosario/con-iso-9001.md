---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:iso-9001
kd_title: "ISO 9001:2015 — Sistema de Gestión de Calidad (QMS · Annex SL)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "ISO 9001:2015 — Sistema de Gestión de Calidad (Quality Management System)"
skos_altLabel:
  - "ISO 9001"
  - "QMS ISO"
  - "Sistema Gestión Calidad ISO"
  - "ISO 9001:2015"

skos_definition: "Norma internacional ISO publicada en septiembre de 2015 (revisión vigente al 2026) que **especifica los requisitos para un Sistema de Gestión de Calidad (Quality Management System — QMS)** que una organización puede implementar para demostrar su capacidad de proveer consistentemente productos y servicios que satisfacen requisitos del cliente y reglamentarios. Estructurada bajo el marco común **Annex SL** de las normas ISO de sistema de gestión: 10 cláusulas (1-3 introductorias, 4-10 requisitos): (4) contexto de la organización, (5) liderazgo, (6) planificación, (7) soporte, (8) operación, (9) evaluación de desempeño, (10) mejora. Sus 7 principios son: enfoque al cliente, liderazgo, compromiso del personal, enfoque a procesos, mejora, toma de decisiones basada en evidencia, gestión de relaciones. Es la **norma base** de la familia ISO 9000 y precursora estructural de ISO 21001 (educación) e ISO 14001 (ambiental). Aplicada al contexto UDFJC: ISO 9001 es referente voluntario en su origen pero **adoptada institucionalmente vía Resolución de Rectoría 207/2016** que conforma SIGUD bajo sus principios."
skos_scopeNote: "ISO 9001 NO es 'norma legal' en Colombia — es norma técnica voluntaria. Su adopción institucional UDFJC ocurre vía SIGUD (Res. Rectoría 207/2016), articulado con MIPG nacional (Decreto 1083/2015). UDFJC NO está certificada externamente por ICONTEC en ISO 9001 (al 2026-04-27) pero opera bajo sus principios. NO confundir con CNA (acreditación institucional MEN) ni con ISO 21001 (específica educación)."
skos_example: "Cuando un proceso UDFJC (e.g. PM1 Formación) se documenta en SIGUD, la estructura sigue ISO 9001 Annex SL: definir contexto + partes interesadas (Cl. 4) + liderazgo + política de calidad (Cl. 5) + planificación con objetivos medibles (Cl. 6) + recursos + comunicación (Cl. 7) + ejecución del proceso (Cl. 8) + indicadores + auditoría interna (Cl. 9) + acciones correctivas y oportunidades de mejora (Cl. 10)."
skos_notation: "ISO 9001:2015"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Norma ISO de sistema de gestión de calidad"
iso_differentia: "QMS genérico aplicable a todo tipo de organización · 7 principios · estructura Annex SL 10 cláusulas · base de la familia ISO 9000"
iso_subject_field: "Quality management · ISO standards · Management systems"
iso_term_status: preferred
iso_standardized_by: "ISO (2015). *ISO 9001:2015 — Quality management systems — Requirements*. International Organization for Standardization."

pasteur_quadrant: EDISON








rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - iso-9001
  - qms
  - gestion-calidad
  - m03-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ 📋 Norma base de gestión de calidad
> ISO 9001:2015 es la norma ISO base para Sistemas de Gestión de Calidad (QMS) — **voluntaria en su origen** pero **adoptada institucionalmente** por UDFJC vía SIGUD (Resolución de Rectoría 207/2016). Bajo estructura Annex SL (10 cláusulas) y 7 principios (cliente · liderazgo · personal · procesos · mejora · evidencia · relaciones). Norma base de la cual deriva ISO 21001 (educación).

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
  if (typeof target === "object" && target.path !== undefined) {
    return String(target.path).split("/").pop().replace(/\.md$/, "").trim() === here;
  }
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
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A (cadena de adopción ISO). Modela ISO 9001:2015 como norma base voluntaria adoptada vía SIGUD para UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-iso-9001` v1.0.0 · TPL T1 NORMATIVO*
