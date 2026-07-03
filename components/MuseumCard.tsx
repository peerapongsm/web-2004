"use client";

import type { Annotation } from "@/lib/annotations";

export function MuseumCard({ annotation, onClose }: { annotation: Annotation; onClose: () => void }) {
  return (
    <div className="museum-overlay" onClick={onClose}>
      <div className="museum-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={annotation.title}>
        <div className="museum-card-header">
          <span className="museum-card-icon">🏛</span>
          <h3>{annotation.title}</h3>
          <button type="button" className="museum-card-close" onClick={onClose} aria-label="ปิด">
            ✕
          </button>
        </div>
        <dl className="museum-card-body">
          <dt>คืออะไร</dt>
          <dd>{annotation.what}</dd>
          <dt>ทำไมยุคนั้นทำแบบนี้</dt>
          <dd>{annotation.why}</dd>
          <dt>ทำไมมันตาย</dt>
          <dd>{annotation.whyItDied}</dd>
        </dl>
        <button type="button" className="btn btn-outline btn-sm museum-card-ok" onClick={onClose}>
          เข้าใจแล้ว ปิดการ์ด
        </button>
      </div>
    </div>
  );
}
