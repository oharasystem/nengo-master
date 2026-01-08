export type Translation = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  header: {
    title: string;
  };
  nav: {
    hub: string;
  };
  home: {
    label_ad: string;
    label_era: string;
    calc_title: string;
    calc_desc: string;
    form_year: string;
    form_year_suffix: string;
    form_early_bird: string;
    form_early_bird_desc: string;
    btn_calc: string;
    modal_ad_title: string;
    modal_era_title: string;
  };
  year_page: {
    age_label: string;
    before_birthday: string;
    after_birthday: string;
    zodiac_label: string;
    yakudoshi_title: string;
    yakudoshi_male: string;
    yakudoshi_female: string;
    yakudoshi_caution: string;
    yakudoshi_not: string;
    yakudoshi_note: string;
    related_zodiac_prev: string;
    related_zodiac_next: string;
    other_ages_title: string;
  };
  trivia: {
    events_title: string;
    songs_title: string;
    empty: string;
  };
  resume: {
    error_input: string;
    error_calc: string;
    result_year_suffix: string;
    result_month_suffix: string;
  };
  footer: {
    lang_ja: string;
    lang_en: string;
    lang_zh: string;
    lang_vi: string;
    lang_ko: string;
    lang_pt: string;
    lang_es: string;
  };
};
