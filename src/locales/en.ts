import { Translation } from "./types";

const en: Translation = {
  meta: {
    title: "Nengo Master - Japanese Era Converter",
    description: "A useful tool for converting Western/Japanese calendar years, checking age, and automatically calculating school admission/graduation years. Intuitive drum-roll interface.",
    keywords: "Nengo, Western Calendar, Japanese Calendar, Conversion, Age, Resume, School, Admission, Graduation, Calculation, Tool",
  },
  header: {
    title: "Nengo Master",
  },
  nav: {
    hub: "Browse by Year Timeline",
  },
  home: {
    label_ad: "Western (AD)",
    label_era: "Japanese Era",
    calc_title: "School Year Calculator",
    calc_desc: "Enter your birth year to automatically calculate admission and graduation years.",
    form_year: "Birth Year (AD)",
    form_year_suffix: "",
    form_early_bird: "Early Bird",
    form_early_bird_desc: "(Jan 1 - Apr 1)",
    btn_calc: "Calculate",
    modal_ad_title: "Select Year (AD)",
    modal_era_title: "Select Japanese Era",
  },
  year_page: {
    age_label: "Age of those born in this year",
    before_birthday: "Before Birthday",
    after_birthday: "After Birthday",
    zodiac_label: "Zodiac",
    yakudoshi_title: "Yakudoshi (Unlucky Years) Check",
    yakudoshi_male: "Male",
    yakudoshi_female: "Female",
    yakudoshi_caution: "Be careful",
    yakudoshi_not: "Not a Yakudoshi year",
    yakudoshi_note: "* Yakudoshi is calculated based on 'Kazoedoshi' (East Asian age reckoning).",
    related_zodiac_prev: "Same Zodiac ({zodiac}) Year",
    related_zodiac_next: "Same Zodiac ({zodiac}) Year",
    other_ages_title: "Check Other Ages",
  },
  trivia: {
    events_title: "Events of the Year",
    songs_title: "Hit Songs",
    empty: "---",
  },
  resume: {
    error_input: "Error: ",
    error_calc: "Calculation failed. Please check your network.",
    result_year_suffix: "",
    result_month_suffix: "",
  },
  footer: {
    lang_ja: "日本語",
    lang_en: "English",
    lang_zh: "中文 (简体)",
    lang_vi: "Tiếng Việt",
  },
};

export default en;
