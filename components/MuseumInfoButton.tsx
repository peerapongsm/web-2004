"use client";

import { useMuseum } from "./MuseumContext";

/** Small inline "open annotation" button. Renders nothing unless museum mode is on. */
export function MuseumInfoButton({ id }: { id: string }) {
  const { museumMode, openAnnotation } = useMuseum();
  if (!museumMode) return null;
  return (
    <button
      type="button"
      className="museum-info-btn"
      onClick={() => openAnnotation(id)}
      aria-label="ดูข้อมูลพิพิธภัณฑ์เกี่ยวกับส่วนนี้"
      title="โหมดพิพิธภัณฑ์: ดูว่านี่คืออะไร"
    >
      🏛
    </button>
  );
}
