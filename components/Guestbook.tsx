"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MuseumInfoButton } from "./MuseumInfoButton";

interface GuestbookEntry {
  name: string;
  message: string;
  ts: number;
}

const STORAGE_KEY = "web2004-guestbook";
const MAX_ENTRIES = 50;

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      // corrupted storage, start fresh
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next = [{ name: name.trim(), message: message.trim(), ts: Date.now() }, ...entries].slice(
      0,
      MAX_ENTRIES,
    );
    setEntries(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setName("");
    setMessage("");
  }

  return (
    <div className="guestbook-panel">
      <MuseumInfoButton id="guestbook" />
      <h2 className="section-title">📖 สมุดเยี่ยมของเม๋ย์ (Guestbook) จร้า</h2>
      <form onSubmit={handleSubmit} className="guestbook-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อของเทอจร้า"
          maxLength={40}
          className="retro-input"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ฝากข้อความถึงเม๋ย์หน่อยน๊าา~"
          maxLength={280}
          className="retro-input"
          rows={2}
        />
        <button type="submit" className="btn btn-primary btn-sm">
          ✍️ ฝากข้อความเรยจร้า
        </button>
      </form>
      <p className="local-only-note">
        *ข้อความเก็บไว้แค่ในเครื่องคุณเท่านั้นนะ (ของจริงยุคนั้นมี server เก็บให้ทุกคนเห็นข้อความกัน)
      </p>
      <ul className="guestbook-list">
        {entries.length === 0 && <li className="empty-note">ยังม่ายมีคัยฝากข้อความเรยอ่ะ เปงคนแรกสิจร้า!</li>}
        {entries.map((entry, i) => (
          <li key={i}>
            <strong>{entry.name}</strong>: {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
