"use client";

import { MuseumInfoButton } from "./MuseumInfoButton";

export function BestViewedBadge() {
  return (
    <div className="best-viewed-badge">
      <MuseumInfoButton id="best-viewed-badge" />
      <svg viewBox="0 0 120 32" className="best-viewed-svg" role="img" aria-label="Best viewed 800x600 in IE6">
        <rect x="0.5" y="0.5" width="119" height="31" fill="#c0c0c0" stroke="#000" />
        <rect x="2" y="2" width="116" height="28" fill="#0a246a" />
        <text x="60" y="13" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="monospace">
          BEST VIEWED
        </text>
        <text x="60" y="24" textAnchor="middle" fontSize="8" fill="#ffde00" fontFamily="monospace">
          800×600 · IE6
        </text>
      </svg>
    </div>
  );
}
