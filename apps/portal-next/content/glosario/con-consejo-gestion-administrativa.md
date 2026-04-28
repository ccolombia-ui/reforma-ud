---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-gestion-administrativa
kd_title: "Consejo de Gestión Administrativa UDFJC (Art. 87 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Gestión Administrativa (CGA)"
skos_altLabel:
  - "CGA UDFJC"
  - "Consejo de Gestión Administrativa Universidad Distrital"
  - "Administrative Management Council"

skos_definition: "Instancia colegiada UDFJC creada por el Art. 87 del ACU-004-25 que actúa como **dirección y coordinación del Sistema de Gestión Administrativa**. Articula la operación administrativa institucional bajo el liderazgo del Rector(a) que lo preside, sumando a vicerrectores misionales, secretario(a) general, director(a) de Gestión Estratégica y de Planeación, gerente administrativo(a) y financiero(a), y director(a) de Bienestar Universitario y Buen Vivir. Su función es **integrar los 3 subsistemas administrativos** (Gestión Estratégica + Talento Humano-Financiera-Infraestructura + Normativa Documental) con las funciones misionales (PM1+PM2+PM3) y el Sistema de Bienestar. Concepto NUEVO sin precedente exacto en el Acuerdo CSU 003/1997 — refleja la transición desde la antigua Vicerrectoría Administrativa y Financiera (autoridad unipersonal) a un órgano colegiado horizontal de gestión articulada. Se da su propio reglamento (PARÁGRAFO Art. 87)."
skos_scopeNote: "El CGA NO es la máxima autoridad administrativa (esa función la ejerce la Rectoría que lo preside), sino la **instancia de COORDINACIÓN** entre las dependencias administrativas y misionales. Es órgano deliberativo de orientación operativa — sus decisiones se ejecutan vía Resoluciones de Rectoría o actos de la dependencia respectiva. NO confundir con el CSU (gobierno) ni con el CACAD (autoridad académica) — el CGA opera en el plano de gestión operativa institucional. Sin el CGA, los 3 subsistemas administrativos quedarían desarticulados."
skos_example: "Cuando UDFJC debe decidir la priorización presupuestal anual articulando demandas misionales (vicerrectorías) + capacidad financiera (gerencia administrativa) + planeación estratégica (dirección planeación) + sostenibilidad bienestar (dirección bienestar) + soporte legal-documental (secretaría general), la decisión coordinada se toma en el CGA presidido por la Rectoría."
skos_notation: "CGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Instancia colegiada de dirección y coordinación administrativa universitaria"
iso_differentia: "Preside el Rector(a) · integra 6 cargos directivos · articula 3 subsistemas administrativos con misionales y bienestar · concepto NUEVO en ACU-004-25 sin precedente en ACU 003/1997 · se da su propio reglamento"
iso_subject_field: "Gobernanza administrativa universitaria · Derecho administrativo universitario público · Coordinación interdireccional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 87"

align_dbpedia: ""
align_wikidata: ""

pasteur_quadrant: EDISON



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 87 (composición de 6 cargos + reglamento propio)"
normative_text: "El Consejo de Gestión Administrativa actúa como la instancia de dirección y coordinación del Sistema de Gestión Administrativa. Composición: a) Rector(a), quien lo preside; b) Vicerrectores(as); c) Secretario(a) general; d) Director(a) de Gestión Estratégica y de Planeación; e) Gerente administrativo y financiero; f) Director(a) de Bienestar Universitario y Buen Vivir. PARÁGRAFO: El Consejo de Gestión Administrativa se da su propio reglamento."
normative_authority_level: ESTATUTARIO
derogated_by: ""
derogates:
    - "Concepto NUEVO en ACU-004-25 (no existía órgano colegiado de coordinación administrativa en ACU 003/1997)"
modification_type: ""
chain_status: LINEAR
conflicts_with: []





rol_seleccionado: estudiante-soberano

"@type": GovernmentOrganization
"@context":
  "@vocab": https://schema.org/
skos: http://www.w3.org/2004/02/skos/core#
iso1087: https://www.iso.org/obp/ui/#iso:std:iso:1087
prov: http://www.w3.org/ns/prov#
dct: http://purl.org/dc/terms/


cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - consejo-gestion-administrativa
  - cga
  - art-87
  - sistema-gestion-administrativa
  - m00-base
  - concepto-nuevo
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Concepto NUEVO · órgano colegiado de coordinación administrativa
> El **CGA** es la instancia colegiada **NUEVA** que crea el ACU-004-25 para coordinar el Sistema de Gestión Administrativa. Sin precedente en ACU 003/1997 — refleja la transición de Vicerrectoría Administrativa unipersonal a órgano colegiado horizontal. Presidido por la Rectoría, articula 6 cargos directivos con los 3 subsistemas administrativos.

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

---

## §1 · Definición canónica (cita literal Art. 87)

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

| Sub-tipo | Pasteur | Effective force UDFJC |
|---|:-:|:-:|
| `INPUT[text(class(meta-bind-readonly)):concept_subtype]` | `INPUT[text(class(meta-bind-readonly)):pasteur_quadrant]` | `INPUT[text(class(meta-bind-readonly)):concepto_facet_normative.effective_force_in_udfjc]` |

> **Cita literal Art. 87**: "El Consejo de Gestión Administrativa actúa como la instancia de dirección y coordinación del Sistema de Gestión Administrativa. Composición: a) Rector(a), quien lo preside; b) Vicerrectores(as); c) Secretario(a) general; d) Director(a) de Gestión Estratégica y de Planeación; e) Gerente administrativo y financiero; f) Director(a) de Bienestar Universitario y Buen Vivir. PARÁGRAFO: El Consejo de Gestión Administrativa se da su propio reglamento."

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
if (!f) { dv.paragraph("(sin facet DDD)"); }
else {
  dv.header(4, `DDD · ${f.ddd_id ?? "—"} · ${f.ddd_role_in_context ?? "—"}`);
  dv.table(["Atributo", "Valor"], [
    ["Bounded Context", f.ddd_bc_ref ?? "—"],
    ["Aggregate Root", f.ddd_aggregate_root ?? "—"],
    ["Domain type", f.ddd_domain_type ?? "—"],
    ["Lifecycle states", (f.ddd_lifecycle_states ?? []).join(" · ") || "—"],
    ["Governed by", (f.ddd_governed_by ?? []).join(" · ") || "—"]
  ]);
  if ((f.ddd_invariants ?? []).length) {
    dv.header(5, "🔒 Invariantes operativas");
    dv.list(f.ddd_invariants);
  }
  if ((f.ddd_ubiquitous_terms ?? []).length) {
    dv.header(5, "🗣️ Lenguaje ubicuo");
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
      "**Tu interfaz con la administración**: el CGA es el órgano que **coordina** todas las decisiones operativas que afectan tu trayectoria académica (matrículas, becas, cupos, infraestructura, bienestar).",
      "- Si una demanda estudiantil cruza varias dependencias (e.g., financiera + bienestar + planeación), su resolución coordinada pasa por el CGA.",
      "**Acción concreta**: en demandas estudiantiles complejas, exige que se eleven al CGA para coordinación · evita la pelota institucional entre dependencias."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu currículo necesita coordinación administrativa**: aulas, plataformas, materiales, presupuesto pasan por el CGA cuando son decisiones cross-vicerrectoría.",
      "**Acción concreta**: cuando tu Paquete CCA requiere recursos compartidos entre vicerrectorías, identifica al miembro CGA correspondiente y articula la solicitud."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu práctica de aula** está soportada por decisiones del CGA: infraestructura, sistemas, bienestar estudiantil.",
      "**Acción concreta**: si tu Escuela tiene barreras administrativas recurrentes, propón al Director(a) de Escuela elevar el tema vía CACAD/CGA."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu PM2 cruza administración**: convenios, presupuesto, infraestructura, contratación de auxiliares — pasan por la Vicerrectoría I+C+I como miembro del CGA.",
      "**Acción concreta**: cuando tu proyecto cruce dependencias (Gerencia financiera + Planeación + Bienestar), solicita ruta CGA para evitar fragmentación operativa."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios PM3 requieren coordinación administrativa**: jurídica + financiera + planeación + extensión.",
      "**Acción concreta**: en convenios institucionales complejos, valida que la Vicerrectoría de Contextos eleve la coordinación necesaria al CGA antes de firma."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu gobernanza dialoga con el CGA**: decisiones de tu Escuela/Instituto/Centro que requieran coordinación administrativa cross-dependencia escalan al CGA via la Vicerrectoría correspondiente.",
      "- Verifica que el reglamento operativo del CGA esté expedido (PARÁGRAFO Art. 87 · pendiente al 2026-04-27).",
      "**Acción concreta**: solicita en CACAD reporte trimestral de actuación del CGA · trazabilidad de decisiones coordinativas."
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

- **Concepto NUEVO sin precedente** en ACU 003/1997 — refleja la transición desde Vicerrectoría Administrativa unipersonal a órgano colegiado horizontal.
- **Riesgo Período Transición**: si el reglamento propio (PARÁGRAFO Art. 87) no se expide, el CGA puede operar informalmente durante 2025-2029, fragmentando la coordinación.
- **Anclaje CoP**: la Comunidad de Práctica del CGA articula directivos administrativos y misionales · base de futuras prácticas de gestión integrada.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | **Concepto creado en Sprint 1A.6** (audit v2.2 · gap unidades organizativas). Modela el CGA como instancia colegiada NUEVA del ACU-004-25 Art. 87. Incluye: facet `[NORMATIVE, DDD]` + adoption_chain estatutaria + 5 invariantes operativas + 11 relaciones tipadas hacia los 6 cargos directivos del CGA + cadena de articulación con SIGUD/CSU. Body completo TPL T1 v2.2. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-gestion-administrativa` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
