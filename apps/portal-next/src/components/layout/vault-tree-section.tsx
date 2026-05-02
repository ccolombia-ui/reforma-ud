/**
 * VaultTreeSection — v8g-l8
 *
 * Renderiza un árbol de carpetas tipo Obsidian File Explorer.
 * Modo "obsidian": fetch de /vault-tree.json (vault real escaneado).
 * Modo "static":  usa vaultTreeRoot desde build-vault-index.mjs.
 * Nuevo v8g-l8: search/filter en tiempo real.
 */

'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Folder, FileText, Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SidebarSection } from '@/lib/layout/types';
import { vaultTreeRoot } from '@/lib/layout/vault-index-raw';

export interface VaultTreeNode {
  type: 'folder' | 'file';
  id: string;
  name: string;
  slug: string;
  href?: string;
  children: VaultTreeNode[];
}

function VaultTreeItem({
  node,
  currentPath,
  depth = 0,
  expandDepth = 0,
  forceOpen = false,
}: {
  node: VaultTreeNode;
  currentPath: string;
  depth?: number;
  expandDepth?: number;
  forceOpen?: boolean;
}) {
  const isFolder = node.type === 'folder';
  const isActive = node.href === currentPath;
  const hasChildren = isFolder && node.children.length > 0;
  const [open, setOpen] = useState(depth < expandDepth);

  const isOpen = forceOpen || open;

  if (isFolder) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'group flex w-full items-center gap-1 rounded px-1.5 py-0.5 text-[11px] hover:bg-sidebar-accent',
            'text-muted-foreground',
          )}
          aria-expanded={isOpen}
        >
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-2.5 w-2.5 shrink-0 transition-transform',
                !isOpen && '-rotate-90',
              )}
            />
          )}
          {!hasChildren && <span className="w-2.5 shrink-0" />}
          <Folder className="h-3 w-3 shrink-0 text-primary/60" />
          <span className="truncate">{node.name}</span>
          {hasChildren && (
            <span className="ml-auto text-[9px] text-muted-foreground/50">
              {node.children.length}
            </span>
          )}
        </button>
        {(isOpen || forceOpen) && hasChildren && (
          <ul className="ml-3 border-l border-sidebar-border/50 pl-2">
            {node.children.map((child) => (
              <VaultTreeItem
                key={child.id}
                node={child}
                currentPath={currentPath}
                depth={depth + 1}
                expandDepth={expandDepth}
                forceOpen={forceOpen}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={node.href ?? '#'}
        className={cn(
          'flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] hover:bg-sidebar-accent',
          isActive && 'bg-sidebar-accent font-semibold text-sidebar-primary',
        )}
        title={node.name}
      >
        <span className="w-2.5 shrink-0" />
        <FileText className="h-3 w-3 shrink-0 text-muted-foreground/60" />
        <span className="truncate">{node.name}</span>
      </Link>
    </li>
  );
}

function filterNodes(nodes: VaultTreeNode[], query: string): VaultTreeNode[] {
  if (!query.trim()) return nodes;
  const lower = query.toLowerCase().trim();

  function search(node: VaultTreeNode): VaultTreeNode | null {
    const matched = node.name.toLowerCase().includes(lower);
    const children = node.children
      .map(search)
      .filter((c): c is VaultTreeNode => c !== null);
    if (matched || children.length > 0) {
      return { ...node, children };
    }
    return null;
  }

  return nodes.map(search).filter((n): n is VaultTreeNode => n !== null);
}

interface VaultTreeSectionProps {
  section: SidebarSection;
  pathname: string;
}

export function VaultTreeSection({ section, pathname }: VaultTreeSectionProps) {
  const { vaultConfig } = section;
  const mode = (vaultConfig as Record<string, unknown> | undefined)?.mode ?? 'static';
  const rootFilter = (vaultConfig as Record<string, unknown> | undefined)?.rootFilter as string[] | undefined;
  const expandDepth = ((vaultConfig as Record<string, unknown> | undefined)?.expandDepth as number | undefined) ?? 0;

  const [obsidianTree, setObsidianTree] = useState<VaultTreeNode[] | null>(null);
  const [loading, setLoading] = useState(mode === 'obsidian');
  const [query, setQuery] = useState('');

  const loadObsidianTree = useCallback(async () => {
    try {
      const res = await fetch('/api/vault-tree/');
      if (!res.ok) throw new Error('fetch failed');
      const data = (await res.json()) as VaultTreeNode[];
      setObsidianTree(data);
    } catch {
      setObsidianTree([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'obsidian') {
      queueMicrotask(() => loadObsidianTree());
    }
  }, [mode, loadObsidianTree]);

  const rawTree: VaultTreeNode[] =
    mode === 'obsidian' ? (obsidianTree ?? []) : vaultTreeRoot;

  const tree = useMemo(() => {
    const filtered = rawTree.filter((node) => {
      if (!rootFilter || rootFilter.length === 0) return true;
      return rootFilter.includes(node.name);
    });
    return filterNodes(filtered, query);
  }, [rawTree, rootFilter, query]);

  const isFiltering = query.trim().length > 0;

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-muted-foreground italic">
        <Loader2 className="h-3 w-3 animate-spin" />
        Cargando vault...
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="relative px-2">
        <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrar..."
          className={cn(
            'w-full rounded-md border bg-background py-1 pl-7 pr-6 text-[11px]',
            'placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'border-input',
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Limpiar filtro"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {tree.length === 0 ? (
        <div className="px-2 py-1 text-[10px] text-muted-foreground italic">
          Sin coincidencias
        </div>
      ) : (
        <ul className="space-y-0.5">
          {tree.map((node) => (
            <VaultTreeItem
              key={node.id}
              node={node}
              currentPath={pathname}
              depth={0}
              expandDepth={expandDepth}
              forceOpen={isFiltering}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
