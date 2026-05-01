import fs from 'fs';
import path from 'path';

const CSS_BLOCK = `<style>
:root {
  --navy:  #0a0f1e; --navy2: #111827; --navy3: #1e293b;
  --sky:   #0ea5e9; --sky-d: #0369a1; --sky-l: #bae6fd;
  --sun:   #f59e0b; --sun-d: #b45309; --sun-l: #fde68a;
  --grn:   #10b981; --grn-d: #047857; --grn-l: #a7f3d0;
  --pur:   #8b5cf6; --pur-d: #6d28d9; --pur-l: #ddd6fe;
  --rose:  #f43f5e; --rose-d: #be123c; --rose-l: #fecdd3;
  --teal:  #14b8a6; --teal-d: #0f766e; --teal-l: #99f6e4;
  --text:  #1e293b; --muted: #64748b; --bg: #f8fafc; --border: rgba(0,0,0,0.07);
  --mono:  'Courier New', Courier, monospace;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Calibri, Carlito, 'Segoe UI', Arial, sans-serif; font-size: 9pt; line-height: 1.42; color: var(--text); background: #fff; max-width: 215mm; margin: 0 auto; padding: 7mm 11mm; }
.print-btn { position: fixed; top: 10px; right: 10px; background: var(--sky-d); color:#fff; border:none; padding: 0.4rem 0.9rem; border-radius: 7px; font-size: 0.75rem; font-weight: 700; cursor: pointer; z-index: 999; font-family: inherit; box-shadow: 0 3px 12px rgba(0,0,0,0.22); }
.print-btn:hover { background: var(--navy2); }
h1 { font-size: 16pt; font-weight: 700; color: #fff; line-height: 1.06; }
h2 { font-size: 10pt; font-weight: 700; color: var(--navy); margin: 0.55rem 0 0.28rem; border-bottom: 2px solid var(--sky); padding-bottom: 0.14rem; }
h3 { font-size: 8.5pt; font-weight: 700; color: var(--navy3); margin: 0.4rem 0 0.18rem; }
h4 { font-size: 8pt; font-weight: 700; color: var(--navy3); margin: 0.35rem 0 0.15rem; }
.si { font-size: 6.8pt; color: var(--muted); margin-bottom: 0.25rem; font-style: italic; }
.pg-2 { page-break-before: always; break-before: page; }

.hero { background: linear-gradient(135deg, #0a0f1e 0%, #0c2340 40%, #0f3460 70%, #1a1a2e 100%); border-radius: 12px; padding: 0.85rem 1.1rem; margin-bottom: 0.42rem; display: grid; grid-template-columns: 1fr auto; gap: 0.8rem; align-items: center; }
.hero-eyebrow { font-size: 6.5pt; font-family: var(--mono); color: var(--sky); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.22rem; }
.hero-sub { font-size: 7.5pt; color: rgba(255,255,255,0.65); margin-top: 0.2rem; line-height: 1.45; }
.hero-right { text-align: right; }
.hero-badge { display: inline-block; background: var(--sky); color: #fff; font-size: 6pt; font-family: var(--mono); font-weight: 700; padding: 0.12rem 0.5rem; border-radius: 4px; margin-bottom: 0.15rem; letter-spacing: 0.06em; }
.hero-meta { font-size: 6pt; color: rgba(255,255,255,0.5); font-family: var(--mono); line-height: 1.7; }

.tbl-wrap { overflow-x: auto; margin: 0.22rem 0; }
table { width: 100%; border-collapse: collapse; font-size: 7.2pt; line-height: 1.35; }
th, td { border: 1px solid #e2e8f0; padding: 0.22rem 0.34rem; text-align: left; vertical-align: top; }
th { background: var(--navy2); color: #fff; font-weight: 700; font-size: 6.5pt; letter-spacing: 0.03em; }
tr:nth-child(even) { background: #f8fafc; }
tr:nth-child(odd)  { background: #fff; }
td { color: var(--text); }
.tbl-small { font-size: 6.5pt; }
.tbl-small th, .tbl-small td { padding: 0.14rem 0.24rem; }

.qb { border-left: 3.5px solid var(--sky-d); background: linear-gradient(160deg,#eff6ff,#dbeafe); border-radius: 0 8px 8px 0; padding: 0.45rem 0.7rem; margin: 0.3rem 0; font-size: 8pt; color: var(--navy3); }
.qb strong { color: var(--navy); }

.rule-card { border-radius: 8px; padding: 0.4rem 0.5rem; border: 1px solid var(--border); margin: 0.22rem 0; break-inside: avoid; }
.rule-card.r1 { background: linear-gradient(160deg,#eff6ff,#dbeafe); border-left: 3.5px solid var(--sky-d); }
.rule-card.r2 { background: linear-gradient(160deg,#f0fdf4,#dcfce7); border-left: 3.5px solid var(--grn-d); }
.rule-card.r3 { background: linear-gradient(160deg,#fffbeb,#fef3c7); border-left: 3.5px solid var(--sun-d); }
.rule-card.r4 { background: linear-gradient(160deg,#faf5ff,#ede9fe); border-left: 3.5px solid var(--pur-d); }
.rule-card.r5 { background: linear-gradient(160deg,#f0fdfa,#ccfbf1); border-left: 3.5px solid var(--teal-d); }
.rule-card.r6 { background: linear-gradient(160deg,#fef2f2,#fecdd3); border-left: 3.5px solid var(--rose-d); }
.rule-title { font-size: 7.5pt; font-weight: 700; color: var(--navy); margin-bottom: 0.1rem; text-transform: uppercase; letter-spacing: 0.03em; }
.rule-body { font-size: 7pt; color: var(--text); line-height: 1.32; }
.rule-body b { color: var(--navy2); }

.ft { margin-top: 0.4rem; padding-top: 0.32rem; border-top: 1.5px solid var(--border); display: grid; grid-template-columns: 1fr auto; font-size: 5.8pt; color: var(--muted); }
.ft-r { text-align: right; font-family: var(--mono); }

.verdict { background: linear-gradient(135deg, var(--grn-d) 0%, var(--sky-d) 50%, var(--pur-d) 100%); border-radius: 10px; padding: 0.55rem 0.9rem; margin: 0.3rem 0; text-align: center; }

pre { background: var(--navy2); color: #fff; padding: 0.5rem; border-radius: 6px; font-family: var(--mono); font-size: 7pt; overflow-x: auto; margin: 0.3rem 0; }
code { font-family: var(--mono); font-size: 7.2pt; background: #f1f5f9; padding: 0.05rem 0.2rem; border-radius: 3px; }
pre code { background: transparent; padding: 0; }

ul, ol { margin: 0.3rem 0 0.3rem 1.2rem; font-size: 7.5pt; }
li { margin-bottom: 0.15rem; }
a { color: var(--sky-d); text-decoration: none; }
a:hover { text-decoration: underline; }

@page { size: Letter portrait; margin: 7mm 9mm 7mm 9mm; }
@media print {
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { margin:0; padding:0; max-width:100%; }
  .print-btn { display: none !important; }
  body { font-size: 8pt; padding: 0; line-height: 1.34; }
  .pg-2 { page-break-before: always !important; break-before: page !important; }
  .rule-card, .tbl-wrap, .qb, pre { break-inside: avoid; page-break-inside: avoid; }
  h2 { margin: 0.34rem 0 0.18rem; }
  h1 { font-size: 14pt; }
}
</style>`;

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { body: text, meta: {} };
  const lines = m[1].split(/\r?\n/);
  const meta = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
      meta[k] = v;
    }
  }
  return { body: text.slice(m[0].length), meta };
}

function mdToHtml(md) {
  let html = md;
  // code blocks
  html = html.replace(/```json\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```dataviewjs\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // tables
  html = html.replace(/(\n|^)(\|.+\|[ \t]*\n\|[-:| \t]+\|[ \t]*\n(?:\|.+\|[ \t]*\n?)+)/g, (_m, before, tableBlock) => {
    const rows = tableBlock.trim().split(/\n/);
    let out = '<div class="tbl-wrap"><table>';
    rows.forEach((row, i) => {
      if (row.match(/^\|[-:| \t]+\|$/)) return;
      const cells = row.split('|').slice(1, -1).map(c => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      out += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
    });
    out += '</table></div>';
    return before + out;
  });
  // headers
  html = html.replace(/(^|\n)#### (.+)/g, '$1<h4>$2</h4>');
  html = html.replace(/(^|\n)### (.+)/g, '$1<h3>$2</h3>');
  html = html.replace(/(^|\n)## (.+)/g, '$1<h2>$2</h2>');
  html = html.replace(/(^|\n)# (.+)/g, '$1<h1>$2</h1>');
  // blockquotes
  html = html.replace(/(^|\n)(> .+(?:\n> .+)*)/g, (_m, before, block) => {
    const inner = block.replace(/^> /gm, '').replace(/\n/g, '<br>');
    return before + '<div class="qb">' + inner + '</div>';
  });
  // bold / italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  html = html.replace(/\*(.+?)\*/g, '<i>$1</i>');
  // links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // lists
  html = html.replace(/(^|\n)((?:\s*-\s.+\n?)+)/g, (_m, before, listBlock) => {
    const items = listBlock.trim().split(/\n/).filter(l => l.trim().startsWith('-')).map(l => '<li>' + l.replace(/^\s*-\s*/, '') + '</li>');
    return before + '<ul>' + items.join('') + '</ul>';
  });
  // numbered lists
  html = html.replace(/(^|\n)((?:\s*\d+\.\s.+\n?)+)/g, (_m, before, listBlock) => {
    const items = listBlock.trim().split(/\n/).filter(l => /^\s*\d+\./.test(l)).map(l => '<li>' + l.replace(/^\s*\d+\.\s*/, '') + '</li>');
    return before + '<ol>' + items.join('') + '</ol>';
  });
  // horizontal rules
  html = html.replace(/(^|\n)---\s*(\n|$)/g, '$1<hr>$2');
  // paragraphs (lines not wrapped in block tags)
  const blocks = html.split(/\n\n+/);
  html = blocks.map(b => {
    const t = b.trim();
    if (!t || t.startsWith('<') || t.startsWith('|')) return t;
    return '<p>' + t.replace(/\n/g, '<br>') + '</p>';
  }).join('\n\n');
  return html;
}

function buildHero(meta, titleOverride) {
  const kdId = meta.kd_id || '';
  const version = meta.kd_version || '';
  const status = meta.kd_status || '';
  const date = meta.kd_date || '';
  const acuerdo = meta.acuerdo_id || '';
  const title = titleOverride || meta.kd_title || 'Documento';
  const anexo = meta.anexo_letra || '';
  return `<div class="hero">
  <div class="hero-left">
    <div class="hero-eyebrow">${kdId}</div>
    <h1>${title}</h1>
    <div class="hero-sub">${meta.proposito || meta.purpose || ''}</div>
  </div>
  <div class="hero-right">
    <div class="hero-badge">${version} · ${status}</div><br>
    <div class="hero-meta">
      ${date}<br>
      ${acuerdo ? 'Acuerdo: ' + acuerdo : ''}${anexo ? '<br>Anexo: ' + anexo : ''}
    </div>
  </div>
</div>`;
}

function processFile(src, dst, titleOverride) {
  const md = fs.readFileSync(src, 'utf-8');
  const { body, meta } = parseFrontmatter(md);
  const hero = buildHero(meta, titleOverride);
  const htmlBody = mdToHtml(body);
  const out = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${meta.kd_title || path.basename(src)}</title>
${CSS_BLOCK}
</head>
<body>
<button class="print-btn" onclick="window.print()">Imprimir / PDF</button>
${hero}
${htmlBody}
<div class="ft"><div>CC BY-SA 4.0 · Carlos Camilo Madera Sepúlveda · UDFJC · ${meta.kd_date || '2026'}</div><div class="ft-r">${meta.kd_version || ''}</div></div>
</body>
</html>`;
  fs.writeFileSync(dst, out, 'utf-8');
  console.log('Generated:', dst);
}

const base = '20-estrategias/analisis-iniciativa-bpa-v4';
const outDir = path.join(base, 'outputs');

const files = [
  { src: path.join(base, 'Anexo-v4--medicion-adopcion-reforma-bpa.md'), dst: path.join(outDir, 'anexo-v4--medicion-adopcion-reforma-bpa.html') },
  { src: path.join(base, 'AUDIT-inicio-analisis-bpa-v4-v2-1.md'), dst: path.join(outDir, 'audit-inicio-analisis-bpa-v4-v2-1.html') },
  { src: path.join(outDir, 'res-EA-001a-v4--ejecutivo-csu-adopcion-bpa.md'), dst: path.join(outDir, 'res-EA-001a-v4--ejecutivo-csu-adopcion-bpa.html') },
  { src: path.join(outDir, 'anexo-A-v4--asignacion-responsabilidades-bpa.md'), dst: path.join(outDir, 'anexo-A-v4--asignacion-responsabilidades-bpa.html') },
  { src: path.join(outDir, 'anexo-B-v4--plan-financiero-transicion-bpa.md'), dst: path.join(outDir, 'anexo-B-v4--plan-financiero-transicion-bpa.html') },
  { src: path.join(outDir, 'anexo-C-v4--cronograma-adopcion-bpas-estatutos-derivados.md'), dst: path.join(outDir, 'anexo-C-v4--cronograma-adopcion-bpas-estatutos-derivados.html') },
  { src: path.join(outDir, 'anexo-D-v4--sistema-indicadores-bsc-s-bpa.md'), dst: path.join(outDir, 'anexo-D-v4--sistema-indicadores-bsc-s-bpa.html') },
  { src: path.join(outDir, 'anexo-E-v4--planta-cargos-competencias-bpa.md'), dst: path.join(outDir, 'anexo-E-v4--planta-cargos-competencias-bpa.html') },
  { src: path.join(outDir, 'anexo-F-v4--alcance-limites-decision-csu-bpa.md'), dst: path.join(outDir, 'anexo-F-v4--alcance-limites-decision-csu-bpa.html') },
  { src: path.join(outDir, 'anexo-G-v4--guia-plan-accion-8-anos-21-bpas.md'), dst: path.join(outDir, 'anexo-G-v4--guia-plan-accion-8-anos-21-bpas.html') },
  { src: path.join(outDir, 'AUDIT-cambios-base-EA001--coherencia-anexo-G-v4.md'), dst: path.join(outDir, 'audit-cambios-base-ea001--coherencia-anexo-g-v4.html') },
];

for (const f of files) {
  processFile(f.src, f.dst);
}
console.log('Done: ' + files.length + ' HTML files generated.');
