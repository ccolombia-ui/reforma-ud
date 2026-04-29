/**
 * sync-glosario.gs — Google Apps Script
 * Sincroniza con-*.md del vault Obsidian (Google Drive) al repo GitHub.
 *
 * Desplegado como Web App:
 *   Execute as: Me (ccolombia@soygenial.co)
 *   Who has access: Anyone  (la URL es el secret — sin user management)
 *
 * Configuración (Script Properties — nunca hardcoded):
 *   GITHUB_PAT   → Personal Access Token con scope: contents (read+write)
 *   DEPLOY_KEY   → string aleatorio para validar requests (opcional)
 *
 * POST body: { docId: "con-acu-004-25", filter: "all" | "approved" }
 * Response:  { success, stats, report[], error? }
 */

// ── Constantes de vault ────────────────────────────────────────────────────
var VAULT_FOLDER_ID   = '17DFwitZbTpS21iwNb6DWZU20UTpivS5L';
var GLOSARIO_SUBDIR   = '00-glosoario-universal';
var GITHUB_REPO       = 'ccolombia-ui/reforma-ud';
var GITHUB_BRANCH     = 'main';
var PORTAL_GLOSARIO   = 'apps/portal-next/content/glosario';

// ── Entry point HTTP ───────────────────────────────────────────────────────

function doPost(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    var body = JSON.parse(e.postData.contents || '{}');
    var docId  = (body.docId  || '').trim();
    var filter = (body.filter || 'approved').trim();

    // Validar deploy key si está configurada
    var props    = PropertiesService.getScriptProperties();
    var deployKey = props.getProperty('DEPLOY_KEY');
    if (deployKey && body.key !== deployKey) {
      output.setContent(JSON.stringify({ error: 'No autorizado' }));
      return output;
    }

    var githubPat = props.getProperty('GITHUB_PAT');
    if (!githubPat) {
      output.setContent(JSON.stringify({ error: 'GITHUB_PAT no configurado en Script Properties' }));
      return output;
    }

    var result = runSync(docId, filter, githubPat);
    output.setContent(JSON.stringify(result));
  } catch (err) {
    output.setContent(JSON.stringify({ success: false, error: err.message }));
  }

  return output;
}

// GET → health check (útil para verificar que el deploy está activo)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', script: 'sync-glosario', ts: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Lógica principal ───────────────────────────────────────────────────────

function runSync(docId, filter, githubPat) {
  var stats  = { new: 0, updated: 0, unchanged: 0, ignored: 0, errors: 0 };
  var report = [];

  // 1. Localizar subcarpeta 00-glosoario-universal dentro del vault
  var rootFolder = DriveApp.getFolderById(VAULT_FOLDER_ID);
  var glosarioFolder = findSubfolder(rootFolder, GLOSARIO_SUBDIR);

  if (!glosarioFolder) {
    return { success: false, error: 'No encontré la carpeta ' + GLOSARIO_SUBDIR + ' dentro del vault.' };
  }

  // 2. Recopilar archivos con-*.md (recursivo)
  var files = collectConFiles(glosarioFolder);

  // 3. Filtrar por docId si se pidió uno específico
  if (docId) {
    var slug = docId.endsWith('.md') ? docId : docId + '.md';
    files = files.filter(function(f) { return f.getName() === slug; });
    if (files.length === 0) {
      return { success: false, error: 'No encontré ' + docId + ' en el vault.' };
    }
  }

  // 4. Procesar cada archivo
  for (var i = 0; i < files.length; i++) {
    var file   = files[i];
    var slug   = file.getName().replace(/\.md$/, '');
    var raw    = file.getBlob().getDataAsString('UTF-8');

    var parsed   = splitFrontmatter(raw);
    var keys     = parseYamlKeys(parsed.frontmatterBlock);
    var status   = (keys.kd_status || '').toUpperCase();

    // Filtro de estado
    if (filter === 'approved' && status !== 'APPROVED' && status !== 'FINAL') {
      stats.ignored++;
      report.push('⏭ ' + slug + ' (' + (status || 'sin status') + ')');
      continue;
    }

    var cleanedFm   = cleanFrontmatter(parsed.frontmatterBlock);
    var cleanedBody = cleanBody(parsed.body);
    var outContent  = cleanedFm + '\n' + cleanedBody;

    // 5. Push a GitHub
    var ghPath = PORTAL_GLOSARIO + '/' + slug + '.md';
    var pushResult = githubPutFile(githubPat, ghPath, outContent, slug);

    if (pushResult.error) {
      stats.errors++;
      report.push('✗ ' + slug + ': ' + pushResult.error);
    } else if (pushResult.created) {
      stats['new']++;
      report.push('+ ' + slug + ' (nuevo)');
    } else if (pushResult.updated) {
      stats.updated++;
      report.push('↑ ' + slug + ' (actualizado)');
    } else {
      stats.unchanged++;
      report.push('= ' + slug);
    }
  }

  return {
    success: true,
    stats: stats,
    report: report,
    total: files.length
  };
}

// ── GitHub API ─────────────────────────────────────────────────────────────

function githubPutFile(pat, filePath, content, slug) {
  var apiBase = 'https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + filePath;
  var headers = {
    'Authorization': 'token ' + pat,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'sync-glosario-gas/1.0'
  };

  // Obtener SHA actual (para update vs create)
  var sha = null;
  try {
    var getResp = UrlFetchApp.fetch(apiBase + '?ref=' + GITHUB_BRANCH, {
      headers: headers,
      muteHttpExceptions: true
    });
    if (getResp.getResponseCode() === 200) {
      sha = JSON.parse(getResp.getContentText()).sha;
    }
  } catch (e) { /* archivo no existe aún — se creará */ }

  // Codificar contenido en base64 (GitHub requiere base64)
  var encoded = Utilities.base64Encode(content, Utilities.Charset.UTF_8);

  var currentContentEncoded = null;
  if (sha) {
    // Comparar para evitar commits vacíos
    try {
      var getContentResp = UrlFetchApp.fetch(apiBase + '?ref=' + GITHUB_BRANCH, {
        headers: headers,
        muteHttpExceptions: true
      });
      if (getContentResp.getResponseCode() === 200) {
        currentContentEncoded = JSON.parse(getContentResp.getContentText()).content;
        // GitHub devuelve con saltos de línea en el base64 — normalizar
        if (currentContentEncoded) {
          currentContentEncoded = currentContentEncoded.replace(/\n/g, '');
        }
      }
    } catch (e) { /* continúa */ }

    if (currentContentEncoded === encoded) {
      return { updated: false, created: false }; // sin cambios
    }
  }

  var payload = {
    message: 'sync(gas): ' + slug + ' · ' + new Date().toISOString().slice(0, 16) + 'Z',
    content: encoded,
    branch: GITHUB_BRANCH
  };
  if (sha) payload.sha = sha;

  var putResp = UrlFetchApp.fetch(apiBase, {
    method: 'put',
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  var code = putResp.getResponseCode();
  if (code === 200) return { updated: true, created: false };
  if (code === 201) return { updated: false, created: true };
  return { error: 'GitHub API ' + code + ': ' + putResp.getContentText().slice(0, 200) };
}

// ── Drive utilities ────────────────────────────────────────────────────────

function findSubfolder(parentFolder, name) {
  var iter = parentFolder.getFoldersByName(name);
  return iter.hasNext() ? iter.next() : null;
}

function collectConFiles(folder) {
  var acc = [];
  var fileIter = folder.getFiles();
  while (fileIter.hasNext()) {
    var f = fileIter.next();
    if (/^con-[a-z0-9-]+\.md$/i.test(f.getName())) acc.push(f);
  }
  var subIter = folder.getFolders();
  while (subIter.hasNext()) {
    collectConFiles(subIter.next()).forEach(function(f) { acc.push(f); });
  }
  return acc;
}

// ── Transformaciones (port de sync-glosario.mjs) ──────────────────────────

function splitFrontmatter(raw) {
  if (raw.indexOf('---') !== 0) return { frontmatterBlock: '', body: raw };
  var end = raw.indexOf('\n---', 4);
  if (end === -1) return { frontmatterBlock: '', body: raw };
  return {
    frontmatterBlock: raw.slice(0, end + 4),
    body: raw.slice(end + 4)
  };
}

function parseYamlKeys(block) {
  var keys = {};
  var lines = block.replace(/^---\n/, '').replace(/\n---$/, '').split('\n');
  for (var i = 0; i < lines.length; i++) {
    var m = lines[i].match(/^([a-zA-Z_][a-zA-Z0-9_.]*)\s*:\s*(.*)$/);
    if (m) keys[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return keys;
}

var STRIP_PATTERNS = [
  /^tupla_/, /^concepto_/, /^pasteur_axis_/, /^neon_/,
  /^applicable_domain/, /^assumptions/, /^breaks_at/, /^extends_to/,
  /^recorded_at/, /^valid_from/, /^valid_to/, /^lifecycle_state/,
  /^kd_supersedes/, /^kd_responsible/, /^kd_parent/, /^kd_created/,
  /^kd_updated/, /^kd_doc_layout/, /^kd_transcluible_en/,
  /^kd_classification/, /^kd_doc_type/, /^align_schema_type/,
  /^concept_subtype/, /^cssclasses/, /^@type/, /^concepto_facet_/,
  /^concepto_capabilities/, /^skos_hiddenLabel/
];

function shouldStrip(key) {
  for (var i = 0; i < STRIP_PATTERNS.length; i++) {
    if (STRIP_PATTERNS[i].test(key)) return true;
  }
  return false;
}

function cleanFrontmatter(block) {
  var lines   = block.split('\n');
  var out     = [];
  var skip    = false;
  var inList  = false;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.trim() === '---') { out.push(line); skip = false; inList = false; continue; }

    if (inList) {
      if (/^\s+[-\S]/.test(line)) { if (!skip) out.push(line); continue; }
      else { inList = false; skip = false; }
    }

    var kv = line.match(/^([a-zA-Z_@"'][a-zA-Z0-9_@"'.-]*)\s*:/);
    if (kv) {
      skip = shouldStrip(kv[1]);
      inList = true;
    }
    if (!skip) out.push(line);
  }
  return out.join('\n');
}

function cleanBody(body) {
  return body
    // Wikilinks relativos → forma corta
    .replace(/!\[\[(?:[^\]|]*\/)([^\]|\/]+?)(\|[^\]]+)?\]\]/g, '![[$1$2]]')
    .replace(/\[\[(?:[^\]|]*\/)([^\]|\/]+?)(\|[^\]]+)?\]\]/g, '[[$1$2]]')
    // Bloques dataviewjs / dataview
    .replace(/```dataviewjs[\s\S]*?```/gi, '')
    .replace(/```dataview[\s\S]*?```/gi, '')
    // Meta Bind directives
    .replace(/`?INPUT\[[^\]]*\][^\n`]*/g, '')
    .replace(/`?(VIEW|BUTTON)\[[^\]]*\][^\n`]*/g, '')
    // Limpiar líneas en blanco triples
    .replace(/\n{4,}/g, '\n\n\n');
}

// ── Trigger manual desde editor (para pruebas) ────────────────────────────

function testSync() {
  var props     = PropertiesService.getScriptProperties();
  var githubPat = props.getProperty('GITHUB_PAT');
  var result    = runSync('con-acu-004-25', 'all', githubPat);
  Logger.log(JSON.stringify(result, null, 2));
}
