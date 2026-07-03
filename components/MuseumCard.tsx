"use client";

import { useEffect, useRef, useState } from "react";
import type { Annotation } from "@/lib/annotations";

const CLOSE_ANIMATION_MS = 180;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MuseumCard({ annotation, onClose }: { annotation: Annotation; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const requestClose = () => {
    if (closing) return;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    setClosing(true);
    closeTimer.current = setTimeout(onClose, CLOSE_ANIMATION_MS);
  };

  return (
    <div className={`museum-overlay${closing ? " is-closing" : ""}`} onClick={requestClose}>
      <div
        className={`museum-card${closing ? " is-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={annotation.title}
      >
        <div className="museum-card-header">
          <span className="museum-card-mark" aria-hidden="true">
            🏛
          </span>
          <div className="museum-card-heading">
            <p className="museum-card-eyebrow">Exhibit Label · Interactive Web, ca. 2004</p>
            <h3>{annotation.title}</h3>
          </div>
          <button type="button" className="museum-card-close" onClick={requestClose} aria-label="ปิด">
            ✕
          </button>
        </div>
        <hr className="museum-card-rule" />
        <dl className="museum-card-body">
          <dt className="museum-card-label">Description · คืออะไร</dt>
          <dd>{annotation.what}</dd>
          <dt className="museum-card-label">Rationale · ทำไมยุคนั้นทำแบบนี้</dt>
          <dd>{annotation.why}</dd>
          <dt className="museum-card-label">Obsolescence · ทำไมมันตาย</dt>
          <dd>{annotation.whyItDied}</dd>
        </dl>
        <button type="button" className="museum-card-ok" onClick={requestClose}>
          เข้าใจแล้ว ปิดการ์ด
        </button>
      </div>
    </div>
  );
}
