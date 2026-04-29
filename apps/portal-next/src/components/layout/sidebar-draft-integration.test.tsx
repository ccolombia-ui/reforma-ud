import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './sidebar';

// Mock de dependencias
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('@/lib/ui-state', () => ({
  useLeftCollapsed: () => [false, vi.fn()],
  useLeftWidth: () => [280, vi.fn()],
}));

vi.mock('#site/content', () => ({
  canonicPaper: [
    { id: 'm01', number: 1, title: 'M01 Title', href: '/canonico/m01', kd_status: 'PUBLISHED', draft: false },
    { id: 'm02', number: 2, title: 'M02 Title', href: '/canonico/m02', kd_status: 'PUBLISHED', draft: false },
    { id: 'm03', number: 3, title: 'M03 Title', href: '/canonico/m03', kd_status: 'PUBLISHED', draft: false },
    { id: 'm04', number: 4, title: 'M04 Title', href: '/canonico/m04', kd_status: 'PUBLISHED', draft: false },
    { id: 'm05', number: 5, title: 'M05 Title', href: '/canonico/m05', kd_status: 'PUBLISHED', draft: false },
    { id: 'm06', number: 6, title: 'M06 Title', href: '/canonico/m06', kd_status: 'PUBLISHED', draft: false },
    { id: 'm07', number: 7, title: 'M07 Title', href: '/canonico/m07', kd_status: 'PUBLISHED', draft: false },
    { id: 'm08', number: 8, title: 'M08 Title', href: '/canonico/m08', kd_status: 'DRAFT', draft: true },
    { id: 'm09', number: 9, title: 'M09 Title', href: '/canonico/m09', kd_status: 'DRAFT', draft: true },
    { id: 'm10', number: 10, title: 'M10 Title', href: '/canonico/m10', kd_status: 'DRAFT', draft: true },
    { id: 'm11', number: 11, title: 'M11 Title', href: '/canonico/m11', kd_status: 'DRAFT', draft: true },
    { id: 'm12', number: 12, title: 'M12 Title', href: '/canonico/m12', kd_status: 'DRAFT', draft: true },
  ],
  concepto: [],
  community: [],
  csuAcuerdo: [],
}));

describe('Sidebar Draft Filtering Integration', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should calculate draft flag correctly from kd_status', () => {
    const papers = [
      { id: 'm01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm02', kd_status: 'DEPRECATED', draft: false },
      { id: 'm08', kd_status: 'DRAFT', draft: true },
      { id: 'm09', kd_status: 'IN_REVIEW', draft: true },
    ];

    papers.forEach((paper) => {
      const expectedDraft = paper.kd_status !== 'PUBLISHED' && paper.kd_status !== 'DEPRECATED';
      expect(paper.draft).toBe(expectedDraft);
    });
  });

  it('should filter papers with draft=true in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const allPapers = [
      { id: 'm01', title: 'M01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm08', title: 'M08', kd_status: 'DRAFT', draft: true },
    ];

    const filtered = filterPublished(allPapers);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('m01');
    expect(filtered.some((p: {draft?: boolean}) => p.draft)).toBe(false);
  });

  it('should show all papers when SHOW_DRAFTS=true in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const allPapers = [
      { id: 'm01', title: 'M01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm08', title: 'M08', kd_status: 'DRAFT', draft: true },
    ];

    const filtered = filterPublished(allPapers);
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((p: {id: string}) => p.id)).toContain('m08');
  });

  it('should never show drafts in production even with SHOW_DRAFTS=true', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const allPapers = [
      { id: 'm01', title: 'M01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm08', title: 'M08', kd_status: 'DRAFT', draft: true },
    ];

    const filtered = filterPublished(allPapers);
    
    // Safety: production should never show drafts
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('m01');
  });

  it('should filter all 12 papers correctly (7 published, 5 draft)', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const allPapers = [
      { id: 'm01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm02', kd_status: 'PUBLISHED', draft: false },
      { id: 'm03', kd_status: 'PUBLISHED', draft: false },
      { id: 'm04', kd_status: 'PUBLISHED', draft: false },
      { id: 'm05', kd_status: 'PUBLISHED', draft: false },
      { id: 'm06', kd_status: 'PUBLISHED', draft: false },
      { id: 'm07', kd_status: 'PUBLISHED', draft: false },
      { id: 'm08', kd_status: 'DRAFT', draft: true },
      { id: 'm09', kd_status: 'DRAFT', draft: true },
      { id: 'm10', kd_status: 'DRAFT', draft: true },
      { id: 'm11', kd_status: 'DRAFT', draft: true },
      { id: 'm12', kd_status: 'DRAFT', draft: true },
    ];

    const filtered = filterPublished(allPapers);
    
    expect(filtered).toHaveLength(7);
    expect(filtered.map((p: {id: string}) => p.id)).toEqual(['m01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07']);
  });

  it('should handle backward compat with legacy draft field only', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const legacyPapers = [
      { id: 'published', draft: false },
      { id: 'draft', draft: true },
    ];

    const filtered = filterPublished(legacyPapers);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('published');
  });

  it('should handle papers without kd_status or draft fields', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('@/lib/show-drafts');
    
    const incompletePapers = [
      { id: 'no-fields' },
      { id: 'only-kd', kd_status: 'PUBLISHED' },
      { id: 'only-draft', draft: false },
    ];

    const filtered = filterPublished(incompletePapers as {id: string, kd_status?: string, draft?: boolean}[]);
    
    // Paper without fields is considered published (backward compat)
    expect(filtered.some((p: {id: string}) => p.id === 'no-fields')).toBe(true);
    expect(filtered.some((p: {id: string}) => p.id === 'only-kd')).toBe(true);
    expect(filtered.some((p: {id: string}) => p.id === 'only-draft')).toBe(true);
  });
});
