import { describe, it, expect } from 'vitest';
import { slugFromWikilink, labelFromWikilink } from './types';

describe('slugFromWikilink · helper puro', () => {
  it('extrae slug de wikilink simple', () => {
    expect(slugFromWikilink('[[con-x]]')).toBe('con-x');
  });

  it('extrae slug de wikilink con alias', () => {
    expect(slugFromWikilink('[[con-x|Mi alias]]')).toBe('con-x');
  });

  it('extrae slug de path completo', () => {
    expect(slugFromWikilink('[[path/to/con-x.md]]')).toBe('con-x');
  });

  it('idempotente con string ya limpio', () => {
    expect(slugFromWikilink('con-x')).toBe('con-x');
  });

  it('null/undefined/empty → string vacío', () => {
    expect(slugFromWikilink(null)).toBe('');
    expect(slugFromWikilink(undefined)).toBe('');
    expect(slugFromWikilink('')).toBe('');
  });

  it('con guiones y números', () => {
    expect(slugFromWikilink('[[con-acu-004-25]]')).toBe('con-acu-004-25');
  });
});

describe('labelFromWikilink · helper puro', () => {
  it('extrae alias cuando existe', () => {
    expect(labelFromWikilink('[[con-x|Mi alias]]')).toBe('Mi alias');
  });

  it('fallback al slug cuando no hay alias', () => {
    expect(labelFromWikilink('[[con-x]]')).toBe('con-x');
  });

  it('null/undefined → "—"', () => {
    expect(labelFromWikilink(null)).toBe('—');
    expect(labelFromWikilink(undefined)).toBe('—');
  });

  it('plain string', () => {
    expect(labelFromWikilink('foo bar')).toBe('foo bar');
  });
});
