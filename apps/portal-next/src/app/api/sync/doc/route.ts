import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

/**
 * POST /api/sync/doc
 *
 * Sincroniza un concepto del glosario desde Google Drive al portal.
 *
 * DEV  (localhost): ejecuta sync-glosario.mjs directo (G: montada localmente).
 * PROD (Vercel):    dispara GitHub Actions workflow_dispatch con rclone.
 *
 * Body:    { docId: string }   — e.g. "con-acu-004-25"
 * Headers: Authorization: Bearer <SYNC_SECRET>
 *
 * Response: { success, mode, message?, report?, stats? }
 */

const GITHUB_REPO = 'ccolombia-ui/reforma-ud';
const WORKFLOW_FILE = 'sync-from-drive.yml';

export async function POST(req: NextRequest) {
  // Auth: sin user management por ahora — same-origin (portal propio).
  // Agregar SYNC_SECRET cuando se implemente autenticación de usuarios.

  // ── Validar body ─────────────────────────────────────────────────────────
  let docId: string;
  let filter: string = 'approved';
  try {
    const body = await req.json();
    docId = String(body.docId ?? '').trim();
    filter = String(body.filter ?? 'approved').trim();
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 });
  }

  if (!docId || !/^con-[a-z0-9-]+$/i.test(docId)) {
    return NextResponse.json(
      { error: `docId inválido: "${docId}". Formato: con-<slug>.` },
      { status: 400 },
    );
  }

  // ── DEV: ejecutar script local ────────────────────────────────────────────
  if (process.env.NODE_ENV === 'development') {
    const scriptPath = path.resolve(process.cwd(), 'scripts/sync-glosario.mjs');
    return new Promise<NextResponse>((resolve) => {
      execFile(
        'node',
        [scriptPath, '--filter', filter, '--file', docId],
        { timeout: 30_000, cwd: process.cwd() },
        (err, stdout, stderr) => {
          if (err) {
            resolve(NextResponse.json(
              { success: false, mode: 'local', error: stderr || err.message },
              { status: 500 },
            ));
            return;
          }
          const report = stdout.split('\n').map((l) => l.trim()).filter(Boolean);
          const newCount = parseInt(stdout.match(/\+ Nuevos\s*:\s*(\d+)/)?.[1] ?? '0');
          const upd = parseInt(stdout.match(/↑ Actualizados\s*:\s*(\d+)/)?.[1] ?? '0');
          const unch = parseInt(stdout.match(/= Sin cambios\s*:\s*(\d+)/)?.[1] ?? '0');
          const ign = parseInt(stdout.match(/⏭ Ignorados\s*:\s*(\d+)/)?.[1] ?? '0');
          resolve(NextResponse.json({
            success: true,
            mode: 'local',
            docId,
            report,
            stats: { new: newCount, updated: upd, unchanged: unch, ignored: ign },
          }));
        },
      );
    });
  }

  // ── PROD: disparar GitHub Actions workflow_dispatch ───────────────────────
  const pat = process.env.GITHUB_PAT;
  if (!pat) {
    return NextResponse.json(
      { error: 'GITHUB_PAT no configurado en Vercel env vars.' },
      { status: 503 },
    );
  }

  const dispatchUrl = `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
  const ghRes = await fetch(dispatchUrl, {
    method: 'POST',
    headers: {
      Authorization: `token ${pat}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: {
        doc_slug: docId,
        filter,
      },
    }),
  });

  if (!ghRes.ok) {
    const errText = await ghRes.text();
    return NextResponse.json(
      { success: false, mode: 'github-actions', error: `GitHub API ${ghRes.status}: ${errText}` },
      { status: 502 },
    );
  }

  // GitHub retorna 204 No Content en dispatch exitoso
  return NextResponse.json({
    success: true,
    mode: 'github-actions',
    docId,
    message: 'Workflow disparado. Vercel redesplegará automáticamente en ~2 min cuando el Action haga push.',
    actionsUrl: `https://github.com/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}`,
  });
}
