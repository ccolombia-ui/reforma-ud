'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROLES, useActiveProfile } from '@/lib/ui-state';

/**
 * ProfileMenu · avatar circular + nombre + rol a la izquierda del header.
 * Click abre dropdown con selector de rol + edición de nombre.
 * Sin auth en MVP — todo en localStorage, sincronizado vía event-bus.
 */
export function ProfileMenu() {
  const { role, name, setRole, setName, meta } = useActiveProfile();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setDraftName(name), [name]);

  // Cerrar al click fuera
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border bg-muted/30 py-1 pl-1 pr-2.5 transition-colors hover:bg-muted/60"
        aria-label="Abrir perfil"
        aria-expanded={open}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm"
          style={{ background: 'linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-blue))' }}
        >
          {initials || 'UD'}
        </span>
        <span className="hidden text-left leading-none sm:block">
          <span className="block text-xs font-semibold">{name}</span>
          <span className="block text-[10px] text-muted-foreground truncate max-w-[140px]">
            {meta.emoji} {role}
          </span>
        </span>
        <ChevronDown className="hidden h-3 w-3 text-muted-foreground sm:inline" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl">
          {/* Header del dropdown: avatar grande + nombre editable */}
          <div className="flex items-start gap-3 border-b px-2 py-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white shadow"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-blue))' }}
            >
              {initials || 'UD'}
            </span>
            <div className="min-w-0 flex-1">
              {editing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (draftName.trim()) {
                      setName(draftName.trim());
                      setEditing(false);
                    }
                  }}
                  className="space-y-1"
                >
                  <input
                    autoFocus
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full rounded border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-1">
                    <button type="submit" className="rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftName(name);
                        setEditing(false);
                      }}
                      className="rounded border px-2 py-0.5 text-[10px]"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm truncate">{name}</span>
                    <button
                      onClick={() => setEditing(true)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Editar nombre"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-[10px] text-muted-foreground line-clamp-2">{meta.name}</div>
                </>
              )}
              <div className="mt-1 inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                Sin auth · localStorage MVP
              </div>
            </div>
          </div>

          {/* Selector de rol */}
          <div className="px-2 py-2">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Cambiar rol activo
            </p>
            <ul className="space-y-0.5">
              {ROLES.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      setRole(r.id);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
                      r.id === role ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/40',
                    )}
                  >
                    <span className="text-base leading-none">{r.emoji}</span>
                    <span className="flex-1 text-left line-clamp-1">{r.name}</span>
                    {r.id === role && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t px-3 py-2 text-[10px] text-muted-foreground">
            El rol se usa para personalizar el Asistente AI y filtrar contenido relevante.
          </div>
        </div>
      )}
    </div>
  );
}
