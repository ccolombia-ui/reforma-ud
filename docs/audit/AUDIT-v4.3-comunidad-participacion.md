---
kd_id: audit/v4.3-comunidad-participacion
kd_version: 1.0.0
kd_status: PROPOSED
kd_doc_type: AUDIT
kd_title: v4.3 · Right panel como espacio de Comunidad + transclusiones colapsables + hover-preview Obsidian
kd_created: 2026-04-26
kd_responsible: Carlos C. Madera
---

# AUDIT — v4.3 · Comunidad participativa + transclusiones inline + hover-preview Obsidian

> **Pivot conceptual del usuario**: el portal NO es una vía one-way (autor → lector). Es un **espacio bidireccional**: nosotros ponemos preguntas que cristalizan misiones (top-down → certifica comprensión), pero falta el **retorno desde la comunidad hacia el documento**: aportes, pre-saberes, comentarios.

---

## 0. TL;DR

El right panel se reorganiza como **panel de Comunidad**:

```
Right Panel (4 tabs en v4.3, vs 4 actuales rebalanceados)
├── 🌐 Grafo      ← grafo local del doc activo (vecindario semántico)
├── 🔗 Refs        ← backlinks desde otros docs
├── 💬 Comunidad   ← NUEVO: aportes + pre-saberes + preguntas (3 sub-secciones)
└── ✨ Chat        ← AI Asistente
```

**Outline** se queda EXCLUSIVO en sidebar izquierda (decisión v4.1).

**Las preguntas y pre-saberes se transcluyen inline + colapsables** en el documento mismo (callouts Obsidian-style), no solo en el panel. El panel agrega vista cross-section.

---

## 1. Análisis: tipos de contenido participativo

| Tipo | Dirección | Origen | Renderizado |
|---|---|---|---|
| **Pre-saberes** | top-down (autor → lector) | Frontmatter del doc + atoms del glosario | Callout `> [!hint]` colapsable al inicio de cada §sección |
| **Preguntas** | top-down (autor → lector) | `comprehension.ts` registry | Callout `> [!question]-` colapsable al final de cada §sección + agregado en panel |
| **Aportes** | bottom-up (lector → doc) | Input usuario (localStorage v4.3, backend v5+) | Inline anchor por sección + agregado en panel |
| **Comentarios** | bottom-up | Input usuario | Inline + agregado |

### Modelo conceptual unificado

Toda contribución es un **anchor a una sección** del documento. Schema:

```typescript
type CommunityAnchor = {
  id: string;
  paperId: string;             // m01, m04...
  sectionAnchor: string;       // §2-1-modos-produccion-conocimiento
  type: 'presaber' | 'pregunta' | 'aporte' | 'comentario';
  content: string;             // markdown
  author?: { name: string; role: RoleId };  // v5+ con auth
  createdAt: string;
  // Type-specific fields:
  presaberRefs?: string[];     // wikilinks a glosario [[glo-X]]
  preguntaQuestion?: ComprehensionQuestion; // 4 options + correctIndex
  aporteEmoji?: '👍' | '💡' | '⚠️' | '❓'; // intent del aporte
};
```

---

## 2. Pre-saberes: pattern Obsidian-style

### Frontmatter del doc

```yaml
---
id: m02
presaberes:
  abstract: [glo-piiom, glo-conpes-4069, glo-acu-csu-04-2025]
  intro: [glo-magna-charta-mcu-2020]
  marco-teorico: [glo-mode-1-gibbons, glo-mode-2-nowotny, glo-mode-3-carayannis, glo-FREIE]
  metodologia: [glo-crisp-dm]
---
```

Cada key matchea un `id` de heading (después de `rehype-slug`). Antes de cada `<section>` con id matchable, inyectar:

```markdown
> [!hint]- Pre-saberes para esta sección
> Para entenderla a fondo necesitas dominar:
> - [[glo-mode-1-gibbons]] — modelo lineal de producción de conocimiento
> - [[glo-mode-2-nowotny]] — conocimiento contextualizado y socialmente distribuido
> - [[glo-FREIE]] — Fractal Research, Education and Innovation Ecosystem
```

El `-` después del `[!hint]` colapsa por default (Obsidian convention).

**Implementación**: rehype plugin que lee `frontmatter.presaberes` y inyecta el callout antes de cada section. O componente React `<PresaberesCallout sectionId="..." />` que se mapea desde el frontmatter en build.

### Beneficio
- Lector que ya sabe los pre-saberes los colapsa y avanza.
- Lector que no, los expande y navega vía wikilinks (con hover-preview).
- Acelera lectura objetivo del usuario: "puede ser otro aspecto interesante para acelerar la lectura del documento".

---

## 3. Preguntas: transclusion inline + agregado en panel

### Inline (por sección)

Tras cada `<section>` con preguntas en `comprehension.ts`, inyectar (build-time o runtime):

```mdx
> [!question]- Comprensión §2 · Marco Teórico
> ¿Qué tres marcos articulan el ciclo virtuoso?
> - [ ] Etzkowitz / Geels / Nowotny
> - [ ] Christensen / Wenger / Stokes
> - [ ] Clark / Kaplan / Kolb
>
> _(Verificar tu respuesta abre el SectionGate inline)_
```

El callout `[!question]-` colapsado por default. Click expande → muestra `<SectionGate />` ya existente (v3.0).

**Diferencia con hoy**: hoy las preguntas viven SOLO en el right panel. Mover a inline mejora el flow.

### Panel "Comunidad" — sub-tab "Preguntas"

Agrega TODAS las preguntas del doc activo como mini-cards. Click navega al ancla. Útil para rever qué preguntas faltan responder antes de cerrar la misión.

---

## 4. Aportes: bottom-up (MVP localStorage, v5 backend)

### MVP en localStorage (v4.3)

Componente inline `<AporteAnchor sectionId="..." />` que renderiza como pequeño icono 💬 al margen derecho de cada section. Click abre popover con:
- Lista de aportes existentes (de localStorage filtrado por `paperId + sectionId`)
- Input para añadir nuevo aporte (textarea + emoji intent + nombre opcional)

LocalStorage key: `reforma-ud:aportes:m02:§2-marco-teorico` → array de `{id, content, emoji, author, createdAt}`.

### Panel "Comunidad" — sub-tab "Aportes"

Vista agregada de todos los aportes del doc activo. Filtros: por sección, por intent (👍/💡/⚠️/❓), por autor (v5+ con roles BPA-003).

### v5+ backend
- Vercel KV o Supabase para persistencia
- Auth con NextAuth + Discord OAuth (community)
- Moderación: roles + flags

---

## 5. Hover preview de wikilinks · Obsidian-style

### Estado actual (v4.2)
Componente `wikilink-preview.tsx` + `mdx-with-hover-preview.tsx` con Radix HoverCard, openDelay 300 ms, render lazy del MDX destino. Funciona para papers M##; para glosario aún resuelve broken (no hay glosario importado).

### Mejoras v4.3 (paridad con Obsidian Page Preview)

| Feature Obsidian | Estado actual | v4.3 |
|---|---|---|
| Delay configurable (default 300 ms) | ✓ 300 ms | mantener |
| Render del destino con su pipeline MDX | ✓ via MDXContent | mantener |
| Headings linkeados dentro del preview | ✗ | ✓ Permitir scroll a anchor |
| Scroll independiente en card | ✓ max-h con overflow | mantener |
| Cierre con `Esc` | ✗ | ✓ |
| `Ctrl+Click` desde el preview navega | ⚠️ | ✓ propagar modifiers |
| Image preview para `![[image]]` | ✗ | ✓ render `<img>` inline |
| Limit nesting depth | ✓ HoverDepthCtx max 1 | mantener |
| Hover over hover (sticky) | ✗ | ✓ closeDelay 200 ms permitir mover al card |

### Bloqueador descubierto

Tras Op A migration (s.mdx → s.markdown), la HoverCard ya NO renderiza con `MDXContent` — ahora `MDXContent` retorna HTML string vía `dangerouslySetInnerHTML`. El destino se debe renderizar igual: HTML string del paper destino.

**Necesidad de verificar/fix**:
1. `WikiLinkPreview` consume `paper.body` (string HTML) y lo pasa a `<MDXContent code={paper.body} />`
2. `MDXContent` ahora hace `<div dangerouslySetInnerHTML={...} />` → debería funcionar
3. Los wikilinks DENTRO del preview (nested) deben usar HoverDepthCtx para evitar pirámide

Verificar en producción y si falla, corregir el resolver.

---

## 6. Right panel post-v4.3

```
┌────────────────────────────┐
│ Asistente            [5]  │
├────────────────────────────┤
│ 🌐  🔗  💬  ✨            │
│ Graf Refs Com  Chat       │
├────────────────────────────┤
│                           │
│ Tab "💬 Comunidad" expand:│
│                           │
│ ┌─[ Pre-saberes ]──────┐  │
│ │ §0 Abstract: 3       │  │
│ │   [[glo-piiom]]      │  │
│ │   [[glo-conpes-4069]]│  │
│ │   ...                │  │
│ │ §1 Introducción: 1   │  │
│ │ §2 Marco Teórico: 4  │  │
│ └──────────────────────┘  │
│                           │
│ ┌─[ Preguntas ]────────┐  │
│ │ §2 — 4/4 verificadas │  │
│ │ §3 — 2/4 pendientes  │  │
│ │ §4 — sin preguntas   │  │
│ └──────────────────────┘  │
│                           │
│ ┌─[ Aportes ]──────────┐  │
│ │ 💡 §2.1 (Carlos C.)  │  │
│ │   "Mode 3 también    │  │
│ │    funciona como..." │  │
│ │ 👍 §3 (Ana M.)       │  │
│ │ ⚠️ §4.2 (Tomás A.)   │  │
│ │ [+ Añadir aporte]    │  │
│ └──────────────────────┘  │
└────────────────────────────┘
```

---

## 7. Plan de implementación

| Sprint | Items | Effort |
|---|---|---|
| **v4.3a** | Hover-preview Obsidian-paridad (Esc cierre, modifiers, image embeds, sticky) | S (1 día) |
| **v4.3b** | `<PresaberesCallout />` + frontmatter `presaberes:` schema + inject en build | M (2-3 días) |
| **v4.3c** | Preguntas transcluidas inline `[!question]-` + SectionGate al expandir | M (2 días) |
| **v4.3d** | Tab Comunidad en right-panel + Pre-saberes/Preguntas sub-tabs (cards agregadas) | M (2-3 días) |
| **v4.3e** | `<AporteAnchor />` inline + Aportes sub-tab + localStorage persistence | M (2-3 días) |
| **v4.4** | Right resizable + scrollbars limpios + centro split (de audit anterior) | L |
| **v5** | Backend Vercel KV + auth NextAuth + roles BPA-003 con permisos | XL (post-MVP) |

Total v4.3a-e: ~2 semanas para 1 dev. Cada sub-sprint shippeable independiente.

---

## 8. Decisiones cristalizadas (ADRs)

| ADR | Decisión |
|---|---|
| **ADR-V43C-01** | Right panel v4.3 = Grafo + Refs + Comunidad + Chat (4 tabs). Outline solo en sidebar izquierda. |
| **ADR-V43C-02** | "Comunidad" agrega 3 sub-secciones: Pre-saberes, Preguntas, Aportes (bottom-up). |
| **ADR-V43C-03** | Pre-saberes y Preguntas se transcluyen inline en el doc como callouts colapsables `[!hint]-` y `[!question]-`. |
| **ADR-V43C-04** | Aportes en localStorage como MVP. Schema `CommunityAnchor` define el modelo. |
| **ADR-V43C-05** | Hover preview busca paridad con Obsidian Page Preview core plugin: delay 300 ms, sticky 200 ms, Esc cierre, Ctrl+click desde preview, image embeds. |
| **ADR-V43C-06** | El backend de aportes (Vercel KV / Supabase) es v5 — para v4.3 usar localStorage, demuestra UX. |

---

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Pre-saberes requiere schema en CADA paper m##.mdx → mucho boilerplate | Auto-detectar pre-saberes vía wikilinks `[[glo-X]]` ya presentes en el body por sección. Frontmatter `presaberes:` solo override. |
| Aportes localStorage no persiste cross-device | Aceptable para MVP. Aviso UI: "Aportes guardados localmente. Para sincronizar entre dispositivos, espera v5 con auth." |
| Hover-preview de glosario aún muestra broken | Bloquedo hasta importar glosario (Phase 2 de S+5 — diferido). |
| Callouts colapsables `[!hint]-` requieren rehype-callouts theme:obsidian que ya tenemos | Confirmado funciona, solo añadir CSS para el chevron animado en `.callout-collapsed`. |

---

## 10. Síntesis para usuario

Tu visión completa el bucle bidireccional del portal:

```
       ┌─────────────────────────────────┐
       │  Top-down (nosotros → lector)   │
       │                                 │
       │  • Pre-saberes (qué necesitas)  │  ← v4.3b
       │  • Preguntas (cristalizan       │  ← v4.3c
       │    misión, certifican CCA)      │
       │                                 │
       └────────────┬────────────────────┘
                    │
                    ▼
            DOCUMENTO M02
                    ▲
                    │
       ┌────────────┴────────────────────┐
       │  Bottom-up (lector → documento) │
       │                                 │
       │  • Aportes (💡 ⚠️ 👍 ❓)          │  ← v4.3e
       │  • Comentarios anclados a §     │
       │                                 │
       └─────────────────────────────────┘

  Hover-preview Obsidian-style en cada            ← v4.3a
  wikilink → reduce fricción al navegar
  pre-saberes y referencias.
```

Cada lector enriquece el corpus para los siguientes. El docente ve agregado en panel "Comunidad". El estudiante navega pre-saberes con un click. La misión cierra con preguntas verificadas. Esto ES la ContractCommunity participativa.

---

*kd_id: audit/v4.3-comunidad-participacion · v1.0.0 · CC BY-SA 4.0 · 2026-04-26*
