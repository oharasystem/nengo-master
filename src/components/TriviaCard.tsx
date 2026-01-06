import { html } from "hono/html";

export const TriviaCard = (props: { trivia?: { highlight_event?: string; hit_song?: string }, era?: string }) => {
    return html`
    <div id="trivia-container" class="w-full mt-6 text-center">
      <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-4 transition-all hover:shadow-md">
        <h3 class="font-bold text-slate-500 text-sm mb-1">その年の出来事</h3>
        <p class="text-lg text-slate-800">${props.trivia?.highlight_event || "---"}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
        <h3 class="font-bold text-slate-500 text-sm mb-1">その年のヒット曲</h3>
        <p class="text-lg text-slate-800">${props.trivia?.hit_song || "---"}</p>
      </div>
    </div>
  `;
};
