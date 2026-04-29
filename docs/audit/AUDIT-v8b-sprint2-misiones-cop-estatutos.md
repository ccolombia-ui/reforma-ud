---
kd_id: audit/v8b-sprint2-misiones-cop-estatutos
kd_version: 1.0.0
kd_date: 2026-04-29
kd_status: PROPOSED
kd_doc_type: AUDIT + SPEC
kd_title: v8b Sprint 2 · Misiones de CoP + árbol de estatutos UDFJC
---

# AUDIT v8b Sprint 2 · Misiones de CoP + árbol de estatutos UDFJC

> **Pregunta trazadora.** ¿Cómo modelar misiones específicas de comunidad (distintas de M01-M12) que sean replicables entre CoPs, soporten tres tipos de actividad (comprensión / deliberación / producción) y reflejen el árbol normativo real de estatutos que el CSU debe aprobar y las Vicerrectorías deben proponer?

---

## 0 · TL;DR

- **Dos capas de misión** distintas y compatibles: Misiones Canónicas (M01-M12, globales) y Misiones de Comunidad (contextuales por CoP, replicables).
- **Tres tipos** de misión de comunidad: `comprensión` · `deliberación` · `producción`.
- **CSU** es la comunidad ancla: sus misiones modelan la participación en la reforma y la construcción de estatutos.
- **Árbol de estatutos** derivado de Ley 30/1992 + Decreto 1279/2002 + ACU-004-25: 10 estatutos en 4 vicerrectorías. CSU aprueba todos; cada Vicerrectoría propone los suyos.
- **Misiones de estatuto** son template replicable: comprensión (papers) → deliberación (borrador) → producción (constancia de participación).
- **Implementación**: nuevo campo `misionesCoP` en frontmatter de comunidad + componente `<CoPMissionCard />`.

---

## 1 · Dos capas de misión — diferencia conceptual

```
CAPA 1 · Misiones Canónicas (M01-M12)
  ├── Globales — igual para todo usuario
  ├── Secuenciales — M01 desbloquea M02
  ├── Fuente: papers canónicos del corpus
  └── Resultado: CCA individual (constancia de comprensión)

CAPA 2 · Misiones de Comunidad (CoP Missions)
  ├── Contextuales — específicas de cada CoP
  ├── Replicables — mismo template, distinta instancia
  ├── Fuente: papers + documentos de la CoP
  ├── Tipos: comprensión | deliberación | producción
  └── Resultado: nivel en la CoP (N1 → N2 → N3 → N4)
```

Las dos capas son **compatibles y complementarias**: una Misión de Comunidad puede requerir haber completado M01 (capa 1) como prerequisito.

---

## 2 · Tipos de Misión de Comunidad

### Tipo A · Comprensión

El miembro lee un paper/norma y responde preguntas de comprensión contextualizadas para su rol en la CoP.

```yaml
tipo: comprension
papers: [m01, m03]
preguntas: 3-5  # específicas del contexto CoP
resultado: nivel_up o confirmacion_nivel
```

### Tipo B · Deliberación

El miembro participa en la revisión de un documento (borrador de estatuto, propuesta de acuerdo). Su participación queda registrada.

```yaml
tipo: deliberacion
documento: "borrador-estatuto-docente-v1.md"
actividades:
  - leer_borrador
  - enviar_comentario  # mínimo 1 comentario sustantivo
  - votar_aprobacion
resultado: constancia_participacion
```

### Tipo C · Producción

El miembro co-crea un artefacto (capítulo, propuesta, protocolo). Nivel N4 solamente.

```yaml
tipo: produccion
artefacto: "capitulo-gobernanza-pid-2026-2034"
actividades:
  - redactar_seccion
  - revision_pares
  - submit_al_csu
resultado: autoria_reconocida
```

---

## 3 · Árbol de estatutos UDFJC — mapa normativo

Investigado contra: Ley 30/1992 · Decreto 1279/2002 · ACU-004-25 · Acuerdo 003/1997 UDFJC.

```
CSU (aprueba todo)
│
├── ESTATUTO GENERAL ← paraguas institucional
│   Base: Ley 30 Art. 28-29 + Acuerdo 003/1997 (requiere actualización post ACU-004-25)
│   Propone: Rectoría
│
├── ESTATUTO ACADÉMICO ← meta-estatuto (consolida misiones formativas)
│   Base: ACU-004-25 Art. 8-17 + Ley 30 Art. 19
│   Propone: Consejo Académico + Vicerrectorías
│   │
│   ├── VR FORMACIÓN propone:
│   │   ├── Estatuto Docente
│   │   │   Base: Ley 30 + Decreto 1279/2002 (escalafón)
│   │   │   Vigente: Acuerdo CSU 011/2002
│   │   │   Papers: M06 (créditos CCA), M04 (roles docente)
│   │   │
│   │   ├── Estatuto Estudiantil
│   │   │   Base: Ley 30 Art. 98 + Acuerdo 027/1993
│   │   │   Vigente: Estatuto Estudiantil 2003
│   │   │   Papers: M04 (JTBD comunidad), M05 (CABA)
│   │   │
│   │   ├── Estatuto Curricular
│   │   │   Base: Ley 30 Art. 19 (diseño curr.) + Acuerdo CA
│   │   │   Papers: M03 (estándares OECD), M06 (créditos CCA)
│   │   │
│   │   └── Estatuto de Bienestar Universitario
│   │       Base: Ley 30 Art. 117
│   │       Papers: M02 (ciclo virtuoso)
│   │
│   ├── VR INVESTIGACIÓN Y CREACIÓN propone:
│   │   └── Estatuto de Investigación y Creación
│   │       Base: Ley 30 Art. 19 (función investigativa)
│   │       Papers: M07 (BPAs), M05 (ciclo Pasteur)
│   │
│   └── VR EXTENSIÓN propone:
│       └── Estatuto de Extensión y Proyección Social
│           Base: Ley 30 Art. 120
│           Papers: M02 (ciclo virtuoso), M07 (BPAs)
│
└── OTROS ESTATUTOS CSU:
    ├── Estatuto Presupuestal
    │   Base: Ley 30 + NICSP (M09 draft)
    │   Propone: VR Administrativa y Financiera
    │
    └── Estatuto de Propiedad Intelectual
        Base: Ley 23/1982 + Decisión Andina 351/1993
        Propone: VR Investigación
```

---

## 4 · Misiones de la comunidad CSU

### Estructura propuesta en `content/comunidades/gobierno/csu/index.mdx`

```yaml
misionesCoP:

  - id: CSU-MC-01
    slug: participa-en-la-reforma-ud-que-queremos
    titulo: "Participa en la Reforma UD que Queremos"
    tipo: comprension
    descripcion: "Comprende por qué la reforma es un mandato constitucional y no una opción discrecional."
    papers: [m01, m03]
    nivelRequerido: 0
    nivelOtorga: 1
    prerequisitosCanonicas: []
    orden: 1

  - id: CSU-MC-02
    slug: nueva-estructura-organizativa
    titulo: "Nueva Estructura Organizativa"
    tipo: comprension
    descripcion: "Comprende el modelo Escuela Emprendedora Transformativa como reemplazo de la estructura Facultad/Programa."
    papers: [m02, m05]
    nivelRequerido: 1
    nivelOtorga: 2
    prerequisitosCanonicas: [m01]
    orden: 2

  - id: CSU-MC-03-A
    slug: estatuto-academico-docente
    titulo: "Estatuto Docente — construcción participativa"
    tipo: deliberacion
    descripcion: "Revisa y comenta el borrador de Estatuto Docente propuesto por VR Formación."
    documento: "estatuto-docente-borrador-v1"
    papers: [m04, m06]
    nivelRequerido: 2
    nivelOtorga: null   # no sube nivel, suma constancia
    prerequisitosCanonicas: [m01, m04, m06]
    estatuto: "estatuto-docente"
    orden: 3

  - id: CSU-MC-03-B
    slug: estatuto-academico-estudiantil
    titulo: "Estatuto Estudiantil — construcción participativa"
    tipo: deliberacion
    descripcion: "Revisa y comenta el borrador de Estatuto Estudiantil."
    documento: "estatuto-estudiantil-borrador-v1"
    papers: [m04, m05]
    nivelRequerido: 2
    nivelOtorga: null
    prerequisitosCanonicas: [m01, m04]
    estatuto: "estatuto-estudiantil"
    orden: 4

  - id: CSU-MC-03-C
    slug: estatuto-academico-curricular
    titulo: "Estatuto Curricular — construcción participativa"
    tipo: deliberacion
    papers: [m03, m06]
    nivelRequerido: 2
    nivelOtorga: null
    prerequisitosCanonicas: [m01, m03, m06]
    estatuto: "estatuto-curricular"
    orden: 5

  - id: CSU-MC-04
    slug: estatuto-academico-consolidado
    titulo: "Estatuto Académico — aprobación CSU"
    tipo: produccion
    descripcion: "Con los tres sub-estatutos deliberados, el CSU consolida y aprueba el Estatuto Académico."
    prerequisitosMision: [CSU-MC-03-A, CSU-MC-03-B, CSU-MC-03-C]
    nivelRequerido: 3
    nivelOtorga: 4
    orden: 6
```

---

## 5 · Misiones de las Vicerrectorías (replicadas del template CSU)

### VR Formación — misiones de estatuto

| Misión | Tipo | Estatuto | Papers fuente |
|---|---|---|---|
| `vrf-mc-01-estatuto-docente` | deliberación | Estatuto Docente | M04, M06 |
| `vrf-mc-02-estatuto-estudiantil` | deliberación | Estatuto Estudiantil | M04, M05 |
| `vrf-mc-03-estatuto-curricular` | deliberación | Estatuto Curricular | M03, M06 |
| `vrf-mc-04-estatuto-bienestar` | deliberación | Estatuto Bienestar | M02 |

### VR Investigación y Creación

| Misión | Tipo | Estatuto | Papers fuente |
|---|---|---|---|
| `vri-mc-01-estatuto-investigacion` | deliberación | Estatuto Investigación y Creación | M07, M05 |
| `vri-mc-02-prop-intelectual` | deliberación | Estatuto Propiedad Intelectual | M07 |

### VR Extensión

| Misión | Tipo | Estatuto | Papers fuente |
|---|---|---|---|
| `vre-mc-01-estatuto-extension` | deliberación | Estatuto Extensión | M02, M07 |

---

## 6 · Template de misión replicable

El patrón de "misión de estatuto" es idéntico en todas las vicerrectorías:

```typescript
// src/lib/cop-mission-template.ts

type MisionCoPTemplate = {
  tipo: 'comprension' | 'deliberacion' | 'produccion';
  papers: string[];           // paperId[] de la capa canónica
  nivelRequerido: 0 | 1 | 2 | 3 | 4;
  nivelOtorga?: 1 | 2 | 3 | 4;
  prerequisitosCanonicas?: string[];   // misiones M01-M12 requeridas
  prerequisitosMision?: string[];      // misiones CoP requeridas
  estatuto?: string;          // id del estatuto que construye
};
```

Cada comunidad en su `index.mdx` instancia el template con sus datos específicos. El componente `<CoPMissionCard />` los renderiza uniformemente.

---

## 7 · Modelo de datos — schema Velite para misionesCoP

Agregar a `community` collection en `velite.config.ts`:

```typescript
misionesCoP: s.array(
  s.object({
    id: s.string(),
    slug: s.string(),
    titulo: s.string(),
    tipo: s.enum(['comprension', 'deliberacion', 'produccion']),
    descripcion: s.string().optional(),
    papers: s.array(s.string()).default([]),
    nivelRequerido: s.number().default(0),
    nivelOtorga: s.number().optional(),
    prerequisitosCanonicas: s.array(s.string()).default([]),
    prerequisitosMision: s.array(s.string()).default([]),
    estatuto: s.string().optional(),
    orden: s.number().default(99),
  })
).default([]),
```

---

## 8 · Componente `<CoPMissionCard />`

```tsx
// src/components/comunidad/cop-mission-card.tsx

type MisionCoP = {
  id: string;
  titulo: string;
  tipo: 'comprension' | 'deliberacion' | 'produccion';
  papers: string[];
  nivelRequerido: number;
  nivelOtorga?: number;
  prerequisitosCanonicas: string[];
  estatuto?: string;
};

type Props = {
  mision: MisionCoP;
  userLevel: number;          // nivel actual del usuario en la CoP
  earnedCCAs: string[];       // CCAs canónicas ganadas
  onStart: () => void;
};
```

**Estados visuales:**

```
🔒 Bloqueada       → nivelRequerido > userLevel o prerequisitos no cumplidos
▶️ Disponible      → puede iniciar
⏳ En progreso     → inició pero no completó
✅ Completada      → constancia emitida
```

**Badge de tipo:**
- `comprensión` → 📖 azul
- `deliberación` → ⚖️ naranja
- `producción` → 🏗️ verde

---

## 9 · Relación con la misión global de la página `/mision`

La página `/mision` actual muestra **solo la capa canónica** (M01-M12). Propuesta:

```
/mision         → Misiones Canónicas M01-M12 (unchanged)
/comunidades/csu#misiones-cop  → Misiones de Comunidad CSU
/comunidades/formacion#misiones-cop → Misiones VR Formación
```

Las misiones de comunidad viven dentro de la página de cada comunidad (tab o sección), no en `/mision`. Esto mantiene las capas separadas y cada CoP gestiona sus propias misiones.

---

## 10 · Plan de implementación (v8b Sprint 2)

### Paso 1 · Schema Velite (30 min)

Agregar `misionesCoP` al schema de `community` en `velite.config.ts`.

### Paso 2 · Componente `<CoPMissionCard />` (2h)

Crear `src/components/comunidad/cop-mission-card.tsx` con los 4 estados visuales y los 3 tipos de badge.

### Paso 3 · Actualizar CSU frontmatter (30 min)

Poblar `misionesCoP` en `content/comunidades/gobierno/csu/index.mdx` con las 6 misiones definidas en §4.

### Paso 4 · Integrar en página de comunidad (1h)

En `src/app/comunidades/[[...slug]]/page.tsx` renderizar `<CoPMissionCard />` para cada misión si la comunidad tiene `misionesCoP`.

### Paso 5 · Tests (1h)

- Unit: `cop-mission-card.test.tsx` — estados locked/available/in-progress/completed
- Unit: lógica de prerequisitos (canónicas + CoP)
- Smoke: `/comunidades/gobierno/csu` renderiza misiones

---

## 11 · ADRs

| ADR | Decisión | Razón |
|---|---|---|
| **ADR-v8b-S2-01** | Misiones de CoP son independientes de M01-M12 | Las misiones canónicas son conocimiento universal; las de CoP son actividades de participación contextual |
| **ADR-v8b-S2-02** | `misionesCoP` vive en el frontmatter de la comunidad | Obsidian-native: el autor gestiona misiones editando el `.mdx` de la comunidad |
| **ADR-v8b-S2-03** | Tres tipos (comprensión, deliberación, producción) | Corresponde a los tres momentos del ciclo de política: aprender → deliberar → producir |
| **ADR-v8b-S2-04** | Misiones de estatuto como template replicable | El patrón docente/estudiantil/curricular se repite en cada vicerrectoría — no duplicar código |
| **ADR-v8b-S2-05** | CSU como comunidad ancla de los estatutos | CSU aprueba todo → sus misiones incluyen la consolidación final; las VR proponen las suyas |
| **ADR-v8b-S2-06** | Misiones de deliberación NO suben nivel de CoP | La deliberación da constancia de participación pero el nivel se gana por comprensión profunda |
| **ADR-v8b-S2-07** | Estatuto Académico consolida sub-estatutos | Misión de producción CSU-MC-04 requiere completar CSU-MC-03-A/B/C (sub-estatutos deliberados) |

---

## 12 · Herencia a v9

En `aleia-portal-engine`:
- `misionesCoP` → campo genérico del schema de comunidad en `packages/portal-content-schema`
- `<CoPMissionCard />` → `packages/portal-engine/src/components/comunidad/`
- Template de estatuto → pattern documentado en `docs/guides/extending-missions.md`
- Cada `apps/<proyecto>/` define sus propias misiones de CoP en frontmatter sin modificar el engine

---

> **Versión:** 1.0.0 · 2026-04-29
> **Estado:** PROPOSED — pendiente aprobación para iniciar Paso 1
