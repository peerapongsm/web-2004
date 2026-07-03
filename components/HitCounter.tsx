"use client";

import { useEffect, useState } from "react";
import { formatHitCount, incrementHitCounter, START_COUNT } from "@/lib/counter";
import { MuseumInfoButton } from "./MuseumInfoButton";

export function HitCounter() {
  // deterministic placeholder for SSR/first paint, real value swapped in after mount
  const [count, setCount] = useState(START_COUNT);

  useEffect(() => {
    setCount(incrementHitCounter(window.localStorage));
  }, []);

  const digits = formatHitCount(count).split("");

  return (
    <div className="hit-counter">
      <MuseumInfoButton id="hit-counter" />
      <p className="hit-counter-label">จำนวนคนแวะมาหาเม๋ย์จร้า</p>
      <div className="hit-counter-digits" aria-label={`ผู้เข้าชม ${formatHitCount(count)} คน`}>
        {digits.map((d, i) => (
          <span key={i} className="hit-counter-digit">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
