import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clément Duvivier",
  description: "Hi, I'm Clément Duvivier, a Product Owner at Dipeeo and entrepreneur based in Paris, France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Clément Duvivier" />
          <meta property="og:description" content="Hi, I'm Clément Duvivier, a Product Owner at Dipeeo and entrepreneur based in Paris, France." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://clementduvivier.com" />
          <meta property="og:image" content="@/public/meta_image_picture.jpg" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:title" content="Clément Duvivier" />
          <meta name="twitter:description" content="Hi, I'm Clément Duvivier, a Product Owner at Dipeeo and entrepreneur based in Paris, France." />
          <meta name="twitter:image" content="@/public/meta_image_picture.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights/>
      </body>
    </html>
  );
}
