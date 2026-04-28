---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-comunicaciones
kd_title: "Oficina de Comunicaciones UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Oficina de Comunicaciones"
skos_altLabel:
  - "OComUD"
  - "Communications Office UDFJC"
  - "Oficina Asesora de Comunicaciones"

skos_definition: "Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable de la **comunicación institucional interna y externa**: comunicación organizacional (entre estamentos), comunicación pública (con sociedad y stakeholders externos), comunicación digital (web institucional, redes sociales, intranet), gestión de medios institucionales (Editorial UD, Emisora UD, sistemas digitales), atención a periodistas y eventos institucionales. Materializa el cumplimiento de la **Ley 1712 de 2014** (Transparencia y Derecho de Acceso a la Información Pública Nacional) que obliga a entidades públicas a publicar información mínima en sitio web institucional, y de la **Dimensión 5 del MIPG** (Información y Comunicación · gestión integral)."
skos_scopeNote: "OComUD NO es Editorial UD ni Emisora UD (medios institucionales con autonomía editorial relativa) — es la dependencia que **coordina** la política comunicacional institucional integrada. Su rol es transversal: apoya a Rectoría, vicerrectorías, Asamblea Universitaria, Consejos · NO compite con la comunicación académica de Escuelas/Facultades sino la articula institucionalmente."
skos_example: "Cuando UDFJC emite comunicación oficial (e.g., expedición de Acuerdo CSU, posicionamiento ante medios, convocatoria pública, evento institucional), la OComUD coordina la política comunicacional articulando todos los canales (web, redes, medios institucionales, prensa)."
skos_notation: "OComUD"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia rectoral de comunicación institucional pública"
iso_differentia: "Coordina comunicación interna + externa + digital + medios institucionales · materializa Ley 1712/2014 + MIPG D5"
iso_subject_field: "Comunicación organizacional pública · Transparencia · Comunicación universitaria"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33 + Ley 1712/2014 + Decreto 1083/2015 D5"

pasteur_quadrant: EDISON



normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
normative_locator: "ACU-004-25 Art. 33 + Ley 1712/2014 + MIPG D5"
normative_text: "Dependencias de la Rectoría: ... Oficina de Comunicaciones, y las demás que determine el CSU."
normative_authority_level: LEGAL
derogated_by: ""
derogates: []
modification_type: ""
chain_status: LINEAR
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
  - oficina-comunicaciones
  - art-33
  - ley-1712-2014
  - transparencia
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Dependencia rectoral · materializa Ley 1712/2014 + MIPG D5
> La **OComUD** coordina la comunicación institucional UDFJC (interna + externa + digital) bajo marco vinculante de **Transparencia (Ley 1712/2014)** y **MIPG D5**.

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OComUD bajo cadena Ley 1712/2014 + MIPG D5 + ACU-004-25 Art. 33. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-comunicaciones` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
