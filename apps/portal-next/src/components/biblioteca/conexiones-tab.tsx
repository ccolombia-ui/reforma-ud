'use client';

import { ListTree, Network, GitCommit } from 'lucide-react';
import { useConexionesSubTab } from '@/lib/ui-state';
import { EsquemaTab } from '@/components/biblioteca/esquema-tab';
import { PaperLocalGraph } from '@/components/graph/paper-local-graph';
import { EvolutionTab } from '@/components/biblioteca/evolution-tab';
import type { ActiveDoc } from '@/lib/active-doc';
import { cn } from '@/lib/utils';

/**
 * ConexionesTab — navegación semántica del documento activo.
 * Sub-tabs:
 *   • Esquema   ← TOC + scroll-spy (OutlinePanel reusado)
 *   • Grafo     ← grafo local 1-hop (PaperLocalGraph reusado)
 *   • Evolución ← versiones git del .md (mock v4.5b → Octokit v4.5c)
 *
 * Decisión D2 del audit AUDIT-v4.5-obsidian-paridad-final.md.
 */
export function ConexionesTab({ doc }: Readonly<{ doc: ActiveDoc | null }>) {
  const [sub, setSub] = useConexionesSubTab();

  return (
    <div className="flex h-full flex-col">
      {/* Sub-tab strip · v4.5b */}
      <div className="grid grid-cols-3 border-b border-sidebar-border">
        <SubTabBtn
          active={sub === 'esquema'}
          onClick={() => setSub('esquema')}
          Icon={ListTree}
          label="Esquema"
        />
        <SubTabBtn
          active={sub === 'grafo'}
          onClick={() => setSub('grafo')}
          Icon={Network}
          label="Grafo"
          disabled={!doc || doc.kind !== 'paper'}
        />
        <SubTabBtn
          active={sub === 'evolucion'}
          onClick={() => setSub('evolucion')}
          Icon={GitCommit}
          label="Evolución"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {sub === 'esquema' && <EsquemaTab doc={doc} />}
        {sub === 'grafo' && doc?.kind === 'paper' && (
          <PaperLocalGraph paperId={doc.id} hops={1} />
        )}
        {sub === 'grafo' && (!doc || doc.kind !== 'paper') && (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground p-4">
            <Network className="h-6 w-6 opacity-40" />
            <p className="font-medium text-foreground">Grafo local solo en papers</p>
            <p className="text-[10px]">Abre un paper canónico (M01-M12) para ver su vecindario.</p>
          </div>
        )}
        {sub === 'evolucion' && <EvolutionTab doc={doc} />}
      </div>
    </div>
  );
}

function SubTabBtn({
  active, onClick, Icon, label, disabled,
}: Readonly<{
  active: boolean;
  onClick: () => void;
  Icon: typeof ListTree;
  label: string;
  disabled?: boolean;
}>) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 border-b-2 px-2 py-1.5 text-[10px] font-medium transition-colors',
        active && !disabled
          ? 'border-primary text-primary'
          : disabled
            ? 'border-transparent text-muted-foreground/40 cursor-not-allowed'
            : 'border-transparent text-muted-foreground hover:bg-accent/30 hover:text-foreground',
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  );
}
