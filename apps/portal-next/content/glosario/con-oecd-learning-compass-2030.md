---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oecd-learning-compass-2030
kd_title: "OECD Learning Compass 2030 · vinculante UDFJC vía adopción estatutaria ACU-004-25"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v2.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "OECD Learning Compass 2030 (Education 2030)"
skos_altLabel:
  - "OECD Education 2030"
  - "Learning Compass"
  - "Brújula de Aprendizaje OECD"
  - "Compass 2030"

skos_definition: "Marco aspiracional global desarrollado por la **OECD (2018, *The Future of Education and Skills 2030*)** que define las competencias que estudiantes necesitarán para 'navegar por mundos no familiares' en 2030 y más allá. Estructurado como una brújula con cuatro elementos: (i) **Core Foundations** — alfabetización, numeracia, salud física-emocional; (ii) **Knowledge** — disciplinar, interdisciplinar, epistémico, procedimental; (iii) **Skills** — cognitivas-metacognitivas, sociales-emocionales, físicas-prácticas; (iv) **Attitudes & Values** — personales, locales, sociales, globales. La brújula también identifica tres **Transformative Competencies**: (1) crear nuevo valor; (2) reconciliar tensiones y dilemas; (3) tomar responsabilidad. El concepto central de **student agency** (agencia estudiantil) — capacidad del estudiante de actuar con propósito, reflexión y responsabilidad — es la propiedad emergente que la educación 2030 debe cultivar. **Voluntario en su origen OECD** pero **vinculante para UDFJC por adopción estatutaria**: la declaración misional del **ACU-004-25 Art. 4** (Misión transformativa territorial) + **Art. 5g** (Soberanía Cognitiva como student agency) + **Art. 5a** (Buen Vivir como horizonte de bienestar 2030) operacionalizan implícitamente las 3 Transformative Competencies de OECD. Sin esta adopción estatutaria, no habría framework para definir Campus-Green ni Proyecto-Bogotá-Transformativo (proyectos institucionales emergentes 2026)."
skos_scopeNote: "OECD Learning Compass 2030 NO es currículo prescriptivo ni acreditador en su origen — es marco aspiracional global. Pero **en UDFJC adquiere fuerza vinculante por adopción estatutaria del ACU-004-25**: cuando el Acuerdo declara misión transformativa + Soberanía Cognitiva + Buen Vivir, opera como acto de adopción institucional de los principios de la brújula. El PUI 2018 (Acuerdo CSU 011/2018) refuerza la adopción al declarar formación integral + ciudadanía global. Sin esta cadena, Learning Compass sería solo aspiracional sin fuerza institucional."
skos_example: "Cuando UDFJC diseña el Proyecto Bogotá-Transformativo o Campus-Green, los criterios de éxito derivan de las 3 Transformative Competencies del Learning Compass (crear nuevo valor + reconciliar tensiones + tomar responsabilidad), validados contra Art. 4-5g del ACU-004-25 como acto de adopción estatutario."
skos_notation: "OECD 2030"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Marco aspiracional global de competencias para educación 2030"
iso_differentia: "4 elementos brújula + 3 Transformative Competencies + student agency · vinculante UDFJC vía adopción estatutaria ACU-004-25 Art. 4-5"
iso_subject_field: "Política educativa internacional · Curriculum design · OECD policy"
iso_term_status: preferred
iso_standardized_by: "OECD (2018). *The Future of Education and Skills 2030: OECD Learning Compass 2030*. OECD Publishing."

pasteur_quadrant: PASTEUR



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 4 (Misión) + Art. 5a-g (Principios)"
normative_text: "[Marco OECD adoptado por declaración misional ACU-004-25 + PUI 2018]"
normative_authority_level: ESTATUTARIO
derogated_by: ""
derogates: []
modification_type: ""
chain_status: LINEAR
conflicts_with: []





rol_seleccionado: estudiante-soberano

"@type": Legislation


cited_in:
  - "[[sec-MI12-03--estandares-internacionales]]"
  - "[[sec-MI12-12--meta-paper-integrador]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oecd-learning-compass
  - marco-aspiracional-vinculante
  - cadena-adopcion
  - m03-corpus
  - audit-v2-2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!quote]+ ⚖️ Marco aspiracional vinculante por adopción estatutaria
> OECD Learning Compass 2030 es marco **aspiracional voluntario en su origen OECD** pero **vinculante para UDFJC por adopción estatutaria** del **ACU-004-25 Art. 4** (Misión transformativa) + **Art. 5g** (Soberanía Cognitiva = student agency) + **Art. 5a** (Buen Vivir = well-being 2030). Sin esta adopción, no habría framework para Campus-Green ni Proyecto Bogotá-Transformativo.

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

> 💡 **Interpretación**: el origen es aspiracional (OECD 2018) pero los actos en `adoption_chain` lo vuelven vinculante por declaración misional ACU-004-25.

### §2.1 · Estructura de la brújula

| Elemento | Componentes |
|---|---|
| **Core Foundations** | Alfabetización · numeracia · salud física-emocional |
| **Knowledge** | Disciplinar · interdisciplinar · epistémico · procedimental |
| **Skills** | Cognitivas-metacognitivas · sociales-emocionales · físicas-prácticas |
| **Attitudes & Values** | Personales · locales · sociales · globales |

> **3 Transformative Competencies**: crear nuevo valor · reconciliar tensiones · tomar responsabilidad.
>
> **Concepto central**: *student agency* — capacidad de actuar con propósito, reflexión, responsabilidad.

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
      "**Tu marco de agencia**: el Learning Compass 2030 = tu Soberanía Cognitiva (Art. 5g) + Buen Vivir (Art. 5a) operacionalizados.",
      "- 3 Transformative Competencies que UDFJC adopta para ti: crear nuevo valor + reconciliar tensiones + tomar responsabilidad.",
      "- Tu trayectoria académica debería desarrollar las 4 dimensiones de la brújula.",
      "**Acción concreta**: identifica en qué dimensión necesitas crecer y exige que tus Paquetes CCA cubran esa área."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu marco aspiracional**: cada Paquete CCA debe poder mapearse contra la brújula (Foundations + Knowledge + Skills + Attitudes & Values).",
      "- Las 3 Transformative Competencies son criterios de validez de tu diseño curricular.",
      "**Acción concreta**: diseña un mapa de cobertura · ¿qué dimensiones del Compass cubre cada Paquete CCA?"
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu enseñanza** debe cultivar student agency · no solo transmitir conocimiento.",
      "**Acción concreta**: diseña actividades donde estudiantes ejerciten anticipación + acción + reflexión (ciclo de agencia OECD)."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu investigación territorial** se valida contra Learning Compass: ¿desarrolla competencias transformativas en estudiantes co-investigadores?",
      "**Acción concreta**: incluye en tu PM2 dimensión formativa de student agency operacionalizada."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios** universidad-territorio deben buscar 'crear nuevo valor' (1ra Transformative Competency OECD).",
      "**Acción concreta**: usa Learning Compass como justificación argumentativa de convenios PM3 con stakeholders internacionales."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu gobernanza** debe articular la misión ACU-004-25 (Art. 4-5) con los marcos internacionales aspiracionales (Learning Compass + UDL + ODS).",
      "- Sin Learning Compass como adopción institucional, no hay framework para Campus-Green ni Proyecto Bogotá-Transformativo.",
      "**Acción concreta**: validar que el PEI institucional documenta la adopción Learning Compass + reportar avance ante CACAD."
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
| **v2.0.0** | **2026-04-27** | **Migración chain-of-adoption (audit v2.2)**. (a) Capabilities `[NORMATIVE, NEON]`. (b) `concepto_facet_normative.adoption_chain` poblada (ACU-004-25 Art. 4-5g + PUI 2018 + PED 2018-2030). (c) `effective_force_in_udfjc: BINDING_BY_ADOPTION` + `effective_authority_level: ESTATUTARIO`. (d) Pre-requisitos = ACU-004-25 + Soberanía Cognitiva + Buen Vivir. (e) Relaciones enriquecidas: `norm_implements pre [[con-acu-004-25]]` + `skos_closeMatch` con Soberanía Cognitiva ≈ student agency + Buen Vivir ≈ well-being 2030. (f) Body migrado a TPL T1 con renderizado de adoption_chain. **Re-clasificado a T1 NORMATIVO por adopción estatutaria.** |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oecd-learning-compass-2030` v2.0.0 · TPL T1 NORMATIVO · chain-of-adoption*
