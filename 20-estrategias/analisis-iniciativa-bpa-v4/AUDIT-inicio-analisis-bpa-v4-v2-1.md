---
kd_id: urn:udfjc:csu:audit:2026:AUDIT-v4-bpa-v2-1
kd_title: "AUDIT — Inicio del Análisis BPA v4 v2.1: Narrativa de referencia, DOFA 5R Clark y BSC-S simplificado"
kd_type: audit-tecnico
kd_status: DRAFT
kd_version: 2.1.0
kd_date: 2026-05-01

acuerdo_id: EA-001a-v4
anexo_letra: v4
anexo_version: v4.1.0

transcluible: true
---

# AUDIT — Inicio del Análisis BPA v4 · Versión 2.1

> **Nota de versión**: Este documento enriquece de manera aditiva al [`AUDIT v1.0.0`](AUDIT-inicio-analisis-bpa-v4.md:1). Las secciones §1–§11 del AUDIT original se mantienen intactas. Las nuevas secciones §12–§14 aportan: (1) una narrativa de referencia que conecta el mandato normativo con las 21 BPAs; (2) un DOFA comparativo «con BPA vs sin BPA» usando la metodología 5R Clark para evidenciar amenazas; y (3) un BSC-S simplificado con 20 KPIs por función misional que miden transformación real, no solo actividad.

---

## 12 · Narrativa de referencia: De la misión-visión a las 21 BPAs

### 12.1 · Resumen ejecutivo para el CSU (1 minuto de lectura)

La UDFJC tiene un **deber constitucional** (Art. 69 CP, Art. 6 Ley 30/1992): formar personas útiles a la sociedad. El país le ha dicho **cómo** cumplirlo: mediante Frame 3 (CONPES 4069/2021), crecimiento verde (CONPES 3934/2018) y las 5 Misiones Transformativas del PIIOM 2022-2026. El Acuerdo 004/2025 del CSU tradujo ese mandato en una estructura organizativa con 3 procesos misionales (PM1 Formación, PM2 Investigación, PM3 Extensión) y una CABA como nodo vitalizador.

Pero **tener la estructura no es lo mismo que tener el funcionamiento**. El diagnóstico de 21 universidades referentes demuestra que la UDFJC está en el último lugar del corpus en formación, investigación y extensión integradas. Esa brecha no se cierra con más reuniones ni con más cargos. Se cierra con **21 Buenas Prácticas Adoptables (BPAs)** que ya funcionan en otras universidades y que el corpus BPA ha traducido al contexto UDFJC.

Esta sección explica, en orden narrativo: **por qué** debemos hacerlo (mandato), **cómo** funciona teóricamente (ciclo virtuoso), **a qué altura** aspiramos (estándares), **dónde** estamos hoy (diagnóstico) y **qué** hacer mañana (BPAs).

---

### 12.2 · El mandato: la reforma como deber, no como opción (M01)

La narrativa normativa tiene 5 eslabones. Perder uno de ellos invalida el argumento de la reforma:

| Eslabón | Fuente | Qué exige | Línea base UDFJC 2026 |
|---|---|---|---|
| **Constitución** | Art. 69 CP (1991) | Autonomía universitaria al servicio del bien social | Estructura aprobada; funcionamiento pendiente |
| **Ley orgánica** | Art. 6 Ley 30/1992 | Deber de vincularse con planes nacionales de desarrollo | ACU-004-25 lo declara; sin BPAs no se operativiza |
| **Política CTI** | CONPES 4069/2021 | Adoptar Frame 3: investigación orientada a problemas nacionales | 0 % programas con currículo Pasteur explícito |
| **Crecimiento verde** | CONPES 3934/2018 | Articular misiones con ODS y economía sostenible | < 10 % proyectos con métrica ODS |
| **PIIOM** | MinCiencias 2022-2026 | 5 Misiones Transformativas con financiación condicionada | Sin matriz BPAs × Misiones, se pierden ~$3.100 M COP/año |
| **Operativización** | ACU-004-25/2025 | 3 PM + CABA + 4 plataformas de interoperabilidad | Plataformas declaradas; integración depende de BPAs |

**Insight clave de M01**: la autonomía del Art. 69 no es un derecho defensivo frente al Estado; es una **capacidad instrumental** para cumplir deberes constitucionales. Si la UDFJC no reforma su funcionamiento, no está ejerciendo autonomía: está incumpliendo un mandato. Véase [`M01-mandato-normativo-v2.md`](../../2-resultado-consolidados/M01-mandato-normativo/M01-mandato-normativo-v2.md:111) §4.2–§4.7.

**Los 6 riesgos de transición (RT1–RT6)** identificados en M01 §5.2 se resumen en una idea: sin BPAs, la reforma se queda en «papel mojado». El ACU-004-25 caduca su Art. 98 en 2026 y deja el Art. 100 pendiente; el rector tiene poder discrecional (Art. 107) pero no cuenta con prácticas operativas para ejecutarlo.

---

### 12.3 · El ciclo virtuoso: cómo las misiones se alimentan mutuamente (M02)

El Acuerdo 004/2025 define 3 procesos misionales. M02 demuestra que esos 3 procesos no deben ser silos: deben formar un **ciclo virtuoso ΩMT** donde cada misión le inyecta energía a las otras.

Las **6 retroalimentaciones QMT** son los engranajes:

| Retroalimentación | De → Hacia | Qué mueve | BPA que la activa |
|---|---|---|---|
| **R1** | Semilleros (PM1) → Grupos de inv. (PM2) | Estudiantes que llegan a la investigación antes de egresar | [`BP-I01 UROP`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:691) |
| **R2** | Currículo vivo (PM2) → Formación (PM1) | Resultados de investigación que se convierten en cursos nuevos | [`BP-F02 PBL`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:402) + [`BP-I04 Open Science`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:803) |
| **R3** | Transferencia (PM2) → Extensión (PM3) | Tecnologías que salen al mercado o a la comunidad | [`BP-E01 TTO`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:914) + [`BP-I05 Spin-offs`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:858) |
| **R4** | Problemas reales (PM3) → Investigación (PM2) | Demandas territoriales que definen la agenda de investigación | [`BP-E02 Extensión territorial ODS`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:966) |
| **R5** | Aprendizaje experiencial (PM3) → Formación (PM1) | Prácticas profesionales y vinculación que mejoran la formación | [`BP-F04 Co-op`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:514) |
| **R6** | Egresados (PM1) → Extensión (PM3) | Graduados que crean empresas o proyectos de impacto social | [`BP-INT06 Retención y engagement`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:1441) |

**Regla sistémica**: una retroalimentación rota rompe el ciclo. Hoy la UDFJC tiene todas las retroalimentaciones en intensidad baja o nula (diagnóstico Sub-N1 en Formación, N1 en Investigación/Extensión). Las BPAs no son «iniciativas aisladas»: son **reparaciones quirúrgicas** de esos 6 engranajes.

**Las 5 Vías Clark (R-1→R-5)** traducen ese ciclo virtuoso en palancas de gestión. Más adelante (§13) usaremos esas 5 vías como lente para evidenciar amenazas. Véase [`M02-ciclo-virtuoso-v3.md`](../../2-resultado-consolidados/M02-ciclo-virtuoso/M02-ciclo-virtuoso-v3.md:870) §4.5.

---

### 12.4 · Los estándares: a qué altura del mundo aspiramos (M03)

¿Cómo sabemos si una BPA es «buena» o solo «novedosa»? M03 responde con un mapa de **8 estándares internacionales** aplicables a la UDFJC, organizados en 4 capas:

| Capa | Estándar ejemplo | Qué cubre | Gap crítico UDFJC |
|---|---|---|---|
| **Aspiracional** | OECD 2030 Learning Compass | Competencias para 2030 | Sin traducción a perfiles de egreso por Escuela |
| **Epistemológico** | Cuadrante Pasteur (Stokes, 1997) | Investigación use-inspired | 0 % programas con currículo explícitamente Pasteur |
| **Disciplinar** | ABET / CDIO / TUNING-AL / EUR-ACE | Calidad de ingeniería y ciencias básicas | 0 acreditaciones internacionales en Ingeniería de Sistemas |
| **Gestión** | ISO 21001:2018 / ARCU-SUR | Sistema de gestión de la educación | Sin EOMS certificado; acreditación ARCU-SUR no iniciada |

**El heatmap 9 Escuelas × 8 estándares** (M03 §5.1) muestra que la UDFJC tiene **10 gaps críticos** frente al corpus internacional. Esos gaps no son teóricos: se traducen en desventajas competitivas concretas. Por ejemplo, la ausencia de UDL 3.0 afecta permanencia estudiantil; la ausencia de MIT UROP explica por qué la investigación undergrad es marginal (< 5 %); la ausencia de ISO 21001 dificulta acreditar procesos ante el CNA.

**Insight clave**: las BPAs no son inventos locales. Son **adaptaciones validadas** de estándares que ya funcionan en MIT, Stanford, Aalto, ÉTS, UNAL, UIS e ITM. La UDFJC no necesita «inventar la rueda»: necesita «adaptar el neumático». Véase [`M03-estandares-internacionales.md`](../../2-resultado-consolidados/M03-estandares-internacionales/M03-estandares-internacionales.md:986) §5.1–§5.3.

---

### 12.5 · El diagnóstico: dónde estamos hoy (M05)

M05 comparó a la UDFJC con **21 Instituciones de Educación Superior** en un Dashboard Maestro 4F×5C (4 Funciones × 5 Criterios). El resultado es inequívoco:

| Índice compuesto | UDFJC (AS-IS 2026) | Posición en corpus | Interpretación |
|---|---|---|---|
| **F-IMP** (Formación Integrada) | 0,30 | 21 / 21 | Última. Formación desconectada de investigación y extensión. |
| **I-IMP** (Investigación Integrada) | 0,12 | 21 / 21 | Última. Investigación sin vinculación territorial ni undergrad. |
| **E-IMP** (Extensión Integrada) | 0,08 | 21 / 21 | Última. Extensión sin métricas de impacto ni sostenibilidad. |

**La ecuación `culture_lag = max(0, N_estructural − G_equivalente) = 2`** (M05 §1.3) explica por qué la UDFJC está en esta situación: tiene una estructura normativa de nivel N2 (Acuerdo aprobado, plataformas declaradas), pero una práctica institucional de nivel Sub-N1 (sin BPAs operativas). Ese **retraso cultural de 2 niveles** es lo que la reforma debe cerrar.

El concepto de **«Organigrama Vacío»** (M05 §9.7) resume el problema: los cargos existen, los procesos misionales están definidos en el papel, pero las capacidades y los comportamientos no han cambiado. Las BPAs son el combustible que llena ese organigrama de sentido.

Véase [`M05-procesos-misionales-v5.md`](../../2-resultado-consolidados/M05-procesos-misionales/M05-procesos-misionales-v5.md:1) §7.4, §9.0, §9.7.

---

### 12.6 · Las 21 BPAs: qué hacer y en qué orden (M07)

El corpus BPA ha especificado **21 Buenas Prácticas Adoptables** organizadas en 4 capacidades misionales (Cap-F1 a Cap-F4). Cada BPA incluye: árbol de problemas, cadena de resultados inversa, matriz 4×5 (capacidades × comportamientos) y mapeo a las 6 retroalimentaciones QMT.

**Las 5 BPAs ancla** (más INT02 como pre-requisito normativo) concentran el 80 % del impacto con el 20 % del esfuerzo:

| Rol | BPA | Qué resuelve | Ruta Clark |
|---|---|---|---|
| 🏛️ **Ancla** | [`BP-INT01`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:1144) Misión operacionalizada «Proyecto Bogotá» | Fragmentación de gobernanza: las VRs no saben hacia dónde remar juntas | R-1 Núcleo Directivo |
| 🔑 **Pre-requisito** | [`BP-INT02`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:1210) Créditos de inv/ext | Sin créditos obligatorios, no hay incentivo para integrar misiones | R-1 + R-3 |
| 🏛️ **Ancla** | [`BP-INT04`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:1321) CABA Design Factory | La CABA es un nodo vacío sin metodología ni equipos | R-2 Periferia |
| 🏛️ **Ancla** | [`BP-I01`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:625) UROP | Los estudiantes nunca tocan investigación real antes de egresar | R-4 Heartland |
| 🏛️ **Ancla** | [`BP-F01`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:339) Concepto compartido | Cada profesor dicta lo que quiere; no hay coherencia curricular | R-5 Cultura |
| 🏛️ **Ancla** | [`BP-E02`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:966) Extensión territorial ODS | La extensión es voluntariado sin métrica ni sostenibilidad | R-3 Financiamiento |

**Secuencia crítica** (plan mínimo viable): **INT02 → INT01 → I01 / INT04 → F01 / E02**.

- **Año 0, Semestre 1**: activar R-1 con INT02 (reforma de créditos) + INT01 (gobernanza unificada).
- **Año 0, Semestre 2**: activar R-2 y R-3 parcial con INT04 (CABA Design Factory) y I01 (UROP piloto).
- **Año 1**: activar R-3 pleno + R-4 con escalamiento de UROP y primeros spin-offs.
- **Año 3–5**: activar R-5 con F01 (concepto compartido institucionalizado) y E02 (extensión territorial escalada).

**Insight clave de M07**: «Sin R-1 ejecutada, ninguna otra R puede activarse a escala.» El núcleo directivo fortalecido no es un lujo administrativo: es la **puerta de entrada** a todo lo demás. Véase [`M07-21-bpa-especificadas.md`](../../2-resultado-consolidados/M07-21-bpa-especificadas/M07-21-bpa-especificadas.md:1760) §6.3–§6.4.

---

### 12.7 · Síntesis de la narrativa (párrafo único)

> La Constitución y el PIIOM le ordenan a la UDFJC transformarse en una universidad que resuelva problemas nacionales. El Acuerdo 004/2025 le dio la estructura para hacerlo. Pero la estructura sin prácticas es un «Organigrama Vacío». Las 21 BPAs son prácticas ya probadas en 21 universidades del mundo que reparan, una a una, los 6 engranajes del ciclo virtuoso. Empezar por las 5 anclas (INT01, INT04, I01, F01, E02) y el pre-requisito INT02 es la única secuencia que no desperdicia recursos ni tiempo. El estándar no es la perfección: es salir del último lugar del corpus.

---

## 13 · DOFA de la reforma: Con BPA vs Sin BPA (Metodología 5R Clark)

### 13.1 · Por qué usar las 5R Clark como lente de amenazas

Burton Clark (1998) describió 5 rutas por las que una universidad tradicional se transforma en universidad emprendedora. En M02 y M07 esas rutas se tradujeron al contexto UDFJC como:

| Ruta | Nombre en español | Qué gobierna |
|---|---|---|
| **R-1** | Núcleo Directivo Fortalecido | Gobernanza, decisión estratégica, coordinación inter-VR |
| **R-2** | Periferia de Desarrollo Expandida | Unidades de innovación, TTO, Design Factory, educación continua |
| **R-3** | Base de Financiamiento Diversificada | Ingresos propios, spin-offs, PIIOM, educación continua |
| **R-4** | Heartland Académico Estimulado | Docentes y estudiantes como motor de investigación y creación |
| **R-5** | Cultura Emprendedora Integrada | Valores, rutinas, lenguaje común, concepto compartido |

**Hipótesis de este DOFA**: si la reforma UDFJC avanza **sin BPAs**, cada una de esas 5 rutas se convierte en una **amenaza latente** que eventualmente bloquea la transformación. Si avanza **con BPAs**, las amenazas se mitigan y las rutas se convierten en fortalezas. Este DOFA no reemplaza al de la §2 del AUDIT v1: lo **enfoca** a través de un solo lente sistémico.

---

### 13.2 · DOFA · Escenario SIN BPAs: «Reforma de papel»

Escenario hipotético: el CSU aprueba el Acuerdo 004/2025, mantiene los anexos v3 A–G, pero **ninguna BPA se implementa**. Las VRs operan con sus procesos habituales.

#### F · Fortalezas (lo que aún tendríamos)

| # | Fortaleza | Vencimiento |
|---|---|---|
| F-S1 | Estructura organizativa aprobada y publicada | 2025–2030 |
| F-S2 | Plataformas PAI/PIC/PET/PGE declaradas en papel | Depende de BPAs para funcionar |
| F-S3 | Modelo 70/30 aceptado por comunidad académica | Sin BPAs se queda en principio no cuantificado |
| F-S4 | Comité Inter-VR creado (Art. 60bis) | Sin BPAs no tiene objeto de coordinación |

#### D · Debilidades (lo que el corpus BPA expone como irreparable sin prácticas)

| # | Debilidad | Por qué es crítica sin BPAs |
|---|---|---|
| D-S1 | **R-1 vacío**: los cargos existen pero no hay capacidad de decisión integrada | Cada VR optimiza su propio presupuesto; no hay «Proyecto Bogotá» unificado |
| D-S2 | **R-2 inexistente**: no hay unidades de desarrollo con método | La CABA es un espacio físico sin equipos ni procesos; el TTO no existe |
| D-S3 | **R-3 mono-canal**: > 90 % del presupuesto depende del estado colombiano | Cualquier recorte fiscal (ej. ajuste 2027) paraliza la reforma |
| D-S4 | **R-4 aislado**: docentes sin incentivos para vincular inv-docencia | La promoción académica premia artículos, no estudiantes en semilleros |
| D-S5 | **R-5 burocrática**: cultura de trámites, no de resultados | El «Organigrama Vacío» persiste: procesos en papel, comportamientos sin cambio |
| D-S6 | Sin indicadores de transformación | El CSU no puede distinguir entre «reforma en marcha» y «reforma estancada» |

#### O · Oportunidades (que se perderían o no se aprovecharían)

| # | Oportunidad perdida | Costo estimado |
|---|---|---|
| O-S1 | Financiación PIIOM condicionada a proyectos misionales integrados | ~$3.100 M COP/año no accedidos |
| O-S2 | Alianzas internacionales (MIT, Aalto, ÉTS) que exigen contrapartida operativa | Sin UROP ni Design Factory, no hay interés de contraparte |
| O-S3 | Nichos transformativos locales (ej. distrito de ciencia en Bogotá) | Sin extensión territorial ODS, la UDFJC no es actor relevante |

#### A · Amenazas (evidenciadas por las 5R Clark)

| Ruta | Amenaza concreta | Evidencia del corpus | Probabilidad |
|---|---|---|---|
| **R-1** | **Fragmentación de gobernanza**: cada VR interpreta la reforma a su manera. El Comité Inter-VR se convierte en una reunión protocolaria sin objetivos compartidos. | M07 §6.3: UDFJC 2026, R-1 en nivel «Desconocida» para 16 de 21 BPAs | Alta |
| **R-2** | **Aislamiento institucional**: la universidad sigue siendo una «isla» sin conexión estructural con empresas, gobierno ni comunidad. Sin TTO ni Design Factory, no hay interfaz. | M05 §9.7: UDFJC última en E-IMP (0,08); sin periferia no hay transferencia | Alta |
| **R-3** | **Vulnerabilidad fiscal**: una sola fuente de ingresos hace que la reforma sea rehén del ciclo político presupuestal. | M02 §5.4: sin diversificación, cualquier shock fiscal detiene la transición | Alta |
| **R-4** | **Fuga de talento académico**: los mejores docentes se van a IES que sí ofrecen UROP, spin-offs y libertad académica con recursos. | M03 §5.3: gap crítico #3 — ausencia de MIT UROP y PI inventor-friendly; docentes jóvenes prefieren UNAL/UIS | Media-Alta |
| **R-5** | **Reforma como maquillaje administrativo**: la comunidad percibe que «cambiaron los nombres de los cargos pero nada más». Eso genera cinismo y resistencia pasiva. | M05 §1.3: `culture_lag = 2` significa que la cultura va 2 niveles por debajo de la estructura; el cinismo es inevitable si no hay comportamientos nuevos | Alta |

**Veredicto parcial SIN BPAs**: la reforma se convierte en un **cambio estructural estéril**. Los documentos existen, los cargos están, pero las capacidades y los comportamientos no cambian. En 2030 la UDFJC seguirá en el lugar 21 del corpus, habiendo gastado 4 años de oportunidad política y presupuestal.

---

### 13.3 · DOFA · Escenario CON BPAs: «Reforma operativa»

Escenario: el CSU aprueba el Anexo v4 (Opción C, marco obligatorio + catálogo referencial), las VRs adoptan las 5 BPAs ancla + INT02, y se ejecuta la secuencia crítica.

#### F · Fortalezas (las BPAS como palancas)

| # | Fortaleza | BPA que la genera | Ruta Clark |
|---|---|---|---|
| F-C1 | Gobernanza unificada con meta-telos compartido (ΩMT) | BP-INT01 «Proyecto Bogotá» | R-1 |
| F-C2 | CABA operativa con metodología Design Factory y equipos asignados | BP-INT04 CABA Design Factory | R-2 |
| F-C3 | Estudiantes en investigación real desde primeros semestres | BP-I01 UROP | R-4 |
| F-C4 | Currículo con coherencia vertical (perfil de egreso → syllabi → rúbricas) | BP-F01 Concepto compartido | R-5 |
| F-C5 | Extensión con financiación sostenible vinculada a ODS | BP-E02 Extensión territorial ODS | R-3 |
| F-C6 | Marco de evaluación madurez N0-N4 + dashboard S0-S5 | Framework MARCO P5-P1 | R-1 |

#### D · Debilidades (que persisten aunque se implementen BPAs)

| # | Debilidad | Mitigación temporal |
|---|---|---|
| D-C1 | Inversión inicial requerida: ~$10.000 M COP en 8 años | ROI 3,5x documentado; financiación PIIOM cubre 31 % del costo |
| D-C2 | Cambio cultural de 8 años: no se acelera con dinero | Índice de Viabilidad Cultural (IVC) obligatorio antes de aprobar cada BPA |
| D-C3 | Dependencia de R-1 en Año 0: si INT01/INT02 fallan, todo se retrasa | Secuencia crítica con hitos de go/no-go cada semestre |
| D-C4 | Capacidad técnica limitada en VRs para diseñar planes | DGE&P asesora; catálogo referencial reduce complejidad de diseño |

#### O · Oportunidades (que se abren solo con BPAs operativas)

| # | Oportunidad | Mecanismo | Retorno estimado |
|---|---|---|---|
| O-C1 | Financiación PIIOM (+182 %) | Matriz BPAs × 5 Misiones; proyectos integrados califican a convocatorias misionales | +$3.100 M COP/año |
| O-C2 | Diversificación de ingresos (educación continua, spin-offs, TTO) | BP-E03, BP-I05, BP-E01 generan ingresos propios | 25–35 % del presupuesto VR Extensión en Año 8 |
| O-C3 | Nichos transformativos (E3 del ciclo virtuoso) | CABA + UROP + extensión territorial crean capacidades irreplicables localmente | Liderazgo territorial en 2–3 sectores (ej. energía, agua, movilidad) |
| O-C4 | Alianzas internacionales estratégicas | UROP permite acuerdos de doble titulación; Design Factory atrae consorcios de innovación | 3–5 alianzas firmadas en Año 4 |

#### A · Amenazas residuales (aun con BPAs, requieren vigilancia)

| # | Amenaza residual | Probabilidad | Mitigación |
|---|---|---|---|
| A-C1 | Resistencia docente severa a BPAs que afectan libertad de cátedra (BP-F01, BP-F03) | Alta | P2 (DOFA cultural) obligatorio; IVC mínimo; co-diseño con Escuelas |
| A-C2 | Intento de implementar las 21 BPAs simultáneamente, dispersando recursos | Media | Secuencia crítica obligatoria; solo 5 anclas + INT02 en Año 0–1 |
| A-C3 | Obsolescencia de BPAs si no se versionan | Media | BPAs versionadas por fuera del Acuerdo; actualizaciones técnicas anuales |
| A-C4 | Fricción cross-VR si cada VR elige BPAs incompatibles | Media | Contratos de coherencia C1-C8; Comité Inter-VR valida antes de CSU |
| A-C5 | Expectativa irreal al comparar con MIT/Stanford | Media | Nivel de ambición ajustable por escenario (S1 conservador → S5 ambicioso) |

---

### 13.4 · Matriz comparativa 5R × Amenazas

| Ruta Clark | ¿Qué pasa SIN BPA? (Amenaza) | ¿Qué cambia CON BPA? (Mitigación) | BPA clave | Año de activación |
|---|---|---|---|---|
| **R-1** Núcleo Directivo | Fragmentación: cada VR optimiza localmente; Comité Inter-VR es protocolo | Gobernanza unificada bajo ΩMT; decisiones con dashboard S0-S5 | BP-INT01, BP-INT02 | Año 0 |
| **R-2** Periferia | Aislamiento: sin interfaz con ecosistema externo; CABA = espacio vacío | TTO funcional + Design Factory + educación continua con oferta propia | BP-E01, BP-INT04, BP-E03 | Año 0–1 |
| **R-3** Financiamiento | Vulnerabilidad fiscal: > 90 % estatal; reforma rehén del ciclo político | Ingresos propios: spin-offs + PIIOM + educación continua + transferencia | BP-I05, BP-E03, BP-E02 | Año 1–2 |
| **R-4** Heartland | Fuga de talento: docentes se van a IES con UROP e incentivos reales | UROP masivo + PI inventor-friendly + PBL; promoción académica vinculada a integración | BP-I01, BP-I02, BP-F02 | Año 0–1 |
| **R-5** Cultura | Cinismo: «cambiaron los cargos pero nada más»; reforma = maquillaje | Concepto compartido institucionalizado + CLR + retención con sentido de propósito | BP-F01, BP-INT03, BP-INT06 | Año 2–5 |

**Conclusión de la matriz**: las 5 amenazas SIN BPA no son hipotéticas; son el **estatus actual** de la UDFJC en 2026. El diagnóstico M07 §6.3 muestra que 16 de 21 BPAs están en estado «Desconocida» y las 5 restantes en «Declarada» (solo en papel). Es decir: **ya estamos viviendo el escenario SIN BPAs**. La única diferencia es que ahora tenemos nombre y número para cada amenaza, y una ruta para mitigarla.

---

### 13.5 · Veredicto del DOFA 5R

> **Sin BPAs, la reforma es un «Organigrama Vacío»**: la estructura existe, la norma existe, pero las capacidades y los comportamientos no cambian. Las 5R Clark se convierten en 5 amenazas convergentes que bloquean cualquier transformación real. **Con BPAs, cada Ruta Clark se convierte en una palanca**: R-1 da dirección, R-2 da interfaz, R-3 da sostenibilidad fiscal, R-4 da talento y R-5 da permanencia cultural. La secuencia crítica (INT02 → INT01 → I01/INT04 → F01/E02) no es una recomendación optativa: es el **único orden** en el que las palancas se activan sin romperse mutuamente.

---

## 14 · BSC-S Simplificado: KPIs por función misional que miden transformación

### 14.1 · Principio de simplificación

El Anexo D v3 propone un sistema de indicadores institucionales. El MARCO P5-P1 añade 105 celdas de diagnóstico (21 BPAs × 5 perspectivas). Ambos son necesarios para la operación técnica, pero **demasiado densos** para el CSU y para las VRs en su planeación anual.

El BSC-S simplificado de esta sección se rige por 4 reglas:

1. **Un tablero por función misional** (F1 Formación, F2 Investigación, F3 Extensión, F4 Integración).
2. **5 KPIs por tablero**, uno por criterio (C1 Producto, C2 Calidad, C3 Eficiencia, C4 Pertinencia, C5 Reconocimiento).
3. **Cada KPI mide transformación**, no actividad. No cuenta «cuántos cursos se dictaron», sino «cuántos cursos cambiaron su metodología por efecto de una BPA».
4. **Cada KPI tiene AS-IS (2026), TO-BE (2034), BPA activador y fórmula**. Sin estos 4 elementos, no es KPI: es deseo.

El resultado es un **dashboard de 20 KPIs** (4 × 5) que el CSU puede revisar en una sola página por función, y que las VRs pueden usar para sus planes de acción anuales.

---

### 14.2 · Tablero F1 · Formación

**Pregunta rectora**: ¿La formación de la UDFJC está integrando investigación, extensión y emprendimiento en la experiencia del estudiante?

| Criterio | KPI | Fórmula | AS-IS 2026 | TO-BE 2034 | BPA activador | Confianza |
|---|---|---|---|---|---|---|
| **C1 Producto** | % estudiantes matriculados en programas con **concepto compartido** aprobado (perfil de egreso → currículo → rúbricas alineadas) | Σ estudiantes en programas con BP-F01 implementado / Σ estudiantes totales × 100 | 0 % | 80 % | BP-F01 | 0,7 |
| **C2 Calidad** | % cursos con metodología **PBL o UROP integrado** (no visitas ni charlas: proyectos reales con entregables) | Σ cursos con BP-F02 o BP-I01 en syllabi / Σ cursos totales × 100 | < 5 % | 70 % | BP-F02, BP-I01 | 0,6 |
| **C3 Eficiencia** | Tasa de retención semestral en programas con **flexibilidad curricular** (rutas personalizadas, validación de saberes previos) | Σ estudiantes que continúan semestre n+1 en programas BP-F03 / Σ matriculados semestre n × 100 | 78 % | 90 % | BP-F03 | 0,6 |
| **C4 Pertinencia** | % estudiantes con **experiencia laboral formal** (co-op, prácticas profesionales remuneradas o contrato de aprendizaje) antes de egresar | Σ estudiantes con BP-F04 certificado / Σ cohorte de pregrado × 100 | 15 % | 60 % | BP-F04 | 0,7 |
| **C5 Reconocimiento** | Número de programas acreditados con **estándar internacional** (ABET, CDIO, TUNING-AL, EUR-ACE) | Conteo de programas con acreditación vigente | 0 | 5 | BP-F01, BP-F05 | 0,5 |

**Nota de lectura**: C1 y C2 son los KPIs más difíciles porque requieren cambiar el syllabi de cientos de cursos. Por eso el plan mínimo viable los deja para Año 2–3, después de que R-1 (gobernanza) y R-4 (heartland) estén activos.

---

### 14.3 · Tablero F2 · Investigación

**Pregunta rectora**: ¿La investigación UDFJC genera nuevo conocimiento con participación estudiantil y resuelve problemas reales del territorio?

| Criterio | KPI | Fórmula | AS-IS 2026 | TO-BE 2034 | BPA activador | Confianza |
|---|---|---|---|---|---|---|
| **C1 Producto** | % proyectos de investigación formal con participación **undergrad** (UROP) | Σ proyectos UDFJC con ≥ 1 estudiante de pregrado / Σ proyectos activos × 100 | < 5 % | 70 % | BP-I01 | 0,6 |
| **C2 Calidad** | Patentes o registros de invención por año con **participación estudiantil o docente-inventor** | Conteo anual en RNCE o equivalente internacional | 0 | 10 | BP-I02 | 0,5 |
| **C3 Eficiencia** | Tiempo promedio de gestión de propiedad intelectual (desde solicitud interna hasta registro o licenciamiento) en meses | Promedio de duración de trámites PI en TTO | 36 | 12 | BP-I02, BP-I03 | 0,5 |
| **C4 Pertinencia** | % proyectos de investigación alineados con al menos una **Misión Transformativa PIIOM** | Σ proyectos con código PIIOM / Σ proyectos activos × 100 | 20 % | 70 % | BP-I03, BP-I04 | 0,6 |
| **C5 Reconocimiento** | Citaciones por docente/año en áreas **Pasteur** (use-inspired basic research) | Citaciones en Scopus/WoS de áreas STEM aplicadas / número de docentes investigadores | 0,3 | 2,0 | BP-I04 | 0,5 |

**Nota de lectura**: C2 (patentes) es ambicioso para una universidad que hoy registra cero. La meta TO-BE = 10 en 2034 asume que BP-I02 (PI inventor-friendly) y BP-E01 (TTO) están operativos desde Año 1. Si no es así, este KPI será el primero en advertir que la cadena I02→I05→E01 está rota.

---

### 14.4 · Tablero F3 · Extensión

**Pregunta rectora**: ¿La extensión UDFJC genera impacto medible en el territorio y diversifica los ingresos institucionales?

| Criterio | KPI | Fórmula | AS-IS 2026 | TO-BE 2034 | BPA activador | Confianza |
|---|---|---|---|---|---|---|
| **C1 Producto** | Contratos de **transferencia tecnológica** ejecutados por año (licenciamiento, spin-off, servicio técnico) | Conteo anual de contratos firmados por TTO | 2 | 25 | BP-E01 | 0,6 |
| **C2 Calidad** | % proyectos de extensión con **impacto medible ODS** (indicador cuantificado y reportado) | Σ proyectos BP-E02 con métrica ODS / Σ proyectos de extensión × 100 | 10 % | 75 % | BP-E02 | 0,5 |
| **C3 Eficiencia** | Ingresos por **educación continua** como % del presupuesto total de la VR de Extensión | Ingresos EC / Presupuesto VR Extensión × 100 | 5 % | 35 % | BP-E03 | 0,6 |
| **C4 Pertinencia** | % programas de pregrado con **articulación formal con educación media** (doble titulación, validación, mentorías) | Σ programas con convenio BP-E04 / Σ programas de pregrado × 100 | 5 % | 50 % | BP-E04 | 0,5 |
| **C5 Reconocimiento** | Reconocimientos **municipales, regionales o nacionales** por impacto territorial (resoluciones, premios, designaciones) | Conteo anual de reconocimientos formales | 1 | 5 | BP-E02, BP-E03 | 0,5 |

**Nota de lectura**: C3 es el KPI financiero más importante de Extensión. Si en 2034 la educación continua no representa al menos el 35 % del presupuesto de la VR, la dependencia fiscal seguirá siendo crítica y R-3 no se habrá activado.

---

### 14.5 · Tablero F4 · Integración

**Pregunta rectora**: ¿Las 3 misiones funcionan como un sistema integrado, o siguen siendo silos independientes?

| Criterio | KPI | Fórmula | AS-IS 2026 | TO-BE 2034 | BPA activador | Confianza |
|---|---|---|---|---|---|---|
| **C1 Producto** | % estudiantes de pregrado con **créditos de investigación y/o extensión** obligatorios en su plan de estudios | Σ estudiantes con BP-INT02 cumplido / Σ matriculados × 100 | 0 % | 100 % | BP-INT02 | 0,8 |
| **C2 Calidad** | **Índice de integración misional** (promedio de intensidad de las 6 retroalimentaciones QMT activas) | (R1 + R2 + R3 + R4 + R5 + R6) / 6, cada R en escala 0–1 | 0,15 | 0,75 | BP-INT01 | 0,6 |
| **C3 Eficiencia** | Tiempo de respuesta del **Comité Inter-VR** desde solicitud hasta decisión formal, en días hábiles | Promedio de días entre radicación y acta de decisión | 90 | 14 | BP-INT01, BP-INT04 | 0,7 |
| **C4 Pertinencia** | % oferta académica (programas) **racionalizada** con justificación de mercado laboral + alineación ODS + viabilidad presupuestal | Σ programas con BP-INT05 aprobado / Σ programas activos × 100 | 0 % | 80 % | BP-INT05 | 0,5 |
| **C5 Reconocimiento** | **Índice de cultura emprendedora** (encuesta institucional anónima, escala 1–5) | Promedio de respuestas a ítems de innovación, riesgo calculado y colaboración interdisciplinar | 2,1 / 5 | 4,0 / 5 | BP-INT06, BP-INT07 | 0,5 |

**Nota de lectura**: F4 es el tablero más importante porque mide **lo que los otros tres no pueden medir solos**. C2 (Índice de integración misional) es el KPI sintético de toda la reforma: si llega a 0,75 en 2034, la UDFJC habrá dejado de ser 3 silos para convertirse en 1 sistema. C1 (créditos inv/ext) es el pre-requisito normativo: sin él, no hay materia prima para integrar.

---

### 14.6 · Reglas de lectura del BSC-S simplificado

1. **Línea base obligatoria**: un KPI sin AS-IS 2026 no existe. Si no sabemos dónde estamos, cualquier meta es fantasía.
2. **Meta ambiciosa pero verosímil**: TO-BE 2034 corresponde al nivel N3–N4 del corpus BPA (práctica operativa o institucionalizada). No es MIT; es salir del último lugar.
3. **BPA activador único**: cada KPI tiene 1–2 BPAs responsables. Si el KPI no mejora en 2 años, se revisa la BPA, no se cambia el indicador.
4. **Confianza epistémica**: la columna «Confianza» (0–1) indica cuán seguros estamos de la línea base. Valores < 0,6 significan que el AS-IS es estimado y debe validarse en el primer año de medición.
5. **Frecuencia de medición**: C1–C3 se miden semestralmente; C4–C5 se miden anualmente. El tablero F4 se presenta en cada sesión del Comité Inter-VR.

---

### 14.7 · Hoja de ruta de activación de KPIs

No todos los KPIs se encienden el mismo día. Esta hoja de ruta vincula cada KPI al plan mínimo viable:

| Año | KPIs que se activan | BPA que entra en operación | Ruta Clark |
|---|---|---|---|
| **Año 0** | F4-C1 (créditos inv/ext); F4-C3 (tiempo Comité Inter-VR); F1-C1 (concepto compartido piloto) | BP-INT02, BP-INT01, BP-F01 (piloto) | R-1 |
| **Año 1** | F2-C1 (UROP piloto); F1-C2 (PBL piloto); F4-C2 (índice integración piloto) | BP-I01, BP-F02, BP-INT04 | R-1, R-2, R-4 |
| **Año 2** | F3-C1 (TTO operativo); F2-C3 (tiempo PI); F1-C3 (flexibilidad curricular piloto) | BP-E01, BP-I02, BP-F03 | R-2, R-3 parcial |
| **Año 3** | F3-C2 (extensión ODS); F2-C4 (alineación PIIOM); F1-C4 (co-op escalado) | BP-E02, BP-I03, BP-F04 | R-3 pleno, R-4 pleno |
| **Año 4–5** | F4-C5 (cultura emprendedora); F1-C5 (acreditaciones); F3-C3 (educación continua); F2-C2 (patentes) | BP-INT06, BP-F05, BP-E03, BP-I05 | R-5 |
| **Año 6–8** | Todos los KPIs en consolidación y ajuste de metas TO-BE | Todas las BPAs en estado Operativa o Institucionalizada | R-5 consolidado |

**Regla de oro**: si un KPI de F4 no mejora, los KPIs de F1–F3 pueden mejorar localmente pero la reforma **no habrá transformado la universidad**. La integración misional es la variable de salida definitiva.

---

## 15 · Conclusiones de la versión 2.1

Este AUDIT v2.1 enriquece al v1.0.0 con tres herramientas de decisión:

1. **Narrativa de referencia (§12)**: conecta el mandato constitucional con las 21 BPAs en una historia de 5 actos. Sirve para explicarle al CSU, a las VRs y a la comunidad académica **por qué** cada BPA existe y **dónde** encaja en el rompecabezas institucional.

2. **DOFA 5R Clark (§13)**: evidencia que las 5 rutas de transformación universitaria se convierten en 5 amenazas convergentes si no se implementan BPAs. La matriz comparativa permite al CSU evaluar, en una sola página, el costo de oportunidad de no actuar.

3. **BSC-S simplificado (§14)**: reduce el sistema de indicadores a 20 KPIs transformacionales, 4 tableros por función misional, con AS-IS, TO-BE, BPA activador y hoja de ruta de activación. Es lo suficientemente simple para la deliberación del CSU y lo suficientemente preciso para la operación de las VRs.

**Próximo paso recomendado**: incorporar las secciones §12–§14 como anexos técnicos del Anexo v4 (Opción C), manteniendo el principio de que el marco de evaluación es obligatorio pero las metas TO-BE son referenciales y ajustables por escenario (S1–S5).

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-05-01*
*AUDIT-inicio-analisis-bpa-v4-v2-1.md v2.1.0*
*Narrativa M01→M02→M03→M05→M07 · DOFA 5R Clark Con/Sin BPA · BSC-S 4F×5C simplificado · 20 KPIs transformacionales*
