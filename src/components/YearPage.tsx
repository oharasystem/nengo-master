import { Layout } from "./Layout";
import { TriviaCard } from "./TriviaCard";
import { getZodiac, getSexagenaryCycle } from "../utils/zodiac";
import { getYakudoshi } from "../utils/yakudoshi";
import { calculateResume } from "../utils/resume";
import { getLifeEvents } from "../utils/lifeEvents";
import { getEraTransitionAlert } from "../utils/era";
import { Translation } from "../locales/types";

type Props = {
    year: number;
    currentYear: number;
    era: string; // "平成元年" etc.
    trivia: {
        events: string[];
        hitSongs: string[];
    };
    lang: string;
    dict: Translation;
    path: string;
    env?: string;
};

export const YearPage = (props: Props) => {
    const { year, currentYear, era, trivia, lang, dict, path, env } = props;
    const age = currentYear - year;
    const zodiac = getZodiac(year);
    const yakudoshi = getYakudoshi(year, currentYear);
    const resume = calculateResume(`${year}-04-02`);

    // Extended logic for JA
    const eraAlert = lang === 'ja' ? getEraTransitionAlert(year) : null;
    const sexagenaryCycle = lang === 'ja' ? getSexagenaryCycle(year) : null;
    const lifeEvents = lang === 'ja' ? getLifeEvents(year) : [];

    // Links
    const prevYear = year - 1;
    const nextYear = year + 1;
    const sameZodiacPrev = year - 12;
    const sameZodiacNext = year + 12;

    const title = `${year}年（${era}）生まれ - 年齢・厄年・早見表`; // TODO: Translate titles if needed later, kept as is for now as scope is top page focused mostly
    const description = `${year}年（${era}）生まれの人の現在の年齢は${age}歳です。干支は${zodiac.kanji}（${zodiac.jyunishi.kana}）です。入学・卒業年度、厄年の確認、当時の出来事やヒット曲も振り返ります。`;

    // JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `${year}年`,
        "startDate": `${year}-01-01`,
        "endDate": `${year}-12-31`,
        "description": `${year}年の出来事: ${trivia.events.join(', ') || '情報なし'}`,
        "performer": {
            "@type": "Person",
            "name": `${year}年生まれの人`,
            "description": `${year}年生まれの人は现在${age}歳`
        }
    };

    // Helper for URLs
    const getLink = (p: string) => lang === 'ja' ? p : `/${lang}${p}`;

    return (
        <Layout title={title} description={description} lang={lang} dict={dict} path={path} env={env}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="w-full max-w-4xl mx-auto p-4 flex flex-col gap-8">
                    {/* Header */}
                    <header class="text-center py-8">
                        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
                            <span class="text-[#22215B]">{year}{dict.home.form_year_suffix}</span>
                            <span class="text-lg sm:text-2xl font-normal text-slate-600 ml-2">({era})</span>
                        </h1>

                        {/* Era Transition Alert (JA Only) */}
                        {eraAlert && (
                            <div class="max-w-xl mx-auto mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-900 text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                                <span>⚠️</span>
                                <span>{eraAlert}</span>
                            </div>
                        )}

                        <p class="text-lg font-bold text-slate-700 mb-2">
                            {dict.year_page.age_label}
                        </p>
                        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 text-slate-700 font-bold mb-4">
                            <div class="bg-slate-100 px-4 py-2 rounded-lg">
                                <span class="text-sm text-slate-500 block">{dict.year_page.before_birthday}</span>
                                <span class="text-2xl text-[#22215B]">{age - 1}</span> 歳
                            </div>
                            <div class="hidden sm:block text-slate-300">|</div>
                            <div class="bg-slate-100 px-4 py-2 rounded-lg">
                                <span class="text-sm text-slate-500 block">{dict.year_page.after_birthday}</span>
                                <span class="text-2xl text-[#22215B]">{age}</span> 歳
                            </div>
                        </div>
                        <div class="mt-2 text-slate-500 font-bold">
                            {dict.year_page.zodiac_label}: <span class="text-slate-800">{zodiac.kanji} ({zodiac.jyunishi.kana})</span> {zodiac.jyunishi.emoji}
                        </div>
                    </header>

                    {/* Intro Section - JA Only */}
                    {lang === 'ja' && (
                        <div class="text-sm text-slate-600 leading-relaxed mb-6">
                            <p>
                                西暦{year}年は、和暦では{era}です。干支は{zodiac.kanji}（{zodiac.jikkan.kana}{zodiac.jyunishi.kana}）にあたります。<br />
                                このページでは、{year}年生まれの方の年齢早見表や、入学・卒業年度、その年に起きた主な出来事などをまとめています。
                            </p>
                        </div>
                    )}

                    {/* Sexagenary Cycle Info (JA Only) */}
                    {sexagenaryCycle && (
                        <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                             <div class="flex items-center gap-2 mb-3">
                                <span class="bg-slate-100 text-[#22215B] p-2 rounded-full">🗓️</span>
                                <h2 class="font-bold text-xl text-slate-800">干支・六十干支</h2>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div class="font-bold text-lg text-[#22215B] mb-2">
                                    {sexagenaryCycle.kanji} <span class="text-sm font-normal text-slate-500">（{sexagenaryCycle.kana}）</span>
                                </div>
                                <p class="text-sm text-slate-700 leading-relaxed">
                                    {sexagenaryCycle.trivia}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Navigation (Top) */}
                    <nav class="flex justify-between text-sm sm:text-base font-bold text-[#22215B]">
                        <a href={getLink(`/year/${prevYear}`)} class="hover:underline">← {prevYear}{dict.home.form_year_suffix}</a>
                        <a href={getLink("/years")} class="hover:underline">{dict.nav.hub}</a>
                        <a href={getLink(`/year/${nextYear}`)} class="hover:underline">{nextYear}{dict.home.form_year_suffix} →</a>
                    </nav>

                    {/* Yakudoshi Check */}
                    <section class="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="bg-orange-100 text-orange-600 p-2 rounded-full">⚡</span>
                            <h2 class="font-bold text-xl text-slate-800">{dict.year_page.yakudoshi_title} <span class="text-sm font-normal text-slate-500">（数え年）</span></h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Male */}
                            <div class={`p-4 rounded-lg border-2 ${yakudoshi.male ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50'}`}>
                                <h3 class="font-bold text-center text-slate-700 mb-2">{dict.year_page.yakudoshi_male}</h3>
                                {yakudoshi.male ? (
                                    <div class="text-center">
                                        <div class="text-2xl font-extrabold text-red-600 mb-1">{yakudoshi.male.label}</div>
                                        <div class="text-sm text-slate-600">数え年: {yakudoshi.male.age}歳</div>
                                        <div class="text-xs text-red-500 font-bold mt-2">{dict.year_page.yakudoshi_caution}</div>
                                    </div>
                                ) : (
                                    <div class="text-center py-4 text-slate-400 font-bold">{dict.year_page.yakudoshi_not}</div>
                                )}
                            </div>

                            {/* Female */}
                            <div class={`p-4 rounded-lg border-2 ${yakudoshi.female ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50'}`}>
                                <h3 class="font-bold text-center text-slate-700 mb-2">{dict.year_page.yakudoshi_female}</h3>
                                {yakudoshi.female ? (
                                    <div class="text-center">
                                        <div class="text-2xl font-extrabold text-red-600 mb-1">{yakudoshi.female.label}</div>
                                        <div class="text-sm text-slate-600">数え年: {yakudoshi.female.age}歳</div>
                                        <div class="text-xs text-red-500 font-bold mt-2">{dict.year_page.yakudoshi_caution}</div>
                                    </div>
                                ) : (
                                    <div class="text-center py-4 text-slate-400 font-bold">{dict.year_page.yakudoshi_not}</div>
                                )}
                            </div>
                        </div>
                        <p class="text-xs text-slate-400 mt-4 text-center">{dict.year_page.yakudoshi_note}</p>
                    </section>

                    {/* Trivia */}
                    <section>
                        <TriviaCard trivia={trivia} era={era} dict={dict} />
                    </section>

                    {/* Resume (School History) */}
                    <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div class="flex items-center gap-2">
                                <span class="bg-slate-100 text-[#22215B] p-2 rounded-full">🎓</span>
                                <h2 class="font-bold text-xl text-slate-800">{dict.home.calc_title} <span class="text-sm font-normal text-slate-500">（ストレート合格の場合）</span></h2>
                            </div>

                            {/* Early Birthday Toggle */}
                            <label class="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition select-none">
                                <input type="checkbox" id="earlyBirthdayToggle" class="w-4 h-4 text-[#22215B] rounded focus:ring-[#22215B] border-slate-300" />
                                <span class="text-sm font-bold text-slate-700">{dict.home.form_early_bird} <span class="text-xs text-slate-400 font-normal">{dict.home.form_early_bird_desc}</span></span>
                            </label>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-slate-600" id="resumeTable">
                                <thead class="text-xs text-slate-700 uppercase bg-slate-50">
                                    <tr>
                                        <th class="px-4 py-3 rounded-l-lg">区分</th>
                                        <th class="px-4 py-3">年月</th>
                                        <th class="px-4 py-3 rounded-r-lg">年齢</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resume.map((item, index) => (
                                        <tr key={index} class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition" data-original-year={item.year} data-original-month={item.month} data-label={item.label}>
                                            <td class="px-4 py-3 font-bold text-slate-800">{item.label}</td>
                                            <td class="px-4 py-3 font-mono text-[#22215B] resume-date">{item.year}{dict.resume.result_year_suffix}{item.month}{dict.resume.result_month_suffix}</td>
                                            <td class="px-4 py-3 text-slate-500 resume-age">
                                                {/* Approximate age calculation for table */}
                                                {item.year - year}歳
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <script dangerouslySetInnerHTML={{
                            __html: `
                            document.getElementById('earlyBirthdayToggle').addEventListener('change', function(e) {
                                const isEarly = e.target.checked;
                                const rows = document.querySelectorAll('#resumeTable tbody tr');
                                const birthYear = ${year};
                                const yearSuffix = "${dict.resume.result_year_suffix}";
                                const monthSuffix = "${dict.resume.result_month_suffix}";
                                
                                rows.forEach(row => {
                                    const label = row.dataset.label;
                                    const originalYear = parseInt(row.dataset.originalYear);
                                    const month = parseInt(row.dataset.originalMonth);
                                    
                                    if (label === '生まれ') return; 

                                    const adjustedYear = isEarly ? originalYear - 1 : originalYear;
                                    const adjustedAge = adjustedYear - birthYear;
                                    
                                    row.querySelector('.resume-date').textContent = adjustedYear + yearSuffix + month + monthSuffix;
                                    row.querySelector('.resume-age').textContent = adjustedAge + '歳';
                                });
                            });
                        `}} />
                    </section>

                    {/* Life Milestones (JA Only) */}
                    {lang === 'ja' && lifeEvents.length > 0 && (
                        <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="bg-slate-100 text-[#22215B] p-2 rounded-full">🎉</span>
                                <h2 class="font-bold text-xl text-slate-800">人生の節目・長寿のお祝い</h2>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left text-slate-600">
                                    <thead class="text-xs text-slate-700 uppercase bg-slate-50">
                                        <tr>
                                            <th class="px-4 py-3 rounded-l-lg">年齢</th>
                                            <th class="px-4 py-3">出来事</th>
                                            <th class="px-4 py-3 rounded-r-lg">その年</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lifeEvents.map((event, index) => {
                                            const isPast = event.year < currentYear;
                                            return (
                                                <tr key={index} class={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition ${isPast ? 'text-slate-400' : ''}`}>
                                                    <td class="px-4 py-3 font-bold">満{event.age}歳</td>
                                                    <td class={`px-4 py-3 font-bold ${isPast ? 'text-slate-400' : 'text-slate-800'}`}>{event.label}</td>
                                                    <td class={`px-4 py-3 ${isPast ? '' : 'text-[#22215B] font-medium'}`}>
                                                        {event.year}年 <span class="text-xs">({event.wareki})</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Related Links */}
                    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href={getLink(`/year/${sameZodiacPrev}`)} class="block p-4 bg-white rounded-lg hover:bg-slate-50 transition border border-slate-200 hover:border-[#22215B]/50 shadow-sm">
                            <div class="text-xs text-slate-500 mb-1">{dict.year_page.related_zodiac_prev.replace('{zodiac}', zodiac.jyunishi.kana)}</div>
                            <div class="font-bold text-slate-800">← {sameZodiacPrev}{dict.home.form_year_suffix} ({sameZodiacPrev - year}歳)</div>
                        </a>
                        <a href={getLink(`/year/${sameZodiacNext}`)} class="block p-4 bg-white rounded-lg hover:bg-slate-50 transition border border-slate-200 hover:border-[#22215B]/50 shadow-sm text-right">
                            <div class="text-xs text-slate-500 mb-1">{dict.year_page.related_zodiac_next.replace('{zodiac}', zodiac.jyunishi.kana)}</div>
                            <div class="font-bold text-slate-800">{sameZodiacNext}{dict.home.form_year_suffix} ({sameZodiacNext - year}歳) →</div>
                        </a>
                    </section>

                    {/* Footer Navigation */}
                    <div class="mt-8 pt-8 border-t border-slate-200">
                        <h3 class="text-center font-bold text-slate-500 mb-4">{dict.year_page.other_ages_title}</h3>
                        <div class="flex flex-wrap justify-center gap-2">
                            {[10, 20, 30, 40, 50, 60, 70, 80].map(targetAge => (
                                <a href={getLink(`/age/${targetAge}`)} class="px-3 py-1 bg-white border border-slate-300 rounded-full text-[#22215B] text-sm hover:bg-slate-50 transition">
                                    {targetAge}歳
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
