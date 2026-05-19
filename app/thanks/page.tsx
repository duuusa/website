import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { links } from "@/lib/links";
import { buildThanksMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildThanksMetadata(locale);
}

export default async function ThanksPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
        <FadeIn>
          <p className="text-sm tracking-[-0.05em] text-black/40">{t.thanks.found}</p>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.05em] text-black">
            {t.thanks.title}
          </h1>
        </FadeIn>

        <FadeIn delayMs={160}>
          <p className="mt-6 text-base leading-relaxed tracking-[-0.01em] text-[#101828]">
            {t.thanks.intro}
          </p>
        </FadeIn>

        <FadeIn delayMs={280}>
          <section className="mt-10">
            <h2 className="text-sm font-medium tracking-[-0.05em] text-black/50">
              {t.thanks.stackTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {t.thanks.stack.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-6 text-sm tracking-[-0.01em] text-[#101828]"
                >
                  <span className="text-black/45">{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <section className="mt-10 space-y-8">
          {t.thanks.credits.map((group, groupIndex) => (
            <FadeIn key={group.title} delayMs={400 + groupIndex * 120}>
              <section>
                <h2 className="text-sm font-medium tracking-[-0.05em] text-black/50">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      {item.name === "Emmanuel Hong" ? (
                        <Link
                          href={links.inspiration}
                          className="text-sm tracking-[-0.01em] text-[#101828] underline-offset-4 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <Link
                          href="https://www.clementduvivier.com"
                          className="text-sm tracking-[-0.01em] text-[#101828] underline-offset-4 hover:underline"
                        >
                          {item.name}
                        </Link>
                      )}
                      <p className="mt-1 text-sm text-black/45">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          ))}
        </section>

        <FadeIn delayMs={640}>
          <footer className="mt-12 text-sm tracking-[-0.01em] text-black/45">
            <Link href="/" className="hover:text-black">
              {t.thanks.backHome}
            </Link>
          </footer>
          <p className="mt-6 text-xs text-black/35">{t.thanks.logoTip}</p>
          <p className="mt-4 text-xs text-black/35">
            © {new Date().getFullYear()} Clément Duvivier
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
