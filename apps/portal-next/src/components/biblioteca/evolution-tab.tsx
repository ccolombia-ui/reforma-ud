'use client';

import { GitCommit, ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { ActiveDoc } from '@/lib/active-doc';

/**
 * EvolutionTab — versiones git del DOCUMENTO ACTIVO (no del proyecto/app).
 *
 * v5.0g · Mock contextual al doc: en lugar de mostrar commits genéricos del
 * monorepo, los mock commits hablan del CONTENIDO del .mdx (secciones
 * añadidas, citas APA actualizadas, glosario completado). Cuando se conecte
 * Octokit en v6.0, el filtro será `git log --follow {pathForDoc(doc)}` para
 * mostrar solo cambios sobre ese archivo.
 *
 * Decisión D2.4 del audit AUDIT-v4.5-obsidian-paridad-final.md:
 * MVP solo lista (sha · autor · mensaje · fecha relativa); diff inline en v6.0.
 */

type MockCommit = {
  sha: string;
  author: string;
  authorAvatar: string;
  message: string;
  daysAgo: number;
};

// v5.0g · Mock genérico de evolución del CONTENIDO. Cuando Octokit conecte,
// se reemplaza por commits reales filtrados por path del .mdx activo.
function mockCommitsForDoc(docTitle: string): MockCommit[] {
  // Hash determinístico simple para que el mismo doc tenga los mismos shas
  let h = 0;
  for (const c of docTitle) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  const sha = (i: number) => Math.abs((h ^ (i * 0x9e3779b1)) >>> 0).toString(16).slice(0, 7);
  return [
    { sha: sha(1), author: 'ccolombia-ui', authorAvatar: '👤', message: `Versión inicial publicada · ${docTitle}`, daysAgo: 14 },
    { sha: sha(2), author: 'ccolombia-ui', authorAvatar: '👤', message: 'Glosario auto-derivado de wikilinks ([[glo-*]])', daysAgo: 7 },
    { sha: sha(3), author: 'ccolombia-ui', authorAvatar: '👤', message: 'Citas APA migradas a átomos content/biblio/<key>.md', daysAgo: 3 },
    { sha: sha(4), author: 'ccolombia-ui', authorAvatar: '👤', message: 'Pre-saberes refinados + frontmatter relations completado', daysAgo: 1 },
  ];
}

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
  const commits = mockCommitsForDoc(doc.title);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sidebar-border px-3 py-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          <GitCommit className="h-3 w-3" />
          Evolución del documento
          <Badge variant="outline" className="ml-auto text-[9px] gap-0.5">
            <Lock className="h-2 w-2" /> mock
          </Badge>
        </div>
        <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground" title={path}>
          {path}
        </p>
      </div>

      <ul className="flex-1 overflow-y-auto p-2 text-xs space-y-1">
        {commits.map((c) => (
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
          v6.0 · commits reales del .mdx vía Octokit + cache 1h
        </p>
      </div>
    </div>
  );
}
