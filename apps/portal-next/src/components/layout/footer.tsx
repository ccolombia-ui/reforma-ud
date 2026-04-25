import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 px-4 py-6 text-xs text-muted-foreground md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
        <p>
          CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · CPS-939-2026 · UDFJC · 2026
        </p>
        <p className="flex gap-4">
          <Link href="/about" className="hover:text-foreground">Acerca de</Link>
          <a
            href="https://github.com/ccolombia-ui/reforma-ud"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
