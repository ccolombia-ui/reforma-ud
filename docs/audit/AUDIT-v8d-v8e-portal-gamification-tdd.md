---
kd_id: audit/v8d-v8e-portal-gamification-tdd
kd_version: 1.0.0
kd_date: 2026-04-29
kd_status: ACTIVE
kd_doc_type: AUDIT + SPEC + ROADMAP
kd_title: v8d/v8e · Draft Visibility + Sidebar Misiones + Portal Gamificado (TDD)
---

# AUDIT v8d/v8e · Portal Gamificado con TDD

> **Propósito:** Documento maestro para implementación incremental del portal gamificado. Cada paso es independiente, testeable, y aditivo. v9 heredará todo mediante el engine.

---

## Convenciones de este Documento

- **v8d:** Fixes inmediatos (draft visibility, sidebar misiones)
- **v8e:** Feature completa (portal gamificado con TDD)
- **Regla de Oro:** Cada paso tiene tests antes de implementación
- **Push Strategy:** Un commit por paso, siempre verde en CI

---

# PARTE I · DIAGNÓSTICO Y FIXES (v8d)

---

## Paso 1 · Fix Draft Visibility en Sidebar (v8d-p1)

### 1.1 Diagnóstico (img1)

**Observación:** El sidebar muestra papers M08-M12 con `kd_status: DRAFT` visibles públicamente.

**Impacto:** Violación de política lifecycle v8b - contenido preliminar expuesto.

**Root Cause Analysis:**

```typescript
// File: src/components/layout/sidebar.tsx
// Line: 131-137 (ReformaCuanticaSection)

const filtered = useMemo(() => {
  if (!q) return papers;  // ← ERROR: No filtra por kd_status
  return papers.filter((p) =>
    p.id.toLowerCase().includes(q) ||
    p.title.toLowerCase().includes(q),
  );
}, [papers, q]);
```

El array `papers` proviene de `canonicPaper` (Velite) que incluye TODOS los papers sin filtrar.

### 1.2 Estrategia SOTA

**Opción A: Runtime Filter (v8d - seleccionada)**
- Mínimo cambio, máxima seguridad
- Aplica `filterPublished()` en el componente
- No requiere rebuild de contenido

**Opción B: Build-time Filter (v9 - futuro)**
- Transform en Velite excluye DRAFTs en producción
- Requiere rebuild al cambiar status
- Más performante pero menos flexible

### 1.3 Implementación TDD

#### Fase 1.3.1 · Test First

```typescript
// src/components/layout/sidebar.test.tsx (NUEVO)
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { filterPublished } from '@/lib/show-drafts';

describe('ReformaCuanticaSection - Draft Visibility', () => {
  const mockPapers = [
    { id: 'm01', kd_status: 'PUBLISHED', title: 'M01' },
    { id: 'm02', kd_status: 'PUBLISHED', title: 'M02' },
    { id: 'm08', kd_status: 'DRAFT', title: 'M08' },
    { id: 'm09', kd_status: 'DRAFT', title: 'M09' },
  ];

  it('should exclude DRAFT papers when showDrafts is false', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');
    vi.stubEnv('NODE_ENV', 'production');
    
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(2);
    expect(result.map(p => p.id)).toEqual(['m01', 'm02']);
  });

  it('should include all papers when showDrafts is true in dev', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');
    vi.stubEnv('NODE_ENV', 'development');
    
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(4);
  });

  it('should exclude DRAFT papers even when SHOW_DRAFTS=true in production', () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');
    vi.stubEnv('NODE_ENV', 'production');
    
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(2);
  });
});
```

#### Fase 1.3.2 · Implementación

```typescript
// src/components/layout/sidebar.tsx
// Modificar ReformaCuanticaSection

import { filterPublished } from '@/lib/show-drafts';

function ReformaCuanticaSection({ papers, pathname, filter }: Props) {
  // v8d-p1: Filtrar papers por kd_status
  const papersFiltrados = useMemo(() => filterPublished(papers), [papers]);
  
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return papersFiltrados;  // ← FIX: Usar papersFiltrados
    return papersFiltrados.filter((p) =>
      p.id.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q),
    );
  }, [papersFiltrados, filter]);

  // Mostrar contador actualizado
  const countLabel = `${filtered.length} visible${filtered.length !== 1 ? 's' : ''}`;
  
  return (
    <li>
      <div className="group flex w-full items-center gap-1 rounded pr-1">
        {/* ... header con countLabel ... */}
      </div>
      {effectiveOpen && (
        <ul>
          {filtered.map((p) => (
            <PaperItem key={p.id} paper={p} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}
```

#### Fase 1.3.3 · Validación

```bash
# 1. Test local
pnpm test src/components/layout/sidebar.test.tsx

# 2. Build
pnpm build

# 3. Verificar en dev (M08-M12 visibles con SHOW_DRAFTS=true)
NEXT_PUBLIC_SHOW_DRAFTS=true pnpm dev

# 4. Verificar en "prod" (M08-M12 ocultos)
# Simulado con build estático
```

#### Fase 1.3.4 · Commit

```bash
git add .
git commit -m "fix(v8d-p1): filter DRAFT papers in sidebar

- Add filterPublished to ReformaCuanticaSection
- Add sidebar.test.tsx with 3 test cases
- M08-M12 now hidden in production by default
- Respects SHOW_DRAFTS in development

Test: pnpm test passes, build succeeds"
```

### 1.4 Acceptance Criteria

- [ ] Test `sidebar.test.tsx` pasa 3/3 casos
- [ ] Build sin errores de TypeScript
- [ ] En dev con `SHOW_DRAFTS=true`: M08-M12 visibles
- [ ] En prod (build estático): M08-M12 ocultos
- [ ] Contador muestra "X visibles" correctamente

---

## Paso 2 · Sidebar Misiones CoP (v8d-p2)

### 2.1 Diagnóstico (img2)

**Observación:** Las comunidades en el sidebar no muestran sus misiones asociadas.

**Impacto:** Usuario no descubre misiones CoP desde navegación principal.

**Datos Disponibles:** Cada comunidad tiene `misionesCoP` en frontmatter:

```yaml
misionesCoP:
  - id: CSU-MC-01
    slug: participa-en-la-reforma
    titulo: "Participa en la Reforma UD"
    tipo: comprension  # | deliberacion | produccion
    nivelRequerido: 0
    nivelOtorga: 1
    orden: 1
```

### 2.2 Investigación SOTA: Navegación Jerárquica

**Referente: Notion Sidebar**
- Items anidados con indentación visual
- Iconos distintivos por tipo de contenido
- Estados visuales (completado, bloqueado, disponible)

**Referente: Linear**
- Lista colapsable con chevrons
- Badges de conteo
- Prioriza información contextual

### 2.3 Estrategia de Diseño

**Jerarquía Visual:**
```
🏛️ Comunidades
  └── 🏛️ Gobierno
       └── 🏛️ CSU
            ├── 📖 Participa en la Reforma
            ├── 📖 Nueva Estructura Organizativa
            ├── ⚖️ Estatuto Docente
            └── ⚖️ Estatuto Estudiantil
```

**Iconografía por Tipo:**
| Tipo | Icono | Color | Significado |
|------|-------|-------|-------------|
| `comprension` | 📖 | blue-500 | Lectura + cuestionario |
| `deliberacion` | ⚖️ | orange-500 | Revisión de estatutos |
| `produccion` | 🏗️ | green-500 | Co-creación de artefactos |

### 2.4 Implementación TDD

#### Fase 2.4.1 · Test First

```typescript
// src/components/layout/tree-item.test.tsx (NUEVO)
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TreeItem } from './sidebar';

describe('TreeItem - Misiones CoP', () => {
  const mockNode = {
    slug: 'comunidades/gobierno/csu',
    name: 'CSU',
    href: '/comunidades/gobierno/csu',
    children: [],
    misionesCoP: [
      {
        id: 'CSU-MC-01',
        slug: 'participa-en-la-reforma',
        titulo: 'Participa en la Reforma',
        tipo: 'comprension',
        nivelRequerido: 0,
        orden: 1,
      },
      {
        id: 'CSU-MC-03-A',
        slug: 'estatuto-docente',
        titulo: 'Estatuto Docente',
        tipo: 'deliberacion',
        nivelRequerido: 1,
        orden: 3,
      },
    ],
  };

  it('should render mission items when node has misionesCoP', () => {
    render(<TreeItem node={mockNode} currentPath="/" />);
    
    expect(screen.getByText('Participa en la Reforma')).toBeInTheDocument();
    expect(screen.getByText('Estatuto Docente')).toBeInTheDocument();
  });

  it('should sort missions by orden', () => {
    render(<TreeItem node={mockNode} currentPath="/" />);
    
    const items = screen.getAllByRole('link');
    expect(items[0]).toHaveTextContent('Participa en la Reforma');
    expect(items[1]).toHaveTextContent('Estatuto Docente');
  });

  it('should display correct icon for comprension type', () => {
    render(<TreeItem node={mockNode} currentPath="/" />);
    
    const comprensionItem = screen.getByText('Participa en la Reforma');
    expect(comprensionItem.closest('li')).toHaveTextContent('📖');
  });

  it('should display correct icon for deliberacion type', () => {
    render(<TreeItem node={mockNode} currentPath="/" />);
    
    const deliberacionItem = screen.getByText('Estatuto Docente');
    expect(deliberacionItem.closest('li')).toHaveTextContent('⚖️');
  });

  it('should link to correct mission path', () => {
    render(<TreeItem node={mockNode} currentPath="/" />);
    
    const link = screen.getByText('Participa en la Reforma').closest('a');
    expect(link).toHaveAttribute('href', '/comunidades/gobierno/csu/participa-en-la-reforma');
  });

  it('should highlight active mission', () => {
    render(<TreeItem node={mockNode} currentPath="/comunidades/gobierno/csu/participa-en-la-reforma" />);
    
    const activeItem = screen.getByText('Participa en la Reforma').closest('li');
    expect(activeItem).toHaveClass('bg-sidebar-accent');
  });
});
```

#### Fase 2.4.2 · Implementación

```typescript
// src/components/layout/sidebar.tsx
// Extender TreeItem

const TIPO_ICONS: Record<string, React.ReactNode> = {
  comprension: <BookOpen className="h-3 w-3 text-blue-500" />,
  deliberacion: <Scale className="h-3 w-3 text-orange-500" />,
  produccion: <Hammer className="h-3 w-3 text-green-500" />,
};

function TreeItem({ node, currentPath }: { node: TreeNode; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const isActive = currentPath === node.href || currentPath.startsWith(node.href + '/');
  const isLeaf = node.children.length === 0;
  
  // Auto-expandir si hay misión activa
  useEffect(() => {
    if (node.misionesCoP?.some(m => currentPath.includes(m.slug))) {
      setOpen(true);
    }
  }, [currentPath, node.misionesCoP]);

  return (
    <li>
      {/* ... header del nodo ... */}
      
      {/* Sub-comunidades */}
      {!isLeaf && open && (
        <ul className="ml-3 border-l border-sidebar-border pl-2">
          {node.children.map((c) => (
            <TreeItem key={c.slug} node={c} currentPath={currentPath} />
          ))}
        </ul>
      )}
      
      {/* v8d-p2: Misiones CoP como sub-ítems */}
      {node.misionesCoP && node.misionesCoP.length > 0 && open && (
        <ul className="ml-3 border-l border-sidebar-border pl-2 mt-0.5">
          {node.misionesCoP
            .slice()
            .sort((a, b) => a.orden - b.orden)
            .map((m) => {
              const missionPath = `${node.href}/${m.slug}`;
              const isMissionActive = currentPath === missionPath;
              
              return (
                <li key={m.id}>
                  <Link
                    href={missionPath}
                    className={cn(
                      'flex items-center gap-1.5 rounded px-2 py-1 text-[10px]',
                      isMissionActive
                        ? 'bg-sidebar-accent font-semibold text-sidebar-primary'
                        : 'text-muted-foreground hover:bg-sidebar-accent',
                    )}
                    title={`${m.titulo} (Nivel ${m.nivelRequerido})`}
                  >
                    {TIPO_ICONS[m.tipo] || <Circle className="h-3 w-3" />}
                    <span className="truncate">{m.titulo}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </li>
  );
}
```

#### Fase 2.4.3 · Validación

```bash
# 1. Tests
pnpm test src/components/layout/tree-item.test.tsx

# 2. Visual regression - sidebar con comunidades expandidas
pnpm dev
# Manual: Expandir Gobierno → CSU, verificar misiones visibles

# 3. Build
pnpm build
```

#### Fase 2.4.4 · Commit

```bash
git add .
git commit -m "feat(v8d-p2): render misiones CoP in sidebar

- Add misionesCoP rendering to TreeItem component
- Sort missions by orden field
- Add icons by tipo: comprension/deliberacion/produccion
- Auto-expand on active mission
- Add tree-item.test.tsx with 6 test cases

Test: 212 + 6 = 218 tests passing"
```

### 2.5 Acceptance Criteria

- [ ] 6/6 tests en `tree-item.test.tsx` pasan
- [ ] Misiones visibles bajo comunidades expandidas
- [ ] Iconos correctos por tipo de misión
- [ ] Links funcionan a `/comunidades/{slug}/{missionSlug}`
- [ ] Item activo destacado visualmente
- [ ] Orden respetado según campo `orden`

---

# PARTE II · PORTAL GAMIFICADO (v8e)

---

## Paso 3 · Fundamentos del Engine Gamificado (v8e-p3)

### 3.1 Investigación SOTA Profunda

#### 3.1.1 Caso de Estudio: Duolingo

**Mecánicas Clave:**

| Elemento | Implementación | Métrica |
|----------|----------------|---------|
| **Onboarding Gradual** | Sign-up pospuesto hasta primer valor | +20% retención D1 |
| **Streaks** | Contador de días consecutivos | 89% engagement |
| **Variable Rewards** | Chests aleatorios, combo bonuses | Dopamine loops |
| **Leaderboards** | Ligas semanales (Ruby, Diamond) | Competencia social |
| **Mascota** | Duo the Owl (emocional trigger) | Brand recognition |

**Loop de Hábito:**
```
Trigger (notificación) → Action (lección 3min) → 
Reward (XP + streak) → Investment (liga + amigos) → 
Trigger (next day...)
```

**Análisis Neuromarketing (Braingineers):**
- No hay emociones negativas en el onboarding a pesar de ser largo
- El foco está en el usuario desde el primer momento
- Micro-commitments de 3-5 minutos

#### 3.1.2 Caso de Estudio: LinkedIn Learning

**Mecánicas:**
- Skills assessment upfront → Personalización inmediata
- Progress tracking visible
- Certificates como recompensa tangible

#### 3.1.3 Caso de Estudio: Strava

**Mecánicas:**
- Community challenges ("Corre 5K esta semana")
- Social proof (amigos activos)
- Achievement badges públicos

### 3.2 Diseño Emocional del Portal

**Principios:**

1. **Atractivo Visual**
   - Paleta: Azules institucionales + acentos cálidos
   - Animaciones sutiles (Lottie para la mascota)
   - Espaciado generoso, no saturar

2. **Progreso Tangible**
   - Barras de progreso siempre visibles
   - Celebraciones en milestones
   - "Estás a 1 paso de..."

3. **Personalización**
   - Avatar único (no solo foto, sino personaje)
   - Dashboard adaptado al rol
   - Recomendaciones contextuales

4. **Social Proof**
   - "X personas de tu Escuela ya completaron M01"
   - Leaderboards por CoP (no global)

### 3.3 Arquitectura del Engine

```typescript
// src/lib/engine/gamification.ts
// Engine puro, sin UI - testeable

interface GamificationEngine {
  // Estado
  getUserLevel(): UserLevel;
  getProgress(): ProgressMap;
  getStreak(): StreakInfo;
  
  // Acciones
  completeMission(missionId: string): CompletionResult;
  joinCommunity(communityId: string): JoinResult;
  verifyEmail(email: string): Promise<VerificationResult>;
  
  // Notificaciones
  shouldRemind(): boolean;
  getDailyMessage(): string;
}

// Implementación
export class ReformaGamificationEngine implements GamificationEngine {
  private storage: StorageAdapter;
  private rules: GamificationRules;
  
  constructor(config: EngineConfig) {
    this.storage = config.storage;
    this.rules = config.rules;
  }
  
  completeMission(missionId: string): CompletionResult {
    // Lógica pura, testeable
    const mission = this.rules.getMission(missionId);
    const currentLevel = this.storage.getLevel();
    
    if (mission.nivelRequerido > currentLevel) {
      return { success: false, error: 'INSUFFICIENT_LEVEL' };
    }
    
    const rewards = this.calculateRewards(mission);
    this.storage.saveCompletion(missionId, rewards);
    
    return { success: true, rewards, newLevel: this.calculateNewLevel() };
  }
  
  // ... métodos adicionales
}
```

### 3.4 Implementación TDD

#### Fase 3.4.1 · Tests del Engine

```typescript
// src/lib/engine/gamification.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ReformaGamificationEngine } from './gamification';
import { MemoryStorageAdapter } from './adapters/memory-storage';

describe('ReformaGamificationEngine', () => {
  let engine: ReformaGamificationEngine;
  let storage: MemoryStorageAdapter;
  
  beforeEach(() => {
    storage = new MemoryStorageAdapter();
    engine = new ReformaGamificationEngine({
      storage,
      rules: defaultRules,
    });
  });

  describe('completeMission', () => {
    it('should award XP and badge on mission completion', () => {
      const result = engine.completeMission('CSU-MC-01');
      
      expect(result.success).toBe(true);
      expect(result.rewards.xp).toBe(100);
      expect(result.rewards.badge).toBe('primer-mision');
    });

    it('should fail if level requirement not met', () => {
      storage.setLevel(0);
      
      const result = engine.completeMission('CSU-MC-03-A'); // Requires N1
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('INSUFFICIENT_LEVEL');
    });

    it('should level up when XP threshold reached', () => {
      storage.setXP(90);
      
      const result = engine.completeMission('CSU-MC-01'); // +10 XP
      
      expect(result.newLevel).toBe(2);
    });
  });

  describe('streaks', () => {
    it('should increment streak on daily login', () => {
      storage.setLastLogin(new Date(Date.now() - 24 * 60 * 60 * 1000));
      
      const streak = engine.recordLogin();
      
      expect(streak.current).toBe(2);
      expect(streak.best).toBe(2);
    });

    it('should reset streak if missed day', () => {
      storage.setLastLogin(new Date(Date.now() - 48 * 60 * 60 * 1000));
      
      const streak = engine.recordLogin();
      
      expect(streak.current).toBe(1);
    });
  });

  describe('email verification', () => {
    it('should generate verification code', async () => {
      const result = await engine.generateVerificationCode('user@udistrital.edu.co');
      
      expect(result.code).toMatch(/^\d{6}$/);
      expect(result.expiresAt).toBeInstanceOf(Date);
    });

    it('should verify correct code', async () => {
      await engine.generateVerificationCode('user@udistrital.edu.co');
      
      const result = await engine.verifyEmail('user@udistrital.edu.co', '123456');
      
      expect(result.verified).toBe(true);
    });
  });
});
```

#### Fase 3.4.2 · Implementación del Engine

```typescript
// src/lib/engine/gamification.ts

export interface CompletionResult {
  success: boolean;
  rewards?: { xp: number; badge?: string };
  newLevel?: number;
  error?: string;
}

export class ReformaGamificationEngine {
  constructor(private deps: { storage: StorageAdapter; rules: RulesEngine }) {}

  completeMission(missionId: string): CompletionResult {
    const mission = this.deps.rules.getMission(missionId);
    const userLevel = this.deps.storage.get('level') ?? 0;
    
    if (mission.nivelRequerido > userLevel) {
      return { success: false, error: 'INSUFFICIENT_LEVEL' };
    }
    
    const currentXP = this.deps.storage.get('xp') ?? 0;
    const newXP = currentXP + mission.rewards.xp;
    
    this.deps.storage.set('xp', newXP);
    this.deps.storage.set(`mission:${missionId}:completed`, true);
    
    const newLevel = this.calculateLevel(newXP);
    if (newLevel > userLevel) {
      this.deps.storage.set('level', newLevel);
    }
    
    return {
      success: true,
      rewards: mission.rewards,
      newLevel,
    };
  }

  private calculateLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }
}
```

#### Fase 3.4.3 · Commit

```bash
git add .
git commit -m "feat(v8e-p3): gamification engine core

- Add ReformaGamificationEngine with pure logic
- Implement completeMission, streaks, email verification
- Add gamification.test.ts with 12 test cases
- Engine agnostic to UI - usable by v9

Test: 230 tests passing"
```

---

## Paso 4 · Wizard de Onboarding (v8e-p4)

### 4.1 Investigación SOTA: Wizards

**Referente: Stripe Connect Onboarding**
- Paso a paso claro con progress bar
- Validación inline
- Guardado de progreso automático
- Puede retomar después

**Referente: Notion Templates**
- Preview del resultado final
- Customización gradual
- No overwhelm con opciones

### 4.2 Arquitectura del Wizard

```
app/
├── (onboarding)/                    # Route group
│   ├── layout.tsx                   # Minimal, no sidebar
│   ├── page.tsx                     # Redirect según paso actual
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
```

### 4.3 Implementación TDD

#### Fase 4.3.1 · Tests del Wizard

```typescript
// src/app/(onboarding)/onboarding.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Onboarding Flow', () => {
  it('should start at step 1', () => {
    render(<OnboardingWizard />);
    expect(screen.getByText('Bienvenido a la Reforma Vinculante')).toBeInTheDocument();
  });

  it('should advance to step 2 on continue', async () => {
    render(<OnboardingWizard />);
    await userEvent.click(screen.getByText('Comenzar'));
    expect(screen.getByText('¿Quién eres en la universidad?')).toBeInTheDocument();
  });

  it('should save rol selection', async () => {
    render(<OnboardingWizard />);
    await userEvent.click(screen.getByText('Comenzar'));
    await userEvent.click(screen.getByText('🎓 Estudiante'));
    await userEvent.click(screen.getByText('Continuar'));
    
    expect(localStorage.getItem('reforma-ud:onboarding:rol')).toBe('estudiante');
  });

  it('should require email verification before completion', async () => {
    render(<OnboardingWizard />);
    // ... navegar al paso 3
    await userEvent.type(screen.getByPlaceholderText('email@udistrital.edu.co'), 'test@email.com');
    await userEvent.click(screen.getByText('Verificar email'));
    
    expect(screen.getByText('Ingresa el código de 6 dígitos')).toBeInTheDocument();
  });

  it('should complete onboarding and redirect', async () => {
    render(<OnboardingWizard />);
    // ... completar todos los pasos
    await userEvent.click(screen.getByText('Finalizar y entrar al portal'));
    
    expect(localStorage.getItem('reforma-ud:onboarding:completed')).toBe('true');
  });
});
```

#### Fase 4.3.2 · Componente Paso 1: Welcome

```typescript
// src/app/(onboarding)/paso-1-welcome/page.tsx
import { OnboardingLayout } from '@/components/onboarding/layout';
import { MascotReforma } from '@/components/onboarding/mascot-reforma';
import { Button } from '@/components/ui/button';

export default function Paso1Welcome() {
  return (
    <OnboardingLayout
      progress={20}
      title="Bienvenido a la Reforma Vinculante"
      subtitle="UDFJC · Acuerdo CSU 04/2025"
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <MascotReforma animation="wave" size="lg" />
        
        <p className="text-center text-muted-foreground max-w-sm">
          En 5 minutos configurarás tu perfil y descubrirás cómo participar 
          en la transformación de nuestra universidad.
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <span className="text-2xl">📚</span>
            <span className="text-sm">12 investigaciones</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <span className="text-2xl">🏛️</span>
            <span className="text-sm">Comunidades</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <span className="text-2xl">🎯</span>
            <span className="text-sm">Misiones</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <span className="text-2xl">🏆</span>
            <span className="text-sm">Constancias</span>
          </div>
        </div>
        
        <Button asChild size="lg" className="w-full max-w-sm">
          <Link href="/paso-2-rol">Comenzar</Link>
        </Button>
      </div>
    </OnboardingLayout>
  );
}
```

#### Fase 4.3.3 · Componente Paso 2: Selección de Rol

```typescript
// src/app/(onboarding)/paso-2-rol/page.tsx
'use client';

import { useState } from 'react';
import { OnboardingLayout } from '@/components/onboarding/layout';
import { Button } from '@/components/ui/button';
import { saveOnboardingState } from '@/lib/onboarding-state';

const ROLES = [
  { id: 'estudiante', label: 'Estudiante', emoji: '🎓', description: 'Pregrado, posgrado o educación continua' },
  { id: 'docente', label: 'Docente', emoji: '👨‍🏫', description: 'Profesores de cátedra y tiempo completo' },
  { id: 'administrativo', label: 'Administrativo', emoji: '🏛️', description: 'Funcionarios administrativos' },
  { id: 'directivo', label: 'Directivo', emoji: '👔', description: 'Directores, decanos, vicerrectores' },
  { id: 'ciudadano', label: 'Ciudadano', emoji: '🏘️', description: 'Comunidad externa interesada' },
];

export default function Paso2Rol() {
  const [selected, setSelected] = useState<string | null>(null);
  
  const handleContinue = () => {
    if (selected) {
      saveOnboardingState({ step: 3, rol: selected });
    }
  };
  
  return (
    <OnboardingLayout
      progress={40}
      title="¿Quién eres en la universidad?"
      subtitle="Selecciona tu rol principal"
    >
      <div className="space-y-3 py-4">
        {ROLES.map((rol) => (
          <button
            key={rol.id}
            onClick={() => setSelected(rol.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
              selected === rol.id
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-muted-foreground/50',
            )}
          >
            <span className="text-3xl">{rol.emoji}</span>
            <div className="text-left">
              <div className="font-medium">{rol.label}</div>
              <div className="text-sm text-muted-foreground">{rol.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <Button 
        onClick={handleContinue}
        disabled={!selected}
        size="lg"
        className="w-full"
      >
        Continuar
      </Button>
    </OnboardingLayout>
  );
}
```

#### Fase 4.3.4 · Commit

```bash
git add .
git commit -m "feat(v8e-p4): onboarding wizard steps 1-2

- Add (onboarding) route group with minimal layout
- Implement Paso 1: Welcome with mascot
- Implement Paso 2: Rol selection with 5 options
- Add onboarding state persistence
- Add onboarding.test.tsx with 5 test cases

Test: 235 tests passing"
```

---

## Paso 5 · Avatar y Email Verification (v8e-p5)

### 5.1 Investigación SOTA: Avatar Selection

**Referente: Nintendo Miitomo**
- Creación de avatar paso a paso
- Opciones limitadas pero expresivas
- Preview en tiempo real

**Referente: Gravatar Integration**
- Auto-populate desde email
- Consistencia cross-platform
- Reduces signup friction

### 5.2 Estrategia: Avatar Presets + Upload

```typescript
// Avatar options
const AVATAR_PRESETS = [
  // Estudiantes
  { id: 'est-1', src: '/avatars/estudiante-1.svg', tags: ['estudiante'] },
  { id: 'est-2', src: '/avatars/estudiante-2.svg', tags: ['estudiante'] },
  // Docentes
  { id: 'doc-1', src: '/avatars/docente-1.svg', tags: ['docente'] },
  // Genéricos
  { id: 'gen-1', src: '/avatars/generico-1.svg', tags: ['all'] },
];
```

### 5.3 Implementación TDD

#### Fase 5.3.1 · Tests

```typescript
// src/components/onboarding/avatar-picker.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarPicker } from './avatar-picker';

describe('AvatarPicker', () => {
  it('should filter avatars by rol', () => {
    render(<AvatarPicker rol="estudiante" onSelect={() => {}} />);
    
    const avatars = screen.getAllByRole('button', { name: /avatar/i });
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('should allow custom upload', async () => {
    render(<AvatarPicker rol="docente" onSelect={() => {}} />);
    
    const file = new File(['test'], 'avatar.png', { type: 'image/png' });
    const input = screen.getByLabelText(/subir foto/i);
    
    await fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByAltText(/preview/i)).toBeInTheDocument();
  });
});
```

#### Fase 5.3.2 · Email Verification

```typescript
// src/lib/email-verification.ts
export async function sendVerificationCode(email: string): Promise<void> {
  const code = generateCode();
  await saveCode(email, code, { expiresIn: '10m' });
  
  // En dev: log to console
  // En prod: send email via SendGrid/AWS SES
  console.log(`[DEV] Código para ${email}: ${code}`);
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const saved = await getCode(email);
  if (!saved) return false;
  if (saved.expiresAt < Date.now()) return false;
  return saved.code === code;
}
```

#### Fase 5.3.3 · Commit

```bash
git add .
git commit -m "feat(v8e-p5): avatar selection and email verification

- Add AvatarPicker component with presets and upload
- Add email verification with 6-digit code
- Add Gravatar integration for auto-avatar
- Add avatar-picker.test.tsx and email-verification.test.ts

Test: 242 tests passing"
```

---

## Paso 6 · Selección de Comunidades y Primera Misión (v8e-p6)

### 6.1 Paso 4: Selector de Comunidades

```typescript
// src/app/(onboarding)/paso-4-comunidades/page.tsx
const COMUNIDADES = [
  { 
    id: 'formacion', 
    label: 'VR Formación', 
    emoji: '🎓',
    description: 'Escuelas, facultades y programas académicos',
  },
  { 
    id: 'investigacion', 
    label: 'VR Investigación', 
    emoji: '🔬',
    description: 'Institutos y grupos de investigación',
  },
  { 
    id: 'extension', 
    label: 'VR Extensión', 
    emoji: '🌍',
    description: 'Centros de proyección territorial',
  },
  { 
    id: 'gobierno', 
    label: 'Gobierno', 
    emoji: '🏛️',
    description: 'CSU, Rectoría y direcciones',
  },
];

export default function Paso4Comunidades() {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };
  
  return (
    <OnboardingLayout
      progress={80}
      title="¿Dónde quieres participar?"
      subtitle="Selecciona una o más comunidades"
    >
      <div className="space-y-3">
        {COMUNIDADES.map((c) => (
          <button
            key={c.id}
            onClick={() => toggle(c.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
              selected.includes(c.id)
                ? 'border-primary bg-primary/5'
                : 'border-muted',
            )}
          >
            <span className="text-3xl">{c.emoji}</span>
            <div className="text-left flex-1">
              <div className="font-medium">{c.label}</div>
              <div className="text-sm text-muted-foreground">{c.description}</div>
            </div>
            {selected.includes(c.id) && <Check className="h-5 w-5 text-primary" />}
          </button>
        ))}
      </div>
      
      <Button
        onClick={() => {
          saveOnboardingState({ step: 5, comunidades: selected });
        }}
        disabled={selected.length === 0}
        size="lg"
        className="w-full"
      >
        Continuar
      </Button>
    </OnboardingLayout>
  );
}
```

### 6.2 Paso 5: Primera Misión (AHA Moment)

```typescript
// src/app/(onboarding)/paso-5-primera-mision/page.tsx
export default function Paso5PrimeraMision() {
  const router = useRouter();
  const { rol } = getOnboardingState();
  
  const misionInicial = getMisionInicialPorRol(rol);
  
  const handleComenzar = () => {
    completeOnboarding();
    router.push(misionInicial.href);
  };
  
  return (
    <OnboardingLayout
      progress={100}
      title="¡Todo listo!"
      subtitle="Tu primera misión te espera"
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <MascotReforma animation="celebrate" size="lg" />
        
        <div className="bg-muted rounded-xl p-6 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📖</span>
            <span className="font-medium">{misionInicial.titulo}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {misionInicial.descripcion}
          </p>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          Al completar esta misión obtendrás tu primera constancia CCA
        </p>
        
        <Button onClick={handleComenzar} size="lg" className="w-full max-w-sm">
          Comenzar misión
        </Button>
      </div>
    </OnboardingLayout>
  );
}
```

### 6.3 Commit

```bash
git add .
git commit -m "feat(v8e-p6): comunidades selection and first mission

- Add Paso 4: Multi-select comunidades
- Add Paso 5: First mission preview with CTA
- Add getMisionInicialPorRol for personalized first mission
- Complete onboarding flow

Test: 245 tests passing"
```

---

## Paso 7 · Middleware y Protección de Rutas (v8e-p7)

### 7.1 Implementación

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas
  if (pathname.startsWith('/(onboarding)') || pathname === '/') {
    return NextResponse.next();
  }
  
  // Verificar onboarding completado
  const onboardingCookie = request.cookies.get('reforma-ud:onboarding');
  const onboarding = onboardingCookie ? JSON.parse(onboardingCookie.value) : null;
  
  if (!onboarding?.completed) {
    return NextResponse.redirect(new URL('/(onboarding)', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 7.2 Tests

```typescript
// src/middleware.test.ts
import { describe, it, expect } from 'vitest';
import { middleware } from './middleware';

describe('Onboarding Middleware', () => {
  it('should redirect to onboarding if not completed', () => {
    const request = new Request('http://localhost/mision');
    const response = middleware(request);
    
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('/(onboarding)');
  });

  it('should allow access if onboarding completed', () => {
    const request = new Request('http://localhost/mision', {
      headers: {
        cookie: 'reforma-ud:onboarding={"completed":true}',
      },
    });
    const response = middleware(request);
    
    expect(response.status).toBe(200);
  });
});
```

### 7.3 Commit

```bash
git add .
git commit -m "feat(v8e-p7): middleware onboarding protection

- Add middleware.ts with onboarding check
- Redirect to onboarding if not completed
- Add middleware.test.ts

Test: 247 tests passing"
```

---

# PARTE III · VALIDACIÓN Y DESPLIEGUE

---

## Checklist Final Pre-Vercel

### Tests
```bash
# 1. Todos los tests pasan
pnpm test
# Expected: 247 passed

# 2. TypeScript sin errores
npx tsc --noEmit

# 3. Build exitoso
pnpm build
```

### Validación Manual Local
```bash
# 1. Onboarding flow completo
pnpm dev
# - Ir a localhost:3000
# - Completar wizard de 5 pasos
# - Verificar redirección a primera misión

# 2. Draft visibility
# - Verificar que M08-M12 NO aparecen en sidebar
# - Con SHOW_DRAFTS=true, verificar que SÍ aparecen

# 3. Sidebar misiones
# - Expandir Gobierno → CSU
# - Verificar que aparecen misiones CoP
```

### Commit Final
```bash
git add .
git commit -m "release(v8e): complete gamified onboarding portal

Features:
- v8d-p1: Draft visibility filter in sidebar
- v8d-p2: Misiones CoP in sidebar navigation
- v8e-p3: Gamification engine core
- v8e-p4: Onboarding wizard (steps 1-2)
- v8e-p5: Avatar selection + email verification
- v8e-p6: Comunidades selection + first mission
- v8e-p7: Middleware route protection

Stats:
- 247 tests passing
- 0 TypeScript errors
- Build successful

All changes additive, no breaking changes."
```

---

# Apéndice: Migración a v9

El engine gamificado (`src/lib/engine/gamification.ts`) está diseñado para ser agnóstico de UI. Para v9:

```typescript
// En v9, importar el engine
import { ReformaGamificationEngine } from '@aleia-portal-engine/gamification';

// El engine es el mismo, solo cambia la UI
// v9 puede usar React, Vue, o cualquier framework
```

---

> **Documento Completo:** v8d-p1 a v8e-p7
> **Total Estimado Tests:** 247
> **Diseño:** Emocionalmente atractivo + TDD riguroso
> **Compatibilidad:** Additivo, v9-ready
