/**
 * Vault Document Viewer — v8g-l13 (Google Drive via Apps Script proxy)
 *
 * Ruta dinámica /vault/[...path] que lee archivos .md desde Google Drive
 * a través de un Google Apps Script Web App (CORS-enabled).
 *
 * Uso: /vault/100--csu/000--estatuto-general/00-glosario-universal/1-normativo/con-10-principios-generales
 *
 * Requiere la variable de entorno NEXT_PUBLIC_VAULT_PROXY_URL apuntando al
 * deployment del Apps Script (ver cloud-functions/vault-gdrive-proxy/SETUP.md).
 */

import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PROXY_URL =
  process.env.NEXT_PUBLIC_VAULT_PROXY_URL || '';

function proxyDocUrl(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/').replace(/^\//, '');
  // El proxy espera el path relativo al vault, SIN la extensión .md
  const withoutExt = normalized.replace(/\.md$/i, '');
  const url = new URL(PROXY_URL);
  url.searchParams.set('mode', 'doc');
  url.searchParams.set('path', withoutExt + '.md');
  return url.toString();
}

async function fetchVaultMd(filePath: string): Promise<string | null> {
  if (!PROXY_URL) return null;
  const url = proxyDocUrl(filePath);
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

interface VaultPageProps {
  params: Promise<{ path?: string[] }>;
}

export default async function VaultPage({ params }: VaultPageProps) {
  const { path } = await params;
  const filePath = path ? path.join('/') : '';

  const markdown = await fetchVaultMd(filePath);
  if (markdown === null) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </main>
  );
}
