---
kd_id: audit/v4.5-obsidian-paridad-final
kd_version: 1.0.0
kd_status: PROPOSED
kd_doc_type: AUDIT
kd_title: v4.5 · Paridad Obsidian (final) — re-arquitectura de paneles, navegación semántica, comunidad real
kd_created: 2026-04-25
kd_responsible: Carlos C. Madera
kd_classification: PUBLIC
---

# AUDIT — v4.5 · Paridad Obsidian (final)

> **Pregunta trazadora del usuario** (verbatim, 2026-04-25):
> *"Estamos dando círculos en los procesos de mejora. (...) Vas a construir un audit donde describes lo que comprendes y recomiendas la mejor práctica SOTA para resolverlo (...) creando un portal cada vez más obsidian-like, bello y usable. (...) Revisa todos los anteriores y confirma que no se estén quedando gaps por fuera."*

**Propósito de este audit**: detener el ciclo iterativo de parches sobre el shell del portal y consolidar **una única decisión arquitectónica** que cubra los 11 issues que el usuario marcó en imgs 1-10 + el cierre de los gaps abiertos en los 7 audits previos. No es un sprint plan — es la decisión técnica raíz que habilita los próximos sprints (v4.5 → v5.0).

**Alcance**: shell de aplicación (`<Header>`, `<Sidebar>`, `<RightPanel>`, `<SplitWorkArea>`, `<ComparativeSplit>`), schema Velite (`canonicPaper`, `note`, `community`), modelo de relaciones del vault, modelo de comunidad/co-autoría.

**Stack base** (verificado): `next@16.2.4`, `react@19.2.4`, `tailwindcss@4`, `shadcn@4.4`, `radix-ui@1.4`, `react-resizable-panels@4.10`, `velite@0.3`, `@flowershow/remark-wiki-link@3.4.0`, `react-force-graph-3d@1.29`, `vis-network@10`, `cmdk@1.1`.

---

## 0. TL;DR — decisiones consolidadas

| # | Decisión | Reemplaza decisión anterior | Effort | Riesgo |
|---|---|---|---|---|
| **D1** | **3-zone layout** estricto: Header full-width, body en `Group horizontal` con 3 paneles fijos `[Sidebar │ Center │ RightPanel]`. Resize de paneles internos del Center NO afecta sidebars. | v4.4 (resize de center sí afectaba al estar `<ComparativeSplit>` por dentro de `<SplitWorkArea>`) | M | Bajo — `react-resizable-panels` ya tiene `Group` anidados con auto-save independiente |
| **D2** | **Right Panel = 4 tabs**: `Conexiones · Refs · Comunidad · Asistente`. `Conexiones` agrupa 3 sub-tabs: `Esquema (TOC) · Grafo (local) · Evolución (versiones)`. | v4.3 d (3 tabs: Refs/Comunidad/Chat) y v4.1 (TOC en sidebar izquierdo) | M | Medio — re-migración del TOC, requiere persistir nuevo estado UI |
| **D3** | **Sidebar izquierdo = navegador puro** (file-tree estilo Obsidian). Misiones, stats por-doc, glosario, salen de aquí. Solo: árbol de comunidades + buscador (cmd-K reuse) + footer mínimo. | v4.4 (SidebarMissionsWidget arriba) | S | Bajo — borrar > construir |
| **D4** | **Header**: izquierda = solo brand (logo UDFJC + `reforma·ud`) y toggles de paneles. Derecha = breadcrumb + cmd-K + GitHub + theme + ProfileMenu + toggle right-panel. | v4.4 (ProfileMenu pegado al brand a la izquierda) | XS | Nulo |
| **D5** | **Hover-preview universal** para refs APA: si la cita resuelve a `.md` interno → popover Obsidian-style; si resuelve a URL externa → tooltip ligero con favicon + título + abrir en nueva pestaña (cita el artículo, no abre el PDF en el panel). | v4.3 a (solo wikilinks tenían hover) | M | Medio — requiere parser de citas APA `[@key]` con resolver a `.bib` / `.cff` |
| **D6** | **Frontmatter de relaciones explícito** (nuevo): `relations: { pre: [], pos: [], co: [], custom: { glosario: [], normas: [] } }`. Es un superset de `cites:` actual (que se mantiene como atajo plano). Render: secciones nombradas en panel `Refs`. | implícito en wikilinks `[[...]]` | L | Medio — migración del corpus + extensión Velite schema |
| **D7** | **Comunidad ≠ Glosario**. Glosario va al sub-tab `Conexiones › Esquema` (es navegación semántica del doc). Tab `Comunidad` se reescribe como **registro de co-autoría**: `Co-autores con %`, `Tareas pendientes por co-autor`, `Solicitar co-autoría` (handshake → desbloquea misión editorial). | v4.3 d (Comunidad = Saberes/Preg/Aportes) | L | Alto — toca el modelo conceptual del vault, necesita prototipo localStorage primero |
| **D8** | **Renombrar "Aportes" → "Deliberación"**. Razón: `aporte` es uni-direccional y suena a contribución pasiva; `deliberación` (Habermas-style) refleja el ánimo de la reforma (debate público sobre un canon). Migración: alias en localStorage para preservar histórico. | v4.3 e | XS | Nulo |
| **D9** | **Print stylesheet + `print-only` toggle** se mantiene (G16 v4.2). No se toca. | — | — | — |
| **D10** | **`comparative-split` se preserva pero baja un nivel**: deja de envolver al `<article>` en la página `[mid]` y pasa a ser un *modo* del Center pane (toggleable desde `Conexiones › Comparar`). Esto evita que el split horizontal "rompa" la zona central frente a los sidebars. | v4.4 b | M | Medio |

**Veredicto**: implementación en 3 sprints (v4.5 a, v4.5 b, v4.5 c) — orden y costos al final. La decisión **D1** es la única que es bloqueante para todas las demás; el resto puede entregarse en cualquier orden tras D1.

---

## 1. Contexto: por qué este audit tuvo que escribirse

El portal lleva 4 versiones mayores (`v3.4 → v4.4`) optimizando *features* sin haber hecho un commit explícito al **modelo arquitectónico raíz del shell**. Cada feature nueva (TOC, grafo local, comparative-split, comunidad-panel, comprehension-inline) se montó sobre el modelo previo, generando los siguientes síntomas:

1. **Drift de zonas**: TOC ha vivido en *3 lugares* en 6 semanas (sidebar derecha → centro → sidebar izquierda → vuelve a derecha). El usuario ya tuvo que admitir *"yo me equivoqué y pedí que esto pasara a la izquierda"*. El síntoma señala que la pregunta nunca fue *"¿dónde poner el TOC?"* sino *"¿cuál es la lógica del right panel?"*.
2. **Mezcla glosario/comunidad**: el sub-tab `Saberes` del `comunidad-panel` v4.3 d trata el glosario como participación. El usuario lo separó: *"una cosa es el glosario y otra es la participación en la comunidad"*. Esto es una **falla de modelo**, no de UI — la UI fue síntoma.
3. **Resize cruzado**: `<ComparativeSplit>` en v4.4 usa un `Group horizontal` por encima de la zona center, así que cuando el usuario arrastra el separador del split-comparativo, los sidebars laterales también se desplazan. El usuario lo notó: *"la barra izquierda se pierde al desplegar el documento"*.
4. **Estética híbrida del header**: el `<ProfileMenu>` quedó al lado del brand a la izquierda en v4.0 cuando se introdujo, y nunca se rebalanceó. Los headers Obsidian/Notion/Linear ponen identidad-brand a la izquierda y identidad-usuario a la derecha. El portal hoy mezcla los dos en la izquierda.
5. **Refs sin profundidad**: los `<a class="wikilink">` ya tienen hover-preview (v4.3 a) — pero las **citas APA** (`[@christensen2016competing]`) no. Y el campo `cites` de Velite es un array de strings sin tipo de relación; no soportamos `pre/pos/co` ni custom.
6. **Comunidad ≠ comunidad real**: el tab `Comunidad` v4.3 hoy mezcla aportes (deliberación) + preguntas de comprensión (auditoría top-down) + glosario. La **co-autoría real** (quién participa con qué % y qué tareas tiene pendientes) no existe en el modelo. Esto bloquea la "misión editorial" que el usuario describió como gating de permisos.

Cada uno de estos puntos quedó parcialmente cubierto por audits previos. Lo que **no se había hecho** es la lectura cruzada que sigue.

---

## 2. Audit de los 11 issues (img1 → img10)

> Para cada issue: **(a)** descripción de lo que entiendo del usuario, **(b)** SOTA (con citas verificables), **(c)** mejor práctica recomendada, **(d)** impacto en el código actual, **(e)** decisión enlazada (D#).

### Issue 1 — `SidebarMissionsWidget` redundante (img1)

**(a) Lo que entiendo**: el widget actual repite info que aparece (i) centralmente al cargar la home, (ii) en el `<header>` cuando hay un doc seleccionado, y (iii) en `/mision`. Las "stats por misión" son contextuales al doc/comunidad activos — meterlas siempre arriba del sidebar las saca de contexto. Lo único que el sidebar necesita es **buscador**.

**(b) SOTA**: Obsidian's left sidebar es un **file explorer puro** (no widgets). Logseq igual. Linear sidebar es navegación pura + búsqueda integrada (cmd-K). Notion left sidebar = workspace tree + favorites + cmd-K. Patrón común: **sidebar izquierdo = navegación + búsqueda; nada más**.
- Obsidian Help → File explorer: <https://help.obsidian.md/Plugins/File+explorer>
- Linear interface: <https://linear.app/changelog>

**(c) Mejor práctica**: `Sidebar` se reescribe como `<NavTree>` puro (árbol de comunidades + canónico) + footer compacto con perfil/rol activo. La búsqueda *no* es una caja en el sidebar — es el **trigger de cmd-K** que ya tenemos en el header (`Search...` con `⌘K`). El sidebar hereda esa búsqueda; no la duplica.

**(d) Impacto código**:
- Borrar `apps/portal-next/src/components/layout/sidebar-missions-widget.tsx`.
- Quitar import + render en [sidebar.tsx](apps/portal-next/src/components/layout/sidebar.tsx).
- Eliminar la sección `ReformaCuanticaSection` con el filter inline si ese filter no aporta sobre cmd-K (revisar uso real con `grep -r 'ReformaCuanticaSection'`).

**(e) Decisión**: D3.

---

### Issue 2 — Header: ProfileMenu a la derecha (img2)

**(a) Lo que entiendo**: hoy el `<ProfileMenu>` está pegado al brand `reforma·ud` a la izquierda. El usuario quiere que la izquierda sea **solo identidad institucional** (logo UDFJC + nombre). El profile va a la derecha junto a las utilidades (theme, GitHub, panel toggles).

**(b) SOTA**: regla universal en aplicaciones modernas de productividad: izquierda = brand/workspace, derecha = identidad personal + utilidades. Ejemplos: Obsidian (top-right corner = sync/account), Notion (avatar top-right), Linear (avatar bottom-left pero el header tiene workspace selector izquierda + filter derecha), Figma, Slack.

**(c) Mejor práctica**: separación brand/profile estricta:
```
[≡] [Logo + reforma·ud] [breadcrumb-fluid ............] [cmd-K] [GH] [☀/🌙] [Avatar▾] [⊟Right]
```
- `<ProfileMenu>` pasa al cluster `ml-auto` derecho, **antes** del toggle del right panel.
- Brand de la izquierda incluye opcionalmente un selector de workspace (futuro: `reforma·ud / ccms / dibie`).

**(d) Impacto código**: 1 mover-jsx en [header.tsx:130](apps/portal-next/src/components/layout/header.tsx#L130) → trasladar `<ProfileMenu />` del cluster izquierdo (línea 130) al cluster derecho (línea 152, antes del primer Tooltip). XS.

**(e) Decisión**: D4.

---

### Issue 3 — TOC vuelve al right panel (img3)

**(a) Lo que entiendo**: el usuario admite que su pedido en v4.1 (mover TOC al sidebar izquierdo) fue erróneo. El TOC pertenece al lado del documento, donde Obsidian lo tiene (`Outline` en right pane). Y debe convivir con `Grafo local` y `Evolución` bajo un mismo ámbito conceptual: **navegación semántica del doc activo**.

**(b) SOTA**:
- Obsidian Outline core plugin: <https://help.obsidian.md/Plugins/Outline> — vive en right pane.
- Notion: TOC bloque inline + outline en right side panel (toggle).
- Bear / Craft: TOC sticky en right edge.
- Anti-patrón: TOC en left sidebar mezclado con file-tree (Logseq lo intentó y revirtió).

**(c) Mejor práctica**: el TOC **es navegación dentro del nodo** (intra-doc), no entre nodos (inter-doc). Esa es la línea conceptual que separa `right panel` (intra-doc) de `left sidebar` (inter-doc). Dentro de right panel, agrupar en una pestaña padre **`Conexiones`** las 3 vistas semánticas:

```
Conexiones
├── Esquema     ← TOC + glosario detectado en el body
├── Grafo       ← grafo local del doc activo (mover desde tab actual)
└── Evolución   ← versiones git del .md (commits, autores, diff)
```

`Esquema` es el nuevo nombre porque incluye TOC + glosario + lista de figuras + ecuaciones (Velite ya genera `s.toc()`, podemos extender).

**(d) Impacto código**:
- En [right-panel.tsx](apps/portal-next/src/components/layout/right-panel.tsx) → añadir tab `Conexiones` con sub-tabs.
- Mover `OutlineTab` (que vive hoy inline en sidebar izquierdo) → `RightPanel.ConexionesTab.SubEsquema`.
- Mover `<MermaidRenderer>` global del paper page → no, ese se queda. Lo que se mueve es la *vista global del grafo* (canvas en `/canonico/grafo`) a un sub-tab del right panel cuando hay doc activo.
- Cambiar `RightTab` type en [ui-state.ts:195](apps/portal-next/src/lib/ui-state.ts#L195) de `'chat'|'backlinks'|'comunidad'` a `'conexiones'|'refs'|'comunidad'|'chat'`.
- Sub-estado `conexionesSubTab: 'esquema'|'grafo'|'evolucion'` persistido bajo la misma key prefix.

**(e) Decisión**: D2.

---

### Issue 4 — Sub-tab "Evolución" como version control (img3 inferido + img9)

**(a) Lo que entiendo**: cada `.md` del vault es un artefacto vivo. La comunidad delibera, los autores comprometen versiones. El usuario quiere ver **commits + diff + autores por línea** del archivo activo, sin salir del portal. Esto cierra el bucle del campo `relations.co` (co-autoría) que viene en D7.

**(b) SOTA**:
- GitHub `Blame` view: vista canónica para "quién escribió qué línea, cuándo".
- Obsidian Git plugin (Vinzent03): muestra commits del vault.
- VSCode `Timeline` view (built-in): muestra historia de un archivo + diff inline.
- Linear: tab "Activity" en cada issue con commits/PRs cruzados.

**Para nuestro caso (Vercel-hosted, vault público en GitHub)**:
1. **Octokit en runtime** (`@octokit/rest`): API call a `/repos/{owner}/{repo}/commits?path={file}` → lista de commits del archivo.
2. **`react-diff-viewer-continued`** (MIT, mantenido) para mostrar diff entre 2 commits seleccionados.
3. **Cache**: Vercel KV (Redis-compatible) o `unstable_cache` con `revalidate: 3600` — git history cambia lento.
4. **Blame**: requiere `/repos/{owner}/{repo}/contents/{path}` + parsing por commit. Pesado. **Postergar a v5.0**.

**(c) Mejor práctica para v4.5**:
- Sub-tab `Evolución` MVP = solo lista de commits (sha, autor avatar, mensaje, fecha relativa).
- Click en commit abre permalink GitHub en nueva pestaña (sin diff inline en MVP — evita riesgo).
- v5.0: añadir diff inline `commit-anterior ↔ commit-seleccionado`.

**(d) Impacto código**:
- Nuevo `apps/portal-next/src/components/biblioteca/evolution-tab.tsx` client component.
- Server action `getCommitsForPath(path: string)` con `unstable_cache`.
- `GITHUB_TOKEN` en env (lectura pública, scope mínimo `public_repo`).

**(e) Decisión**: D2.

---

### Issue 5 — Refs APA con hover-popover Obsidian-style (img4-5)

**(a) Lo que entiendo**: el body usa citas APA estilo Pandoc `[@christensen2016competing]`. El usuario quiere validar:
- (i) ¿La fuente de verdad es `.bib` o `.cff` o `.md`?
- (ii) Si la entrada bibliográfica es URL externa → abrir tab nuevo.
- (iii) Si la entrada bibliográfica está en el vault como `.md` → hover popover (estilo wikilink).

**(b) SOTA**:
- **`citation-js`** (npm `citation-js`): parser BibTeX/CSL-JSON/CFF. Render a APA/MLA/Chicago vía CSL styles. <https://citation.js.org>
- **`@citation-js/plugin-bibtex`** + **`@citation-js/plugin-csl`**: combo estándar para Pandoc-style citations en Markdown.
- **`remark-citations`** (Pandoc-flavor): plugin remark que parsea `[@key]` y produce un AST con resolver a metadata.
- **CFF (Citation File Format)**: estándar GitHub para `CITATION.cff` <https://citation-file-format.github.io/>. Útil para citar repos/datasets, no papers. Recomendación: usar CFF solo para citar el portal mismo, no como fuente de bibliografía.
- **Obsidian Pandoc Reference List** (plugin community): exactamente este patrón — `.bib` global + hover popover.

**(c) Mejor práctica**:
1. **Fuente de verdad = `.bib`** en `apps/portal-next/content/_meta/references.bib`. CSL-JSON sería más moderno pero `.bib` es lo que los autores académicos ya tienen.
2. **Pipeline Velite**: añadir `remark-citations` (o equivalente custom de 50 líneas) que transforma `[@key]` en `<a class="apa-cite" href="#ref-key" data-cite-key="key">(Christensen, 2016)</a>`.
3. **Render**: bibliografía completa al final del body (Pandoc-style) generada a partir del `.bib` con CSL-APA.
4. **Hover-preview**:
   - Si la entrada `.bib` tiene `url:` → hover popover muestra autores + título + año + revista + botón "Abrir →" externo.
   - Si la entrada es un `.md` interno (caso raro: cita a otro paper canónico, ej. `[@m04]` o `[@glo-jtbd-christensen]`) → hover popover idéntico al wikilink hover (`<MDXWithHoverPreview>` recursivo limitado a depth 1).
5. **El PDF nunca se abre dentro del portal**. La cita es un *handle* para abrir la fuente en nueva pestaña — coherente con la regla "el panel comparativo es para 2 docs del vault, no para PDFs externos".

**(d) Impacto código**:
- Añadir `remark-citations` en [velite.config.ts:remarkPlugins](apps/portal-next/velite.config.ts).
- Nuevo `apps/portal-next/src/components/biblioteca/apa-cite.tsx` client component (registrado en MDX components).
- Bibliography section auto-generada al final del MDX body (renderer custom).

**(e) Decisión**: D5.

---

### Issue 6 — Sidebars no resize con el centro (img6-7-8)

**(a) Lo que entiendo**: cuando el usuario abre el split comparativo (Pane A vs Pane B), el separador interno mueve **además** los sidebars laterales. El usuario quiere comportamiento Obsidian: el centro tiene su propio sistema de paneles internos *aislado* de los sidebars laterales. Sidebars solo se resize con sus propios handles.

**(b) SOTA**: `react-resizable-panels` v4 soporta **`Group` anidados con `id` único + `autoSaveId`**. La clave es la jerarquía de DOM:

```
<Group id="shell" direction="horizontal" autoSaveId="shell-v4.5">
  <Panel id="left" minSize={15} defaultSize={20}>...</Panel>
  <Separator />
  <Panel id="center" minSize={40} defaultSize={60}>
    {/* INNER GROUP — resize independiente */}
    <Group id="center-inner" direction="horizontal" autoSaveId="center-inner-v4.5">
      <Panel id="doc">...</Panel>
      <Separator />
      <Panel id="compare">...</Panel>
    </Group>
  </Panel>
  <Separator />
  <Panel id="right" minSize={15} defaultSize={20}>...</Panel>
</Group>
```

El truco está en que (i) el `Group` interno es una unidad autocontenida — sus separadores solo afectan a sus propios `Panel`s, (ii) cada `Group` tiene `autoSaveId` distinto para que la persistencia de tamaños no colisione.

Doc oficial: <https://react-resizable-panels.vercel.app/examples/nested-groups>.

**(c) Mejor práctica**:
- Refactor del shell en `apps/portal-next/src/app/layout.tsx` (o el layout group equivalente): mover el `Group horizontal` a nivel de layout, no a nivel de page. Así el shell vive una sola vez y el page solo aporta el contenido del panel center.
- `<ComparativeSplit>` se simplifica: ya no monta su propio `Group`. Pasa a montar un `Panel` adicional **dentro** del `Group` interno del center. Cuando `?compare` está vacío, ese segundo `Panel` no se renderiza y el `doc` panel ocupa todo el ancho.
- **Sidebars solo redimensionables con su propio handle**, vertical en el borde interno del sidebar (ya implementado en v4.4 — solo hay que asegurar que vive en el `Group` exterior, no compartido con el center).

**(d) Impacto código**: refactor mediano. Tocar:
- [apps/portal-next/src/app/layout.tsx](apps/portal-next/src/app/layout.tsx) — promover el resize group al layout.
- [comparative-split.tsx](apps/portal-next/src/components/biblioteca/comparative-split.tsx) — simplificar a single Panel sin Group propio.
- [split-work-area.tsx](apps/portal-next/src/components/biblioteca/split-work-area.tsx) — verificar que no haya un tercer Group anidado.

**(e) Decisión**: D1.

---

### Issue 7 — Grafo local entra al right panel (img8 + img9)

**(a) Lo que entiendo**: el grafo local del doc activo (vecindario inmediato en el grafo de conocimiento) debe vivir en el right panel, no como una página separada `/canonico/grafo`. La página `/canonico/grafo` se mantiene para grafo **global**; el grafo **local** es contextual y va al sub-tab `Conexiones › Grafo`.

**(b) SOTA**:
- Obsidian Local Graph core plugin: <https://help.obsidian.md/Plugins/Graph+view> — exactamente este patrón. Hay un grafo global y un local (vive en pane separado, configurable a profundidad N=1, 2, 3 saltos).
- Roam Research, Logseq: idéntico.
- **Implementación**: `react-force-graph-2d` (no 3d para un panel pequeño — más legible y barato en CPU). El usuario ya tiene `react-force-graph-3d` instalado para el grafo global.

**(c) Mejor práctica**:
- Sub-tab `Conexiones › Grafo`: render `<LocalGraph paperId={mid} depth={1} />`.
- Profundidad configurable con un slider 1-3 dentro del panel.
- Click en nodo → navega a ese paper.
- Fondo del grafo respeta theme (dark/light).

**(d) Impacto código**:
- Nuevo `apps/portal-next/src/components/biblioteca/local-graph.tsx`.
- Construcción del subgrafo: filtrar el dataset global por nodos a distancia ≤ N del `paperId`.
- Reusar lógica de coloración por `rutaClark` que ya existe en `/canonico/grafo`.

**(e) Decisión**: D2.

---

### Issue 8 — 4 tabs totales en right panel (img9)

**(a) Lo que entiendo**: el usuario quiere **4 tabs totales** en el right panel. Hoy hay 3. La nueva pestaña a añadir es la "navegación semántica" agrupadora.

**(b) Mejor práctica** (cierra los issues 3, 4, 7):
```
Right Panel (4 tabs)
├── 🧭 Conexiones    ← Esquema · Grafo · Evolución (sub-tabs)
├── 🔗 Refs          ← APA + frontmatter relations (D6)
├── 👥 Comunidad     ← Co-autores · Pendientes · Solicitar co-autoría
└── ✨ Asistente     ← Chat IA (renombrado de "Chat", coherente con tono)
```
Iconos lucide: `Compass`, `Link`, `Users`, `Sparkles`.

**(c) Impacto código**:
- [ui-state.ts:RightTab](apps/portal-next/src/lib/ui-state.ts#L195) → `'conexiones' | 'refs' | 'comunidad' | 'asistente'`.
- [right-panel.tsx](apps/portal-next/src/components/layout/right-panel.tsx) → añadir 4ª tab con iconos.
- Migración: si localStorage tiene un valor antiguo (`'chat'` → `'asistente'`, `'backlinks'` → `'refs'`), normalizar al leer.

**(d) Decisión**: D2.

---

### Issue 9 — Frontmatter de relaciones nombradas (descrito en img4 + verbatim usuario)

**(a) Lo que entiendo**: hoy el `Refs` tab muestra `cites` (un array plano de strings). El usuario quiere relaciones **tipadas**: pre-saberes, post-saberes, co-relaciones, glosario, normas. Cada relación renderiza con su nombre y sus nodos.

**(b) SOTA**:
- **Obsidian Dataview** (plugin): permite frontmatter tipado y queries. Patrón: `prerequisites: [[a]], [[b]]` → DQL `LIST FROM #curriculum WHERE contains(prerequisites, this.file.link)`.
- **TiddlyWiki**: tags tipados (es-a, parte-de, requiere) — modelo más antiguo pero clarísimo.
- **JSON-LD** sobre frontmatter: más formal (schema.org), permite SEO + RDF triples. Heavy para v4.5.
- **MetaBind plugin** (Obsidian): permite editar frontmatter desde el body. Útil v5.0.

**(c) Mejor práctica**: mantener simple, alineado con Velite/Zod:

```yaml
---
id: m04
# ... campos actuales
relations:
  pre:
    - m02              # papers que se asumen leídos
    - m03
  pos:
    - m08              # papers que extienden este
  co:
    - autor: ccms
      pct: 70
    - autor: claude-opus-4-7
      pct: 30
  custom:
    glosario:
      - glo-jtbd-christensen
      - glo-odi-ulwick
    normas:
      - acu-004-25
      - estatuto-ud
    figuras:
      - fig-MI04-01
cites:                # mantener como atajo plano para compat
  - m02
  - glo-jtbd-christensen
---
```

**Render en `Refs` tab**:
```
Pre-saberes (2)
  └─ M02 · ICAT JTBD foundations
  └─ M03 · Reforma normativa

Pos-saberes (1)
  └─ M08 · Cultura organizacional

Glosario invocado (2)
  └─ JTBD (Christensen 2016)
  └─ ODI (Ulwick 2016)

Normas (2)
  └─ Acuerdo CSU 04/2025
  └─ Estatuto General UD

APA citaciones (8)         ← sub-sección de Issue 5
  └─ Christensen 2016 ↗
  └─ Wenger 1998 ↗
```

**(d) Impacto código**:
- Extender schema en [velite.config.ts:42](apps/portal-next/velite.config.ts#L42) con `relations: s.object(...).optional()`.
- Nuevo `apps/portal-next/src/components/biblioteca/refs-panel-typed.tsx` que renderiza secciones nombradas.
- Migración del corpus M01-M12 (script): leer wikilinks `[[glo-*]]` actuales → derivar `relations.custom.glosario`. Manual para `pre/pos/co`.

**(e) Decisión**: D6.

---

### Issue 10 — Comunidad real: co-autores, %, pendientes, handshake (img10)

**(a) Lo que entiendo**: el tab `Comunidad` actual mezcla glosario + preguntas + aportes. Ninguno de esos es **comunidad** en sentido estricto. El usuario quiere:
- Lista de co-autores con % de participación.
- Tareas pendientes asignadas a cada co-autor.
- Botón "Solicitar co-autoría" (handshake) → desbloquea **misiones editoriales** sobre ese doc.

Esto introduce un modelo de permisos editoriales que hoy no existe.

**(b) SOTA**:
- **Notion permission per-page**: roles {viewer, commenter, editor, full-access}. Modelo flat.
- **Wikipedia / MediaWiki**: lista de contributors automática desde git history + página `Talk:`. Comunidad emergente, no asignada.
- **GitHub PR review request**: el modelo más cercano. Quien tiene write access puede ser asignado a tareas; "request review" = handshake.
- **Liveblocks** + **Yjs CRDT**: para collaborative editing real-time. Caro, postergar v5.0.
- **Open Collective / Gitcoin** model para %: contribución pesada por commits + revisiones.

**Para una reforma universitaria pública**: el modelo correcto es **GitHub-style**:
1. Co-autores se derivan del git log del archivo (cualquier persona con commit en este `.md` aparece automáticamente).
2. % se calcula como `lineas_modificadas_por_autor / lineas_totales` (proxy razonable).
3. "Tareas pendientes" son issues GitHub con label `book/m04` o frontmatter `tasks: [...]`.
4. "Solicitar co-autoría" = abrir un issue en GitHub con plantilla `request co-author` → reviewer manual aprueba con un comment "approved" → CI add user to `CODEOWNERS` para ese path.
5. **Misión editorial** = un issue asignado al usuario con label `editorial`. Cuando hay co-autoría aprobada, el portal muestra esa misión activa en la vista del doc.

**(c) Mejor práctica v4.5 (MVP)**:
- **Co-autores**: derivados de `git log --follow {path} | parse authors`. Server action con `unstable_cache`.
- **% participación**: `git log --numstat --follow {path}` → suma `additions+deletions` por autor → dividir.
- **Pendientes**: leer issues GitHub con label automático del paper (e.g., `paper/m04`). Octokit, mismo patrón que Issue 4.
- **Solicitar co-autoría**: link directo a `https://github.com/ccolombia-ui/reforma-ud/issues/new?template=request-coauthor.md&title=Co-autor:%20m04`.
- **Misiones editoriales**: filtrar issues con label `editorial` + assignee = current user (futuro: cuando tengamos auth GitHub OAuth).

**(d) Impacto código**:
- `apps/portal-next/src/components/biblioteca/comunidad-panel-v2.tsx` reescribe el panel.
- Server actions: `getCoAuthors(path)`, `getPendingTasks(path)`, `getEditorialMissions(path, userLogin?)`.
- GitHub issue template `request-coauthor.md` en `.github/ISSUE_TEMPLATE/`.
- **Glosario, preguntas, aportes** que hoy viven en este panel **se redistribuyen**:
  - Glosario → `Conexiones › Esquema` (auto-detectado del body, ya hay `<PresaberesCallout>`).
  - Preguntas → ya viven inline al final del article (`<ComprehensionInline>` v4.3 c). Sólo dejan de duplicarse en el panel.
  - Aportes → permanecen como `<AportesPanel>` inline, **renombrado a `<DeliberacionPanel>`** (Issue 11).

**(e) Decisión**: D7.

---

### Issue 11 — Renombrar "Aportes" → "Deliberación"

**(a) Lo que entiendo**: el usuario propuso "Discusión o Deliberación". Pickear uno.

**(b) SOTA / convención**: en filosofía política y teoría democrática (Habermas), **deliberación** denota proceso público de razonamiento argumentado para llegar a acuerdos. **Discusión** es más coloquial. Para una **reforma universitaria pública** con peso normativo, "Deliberación" es preciso.

**(c) Mejor práctica**: `Deliberación`. Migración:
- localStorage key: `reforma-ud:aportes:{paperId}` → `reforma-ud:deliberacion:{paperId}`. Al leer, hacer fallback al key viejo + reescribir al nuevo (1 release).
- Componentes: `AportesPanel` → `DeliberacionPanel`. `addAporte` → `addContribucion` (la *unidad* sigue siendo un aporte; el *espacio* es la deliberación).
- Copy: "Aportes de la comunidad" → "Deliberación de la comunidad".
- Intents: `idea | warning | thumbs-up | question` → mantener (encajan con el formato deliberativo).

**(d) Impacto código**: rename masivo (sed). XS.

**(e) Decisión**: D8.

---

## 3. Cobertura de audits previos — gaps que quedaban abiertos

He revisado los 8 audits del directorio `docs/audit/`. Síntesis:

| Audit previo | Estado de cierre antes de v4.5 | Gap residual cubierto por este audit |
|---|---|---|
| [AUDIT-usability-gaps-20.md](docs/audit/AUDIT-usability-gaps-20.md) | 18/20 cerrados al deploy v3.4 | **G07** (badges contador en tabs right panel) → reincorporar en D2 con counter en `Refs`, `Comunidad`, `Asistente`. **G09** (changelog drawer) → ya existe; mantener. |
| [AUDIT-obsidian-workspace-ux.md](docs/audit/AUDIT-obsidian-workspace-ux.md) | 7 capacidades Obsidian listadas; tabs múltiples por panel pendientes | **Tabs múltiples + drag** → no se resuelve en v4.5. Postergar v5.0. Documentar la deuda explícitamente aquí. |
| [AUDIT-obsidian-engine-sota.md](docs/audit/AUDIT-obsidian-engine-sota.md) | Op A migrate `s.markdown()` ✅; Flowershow `<BasesView />` pendiente | `BasesView` no entra en v4.5 (no hay `.base` files todavía). Mantener como deuda. |
| [AUDIT-flowershow-v4.md](docs/audit/AUDIT-flowershow-v4.md) | Decidido: solo adoptar plugins, no migrar | OK. Sin gap nuevo. |
| [AUDIT-md-rendering-failures.md](docs/audit/AUDIT-md-rendering-failures.md) | Embeds `![[fig-X]]` workaround documentado | OK. v4.5 no introduce regresiones. |
| [AUDIT-v4.3-workspace-comparativo.md](docs/audit/AUDIT-v4.3-workspace-comparativo.md) | 5/5 implementados en v4.3-4.4 | **#1** (grafo a right panel) **se rectifica**: la implementación inicial puso el grafo como `página` (`/canonico/grafo`); v4.5 lo trae al right panel local. **#3** (right resizable) se mantiene pero se aísla de center (D1). |
| [AUDIT-v4.3-comunidad-participacion.md](docs/audit/AUDIT-v4.3-comunidad-participacion.md) | 3 sub-tabs Saberes/Preg/Aportes implementados | **Re-conceptualización**: Saberes se va a `Conexiones`, Preg pasa a inline, Aportes → `DeliberacionPanel` inline, **el tab `Comunidad` se reescribe completamente** (D7). |
| [AUDIT-sota-frontend-cop.md](docs/audit/AUDIT-sota-frontend-cop.md) | Inventario; no implementación | OK. Recursos `motion`, `frimousse`, `dnd-kit` siguen como referencias para v5.0. |
| [AUDIT-aleia-bereshit-frontend.md](docs/audit/AUDIT-aleia-bereshit-frontend.md) | Referencia visual | OK. |

**Gaps reales que quedan después de v4.5** (deuda consciente):
- **Tabs múltiples por panel** (Obsidian feature). Requiere: split horizontal/vertical de cualquier panel + drag-drop entre paneles. Esfuerzo: L. Plan: v5.0.
- **Edición real-time multi-autor** (Yjs/Liveblocks). Esfuerzo: XL + costo recurrente. Plan: v5.x si se justifica.
- **Bases / Dataview queries** sobre frontmatter. Esfuerzo: M. Plan: cuando exista contenido tabular suficiente que lo demande (no antes).
- **Auth GitHub OAuth** para misiones editoriales. Esfuerzo: M. Plan: junto con D7 producción (no MVP).

---

## 4. Hoja de ruta de implementación (3 sprints)

### Sprint v4.5 a — Shell (bloqueante, todo lo demás depende)

1. D1 · Refactor a 3-zone layout con `Group`s anidados. (M, 1 día)
2. D4 · Header rebalance ProfileMenu derecha. (XS, 30 min)
3. D3 · Sidebar reduce a `<NavTree>` puro. Borrar `SidebarMissionsWidget`. (S, 2 horas)
4. **Validación**: drag del separator del split-comparativo NO mueve sidebars. Tests Playwright opcional.

### Sprint v4.5 b — Right Panel `Conexiones`

5. D2 · `RightTab` extiende a 4 tabs. (S)
6. Mover TOC a `Conexiones › Esquema`. (S)
7. Mover grafo local a `Conexiones › Grafo` (nuevo `<LocalGraph>`). (M)
8. `Conexiones › Evolución` MVP commits-list. Octokit + cache. (M)
9. D8 · Renombrar `Aportes` → `Deliberación`. (XS)

### Sprint v4.5 c — Modelo de relaciones + comunidad real

10. D6 · Schema Velite `relations`. (S)
11. Migración corpus M01-M12: derivar `relations.custom.glosario` desde wikilinks `[[glo-*]]`. (M)
12. `<RefsPanelTyped>` con secciones nombradas. (M)
13. D5 · `remark-citations` + `<ApaCite>` con hover popover. (M)
14. D7 · `<ComunidadPanelV2>`: co-autores desde git log + tareas desde Octokit issues. (L)
15. Issue template GitHub `request-coauthor.md`. (XS)

**Criterio de done v4.5**: el portal pasa el "test del usuario" — ningún issue de imgs 1-10 reaparece y la zona center se comporta como Obsidian (split interno aislado de sidebars).

---

## 5. Decision Matrix · KEEP / CHANGE / ADD / REMOVE

| Componente / Feature | Veredicto | Nota |
|---|---|---|
| `<ComparativeSplit>` | CHANGE | Baja a `Panel` interno del center group; no monta `Group` propio. |
| `<SplitWorkArea>` | KEEP | Mantiene su rol como wrapper del article. |
| `<ProfileMenu>` | CHANGE | Mover a la derecha del header. |
| `<SidebarMissionsWidget>` | REMOVE | Redundante. |
| `<MDXWithHoverPreview>` | KEEP | Funciona bien. Extender para citas APA (D5). |
| `<MermaidRenderer>` | KEEP | Estrategia client-side correcta. |
| `<ComprehensionInline>` | KEEP | Inline al final del article. |
| `<PresaberesCallout>` | KEEP | Auto-detect glosario. |
| `<AportesPanel>` | CHANGE | Renombrar `<DeliberacionPanel>`. |
| `<ComunidadPanel>` (v4.3 d) | REMOVE | Se reescribe como `<ComunidadPanelV2>`. |
| `outline / TOC` (sidebar izq) | REMOVE | Se mueve a `Conexiones › Esquema`. |
| `RightTab type` | CHANGE | 3 → 4 tabs. |
| `canonicPaper` schema (Velite) | CHANGE | Añadir `relations`. |
| `cites` (Velite) | KEEP | Como atajo plano para compat. |
| `<ChangelogDrawer>` | KEEP | Resuelve G09. |
| `<CommandPalette>` (cmd-K) | KEEP | Es la búsqueda real del portal. |
| `print stylesheet` | KEEP | G16 resuelto. |
| Página `/canonico/grafo` (global) | KEEP | Convive con grafo local en right panel. |
| `BasesView`, `Dataview`, `MetaBind` | DEFER | v5.0. |
| `Tabs múltiples por panel` (Obsidian) | DEFER | v5.0. |

---

## 6. Notas de implementación · riesgos y mitigaciones

- **Riesgo D6 (relations migration)**: mover de `cites: [...]` a `relations.custom.glosario` puede romper renders existentes si algún componente lee `cites` directamente. Mitigación: mantener `cites` como atajo plano que se deriva de `relations` en el `transform()` de Velite; los consumidores leen `cites` indistintamente.
- **Riesgo D7 (Octokit rate limits)**: `unstable_cache` con `revalidate: 3600` mitiga, pero deploys frecuentes invalidan cache. GitHub anonymous = 60 req/h, con `GITHUB_TOKEN` = 5000 req/h. **Acción**: añadir `GITHUB_TOKEN` a Vercel env desde día 1.
- **Riesgo D5 (citation parsing)**: si una entrada `.bib` tiene caracteres LaTeX (`{\'a}`), `citation-js` los maneja bien pero `react` puede mostrarlos crudos si el AST no se decodifica. Mitigación: pre-procesar con `bibtex-parse-js` + `unified-latex-to-html` opcional.
- **Riesgo D1 (resize groups)**: `react-resizable-panels` v4 cambió la API frente a v3 — verificar que el shell actual (`<Group>` ya importado) está sobre la versión 4.x. Si está sobre v3, upgrade primero.

---

## 7. Anti-patrones explícitos · qué NO hacer en v4.5

1. **No** introducir un sistema de permisos custom. El handshake de co-autoría se delega en GitHub (issue + CODEOWNERS).
2. **No** mover el TOC otra vez a otra parte. Esta es la última iteración de la pregunta "¿dónde vive el TOC?".
3. **No** mezclar glosario con comunidad otra vez. Glosario es navegación semántica; comunidad es co-autoría.
4. **No** abrir PDFs externos dentro del portal. La cita es un *handle* a la fuente.
5. **No** introducir Yjs/Liveblocks en v4.5. La pregunta del MVP es "¿saber quién participó y con qué %?" — no es "editar a la vez".
6. **No** dejar el `ComparativeSplit` envolviendo el `<article>` desde la página. La división vive en el layout, el page solo aporta contenido.

---

## 8. Bibliografía verificable

- React Resizable Panels — Nested Groups: <https://react-resizable-panels.vercel.app/examples/nested-groups>
- Obsidian Help · Outline plugin: <https://help.obsidian.md/Plugins/Outline>
- Obsidian Help · Graph view: <https://help.obsidian.md/Plugins/Graph+view>
- Obsidian Help · File explorer: <https://help.obsidian.md/Plugins/File+explorer>
- Citation.js docs: <https://citation.js.org>
- Citation File Format (CFF): <https://citation-file-format.github.io/>
- React Diff Viewer Continued (npm): <https://www.npmjs.com/package/react-diff-viewer-continued>
- Octokit REST: <https://octokit.github.io/rest.js/>
- Next.js `unstable_cache`: <https://nextjs.org/docs/app/api-reference/functions/unstable_cache>
- GitHub CODEOWNERS: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners>
- Habermas — Teoría de la acción comunicativa (referencia conceptual para "Deliberación"): Habermas, J. (1981). *Theorie des kommunikativen Handelns*.

---

## 9. Cierre · ¿Por qué este audit corta el ciclo de iteraciones?

Las 4 versiones previas (`v4.1 → v4.4`) se construyeron *resolviendo síntomas*. Cuando el usuario decía "el TOC no es legible aquí", la respuesta era moverlo. Cuando decía "comunidad y glosario son distintos", la respuesta era separar sub-tabs. Cuando decía "no veo que se pueda redimensionar", la respuesta era engrosar el handle.

Este audit hace explícita la **regla raíz** que rige las decisiones: el portal tiene **3 zonas con responsabilidades distintas**, y todo elemento de UI debe alinearse con la zona conceptualmente correcta. Una vez fijada esa regla:

- **Sidebar izquierdo** = navegación inter-doc (entre nodos del vault). Solo árbol + cmd-K.
- **Center** = el doc activo + comparación opcional. Resize interno autocontenido.
- **Right panel** = navegación intra-doc + relaciones del doc + comunidad del doc + asistente del doc.

Cada uno de los 11 issues encaja en una de esas zonas. Cada decisión D1-D8 es una consecuencia de la regla. Y los 4 audits de v4.3 quedan como *historia de cómo llegamos aquí*, no como deuda abierta.

> **Si en v4.6 vuelve a aparecer la pregunta "¿dónde poner X?", la respuesta no es mover X — es revisar la regla raíz y decidir si X redefine zonas.**

---

**Estado**: PROPOSED — esperando aprobación del usuario para iniciar Sprint v4.5 a.
