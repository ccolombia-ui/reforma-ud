import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests específicos para verificar comportamiento en producción
 * Simulan exactamente el flujo que ocurre en Vercel
 */
describe('show-drafts - Production Simulation', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should match Velite transform logic for draft calculation', () => {
    // Velite config transform: draft = kd_status !== 'PUBLISHED' && kd_status !== 'DEPRECATED'
    const papers = [
      { id: 'm01', kd_status: 'PUBLISHED' },
      { id: 'm02', kd_status: 'DEPRECATED' },
      { id: 'm08', kd_status: 'DRAFT' },
      { id: 'm09', kd_status: 'IN_REVIEW' },
    ];

    const withDraft = papers.map(p => ({
      ...p,
      draft: p.kd_status !== 'PUBLISHED' && p.kd_status !== 'DEPRECATED'
    }));

    expect(withDraft.find(p => p.id === 'm01')?.draft).toBe(false);
    expect(withDraft.find(p => p.id === 'm02')?.draft).toBe(false);
    expect(withDraft.find(p => p.id === 'm08')?.draft).toBe(true);
    expect(withDraft.find(p => p.id === 'm09')?.draft).toBe(true);
  });

  it('should filter exactly like sidebar.tsx line 528 in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('./show-drafts');

    // Simula exactamente lo que viene de canonicPaper en Velite
    const canonicPaperFromVelite = [
      { id: 'm01', number: 1, title: 'M01', kd_status: 'PUBLISHED', draft: false },
      { id: 'm02', number: 2, title: 'M02', kd_status: 'PUBLISHED', draft: false },
      { id: 'm03', number: 3, title: 'M03', kd_status: 'PUBLISHED', draft: false },
      { id: 'm04', number: 4, title: 'M04', kd_status: 'PUBLISHED', draft: false },
      { id: 'm05', number: 5, title: 'M05', kd_status: 'PUBLISHED', draft: false },
      { id: 'm06', number: 6, title: 'M06', kd_status: 'PUBLISHED', draft: false },
      { id: 'm07', number: 7, title: 'M07', kd_status: 'PUBLISHED', draft: false },
      { id: 'm08', number: 8, title: 'M08', kd_status: 'DRAFT', draft: true },
      { id: 'm09', number: 9, title: 'M09', kd_status: 'DRAFT', draft: true },
      { id: 'm10', number: 10, title: 'M10', kd_status: 'DRAFT', draft: true },
      { id: 'm11', number: 11, title: 'M11', kd_status: 'DRAFT', draft: true },
      { id: 'm12', number: 12, title: 'M12', kd_status: 'DRAFT', draft: true },
    ];

    // Exactamente como está en sidebar.tsx línea 528
    const papers = filterPublished([...canonicPaperFromVelite]).sort((a, b) => (a.number ?? 0) - (b.number ?? 0));

    expect(papers).toHaveLength(7);
    expect(papers.map(p => p.id)).toEqual(['m01', 'm02', 'm03', 'm04', 'm05', 'm06', 'm07']);
    
    // Contador que se muestra en el sidebar
    const countLabel = `${papers.length} visible${papers.length !== 1 ? 's' : ''}`;
    expect(countLabel).toBe('7 visibles');
  });

  it('should handle case where draft field is missing (edge case)', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('./show-drafts');

    // Papers sin campo draft (solo kd_status)
    const papersWithoutDraftField = [
      { id: 'm01', kd_status: 'PUBLISHED' },
      { id: 'm08', kd_status: 'DRAFT' },
    ];

    const filtered = filterPublished(papersWithoutDraftField as {id: string, kd_status?: string, draft?: boolean}[]);

    // Debería filtrar por kd_status cuando draft no está presente
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('m01');
  });

  it('should handle case where kd_status is missing (legacy)', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { filterPublished } = await import('./show-drafts');

    // Papers legacy sin kd_status
    const legacyPapers = [
      { id: 'published', draft: false },
      { id: 'draft', draft: true },
    ];

    const filtered = filterPublished(legacyPapers);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('published');
  });

  it('should verify isPublished function directly', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'false');

    const { isPublished } = await import('./show-drafts');

    expect(isPublished({ kd_status: 'PUBLISHED' })).toBe(true);
    expect(isPublished({ kd_status: 'DEPRECATED' })).toBe(true);
    expect(isPublished({ kd_status: 'DRAFT' })).toBe(false);
    expect(isPublished({ kd_status: 'IN_REVIEW' })).toBe(false);
    
    // Legacy
    expect(isPublished({ draft: false })).toBe(true);
    expect(isPublished({ draft: true })).toBe(false);
    
    // Edge case: no fields
    expect(isPublished({})).toBe(true); // Default to published
  });

  it('should verify showDrafts flag is false in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true'); // Even with this

    const { showDrafts } = await import('./show-drafts');

    // Safety: showDrafts should be false in production
    expect(showDrafts).toBe(false);
  });

  it('should verify showDrafts flag is true in dev with SHOW_DRAFTS=true', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_SHOW_DRAFTS', 'true');

    const { showDrafts } = await import('./show-drafts');

    expect(showDrafts).toBe(true);
  });
});
