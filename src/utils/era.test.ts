import { describe, it, expect } from 'vitest';
import { getEra } from './era';

describe('getEra', () => {
  it('handles boundary years correctly (1989)', () => {
    // Showa 64 (until Jan 7) / Heisei 1 (from Jan 8)
    expect(getEra(1989)).toBe('昭和64年 / 平成元年');
  });

  it('handles boundary years correctly (2019)', () => {
    // Heisei 31 (until Apr 30) / Reiwa 1 (from May 1)
    expect(getEra(2019)).toBe('平成31年 / 令和元年');
  });

  it('handles normal years correctly', () => {
    expect(getEra(2024)).toBe('令和6年');
    expect(getEra(1980)).toBe('昭和55年');
  });

  it('handles past years (Meiji)', () => {
    expect(getEra(1900)).toBe('明治33年');
  });

  it('handles future years', () => {
    // Assuming Reiwa continues
    // 2100 - 2019 + 1 = 82
    expect(getEra(2100)).toBe('令和82年');
  });
});
