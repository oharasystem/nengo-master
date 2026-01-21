import { Article } from "./types";
import { siteOpened } from "./articles/site-opened";
import { resumeSeirekiWarekiGuide } from "./articles/resume-seireki-wareki-guide";
import { mentalCalculationTrick } from "./articles/mental-calculation-trick";
import { hayawareSchoolYear } from "./articles/hayaware-school-year-logic";
import { yakudoshiGuide } from "./articles/yakudoshi-guide";
import { eraTransitionGuide } from "./articles/eraTransition-guide";
import { ageSystemGuide } from "./articles/ageSystem-guide";
import { sexagenaryCycleMystery } from "./articles/sexagenary-cycle-mystery";
import { businessDateManner } from "./articles/business-date-manner";
import { gengoHistoryJP } from "./articles/gengo-history-jp";
import { futureEraPrediction } from "./articles/future-era-prediction";

export type { Article };

const allArticles: Article[] = [
  siteOpened,
  resumeSeirekiWarekiGuide,
  mentalCalculationTrick,
  hayawareSchoolYear,
  yakudoshiGuide,
  eraTransitionGuide,
  ageSystemGuide,
  sexagenaryCycleMystery,
  businessDateManner,
  gengoHistoryJP,
  futureEraPrediction,
];

export const articles: Article[] = allArticles.sort((a, b) => {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
});
