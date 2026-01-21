import { Article } from "./types";
import { siteOpened } from "./articles/site-opened";
import { resumeSeirekiWarekiGuide } from "./articles/resume-seireki-wareki-guide";
import { mentalCalculationTrick } from "./articles/mental-calculation-trick";
import { hayawareSchoolYear } from "./articles/hayaware-school-year-logic";
import { yakudoshiGuide } from "./articles/yakudoshi-guide";
import { eraTransitionGuide } from "./articles/eraTransition-guide";
import { ageSystemGuide } from "./articles/ageSystem-guide";

export type { Article };

const allArticles: Article[] = [
  siteOpened,
  resumeSeirekiWarekiGuide,
  mentalCalculationTrick,
  hayawareSchoolYear,
  yakudoshiGuide,
  eraTransitionGuide,
  ageSystemGuide,
];

export const articles: Article[] = allArticles.sort((a, b) => {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
});
