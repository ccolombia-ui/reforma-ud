'use client';

/**
 * <SelectorRolJTBD> — selector de rol JTBD M04 via URL state (?rol=).
 * v8 S6 · 2026-04-29
 *
 * Reemplaza el MetaBind `INPUT[inlineSelect(...):rol_seleccionado]`.
 * Lee y escribe el query param ?rol= sin recargar la página (router.replace).
 *
 * Client component necesario: useSearchParams + useRouter.
 */

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const ROLES = [
  { id: 'estudiante-soberano',      label: '🎓 Estudiante Soberano' },
  { id: 'docente-disenador',        label: '🎨 Diseñador' },
  { id: 'docente-formador',         label: '🎤 Formador' },
  { id: 'docente-investigador-pasteur', label: '🔬 Investigador Pasteur' },
  { id: 'docente-emprendedor-coop', label: '🤝 Emprendedor/Coop' },
  { id: 'docente-director',         label: '🏛️ Director' },
] as const;

export function SelectorRolJTBD() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = searchParams.get('rol') ?? 'estudiante-soberano';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('rol', e.target.value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return (
    <select
      value={current}
      onChange={handleChange}
      className="dv-selector-rol my-2 rounded-md border bg-card px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Seleccionar rol JTBD"
    >
      {ROLES.map((r) => (
        <option key={r.id} value={r.id}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
