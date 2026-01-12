import { Article } from "./types";
import { siteOpened } from "./articles/site-opened";
import { resumeSeirekiWarekiGuide } from "./articles/resume-seireki-wareki-guide";
import { mentalCalculationTrick } from "./articles/mental-calculation-trick";
import { hayawareSchoolYear } from "./articles/hayaware-school-year-logic";

export type { Article };

const allArticles: Article[] = [
  siteOpened,
  resumeSeirekiWarekiGuide,
  mentalCalculationTrick,
  hayawareSchoolYear,
];

export const articles: Article[] = allArticles.sort((a, b) => {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
});
