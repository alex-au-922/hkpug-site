export const locales = {
  allLocales: ["en", "zh-HK"] as const,
  defaultLocale: "en" as const,
};

export type LocaleType = (typeof locales.allLocales)[number];

export const setLocaleCookie = (locale: LocaleType): void => {
  if (typeof document === "undefined") return;

  document.cookie = `preferredLocale=${locale}; path=/; max-age=${
    60 * 60 * 24 * 30
  }`;
};

export const getLocaleFromCookie = (): LocaleType => {
  if (typeof document === "undefined") return locales.defaultLocale;

  const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("preferredLocale="))
    ?.split("=")[1];

  if (cookieLocale && locales.allLocales.includes(cookieLocale as LocaleType)) {
    return cookieLocale as LocaleType;
  }

  if (typeof navigator === "undefined") return locales.defaultLocale;

  const browserLang = navigator.language;
  return (
    locales.allLocales.find((locale) => browserLang.startsWith(locale)) ||
    locales.defaultLocale
  );
};
