![1777522585809](image/AUDIT-v8f-serious-games-sota/1777522585809.png)![1777555169957](image/AUDIT-v8f-serious-games-sota/1777555169957.png)---
kd_id: audit/v8f-serious-games-sota
kd_version: 2.0.0
kd_date: 2026-04-30
kd_status: ACTIVE
kd_doc_type: AUDIT + SPEC + ROADMAP
kd_title: v8f · Serious Games Framework RPG para Construcción Colaborativa de Documentos Fundantes
---

# AUDIT v8f · Serious Games Framework RPG: Construcción Colaborativa de Documentos Fundantes

> **Propósito:** Modelar la participación en la reforma UDFJC como un **RPG (Role-Playing Game) institucional** donde cada miembro progresa desde "Visitante" hasta "Director de Escuela" mediante misiones, exámenes, contribuciones y co-creación. El grafo de conocimiento se convierte en un **mapa de colonización** visual.

---

## Convenciones

- **RPG = Role-Playing Game institucional** — no es un juego de fantasía, es un sistema de roles reales
- **Todo el estado** se modela en frontmatter markdown (Obsidian-native)
- **Diagramas en Mermaid** — erDiagram, sequenceDiagram, flowchart, stateDiagram
- **Tracabilidad:** URLs verificables para cada framework

---

# PARTE I · MODELO DE ENTIDADES (ER Diagram)

```mermaid
erDiagram
    PLAYER ||--o{ PLAYER_CCA : earns
    PLAYER ||--o{ PLAYER_MISION : completes
    PLAYER ||--o{ PLAYER_LOGRO : unlocks
    PLAYER ||--o{ PLAYER_ESTATUTO : signs
    PLAYER }|--|| ROL : selects
    PLAYER }|--o| COP : belongs_to

    ROL ||--o{ ROL_PERMISO : has
    ROL ||--o{ MISION : unlocks

    COP ||--o{ MISION : defines
    COP ||--o{ ROL : defines
    COP ||--o{ SERVICIO : provides
    COP ||--o| COP : parent
    COP ||--o{ ESTATUTO : deliberates

    MISION ||--o{ CUESTIONARIO : contains
    MISION ||--o{ RECOMPENSA : grants
    MISION ||--o{ PAPER : requires

    PAPER ||--o{ CCA : certifies
    PAPER ||--o{ CONCEPTO : references

    ESTATUTO ||--o{ VERSION : has
    ESTATUTO ||--o{ COMENTARIO : receives
    ESTATUTO ||--o{ VOTO : collects

    PLAYER_CCA {
        string paperId "m01, m02..."
        date fecha "2026-04-30"
        int score "0-100"
    }
    PLAYER_MISION {
        string misionId "CSU-MC-01"
        date completada "2026-04-30"
        int intentos "1-3"
    }
    MISION {
        string id "CSU-MC-01"
        string tipo "comprension|deliberacion|produccion"
        int nivelRequerido "0-4"
        int nivelOtorga "0-4"
        string[] papers "[m01,m02]"
        string fechaCierre "2026-06-15"
    }
    ROL {
        string id "docente-pasteur"
        string nombre "Docente Investigador"
        int nivel "0-4"
        string emoji "🔬"
    }
    COP {
        string slug "comunidades/formacion/escuelas/fisica"
        string tipo "csu|vicerrectoria|escuela|caba|instituto|centro"
        string gateTipo "comprension_previa|invitacion"
    }
    ESTATUTO {
        string id "estatuto/general"
        string estado "BORRADOR|CONSULTA|APROBADO"
        date fechaCierre "2026-06-15"
        int comentarios "47"
    }
```

---

# PARTE II · FRAMEWORKS TEÓRICOS

## 2.1 MDA Framework (Mechanics-Dynamics-Aesthetics)

**Fuente:** Hunicke, R., LeBlanc, M., & Zubek, R. (2004). http://www.cs.northwestern.edu/~hunicke/MDA.pdf

```mermaid
flowchart TD
    subgraph Mechanics["🔧 MECHANICS (Reglas)"]
        M1[Puntos XP]
        M2[Niveles N0-N5]
        M3[CCAs]
        M4[Misiones]
        M5[Gates]
        M6[Streaks]
    end
    subgraph Dynamics["⚡ DYNAMICS (Comportamiento)"]
        D1[Progresión secuencial]
        D2[Altruismo institucional]
        D3[Escasez temporal]
        D4[Competencia social]
    end
    subgraph Aesthetics["🎭 AESTHETICS (Emociones)"]
        A1[Narrativa N1→N4]
        A2[Pertenencia CoP]
        A3[Descubrimiento]
        A4[Reto intelectual]
        A5[Reconocimiento]
    end
    Mechanics --> Dynamics
    Dynamics --> Aesthetics
```

## 2.2 Octalysis — 8 Core Drives

**Fuente:** Chou, Y. (2015). https://yukaichou.com/gamification-book/

```mermaid
flowchart LR
    C1["🎯 Epic Meaning<br/>'La reforma es un mandato constitucional'"]
    C2["🏆 Development<br/>Niveles, CCAs, insignias"]
    C3["🎨 Empowerment<br/>Proponer estatutos"]
    C4["💎 Ownership<br/>'Mi Escuela', 'Mi CABA'"]
    C5["👥 Social<br/>CoPs, mentorías"]
    C6["⏳ Scarcity<br/>Gates temporales"]
    C7["🎲 Curiosity<br/>Papers sorpresa"]
    C8["🛡️ Loss<br/>Progreso incompleto"]
    C1 --> C2 --> C3 --> C4 --> C5 --> C6 --> C7 --> C8
```

---

# PARTE III · PROGRESIÓN DE CARRERA (State Diagram)

## 3.1 Flujo General: Visitante → Director de Escuela

```mermaid
stateDiagram-v2
    [*] --> Visitante
    Visitante --> Observador : Lee M01-M03
    Observador --> Practicante : CCA M01-M03 + Examen ≥80%
    Practicante --> Experto : CCA M05-M07 + Contribución
    Experto --> Mentor : Firma estatuto + 10 apoyos
    Mentor --> Director : Propuesta aprobada por CSU
    Director --> [*] : Gestiona Escuela/CABA

    state Observador {
        [*] --> CSU_Miembro : Mision CSU-MC-01
        [*] --> VR_Miembro : Mision VR-MC-01
    }

    state Practicante {
        [*] --> Aprendiz_Soberano : CCA en CABA
        [*] --> Facilitador_CCA : Supera 80% en CABA
    }

    state Experto {
        [*] --> Investigador_LivingLab : Proyecto Green Campus
        [*] --> Extensionista_Alma : Proyecto Alma Bogotá
        [*] --> Diseñador_Docente : Diseña 3 Paquetes CCA
    }

    state Mentor {
        [*] --> Director_CABA : CABA con 50+ miembros
        [*] --> Director_Escuela : Escuela con 3 CABAs
    }
```

## 3.2 Flujo Específico: Habilitar una CABA

```mermaid
sequenceDiagram
    actor U as Usuario (Estudiante)
    participant E as Escuela de Física
    participant C as CABA Magnetismo
    participant LL as Living Lab

    U->>E: Se inscribe como Aprendiz-Soberano
    E->>U: Mision: Lee M04, M05, M06
    U->>E: CCA-M04 + CCA-M05 + CCA-M06
    E->>U: Nivel 2: Facilitador habilitado

    U->>C: Solicita ingreso a CABA
    C->>U: Gate: Supera 80% en evaluaciones CABA
    U->>C: Examen ≥80% + 2 contribuciones
    C->>U: Nivel 3: Investigador/Extensionista

    U->>LL: Propone proyecto Green Campus
    LL->>C: Validación por Directores CABA
    C->>U: Nivel 4: Diseñador-Docente

    U->>E: Propone nueva CABA (Óptica)
    E->>U: Requiere 3 CABAs activas
    U->>E: CABA Magnetismo + CABA Mecánica + CABA Termo
    E->>U: Nivel 5: Director de Escuela
```

## 3.3 Flujo: Habilitar un Instituto

```mermaid
sequenceDiagram
    actor U as Docente Investigador
    participant VR as VR Investigación
    participant I as Instituto IEIE
    participant RITA as RITA/OTRI

    U->>VR: Se inscribe como Observador
    VR->>U: Mision: Lee M02, M05, M07
    U->>VR: CCA-M02 + CCA-M05 + CCA-M07
    VR->>U: Nivel 2: Practicante

    U->>I: Solicita ingreso a Instituto
    I->>U: Gate: Publica 1 paper + 1 propuesta CONPES
    U->>I: Paper + Propuesta
    I->>U: Nivel 3: Experto (Investigador Pasteur)

    U->>RITA: Lidera línea de investigación
    RITA->>I: Validación por pares
    I->>U: Nivel 4: Mentor (Director de Línea)

    U->>VR: Propone nuevo Instituto
    VR->>U: Requiere 2 líneas + financiación
    U->>VR: Línea 1 + Línea 2 + $500M
    VR->>U: Nivel 5: Director de Instituto
```

## 3.4 Flujo: Habilitar un Centro de Extensión

```mermaid
sequenceDiagram
    actor U as Extensionista
    participant VR as VR Extensión
    participant C as Centro ILUD
    participant COM as Comunidad

    U->>VR: Se inscribe como Observador
    VR->>U: Mision: Lee M02, M05, M07
    U->>VR: CCA-M02 + CCA-M05 + CCA-M07
    VR->>U: Nivel 2: Practicante

    U->>C: Solicita ingreso a Centro
    C->>U: Gate: 2 proyectos comunitarios
    U->>C: Proyecto 1 + Proyecto 2
    C->>U: Nivel 3: Experto

    U->>COM: Lidera proyecto Alma Bogotá
    COM->>C: Impacto medible ≥100 beneficiarios
    C->>U: Nivel 4: Mentor

    U->>VR: Propone nuevo Centro
    VR->>U: Requiere 3 proyectos + sostenibilidad
    U->>VR: Proyectos + Modelo de sostenibilidad
    VR->>U: Nivel 5: Director de Centro
```

---

# PARTE IV · SISTEMA DE RETOS

## 4.1 Tipos de Retos

```mermaid
flowchart TD
    subgraph Retos["🎯 SISTEMA DE RETOS"]
        R1["📚 EXÁMENES DE COMPRENSIÓN"]
        R2["✍️ APORTES ESCRITOS"]
        R3["🏗️ CO-CREACIÓN DE INICIATIVAS"]
    end

    R1 --> R1a["Cuestionario M01: 4 preguntas<br/>≥3/4 correctas → CCA"]
    R1 --> R1b["Ensayo reflexivo M05: 500 palabras<br/>Evaluado por pares → CCA"]
    R1 --> R1c["Debate deliberativo M07: 3 posiciones<br/>Consenso ≥70% → CCA"]

    R2 --> R2a["Comentario en estatuto: ≥200 palabras<br/>Aprobado por moderador → XP +50"]
    R2 --> R2b["Propuesta de mejora: formato estándar<br/>10 apoyos → Integrada"]
    R2 --> R2c["Wiki-link: Conecta 5 conceptos<br/>Verificado → Insignia 'Conector'"]

    R3 --> R3a["Crear CABA: 5 miembros + plan<br/>Aprobado por Escuela → Nueva CABA"]
    R3 --> R3b["Diseñar Paquete CCA: 3 módulos<br/>Evaluado por VR Formación → Certificación"]
    R3 --> R3c["Proyecto Living Lab: presupuesto + cronograma<br/>Financiado → Línea de investigación"]
```

## 4.2 Matriz de Retos por Rol

| Reto | Estudiante | Docente | Director | Investigador | Extensionista |
|---|---|---|---|---|---|
| **Examen M01-M03** | ✅ Obligatorio | ✅ Obligatorio | ✅ Obligatorio | ✅ Obligatorio | ✅ Obligatorio |
| **Examen M05-M07** | ⚠️ Opcional | ✅ Obligatorio | ✅ Obligatorio | ✅ Obligatorio | ✅ Obligatorio |
| **Comentar estatuto** | ❌ Nivel 2+ | ✅ Nivel 2+ | ✅ Nivel 1+ | ✅ Nivel 2+ | ✅ Nivel 2+ |
| **Proponer estatuto** | ❌ Nivel 3+ | ❌ Nivel 3+ | ✅ Nivel 3+ | ❌ Nivel 3+ | ❌ Nivel 3+ |
| **Crear CABA** | ❌ Nivel 4+ | ❌ Nivel 4+ | ✅ Nivel 4+ | ❌ Nivel 4+ | ❌ Nivel 4+ |
| **Proyecto Living Lab** | ⚠️ Nivel 3+ | ✅ Nivel 3+ | ✅ Nivel 2+ | ✅ Nivel 3+ | ⚠️ Nivel 3+ |
| **Proyecto Alma Bogotá** | ⚠️ Nivel 2+ | ⚠️ Nivel 2+ | ⚠️ Nivel 2+ | ⚠️ Nivel 2+ | ✅ Nivel 2+ |

---

# PARTE V · MAPA DE COLONIZACIÓN (Grafo Gamificado)

## 5.1 Concepto

> El grafo semántico 2D/3D del corpus se convierte en un **mapa de colonización**: cada nodo representa un territorio de conocimiento. Al completar una misión, el territorio cambia de color (de gris a tu color de CoP).

```mermaid
flowchart LR
    subgraph Nodos_Gris["⬜ No colonizado"]
        G1[M08 DRAFT]
        G2[M09 DRAFT]
        G3[M10 DRAFT]
    end
    subgraph Nodos_Verde["🟢 Colonizado por Formación"]
        V1[M01 PUBLISHED]
        V2[M04 PUBLISHED]
        V3[M06 PUBLISHED]
    end
    subgraph Nodos_Azul["🔵 Colonizado por Gobierno"]
        A1[M02 PUBLISHED]
        A2[M03 PUBLISHED]
        A3[M05 PUBLISHED]
        A4[M07 PUBLISHED]
    end
    subgraph Nodos_Naranja["🟠 En disputa"]
        N1[Estatuto General]
        N2[Estatuto Docente]
    end

    U1[Usuario A<br/>N3 Experto] --> V1
    U1 --> A1
    U2[Usuario B<br/>N2 Practicante] --> V2
    U3[Usuario C<br/>N4 Mentor] --> N1
    U3 --> N2
```

## 5.2 Visualización en el Portal

```mermaid
sequenceDiagram
    actor U as Usuario
    participant G as Grafo 3D
    participant S as Sidebar
    participant P as Perfil

    U->>G: Explora grafo semántico
    G->>U: Muestra nodos coloreados por CoP
    U->>G: Click en nodo gris (M08)
    G->>U: "🔒 Requiere CCA-M07 + Nivel 3"
    U->>S: Navega a M07
    S->>U: Muestra cuestionario
    U->>P: Completa cuestionario ≥80%
    P->>G: Emite evento 'node-colonized'
    G->>U: Nodo M08 cambia a color de CoP
    G->>U: Animación de conquista 🎉
```

---

# PARTE VI · FRAMEWORKS RPG OPEN SOURCE

## 6.1 Opción A: Habitica (Open Source RPG Task Manager)

**Repo:** https://github.com/HabitRPG/habitica
**Web:** https://habitica.com/
**Licencia:** GPL-3.0

```mermaid
flowchart TD
    H["HABITICA<br/>Open Source RPG"] --> H1["✅ Pros"]
    H --> H2["❌ Contras"]
    H1 --> H1a["Mecánicas RPG probadas<br/>Niveles, HP, XP, mascotas"]
    H1 --> H1b["API REST completa"]
    H1 --> H1c["Comunidad activa 4M+ usuarios"]
    H1 --> H1d["Self-hostable"]
    H2 --> H2a["Dependencia externa<br/>o infraestructura propia"]
    H2 --> H2b["No diseñado para deliberación<br/>ni estatutos"]
    H2 --> H2c["MongoDB requerido<br/>complejidad de stack"]
    H2 --> H2d["No nativo markdown/Obsidian"]
```

**Veredicto:** ❌ No recomendado — demasiado pesado, no es markdown-native.

## 6.2 Opción B: OpenBadges (Mozilla / IMS Global)

**Especificación:** https://www.imsglobal.org/activity/digital-badges
**Repo:** https://github.com/mozilla/openbadges-backpack
**Licencia:** MPL-2.0

```mermaid
flowchart TD
    B["OPENBADGES<br/>Especificación W3C"] --> B1["✅ Pros"]
    B --> B2["❌ Contras"]
    B1 --> B1a["Estándar W3C para credenciales digitales"]
    B1 --> B1b["Interoperable entre plataformas"]
    B1 --> B1c["Verificable criptográficamente"]
    B1 --> B1d["JSON-LD nativo<br/>compatible con markdown"]
    B2 --> B2a["Solo badges, no misiones ni niveles"]
    B2 --> B2b["Requiere issuer backend"]
    B2 --> B2c["No gamificación completa"]
```

**Veredicto:** ⚠️ Componente útil para v9 (certificaciones) pero insuficiente solo.

## 6.3 Opción C: Custom Engine (Recomendado)

> **Decision:** No usamos framework externo. Creamos un **engine propio markdown-native** que se alimenta del frontmatter de Obsidian.

```mermaid
flowchart TD
    subgraph Engine["🎮 ALEIA-ZEN RPG ENGINE"]
        E1["Parser: Velite lee frontmatter"]
        E2["Rules Engine: TypeScript puro"]
        E3["State: localStorage + git"]
        E4["Renderer: React + Mermaid"]
    end
    subgraph Obsidian["📝 OBSIDIAN VAULT"]
        O1["content/perfiles/*.md"]
        O2["content/comunidades/*/index.mdx"]
        O3["content/estatutos/*.md"]
    end
    subgraph Portal["🌐 PORTAL NEXT.JS"]
        P1[".velite/ → JSON"]
        P2["Components React"]
        P3["Grafo 3D Three.js"]
    end
    Obsidian -->|"git push"| Engine
    Engine -->|"build"| Portal
```

### ¿Por qué engine propio?

| Criterio | Habitica | OpenBadges | Aleia-Zen |
|---|---|---|---|
| Markdown-native | ❌ | ⚠️ | ✅ |
| Obsidian sync | ❌ | ❌ | ✅ |
| Sin backend | ❌ | ❌ | ✅ |
| Deliberación estatutos | ❌ | ❌ | ✅ |
| Grafo colonización | ❌ | ❌ | ✅ |
| Customizable 100% | ⚠️ | ⚠️ | ✅ |
| Costo de mantenimiento | 💰💰💰 | 💰💰 | 💰 |

---

# PARTE VII · MODELO MARKDOWN-NATIVE

## 7.1 Perfil de Jugador

```markdown
---
kd_type: player_profile
kd_rol: docente-pasteur
kd_nivel_global: 3
kd_ccas: [m01, m02, m03, m05, m07]
kd_misiones: [CSU-MC-01, CSU-MC-02, FOR-MC-01]
kd_xp: 1250
kd_streak: 12
kd_logros:
  - { id: early-adopter, fecha: 2026-04-15 }
  - { id: colonizador-m05, fecha: 2026-04-20 }
---
# Carlos Camilo Madera
Docente Investigador Pasteur
```

## 7.2 Misión CoP

```markdown
---
misionesCoP:
  - id: CSU-MC-01
    slug: mandato-normativo
    titulo: "Mandato Normativo"
    tipo: comprension
    papers: [m01, m02, m03]
    nivelRequerido: 0
    nivelOtorga: 1
    cuestionario:
      - id: q1
        pregunta: "¿Qué documento vincula CONPES 4069 con UDFJC?"
        opciones: ["Acuerdo CSU 04/2025", "Decreto 1279", "Ley 30"]
        correcta: 0
    recompensas:
      - { tipo: cca, id: cca-mandato }
      - { tipo: xp, cantidad: 100 }
    fecha_cierre: "2026-06-15"
---
```

## 7.3 Estatuto con Deliberación

```markdown
---
kd_type: estatuto
deliberacion:
  cop: comunidades/gobierno/csu
  estado: deliberacion_abierta
  fecha_cierre: "2026-06-15"
  comentarios: 47
versiones:
  - { id: v1, fecha: "2026-03-01", cambios: "Inicial" }
  - { id: v2, fecha: "2026-05-01", cambios: "Feedback VR Formación" }
---
# Estatuto General
...cuerpo...
```

---

# PARTE VIII · ROADMAP v8f → v9

```mermaid
gantt
    title Roadmap Implementación RPG
    dateFormat  YYYY-MM-DD
    section v8f
    Perfil + CCAs           :a1, 2026-05-01, 7d
    Cuestionarios inline    :a2, after a1, 10d
    Niveles + Gates         :a3, after a2, 7d
    Grafo colonización      :a4, after a3, 14d
    section v9
    Sync Obsidian ↔ Portal  :b1, after a4, 14d
    Plugin Obsidian custom  :b2, after b1, 21d
    On-chain certs          :b3, after b2, 14d
```

---

# PARTE IX · FUENTES

1. Hunicke, R., et al. (2004). MDA Framework. http://www.cs.northwestern.edu/~hunicke/MDA.pdf
2. Chou, Y. (2015). Octalysis. https://yukaichou.com/gamification-book/
3. Kim, A. J. (2018). Game Thinking. https://gamethinking.io/
4. Deci, E. L., & Ryan, R. M. (2017). SDT. https://selfdeterminationtheory.org/
5. Habitica Repo: https://github.com/HabitRPG/habitica
6. OpenBadges Spec: https://www.imsglobal.org/activity/digital-badges
7. Obsidian Dataview: https://github.com/blacksmithgu/obsidian-dataview
8. Obsidian Meta Bind: https://github.com/mProjectsCode/obsidian-meta-bind-plugin

---

> **Nota de cierre v2.0:** Este AUDIT-v8f establece el motor RPG completo para la reforma UDFJC. No usamos framework externo: el engine es markdown-native, Obsidian-first, y se traduce automáticamente al portal via Velite. Cada entidad (CABA, Instituto, Centro, Escuela) tiene su propio flujo de colonización con retos, exámenes y co-creación.
