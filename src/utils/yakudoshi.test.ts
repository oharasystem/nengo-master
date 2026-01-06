import { describe, it, expect } from 'vitest';
import { getYakudoshi } from './yakudoshi';

describe('getYakudoshi', () => {
    it('calculates Yakudoshi correctly for Male born in 2000, target 2024', () => {
        // Birth: 2000, Target: 2024
        // Kazoe Age = (2024 - 2000) + 1 = 25
        // Male 25 is Main Yakudoshi (本厄)
        const result = getYakudoshi(2000, 2024);
        expect(result.kazoeAge).toBe(25);
        expect(result.male?.type).toBe('main');
        expect(result.male?.label).toBe('本厄');
    });

    it('calculates Yakudoshi correctly for Female born in 1992, target 2024', () => {
        // Birth: 1992, Target: 2024
        // Kazoe Age = (2024 - 1992) + 1 = 33
        // Female 33 is Main Yakudoshi (本厄)
        const result = getYakudoshi(1992, 2024);
        expect(result.kazoeAge).toBe(33);
        expect(result.female?.type).toBe('main');
        expect(result.female?.label).toBe('本厄');
    });

    it('returns null when not in Yakudoshi', () => {
        // Birth: 2000, Target: 2010 -> Age 11
        // Not Yakudoshi for anyone
        const result = getYakudoshi(2000, 2010);
        expect(result.male).toBeNull();
        expect(result.female).toBeNull();
    });

    it('calculates Pre-Yakudoshi (Maeyaku)', () => {
        // Male 24 is Pre-Yakudoshi
        // Target 2023 for born 2000 -> Age 24
        const result = getYakudoshi(2000, 2023);
        expect(result.male?.type).toBe('pre');
        expect(result.male?.label).toBe('前厄');
    });

    it('calculates Post-Yakudoshi (Atoyaku)', () => {
        // Male 26 is Post-Yakudoshi
        // Target 2025 for born 2000 -> Age 26
        const result = getYakudoshi(2000, 2025);
        expect(result.male?.type).toBe('post');
        expect(result.male?.label).toBe('後厄');
    });
});
