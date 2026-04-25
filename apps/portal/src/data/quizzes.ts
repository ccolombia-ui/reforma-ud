// 48 preguntas de quiz · 4 por paper M01-M12
// Generadas a partir de los Gherkin acceptance criteria de cada paper (Specification by Example).
// Cada pregunta tiene 4 opciones; correctIndex marca la respuesta correcta (0-3).

export type Question = {
  q: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explain?: string;
};

export const quizzes: Record<string, Question[]> = {
  m01: [
    {
      q: '¿Cuál política nacional fija el marco para la reforma vinculante UDFJC?',
      options: ['CONPES 3527/2008', 'CONPES 4069/2021', 'Ley 1286/2009', 'Decreto 1330/2019'],
      correctIndex: 1,
      explain: 'CONPES 4069/2021 es la Política Nacional de CTI 2022-2031.',
    },
    {
      q: '¿Qué documento institucional UDFJC formaliza la reforma?',
      options: ['Acuerdo CSU 04/2025', 'Resolución 533/2015', 'Estatuto 03/2007', 'Acuerdo Académico 12/2020'],
      correctIndex: 0,
    },
    {
      q: 'La autonomía universitaria se sustenta en:',
      options: ['Art. 67 de la Constitución', 'Art. 69 de la Constitución + Ley 30/1992', 'Decreto 1295/2010', 'CONPES 4069'],
      correctIndex: 1,
    },
    {
      q: 'Las "misiones transformativas" del PIIOM se inspiran en:',
      options: ['Triple Helix de Etzkowitz', 'Mission-Oriented Innovation Policy (Mazzucato)', 'Mode 2 de Gibbons', 'Pasteur\'s Quadrant'],
      correctIndex: 1,
    },
  ],
  m02: [
    {
      q: '¿Quién es el autor de "Creating Entrepreneurial Universities" (1998), referente clave de M02?',
      options: ['Henry Etzkowitz', 'Burton Clark', 'Frank Geels', 'Mariana Mazzucato'],
      correctIndex: 1,
    },
    {
      q: 'En la Multi-Level Perspective de Geels, los "nichos" representan:',
      options: ['Mercados marginales', 'Espacios protegidos donde se desarrollan innovaciones radicales', 'Sectores económicos pequeños', 'Áreas rurales'],
      correctIndex: 1,
    },
    {
      q: 'El salto N1→N4 en la matriz de Clark significa pasar de:',
      options: ['Universidad pequeña a grande', 'Universidad frágil a extensión transformativa-solidaria', 'Universidad pública a privada', 'Universidad nacional a internacional'],
      correctIndex: 1,
    },
    {
      q: 'Triple Helix (Etzkowitz) describe la interacción entre:',
      options: ['Estudiantes, profesores y administración', 'Universidad, industria y gobierno', 'Pregrado, posgrado y educación continua', 'Docencia, investigación y extensión'],
      correctIndex: 1,
    },
  ],
  m03: [
    {
      q: 'BSC-S es la adaptación al sector público de:',
      options: ['Lean Six Sigma', 'Balanced Scorecard de Kaplan & Norton', 'OKRs', 'EFQM'],
      correctIndex: 1,
    },
    {
      q: 'RBM-GAC se origina en:',
      options: ['Project Management Institute', 'Global Affairs Canada (Results-Based Management)', 'OECD', 'Banco Mundial'],
      correctIndex: 1,
    },
    {
      q: 'El Viable System Model fue propuesto por:',
      options: ['Peter Drucker', 'Stafford Beer', 'W. Edwards Deming', 'Henri Fayol'],
      correctIndex: 1,
    },
    {
      q: 'Team Topologies (Skelton & Pais) define cuatro tipos de equipo, ¿cuál NO es uno de ellos?',
      options: ['Stream-aligned', 'Enabling', 'Complicated-subsystem', 'Hierarchical'],
      correctIndex: 3,
    },
  ],
  m04: [
    {
      q: 'JTBD (Jobs-to-be-Done) fue popularizado por:',
      options: ['Tony Ulwick y Clayton Christensen', 'Steve Blank', 'Eric Ries', 'Geoffrey Moore'],
      correctIndex: 0,
    },
    {
      q: 'ICAT en la reforma UDFJC organiza la comunidad alrededor de:',
      options: ['Productos académicos', 'Roles CoP y sus jobs-to-be-done', 'Departamentos administrativos', 'Programas curriculares'],
      correctIndex: 1,
    },
    {
      q: 'Las CoP (Communities of Practice) fueron formalizadas por:',
      options: ['Senge', 'Wenger y Lave', 'Drucker', 'Schein'],
      correctIndex: 1,
    },
    {
      q: 'Los 5 valores de la reforma (V1-V5) son:',
      options: ['Calidad, Equidad, Pertinencia, Eficiencia, Cobertura', 'Soberanía, Emprendimiento, Participación, Ética, Austeridad', 'Excelencia, Inclusión, Innovación, Solidaridad, Transparencia', 'Investigación, Docencia, Extensión, Bienestar, Internacionalización'],
      correctIndex: 1,
    },
  ],
  m05: [
    {
      q: '¿Qué es BMK-001 en el corpus MI-12?',
      options: ['Una BPA específica', 'Un benchmark de 21 IES con niveles N1-N4', 'Un decreto del MEN', 'Un indicador del SNIES'],
      correctIndex: 1,
    },
    {
      q: 'El "culture lag" en una IES describe:',
      options: ['Diferencia generacional entre profesores y estudiantes', 'Brecha entre cambios estructurales y cambios culturales', 'Demora en publicaciones académicas', 'Atraso tecnológico'],
      correctIndex: 1,
    },
    {
      q: 'Mode 3 Knowledge Production añade a Triple Helix la dimensión de:',
      options: ['Industria', 'Gobierno', 'Sociedad civil (Quadruple Helix)', 'Mercado'],
      correctIndex: 2,
    },
    {
      q: 'THE Impact Rankings evalúa universidades según:',
      options: ['Publicaciones académicas', 'Contribución a los Objetivos de Desarrollo Sostenible', 'Número de estudiantes internacionales', 'Presupuesto institucional'],
      correctIndex: 1,
    },
  ],
  m06: [
    {
      q: 'CCA en BMK-002 significa:',
      options: ['Comunidad Curricular Avanzada', 'Currículo Compartido y Articulado', 'Créditos de Conocimiento Acumulado', 'Capa de Currículo Articulado'],
      correctIndex: 3,
    },
    {
      q: 'Open Badges es un estándar de:',
      options: ['IEEE', '1EdTech / IMS Global', 'W3C', 'ISO'],
      correctIndex: 1,
    },
    {
      q: 'CLR (Comprehensive Learner Record) es:',
      options: ['Un sistema LMS', 'Estándar abierto para registro integral de aprendizaje', 'Una norma ABET', 'Un formato Excel'],
      correctIndex: 1,
    },
    {
      q: 'Understanding by Design (Wiggins & McTighe) propone:',
      options: ['Diseño centrado en el estudiante', 'Backward design — empezar por los resultados de aprendizaje', 'Aprendizaje basado en problemas', 'Flipped classroom'],
      correctIndex: 1,
    },
  ],
  m07: [
    {
      q: 'UROP (Undergraduate Research Opportunities Program) fue fundado en MIT por:',
      options: ['Margaret MacVicar (1969)', 'Charles Vest', 'Richard Feynman', 'Ed Roberts'],
      correctIndex: 0,
    },
    {
      q: 'Bayh-Dole Act (1980) habilitó en EE.UU.:',
      options: ['La acreditación universitaria', 'Que universidades patenten resultados de investigación financiada con fondos públicos', 'La regulación de matrículas', 'El sistema de tenure'],
      correctIndex: 1,
    },
    {
      q: 'El consolidador R-Clark agrupa BPAs en cuántas rutas?',
      options: ['3', '4', '5', '6'],
      correctIndex: 2,
      explain: '5 rutas: Gobernanza, Periferia, Sector, Misión, Cultura.',
    },
    {
      q: 'Twente Novel-T es referenciado por su capacidad de generar:',
      options: ['+50 patentes/año', '+1000 spin-offs universitarios', '+10 unicornios tecnológicos', '+200 publicaciones Q1/año'],
      correctIndex: 1,
    },
  ],
  m08: [
    {
      q: 'OECD Learning Compass 2030 articula competencias en torno a:',
      options: ['Knowledge, Skills, Attitudes & Values', 'Hard skills y soft skills', 'STEM y humanidades', 'Saber, saber-hacer y saber-ser'],
      correctIndex: 0,
    },
    {
      q: 'CDIO en educación en ingeniería significa:',
      options: ['Computing, Design, Implementation, Operations', 'Conceiving, Designing, Implementing, Operating', 'Curriculum, Discipline, Industry, Outcomes', 'Continuous Development & Innovation Outcomes'],
      correctIndex: 1,
    },
    {
      q: 'ISO 21001:2018 es un estándar para:',
      options: ['Gestión de la calidad genérica', 'Sistemas de gestión para organizaciones educativas', 'Acreditación de programas de ingeniería', 'Educación virtual'],
      correctIndex: 1,
    },
    {
      q: 'La Force Concept Inventory (FCI) de Hestenes mide:',
      options: ['Habilidades matemáticas', 'Comprensión conceptual de mecánica newtoniana', 'Razonamiento lógico', 'Habilidades experimentales'],
      correctIndex: 1,
    },
  ],
  m09: [
    {
      q: 'NICSP/IPSAS son normas de contabilidad para:',
      options: ['Sector privado', 'Sector público', 'Organizaciones sin ánimo de lucro', 'Bancos'],
      correctIndex: 1,
    },
    {
      q: 'La Resolución 533/2015 de la CGN adopta NICSP en Colombia para:',
      options: ['Empresas industriales del Estado', 'Entidades de gobierno', 'Hospitales privados', 'Cooperativas'],
      correctIndex: 1,
    },
    {
      q: 'El Decreto 111/1996 es:',
      options: ['Estatuto Orgánico del Presupuesto colombiano', 'Ley de regalías', 'Reforma tributaria', 'Ley de transparencia'],
      correctIndex: 0,
    },
    {
      q: 'CCP (Catálogo de Clasificación Presupuestal) lo administra:',
      options: ['MinHacienda', 'DNP', 'CGN', 'Banco de la República'],
      correctIndex: 1,
    },
  ],
  m10: [
    {
      q: 'TDABC fue desarrollado en 2004 por:',
      options: ['Robert Kaplan y Steven Anderson', 'Michael Porter', 'Peter Drucker', 'Eliyahu Goldratt'],
      correctIndex: 0,
    },
    {
      q: 'TDABC mejora ABC tradicional al usar:',
      options: ['Drivers de costo basados en transacciones', 'Ecuaciones de tiempo y capacidad práctica', 'Promedios históricos', 'Costos estándar'],
      correctIndex: 1,
    },
    {
      q: 'En IES, TDABC sirve principalmente para:',
      options: ['Calcular matrícula', 'Costear actividades misionales (docencia, investigación, extensión)', 'Liquidar nómina', 'Auditar contratos'],
      correctIndex: 1,
    },
    {
      q: 'La fórmula básica de TDABC es:',
      options: ['Costo = Volumen × Precio', 'Costo = Tasa × Tiempo de actividad', 'Costo = Fijos + Variables', 'Costo = ROI / Inversión'],
      correctIndex: 1,
    },
  ],
  m11: [
    {
      q: 'SNIES es:',
      options: ['Sistema Nacional de Información de la Educación Superior', 'Sistema Nacional de Inspección Escolar', 'Servicio Nacional de Indicadores Educativos Superiores', 'Sistema Nacional de Información Educativa y Social'],
      correctIndex: 0,
    },
    {
      q: 'OLE del MEN mide:',
      options: ['Permanencia estudiantil', 'Empleabilidad de graduados', 'Cobertura territorial', 'Calidad docente'],
      correctIndex: 1,
    },
    {
      q: 'SPADIES rastrea:',
      options: ['Acreditación de programas', 'Deserción y permanencia universitaria', 'Investigación y publicaciones', 'Internacionalización'],
      correctIndex: 1,
    },
    {
      q: 'OECD Education at a Glance permite comparar a Colombia con:',
      options: ['Solo países OECD', 'Países OECD + economías asociadas', 'Solo países latinoamericanos', 'Solo países desarrollados'],
      correctIndex: 1,
    },
  ],
  m12: [
    {
      q: 'CRISP-DM tiene cuántas fases?',
      options: ['4', '5', '6', '7'],
      correctIndex: 2,
      explain: '6 fases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment.',
    },
    {
      q: 'HEInnovate fue desarrollado por:',
      options: ['UNESCO', 'OECD y la Comisión Europea', 'Banco Mundial', 'World Economic Forum'],
      correctIndex: 1,
    },
    {
      q: 'M12 actúa como:',
      options: ['Una BPA más', 'Meta-paper que integra M01-M11 en una hoja de ruta', 'Un benchmark', 'Un dataset'],
      correctIndex: 1,
    },
    {
      q: 'La fase final de CRISP-DM en este proyecto se materializa en:',
      options: ['Un informe', 'Despliegue del portal reforma·ud y la implementación operativa', 'Una tesis doctoral', 'Una conferencia'],
      correctIndex: 1,
    },
  ],
};

export function calcMedal(correct: number, total: number): 'gold' | 'silver' | 'bronze' | null {
  if (total === 0) return null;
  const pct = correct / total;
  if (pct === 1) return 'gold';
  if (pct >= 0.8) return 'silver';
  if (pct >= 0.6) return 'bronze';
  return null;
}
