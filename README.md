# reforma·ud — MI-12 Reforma Vinculante UDFJC

> Portal + research + contenido del proyecto **MI-12 Hoja de Ruta CRISP-DM** para la implementación del Acuerdo CSU 04/2025 de la Universidad Distrital Francisco José de Caldas.

**Portal**: [reforma-ud.vercel.app](https://reforma-ud.vercel.app) · [tu-reforma.vercel.app](https://tu-reforma.vercel.app)
**Repo**: [github.com/ccolombia-ui/reforma-ud](https://github.com/ccolombia-ui/reforma-ud)
**Licencia**: CC BY-SA 4.0 · Carlos Camilo Madera Sepulveda · CPS-939-2026 · UDFJC

---

## Arquitectura (Patrón C — Drive editorial + Git mirror)

```
Google Drive (edición) → GitHub Action sync (cada 10 min) → Git → Vercel (portal)
```

El contenido (papers M01–M12, research BPAs, documentos normativos) vive en **Google Drive** como fuente editorial única. Este repositorio es el **mirror versionado** que alimenta el portal Astro + Starlight desplegado en Vercel.

## Estructura

```
aleia-reforma-ud/
├── apps/portal/          → Astro + Starlight (reforma-ud.vercel.app)
├── packages/
│   ├── content-schemas/  → Schemas Zod para papers/BPAs/CoP
│   ├── design-tokens/    → Tokens B.3 (colores, tipografía, espaciado)
│   └── ui/               → Componentes compartidos
├── content/drive-sync/   → Mirror de Google Drive (auto-sincronizado)
├── docs/                 → Arquitectura, auditorías, POCs
└── .github/workflows/    → CI/CD + sync desde Drive
```

## Setup local

```bash
# Prerrequisitos: Node 20+, pnpm 9+
git clone https://github.com/ccolombia-ui/reforma-ud.git
cd reforma-ud
pnpm install
pnpm dev          # portal en http://localhost:4321
```

## Contribuir

Ver [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) para guía por rol (estudiante, director, diseñador, formador, investigador, emprendedor).

## Investigaciones (M01–M12)

| Paper | Tema | Estado |
|---|---|---|
| M01 | Business Understanding — Acuerdo CSU 04/2025 | En elaboración |
| M02 | Ciclo Virtuoso Universidad Innovadora | En elaboración |
| M03 | Estándares Internacionales (OECD LC) | En elaboración |
| M04 | 21 BPAs + Matriz Clark | En elaboración |
| M05 | Ontología Escuela Emprendedora Transformativa | En elaboración |
| M06 | JTBD + Outcomes por Rol | En elaboración |
| M07 | UROP + Minors + Microinvestigaciones | En elaboración |
| M08 | BSC-S + WBK-APE-000 + RBM-GAC | En elaboración |
| M09 | Hoja de ruta N1→N4 | En elaboración |
| M10 | Gobernanza + Financiación diversificada | En elaboración |
| M11 | Cultura + Cambio organizacional | En elaboración |
| M12 | Meta-paper CRISP-DM consolidado | En elaboración |

---

CC BY-SA 4.0 · Carlos Camilo Madera Sepulveda · ccmaderas@udistrital.edu.co · CPS-939-2026
