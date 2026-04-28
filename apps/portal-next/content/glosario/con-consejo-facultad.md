---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-facultad
kd_title: "Consejo de Facultad UDFJC (Arts. 18d, 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Facultad"
skos_altLabel: ["CF UDFJC", "Faculty Council"]

skos_definition: "Órgano de gobierno colegiado de la Facultad UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18d del ACU-004-25 y como componente obligatorio de la estructura de Facultad en el Art. 65. Es el espacio deliberativo de discusión académica facultativa que articula representación de docentes, estudiantes, egresados y administración facultativa. Presidido por la Decanatura, propone políticas curriculares de la Facultad, evalúa programas académicos y articula las Áreas de Formación con el campo de Formación general (PM1). Sus decisiones se elevan al Consejo Académico (CACAD) cuando exceden competencias facultativas."
skos_scopeNote: "Cada Facultad UDFJC tiene su propio Consejo de Facultad — son N consejos paralelos coordinados por sus Decanaturas. NO confundir con el Consejo Académico (CACAD) que es nacional-institucional. La composición específica del Consejo de Facultad se desarrollará en el Estatuto Académico nuevo (Art. 98 §1 · vencido 2025-11-05)."
skos_example: "Cuando una Facultad debe decidir la modificación curricular de un programa o aprobación de un nuevo Paquete CCA, lo decide el Consejo de Facultad presidido por la Decanatura · si la decisión requiere modificación de plan de estudios, eleva al CACAD."
skos_notation: "CF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario a nivel facultativo"
iso_differentia: "Presidido por la Decanatura · deliberación académica facultativa · representación multi-estamento · obligatorio Art. 65 estructura facultativa"
iso_subject_field: "Gobernanza académica facultativa universitaria · Política curricular"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 18d + 65"

pasteur_quadrant: EDISON







rol_seleccionado: docente-director

"@type": GovernmentOrganization


cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - consejo-facultad
  - art-18d
  - art-65
  - organo-gobierno
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Órgano colegiado facultativo · presidido por Decanatura
> El **Consejo de Facultad** es el órgano deliberativo de gobierno facultativo. Presidido por la Decanatura · representación multi-estamento · coordinación curricular de Áreas.

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición canónica

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · 📜 Anclaje normativo + cadena de adopción

```dataviewjs
const me = dv.current(); const f = me.concepto_facet_normative;
if (!f) dv.paragraph("(sin facet normative)"); else {
  dv.table(["Campo", "Valor"], [["**Origen**", `${f.origin_type ?? "—"} · ${f.origin_force ?? "—"}`], ["**Authority**", f.normative_authority_level ?? "—"], ["**Effective force**", `**${f.effective_force_in_udfjc ?? "—"}**`]]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) { dv.header(4, `🔗 Cadena · ${chain.length} eslabón(es)`); dv.table(["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"], chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence])); }
}
```

## §3 · 🧩 Estructura DDD

```dataviewjs
const f = dv.current().concepto_facet_ddd;
if (!f) dv.paragraph("(sin facet DDD)"); else {
  dv.header(4, `DDD · ${f.ddd_id ?? "—"}`);
  if ((f.ddd_invariants ?? []).length) { dv.header(5, "🔒 Invariantes"); dv.list(f.ddd_invariants); }
  if ((f.ddd_ubiquitous_terms ?? []).length) { dv.header(5, "🗣️ Lenguaje ubicuo"); dv.paragraph(f.ddd_ubiquitous_terms.join(" · ")); }
}
```

## §7 · 🤝 Relaciones tipadas

```dataviewjs
const rels = dv.current().tupla__relations ?? [];
const vocab = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocab?.relaciones ?? {};
const humanLabel = (n, d) => { const e = relMap[n]?.[d ?? "co"] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post; return e?.label ?? `\`${n}\``; };
for (const r of rels) dv.paragraph(`**${humanLabel(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
```

## §10 · 📜 Citado en

```dataviewjs
dv.list(dv.current().cited_in ?? []);
dv.paragraph(`**Total citaciones**: ${dv.current().cited_count ?? 0}`);
```

---

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado Sprint 1A.6 Grupo C. Modela Consejo de Facultad como órgano colegiado del Gobierno Universitario presidido por Decanatura. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-facultad` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
