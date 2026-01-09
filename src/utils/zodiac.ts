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

export const SEXAGENARY_CYCLE_TRIVIA: Record<number, string> = {
    0: "甲子（きのえね）は60干支の始まりの年です。兵庫県の『甲子園球場』は、この甲子の年（1924年）に完成したことから名付けられました。物事を始めるのに良い年とされています。",
    4: "戊辰（つちのえたつ）は、日本の近代化の転換点となった『戊辰戦争（1868年）』の名称の由来となった干支です。大きな変革の年と言われることがあります。",
    42: "丙午（ひのえうま）は、『火の兄』と『午』が重なる年で、非常に強いエネルギーを持つと言われています。1966年には迷信の影響で出生数が一時的に下がったことでも有名です。",
    47: "辛亥（かのとい）は、中国で起きた『辛亥革命（1911年）』の由来です。古い体制から新しい体制へと移り変わる、革新の年とされています。",
    56: "庚申（かのえさる）は、古くからの『庚申信仰』で知られる干支です。この日は徹夜をして長寿を願う風習があり、各地に『庚申塔』などの石碑が残されています。"
};

export type Zodiac = {
    jyunishi: { kanji: string; kana: string; emoji: string };
    jikkan: { kanji: string; kana: string };
    kanji: string;
};

export type SexagenaryCycle = {
    kanji: string;
    kana: string;
    trivia: string;
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

export const getSexagenaryCycle = (year: number): SexagenaryCycle => {
    // 60-year cycle index
    // 1984 was start (index 0). (1984 - 4) % 60 = 1980 % 60 = 0.
    // So (year - 4) % 60 works.
    let index = (year - 4) % 60;
    if (index < 0) index += 60;

    const zodiac = getZodiac(year);
    const kanji = zodiac.kanji;
    const kana = `${zodiac.jikkan.kana}${zodiac.jyunishi.kana}`;

    let trivia = SEXAGENARY_CYCLE_TRIVIA[index];
    if (!trivia) {
        trivia = `${year}年の干支は【${kanji}（${kana}）】です。これは60年に一度巡ってくる干支です。`;
    }

    return {
        kanji,
        kana,
        trivia
    };
};
