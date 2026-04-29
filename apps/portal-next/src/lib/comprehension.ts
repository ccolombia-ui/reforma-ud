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

export const M01_COMPREHENSION: DocumentComprehension = {
  docId: 'm01',
  title: 'M01 — Mandato Normativo',
  sections: [
    {
      heading: '§2.1 · Tres marcos de política de innovación',
      anchor: '21-tres-marcos-para-la-política-de-innovación-schot--steinmueller-2018',
      summary: 'Schot & Steinmueller (2018): Frame 1 = R&D, Frame 2 = Sistemas de Innovación, Frame 3 = Cambio Transformativo.',
      question: {
        prompt: '¿Cuál es la diferencia central entre Frame 2 (Sistemas de Innovación) y Frame 3 (Cambio Transformativo)?',
        options: [
          'Frame 2 financia I+D; Frame 3 conecta empresas y universidades',
          'Frame 2 pregunta cómo conectar actores; Frame 3 pregunta hacia dónde dirigir la innovación',
          'Frame 2 es público; Frame 3 solo aplica a Europa',
          'Frame 2 aplica a Colombia; Frame 3 es solo para universidades privadas',
        ],
        correctIndex: 1,
        explain: 'Frame 3 añade la pregunta de direccionalidad: innovación orientada hacia transformaciones sociotécnicas (pobreza, insostenibilidad), no solo crecimiento económico como en Frame 2.',
      },
    },
    {
      heading: '§4.4 · CONPES 4069 — Adopción de Frame 3 en Colombia',
      anchor: '44-conpes-40692021-política-nacional-cti-adopción-formal-de-frame-3',
      summary: 'El CONPES 4069/2021 adopta formalmente Frame 3 como paradigma rector de la Política Nacional CTI.',
      question: {
        prompt: '¿Qué instrumento de política pública adopta formalmente Frame 3 como paradigma rector de la CTI nacional colombiana?',
        options: [
          'Ley 30 de 1992',
          'Constitución Política Art. 69',
          'CONPES 4069 / 2021',
          'PIIOM 2022-2026',
        ],
        correctIndex: 2,
        explain: 'El CONPES 4069/2021 (Política Nacional de CTI) adopta explícitamente Frame 3, estableciendo misiones transformativas como eje de la CTI colombiana.',
      },
    },
    {
      heading: '§2.3 · Autonomía universitaria como instrumento',
      anchor: '23-jerarquía-normativa-multinivel-co-la-autonomía-como-instrumento',
      summary: 'Art. 69 CP: la autonomía universitaria es funcional e instrumental, no absoluta.',
      question: {
        prompt: 'Según §01, la autonomía universitaria del Art. 69 de la Constitución Política de Colombia es:',
        options: [
          'Un derecho absoluto que protege a la universidad de cualquier política del Estado',
          'Una capacidad instrumental orientada al cumplimiento de los deberes constitucionales',
          'Una garantía que aplica solo a universidades privadas',
          'Un principio sin consecuencias jurídicas prácticas',
        ],
        correctIndex: 1,
        explain: 'La autonomía es funcional e instrumental: limita interferencia política arbitraria pero no exime a la UDFJC de cumplir el marco normativo superior (CONPES 4069, PIIOM, Ley 30).',
      },
    },
    {
      heading: '§4.6 · PIIOM 2022-2026 — Las 5 Misiones Transformativas',
      anchor: '46-piiom-2022-2026-las-5-misiones-transformativas-como-mandato-operativo',
      summary: 'El PIIOM establece 5 misiones transformativas como mandato operativo para IES públicas.',
      question: {
        prompt: '¿Qué establece el PIIOM 2022-2026 para las IES públicas colombianas?',
        options: [
          'Un ranking de universidades por productividad investigativa',
          'Cinco misiones transformativas como mandato operativo de acción',
          'Un sistema de acreditación internacional voluntario',
          'Criterios de distribución presupuestal entre facultades',
        ],
        correctIndex: 1,
        explain: 'El PIIOM 2022-2026 operacionaliza el CONPES 4069 estableciendo 5 misiones transformativas concretas que las IES públicas deben implementar.',
      },
    },
  ],
};

/* ----------------------------------------------------------
 * M02 — Ciclo Virtuoso ΩMT
 * ---------------------------------------------------------*/

export const M02_COMPREHENSION: DocumentComprehension = {
  docId: 'm02',
  title: 'M02 — Ciclo Virtuoso ΩMT',
  sections: [
    {
      heading: 'Mode 1 → Mode 2 → Mode 3',
      anchor: '21-los-modos-de-produccion-del-conocimiento',
      summary: 'Evolución de los modos de producción del conocimiento: Mode 1 (disciplinario, jerárquico), Mode 2 (transdisciplinario, contextualizado), Mode 3 (ecosistema fractal, innovación como propiedad emergente).',
      question: {
        prompt: '¿Cuál es la diferencia fundamental entre Mode 2 y Mode 3 según Carayannis & Campbell?',
        options: [
          'Mode 2 es público y Mode 3 es privado',
          'Mode 2 produce conocimiento en contexto de aplicación; Mode 3 genera innovación como propiedad emergente sistémica',
          'Mode 2 es para ciencias sociales y Mode 3 para ciencias duras',
          'Mode 2 es antiguo y Mode 3 es el modelo más reciente propuesto en 2024',
        ],
        correctIndex: 1,
        explain: 'Mode 2 (Nowotny et al., 2003) enfatiza el conocimiento producido en contexto de aplicación. Mode 3 (Carayannis & Campbell, 2006) va más allá: la innovación no es un proceso añadido sino la propiedad emergente cuando formación, investigación y extensión se retroalimentan correctamente.',
      },
    },
    {
      heading: 'Las 5 vías de Clark',
      anchor: '23-la-universidad-emprendedora-clark-y-etzkowitz',
      summary: 'Burton Clark identificó cinco vías simultáneas de transformación universitaria: R1 Núcleo Directivo, R2 Periferia Expandida, R3 Financiamiento Diversificado, R4 Heartland Académico, R5 Cultura Emprendedora Integrada.',
      question: {
        prompt: 'Según Clark (1998), ¿cuál de las 5 vías es simultáneamente resultado y precondición de las demás?',
        options: [
          'R1 — Núcleo Directivo Fortalecido',
          'R3 — Financiamiento Diversificado',
          'R5 — Cultura Emprendedora Integrada',
          'R4 — Heartland Académico Estimulado',
        ],
        correctIndex: 2,
        explain: 'R5 (Cultura Emprendedora) es la vía más relevante y difícil según Clark. Es resultado de activar R1-R4, pero también es precondición para que las otras vías perduren. Sin cultura emprendedora, las estructuras nuevas generan "departamentalización del emprendimiento" que fracasa.',
      },
    },
    {
      heading: 'MLP de Geels — Tres niveles',
      anchor: '24-perspectiva-multi-nivel-mlp-geels',
      summary: 'La Perspectiva Multi-Nivel (MLP) de Geels explica transiciones sociotécnicas mediante tres niveles: Paisaje (macro-contexto), Régimen Dominante (sistema actual), y Nichos Transformativos (espacios protegidos de innovación radical).',
      question: {
        prompt: 'En el modelo MLP de Geels, ¿qué son los "Nichos Transformativos"?',
        options: [
          'Los departamentos más innovadores de la universidad',
          'Espacios protegidos donde surgen innovaciones radicales que desafían el régimen dominante',
          'Los países con mayor inversión en I+D',
          'Las áreas de investigación básica sin aplicación práctica',
        ],
        correctIndex: 1,
        explain: 'Los Nichos Transformativos son espacios protegidos (ej. CABAs, semilleros transdisciplinarios, living labs) donde surgen innovaciones radicales. Pueden generar cambios en cascada que transforman el régimen dominante, especialmente cuando hay presión del paisaje (ej. CONPES 4069).',
      },
    },
    {
      heading: 'Frame 3 — Cambio Transformativo',
      anchor: '25-tres-marcos-de-politica-de-innovacion-schot--steinmueller',
      summary: 'Schot & Steinmueller proponen tres frames: Frame 1 (R&D, lineal), Frame 2 (Sistemas de Innovación, conexión de actores), Frame 3 (Cambio Transformativo, direccionalidad hacia misiones).',
      question: {
        prompt: '¿Cuál es la pregunta rectora del Frame 3 de política de innovación según Schot & Steinmueller?',
        options: [
          '¿Cómo producir más ciencia?',
          '¿Cómo conectar actores del ecosistema?',
          '¿Hacia dónde dirigir la innovación?',
          '¿Cuánto invertir en I+D?',
        ],
        correctIndex: 2,
        explain: 'Frame 1 pregunta "¿cómo producir más ciencia?" (lineal). Frame 2 pregunta "¿cómo conectar actores?" (sistemas). Frame 3 pregunta "¿hacia dónde dirigir la innovación?" — introduciendo la dimensión de direccionalidad hacia transformaciones sociotécnicas.',
      },
    },
  ],
};

/* ----------------------------------------------------------
 * M03 — Estándares Internacionales
 * ---------------------------------------------------------*/

export const M03_COMPREHENSION: DocumentComprehension = {
  docId: 'm03',
  title: 'M03 — Estándares Internacionales para la Calidad Educativa',
  sections: [
    {
      heading: 'Cuadrante Pasteur',
      anchor: '21-el-cuadrante-pasteur-eje-epistemologico-transversal',
      summary: 'El Cuadrante Pasteur de Stokes (1997) define investigación inspirada por uso (use-inspired research) que busca entendimiento fundamental Y consideración de uso.',
      question: {
        prompt: '¿Qué es el Cuadrante Pasteur según Stokes (1997)?',
        options: [
          'Un modelo de acreditación de programas de ingeniería',
          'Investigación que busca entendimiento fundamental Y consideración de uso',
          'Un sistema de gestión de calidad para universidades',
          'Un marco de diseño curricular universal',
        ],
        correctIndex: 1,
        explain: 'Stokes (1997) propone el Cuadrante Pasteur como investigación que integra dos dimensiones: búsqueda de entendimiento fundamental (como Bohr) y consideración de uso (como Edison). Es el eje epistemológico transversal de la formación universitaria orientada a Frame 3.',
      },
    },
    {
      heading: 'Sistema de acreditación multi-nivel',
      anchor: '22-sistema-de-acreditacion-multi-nivel',
      summary: 'Cuatro capas de estándares: (i) Aspiracional (OECD Learning Compass), (ii) Epistemológica (Cuadrante Pasteur, MIT UROP), (iii) Disciplinar (ABET, CDIO, TUNING-AL), (iv) Gestión institucional (ISO 21001).',
      question: {
        prompt: '¿Cuál de los siguientes estándares pertenece a la capa "Disciplinar" del sistema multi-nivel?',
        options: [
          'OECD Learning Compass 2030',
          'ISO 21001:2018',
          'ABET EAC/CAC/ETAC/ANSAC',
          'MIT UROP',
        ],
        correctIndex: 2,
        explain: 'ABET pertenece a la capa Disciplinar (acredita programas específicos). OECD Learning Compass es Aspiracional, ISO 21001 es Gestión institucional, MIT UROP es Epistemológica (modelo de investigación creditizada).',
      },
    },
    {
      heading: 'UDL 3.0 — Universal Design for Learning',
      anchor: '42-std-02-udl-30-universal-design-for-learning',
      summary: 'UDL 3.0 (CAST, 2024) es el estándar de diseño universal para el aprendizaje, aplicable a educación inclusiva según Decreto 1421/2017 colombiano.',
      question: {
        prompt: '¿Qué significa UDL en el contexto de estándares educativos?',
        options: [
          'Unified Digital Learning — aprendizaje digital unificado',
          'Universal Design for Learning — diseño universal para el aprendizaje',
          'User-Driven Learning — aprendizaje impulsado por el usuario',
          'Unified Data Layer — capa de datos unificada',
        ],
        correctIndex: 1,
        explain: 'UDL (Universal Design for Learning) es un framework del CAST para diseñar instrucción accesible y flexible. La versión 3.0 (2024) es referente para accesibilidad curricular y se articula con el Decreto 1421/2017 de educación inclusiva en Colombia.',
      },
    },
    {
      heading: 'CDIO Syllabus v3.0',
      anchor: '47-std-06b-cdio-syllabus-v30',
      summary: 'CDIO (Conceive-Design-Implement-Operate) es un estándar para ingeniería que estructura currículo en 12 estándares organizados en 4 fases: Conceive, Design, Implement, Operate.',
      question: {
        prompt: '¿Qué significa CDIO en el contexto de estándares de ingeniería?',
        options: [
          'Conceive-Design-Implement-Operate',
          'Curricular Development and Instructional Outcomes',
          'Comprehensive Design for Industrial Optimization',
          'Collaborative Development of International Organizations',
        ],
        correctIndex: 0,
        explain: 'CDIO son las siglas de Conceive-Design-Implement-Operate (Concebir-Diseñar-Implementar-Operar). Es un estándar internacional para educación en ingeniería desarrollado por MIT y universidades suecas, con 12 estándares que cubren desde contexto hasta desarrollo de competencias.',
      },
    },
  ],
};

/* ----------------------------------------------------------
 * M06 — Modelo CCA
 * ---------------------------------------------------------*/

export const M06_COMPREHENSION: DocumentComprehension = {
  docId: 'm06',
  title: 'M06 — BMK-002 Créditos Académicos: El Modelo CCA',
  sections: [
    {
      heading: 'Concepto CCA',
      anchor: '0-abstract-y-metas-de-aprendizaje',
      summary: 'CCA (Competencia-Conocimiento-Atómica) es la unidad mínima indivisible que certifica simultáneamente tres dimensiones: V1 Comprensiva, V2 Experimental, V3 Transformativa.',
      question: {
        prompt: '¿Qué significa CCA en el modelo de créditos académicos de la reforma UDFJC?',
        options: [
          'Crédito Curricular Aprobado',
          'Competencia-Conocimiento-Atómica',
          'Certificación de Calidad Académica',
          'Currículo de Conocimiento Aplicado',
        ],
        correctIndex: 1,
        explain: 'CCA es Competencia-Conocimiento-Atómica: la unidad mínima indivisible que certifica simultáneamente tres dimensiones (V1 Comprensiva, V2 Experimental, V3 Transformativa) en 16 semanas con evidencias integradas.',
      },
    },
    {
      heading: 'V1 ∧ V2 ∧ V3 — Las tres dimensiones',
      anchor: '4-modelo-cca-arquitectura',
      summary: 'Cada Paquete CCA integra V1 (Comprensiva — Escuela), V2 (Experimental — Instituto), V3 (Transformativa — Centro). Se evalúa en bloque: si una dimensión falla, el CCA no se otorga.',
      question: {
        prompt: 'En el modelo CCA, ¿qué ocurre si un estudiante cumple V1 y V2 pero no V3?',
        options: [
          'Recibe certificación parcial de 2/3 del CCA',
          'No recibe el CCA (no hay certificación parcial)',
          'Puede compensar V3 con trabajo extra de V1',
          'Recibe créditos equivalentes a V1+V2 nada más',
        ],
        correctIndex: 1,
        explain: 'El CCA se evalúa en bloque con la regla lógica V1 ∧ V2 ∧ V3 (AND lógico). Si una dimensión falla, el CCA completo no se otorga. No existe certificación parcial: la integración de las tres funciones misionales es el principio fundamental.',
      },
    },
    {
      heading: 'Dublin Descriptors + Cuadrante Pasteur',
      anchor: '2-marco-teorico-dublin-descriptors--cuadrante-pasteur--cca',
      summary: 'Los Dublin Descriptors (Bologna Process) definen niveles de cualificación EHEA. El Cuadrante Pasteur (Stokes, 1997) define investigación inspirada por uso. El CCA sintetiza ambos.',
      question: {
        prompt: '¿Qué marco normativo colombiano permite reinterpretar los créditos CCA sin cambio legislativo nacional?',
        options: [
          'Ley 30 de 1992',
          'Decreto MEN 1330/2019',
          'CONPES 4069/2021',
          'Acuerdo CSU 04/2025',
        ],
        correctIndex: 1,
        explain: 'El Decreto MEN 1330/2019 establece que 1 crédito = 48 horas de trabajo académico total. Permite creditizar investigación y extensión, pero la práctica institucional rara vez lo aprovecha. El CCA reinterpreta este decreto sin requerir cambio normativo nacional.',
      },
    },
    {
      heading: 'Open Badges + CLR + xAPI',
      anchor: '3-hallazgos-del-benchmarking-bmk-002-11-ies',
      summary: 'La capa tecnológica del CCA usa xAPI 2.0 (trazabilidad granular), Open Badges 3.0 (certificación atómica verificable), y CLR 2.0 (portafolio integral portátil entre instituciones).',
      question: {
        prompt: '¿Qué estándar tecnológico permite la portabilidad de credenciales CCA entre instituciones?',
        options: [
          'SCORM 1.2',
          'Open Badges 3.0 + CLR 2.0',
          'LMS Blackboard',
          'PDF firmado digitalmente',
        ],
        correctIndex: 1,
        explain: 'Open Badges 3.0 (1EdTech/IMS Global) permite certificación atómica verificable públicamente. CLR 2.0 (Comprehensive Learner Record) es el portafolio integral interoperable basado en W3C Verifiable Credentials. Juntos permiten portabilidad entre instituciones.',
      },
    },
  ],
};

/* ----------------------------------------------------------
 * M07 — 21 Buenas Prácticas Adoptables
 * ---------------------------------------------------------*/

export const M07_COMPREHENSION: DocumentComprehension = {
  docId: 'm07',
  title: 'M07 — BPA-001: 21 Buenas Prácticas Adoptables',
  sections: [
    {
      heading: 'Las 21 BPAs por función misional',
      anchor: '1-las-21-bpas',
      summary: 'Las 21 Buenas Prácticas Adoptables se organizan: F01-F05 (5 BPAs Formación), I01-I05 (5 BPAs Investigación), E01-E04 (4 BPAs Extensión), INT01-INT07 (7 BPAs Integración/Living-Labs).',
      question: {
        prompt: '¿Cuántas Buenas Prácticas Adoptables (BPAs) de integración/living-labs existen en el modelo M07?',
        options: [
          '4 BPAs',
          '5 BPAs',
          '7 BPAs',
          '21 BPAs en total',
        ],
        correctIndex: 2,
        explain: 'Las 21 BPAs se distribuyen: 5 de Formación (F01-F05), 5 de Investigación (I01-I05), 4 de Extensión (E01-E04), y 7 de Integración/Living-Labs (INT01-INT07).',
      },
    },
    {
      heading: 'Matriz de retroalimentaciones R1-R6',
      anchor: '2-figuras-y-diagramas-26-mermaids',
      summary: 'Las seis retroalimentaciones R1-R6 conectan las tres funciones misionales: R1 (Semilleros), R2 (Currículo Vivo), R3 (Transferencia), R4 (Problemas Reales), R5 (Aprendizaje Experiencial), R6 (Egresados Agentes).',
      question: {
        prompt: '¿Qué retroalimentación R4 representa en el ciclo virtuoso?',
        options: [
          'Semilleros de investigación en currículo',
          'Problemas reales del territorio alimentan investigación',
          'Transferencia de tecnología a extensión',
          'Egresados como agentes de transformación',
        ],
        correctIndex: 1,
        explain: 'R4 es la retroalimentación "Problemas Reales": la extensión (PM3) trae problemas del territorio que alimentan la investigación (PM2). Es una de las seis retroalimentaciones bidireccionales del ciclo virtuoso.',
      },
    },
    {
      heading: 'RBM-GAC — Árbol de problemas',
      anchor: '2-figuras-y-diagramas-26-mermaids',
      summary: 'Cada BPA contiene un árbol de problemas construido con RBM-GAC (Results-Based Management + Government Action Cycle) que mapea causas directas e indirectas del problema central.',
      question: {
        prompt: '¿Qué metodología se usa para construir los árboles de problemas en las BPAs del M07?',
        options: [
          'Lean Startup Canvas',
          'RBM-GAC (Results-Based Management + Government Action Cycle)',
          'Design Thinking Double Diamond',
          'Business Model Canvas',
        ],
        correctIndex: 1,
        explain: 'RBM-GAC combina el Enfoque de Gestión por Resultados (RBM) con el Ciclo de Acción Gubernamental (GAC) de la Función Pública. Permite mapear causas directas (4 comportamientos ausentes) e indirectas (5 capacidades ausentes) del problema central.',
      },
    },
    {
      heading: 'CABAs como marketplace UROP',
      anchor: '2-figuras-y-diagramas-26-mermaids',
      summary: 'Los CABAs (Comunidades Académicas de Base) operan como marketplace de oportunidades UROP (Undergraduate Research Opportunities Program), conectando estudiantes con proyectos de investigación creditizados.',
      question: {
        prompt: '¿Qué problema central identifica M07 respecto a la investigación creditizada en pregrado UDFJC?',
        options: [
          'Falta de laboratorios equipados',
          '<5% estudiantes pregrado investigan creditizadamente (vs ~90% en MIT)',
          'Ausencia de grupos de investigación',
          'Sin presupuesto para investigación básica',
        ],
        correctIndex: 1,
        explain: 'El árbol de problemas de M07 (Fig-MI12-77) identifica que menos del 5% de estudiantes de pregrado investigan creditizadamente en UDFJC, versus aproximadamente 90% en MIT. Las causas incluyen syllabus que no reconocen UROP, grupos con pocos voluntarios, y CABAs que no orquestan UROP cross-programa.',
      },
    },
  ],
};

export const COMPREHENSION_REGISTRY: Record<string, DocumentComprehension> = {
  m01: M01_COMPREHENSION,
  m02: M02_COMPREHENSION,
  m03: M03_COMPREHENSION,
  m04: M04_COMPREHENSION,
  m05: M05_COMPREHENSION,
  m06: M06_COMPREHENSION,
  m07: M07_COMPREHENSION,
  'comunidades/formacion/escuelas/fisica/principios-escuela-emprendedora': PRINCIPIOS_ESCUELA_EMP,
};

export function getComprehension(docId: string): DocumentComprehension | null {
  return COMPREHENSION_REGISTRY[docId] ?? null;
}
