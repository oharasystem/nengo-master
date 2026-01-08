import { Translation } from "./types";

const ja: Translation = {
  meta: {
    title: "年号マスター",
    description: "西暦・和暦の変換、年齢確認、入学・卒業年度の自動計算ができる便利ツール。iPhoneのようなドラムロールで直感的に操作可能。",
    keywords: "年号,西暦,和暦,変換,年齢,履歴書,早生まれ,学校,入学,卒業,計算,ツール,便利",
  },
  header: {
    title: "年号マスター",
  },
  nav: {
    hub: "年表一覧から探す",
  },
  home: {
    label_ad: "西暦",
    label_era: "和暦",
    calc_title: "入学・卒業年度 自動計算",
    calc_desc: "生まれ年を入力すると、入学・卒業年度を自動で計算します。",
    form_year: "生まれ年 (西暦)",
    form_year_suffix: "年",
    form_early_bird: "早生まれ",
    form_early_bird_desc: "(1/1〜4/1)",
    btn_calc: "計算する",
    modal_ad_title: "西暦を選択",
    modal_era_title: "和暦を選択",
  },
  year_page: {
    age_label: "生まれの方の年齢",
    before_birthday: "誕生日前",
    after_birthday: "誕生日後",
    zodiac_label: "干支",
    yakudoshi_title: "今年の厄年チェック",
    yakudoshi_male: "男性",
    yakudoshi_female: "女性",
    yakudoshi_caution: "ご注意ください",
    yakudoshi_not: "厄年ではありません",
    yakudoshi_note: "※厄年は「数え年（生まれた時を1歳とし、元旦に加齢）」で計算しています。",
    related_zodiac_prev: "同じ干支（{zodiac}）の年",
    related_zodiac_next: "同じ干支（{zodiac}）の年",
    other_ages_title: "他の年齢を調べる",
  },
  trivia: {
    events_title: "その年の出来事",
    songs_title: "その年のヒット曲",
    empty: "---",
  },
  resume: {
    error_input: "エラー: ",
    error_calc: "計算に失敗しました。通信環境を確認してください。",
    result_year_suffix: "年",
    result_month_suffix: "月",
  },
  footer: {
    lang_ja: "日本語",
    lang_en: "English",
    lang_zh: "中文 (简体)",
    lang_vi: "Tiếng Việt",
    lang_ko: "한국어",
    lang_pt: "Português",
    lang_es: "Español",
  },
};

export default ja;
