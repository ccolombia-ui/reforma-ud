---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-gestion-normativa-documental
kd_title: "Subsistema 3 · Gestión Normativa y Documental UDFJC (Art. 85 §3 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Subsistema 3 · Gestión Normativa y Documental"
skos_altLabel:
  - "Subsistema Normativo Documental"
  - "Subsistema 3 SGA"
  - "Normative and Documentary Management Subsystem"

skos_definition: "Tercero de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §3 del ACU-004-25. Su función canónica es **orientar con fundamento en el marco legal, las capacidades institucionales y de gobierno, la seguridad jurídica en la toma de decisiones y la gestión general de la Institución**. Operacionalmente liderado por la Secretaría General (SISGRAL · Arts. 40-42), articula tres macroprocesos críticos: (i) **Gestión jurídica institucional** (consultoría jurídica + defensa judicial + control de legalidad de actos); (ii) **Gestión documental** (custodia archivos + expedición certificaciones + trazabilidad documental); (iii) **Gestión normativa** (sistematización + difusión + actualización del marco normativo institucional · SISGRAL). Es el subsistema que materializa la **fe pública institucional** y la **trazabilidad jurídica** de las decisiones administrativas y misionales. Sin S3, los actos institucionales (Acuerdos, Resoluciones, Circulares) carecerían de soporte normativo coherente."
skos_scopeNote: "El Subsistema 3 NO es la Secretaría General que lo lidera — es la **función estructural** del SGA que la Secretaría General ejecuta. Articulado upstream con S1 (planificación de actos institucionales) y con S2 (soporte jurídico-documental a actos administrativos). Es el subsistema más dependiente de **cumplimiento normativo legal** (Constitución + Ley General de Archivos 594/2000 + Estatuto Anticorrupción + Ley de Transparencia + ACU-004-25 + estatutos derivados Art. 98)."
skos_example: "Cuando UDFJC expide un Acuerdo del CSU o una Resolución de Rectoría, el Subsistema 3 (vía Secretaría General) garantiza: (i) revisión jurídica previa, (ii) numeración y fecha trazables, (iii) publicación en SISGRAL, (iv) custodia documental, (v) certificación de copias auténticas."
skos_notation: "S3-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de gestión normativa + documental + jurídica · liderado por Secretaría General SISGRAL · tercero de 3 subsistemas Art. 85"
iso_subject_field: "Derecho administrativo universitario · Gestión documental pública · Sistema normativo institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §3"

pasteur_quadrant: EDISON



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 85 §3"
normative_text: "Subsistema 3: Gestión Normativa y Documental · Orienta con fundamento en el marco legal, las capacidades institucionales y de gobierno, la seguridad jurídica en la toma de decisiones y la gestión general de la Institución."
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
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-3
  - gestion-normativa
  - gestion-documental
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Subsistema funcional del SGA · ejecutado por Secretaría General
> Tercero de los 3 subsistemas del SGA. Garantiza la **seguridad jurídica + gestión documental + gestión normativa**. Ejecutado por la **Secretaría General SISGRAL** · materializa MIPG D6+D7 + Ley 594/2000 + Ley 1712/2014.

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
const lookupRel = (n, d) => {
  const dir = d ?? "co";
  return relMap[n]?.[dir] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post ?? null;
};
const humanLabel = (n, d) => lookupRel(n, d)?.label ?? `\`${n}\``;
for (const r of rels) {
  dv.paragraph(`**${humanLabel(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela Subsistema 3 del SGA como función estructural ejecutada por Secretaría General SISGRAL. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-gestion-normativa-documental` v1.0.0 · TPL T1 NORMATIVO*
