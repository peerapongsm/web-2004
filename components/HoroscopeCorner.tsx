"use client";

import { useEffect, useState } from "react";
import { MuseumInfoButton } from "./MuseumInfoButton";

const HOROSCOPE_BY_DAY = [
  "วันอาทิตย์: พลังงานดีมว๊ากทั้งวันเรย เหมาะกะการอัปเดตเว็บแล้วก้อตอบ Guestbook ที่ค้างไว้น๊า",
  "วันจันทร์: 😩 เกลียดวันจันทร์ที่สุดเรยอ่ะ!!! ระวังครูเช็คการบ้านน๊า แนะนำเปิดเพงประจำเว็บให้จัยฟูจร้า",
  "วันอังคาร: โชคดีเรื่องเน็ตจร้า โหลดไฟล์ม่ายมีสะดุดทั้งวันเรยยย",
  "วันพุธ: มีคนแอบมาดู Profile ของเทอบ่อยกว่าปกติน๊า ลองเช็ค Hit Counter ดูดิ",
  "วันพฤหัสบดี: เหมาะกะการตีบอสในกิลด์ Ragnarok หรือคุย MSN กะเพื่อนสนิทมว๊ากๆ",
  "วันศุกร์: อารมณ์ดีสุดในรอบสัปดาห์เรย เหมาะกะการแต่งเว็บใหม่ให้ฟรุ้งฟริ้งกว่าเดิมจร้า",
  "วันเสาร์: เวลาว่างเยอะงุงิ เหมาะกะการเขียนบันทึกยาวๆ ในกระทู้ Pantip น๊า",
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
      <h2 className="section-title">🔮 มุมดูดวงประจำวันจร้า</h2>
      <p className="horoscope-text">{dayIndex === null ? "กำลังทำนายอยู่จร้า..." : HOROSCOPE_BY_DAY[dayIndex]}</p>
    </div>
  );
}
