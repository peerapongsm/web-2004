import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "โฮมเพจน้องเมย์ ม.4",
  description:
    "พิพิธภัณฑ์อินเทอร์เน็ตไทยยุค hi5/GeoCities แบบ interactive — โฮมเพจปลอมของน้องเมย์ ม.4 ครบทุก artifact ปี 2004 พร้อมโหมดพิพิธภัณฑ์อธิบายประวัติศาสตร์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <script
          defer
          src="https://umami-host-peerapongsms-projects.vercel.app/script.js"
          data-website-id="3f09453d-0b39-443e-8845-5e65611cc58a"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
