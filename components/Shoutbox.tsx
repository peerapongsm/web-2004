"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MuseumInfoButton } from "./MuseumInfoButton";

interface ShoutEntry {
  name: string;
  text: string;
  ts: number;
}

const STORAGE_KEY = "web2004-shoutbox";
const MAX_ENTRIES = 30;

export function Shoutbox() {
  const [shouts, setShouts] = useState<ShoutEntry[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setShouts(JSON.parse(raw));
    } catch {
      // corrupted storage, start fresh
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const next = [{ name: name.trim() || "ไม่ระบุชื่อ", text: text.trim(), ts: Date.now() }, ...shouts].slice(
      0,
      MAX_ENTRIES,
    );
    setShouts(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setText("");
  }

  return (
    <div className="shoutbox-panel">
      <MuseumInfoButton id="shoutbox" />
      <h2 className="section-title">💬 Shoutbox</h2>
      <form onSubmit={handleSubmit} className="shoutbox-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อ"
          maxLength={20}
          className="retro-input shoutbox-name"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ตะโกนอะไรสักอย่าง..."
          maxLength={100}
          className="retro-input shoutbox-text"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          📣 ส่ง
        </button>
      </form>
      <ul className="shoutbox-list">
        {shouts.length === 0 && <li className="empty-note">เงียบจัง ตะโกนก่อนเลย!</li>}
        {shouts.map((s, i) => (
          <li key={i}>
            <strong>{s.name}:</strong> {s.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
