---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:subsistema-talento-financiero-infraestructura
kd_title: "Subsistema 2 · Talento Humano, Gestión Financiera e Infraestructura UDFJC (Art. 85 §2 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Subsistema 2 · Talento Humano, Gestión Financiera e Infraestructura"
skos_altLabel:
  - "Subsistema Talento + Financiera + Infraestructura"
  - "Subsistema 2 SGA"
  - "Operations Subsystem"

skos_definition: "Segundo de los **tres subsistemas estructurales** del Sistema de Gestión Administrativa UDFJC declarado en el Art. 85 §2 del ACU-004-25. Su función canónica es **garantizar la disposición de infraestructura física y tecnológica, recursos financieros y talento humano para el óptimo desarrollo de las funciones universitarias**. Operacionalmente liderado por la Gerencia Administrativa y Financiera (Art. 86d). Articula tres macroprocesos críticos: (i) **Talento Humano** (selección, vinculación, desarrollo, evaluación, retiro · personal docente y administrativo); (ii) **Gestión Financiera** (presupuesto, tesorería, contabilidad, costos · NICSP-CGN, CCP-MHCP, Estatuto Tributario); (iii) **Infraestructura** (planta física, sedes, laboratorios, sistemas de información, conectividad). Es el subsistema que **provisiona materialmente** las condiciones operativas para que las funciones misionales (PM1+PM2+PM3) y unidades académicas (Escuelas, Institutos, Centros) operen sin discontinuidad."
skos_scopeNote: "El Subsistema 2 NO es la GAF que lo lidera — es la **función estructural** del SGA que la GAF ejecuta. Garantiza la disponibilidad operativa pero NO ejerce competencias misionales. Articulado upstream con Subsistema 1 (planificación) y downstream con Subsistema 3 (soporte normativo-documental). Sin Subsistema 2, las decisiones del Subsistema 1 quedarían sin materialización operativa."
skos_example: "Cuando una Escuela necesita renovar laboratorio especializado, el Subsistema 2 provisiona en 3 vías: Talento Humano (técnicos + auxiliares) + Financiera (presupuesto + tesorería) + Infraestructura (equipamiento + adecuación física + sistemas de información)."
skos_notation: "S2-SGA"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Subsistema funcional del Sistema de Gestión Administrativa universitaria"
iso_differentia: "Función de provisión operacional · 3 macroprocesos integrados (Talento + Financiera + Infraestructura) · liderado por GAF · segundo de 3 subsistemas Art. 85"
iso_subject_field: "Gestión administrativa pública · Gestión financiera · Talento humano universitario · Infraestructura universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 85 §2"

pasteur_quadrant: EDISON







rol_seleccionado: estudiante-soberano

"@type": GovernmentService


cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-09--ds-presupuesto-nicsp]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - subsistema-2
  - talento-humano
  - gestion-financiera
  - infraestructura
  - art-85
  - sistema-gestion-administrativa
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Subsistema funcional del SGA · ejecutado por GAF
> Segundo de los 3 subsistemas del SGA. Garantiza la **disposición de infraestructura física-tecnológica + recursos financieros + talento humano** para el óptimo desarrollo de las funciones universitarias. Ejecutado por la **GAF** · materializa MIPG D1+D5 en operación UDFJC.

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6. Modela Subsistema 2 del SGA como función estructural ejecutada por GAF · 3 macroprocesos integrados. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-subsistema-talento-financiero-infraestructura` v1.0.0 · TPL T1 NORMATIVO*
