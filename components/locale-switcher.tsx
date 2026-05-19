import Link from "next/link";
import { localeLabels, type Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  currentLocale: Locale;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const locales = Object.entries(localeLabels) as [Locale, string][];

  return (
    <nav
      aria-label="Language"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[-0.01em] text-black/35"
    >
      {locales.map(([locale, label], index) => (
        <span key={locale} className="flex items-center gap-3">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          {locale === currentLocale ? (
            <span className="text-black/60">{label}</span>
          ) : (
            <Link href={`/?lang=${locale}`} className="hover:text-black">
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
