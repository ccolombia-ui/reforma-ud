---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:decanatura
kd_title: "Decanatura UDFJC (Arts. 18e, 65, 67 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Decanatura"
skos_altLabel:
  - "Decano(a) de Facultad"
  - "Dean's Office"

skos_definition: "Autoridad ejecutiva unipersonal de la Facultad UDFJC declarada como **órgano de gobierno** en el Art. 18e del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Su titular —el(la) **Decano(a)**— es designado por elección directa ponderada conforme al Art. 67 con escala de **100 puntos**: votación ponderada **70 puntos** (docentes 30 + estudiantes 30 + egresados 10) + evaluación de hoja de vida **20 puntos** + entrevista con Rector **10 puntos**. Período de **4 años · sin reelección inmediata** (Art. 83). Funciones: dirige, representa y administra la Facultad bajo coordinación de la Vicerrectoría de Formación · preside el Consejo de Facultad · coordina las Áreas de Formación · representa la Facultad ante CACAD y CSU."
skos_scopeNote: "La Decanatura NO es Consejo de Facultad (órgano colegiado deliberativo · Art. 18d) — es la autoridad ejecutiva que lo preside. Sustituye a la figura del Decano del régimen ACU 003/1997 con cambios sustanciales en mecanismo de designación: la elección directa ponderada con votación 70% + HV 20% + entrevista 10% es invariante democrática nueva. La invariante de **NO reelección inmediata** (Art. 83) es deliberada · evita captura institucional."
skos_example: "El proceso de designación de Decano(a) en una Facultad UDFJC sigue el Art. 67: convocatoria pública → inscripción → votación ponderada (docentes/estudiantes/egresados) → evaluación HV → entrevista con Rector → designación. El Decano(a) electo asume por 4 años sin posibilidad de reelección inmediata."
skos_notation: "Decanatura"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Autoridad ejecutiva unipersonal universitaria a nivel facultativo"
iso_differentia: "Designación por elección directa ponderada (70% votación + 20% HV + 10% entrevista) · período 4 años · sin reelección inmediata · preside Consejo de Facultad · coordina Áreas de Formación"
iso_subject_field: "Gobernanza académica universitaria · Dirección facultativa · Derecho universitario público"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18e + 65 + 67 + 83"

pasteur_quadrant: EDISON








rol_seleccionado: docente-director



cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - decanatura
  - decano
  - art-65
  - art-67
  - art-83
  - autoridad-ejecutiva-facultad
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Autoridad ejecutiva facultativa · elección democrática 70-20-10
> La **Decanatura** es la autoridad ejecutiva unipersonal de la Facultad. Designación por elección directa ponderada (votación 70% + HV 20% + entrevista 10%) · período 4 años · **sin reelección inmediata** (Art. 83 invariante anti-captura).

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo C. Modela Decanatura con elección 70-20-10 + no reelección inmediata + invariantes anti-captura. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-decanatura` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
