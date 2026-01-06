/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { Layout } from "./components/Layout";
import { DrumPicker } from "./components/DrumPicker";
import { TriviaCard } from "./components/TriviaCard";
import { YearPage } from "./components/YearPage";
import { YearIndex } from "./components/YearIndex";
import { getEra } from "./utils/era";
import { calculateResume } from "./utils/resume";
import { HISTORY_TIMELINE } from "./const/historyTimeline";

type Trivia = {
    events: string[];
    hitSongs: string[];
};

const app = new Hono();

// Constants
const INITIAL_YEAR = 1989;
const START_YEAR = 1900; // Expanded to 1900 as per request
const END_YEAR = 2100;   // Expanded to 2100 as per request
const CURRENT_YEAR = new Date().getFullYear();

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

// --- Routes ---

// 1. Top Page
app.get("/", async (c) => {
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
        <Layout title="年号マスター - 西暦和暦・年齢その場変換">
            <div class="flex-1 w-full relative overflow-y-auto bg-slate-50">
                <div class="min-h-full flex flex-col items-center justify-start pt-8 pb-4 px-4">

                    {/* Navigation to Hub */}
                    <div class="mb-4 text-sm text-[#22215B] font-bold underline hover:opacity-80">
                        <a href="/years">年表一覧から探す</a>
                    </div>

                    {/* Main Input Triggers */}
                    <div class="w-full max-w-3xl mb-6 flex flex-col sm:flex-row gap-2 items-center">
                        {/* AD Trigger */}
                        <div id="trigger-ad" class="flex-1 w-full sm:w-auto min-w-[240px] bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:border-[#22215B] hover:shadow-md transition-all active:scale-95 group relative overflow-hidden">
                            <label class="block text-xs font-bold text-slate-400 mb-1">西暦</label>
                            <div class="flex justify-between items-end">
                                <div id="display-ad" class="text-2xl font-bold text-slate-800">{INITIAL_YEAR}年</div>
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
                            <label class="block text-xs font-bold text-slate-400 mb-1">和暦</label>
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
                        <TriviaCard trivia={initialData.trivia} era={initialData.era} />
                    </div>

                    {/* Resume Calculator */}
                    <div class="w-full max-w-3xl bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 class="text-center font-bold text-slate-700 mb-2 flex items-center justify-center gap-2 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            入学・卒業年度 自動計算
                        </h3>
                        <p class="text-xs text-center text-slate-500 mb-4">生まれ年を入力すると、入学・卒業年度を自動で計算します。</p>
                        <form class="flex flex-col gap-3" onsubmit="event.preventDefault(); calculateResume();">
                            <div class="flex gap-4">
                                <div class="flex-1">
                                    <label for="birthYear" class="block text-xs font-bold text-slate-400 mb-1 pl-1">生まれ年 (西暦)</label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" id="birthYear" placeholder="2000" class="w-full p-3 border border-slate-300 rounded-lg shadow-inner focus:ring-2 focus:ring-[#22215B] focus:border-[#22215B] focus:outline-none transition bg-white" required min="1900" max="2100" />
                                        <span class="text-slate-500 font-bold whitespace-nowrap">年</span>
                                    </div>
                                </div>
                                <div class="flex-none flex items-end pb-1">
                                    <label class="flex items-center gap-2 cursor-pointer bg-white px-3 py-3 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition select-none h-[50px]">
                                        <input type="checkbox" id="earlyBirthday" class="w-5 h-5 text-[#22215B] rounded focus:ring-[#22215B] border-slate-300" />
                                        <span class="text-sm font-bold text-slate-700">早生まれ <span class="text-xs text-slate-400 font-normal">(1/1〜4/1)</span></span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-[#22215B] text-white font-bold py-3 rounded-lg hover:opacity-90 active:transform active:scale-95 transition shadow-lg">
                                計算する
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
                                <h2 class="font-bold text-slate-700">西暦を選択</h2>
                                <button id="close-ad" class="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-gray-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="ad" id="picker-ad" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} />
                            </div>
                        </div>
                    </div>

                    <div id="modal-era" class="fixed inset-0 z-50 hidden transition-all duration-300 opacity-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center">
                        <div class="w-full max-w-lg sm:max-w-2xl sm:min-w-[600px] bg-slate-50 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transform transition-transform translate-y-full sm:translate-y-0 sm:scale-95 duration-300 h-[70vh] sm:h-[600px]" id="modal-content-era">
                            <div class="p-4 bg-white border-b border-slate-200 flex justify-between items-center z-50 shadow-sm flex-shrink-0 relative">
                                <h2 class="font-bold text-slate-700">和暦を選択</h2>
                                <button id="close-era" class="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-slate-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="era" id="picker-era" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} />
                            </div>
                        </div>
                    </div>

                    <script src="/client.js"></script>
                </div>
            </div>
        </Layout>
    );
    return c.html(content.toString());
});

// 2. Hub Page
app.get("/years", (c) => {
    return c.html((<YearIndex startYear={START_YEAR} endYear={END_YEAR} />).toString());
});

// 3. Year Page
app.get("/year/:year", async (c) => {
    const year = parseInt(c.req.param("year"));
    if (isNaN(year) || year < START_YEAR || year > END_YEAR) {
        return c.redirect("/");
    }

    const era = getEra(year);
    const trivia = getTrivia(year);

    return c.html(
        (<YearPage
            year={year}
            currentYear={CURRENT_YEAR}
            era={era}
            trivia={trivia}
        />).toString()
    );
});

// 4. Age Page
app.get("/age/:age", async (c) => {
    const age = parseInt(c.req.param("age"));
    if (isNaN(age) || age < 0 || age > 120) {
        return c.redirect("/");
    }

    // Calculate birth year from age
    const birthYear = CURRENT_YEAR - age;

    // Check bounds
    if (birthYear < START_YEAR || birthYear > END_YEAR) {
        return c.redirect("/");
    }

    const era = getEra(birthYear);
    const trivia = getTrivia(birthYear);

    return c.html(
        (<YearPage
            year={birthYear}
            currentYear={CURRENT_YEAR}
            era={era}
            trivia={trivia}
        />).toString()
    );
});

// 5. Relative Pages
app.get("/this-year", (c) => c.redirect(`/year/${CURRENT_YEAR}`));
app.get("/next-year", (c) => c.redirect(`/year/${CURRENT_YEAR + 1}`));
app.get("/last-year", (c) => c.redirect(`/year/${CURRENT_YEAR - 1}`));

// 6. Sitemap
app.get("/sitemap.xml", (c) => {
    const baseUrl = new URL(c.req.url).origin;

    let urls = "";

    // Root
    urls += `
    <url>
        <loc>${baseUrl}/</loc>
        <priority>1.0</priority>
        <changefreq>daily</changefreq>
    </url>`;

    // Hub
    urls += `
    <url>
        <loc>${baseUrl}/years</loc>
        <priority>0.8</priority>
        <changefreq>weekly</changefreq>
    </url>`;

    // Years
    for (let y = START_YEAR; y <= END_YEAR; y++) {
        urls += `
    <url>
        <loc>${baseUrl}/year/${y}</loc>
        <priority>0.7</priority>
        <changefreq>monthly</changefreq>
    </url>`;
    }

    // Ages
    for (let age = 0; age <= 100; age++) {
        urls += `
    <url>
        <loc>${baseUrl}/age/${age}</loc>
        <priority>0.6</priority>
        <changefreq>yearly</changefreq>
    </url>`;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return c.body(sitemap, 200, {
        "Content-Type": "application/xml"
    });
});


// API: Trivia
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
