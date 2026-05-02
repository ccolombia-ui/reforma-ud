/**
 * VaultTreeSection — v8g-l5.2
 *
 * Renderiza un árbol de carpetas tipo Obsidian File Explorer.
 * Modo "obsidian": fetch de /vault-tree.json (vault real escaneado).
 * Modo "static":  usa vaultTreeRoot desde build-vault-index.mjs.
 */

'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Folder, FileText, Loader2 } from 'lucide-react';
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
}: {
  node: VaultTreeNode;
  currentPath: string;
  depth?: number;
}) {
  const isFolder = node.type === 'folder';
  const isActive = node.href === currentPath;
  const hasChildren = isFolder && node.children.length > 0;
  const [open, setOpen] = useState(depth < 2);

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
          aria-expanded={open}
        >
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-2.5 w-2.5 shrink-0 transition-transform',
                !open && '-rotate-90',
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
        {open && hasChildren && (
          <ul className="ml-3 border-l border-sidebar-border/50 pl-2">
            {node.children.map((child) => (
              <VaultTreeItem
                key={child.id}
                node={child}
                currentPath={currentPath}
                depth={depth + 1}
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

interface VaultTreeSectionProps {
  section: SidebarSection;
  pathname: string;
}

export function VaultTreeSection({ section, pathname }: VaultTreeSectionProps) {
  const { vaultConfig } = section;
  const mode = (vaultConfig as Record<string, unknown> | undefined)?.mode ?? 'static';

  const [obsidianTree, setObsidianTree] = useState<VaultTreeNode[] | null>(null);
  const [loading, setLoading] = useState(mode === 'obsidian');

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

  const tree: VaultTreeNode[] =
    mode === 'obsidian' ? (obsidianTree ?? []) : vaultTreeRoot;

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-muted-foreground italic">
        <Loader2 className="h-3 w-3 animate-spin" />
        Cargando vault...
      </div>
    );
  }

  if (tree.length === 0) {
    return (
      <div className="px-2 py-1 text-[10px] text-muted-foreground italic">
        Sin contenido indexado
      </div>
    );
  }

  return (
    <ul className="space-y-0.5">
      {tree.map((node) => (
        <VaultTreeItem
          key={node.id}
          node={node}
          currentPath={pathname}
          depth={0}
        />
      ))}
    </ul>
  );
}
