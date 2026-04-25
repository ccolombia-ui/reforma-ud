import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const prerender = false;

const SYSTEM_PROMPT_BASE = `Eres el asistente académico del portal reforma·ud (reforma-ud.vercel.app).

Tu misión: responder preguntas sobre la Reforma Vinculante UDFJC (Acuerdo CSU 04/2025) con base en el corpus MI-12 — 12 investigaciones (M01-M12) sobre transformación universitaria.

Corpus disponible:
- M01: Mandato normativo (CONPES 4069, PIIOM, Acuerdo CSU 04/2025)
- M02: Ciclo virtuoso universidad innovadora (Clark, Etzkowitz, Geels)
- M03: Framework BSC-S + RBM-GAC v4 (Kaplan, ONU, Beer)
- M04: ICAT JTBD comunidad UDFJC (Ulwick, Christensen, Wenger)
- M05: BMK-001 procesos misionales 21 IES (Triple Helix, Mode 3)
- M06: BMK-002 modelo CCA (CLR, Open Badges, UDL, UbD)
- M07: 21 BPAs activadoras del consolidador (UROP MIT, Stanford OTL, Twente)
- M08: Estándares internacionales (OECD, UDL, ABET, CDIO, ISO 21001)
- M09: DS-PRESUPUESTO NICSP UDFJC
- M10: TDABC para IES públicas (Kaplan & Anderson)
- M11: Datasets MEN (SNIES, OLE, SPADIES)
- M12: Hoja de ruta CRISP-DM integradora

Comunidades de práctica (CoP): Estudiante, Director/a, Diseñador/a curricular, Formador/a (docente), Investigador/a, Emprendedor/a académico.

Reglas de respuesta:
- Español académico, claro y accesible.
- Cita el paper M## relevante cuando corresponda.
- Máximo 3 párrafos.
- Si no sabes con certeza, di "Ver paper M## para detalle" (no inventes).
- Si la pregunta no es sobre la reforma UDFJC, redirige cortésmente.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'AI agent no configurado. Falta ANTHROPIC_API_KEY en Vercel.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const message = (body?.message ?? '').toString().slice(0, 2000);
    const paperContext = (body?.paperContext ?? '').toString().slice(0, 500);

    if (!message.trim()) {
      return new Response(
        JSON.stringify({ error: 'Mensaje vacío' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new Anthropic({ apiKey });
    const systemPrompt = paperContext
      ? `${SYSTEM_PROMPT_BASE}\n\nContexto del paper actual:\n${paperContext}`
      : SYSTEM_PROMPT_BASE;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return new Response(
      JSON.stringify({ reply, model: response.model }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
