import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    starlight({
      title: 'reforma·ud',
      description: 'MI-12 Hoja de Ruta CRISP-DM — Reforma Vinculante UDFJC · Acuerdo CSU 04/2025',
      tagline: 'La Reforma UDFJC explicada desde tu rol',
      logo: {
        light: './src/assets/logo-reforma-ud-light.svg',
        dark: './src/assets/logo-reforma-ud-dark.svg',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/ccolombia-ui/reforma-ud',
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/custom.css',
      ],
      components: {
        Footer: './src/components/overrides/Footer.astro',
      },
      sidebar: [
        {
          label: 'Inicio',
          link: '/',
        },
        {
          label: '🚀 Misión tu-reforma',
          link: '/tu-reforma/',
        },
        {
          label: 'El Acuerdo CSU 04/2025',
          link: '/acuerdo',
        },
        {
          label: 'Hoja de Ruta CRISP-DM',
          items: [
            { label: 'Introduccion', link: '/crisp-dm' },
            { label: 'M01 — Business Understanding', link: '/papers/m01' },
            { label: 'M02 — Ciclo Virtuoso', link: '/papers/m02' },
            { label: 'M03 — Estandares Internacionales', link: '/papers/m03' },
            { label: 'M04 — 21 BPAs + Matriz Clark', link: '/papers/m04' },
            { label: 'M05 — Escuela Emprendedora', link: '/papers/m05' },
            { label: 'M06 — JTBD por Rol', link: '/papers/m06' },
            { label: 'M07 — UROP + Minors', link: '/papers/m07' },
            { label: 'M08 — BSC-S + RBM-GAC', link: '/papers/m08' },
            { label: 'M09 — Hoja de ruta N1→N4', link: '/papers/m09' },
            { label: 'M10 — Gobernanza + Financiacion', link: '/papers/m10' },
            { label: 'M11 — Cultura + Cambio', link: '/papers/m11' },
            { label: 'M12 — Meta-paper CRISP-DM', link: '/papers/m12' },
          ],
        },
        {
          label: 'Comunidades de Practica',
          items: [
            { label: 'Estudiante', link: '/cop/estudiante' },
            { label: 'Director/a', link: '/cop/director' },
            { label: 'Diseñador/a curricular', link: '/cop/disenador' },
            { label: 'Formador/a (docente)', link: '/cop/formador' },
            { label: 'Investigador/a', link: '/cop/investigador' },
            { label: 'Emprendedor/a academico', link: '/cop/emprendedor' },
          ],
        },
        {
          label: '21 Buenas Practicas',
          link: '/bpas',
        },
        {
          label: 'Acerca de',
          link: '/about',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: '/og-reforma-ud-default.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0f172a' },
        },
      ],
      defaultLocale: 'es',
      locales: {
        es: { label: 'Español', lang: 'es' },
      },
    }),
  ],
});