# Guía: Ejecutar sync vault → portal desde Obsidian

> **Para**: maintainers del portal `reforma-ud` que trabajan con el vault Obsidian.
> **Versión**: 1.0.0 · 2026-04-28

Permite lanzar `pnpm sync:vault` directamente desde Obsidian como un botón en la barra de herramientas o en una nota, sin abrir una terminal.

---

## Prerrequisitos

### 1 · Plugin: Shell Commands

Instala el plugin comunidad **"Shell commands"** en Obsidian:

1. `Configuración → Plugins de la comunidad → Examinar`
2. Busca **"Shell commands"** (autor: Tapio Vierros)
3. Instala y activa

### 2 · Host sync-glosario (`c:/tmp/ghs-src/`)

El paso [2] del sync corre `sync-glosario.mjs` desde `c:/tmp/ghs-src/` (ruta corta, sin espacios). Este directorio debe tener sus dependencias instaladas.

**Setup único:**

```bash
# En terminal — solo la primera vez
mkdir c:/tmp/ghs-src

# Copiar los archivos del motor sync-glosario desde el vault:
# Origen: H:\...\3-diseño-capitulo-libro\_gold-html-static\src\
# Archivos necesarios: sync-glosario.mjs, package.json
# (copiarlos manualmente o con el script a continuación)

cd c:/tmp/ghs-src
npm install
```

> Si `sync-glosario.mjs` aún no está en `c:/tmp/ghs-src/`, ejecuta primero el sync manual una vez:
> ```bash
> cd c:/antigravity/aleia-reforma-ud/apps/portal-next
> node scripts/sync-vault.mjs --skip-papers   # verifica que falla en paso [2]
> ```
> Esto confirma la ruta; luego copia los archivos manualmente.

### 3 · Google Drive Stream montado

El vault debe estar accesible en `H:\` con la carpeta del capítulo libro sincronizada. Verifica en el explorador de archivos que existe:
```
H:\...\daath-zen\R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\01-secciones\
```

---

## Configurar los comandos en Shell Commands

Ve a `Configuración → Shell commands` y añade estos 3 comandos:

### Comando 1: Sync completo

| Campo | Valor |
|---|---|
| **Alias** | `reforma-ud: Sync vault completo` |
| **Shell command** | `cd /c/antigravity/aleia-reforma-ud/apps/portal-next && pnpm sync:vault` |
| **Shell** | `bash` (Git Bash) o `powershell` |
| **Working directory** | (dejar vacío) |
| **Output channel** | `Notification balloon` + `Open output in modal` |

### Comando 2: Dry-run (solo reporte)

| Campo | Valor |
|---|---|
| **Alias** | `reforma-ud: Sync vault dry-run` |
| **Shell command** | `cd /c/antigravity/aleia-reforma-ud/apps/portal-next && pnpm sync:vault:dry` |
| **Output channel** | `Open output in modal` |

### Comando 3: Solo papers M01-M12

| Campo | Valor |
|---|---|
| **Alias** | `reforma-ud: Sync solo papers` |
| **Shell command** | `cd /c/antigravity/aleia-reforma-ud/apps/portal-next && pnpm sync:vault -- --skip-glosario` |
| **Output channel** | `Notification balloon` |

### Comando 4: TDD (validar sync)

| Campo | Valor |
|---|---|
| **Alias** | `reforma-ud: Test sync vault` |
| **Shell command** | `cd /c/antigravity/aleia-reforma-ud/apps/portal-next && node scripts/test-sync-vault.mjs` |
| **Output channel** | `Open output in modal` |

---

## Agregar botones en una nota (Obsidian Buttons o inline)

### Opción A: Plugin "Buttons"

Instala el plugin comunidad **"Buttons"** (autor: shabegom). Luego en cualquier nota:

````markdown
```button
name Sync vault → portal
type command
action Shell commands: Execute: reforma-ud: Sync vault completo
color purple
```
````

````markdown
```button
name Dry-run (reporte)
type command
action Shell commands: Execute: reforma-ud: Sync vault dry-run
color blue
```
````

### Opción B: Toolbar (barra lateral)

El plugin Shell Commands soporta añadir comandos a la barra de herramientas de Obsidian:

1. En la configuración del comando, activa **"Show in toolbar"**
2. Elige un ícono (sugerencia: `refresh-cw` para sync, `play` para dry-run)
3. El botón aparece en la barra superior de Obsidian junto a los controles nativos

### Opción C: Nota `_sync-portal.md` en el vault

Crea una nota dedicada como panel de control:

```markdown
# Panel sync vault → portal

## Comandos disponibles

Ejecutar desde Command Palette (Ctrl+P):
- `reforma-ud: Sync vault completo` — papers + glosario + fix YAML
- `reforma-ud: Sync vault dry-run` — solo reporte, no escribe
- `reforma-ud: Sync solo papers` — solo M01-M12
- `reforma-ud: Test sync vault` — 16 tests TDD

## Flujo recomendado

1. Dry-run → revisar reporte
2. Sync completo → esperar output
3. Test sync → confirmar 16/16 passed
4. En terminal del repo: `pnpm build` → `git add content/ && git commit -m "chore(content): sync vault YYYY-MM-DD"` → `git push`

## Estado sync

- Último sync exitoso: (actualizar manualmente)
- Papers en portal: 12 (M01-M12)
- Conceptos glosario: ~159
```

---

## Solución de problemas

### Error: `c:/tmp/ghs-src/node_modules` no encontrado

```
✗ Deps instaladas: c:/tmp/ghs-src/node_modules/
  → Ejecutar: cd c:/tmp/ghs-src && npm install
```

**Solución**: El paso [2] no tiene sus dependencias. Ejecuta en terminal:
```bash
cd c:/tmp/ghs-src && npm install
```
Si el directorio no existe, completa el **Setup único** arriba.

### Error: Vault path no accesible

```
✗ Vault path accesible: H:\...
  → Google Drive Stream debe estar montado y sincronizado
```

**Solución**: Abre Google Drive Desktop, espera sincronización completa, verifica que `H:\` aparece en el explorador.

### Error: El comando no se ejecuta desde Obsidian

El plugin Shell Commands en Windows puede requerir especificar el shell explícitamente:

- Ve a la configuración del comando → pestaña "Environments"  
- En Windows, selecciona **`bash`** y apunta a `C:\Program Files\Git\bin\bash.exe` (Git Bash)
- O usa **`powershell`** con el comando adaptado:
  ```powershell
  Set-Location C:\antigravity\aleia-reforma-ud\apps\portal-next; pnpm sync:vault
  ```

### Sync completa pero glosario da 0 conceptos

El filtro por defecto es `kd_status: approved`. Si todos están en DRAFT:
```bash
pnpm sync:vault -- --filter all
```

---

## Referencia rápida de flags

| Flag | Efecto |
|---|---|
| `--dry-run` | No escribe archivos (solo reporte del paso [2]) |
| `--skip-papers` | Salta `import-book-sections.mjs` |
| `--skip-glosario` | Salta `sync-glosario.mjs` |
| `--skip-fix` | Salta `fix-orphan-indented.mjs` |
| `--filter approved` | Solo conceptos con `kd_status: approved` (default) |
| `--filter all` | Incluye DRAFT y cualquier otro status |

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28*
