'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Network, FileText, Folder, Building2, GraduationCap, Microscope, Globe, Landmark, ChevronDown, Home, Library, MessageSquare, Calendar, Users, Search, Sparkles, Atom, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { canonicPaper } from '#site/content';
import { buildCommunityTree, type TreeNode } from '@/lib/sidebar-tree';
import { useLeftCollapsed, useLeftWidth } from '@/lib/ui-state';
import { cn } from '@/lib/utils';
import { useGraphContext } from '@/lib/graph-context';
import { Graph3DFilters } from '@/components/graph/graph-3d';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  gobierno: <Landmark className="h-3.5 w-3.5" />,
  csu: <Building2 className="h-3.5 w-3.5" />,
  rectoria: <Building2 className="h-3.5 w-3.5" />,
  direccion: <Building2 className="h-3.5 w-3.5" />,
  vicerrectoria: <GraduationCap className="h-3.5 w-3.5" />,
  facultad: <GraduationCap className="h-3.5 w-3.5" />,
  programa: <FileText className="h-3.5 w-3.5" />,
  escuela: <BookMarked className="h-3.5 w-3.5" />,
  caba: <FileText className="h-3.5 w-3.5" />,
  instituto: <Microscope className="h-3.5 w-3.5" />,
  centro: <Globe className="h-3.5 w-3.5" />,
};

/** Section colapsable principal del sidebar (Canónico, Comunidades, ...) con persistencia en localStorage. */
function SectionToggle({
  id,
  emoji,
  title,
  children,
}: {
  id: string;
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  const storageKey = `reforma-ud:sidebar-section-${id}`;
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v === 'false') setOpen(false);
    } catch {}
  }, [storageKey]);

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      try {
        localStorage.setItem(storageKey, String(next));
      } catch {}
      return next;
    });
  }

  return (
    <section className="mb-2">
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/80 hover:bg-sidebar-accent hover:text-foreground"
        aria-expanded={open}
      >
        <ChevronDown className={cn('h-2.5 w-2.5 transition-transform', !open && '-rotate-90')} />
        <span className="opacity-80">{emoji}</span>
        <span>{title}</span>
      </button>
      {open && <div className="mt-0.5">{children}</div>}
    </section>
  );
}

/* ============================================================
 * ReformaCuanticaSection — folder con 12 papers + TOC inline del activo
 * Estructura jerárquica navegable Obsidian-style:
 *   Reforma Cuántica
 *     ├── M01 ← (si activo, expande con TOC)
 *     │     ├── §0 Abstract
 *     │     ├── §1 Introducción
 *     │     └── ...
 *     ├── M02
 *     └── ...
 * ============================================================ */

type Paper = { id: string; number: number; title: string; href: string };

function ReformaCuanticaSection({
  papers,
  pathname,
  filter,
}: Readonly<{
  papers: Paper[];
  pathname: string;
  filter: string;
}>) {
  const storageKey = 'reforma-ud:sidebar-reforma-cuantica';
  const isOnPaper = pathname.startsWith('/canonico/m');
  const [open, setOpen] = useState<boolean>(isOnPaper);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v === 'true') setOpen(true);
      else if (v === 'false' && !isOnPaper) setOpen(false);
    } catch {}
  }, [isOnPaper]);

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      try { localStorage.setItem(storageKey, String(next)); } catch {}
      return next;
    });
  }

  // Filtrar papers por el query del search box
  const q = filter.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return papers;
    return papers.filter((p) =>
      p.id.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q),
    );
  }, [papers, q]);

  // Cuando hay filtro, abrimos automáticamente
  const effectiveOpen = open || q.length > 0;

  return (
    <li>
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full items-center gap-1 rounded px-2 py-1 text-xs hover:bg-sidebar-accent"
        aria-expanded={effectiveOpen}
      >
        <ChevronDown className={cn('h-3 w-3 transition-transform text-muted-foreground', !effectiveOpen && '-rotate-90')} />
        <Atom className="h-3.5 w-3.5 text-primary/80" />
        <span className="flex-1 text-left font-medium">Reforma Cuántica</span>
        <span className="text-[9px] text-muted-foreground">{filtered.length}</span>
      </button>
      {effectiveOpen && (
        <ul className="ml-3 space-y-0.5 border-l border-sidebar-border pl-2 mt-0.5">
          {filtered.map((p) => (
            <PaperItem key={p.id} paper={p} pathname={pathname} filter={q} />
          ))}
          {filtered.length === 0 && (
            <li className="px-2 py-1 text-[10px] text-muted-foreground italic">Sin coincidencias</li>
          )}
        </ul>
      )}
    </li>
  );
}

/** Una entrada de paper en el sidebar (v4.5b D2: TOC migró a Conexiones › Esquema). */
function PaperItem({ paper, pathname }: Readonly<{ paper: Paper; pathname: string; filter: string }>) {
  const isActive = pathname === paper.href || pathname === `${paper.href}/`;

  return (
    <li>
      <Link
        href={paper.href}
        className={cn(
          'flex items-center gap-1.5 rounded px-2 py-1 text-[11px] hover:bg-sidebar-accent',
          isActive && 'bg-sidebar-accent font-semibold text-sidebar-primary',
        )}
      >
        <span className="font-mono text-[9px] text-muted-foreground">
          M{String(paper.number).padStart(2, '0')}
        </span>
        <span className="truncate">{paper.title.replace(/^M\d+\s*[—-]\s*/i, '').slice(0, 36)}</span>
      </Link>
    </li>
  );
}

function TreeItem({ node, currentPath, depth = 0 }: { node: TreeNode; currentPath: string; depth?: number }) {
  const isLeaf = node.children.length === 0;
  const icon = node.type ? TYPE_ICONS[node.type] : <Folder className="h-3.5 w-3.5 opacity-60" />;
  const isActive = node.href === currentPath;
  const hasActiveChild = currentPath.startsWith(`/${node.slug}/`) || currentPath === `/${node.slug}`;
  const [open, setOpen] = useState<boolean>(hasActiveChild || depth === 0);

  return (
    <li>
      <div
        className={cn(
          'group flex items-center gap-1 rounded px-1 py-0.5',
          isActive && 'bg-sidebar-accent text-sidebar-primary font-semibold',
        )}
      >
        {!isLeaf && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Contraer' : 'Expandir'}
            className="rounded p-0.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            <ChevronDown className={cn('h-3 w-3 transition-transform', !open && '-rotate-90')} />
          </button>
        )}
        {isLeaf && <span className="w-4" />}
        {node.href ? (
          <Link
            href={node.href}
            className={cn(
              'min-w-0 flex-1 truncate rounded px-1.5 py-1 text-xs',
              !isActive && 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
            title={node.name}
          >
            <span className="inline-flex items-center gap-1.5 truncate">
              {icon}
              <span className="truncate">{node.name}</span>
            </span>
          </Link>
        ) : (
          <span className="min-w-0 flex-1 truncate px-1.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {node.name}
          </span>
        )}
      </div>
      {!isLeaf && open && (
        <ul className="ml-3 border-l border-sidebar-border pl-2">
          {node.children.map((c) => (
            <TreeItem key={c.slug} node={c} currentPath={currentPath} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const pathname = usePathname() ?? '/';
  const [collapsed] = useLeftCollapsed();
  const [width, setWidth] = useLeftWidth();
  const tree = buildCommunityTree();
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);
  const graph = useGraphContext();
  const isOnGraph = pathname === '/canonico/grafo' || pathname.startsWith('/canonico/grafo/');
  const [filter, setFilter] = useState('');

  // collapsed: barra estrecha con icons clave + opciones
  if (collapsed) {
    const NavIcon = ({ href, label, Icon, isActive }: { href: string; label: string; Icon: typeof Home; isActive: boolean }) => (
      <Link
        href={href}
        aria-label={label}
        title={label}
        className={cn(
          'group relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
          isActive ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="pointer-events-none absolute left-12 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
          {label}
        </span>
      </Link>
    );
    return (
      <nav
        data-pagefind-ignore
        data-sidebar
        className="hidden h-[calc(100vh-3.5rem)] w-14 shrink-0 flex-col items-center gap-1 border-r bg-sidebar py-3 text-sidebar-foreground md:flex"
      >
        <NavIcon href="/" label="Inicio" Icon={Home} isActive={pathname === '/'} />
        <NavIcon href="/canonico" label="Canónico · Biblioteca" Icon={Library} isActive={pathname.startsWith('/canonico') && pathname !== '/canonico/grafo'} />
        <NavIcon href="/canonico/grafo" label="Grafo global del corpus" Icon={Network} isActive={pathname === '/canonico/grafo'} />
        <div className="my-1 h-px w-8 bg-sidebar-border" />
        <NavIcon href="/comunidades" label="Comunidades · Hub" Icon={GraduationCap} isActive={pathname === '/comunidades'} />
        <NavIcon href="/comunidades/gobierno" label="Gobierno" Icon={Landmark} isActive={pathname.startsWith('/comunidades/gobierno')} />
        <NavIcon href="/comunidades/formacion" label="VR Formación" Icon={BookMarked} isActive={pathname.startsWith('/comunidades/formacion')} />
        <NavIcon href="/comunidades/investigacion" label="VR Investigación" Icon={Microscope} isActive={pathname.startsWith('/comunidades/investigacion')} />
        <NavIcon href="/comunidades/extension" label="VR Extensión" Icon={Globe} isActive={pathname.startsWith('/comunidades/extension')} />
        <div className="mt-auto h-px w-8 bg-sidebar-border" />
        <Link
          href="/about"
          aria-label="Acerca de"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            pathname.startsWith('/about') ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
          )}
        >
          <Globe className="h-4 w-4" />
        </Link>
      </nav>
    );
  }

  return (
    <SidebarResizableNav width={width} setWidth={setWidth}>
      {/* v4.5 D3 · sidebar = navegación pura. Misiones y stats por-doc removidos:
          contexto vive en su lugar (header/right-panel/página /mision). */}

      {/* Filtros contextuales del grafo (solo en /canonico/grafo) */}
      {isOnGraph && graph && (
        <section className="border-b border-sidebar-border max-h-[60%] overflow-hidden flex flex-col">
          <div className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/80 bg-sidebar-accent/30">
            Filtros · Grafo global
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Graph3DFilters controller={graph} />
          </div>
        </section>
      )}

      {/* Search box inline (filtra navegación) */}
      <div className="px-2 pt-2 pb-1">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar..."
            className="w-full rounded-md border bg-background pl-7 pr-7 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {filter && (
            <button
              type="button"
              onClick={() => setFilter('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Limpiar filtro"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navegación principal */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-1.5 py-2 text-sm">
        <SectionToggle id="canonico" emoji="📚" title="Canónico MI-12">
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/canonico"
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs hover:bg-sidebar-accent',
                  pathname === '/canonico' && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                )}
              >
                <Library className="h-3.5 w-3.5" />
                <span className="flex-1">Biblioteca</span>
              </Link>
              {/* Reforma Cuántica vive DENTRO de la biblioteca, anidado visualmente */}
              <ul className="ml-3 mt-0.5 border-l border-sidebar-border pl-2">
                <ReformaCuanticaSection papers={papers} pathname={pathname} filter={filter} />
              </ul>
            </li>
            <li>
              <Link
                href="/canonico/grafo"
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs hover:bg-sidebar-accent',
                  pathname === '/canonico/grafo' && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                )}
              >
                <Network className="h-3.5 w-3.5" /> Grafo global
              </Link>
            </li>
          </ul>
        </SectionToggle>

        <SectionToggle id="comunidades" emoji="🏛️" title="Comunidades">
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/comunidades"
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium hover:bg-sidebar-accent',
                  pathname === '/comunidades' && 'bg-sidebar-accent text-sidebar-primary',
                )}
              >
                <Folder className="h-3.5 w-3.5 opacity-60" /> Hub
              </Link>
            </li>
            {tree.map((root) => (
              <TreeItem key={root.slug} node={root} currentPath={pathname} />
            ))}
          </ul>
        </SectionToggle>
      </div>

      <div className="border-t border-sidebar-border px-3 py-1.5 text-[9px] text-muted-foreground/70 flex items-center justify-between">
        <span className="font-mono">CSU 04/2025</span>
        <span>v3.2 · CC BY-SA 4.0</span>
      </div>
    </SidebarResizableNav>
  );
}

/* ============================================================
 * SidebarResizableNav — envolvente con drag handle redimensionable
 * ============================================================ */

function SidebarResizableNav({
  width,
  setWidth,
  children,
}: Readonly<{
  width: number;
  setWidth: (n: number) => void;
  children: React.ReactNode;
}>) {
  const startRef = useRef<{ x: number; w: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    setWidth(startRef.current.w + dx);
  }, [setWidth]);

  const onPointerUp = useCallback(() => {
    startRef.current = null;
    setDragging(false);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [onPointerMove]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, w: width };
    setDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [width, onPointerMove, onPointerUp]);

  // Cleanup en desmontaje
  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }, [onPointerMove, onPointerUp]);

  return (
    <aside
      data-sidebar
      data-pagefind-ignore
      style={{ width: `${width}px` }}
      className={cn(
        'hidden shrink-0 border-r bg-sidebar text-sidebar-foreground md:block relative',
        dragging && 'select-none',
      )}
    >
      {/* Sticky inner container — fija el sidebar al scroll del documento (paridad con right-panel) */}
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
        {children}
      </div>

      {/* Drag handle visible · v4.4 mejorado */}
      <button
        type="button"
        aria-label="Ajustar ancho del sidebar (doble-clic: reset)"
        onPointerDown={onPointerDown}
        onDoubleClick={() => setWidth(288)}
        title="Arrastrar para ajustar · Doble-clic: reset a 288px"
        className={cn(
          'group absolute top-0 right-0 h-full w-1.5 cursor-col-resize z-30 transition-colors',
          'before:absolute before:inset-y-0 before:-right-1 before:w-3 before:content-[""]',
          'hover:bg-primary/40 active:bg-primary/60',
          dragging && 'bg-primary/60',
        )}
        style={{ touchAction: 'none' }}
      >
        {/* Grip dots visible al hover */}
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
          <span className="h-0.5 w-0.5 rounded-full bg-current"></span>
        </span>
      </button>
      {dragging && (
        <span className="pointer-events-none fixed top-16 left-2 z-50 rounded bg-background/95 backdrop-blur px-2 py-1 font-mono text-[11px] text-foreground border-2 border-primary shadow-md">
          ⟷ {width}px
        </span>
      )}
    </aside>
  );
}
