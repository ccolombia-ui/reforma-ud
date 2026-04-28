---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:iso-21001
kd_title: "ISO 21001:2018 — Educational Organizations Management Systems (EOMS) · vinculante UDFJC vía SIGUD"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v2.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "ISO 21001:2018 — Educational Organizations Management Systems (EOMS)"
skos_altLabel:
  - "ISO 21001"
  - "EOMS"
  - "Sistema de Gestión Organizaciones Educativas"

skos_definition: "Norma internacional ISO publicada en mayo 2018 que **especifica los requisitos de un sistema de gestión para organizaciones educativas (Educational Organizations Management System — EOMS)** que demuestra capacidad de proveer y entregar consistentemente productos y servicios educativos que satisfacen las necesidades de aprendices y otros beneficiarios. Estructurada como las demás normas ISO de **Annex SL**: 10 cláusulas (1-3 introductorias, 4-10 requisitos): (4) contexto de la organización, (5) liderazgo, (6) planificación, (7) soporte, (8) operación, (9) evaluación de desempeño, (10) mejora. Sus aportes específicos al sector educativo son: (i) lenguaje propio del sector (aprendices, currículo, docentes); (ii) énfasis en accesibilidad y equidad; (iii) inclusión de partes interesadas más allá del cliente (familias, sociedad, sector productivo); (iv) consideración del impacto social. **Voluntaria en su origen ISO** pero **vinculante para UDFJC por adopción institucional**: la **Resolución de Rectoría 207/2016** que conforma SIGUD adopta sus principios + el **Acuerdo CSU 011/2018 (PUI)** declara compromiso con calidad educativa coherente con EOMS + el **Acuerdo CSU 009/2018 (PED 2018-2030)** la articula con horizonte estratégico. Adicionalmente, vía MIPG nacional (Decreto 1083/2015), opera bajo principios convergentes."
skos_scopeNote: "ISO 21001 NO sustituye a CNA (acreditación institucional MEN) ni a registro calificado (Decreto 1330/2019). Es sistema de gestión voluntario ISO equivalente conceptual a ISO 9001 pero específico para educación. **Su carácter vinculante para UDFJC deriva de la adopción institucional vía SIGUD** (Resolución Rectoría 207/2016) + PUI 2018 + PED 2018-2030 — sin estos actos, sería solo referente voluntario externo. UDFJC NO está certificada externamente por ICONTEC en ISO 21001 al 2026-04-27 pero opera bajo sus principios."
skos_example: "Una Vicerrectoría Académica UDFJC implementando ISO 21001: documenta procesos misionales (Cl. 4-8), sistema de medición de satisfacción de aprendices (Cl. 9), mecanismo de mejora continua con CABAs como células de calidad (Cl. 10) — bajo el paraguas de SIGUD (Resolución Rectoría 207/2016) sin certificación externa."
skos_notation: "ISO 21001"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Norma ISO de sistema de gestión para organizaciones educativas"
iso_differentia: "EOMS específico para educación · partes interesadas ampliadas · estructura Annex SL · vinculante UDFJC vía adopción institucional SIGUD"
iso_subject_field: "Quality management · Educational organizations · ISO standards"
iso_term_status: preferred
iso_standardized_by: "ISO (2018). *ISO 21001:2018 — Educational organizations — Management systems for educational organizations — Requirements with guidance for use*."

pasteur_quadrant: EDISON








rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-12--meta-paper-integrador]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - iso-21001
  - eoms
  - gestion-calidad
  - cadena-adopcion
  - m03-corpus
  - audit-v2-2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ ⚖️ Norma ISO sectorial · vinculante por adopción institucional UDFJC
> ISO 21001:2018 (EOMS) es **norma ISO voluntaria en su origen** pero **vinculante para UDFJC por adopción institucional** vía **SIGUD** (Resolución Rectoría 207/2016) + **PUI Acuerdo CSU 011/2018** + **PED Acuerdo CSU 009/2018**. Especialización sectorial educativa de ISO 9001. Bajo estructura Annex SL (10 cláusulas) con partes interesadas ampliadas (familias + sociedad + sector productivo).

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

---

## §1 · Definición canónica

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| `INPUT[text(class(meta-bind-readonly)):concept_subtype]` | `INPUT[text(class(meta-bind-readonly)):pasteur_quadrant]` | `INPUT[text(class(meta-bind-readonly)):concepto_facet_normative.effective_force_in_udfjc]` |

## §2 · 📜 Anclaje normativo + cadena de adopción

```dataviewjs
const me = dv.current();
const f = me.concepto_facet_normative;
if (!f) {
  dv.paragraph("(sin facet normative)");
} else {
  dv.table(["Campo", "Valor"], [
    ["**Origen**", `${f.origin_type ?? "—"} · fuerza original: ${f.origin_force ?? "—"}`],
    ["**Fuente original**", f.origin_source ?? "—"],
    ["**Effective force en UDFJC**", `**${f.effective_force_in_udfjc ?? "—"}**`],
    ["**Authority level resultante**", f.normative_authority_level ?? "—"],
    ["**Chain status**", f.chain_status ?? "—"]
  ]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) {
    dv.header(4, `🔗 Cadena de adopción · ${chain.length} eslabón(es) · cómo se vuelve vinculante para UDFJC`);
    dv.table(["Adoptante (acto)", "Locator", "Autoridad", "Fecha", "Evidencia"],
      chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence]));
  }
}
```

### §2.1 · Estructura Annex SL · 10 cláusulas

| Cl. | Tema |
|:-:|---|
| 1-3 | Introducción + alcance + términos |
| **4** | Contexto de la organización |
| **5** | Liderazgo |
| **6** | Planificación |
| **7** | Soporte |
| **8** | Operación |
| **9** | Evaluación de desempeño |
| **10** | Mejora |

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
| v1.0.0 | 2026-04-27 | Concepto inicial · `[NORMATIVE, NEON]` con campos legacy `norm_legal_force: VOLUNTARY` (internamente contradictorio) |
| **v2.0.0** | **2026-04-27** | **Migración chain-of-adoption (audit v2.2)**. (a) Resolución de la contradicción legacy: `origin_force: VOLUNTARY` (en su origen ISO) + `effective_force_in_udfjc: BINDING_BY_ADOPTION` (resultante). (b) `adoption_chain` poblada (Resolución Rectoría 207/2016 SIGUD + PUI 2018 + PED 2018-2030 + MIPG nacional). (c) Pre-requisitos = SIGUD + ISO 9001. (d) `tupla__relations` enriquecidas: `norm_implements pre [[con-resolucion-rectoria-207-2016-sigud]]` + `skos_narrower pre [[con-iso-9001]]` (especialización sectorial). (e) Body migrado a TPL T1 con renderizado adoption_chain. **Re-clasificado a T1 NORMATIVO con cadena de adopción institucional explícita.** |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-iso-21001` v2.0.0 · TPL T1 NORMATIVO · chain-of-adoption*
