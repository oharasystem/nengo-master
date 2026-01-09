import { describe, it, expect } from 'vitest';
import { getEra, getEraTransitionAlert } from './era';

describe('getEra', () => {
    it('returns Meiji for 1868', () => {
        expect(getEra(1868)).toBe('明治元年');
    });

    it('returns Taisho and Showa for 1926', () => {
        expect(getEra(1926)).toBe('大正15年 / 昭和元年');
    });

    it('returns Showa and Heisei for 1989', () => {
        expect(getEra(1989)).toBe('昭和64年 / 平成元年');
    });

    it('returns Reiwa for 2024', () => {
        expect(getEra(2024)).toBe('令和6年');
    });
});

describe('getEraTransitionAlert', () => {
    it('returns alert for 1926', () => {
        expect(getEraTransitionAlert(1926)).toBe('大正は12月24日まで、昭和は12月25日から');
    });

    it('returns alert for 1989', () => {
        expect(getEraTransitionAlert(1989)).toBe('昭和は1月7日まで、平成は1月8日から');
    });

    it('returns alert for 2019', () => {
        expect(getEraTransitionAlert(2019)).toBe('平成は4月30日まで、令和は5月1日から');
    });

    it('returns alert for 1868', () => {
        expect(getEraTransitionAlert(1868)).toBe('明治は1月25日から（旧暦）、新暦移行に注意');
    });

    it('returns alert for 1912', () => {
        expect(getEraTransitionAlert(1912)).toBe('明治は7月29日まで、大正は7月30日から');
    });

    it('returns null for normal years', () => {
        expect(getEraTransitionAlert(2024)).toBeNull();
        expect(getEraTransitionAlert(1988)).toBeNull();
    });
});
