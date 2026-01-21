import { Layout } from "./Layout";
import { Breadcrumbs } from "./Breadcrumbs";
import { getZodiac } from "../utils/zodiac";
import { getEra } from "../utils/era";
import { Translation } from "../locales/types";

type Props = {
    startYear: number;
    endYear: number;
    lang: string;
    dict: Translation;
    path: string;
    env?: string;
    googleAdSenseId?: string;
};

export const YearIndex = ({ startYear, endYear, lang, dict, path, env, googleAdSenseId }: Props) => {
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

    // Helper
    const getLink = (p: string) => lang === 'ja' ? p : `/${lang}${p}`;

    const breadcrumbItems = [
        { label: dict.nav.home, path: getLink('/') },
        { label: dict.nav.hub, path: path }
    ];

    const YearGrid = ({ years }: { years: number[] }) => {
        if (years.length === 0) return <div class="text-slate-400 text-sm">{dict.trivia.empty}</div>;
        return (
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {years.map(year => {
                    const era = getEra(year);
                    const zodiac = getZodiac(year);
                    return (
                        <a href={getLink(`/year/${year}`)} class="block bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-slate-100 hover:border-[#22215B] hover:shadow-md transition text-center group">
                            <div class="text-base sm:text-lg font-bold text-[#22215B] group-hover:opacity-80">{year}{dict.home.form_year_suffix}</div>
                            <div class="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">{era}</div>
                            <div class="text-[10px] sm:text-xs bg-slate-100 rounded px-1 py-0.5 inline-block text-slate-600">
                                {zodiac.jyunishi.emoji} {zodiac.kanji}
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    };

    return (
        <Layout title={dict.meta.title} description={dict.meta.description} lang={lang} dict={dict} path={path} env={env} googleAdSenseId={googleAdSenseId}>
            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8 pb-16">

                    <Breadcrumbs items={breadcrumbItems} />

                    <header class="text-center pt-4">
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">{dict.nav.hub}</h1>
                    </header>

                    {/* Hero: Quick Access */}
                    <section class="max-w-3xl mx-auto w-full">
                        <div class="grid grid-cols-3 gap-4">
                            <a href={getLink(`/year/${lastYear}`)} class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-slate-200 hover:border-[#22215B] hover:bg-slate-50 transition">
                                <span class="text-xs font-bold text-slate-500 mb-1">{lastYear}</span>
                                <span class="text-xl font-bold text-slate-800">{lastYear}{dict.home.form_year_suffix}</span>
                            </a>
                            <a href={getLink(`/year/${currentYear}`)} class="flex flex-col items-center justify-center bg-[#22215B] text-white p-4 rounded-xl shadow-lg ring-4 ring-[#22215B]/20 hover:opacity-90 transition transform hover:-translate-y-1">
                                <span class="text-xs font-bold text-slate-100 mb-1">{currentYear}</span>
                                <span class="text-2xl font-extrabold">{currentYear}{dict.home.form_year_suffix}</span>
                            </a>
                            <a href={getLink(`/year/${nextYear}`)} class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-slate-200 hover:border-[#22215B] hover:bg-slate-50 transition">
                                <span class="text-xs font-bold text-slate-500 mb-1">{nextYear}</span>
                                <span class="text-xl font-bold text-slate-800">{nextYear}{dict.home.form_year_suffix}</span>
                            </a>
                        </div>
                    </section>

                    {/* Main Area: Eras - Keeping Headers in Japanese for now as Era names are Japanese concepts */}
                    <div class="space-y-8">
                        {/* Reiwa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                                <h2 class="text-xl font-bold text-slate-800">令和 <span class="text-sm font-normal text-slate-500">(2019〜)</span></h2>
                            </div>
                            <YearGrid years={reiwaYears} />
                        </section>

                        {/* Heisei */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                                <h2 class="text-xl font-bold text-slate-800">平成 <span class="text-sm font-normal text-slate-500">(1989〜2019)</span></h2>
                            </div>
                            <YearGrid years={heiseiYears} />
                        </section>

                        {/* Showa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                                <h2 class="text-xl font-bold text-slate-800">昭和 <span class="text-sm font-normal text-slate-500">(1926〜1989)</span></h2>
                            </div>
                            <YearGrid years={showaYears} />
                        </section>

                        {/* Pre-Showa */}
                        <section>
                            <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                                <h2 class="text-xl font-bold text-slate-800">明治・大正 <span class="text-sm font-normal text-slate-500">(〜1926)</span></h2>
                            </div>
                            <YearGrid years={preShowaYears} />
                        </section>
                    </div>

                    {/* Future Section (Accordion) */}
                    {futureYears.length > 0 && (
                        <section class="mt-8 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                            <details class="group">
                                <summary class="flex justify-between items-center font-bold font-lg p-4 cursor-pointer hover:bg-slate-100 text-[#22215B]">
                                    <span>🔮 未来の年表 <span class="text-sm font-normal ml-2">({currentYear + 1}〜{endYear})</span></span>
                                    <span class="text-[#22215B] transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div class="p-4 pt-0 border-t border-slate-200">
                                    <p class="text-sm text-slate-500 py-3">※現在より先の年は「未来の出来事」として表示されます。</p>
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
