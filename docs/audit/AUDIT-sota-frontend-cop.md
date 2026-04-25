# AUDIT — SOTA Frontend 2026 para Portal de Comunidades de Práctica

**Proyecto**: `aleia-reforma-ud` · `apps/portal-next` · **Fecha**: 2026-04-24
**Stack base verificado** (`apps/portal-next/package.json`): `next@16.2.4`, `react@19.2.4`, `tailwindcss@4`, `shadcn@4.4`, `radix-ui@1.4`, `cmdk@1.1`, `sonner@2`, `lucide-react@1.11`, `@tanstack/react-table@8.21`, `velite@0.3`, `pagefind@1.5`, `ai@6` + `@ai-sdk/anthropic@3`, `mermaid@11`, `katex@0.16`, `vitest@4`, `@playwright/test@1.59`, ESLint 9, pnpm.

> **Honestidad**: solo cito URLs canónicas que conozco con certeza. Dudas marcadas `[verificar]`.

---

## 1. Componentes UI SOTA 2026 para CoPs

### 1.1 Feed / Timeline
**`@tanstack/react-virtual`** v3 — https://tanstack.com/virtual. Headless, soporta dynamic size, mide DOM real, integra natural con RSC ("use client" recibe array completo del Server Component y solo virtualiza render). Alternativa: **`virtua`** (https://github.com/inokawa/virtua) con `<WindowVirtualizer>` que aprovecha scroll de página (clave para feeds Twitter-style sin scroll interno).
**Activity Card**: discriminator `type: 'post'|'comment'|'reaction'|'badge_earned'|'event_rsvp'` + switch exhaustivo. Skeletons con shadcn `Skeleton` + `tw-animate-css` (ya tienes). Empty state SVG + CTA. Errores: `error.tsx` por segmento (Next 16 nativo).

### 1.2 Comentarios anidados
`@vercel/comments` **no existe como paquete oficial** `[verificar]`. Reales:
- **`liveblocks/react-comments`** — https://liveblocks.io/comments. Threading + presence + resolved nativos. Backend gestionado, freemium.
- **DIY headless** sobre tu store: árbol recursivo + shadcn. Mentions con `@tiptap/extension-mention` (popover via tippy.js). Reactions: **`frimousse`** (https://frimousse.liveblocks.io) — picker emoji headless 2025/26, alternativa moderna a `emoji-mart`.

### 1.3 Calendario y eventos
1. **`@fullcalendar/react`** (https://fullcalendar.io) — más completo. Core MIT; Timeline/Resource son **premium**. Para CoP académica con vistas estándar, MIT alcanza.
2. **`react-big-calendar`** (https://github.com/jquense/react-big-calendar) — MIT puro, simple, sin timeline.
3. **`schedule-x`** (https://schedule-x.dev) — moderno, MIT, mi favorito greenfield 2026 `[verificar]` madurez React.

Recurrencia: **`rrule`** (RFC 5545) en el modelo, no en UI. RSVP: botón `Going/Maybe/No` + `useOptimistic` + Server Action.

### 1.4 Polls y votación
- Single/Multi: radix `RadioGroup`/`Checkbox` + barra animada con **`motion`** (https://motion.dev, ex framer-motion v12+).
- Ranked/Quadratic: **`@dnd-kit`** (https://dndkit.com) — SOTA accesible, reemplaza `react-beautiful-dnd` (deprecado 2022).
- Resultados live: **`recharts`** (default React) o **`visx`** (Airbnb, D3 tipado).
- Referencias UX: **Loomio** (deliberación), **Decidim** (votación participativa OSS), **Pol.is** (clustering opiniones).

### 1.5 Members directory
Avatar grid con `@tanstack/react-virtual` (soporta 2D desde v3). Buscador: ya tienes `cmdk` — usa fuzzy con **`fuzzysort`** o `fuse.js`. Profile peek: radix `HoverCard` (delay 300ms); móvil → `Sheet` o ruta dedicada.

### 1.6 Notificaciones
Ya tienes `sonner@2` (SOTA, supera `react-hot-toast` y `react-toastify` deprecado). Centro de notificaciones: shadcn `Sheet` + lista virtualizada + tabs. Badge contador sobre `<Bell />` lucide. Inbox SaaS opcional: **Novu** (https://novu.co, OSS) o **Knock** (https://knock.app, comercial pulido) si quieres email + in-app + push unificados.

### 1.7 Direct messages
Patrón thread + composer: shadcn `ScrollArea` + virtualización inversa + composer tiptap o `react-textarea-autosize`. Realtime/presence: requiere backend (§2.4). Battle-tested: **Stream Chat React** (https://getstream.io/chat/sdk/react/) — SDK completo de pago, ahorra meses si presupuesto.

### 1.8 File uploads y galería
- **`react-dropzone`** (https://react-dropzone.js.org) — default headless.
- **`Uppy`** (https://uppy.io) — resumable, tus, S3 directo, Drive picker.
- **`@vercel/blob`** (https://vercel.com/docs/storage/vercel-blob) — Vercel-native, signed uploads.
- **UploadThing** (https://uploadthing.com) — DX excelente para Next, type-safe e2e.
- **Lightbox**: **`yet-another-react-lightbox`** (https://yet-another-react-lightbox.com) — accesible, plugins zoom/slideshow/video. **Recomendación**.

### 1.9 Rich text editor

| Editor | Modelo | AI/Mentions/Slash | Veredicto CoP |
|---|---|---|---|
| **Tiptap v3** (https://tiptap.dev) | ProseMirror | ext oficial mention; `@tiptap/extension-ai` `[verificar premium]`; Yjs colab | **Ganador** modular MIT |
| **Lexical** (https://lexical.dev) | Meta propio | typeahead plugin; DIY AI; `@lexical/yjs` | Performance top, API áspera |
| **BlockNote** (https://blocknotejs.org) | wrapper sobre Tiptap | nativo Notion-like; `@blocknote/xl-ai` | **Atajo** Notion-grade rápido |
| **Plate** (https://platejs.org) | Slate + plugins | completo Notion-clone | Curva alta |
| **Slate** (https://slatejs.org) | Slate | DIY todo | Solo control total |
| **Editor.js** | bloques propios | DX inferior | **Out 2026** |

**Recomendación reforma-ud**: BlockNote (rápido) o Tiptap (control fino). Lexical solo si docs >10k bloques.

### 1.10 Tablas avanzadas
Ya tienes `@tanstack/react-table@8` (headless correcto). Combina con `@tanstack/react-virtual` (mismo autor). Resize/pin/order/group/expand: nativo v8. Reordenar: `dnd-kit`. Pivot enterprise tipo Excel: **AG Grid Community** (https://www.ag-grid.com) MIT; Enterprise pago.

---

## 2. Patrones UX SOTA 2026

### 2.1 Linear-grade
⌘K omnipresente (ya tienes cmdk) **contextual** según `pathname` + búsqueda federada (páginas + miembros + posts + acciones). Hotkeys: **`react-hotkeys-hook`** (https://react-hotkeys-hook.vercel.app) + cheatsheet con `?` (Linear convention). Hover-reveal: Tailwind v4 `group/<name>` + `opacity-0 group-hover/item:opacity-100`. Optimistic: `useOptimistic` (§4.3).

### 2.2 Notion-grade data views
Schema `View = { type: 'table'|'gallery'|'board'|'timeline'|'calendar', filters, sort, groupBy }`, un componente por tipo. Filtros persistentes URL: **`nuqs`** (https://nuqs.47ng.com) — type-safe URL state Next 16. Pivot: `getGroupedRowModel` + `getExpandedRowModel`.

### 2.3 Discord/Slack
- **Sidebar canales**: shadcn `Sidebar` (componente nuevo shadcn 2024-25, ya viene con tu shadcn 4) — collapsible, persistent.
- **Threads**: route segment `/c/[channel]/t/[thread]` con parallel routes para no perder canal.
- **Presence**: Liveblocks/Supabase/Pusher. Sin backend → poll `last_seen_at` 30s.
- **Reactions on hover**: `HoverCard` + grid `frimousse` + Server Action.

### 2.4 Realtime / presence
- **Pusher Channels** (https://pusher.com) — pionero simple pago.
- **Ably** (https://ably.com) — SLA fuerte.
- **Supabase Realtime** (https://supabase.com/realtime) — pub/sub + Postgres CDC + presence si ya usas Supabase.
- **Liveblocks** (https://liveblocks.io) — highest-level: presence + broadcast + comments + Yjs out-of-the-box.
- **Upstash Redis** + WebSockets/SSE — DIY Edge-friendly. "Vercel KV" se renombró probablemente a "Vercel Redis powered by Upstash" en 2024-25 `[verificar]`.

**¿Realtime con Vercel Edge + Upstash?** Sí: SSE (más simple, unidireccional, suficiente para feed/notifs). Edge tiene timeouts; conexiones largas → Upstash QStash o Cloudflare Durable Object. Para portal **estático puro** no hay realtime — necesitas endpoint dinámico aparte.

### 2.5 Gamification
- XP/streaks: modelo en BD + UI con `motion` + **`canvas-confetti`** (https://github.com/catdad/canvas-confetti) en milestones.
- **Open Badges 3.0** (https://www.imsglobal.org/spec/ob/v3p0) — 1EdTech, W3C VC, badges portables verificables. **Clave** para CoP académica.
- Leaderboards: tabla simple + `LiveRegion` ARIA.
- **No-cringe académico**: lenguaje del dominio ("Mentor", "Curador CoP X"), no "Power User Pro Master". Inspírate Stack Overflow (badges sobrios), GitHub (achievements discretos), Duolingo (streaks suaves).

---

## 3. Stack SOTA 2026 completo

| Capa | Tecnología 2026 | Razón | Integración Next 16 |
|---|---|---|---|
| Framework | Next.js 16 | RSC + Turbopack | base |
| React | 19 | useOptimistic, Actions | base |
| CSS | Tailwind v4 (Oxide Rust) | `@theme` sin JS config | base |
| UI | radix + shadcn 4 | accesible, copy-paste | base |
| Iconos | lucide-react | tree-shake | base |
| Toasts | sonner | SOTA | base |
| Tabla | @tanstack/react-table 8 | headless | base |
| **Virtual** | @tanstack/react-virtual 3 | mismo autor table | **añadir** |
| **Animación** | motion (ex framer-motion v12+) | layout animations | **añadir** |
| **DnD** | @dnd-kit 6 | accesible, reemplaza rbd | **añadir** |
| **Form** | react-hook-form 7 + zod 4 | type-safe + Server Actions | **añadir** |
| **URL state** | nuqs 2 | filtros persistentes | **añadir** |
| **Editor** | tiptap 3 / blocknote | Notion-grade | **añadir** |
| **Hotkeys** | react-hotkeys-hook 4 | ⌘? cheatsheet | **añadir** |
| **Charts** | recharts / visx | recharts simple, visx fino | **añadir** |
| Auth | **Auth.js v5** OSS, **Clerk** DX, **WorkOS AuthKit** SSO/SAML universidad, **Supabase Auth** si ya Supabase | según contexto | App Router + Server Actions |
| Realtime | Liveblocks / Supabase Realtime / Ably | ver §2.4 | Edge OK |
| DB | **Postgres + Drizzle** Edge-compat type-safe; **Neon** (https://neon.tech) serverless+branching; **Turso** (https://turso.tech) libSQL distribuido; **Supabase** (https://supabase.com) all-in-one | — | Server Actions / RSC |
| Cache | Upstash Redis | KV/Stream Edge | `unstable_cache` |
| Storage | Vercel Blob / Cloudflare R2 ($0 egress) / Supabase Storage | — | nativo / SDK S3 |
| Email | **Resend** (https://resend.com) + **react-email** | API limpia, templates JSX | Server Actions |
| | Loops (https://loops.so) lifecycle | — | webhook |
| Analytics | Vercel Analytics + Speed Insights / **PostHog** (https://posthog.com) — product analytics + flags + replay | — | nativo / SDK |
| Flags | Vercel Toolbar + `@vercel/flags` / Statsig (https://statsig.com) | — | Edge |
| Observability | **Sentry 8** errores+traces+replay; Highlight.io OSS replay; Vercel Observability nativo | — | nativo plugin |
| Search | **Pagefind 1.5** estático ya tienes; Typesense/Meilisearch/Algolia si dinámico | — | base |
| i18n | **next-intl** (https://next-intl.dev) v4 App Router-first | type-safe | nativo |
| Test | Vitest + Playwright + MSW | ya tienes | base |

---

## 4. Patrones de arquitectura

### 4.1 RSC + Server Actions vs API Routes
- **RSC** → leer datos (default, sin "use client").
- **Server Action** (`"use server"`) → mutaciones; soporta `useFormStatus`, `useOptimistic`, progressive enhancement. Reemplaza ~80% de API routes.
- **Route Handler** (`app/api/.../route.ts`) → endpoints públicos, webhooks (Stripe, Resend), file streaming, OG, RSS, robots.
- **Streaming**: `<Suspense fallback>` + `loading.tsx` por segmento. React 19 + Server Actions stream UI vía `useActionState`.

### 4.2 Static export vs hybrid
- **Static** (`output: 'export'`): perfecto handbook (Velite + Pagefind). Cero runtime, CDN puro.
- **Hybrid**: necesario en cuanto haya auth/comments/RSVP/DM/realtime/uploads. **No hay social puramente estático**.
- **Cuándo migrar**: en la primera mutación per-user. Mantén handbook estático (`force-static`) y mete features sociales en rutas dinámicas (`force-dynamic`) **en el mismo deploy**. No full hybrid prematuro.

### 4.3 Optimistic UI + revalidation
```tsx
async function likePost(id: string) {
  "use server";
  await db.like.create({ data: { postId: id } });
  revalidateTag(`post:${id}`);
}
const [optimistic, addOptimistic] = useOptimistic(likes, (s, n) => s + n);
```
`revalidateTag` > `revalidatePath` cuando puedas etiquetar fetch (`fetch(url, { next: { tags: ['post:123'] } })`). Combina con `useTransition` para `isPending` UI. **`unstable_after`** (estable Next 16 `[verificar]`) para tareas post-respuesta sin bloquear render.

### 4.4 Edge vs Node

| | Edge | Node |
|---|---|---|
| Cold start | ~0ms | 100-500ms |
| Distribución | global | por región |
| `fs`, crypto Node, sharp, prisma engine | No | Sí |
| WS/SSE largos | limitado | limitado timeout |
| Bueno para | auth check, A/B, geo, redirects, fetch simple, middleware | OG ImageResponse, libs Node-only, processing |

**Default Node**; Edge cuando midas latencia internacional alta. Para CoP latam Edge importa menos.

---

## 5. 10 community apps inspiración 2026

| App | URL | Adoptar |
|---|---|---|
| Notion Teamspaces | https://notion.so | view switcher (table/board/gallery/timeline) + mentions globales `@` |
| **Linear** | https://linear.app | **Estándar de oro UX**: ⌘K, atajos, optimismo, hover-actions, sin spinners |
| Discord | https://discord.com | sidebar canales por CoP, reactions hover, invite links, threads |
| Slack | https://slack.com | slash commands en composer, threads pegajosos por post |
| Discourse | https://discourse.org | trust levels (lurker→contributor→mentor), digest diarios email |
| Circle.so | https://circle.so | curaduría visual, tarjetas espacios |
| Bettermode (ex Tribe) | https://bettermode.com | widgets embebibles para webs facultades |
| Geneva | https://geneva.com | UX móvil sin compromisos, DM/voz/foro/calendar unificado |
| Fiveable | https://fiveable.me | sesiones estudio agendadas, CoP por curso (académica) |
| Loomio | https://loomio.com | gobernanza CoP: propuestas → discusión → decisión con tipos voto |

Bonus: **Bluesky** (AT Protocol feeds personalizables), **Mighty Networks** (cohorts), **Lu.ma** (eventos).

---

## 6. NO recomendado en 2026

- **Material UI v5/v6** — pesado >300KB gz, pelea con Tailwind. **Out**.
- **Bootstrap / reactstrap** — out hace años.
- **Chakra UI v2** — v3 cambió todo, shadcn ganó. **Out**.
- **Ant Design** — corporativo, no shadcn-friendly.
- **Redux clásico** — out. Usa **Zustand** (https://zustand-demo.pmnd.rs) o **Jotai** (https://jotai.org) cliente, RSC + Server Actions servidor. RTK solo si ya lo tienes.
- **jQuery, Moment.js** (deprecado por sus mantenedores → date-fns v4 / dayjs / Temporal), **Lodash entero** (solo `lodash-es` o nativos ES2023+), **Axios** (`fetch` global cubre todo en 2026).
- **react-beautiful-dnd** — deprecado 2022. → dnd-kit.
- **react-toastify, react-hot-toast** — superados por sonner.
- **Storybook 7** → Storybook 9 o **Ladle** (https://ladle.dev, by Vercel) más liviano.
- **CRA** — deprecated oficialmente React team 2025. → Next / Vite+RR / Remix.
- **Pages Router Next** — legado. → App Router.
- **getStaticProps / getServerSideProps** — out. → RSC + Server Actions.
- **CSS-in-JS runtime** (styled-components anunció maintenance-mode 2024, Emotion) — incompatibles RSC sin trucos. → Tailwind v4 / CSS Modules.
- **Yarn classic / npm** monorepos — → pnpm (ya usas) o bun.
- **ESLint legacy `.eslintrc`** — flat config (`eslint.config.js`) estándar ESLint 9 (ya tienes).

---

## 7. Roadmap para `reforma-ud`

Stack actual sólido. Prioridades:

### 7.1 TOP 5 — añadir YA (sprint 1, ~3 días)

| # | Añadir | Esfuerzo | Por qué urgente |
|---|---|---|---|
| 1 | **`@tanstack/react-virtual`** | 0.5d | Cualquier listado >200 items sufre sin virtualización. Trivial añadir |
| 2 | **`motion`** (ex framer-motion v12+) | 0.5d | Microinteracciones (sheet, list reorder, optimistic add). Sube percepción calidad inmediato |
| 3 | **`react-hook-form` + `zod`** | 1d | Forms type-safe + integración Server Actions. Imprescindible |
| 4 | **`nuqs`** | 0.5d | Filtros y vistas persistentes URL. Necesario en cuanto haya listados con filtros |
| 5 | **`react-hotkeys-hook` + cheatsheet ⌘?** | 0.5d | Linear-grade DX |

### 7.2 TOP 5 — sprint 2

| # | Añadir | Esfuerzo |
|---|---|---|
| 1 | `@dnd-kit/core` (kanban, polls ranked) | 1-2d |
| 2 | `tiptap` v3 o BlockNote (composer + mentions + slash) | 2-3d |
| 3 | **Auth.js v5** o **WorkOS** si UD exige SAML | 2-3d |
| 4 | **Postgres + Drizzle (Neon)** primera mutación | 2d |
| 5 | `@vercel/blob` + `yet-another-react-lightbox` | 1-2d |

### 7.3 TOP 5 — sprint 3+

1. **Realtime** (Liveblocks / Supabase) cuando >50 users concurrentes.
2. **Notification center** (Novu/DIY) tras 3+ tipos.
3. **Charts** (recharts/visx) cuando aparezcan dashboards CoP (engagement, leaderboard).
4. **Sentry** antes de salir beta.
5. **PostHog** (analytics + flags + replay) en product-market fit; flags útiles desde día 1 si A/B.

### 7.4 Decisiones arquitectónicas pendientes

1. **Static vs hybrid**: mantener `apps/portal-next` parcialmente estático para handbook + Velite, crear sub-segmento `/comunidades/[id]/...` dinámico cuando llegue auth. **Una app, dos modos**.
2. **Auth**: WorkOS si UD exige SSO/SAML institucional · Clerk si quieres DX premium + UI lista · Auth.js v5 si OSS y control.
3. **Realtime**: Supabase Realtime si DB también Supabase (un proveedor) · Liveblocks si DB Neon/Turso (no acopla DB).
4. **Editor**: BlockNote para llegar rápido a Notion-like · Tiptap si quieres extensiones propias (bloques cita APA, embebidos Mermaid/KaTeX que ya tienes en Velite).

### 7.5 Anti-patrones específicos `reforma-ud`

- No introducir CSS-in-JS runtime (rompe RSC).
- No mezclar `pages/` y `app/`.
- No instalar Material UI/Chakra "para una pantalla" — fragmentaría el sistema.
- No `setInterval` polling >5s en producción; o SSE/WebSocket bien o difiere la feature.
- No commitear artefactos build de Pagefind; `.gitignore`.
- No mezclar Velite con `next-mdx-remote` runtime; Velite ya da AST procesado, evita doble pipeline.

---

## Apéndice — Verificaciones honestas `[verificar]`

Antes de añadir al `package.json`, validar con `npm view <pkg> version` o homepage:
1. Versión exacta `schedule-x` y madurez React 2026.
2. Nombre actual "Vercel KV" (probablemente "Vercel Redis powered by Upstash" desde 2024-25).
3. Existencia `@vercel/comments` como paquete oficial — **dudoso**, no confirmado.
4. Estado `@tiptap/extension-ai` (¿libre o Tiptap Cloud premium?).
5. Versión vigente `motion` (v12 o v13).
6. Estabilidad exacta de Next 16 `unstable_after`.

**Mapping MEMORY**: este audit habilita features sociales que V1-V5 (Soberanía/Emprendimiento/Participación/Ética/Austeridad) de M04 Track B JTBD demandan. Documento **interno** (`/docs/audit/`), no publicable — cumple regla "papers sin refs internas".

**FIN**
