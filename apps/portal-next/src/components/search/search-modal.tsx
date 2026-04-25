'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, X, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PagefindResult = {
  id: string;
  data: () => Promise<{
    url: string;
    raw_url?: string;
    excerpt: string;
    meta: Record<string, string>;
    content: string;
  }>;
};

type Pagefind = {
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
};

declare global {
  interface Window {
    __pagefind?: Pagefind;
  }
}

async function loadPagefind(): Promise<Pagefind | null> {
  if (typeof window === 'undefined') return null;
  if (window.__pagefind) return window.__pagefind;
  try {
    /* @vite-ignore */
    const pf = (await import(/* webpackIgnore: true */ '/pagefind/pagefind.js' as string)) as Pagefind;
    window.__pagefind = pf;
    return pf;
  } catch (err) {
    console.warn('[search] pagefind no disponible aún (solo en build de producción):', err);
    return null;
  }
}

type ResolvedResult = {
  url: string;
  excerpt: string;
  title?: string;
};

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResolvedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut "/" to open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === '/' && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const pf = await loadPagefind();
      if (!pf) {
        setError('Búsqueda no disponible en dev. Hace falta pnpm build para indexar con pagefind.');
        setResults([]);
        return;
      }
      const res = await pf.search(q);
      const resolved = await Promise.all(
        res.results.slice(0, 12).map(async (r) => {
          const data = await r.data();
          return {
            url: data.url,
            excerpt: data.excerpt,
            title: data.meta?.title,
          };
        })
      );
      setResults(resolved);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error en búsqueda');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => search(query), 250);
    return () => clearTimeout(t);
  }, [query, search]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="search-trigger gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
        aria-label="Abrir búsqueda"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="ml-2 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono sm:inline-block">
          /
        </kbd>
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Búsqueda"
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-lg border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en papers, comunidades, notas..."
                className="border-0 shadow-none focus-visible:ring-0"
              />
              {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {error && (
                <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                  {error}
                </div>
              )}
              {!query && !error && (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  <p>Escribe para buscar en el corpus.</p>
                  <p className="mt-1 text-xs">Atajo: <kbd className="rounded border bg-muted px-1 font-mono">/</kbd> · <kbd className="rounded border bg-muted px-1 font-mono">Ctrl+K</kbd></p>
                </div>
              )}
              {query && !loading && results.length === 0 && !error && (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Sin resultados para &ldquo;{query}&rdquo;.
                </div>
              )}
              {results.length > 0 && (
                <ul className="space-y-1">
                  {results.map((r, i) => (
                    <li key={i}>
                      <Link
                        href={r.url}
                        onClick={() => setOpen(false)}
                        className="flex flex-col gap-1 rounded px-3 py-2 hover:bg-accent"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          {r.title ?? r.url}
                        </span>
                        <span
                          className="text-xs text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: r.excerpt }}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground">{r.url}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
