'use client';

import { useEffect, useState } from 'react';
import { Home, Target, BookOpen, Newspaper, MessageSquare, Trophy, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabId = 'inicio' | 'misiones-cop' | 'misiones-colectivas' | 'glosario' | 'noticias' | 'discusiones';

type Tab = {
  id: TabId;
  label: string;
  Icon: LucideIcon;
};

const ALL_TABS: Tab[] = [
  { id: 'inicio',              label: 'Inicio',      Icon: Home },
  { id: 'misiones-cop',        label: 'Misiones',    Icon: Trophy },
  { id: 'misiones-colectivas', label: 'Colectivas',  Icon: Target },
  { id: 'glosario',            label: 'Glosario',    Icon: BookOpen },
  { id: 'noticias',            label: 'Noticias',    Icon: Newspaper },
  { id: 'discusiones',         label: 'Discusiones', Icon: MessageSquare },
];

/**
 * ComunidadTabs · v8b — secciones de comunidad.
 * IDs de sección: inicio · misiones-cop · misiones-colectivas · glosario · noticias · discusiones
 */
export function ComunidadTabs({
  available,
}: Readonly<{
  available: TabId[];
}>) {
  const [active, setActive] = useState<TabId>(available[0] ?? 'inicio');

  useEffect(() => {
    const sections = available
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as TabId);
      },
      { rootMargin: '-100px 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [available]);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as TabId;
    if (hash && available.includes(hash)) {
      setActive(hash);
      const target = document.getElementById(hash);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [available]);

  function handleClick(id: TabId) {
    setActive(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  }

  const visible = ALL_TABS.filter((t) => available.includes(t.id));
  if (visible.length <= 1) return null;

  return (
    <nav
      className="sticky top-14 z-30 -mx-4 mb-6 border-b bg-background/80 px-4 backdrop-blur-md md:-mx-8 md:px-8"
      aria-label="Secciones de la comunidad"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 scrollbar-thin">
        {visible.map(({ id, label, Icon }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => handleClick(id)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                active === id
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent',
              )}
              aria-current={active === id ? 'page' : undefined}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
