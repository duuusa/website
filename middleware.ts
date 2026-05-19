import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";
import { localeFromQuery, negotiateLocale } from "@/lib/i18n/negotiate-locale";

export function middleware(request: NextRequest) {
  const queryLocale = localeFromQuery(request.nextUrl.searchParams.get("lang"));
  const cookieLocale = request.cookies.get("locale")?.value;
  const locale =
    queryLocale ??
    (cookieLocale && isLocale(cookieLocale) ? cookieLocale : null) ??
    negotiateLocale(request.headers.get("accept-language"));

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  if (cookieLocale !== locale) {
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  if (queryLocale) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("lang");
    const redirect = NextResponse.redirect(cleanUrl);
    redirect.headers.set("x-locale", locale);
    redirect.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
