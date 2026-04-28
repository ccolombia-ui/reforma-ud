'use client';

import { useEffect } from 'react';

/**
 * HeadingScrollSpy · v7.4 G11 — deep-link al heading.
 *
 * Resuelve el problema de que Next.js no hace scroll automático al hash
 * cuando el contenido se renderiza después del navigate (MDX, Mermaid, etc.).
 *
 * Comportamiento:
 *  1. Al montar, si hay hash en la URL → scroll suave al elemento (con offset
 *     para el header sticky).
 *  2. Al hacer click en cualquier `a[href^="#"]` dentro del article →
 *     intercepta, scroll suave, y actualiza la URL con el hash.
 *  3. Al hacer click en un heading (h1-h6 con id) → copia la URL con hash
 *     al clipboard + flash visual.
 *
 * Usar dentro de páginas que renderizan markdown con headings (paper, concepto).
 */
export function HeadingScrollSpy() {
  useEffect(() => {
    // [1] Scroll inicial al hash
    function scrollToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      // Reintentar varias veces para esperar contenido async (mermaid, mdx)
      let attempts = 0;
      const maxAttempts = 20;
      const interval = setInterval(() => {
        const target = document.getElementById(decodeURIComponent(hash));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          clearInterval(interval);
        } else if (++attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 100);
    }
    scrollToHash();

    // [2] Intercepta clicks en anchor links internos
    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const el = document.getElementById(decodeURIComponent(id));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    }

    // [3] Click en heading → copia URL al clipboard
    function handleHeadingClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const heading = target.closest('h1[id], h2[id], h3[id], h4[id]') as HTMLHeadingElement | null;
      if (!heading) return;
      // Solo si el click NO es en un link autolink existente
      if ((e.target as HTMLElement).closest('a')) return;
      const id = heading.id;
      if (!id) return;
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard?.writeText(url).catch(() => { /* noop */ });
      // Flash visual
      heading.classList.add('heading-flash');
      setTimeout(() => heading.classList.remove('heading-flash'), 800);
      // Actualiza hash
      history.replaceState(null, '', `#${id}`);
    }

    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('click', handleHeadingClick);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('click', handleHeadingClick);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
