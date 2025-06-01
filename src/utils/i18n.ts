import { locales, type LocaleType } from "./locales";

const localesRootPath = "/src/locales";

const allTranslationFiles = import.meta.glob("/src/locales/**/*.json", {
  eager: true,
});

// Extract namespace and locale from relative path relative to localesRootPath
function extractInfoFromLocalePath(relpath: string): {
  locale: LocaleType;
  namespace: string;
} {
  const parts = relpath.split("/");

  // Format: /[namespace]/[locale].json
  // Example: /header/en.json
  const locale = parts[parts.length - 1].replace(".json", "") as LocaleType;
  const namespace = parts.slice(0, -1).join(".") || "common";

  return { locale, namespace };
}

function flattenTranslations(obj: any, prefix = ""): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenTranslations(obj[key], prefixedKey));
    } else if (typeof obj[key] === "string") {
      acc[prefixedKey] = obj[key];
    }

    return acc;
  }, {});
}

const translationFunctions: Record<
  string,
  (key: string, params?: Record<string, string | number>) => string
> = {};

const flattenedTranslations: Record<string, Record<string, string>> = {};

// Initialize translation objects for each locale
for (const locale of locales.allLocales) {
  flattenedTranslations[locale] = {};
}

// Process all translation files
Object.entries(allTranslationFiles).forEach(([path, content]) => {
  const { locale, namespace } = extractInfoFromLocalePath(
    path.replace(`${localesRootPath}/`, "")
  );

  // Skip if not a valid locale
  if (!locales.allLocales.includes(locale)) return;

  const fileContent = (content as any).default || content;

  // Create namespaced translations
  const prefixedTranslations =
    namespace === "common" ? fileContent : { [namespace]: fileContent };

  // Flatten and merge with existing translations for this locale
  Object.assign(
    flattenedTranslations[locale],
    flattenTranslations(prefixedTranslations)
  );
});

// Create translation functions for each locale
for (const locale of locales.allLocales) {
  translationFunctions[locale] = function t(
    key: string,
    params?: Record<string, string | number>
  ) {
    const translation = flattenedTranslations[locale][key];

    if (!translation) {
      return key;
    }

    if (params) {
      return Object.entries(params).reduce(
        (text, [paramKey, paramValue]) =>
          text.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue)),
        translation
      );
    }

    return translation;
  };
}

export function getTranslations(locale: (typeof locales.allLocales)[number]) {
  if (!locales.allLocales.includes(locale)) {
    locale = locales.defaultLocale;
  }

  return translationFunctions[locale];
}
