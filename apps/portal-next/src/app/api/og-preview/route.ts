/**
 * /api/og-preview · v7.7 — Open Graph image fetcher self-hosted
 *
 * Recibe `?url=...` y retorna JSON con la imagen og:image extraída.
 * Cache: 24h en CDN edge (Vercel) + stale-while-revalidate 7 días.
 *
 * Para fuentes anti-bot (Instagram, X, TikTok) que bloquean unfurl,
 * se recomienda capturar la imagen al momento de ingestar la noticia
 * en el vault y persistirla en el frontmatter `image:` (ver DT-NOTICIAS-IMG-01).
 */

import { unfurl } from 'unfurl.js';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs'; // unfurl requiere Node APIs (no Edge)
export const dynamic = 'force-dynamic';

type OgPreview = {
  image: string | null;
  title: string | null;
  description: string | null;
  source: string | null;  // hostname
};

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return Response.json({ error: 'Missing url param' }, { status: 400 });
  }

  // Validación básica de URL
  let parsed: URL;
  try {
    parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('protocol');
  } catch {
    return Response.json({ error: 'Invalid url' }, { status: 400 });
  }

  try {
    const data = await unfurl(url, { timeout: 5000, follow: 3 });
    const og = data.open_graph;
    const tw = data.twitter_card;

    const image: string | null =
      og?.images?.[0]?.url
      ?? tw?.images?.[0]?.url
      ?? null;

    const result: OgPreview = {
      image,
      title: og?.title ?? data.title ?? null,
      description: og?.description ?? data.description ?? null,
      source: parsed.hostname,
    };

    return Response.json(result, { headers: CACHE_HEADERS });
  } catch (err) {
    // Anti-bot blocks (Instagram, X, TikTok) caen aquí. Cache short para no
    // hammer la fuente con retries pero permitir refresh diario.
    return Response.json(
      {
        image: null,
        title: null,
        description: null,
        source: parsed.hostname,
        error: err instanceof Error ? err.message : 'unfurl-failed',
      } satisfies OgPreview & { error: string },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  }
}
