---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:area-formacion
kd_title: "Área de Formación UDFJC (Art. 65 ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Área de Formación"
skos_altLabel:
  - "Área Académica de Formación"
  - "Formation Area"
  - "Área programática"

skos_definition: "Sub-unidad estructural interna de las Facultades UDFJC declarada en el **Art. 65 del ACU-004-25** como uno de los componentes obligatorios de la estructura facultativa. Las Áreas de Formación **agrupan programas académicos de pregrado y posgrado por afinidad temática del campo de Formación** (PM1 · Art. 7a). Cada Área articula los Programas Académicos (Art. 68) bajo un eje temático coherente, facilitando coordinación curricular, articulación pregrado-posgrado, definición de líneas pedagógicas comunes y gestión integrada de Paquetes CCA. Operan **transversalmente con las CABAs (Art. 73)**: mientras las Áreas de Formación organizan **programas** desde la lógica del campo de Formación (currículo · pedagogía · evaluación), las CABAs organizan **docentes** desde la lógica del campo de Conocimiento-Saber (interés cognitivo · investigación-creación). Una misma Escuela puede tener docentes adscritos a CABAs distintas que enseñan en programas de Áreas de Formación distintas — la transversalidad CABA × Área es la riqueza estructural del modelo post-reforma."
skos_scopeNote: "Las Áreas de Formación NO son programas académicos (los programas están adscritos a Áreas) NI son CABAs (que organizan docentes por campo de conocimiento-saber). La distinción es ontológica: **Áreas organizan currículo**, **CABAs organizan investigación-docencia-extensión** alrededor de pares de conocimiento-saber. Una Facultad puede tener N Áreas de Formación; un Área puede contener múltiples Programas Académicos pregrado/posgrado del mismo eje temático."
skos_example: "La Facultad de Ingeniería puede organizarse en Áreas de Formación tales como: (i) Área de Ingeniería Eléctrica-Electrónica (con programas de Ingeniería Eléctrica + Electrónica + Maestría en Sistemas); (ii) Área de Ingeniería Civil-Ambiental (Ing. Civil + Ambiental + especialización + maestría); (iii) Área de Ingeniería Industrial-Sistemas. Cada Área coordina sus programas con autonomía pedagógica relativa bajo dirección de Decanatura."
skos_notation: "AF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sub-unidad estructural interna de Facultad universitaria"
iso_differentia: "Agrupa programas académicos de pregrado y posgrado por afinidad temática del campo de Formación · transversal con CABAs · obligatoria en estructura de Facultad Art. 65"
iso_subject_field: "Estructura académica universitaria · Gestión curricular · Campo de Formación PM1"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 65"

pasteur_quadrant: PASTEUR








rol_seleccionado: docente-disenador



cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-04--jtbd-comunidad]]"
  - "[[sec-MI12-06--bmk-creditos-cca]]"
cited_count: 3

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - area-formacion
  - art-65
  - estructura-facultad
  - campo-formacion
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Sub-unidad estructural facultativa · transversal con CABAs
> Las **Áreas de Formación** agrupan programas pregrado y posgrado por afinidad temática del campo de Formación. Operan **transversalmente con CABAs**: Áreas organizan **programas** (campo Formación), CABAs organizan **docentes** (campo Conocimiento-Saber). La transversalidad ortogonal es la riqueza estructural del modelo post-reforma.

---

## §0 · 🎭 Vista por rol institucional

`INPUT[inlineSelect(option(estudiante-soberano,🎓 Estudiante Soberano), option(docente-disenador,🎨 Diseñador), option(docente-formador,🎤 Formador), option(docente-investigador-pasteur,🔬 Investigador Pasteur), option(docente-emprendedor-coop,🤝 Emprendedor/Coop), option(docente-director,🏛️ Director)):rol_seleccionado]`

---

## §1 · Definición canónica (cita literal Art. 65)

> `INPUT[textArea(class(meta-bind-readonly)):skos_definition]`

> **Cita literal Art. 65 (estructura de Facultades)**: "Una Decanatura, Un Consejo de Facultad, **Áreas de formación con programas de pregrado y posgrado**, Unidades de apoyo a la gestión curricular, Una secretaría académica."

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
    ["Aggregate Root", f.ddd_aggregate_root ?? "—"],
    ["Domain type", f.ddd_domain_type ?? "—"],
    ["Governed by", (f.ddd_governed_by ?? []).join(" · ") || "—"]
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
for (const r of rels) dv.paragraph(`**${humanLabel(r.rel_nombre, r.rel_direccion)}** → ${r.rel_target} _(${r.rel_propiedades?.norm_evidence ?? r.rel_propiedades?.skos_evidence ?? "—"})_`);
```

## §8 · 🎭 Vista por rol seleccionado

```dataviewjs
const me = dv.current();
const rol = me.rol_seleccionado ?? "estudiante-soberano";
const vistas = {
  "estudiante-soberano": {
    titulo: "🎓 Para el Estudiante Soberano",
    contenido: [
      "**Tu trayectoria académica vive en un Área de Formación**: tu programa de pregrado o posgrado pertenece a un Área específica que coordina la coherencia curricular.",
      "- Si quieres profundizar en un eje temático, busca otros programas del mismo Área (compatibilidad pregrado-posgrado).",
      "**Acción concreta**: identifica tu Área · dialoga con coordinadores para integrar tu trayectoria pregrado→posgrado coherentemente."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu Paquete CCA dialoga con el Área de Formación**: el eje temático del Área debe ser visible en tu diseño curricular.",
      "- La articulación pregrado-posgrado es invariante de tu diseño · evita Paquetes que no respeten la coherencia del Área.",
      "**Acción concreta**: cuando diseñes Paquete CCA, mapea contra el eje temático del Área · valida con coordinador."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu aula sirve a programas del Área**: los estudiantes que recibes pertenecen al Área y tienen trayectorias coherentes.",
      "**Acción concreta**: en tu syllabus invoca explícitamente el eje temático del Área · facilita transferencia entre asignaturas."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu CABA puede atravesar varias Áreas de Formación**: una CABA en transversalidad ortogonal con Áreas amplía tu impacto curricular.",
      "**Acción concreta**: documenta cómo tu PM2 sirve a múltiples Áreas · maximiza conexiones intra-CABA × inter-Área."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios PM3 pueden articularse con Áreas específicas**: convenios temáticos coherentes con eje del Área son más sólidos.",
      "**Acción concreta**: identifica Áreas afines a tu territorio · busca interlocutor coordinador del Área para alianzas."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu Escuela es atravesada por Áreas de múltiples Facultades**: docentes de tu Escuela enseñan en Programas de Áreas distintas.",
      "**Acción concreta**: en tu plan de adscripción CABA, mapea cómo tus docentes sirven a Áreas de Formación · base de coordinación inter-facultativa."
    ]
  }
};
const v = vistas[rol] ?? vistas["estudiante-soberano"];
dv.header(3, v.titulo);
for (const linea of v.contenido) dv.paragraph(linea);
```

## §10 · 📜 Citado en

```dataviewjs
const me = dv.current();
dv.list(me.cited_in ?? []);
dv.paragraph(`**Total citaciones**: ${me.cited_count ?? 0}`);
```

---

## Notas de aplicación

- **Distinción ontológica clave**: Áreas de Formación (campo Formación · programas) ⊥ CABAs (campo Conocimiento-Saber · docentes). Esta es la **transversalidad ortogonal** que la reforma introduce.
- **Anclaje CoP**: cada Área de Formación es base de Comunidad de Práctica curricular · coordina diseño pedagógico de programas afines.

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 Grupo C. Modela Áreas de Formación como sub-unidad estructural de Facultades · transversalidad ortogonal con CABAs · agrupa programas pregrado-posgrado por eje temático. Bound context arquitectura misional UDFJC. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-area-formacion` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
