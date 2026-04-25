'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Network, FileText, Folder, Building2, GraduationCap, Microscope, Globe, Landmark, ChevronDown, Home, Library, MessageSquare, Calendar, Users, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { canonicPaper } from '#site/content';
import { buildCommunityTree, type TreeNode } from '@/lib/sidebar-tree';
import { useLeftCollapsed } from '@/lib/ui-state';
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
    <section className="mb-3">
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full items-center gap-1.5 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        aria-expanded={open}
      >
        <ChevronDown className={cn('h-3 w-3 transition-transform', !open && '-rotate-90')} />
        <span>{emoji} {title}</span>
      </button>
      {open && <div className="mt-1">{children}</div>}
    </section>
  );
}

/** Sub-sección colapsable de los 12 papers del canónico */
function PapersSubsection({
  papers,
  pathname,
}: {
  papers: Array<{ id: string; number: number; title: string; href: string }>;
  pathname: string;
}) {
  const storageKey = 'reforma-ud:sidebar-papers-list';
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
      try {
        localStorage.setItem(storageKey, String(next));
      } catch {}
      return next;
    });
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full items-center gap-1 rounded px-2 py-1 text-xs hover:bg-sidebar-accent"
        aria-expanded={open}
      >
        <ChevronDown className={cn('h-3 w-3 transition-transform text-muted-foreground', !open && '-rotate-90')} />
        <BookMarked className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">12 papers M01-M12</span>
        <span className="text-[9px] text-muted-foreground">{papers.length}</span>
      </button>
      {open && (
        <ul className="ml-3 space-y-0.5 border-l border-sidebar-border pl-2 mt-0.5">
          {papers.map((p) => (
            <li key={p.id}>
              <Link
                href={p.href}
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-[11px] hover:bg-sidebar-accent',
                  pathname === p.href && 'bg-sidebar-accent font-semibold text-sidebar-primary',
                )}
              >
                <span className="font-mono text-[9px] text-muted-foreground">
                  M{String(p.number).padStart(2, '0')}
                </span>
                <span className="truncate">{p.title.replace(/^M\d+\s*[—-]\s*/i, '').slice(0, 32)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
  const tree = buildCommunityTree();
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);

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
    <nav
      data-sidebar
      data-pagefind-ignore
      className="hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 flex-col overflow-y-auto border-r bg-sidebar text-sidebar-foreground md:flex"
    >
      <div className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="block text-base font-bold tracking-tight">
          reforma·ud
        </Link>
        <p className="text-xs text-muted-foreground">Acuerdo CSU 04/2025</p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 text-sm">
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
                <Library className="h-3.5 w-3.5" /> Biblioteca
              </Link>
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
            <PapersSubsection papers={papers} pathname={pathname} />
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

      <div className="border-t border-sidebar-border px-3 py-2 text-[10px] text-muted-foreground">
        v3.2 · CC BY-SA 4.0
      </div>
    </nav>
  );
}
