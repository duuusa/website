import Link from "next/link";
import { Fragment } from "react";
import type { Locale } from "@/lib/i18n/config";
import { tokenizeRichText, type RichToken } from "@/lib/rich-text";

type RichTextProps = {
  text: string;
  locale: Locale;
};

export function RichText({ text, locale }: RichTextProps) {
  const parts = tokenizeRichText(text, locale);

  return (
    <>
      {parts.map((part, index) => {
        if (part.kind === "text") {
          return <Fragment key={`t-${index}`}>{part.text}</Fragment>;
        }
        return <RichTokenView key={`k-${index}`} token={part.token} />;
      })}
    </>
  );
}

function Glyph({ glyph }: { glyph: string }) {
  return (
    <span className="kw__glyph" aria-hidden="true">
      {glyph}
    </span>
  );
}

function RichTokenView({ token }: { token: RichToken }) {
  if (token.type === "link") {
    return (
      <Link
        href={token.href}
        target={token.external ? "_blank" : undefined}
        rel={token.external ? "noreferrer" : undefined}
        className="kw kw--strong kw--link"
      >
        <span className="kw__text">{token.text}</span>
        <Glyph glyph={token.glyph} />
      </Link>
    );
  }

  const className = [
    "kw",
    token.tone === "strong" ? "kw--strong" : "",
    token.script ? "kw--script" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className}>
      <span className="kw__text">{token.text}</span>
      {token.glyph ? <Glyph glyph={token.glyph} /> : null}
    </span>
  );
}
