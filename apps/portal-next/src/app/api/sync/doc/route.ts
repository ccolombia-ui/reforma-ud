import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

/**
 * POST /api/sync/doc
 *
 * Sincroniza un concepto del glosario desde Google Drive al portal.
 *
 * DEV  (localhost): ejecuta sync-glosario.mjs directo (G: montada localmente).
 * PROD (Vercel):    llama al Google Apps Script Web App (GAS_SYNC_URL).
 *                   El script lee Drive → transforma → push a GitHub → Vercel redeploy.
 *
 * Body: { docId: string, filter?: "approved"|"all" }
 * Response: { success, mode, stats?, report?, message?, error? }
 */
export async function POST(req: NextRequest) {
  let docId: string;
  let filter = 'approved';
  try {
    const body = await req.json();
    docId = String(body.docId ?? '').trim();
    filter = String(body.filter ?? 'approved').trim();
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 });
  }

  if (!docId || !/^con-[a-z0-9-]+$/i.test(docId)) {
    return NextResponse.json(
      { error: `docId inválido: "${docId}". Formato esperado: con-<slug>.` },
      { status: 400 },
    );
  }

  // ── DEV: script local (G: drive montada) ──────────────────────────────────
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
            success: true, mode: 'local', docId, report,
            stats: { new: newCount, updated: upd, unchanged: unch, ignored: ign },
          }));
        },
      );
    });
  }

  // ── PROD: Google Apps Script Web App ─────────────────────────────────────
  const gasUrl    = process.env.GAS_SYNC_URL;
  const deployKey = process.env.GAS_DEPLOY_KEY;

  if (!gasUrl) {
    return NextResponse.json(
      { error: 'GAS_SYNC_URL no configurado en Vercel. Ver cloud-functions/sync-glosario-gas/SETUP.md' },
      { status: 503 },
    );
  }

  let gasRes: Response;
  try {
    gasRes = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docId, filter, ...(deployKey ? { key: deployKey } : {}) }),
      // Apps Script puede tardar hasta 30s en sync completo
      signal: AbortSignal.timeout(60_000),
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, mode: 'gas', error: e instanceof Error ? e.message : 'Timeout o red' },
      { status: 504 },
    );
  }

  // Apps Script siempre retorna 200 — el error va en el body JSON
  const data = await gasRes.json().catch(() => ({ error: 'Respuesta no es JSON' }));

  return NextResponse.json({ mode: 'gas', ...data });
}
