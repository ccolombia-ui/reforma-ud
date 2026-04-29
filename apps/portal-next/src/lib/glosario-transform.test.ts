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

describe('splitFrontmatter · CRLF (Windows vault files)', () => {
  it('normaliza CRLF → LF antes de parsear', () => {
    const raw = '---\r\nkd_id: con-test\r\nkd_status: APPROVED\r\n---\r\n\r\n# Body';
    const { frontmatterBlock, body } = splitFrontmatter(raw);
    expect(frontmatterBlock).toContain('kd_id: con-test');
    expect(frontmatterBlock).toContain('kd_status: APPROVED');
    expect(body.trim()).toBe('# Body');
  });
});

describe('parseYamlKeys · CRLF (Windows vault files)', () => {
  it('extrae claves de bloque con CRLF', () => {
    const block = '---\r\nkd_id: con-test\r\nkd_status: APPROVED\r\n---';
    const keys = parseYamlKeys(block);
    expect(keys.kd_id).toBe('con-test');
    expect(keys.kd_status).toBe('APPROVED');
  });
});

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

describe('cleanFrontmatter · v8 S1: campos legacy strip + TPL v2.0 preserve', () => {
  it('elimina solo campos legacy/internos (pasteur_axis_, neon_, kd_created, cssclasses, @type)', () => {
    const block = [
      '---',
      'kd_id: con-test',
      'kd_status: APPROVED',
      'pasteur_axis_x: foo',
      'neon_concept: bar',
      'kd_created: 2026-04-28',
      'kd_updated: 2026-04-28',
      'cssclasses: dataview',
      '"@type": Concept',
      'fileClass: fc-concepto',
      'skos_prefLabel: Test',
      '---',
    ].join('\n');
    const cleaned = cleanFrontmatter(block);
    expect(cleaned).toContain('kd_id: con-test');
    expect(cleaned).toContain('skos_prefLabel: Test');
    expect(cleaned).not.toContain('pasteur_axis_');
    expect(cleaned).not.toContain('neon_');
    expect(cleaned).not.toContain('kd_created');
    expect(cleaned).not.toContain('kd_updated');
    expect(cleaned).not.toContain('cssclasses');
    expect(cleaned).not.toContain('"@type"');
    expect(cleaned).not.toContain('fileClass');
  });

  it('PRESERVA campos TPL v2.0: concepto_*, tupla_*, applicable_domain, etc. (v8 S1)', () => {
    const block = [
      '---',
      'kd_id: con-test',
      'concepto_capabilities:',
      '  - NORMATIVE',
      'concepto_prerequisitos:',
      '  - "[[con-prereq-1]]"',
      'concepto_facet_normative:',
      '  normative_locator: "Art. 109"',
      'tupla__relations:',
      '  - rel_nombre: norm_implements',
      'applicable_domain: Universidad pública',
      'assumptions:',
      '  - Autonomía garantizada',
      'breaks_at:',
      '  - Cierre institucional',
      'valid_from: "2025-05-05"',
      'valid_to: ""',
      '---',
    ].join('\n');
    const cleaned = cleanFrontmatter(block);
    // Todos los campos TPL v2.0 deben preservarse
    expect(cleaned).toContain('concepto_capabilities');
    expect(cleaned).toContain('concepto_prerequisitos');
    expect(cleaned).toContain('concepto_facet_normative');
    expect(cleaned).toContain('tupla__relations');
    expect(cleaned).toContain('applicable_domain');
    expect(cleaned).toContain('assumptions');
    expect(cleaned).toContain('breaks_at');
    expect(cleaned).toContain('valid_from');
    expect(cleaned).toContain('valid_to');
    expect(cleaned).toContain('NORMATIVE');
    expect(cleaned).toContain('[[con-prereq-1]]');
    expect(cleaned).toContain('Art. 109');
    expect(cleaned).toContain('norm_implements');
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

  it('elimina listas indentadas de campos strip (kd_supersedes)', () => {
    const block = [
      '---',
      'kd_id: con-test',
      'kd_supersedes:',
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

describe('STRIP_KEY_PATTERNS · v8 S1: cobertura legacy + exclusión TPL v2.0', () => {
  it('strippea campos legacy/internos NO consumidos por velite', () => {
    const legacy = [
      'pasteur_axis_x', 'neon_concept', 'kd_created', 'kd_updated',
      'cssclasses', '@type', 'fileClass', 'kd_supersedes', 'kd__up',
      'lifecycle_state', 'recorded_at', 'extends_to',
    ];
    for (const key of legacy) {
      const matches = STRIP_KEY_PATTERNS.some((re: RegExp) => re.test(key));
      expect(matches, `${key} debe matchear algún strip pattern legacy`).toBe(true);
    }
  });

  it('NO strippea campos TPL v2.0 (v8 S1: ahora preservados por velite)', () => {
    const tplV2 = [
      'concepto_capabilities',
      'concepto_facet_normative',
      'concepto_prerequisitos',
      'concepto_definitional_anchors',
      'concepto_current_anchor',
      'concepto_anchor_chain_status',
      'tupla__relations',
      'applicable_domain',
      'assumptions',
      'breaks_at',
      'valid_from',
      'valid_to',
      'rol_seleccionado',
    ];
    for (const key of tplV2) {
      const matches = STRIP_KEY_PATTERNS.some((re: RegExp) => re.test(key));
      expect(matches, `${key} NO debe matchear ningún strip pattern (es TPL v2.0)`).toBe(false);
    }
  });
});

// ── v8 S5: sentinel emission ──────────────────────────────────────────────
// Tests ADITIVOS — los anteriores siguen pasando. Documentan el NUEVO
// comportamiento: DV blocks → sentinels, MetaBind → valores estáticos.

describe('cleanBody · v8 S5: DV blocks → sentinels HTML', () => {
  it('dataviewjs con facet_normative → sentinel facet-normative', () => {
    const body = [
      '## §2 Anclaje',
      '```dataviewjs',
      'const f = me.concepto_facet_normative;',
      'dv.table(["Campo"], [[f.normative_source ?? "—"]]);',
      '```',
    ].join('\n');
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="facet-normative"');
    expect(cleaned).not.toContain('dv.table');
    expect(cleaned).toContain('## §2 Anclaje');
  });

  it('dataviewjs con concepto_prerequisitos + dv.list → sentinel prereqs', () => {
    const body = '```dataviewjs\nconst prereq = me.concepto_prerequisitos ?? [];\ndv.list(prereq);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="prereqs"');
  });

  it('dataviewjs con tupla__relations + norm_mandates → sentinel mandatos', () => {
    const body = '```dataviewjs\nconst mandates = (me.tupla__relations ?? []).filter(r => r.rel_nombre === "norm_mandates");\ndv.table([], mandates);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="mandatos"');
  });

  it('dataviewjs con concepto_definitional_anchors → sentinel evolucion', () => {
    const body = '```dataviewjs\nconst anchors = me.concepto_definitional_anchors ?? [];\ndv.list(anchors);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="evolucion"');
  });

  it('dataviewjs con applicable_domain + breaks_at → sentinel regimen-epistemico', () => {
    const body = '```dataviewjs\ndv.paragraph(me.applicable_domain ?? "—");\ndv.list(me.breaks_at ?? []);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="regimen-epistemico"');
  });

  it('dataviewjs no reconocido → sentinel obsidian-only (fallback)', () => {
    const body = '```dataviewjs\nconst x = foo(); bar(x);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="obsidian-only"');
    expect(cleaned).not.toContain('foo()');
  });

  it('sentinel HTML no contiene código DV', () => {
    const body = '```dataviewjs\nconst me = dv.current(); dv.table([], []);\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).not.toContain('dv.current()');
    expect(cleaned).not.toContain('dv.table');
    expect(cleaned).not.toContain('```dataviewjs');
    expect(cleaned).toContain('<div');
    expect(cleaned).toContain('data-dv=');
  });

  it('texto rodeando DV blocks se preserva', () => {
    const body = '# Heading\n\n```dataviewjs\nme.foo\n```\n\nTexto después.';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('# Heading');
    expect(cleaned).toContain('Texto después.');
    expect(cleaned).toContain('data-dv=');
  });

  it('CRLF (\\r\\n) — vault files en Windows', () => {
    const body = '```dataviewjs\r\nconst prereq = me.concepto_prerequisitos ?? [];\r\ndv.list(prereq);\r\n```';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="prereqs"');
    expect(cleaned).not.toContain('dv.list');
  });
});

describe('cleanBody · v8 S5: MetaBind readonly → valor estático', () => {
  it('INPUT readonly con keys → valor del frontmatter', () => {
    const body = 'Label: `INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`';
    const keys = { skos_prefLabel: 'ACU-004-25' };
    const cleaned = cleanBody(body, keys);
    expect(cleaned).toContain('ACU-004-25');
    expect(cleaned).not.toContain('INPUT[');
    expect(cleaned).not.toContain('meta-bind-readonly');
  });

  it('INPUT readonly sin keys → "—" (safe default)', () => {
    const body = '`INPUT[text(class(meta-bind-readonly)):skos_prefLabel]`';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('—');
    expect(cleaned).not.toContain('INPUT[');
  });

  it('INPUT readonly campo no encontrado en keys → "—"', () => {
    const body = '`INPUT[text(class(meta-bind-readonly)):campo_inexistente]`';
    const keys = { otro_campo: 'valor' };
    const cleaned = cleanBody(body, keys);
    expect(cleaned).toContain('—');
  });

  it('INPUT inlineSelect rol_seleccionado → sentinel selector-rol', () => {
    const body = '`INPUT[inlineSelect(option(a,A)):rol_seleccionado]`';
    const cleaned = cleanBody(body);
    expect(cleaned).toContain('data-dv="selector-rol"');
    expect(cleaned).not.toContain('INPUT[');
  });
});
