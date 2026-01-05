/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import { Layout } from "./components/Layout";
import { DrumPicker } from "./components/DrumPicker";
import { TriviaCard } from "./components/TriviaCard";
import { YearPage } from "./components/YearPage";
import { YearIndex } from "./components/YearIndex";
import { getEra } from "./utils/era";
import { calculateResume } from "./utils/resume";

type Bindings = {
    DB: D1Database;
};

type Trivia = {
    highlight_event?: string;
    hit_song?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Constants
const INITIAL_YEAR = 1989;
const START_YEAR = 1900; // Expanded to 1900 as per request
const END_YEAR = 2100;   // Expanded to 2100 as per request
const CURRENT_YEAR = new Date().getFullYear();

// --- Helpers ---
async function getTrivia(db: D1Database, year: number): Promise<Trivia> {
    try {
        const { results } = await db.prepare(
            "SELECT * FROM year_trivia WHERE year_ad = ?"
        )
            .bind(year)
            .all();
        return (results && results.length > 0 ? results[0] : {}) as Trivia;
    } catch (e) {
        console.error("DB Error:", e);
        return {};
    }
}

// --- Routes ---

// 1. Top Page
app.get("/", async (c) => {
    // Fetch initial trivia for SSR
    let initialData: { era: string; trivia: Trivia } = { era: "", trivia: {} };
    try {
        const trivia = await getTrivia(c.env.DB, INITIAL_YEAR);
        initialData = {
            era: getEra(INITIAL_YEAR),
            trivia: trivia,
        };
        // Fallback checks
        if (!initialData.trivia.highlight_event) {
            initialData.trivia = { highlight_event: "データなし", hit_song: "データなし" };
        }
    } catch (e) {
        console.error("DB Error:", e);
        initialData = { era: getEra(INITIAL_YEAR), trivia: { highlight_event: "DB Error", hit_song: "DB Error" } };
    }

    const content = (
        <Layout title="年号マスター - 西暦和暦・年齢その場変換">
            <div class="flex-1 w-full relative overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
                <div class="min-h-full flex flex-col items-center justify-start pt-8 pb-4 px-4">

                    {/* Navigation to Hub */}
                    <div class="mb-4 text-sm text-indigo-600 font-bold underline">
                        <a href="/years">年表一覧から探す</a>
                    </div>

                    {/* Main Input Triggers */}
                    <div class="w-full max-w-3xl mb-6 flex flex-col sm:flex-row gap-2 items-center">
                        {/* AD Trigger */}
                        <div id="trigger-ad" class="flex-1 w-full sm:w-auto min-w-[240px] bg-white p-4 rounded-xl shadow-md border-2 border-indigo-50 cursor-pointer hover:border-indigo-400 transition-all active:scale-95 group relative overflow-hidden">
                            <label class="block text-xs font-bold text-gray-400 mb-1">西暦</label>
                            <div class="flex justify-between items-end">
                                <div id="display-ad" class="text-2xl font-bold text-gray-800">{INITIAL_YEAR}年</div>
                                <div class="text-indigo-300 group-hover:text-indigo-500 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Converter Icon */}
                        <div class="text-indigo-200 flex-shrink-0 animate-pulse rotate-90 sm:rotate-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>

                        {/* Era Trigger */}
                        <div id="trigger-era" class="flex-1 w-full sm:w-auto min-w-[240px] bg-white p-4 rounded-xl shadow-md border-2 border-orange-50 cursor-pointer hover:border-orange-400 transition-all active:scale-95 group relative overflow-hidden">
                            <label class="block text-xs font-bold text-gray-400 mb-1">和暦</label>
                            <div class="flex justify-between items-end">
                                <div id="display-era" class="text-xl font-bold text-gray-800">{initialData.era}</div>
                                <div class="text-orange-300 group-hover:text-orange-500 mb-1">
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
                    <div class="w-full max-w-3xl bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                        <h3 class="text-center font-bold text-gray-700 mb-2 flex items-center justify-center gap-2 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            入学・卒業年度 自動計算
                        </h3>
                        <p class="text-xs text-center text-gray-500 mb-4">生まれ年を入力すると、入学・卒業年度を自動で計算します。</p>
                        <form class="flex flex-col gap-3" onsubmit="event.preventDefault(); calculateResume();">
                            <div class="flex gap-4">
                                <div class="flex-1">
                                    <label for="birthYear" class="block text-xs font-bold text-gray-400 mb-1 pl-1">生まれ年 (西暦)</label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" id="birthYear" placeholder="2000" class="w-full p-3 border rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none transition bg-white" required min="1900" max="2100" />
                                        <span class="text-gray-500 font-bold whitespace-nowrap">年</span>
                                    </div>
                                </div>
                                <div class="flex-none flex items-end pb-1">
                                    <label class="flex items-center gap-2 cursor-pointer bg-white px-3 py-3 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition select-none h-[50px]">
                                        <input type="checkbox" id="earlyBirthday" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                                        <span class="text-sm font-bold text-gray-700">早生まれ <span class="text-xs text-gray-400 font-normal">(1/1〜4/1)</span></span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 active:transform active:scale-95 transition shadow-indigo-200 shadow-lg">
                                計算する
                            </button>
                        </form>
                        <div id="resume-result" class="mt-4 hidden bg-white p-4 rounded-lg shadow border border-gray-100">
                            <ul class="text-left text-sm space-y-2" id="resume-list"></ul>
                        </div>
                    </div>

                    {/* Modals and Scripts */}
                    <div id="modal-ad" class="fixed inset-0 z-50 hidden transition-all duration-300 opacity-0 bg-gray-900/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center">
                        <div class="w-full max-w-lg sm:max-w-2xl sm:min-w-[600px] bg-gray-50 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-transform translate-y-full sm:translate-y-0 sm:scale-95 duration-300 h-[70vh] sm:h-[600px]" id="modal-content-ad">
                            <div class="p-4 bg-white border-b flex justify-between items-center z-50 shadow-md flex-shrink-0 relative">
                                <h2 class="font-bold text-gray-700">西暦を選択</h2>
                                <button id="close-ad" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-gray-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="ad" id="picker-ad" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} />
                            </div>
                        </div>
                    </div>

                    <div id="modal-era" class="fixed inset-0 z-50 hidden transition-all duration-300 opacity-0 bg-gray-900/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center">
                        <div class="w-full max-w-lg sm:max-w-2xl sm:min-w-[600px] bg-gray-50 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-transform translate-y-full sm:translate-y-0 sm:scale-95 duration-300 h-[70vh] sm:h-[600px]" id="modal-content-era">
                            <div class="p-4 bg-white border-b flex justify-between items-center z-50 shadow-md flex-shrink-0 relative">
                                <h2 class="font-bold text-gray-700">和暦を選択</h2>
                                <button id="close-era" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div class="flex-1 p-0 bg-gray-50 z-0 relative min-h-0 overflow-x-hidden">
                                <DrumPicker mode="era" id="picker-era" startYear={1926} endYear={2026} initialYear={INITIAL_YEAR} />
                            </div>
                        </div>
                    </div>

                    <script dangerouslySetInnerHTML={{
                        __html: `
            function calculateResume() {
                const year = document.getElementById('birthYear').value;
                const isEarly = document.getElementById('earlyBirthday').checked;
                
                if (!year) return;
                
                // 早生まれなら1月1日(前年度扱い)、そうでなければ5月1日(今年度扱い)として計算
                const month = isEarly ? '01' : '05';
                const birthDate = year + '-' + month + '-01';
                fetch('/api/calculate/resume', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ birthDate })
                })
                .then(res => res.json())
                .then(data => {
                    const list = document.getElementById('resume-list');
                    list.innerHTML = '';
                    data.forEach(item => {
                        const li = document.createElement('li');
                        li.className = 'flex justify-between border-b border-gray-100 pb-2 last:border-0';
                        li.innerHTML = \`<span class="font-bold text-gray-600">\${item.label}</span> <span class="text-indigo-600 font-mono">\${item.year}年\${item.month}月</span>\`;
                        list.appendChild(li);
                    });
                    document.getElementById('resume-result').classList.remove('hidden');
                });
            }
        ` }} />
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
    const trivia = await getTrivia(c.env.DB, year);

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
    const trivia = await getTrivia(c.env.DB, birthYear);

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
    if (isNaN(year)) return c.json({ error: "Invalid year" }, 400);

    const era = getEra(year);
    const trivia = await getTrivia(c.env.DB, year);
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
    if (!birthDate) return c.json({ error: "birthDate required" }, 400);

    const result = calculateResume(birthDate);
    return c.json(result);
});

export default app;
