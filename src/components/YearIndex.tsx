import { Layout } from "./Layout";
import { getZodiac } from "../utils/zodiac";
import { getEra } from "../utils/era";
import {
  type SupportedLanguage,
  type Translations,
  DEFAULT_LANGUAGE,
  buildLocalizedUrl,
} from "../locales";

type Props = {
  startYear: number;
  endYear: number;
  lang?: SupportedLanguage;
  t?: Translations;
};

export const YearIndex = ({ startYear, endYear, lang, t }: Props) => {
  const currentLang = lang || DEFAULT_LANGUAGE;
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const lastYear = currentYear - 1;

  // Use translations with fallbacks
  const yearSuffix = t?.yearSuffix ?? "年";

  // Define Era Ranges (approximate for list grouping)
  const futureYears: number[] = [];
  const reiwaYears: number[] = [];
  const heiseiYears: number[] = [];
  const showaYears: number[] = [];
  const preShowaYears: number[] = [];

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

  const formatYear = (y: number) => (yearSuffix ? `${y}${yearSuffix}` : `${y}`);

  const YearGrid = ({ years }: { years: number[] }) => {
    if (years.length === 0) return <div class="text-slate-400 text-sm">{t?.noYearsFound || "該当する年がありません"}</div>;
    return (
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {years.map((year) => {
          const era = getEra(year);
          const zodiac = getZodiac(year);
          return (
            <a
              href={buildLocalizedUrl(`/year/${year}`, currentLang)}
              class="block bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-slate-100 hover:border-[#22215B] hover:shadow-md transition text-center group"
            >
              <div class="text-base sm:text-lg font-bold text-[#22215B] group-hover:opacity-80">{formatYear(year)}</div>
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
    <Layout
      title={t?.yearIndexTitle || "年号・西暦・年齢早見表一覧"}
      description={t?.siteDescription || "1900年から2100年までの各年の年齢、干支、厄年、出来事がわかる一覧ページです。"}
      lang={currentLang}
      t={t}
      currentPath="/years"
    >
      <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
        <div class="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8 pb-16">
          <header class="text-center pt-4">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">{t?.yearIndexTitle || "年号・西暦一覧"}</h1>
            <p class="text-sm text-slate-500 mt-2">{t?.yearIndexSubtitle || "調べたい年を選択してください"}</p>
          </header>

          {/* Hero: Quick Access */}
          <section class="max-w-3xl mx-auto w-full">
            <div class="grid grid-cols-3 gap-4">
              <a
                href={buildLocalizedUrl(`/year/${lastYear}`, currentLang)}
                class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-slate-200 hover:border-[#22215B] hover:bg-slate-50 transition"
              >
                <span class="text-xs font-bold text-slate-500 mb-1">{t?.lastYear || "去年"}</span>
                <span class="text-xl font-bold text-slate-800">{formatYear(lastYear)}</span>
              </a>
              <a
                href={buildLocalizedUrl(`/year/${currentYear}`, currentLang)}
                class="flex flex-col items-center justify-center bg-[#22215B] text-white p-4 rounded-xl shadow-lg ring-4 ring-[#22215B]/20 hover:opacity-90 transition transform hover:-translate-y-1"
              >
                <span class="text-xs font-bold text-slate-100 mb-1">{t?.thisYear || "今年"}</span>
                <span class="text-2xl font-extrabold">{formatYear(currentYear)}</span>
              </a>
              <a
                href={buildLocalizedUrl(`/year/${nextYear}`, currentLang)}
                class="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow border border-slate-200 hover:border-[#22215B] hover:bg-slate-50 transition"
              >
                <span class="text-xs font-bold text-slate-500 mb-1">{t?.nextYear || "来年"}</span>
                <span class="text-xl font-bold text-slate-800">{formatYear(nextYear)}</span>
              </a>
            </div>
          </section>

          {/* Main Area: Eras */}
          <div class="space-y-8">
            {/* Reiwa */}
            <section>
              <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                <h2 class="text-xl font-bold text-slate-800">
                  令和 <span class="text-sm font-normal text-slate-500">(2019〜)</span>
                </h2>
              </div>
              <YearGrid years={reiwaYears} />
            </section>

            {/* Heisei */}
            <section>
              <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                <h2 class="text-xl font-bold text-slate-800">
                  平成 <span class="text-sm font-normal text-slate-500">(1989〜2019)</span>
                </h2>
              </div>
              <YearGrid years={heiseiYears} />
            </section>

            {/* Showa */}
            <section>
              <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                <h2 class="text-xl font-bold text-slate-800">
                  昭和 <span class="text-sm font-normal text-slate-500">(1926〜1989)</span>
                </h2>
              </div>
              <YearGrid years={showaYears} />
            </section>

            {/* Pre-Showa */}
            <section>
              <div class="flex items-baseline gap-2 mb-3 px-1 border-b pb-2 border-slate-200">
                <h2 class="text-xl font-bold text-slate-800">
                  明治・大正 <span class="text-sm font-normal text-slate-500">(〜1926)</span>
                </h2>
              </div>
              <YearGrid years={preShowaYears} />
            </section>
          </div>

          {/* Future Section (Accordion) */}
          {futureYears.length > 0 && (
            <section class="mt-8 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
              <details class="group">
                <summary class="flex justify-between items-center font-bold font-lg p-4 cursor-pointer hover:bg-slate-100 text-[#22215B]">
                  <span>
                    🔮 {t?.futureYears || "未来の年表"}{" "}
                    <span class="text-sm font-normal ml-2">
                      ({currentYear + 1}〜{endYear})
                    </span>
                  </span>
                  <span class="text-[#22215B] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div class="p-4 pt-0 border-t border-slate-200">
                  <p class="text-sm text-slate-500 py-3">{t?.futureYearsNote || "※現在より先の年は「未来の出来事」として表示されます。"}</p>
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
