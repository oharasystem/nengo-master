import { describe, it, expect } from 'vitest';
import { getZodiac, getSexagenaryCycle } from './zodiac';

describe('getZodiac', () => {
    it('returns correct Zodiac for 2024 (Wood Dragon / 甲辰)', () => {
        // 2024 is the year of the Dragon (辰)
        // 2024 % 10 = 4 -> 4 corresponds to 甲 (Wood) in (year-4)%10 logic?
        // Let's trace logic: (2024 - 4) % 10 = 2020 % 10 = 0 -> 甲 (Kinoe)
        // (2024 - 4) % 12 = 2020 % 12 = 4 -> 辰 (Tatsu/Dragon)
        // Correct: 甲辰
        const result = getZodiac(2024);
        expect(result.kanji).toBe('甲辰');
        expect(result.jyunishi.kanji).toBe('辰');
        expect(result.jikkan.kanji).toBe('甲');
    });

    it('returns correct Zodiac for 1984 (Wood Rat / 甲子)', () => {
        // 1984 is the start of a cycle (60-year cycle start)
        // (1984 - 4) % 10 = 1980 % 10 = 0 -> 甲
        // (1984 - 4) % 12 = 1980 % 12 = 0 -> 子
        const result = getZodiac(1984);
        expect(result.kanji).toBe('甲子');
    });

    it('returns correct Zodiac for 2023 (Water Rabbit / 癸卯)', () => {
        // (2023 - 4) % 10 = 9 -> 癸
        // (2023 - 4) % 12 = 3 -> 卯
        const result = getZodiac(2023);
        expect(result.kanji).toBe('癸卯');
    });
});

describe('getSexagenaryCycle', () => {
    it('returns correct trivia for 1924 (Kinoene / 甲子)', () => {
        const result = getSexagenaryCycle(1924);
        expect(result.kanji).toBe('甲子');
        expect(result.kana).toBe('きのえね');
        expect(result.trivia).toContain('甲子園球場');
    });

    it('returns correct trivia for 1966 (Hinoeuma / 丙午)', () => {
        const result = getSexagenaryCycle(1966);
        expect(result.kanji).toBe('丙午');
        expect(result.kana).toBe('ひのえうま');
        expect(result.trivia).toContain('迷信の影響で出生数が一時的に下がった');
    });

    it('returns default trivia for 2026 (Hinoeuma / 丙午)', () => {
        // 2026 is also Hinoeuma, so it should have the same trivia as 1966
        const result = getSexagenaryCycle(2026);
        expect(result.kanji).toBe('丙午');
        expect(result.kana).toBe('ひのえうま');
        expect(result.trivia).toContain('迷信の影響で出生数が一時的に下がった');
    });

    it('returns default trivia for non-special years (e.g., 2024 / 甲辰)', () => {
        const result = getSexagenaryCycle(2024);
        expect(result.kanji).toBe('甲辰');
        expect(result.kana).toBe('きのえたつ');
        expect(result.trivia).toBe('2024年の干支は【甲辰（きのえたつ）】です。これは60年に一度巡ってくる干支です。');
    });

    it('returns correct trivia for 1868 (Boshin / 戊辰)', () => {
        const result = getSexagenaryCycle(1868);
        expect(result.kanji).toBe('戊辰');
        expect(result.trivia).toContain('戊辰戦争');
    });
});
