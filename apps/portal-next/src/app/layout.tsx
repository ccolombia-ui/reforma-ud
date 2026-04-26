import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { RightPanel, RightPanelMini } from '@/components/layout/right-panel';
import { CommandPalette } from '@/components/layout/command-palette';
import { CCAEarnedModal } from '@/components/layout/cca-earned-modal';
import { GraphProvider } from '@/lib/graph-context';

export const metadata: Metadata = {
  title: {
    default: 'reforma·ud — Acuerdo CSU 04/2025',
    template: '%s · reforma·ud',
  },
  description:
    'Portal de la Reforma Vinculante UDFJC — Acuerdo CSU 04/2025. Corpus MI-12 + comunidades organizativas con grafos de conocimiento.',
  metadataBase: new URL('https://reforma-ud.vercel.app'),
  openGraph: {
    title: 'reforma·ud',
    description: 'La Reforma UDFJC explicada desde tu rol',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <GraphProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main data-pagefind-body className="min-w-0 flex-1 overflow-x-hidden">
                  {children}
                  <Footer />
                </main>
                <RightPanel />
              </div>
            </div>
            <RightPanelMini />
            <CommandPalette />
            <CCAEarnedModal />
          </GraphProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
