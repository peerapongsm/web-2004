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

      <Marquee text="✿ ยินดีต้อนรับสู่เว็บของเม๋ย์จร้าาา ✿ อย่าลืมเซ็น Guestbook ให้เมย์ด้วยน๊าา ✿ เพงเพราะมว๊ากๆ อย่าลืมกดฟังด้วยล่ะจร้า ✿ ห้ามก็อปน๊า เดี๋ยวเมย์งอนเรยยย ✿ " />

      <UnderConstructionBadge />

      <nav className="nav-buttons">
        <Link href="/method/" className="btn btn-outline btn-sm">
          🔍 ทำงานยังไง? (/method)
        </Link>
      </nav>

      <section className="profile-card">
        <h2 className="section-title">
          เกี่ยวกับเม๋ย์จร้า <MuseumInfoButton id="star-background" />
        </h2>
        <p>
          หวัดดีจร้าาา~ เม๋ย์เองน๊า เด็กม.4 คนนี้แหละงุงิ ชอบเล่น Ragnarok เปิดเพงฟัง แล้วก้อนั่งแต่งเว็บตะเองยันดึกดื่นเรยอ่ะ
          คัยผ่านมาอย่าลืมเซ็น Guestbook ให้เมย์ด้วยน๊าา แล้วก้อลองทามแบบทดสอบเพื่อนแท้ดูด้วยชิมิ อิอิ
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
