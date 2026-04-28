---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:secretaria-academica-facultad
kd_title: "Secretaría Académica de Facultad UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Secretaría Académica de Facultad"
skos_altLabel: ["SAF", "Faculty Academic Secretariat"]

skos_definition: "Dependencia administrativa interna obligatoria de cada Facultad UDFJC declarada en el **Art. 65 del ACU-004-25** como componente estructural facultativo. Es el **soporte técnico-documental** del Decanato y del Consejo de Facultad: gestiona expedientes académicos, certificaciones, actas del Consejo de Facultad, registros de programas, articulación con SISGRAL central. Su titular —el(la) Secretario(a) Académico(a) de Facultad— actúa como secretario(a) del Consejo de Facultad. Articulada con la Secretaría General SISGRAL nacional para garantizar coherencia documental y trazabilidad jurídica."
skos_scopeNote: "Cada Facultad UDFJC tiene su propia Secretaría Académica · son N secretarías facultativas paralelas. NO confundir con Secretaría General SISGRAL (institucional · Arts. 40-42). La Secretaría Académica de Facultad opera bajo coordinación de la Decanatura y articulación documental con SISGRAL."
skos_example: "Cuando un estudiante solicita certificación académica, expediente o tránsito de programa, la Secretaría Académica de Facultad lo procesa y articula con SISGRAL si requiere fe pública institucional."
skos_notation: "SAF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia administrativa interna facultativa"
iso_differentia: "Soporte técnico-documental obligatorio en estructura de Facultad · secretario del Consejo de Facultad · articulada con SISGRAL"
iso_subject_field: "Gestión documental académica facultativa · Soporte administrativo universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 65"

pasteur_quadrant: EDISON







rol_seleccionado: docente-director

"@type": GovernmentOrganization


cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]"]
cited_count: 1

tags: [glosario-universal, concepto-normativo, t1-normativo, secretaria-academica-facultad, art-65, m00-base, audit-v2-2, tpl-v2, cop-fundacional]
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!note]+ Soporte técnico-documental facultativo
> Cada Facultad UDFJC tiene su Secretaría Académica · soporte al Decanato y Consejo de Facultad · articulada con SISGRAL central.

---

## §0 · 🎭 Vista por rol

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

## §1 · Definición

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

## §2 · Anclaje + cadena de adopción

```dataviewjs
const me = dv.current(); const f = me.concepto_facet_normative;
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
| **v1.0.0** | **2026-04-27** | Sprint 1A.6 Grupo C. SAF como soporte técnico-documental facultativo. |

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-secretaria-academica-facultad` v1.0.0*
