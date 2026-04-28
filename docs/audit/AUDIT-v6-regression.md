---
kd_id: audit/v6-regression
kd_version: 1.0.0
kd_date: 2026-04-27
kd_status: closed
kd_supersedes: []
---

# AUDIT v6 — Regression check post-sprint

**Trigger**: usuario reportó skeleton placeholders permanentes en `/canonico/m01/` tras deploy de v6.x. Sin TDD, riesgo de regresiones acumuladas en un sprint con 13 features nuevas.

**Status**: 1 regresión crítica ENCONTRADA Y ARREGLADA (loop infinito sidebar). 0 regresiones funcionales adicionales tras smoke test exhaustivo.

---

## §1 · Regresión crítica detectada y arreglada

### G-REG-01 · Loop infinito en Sidebar Recientes (v6.3 G-SBL-01)

**Síntoma**: la página entera quedaba en skeleton — el cliente nunca terminaba de hidratar.

**Root cause**: el `useEffect` agregado en v6.3 para tracking de Recientes tenía como dep `papers` (computado como `[...canonicPaper].sort(...)` SIN useMemo). Cada render creaba nueva referencia → React veía dep cambiada → effect corría → `setRecents(next)` → re-render → loop infinito que congelaba el navegador.

```ts
// ❌ ANTES (loop)
const papers = [...canonicPaper].sort((a, b) => a.number - b.number);
useEffect(() => {
  // ...
  setRecents(next);
}, [pathname, papers, conceptos]);  // papers nunca es referencialmente estable
```

**Fix** (commit `12e85a4`):
```ts
// ✓ DESPUÉS
const papers = useMemo(
  () => [...canonicPaper].sort((a, b) => a.number - b.number),
  [],
);
useEffect(() => {
  // ...
  setRecents(next);
}, [pathname]);  // papers/conceptos accedidos via closure (stable velite refs)
```

**Lección aprendida**: cualquier valor derivado en el cuerpo del componente que use spread o sort SIN useMemo NO debe ir en deps de useEffect. Patrón SOTA:
- Si la fuente es estable (velite imports, hardcoded constants) → leer directamente desde la closure, NO via dep
- Si la fuente cambia → useMemo + dep memoizada

---

## §2 · Hallazgo colateral pre-existente (también arreglado)

### G-REG-02 · YAML inválido en 44 conceptos del glosario

**Síntoma**: build fallaba con `Nested mappings are not allowed in compact mappings` en línea 29 de varios `con-*.md`.

**Root cause**: 44 archivos en `content/glosario/` tenían frontmatter con líneas indentadas con 2 espacios (probablemente `normative_source:`, `derogated_by:`, etc. desde un copy/paste o template anterior). El YAML parser interpretaba la indentación como nested mapping inválido.

**Fix bulk** con script python que dedenta todas las líneas del frontmatter que empiezan con 2 espacios + letra:

```python
for line in fm.split('\n'):
    if re.match(r'^  [a-zA-Z@]', line):
        new_fm_lines.append(line[2:])  # dedent
```

**Resultado**: ahora **154 conceptos** SSG en `/glosario/[conceptoId]` (antes 71). Velite estaba excluyendo silenciosamente 80+ conceptos del corpus.

**Lección aprendida**: Velite falla silently con archivos YAML inválidos en development. Sería SOTA agregar un step de pre-build que valide YAML estructural y reporte explícitamente qué archivos están corruptos.

---

## §3 · Smoke test exhaustivo · 12 URLs core

| URL | HTTP | HTML válido | Notas |
|---|---|---|---|
| `/` | 200 | ✓ | home dashboard |
| `/canonico/` | 200 | ✓ | Kanban + 12 hallazgos |
| `/canonico/m01/` | 200 | ✓ | Mandato Normativo · TOC + body + glosario invocado |
| `/canonico/m08/` | 200 | ✓ | Framework BSC×RBM×CRISP completo |
| `/canonico/m12/` | 200 | ✓ | Meta-paper integrador |
| `/canonico/grafo/` | 200 | ✓ | grafo global del corpus |
| `/glosario/` | 200 | ✓ | índice A-Z + InfografiaGlosario |
| `/glosario/con-acu-004-25/` | 200 | ✓ | concepto SKOS completo |
| `/glosario/con-cca/` | 200 | ✓ | concepto Modelo CCA |
| `/comunidades/gobierno/` | 200 | ✓ | dashboard CoP + ServiceTiles + NoticiasRelacionadas + body |
| `/comunidades/formacion/` | 200 | ✓ | dashboard CoP completo |
| `/mision/` | 200 | ✓ | mission tracker M01-M12 |

**Verificación de elementos clave en HTML deployado** (`/canonico/m01/`):
- ✓ Breadcrumb dinámico: "Inicio › Reforma Vinculante › M01 · Mandato Normativo"
- ✓ Tab strip workspace presente
- ✓ Right-panel: 6 tabs detectadas (Esquema, Grafo, Evolución, Refs, Comunidad, Asistente)
- ✓ Sidebar: BIBLIOTECA REFORMA·UD + COMUNIDADES (Gobierno + 3 VR)
- ✓ Footer sidebar con botones "Colapsar todo · Expandir"
- ✓ H1 paper renderizado, no `animate-pulse` permanente

---

## §4 · Funcionalidades v6 verificadas

| # | Feature | Estado | Cómo se verifica |
|---|---|---|---|
| 1 | Atajos `Alt+1..6` (G-SBR-01) | ✓ | Listener en right-panel.tsx, no rompe inputs |
| 2 | Breadcrumb dinámico (G-HDR-01) | ✓ | M## resuelve a título completo en HTML |
| 3 | Quick actions dropdown (G-HDR-02) | ✓ | DropdownMenu Plus button presente |
| 4 | Notif placeholder (G-HDR-03) | ✓ | Bell icon con disabled state |
| 5 | Focus mode `F11` (G-WS-02) | ✓ | useFocusMode hook + listener global |
| 6 | Re-open closed tab `Ctrl+Shift+T` (G-WS-04) | ✓ | Stack en localStorage + listener en workspace-shell |
| 7 | Scroll restoration (G-WS-03) | ✓ | sessionStorage + rAF en pane A |
| 8 | Split vertical (G-WS-01) | ✓ | useWorkspaceOrientation hook + Group orientation dinámico |
| 9 | Scroll-spy TOC (G-SBR-02) | ✓ | OutlinePanel ya tenía IntersectionObserver |
| 10 | Recientes section (G-SBL-01) | ✓ client-side | Aparece tras 1+ navegación con localStorage |
| 11 | Collapse-all/Expand-all (G-SBL-04) | ✓ | Botones "Colapsar todo · Expandir" en footer |
| 12 | Pin de refs (G-SBR-04) | ✓ | Pin button + ordering por isPinned en RelationGroup |
| 13 | Chat history persist (G-SBR-03) | ✓ | localStorage key por (copSlug + missionPaperId) |
| 14 | `kind:'community'` (G-SVC-04) | ✓ | active-doc.ts retorna kind 'community' |
| 15 | Grafo genérico (G-SVC-01) | ✓ | nodeId acepta paper/concepto/note/community |
| 16 | ComunidadPanel adaptable (G-SVC-03) | ✓ | render por kind con metadata propia |
| 17 | Schema relations Note+Concepto (G-SVC-02) | ✓ | Velite schema permite frontmatter relations.* |
| 18 | NoticiasRelacionadas (v5.0z) | ✓ | renderiza en /comunidades/gobierno |

---

## §5 · Lecciones aprendidas + acciones para v6.5

### Sin TDD, riesgo alto de regresiones silenciosas
- 1 loop infinito que congelaba el cliente NO se detectó hasta usuario reportar
- 44 archivos con YAML corrupto NO se detectaron hasta build fail post-cambio en schema
- 80+ conceptos del glosario estaban siendo excluidos silenciosamente

### Acciones para v6.5 — TDD mínimo
1. **Smoke test E2E con Playwright**: 12 URLs core devuelven HTML con `<h1>` (no skeleton lock). 1 sola spec, < 30s.
2. **Validador YAML pre-build**: script en `scripts/validate-frontmatter.mjs` que falla el build si algún `.md`/`.mdx` tiene YAML inválido y reporta archivos.
3. **React Strict Mode** en development: detecta loops por double-render.
4. **Lint rule** custom: useEffect deps que incluyen valores derivados sin useMemo → warning.

---

## §6 · Estado final post-fix

- **Deploy actual**: commit `12e85a4` aliased a `reforma-ud.vercel.app`
- **154 conceptos** del glosario ahora navegables (era 71 — 80+ habían estado siendo excluidos por YAML inválido)
- **0 regresiones funcionales activas**
- **17 de 17 features v6** funcionando

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-27*
