---
kd_id: audit/v8b-document-lifecycle
kd_version: 1.0.0
kd_date: 2026-04-29
kd_status: CLOSED
kd_doc_type: AUDIT
kd_title: v8b · Ciclo de vida de documento publicado · kd_status como fuente de verdad
---

# AUDIT v8b · Ciclo de vida del documento publicado

> **Sprint:** v8b (primera batería post-v8)
> **Estado:** IMPLEMENTADO ✓ · tests verdes · 0 errores TS

---

## Decisión central

**`kd_status` en el frontmatter del paper es la única fuente de verdad de visibilidad.**
Los conceptos del glosario son **derivados**: visibles si al menos un paper con `kd_status: PUBLISHED` los referencia. Sin configuración manual en conceptos.

---

## Lifecycle de un paper

```
DRAFT (default)
  │  autor escribe desde Obsidian
  ▼
IN_REVIEW
  │  pares internos revisan
  ▼
PUBLISHED  ←── portal lo muestra + habilita sus conceptos
  │
  ▼
DEPRECATED ←── sigue visible con badge de aviso
```

### Regla de visibilidad

| `kd_status` | ¿Visible en portal? | ¿Conceptos visibles? |
|---|---|---|
| `DRAFT` | No | No (si solo este paper los cita) |
| `IN_REVIEW` | No | No |
| `PUBLISHED` | **Sí** | **Sí** |
| `DEPRECATED` | Sí (con aviso) | Sí |

---

## Workflow desde Obsidian

El autor cambia **una sola línea** en el frontmatter del paper:

```yaml
# Antes (invisible)
kd_status: DRAFT

# Después (visible en portal)
kd_status: PUBLISHED
```

Commit → push → Vercel deploya → paper y sus conceptos aparecen.
**Sin tocar ningún concepto individualmente.**

---

## Arquitectura implementada

### `src/lib/show-drafts.ts` (fuente de verdad)

```typescript
isPublished(paper)          // true si PUBLISHED | DEPRECATED
filterPublished(papers[])   // filtra array por kd_status
buildPublishedConceptIds()  // Set de conceptos referenciados por papers publicados
isConceptVisible(id, Set)   // concepto visible si está en el Set
```

### Velite `canonicPaper` transform

`draft` es **computado** desde `kd_status`:
```typescript
draft: data.kd_status !== 'PUBLISHED' && data.kd_status !== 'DEPRECATED'
```
Backward-compatible con código que use `paper.draft`.

### Consumidores actualizados

| Componente | Cambio |
|---|---|
| `sidebar.tsx` | `filterPublished()` para papers · `isConceptVisible()` para glosario |
| `mission-state.ts` | `isPublished()` para `PAPERS_ORDER` |
| `canonico/[mid]/page.tsx` | `generateStaticParams` + `notFound` usan `isPublished()` |
| `build-graph.mjs` | `SHOW_DRAFTS=true` env para dev |

---

## Estado de contenido

### Papers
| Papers | kd_status | Visible |
|---|---|---|
| M01–M07 | `PUBLISHED` | ✅ |
| M08–M12 | `DRAFT` | ❌ |

### Conceptos afectados (derivado automático)
| Concepto | Solo citado por | Resultado |
|---|---|---|
| `con-ccr-capacity-cost-rate` | M08 | Oculto |
| `con-nicsp-marco-estado-resultados` | M08 | Oculto |
| `con-ccp-clasificacion-presupuestal` | M09/M10 | Oculto |
| `con-snies-dataset-men` | M11 | Oculto |
| `con-spadies-snies-dataset-men` | M11 | Oculto |
| `con-ole-observatorio-laboral` | M08/M11 | Oculto |
| `con-bsc-s`, `con-rbm-gac`, `con-cca`… | M01-M07 también | ✅ Visible |

---

## Para activar en dev (ver contenido oculto)

```bash
# .env.local
NEXT_PUBLIC_SHOW_DRAFTS=true   # portal UI
SHOW_DRAFTS=true                # build-graph.mjs
```

---

## Herencia a v9

En v9 (`aleia-portal-engine`), este patrón viaja sin cambios:
- `kd_status` en frontmatter → campo del schema KDMO (ya definido)
- `show-drafts.ts` → `packages/portal-engine/src/lib/content-visibility.ts`
- `buildPublishedConceptIds()` → helper genérico del engine
- Cada `apps/<proyecto>/` hereda la lógica, solo cambia el contenido
