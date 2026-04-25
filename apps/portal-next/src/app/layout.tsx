import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'reforma·ud — Acuerdo CSU 04/2025',
    template: '%s · reforma·ud',
  },
  description:
    'Portal de la Reforma Vinculante UDFJC — Acuerdo CSU 04/2025. Corpus MI-12 + comunidades organizativas.',
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
          <div className="flex min-h-screen">
            <aside className="hidden w-72 flex-shrink-0 border-r md:block">
              <div className="sticky top-0 h-screen">
                <Sidebar />
              </div>
            </aside>
            <div className="flex min-w-0 flex-1 flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
