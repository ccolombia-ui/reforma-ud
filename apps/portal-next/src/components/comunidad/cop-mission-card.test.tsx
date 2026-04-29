import { describe, it, expect } from 'vitest';
import { calcMisionCoPStatus, type MisionCoP } from './cop-mission-card';

const base: MisionCoP = {
  id: 'CSU-MC-01',
  slug: 'participa-en-la-reforma',
  titulo: 'Participa en la Reforma',
  tipo: 'comprension',
  papers: ['m01'],
  nivelRequerido: 0,
  nivelOtorga: 1,
  prerequisitosCanonicas: [],
  prerequisitosMision: [],
  orden: 1,
};

describe('calcMisionCoPStatus', () => {
  describe('locked — nivel insuficiente', () => {
    it('nivelRequerido=2 con userLevel=1 → locked', () => {
      const m: MisionCoP = { ...base, nivelRequerido: 2 };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 1, earnedCCAs: [], completedMisionIds: [] }))
        .toBe('locked');
    });

    it('nivelRequerido=0 con userLevel=0 → NO locked por nivel', () => {
      expect(calcMisionCoPStatus({ mision: base, userLevel: 0, earnedCCAs: [], completedMisionIds: [] }))
        .toBe('available');
    });
  });

  describe('locked — CCAs canónicas faltantes', () => {
    it('prerequisitosCanonicas=[m01] sin CCAs → locked', () => {
      const m: MisionCoP = { ...base, prerequisitosCanonicas: ['m01'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 2, earnedCCAs: [], completedMisionIds: [] }))
        .toBe('locked');
    });

    it('prerequisitosCanonicas=[m01,m04] con solo m01 → locked', () => {
      const m: MisionCoP = { ...base, prerequisitosCanonicas: ['m01', 'm04'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 2, earnedCCAs: ['m01'], completedMisionIds: [] }))
        .toBe('locked');
    });

    it('prerequisitosCanonicas=[m01] con CCA m01 → available', () => {
      const m: MisionCoP = { ...base, nivelRequerido: 0, prerequisitosCanonicas: ['m01'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 0, earnedCCAs: ['m01'], completedMisionIds: [] }))
        .toBe('available');
    });
  });

  describe('locked — misiones CoP prerequisito faltantes', () => {
    it('prerequisitosMision=[CSU-MC-01] sin completar → locked', () => {
      const m: MisionCoP = { ...base, id: 'CSU-MC-02', prerequisitosMision: ['CSU-MC-01'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 2, earnedCCAs: [], completedMisionIds: [] }))
        .toBe('locked');
    });

    it('prerequisitosMision=[A,B] con solo A completada → locked', () => {
      const m: MisionCoP = { ...base, prerequisitosMision: ['A', 'B'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 2, earnedCCAs: [], completedMisionIds: ['A'] }))
        .toBe('locked');
    });

    it('prerequisitosMision=[A] con A completada → available', () => {
      const m: MisionCoP = { ...base, prerequisitosMision: ['A'] };
      expect(calcMisionCoPStatus({ mision: m, userLevel: 0, earnedCCAs: [], completedMisionIds: ['A'] }))
        .toBe('available');
    });
  });

  describe('available — todos los prerequisitos cumplidos', () => {
    it('sin prerequisitos, nivel 0 → available', () => {
      expect(calcMisionCoPStatus({ mision: base, userLevel: 0, earnedCCAs: [], completedMisionIds: [] }))
        .toBe('available');
    });

    it('todos los prerequisitos cumplidos → available', () => {
      const m: MisionCoP = {
        ...base,
        id: 'CSU-MC-02',          // distinto de lo que está en completedMisionIds
        nivelRequerido: 2,
        prerequisitosCanonicas: ['m01', 'm04'],
        prerequisitosMision: ['CSU-MC-01'],
      };
      expect(calcMisionCoPStatus({
        mision: m,
        userLevel: 2,
        earnedCCAs: ['m01', 'm04'],
        completedMisionIds: ['CSU-MC-01'],
      })).toBe('available');
    });
  });

  describe('completed', () => {
    it('mision en completedMisionIds → completed', () => {
      expect(calcMisionCoPStatus({
        mision: base,
        userLevel: 0,
        earnedCCAs: [],
        completedMisionIds: ['CSU-MC-01'],
      })).toBe('completed');
    });

    it('completed tiene prioridad sobre available', () => {
      const m: MisionCoP = { ...base, nivelRequerido: 0, prerequisitosCanonicas: [] };
      expect(calcMisionCoPStatus({
        mision: m,
        userLevel: 5,
        earnedCCAs: ['m01', 'm04'],
        completedMisionIds: [m.id],
      })).toBe('completed');
    });
  });

  describe('flujo CSU completo', () => {
    const mc01: MisionCoP = { ...base, id: 'CSU-MC-01', nivelRequerido: 0, prerequisitosCanonicas: [], prerequisitosMision: [] };
    const mc02: MisionCoP = { ...base, id: 'CSU-MC-02', nivelRequerido: 1, prerequisitosCanonicas: ['m01'], prerequisitosMision: [] };
    const mc03a: MisionCoP = { ...base, id: 'CSU-MC-03-A', nivelRequerido: 2, prerequisitosCanonicas: ['m01', 'm04', 'm06'], prerequisitosMision: [] };
    const mc04: MisionCoP = { ...base, id: 'CSU-MC-04', nivelRequerido: 3, prerequisitosCanonicas: ['m01', 'm04', 'm06'], prerequisitosMision: ['CSU-MC-03-A', 'CSU-MC-03-B', 'CSU-MC-03-C'] };

    it('usuario nuevo: MC-01 available, resto locked', () => {
      const ctx = { userLevel: 0, earnedCCAs: [] as string[], completedMisionIds: [] as string[] };
      expect(calcMisionCoPStatus({ mision: mc01, ...ctx })).toBe('available');
      expect(calcMisionCoPStatus({ mision: mc02, ...ctx })).toBe('locked');
      expect(calcMisionCoPStatus({ mision: mc03a, ...ctx })).toBe('locked');
      expect(calcMisionCoPStatus({ mision: mc04, ...ctx })).toBe('locked');
    });

    it('completó MC-01 (N1), tiene m01: MC-02 available', () => {
      const ctx = { userLevel: 1, earnedCCAs: ['m01'], completedMisionIds: ['CSU-MC-01'] };
      expect(calcMisionCoPStatus({ mision: mc01, ...ctx })).toBe('completed');
      expect(calcMisionCoPStatus({ mision: mc02, ...ctx })).toBe('available');
    });

    it('N3 con todas las CCAs y MC-03-A/B/C: MC-04 available', () => {
      const ctx = {
        userLevel: 3,
        earnedCCAs: ['m01', 'm04', 'm06'],
        completedMisionIds: ['CSU-MC-03-A', 'CSU-MC-03-B', 'CSU-MC-03-C'],
      };
      expect(calcMisionCoPStatus({ mision: mc04, ...ctx })).toBe('available');
    });
  });
});
