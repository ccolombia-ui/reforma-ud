---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:consejo-bienestar-buen-vivir
kd_title: "Consejo de Bienestar y Buen Vivir UDFJC (Art. 18l ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Consejo de Bienestar y Buen Vivir"
skos_altLabel: ["CBBV", "Wellbeing Council"]

skos_definition: "Órgano de gobierno colegiado del Sistema de Bienestar y Buen Vivir UDFJC declarado como **órgano del Gobierno Universitario** en el Art. 18l del ACU-004-25. Articula la deliberación sobre políticas integradas de bienestar (servicios tradicionales) + Buen Vivir (dimensión decolonial andina) con representación multi-estamento (4 estamentos de la Comunidad Universitaria). Su rol es **deliberativo-propositivo** sobre el Sistema de Bienestar y Buen Vivir (Arts. 88-90) operado por la Dirección de Bienestar Universitario y Buen Vivir (DBBV). Su composición específica se desarrollará en el Estatuto de Bienestar y Buen Vivir nuevo (Art. 98 §7)."
skos_scopeNote: "El CBBV es DIFERENTE del Consejo de Gestión Administrativa (CGA · Art. 87): el CGA articula coordinación administrativa al nivel de directivos, el CBBV es órgano de participación democrática multi-estamento sobre temas de bienestar. La DBBV (Dirección) es la dependencia ejecutiva — el CBBV es el órgano deliberativo. Sin el CBBV, el Sistema Bienestar y Buen Vivir operaría sin instancia colegiada de participación de la Comunidad."
skos_example: "Cuando UDFJC debe decidir políticas de soberanía alimentaria con cafeterías saludables + huerta universitaria + saberes ancestrales, el proceso integra deliberación del CBBV (multi-estamento) + ejecución de la DBBV (operacional con asiento en CGA)."
skos_notation: "CBBV"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Órgano de gobierno colegiado universitario sobre bienestar y principios refundacionales"
iso_differentia: "Deliberación multi-estamento sobre Sistema Bienestar y Buen Vivir · diferente del CGA (administrativo) y de la DBBV (ejecutiva) · órgano declarado Art. 18l"
iso_subject_field: "Gobernanza democrática universitaria · Bienestar institucional · Principios decoloniales"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 18l + Arts. 88-90"

pasteur_quadrant: PASTEUR







rol_seleccionado: estudiante-soberano



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, consejo-bienestar, cbbv, art-18l, organo-gobierno, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Órgano colegiado deliberativo · multi-estamento
> El **CBBV** delibera sobre el Sistema de Bienestar y Buen Vivir · diferente de la DBBV (ejecutiva) y del CGA (administrativo). Concepto NUEVO sin precedente en ACU 003/1997.

## §0 · 🎭 Vista por rol

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · Anclaje

```dataviewjs
const f = dv.current().concepto_facet_normative;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.table(["Campo", "Valor"], [["Origen", `${f.origin_type} · ${f.origin_force}`], ["Authority", f.normative_authority_level], ["Effective force", `**${f.effective_force_in_udfjc}**`]]);
  const chain = f.adoption_chain ?? [];
  if (chain.length) { dv.header(4, `🔗 Cadena · ${chain.length}`); dv.table(["Adoptante", "Locator", "Autoridad", "Fecha", "Evidencia"], chain.map(a => [a.adopter, a.adopter_locator, a.adopter_authority_level, a.adopted_at, a.adoption_evidence])); }
}
```

## §3 · DDD

```dataviewjs
const f = dv.current().concepto_facet_ddd;
if (!f) dv.paragraph("(sin facet)"); else {
  dv.header(4, `DDD · ${f.ddd_id}`);
  if ((f.ddd_invariants ?? []).length) { dv.header(5, "🔒 Invariantes"); dv.list(f.ddd_invariants); }
  if ((f.ddd_ubiquitous_terms ?? []).length) { dv.header(5, "🗣️ Lenguaje ubicuo"); dv.paragraph(f.ddd_ubiquitous_terms.join(" · ")); }
}
```

## §7 · Relaciones

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo F. CBBV concepto NUEVO en ACU-004-25. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-consejo-bienestar-buen-vivir` v1.0.0*
