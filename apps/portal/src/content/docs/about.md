---
title: Acerca de este portal
description: Sobre el proyecto MI-12 Reforma Vinculante UDFJC y el portal reforma-ud
---

# Acerca de reforma·ud

## El proyecto

**MI-12 Hoja de Ruta CRISP-DM** es un corpus de 12 investigaciones académicas (M01–M12) que traduce el **Acuerdo CSU 04/2025** en una guía ejecutable para los 6 estamentos de la Universidad Distrital Francisco José de Caldas.

El proyecto aplica la metodología **CRISP-DM** (Cross-Industry Standard Process for Data Mining) como marco narrativo para recorrer el ciclo completo de comprensión → modelado → evaluación → despliegue de la reforma universitaria.

## Metodología

| Fase CRISP-DM | Papers |
|---------------|--------|
| Business Understanding | M01 |
| Data Understanding | M02, M03 |
| Data Preparation | M04 |
| Modeling | M05, M06, M07 |
| Evaluation | M08 |
| Deployment | M09, M10, M11 |
| Meta-document | M12 |

## Autor

**Carlos Camilo Madera Sepulveda**
- Email: [ccmaderas@udistrital.edu.co](mailto:ccmaderas@udistrital.edu.co)
- Contrato: CPS-939-2026 · Universidad Distrital Francisco José de Caldas
- Proyecto: MI-12 Reforma Vinculante 2026

## Licencia

Todo el contenido de este portal está publicado bajo **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

Eres libre de:
- **Compartir** — copiar y redistribuir el material en cualquier medio o formato
- **Adaptar** — remezclar, transformar y construir a partir del material para cualquier propósito, incluso comercialmente

Bajo los siguientes términos:
- **Atribución** — debes dar crédito apropiado al autor
- **CompartirIgual** — si remezclas, debes distribuir bajo la misma licencia

## Código fuente

El código de este portal es open source:
**[github.com/ccolombia-ui/reforma-ud](https://github.com/ccolombia-ui/reforma-ud)**

## Tecnología

- **Portal**: [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- **Deployment**: [Vercel](https://vercel.com)
- **Sync de contenido**: Google Drive → GitHub Actions (rclone, cada 10 min)
- **Comentarios**: Giscus (GitHub Discussions)
- **Suscripciones**: Buttondown

## Arquitectura (Patrón C — Híbrido)

El contenido vive en **Google Drive** como fuente editorial única. Un GitHub Action sincroniza automáticamente cada 10 minutos los documentos `.md` al repositorio. Vercel despliega desde el repositorio git.

```
Drive (edicion) → rclone sync → Git (mirror versionado) → Vercel (portal)
```
