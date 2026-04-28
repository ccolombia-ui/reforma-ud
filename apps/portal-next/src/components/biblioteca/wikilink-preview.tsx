'use client';

import Link from 'next/link';
import { Suspense, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ExternalLink, BookMarked, FileText, AlertTriangle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { canonicPaper, community, concepto, note } from '#site/content';
import { MDXWithHoverPreview } from '@/components/mdx-with-hover-preview';
import { useDocTabs } from '@/lib/doc-tabs';
import { usePanesState } from '@/lib/panes-state';
import { useSplitMode } from '@/lib/ui-state';
import { cn } from '@/lib/utils';

/** G18 — limita la profundidad de hover-cards anidados (max 1 nivel). */
const HoverDepthCtx = createContext<number>(0);

type ResolvedDoc =
  | { kind: 'paper'; id: string; title: string; description: string; href: string; body: string; number: number }
  | { kind: 'note';  slug: string; title: string; description?: string; href: string; body: string }
  | { kind: 'concepto'; slug: string; title: string; definition?: string; href: string; body: string }
  | { kind: 'community'; slug: string; name: string; description: string; href: string }
  | { kind: 'broken'; href: string };

/**
 * Resuelve un href interno a su doc destino consultando las colecciones Velite.
 * Soporta: /canonico/m05, /canonico/m05#anchor, /comunidades/.../slug
 */
function resolveHref(href: string): ResolvedDoc {
  if (!href || href === '#') return { kind: 'broken', href };
  const cleanHref = href.split('#')[0];

  if (cleanHref.startsWith('/canonico/')) {
    const id = cleanHref.replace('/canonico/', '').replace(/\/$/, '');
    const paper = canonicPaper.find((p) => p.id === id);
    if (paper) {
      return {
        kind: 'paper',
        id: paper.id,
        title: paper.title,
        description: paper.description,
        href: paper.href,
        body: paper.body,
        number: paper.number,
      };
    }
  }

  if (cleanHref.startsWith('/glosario/')) {
    const slug = cleanHref.replace('/glosario/', '').replace(/\/$/, '');
    const doc = concepto.find((c) => c.slug === slug);
    if (doc) {
      return {
        kind: 'concepto',
        slug: doc.slug,
        title: doc.kd_title ?? doc.skos_prefLabel ?? doc.slug,
        definition: doc.skos_definition,
        href: `/glosario/${doc.slug}/`,
        body: doc.body,
      };
    }
  }

  if (cleanHref.startsWith('/comunidades/')) {
    // Try note first, then community
    const slug = cleanHref.replace(/^\//, '').replace(/\/$/, '');
    const noteDoc = note.find((n) => n.slug === slug);
    if (noteDoc) {
      return {
        kind: 'note',
        slug: noteDoc.slug,
        title: noteDoc.title,
        href: noteDoc.href,
        body: noteDoc.body,
      };
    }
    const cop = community.find((c) => c.slug === slug);
    if (cop) {
      return {
        kind: 'community',
        slug: cop.slug,
        name: cop.shortName ?? cop.name,
        description: cop.description ?? '',
        href: `/${cop.slug}`,
      };
    }
  }

  return { kind: 'broken', href };
}

export function WikiLinkPreview(props: Readonly<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<FallbackLink {...props} />}>
      <WikiLinkPreviewInner {...props} />
    </Suspense>
  );
}

function FallbackLink({ href, className, children }: Readonly<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <Link href={href} className={cn('wikilink', className)}>
      {children}
    </Link>
  );
}

function WikiLinkPreviewInner({
  href,
  className,
  children,
}: Readonly<{
  href: string;
  className?: string;
  children: React.ReactNode;
}>) {
  const [opened, setOpened] = useState(false);
  const resolved = useMemo(() => resolveHref(href), [href]);
  const { replaceActive, openInNewTab, openInBackground } = useDocTabs();
  const panesState = usePanesState();
  const { splitMode } = useSplitMode();
  const hoverDepth = useContext(HoverDepthCtx);
  // G18 — bloquea hover-card si ya estamos dentro de otra (máx 1 nivel)
  const allowHover = hoverDepth < 1;

  const triggerClassName = cn(
    'wikilink underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all',
    resolved.kind === 'broken' && 'wikilink-broken text-destructive/80 decoration-destructive/40',
    className,
  );

  /** Click handler con modificadores estilo Obsidian.
   *  v7.6 · respeta splitMode: si OFF → pane A (replaceActive). Si ON →
   *  último pane secundario usado (openInLastUsedPane). */
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (resolved.kind === 'broken') return;
    // Permitir ctrl+shift / meta+shift abrir en nueva ventana del navegador (default browser)
    if (e.shiftKey) return;
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      openInNewTab(href);
      return;
    }
    if (splitMode) {
      // En modo split: abre en el último pane secundario usado (pane B/C).
      let tabId: string | null = null;
      if (resolved.kind === 'paper') tabId = resolved.id;
      else if (resolved.kind === 'note') tabId = resolved.slug;
      else if (resolved.kind === 'concepto') tabId = resolved.slug;
      if (tabId) {
        panesState.openInLastUsedPane(tabId);
        return;
      }
    }
    // Default (split OFF o sin tabId resolvible): pane A
    replaceActive(href);
  }

  function handleAuxClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Mid-click → background tab
    if (e.button === 1 && resolved.kind !== 'broken') {
      e.preventDefault();
      openInBackground(href);
    }
  }

  if (!allowHover) {
    // En hover-card anidado: link plano sin preview (evita pirámide)
    return (
      <Link
        href={href}
        className={triggerClassName}
        onClick={handleClick}
        onAuxClick={handleAuxClick}
      >
        {children}
      </Link>
    );
  }

  // v4.3a — Esc cierra el hover card globalmente (paridad Obsidian)
  useEffect(() => {
    if (!opened) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpened(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [opened]);

  function handleContentKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpened(false);
    }
  }

  return (
    <HoverCard openDelay={300} closeDelay={250} open={opened} onOpenChange={setOpened}>
      <HoverCardTrigger asChild>
        <Link
          href={href}
          className={triggerClassName}
          onClick={handleClick}
          onAuxClick={handleAuxClick}
        >
          {children}
        </Link>
      </HoverCardTrigger>
      {opened && (
        <HoverCardContent
          side="top"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          avoidCollisions
          className="w-[440px] max-h-[420px] overflow-y-auto p-0 focus-visible:ring-2 focus-visible:ring-primary"
          onKeyDown={handleContentKeyDown}
          tabIndex={-1}
        >
          <HoverDepthCtx.Provider value={hoverDepth + 1}>
            <PreviewBody resolved={resolved} />
          </HoverDepthCtx.Provider>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

function PreviewBody({ resolved }: Readonly<{ resolved: ResolvedDoc }>) {
  if (resolved.kind === 'broken') {
    return (
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertTriangle className="h-3.5 w-3.5" />
          Enlace roto
        </div>
        <p className="text-xs text-muted-foreground">
          El destino <code className="text-[10px]">{resolved.href}</code> no existe en el corpus actual.
        </p>
      </div>
    );
  }

  if (resolved.kind === 'paper') {
    return (
      <article className="p-4 space-y-2.5">
        <header className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <BookMarked className="h-3 w-3" />
            <Badge variant="secondary" className="font-mono text-[9px]">
              M{String(resolved.number).padStart(2, '0')}
            </Badge>
            <span>Paper canónico</span>
          </div>
          <h3 className="text-sm font-semibold leading-tight">{resolved.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-3">{resolved.description}</p>
        </header>
        <div className="border-t pt-2">
          <div className="prose-paper prose-sm prose-hover-preview text-[11px] leading-relaxed line-clamp-[10] [&_h2]:text-xs [&_h2]:mt-2 [&_h3]:text-xs [&_p]:my-1 [&_pre]:hidden [&_table]:hidden [&_img]:hidden [&_.callout]:hidden">
            <MDXWithHoverPreview code={resolved.body} />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t">
          <span className="text-[10px] text-muted-foreground italic">Vista previa truncada</span>
          <Link
            href={resolved.href}
            className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            Abrir paper completo <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </article>
    );
  }

  if (resolved.kind === 'concepto') {
    return (
      <article className="p-4 space-y-2.5">
        <header className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <BookMarked className="h-3 w-3" />
            <Badge variant="secondary" className="font-mono text-[9px]">Glosario</Badge>
          </div>
          <h3 className="text-sm font-semibold leading-tight">{resolved.title}</h3>
          {resolved.definition && (
            <p className="text-xs text-muted-foreground line-clamp-3">{resolved.definition}</p>
          )}
        </header>
        {resolved.body && (
          <div className="border-t pt-2">
            <div className="prose-paper prose-sm prose-hover-preview text-[11px] leading-relaxed line-clamp-[8] [&_h2]:text-xs [&_h2]:mt-2 [&_h3]:text-xs [&_p]:my-1 [&_pre]:hidden [&_table]:hidden [&_img]:hidden [&_.callout]:hidden">
              <MDXWithHoverPreview code={resolved.body} />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-1 border-t">
          <span className="text-[10px] text-muted-foreground italic font-mono">{resolved.slug}</span>
          <Link
            href={resolved.href}
            className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            Ver concepto completo <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </article>
    );
  }

  if (resolved.kind === 'note') {
    return (
      <article className="p-4 space-y-2.5">
        <header className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span>Nota del vault</span>
          </div>
          <h3 className="text-sm font-semibold leading-tight">{resolved.title}</h3>
          {resolved.description && (
            <p className="text-xs text-muted-foreground line-clamp-3">{resolved.description}</p>
          )}
        </header>
        <div className="border-t pt-2">
          <div className="prose-paper prose-sm prose-hover-preview text-[11px] leading-relaxed line-clamp-[10] [&_h2]:text-xs [&_h2]:mt-2 [&_h3]:text-xs [&_p]:my-1 [&_pre]:hidden [&_table]:hidden [&_img]:hidden [&_.callout]:hidden">
            <MDXWithHoverPreview code={resolved.body} />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t">
          <span className="text-[10px] text-muted-foreground italic">Vista previa truncada</span>
          <Link
            href={resolved.href}
            className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            Abrir nota <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </article>
    );
  }

  // community
  return (
    <article className="p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <BookMarked className="h-3 w-3" />
        <span>Comunidad</span>
      </div>
      <h3 className="text-sm font-semibold leading-tight">{resolved.name}</h3>
      <p className="text-xs text-muted-foreground line-clamp-4">{resolved.description}</p>
      <div className="pt-1 border-t">
        <Link
          href={resolved.href}
          className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
        >
          Abrir comunidad <ExternalLink className="h-2.5 w-2.5" />
        </Link>
      </div>
    </article>
  );
}
