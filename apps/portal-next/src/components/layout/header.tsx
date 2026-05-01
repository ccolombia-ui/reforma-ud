'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeft, PanelRight, ChevronRight, Search, Menu, Plus, Bell, Maximize2, Minimize2, FileText, Pin, Share2, Rows3, Columns3 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ProfileMenu } from '@/components/layout/profile-menu';
import { useLeftCollapsed, useRightPanel, useFocusMode, useWorkspaceOrientation, useSplitMode } from '@/lib/ui-state';
import { canonicPaper, concepto } from '#site/content';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

import { layoutConfig } from '@/lib/layout/config';

// v6.1 G-HDR-01 · resolve seg → label rico (M## → "M03 Estándares
// Internacionales", con-* → SKOS prefLabel del concepto).
function prettify(seg: string): string {
  const segmentLabels = layoutConfig.header?.segmentLabels ?? {};
  if (segmentLabels[seg]) return segmentLabels[seg];
  if (/^m\d{2}$/i.test(seg)) {
    const p = canonicPaper.find((x) => x.id === seg.toLowerCase());
    if (p) return `${seg.toUpperCase()} · ${p.title}`;
    return seg.toUpperCase();
  }
  if (/^con-/.test(seg)) {
    const c = concepto.find((x) => x.id === seg);
    if (c) return c.skos_prefLabel ?? c.kd_title;
  }
  return seg.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function MobileSidebarContent() {
  // Reusa la composición del sidebar pero en formato vertical sin resize.
  // Por simplicidad, redirige al usuario a las secciones principales.
  return (
    <nav className="p-4 space-y-2 text-sm">
      <Link href="/" className="block rounded px-2 py-1.5 hover:bg-accent">Inicio</Link>
      <Link href="/canonico" className="block rounded px-2 py-1.5 hover:bg-accent">Biblioteca</Link>
      <Link href="/canonico/grafo" className="block rounded px-2 py-1.5 hover:bg-accent">Grafo semántico</Link>
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
  const [focusMode, toggleFocusMode] = useFocusMode();
  const { orientation, toggle: toggleOrientation } = useWorkspaceOrientation();
  // v7.6 · split mode on/off (default OFF). Convertimos el botón Columns3 actual
  // en toggle de splitMode (lo que el usuario quería). Orientation queda como
  // sub-control deferido (cuando splitMode=ON, futura UI permitirá flip H/V).
  const { splitMode, toggle: toggleSplitMode } = useSplitMode();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform));
    }
  }, []);
  const cmdKey = isMac ? '⌘' : 'Ctrl';

  // v6.1 G-WS-02 · F11 toggle focus mode (oculta ambas barras).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'F11') {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
        e.preventDefault();
        toggleFocusMode();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleFocusMode]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

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
      className="sticky top-0 z-30 flex h-12 items-center gap-1.5 border-b bg-background/90 px-2 backdrop-blur-md md:px-3"
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

      {/* Desktop: toggle del sidebar fijo · v5.0g indicador on/off */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLeft}
            aria-label={leftCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
            aria-pressed={!leftCollapsed}
            className={cn(
              'hidden md:inline-flex shrink-0',
              !leftCollapsed && 'bg-accent text-primary',
            )}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {leftCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        </TooltipContent>
      </Tooltip>

      {/* Brand (LEFT) — solo identidad institucional · v4.5 D4 */}
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
        {/* v6.1 G-HDR-02 · Quick actions dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Acciones rápidas" className="shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Acciones rápidas</TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Acciones rápidas
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a
                href={`mailto:ccmaderas@udistrital.edu.co?subject=Nueva nota — comunidad UDFJC&body=Comunidad/Programa:%0A%0AT%C3%ADtulo:%0A%0AContenido:%0A`}
              >
                <FileText className="mr-2 h-3.5 w-3.5" />
                Proponer nota nueva
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                if (typeof navigator !== 'undefined' && navigator.clipboard && shareUrl) {
                  navigator.clipboard.writeText(shareUrl).catch(() => {});
                }
              }}
            >
              <Share2 className="mr-2 h-3.5 w-3.5" />
              Copiar URL para compartir
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/canonico">
                <Pin className="mr-2 h-3.5 w-3.5" />
                Ir al dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => { e.preventDefault(); toggleFocusMode(); }}
              className="text-xs"
            >
              {focusMode ? <Minimize2 className="mr-2 h-3.5 w-3.5" /> : <Maximize2 className="mr-2 h-3.5 w-3.5" />}
              {focusMode ? 'Salir de modo enfocado' : 'Modo enfocado'}
              <kbd className="ml-auto rounded border bg-muted px-1 py-0.5 text-[9px] font-mono">F11</kbd>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* v6.1 G-HDR-03 · Notif/inbox placeholder (zero-state) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notificaciones" className="relative shrink-0" disabled>
              <Bell className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Notificaciones · próximamente</TooltipContent>
        </Tooltip>

        {/* v7.6 · Toggle split mode (on/off). Default OFF: clicks van a pane A
            URL-driven. ON: clicks van al último pane secundario usado. El icono
            Columns3 indica visualmente si hay división activa. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={splitMode ? 'default' : 'ghost'}
              size="icon"
              onClick={toggleSplitMode}
              aria-label={splitMode ? 'Desactivar split (single pane)' : 'Activar split (multi pane)'}
              aria-pressed={splitMode}
              className="hidden sm:inline-flex shrink-0"
            >
              <Columns3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {splitMode ? 'Split activo · clic para single pane' : 'Single pane · clic para activar split'}
          </TooltipContent>
        </Tooltip>

        {/* v6.2 G-WS-01 · Sub-toggle orientation (solo visible si splitMode=ON) */}
        {splitMode && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleOrientation}
                aria-label={orientation === 'horizontal' ? 'Cambiar a split vertical' : 'Cambiar a split horizontal'}
                className="hidden sm:inline-flex shrink-0"
              >
                {orientation === 'horizontal' ? <Rows3 className="h-4 w-4" /> : <Columns3 className="h-4 w-4 rotate-90" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {orientation === 'horizontal' ? 'Apilar panes (vertical)' : 'Panes lado a lado (horizontal)'}
            </TooltipContent>
          </Tooltip>
        )}

        {/* v5.0g · Botón Code2/GitHub removido del header (usuario lo
            consideró ruido). El repo sigue accesible via cmd-K → "github". */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex"><ThemeToggle /></span>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tema (claro / oscuro)</TooltipContent>
        </Tooltip>
        {/* Profile menu (RIGHT) · v4.5 D4 — identidad personal en cluster derecho */}
        <ProfileMenu />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRight}
              aria-label={rightCollapsed ? 'Mostrar asistente' : 'Ocultar asistente'}
              aria-pressed={!rightCollapsed}
              className={cn(
                'shrink-0',
                !rightCollapsed && 'bg-accent text-primary',
              )}
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
