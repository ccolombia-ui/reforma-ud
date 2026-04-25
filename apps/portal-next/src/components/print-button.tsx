'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrintButton({ label = 'Guardar como PDF' }: { label?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      data-print-trigger
      onClick={() => window.print()}
      aria-label="Imprimir o guardar como PDF"
    >
      <Printer className="h-4 w-4" />
      {label}
    </Button>
  );
}
