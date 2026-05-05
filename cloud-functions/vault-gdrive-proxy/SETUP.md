# Setup: Google Apps Script como proxy de Google Drive

## Paso 1: Obtener el ID de la carpeta raíz del vault

1. Abre Google Drive en el navegador.
2. Navega a la carpeta raíz del vault (ej: `20--udfjc-reforma-vinculante`).
3. Copia el ID de la carpeta desde la URL:
   ```
   https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
   ```
   El ID es: `1AbCdEfGhIjKlMnOpQrStUvWxYz`

## Paso 2: Crear el proyecto Apps Script

1. Ve a https://script.google.com
2. Crea un proyecto en blanco.
3. Borra el código por defecto y pega el contenido de [`vault-proxy.gs`](vault-proxy.gs).
4. Reemplaza `REEMPLAZAR_CON_TU_FOLDER_ID` con el ID real de la carpeta.

## Paso 3: Desplegar como Web App

1. En el editor, haz clic en **Desplegar** → **Nuevo despliegue**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - **Descripción**: `vault-proxy-v1`
   - **Ejecutar como**: `Yo`
   - **Acceso**: `Cualquiera` (o `Cualquiera, incluso anónimo` si está disponible)
4. Haz clic en **Desplegar** y autoriza los permisos de Google Drive.
5. Copia la **URL del deployment** (ej: `https://script.google.com/macros/s/AKfycb.../exec`).

## Paso 4: Configurar el frontend

En el proyecto `apps/portal-next`, crea o edita `.env.local`:

```env
NEXT_PUBLIC_VAULT_PROXY_URL=https://script.google.com/macros/s/AKfycb.../exec
```

## Paso 5: Verificar

```bash
curl "https://script.google.com/macros/s/AKfycb.../exec?mode=doc&path=100--csu/acuerdo.md"
curl "https://script.google.com/macros/s/AKfycb.../exec?mode=tree&rootFilter=100--csu"
```

## Notas

- **Cold start**: la primera request puede tardar 1-3 segundos.
- **Límite**: 20,000 requests/día por script.
- **Seguridad**: si necesitas restringir el acceso, cambia "Acceso" a "Solo yo" y usa un token secreto en el query param.
