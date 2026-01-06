import { html } from "hono/html";
import { Translation } from "../locales/types";

export const TriviaCard = (props: { trivia?: { events: string[]; hitSongs: string[] }, era?: string, dict?: Translation }) => {
    const events = props.trivia?.events || [];
    const hitSongs = props.trivia?.hitSongs || [];
    const dict = props.dict;

    // Fallback if dict is not provided (shouldn't happen with correct plumbing)
    const eventsTitle = dict?.trivia.events_title || "その年の出来事";
    const songsTitle = dict?.trivia.songs_title || "その年のヒット曲";
    const emptyText = dict?.trivia.empty || "---";

    return html`
    <div id="trivia-container" class="w-full mt-6">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-teal-100 text-teal-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">📅</span>
            <h3 class="font-bold text-xl text-slate-800">${eventsTitle}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${events.length > 0 ? events.map(e => html`<li>${e}</li>`) : html`<li class="list-none text-slate-400">${emptyText}</li>`}
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-pink-100 text-pink-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">🎵</span>
            <h3 class="font-bold text-xl text-slate-800">${songsTitle}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${hitSongs.length > 0 ? hitSongs.map(s => html`<li>${s}</li>`) : html`<li class="list-none text-slate-400">${emptyText}</li>`}
        </ul>
      </div>
    </div>
  `;
};
