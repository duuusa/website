import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const headerLocale = (await headers()).get("x-locale");
  if (headerLocale && isLocale(headerLocale)) {
    return headerLocale;
  }
  return defaultLocale;
}
