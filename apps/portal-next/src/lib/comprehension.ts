/**
 * Esquema de preguntas de comprensión por sección de documento.
 * Las preguntas son OPCIONALES por sección. Una sección sin pregunta se marca
 * automáticamente como completada al desplazar (intersection observer) o al
 * hacer click "marcar leída".
 */

export type ComprehensionQuestion = {
  prompt: string;
  options: [string, string, string, string] | [string, string, string] | [string, string];
  correctIndex: number;
  explain?: string;
};

export type ComprehensionSection = {
  /** Texto del heading (ej. "Concepto de CABA") */
  heading: string;
  /** ID/anchor del heading slugificado (ej. "concepto-de-caba") */
  anchor: string;
  /** Resumen breve de qué cubre la sección */
  summary?: string;
  /** Pregunta opcional. Si no hay, la sección se marca leída por scroll. */
  question?: ComprehensionQuestion;
};

export type DocumentComprehension = {
  docId: string;
  title: string;
  sections: ComprehensionSection[];
};

/* ----------------------------------------------------------
 * Demo data — m04 y m05 + algunas notas del hilo Física.
 * ---------------------------------------------------------*/

export const M04_COMPREHENSION: DocumentComprehension = {
  docId: 'm04',
  title: 'M04 — ICAT JTBD Comunidad UDFJC',
  sections: [
    {
      heading: 'Marco JTBD aplicado a la reforma',
      anchor: 'marco-jtbd-aplicado-a-la-reforma',
      summary: 'Jobs-to-be-Done (Ulwick + Christensen) como lente para entender lo que cada rol "contrata" a la universidad.',
      question: {
        prompt: '¿Quiénes son los autores que originaron y popularizaron el marco Jobs-to-be-Done?',
        options: [
          'Steve Blank y Eric Ries',
          'Tony Ulwick y Clayton Christensen',
          'Geoffrey Moore y Peter Drucker',
          'Henry Etzkowitz y Burton Clark',
        ],
        correctIndex: 1,
        explain: 'Ulwick formalizó ODI (Outcome-Driven Innovation) y Christensen popularizó JTBD en su lectura del consumo.',
      },
    },
    {
      heading: 'Los 5 valores V1-V5',
      anchor: 'los-5-valores-v1-v5',
      summary: 'Cinco principios que articulan la propuesta de valor de la reforma desde la perspectiva del miembro de la CoP.',
      question: {
        prompt: '¿Cuáles son los 5 valores V1-V5 que articulan la reforma UDFJC?',
        options: [
          'Calidad, Equidad, Pertinencia, Eficiencia, Cobertura',
          'Soberanía, Emprendimiento, Participación, Ética, Austeridad',
          'Excelencia, Inclusión, Innovación, Solidaridad, Transparencia',
          'Investigación, Docencia, Extensión, Bienestar, Internacionalización',
        ],
        correctIndex: 1,
        explain: 'V1-V5 según el SEM-1 aprobado del Track B: Soberanía, Emprendimiento, Participación, Ética, Austeridad.',
      },
    },
    {
      heading: 'CoP como objeto de diseño',
      anchor: 'cop-como-objeto-de-diseno',
      summary: 'Wenger-Trayner: las comunidades de práctica como unidad social de aprendizaje.',
      question: {
        prompt: '¿Quiénes formalizaron el concepto de Comunidades de Práctica (CoP)?',
        options: [
          'Senge y Argyris',
          'Wenger y Lave',
          'Drucker y Schein',
          'Nonaka y Takeuchi',
        ],
        correctIndex: 1,
        explain: 'Lave y Wenger (1991) introducen el concepto desde la teoría del aprendizaje situado.',
      },
    },
  ],
};

export const M05_COMPREHENSION: DocumentComprehension = {
  docId: 'm05',
  title: 'M05 — Escuela Emprendedora Transformativa',
  sections: [
    {
      heading: 'Concepto CABA',
      anchor: 'concepto-caba',
      summary: 'Cohorte Activa de Buenas-prácticas Aplicadas — célula básica de la Escuela Emprendedora.',
      question: {
        prompt: '¿Qué significa CABA en el modelo M05 de Escuela Emprendedora Transformativa?',
        options: [
          'Comunidad Académica Básica de Aprendizaje',
          'Cohorte Activa de Buenas-prácticas Aplicadas',
          'Comité Asesor de Buenas Acciones',
          'Currículo de Aprendizaje Basado en Acción',
        ],
        correctIndex: 1,
        explain: 'CABA es la unidad operativa que materializa la práctica emprendedor-transformativa dentro de cada Escuela.',
      },
    },
    {
      heading: 'Salto N1 → N4 en la matriz Clark',
      anchor: 'salto-n1-n4-en-la-matriz-clark',
      summary: 'Clark (1998) describe niveles N1 (frágil) → N4 (extensión transformativa) en universidades emprendedoras.',
      question: {
        prompt: 'En la matriz de Burton Clark, el salto N1→N4 representa pasar de:',
        options: [
          'Universidad pequeña a grande',
          'Universidad frágil a extensión transformativa-solidaria',
          'Universidad pública a privada',
          'Universidad nacional a internacional',
        ],
        correctIndex: 1,
        explain: 'M05 §H reescribe el salto cuántico Clark adaptado al contexto colombiano y la reforma UDFJC.',
      },
    },
    {
      heading: 'Culture lag y benchmark BMK-001',
      anchor: 'culture-lag-y-benchmark-bmk-001',
      summary: 'Brecha entre cambios estructurales y cambios culturales en una IES — concepto central del benchmark de 21 IES.',
      question: {
        prompt: 'El concepto de "culture lag" en una IES describe:',
        options: [
          'Diferencia generacional entre profesores y estudiantes',
          'Brecha entre cambios estructurales y cambios culturales',
          'Demora en publicaciones académicas',
          'Atraso tecnológico de la institución',
        ],
        correctIndex: 1,
      },
    },
  ],
};

/* Notas del hilo Física — preguntas demo */

export const PRINCIPIOS_ESCUELA_EMP: DocumentComprehension = {
  docId: 'comunidades/formacion/escuelas/fisica/principios-escuela-emprendedora',
  title: 'Principios de la Escuela Emprendedora Transformativa en Física',
  sections: [
    {
      heading: 'Articulación de las tres misiones',
      anchor: 'articulacion-de-las-tres-misiones',
      summary: 'Docencia + investigación + extensión integradas en un solo paradigma.',
      question: {
        prompt: '¿Qué tres misiones articula la Escuela Emprendedora Transformativa de Física?',
        options: [
          'Pregrado + Posgrado + Educación continua',
          'Docencia + Investigación + Extensión bajo paradigma transformativo',
          'Teoría + Laboratorio + Industria',
          'Aulas + Bibliotecas + Sistemas',
        ],
        correctIndex: 1,
      },
    },
  ],
};

export const COMPREHENSION_REGISTRY: Record<string, DocumentComprehension> = {
  m04: M04_COMPREHENSION,
  m05: M05_COMPREHENSION,
  'comunidades/formacion/escuelas/fisica/principios-escuela-emprendedora': PRINCIPIOS_ESCUELA_EMP,
};

export function getComprehension(docId: string): DocumentComprehension | null {
  return COMPREHENSION_REGISTRY[docId] ?? null;
}
