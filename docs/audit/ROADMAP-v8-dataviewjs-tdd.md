---
kd_id: roadmap/v8-dataviewjs-tdd
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: pending-approval
kd_supersedes: []
kd_related: [audit/dataviewjs-vercel-sota]
---

# ROADMAP v8 · DataviewJS portability · TDD aditivo

> **Compromiso central**: lo que renderiza hoy debe seguir renderizando idénticamente. Cada sprint introduce solo cambios verificables, con tests que detecten regresión visual y/o estructural antes de avanzar al siguiente.

---

## §0 · Estado actual (cambios in-flight, NO commiteados)

| Archivo | Cambio | Riesgo | Tests existentes |
|---|---|---|---|
| `velite.config.ts` | +13 campos opcionales TPL v2.0 al schema concepto | 🟢 cero (additive, defaults seguros) | sin tests directos — validados por build |
| `scripts/lib/glosario-transform.mjs` | STRIP_KEY_PATTERNS reducido + cleanBody emite sentinels DV + MetaBind resuelve a valor | 🔴 rompe 2 tests existentes (encodan comportamiento viejo) | `src/lib/glosario-transform.test.ts` (8 describes, 19 its) |
| `scripts/sync-glosario.mjs` | pasa `keys` a `cleanBody` | 🟢 backward-compat (cleanBody acepta keys=null) | `scripts/test-sync-vault.mjs` |
| `src/components/glosario/*.tsx` | 6 componentes nuevos (types + 5 DV) | 🟢 zero risk (no consumidos aún) | sin tests aún |

**Tests rotos por cambios in-flight** (ambos esperados — encodan comportamiento que justamente cambiamos):
- `cleanFrontmatter · campos prohibidos por Velite` → ya no strip-eamos `concepto_*`, `tupla_*` (porque ahora los queremos en velite)
- `STRIP_KEY_PATTERNS · cobertura mínima` → patrones críticos eliminados intencionalmente

**Tests que SIGUEN pasando** (verifican que el comportamiento crítico se preserva):
- splitFrontmatter, parseYamlKeys (sin cambios)
- cleanBody dataviewjs/dataview blocks (siguen sin contener `dv.current()` etc.)
- cleanBody MetaBind (sigue sin contener `INPUT[`)
- cleanBody wikilinks relativos (sin cambios)
- cleanBody normalización espacios (sin cambios)
- cleanBody pureza/idempotencia (preservada)

---

## §1 · Principios TDD aditivos

1. **Cada cambio escrito tiene un test que lo valida**
2. **Cada cambio escrito mantiene verde toda regresión visible** — cualquier concepto que renderiza hoy debe seguir renderizando con el mismo HTML output (modulo los nuevos sentinels, que ConceptoBodyClient resuelve)
3. **Los tests que codifican comportamiento OBSOLETO se reemplazan, no se mantienen** — pero solo en el sprint que cambia ese comportamiento
4. **Cada sprint termina con build verde + visual smoke en localhost** antes de avanzar
5. **Cada sprint se puede revertir aisladamente** (un commit = un sprint)
6. **Despliegue solo después de validar localmente** — no se pushea a Vercel hasta que el sprint completo está estable

---

## §2 · Roadmap por sprints (8 + opcionales)

### Sprint S0 · Baseline + revert in-flight (0.5 días)

**Goal**: Capturar el estado actual de rendering para detectar regresión, y revertir los cambios in-flight para empezar limpio.

**Steps**:
- [ ] S0.1 · Snapshot test: render HTML de `con-acu-004-25` body antes de cambios → guardar baseline
- [ ] S0.2 · Snapshot test: render HTML de 3 conceptos sin DV (`con-cca`, `con-mipg-funcion-publica`, `con-iso-21001`) → baseline
- [ ] S0.3 · `git restore` de los 4 archivos modificados; `rm -rf src/components/glosario/`
- [ ] S0.4 · Verificar baselines siguen idénticos
- [ ] S0.5 · Build verde; `pnpm test` verde; `pnpm test:sync-vault` verde

**Test gate**: 100% tests existentes pasando + 3 baseline snapshots guardados.

**Deliverable**: rama limpia + tests baseline (commiteados).

**Approval gate**: ✋ verificación manual en `localhost:3000/glosario/con-acu-004-25` — debe verse igual a producción actual.

---

### Sprint S1 · Schema preservation (1 día)

**Goal**: Velite ahora lee y preserva los campos TPL v2.0 desde el frontmatter. Sync deja de strip-earlos. **Cero cambio visual** — los datos están disponibles via `c.concepto_facet_normative` etc. pero ningún componente los usa todavía.

**Steps**:
- [ ] S1.1 · Extender velite schema concepto (additive, todos optional con defaults)
- [ ] S1.2 · Test nuevo: `concepto loaded from velite preserves concepto_prerequisitos` (smoke)
- [ ] S1.3 · Reducir STRIP_KEY_PATTERNS — eliminar `^tupla_/`, `^concepto_/`, `^applicable_domain/`, etc.
- [ ] S1.4 · **Reemplazar** test `cleanFrontmatter · campos prohibidos` con: `cleanFrontmatter · preserva campos TPL v2.0` (test inverso de comportamiento)
- [ ] S1.5 · **Reemplazar** test `STRIP_KEY_PATTERNS · cobertura mínima` con: `STRIP_KEY_PATTERNS · solo campos NO-TPL`
- [ ] S1.6 · Re-correr sync (NO push a vault) → snapshot diff de `content/glosario/con-acu-004-25.md`: deben aparecer las nuevas YAML keys, body unchanged
- [ ] S1.7 · `pnpm build` verde
- [ ] S1.8 · Smoke en localhost: 3 conceptos baseline siguen renderizando idénticamente (excepto por nuevas keys YAML que no afectan visual)

**Test gate**: 100% tests pasando (los 2 reemplazados + 1 nuevo); baselines de 3 conceptos sin DV idénticas; sync diff es solo additive.

**Deliverable**: 1 commit `feat(velite): preserve TPL v2.0 fields in concepto schema`

**Approval gate**: ✋ verificar localhost — los 3 conceptos baseline + `con-acu-004-25` (que aún muestra DV crudo) siguen como hoy.

---

### Sprint S2 · Componentes DV aislados (2 días)

**Goal**: Construir los 9 componentes React en aislamiento, cada uno con tests propios. **Ninguno se conecta al render aún**.

**Steps por componente** (repetir):
- [ ] Sx.1 · Crear `dv-{name}.tsx` con props tipados desde `types.ts`
- [ ] Sx.2 · Test vitest: `renders correctly with sample data`
- [ ] Sx.3 · Test vitest: `renders fallback when data missing`
- [ ] Sx.4 · Test a11y mínima: tiene roles/headings semánticos

**Componentes (orden por frecuencia de uso en corpus)**:
- [ ] S2.1 · `types.ts` (sin tests, solo TS)
- [ ] S2.2 · `<DvPrereqs>` (140 conceptos lo usan)
- [ ] S2.3 · `<DvCitedIn>` (140 conceptos)
- [ ] S2.4 · `<DvRegimenEpistemico>` (140 conceptos)
- [ ] S2.5 · `<DvFacetNormative>` (50 conceptos T1)
- [ ] S2.6 · `<DvRelations>` (140 conceptos)
- [ ] S2.7 · `<DvHabilita>` (140 conceptos · server-computed prop)
- [ ] S2.8 · `<DvMandatos>` (10 conceptos T1)
- [ ] S2.9 · `<DvEvolucion>` (140 conceptos)
- [ ] S2.10 · `<DvVistaPorRol>` (140 conceptos · URL state)
- [ ] S2.11 · `<DvObsidianOnlyBlock>` (fallback)

**Test gate**: cada componente tiene ≥3 tests passing; coverage ≥80% del archivo; ningún test global rompe.

**Deliverable**: 11 commits pequeños — uno por componente — o 1 commit `feat(glosario): DV components with tests`.

**Approval gate**: ✋ revisar visualmente cada componente con storybook-style fixtures (página `dev/glosario-fixtures` opcional).

---

### Sprint S3 · ConceptoBodyClient (extiende MDXWithHoverPreview) (1 día)

**Goal**: Crear nuevo client component que es **strict superset** de `MDXWithHoverPreview` — comportamiento idéntico cuando no hay sentinels, intercepta `<div data-dv="*">` cuando los hay.

**Steps**:
- [ ] S3.1 · Crear `concepto-body-client.tsx` con prop `data: ConceptoTPLData`
- [ ] S3.2 · Test: `behavior identical to MDXWithHoverPreview when body has no data-dv` (snapshot comparison)
- [ ] S3.3 · Test: `intercepts <div data-dv="facet-normative"> and renders DvFacetNormative`
- [ ] S3.4 · Test: `data-dv="unknown" falls through to ObsidianOnlyBlock`
- [ ] S3.5 · Test: `wikilinks/apa-cite still intercepted` (regression)

**Test gate**: ≥5 tests; snapshot comparison vs MDXWithHoverPreview es idéntico para body sin sentinels.

**Deliverable**: 1 commit `feat(glosario): ConceptoBodyClient with data-dv interception`.

**Approval gate**: ✋ revisar el test que demuestra "comportamiento idéntico sin sentinels".

---

### Sprint S4 · Migración ConceptoPage (no functional change yet) (0.5 días)

**Goal**: ConceptoPage usa `ConceptoBodyClient` en lugar de `MDXWithHoverPreview`. Como ningún body tiene sentinels todavía (cleanBody aún strip-ea), el render es idéntico.

**Steps**:
- [ ] S4.1 · Modificar `src/app/glosario/[conceptoId]/page.tsx`:
  - Importar `ConceptoBodyClient` 
  - Pre-computar `habilita: string[]` server-side (reverse lookup de `concepto_prerequisitos` en todo el corpus)
  - Pasar `data` prop con campos TPL desde `c`
- [ ] S4.2 · Test e2e (Playwright): `con-acu-004-25 page renders without errors`
- [ ] S4.3 · Snapshot test: HTML output idéntico a baseline pre-cambio (debe ser igual porque sentinels no existen aún)

**Test gate**: snapshots S0 todos idénticos; e2e pasa; build verde.

**Deliverable**: 1 commit `refactor(glosario): use ConceptoBodyClient`.

**Approval gate**: ✋ smoke localhost — mismas 3 páginas baseline + `con-acu-004-25` siguen pixel-idénticas.

---

### Sprint S5 · Activar emisión de sentinels (1 día) ⚡ EL CAMBIO VISUAL

**Goal**: `cleanBody` deja de strippear DV blocks y MetaBind, ahora emite sentinels. ConceptoBodyClient los renderiza. **PRIMER cambio visible en producción**.

**Steps**:
- [ ] S5.1 · Actualizar `cleanBody` para emitir sentinels DV + resolver MetaBind readonly + selector-rol sentinel
- [ ] S5.2 · **Reemplazar** test `cleanBody · regresión v7.13 (img2 — dataviewjs)` con: `cleanBody emite sentinel data-dv` (test inverso del comportamiento)
- [ ] S5.3 · **Reemplazar** test `cleanBody · regresión v7.13 (img1 — Meta Bind INPUT[...])` con: `cleanBody resuelve MetaBind readonly a valor del frontmatter`
- [ ] S5.4 · Re-sync vault completo
- [ ] S5.5 · Snapshot diff: 36 conceptos con DV ahora tienen sentinels en su body; los demás 156 sin cambio
- [ ] S5.6 · Smoke localhost: `con-acu-004-25` ahora muestra tablas/listas (no `<pre><code>`); 3 conceptos sin DV idénticos a baseline
- [ ] S5.7 · Test e2e: `con-acu-004-25 has 0 dataviewjs code blocks visible`
- [ ] S5.8 · Test e2e: `con-cca, con-mipg-funcion-publica, con-iso-21001 render unchanged`

**Test gate**: build verde; e2e pasa; snapshots de conceptos sin DV idénticos.

**Deliverable**: 1 commit `feat(glosario): activate DV sentinel emission` + push a Vercel.

**Approval gate**: ✋✋ doble verificación — localhost + Vercel deploy preview. Ver con-acu-004-25 mostrando contenido renderizado, no código.

---

### Sprint S6 · MetaBind selector funcional (0.5 días)

**Goal**: `<DvVistaPorRol>` reactivo via `?rol=` URL state. El selector cambia el contenido mostrado.

**Steps**:
- [ ] S6.1 · `<SelectorRolJTBD>` component: lee/escribe `?rol=` con `useSearchParams` + `useRouter`
- [ ] S6.2 · `<DvVistaPorRol>` toma `?rol=` y muestra el contenido correspondiente del frontmatter
- [ ] S6.3 · Test e2e: `selector cambia contenido + URL`

**Test gate**: e2e pasa; otros conceptos sin selector no afectados.

**Deliverable**: 1 commit `feat(glosario): role selector via URL state`.

---

### Sprint S7 · Cobertura ampliada (1 día)

**Goal**: Verificar coverage real del transformer en todo el corpus. Identificar gaps.

**Steps**:
- [ ] S7.1 · Script `scripts/audit-dv-coverage.mjs` que cuenta:
  - DV blocks por concepto
  - Patrón matched / fallback obsidian-only
  - Top 10 conceptos con más fallbacks
- [ ] S7.2 · Reporte → si fallback > 5%, agregar patrones nuevos
- [ ] S7.3 · Documentar coverage en este roadmap

**Test gate**: coverage report ≥95% match rate.

---

### Sprint S8 · Charts + KPIs (opcional, 2 días)

**Goal**: KPI Grid + Recharts para distribución por frame y top relaciones.

**Steps**:
- [ ] S8.1 · `<DvKpiGrid>` con datos pre-computados server-side
- [ ] S8.2 · `<DvCharts>` con Recharts (no Chart.js — alineado con stack)
- [ ] S8.3 · `<DvComunidades>` con vecindad 1-hop
- [ ] S8.4 · Tests + e2e

**Deliverable**: 1 commit `feat(glosario): advanced visualizations`.

---

## §3 · Estado de aprobación / ejecución

| Sprint | Status | Commit | Validado por |
|---|---|---|---|
| S0 | ⏳ pending approval | — | — |
| S1 | ⏳ pending approval | — | — |
| S2 | ⏳ pending approval | — | — |
| S3 | ⏳ pending approval | — | — |
| S4 | ⏳ pending approval | — | — |
| S5 | ⏳ pending approval | — | — |
| S6 | ⏳ pending approval | — | — |
| S7 | ⏳ pending approval | — | — |
| S8 | ⏳ optional | — | — |

---

## §4 · Cómo gestionar este roadmap

1. **Aprobación por sprint**: cada sprint requiere ✋ tu OK explícito antes de ejecutar
2. **Tablas de status arriba** se actualizan al completar cada sprint
3. **Si un sprint rompe algo en S0 baseline**, revert + diagnóstico + decisión
4. **Reportes de progreso** al final de cada sprint:
   - Tests passing / failing
   - Files changed
   - Visual diff vs baseline (si aplica)
   - Costo (tiempo aproximado)

---

## §5 · Reglas de cancelación / pause

- En cualquier sprint puedes decir "para" → todo se pausa
- En cualquier sprint puedes decir "revierte X" → revertimos solo X
- Si un test que pasa hoy falla en un sprint, **no se avanza** — primero diagnosticamos
- Si la verificación visual revela regresión inesperada, **se revierte el sprint** y se replantea

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28 · roadmap-v8-dataviewjs-tdd v1.0.0*
