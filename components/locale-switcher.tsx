import Link from "next/link";
import { localeLabels, type Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  pathname?: string;
};

export function LocaleSwitcher({ currentLocale, pathname = "/" }: LocaleSwitcherProps) {
  const entries = Object.entries(localeLabels) as [Locale, string][];
  const suffix = pathname === "/" ? "" : pathname;

  return (
    <nav
      aria-label="Language"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[-0.01em] text-black/35"
    >
      {entries.map(([locale, label], index) => (
        <span key={locale} className="flex items-center gap-3">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          {locale === currentLocale ? (
            <span className="text-black/60">{label}</span>
          ) : (
            <Link href={`/${locale}${suffix}`} className="hover:text-black" hrefLang={locale}>
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
