'use client';

import { Suspense, useEffect } from 'react';
import { X, BookMarked, FileText, Building2 } from 'lucide-react';
import { useDocTabs, useMounted, type DocTab } from '@/lib/doc-tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * DocTabsBar — barra horizontal de tabs estilo Obsidian.
 * Render bajo Suspense porque useSearchParams requiere boundary en Next 16.
 */
export function DocTabsBar() {
  return (
    <Suspense fallback={<TabsBarSkeleton />}>
      <DocTabsBarInner />
    </Suspense>
  );
}

function DocTabsBarInner() {
  const mounted = useMounted();
  const { tabs, activeTabId, activateTab, closeTab } = useDocTabs();

  // G08 keyboard shortcuts globales: Ctrl+Tab next, Ctrl+Shift+Tab prev, Ctrl+W close active
  useEffect(() => {
    if (!mounted || tabs.length < 2) return;
    function onKey(e: KeyboardEvent) {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        const idx = tabs.findIndex((t) => t.id === activeTabId);
        if (idx < 0) return;
        const next = e.shiftKey
          ? (idx - 1 + tabs.length) % tabs.length
          : (idx + 1) % tabs.length;
        activateTab(tabs[next].id);
      } else if (e.key === 'w' || e.key === 'W') {
        if (activeTabId) {
          e.preventDefault();
          closeTab(activeTabId);
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, tabs, activeTabId, activateTab, closeTab]);

  if (!mounted || tabs.length === 0) return null;
  if (tabs.length === 1) return null;

  return (
    <div className="no-print sticky top-14 z-20 -mx-4 md:-mx-8 mb-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-0.5 overflow-x-auto px-4 md:px-8 py-1.5">
        {tabs.map((tab) => (
          <TabPill
            key={tab.id}
            tab={tab}
            active={tab.id === activeTabId}
            onActivate={() => activateTab(tab.id)}
            onClose={() => closeTab(tab.id)}
          />
        ))}
        <span className="ml-auto pl-2 hidden md:inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <kbd className="rounded border px-1 py-0.5 font-mono text-[9px]">Ctrl+Tab</kbd>
          <span>cambiar</span>
          <kbd className="rounded border px-1 py-0.5 font-mono text-[9px] ml-1">Ctrl+W</kbd>
          <span>cerrar</span>
        </span>
      </div>
    </div>
  );
}

function tabIcon(kind: DocTab['kind']): typeof BookMarked {
  if (kind === 'paper') return BookMarked;
  if (kind === 'community') return Building2;
  return FileText;
}

function TabPill({
  tab,
  active,
  onActivate,
  onClose,
}: Readonly<{
  tab: DocTab;
  active: boolean;
  onActivate: () => void;
  onClose: () => void;
}>) {
  const Icon = tabIcon(tab.kind);

  return (
    <span
      onAuxClick={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          onClose();
        }
      }}
      className={cn(
        'group relative inline-flex shrink-0 items-stretch rounded-md border text-xs transition-all',
        active
          ? 'bg-accent border-primary/30 text-foreground shadow-sm'
          : 'border-transparent text-muted-foreground hover:bg-accent/40 hover:text-foreground',
      )}
    >
      <button
        type="button"
        onClick={onActivate}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 cursor-pointer"
        title={tab.title}
      >
        <Icon className={cn('h-3 w-3 shrink-0', active && 'text-primary')} />
        {tab.kind === 'paper' && tab.number !== undefined && (
          <Badge variant="secondary" className="font-mono text-[9px] h-4 px-1">
            M{String(tab.number).padStart(2, '0')}
          </Badge>
        )}
        <span className="max-w-[200px] truncate font-medium">{tab.title}</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={`Cerrar pestaña ${tab.title}`}
        className={cn(
          'inline-flex h-full w-5 items-center justify-center rounded-r-md transition-opacity',
          active ? 'opacity-100 hover:bg-destructive/20' : 'opacity-0 group-hover:opacity-100 hover:bg-accent',
        )}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function TabsBarSkeleton() {
  return (
    <div className="no-print h-10 border-b bg-background/95 -mx-4 md:-mx-8 mb-4">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-1.5 flex gap-1">
        <div className="h-6 w-32 rounded-md bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}
