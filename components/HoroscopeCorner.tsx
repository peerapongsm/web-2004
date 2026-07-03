"use client";

import { useEffect, useState } from "react";
import { MuseumInfoButton } from "./MuseumInfoButton";

const HOROSCOPE_BY_DAY = [
  "วันอาทิตย์: พลังงานดีทั้งวัน เหมาะกับการอัปเดตเว็บและตอบ Guestbook ค้างไว้",
  "วันจันทร์: 😩 เกลียดวันจันทร์!!! ระวังครูเช็คการบ้าน แนะนำเปิดเพลงประจำเว็บให้ใจฟู",
  "วันอังคาร: โชคดีเรื่องเน็ต โหลดไฟล์ไม่มีสะดุดทั้งวัน",
  "วันพุธ: มีคนแอบมาดู Profile บ่อยกว่าปกติ ลองเช็ค Hit Counter ดู",
  "วันพฤหัสบดี: เหมาะกับการตีบอสในกิลด์ Ragnarok หรือคุย MSN กับเพื่อนสนิท",
  "วันศุกร์: อารมณ์ดีสุดในรอบสัปดาห์ เหมาะกับการแต่งเว็บใหม่ให้ฟรุ้งฟริ้งกว่าเดิม",
  "วันเสาร์: เวลาว่างเยอะ เหมาะกับการเขียนบันทึกยาวๆ ในกระทู้ Pantip",
];

export function HoroscopeCorner() {
  // start as null to keep SSR/first-paint output deterministic; fill in after mount
  const [dayIndex, setDayIndex] = useState<number | null>(null);

  useEffect(() => {
    setDayIndex(new Date().getDay());
  }, []);

  return (
    <div className="horoscope-corner">
      <MuseumInfoButton id="horoscope-corner" />
      <h2 className="section-title">🔮 มุมดูดวงประจำวัน</h2>
      <p className="horoscope-text">{dayIndex === null ? "กำลังทำนาย..." : HOROSCOPE_BY_DAY[dayIndex]}</p>
    </div>
  );
}
