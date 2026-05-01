#!/usr/bin/env node
/**
 * fix-sidebar-concept-filter.mjs — quita filtro restrictivo de conceptos en sidebar
 * v1.0.0 · 2026-04-30
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'src', 'components', 'layout', 'sidebar.tsx');

let content = fs.readFileSync(file, 'utf-8');

// 1. Fix import
content = content.replace(
  "import { filterPublished, buildPublishedConceptIds, isConceptVisible } from '@/lib/show-drafts';",
  "import { filterPublished } from '@/lib/show-drafts';"
);

// 2. Fix conceptos block
const oldBlock = `  const publishedConceptIds = useMemo(
    () => buildPublishedConceptIds(canonicPaper),
    [],
  );
  const conceptos = useMemo(() =>
    [...concepto]
      .filter((c) => isConceptVisible(c.id, publishedConceptIds))
      .sort((a, b) => (a.skos_prefLabel ?? a.kd_title).localeCompare(b.skos_prefLabel ?? b.kd_title, 'es')),
    [publishedConceptIds],
  );`;

const newBlock = `  // v8d-p1: MVP — mostrar todos los conceptos mientras se resuelve gap de wikilinks.
  const conceptos = useMemo(() =>
    [...concepto]
      .sort((a, b) => (a.skos_prefLabel ?? a.kd_title).localeCompare(b.skos_prefLabel ?? b.kd_title, 'es')),
    [],
  );`;

if (!content.includes(oldBlock)) {
  console.error('ERROR: old block not found in sidebar.tsx');
  process.exit(1);
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, 'utf-8');
console.log('✓ sidebar.tsx updated');
