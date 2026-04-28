'use client';

import { useEffect, useState } from 'react';
import { Newspaper, FlaskConical, Building, FileText, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * NewsThumbnail · v7.7 — preview imagen para tarjetas de noticias.
 *
 * Estrategia 3 niveles:
 *   [1] Si stored !== undefined → usa esa (frontmatter image: del .md vault)
 *   [2] Else → fetch a /api/og-preview?url=<url> con cache localStorage 24h
 *   [3] Si null → ícono fallback según source type
 *
 * Cache cliente: localStorage `og-preview:<url>` con TTL 24h. Reduce requests
 * cuando el usuario navega entre páginas (server-cache complementa via Vercel CDN).
 */

type Source = 'paper-academico' | 'informe-institucional' | 'medio-prensa' | 'web' | 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'facebook' | 'otro';

const FALLBACK_ICON: Record<string, { Icon: React.ElementType; color: string; bg: string }> = {
  'paper-academico':       { Icon: FlaskConical, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  'informe-institucional': { Icon: Building,     color: 'text-amber-500',  bg: 'bg-amber-500/10' },
  'medio-prensa':          { Icon: FileText,     color: 'text-blue-500',   bg: 'bg-blue-500/10' },
  'web':                   { Icon: FileText,     color: 'text-blue-500',   bg: 'bg-blue-500/10' },
  default:                 { Icon: Newspaper,    color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

const CACHE_TTL_MS = 86_400_000; // 24h

type CachedPreview = { image: string | null; ts: number };

function readCache(url: string): string | null | undefined {
  if (typeof localStorage === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(`og-preview:${url}`);
    if (!raw) return undefined;
    const { image, ts } = JSON.parse(raw) as CachedPreview;
    if (Date.now() - ts > CACHE_TTL_MS) return undefined;
    return image;
  } catch { return undefined; }
}

function writeCache(url: string, image: string | null) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(`og-preview:${url}`, JSON.stringify({ image, ts: Date.now() } satisfies CachedPreview));
  } catch { /* quota — ignore */ }
}

export function NewsThumbnail({
  url,
  source,
  stored,
  className,
  alt = '',
}: Readonly<{
  url: string;
  source?: string;
  /** Override desde frontmatter `image:` del .md vault. Si presente, salta fetch. */
  stored?: string;
  className?: string;
  alt?: string;
}>) {
  const [image, setImage] = useState<string | null | undefined>(stored ?? undefined);
  const [loading, setLoading] = useState(!stored);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    // [1] frontmatter override → no fetch
    if (stored) { setImage(stored); setLoading(false); return; }

    // [2] cache hit
    const cached = readCache(url);
    if (cached !== undefined) { setImage(cached); setLoading(false); return; }

    // [3] fetch
    let cancelled = false;
    setLoading(true);
    fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: { image: string | null } | null) => {
        if (cancelled) return;
        const img = data?.image ?? null;
        setImage(img);
        writeCache(url, img);
      })
      .catch(() => { if (!cancelled) setImage(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url, stored]);

  const fallback = FALLBACK_ICON[source ?? 'default'] ?? FALLBACK_ICON.default;
  const { Icon, color, bg } = fallback;

  if (loading) {
    return (
      <div className={cn('relative overflow-hidden rounded-md bg-muted/40 animate-pulse', className)}>
        <div className="h-full w-full" />
      </div>
    );
  }

  if (image && !errored) {
    return (
      <div className={cn('relative overflow-hidden rounded-md', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Fallback: ícono por tipo de fuente
  return (
    <div className={cn('flex items-center justify-center rounded-md', bg, className)}>
      {errored
        ? <ImageOff className={cn('h-6 w-6', color, 'opacity-50')} aria-label="Imagen no disponible" />
        : <Icon className={cn('h-6 w-6', color)} aria-hidden />}
    </div>
  );
}
