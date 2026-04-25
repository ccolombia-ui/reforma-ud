'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Network, FileText, Folder, Building2, GraduationCap, Microscope, Globe, Landmark, ChevronDown, Home, Library } from 'lucide-react';
import { useState } from 'react';
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

  // collapsed: barra estrecha solo con icons clave
  if (collapsed) {
    return (
      <nav
        data-pagefind-ignore
        data-sidebar
        className="hidden h-[calc(100vh-3.5rem)] w-14 shrink-0 flex-col items-center gap-2 border-r bg-sidebar py-3 text-sidebar-foreground md:flex"
      >
        <Link
          href="/"
          aria-label="Inicio"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            pathname === '/' ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
          )}
        >
          <Home className="h-4 w-4" />
        </Link>
        <Link
          href="/canonico"
          aria-label="Canónico"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            pathname.startsWith('/canonico') ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
          )}
        >
          <Library className="h-4 w-4" />
        </Link>
        <Link
          href="/canonico/grafo"
          aria-label="Grafo global"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            pathname === '/canonico/grafo' ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
          )}
        >
          <Network className="h-4 w-4" />
        </Link>
        <Link
          href="/comunidades"
          aria-label="Comunidades"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
            pathname.startsWith('/comunidades') ? 'bg-sidebar-accent text-primary' : 'hover:bg-sidebar-accent',
          )}
        >
          <GraduationCap className="h-4 w-4" />
        </Link>
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
        <section className="mb-4">
          <h3 className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            📚 Canónico MI-12
          </h3>
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
            <li>
              <ul className="ml-2 space-y-0.5 border-l border-sidebar-border pl-2">
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
                      <span className="truncate">{p.title.replace(/^M\d+\s*[—-]\s*/i, '').slice(0, 36)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            🏛️ Comunidades
          </h3>
          <ul className="space-y-0.5">
            <li>
              <Link
                href="/comunidades"
                className={cn(
                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium hover:bg-sidebar-accent',
                  pathname === '/comunidades' && 'bg-sidebar-accent text-sidebar-primary',
                )}
              >
                Hub
              </Link>
            </li>
            {tree.map((root) => (
              <TreeItem key={root.slug} node={root} currentPath={pathname} />
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-sidebar-border px-3 py-2 text-[10px] text-muted-foreground">
        v3.2 · CC BY-SA 4.0
      </div>
    </nav>
  );
}
