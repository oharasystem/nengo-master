export const JYUNISHI = [
    { kanji: '子', kana: 'ね', emoji: '🐭' },
    { kanji: '丑', kana: 'うし', emoji: '🐮' },
    { kanji: '寅', kana: 'とら', emoji: '🐯' },
    { kanji: '卯', kana: 'う', emoji: '🐰' },
    { kanji: '辰', kana: 'たつ', emoji: '🐲' },
    { kanji: '巳', kana: 'み', emoji: '🐍' },
    { kanji: '午', kana: 'うま', emoji: '🐴' },
    { kanji: '未', kana: 'ひつじ', emoji: '🐑' },
    { kanji: '申', kana: 'さる', emoji: '🐵' },
    { kanji: '酉', kana: 'とり', emoji: '🐔' },
    { kanji: '戌', kana: 'いぬ', emoji: '🐶' },
    { kanji: '亥', kana: 'い', emoji: '🐗' }
];

export const JIKKAN = [
    { kanji: '甲', kana: 'きのえ' },
    { kanji: '乙', kana: 'きのと' },
    { kanji: '丙', kana: 'ひのえ' },
    { kanji: '丁', kana: 'ひのと' },
    { kanji: '戊', kana: 'つちのえ' },
    { kanji: '己', kana: 'つちのと' },
    { kanji: '庚', kana: 'かのえ' },
    { kanji: '辛', kana: 'かのと' },
    { kanji: '壬', kana: 'みずのえ' },
    { kanji: '癸', kana: 'みずのと' }
];

export type Zodiac = {
    jyunishi: { kanji: string; kana: string; emoji: string };
    jikkan: { kanji: string; kana: string };
    kanji: string;
};

export const getZodiac = (year: number): Zodiac => {
    // 4 AD was Rat (子), Wood Rat (甲子)
    // Jyunishi cycle: (year - 4) % 12
    // Jikkan cycle: (year - 4) % 10

    // Handle negative years correctly if needed, but assuming AD >= 4
    let iJyunishi = (year - 4) % 12;
    if (iJyunishi < 0) iJyunishi += 12;

    let iJikkan = (year - 4) % 10;
    if (iJikkan < 0) iJikkan += 10;

    const jyunishi = JYUNISHI[iJyunishi];
    const jikkan = JIKKAN[iJikkan];

    return {
        jyunishi,
        jikkan,
        kanji: `${jikkan.kanji}${jyunishi.kanji}`
    };
};
