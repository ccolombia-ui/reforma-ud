---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:decreto-1421-2017
kd_title: "Decreto 1421 de 2017 — reglamenta atención educativa población con discapacidad (mandato UDL/DUA)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Decreto 1421 de 2017 — atención educativa población con discapacidad"
skos_altLabel:
  - "Decreto 1421/2017"
  - "Decreto MEN 1421"
  - "Decreto educación inclusiva 2017"
  - "Mandato DUA Colombia"
skos_definition: "Decreto del Ministerio de Educación Nacional de Colombia, expedido el 29 de agosto de 2017 por la ministra Yaneth Giha, **'por el cual se reglamenta en el marco de la educación inclusiva la atención educativa de la población con discapacidad'**, modificando el Decreto 1075 de 2015 (Decreto Único Reglamentario del Sector Educación). El decreto **incorpora normativamente el Diseño Universal del Aprendizaje (DUA/UDL)** como marco obligatorio para las instituciones educativas colombianas, incluyendo Instituciones de Educación Superior (IES). Define los **ajustes razonables** vinculados al DUA, exige incorporar el enfoque de educación inclusiva y diseño universal en el Proyecto Educativo Institucional (PEI), procesos de autoevaluación y plan de mejoramiento. Para IES específicamente: modifica el Art. 2.5.3.2.2.1 del Decreto 1075/2015 obligando a remitir información sobre cómo se formalizan políticas de inclusión en las condiciones de calidad. Marco complementario: Ley 1618 de 2013 (estatutaria de derechos personas con discapacidad) + Convención ONU sobre Derechos de Personas con Discapacidad."
skos_scopeNote: "ESTE es el acto normativo que convierte UDL/DUA de marco aspiracional voluntario (CAST) a obligación jurídica vinculante para TODAS las instituciones educativas en Colombia. Aplica a IES desde 2017 con implementación progresiva a 5 años (vencido 2022). NO confundir con accesibilidad para discapacidad — UDL es marco universal aplicable a toda población estudiantil."
skos_example: "UDFJC, en cumplimiento del Decreto 1421/2017, debe (i) incorporar UDL en el PEI institucional, (ii) reportar SIMAT estudiantes con discapacidad, (iii) demostrar UDL en condiciones de calidad para registro calificado (Decreto 1330/2019), (iv) elaborar PIAR (Plan Individual de Ajustes Razonables) cuando aplique."
skos_notation: "Decreto 1421/2017"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Decreto reglamentario del Ministerio de Educación Nacional de Colombia"
iso_differentia: "Reglamenta atención educativa población con discapacidad · adopta DUA/UDL como obligatorio · modifica Dec 1075/2015 · aplicable IES"
iso_subject_field: "Derecho educativo colombiano · Educación inclusiva · Marco regulatorio IES"
iso_term_status: preferred
iso_standardized_by: "Ministerio de Educación Nacional, República de Colombia (Decreto 1421 del 29 de agosto de 2017)"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: EDISON



normative_source: "[[cita-decreto-1421-2017-men]]"
normative_locator: "Decreto 1421 de 2017 · 11 artículos + transitorios"
normative_text: "[Texto literal · ver atomics en 0-normatividad/1--normas-nacionales/decreto-men-1421-2017/]"
normative_authority_level: REGLAMENTARIO
derogated_by: ""
derogates: []
modification_type: "Modifica Decreto 1075 de 2015 (Decreto Único Reglamentario Sector Educación)"
chain_status: LINEAR
conflicts_with: []
conflict_evidence: ""





rol_seleccionado: estudiante-soberano

"@type": Legislation
"@context":
  "@vocab": https://schema.org/
skos: http://www.w3.org/2004/02/skos/core#
iso1087: https://www.iso.org/obp/ui/#iso:std:iso:1087
prov: http://www.w3.org/ns/prov#
dct: http://purl.org/dc/terms/


cited_in:
  - "[[sec-MI12-01--mandato-normativo]]"
  - "[[sec-MI12-03--estandares-internacionales]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - decreto-men-1421
  - educacion-inclusiva
  - udl-mandato
  - m01-corpus
  - m03-cadena-adopcion
  - audit-v2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ ⚖️ Mandato nacional de UDL/DUA para IES colombianas
> El **Decreto 1421/2017** es el acto normativo que convierte UDL/DUA de marco aspiracional voluntario (CAST) a **obligación jurídica vinculante** para todas las instituciones educativas en Colombia, incluyendo UDFJC. Modifica el Decreto 1075/2015 (Decreto Único Reglamentario Sector Educación). Vigente desde **2017-08-29** con implementación progresiva a 5 años. **Es el primer eslabón de la cadena de adopción que vuelve UDL vinculante para UDFJC.**

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
  dv.table(
    ["Campo", "Valor"],
    [
      ["**Origen**", `${f.origin_type ?? "—"} · fuerza original: ${f.origin_force ?? "—"}`],
      ["**Fuente original**", f.origin_source ?? "—"],
      ["**Authority level (resultante)**", f.normative_authority_level ?? "—"],
      ["**Effective force en UDFJC**", f.effective_force_in_udfjc ?? "—"],
      ["**Chain status**", f.chain_status ?? "—"],
      ["**Modifica**", f.modification_type || "—"]
    ]
  );

  const chain = f.adoption_chain ?? [];
  if (chain.length) {
    dv.header(4, `🔗 Cadena de adopción · ${chain.length} eslabón(es)`);
    dv.table(
      ["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"],
      chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence])
    );
  }
}
```

## §3 · 🔻 Pre-requisitos cognitivos

```dataviewjs
const me = dv.current();
const prereq = me.concepto_prerequisitos ?? [];
if (prereq.length === 0) dv.paragraph("Sin pre-requisitos formales declarados.");
else dv.list(prereq);
```

## §4 · 🔺 Conceptos que declaran este como pre-requisito cognitivo

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
if (habilitados.length === 0) dv.paragraph("_Sin reverse declaraciones todavía. Para outgoing ver §7._");
else dv.list(habilitados.map(p => p.file.link));
```

## §6 · 🌳 Evolución longitudinal · provenance

```dataviewjs
const me = dv.current();
const anchors = me.concepto_definitional_anchors ?? [];
dv.paragraph(`**Chain status**: ${me.concepto_anchor_chain_status ?? "—"} · **Anchor ACTIVE**: ${me.concepto_current_anchor ?? "—"}`);
dv.paragraph(`**Vigente desde**: ${me.valid_from ?? "—"} · **Hasta**: ${me.valid_to || "actualmente · ACTIVE"}`);
if (anchors.length) {
  dv.header(4, "Cadena de definitional anchors");
  dv.list(anchors);
}
```

## §7 · 🤝 Relaciones semánticas tipadas (outgoing)

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
    dv.table(
      ["→ Target", "Evidencia"],
      grp.items.map(r => [r.rel_target, r.rel_propiedades?.norm_evidence ?? r.rel_propiedades?.skos_evidence ?? "—"])
    );
  }
}
```

## §8 · 🎭 Vista por rol seleccionado

```dataviewjs
const me = dv.current();
const rol = me.rol_seleccionado ?? "estudiante-soberano";
const vistas = {
  "estudiante-soberano": {
    titulo: "🎓 Para el Estudiante Soberano",
    contenido: [
      "**Tu derecho**: el Decreto 1421/2017 garantiza tu derecho a aprender sin barreras estructurales — no es 'accesibilidad', es **diseño universal desde el inicio**.",
      "- Si encuentras barreras en tu currículo, puedes invocar este decreto como base jurídica para exigir ajustes razonables.",
      "- UDL aplica a toda la población estudiantil, no solo a personas con discapacidad declarada.",
      "**Acción concreta**: identifica barreras de tu trayectoria académica y conviértelas en demanda de UDL ante tu CABA y Comité de Currículo."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu obligación legal**: el Decreto 1421/2017 te obliga a incorporar UDL **desde el diseño** del currículo — no como adaptación post-hoc.",
      "- Los Paquetes CCA deben tener desde su origen múltiples medios de representación + acción/expresión + implicación.",
      "- El PEI institucional debe documentar UDL en los procesos misionales.",
      "**Acción concreta**: cada Paquete CCA debe tener checklist UDL 3 principios x 9 pautas y validarse contra el Decreto 1421."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu práctica de aula** debe operar bajo UDL: entregas, materiales, evaluaciones con múltiples vías.",
      "- El PIAR (Plan Individual de Ajustes Razonables) lo elaboras tú como docente de aula, no un especialista externo.",
      "**Acción concreta**: incluye en tu syllabus las múltiples vías de representación + acción + implicación; documenta los ajustes razonables que aplicas."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu investigación territorial** debe ser UDL-compatible: instrumentos accesibles, comunicación de hallazgos en múltiples formatos, equipos diversos.",
      "- Investigaciones sobre cultura de inclusión + DUA en IES tienen marco normativo en este decreto.",
      "**Acción concreta**: documenta en tu PM2 cómo UDL aplica a tu metodología investigativa territorial."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios** universidad-territorio-sector productivo deben respetar UDL: accesibilidad de espacios físicos, materiales accesibles, lenguaje claro.",
      "**Acción concreta**: incluye cláusula UDL en convenios PM3 + verifica accesibilidad en eventos territoriales."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu obligación de gobernanza**: implementar UDL en el PEI institucional + reportes SIMAT + condiciones de calidad para registro calificado (Decreto 1330/2019).",
      "- Verificación: ¿el PEI UDFJC documenta UDL? ¿hay datos SIMAT actualizados?",
      "**Acción concreta**: exigir a Vicerrectoría Académica reporte anual de cumplimiento Decreto 1421/2017 ante CACAD."
    ]
  }
};
const v = vistas[rol] ?? vistas["estudiante-soberano"];
dv.header(3, v.titulo);
for (const linea of v.contenido) dv.paragraph(linea);
```

## §10 · 📜 Citado en

```dataviewjs
const me = dv.current();
dv.list(me.cited_in ?? []);
dv.paragraph(`**Total citaciones**: ${me.cited_count ?? 0}`);
```

---

## Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | **Concepto creado en PRE-Sprint 1A · cadena de adopción**. T1 NORMATIVO con `concepto_facet_normative.adoption_chain` poblado: el Decreto 1421/2017 es el acto que convierte UDL de voluntario (CAST) a vinculante para IES colombianas (incluyendo UDFJC). Reemplaza la mención narrativa en `con-udl-3.skos_scopeNote` por wikilink tipado. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-decreto-1421-2017` v1.0.0 · TPL T1 NORMATIVO*
