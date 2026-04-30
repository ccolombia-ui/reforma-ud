# Setup · sync-glosario Apps Script (clasp)

## Estado actual

- **scriptId**: `1qz_ReGpyww9mP0sO1EiGcSuNAplMYmY-gwxs6N9h3e8M2E1a1mWPIQvz`
- **URL editor**: https://script.google.com/d/1qz_ReGpyww9mP0sO1EiGcSuNAplMYmY-gwxs6N9h3e8M2E1a1mWPIQvz/edit
- **clasp** está logueado y el proyecto está conectado
- Push automático: edits en `.gs` → `clasp push --force` → Apps Script live

---

## Workflow diario

```bash
# Editar localmente
code cloud-functions/sync-glosario-gas/sync-glosario.gs

# Subir a Apps Script
cd cloud-functions/sync-glosario-gas
clasp push --force

# (opcional) auto-watch — recompila en cada save
clasp push --watch

# Abrir editor en browser
clasp open
```

---

## Setup que falta hacer manualmente (3 pasos)

### Paso 1 · Script Properties (credenciales)

En el editor: https://script.google.com/d/1qz_ReGpyww9mP0sO1EiGcSuNAplMYmY-gwxs6N9h3e8M2E1a1mWPIQvz/edit
→ **Proyecto → Configuración del proyecto → Propiedades del script** → Agregar:

| Propiedad | Valor |
|---|---|
| `GITHUB_PAT` | PAT de GitHub con scope `contents` (read+write) en repo `ccolombia-ui/reforma-ud` |
| `DEPLOY_KEY` | string aleatorio, ej: `reforma-ud-sync-2026` |

### Paso 2 · Probar antes de desplegar

En el editor:
1. Función a ejecutar: `testSync`
2. **▶ Ejecutar**
3. Primera vez: autorizar permisos (Drive readonly + URL externas) → aceptar
4. Ver **Registros de ejecución** → debe mostrar `↑ con-acu-004-25 (actualizado)` o `= sin cambios`

### Paso 3 · Desplegar como Web App

1. **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo** (`ccolombia@soygenial.co`)
4. Quién tiene acceso: **Cualquier usuario**
5. **Implementar** → copiar la URL `https://script.google.com/macros/s/AKfycb.../exec`

### Paso 4 · Vercel env vars

```bash
vercel env add GAS_SYNC_URL    production   # paste la URL del paso 3
vercel env add GAS_DEPLOY_KEY  production   # paste DEPLOY_KEY del paso 1
vercel deploy --prod
```

---

## Verificar end-to-end

```bash
# Test directo a la Web App (debe responder JSON con stats)
curl -X POST "https://script.google.com/macros/s/AKfycb.../exec" \
  -H "Content-Type: application/json" \
  -d '{"docId":"con-acu-004-25","filter":"all","key":"reforma-ud-sync-2026"}'

# Test desde el portal (debe disparar el GAS y commitear a GitHub)
curl -X POST "https://reforma-ud.vercel.app/api/sync/doc" \
  -H "Content-Type: application/json" \
  -d '{"docId":"con-acu-004-25","filter":"all"}'
```

Respuesta esperada:
```json
{
  "success": true,
  "mode": "gas",
  "stats": { "new": 0, "updated": 1, "unchanged": 0, "ignored": 0 },
  "report": ["↑ con-acu-004-25 (actualizado)"]
}
```

---

## Estructura de archivos

```
cloud-functions/sync-glosario-gas/
├── .clasp.json         ← scriptId (committed, no es secret)
├── appsscript.json     ← manifest (timezone, scopes, webapp config)
├── sync-glosario.gs    ← código de la función
└── SETUP.md            ← este archivo
```

**Locación alternativa** (Drive sync visible en vault):
```
H:\.shortcut-targets-by-id\1ondN7t4ewb2w-aN6iNesoT8yJGVqKpR2\daath-zen\
   R002-daath-cortex\20--udfjc-reforma-vinculante\3-diseño-capitulo-libro\
   _gas--sync-portal\
```

Esta carpeta H: está sincronizada vía Drive Desktop a el folder GDrive
`1y7tzzd7y5VhjRSReEVXUfe2Ycg1290Xx`. Mantener ambas en sync vía cp/clasp pull.

---

## Tests TDD

Las transformaciones puras viven en `apps/portal-next/scripts/lib/glosario-transform.mjs`
y se testean con vitest en `apps/portal-next/src/lib/glosario-transform.test.ts`.

El `.gs` es un port manual de la misma lógica. Si modificas las regex de
`cleanBody` o `STRIP_KEY_PATTERNS`, actualiza ambos archivos y ejecuta:

```bash
cd apps/portal-next && npx vitest run src/lib/glosario-transform.test.ts
```

---

*CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · 2026-04-28*
