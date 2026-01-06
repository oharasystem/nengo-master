import { Layout } from "./Layout";
import { TriviaCard } from "./TriviaCard";
import { getZodiac } from "../utils/zodiac";
import { getYakudoshi } from "../utils/yakudoshi";
import { calculateResume } from "../utils/resume";
import {
  type SupportedLanguage,
  type Translations,
  DEFAULT_LANGUAGE,
  buildLocalizedUrl,
} from "../locales";

type Props = {
  year: number;
  currentYear: number;
  era: string; // "平成元年" etc.
  trivia: {
    events: string[];
    hitSongs: string[];
  };
  lang?: SupportedLanguage;
  t?: Translations;
};

export const YearPage = (props: Props) => {
  const { year, currentYear, era, trivia, t } = props;
  const lang = props.lang || DEFAULT_LANGUAGE;
  const age = currentYear - year;
  const zodiac = getZodiac(year);
  const yakudoshi = getYakudoshi(year, currentYear);
  const resume = calculateResume(`${year}-04-02`);

  // Links (with language prefix)
  const prevYear = year - 1;
  const nextYear = year + 1;
  const sameZodiacPrev = year - 12;
  const sameZodiacNext = year + 12;

  // Use translations with fallbacks
  const yearSuffix = t?.yearSuffix ?? "年";
  const ageSuffix = t?.ageSuffix ?? "歳";
  const monthSuffix = t?.monthSuffix ?? "月";

  const title = `${year}${yearSuffix}（${era}）${t?.yearPageTitleSuffix || "生まれ - 年齢・厄年・早見表"}`;
  const description =
    lang === DEFAULT_LANGUAGE
      ? `${year}年（${era}）生まれの人の現在の年齢は${age}歳です。干支は${zodiac.kanji}（${zodiac.jyunishi.kana}）です。入学・卒業年度、厄年の確認、当時の出来事やヒット曲も振り返ります。`
      : t?.siteDescription || "";

  // JSON-LD (keep in Japanese for SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${year}年`,
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
    description: `${year}年の出来事: ${trivia.events.join(", ") || "情報なし"}`,
    performer: {
      "@type": "Person",
      name: `${year}年生まれの人`,
      description: `${year}年生まれの人は現在${age}歳`,
    },
  };

  // Current path for language switcher
  const currentPath = `/year/${year}`;

  // Format year with suffix based on language
  const formatYear = (y: number) => (yearSuffix ? `${y}${yearSuffix}` : `${y}`);
  const formatAge = (a: number) => `${a}${ageSuffix}`;
  const formatDate = (y: number, m: number) =>
    monthSuffix === "/" ? `${y}/${m}` : `${y}${yearSuffix}${m}${monthSuffix}`;

  return (
    <Layout title={title} description={description} lang={lang} t={t} currentPath={currentPath}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
        <div class="w-full max-w-4xl mx-auto p-4 flex flex-col gap-8">
          {/* Header */}
          <header class="text-center py-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
              <span class="text-[#22215B]">{formatYear(year)}</span>
              <span class="text-lg sm:text-2xl font-normal text-slate-600 ml-2">({era})</span>
            </h1>
            <p class="text-lg font-bold text-slate-700 mb-2">{t?.bornInYear || "生まれの方の年齢"}</p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 text-slate-700 font-bold mb-4">
              <div class="bg-slate-100 px-4 py-2 rounded-lg">
                <span class="text-sm text-slate-500 block">{t?.beforeBirthday || "誕生日前"}</span>
                <span class="text-2xl text-[#22215B]">{age - 1}</span> {ageSuffix}
              </div>
              <div class="hidden sm:block text-slate-300">|</div>
              <div class="bg-slate-100 px-4 py-2 rounded-lg">
                <span class="text-sm text-slate-500 block">{t?.afterBirthday || "誕生日後"}</span>
                <span class="text-2xl text-[#22215B]">{age}</span> {ageSuffix}
              </div>
            </div>
            <div class="mt-2 text-slate-500 font-bold">
              {t?.zodiacLabel || "干支"}: <span class="text-slate-800">{zodiac.kanji} ({zodiac.jyunishi.kana})</span>{" "}
              {zodiac.jyunishi.emoji}
            </div>
          </header>

          {/* Navigation (Top) */}
          <nav class="flex justify-between text-sm sm:text-base font-bold text-[#22215B]">
            <a href={buildLocalizedUrl(`/year/${prevYear}`, lang)} class="hover:underline">
              ← {formatYear(prevYear)}
            </a>
            <a href={buildLocalizedUrl("/years", lang)} class="hover:underline">
              {t?.navYearListShort || "年表一覧"}
            </a>
            <a href={buildLocalizedUrl(`/year/${nextYear}`, lang)} class="hover:underline">
              {formatYear(nextYear)} →
            </a>
          </nav>

          {/* Yakudoshi Check */}
          <section class="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <div class="flex items-center gap-2 mb-4">
              <span class="bg-orange-100 text-orange-600 p-2 rounded-full">⚡</span>
              <h2 class="font-bold text-xl text-slate-800">
                {t?.yakudoshiTitle || "今年の厄年チェック"}{" "}
                <span class="text-sm font-normal text-slate-500">{t?.yakudoshiNote || "（数え年）"}</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Male */}
              <div
                class={`p-4 rounded-lg border-2 ${yakudoshi.male ? "border-red-400 bg-red-50" : "border-slate-100 bg-slate-50"}`}
              >
                <h3 class="font-bold text-center text-slate-700 mb-2">{t?.yakudoshiMale || "男性"}</h3>
                {yakudoshi.male ? (
                  <div class="text-center">
                    <div class="text-2xl font-extrabold text-red-600 mb-1">{yakudoshi.male.label}</div>
                    <div class="text-sm text-slate-600">
                      {t?.yakudoshiAge || "数え年"}: {yakudoshi.male.age}
                      {ageSuffix}
                    </div>
                    <div class="text-xs text-red-500 font-bold mt-2">{t?.yakudoshiWarning || "ご注意ください"}</div>
                  </div>
                ) : (
                  <div class="text-center py-4 text-slate-400 font-bold">{t?.yakudoshiNot || "厄年ではありません"}</div>
                )}
              </div>

              {/* Female */}
              <div
                class={`p-4 rounded-lg border-2 ${yakudoshi.female ? "border-red-400 bg-red-50" : "border-slate-100 bg-slate-50"}`}
              >
                <h3 class="font-bold text-center text-slate-700 mb-2">{t?.yakudoshiFemale || "女性"}</h3>
                {yakudoshi.female ? (
                  <div class="text-center">
                    <div class="text-2xl font-extrabold text-red-600 mb-1">{yakudoshi.female.label}</div>
                    <div class="text-sm text-slate-600">
                      {t?.yakudoshiAge || "数え年"}: {yakudoshi.female.age}
                      {ageSuffix}
                    </div>
                    <div class="text-xs text-red-500 font-bold mt-2">{t?.yakudoshiWarning || "ご注意ください"}</div>
                  </div>
                ) : (
                  <div class="text-center py-4 text-slate-400 font-bold">{t?.yakudoshiNot || "厄年ではありません"}</div>
                )}
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-4 text-center">{t?.yakudoshiFootnote || "※厄年は「数え年（生まれた時を1歳とし、元旦に加齢）」で計算しています。"}</p>
          </section>

          {/* Trivia */}
          <section>
            <TriviaCard trivia={trivia} era={era} t={t} />
          </section>

          {/* Resume (School History) */}
          <section class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div class="flex items-center gap-2">
                <span class="bg-slate-100 text-[#22215B] p-2 rounded-full">🎓</span>
                <h2 class="font-bold text-xl text-slate-800">
                  {t?.resumeTableTitle || "入学・卒業年度早見表"}{" "}
                  <span class="text-sm font-normal text-slate-500">{t?.resumeTableNote || "（ストレート合格の場合）"}</span>
                </h2>
              </div>

              {/* Early Birthday Toggle */}
              <label class="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition select-none">
                <input
                  type="checkbox"
                  id="earlyBirthdayToggle"
                  class="w-4 h-4 text-[#22215B] rounded focus:ring-[#22215B] border-slate-300"
                />
                <span class="text-sm font-bold text-slate-700">
                  {t?.earlyBirthdayLabel || "早生まれ"}{" "}
                  <span class="text-xs text-slate-400 font-normal">{t?.earlyBirthdayNote || "(1/1〜4/1)"}</span>
                </span>
              </label>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-slate-600" id="resumeTable" data-year-suffix={yearSuffix} data-age-suffix={ageSuffix} data-month-suffix={monthSuffix}>
                <thead class="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th class="px-4 py-3 rounded-l-lg">{t?.tableHeaderCategory || "区分"}</th>
                    <th class="px-4 py-3">{t?.tableHeaderDate || "年月"}</th>
                    <th class="px-4 py-3 rounded-r-lg">{t?.tableHeaderAge || "年齢"}</th>
                  </tr>
                </thead>
                <tbody>
                  {resume.map((item, index) => (
                    <tr
                      key={index}
                      class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                      data-original-year={item.year}
                      data-original-month={item.month}
                      data-label={item.label}
                    >
                      <td class="px-4 py-3 font-bold text-slate-800">{item.label}</td>
                      <td class="px-4 py-3 font-mono text-[#22215B] resume-date">{formatDate(item.year, item.month)}</td>
                      <td class="px-4 py-3 text-slate-500 resume-age">{formatAge(item.year - year)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                            document.getElementById('earlyBirthdayToggle').addEventListener('change', function(e) {
                                const isEarly = e.target.checked;
                                const rows = document.querySelectorAll('#resumeTable tbody tr');
                                const birthYear = ${year};
                                const table = document.getElementById('resumeTable');
                                const yearSuffix = table.dataset.yearSuffix || '年';
                                const ageSuffix = table.dataset.ageSuffix || '歳';
                                const monthSuffix = table.dataset.monthSuffix || '月';
                                
                                rows.forEach(row => {
                                    const label = row.dataset.label;
                                    const originalYear = parseInt(row.dataset.originalYear);
                                    const month = parseInt(row.dataset.originalMonth);
                                    
                                    if (label === '生まれ') return; 

                                    const adjustedYear = isEarly ? originalYear - 1 : originalYear;
                                    const adjustedAge = adjustedYear - birthYear;
                                    
                                    if (monthSuffix === '/') {
                                        row.querySelector('.resume-date').textContent = adjustedYear + '/' + month;
                                    } else {
                                        row.querySelector('.resume-date').textContent = adjustedYear + yearSuffix + month + monthSuffix;
                                    }
                                    row.querySelector('.resume-age').textContent = adjustedAge + ageSuffix;
                                });
                            });
                        `,
              }}
            />
          </section>

          {/* Related Links */}
          <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={buildLocalizedUrl(`/year/${sameZodiacPrev}`, lang)}
              class="block p-4 bg-white rounded-lg hover:bg-slate-50 transition border border-slate-200 hover:border-[#22215B]/50 shadow-sm"
            >
              <div class="text-xs text-slate-500 mb-1">
                {t?.sameZodiacYear || "同じ干支"}（{zodiac.jyunishi.kana}）{t?.sameZodiacYearNote || "の年"}
              </div>
              <div class="font-bold text-slate-800">
                ← {formatYear(sameZodiacPrev)} ({sameZodiacPrev - year}
                {ageSuffix})
              </div>
            </a>
            <a
              href={buildLocalizedUrl(`/year/${sameZodiacNext}`, lang)}
              class="block p-4 bg-white rounded-lg hover:bg-slate-50 transition border border-slate-200 hover:border-[#22215B]/50 shadow-sm text-right"
            >
              <div class="text-xs text-slate-500 mb-1">
                {t?.sameZodiacYear || "同じ干支"}（{zodiac.jyunishi.kana}）{t?.sameZodiacYearNote || "の年"}
              </div>
              <div class="font-bold text-slate-800">
                {formatYear(sameZodiacNext)} ({sameZodiacNext - year}
                {ageSuffix}) →
              </div>
            </a>
          </section>

          {/* Footer Navigation */}
          <div class="mt-8 pt-8 border-t border-slate-200">
            <h3 class="text-center font-bold text-slate-500 mb-4">{t?.navSearchOtherAge || "他の年齢を調べる"}</h3>
            <div class="flex flex-wrap justify-center gap-2">
              {[10, 20, 30, 40, 50, 60, 70, 80].map((targetAge) => (
                <a
                  href={buildLocalizedUrl(`/age/${targetAge}`, lang)}
                  class="px-3 py-1 bg-white border border-slate-300 rounded-full text-[#22215B] text-sm hover:bg-slate-50 transition"
                >
                  {targetAge}
                  {ageSuffix}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
