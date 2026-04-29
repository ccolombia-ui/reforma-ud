---
kd_id: audit/v8c-walkthrough-handoff
kd_version: 1.0.0
kd_date: 2026-04-29
kd_status: CLOSED
kd_doc_type: AUDIT + HANDOFF
kd_title: v8c · Walkthrough completo v7→v8c + handoff para Kimi/Roo
---

# AUDIT v8c · Walkthrough completo + handoff para continuación en Kimi/Roo

> **Propósito único de este documento:** al leerlo solo, cualquier AI (Kimi, Roo Code, Claude) puede comprender el estado completo del portal, reproducir la metodología de trabajo y retomar el desarrollo desde cero sin contexto previo.

---

## 0 · Cómo leer este documento

1. Leer §1 (qué es el portal) y §2 (versiones).
2. Leer §3 (arquitectura actual) para entender el stack.
3. Leer §4 (metodología TDD) antes de tocar código.
4. Leer §5 (features por versión) para conocer lo construido.
5. Leer §6 (gaps abiertos) para saber qué viene.
6. Configurar el entorno según §7 (MCPs + extensiones).
7. Preguntar al usuario cómo proceder.

---

## 1 · Qué es este portal

**Portal reforma-ud** — `https://reforma-ud.vercel.app`

Portal de conocimiento para la Reforma Vinculante de la Universidad Distrital Francisco José de Caldas (UDFJC), basado en el Acuerdo CSU 04/2025 (`con-acu-004-25`). Sirve como:
- Biblioteca académica de 12 investigaciones canónicas (M01-M12)
- Plataforma de Comunidades de Práctica (CoPs) por órgano institucional
- Sistema de misiones de aprendizaje con constancias CCA
- Glosario SKOS/KDMO de 183 conceptos
- Asistente AI con citación obligatoria

**Repositorio:** `https://github.com/ccolombia-ui/reforma-ud`
**Monorepo:** `c:/antigravity/aleia-reforma-ud/`

---

## 2 · Historial de versiones

| Versión | Estado | Descripción |
|---|---|---|
| **v4.3** | cerrada | Pivot comunidad bidireccional; right-panel con tabs |
| **v4.5** | cerrada | Paridad Obsidian; re-arquitectura 3-zone shell |
| **v5.0** | cerrada | Multi-pane workspace; `react-resizable-panels`; `@dnd-kit` |
| **v5.0f** | cerrada | Bibliografía SSOT: átomos `.md` en `content/biblio/` |
| **v6** | cerrada | Regression check; fix loop infinito sidebar Recientes |
| **v7** | cerrada, absorbida por v8 | Comunidades full-stack; Noticias; Glosario contextual |
| **v8** | **cerrada** | DataviewJS TDD (S0-S8); 10 DV components; 100% coverage DV |
| **v8b** | **cerrada** | Lifecycle `kd_status`; misiones CoP; árbol estatutos CSU |
| **v8c** | **cerrada** | Gaps: cop-access tests; draft guards; tabs; showDrafts fix |
| **v9** | 🚀 en otro chat | Nuevo repo `aleia-portal-engine`; Engine-as-package |

---

## 3 · Arquitectura actual del stack

### 3.1 · Monorepo

```
aleia-reforma-ud/
├── apps/
│   └── portal-next/          ← Next.js 16 + React 19 + Velite
├── cloud-functions/          ← Google Apps Script sync
├── docs/
│   └── audit/                ← todos los audits (este documento incluido)
├── content/                  ← drive-sync (sincronizado desde Google Drive)
├── turbo.json
└── pnpm-workspace.yaml
```

### 3.2 · Stack `apps/portal-next`

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.2.4 (App Router) + React 19 |
| Content layer | Velite 0.3 — compila `.mdx`/`.md` → TypeScript tipado |
| Styling | Tailwind v4 + shadcn/ui v4 + Radix UI |
| Estado URL | `nuqs` (implícito via hooks) |
| Estado client | `localStorage` + custom events |
| Markdown | `@flowershow/remark-wiki-link@3.4` + rehype-callouts + KaTeX + Mermaid |
| Búsqueda | Pagefind (estático, zero-server) |
| Grafo | `react-force-graph-3d` + `vis-network` |
| AI | `@ai-sdk/anthropic` v3 + `ai` v6 (streaming, citation) |
| Testing unit | Vitest 4.x |
| Testing e2e | Playwright 1.59 |
| Deploy | Vercel (auto-deploy en push a `main`) |

### 3.3 · Colecciones Velite

| Colección | Patrón | Descripción |
|---|---|---|
| `canonicPaper` | `canonico/*.mdx` | M01-M12 papers canónicos |
| `concepto` | `glosario/con-*.md` | 183 conceptos SKOS/KDMO |
| `community` | `comunidades/**/index.mdx` | CoPs con roles, misiones |
| `note` | `comunidades/**/*.mdx` | Notas de comunidad |
| `reference` | `biblio/*.md` | Bibliografía APA |
| `csuAcuerdo` | `acuerdos/*.mdx` | Acuerdos CSU |
| `feed` | `feed/*.mdx` | Feed de actualidad |

### 3.4 · Lifecycle de visibilidad (v8b)

```
paper.kd_status: PUBLISHED → visible
paper.kd_status: DRAFT     → oculto (404 en rutas)
paper.kd_status: IN_REVIEW → oculto
paper.kd_status: DEPRECATED → visible con aviso

conceptos → derivados: visible si algún PUBLISHED paper los cita
```

Papers actuales: **M01-M07 PUBLISHED · M08-M12 DRAFT**

Activar vista drafts (solo dev): `NEXT_PUBLIC_SHOW_DRAFTS=true` en `.env.local`
**Nunca activo en producción** — guard `NODE_ENV !== 'production'`.

---

## 4 · Metodología TDD — cómo producimos y validamos código

### 4.1 · Ciclo completo por feature

```
1. AUDIT md → decisiones arquitectónicas, ADRs, spec de implementación
2. Schema Velite → añadir campo, verificar tipos generados
3. Content frontmatter → actualizar .mdx/.md con nuevo campo
4. Lógica pura → src/lib/*.ts (sin React, sin DOM)
5. Tests unit → src/lib/*.test.ts (Vitest)
6. Componente → src/components/**/*.tsx
7. Tests componente → src/components/**/*.test.tsx (calcular estado, no render)
8. Integración en página → src/app/**/page.tsx
9. TypeScript check → npx tsc --noEmit
10. Tests completos → pnpm test (todos deben pasar)
11. Commit + push → Vercel auto-deploy
12. Verificación visual → abrir URL en browser
```

### 4.2 · Comandos esenciales

```bash
# Desde apps/portal-next/

# 1. Rebuild content (después de cambiar frontmatter o velite.config.ts)
pnpm velite

# 2. Correr todos los tests
pnpm test

# 3. TypeScript check
npx tsc --noEmit

# 4. Dev server
pnpm dev

# 5. Build completo (igual que Vercel)
pnpm build
```

### 4.3 · Reglas de TDD en este proyecto

- **No push sin tests verdes.** Si hay un test roto, se arregla antes del commit.
- **Tests de lógica pura primero.** Los helpers de `src/lib/` se testean con Vitest puro (sin DOM).
- **Tests de componente = probar `calcXxx()` no el render.** Ver `cop-mission-card.test.tsx` como modelo.
- **Smoke e2e para features críticas.** Ver `e2e/smoke.spec.ts` — HTTP 200 + H1 visible + sin skeleton-lock.
- **Baseline snapshots para DataviewJS.** Ver `src/lib/baseline-snapshots.test.ts` — checksum del body de conceptos.
- **Un test por invariante.** Tests pequeños y específicos; un fallo = una causa clara.

### 4.4 · Modelo de commit

```
feat(scope): descripción imperativa corta

- detalle 1
- detalle 2
- archivos clave modificados

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Scopes usados: `v8b`, `v8c`, `v8b-s2`, `csu`, `fix`, `docs`, `test`

### 4.5 · Estado de tests al cierre de v8c

```
Test Files: 21 passed
Tests:      212 passed | 1 skipped
```

| Archivo test | Qué prueba |
|---|---|
| `show-drafts.test.ts` | Lifecycle kd_status: isPublished, filterPublished, cascada glosario |
| `cop-mission-card.test.tsx` | Estados locked/available/completed de misión CoP |
| `cop-access.test.ts` | calcUserCoPLevel, getCoPLevelName, localStorage missions |
| `mission-state.test.ts` | Cascada M01→M12, director override |
| `glosario-transform.test.ts` | Transformación de conceptos (8 describe, 19 it) |
| `graph-click-action.test.ts` | Lógica de click en grafo |
| `resolve-href.test.ts` | Resolución de hrefs para wiki-links |
| `baseline-snapshots.test.ts` | Regression guard DataviewJS (skip si no hay baseline) |
| `dv-*.test.tsx` × 9 | Componentes DataviewJS individuales |
| `selector-rol-jtbd.test.tsx` | Selector de rol JTBD |
| `types.test.ts` | Tipos glosario |
| `concepto-parser-options.test.tsx` | Parser options de concepto |
| `mdx-with-hover-preview.test.ts` | HoverCard en wikilinks |

---

## 5 · Features construidas (v7 → v8c)

### v8 · DataviewJS TDD (S0-S8)

**Problema:** Obsidian renderiza bloques `dataviewjs` en vivo; Vercel no.

**Solución:** 10 componentes React que replican la funcionalidad DV:

| Componente | Función |
|---|---|
| `DvCitedIn` | Papers que citan este concepto |
| `DvEvolucion` | Historial de versiones del concepto |
| `DvMandatos` | Mandatos normativos asociados |
| `DvPrereqs` | Prerequisitos conceptuales |
| `DvHabilita` | Qué habilita este concepto |
| `DvRelations` | Relaciones SKOS (broader/narrower) |
| `DvFacetNormative` | Faceta normativa |
| `DvRegimenEpistemico` | Régimen epistémico |
| `DvVistaPorRol` | Vista por rol JTBD |
| `DvObsidianOnly` | Wrapper para bloques solo-Obsidian |

**Pipeline:** Velite transforma `:::dv-*` sentinel blocks → componentes React via `ConceptoBodyClient`.

### v8b · Document lifecycle + misiones CoP

**kd_status como SSOT:**
- Papers con `kd_status: PUBLISHED` → visibles
- Papers con `kd_status: DRAFT` → 404, ocultos en sidebar y misiones
- Conceptos → derivados automáticamente de papers publicados

**Misiones CoP (3 tipos):**
- `comprension` — leer paper + preguntas → sube nivel CoP
- `deliberacion` — revisar borrador de estatuto → constancia
- `produccion` — co-crear artefacto → rol N4

**CSU: 6 misiones definidas:**
```
CSU-MC-01  comprension   Participa en la Reforma UD
CSU-MC-02  comprension   Nueva Estructura Organizativa
CSU-MC-03-A deliberacion  Estatuto Docente
CSU-MC-03-B deliberacion  Estatuto Estudiantil
CSU-MC-03-C deliberacion  Estatuto Curricular
CSU-MC-04  produccion    Estatuto Académico consolidado
```

**Nivel real en CoP:** `CoPMissionsPanel` (client) lee `localStorage` → calcula nivel → pasa a `CoPMissionCard`.

**Sidebar:** misiones como sub-items bajo CSU con íconos por tipo (📖/⚖️/🏗️).

**Página individual de misión:** `/comunidades/gobierno/csu/<mision-slug>` — detectada en catch-all `[[...slug]]`.

### v8c · Gaps cerrados

- `cop-access.test.ts`: 11 tests de `calcUserCoPLevel`, `getCoPLevelName`, localStorage
- `/mision/[paperId]`: guard `isPublished()` para papers en draft
- `comunidad-tabs`: `'misiones-cop'` registrado como `TabId`
- `show-drafts`: `showDrafts` nunca activo en `NODE_ENV=production`

---

## 6 · Gaps abiertos (pendiente en v8c+ o v9)

| Gap | Prioridad | Descripción |
|---|---|---|
| Comprehension questions M02-M07 | P1 | Solo M01, M04, M05 tienen preguntas; sin ellas el tracker queda en 70% max |
| Verificar anchors M01 en dev | P1 | `rehype-slug` puede generar IDs distintos a los escritos en `comprehension.ts` |
| `<CoPAccessPanel />` + `cop-access.ts` gates | P1 | Gate de inscripción a CoP: muestra CCAs ganados vs requeridos |
| Misiones CoP VR Formación/Investigación/Extensión | P2 | Cada VR necesita sus misiones de estatuto en frontmatter |
| `markCoPMissionCompleted()` en UI | P2 | La función existe pero no hay botón "Completar misión" en la página |
| Persistencia server-side de CCAs | P3 | Hoy en localStorage; se pierde al cambiar dispositivo |
| M06, M07 comprehension | P2 | Gates N1/N2 de Escuela Física requieren CCAs M05+M07 |
| Smoke tests CSU mission page | P2 | `/comunidades/gobierno/csu/participa-en-la-reforma` no tiene cobertura e2e |

---

## 7 · Configuración de entorno para Kimi/Roo

### 7.1 · Clonar y arrancar

```bash
git clone https://github.com/ccolombia-ui/reforma-ud.git
cd reforma-ud
pnpm install
cd apps/portal-next
pnpm velite        # rebuild content
pnpm test          # verificar 21/21
pnpm dev           # http://localhost:3000
```

### 7.2 · Variables de entorno

```bash
# apps/portal-next/.env.local
NEXT_PUBLIC_SHOW_DRAFTS=true   # ver M08-M12 en dev (NUNCA en prod)
```

### 7.3 · MCP Servers a activar en Roo Code

Roo Code (VS Code extension) soporta servidores MCP. Activar en `~/.roo/mcp_settings.json` o en la configuración de Roo:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "c:/antigravity/aleia-reforma-ud"],
      "description": "Acceso al repo completo"
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "description": "Docs actualizadas de Next.js, Velite, Tailwind, shadcn, Vitest, Playwright"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "description": "Razonamiento multi-paso para arquitectura y debugging"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "description": "Browser real para verificar renders, hover-preview, splits"
    }
  }
}
```

**Prioridad de uso:**
- `filesystem` → siempre activo (leer/escribir archivos)
- `context7` → antes de tocar Velite, Next.js, shadcn, Vitest
- `playwright` → para verificar que el portal renderiza correctamente después de cambios
- `sequential-thinking` → decisiones arquitectónicas complejas (ADRs)

### 7.4 · Extensiones VS Code recomendadas

```json
// .vscode/extensions.json
{
  "recommendations": [
    "rooveterinaryinc.roo-cline",         // Roo Code (agente AI principal)
    "ms-vscode.vscode-typescript-next",    // TypeScript avanzado
    "bradlc.vscode-tailwindcss",           // Tailwind IntelliSense + hover
    "esbenp.prettier-vscode",              // Formateo consistente
    "dbaeumer.vscode-eslint",              // ESLint en tiempo real
    "unifiedjs.vscode-mdx",               // Soporte MDX con syntax highlight
    "ZixuanChen.vitest-explorer",          // Vitest runner en sidebar
    "ms-playwright.playwright",            // Playwright test runner + debug
    "mhutchie.git-graph",                  // Vista gráfica del historial git
    "eamodio.gitlens",                     // Blame inline + history
    "usernamehw.errorlens",                // Errores inline en código
    "antfu.vite",                          // Vite/Vitest config support
    "yoavbls.pretty-ts-errors"             // TypeScript errors legibles
  ]
}
```

### 7.5 · Archivos de contexto — leer en este orden

Para que Roo/Kimi comprenda el proyecto sin historia de conversación:

```
1. docs/audit/AUDIT-v8c-walkthrough-handoff.md   ← este documento
2. apps/portal-next/CLAUDE.md                     ← instrucciones del agente
3. apps/portal-next/src/lib/show-drafts.ts        ← lifecycle visibility
4. apps/portal-next/src/lib/mission-state.ts      ← lógica de misiones M01-M12
5. apps/portal-next/src/lib/cop-access.ts         ← nivel usuario en CoP
6. apps/portal-next/velite.config.ts              ← schemas de todas las colecciones
7. apps/portal-next/content/comunidades/gobierno/csu/index.mdx  ← ejemplo CoP con misiones
8. apps/portal-next/e2e/smoke.spec.ts             ← qué debe funcionar (v8 baseline)
```

### 7.6 · Pregunta de arranque recomendada para nuevo chat

> *"Lee `docs/audit/AUDIT-v8c-walkthrough-handoff.md` y explica lo que comprendes. Luego dime qué MCP necesito activar y qué extensiones de VS Code necesito, y pregúntame cómo deseas proceder para retomar el trabajo."*

---

## 8 · Decisiones arquitectónicas cristalizadas (no revertir)

| Decisión | Razón |
|---|---|
| Velite (no Fumadocs/Nextra) | UI custom multi-pane incompatible con frameworks opinados |
| `kd_status` como SSOT de visibilidad | Un campo en frontmatter = un commit = deploy automático |
| Glosario derivado (no manual) | Elimina configuración redundante y errores humanos |
| `draft` como campo computado | Backward-compat con código existente; no rompe consumers |
| Misiones CoP separadas de M01-M12 | Capas distintas: conocimiento global vs actividad contextual |
| `localStorage` para estado de usuario | Sin backend; portal público sin auth; suficiente para MVP |
| `NODE_ENV !== 'production'` en showDrafts | Previene exposición accidental de borradores en Vercel |
| `[[...slug]]` catch-all para misiones CoP | Reutiliza routing existente; detección por `misionesCoP.slug` match |

---

## 9 · Estructura de rutas activas

```
/                              → Home con widget misiones + resumen
/canonico/                     → Infografía onepager + Kanban M01-M12
/canonico/m01/ ... /m07/       → Papers PUBLISHED (m08-m12 → 404)
/canonico/grafo/               → Grafo global vis-network
/glosario/                     → Índice 183 conceptos
/glosario/con-*/               → Detalle de concepto con DV components
/mision/                       → Tracker secuencial M01-M07
/mision/m01/ ... /m07/         → Misión individual con comprehension
/comunidades/                  → Hub de todas las CoPs
/comunidades/gobierno/csu/     → CoP CSU con 6 misiones CoP
/comunidades/gobierno/csu/<slug>/  → Página individual de misión CoP
/comunidades/formacion/        → VR Formación
/cca/[role]/[paperId]/         → Constancia CCA ganada
```

---

## 10 · v9 en paralelo (NO tocar en este repo)

Existe un chat paralelo ejecutando **v9** (`aleia-portal-engine`):
- Nuevo repo con arquitectura Engine-as-package
- `packages/portal-engine/` — motor reutilizable
- `apps/reforma-ud/` + `apps/proyecto-2/` — instancias
- Nx (no Turborepo) para module boundaries

**Este repo (`aleia-reforma-ud`) está en feature freeze.** Solo bug fixes. Todo lo nuevo va a v9.

Ver: `docs/audit/AUDIT-v9-portal-reuso-multi-proyecto.md`

---

> **Versión:** v8c · 1.0.0 · 2026-04-29
> **Estado:** CLOSED — portal en producción, feature freeze activo
> **Continúa en:** v9 (`aleia-portal-engine`, chat paralelo)
