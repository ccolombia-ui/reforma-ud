'use client';

import { useEffect, useRef } from 'react';

/**
 * MermaidRenderer — escanea el DOM en busca de `<pre class="mermaid">` o
 * `<code class="language-mermaid">` y los renderiza usando mermaid client-side.
 *
 * Uso: montar una vez en el árbol que contiene MDX renderizado.
 *      Re-renderiza cuando cambia el doc activo (vía pathname dependency).
 */
export function MermaidRenderer({ deps = [] }: Readonly<{ deps?: ReadonlyArray<unknown> }>) {
  const initRef = useRef(false);

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
        } catch (e) {
          console.warn('[mermaid] render error:', e);
          pre.setAttribute('data-rendered', 'error');
        }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return null;
}
