---
kd_id: audit/v9-portal-reuso-multi-proyecto
kd_version: 2.0.0
kd_date: 2026-04-28
kd_status: PROPOSED · ready-to-start
kd_doc_type: AUDIT
kd_title: v9 · Portal reusable multi-proyecto · arranque desde cero con SOTA 2026
kd_responsible: Carlos C. Madera
kd_classification: PUBLIC
kd_supersedes: []
kd_parallel_with: [audit/v7-comunidades, roadmap/v8-dataviewjs-tdd]
---

# AUDIT v9 · Portal reusable multi-proyecto · arranque desde cero con SOTA 2026

> **Propósito.** Este documento es **autosuficiente**: leyéndolo solo, otra conversación puede arrancar v9 desde cero, conociendo (a) cómo llegamos hasta v7, (b) qué se está cocinando en paralelo en v8, (c) por qué v9 es una oportunidad de reset arquitectónico y (d) el stack SOTA 2026 que vamos a adoptar.

---

## 0 · TL;DR

- **v7** está en producción y seguirá recibiendo features incrementales.
- **v8** corre en paralelo resolviendo el problema de renderizado de **DataviewJS** (TDD aditivo, sin breaking).
- **v9** arranca **un repo nuevo desde cero** para implementar **Engine-as-package + multi-app monorepo**, de modo que el motor del portal sirva al proyecto reforma-ud y a un segundo proyecto sin cherry-picks.
- Stack SOTA 2026 elegido: **Nx** (sobre Turborepo) · **Next.js 16 + React 19 RSC** · **Velite** (continuidad, no Fumadocs) · **shadcn/ui + Tailwind v4** · **next-intl** · **Storybook** · **Changesets** · **Pagefind** · **AI SDK v6 con prompt caching** · **Vitest + Playwright** · **PostHog**.
- Plan en 5 fases (F0-F4). Arranque concreto desde cero con `pnpm create nx-workspace`.
- **Las mejoras de v7/v8 se irán portando al engine de v9 a medida que se estabilicen** — v9 absorbe lo bueno, no lo reescribe.

---

## 1 · Walkthrough · cómo llegamos hasta v7

Esta es la genealogía del portal `reforma-ud` para que cualquier conversación nueva entienda el estado actual sin tener que abrir cada audit.

### v4.3 · "Comunidad participativa"

- Pivote conceptual: el portal **no es one-way** (autor → lector); es bidireccional.
- Right panel reorganizado con tabs: Grafo, Refs, **Comunidad** (aportes + pre-saberes + preguntas).
- Transclusiones inline colapsables. Hover-preview Obsidian-like.

### v4.5 · "Paridad Obsidian (final)"

- Decisión arquitectónica raíz para **detener el ciclo de parches**.
- Re-arquitectura de paneles: Header, Sidebar, RightPanel, SplitWorkArea, ComparativeSplit.
- Schema Velite consolidado: `canonicPaper`, `note`, `community`.
- Modelo de relaciones del vault y modelo de comunidad/co-autoría.
- Stack base verificado: Next 16.2.4, React 19.2.4, Tailwind v4, shadcn 4.4, Radix 1.4, react-resizable-panels 4.10, Velite 0.3, `@flowershow/remark-wiki-link@3.4.0`, `react-force-graph-3d@1.29`, `vis-network@10`, `cmdk@1.1`.

### v5.0 · "Multi-pane workspace Obsidian-grade"

- Múltiples tabs por panel + múltiples panes por área de trabajo + drag entre paneles.
- `useDocTabs` con URL-state `?tabs=`, `DocTabsBar`, atajos `Ctrl+Tab` / `Ctrl+W`.
- Decisión: `@dnd-kit@6` (no dockview).
- Cierra la deuda de paridad ergonómica con Obsidian.

### v5.0f · Bibliografía como SSOT

- Átomos `.md` en `content/biblio/<bibtex_key>.md` recogidos por Velite.
- Resolver de citas `[@key]` lee frontmatter desde átomos (no desde `references.json`).

### v6 · Regression check + zone diagnostic

- 13 features nuevas en un sprint sin TDD → regresión crítica detectada (loop infinito en Sidebar Recientes por `useEffect` mal memoizado).
- Smoke test exhaustivo después; cero regresiones funcionales adicionales.
- Diagnóstico de zonas: cierre 13/15 ítems; 2 diferidos (drag-reorder sidebar, GitHub API real).

### v7 · Comunidades full-stack + Noticias + Glosario contextual ⭐ producción actual

- Páginas de comunidad con definición, servicios, roles y misiones.
- Feed de actualidad (`80-actualidad` vault → `content/feed/`) como cuarto tipo de contenido.
- Glosario con resolución contextual.
- **Estado:** activo y en uso · seguirá recibiendo features incrementales mientras v9 arranca.

### v7 · gaps abiertos que se llevarán al engine v9

| Gap | Origen | Tratamiento en v9 |
|---|---|---|
| Drag-reorder + new-doc inline sidebar | v6 G-SBL-03 | API genérica `engine.fs.write` en `@portal/engine/server` |
| GitHub API real para Evolución tab | v6 G-SVC-05 | Adapter `@portal/engine/integrations/github` opcional |
| DataviewJS portability | v8 (en curso) | Componentes glosario portados al engine cuando v8 estabilice |

---

## 2 · Trabajo paralelo · v8 · DataviewJS portability (TDD aditivo)

> Otra conversación está ejecutando este sprint. **No bloquea v9**, pero v9 absorberá su salida cuando estabilice.

**Problema:** Obsidian renderiza bloques `dataviewjs` en vivo; el portal Next.js no. La continuidad visual entre vault de Obsidian y portal Vercel se rompe en cualquier nota con consultas dinámicas.

**Compromiso v8:** *lo que renderiza hoy debe seguir renderizando idénticamente*. Cada sprint introduce cambios aditivos con tests de regresión visual + estructural.

**Cambios in-flight:**

| Archivo | Cambio | Riesgo |
|---|---|---|
| `velite.config.ts` | +13 campos opcionales TPL v2.0 al schema concepto | 🟢 cero |
| `scripts/lib/glosario-transform.mjs` | STRIP_KEY_PATTERNS reducido + sentinels DV + MetaBind | 🔴 rompe 2 tests viejos (esperado) |
| `scripts/sync-glosario.mjs` | pasa `keys` a `cleanBody` | 🟢 backward-compat |
| `src/components/glosario/*.tsx` | 6 componentes nuevos (types + 5 DV) | 🟢 zero risk hasta consumir |

**Cómo se conecta con v9:** los componentes glosario nuevos de v8 deben pensarse desde ya como parte de `@portal/engine/components/glosario/`, no acoplados a rutas reforma-ud.

---

## 3 · Por qué v9 = oportunidad de reset

### 3.1 · Lo que NO se puede arreglar parchando `apps/portal-next`

Los acoplamientos detectados en el audit v9.1:

| Acoplamiento | Ubicación | Por qué bloquea reuso |
|---|---|---|
| Path de contenido | `velite.config.ts` `'content'` literal | un motor solo lee un dir |
| Branding | `layout.tsx` `'reforma·ud — Acuerdo CSU 04/2025'` | strings duros |
| Rutas con concepto | `app/cca/`, `mision/`, `comunidades/` | nombres del dominio en filesystem |
| Vocabulario | `lib/estantes.ts`, `services-registry.ts`, `bsc-rbm.ts` | conceptos reforma-ud (V1-V5, BSC, CCA) en código |
| Glosario fijo | `content/glosario/` y resolvers | otro proyecto = otro glosario |

Para *desacoplar* todo eso en `portal-next` sin romper v7/v8 se necesitarían meses. **Más barato y limpio: nuevo repo, motor desde cero, content viaja después.**

### 3.2 · Lo que sí se puede aprovechar

Del repo actual portamos **al engine** de v9, en este orden:

1. Schemas Velite genéricos (canonicPaper, note, community con campos comunes).
2. `lib/`: active-doc, panes-state, resolve-href, doc-tabs, hover-preview, sidebar-tree, glosario-transform.
3. Componentes presentacionales: workspace, biblioteca, comunidad, grafo, command palette.
4. Plugins remark/rehype (wiki-link, callouts, KaTeX, mermaid, pretty-code).
5. Componentes de glosario v8 (cuando estabilicen).
6. Tests vitest existentes (porting con ajustes mínimos).

Lo que **no** se porta:
- Strings de dominio reforma-ud (V1-V5, BSC-RBM, CCA específico).
- Rutas literales (`mision`, `cca`, `comunidades` específicas).
- `services-registry.ts` específico → reemplazado por config genérica.

---

## 4 · SOTA 2026 · stack para v9

Investigado contra Anthropic docs, Vercel templates, Nx/Turborepo benchmarks 2026, Fumadocs/Nextra/Velite comparisons. Decisiones razonadas:

### 4.1 · Monorepo · **Nx** (sobre Turborepo)

| Criterio | Turborepo | **Nx** ⭐ |
|---|---|---|
| Setup speed | 10 min | 30 min |
| Module boundaries enforcement | manual / TS only | nativo (eslint plugin) |
| Generators (`pnpm create-portal foo`) | copy-paste | nativo (`nx g`) |
| Affected detection | coarse (package.json) | fine-grained (file-level) |
| CI distribuido | manual | Nx Agents |
| Cross-repo eventual | no | Polygraph |

**Por qué Nx:** este es un proyecto que arranca de cero, queremos boundaries duros entre engine y apps, queremos generators para escalar a N proyectos sin copy-paste. La curva inicial vale el dividendo a 6+ meses.

> **Nota de salida:** si en F0 el equipo siente fricción con Nx, fallback documentado a Turborepo + workspace eslint rules. La decisión es revertible en F0 sin costo.

### 4.2 · Framework · **Next.js 16 + React 19 RSC** (continuidad)

- App Router + Server Components + Server Actions.
- Streaming para AI features.
- Partial Prerendering (PPR) para rutas mixtas estáticas/dinámicas.
- Edge runtime para latencia global donde aplique.

### 4.3 · Content layer · **Velite** (continuidad, NO Fumadocs)

Considerada Fumadocs como alternativa (framework completo de docs). **Rechazada porque:**

- Fumadocs trae UI opinada (sidebar, theme, layout) — chocaría con nuestro shell custom (workspace, multi-pane, comunidad).
- Velite es solo content layer: tipa contenido, deja UI/routing al app. Encaja mejor con un engine custom.
- Continuidad: ya tenemos schemas, plugins remark/rehype, transformers de glosario funcionando.
- Decisión: **Velite + nuestro propio engine UI.**

### 4.4 · UI · **shadcn/ui v4 + Radix + Tailwind v4** (continuidad)

- shadcn como source-of-truth para componentes base; copiados al engine.
- Theme via CSS variables; cada app define su `theme.css`.
- Tailwind v4 con `@theme` directive.

### 4.5 · State management · split por capa

| Capa | Tool | Por qué |
|---|---|---|
| Server | RSC + Server Actions | nativo Next 16 |
| URL | **nuqs** | URL como SSOT para estado compartible |
| Client (efímero) | **zustand** | mínimo, sin boilerplate |
| Forms | **react-hook-form + zod** | validación schema-first |

### 4.6 · i18n · **next-intl** (NUEVO)

- Diferentes proyectos pueden requerir diferentes idiomas.
- Engine expone strings traducibles vía `useTranslations` namespaces.
- Cada app provee sus mensajes en `messages/<locale>.json`.

### 4.7 · Búsqueda · **Pagefind** (continuidad)

- Index estático, cero servidor, funciona con SSG.
- Engine expone componente `<Search />`; cada app define qué colecciones indexar.

### 4.8 · AI · **AI SDK v6 + Anthropic + prompt caching**

- `@ai-sdk/anthropic` con Claude Sonnet 4.6 / Opus 4.7.
- Prompt caching activado por defecto (system prompt, context vault).
- Streaming respuestas vía RSC.
- Citation obligatoria (carryover de v7).

### 4.9 · Animations · **motion** (ex framer-motion)

- API estable; performance mejorada en v12+.
- Engine expone primitivas `<FadeIn>`, `<SlideOver>`.

### 4.10 · Grafo · **react-force-graph + three** (continuidad)

- 3D para grafo global, 2D para grafo local.
- Engine expone `<KnowledgeGraph nodes edges />`.

### 4.11 · Markdown extras · pipeline remark/rehype (continuidad)

- `@flowershow/remark-wiki-link@3.4`
- `rehype-callouts` (callouts Obsidian)
- `rehype-katex` + `remark-math` (matemáticas)
- `rehype-mermaid` (diagramas)
- `rehype-pretty-code` + Shiki (syntax highlight)
- Custom: `remark-rejoin-wikilinks-in-tables`, sentinels DataviewJS (de v8).

### 4.12 · Versionado interno · **Changesets** (NUEVO)

- Engine es package privado pero versionado semánticamente.
- Apps consumen via `workspace:*`.
- Changesets fuerza al equipo a clasificar cambios (patch/minor/major) y mantiene CHANGELOG.

### 4.13 · Component library docs · **Storybook** (NUEVO)

- Engine documentado en Storybook propio.
- Cada componente con states, controls, docs MDX.
- CI publica Storybook a Vercel preview.

### 4.14 · Testing · **Vitest + Playwright + Testing Library** (continuidad)

- Vitest unit + integration.
- Playwright e2e + visual regression.
- Testing Library para components.
- Coverage por package.

### 4.15 · Build engine package · **tsup**

- ESM-only output, types incluidos.
- Source maps preservados para DX.
- Watch mode integrado con Nx.

### 4.16 · Analytics · **Vercel Analytics + PostHog** (NUEVO)

- Vercel Analytics: web vitals.
- PostHog: product analytics, feature flags por app.
- Engine emite eventos genéricos; cada app decide si los recibe.

### 4.17 · Observability · **Sentry** opcional

- Error tracking server + client.
- Source maps para stack traces legibles.

---

## 5 · Arquitectura objetivo v9

```
aleia-portal-engine/                  ← repo NUEVO desde cero
├── apps/
│   ├── reforma-ud/                   ← contenido + branding del proyecto actual
│   │   ├── content/                  ← biblio, comunidades, glosario, canonico, feed
│   │   ├── messages/
│   │   │   └── es-CO.json
│   │   ├── portal.config.ts          ← brand, rutas, vocabulario, features
│   │   ├── theme.css                 ← tokens CSS por proyecto
│   │   ├── public/
│   │   ├── app/
│   │   │   └── (overrides opcionales)
│   │   ├── velite.config.ts          ← extends defineVelite(projectConfig)
│   │   ├── next.config.ts
│   │   ├── project.json              ← Nx project
│   │   └── package.json
│   │
│   └── proyecto-2/                   ← se genera con `nx g portal:new proyecto-2`
│       └── …idéntica estructura, contenidos distintos
│
├── packages/
│   ├── portal-engine/                ⭐ MOTOR
│   │   ├── src/
│   │   │   ├── components/           ← workspace, biblioteca, comunidad, grafo, glosario
│   │   │   ├── layouts/              ← root layout, shell, multi-pane
│   │   │   ├── lib/                  ← active-doc, panes-state, resolve-href, hover-preview
│   │   │   ├── server/               ← server actions reusables (fs.write, github adapter)
│   │   │   ├── velite/               ← defineVelite, schemas comunes, plugins
│   │   │   ├── ai/                   ← AI SDK helpers + prompt templates
│   │   │   ├── search/               ← Pagefind wrapper
│   │   │   ├── i18n/                 ← next-intl helpers
│   │   │   └── index.ts              ← exports tipados (API pública)
│   │   ├── tsup.config.ts
│   │   ├── project.json
│   │   └── package.json
│   │
│   ├── portal-ui/                    ← shadcn primitives + tokens
│   │   ├── src/components/
│   │   ├── src/styles/
│   │   └── package.json
│   │
│   ├── portal-content-schema/        ← tipos de frontmatter, KDMO Tupla, zod schemas
│   │   ├── src/schemas/
│   │   └── package.json
│   │
│   ├── portal-graph/                 ← grafo + analítica de relaciones
│   │   └── …
│   │
│   ├── portal-config/                ← `defineProject`, tipos `PortalConfig`
│   │   └── …
│   │
│   └── portal-mdx-plugins/           ← remark/rehype custom (wikilinks-tables, sentinels DV)
│       └── …
│
├── tools/
│   ├── generators/                   ← Nx generators
│   │   ├── new-portal/               ← `nx g portal:new <slug>`
│   │   └── new-component/            ← `nx g engine:component <name>`
│   └── eslint-rules/                 ← module boundary rules
│
├── docs/                             ← Storybook + ADRs + guías
│   ├── adrs/
│   ├── guides/
│   │   ├── creating-a-portal.md
│   │   ├── extending-the-engine.md
│   │   └── upgrading.md
│   └── README.md
│
├── .changeset/                       ← Changesets versionado
├── .github/workflows/
│   ├── ci.yml
│   ├── release.yml                   ← changesets publish workflow
│   └── e2e.yml
├── nx.json                           ← Nx config + cache
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md                         ← este audit como punto de partida
```

---

## 6 · Contrato `portal.config.ts` por app

```ts
// apps/<proyecto>/portal.config.ts
import { defineProject } from '@portal/config';

export default defineProject({
  brand: {
    name: 'reforma·ud',
    tagline: 'Acuerdo CSU 04/2025',
    description: 'Portal de la Reforma Vinculante UDFJC',
    metadataBase: 'https://reforma-ud.vercel.app',
    locale: 'es-CO',
    icons: { logo: '/logo.svg', favicon: '/favicon.ico' },
  },
  content: {
    root: 'content',
    collections: ['biblio', 'comunidades', 'glosario', 'canonico', 'feed'],
  },
  routes: {
    home: { module: 'mission', path: '/' },
    enabled: ['canonico', 'glosario', 'comunidades', 'feed', 'biblioteca'],
    custom: {
      mision: () => import('./app/mision/page'),
    },
  },
  vocabulary: {
    estantes: ['Norma', 'Investigación', 'Guía', 'Deliberación', 'Sección'],
    rolesActor: ['Estudiante', 'Docente', 'Director'],
    pillars: { v1: 'Soberanía', v2: 'Emprendimiento', v3: 'Participación', v4: 'Ética', v5: 'Austeridad' },
  },
  theme: {
    cssFile: './theme.css',
    fontFamily: { sans: 'Inter', serif: 'Source Serif Pro' },
  },
  features: {
    grafo3D: true,
    deliberacion: true,
    aiAssistant: { provider: 'anthropic', model: 'claude-sonnet-4-6' },
    comunidades: true,
    feedActualidad: true,
    dataviewjs: true,        // habilita componentes v8 cuando estabilicen
  },
  i18n: {
    defaultLocale: 'es-CO',
    locales: ['es-CO'],
  },
  analytics: {
    vercel: true,
    posthog: { apiKey: process.env.POSTHOG_KEY },
  },
});
```

Cada feature en `features` hace que el engine **monte rutas y componentes** correspondientes solo si está activa. Un proyecto puede deshabilitar `comunidades` y el engine no expone esas rutas.

---

## 7 · Plan de ejecución · 5 fases

### F0 · Bootstrap (semana 1) · "hello world reusable"

**Meta:** repo nuevo, Nx funcionando, dos apps placeholder consumiendo engine vacío.

- F0.1 `pnpm create nx-workspace aleia-portal-engine --preset=ts` (no monorepo react preset; partimos limpio).
- F0.2 Crear `packages/portal-engine` con `nx g @nx/js:lib`.
- F0.3 Crear `packages/portal-config` con `defineProject` + tipos.
- F0.4 Crear `apps/reforma-ud` con `nx g @nx/next:app` + dependencia a engine.
- F0.5 Crear `apps/proyecto-2` igual; ambos renderizan "Hello from <portal.config.brand.name>".
- F0.6 ESLint module boundaries: engine no importa de apps; apps importan solo de packages.
- F0.7 Changesets init.
- F0.8 CI mínimo (lint + typecheck + build) en GitHub Actions.

**Criterio de salida:** dos URLs Vercel preview, cada una con su nombre, consumiendo el mismo engine.

### F1 · Engine core · UI primitives + content layer (semanas 2-3)

- F1.1 `packages/portal-ui`: shadcn primitives base (button, card, dialog, popover, hover-card, command).
- F1.2 `packages/portal-content-schema`: zod schemas + tipos compartidos (canonicPaper, note, community, biblio).
- F1.3 `packages/portal-mdx-plugins`: remark/rehype pipeline portados.
- F1.4 `packages/portal-engine/velite`: `defineVelite(projectConfig)` que retorna config Velite parametrizada.
- F1.5 `apps/reforma-ud` corre `velite build` consumiendo schemas del engine.
- F1.6 Storybook init en `packages/portal-ui` con primeros componentes.

### F2 · Engine shell · workspace + multi-pane + sidebar + right panel (semanas 4-5)

- F2.1 Portar `lib/`: active-doc, panes-state, resolve-href, doc-tabs, hover-preview, sidebar-tree.
- F2.2 Portar `components/workspace/`, `multi-pane`, `sidebar`, `right-panel`.
- F2.3 Brand-aware: layout root recibe `brand` por props, no lee strings.
- F2.4 Tests vitest portados; smoke test Playwright reforma-ud renderiza.

### F3 · Features verticales · biblioteca, comunidad, grafo, glosario (semanas 6-8)

- F3.1 Biblioteca con 5 estantes parametrizables vía `vocabulary.estantes`.
- F3.2 Comunidad full-stack (carryover v7).
- F3.3 Grafo 3D + 2D (`packages/portal-graph`).
- F3.4 Glosario contextual + componentes DV de v8 (cuando estabilicen).
- F3.5 AI assistant con citation obligatoria.
- F3.6 Search Pagefind genérica.

### F4 · Migración de contenido reforma-ud + segundo proyecto (semanas 9-10)

- F4.1 Copiar `content/` reforma-ud al nuevo `apps/reforma-ud/content/`.
- F4.2 Validar paridad visual contra v7 producción (smoke + visual regression).
- F4.3 Cutover: `reforma-ud.vercel.app` apunta al nuevo deploy.
- F4.4 Repo viejo `aleia-reforma-ud` queda en modo mantenimiento; v7/v8 features que lleguen se portan al engine.
- F4.5 Crear contenido placeholder + branding para `apps/proyecto-2`; deploy preview.
- F4.6 Documentar en `docs/guides/creating-a-portal.md` el flujo end-to-end.

---

## 8 · ADRs cristalizados

| ADR | Decisión | Razón |
|---|---|---|
| **ADR-v9-01** | Repo nuevo (`aleia-portal-engine`) | Costo de desacoplar `portal-next` actual > costo de empezar limpio |
| **ADR-v9-02** | Nx (no Turborepo) | Module boundaries + generators + affected fine-grained |
| **ADR-v9-03** | Velite (no Fumadocs) | UI custom incompatible con framework opinado |
| **ADR-v9-04** | Engine como packages internos (no npm publish) | Workspace `workspace:*` permite refactor cross-package en una PR |
| **ADR-v9-05** | `portal.config.ts` por app es SSOT del proyecto | Branding, rutas, vocabulario, features en un solo archivo |
| **ADR-v9-06** | Theme via CSS vars + `theme.css` por app | Override sin recompilar engine |
| **ADR-v9-07** | next-intl desde el inicio | i18n agregar después es 5x más caro |
| **ADR-v9-08** | Changesets para versionar engine | Disciplina de breaking changes desde día 1 |
| **ADR-v9-09** | Storybook para engine | Documentación viva, evita que el engine se vuelva caja negra |
| **ADR-v9-10** | Migración v7 → v9 con doble deploy paralelo | Cutover sin downtime; rollback inmediato si falla |
| **ADR-v9-11** | v7 sigue activo durante toda la migración | El usuario final no ve la transición |
| **ADR-v9-12** | v8 (DataviewJS) se absorbe al estabilizar | No bloquea v9; cuando v8 commitee, sus componentes se portan |

---

## 9 · Anti-patterns explícitos

- ❌ Clonar `aleia-reforma-ud` y borrar contenido para el segundo proyecto.
- ❌ Empezar v9 publicando engine a npm (publicar después, no antes).
- ❌ Generalizar para "N tenants" hipotéticos — diseñar para 2 proyectos reales.
- ❌ Mezclar conceptos reforma-ud (V1-V5, BSC, CCA) dentro del engine.
- ❌ Reescribir desde cero componentes que ya funcionan en v7 — portarlos.
- ❌ Bloquear v9 esperando que v8 cierre — v9 absorbe v8 cuando estabilice.
- ❌ Migrar contenido reforma-ud antes de F4 — F0-F3 son sobre el engine, no sobre datos.
- ❌ Saltarse F0 ("hello world") y empezar directo con features — F0 valida el monorepo.

---

## 10 · Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Curva Nx > expectativa | Media | Medio | F0 con escape hatch a Turborepo si fricción excede 1 sprint |
| Migración rompe contenido v7 | Media | Alto | F4 con visual regression Playwright contra producción |
| v8 introduce cambios incompatibles | Baja | Medio | Engine glosario espera estabilidad de v8 (no porting prematuro) |
| Equipo de 1 persona no sostiene 2 repos en paralelo | Alta | Alto | v7 entra en feature freeze gradual durante F3-F4; solo bug fixes |
| Diseño engine API queda inestable | Media | Alto | F4 incluye contract tests; `0.x` semver permite breaking hasta freeze |
| Costos Vercel duplicados (preview + prod x 2 proyectos) | Baja | Bajo | Free tier suficiente hasta producción real del segundo proyecto |

---

## 11 · Métricas de éxito

| Métrica | Objetivo |
|---|---|
| Tiempo bootstrap nuevo proyecto | `nx g portal:new <slug>` en **< 5 min** a deploy preview |
| % código compartido apps↔engine | **> 90%** |
| Tiempo propagación de mejora | **0 min** local · **un build CI** |
| Cherry-picks entre proyectos en 6 meses | **0** |
| Cobertura tests engine | **> 70%** unit · smoke E2E por feature crítica |
| Visual regression v7 → v9 reforma-ud | **paridad** |
| Tiempo F0 → F4 cutover | **10 semanas calendario** |

---

## 12 · Onboarding · qué leer en qué orden si empiezas en una nueva conversación

1. **Este documento (v9)** — contexto completo (15 min lectura).
2. `apps/portal-next/CLAUDE.md` del repo viejo — cómo está organizado v7.
3. `docs/audit/AUDIT-v4.5-obsidian-paridad-final.md` — decisiones arquitectónicas raíz.
4. `docs/audit/AUDIT-v7-comunidades.md` — features actuales en producción.
5. `docs/audit/ROADMAP-v8-dataviewjs-tdd.md` — qué corre en paralelo.
6. **Empezar F0.**

### Comandos para arrancar F0 desde cero

```bash
# 1. Crear repo nuevo
mkdir aleia-portal-engine && cd aleia-portal-engine
git init

# 2. Bootstrap Nx workspace TS + integración Next
pnpm create nx-workspace@latest . --preset=ts --packageManager=pnpm

# 3. Agregar plugins necesarios
pnpm add -D @nx/next @nx/react @nx/eslint @nx/storybook @nx/playwright @nx/vite

# 4. Crear engine package
nx g @nx/js:lib portal-engine --directory=packages/portal-engine --bundler=tsup

# 5. Crear config package
nx g @nx/js:lib portal-config --directory=packages/portal-config --bundler=tsup

# 6. Crear primer app
nx g @nx/next:app reforma-ud --directory=apps/reforma-ud

# 7. Crear segundo app de prueba
nx g @nx/next:app proyecto-2 --directory=apps/proyecto-2

# 8. Habilitar module boundaries
# … editar .eslintrc con @nx/enforce-module-boundaries

# 9. Init Changesets
pnpm add -D -w @changesets/cli
pnpm changeset init

# 10. Primer commit
git add . && git commit -m "F0.1: bootstrap nx workspace"
```

---

## 13 · Decisión final

**Adoptar:**
- Repo nuevo `aleia-portal-engine`.
- Nx + Velite + Next 16 + React 19 + shadcn + Tailwind v4 + next-intl + Storybook + Changesets.
- Plan F0-F4 en 10 semanas.
- v7 sigue en producción; v8 sigue en paralelo; v9 absorbe ambos a medida que estabilicen.

**Próxima acción concreta:** ejecutar bloque de comandos sección 12 en una nueva carpeta hermana de `aleia-reforma-ud`. Reportar al final de F0 con dos preview URLs operando.

---

## 14 · Referencias

- Anthropic docs · Claude API pricing, prompt caching, Opus 4.7 1M ctx — [docs.anthropic.com](https://docs.anthropic.com)
- Nx vs Turborepo 2026 benchmarks — [pkgpulse.com](https://www.pkgpulse.com/blog/turborepo-vs-nx-monorepo-2026)
- Fumadocs vs Nextra vs Velite — [fumadocs.dev/docs/comparisons](https://www.fumadocs.dev/docs/comparisons)
- Velite Next.js integration — [velite.js.org/examples/nextjs](https://velite.js.org/examples/nextjs)
- Nx official guides — [nx.dev/docs/guides/adopting-nx/nx-vs-turborepo](https://nx.dev/docs/guides/adopting-nx/nx-vs-turborepo)
- Audit v9.1 (deprecated por esta v9.2) — `AUDIT-v9-portal-reuso-multi-proyecto.md` v1
- Portal v7 producción — `AUDIT-v7-comunidades.md`
- Portal v8 paralelo — `ROADMAP-v8-dataviewjs-tdd.md`

---

> **Versión:** v9 (rev 2.0.0) · 2026-04-28
> **Estado:** PROPOSED · listo para arrancar F0 en nueva conversación
> **Punto de entrada para nuevo chat:** este documento + sección 12.
