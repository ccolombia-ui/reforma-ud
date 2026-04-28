---
fileClass: fc-concepto-universal
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:gerencia-administrativa-financiera
kd_title: "Gerencia Administrativa y Financiera UDFJC (Art. 86d ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0
kd__up: "[[con-tipo-normativo]]"


skos_prefLabel: "Gerencia Administrativa y Financiera (GAF)"
skos_altLabel:
  - "GAF UDFJC"
  - "Gerencia Administrativa-Financiera"
  - "Administrative and Financial Management"
  - "Gerencia AdminFin"

skos_definition: "Dependencia institucional UDFJC creada por el Art. 86d del ACU-004-25 como **instancia ejecutiva del Subsistema 2 (Talento Humano + Gestión Financiera + Infraestructura)** del Sistema de Gestión Administrativa. Su titular —el(la) **Gerente Administrativo(a) y Financiero(a)**— es miembro del Consejo de Gestión Administrativa (Art. 87e). Garantiza la **disposición de los recursos físicos, tecnológicos, financieros y de talento humano** necesarios para el óptimo desarrollo de las funciones universitarias. Articula tres macroprocesos críticos: (i) **Gestión del Talento Humano** (selección, vinculación, desarrollo, evaluación, salida del personal docente y administrativo); (ii) **Gestión Financiera** (presupuesto, tesorería, contabilidad, costos, NICSP, CCP); (iii) **Gestión de Infraestructura** (planta física, sedes, laboratorios, sistemas de información, conectividad). Bajo el marco normativo público colombiano (Estatuto Tributario, Régimen Presupuestal, NICSP-CGN, MIPG-Función Pública). Sustituye operativamente las funciones financieras y administrativas de la antigua Vicerrectoría Administrativa y Financiera del ACU 003/1997 — degradándola jerárquicamente de Vicerrectoría a Gerencia (con representación en CGA, no en CACAD)."
skos_scopeNote: "La GAF NO es Vicerrectoría (esa categoría se reserva en ACU-004-25 para las 3 vicerrectorías misionales: Formación, I+C+I, Contextos). El Acuerdo deliberadamente **degrada jerárquicamente** la antigua Vicerrectoría Administrativa para señalar que la administración SOPORTA pero no DIRIGE las funciones misionales. La GAF debe operar coordinada con la DGEP (planificación de recursos) y con la Secretaría General (soporte normativo-documental). NO ejerce competencias misionales propias · su rol es **garantizar disponibilidad operacional** para que las vicerrectorías misionales y unidades académicas (Escuelas, Institutos, Centros) puedan cumplir su misión."
skos_example: "Cuando una Escuela necesita renovar laboratorio especializado o un Instituto requiere contratar investigadores temporales para un proyecto Minciencias, el flujo administrativo cruza la GAF: Talento Humano (vinculación) + Financiera (recursos) + Infraestructura (equipamiento) — coordinado vía CGA si excede competencias unitarias."
skos_notation: "GAF"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Dependencia ejecutiva universitaria de soporte administrativo-financiero"
iso_differentia: "Lidera Subsistema 2 (Talento + Financiera + Infraestructura) · miembro del CGA · degradada jerárquicamente desde Vicerrectoría Administrativa-Financiera del ACU 003/1997 a Gerencia · rol de SOPORTE no de DIRECCIÓN misional"
iso_subject_field: "Gestión administrativa universitaria pública · Gestión financiera pública · Talento humano universitario"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Art. 86d + Art. 87e + Art. 85 §2"

pasteur_quadrant: EDISON









rol_seleccionado: estudiante-soberano



cited_in:
  - "[[sec-MI12-00--carta-constitucional-acu-004-25]]"
  - "[[sec-MI12-09--ds-presupuesto-nicsp]]"
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - gerencia-administrativa-financiera
  - gaf
  - art-86d
  - art-87e
  - subsistema-2
  - m00-base
  - audit-v2-2
  - tpl-v2
  - cop-fundacional
---


# `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`

> [!important]+ ⚛️ Dependencia ejecutiva del Subsistema 2 · soporte operacional
> La **GAF** es la dependencia que opera el **Subsistema 2 (Talento Humano + Financiera + Infraestructura)** del Sistema de Gestión Administrativa. **Degradada jerárquicamente** desde la antigua Vicerrectoría Administrativa-Financiera del ACU 003/1997 a Gerencia · señaliza el rol de SOPORTE no de DIRECCIÓN misional. Aplica MIPG + NICSP + CCP en operación pública.

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
    ["Aggregate Root", f.ddd_aggregate_root ?? "—"],
    ["Domain type", f.ddd_domain_type ?? "—"],
    ["Lifecycle states", (f.ddd_lifecycle_states ?? []).join(" · ") || "—"],
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

## §4 · 🔻 Pre-requisitos cognitivos

```dataviewjs
const prereq = dv.current().concepto_prerequisitos ?? [];
if (prereq.length === 0) dv.paragraph("Sin pre-requisitos formales.");
else dv.list(prereq);
```

## §5 · 🔺 Conceptos que declaran este como pre-requisito

```dataviewjs
const me = dv.current();
const here = me.file.name;
const folder = me.file.folder;
const all = dv.pages(`"${folder}"`).where(p => p.kd_type === "glosario-universal");
const matchHere = (target) => {
  if (!target) return false;
  if (typeof target === "object" && target.path !== undefined) return String(target.path).split("/").pop().replace(/\.md$/, "").trim() === here;
  const s = String(target);
  const m = s.match(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/);
  if (m) return m[1].split("/").pop().replace(/\.md$/, "").trim() === here;
  return s.split("/").pop().replace(/\.md$/, "").trim() === here;
};
const habilitados = all.where(p => (p.concepto_prerequisitos ?? []).some(matchHere)).array();
dv.header(4, `📚 ${habilitados.length} concepto(s) declaran este como pre-requisito`);
if (habilitados.length === 0) dv.paragraph("_Sin reverse declaraciones todavía._");
else dv.list(habilitados.map(p => p.file.link));
```

## §7 · 🤝 Relaciones tipadas (outgoing)

```dataviewjs
const me = dv.current();
const rels = me.tupla__relations ?? [];
const vocabPage = dv.page("00-glosoario-universal/_vocabulario-relaciones");
const relMap = vocabPage?.relaciones ?? {};
const frameMap = vocabPage?.frames ?? {};
const lookupRel = (n, d) => {
  const dir = d ?? "co";
  return relMap[n]?.[dir] ?? relMap[n]?.co ?? relMap[n]?.pre ?? relMap[n]?.post ?? null;
};
const humanLabel = (n, d) => lookupRel(n, d)?.label ?? `\`${n}\``;
const humanDesc = (n, d) => lookupRel(n, d)?.description ?? "—";
const humanFrame = (f) => frameMap[f ?? "general"]?.label ?? `\`${f ?? "general"}\``;
const groups = {};
for (const r of rels) {
  const k = r.rel_frame ?? "general";
  groups[k] = groups[k] ?? [];
  groups[k].push(r);
}
for (const [frame, rs] of Object.entries(groups)) {
  dv.header(4, `${humanFrame(frame)} · ${rs.length} relación(es)  \`[frame: ${frame}]\``);
  const byRel = {};
  for (const r of rs) {
    const key = `${r.rel_nombre}::${r.rel_direccion ?? "co"}`;
    byRel[key] = byRel[key] ?? { rel_nombre: r.rel_nombre, rel_direccion: r.rel_direccion, items: [] };
    byRel[key].items.push(r);
  }
  for (const grp of Object.values(byRel)) {
    dv.header(5, `${humanLabel(grp.rel_nombre, grp.rel_direccion)}  \`(${grp.rel_nombre} · ${grp.rel_direccion ?? "co"})\``);
    dv.paragraph(`> ${humanDesc(grp.rel_nombre, grp.rel_direccion)}`);
    dv.table(["→ Target", "Evidencia"],
      grp.items.map(r => [r.rel_target, r.rel_propiedades?.norm_evidence ?? r.rel_propiedades?.skos_evidence ?? "—"]));
  }
}
```

## §8 · 🎭 Vista por rol seleccionado

```dataviewjs
const me = dv.current();
const rol = me.rol_seleccionado ?? "estudiante-soberano";
const vistas = {
  "estudiante-soberano": {
    titulo: "🎓 Para el Estudiante Soberano",
    contenido: [
      "**La GAF cuida la operación que te soporta**: aulas, laboratorios, biblioteca, conectividad, becas administradas, cafetería, transporte.",
      "**Acción concreta**: si tu Escuela tiene déficits de infraestructura o becas, exige a tu Director(a) escalar la solicitud al CGA via la vicerrectoría correspondiente."
    ]
  },
  "docente-disenador": {
    titulo: "🎨 Para el Docente Diseñador",
    contenido: [
      "**Tu currículo necesita recursos GAF**: aulas, plataformas, materiales, salas especializadas.",
      "**Acción concreta**: cuando tu Paquete CCA requiera infraestructura especial, planifica con anticipación trimestral via Director(a) Escuela → DGEP/GAF."
    ]
  },
  "docente-formador": {
    titulo: "🎤 Para el Docente Formador",
    contenido: [
      "**Tu vinculación laboral pasa por GAF**: contrato, evaluación docente, escalafón, capacitación.",
      "**Acción concreta**: registra todas tus actividades en sistema institucional · GAF las consolida para informe MIPG anual."
    ]
  },
  "docente-investigador-pasteur": {
    titulo: "🔬 Para el Investigador Pasteur",
    contenido: [
      "**Tu PM2 cruza GAF en 3 vías**: contratación de investigadores temporales + ejecución presupuestal del proyecto + infraestructura experimental.",
      "**Acción concreta**: en proyectos cofinanciados (Minciencias, BID, etc.) coordina temprano con GAF · cuellos de botella administrativos son la principal fuente de retrasos."
    ]
  },
  "docente-emprendedor-coop": {
    titulo: "🤝 Para el Emprendedor/Coop",
    contenido: [
      "**Tus convenios PM3 cruzan GAF en 4 vías**: jurídica + financiera + tributaria + tesorería.",
      "**Acción concreta**: en convenios > 1.000 SMMLV coordina con GAF + Secretaría General antes de firma · evita objeciones de control interno post-facto."
    ]
  },
  "docente-director": {
    titulo: "🏛️ Para el Docente Director",
    contenido: [
      "**Tu gestión cotidiana cruza GAF**: presupuesto de tu Escuela/Instituto/Centro + planta docente + infraestructura.",
      "**Acción concreta**: institucionaliza coordinación mensual con GAF para tu unidad · trazabilidad de recursos asignados vs ejecutados."
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

## Historial

| Versión | Fecha | Cambios |
|---|---|---|
| **v1.0.0** | **2026-04-27** | Concepto creado en Sprint 1A.6 (audit v2.2 · gap unidades organizativas). Modela GAF como dependencia ejecutiva del Subsistema 2 con miembership en CGA · degradación jerárquica desde Vicerrectoría Administrativa-Financiera del ACU 003/1997 · señaliza rol de SOPORTE no de DIRECCIÓN misional. Cadena de adopción multinivel: ACU + MIPG + NICSP + CCP. Capabilities `[NORMATIVE, DDD]` + facet NEON con marcos público colombianos. |

---

*CC BY-SA 4.0 · UDFJC · 2026-04-27 · `con-gerencia-administrativa-financiera` v1.0.0 · TPL T1 NORMATIVO · CoP fundacional*
