import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { links } from "@/lib/links";

const siteUrl = "https://www.clementduvivier.com";

export function buildPersonJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: dictionary.home.name,
    url: siteUrl,
    jobTitle: "Product Owner",
    worksFor: {
      "@type": "Organization",
      name: "Dipeeo",
      url: "https://www.dipeeo.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "HETIC",
      url: "https://www.hetic.net",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    nationality: {
      "@type": "Country",
      name: "France",
    },
    knowsAbout: [
      "Product Management",
      "Product Ownership",
      "Web Development",
      "Design",
      "Photography",
    ],
    knowsLanguage: ["French", "English"],
    sameAs: [links.social.linkedin],
    description: dictionary.meta.description,
    image: `${siteUrl}/meta_image_picture.jpg`,
  };
}
