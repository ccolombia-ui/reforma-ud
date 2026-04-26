# AUDIT — Top 20 Usability Gaps · `reforma-ud.vercel.app`

> Next.js 16 · React 19 · Tailwind v4 · shadcn · Velite/MDX · vis-network + react-force-graph-3d
> Fecha: 2026-04-25 · Alcance: S+1 + S+2 (header, sidebars, /canonico, /comunidades, /mision, AI)

---

## Estado actual

- **Densidad funcional alta, percepción de cambio baja.** El portal ya tiene cmdk, split-work-area, grafo 3D, mission tracker, AI con dos modelos y CCA imprimible — pero el flujo "click → ver progreso" no comunica suficientemente que algo nuevo pasó (no hay micro-feedback ni "What's new"). De ahí el "no veo los cambios".
- **Sidebar izquierdo está cerca pero no es Obsidian-grade.** Resizable + persistencia OK, pero el contenido scrollea mal (bug de flex), los filtros del grafo viven fuera del sidebar (acoplados al canvas) y faltan secciones expandibles densas tipo file-tree de Obsidian.
- **Right sidebar 4-tab bien concebido, mal balanceado.** Outline/Refs/Preg/Chat conviven sin estado de "tienes pendientes aquí" — no hay badges con contador, ni indicador de actividad nueva en Chat o Preg.
- **Performance percibida sin colchón.** Skeletons casi ausentes en /canonico/[mid] y /canonico/grafo (peso > 500 KB JS por el 3D). LCP cae en mobile y en cold-start de Vercel.
- **Trabajo Obsidian-like incompleto.** Tabs simples están, pero faltan: close-others, drag-reorder, keyboard nav (Ctrl+Tab/Ctrl+W), overflow scroll, pin. Hover-preview existe pero embed-nesting no.

---

## Top 5 ganancias rápidas (todas S, ROI alto)

1. **G01** — Fix scroll del sidebar izquierdo (flexbox `min-h-0` + `shrink-0` en hijos)
2. **G05** — Skeleton + fade-in en /canonico/[mid] y /canonico/grafo
3. **G07** — Badges con contador en tabs del right-panel (Refs, Preg, Chat)
4. **G09** — Indicador "What's new" / changelog drawer disparado por versión en localStorage
5. **G14** — Tooltips con atajos en header + drag-handle (descubribilidad)

---

## G01 · Sidebar izquierdo no scrollea aunque muestre scrollbars

- **Síntoma**: la barra vertical aparece en el sidebar pero el contenido no se mueve; el `SidebarMissionsWidget` y la lista de comunidades quedan cortados sin poder llegar al footer ni a los nodos hoja.
- **Causa raíz**: en `components/layout/sidebar.tsx` el `<nav>` es `flex-col` pero `SidebarMissionsWidget` y el footer no tienen `shrink-0`. El widget de misiones puede crecer y "comer" el `flex-1 min-h-0` del div interior; además el widget en sí mismo puede contener overflow propio que rompe la cadena de altura. En Tailwind v4 `flex-1` por defecto incluye `min-h-0`, pero si un ancestro tiene `overflow-hidden` y un hermano no es `shrink-0`, el cálculo se rompe.
- **Fix recomendado**: envolver `<SidebarMissionsWidget />` y el footer en `<div className="shrink-0">`; verificar que el widget interno no tenga `overflow-y-auto` (debe scrollear el contenedor padre, no el widget). Reemplazar `flex-1 min-h-0` por `flex-1 basis-0 min-h-0 overflow-y-auto` explícito y eliminar `overflow-hidden` del `<nav>` (mantenerlo sólo cuando `dragging`).
- **Esfuerzo**: S
- **Testing**: baja (resize manual, devtools layout panel, Playwright scroll-to-bottom).

---

## G02 · Filtros del grafo 3D viven en el canvas, no en el sidebar global

- **Síntoma**: el usuario espera que los filtros del grafo (fase, tipo, profundidad) estén en el sidebar izquierdo bajo "Grafo global" — Obsidian-style — pero hoy están dentro del área de trabajo (panel izq de `/canonico/grafo`), duplicando affordance.
- **Causa raíz**: `graph-3d.tsx` define un layout 3-paneles internamente; los filtros son state local del componente, no expuestos a un `useGraphFilters` zustand store ni renderizados desde el sidebar global.
- **Fix recomendado**: extraer filtros a un store (`lib/graph-filters-state.ts` con zustand + persist). Renderizar `<GraphFiltersPanel />` colapsable bajo "Grafo global" en `sidebar.tsx`. El canvas central queda full-width; el panel detalle de nodo (derecho) puede moverse al `right-panel.tsx` como nueva tab "Nodo". Sólo mostrar en sidebar cuando `pathname === '/canonico/grafo'`.
- **Esfuerzo**: M
- **Testing**: media (verificar persistencia de filtros, sincronización entre 2D y 3D, no romper detalle de nodo).

---

## G03 · No hay feedback de "deploy nuevo" — el usuario duda si los cambios están vivos

- **Síntoma**: el usuario dice "no veo los cambios" tras un deploy. No hay señal visual de versión actualizada ni de qué cambió.
- **Causa raíz**: el footer del sidebar muestra `v3.2` pero estático (string hard-coded). No hay comparación contra la versión que el usuario vio por última vez.
- **Fix recomendado**: en build, escribir `public/version.json` con `{commit, date, summary}`. En cliente, comparar contra `localStorage["reforma-ud:last-seen-version"]` y, si difiere, mostrar un toast persistente o un dot rojo en el avatar del header con un drawer "Novedades" listando los últimos 5 cambios. Usar `next.config.ts` `generateBuildId` para garantizar unicidad.
- **Esfuerzo**: S
- **Testing**: baja (probar bumping manual del version.json + reload).

---

## G04 · Right-panel sin badges de actividad pendiente

- **Síntoma**: las tabs Refs/Preg/Chat lucen idénticas aunque haya 3 backlinks nuevos, 2 preguntas sin responder o un mensaje del agente en streaming.
- **Causa raíz**: `right-panel.tsx` renderiza tabs como `<button>` simples sin contador ni indicador.
- **Fix recomendado**: añadir prop `count?: number` y `pulse?: boolean` a cada tab; renderizar `<Badge variant="secondary">N</Badge>` cuando `count > 0` y un dot animado `animate-pulse bg-primary` cuando `pulse`. Para Chat, marcar pulse mientras streaming; para Preg, count = preguntas pendientes del paper actual.
- **Esfuerzo**: S
- **Testing**: baja.

---

## G05 · Skeletons faltantes en /canonico/[mid] y /canonico/grafo

- **Síntoma**: pantalla blanca o "salto" del layout cuando carga MDX pesado o el bundle del grafo 3D (~500 KB).
- **Causa raíz**: rutas server con `loading.tsx` ausente o genérico. Sin `Suspense` en `<Graph3D />` y sin `<MdxSkeleton />` para el cuerpo.
- **Fix recomendado**: crear `app/canonico/[mid]/loading.tsx` con un skeleton TOC + 6 párrafos animados (`bg-muted/50 animate-pulse`); `app/canonico/grafo/loading.tsx` con un canvas placeholder + filtros en gris. Envolver `<Graph3D />` en `<Suspense>` con `dynamic(..., { ssr: false, loading: ... })`.
- **Esfuerzo**: S
- **Testing**: baja (throttle Slow 3G en devtools).

---

## G06 · Mobile: sidebar no es drawer, simplemente desaparece

- **Síntoma**: en viewport `< md` no hay forma de acceder al árbol de comunidades ni a las misiones; el contenido principal ocupa el 100% pero el usuario pierde navegación.
- **Causa raíz**: `sidebar.tsx` usa `hidden md:flex`. No existe estado `mobileOpen` ni botón hamburguesa en `header.tsx`.
- **Fix recomendado**: añadir botón hamburguesa en header (visible `md:hidden`) que abra un `<Sheet>` (shadcn) reutilizando `<Sidebar />` como contenido. Al navegar, cerrar automáticamente. Usar `useMediaQuery('(min-width: 768px)')` para evitar SSR mismatch.
- **Esfuerzo**: M
- **Testing**: media (Playwright mobile viewport, swipe gestures opcionales).

---

## G07 · Wikilinks rotos invisibles — fallan silencio

- **Síntoma**: si un MDX referencia `[[m13-no-existe]]` o un anchor inexistente, el link se pinta normal y al click va a 404 o no hace nada.
- **Causa raíz**: el plugin remark de wikilinks no valida contra el set de slugs canónico. No hay clase `.broken-link`.
- **Fix recomendado**: en `velite.config.ts`, en el remark plugin de wikilinks, comparar contra `Set<string>(canonicPaper.map(p => p.slug))`. Si no existe, renderizar `<span className="border-b border-dashed border-destructive/60 text-destructive/80" title="Link roto">{text}</span>`. En dev, console.warn con la lista de huérfanos.
- **Esfuerzo**: M
- **Testing**: media (snapshot test de un MDX con un link roto deliberado).

---

## G08 · Tabs simples sin keyboard nav ni close-others

- **Síntoma**: los tabs Obsidian-style del SplitWorkArea no responden a Ctrl+Tab, Ctrl+W, ni a click-derecho con menú contextual.
- **Causa raíz**: implementación minimal, sin handlers de teclado globales ni context-menu.
- **Fix recomendado**: añadir `useHotkeys` (o listener en mount) para `Ctrl+Tab` (siguiente tab), `Ctrl+Shift+Tab` (anterior), `Ctrl+W` (cerrar activa). Click-derecho abre `<DropdownMenu>` con: Cerrar, Cerrar otras, Cerrar a la derecha, Pin, Duplicar. Pin renderizado con icono y resistente a "Cerrar otras".
- **Esfuerzo**: M
- **Testing**: media (Playwright keyboard, y context-menu).

---

## G09 · Discoverability — atajos invisibles, cmdk subutilizada

- **Síntoma**: muchos usuarios nunca abren cmdk porque no saben que existe. El header sólo muestra un icono lupa pequeño.
- **Causa raíz**: ausencia de pista visual del atajo (`Ctrl+K`/`Cmd+K`) en el botón de búsqueda; tooltips inconsistentes.
- **Fix recomendado**: en el botón de búsqueda del header, mostrar `<kbd>⌘K</kbd>` a la derecha (o `Ctrl+K` en Win — detectar `navigator.platform`). Añadir tooltips uniformes con shadcn `<Tooltip>` a todos los iconos del header (theme, profile, github). En cmdk, primer "section" debe ser "Atajos" con los 5 más útiles.
- **Esfuerzo**: S
- **Testing**: baja.

---

## G10 · Estado vacío anémico en /comunidades/[slug] sin contenido

- **Síntoma**: al entrar en una comunidad sin misiones ni recursos, se ve una página casi vacía sin guía.
- **Causa raíz**: la plantilla devuelve secciones condicionalmente vacías sin un componente `<EmptyState>` con CTA.
- **Fix recomendado**: crear `<EmptyState icon title description action>` reutilizable. Usarlo en comunidades sin contenido con CTA "Sugerir contenido para esta comunidad" → mailto o issue de GitHub. Mostrar también las 3 comunidades hermanas como sugerencia de navegación lateral.
- **Esfuerzo**: S
- **Testing**: baja.

---

## G11 · KaTeX y Mermaid en dark-mode con contraste pobre

- **Síntoma**: fórmulas KaTeX se ven gris-sobre-gris; diagramas Mermaid con texto casi ilegible en dark.
- **Causa raíz**: KaTeX hereda `currentColor` pero los CSS vars del paper usan `text-foreground` con opacidad reducida en MDX prose. Mermaid usa default theme.
- **Fix recomendado**: en `globals.css`, fijar `.katex { color: hsl(var(--foreground)); }` y `.katex-display { color: inherit; }`. Para Mermaid, en el wrapper detectar `theme === 'dark'` (vía `useTheme`) y pasar `mermaid.initialize({ theme: 'dark' })` con `themeVariables` que usen los tokens shadcn. Re-render al cambiar tema.
- **Esfuerzo**: M
- **Testing**: media (snapshot visual dark/light de un paper con fórmulas y un diagrama).

---

## G12 · Mission Tracker no comunica "qué desbloquea esto"

- **Síntoma**: al completar una `SectionGate` el usuario ve un check pero no entiende qué se abrió ni dónde.
- **Causa raíz**: feedback de progreso es local (icono check) sin animación de cascada al siguiente nodo del tracker.
- **Fix recomendado**: tras completar gate, animar (200ms) el siguiente nodo con `scale-105 ring-2 ring-primary` y mostrar un mini-toast "Desbloqueado: M0X — siguiente paso". Si la sección desbloquea CCA, anticipar el modal con un confetti light (`canvas-confetti` 50 particles). Persistir el "siguiente sugerido" en query param para deep-link.
- **Esfuerzo**: M
- **Testing**: media.

---

## G13 · AI Asistente: latencia sin streaming visible al inicio

- **Síntoma**: tras enviar un prompt, hay 2-4s de "silencio" antes de ver tokens; el usuario duda si se envió.
- **Causa raíz**: el endpoint hace TTFB ~2s en cold start; UI sólo muestra spinner pequeño en el botón de send, sin placeholder de mensaje del asistente.
- **Fix recomendado**: insertar inmediatamente un message bubble del asistente con 3 dots animados (`...` typing indicator) y un texto sutil "Buscando en el corpus..." mientras llega TTFB. Una vez llegue el primer chunk, swap a contenido. Mostrar en hover el modelo activo (Haiku 4.5 / Kimi 2.5).
- **Esfuerzo**: S
- **Testing**: baja (mock de endpoint con delay).

---

## G14 · Tooltips ausentes en drag-handle y controles densos

- **Síntoma**: el handle del sidebar (4px) es invisible; usuarios no saben que es redimensionable. Igual con el toggle 2D/3D del grafo y el theme toggle.
- **Causa raíz**: el handle es un `<button>` con `aria-label` pero sin `<Tooltip>` visible. El theme toggle no muestra label.
- **Fix recomendado**: envolver con shadcn `<Tooltip>`: drag-handle → "Arrastra para ajustar (doble clic: reset)"; theme → "Tema (T)"; grafo 2D/3D → "Cambiar dimensión (G)". Doble-clic en el handle resetea a 280px (default).
- **Esfuerzo**: S
- **Testing**: baja.

---

## G15 · Persistencia inconsistente — algunos toggles olvidan, otros recuerdan

- **Síntoma**: el ancho del sidebar se persiste, pero la tab activa del right-panel no; el tema sí, pero el modo "libre/misión" del chat no.
- **Causa raíz**: cada widget gestiona su propio localStorage con keys ad-hoc; algunos olvidaron persistir.
- **Fix recomendado**: centralizar en `lib/ui-state.ts` un único `useUiState()` con zustand + `persist`. Migrar: `rightPanel.activeTab`, `chat.mode`, `splitWorkArea.openTabs`, `graph.viewMode (2d|3d)`, `graph.filters`. Documentar en `AGENTS.md` qué persiste y qué no.
- **Esfuerzo**: M
- **Testing**: media (tests de hidratación SSR vs cliente).

---

## G16 · Print/PDF de papers se rompe — TOC y sidebar se imprimen

- **Síntoma**: al imprimir un paper sale el sidebar izquierdo y el right-panel; el contenido principal queda comprimido a ~40% del ancho.
- **Causa raíz**: `print.css` ausente o incompleto; falta `@media print` con `display: none` en sidebars y `width: 100%` en `<main>`.
- **Fix recomendado**: en `globals.css` añadir `@media print { [data-sidebar], [data-right-panel], [data-no-print] { display: none !important } main { width: 100% !important; max-width: none !important; } a::after { content: " (" attr(href) ")"; } }`. Marcar header y footer con `data-no-print`. Probar /cca/[role]/[paperId] (debe seguir saliendo limpio) y /canonico/[mid].
- **Esfuerzo**: S
- **Testing**: media (preview de impresión Chrome + Firefox).

---

## G17 · Búsqueda cmdk plana — no hay scopes ni historial

- **Síntoma**: cmdk muestra papers, comunidades y comandos mezclados; al volver a abrirla, no recuerda búsquedas recientes.
- **Causa raíz**: implementación con un único array sin agrupación y sin historial.
- **Fix recomendado**: agrupar resultados en sections (`Papers`, `Comunidades`, `Misiones`, `Comandos`, `Recientes`). Historial: últimas 5 selecciones en localStorage `reforma-ud:cmdk-history`. Soportar prefijos: `>` para comandos, `#` para tags, `@` para misiones. Exponer atajo `Esc` claro.
- **Esfuerzo**: M
- **Testing**: media.

---

## G18 · Hover-preview de wikilinks no soporta nesting

- **Síntoma**: al pasar sobre un wikilink, aparece la card del paper destino — pero si ese paper tiene a su vez wikilinks, hover sobre ellos no funciona dentro de la card.
- **Causa raíz**: el componente hover-card desactiva pointer-events en su contenido tras 500ms o el listener no propaga.
- **Fix recomendado**: usar Radix `<HoverCard>` con `openDelay={250} closeDelay={150}`; el contenido de la card debe ser `pointer-events-auto` y los wikilinks dentro re-bindear el HoverCard. Limitar nesting a 2 niveles (`data-hover-depth`) para evitar pirámides.
- **Esfuerzo**: M
- **Testing**: alta (hover en hover, edge cases con tab+keyboard).

---

## G19 · Focus-ring inconsistente y a veces invisible

- **Síntoma**: al navegar con Tab, en varios botones (header, sidebar items, drag-handle) no se ve foco; en otros sí pero con estilo distinto.
- **Causa raíz**: faltan utilidades `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` en muchos componentes; algunos usan `outline: none` sin reemplazo.
- **Fix recomendado**: definir clase utilitaria `.focus-ring` en `globals.css` (`@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`). Aplicar en: NavIcon, TreeItem links, SectionToggle, drag-handle, tabs del right-panel, tab-bar de SplitWorkArea, command-palette items.
- **Esfuerzo**: S
- **Testing**: media (axe-core en CI; Playwright tab-walk).

---

## G20 · Jerarquía visual confusa en home — todo pesa lo mismo

- **Síntoma**: el home renderiza Hero + Mi Actividad + Mission Tracker + Quick Tabs + KPIs + Comunidades + Corpus en cascada vertical; al scrollear, el ojo no sabe qué es primario.
- **Causa raíz**: secciones con paddings y tipografía similares; faltan separadores visuales y un "above the fold" claro.
- **Fix recomendado**: jerarquía de 3 niveles: (1) Hero + Mission Tracker en un row above-the-fold con altura fija `min-h-[60vh]`; (2) Mi Actividad + KPIs como banda secundaria con fondo `bg-muted/30`; (3) Quick Tabs + Comunidades + Corpus en grid de cards con `gap-6` y `divide-y` entre bandas. Usar `<h2 className="text-3xl font-bold tracking-tight">` para primarias y `text-xl text-muted-foreground` para secundarias. Reducir paddings de cards no críticas.
- **Esfuerzo**: M
- **Testing**: baja (visual diff vs antes; Lighthouse CLS).

---

## Apéndice — Métricas de éxito

Tras aplicar los 20 gaps, esperar:

- **LCP** móvil < 2.5s en /canonico/[mid] (hoy ~3.8s estimado)
- **CLS** total < 0.05 en home (hoy ~0.18)
- **Tab-walk** sin "perder" foco en ningún paso (hoy: 4-6 botones ciegos)
- **Sidebar scrollable** con 30+ comunidades visibles
- **"What's new"** drawer triggered ≥ 70% de sesiones tras deploy nuevo
- **AI TTFB perceived** < 300ms (typing indicator inmediato; hoy ~2s)

## Apéndice — Orden sugerido de implementación

**Sprint A (1 día)**: G01, G05, G14, G19, G09 → arregla la "no veo cambios" + accesibilidad básica.
**Sprint B (1 día)**: G04, G07, G13, G16, G10 → feedback visual y discoverability.
**Sprint C (2 días)**: G02, G06, G15, G11, G20 → reorganización layout y consistencia.
**Sprint D (2 días)**: G08, G12, G17, G18, G03 → Obsidian-grade workflow + changelog.
