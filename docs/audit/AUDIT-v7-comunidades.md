---
kd_id: audit/v7-comunidades
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: active
kd_priority: P1
---

# AUDIT v7 — Comunidades full-stack + Noticias + Glosario contextual

> **Objetivo sprint v7**: convertir las páginas de comunidades en espacios de conocimiento vivos con definición, servicios, roles y misiones. Integrar el feed de actualidad (80-actualidad vault → content/feed/) como cuarto tipo de contenido.

---

## §1 · Gaps pendientes carryover (pre-v7)

### Desde AUDIT-v6-zone-diagnostic (cerrado con 13/15)

| Gap | Descripción | Decisión |
|---|---|---|
| **G-SBL-03** | Drag-reorder + new-doc inline sidebar | Diferido v8 — requiere API git-write server-side |
| **G-SVC-05** | GitHub API real para Evolución tab | Diferido v8 — requiere Octokit + caché |

### Desde AUDIT-v4.3-comunidad-participacion (parcialmente abierto)

| Gap | Descripción | Decisión v7 |
|---|---|---|
| **G-COM-01** | Comments inline en documentos | Diferido v8 — requiere backend (Firebase/Supabase) |
| **G-COM-02** | Threaded discussions / foro | v7.2 — placeholder "soon" activo en ServiceTiles |
| **G-COM-03** | Polls/encuestas | Diferido v8 |

### Desde AUDIT-P0-hover-preview (v6.5.1 — cerrado)

| Gap | Descripción | Decisión v7 |
|---|---|---|
| **G-HOVER-01** | RefsPanel items sin hover-preview | **v7.0 — implementar** (follow-up v6.6 ya documentado) |

---

## §2 · Modelo conceptual — Comunidad v7

### §2.1 · Anatomía de una Comunidad

Cada comunidad UDFJC (CoP) tiene 6 dimensiones:

```
COMUNIDAD
├── DEFINICIÓN          → concepto del glosario (su constitución SKOS)
├── SERVICIOS           → noticias + glosario + discusiones
├── MIEMBROS            → actores con roles en la comunidad  
├── HABILIDADES         → competencias/skills asociadas (glosario tags)
├── MISIONES INDIVIDUALES  → papers fundantes + comprehension tracker
└── MISIONES COLECTIVAS → objetivos grupales con progreso
```

### §2.2 · Jerarquía de roles (N1-N4)

Basado en `con-seis-roles-jtbd-comunidad-udfjc`:

| Nivel | Rol | Descripción | Acceso |
|---|---|---|---|
| N1 | Observador | Lee y explora sin compromiso | Noticias + Glosario |
| N2 | Practicante | Ejecuta misiones individuales | + Misiones individuales + Biblioteca |
| N3 | Experto | Lidera misiones colectivas | + Misiones colectivas + Foro |
| N4 | Mentor | Diseña nuevas misiones y roles | + Admin + Proponer nuevas misiones |

### §2.3 · Misiones colectivas vs individuales

- **Individual**: cada paper `M##` es una misión individual con comprehension questions (ya implementado en `/mision/[paperId]`). El progreso se mide por `reading-state` en localStorage.
- **Colectiva**: objetivos grupales que requieren N≥2 miembros activos. Tienen progreso% que suma las contribuciones individuales. Ejemplo: "Analizar los 13 papers del capítulo" → completo cuando todos los N3+ han leído y deliberado.

### §2.4 · Glosario contextual de la comunidad

Cada comunidad filtra el glosario por `glosarioTags`. Ejemplo:
- `gobierno` → tags: `['t1-normativo', 'con-csu', 'con-acu']`
- `formacion` → tags: `['t2-academico-teorico', 'con-area-formacion', 'con-cca']`

Esto permite que cada comunidad tenga "su propio glosario" sin duplicar contenido.

---

## §3 · Gaps v7 identificados

### G-V7-01 · Community data model incompleto (CRÍTICO)

**Problema**: community schema en `velite.config.ts` solo tiene `type, name, shortName, description, cites`. Faltan:
- `conceptoId` — link al concepto del glosario (la "constitución")
- `roles` — array de N1-N4 con nombre y descripción
- `misionesColectivas` — objetivos grupales con progreso
- `miembros` — actores con nombre y nivel
- `glosarioTags` — tags para filtrar glosario contextual

**Fix**: extender schema + actualizar 4 community index.mdx.

### G-V7-02 · Community page no muestra definición (CRÍTICO)

**Problema**: la página de comunidad no muestra el concepto del glosario que la define. El usuario no sabe qué ES la comunidad más allá de su `description` (1 línea).

**Fix**: componente `ComunidadDefinicion` que lee `conceptoId` y muestra primer párrafo + link "Ver concepto completo".

### G-V7-03 · ServiceTiles no incluye Noticias ni Glosario

**Problema**: los servicios actuales son biblioteca, grafo, foro, aprendizaje, proyectos, calendario. Faltan:
- `noticias` — feed centralizado (activo)
- `glosario` — glosario contextual de la comunidad (activo)
- `discusiones` — alias de `foro` (soon)

**Fix**: agregar 2 servicios activos a `services-registry.ts` + actualizar tiles.

### G-V7-04 · No hay sección de misiones colectivas

**Problema**: el `DashboardCop` muestra KPIs (P1-P4) y una lista de papers (misiones individuales implícitas). No hay visualización de objetivos colectivos con progreso.

**Fix**: componente `MisionesColectivas` con progress bars + estado por misión.

### G-V7-05 · No hay sección de roles/miembros

**Problema**: la comunidad no muestra quiénes participan ni qué nivel tienen. Actualmente `ComunidadPanel` (right panel) intenta mostrar co-autores pero es mock.

**Fix**: componente `RolesGrid` que muestra los N1-N4 definidos en frontmatter + miembros por nivel.

### G-V7-06 · RefsPanel items sin hover-preview (carryover v6.6)

**Problema**: documentado en AUDIT-P0-hover-preview §5. Cada `<RelationItem>` usa `<Link>` directo.

**Fix**: envolver con `<WikiLinkPreview>` cuando `id` es resoluble (`/^m\d{2}$/i` o `/^con-/`).

### G-V7-07 · Feed actualidad no integrado al portal

**Problema**: la carpeta `80-actualidad/` del vault está vacía. El portal tiene `content/feed/` con solo 3 noticias seed. No hay pipeline de sync.

**Fix v7.1**: `sync-actualidad.mjs` (gold-html-static) + colección Velite `Actualidad` + página `/actualidad/`.

### G-V7-08 · Comunidad page no tiene navegación interna con tabs

**Problema**: la página de comunidad es un scroll largo (dashboard → servicios → noticias → body). Sin tabs internos, el usuario no puede saltar a "Misiones" o "Glosario" directamente.

**Fix**: `ComunidadTabs` con 4 tabs: Inicio | Misiones | Glosario | Noticias.

---

## §4 · Diseño de pantalla — Community Page v7

```
┌─────────────────────────────────────────────────────────┐
│ NAV: Inicio › Comunidades › Gobierno                   │
├─────────────────────────────────────────────────────────┤
│ HERO                                                    │
│  [Tipo: Gobierno]  [4 miembros]  [2 misiones activas]   │
│  H1: Gobierno Universitario                             │
│  Órganos colegiados y direcciones de gobernanza...      │
│  [📚 Biblioteca] [🕸️ Grafo] [+ Publicar]               │
├─────────────────────────────────────────────────────────┤
│ DEFINICIÓN (de con-csu-udfjc en glosario)               │
│  > "El órgano de gobierno es el Consejo Superior..."    │
│  [Ver concepto completo →]                              │
├─────────────────────────────────────────────────────────┤
│ TABS: [Inicio] [Misiones] [Glosario] [Noticias]         │
│ ─────────────────────────────────────────────────────── │
│ TAB: INICIO                                             │
│  [DashboardCop KPIs: P1-P4]                             │
│  [ServiceTiles: Biblioteca✓ Grafo✓ Noticias✓            │
│                 Glosario✓ Discusiones⟳ Aprendizaje⟳]   │
│                                                         │
│ TAB: MISIONES                                           │
│  Misiones Individuales (papers M## del DashboardCop)    │
│  Misiones Colectivas:                                   │
│    MC-001 Analizar ACU 004-25 ████░░ 60%               │
│    MC-002 Benchmarking IES  ██░░░░ 30%                  │
│                                                         │
│ TAB: GLOSARIO                                           │
│  Conceptos de la comunidad (filtrado por glosarioTags)  │
│  [con-csu-udfjc] [con-acu-004-25] [con-autonomia]...    │
│                                                         │
│ TAB: NOTICIAS                                           │
│  [NoticiasRelacionadas grid]                            │
├─────────────────────────────────────────────────────────┤
│ ROLES Y MIEMBROS                                        │
│  N1 Observador N2 Practicante N3 Experto N4 Mentor      │
│  [Actor1: N2] [Actor2: N1]...                           │
├─────────────────────────────────────────────────────────┤
│ BODY MDX + RIGHT RAIL                                   │
│  (descripción larga)    | Fundado en:                   │
│                         | [M01] [M02] [M03]             │
└─────────────────────────────────────────────────────────┘
```

---

## §5 · Archivos afectados

### Nuevos

| Archivo | Descripción |
|---|---|
| `src/components/comunidad/comunidad-definicion.tsx` | Muestra concepto fundante de la comunidad |
| `src/components/comunidad/misiones-colectivas.tsx` | Progress bars de misiones colectivas |
| `src/components/comunidad/roles-grid.tsx` | Grid de roles N1-N4 y miembros |
| `src/components/comunidad/comunidad-tabs.tsx` | Tabs internos de la página comunidad |
| `src/components/comunidad/glosario-comunidad.tsx` | Glosario filtrado por tags de comunidad |

### Modificados

| Archivo | Cambio |
|---|---|
| `velite.config.ts` | +5 campos en Community schema |
| `content/comunidades/*/index.mdx` (×4) | +conceptoId, roles, misionesColectivas, miembros, glosarioTags |
| `src/lib/services-registry.ts` | +noticias, +glosario como servicios activos |
| `src/app/comunidades/[[...slug]]/page.tsx` | Nuevas secciones + ComunidadTabs |
| `src/components/biblioteca/refs-panel.tsx` | G-V7-06: hover-preview en RelationItem |

---

## §6 · Sprints

### v7.0 — Community foundation (este sprint)
- G-V7-01: Schema Velite + 4 index.mdx actualizados
- G-V7-02: ComunidadDefinicion
- G-V7-03: ServiceTiles + noticias/glosario
- G-V7-04: MisionesColectivas
- G-V7-05: RolesGrid
- G-V7-06: RefsPanel hover-preview
- G-V7-08: ComunidadTabs

### v7.1 — Noticias actualidad
- G-V7-07: sync-actualidad.mjs + colección Velite Actualidad + página /actualidad/
- Actualizar NoticiasRelacionadas para leer de `actualidad` collection

### v7.2 — Discusiones (CERRADO 2026-04-28 — giscus)
- ✅ Decisión: **giscus** (zero-infra, GitHub Discussions backend)
- ✅ Repo Discussions habilitado en `ccolombia-ui/reforma-ud`
- ✅ Categoría General · `repoId=R_kgDOSL4ryQ` · `categoryId=DIC_kwDOSL4ryc4C75AG`
- ✅ Componente `<Discusiones term=...>` integrado en:
  - `/canonico/[mid]/` (paper) — term `paper:m##`
  - `/glosario/[conceptoId]/` (concepto) — term `concepto:con-*`
  - `/comunidades/[[...slug]]/` (CoP) — term `comunidad:<slug>`
- ✅ Theme dark/light auto-detect via MutationObserver en `<html class>`
- ✅ services-registry: `foro` → `status: 'active'`, href `/<cop>#discusiones`

**Setup precondición** (ya completada): `gh repo edit --enable-discussions`

**Por qué giscus**:
- Zero backend (no Supabase, no auth own-built)
- Auth via GitHub (los usuarios target ya tienen cuenta)
- Markdown nativo, reacciones, threading
- Open source, dropin component vía `@giscus/react`
- Theme dynamic match con el portal

**Limitación conocida**: requiere cuenta GitHub para comentar. Los lectores anónimos pueden leer pero no participar. Aceptable para MVP académico/institucional.

### v7.3 — ComunidadTabs (G-V7-08) + scroll-spy (próximo)
- Tabs internos: Inicio | Misiones | Glosario | Noticias | Discusiones
- Scroll-spy con IntersectionObserver
- Anchor URLs estables: `/comunidades/gobierno#misiones`

### v7.4 — Usability gaps (CERRADO 2026-04-28)
- ✅ **G02 skeleton states**: loading.tsx para `/glosario/[conceptoId]` y `/comunidades/[[...slug]]` (los de canonico ya existían)
- ✅ **G11 deep-link al heading**: componente `<HeadingScrollSpy>` cliente que (a) hace smooth-scroll al hash al montar con retry hasta 20× para esperar contenido async (mermaid/MDX), (b) intercepta clicks en `a[href^="#"]` para smooth-scroll + `history.replaceState`, (c) click en heading copia URL al clipboard con flash visual `.heading-flash`. Aplicado a paper y concepto.
- ✅ **G07 print improvements**: `@media print` ampliado para ocultar giscus iframe, tabs sticky de comunidad, botones de hover-card. CSS `cursor: pointer` y `🔗` hover en headings se desactivan durante print. `page-break-before: auto` en secciones mayores `#misiones-colectivas`, `#glosario`, `#noticias`, `#roles`.

### v7.5 — A11y AAA + Telemetry
- G09 a11y AAA compliance
- G20 telemetry mejor (ya hay Vercel Analytics)

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-28*
