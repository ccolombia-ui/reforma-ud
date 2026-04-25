export type TddStatus = 'red' | 'yellow' | 'green';

export type PaperMeta = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  crispPhase:
    | 'business'
    | 'data-understanding'
    | 'data-prep'
    | 'modeling'
    | 'evaluation'
    | 'deployment';
  status: TddStatus;
  href: string;
};

export const papers: PaperMeta[] = [
  {
    id: 'm01',
    number: 1,
    title: 'Mandato normativo CONPES 4069 + PIIOM + Acuerdo CSU 04/2025',
    shortTitle: 'Mandato normativo',
    description: 'Política Nacional CTI 2022-2031, misiones transformativas y autonomía universitaria.',
    crispPhase: 'business',
    status: 'red',
    href: '/papers/m01',
  },
  {
    id: 'm02',
    number: 2,
    title: 'Ciclo Virtuoso Universidad Innovadora',
    shortTitle: 'Ciclo Virtuoso',
    description: 'Clark · Etzkowitz · Geels — del N1 (frágil) al N4 (extensión transformativa).',
    crispPhase: 'business',
    status: 'red',
    href: '/papers/m02',
  },
  {
    id: 'm03',
    number: 3,
    title: 'Framework BSC-S + RBM-GAC v4',
    shortTitle: 'BSC-S + RBM-GAC',
    description: 'Strategy maps, Results-Based Management y VSM para gobernanza.',
    crispPhase: 'business',
    status: 'red',
    href: '/papers/m03',
  },
  {
    id: 'm04',
    number: 4,
    title: 'ICAT JTBD Comunidad UDFJC',
    shortTitle: 'ICAT JTBD',
    description: 'Jobs-to-be-Done por rol CoP — Soberanía, Emprendimiento, Participación, Ética, Austeridad.',
    crispPhase: 'data-understanding',
    status: 'red',
    href: '/papers/m04',
  },
  {
    id: 'm05',
    number: 5,
    title: 'BMK-001 Procesos Misionales 21 IES',
    shortTitle: 'BMK-001 21 IES',
    description: 'Benchmark 21 IES nacionales/internacionales — niveles N1-N4 y culture lag.',
    crispPhase: 'data-understanding',
    status: 'red',
    href: '/papers/m05',
  },
  {
    id: 'm06',
    number: 6,
    title: 'BMK-002 Modelo CCA — Créditos Académicos',
    shortTitle: 'BMK-002 CCA',
    description: 'CLR + Open Badges + UDL + UbD — Gantt 2026-2034 BPMN T1-T9.',
    crispPhase: 'data-understanding',
    status: 'red',
    href: '/papers/m06',
  },
  {
    id: 'm07',
    number: 7,
    title: '21 BPAs activadoras del consolidador',
    shortTitle: '21 BPAs',
    description: 'UROP MIT, Stanford OTL, Twente Novel-T y otras buenas prácticas R-Clark.',
    crispPhase: 'data-prep',
    status: 'red',
    href: '/papers/m07',
  },
  {
    id: 'm08',
    number: 8,
    title: 'Estándares internacionales (OECD, UDL, ABET, CDIO, ISO 21001)',
    shortTitle: 'Estándares',
    description: 'OECD Learning Compass, UDL 3.0, ABET, CDIO Syllabus, ISO 21001.',
    crispPhase: 'modeling',
    status: 'red',
    href: '/papers/m08',
  },
  {
    id: 'm09',
    number: 9,
    title: 'DS-PRESUPUESTO NICSP UDFJC',
    shortTitle: 'NICSP Presupuesto',
    description: 'Presupuesto público IES bajo NICSP — Resolución 533/2015 CGN.',
    crispPhase: 'modeling',
    status: 'red',
    href: '/papers/m09',
  },
  {
    id: 'm10',
    number: 10,
    title: 'TDABC para IES públicas',
    shortTitle: 'TDABC',
    description: 'Time-Driven Activity-Based Costing aplicado al costeo educativo público.',
    crispPhase: 'evaluation',
    status: 'red',
    href: '/papers/m10',
  },
  {
    id: 'm11',
    number: 11,
    title: 'Datasets MEN Colombia (SNIES + OLE + SPADIES)',
    shortTitle: 'Datasets MEN',
    description: 'Estadísticas educación superior, empleabilidad, deserción y permanencia.',
    crispPhase: 'evaluation',
    status: 'red',
    href: '/papers/m11',
  },
  {
    id: 'm12',
    number: 12,
    title: 'Hoja de ruta CRISP-DM integradora',
    shortTitle: 'Meta-paper CRISP-DM',
    description: 'Síntesis del corpus MI-12: 6 fases CRISP-DM aplicadas a la reforma UDFJC.',
    crispPhase: 'deployment',
    status: 'red',
    href: '/papers/m12',
  },
];

export const cops = [
  { id: 'estudiante',  emoji: '🎓', name: 'Estudiante',                href: '/cop/estudiante'  },
  { id: 'director',    emoji: '🏢', name: 'Director/a',                 href: '/cop/director'    },
  { id: 'disenador',   emoji: '🎨', name: 'Diseñador/a curricular',     href: '/cop/disenador'   },
  { id: 'formador',    emoji: '👨‍🏫', name: 'Formador/a (docente)',       href: '/cop/formador'    },
  { id: 'investigador', emoji: '🔬', name: 'Investigador/a',            href: '/cop/investigador' },
  { id: 'emprendedor', emoji: '🚀', name: 'Emprendedor/a académico/a',  href: '/cop/emprendedor' },
] as const;

export type CopId = typeof cops[number]['id'];
