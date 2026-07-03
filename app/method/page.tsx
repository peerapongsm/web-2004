import Link from "next/link";

export const metadata = {
  title: "ทำงานยังไง? — โฮมเพจน้องเมย์ ม.4",
};

export default function MethodPage() {
  return (
    <main>
      <header className="app-header">
        <h1>ทำงานยังไง?</h1>
        <div className="nav-buttons">
          <Link href="/" className="btn btn-outline">
            กลับหน้าหลัก
          </Link>
        </div>
      </header>

      <div className="method-content">
        <h2>เว็บนี้คืออะไร</h2>
        <p>
          หน้าเว็บนี้เป็น <strong>พิพิธภัณฑ์อินเทอร์เน็ตไทยยุค hi5/GeoCities</strong> แบบ interactive — จำลองหน้า
          &quot;โฮมเพจส่วนตัว&quot; แบบที่วัยรุ่นไทยทำเล่นกันช่วงต้นถึงกลางยุค 2000 ครบทุก artifact เท่าที่จะรวมได้ในหน้าเดียว
          ตั้งใจให้คนอายุ 30 ปีขึ้นไปเห็นแล้วคิดถึง และให้คนรุ่นหลังได้เห็นว่าอินเทอร์เน็ตไทยยุคก่อนโซเชียลมีเดียหน้าตาเป็นแบบไหน
        </p>

        <h2>เมย์คือใคร (fictional persona disclosure)</h2>
        <p>
          &quot;น้องเมย์ ม.4&quot; เป็น<strong>ตัวละครสมมติ 100%</strong> สร้างขึ้นเพื่อเป็นเจ้าของโฮมเพจจำลองในเว็บนี้เท่านั้น
          ไม่ได้อิงชื่อ รูป ข้อมูล หรือเรื่องราวของบุคคลจริงคนใดคนหนึ่ง Guestbook, Shoutbox,
          และผลแบบทดสอบทั้งหมดที่ปรากฏบนเว็บก็เป็นข้อมูลตัวอย่างที่สร้างไว้ล่วงหน้าหรือเก็บไว้เฉพาะในเบราว์เซอร์ของผู้ใช้แต่ละคนเอง
          (localStorage) ไม่มีการส่งข้อมูลจริงของใครไปเก็บที่เซิร์ฟเวอร์ไหนทั้งสิ้น
        </p>

        <h2>แรงบันดาลใจ</h2>
        <p>
          อ้างอิงจากความทรงจำร่วมของยุคเว็บส่วนตัว/hi5/GeoCities/Exteen ในไทยช่วงปี 2003-2008: sparkle cursor,
          พื้นหลังลายดาว, ตัวหนังสือกากเพชร, ข้อความวิ่ง, ป้าย Under Construction กะพริบ, เพลงประจำเว็บที่เล่นเอง,
          Guestbook/Shoutbox, แบบทดสอบเพื่อนแท้, ลิงก์ MSN/Ragnarok/Pantip, มุมดูดวง และ badge &quot;Best viewed 800×600&quot;
          — ทุกอย่างคือของที่เคยมีจริงในเว็บยุคนั้น แต่<strong>ไม่มีชิ้นไหนก็อปมาจากเว็บจริงเว็บใดเว็บหนึ่งโดยตรง</strong>
        </p>

        <h2>ทุกอย่างสร้างใหม่ทั้งหมด</h2>
        <p>
          ตามกติกาของโปรเจกต์ในชุด project-365: <strong>ห้ามใช้ asset จากภายนอก</strong> ไม่ว่าจะเป็นรูปภาพ, GIF, หรือไฟล์เพลง
          ทุกเอฟเฟกต์ในเว็บนี้จึงสร้างขึ้นใหม่ทั้งหมดด้วย CSS/SVG/canvas/Web Audio ล้วนๆ:
        </p>
        <ul>
          <li>
            <strong>Sparkle cursor</strong> — DOM particle เกิดตามตำแหน่งเมาส์ วาดด้วยตัวอักษร Unicode (✦✧★☆) แล้วจางหายด้วย
            CSS animation ไม่ใช้ GIF
          </li>
          <li>
            <strong>พื้นหลังลายดาว</strong> — ซ้อน <code>radial-gradient</code> หลายชั้นแล้ว tile ซ้ำด้วย
            <code> background-size</code> จำลองลาย GIF tile ของยุคนั้นโดยไม่ใช้ไฟล์ภาพจริง
          </li>
          <li>
            <strong>ข้อความวิ่ง</strong> — ทำด้วย CSS <code>@keyframes</code> เลื่อน <code>transform: translateX</code>{" "}
            (ไม่ใช้แท็ก <code>&lt;marquee&gt;</code> ของจริง เพราะเบราว์เซอร์สมัยใหม่เลิกรองรับแล้ว) แต่หน้าตาวิ่งเหมือนต้นฉบับ
          </li>
          <li>
            <strong>ตัวหนังสือกากเพชร</strong> — ไล่สีรุ้งด้วย <code>background-clip: text</code> แล้ววนลูปตำแหน่ง gradient
          </li>
          <li>
            <strong>เพลงประจำเว็บ</strong> — ทำนอง 8-bit แต่งเองสดๆ (ไม่ใช่เพลงลิขสิทธิ์ใดๆ) เก็บเป็นข้อมูลโน้ต/จังหวะใน{" "}
            <code>lib/chiptune.ts</code> แล้วสังเคราะห์เสียงด้วย Web Audio API (oscillator คลื่นสี่เหลี่ยม) สดๆ
            ในเบราว์เซอร์ ต้องกดปุ่มเล่นเองเสมอ (เบราว์เซอร์ยุคนี้บล็อก autoplay เสียงเป็นค่าเริ่มต้น — เว็บนี้เลยแซวธรรมเนียม
            autoplay ของยุค 2004 ผ่านปุ่มที่ต้อง &quot;กดเอง&quot;)
          </li>
          <li>
            <strong>Badge &quot;Best viewed 800×600&quot;</strong> — วาดเป็น SVG เอง ไม่ใช้ภาพ badge จากเว็บไหน
          </li>
        </ul>

        <h2>โหมดพิพิธภัณฑ์ (🏛)</h2>
        <p>
          กดปุ่ม 🏛 มุมขวาบนเพื่อเปิดโหมดพิพิธภัณฑ์ — ทุก artifact บนหน้าเว็บจะมีปุ่มเล็กๆ 🏛 ให้กดเปิดการ์ดอธิบาย
          &quot;สิ่งนี้คืออะไร / ทำไมยุคนั้นทำแบบนี้ / ทำไมมันตาย&quot; ข้อมูลทั้งหมดมาจากทะเบียน annotation ใน{" "}
          <code>lib/annotations.ts</code> (16 รายการ ผ่านการ validate ว่า id ไม่ซ้ำและข้อความครบทุกฟิลด์ด้วย Vitest)
          นี่คือชั้นการเรียนรู้ที่ซ่อนอยู่ใต้มุกตลกของหน้าเว็บ
        </p>

        <h2>Guestbook/Shoutbox ไม่มี backend จริง</h2>
        <p>
          ข้อความที่ฝากไว้ในสมุดเยี่ยมและ Shoutbox ของเว็บนี้ถูกเก็บไว้ <strong>เฉพาะในเบราว์เซอร์ของคุณ</strong> ผ่าน
          <code> localStorage</code> เท่านั้น ไม่มีเซิร์ฟเวอร์เก็บข้อมูลจริง และคนอื่นจะไม่เห็นข้อความที่คุณฝากไว้
          (ของจริงในยุค 2004 อย่าง Bravenet/Dreambook จะมีเซิร์ฟเวอร์กลางเก็บให้ทุกคนเห็นข้อความเดียวกัน)
        </p>

        <h2>สแต็กเทคนิค</h2>
        <p>
          Next.js 15 (static export, <code>output: &quot;export&quot;</code>), TypeScript, Vitest สำหรับทดสอบ
          logic layer (<code>lib/annotations.ts</code>, <code>lib/counter.ts</code>, <code>lib/quiz.ts</code>,{" "}
          <code>lib/chiptune.ts</code>) ไม่มี runtime dependency นอกจาก React/Next เอง ไม่มี service worker
          เพจ parody นี้จงใจใช้ <code>&lt;table&gt;</code> layout ในบางส่วน (ดูมุม &quot;ลิงก์เพื่อนๆ ของเมย์&quot;
          พร้อมการ์ด museum อธิบายว่าทำไม) แต่ปุ่มที่กดได้ทุกปุ่มยังเป็น <code>&lt;button&gt;</code> ที่ styled แบบ 2004
          เพื่อให้ยังใช้งานได้จริงและเข้าถึงได้
        </p>
      </div>

      <footer className="app-footer">
        <p>โฮมเพจน้องเมย์ ม.4 · พิพิธภัณฑ์อินเทอร์เน็ตไทยยุค 2004 · ทุกอย่างสร้างใหม่ ไม่มี asset จากยุคนั้นจริง</p>
      </footer>
    </main>
  );
}
