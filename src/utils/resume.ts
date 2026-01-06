type ResumeEvent = {
    label: string;
    year: number;
    month: number;
};

export const calculateResume = (birthDateStr: string): ResumeEvent[] => {
    // Parse YYYY-MM-DD manually to avoid timezone issues
    const parts = birthDateStr.split("-");
    if (parts.length !== 3) {
        return [];
    }
    const birthYear = parseInt(parts[0], 10);
    const birthMonth = parseInt(parts[1], 10);
    const birthDay = parseInt(parts[2], 10);

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
        return [];
    }

    // 早生まれ判定 (4月1日以前生まれは前年度扱い)
    // 学年基準年度 = (月 <= 3 OR (月=4 AND 日=1)) ? 生まれ年-1 : 生まれ年
    let baseYear = birthYear;
    if (birthMonth <= 3 || (birthMonth === 4 && birthDay === 1)) {
        baseYear = birthYear - 1;
    }

    return [
        { label: "生まれ", year: birthYear, month: birthMonth },
        { label: "小学校入学", year: baseYear + 7, month: 4 },
        { label: "小学校卒業", year: baseYear + 13, month: 3 },
        { label: "中学校入学", year: baseYear + 13, month: 4 },
        { label: "中学校卒業", year: baseYear + 16, month: 3 },
        { label: "高校入学", year: baseYear + 16, month: 4 },
        { label: "高校卒業", year: baseYear + 19, month: 3 },
        { label: "大学入学", year: baseYear + 19, month: 4 },
        { label: "大学卒業", year: baseYear + 23, month: 3 },
    ];
};
