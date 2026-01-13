import { describe, it, expect } from 'vitest';
import { getBaseUrl } from './url';

describe('getBaseUrl', () => {
    it('should return production URL when env is production', () => {
        expect(getBaseUrl('production')).toBe('https://nengo-master.o-lab.workers.dev');
    });

    it('should return development URL when env is undefined', () => {
        expect(getBaseUrl()).toBe('http://localhost:8787');
    });

    it('should return development URL when env is not production', () => {
        expect(getBaseUrl('development')).toBe('http://localhost:8787');
        expect(getBaseUrl('staging')).toBe('http://localhost:8787');
    });

    it('should append path to production URL', () => {
        expect(getBaseUrl('production', '/year/2000')).toBe('https://nengo-master.o-lab.workers.dev/year/2000');
    });

    it('should append path to development URL', () => {
        expect(getBaseUrl(undefined, '/year/2000')).toBe('http://localhost:8787/year/2000');
    });

    it('should handle empty path', () => {
        expect(getBaseUrl('production', '')).toBe('https://nengo-master.o-lab.workers.dev');
    });
});
