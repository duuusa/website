import type { NextConfig } from "next";

/**
 * Content-Security-Policy tuned for a statically generated site.
 *
 * Because every page is prerendered (SSG), there is no per-request nonce we
 * could inject, so the framework's hydration bootstrap and our two inline
 * scripts (JSON-LD + the splash gate) require 'unsafe-inline' for script-src.
 * Everything else is locked to same-origin. Vercel Analytics / Speed Insights
 * load same-origin via /_vercel/* on the platform; the va.vercel-scripts.com
 * origin is allowed as a fallback.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "manifest-src 'self'",
].join("; ");

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  // The CSP is production-only: Next.js dev relies on eval() and websockets
  // for Fast Refresh, which a strict policy would block. Production builds
  // never use eval(), so the strict policy applies there.
  ...(isDev
    ? []
    : [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]),
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
