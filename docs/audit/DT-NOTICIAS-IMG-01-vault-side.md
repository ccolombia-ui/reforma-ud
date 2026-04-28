---
kd_id: dt/noticias-img-01
kd_version: 1.0.0
kd_date: 2026-04-28
kd_status: open
kd_priority: P2
kd_responsible_team: aleia-zen / vault-builder / news-bot
---

# DT-NOTICIAS-IMG-01 · Persistir og:image en frontmatter de actas vault

> **Para**: equipo de `aleia-zen` y mantenedores del bot de ingesta de noticias.
> **De**: equipo del portal (reforma-ud).
> **Severidad**: P2 — el portal funciona sin esto (fallback runtime), pero con esto la calidad mejora y reducimos requests al `/api/og-preview`.

---

## §1 · Contexto

El portal `reforma-ud.vercel.app` ahora muestra thumbnails representativos en cada tarjeta de noticia:

```
[1] frontmatter `image: "..."`             ← preferido (este DT lo provee)
[2] /api/og-preview?url=... (unfurl.js)    ← runtime fallback self-host
[3] ícono SVG por tipo de fuente           ← último fallback (anti-bot blocked)
```

El nivel [2] funciona para sitios de prensa (El Tiempo, Semana, La Silla Vacía, MinEducación) que exponen `og:image` estándar. **Falla** para Instagram, X/Twitter, TikTok que bloquean unfurl con anti-bot.

---

## §2 · Acción requerida en el lado vault

### §2.1 · Schema del frontmatter de `act-*.md`

Agregar un campo opcional `image` al frontmatter de cada `80-actualidad/<con-slug>/act-*.md`:

```yaml
---
kd_title: "..."
kd_date: 2024-11-27
fuente: "La Silla Vacía"
fuente_url: "https://news.google.com/..."
image: "https://res.cloudinary.com/.../noticia-cover.jpg"   # ← NUEVO (opcional)
relevancia: alta
...
---
```

### §2.2 · Origen del valor de `image:`

El bot `news_bot.py` (en `aleia-zen/packages/vault-builder/entities/kdmo/cita-universal/`) debe llenarlo así:

| Fuente | Cómo obtener `image:` |
|---|---|
| **Sitios prensa estándar** (BeautifulSoup-friendly) | Parsear `<meta property="og:image">` del HTML al hacer fetch |
| **DOI / papers** (Scielo, OpenAlex) | Usar el thumbnail del PDF (Crossref API tiene `link[].URL` del cover) |
| **Instagram / TikTok / X** | Capturar screenshot via `playwright headless` al ingestar; subir a Cloudinary/imgur; persistir URL |
| **YouTube** | `https://img.youtube.com/vi/<videoId>/maxresdefault.jpg` (sin auth) |
| **Sin imagen detectable** | Omitir el campo (el portal hace fallback a ícono) |

### §2.3 · Sincronización con portal

El campo `image:` se sincroniza al portal via `sync-actualidad.mjs` cuando ese pipeline esté operativo (ver DT v7.1). Hasta entonces el portal lo lee de su `content/feed/*.md` actual.

---

## §3 · Implementación recomendada (pseudo-código)

```python
# news_bot.py extension
async def enrich_with_og_image(news_item: dict) -> dict:
    url = news_item['fuente_url']
    domain = urlparse(url).hostname

    if domain in ANTI_BOT_DOMAINS:  # ['instagram.com', 'tiktok.com', 'x.com', ...]
        # Capturar screenshot via Playwright
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(url, wait_until='networkidle')
            screenshot_bytes = await page.screenshot(full_page=False)
            await browser.close()
        # Subir a Cloudinary/imgur
        cdn_url = upload_to_cloudinary(screenshot_bytes, public_id=f"news/{news_item['id']}")
        news_item['image'] = cdn_url
    else:
        # Parsear og:image del HTML
        html = await fetch_with_user_agent(url)
        og_image = extract_meta(html, 'og:image') or extract_meta(html, 'twitter:image')
        if og_image:
            news_item['image'] = og_image

    return news_item
```

---

## §4 · Validación

Cuando el bot empiece a poblar `image:`, validar:

```bash
# Desde el portal:
node -e "
const { news } = require('./.velite/news.json');
const total = news.length;
const withImage = news.filter(n => n.image).length;
console.log(\`\${withImage}/\${total} noticias con image: en frontmatter\`);
"
```

Meta v1: ≥ 80% de noticias `relevancia: alta` con `image:` poblado.

---

## §5 · Por qué importa

- **Engagement**: cards con imagen tienen ~3-5× más click-through que cards de solo texto (estudios SOTA Nielsen Norman Group, 2024).
- **Latencia**: imagen pre-resuelta en frontmatter elimina el round-trip a `/api/og-preview` (~300-800ms).
- **Robustez**: las fuentes anti-bot (IG/X/TikTok) NO funcionan con unfurl runtime. El bot vault es el único punto donde podemos capturar la imagen confiablemente.

---

## §6 · Estado del lado portal (referencia)

| Componente | Status |
|---|---|
| `velite.config.ts` schema `news.image: s.string().optional()` | ✅ Listo |
| `/api/og-preview` route handler con unfurl.js + Vercel cache 24h | ✅ Listo |
| `<NewsThumbnail>` componente con 3 niveles fallback | ✅ Listo |
| Integrado en `<NoticiasInforme>` y `<NoticiasRelacionadas>` | ✅ Listo |

El portal está esperando que el frontmatter `image:` aparezca para preferirlo sobre el fetch runtime.

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28*
