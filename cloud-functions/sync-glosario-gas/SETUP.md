# Setup · sync-glosario Apps Script

## Paso 1 · Crear el proyecto en Drive

1. Abrir: https://drive.google.com/drive/folders/17DFwitZbTpS21iwNb6DWZU20UTpivS5L
2. Crear carpeta `_portal-sync` dentro del vault
3. Dentro de `_portal-sync`: **Nuevo → Más → Google Apps Script**
4. Renombrar el proyecto: `sync-glosario`

## Paso 2 · Pegar el código

1. En el editor de Apps Script, reemplazar el contenido de `Código.gs` con el contenido de `sync-glosario.gs`
2. Copiar también el contenido de `appsscript.json` al archivo del mismo nombre
   (activar: Ver → Mostrar archivo de manifiesto)

## Paso 3 · Configurar Script Properties

1. En el editor: **Proyecto → Configuración del proyecto → Propiedades del script**
2. Agregar:
   - `GITHUB_PAT` = tu Personal Access Token (scope: `contents` read+write)
   - `DEPLOY_KEY`  = string aleatorio (ej: `reforma-ud-sync-2026`) → el portal lo enviará en cada request

## Paso 4 · Probar localmente en el editor

1. Seleccionar función: `testSync`
2. Click **Ejecutar** → autorizar permisos cuando pida
3. Ver resultado en **Registros de ejecución**

## Paso 5 · Desplegar como Web App

1. **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo** (ccolombia@soygenial.co)
4. Quién tiene acceso: **Cualquier usuario**
5. Click **Implementar**
6. **Copiar la URL** → se verá así:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Paso 6 · Configurar en Vercel

Agregar variable de entorno en Vercel:
```
GAS_SYNC_URL  = https://script.google.com/macros/s/AKfycb.../exec
GAS_DEPLOY_KEY = reforma-ud-sync-2026   (mismo que en Script Properties)
```

## Verificar que funciona

```bash
curl -X POST "https://script.google.com/macros/s/AKfycb.../exec" \
  -H "Content-Type: application/json" \
  -d '{"docId":"con-acu-004-25","filter":"all","key":"reforma-ud-sync-2026"}'
```

Respuesta esperada:
```json
{
  "success": true,
  "stats": { "new": 0, "updated": 1, "unchanged": 0, "ignored": 0, "errors": 0 },
  "report": ["↑ con-acu-004-25 (actualizado)"],
  "total": 1
}
```
