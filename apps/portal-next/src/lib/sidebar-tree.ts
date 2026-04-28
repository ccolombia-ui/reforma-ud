import { community } from '#site/content';

export type TreeNode = {
  slug: string;          // full slug path "comunidades/formacion/escuelas/fisica"
  segment: string;       // last segment "fisica"
  name: string;          // display name
  type?: string;         // community type (vicerrectoria, escuela, ...) o undefined si es sintetico
  href?: string;         // url if has landing; undefined if synthetic group
  children: TreeNode[];
  depth: number;
};

/** Bonitos para nodos sinteticos (grupos sin landing). */
const SYNTHETIC_LABEL: Record<string, string> = {
  facultades: 'Facultades',
  escuelas: 'Escuelas',
  cabas: 'CABAs',
  programas: 'Programas',
  direcciones: 'Direcciones',
  institutos: 'Institutos',
  centros: 'Centros',
};

const TYPE_ORDER: Record<string, number> = {
  gobierno: 0,
  csu: 1,
  rectoria: 2,
  direccion: 3,
  vicerrectoria: 0,
  facultad: 1,
  escuela: 2,
  programa: 3,
  caba: 4,
  instituto: 1,
  centro: 1,
};

function ensureNode(map: Map<string, TreeNode>, slug: string, segment: string, depth: number): TreeNode {
  let node = map.get(slug);
  if (!node) {
    node = {
      slug,
      segment,
      name: SYNTHETIC_LABEL[segment] ?? segment,
      children: [],
      depth,
    };
    map.set(slug, node);
  }
  return node;
}

/**
 * Construye el arbol jerarquico de comunidades a partir del listado plano
 * de Velite. Incluye nodos sinteticos para grupos (facultades, escuelas, etc.)
 * que no tienen su propio index.mdx.
 */
export function buildCommunityTree(): TreeNode[] {
  const map = new Map<string, TreeNode>();

  // 1) Crear nodos para cada community real (con landing)
  for (const c of community) {
    if (c.slug === 'comunidades') continue; // root hub se maneja aparte
    const parts = c.slug.split('/');
    // Asegurar todos los nodos intermedios
    for (let i = 1; i <= parts.length; i++) {
      const partial = parts.slice(0, i).join('/');
      const seg = parts[i - 1];
      const node = ensureNode(map, partial, seg, i - 1);
      if (i === parts.length) {
        node.name = c.shortName ?? c.name;
        node.type = c.type;
        node.href = `/${c.slug}`;
      }
    }
  }

  // 2) Construir relaciones padre-hijo por slug prefix
  const all = Array.from(map.values()).sort((a, b) => a.slug.localeCompare(b.slug));
  const roots: TreeNode[] = [];
  for (const node of all) {
    const parts = node.slug.split('/');
    if (parts.length === 1) {
      // wrapper synthetic 'comunidades' (creado como intermediate por los
      // hijos 'comunidades/gobierno' etc.) NO debe aparecer en la UI.
      // Sus hijos se promueven a roots reales.
      roots.push(node);
    } else {
      const parentSlug = parts.slice(0, -1).join('/');
      const parent = map.get(parentSlug);
      if (parent) parent.children.push(node);
      else roots.push(node);
    }
  }

  // v5.0ab · Promover hijos del wrapper 'comunidades' a roots top-level
  // (eliminar el doble-header "COMUNIDADES" que aparecía en el sidebar).
  const wrapperIdx = roots.findIndex((r) => r.slug === 'comunidades');
  if (wrapperIdx >= 0) {
    const wrapper = roots[wrapperIdx];
    roots.splice(wrapperIdx, 1, ...wrapper.children);
  }

  // 3) Sort children: tipos reales antes que sinteticos, y por orden semantico
  const sortChildren = (n: TreeNode) => {
    n.children.sort((a, b) => {
      const ao = a.type ? TYPE_ORDER[a.type] ?? 99 : 50; // sinteticos en medio
      const bo = b.type ? TYPE_ORDER[b.type] ?? 99 : 50;
      if (ao !== bo) return ao - bo;
      return a.name.localeCompare(b.name);
    });
    n.children.forEach(sortChildren);
  };
  roots.forEach(sortChildren);

  // 4) Sort roots: gobierno, formacion, investigacion, extension.
  // Comparación por `segment` (último componente del slug), no por slug
  // completo, porque ahora roots tienen slugs `comunidades/<X>`.
  const ROOT_ORDER = ['gobierno', 'formacion', 'investigacion', 'extension'];
  roots.sort((a, b) => {
    const ai = ROOT_ORDER.indexOf(a.segment);
    const bi = ROOT_ORDER.indexOf(b.segment);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return roots;
}
