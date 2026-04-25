// Multimedia curado por M## — fuente: B.2 dossier (resultado-consolidados)
// 56 videos + 72 artículos · 38 [VERIF] · 90 [CAND]

export type Verified = 'VERIF' | 'CAND' | 'FALLBACK';

export type Video = {
  title: string;
  author: string;
  duration?: string;
  url: string;
  relevance: string;
  verified: Verified;
};

export type Article = {
  title: string;
  authors: string;
  year: number | string;
  source: string;
  url: string;
  verified: Verified;
};

export type PaperMedia = { videos: Video[]; articles: Article[] };

export const multimedia: Record<string, PaperMedia> = {
  m01: {
    videos: [
      { title: 'Presentación CONPES 4069 Política Nacional CTI 2022-2031', author: 'Minciencias Colombia', duration: '45-60 min', url: 'https://www.youtube.com/results?search_query=CONPES+4069+Minciencias', relevance: 'Presentación oficial con preguntas y respuestas a la comunidad académica.', verified: 'CAND' },
      { title: 'Three frames for innovation policy — Johan Schot', author: 'TIPC Utrecht', duration: '30-45 min', url: 'https://www.youtube.com/results?search_query=Johan+Schot+TIPC+Transformative+Innovation', relevance: 'Marco teórico transformative innovation adoptado por CONPES 4069.', verified: 'CAND' },
      { title: 'Misiones Transformativas PIIOM explicadas', author: 'Minciencias Colombia', duration: '15-30 min', url: 'https://www.youtube.com/results?search_query=PIIOM+misiones+transformativas', relevance: 'Contexto directo de las 5 misiones que alimentan la reforma UDFJC.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Documento CONPES 4069: Política Nacional CTI 2022-2031', authors: 'DNP Colombia', year: 2021, source: 'DNP — documento oficial', url: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Económicos/4069.pdf', verified: 'VERIF' },
      { title: 'Three frames for innovation policy: R&D, systems of innovation and transformative change', authors: 'Schot, J. & Steinmueller, W.E.', year: 2018, source: 'Research Policy 47(9)', url: 'https://doi.org/10.1016/j.respol.2018.08.011', verified: 'VERIF' },
      { title: 'Acuerdo CSU 04/2025 UDFJC', authors: 'Consejo Superior Universitario UDFJC', year: 2025, source: 'UDFJC oficial', url: 'https://sgral.udistrital.edu.co/xdata/ca/acu_2025-004.pdf', verified: 'VERIF' },
      { title: 'Ley 30 de 1992 — Educación Superior Colombia', authors: 'Congreso de la República', year: 1992, source: 'Función Pública', url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=253', verified: 'VERIF' },
    ],
  },
  m02: {
    videos: [
      { title: 'Henry Etzkowitz — Triple Helix and the Entrepreneurial University', author: 'Triple Helix Association', duration: '45-60 min', url: 'https://www.youtube.com/results?search_query=henry+etzkowitz+triple+helix', relevance: 'Arquetipo moderno de la universidad emprendedora.', verified: 'CAND' },
      { title: 'Frank Geels — Multi-Level Perspective on sociotechnical transitions', author: 'SPRU Sussex', duration: '40-60 min', url: 'https://www.youtube.com/results?search_query=Frank+Geels+MLP+sociotechnical', relevance: 'Marco teórico del salto cuántico N1→N4 vía nichos.', verified: 'CAND' },
      { title: 'Aalto Design Factory — Tour & philosophy', author: 'Aalto University', duration: '10-20 min', url: 'https://designfactory.aalto.fi/', relevance: 'Implementación del modelo de universidad emprendedora moderno.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Creating Entrepreneurial Universities: Organizational Pathways of Transformation', authors: 'Clark, B.R.', year: 1998, source: 'Pergamon / IAU', url: 'https://doi.org/10.1023/A:1003771309048', verified: 'VERIF' },
      { title: 'Technological transitions as evolutionary reconfiguration processes', authors: 'Geels, F.W.', year: 2002, source: 'Research Policy 31(8-9)', url: 'https://doi.org/10.1016/S0048-7333(02)00062-8', verified: 'VERIF' },
      { title: 'The entrepreneurial university: An idea for its time', authors: 'Gjerding, A.N. et al.', year: 2006, source: 'Higher Education', url: 'https://www.researchgate.net/publication/232942166', verified: 'VERIF' },
    ],
  },
  m03: {
    videos: [
      { title: 'Robert Kaplan on Strategy Maps and Balanced Scorecard', author: 'HBS Working Knowledge', duration: '30-60 min', url: 'https://www.youtube.com/results?search_query=Kaplan+Strategy+Maps+HBR', relevance: 'Autor del marco BSC que alimenta BSC-S.', verified: 'CAND' },
      { title: 'Stafford Beer — The Viable System Model in 5 minutes', author: 'Cybernetic Society', duration: '5-10 min', url: 'https://www.youtube.com/results?search_query=Stafford+Beer+VSM', relevance: 'Modelo de gobernanza aplicado en POC v4.2 §6.', verified: 'CAND' },
      { title: 'Team Topologies explained — Matthew Skelton', author: 'QCon / DevOpsCon', duration: '30-45 min', url: 'https://www.youtube.com/results?search_query=Team+Topologies+Matthew+Skelton', relevance: 'Marco complementario a VSM Beer.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Strategy Maps: Converting Intangible Assets into Tangible Outcomes', authors: 'Kaplan, R. & Norton, D.', year: 2004, source: 'Harvard Business School Press', url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=14685', verified: 'CAND' },
      { title: 'Results-Based Management Handbook', authors: 'Global Affairs Canada', year: 2016, source: 'Government of Canada', url: 'https://www.international.gc.ca/world-monde/funding-financement/results_based_management-gestion_axee_resultats/index.aspx', verified: 'VERIF' },
      { title: 'Team Topologies: Organizing Business and Technology Teams for Fast Flow', authors: 'Skelton, M. & Pais, M.', year: 2019, source: 'IT Revolution', url: 'https://teamtopologies.com/', verified: 'VERIF' },
    ],
  },
  m04: {
    videos: [
      { title: 'Tony Ulwick on airfocus Top PM Voices webinar', author: 'airfocus', duration: '45-60 min', url: 'https://airfocus.com/blog/jobs-to-be-done-outcome-driven-innovation-ulwick/', relevance: 'Explicación directa del autor de las 4 dimensiones JTBD + ODI.', verified: 'VERIF' },
      { title: 'Wenger-Trayner — Communities of Practice introduction', author: 'Wenger-Trayner', duration: '15-30 min', url: 'https://www.wenger-trayner.com/introduction-to-communities-of-practice/', relevance: 'Base conceptual para la comunidad de práctica que ICAT habilita.', verified: 'VERIF' },
      { title: 'Strategyn ODI 5-step process walkthrough', author: 'Strategyn', duration: '10-30 min', url: 'https://strategyn.com/jobs-to-be-done/', relevance: 'Proceso paso a paso operativo ODI.', verified: 'VERIF' },
    ],
    articles: [
      { title: 'Jobs to be Done: Theory to Practice', authors: 'Ulwick, A.W.', year: 2016, source: 'IDEA BITE Press', url: 'https://jobs-to-be-done-book.com/', verified: 'VERIF' },
      { title: 'Mapping the Job-to-be-Done (Universal Job Map)', authors: 'Ulwick, A.W.', year: 2020, source: 'Medium / JTBD+ODI', url: 'https://jobs-to-be-done.com/mapping-the-job-to-be-done-45336427b3bc', verified: 'VERIF' },
      { title: 'Communities of Practice: A Brief Introduction', authors: 'Wenger-Trayner, E. & B.', year: 2015, source: 'wenger-trayner.com', url: 'https://www.wenger-trayner.com/introduction-to-communities-of-practice/', verified: 'VERIF' },
    ],
  },
  m05: {
    videos: [
      { title: 'Aalto University — One University, Multiple Schools', author: 'Aalto', duration: '10-20 min', url: 'https://www.youtube.com/results?search_query=Aalto+University+Schools+model', relevance: 'Caso N3-N4 con masa crítica inter-escuela.', verified: 'CAND' },
      { title: 'Twente — Kennispark innovation ecosystem', author: 'University of Twente', duration: '15-30 min', url: 'https://www.youtube.com/results?search_query=Twente+Kennispark+entrepreneurial', relevance: 'Caso N4 extensión transformativa.', verified: 'CAND' },
      { title: 'THE Impact Rankings — methodology', author: 'Times Higher Education', duration: '10-20 min', url: 'https://www.timeshighereducation.com/rankings/impact', relevance: 'Métrica internacional que UDFJC aspira a entrar.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Dynamics of Innovation: Triple Helix of University-Industry-Government', authors: 'Etzkowitz & Leydesdorff', year: 2000, source: 'Research Policy', url: 'https://doi.org/10.1016/S0048-7333(99)00055-4', verified: 'VERIF' },
      { title: 'Mode 3 Knowledge Production in Quadruple Helix Innovation Systems', authors: 'Carayannis & Campbell', year: 2012, source: 'Springer Briefs', url: 'https://link.springer.com/book/10.1007/978-1-4614-2062-0', verified: 'VERIF' },
      { title: 'THE Impact Rankings Methodology', authors: 'Times Higher Education', year: 2024, source: 'THE oficial', url: 'https://www.timeshighereducation.com/impactrankings', verified: 'VERIF' },
    ],
  },
  m06: {
    videos: [
      { title: 'IMS Global — Comprehensive Learner Record (CLR) introduction', author: '1EdTech', duration: '15-30 min', url: 'https://www.1edtech.org/standards/clr', relevance: 'Estándar CLR base del modelo CCA.', verified: 'CAND' },
      { title: 'Open Badges 3.0 — What\'s new', author: '1EdTech / Badge Summit', duration: '30-45 min', url: 'https://www.1edtech.org/standards/open-badges', relevance: 'Capa tecnológica del Paquete CCA.', verified: 'CAND' },
      { title: 'CAST UDL 3.0 Guidelines explained', author: 'CAST', duration: '20-40 min', url: 'https://udlguidelines.cast.org/', relevance: 'Metodología didáctica integrada en CCA.', verified: 'CAND' },
      { title: 'Understanding by Design (Wiggins & McTighe)', author: 'ASCD', duration: '30-45 min', url: 'https://www.youtube.com/results?search_query=Wiggins+McTighe+Understanding+by+Design', relevance: 'Base del backward design del Diseñador/a.', verified: 'CAND' },
    ],
    articles: [
      { title: 'IMS Global Comprehensive Learner Record Standard', authors: '1EdTech', year: 2023, source: '1EdTech oficial', url: 'https://www.1edtech.org/standards/clr', verified: 'VERIF' },
      { title: 'Open Badges 3.0 Specification', authors: '1EdTech', year: 2023, source: '1EdTech oficial', url: 'https://www.1edtech.org/standards/open-badges', verified: 'VERIF' },
      { title: 'CAST UDL Guidelines v3.0', authors: 'CAST', year: 2024, source: 'CAST oficial', url: 'https://udlguidelines.cast.org/', verified: 'VERIF' },
      { title: 'OECD Learning Compass 2030', authors: 'OECD', year: 2019, source: 'OECD oficial', url: 'https://www.oecd.org/education/2030-project/', verified: 'VERIF' },
    ],
  },
  m07: {
    videos: [
      { title: 'MIT UROP — 50 años de historia', author: 'MIT Alumni', duration: '10-20 min', url: 'https://alum.mit.edu/slice/fifty-years-urop-stories', relevance: 'Caso arquetípico de BP-I01 UROP.', verified: 'VERIF' },
      { title: 'The Legacy of UROP', author: 'MIT Technology Review', duration: 'artículo', url: 'https://www.technologyreview.com/2026/02/24/1132194/the-legacy-of-urop/', relevance: 'Análisis reciente del impacto.', verified: 'VERIF' },
      { title: 'Margaret MacVicar — fundadora UROP', author: 'MIT News', duration: 'artículo + video', url: 'https://news.mit.edu/2017/exploring-the-impact-of-margaret-macvicar-legacy-urop-undergraduate-research-0406', relevance: 'Historia de la fundadora del concepto.', verified: 'VERIF' },
    ],
    articles: [
      { title: 'About MIT UROP (historia 1969)', authors: 'MIT UROP oficial', year: 'vigente', source: 'MIT', url: 'https://urop.mit.edu/about/', verified: 'VERIF' },
      { title: 'MIT UROP 30 aniversario — MIT News 2000', authors: 'MIT News Office', year: 2000, source: 'MIT', url: 'https://news.mit.edu/2000/urop-0202', verified: 'VERIF' },
      { title: 'Democratizing the lab (evolución UROP 2019)', authors: 'MIT Tech Review', year: 2019, source: 'MIT', url: 'https://www.technologyreview.com/2019/12/27/131294/democratizing-the-lab/', verified: 'VERIF' },
      { title: 'Bayh-Dole Act 1980 (origen PI inventor-friendly US)', authors: 'US Congress', year: 1980, source: 'Public Law 96-517', url: 'https://www.uspto.gov/ip-policy/patent-policy/bayh-dole-act', verified: 'VERIF' },
    ],
  },
  m08: {
    videos: [
      { title: 'OECD Learning Compass 2030 explained', author: 'OECD', duration: '15-30 min', url: 'https://www.oecd.org/education/2030-project/', relevance: 'Marco de competencias 2030.', verified: 'CAND' },
      { title: 'ABET Accreditation — What is ABET?', author: 'ABET', duration: '20-40 min', url: 'https://www.abet.org/accreditation/', relevance: 'Acreditación de programas de ingeniería.', verified: 'CAND' },
      { title: 'CDIO Initiative — Conceiving, Designing, Implementing, Operating', author: 'CDIO', duration: '15-30 min', url: 'http://www.cdio.org/', relevance: 'Marco curricular en ingeniería.', verified: 'CAND' },
      { title: 'ISO 21001:2018 — Educational Organizations Management', author: 'ISO', duration: '30-45 min', url: 'https://www.iso.org/standard/66266.html', relevance: 'Norma ISO certificable para IES.', verified: 'CAND' },
    ],
    articles: [
      { title: 'OECD Learning Compass 2030 Conceptual Learning Framework', authors: 'OECD', year: 2019, source: 'OECD oficial', url: 'https://www.oecd.org/education/2030-project/', verified: 'VERIF' },
      { title: 'Universal Design for Learning Guidelines 3.0', authors: 'CAST', year: 2024, source: 'CAST oficial', url: 'https://udlguidelines.cast.org/', verified: 'VERIF' },
      { title: 'ABET Criteria for Accrediting Engineering Programs 2024-2025', authors: 'ABET', year: 2024, source: 'ABET oficial', url: 'https://www.abet.org/accreditation/accreditation-criteria/', verified: 'VERIF' },
      { title: 'CDIO Syllabus v3.0', authors: 'CDIO Initiative', year: 2020, source: 'CDIO oficial', url: 'http://www.cdio.org/cdio-syllabus', verified: 'VERIF' },
      { title: 'Force concept inventory', authors: 'Hestenes, D., Wells, M., Swackhamer, G.', year: 1992, source: 'The Physics Teacher 30(3)', url: 'https://doi.org/10.1119/1.2343497', verified: 'VERIF' },
    ],
  },
  m09: {
    videos: [
      { title: 'NICSP / IPSAS — Introduction', author: 'IPSAS Board / IFAC', duration: '30-45 min', url: 'https://www.ipsasb.org/', relevance: 'Marco contable público internacional.', verified: 'CAND' },
      { title: 'Resolución 533/2015 CGN explicada', author: 'Contaduría General de la Nación', duration: '20-40 min', url: 'https://www.contaduria.gov.co/', relevance: 'Adopción NICSP en Colombia.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Decreto 111/1996 Estatuto Orgánico del Presupuesto', authors: 'Gobierno de Colombia', year: 1996, source: 'Función Pública', url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5306', verified: 'VERIF' },
      { title: 'Resolución 533 de 2015 CGN (NICSP entidades gobierno)', authors: 'CGN Colombia', year: 2015, source: 'CGN oficial', url: 'https://www.contaduria.gov.co/', verified: 'VERIF' },
      { title: 'Manual CCP 2020', authors: 'DNP Colombia', year: 2020, source: 'DNP oficial', url: 'https://colaboracion.dnp.gov.co/CDT/DNP/manual_de_clasificacion_presupuestal.pdf', verified: 'VERIF' },
      { title: 'IPSAS Handbook 2024', authors: 'IPSASB', year: 2024, source: 'IFAC', url: 'https://www.ipsasb.org/publications', verified: 'VERIF' },
    ],
  },
  m10: {
    videos: [
      { title: 'Robert Kaplan on TDABC — HBR', author: 'HBR / Harvard Business Publishing', duration: '45-60 min', url: 'https://hbr.org/2004/11/time-driven-activity-based-costing', relevance: 'Autor original del marco fundacional.', verified: 'VERIF' },
      { title: 'TDABC in Healthcare (Kaplan-Porter)', author: 'Harvard Business School', duration: '45-60 min', url: 'https://www.youtube.com/results?search_query=Kaplan+Porter+Time-Driven+Healthcare', relevance: 'Extensión 2011 a servicios profesionales.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Time-Driven Activity-Based Costing (HBR 2004)', authors: 'Kaplan, R.S. & Anderson, S.R.', year: 2004, source: 'Harvard Business Review 82(11)', url: 'https://hbr.org/2004/11/time-driven-activity-based-costing', verified: 'VERIF' },
      { title: 'HBS Working Paper 04-045 TDABC', authors: 'Kaplan & Anderson', year: 2004, source: 'HBS', url: 'https://www.hbs.edu/ris/Publication%20Files/04-045_d62528d4-7931-4ea1-a205-d9683c639d6e.pdf', verified: 'VERIF' },
      { title: 'Time-Driven Activity-Based Costing book', authors: 'Kaplan, R.S. & Anderson, S.R.', year: 2007, source: 'HBS Press', url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=23236', verified: 'VERIF' },
      { title: 'Basics of TDABC in breast imaging (PMC)', authors: 'varios', year: 2021, source: 'PMC National Library', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8011232/', verified: 'VERIF' },
    ],
  },
  m11: {
    videos: [
      { title: 'SNIES — Cómo consultar estadísticas de educación superior', author: 'MinEducación Colombia', duration: '15-30 min', url: 'https://www.youtube.com/results?search_query=SNIES+tutorial+como+consultar', relevance: 'Tutorial básico para investigadores.', verified: 'CAND' },
      { title: 'OLE — Observatorio Laboral para la Educación', author: 'MinEducación OLE', duration: '20-40 min', url: 'https://ole.mineducacion.gov.co', relevance: 'Base OLE de empleabilidad.', verified: 'CAND' },
      { title: 'SPADIES — Sistema de deserción', author: 'MinEducación SPADIES', duration: '20-40 min', url: 'https://www.youtube.com/results?search_query=SPADIES+deserción+universitaria', relevance: 'Base SPADIES permanencia.', verified: 'CAND' },
    ],
    articles: [
      { title: 'Portal oficial SNIES', authors: 'MinEducación Colombia', year: 'vigente', source: 'MEN', url: 'https://snies.mineducacion.gov.co/', verified: 'VERIF' },
      { title: 'Bases consolidadas SNIES (descarga Excel)', authors: 'MinEducación', year: 'vigente', source: 'MEN', url: 'https://snies.mineducacion.gov.co/portal/ESTADISTICAS/Bases-consolidadas/', verified: 'VERIF' },
      { title: 'HECAA SNIES — información poblacional IES', authors: 'MinEducación', year: 'vigente', source: 'MEN', url: 'https://hecaa.mineducacion.gov.co/consultaspublicas/ies', verified: 'VERIF' },
      { title: 'OECD Education at a Glance 2024', authors: 'OECD', year: 2024, source: 'OECD', url: 'https://www.oecd.org/education/education-at-a-glance/', verified: 'VERIF' },
    ],
  },
  m12: {
    videos: [
      { title: 'CRISP-DM methodology explained', author: 'IBM / KDnuggets', duration: '20-40 min', url: 'https://www.youtube.com/results?search_query=CRISP-DM+IBM+methodology', relevance: 'Framework central de MI-12.', verified: 'CAND' },
      { title: 'OECD HEInnovate overview', author: 'OECD / EU Commission', duration: '20-40 min', url: 'https://heinnovate.eu', relevance: 'Herramienta SOTA de evaluación IES.', verified: 'CAND' },
      { title: 'Mariana Mazzucato — Mission-Oriented Innovation Policy', author: 'TED / UCL IIPP', duration: '15-30 min', url: 'https://www.youtube.com/results?search_query=Mazzucato+Mission-Oriented+Innovation', relevance: 'MOIP adoptado por CONPES 4069.', verified: 'CAND' },
    ],
    articles: [
      { title: 'HEInnovate self-assessment framework', authors: 'OECD & European Commission', year: 2024, source: 'OECD oficial', url: 'https://heinnovate.eu', verified: 'VERIF' },
      { title: 'Mission-Oriented Innovation Policy: Challenges and Opportunities', authors: 'Mazzucato, M.', year: 2018, source: 'Industrial and Corporate Change', url: 'https://doi.org/10.1093/icc/dty034', verified: 'VERIF' },
    ],
  },
};
