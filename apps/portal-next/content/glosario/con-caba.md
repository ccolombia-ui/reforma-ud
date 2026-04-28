---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:caba
kd_title: "CABA — Comunidad Académica de Base UDFJC (Art. 73 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0


skos_prefLabel: "CABA — Comunidad Académica de Base"
skos_altLabel:
  - "Comunidad Académica Básica"
  - "Super-CoP UDFJC"
  - "Comunidad de Práctica transversal"
  - "Nicho transformativo (Geels)"
skos_definition: "Estructura básica, dinámica y flexible de las Escuelas UDFJC, organizada de acuerdo con el interés cognitivo de los docentes desde su área específica del campo del conocimiento-saber. Todo profesor está adscrito a mínimo una CABA. Es **célula organizativa transversal**: puede atravesar una o varias Escuelas, articulando docentes-investigadores-estudiantes alrededor de un par específico de conocimiento-saber. Activa simultáneamente las seis retroalimentaciones R1-R6 del ciclo virtuoso ΩMT. Opera como **nicho transformativo** (Geels 2002) dentro del régimen Sub-N1 dominante. NO requiere decreto estatutario para existir: puede nacer como CoP informal y madurar a unidad formal con reconocimiento CSU."
skos_scopeNote: "La CABA es el dispositivo MÁS NOVEDOSO de la nueva estructura organizativa. Articula la pluralidad epistémica del Art. 5g (Soberanía Cognitiva) en la práctica académica cotidiana. Es la materialización del 'salto cuántico Sub-N1 → N4' del corpus MI-12. NO confundir con grupo de investigación (que tiene reconocimiento Minciencias) ni con departamento (que es estructura administrativa)."
skos_example: "La CABA 'Soberanía Energética Comunitaria' atraviesa la Escuela de Física (electromagnetismo y termodinámica), la Escuela de Ingeniería Eléctrica (sistemas de potencia) y la Escuela de Estudios Comunitarios (saberes territoriales sobre microgrids comunales). Articula docentes de las tres + estudiantes de pregrado y posgrado + investigadores con grupos Minciencias. Activa R1 (semilleros) + R2 (currículo vivo) + R3 (transferencia) + R4 (problemas reales) + R5 (egresados agentes) + R6 (gobernanza CABA)."
skos_notation: "CABA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Estructura básica dinámica y flexible de las Escuelas universitarias"
iso_differentia: "Organizada por interés cognitivo + área específica del campo de conocimiento-saber + transversal entre Escuelas + adscripción mínima obligatoria de docentes"
iso_subject_field: "Estructura académica reformada UDFJC / Comunidades de práctica académica / Sustainability transitions"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 73"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: PASTEUR









rol_seleccionado: estudiante-soberano



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-01--mandato-normativo]]", "[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-06--bmk-creditos-cca]]", "[[sec-MI12-07--21-bpa-especificadas]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 7

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - caba
  - comunidad-academica-base
  - art-73
  - m00-base
  - refundacional
  - audit-v2-2
  - tpl-v2
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Concepto refundacional · célula transversal del nuevo modelo
> La CABA es el **dispositivo MÁS NOVEDOSO** de la estructura organizativa post-ACU-004-25. Articula la pluralidad epistémica del Art. 5g (Soberanía Cognitiva) en la práctica académica cotidiana. Es la materialización del **salto cuántico Sub-N1 → N4**.

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

---

## §1 · Definición canónica (cita literal)

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| `INPUT[text(class(meta-bind-readonly)):concept_subtype]` | `INPUT[text(class(meta-bind-readonly)):pasteur_quadrant]` | `INPUT[text(class(meta-bind-readonly)):concepto_facet_normative.effective_force_in_udfjc]` |

> **Cita literal Art. 73**: "La Comunidad Académica de Base es la estructura básica, dinámica y flexible de las escuelas, que se organiza de acuerdo con el interés cognitivo de los docentes, desde su área específica del campo de conocimiento-saber. Todo profesor está adscrito a mínimo una CABA."

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
    ["**Effective force en UDFJC**", `**${f.effective_force_in_udfjc ?? "—"}**`],
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

## §3 · 🧩 Estructura DDD · invariantes operativas

```dataviewjs
const me = dv.current();
const f = me.concepto_facet_ddd;
if (!f) {
  dv.paragraph("(sin facet DDD)");
} else {
  dv.header(4, `DDD · ${f.ddd_id ?? "—"} · ${f.ddd_aggregate_root ?? "—"}`);
  dv.table(["Atributo", "Valor"], [
    ["Bounded Context", f.ddd_bc_ref ?? "—"],
    ["Rol en BC", f.ddd_role_in_context ?? "—"]
  ]);
  if ((f.ddd_invariants ?? []).length) {
    dv.header(5, "Invariantes operativas");
    dv.list(f.ddd_invariants);
  }
  if ((f.ddd_ubiquitous_terms ?? []).length) {
    dv.header(5, "Lenguaje ubicuo");
    dv.paragraph((f.ddd_ubiquitous_terms ?? []).join(" · "));
  }
}
```

## §4 · 🔻 Pre-requisitos cognitivos

```dataviewjs
const prereq = dv.current().concepto_prerequisitos ?? [];
if (prereq.length === 0) dv.paragraph("Sin pre-requisitos formales.");
else dv.list(prereq);
```

## §5 · 🔺 Conceptos que declaran este como pre-requisito

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
      "**Tu nicho transformativo**: la CABA es donde puedes ejercer agencia académica activa · investigar + co-construir saberes con docentes y otros estudiantes.",
      "- Puedes vincularte a una CABA del campo conocimiento-saber que te interese (no necesitas estar adscrito a la Escuela del docente).",
      "- En la CABA activas las 6 retroalimentaciones R1-R6 que aceleran tu trayectoria.",
      "**Acción concreta**: identifica una CABA activa o propón conformar una en torno a un par conocimiento-saber relevante para tu territorio."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu CABA es tu dispositivo de diseño curricular**: ahí integras docencia + investigación + extensión bajo un mismo par conocimiento-saber.",
      "- Los Paquetes CCA emergen del trabajo de la CABA · NO de un departamento aislado.",
      "**Acción concreta**: vincula tus Paquetes CCA al campo de tu CABA · documenta cómo cada Paquete activa R1-R6."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu aula** se nutre de la CABA: trae problemas reales investigados ahí (R4) · semilleros (R1) · saberes territoriales (R6).",
      "**Acción concreta**: en cada sesión invoca explícitamente el trabajo de la CABA + invita estudiantes a vincularse."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**La CABA es tu hábitat institucional**: tu PM2 (investigación territorial) opera bajo el paraguas del par conocimiento-saber de la CABA.",
      "- Una CABA bien diseñada articula tu investigación con saberes territoriales (R6) y los retroalimenta al currículo (R2-R3).",
      "**Acción concreta**: documenta en tu PM2 cómo tu investigación se nutre de la CABA y la nutre de regreso."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**La CABA es tu interfaz** con el territorio · convenios PM3 deben articular el campo conocimiento-saber de una o más CABAs.",
      "**Acción concreta**: incluye en convenios cláusula de articulación con CABAs específicas + documenta retornos a las mismas."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu obligación de gobernanza**: garantizar que TODOS los docentes de planta TC estén adscritos a mínimo UNA CABA (Art. 73 invariante).",
      "- Verificar que las CABAs tengan ≥3 roles · NO sean monorrol o monodisciplinares.",
      "**Acción concreta**: reportar a CACAD el mapa de adscripción CABAs + activación R1-R6 · CABAs sin esto incumplen Art. 73."
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

## Notas de aplicación

- **NO confundir** con grupo de investigación (Minciencias-COL) ni con departamento administrativo.
- **Cuándo invocarla**: como dispositivo activador de R1-R6 + materializador de Soberanía Cognitiva en práctica académica.
- **Riesgo monorrol**: una "CABA" con un solo rol deja de ser transversal — viola Art. 73.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| v1.0.0 | 2026-04-26 | Concepto inicial v5.2 legacy |
| **v2.0.0** | **2026-04-27** | **Migración Sprint 1A** (audit v2.2): facets v2.0 SOTA + adoption_chain (ACU-004-25 Art. 73) + concepto_prerequisitos + body Metabind/DataviewJS reactivo + 12 secciones canónicas + cssclass tpl-t1-normativo. Preservadas: cita literal Art. 73 + invariantes DDD (renderizadas dinámicamente desde `concepto_facet_ddd`). |
