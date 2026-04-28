---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:direccion-bienestar-buen-vivir
kd_title: "Dirección de Bienestar Universitario y Buen Vivir UDFJC (Art. 87f ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Dirección de Bienestar Universitario y Buen Vivir (DBBV)"
skos_altLabel:
  - "DBBV"
  - "Dirección de Bienestar UDFJC"
  - "Wellbeing Direction"

skos_definition: "Dependencia institucional UDFJC responsable de operar el **Sistema de Bienestar Universitario y Buen Vivir** (Arts. 88-90 del ACU-004-25). Su titular —el(la) **Director(a) de Bienestar Universitario y Buen Vivir**— es **miembro del Consejo de Gestión Administrativa** (Art. 87f) con asiento equivalente a las vicerrectorías y a la Gerencia Administrativa-Financiera. La elevación a Dirección con asiento en CGA es **invariante constitutiva del modelo post-reforma** que coloca al Bienestar y Buen Vivir en el mismo plano jerárquico que las funciones misionales tradicionales — refleja el carácter refundacional del Buen Vivir como principio transversal (Art. 5a). Articula servicios de salud, deporte, cultura, alimentación, transporte, apoyo socioeconómico y dimensiones decoloniales del Buen Vivir andino para toda la Comunidad Universitaria (Arts. 8-17)."
skos_scopeNote: "DBBV NO es Vicerrectoría (categoría reservada para 3 misionales: Formación, I+C+I, Contextos) pero sí tiene asiento en CGA equivalente a vicerrectorías. La distinción entre 'Bienestar Universitario' (concepto histórico de servicios al estudiantado) y 'Buen Vivir' (principio refundacional con dimensión decolonial · cosmovisiones andinas) es invariante semántica del concepto. Sin la DBBV, el Sistema de Bienestar (Arts. 88-90) carecería de instancia ejecutiva con representación colegiada."
skos_example: "Cuando UDFJC debe articular políticas integradas de bienestar con principios de Buen Vivir (e.g., programa de soberanía alimentaria con cafeterías saludables + huerta universitaria + saberes ancestrales), la DBBV las coordina con asiento en CGA articulando con las 3 vicerrectorías misionales y la GAF."
skos_notation: "DBBV"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia ejecutiva universitaria de bienestar y principios refundacionales"
iso_differentia: "Lidera Sistema Bienestar y Buen Vivir · miembro del CGA equivalente a vicerrectorías · articula bienestar tradicional con dimensión decolonial Buen Vivir andino"
iso_subject_field: "Bienestar universitario · Principios refundacionales decoloniales · Política institucional"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 87f + 88-90"

pasteur_quadrant: PASTEUR








rol_seleccionado: estudiante-soberano



cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, direccion-bienestar, dbbv, art-87f, buen-vivir, bienestar, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Dependencia ejecutiva refundacional · asiento en CGA equivalente a vicerrectorías
> La **DBBV** opera el Sistema de Bienestar Universitario y Buen Vivir con **asiento en CGA equivalente a vicerrectorías misionales** · invariante constitutiva del modelo post-reforma. Articula bienestar tradicional con dimensión decolonial del Buen Vivir andino.

---

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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo F. DBBV con asiento en CGA equivalente a vicerrectorías + materialización Buen Vivir decolonial. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-direccion-bienestar-buen-vivir` v1.0.0 · CoP fundacional*
