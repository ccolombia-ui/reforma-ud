'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * MermaidPopup · v5.0l — overlay full-screen para diagramas Mermaid.
 *
 * Réplica web del plugin Obsidian "Diagram Popup":
 *   • Click en un Mermaid renderizado → abre overlay
 *   • Zoom (rueda + botones) y pan (drag) sobre el SVG
 *   • Atajos: ESC = cerrar, +/- = zoom, 0 = reset
 *   • Botón download SVG
 *   • Click en backdrop = cerrar
 *
 * Stack: react-zoom-pan-pinch (SOTA touch + mouse + pinch + keyboard).
 *
 * No es un componente declarativo per-diagrama — es un singleton portal
 * gestionado por MermaidRenderer que escucha clicks en `.mermaid-rendered`.
 */
export function MermaidPopup({
  svgHtml,
  caption,
  onClose,
}: Readonly<{
  svgHtml: string;
  caption?: string;
  onClose: () => void;
}>) {
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Atajos teclado
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === '+' || e.key === '=') transformRef.current?.zoomIn(0.3);
      else if (e.key === '-' || e.key === '_') transformRef.current?.zoomOut(0.3);
      else if (e.key === '0') transformRef.current?.resetTransform();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const downloadSvg = useCallback(() => {
    const blob = new Blob([svgHtml], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mermaid-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svgHtml]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Diagrama Mermaid · vista ampliada"
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-sm"
      onClick={(e) => {
        // Click en backdrop (no en el SVG mismo) cierra
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header con controles */}
      <div className="flex items-center justify-between gap-2 border-b bg-background/80 px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium text-muted-foreground">📊 Diagrama</span>
          {caption && (
            <span className="truncate text-xs text-foreground" title={caption}>
              · {caption}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => transformRef.current?.zoomOut(0.3)}
            title="Zoom out · -"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => transformRef.current?.zoomIn(0.3)}
            title="Zoom in · +"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => transformRef.current?.resetTransform()}
            title="Reset · 0"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <span className="mx-1 h-5 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={downloadSvg}
            title="Descargar SVG"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            title="Cerrar · Esc"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas con zoom/pan */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.2}
          maxScale={8}
          wheel={{ step: 0.15 }}
          doubleClick={{ mode: 'reset' }}
          panning={{ velocityDisabled: false }}
          centerOnInit
          centerZoomedOut
        >
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            <div
              className="mermaid-popup-content [&_svg]:max-w-[90vw] [&_svg]:max-h-[80vh]"
              // SVG ya viene confiable de mermaid.render() — solo lo expandimos
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Footer con hints */}
      <div className="border-t bg-background/80 px-4 py-1.5 text-[10px] text-muted-foreground">
        <span>Rueda: zoom · Drag: pan · Doble-click: reset · </span>
        <kbd className="rounded border bg-background px-1 font-mono text-[9px]">+</kbd>
        <kbd className="ml-0.5 rounded border bg-background px-1 font-mono text-[9px]">−</kbd>
        <kbd className="ml-0.5 rounded border bg-background px-1 font-mono text-[9px]">0</kbd>
        <kbd className="ml-0.5 rounded border bg-background px-1 font-mono text-[9px]">Esc</kbd>
      </div>
    </div>,
    document.body,
  );
}
