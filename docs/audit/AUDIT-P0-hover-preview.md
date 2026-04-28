---
kd_id: audit/P0-hover-preview
kd_version: 1.0.0
kd_date: 2026-04-27
kd_status: active
kd_priority: P0
---

# AUDIT P0 — Hover-preview de wikilinks · Issue activo

> **STATUS**: 1 root cause crítico ARREGLADO en v6.5.1 (commit pendiente).
> 1 mejora secundaria HECHA. 1 follow-up pendiente para v6.6.

**Síntoma reportado por usuario** (2026-04-27): "lo hemos activado varias veces pero al hacer cambios se pierde". Cada wikilink Obsidian al pasar el cursor activa un popup que muestra el archivo vinculado — utilísimo para lectura rápida sin click. Debe funcionar en TODAS PARTES (body, ventana emergente, links del panel derecho) EXCEPTO en la barra lateral izquierda.

---

## §1 · Root cause real (ARREGLADO en v6.5.1)

**No era hover-preview roto** — era que **154 wikilinks `[[glo-*]]` apuntaban a URLs `/glosario/glo-*` que NO existen**. Los conceptos del glosario viven en `/glosario/con-*` desde v5.0w cuando se renombraron. El hover-preview funcionaba técnicamente (`data-slot="hover-card-trigger"` activo) pero todos los enlaces estaban marcados `wikilink-broken` (rojos) y mostraban "Concepto no encontrado" en el popup.

**Evidencia en HTML deployed pre-fix**:
```html
<a class="wikilink ... wikilink-broken text-destructive/80"
   href="/glosario/glo-crisp-dm/">  ← URL inexistente
```

**Fix aplicado** (script python bulk):
- 154 ocurrencias en body de papers (m01-m12) reemplazadas: `[[glo-X]]` → `[[con-X]]`
- 74 referencias en frontmatter `relations.custom.glosario: ["glo-*"]` → `["con-*"]`
- 4 IDs requirieron alias específico (no era simple replace de prefijo):
  - `glo-comunidades-practica` → `con-cops-wenger`
  - `glo-cuadrante-pasteur` → `con-cuadrante-pasteur-stokes`
  - `glo-iuca-ivc-ivo` → `con-iuca-ivc-ivo-indices`
  - `glo-smmlv-pais-equivalente` → `con-smmlv-pais-2026`

**Verificación post-fix**: 267 páginas SSG (antes 184) — más conceptos resuelven correctamente.

---

## §2 · Por qué se "perdía" en cambios anteriores

El usuario reporta que se ha activado "varias veces" y luego se pierde. Hipótesis con evidencia:

1. **Renombre `glo-` → `con-` en v5.0w** (KDMO concepto v5.2) cambió los archivos del glosario pero NO los wikilinks en el corpus. Cada vez que se reactivaba el hover-preview funcionaba técnicamente, pero los previews quedaban "broken" porque los enlaces apuntaban a URLs inexistentes.

2. **Sin smoke E2E hasta v6.5** que valide hover-preview funcional, las regresiones pasaban silenciosamente al usuario.

---

## §3 · Comportamiento esperado por zona

| Zona | Hover-preview | Estado actual post-v6.5.1 |
|---|---|---|
| Body MDX en pane A (workspace principal) | ✓ debe activar | ✓ funciona (ahora con URLs válidas) |
| Body MDX en panes B+ (split view) | ✓ debe activar | ✓ funciona |
| Wikilinks dentro del popup hover (anidados) | ✓ debe ser clickable | ✓ NEW v6.5.1: usa `MDXWithHoverPreview` en lugar de `MDXContent` raw |
| **RefsPanel items** (right sidebar) | ✓ debe activar (usuario lo pidió) | ⏸ FOLLOW-UP v6.6: actualmente usa `<Link>` plano sin HoverCard |
| **EsquemaTab items** (right sidebar) | NO necesario (son TOC headings) | NA |
| **Sidebar izquierdo** | ✗ NO debe activar (decisión UX explícita del usuario) | ✓ ningún Link de sidebar usa HoverCard |

---

## §4 · Mejora secundaria aplicada en v6.5.1

**`wikilink-preview.tsx` líneas 235, 266**: el body interno del popup ahora usa `MDXWithHoverPreview` en lugar de `MDXContent` raw. Esto hace que los wikilinks DENTRO del popup también sean interactivos (clickables vía Link de Next.js para navegación correcta). NO activan hover preview anidado (por diseño G18 — evita "pirámide de popups"), pero al menos son funcionales.

---

## §5 · Follow-up pendiente para v6.6 — RefsPanel hover-preview

**Gap**: cada `<RelationItem>` en `refs-panel.tsx` usa `<Link>` directo. Para activar hover-preview en items del panel derecho, hay que envolver con `<HoverCard>` cuando el id es resoluble (paper/concepto/note).

**Implementación propuesta** (~30 líneas):
```tsx
import { WikiLinkPreview } from './wikilink-preview';

// Dentro de RelationItem:
const isResolvable = /^m\d{2}$/i.test(id) || /^con-/.test(id);
if (isResolvable && resolved.href) {
  return (
    <WikiLinkPreview href={resolved.href}>
      <Link href={resolved.href}>...</Link>
    </WikiLinkPreview>
  );
}
```

**Tests E2E para v6.6**:
- Hover sobre item de Refs panel → popup aparece en <500ms
- Popup muestra título + excerpt del doc enlazado
- Click en popup navega correctamente

---

## §6 · Lecciones aprendidas

1. **Renames de IDs deben tener migración bulk** — cuando se renombra el prefijo de archivos del corpus (`glo-` → `con-`), las referencias en otro contenido NO migran solas. Necesitamos un script `migrate-prefix.mjs` que sea parte del refactor.

2. **Smoke E2E debe testear hover-preview funcional** (no solo presencia de markup). Posible test:
   ```ts
   await page.locator('a.wikilink').first().hover();
   await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible();
   await expect(page.locator('[data-slot="hover-card-content"]'))
     .not.toContainText('Concepto no encontrado');
   ```

3. **Velite emite `wikilink-broken` para enlaces no resueltos** — el HTML CSS class indica que el enlace no se resolvió. Un linter pre-build podría grep `wikilink-broken` en el output de Velite y fail si aparece.

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-27*
