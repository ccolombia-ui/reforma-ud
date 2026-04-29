import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calcUserCoPLevel,
  getCoPLevelName,
  getCompletedCoPMissions,
  markCoPMissionCompleted,
} from './cop-access';

const ROLES = [
  { nivel: 1, nombre: 'Observador' },
  { nivel: 2, nombre: 'Practicante' },
  { nivel: 3, nombre: 'Experto' },
  { nivel: 4, nombre: 'Mentor' },
];

const MISIONES = [
  { id: 'MC-01', nivelOtorga: 1, prerequisitosCanonicas: [] },
  { id: 'MC-02', nivelOtorga: 2, prerequisitosCanonicas: ['m01'] },
  { id: 'MC-03', nivelOtorga: 3, prerequisitosCanonicas: ['m01', 'm04', 'm06'] },
  { id: 'MC-04', nivelOtorga: 4, prerequisitosCanonicas: ['m01', 'm04', 'm06'] },
];

describe('calcUserCoPLevel', () => {
  it('usuario sin ninguna misión → nivel 0', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, [], [])).toBe(0);
  });

  it('MC-01 completada sin CCAs requeridas → nivel 1', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, [], ['MC-01'])).toBe(1);
  });

  it('MC-02 completada con CCA m01 → nivel 2', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, ['m01'], ['MC-01', 'MC-02'])).toBe(2);
  });

  it('MC-02 completada SIN CCA m01 → no sube a nivel 2 (CCA incompleto)', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, [], ['MC-01', 'MC-02'])).toBe(1);
  });

  it('MC-03 completada con todas las CCAs → nivel 3', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, ['m01', 'm04', 'm06'], ['MC-01', 'MC-02', 'MC-03'])).toBe(3);
  });

  it('retorna el nivel MÁS ALTO alcanzado', () => {
    expect(calcUserCoPLevel(ROLES, MISIONES, ['m01', 'm04', 'm06'], ['MC-01', 'MC-02', 'MC-03', 'MC-04'])).toBe(4);
  });

  it('misiones sin nivelOtorga no cuentan', () => {
    const sinNivel = [{ id: 'MC-X', prerequisitosCanonicas: [] }];
    expect(calcUserCoPLevel(ROLES, sinNivel, [], ['MC-X'])).toBe(0);
  });

  it('misiones vacías → nivel 0', () => {
    expect(calcUserCoPLevel(ROLES, [], ['m01', 'm04'], ['MC-01'])).toBe(0);
  });
});

describe('getCoPLevelName', () => {
  it('nivel 1 → Observador', () => expect(getCoPLevelName(ROLES, 1)).toBe('Observador'));
  it('nivel 4 → Mentor', () => expect(getCoPLevelName(ROLES, 4)).toBe('Mentor'));
  it('nivel 0 → N0 (fallback)', () => expect(getCoPLevelName(ROLES, 0)).toBe('N0'));
  it('nivel desconocido → Nx', () => expect(getCoPLevelName(ROLES, 99)).toBe('N99'));
});

describe('localStorage — completedMissions', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      store: {} as Record<string, string>,
      getItem(k: string) { return this.store[k] ?? null; },
      setItem(k: string, v: string) { this.store[k] = v; },
    });
    vi.stubGlobal('window', { dispatchEvent: vi.fn() });
  });

  it('getCompletedCoPMissions devuelve [] si no hay nada guardado', () => {
    expect(getCompletedCoPMissions('gobierno/csu')).toEqual([]);
  });

  it('markCoPMissionCompleted guarda y getCompletedCoPMissions recupera', () => {
    markCoPMissionCompleted('gobierno/csu', 'CSU-MC-01');
    expect(getCompletedCoPMissions('gobierno/csu')).toContain('CSU-MC-01');
  });

  it('no duplica si se llama dos veces con el mismo id', () => {
    markCoPMissionCompleted('gobierno/csu', 'CSU-MC-01');
    markCoPMissionCompleted('gobierno/csu', 'CSU-MC-01');
    expect(getCompletedCoPMissions('gobierno/csu')).toHaveLength(1);
  });

  it('comunidades distintas tienen registros independientes', () => {
    markCoPMissionCompleted('gobierno/csu', 'CSU-MC-01');
    markCoPMissionCompleted('formacion', 'VRF-MC-01');
    expect(getCompletedCoPMissions('gobierno/csu')).not.toContain('VRF-MC-01');
    expect(getCompletedCoPMissions('formacion')).not.toContain('CSU-MC-01');
  });
});
