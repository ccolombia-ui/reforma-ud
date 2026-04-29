/**
 * <DvVistaPorRol> · Vista por rol JTBD M04 (MetaBind reactivo §8).
 * v8 S2 · Reemplazo del DV block §8 del concepto-universal.
 *
 * El contenido de cada rol se estructura como:
 *   vistas: Record<rol_id, { titulo: string; contenido: string[] }>
 *
 * En S5 (activación de sentinels), el transformer extraerá estas vistas del
 * bloque DV y las almacenará en el frontmatter bajo `concepto_vistas_rol`.
 * En S2 aceptamos el prop directamente.
 *
 * El `rol` activo viene de la URL (?rol=) — se pasa desde la página server-side
 * o desde el ConceptoBodyClient como searchParam.
 *
 * Server component (recibe `rol` como prop desde el parent que lee URL).
 */

export type VistaRol = {
  titulo: string;
  contenido: string[];
};

export type VistasRol = Record<string, VistaRol>;

const ROL_DEFAULT = 'estudiante-soberano';

export function DvVistaPorRol({
  vistas,
  rol,
}: Readonly<{
  vistas: VistasRol;
  rol?: string;
}>) {
  if (!vistas || Object.keys(vistas).length === 0) {
    return (
      <p className="dv-empty text-xs text-muted-foreground italic">
        Vistas por rol no declaradas para este concepto.
      </p>
    );
  }

  const activeRol = (rol && vistas[rol]) ? rol : ROL_DEFAULT;
  const vista = vistas[activeRol] ?? Object.values(vistas)[0];

  if (!vista) return null;

  return (
    <div className="dv-vista-por-rol my-3 space-y-2 text-xs">
      <h3 className="font-semibold text-sm">{vista.titulo}</h3>
      {vista.contenido.map((linea, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed">
          {linea}
        </p>
      ))}
    </div>
  );
}
