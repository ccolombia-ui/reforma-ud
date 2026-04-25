import { streamText, type LanguageModel } from 'ai';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const runtime = 'edge';

const SYSTEM_PROMPT = `Eres el Asistente Académico del portal reforma·ud (Reforma Vinculante UDFJC, Acuerdo CSU 04/2025).

REGLAS DE CITACION (NO NEGOCIABLES):
1. SIEMPRE cita tus fuentes con formato [^kd_id] al final de la oración relevante.
2. Si no hay evidencia en el contexto, responde "No encuentro evidencia en el corpus disponible" — NO inventes.
3. Cita solo kd_id presentes en el contexto que recibes; no inventes URNs.

CONOCIMIENTO BASE:
- Corpus MI-12: 12 papers (M01-M12) que sustentan teoricamente la reforma.
- Comunidades organizativas: Gobierno · 3 Vicerrectorias (Formacion, Investigacion, Extension).
- Estantes de biblioteca: Normas, Investigaciones, Guias, Deliberaciones, Secciones.

ESTILO:
- Espanol academico, claro, conciso.
- Maximo 4 parrafos.
- Si te preguntan "que es X", primero define, luego ejemplifica con el corpus, luego refiere al doc.
- Si te preguntan "como hago X", da pasos numerados.

ROL ACTIVO:
- El usuario tiene un rol CoP (estudiante / docente-disenador / docente-formador / docente-investigador / docente-emprendedor / docente-director).
- Adapta tono y profundidad al rol.`;

type ChatRequest = {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model?: 'haiku' | 'kimi';
  activeDocId?: string;
  activeCop?: string;
  activeRole?: string;
};

function pickModel(modelKey: string): { model: LanguageModel; name: string } | null {
  if (modelKey === 'haiku') {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    const client = createAnthropic({ apiKey });
    return { model: client('claude-haiku-4-5-20251001'), name: 'Claude Haiku 4.5' };
  }
  if (modelKey === 'kimi') {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) return null;
    // Kimi (Moonshot AI) — OpenAI-compatible
    const client = createOpenAICompatible({
      name: 'moonshot',
      apiKey,
      baseURL: 'https://api.moonshot.cn/v1',
    });
    return { model: client('moonshot-v1-32k'), name: 'Kimi 2.5 (Moonshot)' };
  }
  return null;
}

function buildContextBlock(req: ChatRequest): string {
  const parts: string[] = [];
  if (req.activeRole) parts.push(`Rol activo del usuario: ${req.activeRole}.`);
  if (req.activeCop) parts.push(`CoP activa: ${req.activeCop}.`);
  if (req.activeDocId) parts.push(`Documento abierto en este momento: ${req.activeDocId}. Boostea citaciones a este doc cuando aplique.`);
  return parts.length ? `\n\nCONTEXTO DE LA SESIÓN:\n${parts.join('\n')}` : '';
}

export async function POST(req: Request) {
  try {
    const body: ChatRequest = await req.json();
    const modelKey = body.model ?? 'haiku';
    const picked = pickModel(modelKey);

    if (!picked) {
      return new Response(
        JSON.stringify({
          error: `Modelo ${modelKey} no configurado. Falta ${modelKey === 'haiku' ? 'ANTHROPIC_API_KEY' : 'MOONSHOT_API_KEY'} en variables de entorno.`,
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ctx = buildContextBlock(body);
    const result = await streamText({
      model: picked.model,
      system: SYSTEM_PROMPT + ctx,
      messages: body.messages.slice(-10), // últimos 10 turnos para context window
      maxOutputTokens: 800,
      temperature: 0.4,
    });

    return result.toTextStreamResponse({
      headers: {
        'X-Model-Used': picked.name,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
