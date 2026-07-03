"use client";

import { useMuseum } from "./MuseumContext";

export function MuseumToggleButton() {
  const { museumMode, toggleMuseumMode } = useMuseum();
  return (
    <button
      type="button"
      className={`museum-toggle-btn${museumMode ? " active" : ""}`}
      onClick={toggleMuseumMode}
      aria-pressed={museumMode}
    >
      🏛 {museumMode ? "ปิดโหมดพิพิธภัณฑ์" : "เปิดโหมดพิพิธภัณฑ์"}
    </button>
  );
}
