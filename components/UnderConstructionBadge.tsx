"use client";

import { MuseumInfoButton } from "./MuseumInfoButton";

export function UnderConstructionBadge() {
  return (
    <div className="under-construction">
      <MuseumInfoButton id="under-construction" />
      <div className="construction-stripes" aria-hidden="true" />
      <p className="construction-text">🚧 อยู่ระหว่างก่อสร้างน๊า (ตลอดกาลเรยจร้า) 🚧</p>
      <div className="construction-stripes" aria-hidden="true" />
    </div>
  );
}
