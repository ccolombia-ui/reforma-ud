import Link from 'next/link';
import { Search, Code2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/85 px-4 backdrop-blur-md md:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
        <span className="text-base text-primary">reforma·ud</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" className="search-trigger gap-2 text-muted-foreground" disabled>
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Buscar...</span>
          <kbd className="ml-2 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono sm:inline-block">
            /
          </kbd>
        </Button>
        <Button variant="ghost" size="icon" asChild aria-label="Repositorio en GitHub">
          <a
            href="https://github.com/ccolombia-ui/reforma-ud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code2 className="h-4 w-4" />
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
