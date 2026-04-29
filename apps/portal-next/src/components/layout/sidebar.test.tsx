import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ReformaCuanticaSection - Draft Visibility', () => {
  const mockPapers = [
    { id: 'm01', kd_status: 'PUBLISHED', title: 'M01' },
    { id: 'm02', kd_status: 'PUBLISHED', title: 'M02' },
    { id: 'm03', kd_status: 'PUBLISHED', title: 'M03' },
    { id: 'm04', kd_status: 'PUBLISHED', title: 'M04' },
    { id: 'm05', kd_status: 'PUBLISHED', title: 'M05' },
    { id: 'm06', kd_status: 'PUBLISHED', title: 'M06' },
    { id: 'm07', kd_status: 'PUBLISHED', title: 'M07' },
    { id: 'm08', kd_status: 'DRAFT', title: 'M08' },
    { id: 'm09', kd_status: 'DRAFT', title: 'M09' },
    { id: 'm10', kd_status: 'DRAFT', title: 'M10' },
    { id: 'm11', kd_status: 'DRAFT', title: 'M11' },
    { id: 'm12', kd_status: 'DRAFT', title: 'M12' },
  ];

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should exclude DRAFT papers when showDrafts is false (production)', async () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');
    vi.stubEnv('NODE_ENV', 'production');
    
    // Import dinámico para que se evalúe showDrafts con los envs correctos
    const { filterPublished } = await import('@/lib/show-drafts');
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(7);
    expect(result.map(p => p.id)).toEqual(['m01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07']);
    expect(result.some(p => p.kd_status === 'DRAFT')).toBe(false);
  });

  it('should include all papers when showDrafts is true in development', async () => {
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');
    vi.stubEnv('NODE_ENV', 'development');
    
    const { filterPublished } = await import('@/lib/show-drafts');
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(12);
    expect(result.map(p => p.id)).toContain('m08');
    expect(result.map(p => p.id)).toContain('m12');
  });

  it('should exclude DRAFT papers even when SHOW_DRAFTS=true in production', async () => {
    // Safety: production nunca muestra drafts
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');
    vi.stubEnv('NODE_ENV', 'production');
    
    const { filterPublished } = await import('@/lib/show-drafts');
    const result = filterPublished(mockPapers);
    
    expect(result).toHaveLength(7);
    expect(result.some(p => p.kd_status === 'DRAFT')).toBe(false);
  });

  it('should handle papers without kd_status (backward compat)', async () => {
    const legacyPapers = [
      { id: 'm01', kd_status: 'PUBLISHED', title: 'M01' },
      { id: 'legacy', draft: false, title: 'Legacy' },
      { id: 'legacy-draft', draft: true, title: 'Legacy Draft' },
    ];
    
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');
    vi.stubEnv('NODE_ENV', 'production');
    
    const { filterPublished } = await import('@/lib/show-drafts');
    const result = filterPublished(legacyPapers);
    
    expect(result).toHaveLength(2);
    expect(result.map(p => p.id)).toContain('m01');
    expect(result.map(p => p.id)).toContain('legacy');
    expect(result.map(p => p.id)).not.toContain('legacy-draft');
  });
});
