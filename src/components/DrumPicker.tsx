import { html } from "hono/html";
import { getEra } from "../utils/era";

type DrumPickerProps = {
  mode: 'ad' | 'era';
  id: string;
  startYear: number;
  endYear: number;
  initialYear: number;
};

export const DrumPicker = (props: DrumPickerProps) => {
  const years = [];
  for (let y = props.startYear; y <= props.endYear; y++) {
    years.push(y);
  }

  return html`
    <div class="relative h-full w-full bg-white/30 backdrop-blur-md rounded-xl border border-white/50 shadow-inner group overflow-hidden">
      
      <!-- Highlight Bar -->
      <div class="absolute inset-x-0 top-1/2 -mt-8 h-16 bg-[#22215B]/10 border-y border-[#22215B]/20 pointer-events-none z-10"></div>
      
      <!-- Scroll Indicators -->
      <div class="absolute top-2 inset-x-0 flex justify-center text-[#22215B]/30 pointer-events-none z-20 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </div>
      <div class="absolute bottom-2 inset-x-0 flex justify-center text-[#22215B]/30 pointer-events-none z-20 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>

      <!-- Picker List -->
      <div id="${props.id}" class="h-full overflow-y-scroll snap-y cursor-pointer relative z-30 no-scrollbar"> 
        ${years.map((y) => html`
          <div
            class="year-item h-16 flex items-center justify-center text-2xl font-bold snap-center snap-always transition-all duration-300 transform text-slate-400 opacity-50"
            data-year="${y}"
          >
            ${props.mode === 'ad' ? `${y}年` : getEra(y)}
          </div>
        `)}
      </div>
    </div>
  `;
};
