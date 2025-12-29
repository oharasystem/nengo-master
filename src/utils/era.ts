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
