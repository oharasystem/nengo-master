/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { Layout } from "./components/Layout";
import { DrumPicker } from "./components/DrumPicker";
import { TriviaCard } from "./components/TriviaCard";
import { YearPage } from "./components/YearPage";
import { YearIndex } from "./components/YearIndex";
import { PrivacyPage } from "./components/PrivacyPage";
import { ContactPage } from "./components/ContactPage";
import { getEra } from "./utils/era";
import { calculateResume } from "./utils/resume";
import { HISTORY_TIMELINE } from "./const/historyTimeline";

// Locales
import ja from "./locales/ja";
import en from "./locales/en";
import zh from "./locales/zh";
import vi from "./locales/vi";
import ko from "./locales/ko";
import pt from "./locales/pt";
import es from "./locales/es";
import { Translation } from "./locales/types";

type Trivia = {
    events: string[];
    hitSongs: string[];
};

const app = new Hono();

// Constants
const INITIAL_YEAR = 1989;
const START_YEAR = 1900;
const END_YEAR = 2100;
// Helper to get current year at request time (not build time)
// In Cloudflare Workers, top-level code is evaluated at deploy time and cached
function getCurrentYear(): number {
    return new Date().getFullYear();
}

// Dictionary Map
const dictionaries: Record<string, Translation> = {
    ja,
    en,
    zh,
    vi,
    ko,
    pt,
    es,
};

// Supported Languages for Routing
const SUPPORTED_LANGS = ['en', 'zh', 'vi', 'ko', 'pt', 'es']; // 'ja' is default (root)

// Helper to get dictionary from lang code
function getDict(lang: string = 'ja'): Translation {
    return dictionaries[lang] || dictionaries['ja'];
}

function getLangFromPath(path: string): string {
    const segments = path.split('/');
    // path starts with / so segments[0] is empty. segments[1] might be lang.
    const potentialLang = segments[1];
    if (SUPPORTED_LANGS.includes(potentialLang)) {
        return potentialLang;
    }
    return 'ja';
}

// --- Helpers ---
function getTrivia(year: number): Trivia {
    const data = HISTORY_TIMELINE.find(y => y.year === year);
    if (!data) {
        return {
            events: [],
            hitSongs: []
        };
    }
    return {
        events: data.events,
        hitSongs: data.hitSongs
    };
}

// --- Route Handlers ---

// Home Handler
const homeHandler = async (c: any) => {
    // Determine language from route param or default
    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);

    // For "lang" param routes, if an unsupported lang is accessed (though we define routes explicitly), it falls back.
    // However, we only attach this handler to supported paths.

    // Fetch initial trivia for SSR
    let initialData: { era: string; trivia: Trivia } = { era: "", trivia: { events: [], hitSongs: [] } };
    try {
        const trivia = getTrivia(INITIAL_YEAR);
        initialData = {
            era: getEra(INITIAL_YEAR),
            trivia: trivia,
        };
    } catch (e) {
        console.error("Error:", e);
        initialData = { era: getEra(INITIAL_YEAR), trivia: { events: ["Error"], hitSongs: ["Error"] } };
    }

    const content = (
        <Layout title={dict.meta.title} description={dict.meta.description} keywords={dict.meta.keywords} lang={lang} dict={dict} path="/" env={c.env?.ENVIRONMENT}>
            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="min-h-full flex flex-col items-center justify-start pt-8 pb-4 px-4">

                    {/* Navigation to Hub */}
                    <div class="mb-4 text-sm text-[#22215B] font-bold underline hover:opacity-80">
                        <a href={lang === 'ja' ? '/years' : `/${lang}/years`}>{dict.nav.hub}</a>
                    </div>

                    {/* Main Input Triggers */}
                    <div class="w-full max-w-3xl mb-6 flex flex-col sm:flex-row gap-2 items-center">
                        {/* AD Trigger */}
                        <div id="trigger-ad" class="flex-1 w-full sm:w-auto min-w-[240px] bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:border-[#22215B] hover:shadow-md transition-all active:scale-95 group relative overflow-hidden">
                            <label class="block text-xs font-bold text-slate-400 mb-1">{dict.home.label_ad}</label>
                            <div class="flex justify-between items-end">
                                <div id="display-ad" class="text-2xl font-bold text-slate-800">{INITIAL_YEAR}{dict.home.form_year_suffix}</div>
                                <div class="text-slate-300 group-hover:text-[#22215B] mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Converter Icon */}
                        <div class="text-slate-300 flex-shrink-0 animate-pulse rotate-90 sm:rotate-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>

                        {/* Era Trigger */}
                        <div id="trigger-era" class="flex-1 w-full sm:w-auto min-w-[240px] bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:border-[#22215B] hover:shadow-md transition-all active:scale-95 group relative overflow-hidden">
                            <label class="block text-xs font-bold text-slate-400 mb-1">{dict.home.label_era}</label>
                            <div class="flex justify-between items-end">
                                <div id="display-era" class="text-xl font-bold text-slate-800">{initialData.era}</div>
                                <div class="text-slate-300 group-hover:text-[#22215B] mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trivia Card (Main Screen) */}
                    <div class="w-full max-w-3xl mb-8">
                        <TriviaCard trivia={initialData.trivia} era={initialData.era} dict={dict} />
                    </div>

                    {/* Resume Calculator */}
                    <div class="w-full max-w-3xl bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 class="text-center font-bold text-slate-700 mb-2 flex items-center justify-center gap-2 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            {dict.home.calc_title}
                        </h3>
                        <p class="text-xs text-center text-slate-500 mb-4">{dict.home.calc_desc}</p>
                        <form class="flex flex-col gap-3" onsubmit="event.preventDefault(); calculateResume();">
                            <div class="flex gap-4">
                                <div class="flex-1">
                                    <label for="birthYear" class="block text-xs font-bold text-slate-400 mb-1 pl-1">{dict.home.form_year}</label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" id="birthYear" placeholder="2000" class="w-full p-3 border border-slate-300 rounded-lg shadow-inner focus:ring-2 focus:ring-[#22215B] focus:border-[#22215B] focus:outline-none transition bg-white" required min="1900" max="2100" />
                                        <span class="text-slate-500 font-bold whitespace-nowrap">{dict.home.form_year_suffix}</span>
                                    </div>
                                </div>
                                <div class="flex-none flex items-end pb-1">
                                    <label class="flex items-center gap-2 cursor-pointer bg-white px-3 py-3 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition select-none h-[50px]">
                                        <input type="checkbox" id="earlyBirthday" class="w-5 h-5 text-[#22215B] rounded focus:ring-[#22215B] border-slate-300" />
                                        <span class="text-sm font-bold text-slate-700">{dict.home.form_early_bird} <span class="text-xs text-slate-400 font-normal">{dict.home.form_early_bird_desc}</span></span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-[#22215B] text-white font-bold py-3 rounded-lg hover:opacity-90 active:transform active:scale-95 transition shadow-lg">
                                {dict.home.btn_calc}
                            </button>
                        </form>
                        <div id="resume-result" class="mt-4 hidden bg-white p-4 rounded-lg shadow border border-slate-100">
                            <ul class="text-left text-sm space-y-2" id="resume-list"></ul>
                        </div>
                    </div>

                    {/* Modals and Scripts */}
                    <div id="modal-ad" class="fixed inset-0 z-50 hidden transition-all duration-300 opacity-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center">
                        <div class="w-full max-w-lg sm:max-w-2xl sm:min-w-[600px] bg-slate-50 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transform transition-transform translate-y-full sm:translate-y-0 sm:scale-95 duration-300 h-[70vh] sm:h-[600px]" id="modal-content-ad">
                            <div class="p-4 bg-white border-b border-slate-200 flex justify-between items-center z-50 shadow-sm flex-shrink-0 relative">
                                <h2 class="font-bold text-slate-700">{dict.home.modal_ad_title}</h2>
                                <button id="close-ad" class="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-gray-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="ad" id="picker-ad" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} dict={dict} />
                            </div>
                        </div>
                    </div>

                    <div id="modal-era" class="fixed inset-0 z-50 hidden transition-all duration-300 opacity-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center">
                        <div class="w-full max-w-lg sm:max-w-2xl sm:min-w-[600px] bg-slate-50 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transform transition-transform translate-y-full sm:translate-y-0 sm:scale-95 duration-300 h-[70vh] sm:h-[600px]" id="modal-content-era">
                            <div class="p-4 bg-white border-b border-slate-200 flex justify-between items-center z-50 shadow-sm flex-shrink-0 relative">
                                <h2 class="font-bold text-slate-700">{dict.home.modal_era_title}</h2>
                                <button id="close-era" class="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-slate-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="era" id="picker-era" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} dict={dict} />
                            </div>
                        </div>
                    </div>

                    <script src="/client.js"></script>
                </div>
            </div>
        </Layout>
    );
    return c.html(content.toString());
};

const yearsHandler = (c: any) => {
    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);
    return c.html((<YearIndex startYear={START_YEAR} endYear={END_YEAR} lang={lang} dict={dict} path="/years" env={c.env?.ENVIRONMENT} />).toString());
};

const yearDetailHandler = async (c: any) => {
    const year = parseInt(c.req.param("year"));
    if (isNaN(year) || year < START_YEAR || year > END_YEAR) {
        return c.redirect("/");
    }

    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);

    const era = getEra(year);
    const trivia = getTrivia(year);

    return c.html(
        (<YearPage
            year={year}
            currentYear={getCurrentYear()}
            era={era}
            trivia={trivia}
            lang={lang}
            dict={dict}
            path={`/year/${year}`}
            env={c.env?.ENVIRONMENT}
        />).toString()
    );
};

const ageDetailHandler = async (c: any) => {
    const age = parseInt(c.req.param("age"));
    if (isNaN(age) || age < 0 || age > 120) {
        return c.redirect("/");
    }

    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);

    // Calculate birth year from age
    const currentYear = getCurrentYear();
    const birthYear = currentYear - age;

    // Check bounds
    if (birthYear < START_YEAR || birthYear > END_YEAR) {
        return c.redirect("/");
    }

    const era = getEra(birthYear);
    const trivia = getTrivia(birthYear);

    return c.html(
        (<YearPage
            year={birthYear}
            currentYear={currentYear}
            era={era}
            trivia={trivia}
            lang={lang}
            dict={dict}
            path={`/age/${age}`}
            env={c.env?.ENVIRONMENT}
        />).toString()
    );
};

const privacyHandler = (c: any) => {
    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);
    return c.html((<PrivacyPage lang={lang} dict={dict} path="/privacy" env={c.env?.ENVIRONMENT} />).toString());
};

const contactHandler = (c: any) => {
    let lang = c.req.param('lang');
    if (!lang) {
        lang = getLangFromPath(c.req.path);
    }
    const dict = getDict(lang);
    return c.html((<ContactPage lang={lang} dict={dict} path="/contact" env={c.env?.ENVIRONMENT} />).toString());
};

// --- Route Registration ---

// Default (JA)
app.get("/", homeHandler);
app.get("/years", yearsHandler);
app.get("/year/:year", yearDetailHandler);
app.get("/age/:age", ageDetailHandler);
app.get("/privacy", privacyHandler);
app.get("/contact", contactHandler);

// Multi-language routes
SUPPORTED_LANGS.forEach(lang => {
    app.get(`/${lang}`, homeHandler);
    app.get(`/${lang}/`, homeHandler); // trailing slash
    app.get(`/${lang}/years`, yearsHandler);
    app.get(`/${lang}/year/:year`, yearDetailHandler);
    app.get(`/${lang}/age/:age`, ageDetailHandler);
    app.get(`/${lang}/privacy`, privacyHandler);
    app.get(`/${lang}/contact`, contactHandler);
});


// 5. Relative Pages (Redirects)
app.get("/this-year", (c) => c.redirect(`/year/${getCurrentYear()}`));
app.get("/next-year", (c) => c.redirect(`/year/${getCurrentYear() + 1}`));
app.get("/last-year", (c) => c.redirect(`/year/${getCurrentYear() - 1}`));

// 6. Sitemap
app.get("/sitemap.xml", (c) => {
    const baseUrl = new URL(c.req.url).origin;

    let urls = "";

    const generateEntry = (path: string, priority: string, changefreq: string) => {
        // Base JA
        urls += `
    <url>
        <loc>${baseUrl}${path}</loc>
        <priority>${priority}</priority>
        <changefreq>${changefreq}</changefreq>
    </url>`;

        // Langs
        SUPPORTED_LANGS.forEach(l => {
             const p = path === '/' ? `/${l}/` : `/${l}${path}`;
             urls += `
    <url>
        <loc>${baseUrl}${p}</loc>
        <priority>${priority}</priority>
        <changefreq>${changefreq}</changefreq>
    </url>`;
        });
    };

    // Root
    generateEntry("/", "1.0", "daily");

    // Hub
    generateEntry("/years", "0.8", "weekly");

    // Years
    for (let y = START_YEAR; y <= END_YEAR; y++) {
        generateEntry(`/year/${y}`, "0.7", "monthly");
    }

    // Ages
    for (let age = 0; age <= 100; age++) {
        generateEntry(`/age/${age}`, "0.6", "yearly");
    }

    // Privacy & Contact
    generateEntry("/privacy", "0.5", "monthly");
    generateEntry("/contact", "0.5", "monthly");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return c.body(sitemap, 200, {
        "Content-Type": "application/xml"
    });
});


// API: Trivia (Language agnostic for now, returns raw Japanese data)
app.get("/api/trivia/:year", async (c) => {
    const year = parseInt(c.req.param("year"));
    if (isNaN(year) || year < START_YEAR || year > END_YEAR) {
        return c.json({ error: "Invalid year or out of range" }, 400);
    }

    const era = getEra(year);
    const trivia = getTrivia(year);
    return c.json({
        year,
        era,
        trivia,
    });
});

// API: Resume Calculation
app.post("/api/calculate/resume", async (c) => {
    const body = await c.req.json();
    const birthDate = body.birthDate; // YYYY-MM-DD
    if (!birthDate || typeof birthDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
        return c.json({ error: "Invalid birthDate format. Expected YYYY-MM-DD" }, 400);
    }

    const result = calculateResume(birthDate);
    return c.json(result);
});

export default app;
