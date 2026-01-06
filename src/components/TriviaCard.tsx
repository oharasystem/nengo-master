import { html } from "hono/html";
import { type Translations } from "../locales";

type Props = {
  trivia?: { events: string[]; hitSongs: string[] };
  era?: string;
  t?: Translations;
};

export const TriviaCard = (props: Props) => {
  const events = props.trivia?.events || [];
  const hitSongs = props.trivia?.hitSongs || [];
  const t = props.t;

  // Use translations if available, fallback to Japanese
  const eventsTitle = t?.triviaEvents || "その年の出来事";
  const songsTitle = t?.triviaHitSongs || "その年のヒット曲";

  return html`
    <div id="trivia-container" class="w-full mt-6" data-i18n-events="${eventsTitle}" data-i18n-songs="${songsTitle}">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-teal-100 text-teal-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">📅</span>
            <h3 class="font-bold text-xl text-slate-800">${eventsTitle}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${events.length > 0 ? events.map((e) => html`<li>${e}</li>`) : html`<li class="list-none text-slate-400">---</li>`}
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-pink-100 text-pink-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">🎵</span>
            <h3 class="font-bold text-xl text-slate-800">${songsTitle}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${hitSongs.length > 0 ? hitSongs.map((s) => html`<li>${s}</li>`) : html`<li class="list-none text-slate-400">---</li>`}
        </ul>
      </div>
    </div>
  `;
};
