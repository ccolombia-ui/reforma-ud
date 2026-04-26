'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, PanelLeft, PanelRight, ChevronRight, Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ProfileMenu } from '@/components/layout/profile-menu';
import { useLeftCollapsed, useRightPanel } from '@/lib/ui-state';
import { useEffect, useMemo, useState } from 'react';

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

function MobileSidebarContent() {
  // Reusa la composición del sidebar pero en formato vertical sin resize.
  // Por simplicidad, redirige al usuario a las secciones principales.
  return (
    <nav className="p-4 space-y-2 text-sm">
      <Link href="/" className="block rounded px-2 py-1.5 hover:bg-accent">Inicio</Link>
      <Link href="/canonico" className="block rounded px-2 py-1.5 hover:bg-accent">Biblioteca</Link>
      <Link href="/canonico/grafo" className="block rounded px-2 py-1.5 hover:bg-accent">Grafo global</Link>
      <Link href="/mision" className="block rounded px-2 py-1.5 hover:bg-accent">Mi misión</Link>
      <div className="pt-2 mt-2 border-t">
        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Comunidades</p>
        <Link href="/comunidades/gobierno" className="block rounded px-2 py-1.5 hover:bg-accent">Gobierno</Link>
        <Link href="/comunidades/formacion" className="block rounded px-2 py-1.5 hover:bg-accent">VR Formación</Link>
        <Link href="/comunidades/investigacion" className="block rounded px-2 py-1.5 hover:bg-accent">VR Investigación</Link>
        <Link href="/comunidades/extension" className="block rounded px-2 py-1.5 hover:bg-accent">VR Extensión</Link>
      </div>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const [leftCollapsed, toggleLeft] = useLeftCollapsed();
  const { collapsed: rightCollapsed, toggle: toggleRight } = useRightPanel();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform));
    }
  }, []);
  const cmdKey = isMac ? '⌘' : 'Ctrl';

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
      className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/85 px-2 backdrop-blur-md md:px-3"
      data-pagefind-ignore
    >
      {/* Mobile: hamburger → Sheet drawer con sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden shrink-0" aria-label="Abrir navegación">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0 overflow-hidden">
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <div className="h-full overflow-y-auto" data-mobile-sidebar>
            <MobileSidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop: toggle del sidebar fijo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLeft}
            aria-label={leftCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
            className="hidden md:inline-flex shrink-0"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {leftCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        </TooltipContent>
      </Tooltip>

      {/* Logo + Profile area (LEFT) */}
      <Link href="/" className="hidden shrink-0 items-center gap-2 font-bold tracking-tight sm:flex">
        <img
          src="/logo-udfjc.svg"
          alt="UDFJC"
          width={28}
          height={28}
          className="h-7 w-7 rounded-full bg-white"
        />
        <span className="text-base text-primary">reforma·ud</span>
      </Link>
      <ProfileMenu />

      {/* Breadcrumb central */}
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

      {/* Right utilities */}
      <div className="ml-auto flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: !isMac }))}
              className="hidden sm:inline-flex h-8 items-center gap-2 rounded-md border bg-muted/40 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Abrir paleta de comandos"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Buscar...</span>
              <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-mono">{cmdKey}K</kbd>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Paleta de comandos · {cmdKey}+K</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild aria-label="Repositorio en GitHub">
              <a href="https://github.com/ccolombia-ui/reforma-ud" target="_blank" rel="noopener noreferrer">
                <Code2 className="h-4 w-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Código fuente en GitHub</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex"><ThemeToggle /></span>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tema (claro / oscuro)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRight}
              aria-label={rightCollapsed ? 'Mostrar asistente' : 'Ocultar asistente'}
              className="shrink-0"
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {rightCollapsed ? 'Mostrar panel asistente' : 'Ocultar panel asistente'}
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
