'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, GraduationCap, PanelLeft, PanelRight, ChevronRight, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useLeftCollapsed, useRightPanel } from '@/lib/ui-state';
import { useMemo } from 'react';

const SEGMENT_LABELS: Record<string, string> = {
  canonico: 'Canónico',
  comunidades: 'Comunidades',
  gobierno: 'Gobierno',
  formacion: 'VR Formación',
  investigacion: 'VR Investigación',
  extension: 'VR Extensión',
  facultades: 'Facultades',
  escuelas: 'Escuelas',
  programas: 'Programas',
  cabas: 'CABAs',
  institutos: 'Institutos',
  centros: 'Centros',
  direcciones: 'Direcciones',
  biblioteca: 'Biblioteca',
  grafo: 'Grafo',
  about: 'Acerca de',
};

function prettify(seg: string): string {
  if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg];
  if (/^m\d{2}$/i.test(seg)) return seg.toUpperCase();
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Header() {
  const pathname = usePathname();
  const [leftCollapsed, toggleLeft] = useLeftCollapsed();
  const { collapsed: rightCollapsed, toggle: toggleRight } = useRightPanel();

  const crumbs = useMemo(() => {
    if (!pathname || pathname === '/') return [];
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((p, i) => ({
      label: prettify(decodeURIComponent(p)),
      href: '/' + parts.slice(0, i + 1).join('/'),
      isLast: i === parts.length - 1,
    }));
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/85 px-3 backdrop-blur-md md:px-4"
      data-pagefind-ignore
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLeft}
        aria-label={leftCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        className="shrink-0"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>

      <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
        <span className="hidden text-base text-primary sm:inline">reforma·ud</span>
      </Link>

      <nav aria-label="Breadcrumb" className="hidden min-w-0 flex-1 items-center gap-1 text-sm md:flex">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Inicio
        </Link>
        {crumbs.map((c) => (
          <span key={c.href} className="flex min-w-0 items-center gap-1">
            <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
            {c.isLast ? (
              <span className="truncate text-foreground" title={c.label}>{c.label}</span>
            ) : (
              <Link href={c.href} className="truncate text-muted-foreground hover:text-foreground" title={c.label}>
                {c.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="hidden sm:inline-flex h-8 items-center gap-2 rounded-md border bg-muted/40 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Abrir paleta de comandos"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Buscar...</span>
          <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </button>
        <Button variant="ghost" size="icon" asChild aria-label="Repositorio en GitHub">
          <a href="https://github.com/ccolombia-ui/reforma-ud" target="_blank" rel="noopener noreferrer">
            <Code2 className="h-4 w-4" />
          </a>
        </Button>
        <ThemeToggle />
        <div className="ml-1 hidden items-center gap-2 rounded-full border bg-muted/40 px-2 py-1 sm:flex">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-white"
            style={{ background: 'var(--color-brand-purple)' }}
          >
            <GraduationCap className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-medium">UDFJC</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleRight}
          aria-label={rightCollapsed ? 'Mostrar asistente' : 'Ocultar asistente'}
          className="shrink-0"
        >
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
