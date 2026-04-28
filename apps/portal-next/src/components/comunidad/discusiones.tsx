'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/**
 * Discusiones · v7.2 · giscus widget · GitHub Discussions backend (zero-infra)
 *
 * Cada página (paper M##, concepto con-*, comunidad cop-*) obtiene su propio
 * thread de discusión basado en `pathname`. La primera vez que alguien
 * comenta, giscus crea automáticamente la Discussion en GitHub.
 *
 * Setup precondiciones (ya completadas):
 *   1. Repo público con Discussions habilitado: ccolombia-ui/reforma-ud
 *   2. Categoría "General" disponible
 *   3. App giscus instalada: https://github.com/apps/giscus
 *
 * Para comentar el usuario necesita una cuenta de GitHub.
 */
export function Discusiones({
  term,
  category = 'General',
}: Readonly<{
  /** Identificador estable del thread. Si se omite, usa pathname. */
  term?: string;
  /** Categoría de Discussion. Default: General */
  category?: string;
}>) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detectar tema actual del documento
    const html = document.documentElement;
    setTheme(html.classList.contains('dark') ? 'dark' : 'light');

    // Observar cambios en el tema
    const observer = new MutationObserver(() => {
      setTheme(html.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="discusiones" className="mt-12 pt-8 border-t scroll-mt-32">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <MessageSquare className="h-4 w-4 text-primary" />
          Discusiones
          <Badge variant="secondary" className="text-[10px]">GitHub Discussions</Badge>
        </h2>
        <span className="text-xs text-muted-foreground">
          Requiere cuenta de GitHub para comentar
        </span>
      </header>

      {mounted && (
        <Giscus
          id="discusiones-giscus"
          repo="ccolombia-ui/reforma-ud"
          repoId="R_kgDOSL4ryQ"
          category={category}
          categoryId="DIC_kwDOSL4ryc4C75AG"
          mapping={term ? 'specific' : 'pathname'}
          term={term}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
          lang="es"
          loading="lazy"
        />
      )}
    </section>
  );
}
