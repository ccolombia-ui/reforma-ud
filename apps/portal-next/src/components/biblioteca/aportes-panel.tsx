'use client';

import { useEffect, useState } from 'react';
import { MessageSquarePlus, Trash2, Send } from 'lucide-react';
import { useActiveProfile } from '@/lib/ui-state';
import {
  getAportes,
  addAporte,
  removeAporte,
  INTENT_META,
  type Aporte,
  type AporteIntent,
} from '@/lib/aportes-state';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * AportesPanel — bottom-up: lector aporta al documento.
 * Renderiza al final del paper (después de Comprensión).
 *
 * Lista aportes existentes + form para añadir nuevo.
 * MVP: persistencia localStorage. v5+ con backend.
 */
export function AportesPanel({ paperId }: Readonly<{ paperId: string }>) {
  const { name, role, meta } = useActiveProfile();
  const [aportes, setAportes] = useState<Aporte[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [intent, setIntent] = useState<AporteIntent>('idea');

  useEffect(() => {
    setAportes(getAportes(paperId));
    const onChange = () => setAportes(getAportes(paperId));
    window.addEventListener('aportes-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('aportes-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, [paperId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addAporte({
      paperId,
      intent,
      content: content.trim(),
      authorName: name,
      authorRole: role,
    });
    setContent('');
    setShowForm(false);
  }

  return (
    <section className="not-prose mt-10 mb-6 border-t-2 border-purple-500/30 pt-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
            <MessageSquarePlus className="h-4 w-4 text-purple-500" />
            Aportes de la comunidad
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tu retorno enriquece el documento. Comparte ideas, dudas, alertas o señales de utilidad.
          </p>
        </div>
        <span className="shrink-0 rounded-md border bg-purple-500/5 px-2 py-1 text-[11px] font-mono text-purple-600 dark:text-purple-400">
          {aportes.length} {aportes.length === 1 ? 'aporte' : 'aportes'}
        </span>
      </div>

      {/* Form */}
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          size="sm"
          className="w-full gap-2 border-dashed text-purple-600 dark:text-purple-400 hover:bg-purple-500/5"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          Añadir un aporte
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-lg border-l-4 border-purple-500 bg-purple-500/5 p-3 space-y-2">
          <div className="flex items-center gap-1 flex-wrap">
            {(Object.keys(INTENT_META) as AporteIntent[]).map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIntent(i)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors',
                  intent === i
                    ? 'bg-purple-500/20 border-purple-500 text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:bg-accent/50',
                )}
              >
                <span>{INTENT_META[i].emoji}</span>
                {INTENT_META[i].label}
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tu aporte sobre este documento... (markdown soportado)"
            rows={3}
            autoFocus
            className="w-full rounded-md border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              Como <strong>{meta.emoji} {name}</strong> · guardado localmente
            </span>
            <div className="flex gap-1.5">
              <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); setContent(''); }}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={!content.trim()} className="gap-1.5">
                <Send className="h-3 w-3" /> Enviar
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Lista */}
      {aportes.length > 0 && (
        <ul className="mt-3 space-y-2">
          {aportes.map((a) => (
            <AporteCard key={a.id} aporte={a} onRemove={() => removeAporte(a.id)} />
          ))}
        </ul>
      )}
    </section>
  );
}

function AporteCard({ aporte, onRemove }: Readonly<{ aporte: Aporte; onRemove: () => void }>) {
  const meta = INTENT_META[aporte.intent];
  const date = new Date(aporte.createdAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  return (
    <li className={cn(
      'rounded-lg border-l-4 bg-card p-3 group',
      meta.color === 'amber' && 'border-amber-500',
      meta.color === 'red' && 'border-red-500',
      meta.color === 'emerald' && 'border-emerald-500',
      meta.color === 'blue' && 'border-blue-500',
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span>{meta.emoji}</span>
            <span className="font-medium uppercase tracking-wide">{meta.label}</span>
            <span>·</span>
            <span>{aporte.authorName}</span>
            <span>·</span>
            <time dateTime={aporte.createdAt}>{date}</time>
          </div>
          <p className="mt-1 text-sm whitespace-pre-wrap leading-relaxed">{aporte.content}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Eliminar aporte"
          className="shrink-0 opacity-0 group-hover:opacity-100 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-opacity"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}
