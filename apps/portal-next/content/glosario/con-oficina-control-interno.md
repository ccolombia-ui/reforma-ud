---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:oficina-control-interno
kd_title: "Oficina de Control Interno UDFJC (Art. 33 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Oficina de Control Interno (OCI)"
skos_altLabel:
  - "OCI UDFJC"
  - "Internal Control Office"
  - "Auditoría Interna UDFJC"

skos_definition: "Dependencia adscrita a la Rectoría UDFJC declarada en el Art. 33 del ACU-004-25 responsable del **Sistema de Control Interno** institucional bajo el marco vinculante nacional de la **Ley 87 de 1993** (que establece normas para el ejercicio del control interno en entidades públicas) y de la **Dimensión 7 del MIPG** (Control Interno · Decreto 1083/2015). Su jefe es designado por el Rector(a) por período de **4 años** (Art. 8° Ley 87/1993 modificado por Ley 1474/2011) y goza de **independencia técnica** respecto de las dependencias auditadas. Funciones canónicas: (i) **valoración del riesgo institucional**; (ii) **auditoría interna** sobre legalidad, eficiencia, eficacia y transparencia; (iii) **fomento de cultura del control**; (iv) **evaluación independiente** del Sistema de Control Interno; (v) **relación con organismos de control externos** (Contraloría General, Personería Distrital, Procuraduría)."
skos_scopeNote: "OCI NO depende jerárquicamente del Consejo de Gestión Administrativa (CGA) ni puede ser auditada por dependencias bajo su control · su independencia es invariante de la Ley 87/1993. Diferente del **Comité Institucional de Coordinación de Control Interno** (CICCI) que es órgano colegiado consultivo del Sistema. La OCI reporta directamente a la Rectoría y al CSU."
skos_example: "Cuando UDFJC presenta su informe anual de Control Interno a la Contraloría General o al CSU, lo hace bajo responsabilidad técnica de la OCI · cuyo jefe (Auditor Interno) firma el documento con independencia técnica."
skos_notation: "OCI"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia rectoral de control interno universitaria pública"
iso_differentia: "Autonomía técnica garantizada por Ley 87/1993 · jefe designado por 4 años · función auditora independiente · materializa MIPG D7"
iso_subject_field: "Control interno público · Auditoría gubernamental · Derecho administrativo público"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 33 + Ley 87 de 1993 + Decreto 1083/2015"

pasteur_quadrant: EDISON



normative_source: "[[cita-ley-87-1993-control-interno]]"
normative_locator: "Ley 87/1993 + Decreto 1083/2015 D7 + ACU-004-25 Art. 33"
normative_text: "Dependencias de la Rectoría: Secretaría General, Oficina de Planeación, Oficina de Control Interno, Oficina de Comunicaciones... (Art. 33 ACU-004-25). Marco superior: Ley 87/1993 establece normas para el ejercicio del control interno en entidades del Estado."
normative_authority_level: LEGAL
derogated_by: ""
derogates: []
modification_type: ""
chain_status: LINEAR
conflicts_with: []






rol_seleccionado: docente-director

"@type": GovernmentOrganization


cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - oficina-control-interno
  - oci
  - art-33
  - ley-87-1993
  - meci
  - dependencia-rectoral
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ Dependencia rectoral con independencia técnica · Ley 87/1993
> La **OCI** ejerce el Control Interno institucional bajo marco vinculante **Ley 87/1993** + **MIPG D7**. Su jefe es designado por la Rectoría por 4 años con **independencia técnica garantizada por ley** · NO puede ser auditada por dependencias bajo su control.

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
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo B. Modela OCI bajo cadena Ley 87/1993 + MIPG D7 + ACU-004-25 Art. 33 · independencia técnica como invariante. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-oficina-control-interno` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
