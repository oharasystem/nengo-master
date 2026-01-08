import { Translation } from "./types";

const ko: Translation = {
  meta: {
    title: "Nengo Master - 일본 연호 변환기",
    description: "서기/일본 연호 변환, 나이 확인, 학교 입학/졸업 연도 자동 계산에 유용한 도구입니다. 직관적인 드럼롤 인터페이스.",
    keywords: "일본 연호, 서기, 일본 달력, 변환, 나이, 이력서, 학교, 입학, 졸업, 계산, 도구",
  },
  header: {
    title: "Nengo Master",
  },
  nav: {
    hub: "연도별 타임라인 보기",
  },
  home: {
    label_ad: "서기 (AD)",
    label_era: "일본 연호",
    calc_title: "학년 계산기",
    calc_desc: "태어난 해를 입력하면 입학 및 졸업 연도를 자동으로 계산합니다.",
    form_year: "출생 연도 (AD)",
    form_year_suffix: "년",
    form_early_bird: "빠른 생일",
    form_early_bird_desc: "(1월 1일 - 4월 1일)",
    btn_calc: "계산하기",
    modal_ad_title: "연도 선택 (AD)",
    modal_era_title: "일본 연호 선택",
  },
  year_page: {
    age_label: "이 해에 태어난 사람의 나이",
    before_birthday: "생일 전",
    after_birthday: "생일 후",
    zodiac_label: "띠",
    yakudoshi_title: "야쿠도시 (액년) 확인",
    yakudoshi_male: "남성",
    yakudoshi_female: "여성",
    yakudoshi_caution: "조심해야 할 해",
    yakudoshi_not: "액년이 아닙니다",
    yakudoshi_note: "* 액년은 '세는나이'를 기준으로 계산됩니다.",
    related_zodiac_prev: "같은 {zodiac}의 해 (이전)",
    related_zodiac_next: "같은 {zodiac}의 해 (다음)",
    other_ages_title: "다른 연령 확인",
  },
  trivia: {
    events_title: "올해의 사건",
    songs_title: "히트곡",
    empty: "---",
  },
  resume: {
    error_input: "오류: ",
    error_calc: "계산에 실패했습니다. 네트워크를 확인해주세요.",
    result_year_suffix: "년",
    result_month_suffix: "월",
  },
  footer: {
    lang_ja: "日本語",
    lang_en: "English",
    lang_zh: "中文 (简体)",
    lang_vi: "Tiếng Việt",
    lang_ko: "한국어",
    lang_pt: "Português",
    lang_es: "Español",
    link_home: "Home",
    link_privacy: "Privacy Policy",
    link_contact: "Contact",
  },
};

export default ko;
