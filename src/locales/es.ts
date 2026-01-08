import { Translation } from "./types";

const es: Translation = {
  meta: {
    title: "Nengo Master - Conversor de Era Japonesa",
    description: "Una herramienta útil para convertir años del calendario occidental/japonés, verificar la edad y calcular automáticamente los años de admisión/graduación escolar. Interfaz intuitiva.",
    keywords: "Nengo, Calendario Occidental, Calendario Japonés, Conversión, Edad, Currículum, Escuela, Admisión, Graduación, Cálculo, Herramienta",
  },
  header: {
    title: "Nengo Master",
  },
  nav: {
    hub: "Explorar cronología por año",
  },
  home: {
    label_ad: "Occidental (AD)",
    label_era: "Era Japonesa",
    calc_title: "Calculadora Escolar",
    calc_desc: "Ingrese su año de nacimiento para calcular automáticamente los años de admisión y graduación.",
    form_year: "Año de Nacimiento (AD)",
    form_year_suffix: "",
    form_early_bird: "Cumpleaños Temprano",
    form_early_bird_desc: "(1 Ene - 1 Abr)",
    btn_calc: "Calcular",
    modal_ad_title: "Seleccionar Año (AD)",
    modal_era_title: "Seleccionar Era Japonesa",
  },
  year_page: {
    age_label: "Edad de los nacidos en este año",
    before_birthday: "Antes del cumpleaños",
    after_birthday: "Después del cumpleaños",
    zodiac_label: "Zodíaco",
    yakudoshi_title: "Verificación de Yakudoshi (Años de mala suerte)",
    yakudoshi_male: "Masculino",
    yakudoshi_female: "Femenino",
    yakudoshi_caution: "Tenga cuidado",
    yakudoshi_not: "No es un año Yakudoshi",
    yakudoshi_note: "* Yakudoshi se calcula basándose en el 'conteo de edad de Asia Oriental' (Kazoedoshi).",
    related_zodiac_prev: "Mismo año del Zodíaco ({zodiac})",
    related_zodiac_next: "Mismo año del Zodíaco ({zodiac})",
    other_ages_title: "Verificar otras edades",
  },
  trivia: {
    events_title: "Eventos del Año",
    songs_title: "Canciones Exitosas",
    empty: "---",
  },
  resume: {
    error_input: "Error: ",
    error_calc: "Error en el cálculo. Por favor verifique su red.",
    result_year_suffix: "",
    result_month_suffix: "",
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

export default es;
