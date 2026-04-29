'use client';

import { GitCommit, ExternalLink, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { ActiveDoc } from '@/lib/active-doc';

/**
 * EvolutionTab · v7.13 — Evolución del documento activo.
 *
 * §1 · Commits reales del archivo vía GitHub API (caché 5min en sessionStorage).
 *      Fallback: mock contextual al doc si la API no responde o el repo es privado.
 *
 * §2 · Botón "Sincronizar desde GDrive" — solo visible en localhost (dev).
 *      Llama POST /api/sync/doc → node scripts/sync-glosario.mjs --file {docId}.
 *      En producción muestra instrucción textual.
 *
 * Anteriores: mock commits con hash determinístico (v5.0g).
 * TDD aditivo: sin eliminar pathForDoc ni repoCommitUrl (usados en smoke tests futuros).
 */

const GITHUB_REPO = 'ccolombia-ui/reforma-ud';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

type RealCommit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
};

type SyncResult = {
  success: boolean;
  mode?: 'local' | 'github-actions';
  report: string[];
  stats?: { new: number; updated: number; unchanged: number; ignored: number };
  error?: string;
  message?: string;
  actionsUrl?: string;
};

export function pathForDoc(doc: ActiveDoc): string {
  if (doc.kind === 'paper') return `apps/portal-next/content/canonico/${doc.id}.mdx`;
  if (doc.kind === 'concepto') return `apps/portal-next/content/glosario/${doc.id}.md`;
  if (doc.kind === 'note') return `apps/portal-next/content/notas/${doc.id}.md`;
  return `apps/portal-next/content/${doc.id}.mdx`;
}

export function repoCommitUrl(sha: string): string {
  return `https://github.com/${GITHUB_REPO}/commit/${sha}`;
}

function repoHistoryUrl(filePath: string): string {
  return `https://github.com/${GITHUB_REPO}/commits/main/${filePath}`;
}

async function fetchCommits(filePath: string): Promise<RealCommit[]> {
  const cacheKey = `reforma-ud:commits:${filePath}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL_MS) return data;
    }
  } catch { /* no sessionStorage (SSR) */ }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/commits?path=${encodeURIComponent(filePath)}&per_page=10`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github.v3+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  const raw = await res.json() as Array<Record<string, unknown>>;
  const commits: RealCommit[] = raw.map((c) => {
    const commit = c.commit as Record<string, unknown>;
    const commitAuthor = commit?.author as Record<string, unknown>;
    return {
      sha: (c.sha as string).slice(0, 7),
      message: (commit?.message as string ?? '').split('\n')[0],
      author: (commitAuthor?.name as string) ?? 'unknown',
      date: (commitAuthor?.date as string) ?? '',
      url: (c.html_url as string) ?? repoCommitUrl(c.sha as string),
    };
  });

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: commits }));
  } catch { /* quota exceeded */ }

  return commits;
}

function relativeDate(iso: string): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days < 30) return `hace ${days} días`;
  if (days < 365) return `hace ${Math.floor(days / 30)} meses`;
  return `hace ${Math.floor(days / 365)} años`;
}

export function EvolutionTab({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const [commits, setCommits] = useState<RealCommit[] | null>(null);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [commitsError, setCommitsError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [isDev, setIsDev] = useState(false);

  // Detect localhost (only in client)
  useEffect(() => {
    setIsDev(
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
    );
  }, []);

  // Load real commits whenever active doc changes
  useEffect(() => {
    if (!doc) { setCommits(null); setCommitsError(null); return; }
    setLoadingCommits(true);
    setCommitsError(null);
    fetchCommits(pathForDoc(doc))
      .then((c) => { setCommits(c); setLoadingCommits(false); })
      .catch((e) => { setCommitsError(e.message); setLoadingCommits(false); });
  }, [doc?.id]);

  // Reset sync result when doc changes
  useEffect(() => { setSyncResult(null); }, [doc?.id]);

  if (!doc) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
        <GitCommit className="h-6 w-6 opacity-40" />
        <p className="font-medium text-foreground">Sin documento activo</p>
        <p className="text-[10px]">Abre un paper o nota para ver su evolución.</p>
      </div>
    );
  }

  const filePath = pathForDoc(doc);
  const isConcepto = doc.kind === 'concepto';

  async function handleSync() {
    if (!doc) return;
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/sync/doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId: doc.id, filter: 'all' }),
      });
      const data = await res.json() as SyncResult;
      setSyncResult(data);
      if (data.success) {
        // Invalidar caché de commits para que se recarguen
        try { sessionStorage.removeItem(`reforma-ud:commits:${filePath}`); } catch { /* ok */ }
        setLoadingCommits(true);
        fetchCommits(filePath)
          .then((c) => { setCommits(c); setLoadingCommits(false); })
          .catch(() => setLoadingCommits(false));
      }
    } catch (e) {
      setSyncResult({ success: false, report: [], error: e instanceof Error ? e.message : 'Error' });
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          <GitCommit className="h-3 w-3" />
          Evolución del documento
          {!loadingCommits && commits !== null && commits.length === 0 && (
            <Badge variant="outline" className="ml-auto text-[9px]">sin commits</Badge>
          )}
          {commits !== null && commits.length > 0 && (
            <Badge variant="secondary" className="ml-auto text-[9px]">{commits.length} commits</Badge>
          )}
        </div>
        <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground" title={filePath}>
          {filePath}
        </p>
      </div>

      {/* Commits list */}
      <div className="flex-1 overflow-y-auto">
        {loadingCommits && (
          <div className="flex items-center justify-center gap-2 py-8 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Cargando commits…
          </div>
        )}
        {commitsError && !loadingCommits && (
          <div className="px-3 py-3 text-[10px] text-muted-foreground">
            <p className="text-amber-600 dark:text-amber-400 mb-1">⚠ GitHub API: {commitsError}</p>
            <p>El repositorio puede ser privado. Commits visibles solo con token.</p>
          </div>
        )}
        {!loadingCommits && commits !== null && commits.length === 0 && !commitsError && (
          <div className="px-3 py-4 text-center text-[10px] text-muted-foreground">
            No hay commits para este archivo aún.
          </div>
        )}
        {commits && commits.length > 0 && (
          <ul className="p-2 text-xs space-y-1">
            {commits.map((c) => (
              <li key={c.sha}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border-l-2 border-primary/30 bg-card px-2 py-1.5 hover:border-primary hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-medium">{c.author}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{relativeDate(c.date)}</span>
                    <span className="ml-auto font-mono text-muted-foreground">{c.sha}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 leading-snug">{c.message}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sync panel — solo para conceptos del glosario */}
      {isConcepto && (
        <div className="border-t border-sidebar-border p-2 space-y-2">
          {/* Botón: en dev corre script local; en prod dispara GitHub Actions */}
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-1.5 h-7 text-[11px]"
            onClick={handleSync}
            disabled={syncing}
            title={isDev
              ? 'Copia desde GDrive montada localmente (G:)'
              : 'Dispara GitHub Actions → rclone GDrive → commit → Vercel (~2 min)'}
          >
            {syncing
              ? <Loader2 className="h-3 w-3 animate-spin" />
              : <RefreshCw className="h-3 w-3" />}
            {syncing
              ? 'Sincronizando…'
              : isDev ? 'Sincronizar (local)' : 'Sincronizar desde GDrive'}
          </Button>

          {syncResult && (
            <div className={cn(
              'rounded-md border p-2 text-[10px] space-y-1',
              syncResult.success
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-destructive/30 bg-destructive/5',
            )}>
              <div className="flex items-center gap-1 font-medium">
                {syncResult.success
                  ? <CheckCircle2 className="h-3 w-3 text-green-600" />
                  : <AlertCircle className="h-3 w-3 text-destructive" />}
                {syncResult.success
                  ? syncResult.mode === 'github-actions' ? 'Workflow disparado' : 'Sync completado'
                  : 'Error en sync'}
              </div>
              {/* Modo prod: link al Actions run */}
              {syncResult.mode === 'github-actions' && syncResult.actionsUrl && (
                <a
                  href={syncResult.actionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary underline underline-offset-2"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                  Ver progreso en GitHub Actions
                </a>
              )}
              {syncResult.message && (
                <p className="text-muted-foreground">{syncResult.message}</p>
              )}
              {/* Modo dev: stats */}
              {syncResult.stats && (
                <div className="flex gap-2 text-muted-foreground">
                  {syncResult.stats.new > 0 && <span className="text-green-600">+{syncResult.stats.new} nuevo</span>}
                  {syncResult.stats.updated > 0 && <span className="text-blue-600">↑{syncResult.stats.updated} actualizado</span>}
                  {syncResult.stats.unchanged > 0 && <span>={syncResult.stats.unchanged} sin cambios</span>}
                </div>
              )}
              {syncResult.error && <p className="text-destructive">{syncResult.error}</p>}
              {syncResult.stats?.updated === 0 && syncResult.stats?.new === 0 && syncResult.success && (
                <p className="text-muted-foreground italic">Portal ya está al día con el vault.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer: link to full history */}
      <div className={cn('border-t border-sidebar-border p-2', isConcepto && 'pt-0 border-t-0')}>
        <Link
          href={repoHistoryUrl(filePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-md border bg-muted/30 px-2 py-1.5 text-[10px] hover:bg-accent/40 transition-colors"
        >
          Ver histórico completo en GitHub
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
