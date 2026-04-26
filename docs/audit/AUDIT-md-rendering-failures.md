---
kd_id: audit/md-rendering-failures
kd_version: 1.0.0
kd_status: ACTIVE
kd_doc_type: AUDIT
kd_title: Análisis de fallos de renderización MD en v4.1 + plan de fix
kd_created: 2026-04-26
kd_responsible: Carlos C. Madera
---

# AUDIT — Fallos de renderización MD · `reforma-ud` v4.1 + plan de fix

> Reporte usuario sobre 4 issues visibles tras el deploy v4.1 (commit `ce5562c`).
> Análisis de causa raíz + recomendación SOTA por cada issue.

---

## Issue #1 · Embeds `![[fig-X]]` se renderizan como link broken (strikethrough)

### Síntoma
En `/canonico/m02`, el embed `![[fig-MI12-08--evolucion-mode-1-2-3]]` aparece con strikethrough y prefijo ⚠ (clase `wikilink-broken`). En vez de mostrar el diagrama Mermaid correspondiente.

### Causa raíz
`@flowershow/remark-wiki-link@3.4.0` README dice explícitamente:
> Future support:
> - [ ] Support `![[Embed note]]`
> - [ ] Support `![[Embed note#heading]]`

**El plugin solo soporta embeds de imagen/video/audio/PDF, NO de archivos `.md`**. Así que cuando ve `![[fig-MI12-08]]`, intenta resolverlo contra el `files` array. Como el archivo `fig-MI12-08.md` no está en `content/`, lo marca como broken (`wikilink-broken`). Strikethrough viene del CSS G07.

### Datos
- 30+ archivos figura en `H:/.../3-diseño-capitulo-libro/02-figuras/fig-MI12-NN--*.md`
- Cada uno contiene un bloque ` ```mermaid ... ``` `
- Los 12 papers M01-M12 referencian estos embeds (1-15 por paper)

### Soluciones evaluadas

| Opción | Descripción | Trade-off |
|---|---|---|
| **A. Build-time inline** | Extender `import-book-sections.mjs`: detectar `![[fig-X]]`, leer `fig-X.md`, inline contenido (mermaid block) en el lugar | ✅ Zero overhead runtime; ✅ Fix inmediato; ❌ figuras se duplican si se referencian en N papers |
| B. Custom remark plugin | Plugin que resuelve `![[fig-X]]` → leer + parsear + inline en build | ✅ Reutiliza referencias; ❌ +50 LOC mantenimiento |
| C. Importar figuras como notas | Velite collection nueva `figura`, link `[[fig-X]]` → página propia | ❌ Pierde flow inline (cada figura = ruta separada); ❌ UX worse |
| D. Esperar Flowershow | Implementen `![[Embed note]]` en futuro release | ❌ ETA desconocido |

### Recomendación
**Opción A — build-time inline en script de import**. Razón: zero runtime cost, fix inmediato, conserva flow visual. La duplicación de figuras (referenciadas N veces) es aceptable porque las figuras son chicas (~20 LOC mermaid).

---

## Issue #2 · Print dialog muestra página en blanco

### Síntoma
Click en "Guardar como PDF" abre el dialog del browser pero el preview es blanco. No imprime el contenido del paper.

### Causa raíz hipótesis (probable)
El stylesheet `@media print { ... }` que añadí en G16 (v3.4) hace:
```css
[data-sidebar],
[data-pagefind-ignore]:is(aside),
header[data-pagefind-ignore],
.no-print {
  display: none !important;
}
```

`[data-pagefind-ignore]:is(aside)` puede estar matching cualquier `<aside>` con `data-pagefind-ignore`. Si el `<article>` tiene un ancestro con esos atributos, se oculta. Posible: el `RightPanel` y otros `<aside>` están ocultos correctamente, pero el `<main>` o algún wrapper también podría estar match.

Otra hipótesis: el `SplitWorkArea` del paper view (commit `94842a9`) cuando se renderiza con `<Group orientation="horizontal">` quizás causa height: 0 en print.

### Solución recomendada
Auditar la cascada CSS print con devtools `Application > Print emulation`. Probable fix:
1. Especificar selector más estricto: `aside[data-pagefind-ignore]` en vez de `[data-pagefind-ignore]:is(aside)`
2. Forzar visibilidad explícita en `article` y `main`:
   ```css
   @media print {
     article, main, .prose-paper { display: block !important; visibility: visible !important; }
   }
   ```
3. Reset al `SplitWorkArea` Group/Panel en print: `display: block`, `height: auto`.

---

## Issue #3 · TOC sidebar no es colapsable progresivamente

### Síntoma
TOC inline en sidebar muestra TODOS los niveles (H2 + H3) expandidos. El usuario quiere progressive disclosure: solo H1/H2 por defecto, click para expandir H3.

### Causa raíz
Mi implementación actual de `TocSidebarItem` recursa hasta `depth < 2` siempre. No hay state de open/closed por nivel.

### Solución recomendada
Añadir state `expanded: Set<string>` por entry id. Al click en un H2 con sub-items, alternar entre colapsado/expandido. Default: solo nivel 0 expandido (H2). Persistencia opcional en localStorage por paperId.

### UX detail
- `>` chevron a la izquierda cuando hay sub-items
- Auto-expand cuando un sub-item está visible vía scroll-spy (mantener contexto)
- Highlight del sub-item activo

---

## Issue #4 · Estilo académico inferior al libro físico Young & Freedman

### Síntoma
Los papers en `reforma-ud` se ven menos pulidos que la sección de referencia (`sec-27-0--introduccion.md` del libro de física Young & Freedman). Específicamente:
- Callouts con menos énfasis visual
- Listas con menos jerarquía
- Math inline `$\vec{F}$` puede estar sin proper KaTeX styling
- Embeds de figuras rotos (issue #1 ya cubierto)

### Análisis
La sección física referenciada usa:
1. **Frontmatter** con `cssclasses: [keter-iso]` (custom CSS class)
2. **Callouts** Obsidian: `[!abstract]`, `[!question]`, `[!note]`, `[!example]-` (collapsed)
3. **Math inline**: `$\vec{F}$`, `$\vec{F} = q\vec{E}$`
4. **Embeds** con paths absolutos: `![[R990-msms/2--fisica/.../fig-27-mri]]`
5. **Wikilinks de navegación**: `→ Sección siguiente: [[R990-msms/.../sec-27-1]]`

Nuestro stack ya soporta 1-3:
- ✅ KaTeX inline + display
- ✅ Callouts via `rehype-callouts` theme:obsidian
- ⚠️ Embeds rotos (issue #1)
- ✅ Wikilinks via `@flowershow/remark-wiki-link`

### Gap real
**No es de stack — es de CSS polish**. Necesitamos verificar:
1. `prose-paper` class aplica los estilos academic-grade que ya definimos en `globals.css`
2. KaTeX dark mode tiene contraste correcto (G11 fix)
3. Callouts tienen `border-l-4` con color por type (info/abstract/question/warning/example/note)
4. Math display ($$ ... $$) tiene scroll horizontal en mobile + max-width responsive
5. Tablas tienen estilo (border, header bg, zebra rows)

### Solución recomendada
1. Auditar `prose-paper` class y mejorar:
   - Headings: `H1 text-4xl font-bold`, `H2 text-2xl mt-8 border-b pb-2`, `H3 text-xl mt-6`
   - Lists: `space-y-2` con `marker:font-bold marker:text-primary`
   - Callouts: confirmar que rehype-callouts theme:obsidian aplica los colores por tipo
   - Tablas: `min-w-full divide-y border` con `thead bg-muted`
2. Aplicar `cssclasses` del frontmatter como className adicional al article (`<article className={`prose-paper ${paper.cssclasses?.join(' ')}`}>`)
3. Crear preset CSS `keter-iso` en `globals.css` con tipografía serif para body + sans para headings
4. Math inline: forzar `font-family: KaTeX_Math` y mejorar spacing alrededor

---

## Plan de implementación (priorizado por ROI)

| # | Fix | Effort | Issue resuelto |
|---|---|---|---|
| 1 | Inline figures en `import-book-sections.mjs` | M (1h) | #1 (figuras Mermaid renderizan) |
| 2 | TOC progressive disclosure con state expanded | S (30min) | #3 (TOC colapsable) |
| 3 | Print CSS polish + selectors estrictos | S (30min) | #2 (PDF descargable) |
| 4 | `prose-paper` class polish + cssclasses passthrough | M (1h) | #4 (estilo academic-grade) |

Total ≈ 3 horas de trabajo. Bloqueador deploy: el bug Vercel registry/pnpm. Mitigado con `npm install` en `vercel.json` (commit `6eb3c8a`).

---

## Best practice SOTA: rendering MD academic-grade

Lecciones cristalizadas:

1. **Embeds `![[ref]]` SOLO funcionan para media (img/video/audio/PDF)** con `@flowershow/remark-wiki-link`. Para embeds de notas/figuras `.md`, hay 3 opciones: build-time inline (recomendado), custom remark plugin, o esperar a que Flowershow lo soporte.

2. **Callouts Obsidian** (`> [!abstract]`, `> [!warning]`, `> [!example]-`) ya funcionan via `rehype-callouts` theme:obsidian. Soportan colapsado con `-` suffix.

3. **Math KaTeX**: `$inline$` y `$$display$$` requieren `remark-math` + `rehype-katex` (ya integrados). Dark mode necesita override CSS (G11 fix).

4. **Mermaid**: bloques ` ```mermaid ` se renderizan via `rehype-mermaid` 3 al build (SSG). Si la figura es un archivo separado (como en el libro de física), hay que inlinearlo o crear collection separada.

5. **Print stylesheet**: usar selectores estrictos (`aside[data-...]`, no `[data-...]:is(aside)`), forzar `display: block` en main/article, ocultar `.no-print` con `!important`.

6. **TOC sidebar**: progressive disclosure (default H2 only, click para H3+), scroll-spy con IntersectionObserver, persistencia opcional en localStorage.

7. **`cssclasses` Obsidian**: pasarlas al `<article>` como className para preservar custom styling cross-target.

---

*kd_id: audit/md-rendering-failures · v1.0.0 · CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · 2026-04-26*
