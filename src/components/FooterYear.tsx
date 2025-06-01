import { getTranslations } from "../utils/i18n";
import type LocaleProps from "../interfaces/LocaleProps";

export default function FooterYear({ locale }: LocaleProps) {
  const t = getTranslations(locale);
  return (
    <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
  );
}
