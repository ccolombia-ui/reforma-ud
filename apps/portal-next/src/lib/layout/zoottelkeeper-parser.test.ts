/**
 * Tests para Zoottelkeeper Parser — v8g-l5
 */

import { describe, it, expect } from 'vitest';
import { parseWikilinks, buildVaultTree, parseZoottelkeeperIndex } from './zoottelkeeper-parser';

describe('v8g-l5: parseWikilinks', () => {
  it('should extract wikilinks with alias', () => {
    const content = '[[folder/file|Alias]] [[other/path|Otro]]';
    const result = parseWikilinks(content);
    expect(result).toEqual([
      { path: 'folder/file', alias: 'Alias' },
      { path: 'other/path', alias: 'Otro' },
    ]);
  });

  it('should extract wikilinks without alias', () => {
    const content = '[[folder/file]]';
    const result = parseWikilinks(content);
    expect(result).toEqual([{ path: 'folder/file', alias: 'file' }]);
  });

  it('should return empty array when no wikilinks', () => {
    expect(parseWikilinks('no links here')).toEqual([]);
  });

  it('should handle mixed links in Zoottelkeeper format', () => {
    const content = `%% Zoottelkeeper: Beginning %%
[[3-diseño-capitulo-libro/00-glosoario-universal/_dag-glosario-universal|_dag-glosario-universal]]
[[3-diseño-capitulo-libro/00-glosoario-universal/con-cca|con-cca]]
%% Zoottelkeeper: End %%`;
    const result = parseWikilinks(content);
    expect(result).toHaveLength(2);
    expect(result[0].path).toBe('3-diseño-capitulo-libro/00-glosoario-universal/_dag-glosario-universal');
    expect(result[0].alias).toBe('_dag-glosario-universal');
    expect(result[1].path).toBe('3-diseño-capitulo-libro/00-glosoario-universal/con-cca');
    expect(result[1].alias).toBe('con-cca');
  });
});

describe('v8g-l5: buildVaultTree', () => {
  it('should build simple tree from flat links', () => {
    const links = [
      { path: 'folder-a/file-1', alias: 'File 1' },
      { path: 'folder-a/file-2', alias: 'File 2' },
      { path: 'folder-b/file-3', alias: 'File 3' },
    ];
    const tree = buildVaultTree(links);
    expect(tree).toHaveLength(2);
    expect(tree[0].name).toBe('folder-a');
    expect(tree[0].type).toBe('folder');
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children[0].type).toBe('file');
  });

  it('should strip rootPath prefix', () => {
    const links = [
      { path: '3-diseño-capitulo-libro/00-glosoario-universal/con-cca', alias: 'CCA' },
      { path: '3-diseño-capitulo-libro/01-secciones/intro', alias: 'Intro' },
    ];
    const tree = buildVaultTree(links, { rootPath: '3-diseño-capitulo-libro' });
    expect(tree).toHaveLength(2);
    expect(tree.map((n) => n.name)).toContain('00-glosoario-universal');
    expect(tree.map((n) => n.name)).toContain('01-secciones');
  });

  it('should exclude folders matching patterns', () => {
    const links = [
      { path: '_hidden/file-1', alias: 'File 1' },
      { path: 'visible/file-2', alias: 'File 2' },
      { path: '.dotfolder/file-3', alias: 'File 3' },
    ];
    const tree = buildVaultTree(links, { excludePatterns: ['^_.*', '^\\..*'] });
    expect(tree).toHaveLength(1);
    expect(tree[0].name).toBe('visible');
  });

  it('should apply folderMappings', () => {
    const links = [
      { path: '3-diseño-capitulo-libro/00-glosoario-universal/con-cca', alias: 'CCA' },
    ];
    const tree = buildVaultTree(links, {
      rootPath: '3-diseño-capitulo-libro',
      folderMappings: { '00-glosoario-universal': 'Glosario Universal' },
    });
    // rootPath se remueve del árbol; los mapeos aplican a los segmentos restantes
    expect(tree[0].name).toBe('Glosario Universal');
  });

  it('should sort folders before files alphabetically', () => {
    const links = [
      { path: 'z-folder/zebra', alias: 'Zebra' },
      { path: 'a-folder/apple', alias: 'Apple' },
      { path: 'm-file', alias: 'M File' },
    ];
    const tree = buildVaultTree(links);
    expect(tree.map((n) => n.name)).toEqual(['a-folder', 'z-folder', 'm-file']);
  });

  it('should handle nested folders', () => {
    const links = [
      { path: 'a/b/c/deep-file', alias: 'Deep' },
    ];
    const tree = buildVaultTree(links);
    expect(tree[0].name).toBe('a');
    expect(tree[0].children[0].name).toBe('b');
    expect(tree[0].children[0].children[0].name).toBe('c');
    expect(tree[0].children[0].children[0].children[0].name).toBe('deep-file');
  });

  it('should generate href for files without extension', () => {
    const links = [{ path: 'folder/my-file', alias: 'My File' }];
    const tree = buildVaultTree(links);
    expect(tree[0].children[0].href).toBe('/folder/my-file');
  });

  it('should strip .md and .mdx from href', () => {
    const links = [
      { path: 'folder/page.md', alias: 'Page' },
      { path: 'folder/comp.mdx', alias: 'Comp' },
    ];
    const tree = buildVaultTree(links);
    // Orden alfabético: comp antes que page
    expect(tree[0].children[0].href).toBe('/folder/comp');
    expect(tree[0].children[1].href).toBe('/folder/page');
  });
});

describe('v8g-l5: parseZoottelkeeperIndex', () => {
  it('should parse full Zoottelkeeper index content', () => {
    const content = `%% Zoottelkeeper: Beginning of the autogenerated index file list  %%
[[root/folder-a/file-1|File One]]
[[root/folder-b/file-2|File Two]]
%% Zoottelkeeper: End of the autogenerated index file list  %%`;
    const tree = parseZoottelkeeperIndex(content, { rootPath: 'root' });
    expect(tree).toHaveLength(2);
    expect(tree[0].name).toBe('folder-a');
    expect(tree[1].name).toBe('folder-b');
  });
});
