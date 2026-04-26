'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, ArrowRight, SkipForward } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComprehensionQuestion } from '@/lib/comprehension';

type Outcome = 'correct' | 'incorrect' | 'skipped';

export function SectionGate({
  question,
  onComplete,
  className,
}: {
  question: ComprehensionQuestion;
  onComplete: (outcome: Outcome) => void;
  className?: string;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = chosen !== null && chosen === question.correctIndex;

  return (
    <Card className={cn('border-primary/30 bg-primary/5', className)}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Pregunta de comprensión
        </div>
        <h3 className="text-base font-semibold leading-snug">{question.prompt}</h3>

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            const isThisChosen = chosen === i;
            const isThisCorrect = i === question.correctIndex;
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setChosen(i)}
                className={cn(
                  'w-full rounded-md border-2 px-4 py-2.5 text-left text-sm transition-all',
                  !revealed && isThisChosen && 'border-primary bg-primary/10',
                  !revealed && !isThisChosen && 'border-border bg-background hover:border-primary/40',
                  revealed && isThisCorrect && 'border-emerald-500 bg-emerald-500/10',
                  revealed && isThisChosen && !isThisCorrect && 'border-red-500 bg-red-500/10',
                  revealed && !isThisChosen && !isThisCorrect && 'border-border bg-background opacity-60',
                  revealed && 'cursor-default',
                )}
              >
                <span className="inline-flex w-full items-center justify-between gap-2">
                  <span>{opt}</span>
                  {revealed && isThisCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  {revealed && isThisChosen && !isThisCorrect && <XCircle className="h-4 w-4 text-red-600" />}
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            className={cn(
              'rounded-md p-3 text-sm',
              isCorrect
                ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-500/10 text-red-900 dark:text-red-200',
            )}
          >
            <p className="font-medium">
              {isCorrect ? '✓ ¡Correcto!' : `✗ Respuesta correcta: ${question.options[question.correctIndex]}`}
            </p>
            {question.explain && <p className="mt-1 text-xs opacity-90">{question.explain}</p>}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {!revealed ? (
            <>
              <Button
                disabled={chosen === null}
                onClick={() => setRevealed(true)}
                size="sm"
                className="gap-1.5"
              >
                Verificar respuesta <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => onComplete('skipped')}
              >
                <SkipForward className="h-3.5 w-3.5" /> Saltar pregunta
              </Button>
            </>
          ) : (
            <>
              {isCorrect ? (
                <Button
                  onClick={() => {
                    toast.success('¡Sección verificada!', {
                      description: 'Tu progreso quedó registrado. La siguiente sección está disponible.',
                      icon: '✨',
                      duration: 3500,
                    });
                    onComplete('correct');
                  }}
                  size="sm"
                  className="gap-1.5"
                >
                  Continuar a la siguiente sección <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChosen(null);
                      setRevealed(false);
                    }}
                  >
                    Intentar de nuevo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onComplete('skipped')} className="gap-1.5">
                    <SkipForward className="h-3.5 w-3.5" /> Continuar sin verificar
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
