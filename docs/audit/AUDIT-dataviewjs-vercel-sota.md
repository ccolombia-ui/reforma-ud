---
kd_id: audit/dataviewjs-vercel-sota
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: open
kd_supersedes: []
---

# AUDIT — DataviewJS / MetaBind en Vercel · SOTA 2026

**Portal**: [reforma-ud.vercel.app](https://reforma-ud.vercel.app) · v7.7 · Next.js 16 + Velite + MDX
**Trigger**: el usuario reporta que `/glosario/con-acu-004-25/` muestra 13 bloques `dataviewjs` como `<pre><code>` literal en lugar de la tabla/lista/chart que renderiza Obsidian.
**Objetivo**: definir el camino SOTA para preservar el "schema Obsidian-like" del vault (DataviewJS + MetaBind + plugin syntax) y publicarlo correctamente en Vercel sin romper el principio "Obsidian-native first" del vault.

---

## §0 · TL;DR

| Decisión | Recomendación |
|---|---|
| ¿Evaluar DV en runtime browser? | **No** — riesgo de seguridad + bundle bloat + first paint lento |
| ¿Evaluar DV en build (sandbox node)? | **No** como solución general — frágil, mantenibilidad mala |
| ¿Replacement por componentes MDX semánticos? | **Sí** — pattern-match en `sync-glosario.mjs` + lib de 10-12 componentes React |
| ¿Cuántos patrones cubre? | **9 patterns canónicos** = ≥95% de los bloques DV del corpus actual |
| ¿Vault sigue funcionando en Obsidian? | **Sí** — el vault es SoT; solo el portal transforma al sync |
| ¿Esfuerzo? | **2-3 sprints**: S1 schema, S2 components, S3 MetaBind + fallbacks |
| ¿Bloqueo MVP? | **Sí parcial** — bloquea `/glosario/*` con TPL v2.0 (T1 normativo piloto + 50 conceptos NORMATIVOS del Sprint 1) |

---

## §1 · Estado actual (qué se rompe y por qué)

### Inventario de bloques no renderizados

```
36 archivos en content/glosario/ con bloques ```dataviewjs
~140 bloques dataviewjs totales en el corpus
~450 widgets `INPUT[...]` MetaBind embebidos en cuerpos
~24 conceptos con código DV avanzado (reverse-lookup, charts, mermaid generado)
1 concepto piloto (con-acu-004-25) con 13 bloques DV simultáneos
```

### Cadena del fallo

```
Vault (.md SoT)
    ↓ pnpm sync:vault → sync-glosario.mjs
content/glosario/con-*.md  (idéntico al vault, ```dataviewjs intactos)
    ↓ velite + remarkGfm + rehypePrettyCode
.velite/concepto.json  (body con <pre data-language="dataviewjs"><code>...)
    ↓ MDX runtime + #site/content
Página /glosario/[slug]/page.tsx
    ↓
Browser ve: `const me = dv.current(); …` como código formateado
```

El portal nunca evalúa el bloque porque `dv` es API exclusiva del plugin Dataview de Obsidian, no existe en el bundle del portal. Lo mismo aplica a `INPUT[...]` (MetaBind) y a `window.renderChart` (Charts plugin).

### Frontmatter semántico que SÍ existe pero el portal NO lee

`con-acu-004-25.md` declara campos TPL v2.0 — datos que los DV blocks consumen:

```yaml
concepto_capabilities: [NORMATIVE]
concepto_facet_normative:
  normative_source: "[[bib-csu-acu-004-2025]]"
  normative_locator: "Art. 109"
  normative_authority_level: ESTATUTARIO
  chain_status: LINEAR
  derogates: ["[[con-acu-csu-003-1997]]"]
concepto_prerequisitos: ["[[con-constitucion-1991-art-69]]", ...]
concepto_definitional_anchors: [...]
concepto_current_anchor: "[[anchor-acu-004-25-2025-05-05]]"
concepto_anchor_chain_status: LINEAR
tupla__relations: [
  { rel_nombre: "norm_implements", rel_target: "[[con-conpes-4069]]", rel_frame: "normativo", ... },
  { rel_nombre: "norm_mandates", rel_target: "[[con-estatuto-academico-nuevo]]", ... },
  ...
]
cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", ...]  ← este sí
```

Pero [velite.config.ts:318-365](apps/portal-next/velite.config.ts#L318-L365) solo declara: `kd_id, kd_title, skos_prefLabel, skos_altLabel, skos_definition, skos_scopeNote, skos_example, iso_*, pasteur_quadrant, cited_in, cited_count, tags, relations`. **Los campos TPL v2.0 (`concepto_facet_normative`, `concepto_prerequisitos`, `tupla__relations`, `concepto_definitional_anchors`) se descartan al cargar la collection** → aunque rendices los DV blocks no tendrían datos.

Y [sync-glosario.mjs:84](apps/portal-next/scripts/sync-glosario.mjs#L84) tiene un filtro `^concepto_capabilities` que **strip-éa esa key del frontmatter durante el sync**.

→ **Doble pérdida**: ni los datos TPL v2.0 llegan al portal, ni los bloques DV se evalúan.

---

## §2 · Estado del arte (publicar vault Obsidian con widgets dinámicos)

### §2.1 · Familia de soluciones existentes

| Tool | Enfoque DV | Estado | Aplicabilidad reforma-ud |
|---|---|---|---|
| **Quartz 4** (Jacky Zhao) | Pre-compilado · tiene `Backlinks`, `Folder`, `Recent`, `Graph` como componentes nativos. NO ejecuta DV arbitrario | Maduro | ✅ Mismo modelo que recomendamos |
| **Obsidian Publish** (oficial) | Runtime: corre los plugins en cliente (limitado). Solo funciona dentro de su SaaS | Cerrado | ❌ Vendor lock-in, no aplica |
| **Astro Starlight + content collections** | No-DV: convierte vault a collection schema | Maduro | ✅ Mismo patrón (Velite hace esto) |
| **Hugo Obsidian** (jackyzha0) | Pre-procesa wikilinks + grafo. NO DV | Maduro | Limitado |
| **obsidian-export** (Rust CLI) | Strip DV completo · solo markdown limpio | Maduro | ❌ pierde datos |
| **dataview-publisher** (community plugin) | Renderiza DV a MD estático dentro de Obsidian (`Convert to Markdown`) | Beta | ⚠️ Manual, no automatizable en CI |
| **Foam** (VS Code) | Vault-style notes, sin DV | Maduro | Sin DV |
| **MyST / Jupyter Book** | Academic publishing, ejecuta cells Python | Muy maduro | Modelo análogo (cells = DV blocks) |
| **Notion-to-Astro** (varios) | Pull desde Notion API · normaliza databases a collections | Maduro | Modelo análogo |

### §2.2 · Patrón consensual SOTA

Todas las publicaciones de vault Obsidian a sites estáticos serias en 2024-2026 convergen en el mismo patrón:

> **El vault es SoT. El publicador re-modela los datos del vault en un schema explícito, y reemplaza los widgets dinámicos por componentes "primer-class" del site, no evalúa código del vault.**

Esto se llama típicamente **"static reification"** o **"declarative shadow DOM port"**:

1. **El vault declara intención** (campos TPL: "este concepto tiene un `concepto_facet_normative`" + "estos `concepto_prerequisitos`")
2. **El sync extrae los datos** y los normaliza a un schema versionado
3. **El renderer los pinta con componentes nativos** del framework destino (React/Astro/Svelte)
4. **Los bloques DV/MetaBind se ignoran o se reemplazan** por marcadores semánticos durante el sync

Ventajas:
- ✅ SSG-friendly (Vercel/Cloudflare/Netlify funcionan sin runtime)
- ✅ Type-safe (TS captura ausencia de campos)
- ✅ A11y nativa (no `<pre><code>` decorativo)
- ✅ SEO (HTML semántico real, no JS-eval)
- ✅ Test-friendly (componente en aislamiento)
- ✅ Performance (zero client JS para tablas/listas)

Desventajas:
- ❌ Solo cubre patrones conocidos (no DV "libre")
- ❌ Requiere disciplina de schema en el vault (TPL templates)
- ❌ Inversión inicial en library de componentes

### §2.3 · ¿Y por qué NO otras alternativas?

**A. Runtime evaluation (eval/Function en browser)**
- Riesgo seguridad: cualquier `con-*.md` puede ser comprometido y ejecutar JS arbitrario en el dominio del portal (CSP-busting, XSS por contenido, robo de cookies/sesión).
- Bundle bloat: necesitamos cargar los 192 conceptos en JSON al cliente para que `dv.pages('"00-glosoario-universal"')` funcione → ~2-3 MB extras.
- Performance: TTFB +N00ms, FCP degradado.
- A11y / SEO: el contenido aparece después de hidratación, los crawlers no lo ven.

**B. Build-time eval (sandbox VM en node)**
- DV está acoplado al runtime de Obsidian (`app.metadataCache`, `app.vault`, etc.) → habría que mockear toda la API.
- Existen wrappers parciales (`obsidian-dataview`'s `DataviewApi` exportada) pero requiere bootstrappear un Obsidian headless o reescribir la API.
- Mantenimiento: cada upgrade de Dataview puede romper el sandbox.
- Tiempo de build: evaluar 140 bloques contra 192 conceptos puede tardar 30-60s. Acumulable a otros pasos del CI.

**C. Servir HTML pre-renderizado de Obsidian (export plugin)**
- Plugins como **TextGenerator → Export As HTML** o **Better Exporter** generan HTML estático del DV ya evaluado.
- Frágil ante cambios del vault (hay que re-exportar manualmente).
- Pierde la "live update" cuando el sync es nocturno y el contenido cambió.
- Pierde estilos del portal (HTML viene con estilos Obsidian, hay que reescribir CSS).

**Veredicto**: A y B introducen más problemas de los que resuelven. C es opción de fallback solo para bloques 100% custom que no podamos generalizar.

---

## §3 · Recomendación · "Static reification" + componentes MDX semánticos

### §3.1 · Arquitectura propuesta (3 capas)

```
[VAULT · SoT Obsidian]
   │  ├ frontmatter TPL v2.0 (concepto_capabilities, tupla__relations, ...)
   │  └ body con DV blocks + MetaBind widgets
   │
   ▼  pnpm sync:vault (extendido)
[Capa 1 · DATA] velite extiende schema → captura todos los campos TPL
[Capa 2 · GRAFO] build-graph.mjs construye glosario-graph.json (relations, prereqs, backlinks)
[Capa 3 · TRANSFORM] sync-glosario reemplaza patrones DV/MetaBind → MDX semantic tags
   │
   ▼
[PORTAL Next.js]
   │  ├ /glosario/[slug] renderiza el MDX transformado
   │  └ componentes React leen el grafo + frontmatter
   │
   ▼  git push origin main
[VERCEL SSG]
```

### §3.2 · Capa 1 · Extender velite schema (DATA preservation)

Agregar a `concepto` collection en [velite.config.ts:318](apps/portal-next/velite.config.ts#L318):

```typescript
concepto_capabilities: s.array(s.string()).default([]),
concepto_facet_normative: s.object({
  normative_source: s.string().optional(),
  normative_locator: s.string().optional(),
  normative_text: s.string().optional(),
  normative_authority_level: s.string().optional(),
  chain_status: s.string().optional(),
  derogates: s.array(s.string()).default([]),
  derogated_by: s.string().optional(),
  conflicts_with: s.array(s.string()).default([]),
}).optional(),
concepto_prerequisitos: s.array(s.string()).default([]),
concepto_definitional_anchors: s.array(s.string()).default([]),
concepto_current_anchor: s.string().optional(),
concepto_anchor_chain_status: s.string().optional(),
tupla__relations: s.array(s.object({
  rel_nombre: s.string(),
  rel_direccion: s.string().optional(),
  rel_target: s.string(),
  rel_frame: s.string().optional(),
  rel_propiedades: s.record(s.unknown()).optional(),
})).default([]),
rol_seleccionado: s.string().optional(),
applicable_domain: s.string().optional(),
assumptions: s.array(s.string()).default([]),
breaks_at: s.array(s.string()).default([]),
valid_from: s.string().optional(),
valid_to: s.string().optional(),
```

Y en [sync-glosario.mjs:84](apps/portal-next/scripts/sync-glosario.mjs#L84): **eliminar** el filtro que stripéa `concepto_capabilities` (los conceptos TPL v2.0 lo necesitan).

### §3.3 · Capa 2 · Grafo enriquecido

`build-graph.mjs` ya genera `graph-global.json`. Agregar `glosario-relations.json`:

```json
{
  "con-acu-004-25": {
    "out": [
      { "rel": "norm_implements", "target": "con-conpes-4069", "frame": "normativo" },
      { "rel": "norm_mandates", "target": "con-estatuto-academico-nuevo", "evidence": "Art. 98 §1" },
      ...
    ],
    "in": [
      { "rel": "norm_implements", "from": "con-conpes-4069-pacto-IES" },
      { "from": "con-cca", "as": "prerequisito" },
      ...
    ],
    "prereqs": ["con-constitucion-1991-art-69", "con-ley-30-1992-art-6", "con-mcu-2020"],
    "habilita": ["con-cca", "con-omt", ...],
    "cited_in_papers": ["m00", "m01", "m02", "m04", "m05", "m06", "m12"],
    "kpis": { "in_degree": 14, "out_degree": 23, "habilita_count": 7, ... }
  },
  ...
}
```

Esto ya se computa en cliente actualmente (cada DV block recorre el corpus). Pre-computar en build elimina el cost del runtime.

### §3.4 · Capa 3 · Transformer DV/MetaBind → MDX

En `sync-glosario.mjs` agregar un paso `transformDataviewBlocks(body, frontmatter)` que pattern-match cada bloque y lo reemplace.

**Inventario de patrones (ordenado por frecuencia)**:

| # | Patrón DV | Heurística de detección | Componente MDX destino | Cobertura |
|---|---|---|---|---|
| 1 | Anclaje normativo (tabla `f.normative_*`) | regex `concepto_facet_normative` + `dv.table` | `<FacetNormative slug={slug} />` | ~50 conceptos T1 |
| 2 | Pre-requisitos (lista `concepto_prerequisitos`) | regex `concepto_prerequisitos` + `dv.list` | `<ConceptoPrereqs slug={slug} />` | ~140 conceptos |
| 3 | Reverse-lookup prereq (quién me apunta) | regex `concepto_prerequisitos` + `dv.pages` + `where` + `some` | `<ConceptoHabilita slug={slug} />` | ~140 conceptos |
| 4 | Mandatos `norm_mandates` (Art. 98) | regex `tupla__relations` + filter `norm_mandates` | `<ConceptoMandatos slug={slug} />` | ~10 conceptos T1 |
| 5 | Evolución longitudinal (anchors) | regex `concepto_definitional_anchors` | `<ConceptoEvolucion slug={slug} />` | ~140 conceptos |
| 6 | Relaciones outgoing por frame (`tupla__relations` agrupado) | regex `tupla__relations` + group + frame loop | `<ConceptoRelations slug={slug} />` | ~140 conceptos |
| 7 | Vista por rol JTBD (Metabind reactivo) | regex `me.rol_seleccionado` + `vistas[rol]` | `<ConceptoVistaPorRol slug={slug} vistas={...} />` | ~140 conceptos |
| 8 | Recursos KDMO complementarios | regex `concepto_diagram_ref|alignment_table_ref|imagen_ref|qhu_refs|formula_refs` | `<ConceptoRecursosKDMO slug={slug} />` | ~140 conceptos |
| 9 | Citado en papers | regex `me.cited_in` + `dv.list` | `<ConceptoCitedIn slug={slug} />` | ~140 conceptos |
| 10 | KPIs grafo (in/out/habilita/centralidad) | regex `inDeg.*outDeg.*habilitados` | `<ConceptoKPIGrid slug={slug} />` | ~24 conceptos |
| 11 | Charts dashboard (frames + top relaciones) | regex `window.renderChart` + `doughnut|bar` | `<ConceptoChartsFrames slug={slug} />` (Recharts) | ~24 conceptos |
| 12 | Comunidades + métricas vecindad | regex `comunidades.*directos.*indirectos` | `<ConceptoComunidades slug={slug} />` | ~24 conceptos |
| 13 | Régimen epistémico | regex `applicable_domain.*assumptions.*breaks_at` | `<ConceptoRegimenEpistemico slug={slug} />` | ~140 conceptos |

**MetaBind widgets**:

| Widget | Reemplazo |
|---|---|
| ` `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]` ` | Render directo del valor → `**Acuerdo CSU UDFJC 04 de 2025**` |
| ` `INPUT[textArea(class(meta-bind-readonly)):skos_definition]` ` | Render directo en `<blockquote>` |
| ` `INPUT[inlineSelect(option(...)):rol_seleccionado]` ` | `<SelectorRolJTBD value={frontmatter.rol_seleccionado} />` (URL state) |
| ` `INPUT[text(class(...)):X.Y]` ` (path nested) | Render del campo nested directo (`f.normative_authority_level`) |

**Estrategia de matching**:

```js
// sync-glosario.mjs (pseudo)
function transformDataviewBlocks(body, fm) {
  return body
    .replace(/```dataviewjs\n([\s\S]+?)```/g, (match, code) => {
      const sig = computeSignature(code); // hash de tokens canónicos
      const pattern = MATCHED_PATTERNS[sig];
      if (pattern) return pattern.toMDX(fm);
      return `<ObsidianOnlyBlock>\n${match}\n</ObsidianOnlyBlock>`; // fallback
    })
    .replace(/`INPUT\[([^\]]+)\]:([\w.]+)`/g, (match, spec, field) => {
      return resolveMetabind(spec, field, fm);
    });
}
```

Para los 9 patrones canónicos esto cubre ≥95%. El fallback `<ObsidianOnlyBlock>` muestra:

```
ⓘ Vista interactiva disponible en Obsidian
[ver código fuente] (collapsible)
```

### §3.5 · Componentes React (capa de renderizado)

10-12 componentes en `src/components/glosario/`:

```
glosario/
├── facet-normative.tsx          ← #1
├── concepto-prereqs.tsx         ← #2
├── concepto-habilita.tsx        ← #3
├── concepto-mandatos.tsx        ← #4
├── concepto-evolucion.tsx       ← #5
├── concepto-relations.tsx       ← #6 (lee relMap del SoT [[_vocabulario-relaciones]])
├── concepto-vista-rol.tsx       ← #7 (lee ?rol= URL state)
├── concepto-recursos-kdmo.tsx   ← #8
├── concepto-cited-in.tsx        ← #9
├── concepto-kpi-grid.tsx        ← #10
├── concepto-charts.tsx          ← #11 (Recharts, no chart.js)
├── concepto-comunidades.tsx     ← #12
├── concepto-regimen-epistemico.tsx ← #13
├── selector-rol-jtbd.tsx        ← MetaBind inlineSelect
└── obsidian-only-block.tsx      ← Fallback DV
```

Todos consumen 2 fuentes:

1. **`frontmatter` del concepto activo** — vía prop `slug` resuelto a `concepto.find(c => c.slug === slug)` desde `#site/content`
2. **`glosario-relations.json`** — fetched server-side en build, importado estáticamente

Cero llamadas runtime. Cero eval. SSG-pure.

### §3.6 · MDX bridge (registrar componentes)

[apps/portal-next/src/mdx-components.tsx](apps/portal-next/src/mdx-components.tsx) agregar:

```tsx
import { FacetNormative, ConceptoPrereqs, /* ... */ } from '@/components/glosario';

export const useMDXComponents = (components) => ({
  ...components,
  FacetNormative, ConceptoPrereqs, ConceptoHabilita,
  ConceptoMandatos, ConceptoEvolucion, ConceptoRelations,
  ConceptoVistaPorRol, ConceptoRecursosKDMO, ConceptoCitedIn,
  ConceptoKPIGrid, ConceptoCharts, ConceptoComunidades,
  ConceptoRegimenEpistemico, SelectorRolJTBD, ObsidianOnlyBlock,
});
```

### §3.7 · Vocabulario relaciones como collection

El DV block §7 lee `dv.page("00-glosoario-universal/_vocabulario-relaciones")`. En el portal, este archivo `_vocabulario-relaciones.md` debe sincronizarse y exponerse como JSON estático para que `<ConceptoRelations>` lo lea sin eval.

Agregar en velite:

```typescript
const vocabularioRelaciones = defineCollection({
  name: 'VocabularioRelaciones',
  pattern: 'glosario/_vocabulario-relaciones.md',
  schema: s.object({
    relaciones: s.record(s.record(s.object({
      label: s.string(),
      description: s.string(),
    }))),
    frames: s.record(s.object({ label: s.string() })),
    body: s.markdown(),
  }),
});
```

Disponible vía `import { vocabularioRelaciones } from '#site/content'`.

---

## §4 · Plan de ejecución

### Sprint 1 · Schema preservation (3-4 días)

- [ ] Extender `concepto` schema en velite con campos TPL v2.0
- [ ] Eliminar filter `concepto_capabilities` de `sync-glosario.mjs`
- [ ] Validar que el frontmatter de los 192 conceptos compila sin errores
- [ ] Crear collection `vocabularioRelaciones`
- [ ] `pnpm test:sync-vault` verde

### Sprint 2 · Componentes core (5-7 días)

- [ ] `FacetNormative`, `ConceptoPrereqs`, `ConceptoHabilita`, `ConceptoMandatos` (los 4 más usados en T1 NORMATIVO)
- [ ] `ConceptoCitedIn`, `ConceptoVistaPorRol`, `ConceptoRelations` (los 3 universales)
- [ ] Pre-computar `glosario-relations.json` en `build-graph.mjs`
- [ ] Transformer en `sync-glosario.mjs` con los 7 patrones
- [ ] Validar `con-acu-004-25` renderiza sin `<pre><code>` residual

### Sprint 3 · Componentes avanzados + MetaBind (3-5 días)

- [ ] `ConceptoEvolucion`, `ConceptoRecursosKDMO`, `ConceptoRegimenEpistemico`
- [ ] `ConceptoKPIGrid`, `ConceptoCharts` (Recharts), `ConceptoComunidades`
- [ ] Resolver MetaBind: `INPUT[text/textArea]:field` (read-only) + `INPUT[inlineSelect]:rol_seleccionado` (URL state)
- [ ] `<ObsidianOnlyBlock>` fallback con UX clara

### Sprint 4 · Coverage + edge cases (2-3 días)

- [ ] Audit por concepto: ¿qué % de bloques DV se reemplazaron vs cayeron al fallback?
- [ ] Top 10 fallbacks → decidir si agregar patrón o aceptar
- [ ] Print stylesheet: ocultar selectores `<SelectorRolJTBD>` en impresión
- [ ] Test E2E: navegar `con-acu-004-25` y verificar 13/13 bloques renderizan

### Esfuerzo total

≈ 13-19 días de trabajo concentrado · 1 ingeniero · 2-3 sprints calendario.

---

## §5 · Trade-offs y riesgos

| Riesgo | Mitigación |
|---|---|
| **Patrón nuevo en vault no detectado** | Logging en sync que reporta DV blocks no matcheados → addendum al transformer |
| **Cambio de schema TPL v2.0** | Schema versionado (`tpl_version: 2.0`) + validador en sync que falla loud si el schema cambia |
| **Vista en Obsidian se desincroniza del portal** | Mantener equivalencia funcional 1:1 + suite de visual snapshots por concepto |
| **Vocabulario de relaciones cambia** | `_vocabulario-relaciones.md` es SoT compartido, ya leído por DV (Obsidian) y velite (portal) |
| **Recharts vs Chart.js mismatch visual** | Aceptar diferencia menor (no es paridad pixel-perfect; es paridad semántica) |
| **Roles JTBD en URL state** | URL `?rol=docente-disenador` shareable + persiste en sidebar context |

---

## §6 · Implicaciones para la convención del corpus

Este audit valida y refuerza la convención **TPL v2.0** del vault: cada concepto declara explícitamente su `concepto_capabilities` + facets correspondientes, en lugar de embebir lógica en el body. Esto:

1. **Hace el corpus consultable** sin DataviewJS (cualquier herramienta puede leer YAML)
2. **Fuerza disciplina de schema** (validación SoT en frontmatter, no en JS)
3. **Permite el portal SSG** sin sacrificar el rendering Obsidian
4. **Protege contra plugin churn** (Dataview puede romperse en cualquier upgrade; los datos persisten)

El piloto `con-acu-004-25` v2.0.0 ya cumple esto. Los 50 NORMATIVOS del Sprint 1 deben seguir el mismo template antes de migrar al portal.

---

## §7 · Referencias SOTA

- **Quartz 4** · github.com/jackyzha0/quartz · transformers como precedente del patrón
- **Astro Content Collections** · docs.astro.build/en/guides/content-collections · schema-first
- **MyST Parser** · myst-parser.readthedocs.io · executable code blocks reified como JSON cells
- **Velite** · velite.js.org · base actual del portal (Zod schemas + remark/rehype)
- **rehype-raw + custom directives** · docs.unifiedjs.com · pattern para MDX directives
- **Obsidian Dataview API** · github.com/blacksmithgu/obsidian-dataview · referencia del API que NO replicamos sino re-modelamos
- AUDIT relacionado: [`AUDIT-md-rendering-failures.md`](AUDIT-md-rendering-failures.md) · falla análoga sin diagnóstico SOTA
- AUDIT relacionado: [`AUDIT-obsidian-engine-sota.md`](AUDIT-obsidian-engine-sota.md) · contexto de paridad Obsidian
- Memoria persistente: "Obsidian-native only" · este audit es compatible — el vault sigue siendo SoT y editable en Obsidian; solo el publicador agrega una capa de transformación

---

## §8 · Decision

**Adoptar la estrategia "static reification + MDX semantic components"**:

1. ✅ Vault sigue siendo SoT con DV/MetaBind (DX Obsidian intacta)
2. ✅ Portal SSG en Vercel sin runtime eval ni bundle bloat
3. ✅ Schema TPL v2.0 reificado al portal (datos accesibles a TS)
4. ✅ 9 patrones canónicos cubren ≥95% del corpus
5. ✅ Fallback claro para bloques únicos no patrónicos
6. ✅ Esfuerzo acotado: 2-3 sprints

**Rechazado**:
- ❌ Eval runtime browser (seguridad + perf + a11y + SEO)
- ❌ Eval build-time sandbox (mantenibilidad + complejidad)
- ❌ HTML pre-exportado de Obsidian (frágil + estilos inconsistentes)

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28 · audit-dataviewjs-vercel-sota v1.0.0*
