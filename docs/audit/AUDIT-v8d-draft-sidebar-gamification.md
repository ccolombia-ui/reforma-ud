---
kd_id: audit/v8d-draft-sidebar-gamification
kd_version: 1.0.0
kd_date: 2026-04-29
kd_status: ACTIVE
kd_doc_type: AUDIT + SPEC
kd_title: v8d · Diagnóstico Draft Visibility + Sidebar Misiones + Portal Gamificado
---

# AUDIT v8d · Draft Visibility, Sidebar Misiones & Portal Gamificado

> **Propósito:** Documentar diagnóstico riguroso de 3 gaps críticos + especificación SOTA para portal de entrada gamificado.

---

## 1 · Diagnóstico: Visibilidad de Papers Draft (M08-M12)

### 1.1 Observación (img1)

El sidebar muestra todos los papers M01-M12 incluyendo M08-M12 que están en estado `kd_status: DRAFT`. Según la política de lifecycle v8b, los papers DRAFT deberían estar ocultos para usuarios públicos.

### 1.2 Análisis de Código

**Lógica existente en [`show-drafts.ts`](apps/portal-next/src/lib/show-drafts.ts:1):**

```typescript
// showDrafts solo activo en development — nunca en production
export const showDrafts =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true' &&
  process.env.NODE_ENV !== 'production';

export function isPublished(paper: { kd_status?: string; draft?: boolean }): boolean {
  if (paper.kd_status) {
    return (VISIBLE_STATUSES as string[]).includes(paper.kd_status);
  }
  return !paper.draft; // backward compat
}

export function filterPublished<T extends { kd_status?: string; draft?: boolean }>(
  items: T[]
): T[] {
  if (showDrafts) return items;
  return items.filter(isPublished);
}
```

**Problema identificado:** El componente [`ReformaCuanticaSection`](apps/portal-next/src/components/layout/sidebar.tsx:100) en el sidebar NO aplica `filterPublished` a la lista de papers:

```typescript
// Línea 131-137 en sidebar.tsx
const filtered = useMemo(() => {
  if (!q) return papers;  // ← Aquí se usa papers sin filtrar
  return papers.filter((p) =>
    p.id.toLowerCase().includes(q) ||
    p.title.toLowerCase().includes(q),
  );
}, [papers, q]);
```

El array `papers` proviene de `canonicPaper` importado desde `'#site/content'` (Velite), que incluye TODOS los papers sin filtrar por `kd_status`.

### 1.3 Root Cause

| Componente | Estado | Problema |
|------------|--------|----------|
| `/canonico/[mid]/page.tsx` | ✅ OK | Usa `isPublished()` + `notFound()` |
| `/mision/[paperId]/page.tsx` | ✅ OK | Usa `isPublished()` + `notFound()` |
| `generateStaticParams` | ✅ OK | Filtra con `canonicPaper.filter(isPublished)` |
| **Sidebar** | ❌ **BROKEN** | **No filtra papers por `kd_status`** |
| **Infografia** | ⚠️ **CHECK** | Verificar si filtra M08-M12 |

### 1.4 Solución Recomendada

**Opción A: Filtrado en Sidebar (mínimo cambio)**

```typescript
// En ReformaCuanticaSection
import { filterPublished } from '@/lib/show-drafts';

const papersFiltrados = useMemo(() => filterPublished(papers), [papers]);

const filtered = useMemo(() => {
  if (!q) return papersFiltrados;
  return papersFiltrados.filter((p) =>
    p.id.toLowerCase().includes(q) ||
    p.title.toLowerCase().includes(q),
  );
}, [papersFiltrados, q]);
```

**Opción B: Transform en Velite (recomendada SOTA)**

```typescript
// velite.config.ts
.transform((data) => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && data.kd_status === 'DRAFT') {
    return null; // Excluir de la colección
  }
  return data;
})
```

**Decisión:** Opción A para v8d (menor riesgo), Opción B para v9 (arquitectura limpia).

---

## 2 · Diagnóstico: Sidebar de Comunidades sin Misiones

### 2.1 Observación (img2)

El sidebar muestra la jerarquía de comunidades (Gobierno → CSU, Direcciones, VR Formación, etc.) pero NO muestra las misiones CoP asociadas a cada comunidad.

### 2.2 Análisis de Código

**Estructura actual del sidebar:**

```typescript
// sidebar.tsx línea 739-748
<SectionToggle id="comunidades" emoji="🏛️" title="Comunidades">
  <ul className="space-y-0.5">
    {tree.map((root) => (
      <TreeItem key={root.slug} node={root} currentPath={pathname} />
    ))}
  </ul>
</SectionToggle>
```

**TreeItem:** Renderiza recursivamente la jerarquía pero no accede a `misionesCoP`.

### 2.3 Datos Disponibles

Las misiones CoP están definidas en el frontmatter de cada comunidad:

```yaml
---
# content/comunidades/gobierno/csu/index.mdx
misionesCoP:
  - id: CSU-MC-01
    slug: participa-en-la-reforma
    titulo: "Participa en la Reforma UD"
    tipo: comprension
    nivelRequerido: 0
    nivelOtorga: 1
    orden: 1
    papers: [m01, m02]
    prerequisitosCanonicas: [m01]
    prerequisitosMision: []
---
```

### 2.4 Solución Recomendada

**Especificación: Renderizar misiones como sub-ítems en el sidebar**

```typescript
// En TreeItem o componente similar
{node.misionesCoP && node.misionesCoP.length > 0 && open && (
  <ul className="ml-3 border-l border-sidebar-border pl-2 mt-0.5">
    {node.misionesCoP
      .sort((a, b) => a.orden - b.orden)
      .map((m) => (
        <li key={m.id}>
          <Link
            href={`${node.href}/${m.slug}`}
            className={cn(
              'flex items-center gap-1.5 rounded px-2 py-1 text-[10px]',
              pathname === `${node.href}/${m.slug}`
                ? 'bg-sidebar-accent font-semibold text-sidebar-primary'
                : 'text-muted-foreground hover:bg-sidebar-accent',
            )}
          >
            {TIPO_ICONS[m.tipo]}
            <span className="truncate">{m.titulo}</span>
          </Link>
        </li>
      ))}
  </ul>
)}
```

**Iconos por tipo de misión:**
- `comprension`: 📖 (BookOpen)
- `deliberacion`: ⚖️ (Scale)
- `produccion`: 🏗️ (Hammer)

---

## 3 · Investigación SOTA: Gamificación para Portal de Entrada

### 3.1 Benchmarking: Duolingo (Gold Standard)

**Patrones identificados:**

| Mecánica | Implementación | Métrica de Éxito |
|----------|----------------|------------------|
| **Onboarding Gradual** | Sign-up pospuesto hasta después del primer valor | +20% retención día 1 |
| **Selección de Rol/Goal** | "¿Para qué quieres aprender?" | Personalización del journey |
| **Progreso Visual** | Streaks, XP, leaderboards | 85% más engagement |
| **Mascota/Avatar** | Duo the Owl - emocional trigger | Brand recognition global |
| **Micro-commitments** | Lecciones de 3-5 minutos | Habit formation |
| **Variable Rewards** | Chests sorpresa, combo bonuses | Dopamine loops |

**El Loop Duolingo:**

```
Trigger (notificación/push) → Action (lección) → 
Reward (XP/gems) → Investment (streak) → 
Trigger (next day)...
```

### 3.2 Benchmarking: Otros Portales Educativos

| Plataforma | Mecánica Clave | Aplicable a Reforma-UD |
|------------|----------------|------------------------|
| **Coursera** | Onboarding wizard con goal selection | ✅ Selección de rol JTBD |
| **LinkedIn Learning** | Skills assessment upfront | ✅ Quiz de diagnóstico |
| **Khan Academy** | Avatar customization | ✅ Personalización de avatar |
| **Strava** | Challenge/join community | ✅ Unión a CoPs |
| **Stack Overflow** | Reputation system | ✅ Sistema de niveles CoP |

### 3.3 Principios SOTA para Portal Reforma-UD

#### 3.3.1 Flujo de Onboarding (5 pasos)

```
Paso 1: Welcome + Propuesta de Valor
        "Bienvenido al Portal de la Reforma Vinculante UDFJC"
        → Animación del ciclo virtuoso M01-M12

Paso 2: Definición de Rol JTBD
        "¿Quién eres en la universidad?"
        Options: 🎓 Estudiante · 👨‍🏫 Docente · 🏛️ Administrativo · 
                 👔 Directivo · 🏘️ Ciudadano

Paso 3: Avatar + Email
        [Avatar selector] + [Email input] + [Verificación]
        → Gravatar integration para auto-fill
        → Opcional: foto de perfil

Paso 4: Selección de Comunidades
        "¿En qué áreas quieres participar?"
        → VR Formación · VR Investigación · VR Extensión · Gobierno
        → Multi-select con badges

Paso 5: Primera Misión (AHA moment)
        → Redirección a M01 (obligatorio para todos)
        → O: Misión introductoria custom por rol
```

#### 3.3.2 Sistema de Progreso

| Elemento | Descripción | Métrica |
|----------|-------------|---------|
| **CCA Tracker** | Progreso M01-M12 | Visible en header |
| **CoP Level** | Nivel en cada comunidad | Badge en sidebar |
| **Streak** | Días consecutivos de actividad | Notificación push |
| **Logros** | Badges por hitos (primer CCA, primera deliberación, etc.) | Profile page |

#### 3.3.3 Mecánicas de Retención

```typescript
// Sistema de notificaciones gamificado
interface GamificationConfig {
  // Trigger: Daily reminder
  dailyReminder: {
    enabled: true;
    time: '09:00';  // Hora de notificación
    message: '🔥 Tu streak de {n} días te espera';
    mascot: 'reforma-owl';  // Mascota del portal
  };
  
  // Progress: Visual indicators
  progress: {
    showXP: true;
    showStreak: true;
    showLeaderboard: false;  // Privacy-first
    showNextMission: true;
  };
  
  // Reward: Variable rewards
  rewards: {
    completeMission: 'badge + XP';
    completeCoPLevel: 'special badge + title';
    streak7: 'flame badge';
    streak30: 'dedicated badge';
  };
}
```

---

## 4 · Especificación: Portal de Entrada Gamificado

### 4.1 Arquitectura de Componentes

```
app/
├── (onboarding)/
│   ├── page.tsx                 # Landing con propuesta de valor
│   ├── layout.tsx               # Layout minimal sin sidebar
│   ├── paso-1-welcome/
│   │   └── page.tsx
│   ├── paso-2-rol/
│   │   └── page.tsx
│   ├── paso-3-avatar/
│   │   └── page.tsx
│   ├── paso-4-comunidades/
│   │   └── page.tsx
│   └── paso-5-primera-mision/
│       └── page.tsx
├── api/
│   └── onboarding/
│       └── route.ts             # Persistencia temporal
└── page.tsx                     # Redirect según estado onboarding
```

### 4.2 Componentes UI

```typescript
// components/onboarding/
├── onboarding-wizard.tsx        # Stepper container
├── rol-selector.tsx             # Grid de roles JTBD
├── avatar-picker.tsx            # Avatar selector + upload
├── email-verification.tsx       # OTP/Link verification
├── comunidad-selector.tsx       # Multi-select de CoPs
├── progress-bar.tsx             # Barra de progreso del wizard
└── mascot-reforma.tsx           # Mascota animada (SVG/Lottie)
```

### 4.3 Estado del Onboarding

```typescript
// lib/onboarding-state.ts
const ONBOARDING_KEY = 'reforma-ud:onboarding';

interface OnboardingState {
  step: 1 | 2 | 3 | 4 | 5 | 'completed';
  rol?: 'estudiante' | 'docente' | 'administrativo' | 'directivo' | 'ciudadano';
  avatar?: string;  // URL o identificador
  email?: string;
  emailVerified: boolean;
  comunidades: string[];  // Slugs de comunidades seleccionadas
  completedAt?: string;
}

export function getOnboardingState(): OnboardingState | null;
export function saveOnboardingState(state: OnboardingState): void;
export function isOnboardingComplete(): boolean;
export function resetOnboarding(): void;
```

### 4.4 Flow de Redirección

```typescript
// middleware.ts o layout root
export function middleware(request: NextRequest) {
  const onboarding = getOnboardingStateFromCookie(request);
  
  // Si no ha completado onboarding, redirigir
  if (!onboarding?.completedAt && !request.nextUrl.pathname.startsWith('/(onboarding)')) {
    return NextResponse.redirect(new URL('/(onboarding)', request.url));
  }
  
  // Si completó, redirigir a dashboard personalizado
  if (onboarding?.completedAt && request.nextUrl.pathname === '/') {
    const target = onboarding.rol === 'estudiante' 
      ? '/mision' 
      : '/comunidades';
    return NextResponse.redirect(new URL(target, request.url));
  }
}
```

### 4.5 Diseño Visual

```css
/* Estilo del wizard - minimal, enfocado */
.onboarding-container {
  /* Fondo con patrón sutil de la identidad visual */
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.onboarding-card {
  /* Card centrada con sombra suave */
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Animaciones */
@keyframes mascot-wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}
```

---

## 5 · Roadmap de Implementación

### Fase 1: Fix Draft Visibility (v8d-hotfix)

```bash
# 1. Aplicar filterPublished en sidebar
# 2. Verificar build en producción
# 3. Test: M08-M12 no deben aparecer sin SHOW_DRAFTS=true
```

### Fase 2: Sidebar Misiones (v8d)

```bash
# 1. Modificar TreeItem para renderizar misionesCoP
# 2. Iconos por tipo de misión
# 3. Estados: locked/available/completed
```

### Fase 3: Portal Gamificado (v9)

```bash
# 1. Crear route group (onboarding)
# 2. Implementar wizard de 5 pasos
# 3. Avatar picker + email verification
# 4. Integración con onboarding-state
# 5. Middleware de redirección
# 6. Gamification: streaks, badges, notifications
```

---

## 6 · Referencias

### Documentación Existente

- [`AUDIT-v8c-walkthrough-handoff.md`](docs/audit/AUDIT-v8c-walkthrough-handoff.md) - Estado actual v8c
- [`show-drafts.ts`](apps/portal-next/src/lib/show-drafts.ts) - Lifecycle visibility
- [`sidebar.tsx`](apps/portal-next/src/components/layout/sidebar.tsx) - Navegación actual

### Recursos SOTA

- [Duolingo Gamification Case Study](https://gamelayer.io/blog/duolingo-gamification-user-retention)
- [Gravatar Onboarding Best Practices](https://blog.gravatar.com/2024/09/06/onboarding-user-experience/)
- [Onboarding Gamification Guide](https://userpilot.medium.com/onboarding-gamification-double-your-activation-rates-in-4-simple-steps-176bee929221)

---

> **Versión:** v8d · 1.0.0 · 2026-04-29
> **Estado:** ACTIVE - Requiere implementación
> **Autor:** Roo Code + Kimi
