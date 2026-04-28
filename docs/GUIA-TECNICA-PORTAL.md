---
title: "Guía técnica · Portal reforma-ud · Sync + Deploy + News + Gold-HTML"
version: 1.0.0
date: 2026-04-28
audience: maintainers · frente técnico
---

# Guía técnica · Portal reforma-ud

> **Audiencia**: mantenedores del repo `ccolombia-ui/reforma-ud` que operan el ciclo completo: vault Obsidian → portal Next.js → Vercel.

---

## §0 · Arquitectura del sistema (3 capas)

```
[VAULT Obsidian / Google Drive]          ← fuente de verdad del contenido
         │
         │  pnpm sync:vault               ← sincroniza MDX al portal
         ▼
[Portal Next.js · apps/portal-next/]     ← compila y sirve el portal
         │
         │  git push origin main          ← activa deploy automático
         ▼
[Vercel CI/CD → reforma-ud.vercel.app]   ← en producción (~60s)

         + (paralelo, local)
[gold-html-static · dist/]               ← HTMLs imprimibles para PDF
                                            NO va a Vercel · solo vault local
```

---

## §1 · Cómo se activa el portal (¿es automático?)

**Sí, es automático** — una vez que se hace `git push origin main`, Vercel detecta el commit y despliega en ~60 segundos.

```bash
# Flujo completo desde cero:
cd c:/antigravity/aleia-reforma-ud

# [1] Sincronizar contenido del vault
cd apps/portal-next && pnpm sync:vault

# [2] Verificar que compila
pnpm build

# [3] Commit y push → Vercel auto-despliega
git add content/
git commit -m "chore(content): sync vault $(date +%Y-%m-%d)"
git push origin main
# → reforma-ud.vercel.app actualizado en ~60s
```

**No hay pasos manuales en Vercel** — el dashboard en `vercel.com/ccolombia-ui/reforma-ud/deployments` muestra el progreso.

---

## §2 · Sync vault → portal (`pnpm sync:vault`)

### Qué hace (3 pasos internos)

| Paso | Script | Origen vault | Destino portal |
|---|---|---|---|
| [1] Papers | `import-book-sections.mjs` | `01-secciones/sec-MI12-*.md` | `content/canonico/m##.mdx` |
| [2] Glosario | `sync-glosario.mjs` | `00-glosoario-universal/**/con-*.md` | `content/glosario/` |
| [3] Fix YAML | `fix-orphan-indented.mjs` | — | Limpia líneas YAML huérfanas post-sync |

### Ruta del vault

```
H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\
  R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\
  ├── 01-secciones/         ← papers M01-M12
  ├── 00-glosoario-universal/ ← 192 conceptos T1-T7 (incluyendo 22 BPAs)
  └── 80-actualidad/        ← noticias (pendiente ruta portal)
```

### Comandos disponibles

```bash
pnpm sync:vault                         # sync completo (papers + glosario)
pnpm sync:vault:dry                     # dry-run — reporte sin escribir
pnpm sync:vault -- --skip-papers        # solo glosario
pnpm sync:vault -- --skip-glosario      # solo papers
pnpm sync:vault -- --filter all         # incluye conceptos DRAFT
pnpm test:sync-vault                    # 16 tests TDD post-sync
```

### Estado esperado post-sync

```
Papers sincronizados:   13 (M00-M12)
Glosario sincronizado: ~192 conceptos (T1-T7 + 22 BPAs)
Tests TDD:             16/16 passed
```

### Prerrequisito único

Google Drive Stream montado en `H:\`. Si el vault no es accesible:

```bash
# Verificar desde PowerShell:
Test-Path "H:\...daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\01-secciones"
# → True
```

Para ejecutar desde Obsidian como botón: ver [`docs/guide-obsidian-sync-buttons.md`](guide-obsidian-sync-buttons.md).

---

## §3 · News bot (`news_bot.py`) · actualidad vault

El bot de noticias vive en `aleia-zen`, no en este repo. Genera `act-*.md` directamente en el vault.

```bash
# Prerrequisito: claves en aleia-zen/.env.local
MOONSHOT_API_KEY=sk-...
YOUTUBE_API_KEY=AIzaSy...

# Ejecutar (desde el directorio del bot)
cd C:/antigravity/aleia-zen/packages/vault-builder/entities/kdmo/cita-universal

VAULT="H:/.shortcut-targets-by-id/.../3-diseño-capitulo-libro"

python news_bot.py \
  --concepts-dir "$VAULT/00-glosoario-universal" \
  --news-dir     "$VAULT/80-actualidad" \
  --urn-namespace "urn:aleia:cap-mi12" \
  --use-kimi \
  --use-youtube \
  --max-age-days 365 \
  --max-per-concept 10 \
  --heuristic-prefilter 0.05
```

### Conceptos con `concepto_news_search` activo (2026-04-28)

| Concepto | Descripción |
|---|---|
| `con-acu-004-25` | Reforma vinculante ACU-004-25 — fuente central |
| `con-bpa-001-21-buenas-practicas` | Paraguas de las 21 BPAs |
| `con-bpa-f01` … `con-bpa-int07` | **21 BPAs individuales** (creadas 2026-04-28) |

### Salida del bot

- `80-actualidad/{outlet-slug}/act-YYYY-MM-DD--{slug}-{hash}.md`
- Noticias actuales: **19 archivos en 13 outlets**
- Conceptos con `concepto_noticias_asociadas[]` actualizado: 3

### DT-NOTICIAS-IMG-01 (imagen representativa)

| Fuente | Estado |
|---|---|
| YouTube | ✅ Automático — `news_bot.py` extrae `img.youtube.com/vi/{id}/maxresdefault.jpg` |
| Prensa estándar | ✅ Runtime — `/api/og-preview` en Vercel (unfurl.js, cache CDN 24h) |
| Instagram/TikTok/X | 🔲 Fase 2 — Playwright headless vault-side (spec en `docs/audit/DT-NOTICIAS-IMG-01-vault-side.md`) |

Para activar og:image en el bot (opt-in, agrega latencia):
```bash
GHS_FETCH_OG=1 python news_bot.py ...
```

---

## §4 · Gold-HTML-Static · HTMLs imprimibles locales

Los HTMLs de `dist/` son para **PDF local e impresión** — NO se despliegan en Vercel.

```bash
# Setup único (solo si node_modules no está en c:/tmp/ghs-src)
cp -r "H:/.../  _gold-html-static/src/." c:/tmp/ghs-src/
cd c:/tmp/ghs-src && npm install

# Build completo (papers + glosario + actualidad + inyección N:M)
VAULT="H:/...3-diseño-capitulo-libro"
GHS_CHAPTER="$VAULT" \
GHS_SHARED_CSS="$VAULT/_gold-html-static/_shared/paper.css" \
node c:/tmp/ghs-src/md-to-html.mjs --build:complete
```

### Comandos disponibles

```bash
node md-to-html.mjs --all              # papers M01-M12
node md-to-html.mjs --glosario         # 192 conceptos HTML
node md-to-html.mjs --actualidad       # 19 noticias HTML
node md-to-html.mjs --inject-noticias  # inyecta <aside> en con-*.html
node md-to-html.mjs --build:complete   # todo lo anterior en secuencia
node md-to-html.mjs --list             # listar secciones disponibles
```

### Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `GHS_CHAPTER` | `../..` desde el script | Path al capítulo libro |
| `GHS_SHARED_CSS` | `ROOT/_shared/paper.css` | CSS del portal |
| `GHS_PAPERS_OUT` | `ROOT/dist/papers/` | Destino de los HTMLs |
| `GHS_FETCH_OG` | (no definida) | Si `1`: fetcha og:image en prensa (lento) |

### Sync dist/ al vault

```bash
VAULT="H:/...3-diseño-capitulo-libro"
cp -r c:/tmp/dist/. "$VAULT/_gold-html-static/dist/"
# Google Drive sincroniza automáticamente al vault compartido
```

---

## §5 · Ciclo completo recomendado (día a día)

```bash
# ── [A] Actualizar noticias ────────────────────────────────────────────
cd .../cita-universal
python news_bot.py --concepts-dir "$VAULT/00-glosoario-universal" \
  --news-dir "$VAULT/80-actualidad" \
  --use-kimi --use-youtube --max-age-days 365

# ── [B] Sync vault → portal ───────────────────────────────────────────
cd c:/antigravity/aleia-reforma-ud/apps/portal-next
pnpm sync:vault
pnpm test:sync-vault          # 16/16 expected

# ── [C] Build HTML local (para PDF) ──────────────────────────────────
GHS_CHAPTER="$VAULT" GHS_SHARED_CSS="..." \
node c:/tmp/ghs-src/md-to-html.mjs --build:complete
cp -r c:/tmp/dist/. "$VAULT/_gold-html-static/dist/"

# ── [D] Deploy portal ─────────────────────────────────────────────────
cd c:/antigravity/aleia-reforma-ud
git add content/ apps/portal-next/
git commit -m "chore(content): sync vault $(date +%Y-%m-%d)"
git push origin main
# → reforma-ud.vercel.app actualizado en ~60s ✅
```

---

## §6 · Troubleshooting frecuente

| Síntoma | Causa probable | Fix |
|---|---|---|
| `sync:vault` da 0 conceptos | Todos en `kd_status: DRAFT` | `pnpm sync:vault -- --filter all` |
| Build Vercel falla `velite` | YAML malformado en un `.md` | `pnpm test:sync-vault` → identificar archivo |
| `news_bot.py` emite 0 items | Todos >365 días | Bajar `--max-age-days` o revisar `max_age_days` en concepto |
| `news_bot.py`: Kimi error | API key expirada | Verificar `MOONSHOT_API_KEY` en `aleia-zen/.env.local` |
| `md-to-html.mjs`: fuente no encontrada | `GHS_CHAPTER` no definido | Definir variable antes del comando |
| `charmap` en `emit_news_cita` | Caracteres Unicode raros en título | Corregido en v5.3+ con `open(..., errors='replace')` |
| Portal deployment lento | Pagefind index rebuild | Normal — ~90s cuando cambia mucho contenido |

---

## §7 · Archivos de referencia

| Archivo | Descripción |
|---|---|
| [`docs/guide-obsidian-sync-buttons.md`](guide-obsidian-sync-buttons.md) | Botones Obsidian Shell Commands |
| [`docs/audit/DT-NOTICIAS-IMG-01-vault-side.md`](audit/DT-NOTICIAS-IMG-01-vault-side.md) | Spec imagen representativa noticias |
| [`H:/.../\_gold-html-static/\_meta/\_MAPEO-CANONICO.md`]() | Reglas URL R1-R10 (wikilinks → portal) |
| [`H:/.../80-actualidad/_README.md`]() | Schema y workflow `act-*.md` |
| `apps/portal-next/velite.config.ts:454-476` | `urlResolver` canónico (fuente de verdad R1-R10) |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28 · v1.0.0*
