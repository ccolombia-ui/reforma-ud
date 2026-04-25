import Link from 'next/link';
import { ChevronRight, BookMarked, Network, FileText, Folder, Building2, GraduationCap, Microscope, Globe, Landmark } from 'lucide-react';
import { canonicPaper } from '#site/content';
import { buildCommunityTree, type TreeNode } from '@/lib/sidebar-tree';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  gobierno: <Landmark className="h-3.5 w-3.5" />,
  csu: <Building2 className="h-3.5 w-3.5" />,
  rectoria: <Building2 className="h-3.5 w-3.5" />,
  direccion: <Building2 className="h-3.5 w-3.5" />,
  vicerrectoria: <GraduationCap className="h-3.5 w-3.5" />,
  facultad: <GraduationCap className="h-3.5 w-3.5" />,
  programa: <FileText className="h-3.5 w-3.5" />,
  escuela: <BookMarked className="h-3.5 w-3.5" />,
  caba: <FileText className="h-3.5 w-3.5" />,
  instituto: <Microscope className="h-3.5 w-3.5" />,
  centro: <Globe className="h-3.5 w-3.5" />,
};

function TreeItem({ node }: { node: TreeNode }) {
  const isLeaf = node.children.length === 0;
  const icon = node.type ? TYPE_ICONS[node.type] : <Folder className="h-3.5 w-3.5 opacity-60" />;
  const Label = (
    <span className="inline-flex items-center gap-1.5 truncate">
      {icon}
      <span className="truncate">{node.name}</span>
    </span>
  );
  return (
    <li>
      {node.href ? (
        <Link href={node.href} className="truncate">
          {Label}
        </Link>
      ) : (
        <span className="block truncate px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {node.name}
        </span>
      )}
      {!isLeaf && (
        <ul>
          {node.children.map((c) => (
            <TreeItem key={c.slug} node={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const tree = buildCommunityTree();
  const papers = [...canonicPaper].sort((a, b) => a.number - b.number);

  return (
    <nav data-sidebar className="sidebar-tree h-full overflow-y-auto bg-sidebar p-4 text-sidebar-foreground">
      <div className="mb-6">
        <Link href="/" className="block text-lg font-bold tracking-tight">
          reforma·ud
        </Link>
        <p className="text-xs text-muted-foreground">
          Acuerdo CSU 04/2025
        </p>
      </div>

      <section className="mb-6">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          📚 Canónico MI-12
        </h3>
        <ul>
          <li>
            <Link href="/canonico" className="font-medium">
              <span className="inline-flex items-center gap-1.5">
                <BookMarked className="h-3.5 w-3.5" /> Biblioteca
              </span>
            </Link>
          </li>
          <li>
            <Link href="/canonico/grafo">
              <span className="inline-flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5" /> Grafo global
              </span>
            </Link>
          </li>
          <li>
            <ul>
              {papers.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className="text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        M{String(p.number).padStart(2, '0')}
                      </span>
                      <span className="truncate">{p.title.replace(/^M\d+\s*[—-]\s*/i, '').slice(0, 40)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          🏛️ Comunidades
        </h3>
        <ul>
          <li>
            <Link href="/comunidades" className="font-medium">Hub de comunidades</Link>
          </li>
          {tree.map((root) => (
            <TreeItem key={root.slug} node={root} />
          ))}
        </ul>
      </section>
    </nav>
  );
}
