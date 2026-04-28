---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:unidades-apoyo-curricular
kd_title: "Unidades de Apoyo a la Gestión Curricular UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Unidades de Apoyo a la Gestión Curricular"
skos_altLabel: ["Unidades de Apoyo Curricular", "UAC", "Curricular Management Support Units"]

skos_definition: "Sub-unidades operativas internas de las Facultades UDFJC declaradas en el **Art. 65 del ACU-004-25** como componente obligatorio de la estructura facultativa. Apoyan la **gestión curricular** de los Programas Académicos y Áreas de Formación: diseño curricular, evaluación pedagógica, prácticas profesionales, movilidad académica, articulación pregrado-posgrado, evaluación docente, certificación y acreditación de programas. Su composición específica se desarrolla en el Estatuto Académico nuevo (Art. 98 §1). Pueden incluir: Comité Curricular, Coordinación de Prácticas, Coordinación de Movilidad, Comité de Autoevaluación, Comité de Investigación-Creación facultativa, según necesidades de cada Facultad."
skos_scopeNote: "UAC son ESPECIALIZACIONES OPERATIVAS de la Facultad — no órganos de gobierno (esos son Decanatura + Consejo de Facultad). Su rol es soporte técnico-pedagógico para que los programas operen con coherencia curricular. Pueden ser permanentes o temporales según ciclo de los programas. Articuladas con CIDC (investigación) cuando aplique."
skos_example: "Un Comité Curricular de Facultad de Ingeniería que articula 3 Áreas de Formación + 12 programas y se reúne mensualmente para revisar planes de estudio, evaluar Paquetes CCA y proponer ajustes al Consejo de Facultad."
skos_notation: "UAC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sub-unidades operativas internas de Facultad universitaria"
iso_differentia: "Soporte técnico-pedagógico a la gestión curricular · obligatorio Art. 65 estructura facultativa · composición específica desarrollada en Estatuto Académico"
iso_subject_field: "Gestión curricular universitaria · Soporte pedagógico facultativo"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 65"

pasteur_quadrant: PASTEUR







rol_seleccionado: docente-disenador



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, unidades-apoyo-curricular, art-65, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Soporte técnico-pedagógico facultativo
> Las **UAC** son sub-unidades operativas de Facultad que apoyan la gestión curricular · Comité Curricular, Coordinación de Prácticas, Comité de Autoevaluación, etc.

---

## §0 · 🎭 Vista por rol

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · Anclaje + cadena

```dataviewjs
const f = dv.current().concepto_facet_normative;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.table(["Campo", "Valor"], [["Origen", `${f.origin_type} · ${f.origin_force}`], ["Authority", f.normative_authority_level], ["Effective force", `**${f.effective_force_in_udfjc}**`]]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) { dv.header(4, `🔗 Cadena · ${chain.length}`); dv.table(["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"], chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence])); }
}
```

## §3 · DDD invariantes

```dataviewjs
const f = dv.current().concepto_facet_ddd;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.header(4, `DDD · ${f.ddd_id}`);
  if ((f.ddd_invariants ?? []).length) { dv.header(5, "🔒 Invariantes"); dv.list(f.ddd_invariants); }
  if ((f.ddd_ubiquitous_terms ?? []).length) { dv.header(5, "🗣️ Lenguaje ubicuo"); dv.paragraph(f.ddd_ubiquitous_terms.join(" · ")); }
}
```

## §7 · Relaciones tipadas

```dataviewjs
const rels = dv.current().tupla__relations ?? [];
const vocab = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocab?.relaciones ?? {};
const hL = (n, d) => { const e = relMap[n]?.[d ?? "co"] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post; return e?.label ?? `\`${n}\``; };
for (const r of rels) dv.paragraph(`**${hL(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target}`);
```

## §10 · Citado en

```dataviewjs
dv.list(dv.current().cited_in ?? []);
dv.paragraph(`**Total**: ${dv.current().cited_count ?? 0}`);
```

---

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo C. UAC como soporte técnico-pedagógico facultativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-unidades-apoyo-curricular` v1.0.0*
