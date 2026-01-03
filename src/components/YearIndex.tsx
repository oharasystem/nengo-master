import { Layout } from "./Layout";
import { getZodiac } from "../utils/zodiac";
import { getEra } from "../utils/era";

type Props = {
    startYear: number;
    endYear: number;
};

export const YearIndex = ({ startYear, endYear }: Props) => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const lastYear = currentYear - 1;

    // Define Era Ranges (approximate for list grouping)
    // Future: > currentYear (handled separately)
    // Reiwa: 2019 - currentYear
    // Heisei: 1989 - 2018
    // Showa: 1926 - 1988
    // Pre-Showa (Taisho/Meiji): startYear - 1925

    const futureYears = [];
    const reiwaYears = [];
    const heiseiYears = [];
    const showaYears = [];
    const preShowaYears = [];

    // Reverse loop from endYear down to startYear
    for (let y = endYear; y >= startYear; y--) {
        if (y > currentYear) {
            futureYears.push(y);
        } else if (y >= 2019) {
            reiwaYears.push(y);
        } else if (y >= 1989) {
            heiseiYears.push(y);
        } else if (y >= 1926) {
            showaYears.push(y);
        } else {
            preShowaYears.push(y);
        }
    }

    const YearGrid = ({ years }: { years: number[] }) => {
        if (years.length === 0) return <div class="text-gray-400 text-sm">該当する年がありません</div>;
        return (
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {years.map(year => {
                    const era = getEra(year);
                    const zodiac = getZodiac(year);
                    return (
                        <a href={`/year/${year}`} class="block bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition text-center group">
                            <div class="text-base sm:text-lg font-bold text-indigo-600 group-hover:text-indigo-800">{year}年</div>
                            <div class="text-[10px] sm:text-xs text-gray-500 mb-1 truncate">{era}</div>
                            <div class="text-[10px] sm:text-xs bg-gray-100 rounded px-1 py-0.5 inline-block text-gray-600">
                                {zodiac.jyunishi.emoji} {zodiac.kanji}
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    };

    return (
        <Layout title="年号・西暦・年齢早見表一覧" description="1900年から2100年までの各年の年齢、干支、厄年、出来事がわかる一覧ページです。">
            <div class="flex-1 w-full relative overflow-y-auto bg-gray-50">
                <div class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8 pb-16">

                    <header class="text-center pt-4">
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800">年号・西暦一覧</h1>
                        <p class="text-sm text-gray-500 mt-2">調べたい年を選択してください</p>
                    </header>

                    {/* Hero: Quick Access */}
                    <section class="max-w-3xl mx-auto w-full">
                        <div class="grid grid-cols-3 gap-4">
                            <a href={`/year/${lastYear}`} class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition">
                                <span class="text-xs font-bold text-gray-500 mb-1">去年</span>
                                <span class="text-xl font-bold text-gray-800">{lastYear}年</span>
                            </a>
                            <a href={`/year/${currentYear}`} class="flex flex-col items-center justify-center bg-indigo-600 text-white p-4 rounded-xl shadow-lg ring-4 ring-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-1">
                                <span class="text-xs font-bold text-indigo-100 mb-1">今年</span>
                                <span class="text-2xl font-extrabold">{currentYear}年</span>
                            </a>
                            <a href={`/year/${nextYear}`} class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition">
                                <span class="text-xs font-bold text-gray-500 mb-1">来年</span>
                                <span class="text-xl font-bold text-gray-800">{nextYear}年</span>
                            </a>
                        </div>
                    </section>

                    {/* Main Area: Eras */}
                    <div class="space-y-8">
                        {/* Reiwa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-gray-200">
                                <h2 class="text-xl font-bold text-gray-800">令和 <span class="text-sm font-normal text-gray-500">(2019〜)</span></h2>
                            </div>
                            <YearGrid years={reiwaYears} />
                        </section>

                        {/* Heisei */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-gray-200">
                                <h2 class="text-xl font-bold text-gray-800">平成 <span class="text-sm font-normal text-gray-500">(1989〜2019)</span></h2>
                            </div>
                            <YearGrid years={heiseiYears} />
                        </section>

                        {/* Showa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-gray-200">
                                <h2 class="text-xl font-bold text-gray-800">昭和 <span class="text-sm font-normal text-gray-500">(1926〜1989)</span></h2>
                            </div>
                            <YearGrid years={showaYears} />
                        </section>

                        {/* Pre-Showa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-gray-200">
                                <h2 class="text-xl font-bold text-gray-800">明治・大正 <span class="text-sm font-normal text-gray-500">(〜1926)</span></h2>
                            </div>
                            <YearGrid years={preShowaYears} />
                        </section>
                    </div>

                    {/* Future Section (Accordion) */}
                    {futureYears.length > 0 && (
                        <section class="mt-8 border rounded-xl bg-indigo-50/50 overflow-hidden">
                            <details class="group">
                                <summary class="flex justify-between items-center font-bold font-lg p-4 cursor-pointer hover:bg-indigo-50 text-indigo-800">
                                    <span>🔮 未来の年表 <span class="text-sm font-normal ml-2">({currentYear + 1}〜{endYear})</span></span>
                                    <span class="text-indigo-500 transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div class="p-4 pt-0 border-t border-indigo-100/50">
                                    <p class="text-sm text-gray-500 py-3">※現在より先の年は「未来の出来事」として表示されます。</p>
                                    <YearGrid years={futureYears} />
                                </div>
                            </details>
                        </section>
                    )}
                </div>
            </div>
        </Layout>
    );
};
