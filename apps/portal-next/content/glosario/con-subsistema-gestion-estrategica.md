---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-gestion-estrategica
kd_title: "Subsistema 1 · Gestión Estratégica y de Planeación UDFJC (Art. 85 §1 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Subsistema 1 · Gestión Estratégica y de Planeación"
skos_altLabel:
  - "Subsistema Gestión Estratégica"
  - "Subsistema 1 SGA"
  - "Strategic Management Subsystem"

skos_definition: "Primero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 del ACU-004-25. Su función canónica es **definir las líneas de acción institucional para la optimización de recursos, eficacia de los planes, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad**. Operacionalmente liderado por la Dirección de Gestión Estratégica y de Planeación (Art. 86c). Articula horizonte estratégico (PED 2018-2030 · ACU CSU 009/2018) con planes operativos anuales · indicadores institucionales · reporte FURAG-MIPG · aseguramiento de calidad ISO 21001/9001 vía SIGUD. Es el subsistema que materializa la **función de planeación pública** que MIPG nacional exige a las entidades del Estado (Decreto 1083/2015 + Ley 1753/2015 Art. 133)."
skos_scopeNote: "El Subsistema 1 NO es la Dirección que lo lidera (DGEP) — es la **función estructural** del Sistema de Gestión Administrativa que la DGEP ejecuta. La distinción es importante: el subsistema vive como invariante institucional (función), la DGEP es la dependencia que lo opera (entidad). Sin el Subsistema 1, los Subsistemas 2 (Talento+Financiera+Infra) y 3 (Normativa+Documental) operarían sin dirección estratégica."
skos_example: "El Plan de Implementación de la Reforma (Art. 98 · vencido 2025-06-19), el Plan de Acción Anual UDFJC, los reportes FURAG anuales y el monitoreo de indicadores institucionales son productos del Subsistema 1 ejecutados por la DGEP."
skos_notation: "S1-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de planeación estratégica + evaluación + mejoramiento continuo + aseguramiento de calidad · liderado por DGEP · primero de 3 subsistemas Art. 85"
iso_subject_field: "Planeación estratégica universitaria pública · Aseguramiento de la calidad · MIPG"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §1"

pasteur_quadrant: EDISON



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 85 §1"
normative_text: "Subsistema 1: Gestión Estratégica y de Planeación · Define líneas de acción institucional para la optimización de recursos, eficacia de los planes, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad."
normative_authority_level: ESTATUTARIO
derogated_by: ""
derogates: []
modification_type: ""
chain_status: LINEAR
conflicts_with: []





rol_seleccionado: estudiante-soberano

"@type": GovernmentService


cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-08--framework-86x6]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-1
  - gestion-estrategica
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Subsistema funcional del SGA · ejecutado por DGEP
> Primero de los 3 subsistemas del Sistema de Gestión Administrativa. Define líneas de acción institucional, optimización de recursos, evaluación continua de procesos, mejoramiento continuo y aseguramiento de la calidad. Ejecutado por la **DGEP** · materializa MIPG D2 en operación UDFJC.

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
    ["Domain type", f.ddd_domain_type ?? "—"]
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
  dv.header(4, `${humanFrame(frame)} · ${rs.length} relación(es)`);
  for (const r of rs) {
    dv.paragraph(`**${humanLabel(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela el Subsistema 1 del SGA como función estructural ejecutada por DGEP. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-gestion-estrategica` v1.0.0 · TPL T1 NORMATIVO*
