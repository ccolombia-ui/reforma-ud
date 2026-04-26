---
kd_id: audit/v4.3-workspace-comparativo
kd_version: 1.0.0
kd_status: PROPOSED
kd_doc_type: AUDIT
kd_title: v4.3 · Workspace comparativo + right-panel rebalanceado + scrollbars limpios
kd_created: 2026-04-26
kd_responsible: Carlos C. Madera
---

# AUDIT — v4.3 · Workspace comparativo + right-panel rebalanceado

> Reflexiones del usuario tras v4.2 deploy. 4 mejoras propuestas que requieren refactor del shell del portal. Plan SOTA + recomendación.

---

## 0. TL;DR

| # | Mejora | Effort | Beneficio |
|---|---|---|---|
| 1 | Tab "Grafo" en right-panel (mover grafo del documento aquí) | M | Right panel re-balanceado · centro liberado |
| 2 | Preguntas como **transclusiones inline** en el documento (no panel) | M | Flow continuo lector + scroll |
| 3 | Right sidebar **resizable** (paralelo a left) | S | Grafo puede ocupar más espacio |
| 4 | Centro split-comparativo (2 docs side-by-side) | L | Análisis comparativo M01 vs M04, etc. |
| 5 | Scrollbars **invisibles** + indicador "más abajo" | S | UX más limpia, sin chrome |

---

## 1. Análisis: tabs del right-panel hoy

Estado actual v4.2:

```
Right Panel (4 tabs)
├── Outline   ← REDUNDANTE (ya en sidebar izquierda como TOC inline)
├── Refs      ← BACKLINKS (mantener)
├── Preg      ← Comprensión pendientes (mover a transclusion en doc)
└── Chat      ← AI (mantener)
```

Problema: 4 tabs es too many. Outline duplica info. Preg interrumpe flow del lector.

### Propuesta v4.3

```
Right Panel (3 tabs reorganizados)
├── Grafo     ← NUEVO: grafo local del doc activo (vecindario semántico 2-hops)
├── Refs      ← Backlinks (igual)
└── Chat      ← AI (igual)
```

Outline se queda EXCLUSIVAMENTE en sidebar izquierda (la fuente confirmada por usuario).

Preguntas se transcluyen **inline** en el documento, después de cada sección que tiene comprehension question. Sintaxis Obsidian-friendly:

```mdx
## §2 Marco Teórico

…contenido de la sección…

> [!question] Comprensión §2
> ¿Qué tres marcos articulan el ciclo virtuoso?
> - [ ] Etzkowitz / Geels / Nowotny
> - [ ] Christensen / Wenger / Stokes
> - [ ] Clark / Kaplan / Kolb
> …
> _(verifica al final del paper)_
```

O componente React `<SectionGate />` ya existente, embebido inline al cierre de cada `<section>`.

---

## 2. Right sidebar resizable

Aplicar el patrón de `useLeftWidth` (commit `d9f9149`) al right panel:

```typescript
// lib/ui-state.ts (extensión)
export const RIGHT_SIDEBAR_MIN = 280;
export const RIGHT_SIDEBAR_MAX = 720; // Más generoso que el izq
export const RIGHT_SIDEBAR_DEFAULT = 320;

export function useRightWidth() { /* mismo patrón que useLeftWidth */ }
```

Drag handle en el **borde IZQUIERDO** del right panel (espejo del derecho del left).

**Caso de uso clave**: cuando el grafo está en el right panel, expandirlo a 720 px para análisis cómodo.

---

## 3. Centro split-comparativo (2 docs side-by-side)

### Patrón SOTA Obsidian
- Drag de un tab del workspace → spawna nuevo split horizontal
- Doc A | Doc B independientes, scroll cada uno por separado
- Click en wikilink dentro de Doc A: por default reemplaza Doc A; con Ctrl+Alt+click → abre en Doc B (split a la derecha)

### Implementación recomendada

**Stack ya disponible**: `react-resizable-panels` v4 (Group/Panel/Separator).

**Diseño**:

```typescript
// src/lib/doc-tabs.ts (extensión)
type TabPane = {
  paneId: 'A' | 'B';
  tabs: DocTab[];
  activeTabId: string | null;
};

type WorkspaceState = {
  panes: [TabPane] | [TabPane, TabPane]; // 1 o 2 panes
  splitOpen: boolean;
};
```

URL state: `?panes=m01,m04&active=A:m01,B:m04` (extensión del actual `?tabs=...`).

**Componente**:

```tsx
<Group orientation="horizontal">
  <Panel id="pane-A" defaultSize={splitOpen ? 50 : 100}>
    <DocTabsBar paneId="A" />
    <PaperBody pane="A" activeId={activeA} />
  </Panel>
  {splitOpen && <Separator />}
  {splitOpen && (
    <Panel id="pane-B" defaultSize={50}>
      <DocTabsBar paneId="B" />
      <PaperBody pane="B" activeId={activeB} />
    </Panel>
  )}
</Group>
```

**Trigger**: botón "split" en doc-tabs-bar + `Ctrl+Alt+click` en wikilink → spawna pane B.

**Reflow**: cuando se cierra pane B → unificar tabs en pane A.

### Implementación incremental

1. **Fase a**: workspace con 1 pane (estado actual).
2. **Fase b**: añadir "split" button → muestra pane B con el mismo doc.
3. **Fase c**: wikilinks Ctrl+Alt+click → abren en pane B.
4. **Fase d**: drag tabs entre panes (requiere `dockview` — fase tardía).

Effort: L (3-5 días para fase a-c sin dockview).

---

## 4. Scrollbars invisibles + indicador "más abajo"

### CSS approach (modern, cross-browser)

```css
/* Ocultar scrollbar pero mantener funcional */
.no-chrome-scroll {
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE/Edge legacy */
}
.no-chrome-scroll::-webkit-scrollbar {
  display: none;                /* Chrome/Safari */
}

/* Indicador "más abajo" — gradiente fade en el border-bottom */
.scroll-fade-bottom {
  position: relative;
}
.scroll-fade-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: linear-gradient(to top, var(--background) 0%, transparent 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms;
}
.scroll-fade-bottom[data-overflow="true"]::after {
  opacity: 1;
}

/* Chevron animado al final */
.scroll-fade-bottom[data-overflow="true"]::before {
  content: '⌄';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: var(--muted-foreground);
  opacity: 0.6;
  animation: bounce 2s infinite;
  pointer-events: none;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
  50% { transform: translateX(-50%) translateY(3px); opacity: 1; }
}
```

### React hook para detectar overflow

```typescript
function useOverflow(ref: RefObject<HTMLElement>) {
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollHeight > el.clientHeight);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return overflow;
}
```

Aplicar en sidebar containers + main article.

### Trade-off

- ✓ UX más limpia (Apple-like)
- ✗ Algunos usuarios extrañan el indicador de progreso del scroll
- Mitigación: shift+wheel → barra aparece temporalmente (toggle CSS class)

---

## 5. Re-balanceo total del workspace

Estado deseable post-v4.3:

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: profile · breadcrumb · search · theme · panel toggle    │
├──────┬──────────────────────────────────────────────┬───────────┤
│ Left │                                              │ Right     │
│ side │  Pane A (scroll independiente)               │ side      │
│ bar  │  ┌──────────────────────────┐                │ panel     │
│      │  │ DocTabsBar [pin·close]   │                │           │
│ Misi │  ├──────────────────────────┤                │ ┌──┬──┐  │
│ ones │  │ Paper M01 body           │                │ │GR│RF│CH│
│      │  │ + Mermaid SVG inline     │                │ ├──┴──┴──┤
│ Filt │  │ + Callouts                │                │ │ Grafo  │
│ er   │  │ + Section gates inline    │                │ │ local  │
│      │  │ + Footnotes               │                │ │ doc    │
│ Bibl │  │                           │                │ │        │
│ ⚛Ref │  └──────────────────────────┘                │ │        │
│ orma │                                              │ │  + drag│
│ Cuán │  ⫶ split (drag o Ctrl+Alt+click wikilink)    │ │   handle│
│ tica │                                              │ │   on    │
│  M01 │  Pane B (opcional, scroll independiente)     │ │   left  │
│  +TOC│  ┌──────────────────────────┐                │ │   edge  │
│   §0 │  │ DocTabsBar               │                │ │         │
│   §1 │  │ Paper M04 body           │                │ │         │
│   §2 │  └──────────────────────────┘                │ │         │
│ ─── │                                              │ │         │
│ Graf │  Bottom: footer + ChangelogDrawer pill        │ │         │
│ o gl │                                              │ │         │
└──────┴──────────────────────────────────────────────┴──────────┘
        ↑ resizable                                    ↑ resizable
        (200-480px)                                    (280-720px)
```

---

## 6. Plan de implementación (priorizado por ROI)

| Sprint | Items | Effort total |
|---|---|---|
| **v4.3a** (1 sem) | (3) Right resizable · (1) Tab Grafo · (5) Scrollbars limpios | M+S+S |
| **v4.3b** (1 sem) | (2) Preguntas inline (transclusion via `<SectionGate />`) | M |
| **v4.4** (1-2 sem) | (4) Centro split comparativo (fase a-c) | L |
| **v4.5** (post) | (4 fase d) Drag tabs entre panes vía `dockview` | L |

---

## 7. Decisiones cristalizadas (ADR)

- **ADR-V43-01** Right panel reduce a 3 tabs (Grafo, Refs, Chat). Outline queda exclusivo en left sidebar.
- **ADR-V43-02** Preguntas de comprensión se renderizan inline al final de cada `<section>` (transclusion), no como tab separada.
- **ADR-V43-03** Right sidebar usa `useRightWidth` con clamp [280, 720]px. Drag handle en borde izquierdo.
- **ADR-V43-04** Centro acepta hasta 2 panes side-by-side (`Group orientation="horizontal"` con `react-resizable-panels`). State en URL `?panes=...&active=A:m01,B:m04`. Trigger: split button o `Ctrl+Alt+click` en wikilink.
- **ADR-V43-05** Scrollbars `display:none` global + `<ScrollFadeIndicator />` en contenedores con overflow detectado vía `useOverflow` hook.
- **ADR-V43-06** `dockview` queda fuera de v4.3-4.4. Solo si v4.5 confirma necesidad de drag inter-pane.

---

## 8. Riesgos

| Riesgo | Mitigación |
|---|---|
| Centro split rompe routing existente | URL backwards compat: `?panes=m01` se interpreta como single pane |
| Pierde discoverability del scroll si invisible | Indicador chevron + fade gradiente claro |
| Right sidebar > 50% ancho deja main < 30% | Clamp dinámico: `max(720, 0.45 * vw)` |
| 2 panes simultáneos consumen 2x memoria de MDX render | Lazy hydration + Suspense boundary por pane |
| Drag handle right panel colisiona con scrollbar interno | Solo aparece en `:hover`, evitar overlap con scroll |

---

*kd_id: audit/v4.3-workspace-comparativo · v1.0.0 · CC BY-SA 4.0 · 2026-04-26*
