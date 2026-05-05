/**
 * vault-proxy.gs — Google Apps Script Web App
 *
 * Proxy minimalista para leer archivos .md y el árbol de carpetas
 * desde Google Drive, con CORS habilitado para consumo desde Vercel.
 *
 * Endpoints:
 *   ?mode=doc&path=100--csu/acuerdo.md       → contenido del archivo
 *   ?mode=tree&rootFilter=100--csu           → JSON del árbol de carpetas
 *
 * Setup:
 *   1. Copiar este archivo en https://script.google.com (nuevo proyecto)
 *   2. Reemplazar VAULT_FOLDER_ID con el ID de tu carpeta raíz en Drive
 *   3. Desplegar como Web App (Ejecutar como: Yo, Acceso: Cualquiera)
 *   4. Copiar la URL del deployment y usarla en NEXT_PUBLIC_VAULT_PROXY_URL
 */

const CONFIG = {
  // ID de la carpeta raíz del vault en Google Drive
  // Ejemplo: desde la URL https://drive.google.com/drive/folders/1AbC...
  VAULT_FOLDER_ID: 'REEMPLAZAR_CON_TU_FOLDER_ID',

  // Extensiones permitidas
  ALLOWED_EXT: ['.md', '.mdx'],

  // Patrones de exclusión (nombres que empiezan con estos prefijos)
  EXCLUDE_PREFIXES: ['.', '_'],
};

// ─── CORS ───────────────────────────────────────────────────
function setCorsHeaders(output) {
  output.addHeader('Access-Control-Allow-Origin', '*');
  output.addHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  output.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  return output;
}

function doOptions() {
  const output = ContentService.createTextOutput('');
  return setCorsHeaders(output);
}

// ─── ENTRY POINT ────────────────────────────────────────────
function doGet(e) {
  const mode = e.parameter.mode || 'doc';
  const path = e.parameter.path || '';
  const rootFilter = e.parameter.rootFilter || '';

  try {
    if (mode === 'tree') {
      const tree = buildTree(CONFIG.VAULT_FOLDER_ID, rootFilter);
      return jsonResponse({ ok: true, tree });
    }

    if (mode === 'doc') {
      const content = fetchDoc(path);
      return plainTextResponse(content);
    }

    return jsonResponse({ ok: false, error: 'modo desconocido' }, 400);
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

// ─── FETCH DOCUMENT ─────────────────────────────────────────
function fetchDoc(filePath) {
  // Normalizar: reemplazar slashes invertidos
  const normalized = filePath.replace(/\\/g, '/');
  const parts = normalized.split('/').filter((p) => p.length > 0);

  if (parts.length === 0) {
    throw new Error('path vacío');
  }

  const fileName = parts[parts.length - 1];
  const parentPath = parts.slice(0, -1);

  let folder = DriveApp.getFolderById(CONFIG.VAULT_FOLDER_ID);

  // Navegar por carpetas intermedias
  for (const part of parentPath) {
    const folders = folder.getFoldersByName(part);
    if (!folders.hasNext()) {
      throw new Error('carpeta no encontrada: ' + part);
    }
    folder = folders.next();
  }

  // Buscar archivo
  const files = folder.getFilesByName(fileName);
  if (!files.hasNext()) {
    throw new Error('archivo no encontrado: ' + fileName);
  }

  const file = files.next();
  const blob = file.getBlob();
  return blob.getDataAsString();
}

// ─── BUILD TREE ─────────────────────────────────────────────
function buildTree(folderId, rootFilter) {
  const rootFolder = DriveApp.getFolderById(folderId);

  // Si hay rootFilter, buscar solo esas carpetas de primer nivel
  let entries = [];
  const folders = rootFolder.getFolders();
  while (folders.hasNext()) {
    entries.push({ type: 'folder', item: folders.next() });
  }

  const filtered = entries.filter((e) => {
    if (!rootFilter) return true;
    const filters = rootFilter.split(',').map((s) => s.trim());
    return filters.includes(e.item.getName());
  });

  return filtered.map((e) => scanFolder(e.item)).filter(Boolean);
}

function scanFolder(folder) {
  const name = folder.getName();

  // Excluir por prefijo
  if (CONFIG.EXCLUDE_PREFIXES.some((pre) => name.startsWith(pre))) {
    return null;
  }

  const children = [];

  // Subcarpetas
  const subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    const child = scanFolder(subFolders.next());
    if (child) children.push(child);
  }

  // Archivos
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    if (CONFIG.EXCLUDE_PREFIXES.some((pre) => fileName.startsWith(pre))) continue;
    if (!CONFIG.ALLOWED_EXT.some((ext) => fileName.toLowerCase().endsWith(ext))) continue;

    const relPath = buildRelativePath(folder, fileName);
    children.push({
      type: 'file',
      id: relPath,
      name: fileName.replace(/\.(md|mdx)$/i, ''),
      slug: relPath.replace(/\.(md|mdx)$/i, ''),
      href: '/vault/' + relPath.replace(/\.(md|mdx)$/i, ''),
    });
  }

  // Ordenar: carpetas primero, luego archivos; alfabético
  children.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'folder' ? -1 : 1;
  });

  return {
    type: 'folder',
    id: buildRelativePath(folder, ''),
    name,
    slug: buildRelativePath(folder, ''),
    children,
  };
}

// Construir ruta relativa desde la raíz del vault
function buildRelativePath(folder, fileName) {
  const parts = [];
  let current = folder;
  const root = DriveApp.getFolderById(CONFIG.VAULT_FOLDER_ID);

  while (current.getId() !== root.getId()) {
    parts.unshift(current.getName());
    const parents = current.getParents();
    if (!parents.hasNext()) break;
    current = parents.next();
  }

  if (fileName) parts.push(fileName);
  return parts.join('/');
}

// ─── HELPERS ────────────────────────────────────────────────
function jsonResponse(obj, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return setCorsHeaders(output);
}

function plainTextResponse(text) {
  const output = ContentService.createTextOutput(text);
  output.setMimeType(ContentService.MimeType.PLAIN_TEXT);
  return setCorsHeaders(output);
}
