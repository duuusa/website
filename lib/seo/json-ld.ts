import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { links } from "@/lib/links";

export function buildPersonJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: dictionary.home.name,
    url: "https://www.clementduvivier.com",
    jobTitle: "Product Owner",
    worksFor: {
      "@type": "Organization",
      name: "Dipeeo",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    sameAs: [links.social.linkedin],
    description: dictionary.meta.description,
    image: "https://www.clementduvivier.com/meta_image_picture.jpg",
  };
}
