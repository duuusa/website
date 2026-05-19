import { FadeIn } from "@/components/fade-in";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LogoMark } from "@/components/logo-mark";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function Home() {
  const locale = await getLocale();
  const t = getDictionary(locale);

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
            <LocaleSwitcher currentLocale={locale} />
          </footer>
        </FadeIn>
      </section>
    </div>
  );
}