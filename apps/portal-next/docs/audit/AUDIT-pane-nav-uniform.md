---
kd_id: audit/pane-nav-uniform
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: active
kd_priority: P2
---

# AUDIT · Uniform Pane Navigation Bar (v7.12)

> **Sprint v7.12** · ambos panes del split deben tener la misma barra de navegación superior.

---

## §1 · Problema pre-fix

Al activar el split (splitMode=ON), pane A y pane B mostraban barras diferentes:

| Atributo | Pane A (DocTabsBar) | Pane B (PaneShell) |
|---|---|---|
| Sticky offset | `top-14` (erróneo en pane scroll) | `top-0` ✓ |
| Márgenes | `-mx-4 md:-mx-8` (full-bleed) | sin márgenes extra ✓ |
| Letter badge | ninguno | `B`, `C`... ✓ |
| Back/Forward | `←` `→` con border-r | `←` `→` sin border-r ✓ |
| Hint shortcut | `Ctrl+Tab` kbd visible | ninguno ✓ |

El `top-14` era correcto en **single-pane** (la barra debe quedar debajo del
header global `h-14`). Pero en split mode el pane A está dentro de un Panel con
`overflow-y-auto` cuyo scroll context ya empieza debajo del header → `top-0`
es el valor correcto.

## §2 · SOTA Obsidian

Obsidian **no diferencia** entre el "primary leaf" y los secundarios en su UI.
Todos los panes muestran la misma barra: back/forward + tabs + menu "⋮".
No hay hints de teclado en la barra (atajos se descubren vía Command Palette).

## §3 · Adaptación (v7.12)

`DocTabsBar` lee `useSplitMode()`. Cuando `splitMode=true`:

| Atributo | Valor split mode |
|---|---|
| Sticky | `top-0` (scroll context del pane, sin header global encima) |
| Márgenes | `-mx-4 md:-mx-6 -mt-2` (contrarrestan wrapper `px-4 md:px-6 py-2` de MultiPaneLayout) |
| Letter badge | `A` (mismo estilo `variant="secondary"` que pane B) |
| Back/Forward | sin `border-r` separador, aria-label con "pane A" |
| Hint shortcut | omitido (Ctrl+Tab sigue funcionando, sin texto visible) |

Cuando `splitMode=false` (single-pane): sin cambios respecto al comportamiento previo.

## §4 · Archivos afectados

### Modificados
- `src/components/biblioteca/doc-tabs-bar.tsx` — split-mode branch en DocTabsBarInner

### Tests
- `e2e/smoke.spec.ts` — G-PANE-01: badge "A" visible en pane A cuando split activo

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28*
