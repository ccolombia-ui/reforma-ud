import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

/**
 * POST /api/sync/doc
 * Dev-only endpoint — sincroniza un concepto desde GDrive (vault) al portal.
 * En producción retorna 403.
 *
 * Body: { docId: string }  — e.g. "con-acu-004-25"
 * Response: { success: boolean, report: string[], stats: Record<string,number> }
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Solo disponible en localhost (dev). En producción usa git + Vercel deploy.' },
      { status: 403 },
    );
  }

  let docId: string;
  try {
    const body = await req.json();
    docId = String(body.docId ?? '').trim();
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 });
  }

  if (!docId || !/^con-[a-z0-9-]+$/i.test(docId)) {
    return NextResponse.json(
      { error: `docId inválido: "${docId}". Debe ser con-<slug>.` },
      { status: 400 },
    );
  }

  const scriptPath = path.resolve(process.cwd(), 'scripts/sync-glosario.mjs');

  return new Promise<NextResponse>((resolve) => {
    execFile(
      'node',
      [scriptPath, '--filter', 'all', '--file', docId],
      { timeout: 30_000, cwd: process.cwd() },
      (err, stdout, stderr) => {
        if (err) {
          resolve(
            NextResponse.json(
              { success: false, error: stderr || err.message, report: [] },
              { status: 500 },
            ),
          );
          return;
        }
        // Parse stdout lines into report array
        const report = stdout.split('\n').map((l) => l.trim()).filter(Boolean);
        // Extract summary stats from stdout
        const newCount = parseInt(stdout.match(/\+ Nuevos\s*:\s*(\d+)/)?.[1] ?? '0');
        const upd = parseInt(stdout.match(/↑ Actualizados\s*:\s*(\d+)/)?.[1] ?? '0');
        const unch = parseInt(stdout.match(/= Sin cambios\s*:\s*(\d+)/)?.[1] ?? '0');
        const ign = parseInt(stdout.match(/⏭ Ignorados\s*:\s*(\d+)/)?.[1] ?? '0');
        resolve(
          NextResponse.json({
            success: true,
            docId,
            report,
            stats: { new: newCount, updated: upd, unchanged: unch, ignored: ign },
          }),
        );
      },
    );
  });
}
