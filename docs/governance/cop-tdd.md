---
kd_id: urn:aleia:udfjc:reforma:governance:cop-tdd
kd_title: "TDD para Comunidades de Práctica — reforma·ud"
kd_version: 1.0.0
kd_created: 2026-04-24
kd_license: CC BY-SA 4.0
status: ACTIVE
tags: [governance, tdd, cop, specification-by-example, diataxis, github-flow]
---

# TDD para Comunidades de Práctica (CoP) — reforma·ud

> **SOTA 2026**: aplicar Test-Driven Development como marco de gobernanza para el portal y el corpus MI-12. El principio rector: **escribir primero el criterio de aceptación, luego el contenido que lo satisface**.

---

## §1 Por qué TDD para una CoP

TDD en software garantiza que el código cumple lo que se prometió antes de escribirse. En una CoP académica, el equivalente es: **el paper, la BPA o la guía de rol cumple lo que la pregunta trazadora prometió antes de publicarse**.

El ciclo es idéntico:

```
Red (falla)              Green (pasa)           Refactor
    │                        │                      │
Pregunta                Paper draft            Peer review
trazadora    ──────►    responde               + mejora
abierta                 la pregunta            v2.0.0
(Issue)                 (Draft PR)             (Merge)
```

---

## §2 Los 4 marcos SOTA que usamos

### 2.1 DIATAXIS (Procida 2021) — taxonomía de documentación

Todo documento del corpus MI-12 cae exactamente en uno de 4 tipos:

| Tipo | Orientado a | Sirve para | Criterio de éxito |
|------|-------------|------------|-------------------|
| **Tutorial** | Aprendizaje | Seguir una ruta guiada | El lector completa la ruta sin atascarse |
| **How-to** | Tarea concreta | Resolver un problema específico | El lector resuelve el problema |
| **Reference** | Consulta | Acceder a datos exactos (BPAs, schemas, tokens) | Exactitud, completitud, sin ambigüedad |
| **Explanation** | Comprensión | Entender el "por qué" | El lector puede explicar el concepto a otro |

**Mapeo MI-12 → DIATAXIS**:

| Documento | Tipo DIATAXIS |
|-----------|---------------|
| M01–M11 papers | Explanation + How-to (mixto) |
| M12 meta-paper | Reference |
| Guías de CoP por rol | Tutorial |
| Fichas BPA | Reference |
| POC v4.2 | Explanation |
| CONTRIBUTING.md | How-to |

**Test de clasificación**: si no puedes decir claramente a qué tipo pertenece un documento, está mezclando propósitos → refactor.

### 2.2 Specification by Example (Adzic 2011) — criterios de aceptación

Cada **paper M##** y cada **BPA** tiene criterios de aceptación formalizados como escenarios Gherkin:

```gherkin
# M05 — Ontología Escuela Emprendedora Transformativa
Feature: Un estudiante entiende qué es la Escuela Emprendedora Transformativa

  Scenario: Lector nuevo sin contexto previo
    Given que soy estudiante sin conocimiento del Acuerdo CSU 04/2025
    When leo el paper M05 completo
    Then puedo explicar qué es una CABA con mis propias palabras
    And puedo identificar en qué Escuela y CABA pertenecería mi programa
    And puedo nombrar al menos 3 BPAs que activaría mi Escuela

  Scenario: Director de programa evaluando factibilidad
    Given que soy director de programa evaluando la implementación
    When leo la sección §H (Salto cuántico N1→N4)
    Then puedo ubicar a mi programa en el nivel N actual
    And tengo un mapa de las 3 primeras BPAs que debería activar
```

**Ubicación**: cada paper M## tiene su archivo `_spec/m##.feature` en `content/specs/`.

### 2.3 GitHub Flow como ciclo TDD

**El flujo canónico para cada contribución**:

```
1. RED    → Abrir Issue descriptivo con:
            - Tipo: [paper] [bpa] [cop] [bug] [feature]
            - Criterio de aceptación (escenario Gherkin o checklist)
            - Rol autor + rol reviewer

2. GREEN  → Crear rama feature/m##-titulo o fix/descripcion
            → Abrir Draft PR vinculado al Issue
            → Escribir contenido hasta que TODOS los criterios pasan
            → Mover PR a "Ready for Review"

3. REFACTOR → Peer review (CODEOWNERS por rol)
              → Aplicar feedback
              → Merge a main (auto-deploy Vercel)
              → Cerrar Issue
              → Changeset si aplica versión bump
```

**Definition of Done (DoD) por tipo**:

| Tipo | Criterios mínimos para merge |
|------|------------------------------|
| **Paper M##** | ① Pregunta trazadora respondida explícitamente ② Mínimo 3 fuentes primarias ③ Diagrama Mermaid o tabla ④ Callout `[!abstract]` con resumen ⑤ Peer review de CoP champion del rol principal |
| **Ficha BPA** | ① ID único (BP-F/I/E/INT##) ② R-Clark activadas ③ Referente global con URL ④ Mecanismo CABA descrito ⑤ Prioridad P1/P2/P3 |
| **Guía CoP** | ① Persona objetivo explícita ② Mínimo 3 pasos de contribución ③ Enlace a Discussion category ④ Ejemplo concreto |
| **Corrección** | ① Test que reproduzca el error ② Fix ③ Tests actualizados |

### 2.4 Wenger CoP lifecycle — el "test suite" de la comunidad

Wenger (1998) define 5 etapas de una CoP. Las usamos como **suite de tests de salud** de la comunidad:

| Etapa Wenger | Indicadores (métricas GitHub) | "Test pasa si..." |
|---|---|---|
| **Incubating** | Issues abiertos con criterios | Al menos 1 Issue por paper en elaboración |
| **Growing** | PRs con peer review activo | ≥3 contribuidores distintos por mes |
| **Sustained** | Discussions activas por rol | ≥1 Discussion nueva por CoP por semana |
| **Transforming** | Changesets → nuevas versiones | ≥1 paper en v2.x (refactorizado por comunidad) |
| **Dispersed** | Forks + citas externas | ≥3 repos externos forkean este corpus |

---

## §3 Implementación en GitHub

### 3.1 Labels del repo (sistema TDD)

```
# Estado del ciclo TDD
tdd:red      → Issue abierto, criterios definidos, trabajo pendiente
tdd:green    → PR en review, criterios satisfechos
tdd:refactor → Post-merge, mejora continua en curso

# Tipo de contenido (DIATAXIS)
type:tutorial
type:how-to
type:reference
type:explanation

# CoP target
cop:estudiante | cop:director | cop:disenador
cop:formador  | cop:investigador | cop:emprendedor

# Prioridad
priority:p1 | priority:p2 | priority:p3

# Ciclo CRISP-DM
crisp:business | crisp:data-understanding | crisp:data-prep
crisp:modeling | crisp:evaluation | crisp:deployment
```

### 3.2 Issue templates por ciclo TDD

**Template Red — paper nuevo** (`.github/ISSUE_TEMPLATE/tdd-red-paper.md`):

```markdown
---
name: "🔴 [RED] Paper nuevo"
about: Define los criterios de aceptación antes de escribir
labels: tdd:red, type:explanation
---

**Paper ID**: M## — [Título]

**Pregunta trazadora** (la que el paper debe responder):

**Rol primario de la CoP**: [ ] estudiante [ ] director [ ] diseñador [ ] formador [ ] investigador [ ] emprendedor

**Criterios de aceptación** (Gherkin o checklist):
- [ ] El lector puede [...]
- [ ] El lector comprende [...]
- [ ] El paper incluye [...]

**Fuentes primarias mínimas** (3):
1.
2.
3.

**Reviewer asignado** (CODEOWNERS):
```

### 3.3 PR template (Green)

`.github/pull_request_template.md`:

```markdown
## ¿Qué resuelve este PR?
Cierra # (issue número)

## Criterios de aceptación — todos deben pasar

- [ ] Pregunta trazadora respondida explícitamente en §0
- [ ] Mínimo 3 fuentes primarias con URL/DOI
- [ ] Al menos 1 diagrama Mermaid o tabla estructurada
- [ ] Callout `> [!abstract]` con resumen ejecutivo
- [ ] Frontmatter YAML completo (paper_id, version, author, license)
- [ ] Build local verde (`pnpm build`)
- [ ] Sin errores de schema Zod (`pnpm validate`)

## Tipo DIATAXIS
[ ] Tutorial [ ] How-to [ ] Reference [x] Explanation

## CoP roles que esto sirve
[ ] Estudiante [ ] Director [ ] Diseñador [ ] Formador [ ] Investigador [ ] Emprendedor

## Checklist reviewer
- [ ] Pregunta trazadora respondida satisfactoriamente
- [ ] Fuentes verificadas
- [ ] Diagramas comprensibles sin contexto adicional
- [ ] Coherente con POC v4.2 y AUDIT v1
```

### 3.4 GitHub Actions — CI como test runner automático

`.github/workflows/validate-content.yml`:

```yaml
name: Validate content (TDD CI)
on:
  pull_request:
    paths:
      - 'apps/portal/src/content/docs/**'
      - 'content/drive-sync/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - run: pnpm install --frozen-lockfile

      - name: Schema validation (Zod)
        run: pnpm validate-content

      - name: Check required frontmatter
        run: |
          # Cada paper M## debe tener title, description en frontmatter
          for f in apps/portal/src/content/docs/papers/*.md; do
            grep -q "^title:" "$f" || (echo "FAIL: missing title in $f" && exit 1)
            grep -q "^description:" "$f" || (echo "FAIL: missing description in $f" && exit 1)
          done
          echo "✓ All papers have required frontmatter"

      - name: Build check
        run: pnpm --filter portal build
```

---

## §4 OKRs trimestrales como acceptance criteria de la CoP

Los OKRs del proyecto funcionan como **acceptance criteria de nivel de comunidad** — no de paper individual.

**Q2 2026 (Abr–Jun) — OKRs iniciales**:

| Objetivo | Key Result | Métrica GitHub | Test pasa si... |
|---|---|---|---|
| Portal live | KR1: `reforma-ud.vercel.app` desplegado | Vercel status = production | Deploy verde |
| Corpus completo | KR2: M01–M12 todos merged a main | PRs cerrados = 12 | 12 issues cerrados |
| CoP activa | KR3: ≥6 contribuidores distintos | GitHub Contributors ≥ 6 | Dashboard contributors |
| Citabilidad | KR4: DOI Zenodo para ≥3 papers | Zenodo records ≥ 3 | Zenodo API |
| Sync activo | KR5: Drive sync running sin fallos | GitHub Actions success rate ≥ 95% | Actions dashboard |

---

## §5 Integración con el monorepo

### 5.1 Carpeta `content/specs/` (próximo sprint)

```
content/
└── specs/
    ├── m01.feature    ← Gherkin acceptance criteria M01
    ├── m02.feature
    └── ... (12 features)
```

### 5.2 Script `validate-content.ts`

```typescript
// scripts/validate-content.ts
import { glob } from 'glob';
import matter from 'gray-matter';
import { paperSchema } from '../packages/content-schemas/src/paper';

const papers = await glob('apps/portal/src/content/docs/papers/*.md');
let errors = 0;

for (const file of papers) {
  const { data } = matter(await Bun.file(file).text());
  const result = paperSchema.safeParse(data);
  if (!result.success) {
    console.error(`❌ ${file}:`, result.error.issues);
    errors++;
  } else {
    console.log(`✓ ${file}`);
  }
}

if (errors > 0) process.exit(1);
console.log(`\n✓ All ${papers.length} papers valid`);
```

---

## §6 Métricas de salud del CoP (dashboard)

Consultar semanalmente en GitHub Insights:

| Métrica | Tool | Frecuencia | Target Q2 |
|---|---|---|---|
| Issues abiertos (Red) | GitHub Issues | Semanal | ≤ 20 (backlog sano) |
| PRs en review (Green) | GitHub PRs | Semanal | ≤ 5 simultáneos |
| Merge rate | GitHub Insights | Quincenal | ≥ 2 merges/semana |
| Discussion replies | GitHub Discussions | Mensual | ≥ 3 replies/topic |
| Build success rate | GitHub Actions | Diario | ≥ 98% |
| Drive sync lag | Actions runtime | Continuo | ≤ 10 min |
| Contributors | GitHub Insights | Mensual | creciente |

---

## §7 Referencias SOTA

| Framework | Fuente | Aplicación en este proyecto |
|---|---|---|
| **DIATAXIS** | Daniele Procida (2021) · [diataxis.fr](https://diataxis.fr) | Taxonomía de todos los documentos MI-12 |
| **Specification by Example** | Gojko Adzic (2011) · Manning | Criterios de aceptación por paper y BPA |
| **TDD Red-Green-Refactor** | Kent Beck (2002) · Addison-Wesley | Ciclo Issue → Draft PR → Merge |
| **CoP Lifecycle** | Wenger, McDermott, Snyder (1998, 2002) | Suite de tests de salud de la comunidad |
| **GitHub Flow** | GitHub (2011, actualizado 2023) | Workflow de contribución |
| **Changesets** | Changesets team (2020) | Semantic versioning del corpus |
| **Inner Source** | O'Reilly (2016) | Modelo de gobernanza open source interno |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepulveda · CPS-939-2026 · UDFJC · 2026-04-24*
