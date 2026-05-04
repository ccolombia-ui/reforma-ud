/**
 * Vault Document Viewer — v8g-l13
 *
 * Ruta dinámica /vault/[...path] que lee archivos .md desde el branch
 * vault-content del repo en GitHub (raw.githubusercontent.com).
 *
 * Uso: /vault/100--csu/000--estatuto-general/00-glosario-universal/1-normativo/con-10-principios-generales
 */

import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ccolombia-ui/reforma-ud/vault-content';

function githubRawUrl(filePath: string): string {
  // El branch vault-content aplanará las carpetas tal cual
  return `${GITHUB_RAW_BASE}/${filePath}.md`;
}

async function fetchVaultMd(filePath: string): Promise<string | null> {
  const url = githubRawUrl(filePath);
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
