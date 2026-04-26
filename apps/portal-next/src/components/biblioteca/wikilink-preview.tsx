'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ExternalLink, BookMarked, FileText, AlertTriangle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { canonicPaper, community, note } from '#site/content';
import { MDXContent } from '@/components/mdx-content';
import { cn } from '@/lib/utils';

type ResolvedDoc =
  | { kind: 'paper'; id: string; title: string; description: string; href: string; body: string; number: number }
  | { kind: 'note';  slug: string; title: string; description?: string; href: string; body: string }
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

export function WikiLinkPreview({
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

  const triggerClassName = cn(
    'wikilink underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all',
    resolved.kind === 'broken' && 'wikilink-broken text-destructive/80 decoration-destructive/40',
    className,
  );

  return (
    <HoverCard openDelay={300} closeDelay={120} onOpenChange={setOpened}>
      <HoverCardTrigger asChild>
        <Link href={href} className={triggerClassName}>
          {children}
        </Link>
      </HoverCardTrigger>
      {opened && (
        <HoverCardContent
          side="top"
          align="start"
          sideOffset={6}
          className="w-[440px] max-h-[420px] overflow-y-auto p-0"
        >
          <PreviewBody resolved={resolved} />
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
            <MDXContent code={resolved.body} />
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
            <MDXContent code={resolved.body} />
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
