'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MermaidPopup } from '@/components/biblioteca/mermaid-popup';

/**
 * MermaidRenderer · v5.0l — escanea el DOM en busca de `<pre class="mermaid">` o
 * `<code class="language-mermaid">` y los renderiza usando mermaid client-side.
 *
 * v5.0l Diagram Popup: tras renderizar cada diagrama, agrega un click handler
 * y un botón flotante de zoom que abren MermaidPopup overlay con zoom+pan
 * (réplica del plugin Obsidian "Diagram Popup").
 *
 * Uso: montar una vez en el árbol que contiene MDX renderizado.
 *      Re-renderiza cuando cambia el doc activo (vía deps dependency).
 */
export function MermaidRenderer({ deps = [] }: Readonly<{ deps?: ReadonlyArray<unknown> }>) {
  const initRef = useRef(false);
  const [popup, setPopup] = useState<{ svgHtml: string; caption?: string } | null>(null);

  const openPopup = useCallback((svgHtml: string, caption?: string) => {
    setPopup({ svgHtml, caption });
  }, []);

  const closePopup = useCallback(() => setPopup(null), []);

  // Setup click handlers en cada pre.mermaid-rendered
  const wireDiagramHandlers = useCallback((pre: HTMLElement) => {
    if (pre.dataset.popupWired === 'true') return;
    pre.dataset.popupWired = 'true';

    // Caption: buscar el primer <em> en el siguiente sibling <p>
    let caption: string | undefined;
    const nextEl = pre.nextElementSibling as HTMLElement | null;
    if (nextEl?.tagName === 'P') {
      const em = nextEl.querySelector('em');
      if (em?.textContent && /^Fig|^Diagrama|^Figure/i.test(em.textContent.trim())) {
        caption = em.textContent.trim();
      }
    }

    // Wrap el SVG con cursor:zoom-in y hint visual
    pre.style.cursor = 'zoom-in';
    pre.title = 'Click para abrir en vista ampliada (zoom + pan)';

    // Añadir botón flotante "expandir" en top-right (visible al hover)
    const existing = pre.querySelector('.mermaid-zoom-btn');
    if (!existing) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mermaid-zoom-btn';
      btn.setAttribute('aria-label', 'Abrir diagrama ampliado');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="M9 21H3v-6"/><path d="m3 21 7-7"/></svg>';
      btn.onclick = (e) => {
        e.stopPropagation();
        openPopup(pre.innerHTML, caption);
      };
      // Container relative para posicionar el botón
      pre.style.position = 'relative';
      pre.appendChild(btn);
    }

    // Click en el SVG mismo también abre popup
    pre.addEventListener('click', (e) => {
      // Ignorar clicks en el botón (ya manejados)
      if ((e.target as HTMLElement).closest('.mermaid-zoom-btn')) return;
      openPopup(pre.innerHTML, caption);
    });
  }, [openPopup]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      if (cancelled) return;
      if (!initRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
        });
        initRef.current = true;
      }

      // Selector: `<pre class="mermaid">` (rehype-mermaid pre-mermaid output)
      // y `<code class="language-mermaid">` (markdown source raw, fallback)
      const preNodes = document.querySelectorAll<HTMLElement>('pre.mermaid:not([data-rendered])');
      const codeNodes = document.querySelectorAll<HTMLElement>('code.language-mermaid:not([data-rendered])');

      for (const pre of preNodes) {
        const code = pre.textContent ?? '';
        if (!code.trim()) continue;
        try {
          const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
          const { svg } = await mermaid.render(id, code);
          pre.innerHTML = svg;
          pre.setAttribute('data-rendered', 'true');
          pre.classList.add('mermaid-rendered');
          wireDiagramHandlers(pre);
        } catch (e) {
          console.warn('[mermaid] render error:', e);
          pre.setAttribute('data-rendered', 'error');
        }
      }
      for (const codeEl of codeNodes) {
        const pre = codeEl.parentElement;
        if (!pre) continue;
        const code = codeEl.textContent ?? '';
        if (!code.trim()) continue;
        try {
          const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
          const { svg } = await mermaid.render(id, code);
          pre.innerHTML = svg;
          pre.setAttribute('data-rendered', 'true');
          pre.classList.add('mermaid-rendered');
          wireDiagramHandlers(pre);
        } catch (e) {
          console.warn('[mermaid] render error:', e);
          pre.setAttribute('data-rendered', 'error');
        }
      }

      // v5.0l · También wire los `<pre class="mermaid-rendered">` que ya
      // se renderizaron antes del mount (e.g. navegación entre tabs sin
      // unmount completo). Idempotente via dataset.popupWired.
      const renderedNodes = document.querySelectorAll<HTMLElement>('pre.mermaid-rendered');
      for (const pre of renderedNodes) wireDiagramHandlers(pre);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return popup ? (
    <MermaidPopup svgHtml={popup.svgHtml} caption={popup.caption} onClose={closePopup} />
  ) : null;
}
