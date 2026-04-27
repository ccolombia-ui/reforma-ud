/**
 * collapsible-headings · v5.0j Gap 1
 *
 * Transforma el HTML procesado por Velite envolviendo cada heading h2-h4 +
 * su contenido (siblings hasta el próximo heading del mismo nivel o superior)
 * en un `<details>` HTML nativo. Resultado: secciones colapsables Obsidian-style.
 *
 * Pure function string→string para que pueda invocarse en server o client sin
 * dependencias del DOM. Idempotente (si ya fue procesado, no duplica wraps).
 *
 * Anidación: como procesamos en reverse order, los headings anidados (h3 dentro
 * de h2) quedan correctamente dentro del `<details>` padre.
 */

const MARKER = 'md-collapsible';
const HEADING_RE = /<(h[234])([^>]*)>([\s\S]*?)<\/\1>/g;

type HeadingMatch = {
  start: number;
  end: number;
  level: number;
  full: string;
  scopeEnd: number;
};

export function wrapHeadingsInCollapsibles(html: string): string {
  if (!html || html.includes(`class="${MARKER}`)) return html;

  const matches: HeadingMatch[] = [];
  let m: RegExpExecArray | null;
  HEADING_RE.lastIndex = 0;
  while ((m = HEADING_RE.exec(html)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      level: Number.parseInt(m[1].slice(1), 10),
      full: m[0],
      scopeEnd: 0, // placeholder
    });
  }
  HEADING_RE.lastIndex = 0;
  if (matches.length === 0) return html;

  // Calcular fin de scope: próximo heading del mismo nivel o superior
  for (let i = 0; i < matches.length; i++) {
    let end = html.length;
    for (let j = i + 1; j < matches.length; j++) {
      if (matches[j].level <= matches[i].level) {
        end = matches[j].start;
        break;
      }
    }
    matches[i].scopeEnd = end;
  }

  // Procesar de atrás hacia adelante para no invalidar los offsets
  let out = html;
  for (let i = matches.length - 1; i >= 0; i--) {
    const w = matches[i];
    const prefix = out.slice(0, w.start);
    const heading = out.slice(w.start, w.end);
    const content = out.slice(w.end, w.scopeEnd);
    const suffix = out.slice(w.scopeEnd);
    out =
      prefix +
      `<details open class="${MARKER} ${MARKER}-h${w.level}" data-h-level="${w.level}">` +
      `<summary class="${MARKER}-summary">${heading}</summary>` +
      `<div class="${MARKER}-body">${content}</div>` +
      `</details>` +
      suffix;
  }
  return out;
}
