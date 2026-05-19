import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerLocale = (await headers()).get("x-locale");
  if (headerLocale && isLocale(headerLocale)) {
    return headerLocale;
  }

  return defaultLocale;
}
