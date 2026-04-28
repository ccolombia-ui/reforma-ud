---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:resolucion-rectoria-207-2016-sigud
kd_title: "Resolución de Rectoría 207 de 2016 — SIGUD (Sistema Integrado de Gestión UDFJC)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Resolución de Rectoría 207 de 2016 · SIGUD"
skos_altLabel:
  - "Res. Rectoría 207/2016"
  - "SIGUD adopción"
  - "Sistema Integrado Gestión UDFJC"

skos_definition: "Resolución expedida por la Rectoría de la Universidad Distrital Francisco José de Caldas el **29 de abril de 2016**, mediante la cual se **ajusta y conforma el Sistema Integrado de Gestión de la Universidad Distrital Francisco José de Caldas (SIGUD)** y se establecen las funciones para los equipos del SIGUD a niveles Directivo, Técnico, Operativo y Evaluador. SIGUD se define como el conjunto de políticas, normas, procesos, recursos, información e instancias cuyo objetivo es garantizar un desempeño institucional articulado y armónico para el cumplimiento de la misión universitaria. SIGUD opera bajo el **Modelo Operativo por Procesos** representado como cadena de valor con 4 macroprocesos y 22 procesos (Misionales · Estratégicos · de Apoyo · de Evaluación). **Es el acto institucional por el cual UDFJC adopta formalmente los principios de gestión de calidad ISO** (estructura procesal, mejora continua, satisfacción de partes interesadas, evaluación de desempeño) — convirtiendo ISO 9001 + ISO 21001 de marcos voluntarios a referentes de cumplimiento institucional interno."
skos_scopeNote: "ESTE es el acto institucional UDFJC que vuelve vinculantes ISO 9001 (calidad) e ISO 21001 (organizaciones educativas) **a nivel interno**. Aunque SIGUD no busca certificación ISO directa, **adopta los principios** y opera bajo Annex SL. Articulado con MIPG (Modelo Integrado de Planeación y Gestión, Función Pública nacional) — Decreto 1083/2015 modificado por Ley 1753/2015. Subordinado al Acuerdo CSU 011/2018 (PUI) y Acuerdo CSU 009/2018 (PED 2018-2030)."
skos_example: "Cuando un proceso UDFJC (e.g. PM1 Formación) debe documentarse, lo hace bajo SIGUD con estructura ISO Annex SL: contexto, liderazgo, planificación, soporte, operación, evaluación, mejora — incluso sin certificación ISO formal externa."
skos_notation: "Res. Rect. 207/2016"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Resolución de Rectoría de la Universidad Distrital Francisco José de Caldas"
iso_differentia: "Adopta y conforma SIGUD · 4 macroprocesos · 22 procesos · 4 niveles equipo · estructura ISO Annex SL"
iso_subject_field: "Gobernanza universitaria · Sistemas de gestión de calidad · Derecho administrativo público"
iso_term_status: preferred
iso_standardized_by: "Rectoría Universidad Distrital Francisco José de Caldas (Resolución 207 del 29 de abril de 2016)"

pasteur_quadrant: EDISON



normative_source: "[[cita-resolucion-rectoria-207-2016-udfjc]]"
normative_locator: "Resolución 207 de 2016 · niveles Directivo/Técnico/Operativo/Evaluador"
normative_text: "[Texto literal · ver atomics en 0-normatividad/2--normas-institucionales/resolucion-rectoria-207-2016/]"
normative_authority_level: INSTITUCIONAL
derogated_by: ""
derogates: []
modification_type: ""
chain_status: LINEAR
conflicts_with: []




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
  - resolucion-rectoria
  - sigud
  - sistema-gestion-udfjc
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ 🏛️ Acto institucional · adopción ISO en UDFJC
> Resolución de Rectoría 207 de 2016 que **adopta y conforma SIGUD** (Sistema Integrado de Gestión UDFJC). Es el acto institucional que vuelve vinculantes los principios de **ISO 9001 + ISO 21001** a nivel interno UDFJC, articulado con MIPG nacional. Sin este acto, ISO sería solo referente voluntario externo.

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
    dv.table(["Adoptante (lo que SIGUD adopta)", "Locator", "Autoridad", "Fecha", "Evidencia"],
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
dv.header(4, `📚 ${habilitados.length} concepto(s) declaran este como pre-requisito directo`);
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
| **v1.0.0** | **2026-04-27** | Concepto creado en PRE-Sprint 1A (cadena de adopción ISO). Modela la Resolución de Rectoría 207/2016 como acto institucional que adopta SIGUD bajo principios ISO 9001/21001 + MIPG nacional. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-resolucion-rectoria-207-2016-sigud` v1.0.0 · TPL T1 NORMATIVO*
