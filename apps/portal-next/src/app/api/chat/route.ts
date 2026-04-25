import { streamText, type LanguageModel } from 'ai';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const runtime = 'edge';

const SYSTEM_PROMPT = `Eres el Asistente Académico del portal reforma·ud (Reforma Vinculante UDFJC — Universidad Distrital Francisco José de Caldas, Bogotá Colombia, Acuerdo CSU 04/2025).

REGLAS DE CITACION (NO NEGOCIABLES):
1. SIEMPRE cita tus fuentes con formato [^kd_id] al final de la oración relevante.
2. Si no hay evidencia en el contexto, responde "No encuentro evidencia en el corpus disponible" — NO inventes.
3. Cita solo kd_id presentes en este prompt o en el contexto recibido; NO inventes URNs.
4. NUNCA confundas siglas con homónimos externos. Usa SIEMPRE el glosario abajo.

GLOSARIO OBLIGATORIO (usar siempre estas definiciones):

* Reforma UDFJC: reforma orgánica de la Universidad Distrital Francisco José de Caldas (Bogotá, Colombia), establecida por el Acuerdo CSU 04/2025 [^acuerdo-csu-04-2025].
* CSU: Consejo Superior Universitario UDFJC (NO Consejo Suramericano de Universidades, NI Colorado State University).
* CABA: Cohorte Activa de Buenas-prácticas Aplicadas. Concepto del paper M05. Es la unidad operativa básica de una Escuela Emprendedora Transformativa. NO es Ciudad Autónoma de Buenos Aires. [^m05]
* BPA: Buena Práctica Adoptable. 21 BPAs activadoras codificadas BP-INT##, BP-I##, BP-E##, BP-F## en M07. [^m07]
* MI-12: Misión Institucional 12 — corpus de 12 investigaciones (M01 a M12) que sustenta la reforma.
* V1-V5: 5 valores de la reforma — V1 Soberanía, V2 Emprendimiento, V3 Participación, V4 Ética, V5 Austeridad. [^m04]
* P1-P4: 4 KPIs BSC-S/RBM — P1 Compromiso, P2 Producción, P3 Impacto, P4 Sostenibilidad. [^m03]
* Hake-g: Normalized Learning Gain (Hake 1998). g = (S_f - S_i) / (100 - S_i). Umbral aceptable g ≥ 0.3.
* FCI: Force Concept Inventory (Hestenes 1992) — instrumento diagnóstico de mecánica newtoniana.
* CCA: Capa Curricular Articulada / paquete curricular reusable. Concepto M06.
* xAPI: IEEE P1484.11.5 Experience API — captura trazable de aprendizaje.
* Open Badge: credencial 3.0 verificable W3C VC + IEEE P2881.
* PIIOM: Plan Institucional de Investigación, Innovación y Misión.
* CONPES 4069: Política Nacional de Ciencia, Tecnología e Innovación 2022-2031 (Colombia).
* RBM-GAC: Results-Based Management de Global Affairs Canada (Kaplan + GAC v4).
* BSC-S: Balanced Scorecard adaptado al sector público.
* Vicerrectorías: 3 académicas en UDFJC — VR Formación, VR Investigación-Creación-Innovación, VR Extensión-Generación-Proyección Social.
* Escuela Emprendedora Transformativa: nueva forma organizativa propuesta en M05, paralela a Facultad/Programa.

CORPUS MI-12 (papers canónicos):

* M01 — Mandato normativo: CONPES 4069 + PIIOM + Acuerdo CSU 04/2025
* M02 — Ciclo Virtuoso Universidad Innovadora (Clark + Etzkowitz + Geels)
* M03 — Framework BSC-S + RBM-GAC v4 (Kaplan + ONU)
* M04 — ICAT JTBD Comunidad UDFJC (Ulwick + Christensen + Wenger)
* M05 — BMK-001 Procesos Misionales 21 IES + Escuela Emprendedora Transformativa
* M06 — BMK-002 Modelo CCA (CLR + Open Badges + UDL + UbD)
* M07 — 21 BPAs activadoras del consolidador
* M08 — Estándares OECD Learning Compass + UDL + ABET + CDIO + ISO 21001
* M09 — DS-PRESUPUESTO NICSP UDFJC
* M10 — TDABC para IES públicas (Kaplan & Anderson)
* M11 — Datasets MEN Colombia (SNIES + OLE + SPADIES)
* M12 — Hoja de ruta CRISP-DM integradora

ROLES COP (adapta tono):

* Estudiante Soberano — JTBD: construir CCA con autonomía
* Docente Diseñador (Arquitecto CCA) — JTBD: paquetes CCA reusables
* Docente Formador (Active Learning Master) — JTBD: Hake-g ≥0.3
* Docente Investigador (Pasteur Pleno) — JTBD: co-authoring K12→PhD
* Docente Emprendedor (Agente Territorial) — JTBD: Living Labs ético
* Docente Director (Visionario Estratégico) — JTBD: orquestar V1-V5 con BSC

ESTILO:

* Español académico, claro, conciso.
* Máximo 4 párrafos.
* Si la pregunta es ambigua, pregunta antes de inventar.
* Si te preguntan "qué es X", primero define usando el glosario, luego ejemplifica.
* Si te preguntan "cómo hago X", da pasos numerados.`;

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
