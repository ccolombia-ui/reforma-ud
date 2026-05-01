/**
 * Zoottelkeeper Parser — v8g-l5
 *
 * Parsea archivos `_Index_of_*` generados por el plugin Zoottelkeeper
 * de Obsidian, extrayendo la estructura de carpetas como árbol navegable.
 */

export interface VaultTreeNode {
  id: string;
  name: string;
  slug: string;
  type: 'folder' | 'file';
  href?: string;
  children: VaultTreeNode[];
  isHidden?: boolean;
}

/**
 * Extrae wikilinks [[path/to/file|alias]] del contenido de un index.
 */
export function parseWikilinks(content: string): Array<{ path: string; alias: string }> {
  const links: Array<{ path: string; alias: string }> = [];
  // Regex para [[path|alias]] o [[path]]
  const regex = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const path = match[1].trim();
    const alias = match[2] ? match[2].trim() : path.split('/').pop() || path;
    links.push({ path, alias });
  }
  return links;
}

/**
 * Construye un árbol jerárquico a partir de los wikilinks.
 * Cada path `folder/subfolder/file` se convierte en nodos anidados.
 */
export function buildVaultTree(
  links: Array<{ path: string; alias: string }>,
  options?: {
    rootPath?: string;
    excludePatterns?: string[];
    folderMappings?: Record<string, string>;
    indexPattern?: string;
  },
): VaultTreeNode[] {
  const { rootPath, excludePatterns = [], folderMappings = {} } = options ?? {};

  const root: VaultTreeNode = { id: '__root__', name: '', slug: '', type: 'folder', children: [] };

  for (const link of links) {
    let fullPath = link.path;

    // Remover rootPath del inicio si está presente
    if (rootPath) {
      const prefix = rootPath.endsWith('/') ? rootPath : rootPath + '/';
      if (fullPath.startsWith(prefix)) {
        fullPath = fullPath.slice(prefix.length);
      }
    }

    const segments = fullPath.split('/');
    if (segments.length === 0 || segments[0] === '') continue;

    // Verificar si el primer segmento (folder raíz) debe excluirse
    if (shouldExclude(segments[0], excludePatterns)) continue;

    let current = root;
    let accumulatedPath = '';

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const isLast = i === segments.length - 1;

      if (shouldExclude(seg, excludePatterns)) break;

      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${seg}` : seg;

      // Aplicar mapping de nombre si existe
      const displayName = folderMappings[seg] ?? folderMappings[accumulatedPath] ?? seg;

      if (isLast) {
        // Es un archivo
        const slug = seg.replace(/\.md$/i, '').replace(/\.(mdx|txt)$/i, '');
        const href = `/${accumulatedPath.replace(/\.md$/i, '').replace(/\.(mdx|txt)$/i, '')}`;
        current.children.push({
          id: accumulatedPath,
          name: displayName,
          slug,
          type: 'file',
          href,
          children: [],
        });
      } else {
        // Es una carpeta - buscar o crear
        let folder = current.children.find(
          (c) => c.type === 'folder' && c.slug === seg,
        );
        if (!folder) {
          folder = {
            id: accumulatedPath,
            name: displayName,
            slug: seg,
            type: 'folder',
            children: [],
          };
          current.children.push(folder);
        }
        current = folder;
      }
    }
  }

  // Ordenar: carpetas primero, luego archivos; cada grupo alfabéticamente
  sortTree(root.children);
  return root.children;
}

function shouldExclude(name: string, patterns: string[]): boolean {
  for (const pattern of patterns) {
    // Soportar regex string ^_.* o literales
    try {
      const regex = new RegExp(pattern);
      if (regex.test(name)) return true;
    } catch {
      // Fallback: comparación literal
      if (name === pattern) return true;
    }
  }
  return false;
}

function sortTree(nodes: VaultTreeNode[]): void {
  nodes.sort((a, b) => {
    // Carpetas antes que archivos
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    // Orden alfabético por nombre
    return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
  });
  for (const node of nodes) {
    if (node.children.length > 0) sortTree(node.children);
  }
}

/**
 * Parse completo: desde contenido raw de un index → árbol.
 */
export function parseZoottelkeeperIndex(
  content: string,
  options?: Parameters<typeof buildVaultTree>[1],
): VaultTreeNode[] {
  const links = parseWikilinks(content);
  return buildVaultTree(links, options);
}
