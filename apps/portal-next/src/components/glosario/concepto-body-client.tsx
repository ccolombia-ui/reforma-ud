'use client';

/**
 * ConceptoBodyClient — superset de MDXWithHoverPreview para páginas /glosario/*
 * v8 S3 · 2026-04-28 · CC BY-SA 4.0
 *
 * Comportamiento:
 *   • Sin sentinels data-dv: idéntico a MDXWithHoverPreview
 *     (wikilinks → WikiLinkPreview, apa-cite → ApaCite)
 *   • Con sentinels <div data-dv="X">: renderiza el componente DV correcto,
 *     pasando los datos del concepto desde el prop `data`.
 *
 * S3 pre-condición: cleanBody aún strip-ea DV blocks (no emite sentinels).
 * Por tanto, mientras S5 no se active, este componente se comporta
 * exactamente igual que MDXWithHoverPreview — cero regresión garantizada.
 *
 * El prop `data` viene de la página Server Component (/glosario/[conceptoId])
 * que lo construye desde el concepto velite + corpus completo (habilita).
 */

import parse from 'html-react-parser';
import { useMemo } from 'react';
import { createConceptoParserOptions } from './concepto-parser-options';
import type { ConceptoTPLData } from './types';

export function ConceptoBodyClient({
  code,
  data,
}: Readonly<{ code: string; data: ConceptoTPLData }>) {
  const options = useMemo(() => createConceptoParserOptions(data), [data]);
  try {
    return <>{parse(code, options)}</>;
  } catch {
    // Fallback: re-intentar con opciones frescas
    return <>{parse(code, createConceptoParserOptions(data))}</>;
  }
}
