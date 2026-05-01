# AUDIT-Plan · Anexo G v3 — Guía de Planes de Acción a 8 Años

| Campo | Valor |
|---|---|
| **ID** | AUDIT-AG-v3-001 |
| **Fecha** | 2026-04-30 |
| **Autor** | Carlos Camilo Madera Sepúlveda |
| **Objetivo** | Planificar la construcción del Anexo G v3 con las mejoras estructurales solicitadas |
| **Dependencias** | EA001a-v3, Anexos A-F v3, DOFAs 001/001b, Corpus BPAs M07, CONSOLIDADOR R1-R6 |
| **Estado** | DRAFT |

---

## 1. Pregunta de diseño

> ¿Cómo debe diseñarse el Anexo G v3 para que, desde la génesis de cada Vicerrectoría, se incorpore el ADN de universidad-emprendedora y transformativa, garantizando que las responsabilidades misionales sean **no exclusivas ni excluyentes**, existan **mecanismos de articulación** robustos, **plataformas de interoperabilidad** operativas, y las **Escuelas permeen la fuerza de trabajo de las tres Vicerrectorías**?

---

## 2. Hallazgos del Anexo G v2/v3-actual que justifican el rediseño

| # | Hallazgo | Severidad | Impacto si no se corrige |
|---|---|---|---|
| H1 | No existe sección explícita sobre ADN emprendedor/transformativa como principio rector | 🔴 Crítica | Las VRs nacen con mentalidad burocrática, no innovadora |
| H2 | Las BPAs se asignan por dependencia de forma exclusiva (VIF=formación, VIC&I=investigación) | 🔴 Crítica | Refuerza silos en lugar de romperlos; contraviene el espíritu de EA001a-v3 |
| H3 | Ausencia de principio de "responsabilidades no exclusivas ni excluyentes" | 🟡 Alta | Cada VR puede reclamar exclusividad sobre su dominio, bloqueando cross-fertilization |
| H4 | No se definen mecanismos de articulación concretos entre BPAs de diferentes VRs | 🟡 Alta | Las articulaciones quedan en intención declarativa sin instrumentos operativos |
| H5 | No hay concepto de "plataformas de interoperabilidad" (físicas, digitales, normativas) | 🟡 Alta | Cada VR construye sus propios silos de infraestructura, datos y procedimientos |
| H6 | Las Escuelas aparecen como receptoras de servicios, no como permeadoras de las 3 VRs | 🔴 Crítica | Se reproduce el modelo departamentalista que la reforma busca superar |
| H7 | El ciclo virtuoso universidad-territorio-empresa no está operativizado | 🟡 Alta | La extensión queda como "ayuda social" en lugar de motor de innovación |

---

## 3. Requisitos funcionales del Anexo G v3 (User Stories)

### 3.1 · ADN universidad-emprendedora & transformativa

**US-G-01** · *Como* Vicerrectoría de Formación, *quiero* que mi Plan de Acción a 8 años incorpore explícitamente prácticas de emprendimiento y transformación social, *para que* la formación no se limite a la transferencia de conocimientos sino que genere capacidad de innovación.

**US-G-02** · *Como* Vicerrectoría de Investigación-Creación-Innovación, *quiero* que mis indicadores incluyan spin-offs, patentes y transferencia tecnológica desde el año 1, *para que* la investigación tenga impacto económico y social medible.

**US-G-03** · *Como* Vicerrectoría de Contextos-Extensión-Proyección Social, *quiero* que mis convenios territoriales incluyan cláusulas de co-creación y no solo de prestación de servicios, *para que* la extensión sea bidireccional.

### 3.2 · Responsabilidades no exclusivas ni excluyentes

**US-G-04** · *Como* Directora de una Escuela, *quiero* poder articularme con las 3 VRs simultáneamente sin que ninguna me exija exclusividad, *para que* mis programas académicos integren formación, investigación y extensión.

**US-G-05** · *Como* Vicerrector, *quiero* tener claridad sobre qué decisiones son de mi competencia exclusiva, cuáles son compartidas y cuáles son de otra VR, *para que* no haya conflictos de jurisdicción.

**US-G-06** · *Como* CSU, *quiero* que el Anexo G establezca un principio explícito de "no exclusividad misional", *para que* las VRs colaboren en lugar de competir por territorio.

### 3.3 · Mecanismos de articulación

**US-G-07** · *Como* Coordinador de un proyecto cross-VR, *quiero* contar con un protocolo de articulación con plazos, responsables y formatos estandarizados, *para que* no dependa de relaciones personales.

**US-G-08** · *Como* DGE&P, *quiero* que el Anexo G defina al menos 5 mecanismos de articulación operativos (físicos, digitales, normativos), *para que* pueda monitorear su funcionamiento.

### 3.4 · Plataformas de interoperabilidad

**US-G-09** · *Como* investigador, *quiero* acceder a una plataforma digital que me permita conectar con estudiantes de pregrado (UROP), empresas (prácticas) y comunidades (extensión), *para que* mis proyectos tengan múltiples salidas.

**US-G-10** · *Como* estudiante, *quiero* que mi trayectoria académica se registre en un sistema único que las 3 VRs puedan consultar, *para que* mis prácticas, investigaciones y servicio social se reconozcan de forma integrada.

### 3.5 · Escuelas permeando la fuerza de trabajo de las tres Vicerrectorías

**US-G-11** · *Como* Decano, *quiero* que el 30% del tiempo de mis docentes esté dedicado a actividades cross-VR (investigación, extensión, emprendimiento), *para que* la Escuela no sea solo una unidad de enseñanza.

**US-G-12** · *Como* Vicerrector de Investigación, *quiero* que los grupos de investigación incluyan obligatoriamente estudiantes de pregrado y profesores de Escuelas, *para que* la investigación esté anclada en la formación.

**US-G-13** · *Como* Vicerrector de Extensión, *quiero* que los convenios territoriales incluyan participación de Escuelas (profesores y estudiantes), *para que* la extensión no sea solo una oficina central.

---

## 4. Arquitectura de información propuesta para Anexo G v3

```
ANEXO G v3 · GUIA DE PLANES DE ACCION A 8 ANOS
│
├─ §0 · Introduccion · Linaje de esta version v3
│   └─ Tabla de sintesis: EA001 base + EA001a-v2 + EA001b + mejoras G
│
├─ §1 · Principios rectores (NUEVO)
│   ├─ 1.1 · ADN universidad-emprendedora & transformativa
│   ├─ 1.2 · Responsabilidades misionales NO exclusivas ni excluyentes
│   ├─ 1.3 · Articulacion como valor, no como excepcion
│   ├─ 1.4 · Interoperabilidad por diseno
│   └─ 1.5 · Escuelas como nucleo permeador de las 3 VRs
│
├─ §2 · Marco de planeacion: los 8 anos del CONSOLIDADOR (heredado)
│   ├─ 2.1 · Fases del Plan Minimo Viable
│   └─ 2.2 · Retroalimentaciones QMT a mantener activas
│
├─ §3 · Metodologia: 5 pasos por dependencia (heredado + enriquecido)
│   ├─ 3.1 · Paso 1: Diagnostico de linea base
│   ├─ 3.2 · Paso 2: Mapeo de BPAs pertinentes (NUEVO: BPAs cross-VR)
│   ├─ 3.3 · Paso 3: Benchmarking con universidades referentes
│   ├─ 3.4 · Paso 4: Diseno de plan minimo viable por BPA
│   └─ 3.5 · Paso 5: Consolidacion y aprobacion
│
├─ §4 · BPAs cross-VR: las 15 practicas que articulan las 3 misiones (NUEVO)
│   ├─ Tabla maestra: BPA | VRs que la comparten | Escuela permeadora | Plataforma
│   └─ 15 BPAs prioritarias con ficha tecnica
│
├─ §5 · Mecanismos de articulacion (NUEVO)
│   ├─ 5.1 · Mecanismos fisicos (espacios, laboratorios, sedes)
│   ├─ 5.2 · Mecanismos digitales (plataformas, datos, APIs)
│   ├─ 5.3 · Mecanismos normativos (protocolos, reglamentos, RACI)
│   ├─ 5.4 · Mecanismos financieros (fondos mixtos, concurrencia)
│   └─ 5.5 · Mecanismos de talento humano (docentes cross-VR)
│
├─ §6 · Plataformas de interoperabilidad (NUEVO)
│   ├─ 6.1 · Plataforma Academica Integrada (PAI)
│   ├─ 6.2 · Plataforma de Investigacion y Creacion (PIC)
│   ├─ 6.3 · Plataforma de Extension Territorial (PET)
│   ├─ 6.4 · Plataforma de Gestion Estrategica (PGE)
│   └─ 6.5 · Estandares de interoperabilidad
│
├─ §7 · Escuelas permeando la fuerza de trabajo de las 3 VRs (NUEVO)
│   ├─ 7.1 · Modelo de dedicacion docente: 70% formacion / 30% cross-VR
│   ├─ 7.2 · Matriz de permeabilidad Escuela-VR
│   ├─ 7.3 · Indicadores de permeabilidad
│   └─ 7.4 · Incentivos y reconocimiento
│
├─ §8 · Matriz de articulacion entre dependencias (heredado + ampliado)
│
├─ §9 · Minimizacion de friccion organizacional (heredado)
│
├─ §10 · Formatos de entrega (heredado + nuevos productos)
│
└─ §11 · Glosario de terminos (NUEVO)
```

---

## 5. Criterios de aceptación para Anexo G v3

| # | Criterio | Como verificarlo |
|---|---|---|
| CA-01 | El Anexo G incluye al menos 5 principios rectores, dos de los cuales son ADN emprendedor y responsabilidades no exclusivas | Revisión de §1 |
| CA-02 | Existe una tabla maestra de BPAs cross-VR que muestra qué BPAs comparten 2+ VRs | Revisión de §4 |
| CA-03 | Se definen al menos 5 mecanismos de articulación (físicos, digitales, normativos, financieros, de talento) | Revisión de §5 |
| CA-04 | Se proponen al menos 4 plataformas de interoperabilidad con funciones definidas | Revisión de §6 |
| CA-05 | Existe una matriz de permeabilidad Escuela-VR con indicadores medibles | Revisión de §7 |
| CA-06 | El formato de entrega incluye un producto nuevo: "Plan de permeabilidad Escuela-VR" | Revisión de §10 |
| CA-07 | El Anexo G se conecta explícitamente con los Anexos A-F v3 (referencias cruzadas) | Revisión de notas al pie y §0 |
| CA-08 | El lenguaje es no excluyente: en ninguna parte se afirma que una función "pertenece exclusivamente" a una VR | Revisión textual con búsqueda de "exclusiva", "exclusivo", "solo", "únicamente" |

---

## 6. Riesgos de implementación del Anexo G v3

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Las VRs rechazan el principio de no-exclusividad, alegando autonomía funcional | Alta | Alto | Anclar en Art. 60bis (Comité Inter-VR) como instancia de mediación; incluir en Anexo F como decisión derivada |
| R2 | Las Escuelas resisten el modelo 70/30 por carga académica | Media | Alto | Vincular al Estatuto Docente (futuro); iniciar con voluntarios; medir con encuestas |
| R3 | No hay presupuesto para plataformas de interoperabilidad | Alta | Medio | Diseñar como evolución de sistemas existentes (SIGUD, Moodle, ORCID); buscar alianzas externas |
| R4 | El Anexo G queda demasiado largo y nadie lo lee | Media | Medio | Mantener formato de guía metodológica (no plan listo); usar tablas, fichas y matrices; máximo 15 páginas HTML |
| R5 | Las plataformas de interoperabilidad se confunden con un ERP único | Media | Alto | Distinguir claramente: interoperabilidad = estándares + APIs; ERP = sistema transaccional |

---

## 7. Próximos pasos (para implementación)

| # | Tarea | Responsable | Plazo | Producto |
|---|---|---|---|---|
| 1 | Validar este AUDIT-plan con el usuario | Roo | Inmediato | Aprobación / ajustes |
| 2 | Redactar Anexo G v3 siguiendo la arquitectura §4 | Roo | 1 sesión | `anexo-G-v3--guia-plan-accion-8-anos.md` |
| 3 | Convertir Anexo G v3 a HTML con calidad v2 | Roo | 1 sesión | `anexo-G-v3--guia-plan-accion-8-anos.html` |
| 4 | Actualizar resumen ejecutivo HTML para referenciar 7 anexos | Roo | 1 sesión | `res-EA-001a-v3--ejecutivo-csu-cambios-propuestos.html` actualizado |
| 5 | Sincronizar archivos markdown v3 al vault de Obsidian | Usuario | Post-entrega | Archivos en `20-estrategias/analisis-iniciativa-complementaria-v3/outputs/` |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-30*
*AUDIT-AG-v3-001 · Plan de construcción del Anexo G v3*
