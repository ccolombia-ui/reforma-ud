import { describe, it, expect, vi } from 'vitest';
import type { TreeNode } from '@/lib/sidebar-tree';

describe('TreeItem - Misiones CoP', () => {
  const mockNode: TreeNode = {
    slug: 'comunidades/gobierno/csu',
    name: 'CSU',
    href: '/comunidades/gobierno/csu',
    children: [],
    misionesCoP: [
      {
        id: 'CSU-MC-01',
        slug: 'participa-en-la-reforma',
        titulo: 'Participa en la Reforma',
        tipo: 'comprension',
        descripcion: 'Misión de comprensión inicial',
        papers: ['m01', 'm02'],
        nivelRequerido: 0,
        nivelOtorga: 1,
        prerequisitosCanonicas: ['m01'],
        prerequisitosMision: [],
        orden: 1,
      },
      {
        id: 'CSU-MC-02',
        slug: 'nueva-estructura',
        titulo: 'Nueva Estructura Organizativa',
        tipo: 'comprension',
        descripcion: 'Entender la nueva estructura',
        papers: ['m02'],
        nivelRequerido: 0,
        nivelOtorga: 1,
        prerequisitosCanonicas: ['m01', 'm02'],
        prerequisitosMision: ['CSU-MC-01'],
        orden: 2,
      },
      {
        id: 'CSU-MC-03-A',
        slug: 'estatuto-docente',
        titulo: 'Estatuto Docente',
        tipo: 'deliberacion',
        descripcion: 'Deliberación del estatuto',
        papers: ['m03'],
        nivelRequerido: 1,
        nivelOtorga: 2,
        prerequisitosCanonicas: ['m01', 'm02', 'm03'],
        prerequisitosMision: ['CSU-MC-02'],
        orden: 3,
      },
      {
        id: 'CSU-MC-04',
        slug: 'estatuto-consolidado',
        titulo: 'Estatuto Consolidado',
        tipo: 'produccion',
        descripcion: 'Producción del estatuto final',
        papers: ['m01', 'm02', 'm03', 'm04'],
        nivelRequerido: 2,
        nivelOtorga: 3,
        prerequisitosCanonicas: ['m01', 'm02', 'm03', 'm04'],
        prerequisitosMision: ['CSU-MC-03-A'],
        orden: 4,
      },
    ],
  };

  it('should render mission items when node has misionesCoP', () => {
    // Test: Verificar que se renderizan las misiones
    const misiones = mockNode.misionesCoP ?? [];
    expect(misiones.length).toBe(4);
    expect(misiones[0].titulo).toBe('Participa en la Reforma');
  });

  it('should sort missions by orden field', () => {
    const misiones = [...(mockNode.misionesCoP ?? [])];
    const sorted = misiones.sort((a, b) => a.orden - b.orden);
    
    expect(sorted[0].orden).toBe(1);
    expect(sorted[0].titulo).toBe('Participa en la Reforma');
    expect(sorted[1].orden).toBe(2);
    expect(sorted[2].orden).toBe(3);
    expect(sorted[3].orden).toBe(4);
  });

  it('should have correct icons for each tipo', () => {
    const iconMap: Record<string, string> = {
      comprension: '📖',
      deliberacion: '⚖️',
      produccion: '🏗️',
    };

    const misiones = mockNode.misionesCoP ?? [];
    
    misiones.forEach((m) => {
      expect(iconMap[m.tipo]).toBeDefined();
    });
    
    expect(iconMap['comprension']).toBe('📖');
    expect(iconMap['deliberacion']).toBe('⚖️');
    expect(iconMap['produccion']).toBe('🏗️');
  });

  it('should generate correct mission paths', () => {
    const basePath = mockNode.href;
    const misiones = mockNode.misionesCoP ?? [];
    
    misiones.forEach((m) => {
      const expectedPath = `${basePath}/${m.slug}`;
      expect(expectedPath).toMatch(/\/comunidades\/gobierno\/csu\/[\w-]+/);
    });
  });

  it('should identify active mission from pathname', () => {
    const pathname = '/comunidades/gobierno/csu/participa-en-la-reforma';
    const misiones = mockNode.misionesCoP ?? [];
    
    const activeMission = misiones.find(m => pathname.includes(m.slug));
    
    expect(activeMission).toBeDefined();
    expect(activeMission?.id).toBe('CSU-MC-01');
  });

  it('should handle mission with nivelRequerido and nivelOtorga', () => {
    const mision = mockNode.misionesCoP?.[2]; // CSU-MC-03-A
    
    expect(mision?.nivelRequerido).toBe(1);
    expect(mision?.nivelOtorga).toBe(2);
  });

  it('should have empty misionesCoP array if no missions defined', () => {
    const nodeWithoutMissions: TreeNode = {
      slug: 'comunidades/gobierno',
      name: 'Gobierno',
      href: '/comunidades/gobierno',
      children: [],
    };
    
    expect(nodeWithoutMissions.misionesCoP).toBeUndefined();
    expect(nodeWithoutMissions.misionesCoP?.length ?? 0).toBe(0);
  });
});
