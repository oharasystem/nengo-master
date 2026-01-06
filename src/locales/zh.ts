import { Translation } from "./types";

const zh: Translation = {
  meta: {
    title: "年号大师 - 西历和历转换",
    description: "西历/和历转换、年龄确认、自动计算入学/毕业年度的实用工具。类似于iPhone的滚轮操作，直观易用。",
    keywords: "年号,西历,和历,转换,年龄,简历,早生,学校,入学,毕业,计算,工具,便利",
  },
  header: {
    title: "年号大师",
  },
  nav: {
    hub: "按年表浏览",
  },
  home: {
    label_ad: "西历 (AD)",
    label_era: "和历 (日本年号)",
    calc_title: "入学・毕业年度 自动计算",
    calc_desc: "输入出生年份，自动计算入学和毕业年度。",
    form_year: "出生年份 (西历)",
    form_year_suffix: "年",
    form_early_bird: "早生",
    form_early_bird_desc: "(1/1〜4/1)",
    btn_calc: "计算",
    modal_ad_title: "选择年份 (西历)",
    modal_era_title: "选择和历",
  },
  year_page: {
    age_label: "该年出生者的年龄",
    before_birthday: "生日前",
    after_birthday: "生日后",
    zodiac_label: "生肖",
    yakudoshi_title: "厄年（本命年）查询",
    yakudoshi_male: "男性",
    yakudoshi_female: "女性",
    yakudoshi_caution: "请注意",
    yakudoshi_not: "非厄年",
    yakudoshi_note: "* 厄年按“虚岁”计算。",
    related_zodiac_prev: "同生肖（{zodiac}）年份",
    related_zodiac_next: "同生肖（{zodiac}）年份",
    other_ages_title: "查询其他年龄",
  },
  trivia: {
    events_title: "当年的大事件",
    songs_title: "当年的流行曲",
    empty: "---",
  },
  resume: {
    error_input: "错误: ",
    error_calc: "计算失败。请检查网络连接。",
    result_year_suffix: "年",
    result_month_suffix: "月",
  },
  footer: {
    lang_ja: "日本語",
    lang_en: "English",
    lang_zh: "中文 (简体)",
    lang_vi: "Tiếng Việt",
  },
};

export default zh;
