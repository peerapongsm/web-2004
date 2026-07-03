"use client";

import { MuseumInfoButton } from "./MuseumInfoButton";

export function UnderConstructionBadge() {
  return (
    <div className="under-construction">
      <MuseumInfoButton id="under-construction" />
      <div className="construction-stripes" aria-hidden="true" />
      <p className="construction-text">🚧 อยู่ระหว่างการก่อสร้าง (ตลอดกาล) 🚧</p>
      <div className="construction-stripes" aria-hidden="true" />
    </div>
  );
}
