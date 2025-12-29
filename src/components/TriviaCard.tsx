import { html } from "hono/html";

export const TriviaCard = (props: { trivia?: { highlight_event?: string; hit_song?: string }, era?: string }) => {
    return html`
    <div id="trivia-container" class="w-full mt-6 text-center">
      <div class="bg-white p-4 rounded-lg shadow mb-4 transition-all hover:shadow-lg">
        <h3 class="font-bold text-gray-500 text-sm mb-1">その年の出来事</h3>
        <p class="text-lg">${props.trivia?.highlight_event || "---"}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow transition-all hover:shadow-lg">
        <h3 class="font-bold text-gray-500 text-sm mb-1">その年のヒット曲</h3>
        <p class="text-lg">${props.trivia?.hit_song || "---"}</p>
      </div>
    </div>
  `;
};
