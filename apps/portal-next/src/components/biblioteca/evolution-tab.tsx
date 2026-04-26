'use client';

import { GitCommit, ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { ActiveDoc } from '@/lib/active-doc';

/**
 * EvolutionTab — versiones git del documento activo.
 *
 * v4.5b MVP: lista de commits MOCK con CTA a GitHub. v4.5c reemplaza el mock
 * por server action `getCommitsForPath(path)` con Octokit + unstable_cache
 * (revalidate 3600s) y GITHUB_TOKEN en env de Vercel.
 *
 * Decisión D2.4 del audit AUDIT-v4.5-obsidian-paridad-final.md:
 * MVP solo lista (sha · autor · mensaje · fecha relativa); diff inline en v5.0.
 */

const MOCK_COMMITS: Array<{
  sha: string;
  author: string;
  authorAvatar: string;
  message: string;
  daysAgo: number;
}> = [
  { sha: '02a5606', author: 'ccolombia-ui', authorAvatar: '👤', message: 'feat(v4.4): split-comparativo central + sidebar sticky + drag handles visibles', daysAgo: 2 },
  { sha: '4a44bdb', author: 'ccolombia-ui', authorAvatar: '👤', message: 'feat(v4.3): comunidad participativa + transclusiones inline', daysAgo: 4 },
  { sha: 'd4a163f', author: 'claude-opus', authorAvatar: '🤖', message: 'feat(v4.5a): shell rebalance · D1 + D3 + D4 del audit paridad-final', daysAgo: 0 },
];

function pathForDoc(doc: ActiveDoc): string {
  if (doc.kind === 'paper') return `apps/portal-next/content/canonico/${doc.id}.mdx`;
  return `apps/portal-next/content/${doc.id}.mdx`;
}

function repoCommitUrl(sha: string): string {
  return `https://github.com/ccolombia-ui/reforma-ud/commit/${sha}`;
}

function repoHistoryUrl(path: string): string {
  return `https://github.com/ccolombia-ui/reforma-ud/commits/main/${path}`;
}

export function EvolutionTab({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  if (!doc) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
        <GitCommit className="h-6 w-6 opacity-40" />
        <p className="font-medium text-foreground">Sin documento activo</p>
        <p className="text-[10px]">Abre un paper o nota para ver su evolución.</p>
      </div>
    );
  }

  const path = pathForDoc(doc);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          <GitCommit className="h-3 w-3" />
          Evolución
          <Badge variant="outline" className="ml-auto text-[9px] gap-0.5">
            <Lock className="h-2 w-2" /> mock
          </Badge>
        </div>
        <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground" title={path}>
          {path}
        </p>
      </div>

      <ul className="flex-1 overflow-y-auto p-2 text-xs space-y-1">
        {MOCK_COMMITS.map((c) => (
          <li key={c.sha}>
            <a
              href={repoCommitUrl(c.sha)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border-l-2 border-primary/30 bg-card px-2 py-1.5 hover:border-primary hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>{c.authorAvatar}</span>
                <span className="font-medium">{c.author}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {c.daysAgo === 0 ? 'hoy' : c.daysAgo === 1 ? 'ayer' : `hace ${c.daysAgo} días`}
                </span>
                <span className="ml-auto font-mono text-muted-foreground">{c.sha}</span>
              </div>
              <p className="mt-0.5 line-clamp-2 leading-snug">{c.message}</p>
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-sidebar-border p-2">
        <Link
          href={repoHistoryUrl(path)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-md border bg-muted/30 px-2 py-1.5 text-[10px] hover:bg-accent/40 transition-colors"
        >
          Ver histórico completo en GitHub
          <ExternalLink className="h-3 w-3" />
        </Link>
        <p className="mt-1.5 text-center text-[9px] text-muted-foreground italic">
          v4.5c · commits reales vía Octokit + cache 1h
        </p>
      </div>
    </div>
  );
}
