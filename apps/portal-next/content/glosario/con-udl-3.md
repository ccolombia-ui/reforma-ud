---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:udl-3
kd_title: "UDL 3.0 — Universal Design for Learning (CAST 2024) · vinculante UDFJC vía Decreto 1421/2017"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v2.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "UDL 3.0 — Universal Design for Learning (CAST 2024)"
skos_altLabel:
  - "Universal Design for Learning"
  - "Diseño Universal para el Aprendizaje"
  - "DUA"
  - "UDL 3"
  - "CAST UDL"

skos_definition: "Marco pedagógico desarrollado por **CAST (Center for Applied Special Technology)** en su versión **3.0 publicada en 2024** que aplica los principios del Diseño Universal a la educación: diseñar **para todos los aprendices desde el inicio**, en lugar de adaptar después para minorías. Estructurado en tres principios fundamentales: (i) **Múltiples medios de representación** — el 'qué' del aprendizaje (visual, auditivo, kinestésico, simbólico); (ii) **Múltiples medios de acción y expresión** — el 'cómo' demostrar aprendizaje (escrito, oral, gráfico, performativo); (iii) **Múltiples medios de implicación** — el 'porqué' del aprendizaje (autonomía, relevancia, comunidad, persistencia). UDL 3.0 actualiza la versión 2.0 con énfasis en (a) equidad sistémica como principio rector, (b) interrogación de barreras (no solo provisión de alternativas), (c) reconocimiento de variabilidad neurocognitiva como norma, no excepción. **En Colombia es vinculante** para todas las instituciones educativas (incluyendo IES) por **adopción del Decreto 1421/2017** del MEN — convirtiendo lo voluntario CAST en obligación jurídica. Para UDFJC: aplicable directamente como IES colombiana + articulado con Decreto 1330/2019 (registro calificado · principios de inclusión) + alineado con ACU-004-25 (refundación misional)."
skos_scopeNote: "UDL 3.0 NO es 'accesibilidad para discapacidad' — es marco pedagógico universal aplicable a TODA población estudiantil. La versión 3.0 (2024) representa cambio cualitativo respecto a 2.0: enfatiza identificación y eliminación de barreras sistémicas en lugar de provisión de adaptaciones individuales. **En Colombia su carácter vinculante deriva del Decreto 1421/2017** que reglamenta la Ley Estatutaria 1618/2013 — sin esos actos jurídicos UDL sería solo marco aspiracional voluntario CAST."
skos_example: "Una clase UDFJC con UDL 3.0: contenido disponible en texto + audio + video con subtítulos (representación); evaluación permite ensayo escrito O presentación oral O proyecto artístico (acción/expresión); rúbrica co-construida con estudiantes con opciones de profundización temática (implicación). El cumplimiento se valida contra Decreto 1421/2017 + Decreto 1330/2019 (registro calificado)."
skos_notation: "UDL 3.0"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco pedagógico de diseño universal aplicado a la educación"
iso_differentia: "3 principios (representación + acción/expresión + implicación); v3.0 (2024) con equidad sistémica + interrogación de barreras; vinculante en Colombia vía Decreto 1421/2017"
iso_subject_field: "Pedagogía / Educación inclusiva / Universal Design / Curriculum design"
iso_term_status: preferred
iso_standardized_by: "CAST (2024). *Universal Design for Learning Guidelines version 3.0*. Center for Applied Special Technology."

align_dbpedia: "http://dbpedia.org/resource/Universal_Design_for_Learning"

pasteur_quadrant: PASTEUR








rol_seleccionado: estudiante-soberano

"@context":


cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-12--meta-paper-integrador]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - udl-3
  - cast-udl
  - educacion-inclusiva
  - cadena-adopcion
  - m03-corpus
  - audit-v2-2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ ⚖️ Marco pedagógico vinculante por adopción nacional
> UDL 3.0 (CAST 2024) es marco pedagógico **voluntario en su origen internacional** pero **vinculante en Colombia** por adopción del **Decreto 1421/2017** del MEN — que lo incorpora como obligatorio para todas las IES (modifica Decreto 1075/2015). Articulado con **Decreto 1330/2019** (condiciones de calidad para registro calificado) y con la misión institucional ACU-004-25.

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

> 💡 **Interpretación**: el origen es voluntario (CAST 2024) pero los actos en `adoption_chain` lo vuelven vinculante para UDFJC. Sin esos actos, UDL sería solo referente aspiracional.

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

## §8 · 🎭 Vista por rol seleccionado

```dataviewjs
const me = dv.current();
const rol = me.rol_seleccionado ?? "estudiante-soberano";
const vistas = {
  "estudiante-soberano": {
    titulo: "🎓 Para el Estudiante Soberano",
    contenido: [
      "**Tu derecho garantizado**: UDL es marco vinculante en Colombia · puedes exigir múltiples medios de representación, expresión e implicación.",
      "- Si tu currículo solo ofrece una vía (e.g. solo lectura + escrito), eso viola Decreto 1421/2017.",
      "- UDL respalda tu agencia transformadora: tú eliges cómo demostrar el aprendizaje.",
      "**Acción concreta**: identifica barreras en tu trayectoria y exige UDL ante CABA + Comité de Currículo invocando Decreto 1421/2017."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu obligación**: UDL es vinculante por Decreto 1421/2017 · debes diseñar Paquetes CCA con los 3 principios desde el inicio.",
      "- Múltiples medios de **representación** (qué): visual + auditivo + kinestésico + simbólico.",
      "- Múltiples medios de **acción/expresión** (cómo): escrito + oral + gráfico + performativo.",
      "- Múltiples medios de **implicación** (porqué): autonomía + relevancia + comunidad + persistencia.",
      "**Acción concreta**: cada Paquete CCA debe tener checklist UDL 3 principios x 9 pautas."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu práctica de aula**: UDL aplica en cada sesión · entregas, materiales, evaluaciones con múltiples vías.",
      "- El PIAR (Plan Individual de Ajustes Razonables) lo elaboras tú como docente de aula.",
      "**Acción concreta**: incluye en tu syllabus las múltiples vías + documenta ajustes razonables aplicados."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu investigación territorial** debe ser UDL-compatible: instrumentos accesibles, comunicación de hallazgos en múltiples formatos.",
      "**Acción concreta**: documenta en tu PM2 cómo UDL aplica a tu metodología investigativa territorial."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios** universidad-territorio-sector productivo deben respetar UDL: accesibilidad espacios, materiales, lenguaje claro.",
      "**Acción concreta**: incluye cláusula UDL en convenios PM3 + verifica accesibilidad en eventos territoriales."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu obligación de gobernanza**: UDL es vinculante por Decreto 1421/2017 + condición de registro calificado por Decreto 1330/2019.",
      "**Acción concreta**: exigir reporte anual de cumplimiento UDL ante CACAD + verificar PEI documenta UDL."
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

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| v1.0.0 | 2026-04-27 | Concepto inicial · `[NEON]` · marco aspiracional voluntario |
| **v2.0.0** | **2026-04-27** | **Migración chain-of-adoption (audit v2.2)**. (a) Capabilities `[NORMATIVE, NEON]` (era solo NEON). (b) `concepto_facet_normative` con `adoption_chain` poblada (Decreto 1421/2017 + Decreto 1330/2019 + PUI 2018). (c) `effective_force_in_udfjc: BINDING_BY_ADOPTION`. (d) Pre-requisitos cognitivos = Decreto 1421/2017 + Ley 1618/2013 (cadena legal de fundamento). (e) `tupla__relations` enriquecidas: `norm_implements pre` Decreto 1421 + `skos_related` Dec 1330 + ACU-004-25. (f) Body migrado a TPL T1 con renderizado de adoption_chain. **Primer M03 re-clasificado a T1 NORMATIVO por adopción institucional.** |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-udl-3` v2.0.0 · TPL T1 NORMATIVO · chain-of-adoption*
