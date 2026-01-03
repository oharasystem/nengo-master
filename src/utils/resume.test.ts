import { describe, it, expect } from 'vitest';
import { calculateResume } from './resume';

describe('calculateResume', () => {
  it('handles early birthday (Apr 1) - Previous academic year', () => {
    // 1987-04-01 is early birthday (academic year starts 1986)
    // Elementary entrance: 1986 + 7 = 1993
    const result = calculateResume('1987/04/01');
    const elemEntrance = result.find(e => e.label === '小学校入学');
    expect(elemEntrance).toBeDefined();
    expect(elemEntrance?.year).toBe(1993);
    expect(result[0].year).toBe(1987);
  });

  it('handles normal birthday (Apr 2) - Current academic year', () => {
    // 1987-04-02 is normal birthday (academic year starts 1987)
    // Elementary entrance: 1987 + 7 = 1994
    const result = calculateResume('1987/04/02');
    const elemEntrance = result.find(e => e.label === '小学校入学');
    expect(elemEntrance).toBeDefined();
    expect(elemEntrance?.year).toBe(1994);
    expect(result[0].year).toBe(1987);
  });

  it('handles early birthday (Jan 1) - Previous academic year', () => {
    // 1988-01-01 is early birthday (academic year starts 1987)
    // Elementary entrance: 1987 + 7 = 1994
    const result = calculateResume('1988/01/01');
    const elemEntrance = result.find(e => e.label === '小学校入学');
    expect(elemEntrance).toBeDefined();
    expect(elemEntrance?.year).toBe(1994);
  });

  it('returns empty array for invalid date', () => {
    const result = calculateResume('invalid-date');
    expect(result).toEqual([]);
  });

  it('handles standard ISO format', () => {
      // 2000-04-02
      const result = calculateResume('2000-04-02');
      expect(result.length).toBeGreaterThan(0);
      const elemEntrance = result.find(e => e.label === '小学校入学');
      // Base year 2000 + 7 = 2007
      expect(elemEntrance?.year).toBe(2007);
  });
});
