# 📚 Audit · docs/audit

> Carpeta de auditorías y referencias de diseño para el portal **reforma-ud**. Aquí vive el "norte" arquitectónico, no el código.

## Documentos

| # | Documento | Tipo | Para qué sirve |
|---|-----------|------|----------------|
| 1 | [`B9--portal-mvp-knowledge-management-spec.md`](./B9--portal-mvp-knowledge-management-spec.md) | **Spec-first** | Plan oficial v4 con personas, calidad académica, KDMO, sprints S8-S15 |
| 2 | [`AUDIT-aleia-bereshit-frontend.md`](./AUDIT-aleia-bereshit-frontend.md) | **Audit** | Análisis exhaustivo del dashboard `aleia-bereshit-rosy.vercel.app/admin/monitoring` (techo de calidad a igualar). Sitemap, secuencia, ER, 23 componentes, brechas |
| 3 | [`AUDIT-sota-frontend-cop.md`](./AUDIT-sota-frontend-cop.md) | **Audit** | SOTA 2026 para frontend Next.js + Vercel orientado a CoPs. 10 librerías UI, 6 patrones UX, 10 community apps inspiradoras, anti-patrones |
| 4 | [`REFERENCE-frontend-cop-sota.html`](./REFERENCE-frontend-cop-sota.html) | **Mockup HTML** | Referencia visual interactiva (single-file HTML). Abrir en navegador para ver toda la visión: app shell, 10 servicios CoP, calidad académica Young & Freedman, asistente con selector Haiku/Kimi |

## Cómo se usan juntos

```
                     Spec oficial (B.9)
                            │
        ┌───────────────────┼──────────────────┐
        │                   │                  │
   Audit referencia     Audit SOTA       Mockup HTML
   (lo que existe)      (lo que viene)   (lo que queremos)
        │                   │                  │
        └────────► Decisiones de diseño ◄──────┘
                            │
                            ▼
                     Implementación
                  apps/portal-next/...
```

- **B.9** define el QUÉ y CÓMO oficial.
- **AUDIT-aleia-bereshit** describe la calidad de referencia que ya construimos en otro proyecto.
- **AUDIT-sota-frontend-cop** dice qué es SOTA hoy y qué evitar.
- **REFERENCE-frontend-cop-sota.html** es el "diseño bello" autocontenido que demuestra la visión completa.

## Decisiones cristalizadas en estos audits

| Decisión | Documento de origen |
|----------|---------------------|
| Stack: Next 16 + Tailwind v4 + shadcn + Velite + cmdk + AI SDK v5 | B.9 §9 |
| KDMO Tupla Universal como SSOT | B.9 §6 |
| 5 estantes Biblioteca: Norma/Investigación/Guía/Deliberación/Sección | B.9 §7.2 |
| Layout 3-columnas estilo BERESHIT | AUDIT-aleia-bereshit §5 |
| URL-first state, localStorage solo para UX | AUDIT-aleia-bereshit §5 |
| Render académico: KaTeX + callouts Obsidian + embeds + dataview-helpers | B.9 §3 |
| AI con citation obligatoria + RAG client-side + boost doc activo | B.9 §5.5 |
| Top 5 sprint 1: virtual scroll + motion + react-hook-form + nuqs + hotkeys | AUDIT-sota §7 |
| 10 servicios CoP + dashboard + grafo 3D | REFERENCE-html mockup |

## Roles cubiertos (BPA-003)

Todas las decisiones tienen en cuenta los 6 roles de la Escuela Emprendedora Transformativa:

1. **Estudiante Soberano** — JTBD: construir CCA con autonomía
2. **Docente Diseñador** — JTBD: arquitectar Paquetes CCA reusables
3. **Docente Formador (Active Learning M.)** — JTBD: Hake-g ≥0.3 sostenido
4. **Docente Investigador (Pasteur Pleno)** — JTBD: co-authoring K12→PhD
5. **Docente Emprendedor (Agente Territorial)** — JTBD: Living Labs ético
6. **Docente Director (Visionario Estratégico)** — JTBD: orquestar V1-V5 con BSC

## Cómo abrir el mockup HTML

```bash
# Local
start docs/audit/REFERENCE-frontend-cop-sota.html  # Windows
open  docs/audit/REFERENCE-frontend-cop-sota.html  # macOS

# O servirlo desde el repo
npx serve docs/audit/
```

El mockup es **single-file con Tailwind via CDN** — solo abrir el archivo. Todas las pestañas (Dashboard / Feed / Biblioteca / Grafo / Proyectos / Foro / Deliberación / Eventos / Miembros / Logros) son navegables sin servidor.

## Próximos audits sugeridos (post-MVP)

- `AUDIT-realtime-presence.md` — patrones de presencia y eventos en vivo (cuando se requiera)
- `AUDIT-gamification-academic.md` — Open Badge 3.0 + xAPI integration sin caer en gamification cringe
- `AUDIT-deliberation-ux.md` — patrones Loomio/Decidim para deliberaciones formales

## Mantenimiento

- Cada audit lleva `kd_id`, `kd_version`, `kd_status`. Versionar al refactor.
- Cuando un audit se materializa en código, marcar `kd_status: IMPLEMENTED` y referenciar PR.
- Audits desactualizados → mover a `docs/audit/_archived/`.

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026-04-25*
