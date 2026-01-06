import ja from "./ja";
import en from "./en";
import zh from "./zh";
import vi from "./vi";

// Supported languages
export const SUPPORTED_LANGUAGES = ["ja", "en", "zh", "vi"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = "ja";

// Translation type (based on Japanese keys)
export type Translations = typeof ja;

// Locale map
const locales: Record<SupportedLanguage, Translations> = {
  ja,
  en,
  zh,
  vi,
};

/**
 * Get translations for a given language code
 */
export function getTranslations(lang: SupportedLanguage): Translations {
  return locales[lang] || locales[DEFAULT_LANGUAGE];
}

/**
 * Check if a language code is supported
 */
export function isSupported(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Get language from path segment (first segment after /)
 * Returns 'ja' (default) if not a supported language prefix
 */
export function getLanguageFromPath(path: string): {
  lang: SupportedLanguage;
  pathWithoutLang: string;
} {
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isSupported(firstSegment) && firstSegment !== "ja") {
    // Remove the language prefix from path
    return {
      lang: firstSegment,
      pathWithoutLang: "/" + segments.slice(1).join("/") || "/",
    };
  }

  // Default to Japanese, keep path as-is
  return {
    lang: DEFAULT_LANGUAGE,
    pathWithoutLang: path,
  };
}

/**
 * Build URL with language prefix
 */
export function buildLocalizedUrl(
  basePath: string,
  lang: SupportedLanguage
): string {
  if (lang === DEFAULT_LANGUAGE) {
    return basePath;
  }
  // Ensure basePath starts with /
  const normalizedPath = basePath.startsWith("/") ? basePath : "/" + basePath;
  return `/${lang}${normalizedPath}`;
}

export { ja, en, zh, vi };
