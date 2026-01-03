export type YakudoshiType = 'pre' | 'main' | 'post' | null;

export type YakudoshiResult = {
    male: {
        type: YakudoshiType;
        label: string; // 前厄, 本厄, 後厄
        age: number; // 数え年
    } | null;
    female: {
        type: YakudoshiType;
        label: string;
        age: number; // 数え年
    } | null;
    kazoeAge: number;
};

// Yakudoshi Ages (Kazoe-doshi)
const YAKUDOSHI_MALE = {
    main: [25, 42, 61],
    pre: [24, 41, 60],
    post: [26, 43, 62]
};

const YAKUDOSHI_FEMALE = {
    main: [19, 33, 37, 61],
    pre: [18, 32, 36, 60],
    post: [20, 34, 38, 62]
};

export const getYakudoshi = (birthYear: number, targetYear: number): YakudoshiResult => {
    // Kazoe-doshi: You are 1 year old at birth, and gain a year on New Year's Day.
    // Formula: (Target Year - Birth Year) + 1
    const kazoeAge = (targetYear - birthYear) + 1;

    const checkYakudoshi = (age: number, rules: typeof YAKUDOSHI_MALE) => {
        if (rules.main.includes(age)) return { type: 'main' as const, label: '本厄' };
        if (rules.pre.includes(age)) return { type: 'pre' as const, label: '前厄' };
        if (rules.post.includes(age)) return { type: 'post' as const, label: '後厄' };
        return null;
    };

    const maleResult = checkYakudoshi(kazoeAge, YAKUDOSHI_MALE);
    const femaleResult = checkYakudoshi(kazoeAge, YAKUDOSHI_FEMALE);

    return {
        male: maleResult ? { ...maleResult, age: kazoeAge } : null,
        female: femaleResult ? { ...femaleResult, age: kazoeAge } : null,
        kazoeAge
    };
};
