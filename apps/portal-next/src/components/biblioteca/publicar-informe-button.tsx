'use client';

import { useState, useCallback } from 'react';
import { Share2, FileDown, Link2, Check, Send, Briefcase, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const SHARE_TITLE = 'Reforma Vinculante UDFJC — Informe Ejecutivo';
const SHARE_TEXT = 'Análisis, buenas prácticas y prospectiva transformativa de la Universidad Distrital · ACU 004-25';

/**
 * PublicarInformeButton · v7.5 — dropdown de publicación del informe canónico.
 *
 * Acciones:
 *  • Descargar PDF (window.print → @media print de v7.4)
 *  • Copiar enlace (clipboard)
 *  • Compartir en X / LinkedIn / Correo
 */
export function PublicarInformeButton() {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/canonico/`
    : 'https://reforma-ud.vercel.app/canonico/';

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  }, [url]);

  const handleTwitter = useCallback(() => {
    const text = encodeURIComponent(`${SHARE_TITLE} — ${SHARE_TEXT}`);
    const u = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${u}`, '_blank', 'noopener');
  }, [url]);

  const handleLinkedIn = useCallback(() => {
    const u = encodeURIComponent(url);
    const title = encodeURIComponent(SHARE_TITLE);
    const summary = encodeURIComponent(SHARE_TEXT);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${u}&title=${title}&summary=${summary}`,
      '_blank',
      'noopener',
    );
  }, [url]);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(SHARE_TITLE);
    const body = encodeURIComponent(`${SHARE_TEXT}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [url]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1.5 no-print">
          <Share2 className="h-3.5 w-3.5" />
          Publicar informe
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Publicar este informe
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handlePrint} className="gap-2 text-sm">
          <FileDown className="h-3.5 w-3.5" />
          Descargar PDF
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
            Ctrl+P
          </kbd>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopy} className="gap-2 text-sm">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-700 dark:text-emerald-400">Copiado</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              Copiar enlace
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Compartir en
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={handleTwitter} className="gap-2 text-sm">
          <Send className="h-3.5 w-3.5" />
          X / Twitter
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLinkedIn} className="gap-2 text-sm">
          <Briefcase className="h-3.5 w-3.5" />
          LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEmail} className="gap-2 text-sm">
          <Mail className="h-3.5 w-3.5" />
          Correo electrónico
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
