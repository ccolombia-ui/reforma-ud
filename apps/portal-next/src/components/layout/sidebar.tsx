'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Network, FileText, Folder, Building2, GraduationCap, Microscope, Globe, Landmark, ChevronDown, Home, Library, MessageSquare, Calendar, Users, Search, Sparkles, Atom, X, Scale, BookOpen, Hammer } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { canonicPaper, concepto, community, csuAcuerdo } from '#site/content';
import { buildCommunityTree, type TreeNode } from '@/lib/sidebar-tree';
import { useLeftCollapsed, useLeftWidth } from '@/lib/ui-state';
import { filterPublished, buildPublishedConceptIds, isConceptVisible } from '@/lib/show-drafts';
import { cn } from '@/lib/utils';

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
    // v6.3 G-SBL-04 · escuchar collapse-all/expand-all globales del sidebar
    function onBulk(e: Event) {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      if (typeof detail?.open === 'boolean') {
        setOpen(detail.open);
        try { localStorage.setItem(storageKey, String(detail.open)); } catch {}
      }
    }
    window.addEventListener('reforma-ud:sidebar-bulk-toggle', onBulk);
    return () => window.removeEventListener('reforma-ud:sidebar-bulk-toggle', onBulk);
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
      {/* v5.0v · Header doble: chevron toggle (no navega) + Link a /canonico (dashboard).
          Patrón Linear/Notion: chevron expande/colapsa la lista, el resto del row navega. */}
      <div className="group flex w-full items-center gap-1 rounded pr-1 hover:bg-sidebar-accent">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={effectiveOpen}
          aria-label={effectiveOpen ? 'Colapsar' : 'Expandir'}
          className="flex items-center justify-center pl-2 py-1"
        >
          <ChevronDown className={cn('h-3 w-3 transition-transform text-muted-foreground', !effectiveOpen && '-rotate-90')} />
        </button>
        <Link
          href="/canonico"
          className={cn(
            'flex flex-1 items-center gap-1 px-1 py-1 text-xs',
            pathname === '/canonico' && 'font-semibold text-sidebar-primary',
          )}
        >
          <Atom className="h-3.5 w-3.5 text-primary/80 shrink-0" />
          <span className="flex-1 text-left font-medium leading-tight">Reforma Vinculante UDFJC: Análisis, Buenas Prácticas y Prospectiva Transformativa</span>
          <span className="text-[9px] text-muted-foreground shrink-0">{filtered.length}</span>
        </Link>
      </div>
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

/* ============================================================
 * v5.0i · GlosarioSection — folder Glosario con 6 categorías + 74 conceptos
 * Paridad con ReformaCuanticaSection. Cada concepto es link al detalle.
 * ============================================================ */

type ConceptoLite = {
  id: string;
  href: string;
  skos_prefLabel: string;
  kd_title: string;
  tags: string[];
};

type ConceptoCategoria = {
  key: string;             // tag canónico (ej. 'concepto-normativo')
  label: string;           // visual label (ej. 'Normativos')
  emoji: string;
};

// 6 categorías canónicas (orden de display) basadas en `tags` del frontmatter
const CONCEPTO_CATEGORIAS: readonly ConceptoCategoria[] = [
  { key: 'concepto-normativo',         label: 'Normativos',           emoji: '📜' },
  { key: 'concepto-academico',         label: 'Académicos',           emoji: '🎓' },
  { key: 'concepto-meta-instrumental', label: 'Meta-instrumentales',  emoji: '🛠️' },
  { key: 'concepto-sintesis',          label: 'Síntesis',             emoji: '✨' },
  { key: 'concepto-nuevo',             label: 'Refundacionales',      emoji: '🌱' },
  { key: 'concepto-internacional',     label: 'Internacionales',      emoji: '🌐' },
] as const;

function classifyConcepto(c: ConceptoLite): string {
  for (const cat of CONCEPTO_CATEGORIAS) {
    if (c.tags.includes(cat.key)) return cat.key;
  }
  return 'otros';
}

function GlosarioSection({
  conceptos, pathname, filter,
}: Readonly<{
  conceptos: ConceptoLite[];
  pathname: string;
  filter: string;
}>) {
  const storageKey = 'reforma-ud:sidebar-glosario';
  const isOnGlosario = pathname.startsWith('/glosario');
  const [open, setOpen] = useState<boolean>(isOnGlosario);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v === 'true') setOpen(true);
      else if (v === 'false' && !isOnGlosario) setOpen(false);
    } catch {}
  }, [isOnGlosario]);

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      try { localStorage.setItem(storageKey, String(next)); } catch {}
      return next;
    });
  }

  // Filter por query de búsqueda
  const q = filter.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return conceptos;
    return conceptos.filter((c) => {
      const label = (c.skos_prefLabel ?? c.kd_title).toLowerCase();
      return label.includes(q) || c.id.toLowerCase().includes(q);
    });
  }, [conceptos, q]);

  // Agrupar por categoría
  const byCat = useMemo(() => {
    const map: Record<string, ConceptoLite[]> = {};
    for (const c of filtered) {
      const cat = classifyConcepto(c);
      if (!map[cat]) map[cat] = [];
      map[cat].push(c);
    }
    return map;
  }, [filtered]);

  const effectiveOpen = open || q.length > 0;

  return (
    <li>
      {/* v5.0y · Header doble: chevron toggle + Link a /glosario (dashboard).
          Patrón Linear/Notion (mismo que ReformaCuanticaSection). */}
      <div className="group flex w-full items-center gap-1 rounded pr-1 hover:bg-sidebar-accent">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={effectiveOpen}
          aria-label={effectiveOpen ? 'Colapsar' : 'Expandir'}
          className="flex items-center justify-center pl-2 py-1"
        >
          <ChevronDown className={cn('h-3 w-3 transition-transform text-muted-foreground', !effectiveOpen && '-rotate-90')} />
        </button>
        <Link
          href="/glosario"
          className={cn(
            'flex flex-1 items-center gap-1 px-1 py-1 text-xs',
            pathname === '/glosario' && 'font-semibold text-sidebar-primary',
          )}
        >
          <BookMarked className="h-3.5 w-3.5 text-primary/80 shrink-0" />
          <span className="flex-1 text-left font-medium">Glosario</span>
          <span className="text-[9px] text-muted-foreground shrink-0">{filtered.length}</span>
        </Link>
      </div>
      {effectiveOpen && (
        <ul className="ml-3 space-y-0.5 border-l border-sidebar-border pl-2 mt-0.5">
          {/* Link al index general del glosario */}
          <li>
            <Link
              href="/glosario"
              className={cn(
                'flex items-center gap-1.5 rounded px-2 py-1 text-[10px] hover:bg-sidebar-accent',
                pathname === '/glosario' && 'bg-sidebar-accent font-semibold text-sidebar-primary',
              )}
            >
              <span className="opacity-60">📖</span>
              <span className="flex-1 italic">Ver índice A-Z completo</span>
              <span className="font-mono text-[8px] text-muted-foreground">M00</span>
            </Link>
          </li>
          {CONCEPTO_CATEGORIAS.map((cat) => {
            const items = byCat[cat.key];
            if (!items || items.length === 0) return null;
            return (
              <CategoriaFolder
                key={cat.key}
                cat={cat}
                items={items}
                pathname={pathname}
                expandWhenFiltering={q.length > 0}
              />
            );
          })}
          {byCat['otros']?.length > 0 && (
            <CategoriaFolder
              cat={{ key: 'otros', label: 'Otros', emoji: '📎' }}
              items={byCat['otros']}
              pathname={pathname}
              expandWhenFiltering={q.length > 0}
            />
          )}
          {filtered.length === 0 && (
            <li className="px-2 py-1 text-[10px] text-muted-foreground italic">
              Sin coincidencias
            </li>
          )}
        </ul>
      )}
    </li>
  );
}

function CategoriaFolder({
  cat, items, pathname, expandWhenFiltering,
}: Readonly<{
  cat: ConceptoCategoria;
  items: ConceptoLite[];
  pathname: string;
  expandWhenFiltering: boolean;
}>) {
  const storageKey = `reforma-ud:sidebar-glosario-cat-${cat.key}`;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v === 'true') setOpen(true);
    } catch {}
  }, [storageKey]);

  const effectiveOpen = open || expandWhenFiltering;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            try { localStorage.setItem(storageKey, String(next)); } catch {}
            return next;
          });
        }}
        className="group flex w-full items-center gap-1 rounded px-2 py-1 text-[10px] hover:bg-sidebar-accent"
        aria-expanded={effectiveOpen}
      >
        <ChevronDown className={cn('h-2.5 w-2.5 transition-transform text-muted-foreground', !effectiveOpen && '-rotate-90')} />
        <span className="opacity-80">{cat.emoji}</span>
        <span className="flex-1 text-left font-medium uppercase tracking-wide text-[9px] text-muted-foreground/80">{cat.label}</span>
        <span className="text-[9px] text-muted-foreground">{items.length}</span>
      </button>
      {effectiveOpen && (
        <ul className="ml-2 mt-0.5 space-y-0 border-l border-sidebar-border/50 pl-2">
          {items.map((c) => {
            const label = c.skos_prefLabel ?? c.kd_title;
            const isActive = pathname === c.href;
            return (
              <li key={c.id}>
                <Link
                  href={c.href}
                  title={label}
                  className={cn(
                    'flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                  )}
                >
                  <span className="truncate">{label.replace(/^([A-Z]{2,}|\d+)\s+—\s+/, '')}</span>
                </Link>
              </li>
            );
          })}
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
      {/* Misiones CoP como sub-items directos bajo la comunidad */}
      {node.misionesCoP && node.misionesCoP.length > 0 && open && (
        <ul className="ml-3 border-l border-sidebar-border pl-2 mt-0.5">
          {node.misionesCoP.map((m) => {
            const mHref = `${node.href}/${m.slug}`;
            const isActive = currentPath === mHref;
            const icon = m.tipo === 'comprension'
              ? <BookOpen className="h-3 w-3 shrink-0 text-blue-500" />
              : m.tipo === 'deliberacion'
              ? <Scale className="h-3 w-3 shrink-0 text-orange-500" />
              : <Hammer className="h-3 w-3 shrink-0 text-green-500" />;
            return (
              <li key={m.id}>
                <Link
                  href={mHref}
                  className={cn(
                    'flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px] truncate',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                  )}
                  title={m.titulo}
                >
                  <span className="w-4 shrink-0" />
                  {icon}
                  <span className="truncate">{m.titulo}</span>
                </Link>
              </li>
            );
          })}
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
  // v6.x fix · papers debe ser memoizado para no recrear nueva referencia
  // en cada render (rompía useEffect de Recientes con loop infinito).
  const papers = useMemo(
    () => filterPublished([...canonicPaper]).sort((a, b) => a.number - b.number),
    [],
  );
  const publishedConceptIds = useMemo(
    () => buildPublishedConceptIds(canonicPaper),
    [],
  );
  const conceptos = useMemo(() =>
    [...concepto]
      .filter((c) => isConceptVisible(c.id, publishedConceptIds))
      .sort((a, b) => (a.skos_prefLabel ?? a.kd_title).localeCompare(b.skos_prefLabel ?? b.kd_title, 'es')),
    [publishedConceptIds],
  );
  const [filter, setFilter] = useState('');

  // v6.3 G-SBL-01 · Recientes (top 5 visitados con title resuelto).
  // FIX v6.x · solo pathname como dep. papers/conceptos se acceden via closure
  // pero NO van en deps (las collections de velite son stable references).
  const [recents, setRecents] = useState<Array<{ path: string; label: string }>>([]);
  useEffect(() => {
    if (!pathname || pathname === '/') return;
    // Ignorar sub-rutas (biblioteca/grafo/index) — solo trackeamos docs reales
    const isDocRoute =
      /^\/canonico\/m\d{2}\/?$/.test(pathname) ||
      /^\/glosario\/con-/.test(pathname) ||
      (/^\/comunidades\//.test(pathname) && !/(biblioteca|grafo)\/?$/.test(pathname));
    if (!isDocRoute) return;
    // Resolver label leyendo collections directamente (referencias stable de velite).
    let label = pathname;
    const mMatch = pathname.match(/^\/canonico\/(m\d{2})/i);
    if (mMatch) {
      const p = canonicPaper.find((x) => x.id === mMatch[1].toLowerCase());
      if (p) label = `${p.id.toUpperCase()} · ${p.title}`;
    } else if (pathname.startsWith('/glosario/')) {
      const cid = pathname.replace('/glosario/', '').replace(/\/$/, '');
      const c = concepto.find((x) => x.id === cid);
      if (c) label = c.skos_prefLabel ?? c.kd_title;
    } else if (pathname.startsWith('/comunidades/')) {
      const cleaned = pathname.replace(/^\//, '').replace(/\/$/, '');
      const cop = community.find((x) => x.slug === cleaned);
      if (cop) label = cop.shortName ?? cop.name;
    }
    try {
      const raw = localStorage.getItem('reforma-ud:recents');
      const stack: Array<{ path: string; label: string }> = raw ? JSON.parse(raw) : [];
      const filtered = stack.filter((x) => x.path !== pathname);
      const next = [{ path: pathname, label }, ...filtered].slice(0, 5);
      localStorage.setItem('reforma-ud:recents', JSON.stringify(next));
      setRecents(next);
    } catch { /* ignore storage errors */ }
  }, [pathname]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('reforma-ud:recents');
      if (raw) setRecents(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

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
        <NavIcon href="/canonico/grafo" label="Grafo semántico del corpus" Icon={Network} isActive={pathname === '/canonico/grafo'} />
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
          contexto vive en su lugar (header/right-panel/página /mision).
          v5.0i · filtros del grafo movidos al page de /canonico/grafo (overlay
          flotante interno) — el sidebar global no debe tener controles
          específicos de páginas. */}

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
        {/* v6.3 G-SBL-01 · Recientes (top 5 docs visitados) */}
        {recents.length > 0 && (
          <SectionToggle id="recents" emoji="🕒" title="Recientes">
            <ul className="space-y-0.5">
              {recents.map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    className={cn(
                      'flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-sidebar-accent',
                      pathname === r.path && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                    )}
                    title={r.label}
                  >
                    <span className="truncate">{r.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionToggle>
        )}

        <SectionToggle id="canonico" emoji="📚" title="Biblioteca reforma·ud">
          {/* v5.0x · Items directos bajo el SectionToggle root (sin sub-header
              "Biblioteca" intermedio). Orden: Grafo > Glosario > Reforma Vinculante. */}
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/canonico/grafo"
                className={cn(
                  'flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-sidebar-accent',
                  pathname === '/canonico/grafo' && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                )}
              >
                <Network className="h-3.5 w-3.5 text-primary/80" /> Grafo semántico
              </Link>
            </li>
            <GlosarioSection conceptos={conceptos} pathname={pathname} filter={filter} />
            <ReformaCuanticaSection papers={papers} pathname={pathname} filter={filter} />
            {/* v8 CSU · Estatutos Derivados Art. 98 ACU-004-25 */}
            <li>
              <div className="mt-1 flex items-center gap-1 px-2 py-0.5">
                <Scale className="h-3 w-3 text-blue-400/70 shrink-0" />
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-semibold">CSU — Estatutos</span>
                <span className="ml-auto text-[9px] text-muted-foreground/60">{csuAcuerdo.length}</span>
              </div>
              <ul className="ml-3 space-y-0.5 border-l border-sidebar-border pl-2">
                {csuAcuerdo.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={a.href}
                      className={cn(
                        'flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-sidebar-accent',
                        pathname.startsWith(`/acuerdos/${a.id}`) && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                      )}
                    >
                      <Scale className="h-3 w-3 text-blue-400/60 shrink-0" />
                      <span className="flex-1 text-left leading-tight line-clamp-2">{a.objetoCorto}</span>
                      <span className={cn(
                        'shrink-0 text-[8px] font-mono px-1 rounded',
                        a.estado === 'VIGENTE' ? 'bg-green-500/20 text-green-400' :
                        a.estado === 'PRE_APROBADO' ? 'bg-sky-500/20 text-sky-400' :
                        'bg-gray-500/20 text-gray-400'
                      )}>{a.estado}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </SectionToggle>

        <SectionToggle id="comunidades" emoji="🏛️" title="Comunidades">
          {/* v5.0x · Items directos bajo el SectionToggle root (sin sub-header
              "Hub" intermedio). Las 4 unidades organizativas (Gobierno,
              VR Formación, VR Investigación, VR Extensión) van directas. */}
          <ul className="space-y-0.5">
            {tree.map((root) => (
              <TreeItem key={root.slug} node={root} currentPath={pathname} />
            ))}
          </ul>
        </SectionToggle>
      </div>

      {/* v6.3 G-SBL-04 · botones collapse-all / expand-all */}
      <div className="border-t border-sidebar-border px-2 py-1 flex items-center gap-1">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('reforma-ud:sidebar-bulk-toggle', { detail: { open: false } }))}
          title="Colapsar todas las secciones"
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        >
          <ChevronDown className="h-3 w-3 -rotate-90" />
          Colapsar todo
        </button>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('reforma-ud:sidebar-bulk-toggle', { detail: { open: true } }))}
          title="Expandir todas las secciones"
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        >
          <ChevronDown className="h-3 w-3" />
          Expandir
        </button>
      </div>

      <div className="border-t border-sidebar-border px-3 py-1.5 text-[9px] text-muted-foreground/70 flex items-center justify-between">
        <span className="font-mono">CSU 04/2025</span>
        <span>v6.0 · CC BY-SA 4.0</span>
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
  const startRef = useRef<{ x: number; w: number; el: HTMLButtonElement; pointerId: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  /* v5.0e fix · drag stuck que rompía el toggle del sidebar.
   * Causa raíz: window-level listeners no se disparaban si el pointer
   * salía del viewport antes del soltar (p. ej. arrastrar más allá del
   * borde del browser). Resultado: dragging=true permanente, cursor
   * col-resize globalmente, y CUALQUIER mousemove subsiguiente movía el
   * sidebar — bloqueando interacciones (sub-items, toggles, scroll).
   *
   * Fix SOTA: setPointerCapture sobre el handle. El browser GARANTIZA
   * que pointermove/up se entregan al mismo elemento aunque el cursor
   * salga del viewport. Listeners viven en el elemento (no en window),
   * cleanup automático al unmount. */

  const cleanup = useCallback(() => {
    if (startRef.current) {
      try {
        startRef.current.el.releasePointerCapture(startRef.current.pointerId);
      } catch { /* element ya removido */ }
    }
    startRef.current = null;
    setDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    startRef.current = { x: e.clientX, w: width, el, pointerId: e.pointerId };
    setDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    try {
      el.setPointerCapture(e.pointerId);
    } catch { /* navegador antiguo, fallback graceful */ }
  }, [width]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!startRef.current || startRef.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - startRef.current.x;
    setWidth(startRef.current.w + dx);
  }, [setWidth]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!startRef.current || startRef.current.pointerId !== e.pointerId) return;
    cleanup();
  }, [cleanup]);

  // Recovery: ESC durante drag o blur del window → cleanup forzado
  useEffect(() => {
    if (!dragging) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') cleanup();
    }
    function onBlur() { cleanup(); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
    };
  }, [dragging, cleanup]);

  // Cleanup en desmontaje
  useEffect(() => () => { cleanup(); }, [cleanup]);

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

      {/* Drag handle visible · v5.0e — pointer capture (no más drag stuck) */}
      <button
        type="button"
        aria-label="Ajustar ancho del sidebar (doble-clic: reset)"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
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
