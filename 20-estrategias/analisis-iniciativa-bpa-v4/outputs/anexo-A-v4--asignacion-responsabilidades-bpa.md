---
kd_id: urn:udfjc:csu:anexo:2026:v4-A
kd_title: "Anexo A v4 · Asignación de Responsabilidades para Adopción de BPAs"
kd_type: anexo-operativo
kd_status: DRAFT
kd_version: 4.1.0
kd_date: 2026-05-01

acuerdo_id: EA-001a-v4
anexo_letra: A
anexo_version: v4.1.0

transcluible: true
---

# Anexo A v4 · Asignación de Responsabilidades para Adopción de BPAs

> **Nota de versión**: Este documento **enriquece** al Anexo A v3 (asignación de responsabilidades RACI del Acuerdo 004/2025) añadiendo los **roles y responsabilidades específicos para la adopción de las 21 BPAs** definidas en el Anexo v4. No modifica el organigrama ni la planta de cargos del Decreto 785 (Anexo E v3). Es una capa de gobernanza operativa **aditiva**.

---

## 1 · Marco de referencia

### 1.1 · Relación con Anexo A v3

El Anexo A v3 definió la asignación de responsabilidades (RACI) para la estructura organizativa del Acuerdo 004/2025:
- Vicerrectoría de Formación (VR-F)
- Vicerrectoría de Investigación–Creación e Innovación (VR-I)
- Vicerrectoría de Contextos–Extensión y Proyección Social (VR-E)
- CABA (Casa de la Academia, la Biodiversidad y el Agua)
- Dirección de Gestión Estratégica y de Planeación (DGE&P)
- Comité Inter-VR (Art. 60bis)
- Consejo Superior Universitario (CSU)

El Anexo A v4 **conserva intactas** esas asignaciones y añade una **matriz de responsabilidades por BPA** y un **rol nuevo**: el **Embajador v4**.

### 1.2 · Principio de no duplicación

Ningún cargo del Anexo E v3 (planta Decreto 785) se modifica. Las responsabilidades BPA se asignan a:
- **Responsables funcionales** ya existentes (Vicerrectores, Directores).
- **Embajadores v4**: designaciones internas de cada VR (no crean vínculo laboral nuevo).
- **Comité Inter-VR**: ya existente, se le asigna la validación de contratos C1–C8.

---

## 2 · Roles adicionales para adopción de BPAs

### 2.1 · Embajador v4 por Vicerrectoría

| Atributo | Descripción |
|---|---|
| **Nombre del rol** | Embajador v4 de [Nombre de la VR] |
| **Tipo** | Designación interna de la VR (no cargo nuevo) |
| **Ubicación orgánica** | Dependencia de la Vicerrectoría correspondiente |
| **Reporta a** | Vicerrector(a) de la VR |
| **Duración** | 2 años, renovable una vez |

**Responsabilidades**:
1. Entender el catálogo de 21 BPAs (Anexo v4 §5) y explicarlas a su VR.
2. Coordinar el diagnóstico de línea base P5–P1 para las BPAs elegidas por su VR.
3. Alimentar los datos del BSC-S (20 KPIs) en los plazos definidos.
4. Representar a su VR en las sesiones de validación C1–C8 del Comité Inter-VR.
5. Detectar riesgos de incomprensión de v4 dentro de su VR y elevarlos a la DGE&P.

**Perfil ideal**:
- Conocimiento de procesos misionales de su VR.
- Aptitud para manejo de datos e indicadores.
- Capacidad de traducción técnica-política (explicar BPAs a decanos y docentes).

### 2.2 · Coordinador de Secuencia Crítica (CSC)

| Atributo | Descripción |
|---|---|
| **Nombre del rol** | Coordinador de Secuencia Crítica |
| **Tipo** | Función asignada a la DGE&P |
| **Ubicación orgánica** | Oficina Temporal de Transformación (OTT) o DGE&P |
| **Reporta a** | Director(a) de DGE&P |

**Responsabilidades**:
1. Monitorear que la secuencia crítica INT02 → INT01 → I01/INT04 → F01/E02 se cumpla en plazos.
2. Convocar hitos go/no-go semestrales para cada transición de la secuencia.
3. Alertar al Comité Inter-VR cuando una BPA ancla se retrase más de 1 semestre.
4. Mantener el diagrama de Gantt consolidado de las 5 anclas + INT02.

### 2.3 · Responsable de Datos BSC-S (RDB)

| Atributo | Descripción |
|---|---|
| **Nombre del rol** | Responsable de Datos BSC-S |
| **Tipo** | Función asignada a la DGE&P |
| **Ubicación orgánica** | DGE&P – Sistema de Información |

**Responsabilidades**:
1. Recibir las tuplas JSONL de cada VR y validar su estructura.
2. Alimentar el dashboard DataviewJS del BSC-S.
3. Publicar el informe semestral BSC-S (incluso si todos los valores son cero o N/A).
4. Detectar inconsistencias entre KPIs de diferentes VRs y solicitar corrección.

---

## 3 · Matriz RACI por BPA (5 Anclas + INT02)

Esta matriz aplica la metodología RACI (Responsable, Accountable, Consultado, Informado) a las 6 BPAs del plan mínimo viable.

| BPA | VR-F | VR-I | VR-E | CABA | DGE&P | Comité Inter-VR | CSU |
|---|---|---|---|---|---|---|---|
| **BP-INT01** Misión operacionalizada | C | C | C | C | A / R | R | I |
| **BP-INT02** Créditos inv/ext | A / R | C | C | — | C | R | I |
| **BP-I01** UROP | C | A / R | C | C | C | R | I |
| **BP-INT04** CABA Design Factory | C | C | C | A / R | C | R | I |
| **BP-F01** Concepto compartido | A / R | C | — | — | C | R | I |
| **BP-E02** Extensión territorial ODS | — | C | A / R | C | C | R | I |

**Leyenda**:
- **R** (Responsible): Ejecuta la tarea.
- **A** (Accountable): Toma la decisión final; único "A" por BPA.
- **C** (Consulted): Da opinión antes de la decisión.
- **I** (Informed): Recibe información después de la decisión.

### 3.1 · Notas interpretativas de la matriz

- **BP-INT01** es transversal: todas las VRs son consultadas, pero la **DGE&P** es accountable porque coordina el "Proyecto Bogotá" como plan estratégico institucional.
- **BP-INT02** (créditos inv/ext) recae principalmente en **VR-F** porque modifica los planes de estudio de pregrado, pero requiere opinión de VR-I y VR-E para definir qué cuenta como "crédito de investigación" vs "crédito de extensión".
- **BP-INT04** recae en **CABA** porque es su metodología operativa; VR-F e VR-I son consultadas para la oferta académica y de investigación del Design Factory.
- **BP-F01** es exclusivo de **VR-F** en accountability, pero VR-I debe consultarse porque el concepto compartido debe incluir investigación.
- **BP-E02** es exclusivo de **VR-E**, pero CABA es consultada si el territorio coincide con proyectos del Design Factory.

---

## 4 · Matriz RACI por función del framework P5–P1

Cada BPA seleccionada por una VR debe completar las 5 perspectivas. Esta matriz define quién es accountable de cada perspectiva:

| Perspectiva | Accountable | Responsible | Consultado | Informado |
|---|---|---|---|---|
| **P5 · Identidad / JTBD** | Vicerrector(a) de la VR | Embajador v4 | Decanos, Consejo Escuela | CSU |
| **P4 · Fiscal / TDABC** | Director(a) de DGE&P | Analista de planeación financiera | GA&F, Contraloría | CSU |
| **P3 · Técnico / Infraestructura** | Director(a) de TI / Infraestructura | Coordinador de plataforma (PAI/PIC/PET/PGE) | Proveedores, BIM | VRs afectadas |
| **P2 · Ético-cultural / IVC** | Vicerrector(a) de la VR | Embajador v4 + Comité de Cultura Institucional | Docentes, estudiantes, sindicatos | CSU |
| **P1 · Impacto / RBM-GAC** | Director(a) de DGE&P | Evaluador institucional | Entes externos (CNA, MinCiencias) | CSU, comunidad |

---

## 5 · Flujo de decisión por BPA

```
Paso 1: VR diagnostica línea base P5–P1
    ↓
Paso 2: VR selecciona BPAs (≥ 3 del catálogo)
    ↓
Paso 3: VR diseña metas propias (años 2, 4, 8)
    ↓
Paso 4: VR presenta P4 (CAPEX/OPEX TDABC)
    ↓
Paso 5: VR presenta P2 (DOFA cultural + IVC)
    ↓
Paso 6: Comité Inter-VR valida C1–C8
    │    ├─ Aprobado → Paso 7
    │    ├─ Aprobado con ajustes → VR corrige → Paso 6
    │    └─ Rechazado → VR redefine o abandona BPA
    ↓
Paso 7: DGE&P consolida Plan Institucional
    ↓
Paso 8: CSU aprueba o devuelve con observaciones
    ↓
Paso 9: VR ejecuta + alimenta BSC-S semestralmente
```

**Tiempos máximos por paso**:

| Paso | Tiempo máximo | Quién controla |
|---|---|---|
| 1–3 | 4 semanas | VR (Embajador v4) |
| 4 | 2 semanas | VR + DGE&P |
| 5 | 2 semanas | VR + Comité de Cultura |
| 6 | 2 semanas | Comité Inter-VR |
| 7 | 1 semana | DGE&P |
| 8 | 2 semanas | CSU (según cronograma de sesiones) |
| **Total** | **13 semanas** (1 semestre académico) | — |

---

## 6 · Conflictos de responsabilidad y resolución

### 6.1 · Conflicto tipo 1: dos VRs quieren la misma BPA

**Ejemplo**: BP-I01 UROP interesa a VR-F (formación) y VR-I (investigación).

**Resolución**:
1. La matriz RACI define accountability: VR-I es A/R de I01.
2. VR-F puede adoptarla como BPA propia si negocia con VR-I una versión adaptada (ej. UROP-light para formación profesional).
3. Si no hay acuerdo, el Comité Inter-VR decide en sesión ordinaria con criterio de menor duplicación y mayor sinergia.

### 6.2 · Conflicto tipo 2: una BPA requiere recursos que la VR no tiene

**Ejemplo**: VR-E quiere BP-E01 TTO pero no tiene presupuesto para CAPEX.

**Resolución**:
1. La VR presenta P4 con déficit declarado.
2. DGE&P evalúa si el déficit puede cubrirse con:
   - Reasignación dentro de la VR (eficiencia).
   - Fuentes externas (PIIOM, alianzas).
   - Escenario más conservador (S1 en lugar de S3).
3. Si ninguna opción es viable, la BPA se posterga al siguiente ciclo de planificación.

### 6.3 · Conflicto tipo 3: resistencia cultural bloquea IVC

**Ejemplo**: BP-F01 Concepto compartido tiene IVC = 0,3 (muy bajo) porque los docentes se oponen a perder libertad de cátedra.

**Resolución**:
1. La VR no puede aprobar la BPA sin plan de mitigación.
2. El plan debe incluir: co-diseño con Escuelas, piloto voluntario, incentivos (reconocimiento, no sanción).
3. Si después de 1 semestre de mitigación el IVC no sube a ≥ 0,6, la BPA se congela y se reevalúa en el siguiente ciclo.

---

## 7 · Tabla resumen de contactos v4

| Rol | Nombre (a designar) | Dependencia | Correo institucional | Función principal |
|---|---|---|---|---|
| Embajador v4 – VR Formación | [Pendiente] | VR Formación | [Pendiente] | BPAs F1–F5, INT02 |
| Embajador v4 – VR Investigación | [Pendiente] | VR Investigación | [Pendiente] | BPAs I1–I5 |
| Embajador v4 – VR Extensión | [Pendiente] | VR Extensión | [Pendiente] | BPAs E1–E4 |
| Embajador v4 – CABA | [Pendiente] | CABA | [Pendiente] | BPAs INT3–INT7 |
| Coordinador Secuencia Crítica | [Pendiente] | DGE&P | [Pendiente] | Gantt anclas + INT02 |
| Responsable Datos BSC-S | [Pendiente] | DGE&P | [Pendiente] | JSONL + dashboard |
| Presidente Comité Inter-VR | [Pendiente] | Rectoría / VR en turno | [Pendiente] | Validación C1–C8 |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-05-01*
*Anexo A v4 · Asignación de Responsabilidades BPA v4.1.0*
*Aditivo al Anexo A v3 · RACI por 6 BPAs mínimo viable · Roles Embajador v4, CSC, RDB*
