import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LogoMark } from "@/components/logo-mark";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata(locale, "/");
}

export default async function Home({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale as Locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10 sm:px-6">
      <section className="flex w-full max-w-[600px] flex-col gap-[25px]">
        <FadeIn>
          <header className="flex flex-col gap-2.5">
            <LogoMark alt={t.home.logoAlt} />
            <h1 className="text-base font-medium tracking-[-0.05em] text-black">{t.home.name}</h1>
            <p className="text-base tracking-[-0.05em] text-black/50">{t.home.location}</p>
          </header>
        </FadeIn>

        <div className="flex flex-col gap-[15px]">
          {t.home.bio.map((paragraph, index) => (
            <FadeIn key={paragraph.slice(0, 24)} delayMs={180 + index * 140}>
              <p className="text-base leading-normal tracking-[-0.01em] text-[#101828]">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delayMs={520}>
          <footer>
            <LocaleSwitcher currentLocale={locale as Locale} pathname="/" />
          </footer>
        </FadeIn>
      </section>
    </div>
  );
}
