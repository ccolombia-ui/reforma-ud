/**
 * <DvObsidianOnlyBlock> · Fallback para DV blocks sin patrón reconocido.
 * v8 S2 · Renderiza cuando data-dv="obsidian-only".
 *
 * UX: informa al usuario que el bloque es interactivo en Obsidian.
 * Server component.
 */

export function DvObsidianOnlyBlock() {
  return (
    <div
      className="dv-obsidian-only my-3 flex items-start gap-2 rounded-md border border-dashed bg-muted/20 px-3 py-2.5"
      role="note"
      aria-label="Vista interactiva disponible en Obsidian"
    >
      <span className="text-lg leading-none select-none" aria-hidden>ⓘ</span>
      <span className="text-[11px] text-muted-foreground">
        Vista interactiva disponible en Obsidian
      </span>
    </div>
  );
}
