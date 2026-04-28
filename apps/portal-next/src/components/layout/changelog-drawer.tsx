'use client';

import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type VersionInfo = {
  version: string;
  buildDate: string;
  commit?: string;
  changes: Array<{ title: string; summary: string }>;
};

const STORAGE_KEY = 'reforma-ud:last-seen-version';

/**
 * ChangelogDrawer — detecta deploy nuevo comparando version.json contra localStorage.
 * Pop-up automático la primera vez en sesión post-deploy. Botón persistente en header en mobile.
 */
export function ChangelogDrawer() {
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch('/version.json', { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : null)
      .then((data: VersionInfo | null) => {
        if (!data) return;
        setVersion(data);
        try {
          const lastSeen = localStorage.getItem(STORAGE_KEY);
          if (lastSeen !== data.version) {
            setIsNew(true);
            // v7.10 · QUITADO el auto-open. El Sheet bloqueaba pointer events
            // de toda la página (overlay con z-50 + pointer-events:auto cuando
            // el state quedaba "open") y rompía hover-preview, navegación del
            // grafo, y empujaba el layout creando un margen mid-page.
            // Ahora el indicador floating bottom-left "Novedades" sigue visible
            // y el usuario decide cuándo abrir el drawer.
          }
        } catch {}
      })
      .catch(() => {});
  }, []);

  function handleClose(o: boolean) {
    setOpen(o);
    if (!o && version) {
      try {
        localStorage.setItem(STORAGE_KEY, version.version);
        setIsNew(false);
      } catch {}
    }
  }

  if (!version) return null;

  return (
    <>
      {/* Indicador floating bottom-right cuando hay cambios sin ver */}
      {isNew && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            'fixed bottom-4 left-4 z-40 group inline-flex items-center gap-2 rounded-full',
            'border border-primary/30 bg-primary/10 backdrop-blur-md px-3 py-2 text-xs font-medium',
            'shadow-md hover:bg-primary/20 transition-colors',
          )}
          aria-label="Ver novedades del deploy"
        >
          <span className="relative">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </span>
          <span className="text-primary">Novedades · {version.version}</span>
        </button>
      )}

      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent side="right" className="w-[420px] max-w-[90vw] overflow-y-auto p-0">
          <SheetTitle className="sr-only">Novedades · {version.version}</SheetTitle>
          <div className="border-b bg-gradient-to-br from-primary/5 to-transparent p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Novedades del deploy
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{version.version}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {version.buildDate}{version.commit ? ` · ${version.commit}` : ''}
            </p>
          </div>
          <ul className="p-4 space-y-4">
            {version.changes.map((c, i) => (
              <li key={i} className="space-y-1">
                <h3 className="text-sm font-semibold leading-tight">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.summary}</p>
              </li>
            ))}
          </ul>
          <div className="border-t p-3 text-center text-[10px] text-muted-foreground">
            Esta es una vista previa de los cambios. Cierra para no volver a verla.
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
