"use client";

import Link from "next/link";
import { GlitterHeader } from "@/components/GlitterHeader";
import { Marquee } from "@/components/Marquee";
import { UnderConstructionBadge } from "@/components/UnderConstructionBadge";
import { HitCounter } from "@/components/HitCounter";
import { MusicCorner } from "@/components/MusicCorner";
import { Guestbook } from "@/components/Guestbook";
import { Shoutbox } from "@/components/Shoutbox";
import { FriendQuiz } from "@/components/FriendQuiz";
import { DeadLinks } from "@/components/DeadLinks";
import { HoroscopeCorner } from "@/components/HoroscopeCorner";
import { BestViewedBadge } from "@/components/BestViewedBadge";
import { MobileBanner } from "@/components/MobileBanner";
import { MuseumInfoButton } from "@/components/MuseumInfoButton";

export default function Home() {
  return (
    <main className="star-bg-page">
      <MobileBanner />

      <GlitterHeader />

      <Marquee text="✿ ยินดีต้อนรับสู่เว็บของเมย์ ✿ อย่าลืมเซ็น Guestbook นะ ✿ เพลงเพราะมาก อย่าลืมกดฟังด้วยล่ะ ✿ ห้ามก็อปไปโดยไม่ขอ ✿ " />

      <UnderConstructionBadge />

      <nav className="nav-buttons">
        <Link href="/method/" className="btn btn-outline btn-sm">
          🔍 ทำงานยังไง? (/method)
        </Link>
      </nav>

      <section className="profile-card">
        <h2 className="section-title">
          เกี่ยวกับเมย์ <MuseumInfoButton id="star-background" />
        </h2>
        <p>
          สวัสดีจ้า~ เมย์เองนะ เด็กม.4 คนนี้แหละ ชอบเล่น Ragnarok เปิดเพลงฟัง แล้วก็นั่งแต่งเว็บตัวเองยันดึกดื่น
          ใครผ่านมาอย่าลืมเซ็น Guestbook แล้วก็ลองทำแบบทดสอบเพื่อนแท้ดูนะ อิอิ
        </p>
      </section>

      <MusicCorner />

      <HitCounter />

      <HoroscopeCorner />

      <FriendQuiz />

      <DeadLinks />

      <Guestbook />

      <Shoutbox />

      <BestViewedBadge />

      <footer className="app-footer">
        <p>
          © 2004 โฮมเพจน้องเมย์ ม.4 · ตัวละครสมมติ ไม่มีตัวตนจริง ·{" "}
          <Link href="/method/">เกี่ยวกับเว็บนี้</Link>
        </p>
      </footer>
    </main>
  );
}
