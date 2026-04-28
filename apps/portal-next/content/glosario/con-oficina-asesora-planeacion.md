---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-asesora-planeacion
kd_title: "Oficina Asesora de Planeación UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Oficina Asesora de Planeación (OAP)"
skos_altLabel:
  - "OAP UDFJC"
  - "Planning Advisory Office"

skos_definition: "Dependencia asesora adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 entre las dependencias rectorales (junto con Secretaría General, Oficina de Control Interno y Oficina de Comunicaciones). Su función es **asesorar técnicamente a la Rectoría en planeación institucional**: producción de Plan de Acción Anual, monitoreo de indicadores, articulación con MIPG nacional, soporte técnico al PED 2018-2030. **Coexiste en transición** con la Dirección de Gestión Estratégica y de Planeación (Art. 86c) que el ACU-004-25 crea como dependencia elevada con asiento en CGA. Durante el Período de Transición (Art. 96 · 4 años), la OAP migra progresivamente hacia DGEP, manteniendo continuidad operativa de funciones de planeación. Antecedente histórico: existió bajo régimen ACU 003/1997 como Oficina Asesora · ACU-004-25 la mantiene transitoriamente y la eleva estructuralmente a Dirección."
skos_scopeNote: "El ACU-004-25 declara DOS instancias de planeación que pueden generar confusión: (a) Oficina Asesora de Planeación (Art. 33) como dependencia rectoral asesora histórica, (b) Dirección de Gestión Estratégica y de Planeación (Art. 86c) como dependencia elevada con asiento en CGA. La Oficina opera como asesoría rectoral; la Dirección opera como instancia ejecutiva del Subsistema 1 con representación colegiada. Durante la transición, sus funciones convergen progresivamente bajo la Dirección."
skos_example: "Cuando la Rectoría requiere insumos técnicos para planeación inmediata (e.g., presentación al CSU), la Oficina Asesora de Planeación opera como asesoría rectoral · cuando la decisión planificada cruza el CGA, la Dirección de Gestión Estratégica y de Planeación lo conduce."
skos_notation: "OAP"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia asesora adscrita a la Rectoría universitaria"
iso_differentia: "Función asesora histórica · antecedente directo de DGEP · coexiste en transición con dependencia elevada · adscrita directamente a Rectoría"
iso_subject_field: "Planeación universitaria · Asesoría rectoral · Gestión pública"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33"

pasteur_quadrant: EDISON



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 33"
normative_text: "Dependencias de la Rectoría: Secretaría General, Oficina de Planeación, Oficina de Control Interno, Oficina de Comunicaciones, y las demás que determine el CSU."
normative_authority_level: ESTATUTARIO
derogated_by: ""
derogates: []
modification_type: "Coexistencia transitoria con DGEP (Art. 86c) · transición progresiva durante Período Transición Art. 96"
chain_status: BRANCHING
conflicts_with: []





rol_seleccionado: estudiante-soberano

"@type": GovernmentOrganization


cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oficina-asesora-planeacion
  - oap
  - art-33
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Dependencia asesora rectoral · transición a DGEP
> La **OAP** es la dependencia asesora rectoral de planeación declarada en el Art. 33 del ACU-004-25. Coexiste en transición con la **DGEP** (Art. 86c) que la eleva con asiento en CGA. Durante el Período de Transición, sus funciones convergen progresivamente bajo la Dirección elevada.

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

## §7 · 🤝 Relaciones tipadas

```dataviewjs
const rels = dv.current().tupla__relations ?? [];
const vocabPage = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocabPage?.relaciones ?? {};
const lookupRel = (n, d) => {
  const dir = d ?? "co";
  return relMap[n]?.[dir] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post ?? null;
};
const humanLabel = (n, d) => lookupRel(n, d)?.label ?? `\`${n}\``;
for (const r of rels) dv.paragraph(`**${humanLabel(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OAP como dependencia asesora rectoral · antecedente directo de DGEP en transición. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-asesora-planeacion` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
