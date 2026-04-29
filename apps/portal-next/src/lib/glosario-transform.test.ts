import { describe, it, expect } from 'vitest';
// @ts-expect-error — importing JS module sin types desde scripts/
import {
  splitFrontmatter,
  parseYamlKeys,
  cleanFrontmatter,
  cleanBody,
  STRIP_KEY_PATTERNS,
} from '../../scripts/lib/glosario-transform.mjs';

/**
 * glosario-transform.test.ts · v7.16
 *
 * TDD para las transformaciones puras compartidas entre:
 *   - scripts/sync-glosario.mjs   (sync local desde G:)
 *   - cloud-functions/sync-glosario-gas/sync-glosario.gs   (port manual GAS)
 *
 * Si modificas las funciones, los tests detectan regresiones automáticamente.
 * El port a Apps Script se valida con QA manual (mismas inputs → outputs).
 */

describe('splitFrontmatter', () => {
  it('separa frontmatter y body con --- delimiters', () => {
    const raw = '---\nkd_id: con-test\n---\n\n# Body content';
    const { frontmatterBlock, body } = splitFrontmatter(raw);
    expect(frontmatterBlock).toContain('kd_id: con-test');
    expect(body.trim()).toBe('# Body content');
  });

  it('si no hay frontmatter retorna body completo', () => {
    const raw = '# Solo body';
    const { frontmatterBlock, body } = splitFrontmatter(raw);
    expect(frontmatterBlock).toBe('');
    expect(body).toBe('# Solo body');
  });

  it('si frontmatter no cierra, retorna body completo', () => {
    const raw = '---\nkd_id: roto\n# Sin cierre';
    const { frontmatterBlock, body } = splitFrontmatter(raw);
    expect(frontmatterBlock).toBe('');
    expect(body).toBe(raw);
  });
});

describe('parseYamlKeys', () => {
  it('extrae claves simples', () => {
    const block = '---\nkd_id: con-test\nkd_status: APPROVED\n---';
    const keys = parseYamlKeys(block);
    expect(keys.kd_id).toBe('con-test');
    expect(keys.kd_status).toBe('APPROVED');
  });

  it('quita comillas dobles y simples del valor', () => {
    const block = '---\nkd_title: "Título con espacios"\n---';
    const keys = parseYamlKeys(block);
    expect(keys.kd_title).toBe('Título con espacios');
  });
});

describe('cleanFrontmatter · campos prohibidos por Velite', () => {
  it('elimina tupla_*, concepto_*, kd_created, etc.', () => {
    const block = [
      '---',
      'kd_id: con-test',
      'kd_status: APPROVED',
      'tupla_a: foo',
      'tupla_b: bar',
      'concepto_facet_normative: x',
      'kd_created: 2026-04-28',
      'skos_prefLabel: Test',
      '---',
    ].join('\n');
    const cleaned = cleanFrontmatter(block);
    expect(cleaned).toContain('kd_id: con-test');
    expect(cleaned).toContain('skos_prefLabel: Test');
    expect(cleaned).not.toContain('tupla_a');
    expect(cleaned).not.toContain('tupla_b');
    expect(cleaned).not.toContain('concepto_facet_normative');
    expect(cleaned).not.toContain('kd_created');
  });

  it('preserva listas indentadas de campos NO-strip', () => {
    const block = [
      '---',
      'kd_tags:',
      '  - tag1',
      '  - tag2',
      '---',
    ].join('\n');
    const cleaned = cleanFrontmatter(block);
    expect(cleaned).toContain('- tag1');
    expect(cleaned).toContain('- tag2');
  });

  it('elimina listas indentadas de campos strip', () => {
    const block = [
      '---',
      'kd_id: con-test',
      'tupla_array:',
      '  - item1',
      '  - item2',
      'kd_status: APPROVED',
      '---',
    ].join('\n');
    const cleaned = cleanFrontmatter(block);
    expect(cleaned).not.toContain('item1');
    expect(cleaned).not.toContain('item2');
    expect(cleaned).toContain('kd_status: APPROVED');
  });
});

describe('cleanBody · regresión v7.13 (img2 — dataviewjs)', () => {
  it('elimina bloques ```dataviewjs```', () => {
    const body = [
      '# Heading',
      '',
      '```dataviewjs',
      'const me = dv.current();',
      'dv.table(["Campo", "Valor"], [...]);',
      '```',
      '',
      'Texto después.',
    ].join('\n');
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('dv.current()');
    expect(cleaned).not.toContain('dv.table');
    expect(cleaned).not.toContain('```dataviewjs');
    expect(cleaned).toContain('# Heading');
    expect(cleaned).toContain('Texto después');
  });

  it('elimina bloques ```dataview``` (DQL)', () => {
    const body = '```dataview\nTABLE FROM #tag\n```\n\ntexto';
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('TABLE FROM');
    expect(cleaned).toContain('texto');
  });

  it('elimina múltiples bloques dataview en el mismo doc', () => {
    const body = '```dataviewjs\nA\n```\n\n# Mid\n\n```dataview\nB\n```\n\n# End';
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('A');
    expect(cleaned).not.toContain('B');
    expect(cleaned).toContain('# Mid');
    expect(cleaned).toContain('# End');
  });
});

describe('cleanBody · regresión v7.13 (img1 — Meta Bind INPUT[...])', () => {
  it('elimina INPUT[text(...):field]', () => {
    const body = 'Antes\n\n`INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`\n\nDespués';
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('INPUT[');
    expect(cleaned).not.toContain('meta-bind-readonly');
    expect(cleaned).toContain('Antes');
    expect(cleaned).toContain('Después');
  });

  it('elimina VIEW[...] y BUTTON[...]', () => {
    const body = '`VIEW[{x}]` y `BUTTON[update]` aquí';
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('VIEW[');
    expect(cleaned).not.toContain('BUTTON[');
    expect(cleaned).toContain('aquí');
  });
});

describe('cleanBody · wikilinks relativos (vault-only)', () => {
  it('extrae el último segmento de [[../../con-X]]', () => {
    const body = 'Ver [[../../00-glosoario-universal/con-acu]] para detalle';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('[[con-acu]]');
    expect(cleaned).not.toContain('../../');
  });

  it('preserva alias en wikilink relativo: [[../con-X|alias]]', () => {
    const body = '[[../con-cca|Cultura del CCA]]';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('[[con-cca|Cultura del CCA]]');
  });

  it('limpia embeds ![[../../path/file]]', () => {
    const body = '![[../../assets/diagram.png]]';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('![[diagram.png]]');
  });

  it('no toca wikilinks ya simples [[con-X]]', () => {
    const body = '[[con-cca]] y [[con-acu-004-25]]';
    const cleaned = cleanBody(body);
    expect(cleaned).toBe(body);
  });
});

describe('cleanBody · normalización de espacios', () => {
  it('colapsa 4+ saltos de línea consecutivos a 3', () => {
    const body = 'A\n\n\n\n\n\nB';
    const cleaned = cleanBody(body);
    expect(cleaned).toBe('A\n\n\nB');
  });

  it('preserva 2 saltos de línea (separador de párrafos)', () => {
    const body = 'Párrafo 1\n\nPárrafo 2';
    const cleaned = cleanBody(body);
    expect(cleaned).toBe(body);
  });
});

describe('cleanBody · pureza', () => {
  it('mismas entradas → mismas salidas (referential transparency)', () => {
    const body = '# Test\n\n```dataviewjs\nfoo\n```\n\nbar';
    const a = cleanBody(body);
    const b = cleanBody(body);
    expect(a).toBe(b);
  });

  it('idempotencia: cleanBody(cleanBody(x)) === cleanBody(x)', () => {
    const body = '`INPUT[x]` y [[../con-y]] y ```dataviewjs\nz\n```';
    const once = cleanBody(body);
    const twice = cleanBody(once);
    expect(twice).toBe(once);
  });

  it('no muta el input', () => {
    const body = '# Test';
    const original = body;
    cleanBody(body);
    expect(body).toBe(original);
  });
});

describe('STRIP_KEY_PATTERNS · cobertura mínima', () => {
  it('incluye los patrones críticos para Velite', () => {
    const critical = [
      'tupla_', 'concepto_', 'kd_created', 'kd_updated',
      'cssclasses', '@type', 'concepto_facet_',
    ];
    for (const key of critical) {
      const matches = STRIP_KEY_PATTERNS.some((re: RegExp) => re.test(key));
      expect(matches, `${key} debe matchear algún strip pattern`).toBe(true);
    }
  });
});
