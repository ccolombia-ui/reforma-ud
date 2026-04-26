---
kd_id: audit/obsidian-engine-sota
kd_version: 1.0.0
kd_status: APPROVED
kd_doc_type: AUDIT
kd_title: Síntesis SOTA · Obsidian engine en reforma-ud (Flowershow, Bases, Op A markdown)
kd_created: 2026-04-26
kd_responsible: Carlos C. Madera
kd_classification: PUBLIC
---

# AUDIT — SOTA Obsidian engine para `reforma-ud` · Síntesis cruzada

> Pregunta del usuario: *"¿Podemos generar el mismo motor de links que tiene Obsidian para no transformar los `.md`? ¿Microservicio Next.js? ¿Es libre el motor? ¿Hay paquete que podamos usar? DataviewJS / Metabind / MetaData Menu / Diagram Popup?"*
>
> Este audit cruza **dos fuentes**:
> 1. La investigación externa de aleia-zen — `concepto-universal/_gaps-y-recomendaciones-sota.md` v1.0 (1165 líneas, F9.4, 26-04-2026) que evaluó Flowershow, Quartz, Datacore, obsidian-remote y plugins críticos.
> 2. Nuestro audit interno [`AUDIT-obsidian-workspace-ux.md`](./AUDIT-obsidian-workspace-ux.md) y [`AUDIT-usability-gaps-20.md`](./AUDIT-usability-gaps-20.md) (20/20 gaps cerrados en v3.4).
>
> **Veredicto de síntesis**: ya estamos en el 90% del camino correcto. NO migrar a Quartz (requiere rewrite Preact). NO construir Obsidian-clone propio. **Adoptar progresivamente componentes de Flowershow** (MIT, stack idéntico) + opcionalmente `obsidian-remote` para edición colaborativa staff.

---

## 0. TL;DR — recomendación final consolidada

| # | Acción | Valor / Esfuerzo | Estado |
|---|---|---|---|
| 1 | **Op A migrate `s.mdx()` → `s.markdown()`** (ya ejecutado en v3.6 commit `cb6ffb1`) | Alto / S | ✅ Done |
| 2 | **Mantener nuestros plugins propios** (`remark-wikilinks.ts`, `remark-obsidian-embed.ts`) — son sólidos y obsidian-first | — | ✅ Conservar |
| 3 | **Auditar componentes Flowershow** y copiar `<BasesView />` + comparar `<BacklinksPanel />` con la nuestra | Alto / M | 🔄 Próximo |
| 4 | **NO migrar a Quartz** (Preact + esbuild rewrite — costoso, no aporta vs Flowershow integration) | — | ❌ Descartar |
| 5 | **NO usar `obsidian` npm package** (solo expone tipos para plugins de la app — inútil fuera de Electron) | — | ❌ Descartar |
| 6 | **`build-graph.mjs` extender** como sustituto canónico de DataviewJS (ya existe — emite JSON estático) | Medio / M | 🔄 Próximo |
| 7 | **Obsidian-remote en Railway** ($5-10/mo) para edición staff editorial — NO público | Bajo / S | ⏸ Backlog |
| 8 | **`cue-to-velite.mjs`** para sincronizar schemas concepto-universal de aleia-zen → portal-next | Alto / M | ⏸ Cuando aleia-zen v1.1 esté APPROVED |

---

## 1. Hallazgo crítico: Flowershow

**[Flowershow](https://github.com/flowershow/flowershow)** (MIT, mantenido) usa **el mismo stack que `apps/portal-next`** (Next.js + React + Tailwind + MDX) y soporta out-of-the-box:

- ✅ Wikilinks `[[...]]` (vía `@portaljs/remark-wiki-link` — **ya en nuestras deps**)
- ✅ Transclusiones `![[...]]`
- ✅ Backlinks
- ✅ Mermaid, Excalidraw, KaTeX, callouts Obsidian
- ✅ Graph view
- ✅ **Obsidian Bases** (BETA sept 2025) — reemplazo nativo de Dataview tables
- ✅ Search full-text

**Implicación**: el portal-next ya está parcialmente en el ecosistema Flowershow (la organización `@portaljs` es del mismo equipo). La ruta SOTA es **adoptar componentes** (no migrar full):

```bash
# Inspección (no integración directa):
git clone https://github.com/flowershow/flowershow.git /tmp/flowershow
cd /tmp/flowershow/apps/web
ls src/components/   # Backlinks, BasesView, Graph, Search, ...
```

**Componentes alto valor a adoptar**:
- `<BasesView />` — primer wrapper open-source de Obsidian Bases
- `<BacklinksPanel />` — comparar contra nuestro v3.3 (puede ser superior)
- `<HoverCard />` — comparar contra nuestro v3.1 (puede ser superior)

**Trade-off**: copiar componentes específicos VS migrar al monorepo Flowershow. Decisión: **copiar selectivamente** — preserva la inversión Sprint S0-S+5 (migración Astro→Next costó ~3 sprints).

---

## 2. Cómo encaja con nuestro stack actual

### Ya integrado en v3.0-v3.5 (la base sólida)

| Feature | Implementación actual | Fuente externa coincide |
|---|---|---|
| Wikilinks `[[ref]]` | `src/lib/remark-wikilinks.ts` propio + `@portaljs/remark-wiki-link@^1.2` | ✅ Mismo paquete que Flowershow |
| Embeds `![[ref]]` | `src/lib/remark-obsidian-embed.ts` propio | ✅ Equivalente Flowershow |
| LaTeX | `remark-math` + `rehype-katex` + dark CSS fix (G11) | ✅ Mismo stack Flowershow |
| Mermaid | `rehype-mermaid` 3 + `mermaid` 11 | ✅ Mismo stack |
| Callouts | `rehype-callouts` 2 (theme: obsidian) + `rehype-raw` 7 (G v3.5) | ✅ Mismo stack |
| Code highlight | `rehype-pretty-code` + `shiki` | ✅ |
| Search | `pagefind` 1.5 + `cmdk` 1.1 con Recientes (G17) | ✅ Equivalente Flowershow |
| Hover-preview | `mdx-with-hover-preview.tsx` + `html-react-parser` (post-OpA) | 🔄 Comparar con Flowershow |
| Tabs Obsidian | `useDocTabs` + URL state + Ctrl+Tab/W (G08) | ✨ Más ergonómico que Flowershow |
| Outline + Backlinks | `OutlinePanel` + `BacklinksPanel` con scroll-spy (v3.3) | 🔄 Comparar con Flowershow |
| Grafo 3D | `react-force-graph-3d` + `three-spritetext` | ✨ Más rico que Flowershow (3D vs 2D) |
| AI Asistente | `ai` SDK + Haiku/Kimi + modo misión | ✨ No existe en Flowershow |
| Mission Tracker | `mission-state.ts` + cascada secuencial M01→M12 | ✨ Único nuestro |
| Sidebar redimensionable | `useLeftWidth` + drag handle (G14) | ✨ Único nuestro |
| Roles BPA-003 | 6 roles con perspectivas | ✨ Único nuestro |

### Gaps reales pendientes (post-síntesis)

| # | Gap | Severidad | Fuente | Solución |
|---|---|---|---|---|
| F1 | Obsidian Bases support (vault → table view) | 🟡 media | Externa | Copiar `<BasesView />` de Flowershow |
| F2 | Editor inline para frontmatter | 🟢 baja | Externa | Adaptar `<MetabindForm />` con `react-hook-form` (ya planeado G15.2) |
| F3 | Diagram zoom/popup en Mermaid | 🟢 baja | Externa | `panzoom` + Radix Dialog (~50 LOC) |
| F4 | Excalidraw embebido | 🟢 baja | Externa | `@excalidraw/excalidraw` drop-in |
| F5 | Concepts collection (concepto-universal v1.1) | 🟠 alta | Externa | Esperar v1.1 APPROVED en aleia-zen + `cue-to-velite.mjs` |
| F6 | Equation rendering con `eq_latex_canonical` | 🟡 media | Externa | Componente `<Equation />` (½ día) |
| F7 | Pasteur quadrant scatter chart | 🟢 baja | Externa | `<PasteurQuadrant />` con Recharts (1 día) |
| F8 | History timeline (experimental anchors) | 🟢 baja | Externa | `vis-timeline` (1 día) |

---

## 3. DataviewJS → `build-graph.mjs` (sustituto canónico)

La fuente externa confirma lo que ya hacemos: **DataviewJS NO es portable** (sandbox Obsidian-only). Nuestro `scripts/build-graph.mjs` ya emite JSON estático que los componentes React consumen — equivalente al 80% de queries DataviewJS típicos.

**Plan de extensión recomendado** (cuando importemos concepto-universal v1.1):

```js
// build-graph.mjs (futuro) — outputs adicionales
public/static/
├── graph-global.json           ← actual (33 nodos, 38 aristas)
├── graphs/<slug>.json          ← actual (17 grafos por comunidad)
├── derivation-graphs.json      ← futuro: cadenas math (rel_frame: math)
├── pasteur-points.json         ← futuro: scatter quadrant
├── experimental-anchors.json   ← futuro: timeline cronológica
└── validation-warnings.json    ← futuro: dim. SI + LaTeX validation
```

**Para queries "live" interactivas** (post-MVP): `@tanstack/react-query` + Next.js Route Handlers en `/api/concepto/...`.

---

## 4. Microservicio Obsidian-remote (caso staff editorial)

**Cuándo SÍ**:
- Edición colaborativa por staff/editores
- Quieren TODOS los plugins Obsidian (Dataview live, Templater, Metabind) sin instalar local

**Cuándo NO**:
- Renderizado público — CSP/X-Frame-Options bloquean iframe; no es Obsidian-as-website
- Reemplazo del portal — son roles complementarios

**Diseño** (extracto del audit externo):

```
Staff editorial (auth)             Public visitors
        │                                   │
        ▼                                   ▼
┌────────────────────────┐    ┌──────────────────────────┐
│ obsidian-remote Docker  │    │ apps/portal-next Vercel  │
│ + Cloudflare Tunnel     │    │ Next.js + Velite         │
│ + Auth (BasicAuth/OAuth)│    │ reforma-ud.vercel.app    │
└────────┬───────────────┘    └────────▲─────────────────┘
         │                             │
         ▼                             │
┌────────────────────────┐             │
│   Drive (vault)         │ ─[GH Action]┘ every 10min
│   .md + frontmatter     │
└────────────────────────┘
```

**Costo**: ~$5-10/mes Railway hobby. Cero código custom — `docker-compose.yml` documentado por LinuxServer.io.

**Estado**: ⏸ Backlog. Implementar cuando haya >2 editores activos.

---

## 5. Comparación detallada con audit externo

### Lo que confirma (validación cruzada)

✅ **Op A (s.mdx → s.markdown)** que acabo de ejecutar — la fuente externa lo respalda implícitamente: la fortaleza está en el pipeline remark+rehype, no en MDX-strict mode.

✅ **No migrar a Quartz** — requiere rewrite Preact, perdemos Server Components y la inversión de S0-S+5.

✅ **Plugins propios sólidos** — `remark-wikilinks.ts` y `remark-obsidian-embed.ts` están bien diseñados y son obsidian-first.

✅ **Build-graph como DataviewJS substitute** — la dirección es la correcta.

### Lo que añade (insights nuevos)

🆕 **Flowershow específicamente** (no estaba en mi audit interno) — stack idéntico, MIT, componentes copiables. Nivel 2 strategy.

🆕 **Obsidian Bases** (feature core de Obsidian v1.9+ desde sept 2025) — Flowershow ya tiene `<BasesView />` beta. Es lo más cercano a Notion databases en Obsidian. Worth adopting.

🆕 **Distinción Editor (Obsidian-remote) vs Publisher (portal-next)** — clarifica roles, evita mezclar concerns.

🆕 **`cue-to-velite.mjs`** — pipeline de sincronización con aleia-zen. Cuando concepto-universal v1.1 esté APPROVED, tener este script auto-genera la colección Velite sin drift manual.

🆕 **20 gaps F9.4 del schema concepto-universal** — todos relevantes para cuando importemos conceptos al portal (ecuaciones, dimensional, Pasteur, etc.). Pero es trabajo de aleia-zen primero, portal después.

### Lo que mejora respecto al audit externo

✨ **Mission Tracker M01→M12 con cascada secuencial + AI modo misión anti-jailbreak** — feature único nuestro (no en Flowershow).

✨ **6 roles BPA-003 con dispatch contextual** — único nuestro (Estudiante, Diseñador, Formador, Investigador, Emprendedor, Director).

✨ **Sidebar redimensionable + Misiones widget al tope + 4 tabs derecha (Outline/Refs/Preg/Chat)** — Flowershow tiene layout más simple.

✨ **Audit de 20 gaps usabilidad cerrados** — disciplina de UX más sistemática que Flowershow.

✨ **CCA imprimible + ChangelogDrawer + Mobile Sheet** — features post-MVP no en Flowershow.

---

## 6. Plan de adopción recomendado (prioridad por ROI)

### Fase ϕ1 (esta semana) — consolidar Op A + spike Flowershow
- ✅ **DONE**: Op A migration `s.mdx()` → `s.markdown()` (commit `cb6ffb1`)
- 🔄 **Spike**: clonar Flowershow `/tmp/`, comparar `<BacklinksPanel />`, `<HoverCard />`, `<BasesView />` contra nuestras impls. Documentar diferencias en `docs/audit/REVIEW-flowershow-components.md`.
- 🔄 **Decisión**: para cada componente, marcar `KEEP` (nuestro mejor) | `ADOPT` (copiar el suyo) | `MERGE` (extraer features puntuales).

### Fase ϕ2 (sprint S+6) — Bases + extensiones build-graph
- 🆕 Adoptar `<BasesView />` de Flowershow para vista tabular del corpus
- 🆕 Extender `build-graph.mjs` para emitir `derivation-graphs.json`, `pasteur-points.json` (cuando concepto-universal v1.1 ingrese)
- 🆕 Componente `<Equation />` minimal con KaTeX

### Fase ϕ3 (sprint S+7) — concepto-universal v1.1 import
- 🔄 Esperar a que aleia-zen publique v1.1 APPROVED
- 🆕 Script `scripts/cue-to-velite.mjs` (lee CUE → emite snippet Velite)
- 🆕 Colección `concepto` en velite.config.ts
- 🆕 Ruta `/conceptos/[slug]/` con dispatch por `concept_subtype` (EquationLayout, PhysicalLawLayout, etc.)

### Fase ϕ4 (backlog) — Obsidian-remote para staff
- ⏸ `obsidian-remote` Docker en Railway con Cloudflare Tunnel
- ⏸ Auth BasicAuth/OAuth
- ⏸ Documentar en `docs/STAFF-EDITORIAL.md`

### NO hacer
- ❌ Migrar a Quartz (rewrite Preact, pierde Server Components)
- ❌ Usar el paquete npm `obsidian` (solo tipos para plugins Electron)
- ❌ Reescribir wikilinks/embeds desde cero (lo que tenemos está bien)
- ❌ Implementar DataviewJS sandbox client-side (no portable, build-graph.mjs cubre 80%)

---

## 7. Decisiones cristalizadas (ADRs)

| ADR | Decisión | Razón |
|---|---|---|
| **ADR-OBS-08** | Op A: `s.mdx()` → `s.markdown()` ya ejecutado | Elimina 100% transformaciones JSX-escape; sintaxis Obsidian nativa |
| **ADR-OBS-09** | Adoptar componentes Flowershow selectivamente, NO migrar full | Preserva inversión S0-S+5; Flowershow stack idéntico permite copy-paste |
| **ADR-OBS-10** | NO migrar a Quartz | Pierde Server Components + costo rewrite Preact prohibitivo |
| **ADR-OBS-11** | NO usar npm `obsidian` package | Solo expone tipos Electron API, inútil fuera de Obsidian app |
| **ADR-OBS-12** | `build-graph.mjs` es la solución oficial DataviewJS-substitute | Pre-procesamiento build-time + JSON estático (zero-runtime) |
| **ADR-OBS-13** | `obsidian-remote` Railway = canal staff editorial, NO público | Roles distintos (editing vs publishing) |
| **ADR-OBS-14** | `cue-to-velite.mjs` para sync schemas aleia-zen → portal | Single source of truth: CUE; auto-generación elimina drift |
| **ADR-OBS-15** | Plugins propios `remark-wikilinks.ts` y `remark-obsidian-embed.ts` se mantienen | Funcionan, son obsidian-first, no hay razón para reemplazarlos |

---

## 8. Métricas de éxito post-adopción

| Métrica | Baseline v3.5 | Target post-ϕ2 | Target post-ϕ3 |
|---|---|---|---|
| Sintaxis Obsidian compat | 95% (post Op A) | 99% (Bases) | 100% (concepto layouts) |
| `.md` sin transformaciones | ✅ Sí | ✅ Sí | ✅ Sí |
| Bundle delta (Bases adoption) | — | < +50 KB | < +200 KB |
| LCP `/conceptos/[slug]` | n/a | < 2.5s | < 2.5s |
| Componentes Flowershow adoptados | 0 | 1-2 | 3-5 |
| Schemas auto-generados de CUE | 0 | 0 | 1 (concepto) |

---

## 9. Referencias

### Documento fuente externo
- [`/aleia-zen/packages/vault-builder/entities/kdmo/concepto-universal/_gaps-y-recomendaciones-sota.md`](file:///C:/antigravity/aleia-zen/packages/vault-builder/entities/kdmo/concepto-universal/_gaps-y-recomendaciones-sota.md) — F9.4 v1.0, 26-04-2026, 1165 líneas

### Audits internos relacionados
- [`AUDIT-obsidian-workspace-ux.md`](./AUDIT-obsidian-workspace-ux.md)
- [`AUDIT-usability-gaps-20.md`](./AUDIT-usability-gaps-20.md)
- [`AUDIT-sota-frontend-cop.md`](./AUDIT-sota-frontend-cop.md)
- [`AUDIT-aleia-bereshit-frontend.md`](./AUDIT-aleia-bereshit-frontend.md)

### Repositorios externos clave
- **Flowershow** — https://github.com/flowershow/flowershow (MIT, Next.js)
- **Quartz v4** — https://github.com/jackyzha0/quartz (MIT, Preact, descartado)
- **Datacore** — https://github.com/blacksmithgu/datacore (Obsidian Plugin only)
- **obsidian-remote** — https://github.com/sytone/obsidian-remote (Docker)
- **LinuxServer Obsidian** — https://docs.linuxserver.io/images/docker-obsidian/
- **@portaljs/remark-wiki-link** — npm (ya en deps `^1.2`)
- **@excalidraw/excalidraw** — npm (MIT)

### SOTA estándares (del audit externo)
- W3C MathML 3 / OpenMath / LaTeXML / SymPy / NIST DLMF
- ISO 80000:2009 / QUDT.org / UCUM / OM
- SKOS-XL Labels (W3C 2009) / CIDOC-CRM E55
- Stokes 1997 *Pasteur's Quadrant*
- PNUD 2011 RBM / GpRD BID 2010
- EMMO (European Materials Modelling)

---

## 10. Síntesis final

> **No hay "motor Obsidian standalone open-source" — pero sí un ecosistema MIT (Flowershow + portaljs + Quartz) que cubre 95% de la sintaxis y features. El portal-next ya está en ese ecosistema vía `@portaljs/remark-wiki-link`. La ruta SOTA es adopción progresiva, no rewrite ni microservicio para publishing público.**

**Lo mejor de ambos mundos**:
1. **Obsidian-first** para edición — los `.md` se ven nativos en Obsidian, sin transformaciones.
2. **Next.js portal** para presentación pública — riqueza de Server Components, AI Asistente, Mission Tracker, sidebar redimensionable, 6 roles.
3. **Pipeline shared** — Velite + remark/rehype + plugins Obsidian-compat. Single source of truth: el `.md` con frontmatter YAML.
4. **`obsidian-remote` Docker** — solo si emerge la necesidad de staff editorial colaborativo.

---

*kd_id: audit/obsidian-engine-sota · v1.0.0 · APPROVED · CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-26*
