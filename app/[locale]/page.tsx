import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LogoMark } from "@/components/logo-mark";
import { RichText } from "@/components/rich-text";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Each item rises in once `html.content-in` is set; the delay staggers them.
const enterDelay = (ms: number): CSSProperties =>
  ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default async function Home({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = getDictionary(typedLocale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10 sm:px-6">
      <section
        key={typedLocale}
        className="flex w-full max-w-[600px] flex-col gap-[25px]"
      >
        <header className="flex flex-col gap-2.5">
          <LogoMark alt={t.home.logoAlt} locale={typedLocale} />
          <h1
            className="reveal-item text-base font-medium tracking-[-0.05em] text-black"
            style={enterDelay(0)}
          >
            {t.home.name}
          </h1>
          <p
            className="reveal-item text-base tracking-[-0.05em] text-black/50"
            style={enterDelay(90)}
          >
            <RichText text={t.home.location} locale={typedLocale} />
          </p>
        </header>

        <div className="flex flex-col gap-[18px]">
          {t.home.bio.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className="reveal-item font-serif text-[19px] leading-[1.72] tracking-[0] text-[#101828]"
              style={enterDelay(200 + index * 120)}
            >
              <RichText text={paragraph} locale={typedLocale} />
            </p>
          ))}
        </div>

        <footer className="reveal-item" style={enterDelay(460)}>
          <LocaleSwitcher currentLocale={typedLocale} pathname="/" />
        </footer>
      </section>
    </div>
  );
}
