export const eras = [
    { name: "Meiji", kanji: "明治", start: 1868, end: 1912 },
    { name: "Taisho", kanji: "大正", start: 1912, end: 1926 },
    { name: "Showa", kanji: "昭和", start: 1926, end: 1989 },
    { name: "Heisei", kanji: "平成", start: 1989, end: 2019 },
    { name: "Reiwa", kanji: "令和", start: 2019, end: 9999 },
];

export const getEra = (year: number): string => {
    const result: string[] = [];

    for (const era of eras) {
        if (year >= era.start && year <= era.end) {
            const eraYear = year - era.start + 1;
            const eraYearStr = eraYear === 1 ? "元" : eraYear.toString();
            result.push(`${era.kanji}${eraYearStr}年`);
        }
    }

    return result.join(" / ");
};

export const getEraTransitionAlert = (year: number): string | null => {
    switch (year) {
        case 1926:
            return "大正は12月24日まで、昭和は12月25日から";
        case 1989:
            return "昭和は1月7日まで、平成は1月8日から";
        case 2019:
            return "平成は4月30日まで、令和は5月1日から";
        case 1868:
            return "明治は1月25日から（旧暦）、新暦移行に注意";
        case 1912:
            return "明治は7月29日まで、大正は7月30日から";
        default:
            return null;
    }
};
