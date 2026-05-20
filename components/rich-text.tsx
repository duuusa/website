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

function RichTokenView({ token }: { token: RichToken }) {
  if (token.type === "link") {
    return (
      <Link
        href={token.href}
        target={token.external ? "_blank" : undefined}
        rel={token.external ? "noreferrer" : undefined}
        className="rich-link"
      >
        {token.text}
      </Link>
    );
  }

  switch (token.variant) {
    case "code":
      return <CodeToken text={token.text} />;
    case "frame":
      return <FrameToken text={token.text} />;
    case "flash":
      return <FlashToken text={token.text} emoji={token.emoji} />;
    case "highlight":
      return <HighlightToken text={token.text} emoji={token.emoji} />;
    case "terminal":
      return <TerminalToken text={token.text} />;
    case "url":
      return <UrlToken text={token.text} />;
    case "ticket":
      return <TicketToken text={token.text} />;
    default:
      return <ScribbleToken text={token.text} emoji={token.emoji} />;
  }
}

function ScribbleToken({ text, emoji }: { text: string; emoji: string }) {
  return (
    <span className="rich-fx rich-fx-scribble">
      <span className="rich-fx-scribble__word">
        <span className="rich-fx-scribble__label">{text}</span>
        <svg
          className="rich-fx-scribble__strike"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M2 16 Q25 4 50 14 T98 10" pathLength="1" />
        </svg>
      </span>
      <span className="rich-fx-scribble__emoji" aria-hidden="true">
        {emoji}
      </span>
    </span>
  );
}

function CodeToken({ text }: { text: string }) {
  return (
    <span className="rich-fx rich-fx-code">
      <span className="rich-fx-code__text">{text}</span>
      <span className="rich-fx-code__overlay" aria-hidden="true">
        <span className="rich-fx-code__tag">&lt;</span>
        <span className="rich-fx-code__name">{text}</span>
        <span className="rich-fx-code__tag">/&gt;</span>
      </span>
    </span>
  );
}

function FrameToken({ text }: { text: string }) {
  return (
    <span className="rich-fx rich-fx-frame">
      <span className="rich-fx-frame__label">{text}</span>
      <span className="rich-fx-frame__box" aria-hidden="true" />
      <span className="rich-fx-frame__handle rich-fx-frame__handle--tl" aria-hidden="true" />
      <span className="rich-fx-frame__handle rich-fx-frame__handle--tr" aria-hidden="true" />
      <span className="rich-fx-frame__handle rich-fx-frame__handle--bl" aria-hidden="true" />
      <span className="rich-fx-frame__handle rich-fx-frame__handle--br" aria-hidden="true" />
      <span className="rich-fx-frame__tag" aria-hidden="true">
        Frame 1
      </span>
    </span>
  );
}

function FlashToken({ text, emoji }: { text: string; emoji: string }) {
  return (
    <span className="rich-fx rich-fx-flash">
      <span className="rich-fx-flash__text">{text}</span>
      <span className="rich-fx-flash__shutter" aria-hidden="true" />
      <span className="rich-fx-flash__icon" aria-hidden="true">
        {emoji}
      </span>
    </span>
  );
}

function HighlightToken({ text, emoji }: { text: string; emoji: string }) {
  return (
    <span className="rich-fx rich-fx-highlight" data-emoji={emoji}>
      <span className="rich-fx-highlight__text">{text}</span>
    </span>
  );
}

function TerminalToken({ text }: { text: string }) {
  return (
    <span className="rich-fx rich-fx-terminal">
      <span className="rich-fx-terminal__text">{text}</span>
      <span className="rich-fx-terminal__overlay" aria-hidden="true">
        <span className="rich-fx-terminal__prompt">$&nbsp;</span>
        <span className="rich-fx-terminal__cmd">{text}</span>
        <span className="rich-fx-terminal__caret" />
      </span>
    </span>
  );
}

function urlSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\p{L}\p{N}-]/gu, "");
}

function UrlToken({ text }: { text: string }) {
  return (
    <span className="rich-fx rich-fx-url">
      <span className="rich-fx-url__text">{text}</span>
      <span className="rich-fx-url__overlay" aria-hidden="true">
        <span className="rich-fx-url__lock">🔒</span>
        <span className="rich-fx-url__addr">https://{urlSlug(text)}.dev</span>
      </span>
    </span>
  );
}

function TicketToken({ text }: { text: string }) {
  return (
    <span className="rich-fx rich-fx-ticket">
      <span className="rich-fx-ticket__text">{text}</span>
      <span className="rich-fx-ticket__card" aria-hidden="true">
        <span className="rich-fx-ticket__id">PO-42</span>
        <span className="rich-fx-ticket__title">Ship the site</span>
        <span className="rich-fx-ticket__status">DONE</span>
      </span>
    </span>
  );
}
