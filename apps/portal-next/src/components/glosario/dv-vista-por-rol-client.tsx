'use client';

/**
 * <DvVistaPorRolClient> — lee ?rol= de URL y renderiza la vista activa.
 * v8 S6 · 2026-04-29
 *
 * Wrapper client necesario para leer useSearchParams() y pasarlo a
 * DvVistaPorRol (que es server-compatible cuando recibe rol como prop).
 */

import { useSearchParams } from 'next/navigation';
import { DvVistaPorRol } from './dv-vista-por-rol';
import type { VistasRol } from './dv-vista-por-rol';

export function DvVistaPorRolClient({ vistas }: Readonly<{ vistas: VistasRol }>) {
  const searchParams = useSearchParams();
  const rol = searchParams.get('rol') ?? 'estudiante-soberano';
  return <DvVistaPorRol vistas={vistas} rol={rol} />;
}
