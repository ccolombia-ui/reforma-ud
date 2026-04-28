---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:direccion-gestion-estrategica-planeacion
kd_title: "Dirección de Gestión Estratégica y de Planeación UDFJC (Art. 86c ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Dirección de Gestión Estratégica y de Planeación (DGEP)"
skos_altLabel:
  - "DGEP"
  - "Dirección de Planeación UDFJC"
  - "Strategic Management and Planning Direction"
  - "Oficina de Planeación reformada"

skos_definition: "Dependencia institucional UDFJC creada por el Art. 86c del ACU-004-25 como **instancia ejecutiva del Subsistema 1 (Gestión Estratégica y de Planeación)** del Sistema de Gestión Administrativa. Su titular —el(la) **Director(a) de Gestión Estratégica y de Planeación**— es miembro del Consejo de Gestión Administrativa (Art. 87d). Responsable de **definir las líneas de acción institucional** para optimizar recursos, asegurar la eficacia de los planes, evaluar continuamente los procesos, gestionar el mejoramiento continuo y garantizar el aseguramiento de la calidad institucional. Articula el Plan Estratégico de Desarrollo (PED 2018-2030 · Acuerdo CSU 009/2018) con la operación cotidiana, traduce mandatos misionales (Funciones del Art. 7) en planes operativos anuales, y opera como interface técnica con MIPG nacional (Decreto 1083/2015) y con SIGUD (Resolución Rectoría 207/2016). Sustituye a la antigua Oficina Asesora de Planeación del régimen 1997 — elevándola de oficina asesora a Dirección con asiento en CGA."
skos_scopeNote: "La DGEP NO ejecuta políticas misionales (eso es competencia de las Vicerrectorías) · su rol es **PLANIFICAR + EVALUAR + ASEGURAR CALIDAD**. NO confundir con la Oficina Asesora de Planeación del Art. 33 — bajo el ACU-004-25, la Oficina Asesora de Planeación se eleva a Dirección de Gestión Estratégica y de Planeación con miembership en CGA. Es la instancia técnica que produce los **insumos para FURAG, CHIP, SUE, SNIES** y demás reportes de gestión pública nacional."
skos_example: "Cuando el Rector debe presentar al CSU el Plan de Implementación de la Reforma (Art. 98 · vencido 2025-06-19) o el Plan de Acción Anual, la DGEP es la dependencia técnica que estructura el documento articulando insumos de las 3 vicerrectorías + Gerencia Administrativa + SIGUD."
skos_notation: "DGEP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia institucional ejecutiva universitaria"
iso_differentia: "Lidera Subsistema 1 (Gestión Estratégica y Planeación) del Sistema de Gestión Administrativa · miembro del CGA · sustituye a Oficina Asesora de Planeación del régimen 1997 · interface técnica con MIPG y SIGUD"
iso_subject_field: "Planeación estratégica universitaria · Gestión pública · Aseguramiento de la calidad institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 86c + Art. 87d + Art. 85 §1"

pasteur_quadrant: EDISON









rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - direccion-planeacion
  - dgep
  - art-86c
  - art-87d
  - subsistema-1
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Dependencia ejecutiva del Subsistema 1 · CoP fundacional
> La **DGEP** es la dependencia institucional UDFJC que lidera el **Subsistema 1 (Gestión Estratégica y Planeación)** y tiene asiento titular en el **CGA**. Eleva la antigua Oficina Asesora de Planeación a Dirección con representación directa. Es la **interface técnica** entre UDFJC y MIPG nacional + PED + SIGUD.

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
if (!f) { dv.paragraph("(sin facet normative)"); }
else {
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
      "**La DGEP cuida tus indicadores**: tasa de graduación, deserción, satisfacción, infraestructura · todo lo que afecta tu trayectoria es monitoreado por DGEP.",
      "**Acción concreta**: si percibes barreras estructurales en tu Escuela, propón vía Consejo Estudiantil que DGEP las incluya como indicadores · trazabilidad institucional."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu currículo dialoga con el PED 2018-2030**: la DGEP define los lineamientos estratégicos que tu Paquete CCA debe alinear.",
      "**Acción concreta**: consulta el Plan de Acción Anual de DGEP · ahí encuentras prioridades estratégicas para anclar tu diseño curricular."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu evaluación de aula** alimenta los indicadores institucionales que DGEP reporta a FURAG-MIPG.",
      "**Acción concreta**: documenta evidencias de calidad pedagógica · DGEP las consolida en aseguramiento de calidad institucional."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu PM2 alimenta los indicadores SNCTI**: DGEP consolida productividad investigativa para reportes Minciencias + MEN.",
      "**Acción concreta**: registra tus productos de investigación en sistemas institucionales · DGEP los reporta agregadamente."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios PM3 son insumos del PED**: DGEP los consolida como evidencia de impacto territorial.",
      "**Acción concreta**: cuando firmes convenio, registralo formalmente · DGEP lo agrega a su reporte de impacto."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu reporte de gestión** es consolidado por DGEP que lo eleva al CGA y CSU.",
      "- Verificación: ¿tu Escuela/Instituto/Centro reporta indicadores trimestrales a DGEP?",
      "**Acción concreta**: institucionaliza ritmo de reporte trimestral con DGEP · base de tu rendición de cuentas ante CACAD."
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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 (audit v2.2 · gap unidades organizativas). Modela DGEP como dependencia ejecutiva del Subsistema 1 con miembership en CGA · transición desde Oficina Asesora de Planeación 1997. Cadena de adopción multinivel: ACU-004-25 + PED + MIPG. Capabilities `[NORMATIVE, DDD]` + facet NEON con BSC-s/RBM-GAC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-direccion-gestion-estrategica-planeacion` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
