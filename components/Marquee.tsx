"use client";

import { MuseumInfoButton } from "./MuseumInfoButton";

export function Marquee({ text }: { text: string }) {
  return (
    <div className="marquee-wrap">
      <MuseumInfoButton id="marquee-text" />
      <div className="marquee-track">
        <span className="marquee-content">{text}</span>
        <span className="marquee-content" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
