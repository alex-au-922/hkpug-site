import type LocaleProps from "../interfaces/LocaleProps";
import { getTranslations } from "../utils/i18n";
import { locales, type LocaleType, setLocaleCookie } from "../utils/locales";

export default function LocaleSwitcher({ locale }: LocaleProps) {
  const t = getTranslations(locale);

  const switchLocale = (newLocale: LocaleType) => {
    if (newLocale !== locale) {
      const currentPath = window.location.pathname;
      let pathWithoutLocale = currentPath.replace(
        new RegExp(`^${import.meta.env.BASE_URL}/${locale}`),
        ""
      );

      if (pathWithoutLocale !== "/" && pathWithoutLocale.endsWith("/")) {
        pathWithoutLocale = pathWithoutLocale.replace(/\/+$/, "");
      }

      setLocaleCookie(newLocale);

      window.location.href = `${
        import.meta.env.BASE_URL
      }/${newLocale}${pathWithoutLocale}`;
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        {t(`localeSwitcher.${locale}`)}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {locales.allLocales.map((loc) => (
          <li key={loc}>
            <button onClick={() => switchLocale(loc)}>
              {t(`localeSwitcher.${loc}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
