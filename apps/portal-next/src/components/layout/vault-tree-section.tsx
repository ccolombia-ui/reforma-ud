/**
 * VaultTreeSection — v8g-l5
 *
 * Renderiza un árbol de carpetas tipo Obsidian File Explorer
 * a partir de un índice Zoottelkeeper (_Index_of_*.md).
 */

'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ChevronDown, Folder, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { zoottelkeeperIndex } from '#site/content';
import type { VaultTreeNode } from '@/lib/layout/zoottelkeeper-parser';
import { parseZoottelkeeperIndex } from '@/lib/layout/zoottelkeeper-parser';
import type { SidebarSection } from '@/lib/layout/types';

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
  const [open, setOpen] = useState(depth === 0);

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

export function VaultTreeSection({
  section,
  pathname,
}: Readonly<{
  section: SidebarSection;
  pathname: string;
}>) {
  const { vaultConfig } = section;

  // v8g-l5 · Los índices Zoottelkeeper se cargan desde Velite (#site/content).
  // Si no hay índice real, se usa demoContent como fallback.
  const treeNodes = useMemo<VaultTreeNode[]>(() => {
    if (!vaultConfig) return [];

    // Buscar el índice correspondiente en el rootPath configurado
    const root = vaultConfig.rootPath ?? 'vault-index';
    const indexEntry = zoottelkeeperIndex.find((entry) =>
      entry.slug.startsWith(root),
    );

    const raw = indexEntry?.raw ?? `%% Zoottelkeeper: Beginning %%
[[canonico/m01|M01 — Mandato Normativo]]
[[canonico/m02|M02 — Ciclo Virtuoso]]
[[canonico/m03|M03 — Estándares Internacionales]]
[[canonico/m04|M04 — JTBD Comunidad]]
[[canonico/m05|M05 — BMK Procesos Misionales]]
[[canonico/m06|M06 — BMK Créditos CCA]]
[[canonico/m07|M07 — 21 BPA]]
[[glosario/con-cca|con-cca]]
%% Zoottelkeeper: End %%`;

    return parseZoottelkeeperIndex(raw, {
      rootPath: vaultConfig.rootPath,
      excludePatterns: vaultConfig.excludePatterns ?? [],
      folderMappings: vaultConfig.folderMappings ?? {},
    });
  }, [vaultConfig]);

  if (!vaultConfig || treeNodes.length === 0) {
    return (
      <div className="px-2 py-1 text-[10px] text-muted-foreground italic">
        Sin contenido indexado
      </div>
    );
  }

  return (
    <ul className="space-y-0.5">
      {treeNodes.map((node) => (
        <VaultTreeItem key={node.id} node={node} currentPath={pathname} depth={0} />
      ))}
    </ul>
  );
}
