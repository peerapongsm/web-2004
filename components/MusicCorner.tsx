"use client";

import { useRef, useState } from "react";
import { melody, playChiptuneLoop, totalDuration } from "@/lib/chiptune";
import { MuseumInfoButton } from "./MuseumInfoButton";

export function MusicCorner() {
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    playChiptuneLoop(ctx, melody);
    const loopMs = totalDuration(melody) * 1000;
    intervalRef.current = setInterval(() => playChiptuneLoop(ctx, melody), loopMs);
    setPlaying(true);
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPlaying(false);
  }

  return (
    <div className="music-corner">
      <MuseumInfoButton id="autoplay-music" />
      <p className="music-corner-title">🎵 เพงประจำเว็บของเม๋ย์จร้า 🎵</p>
      <button type="button" className="btn btn-primary" onClick={playing ? handleStop : handlePlay}>
        {playing ? "⏸ หยุดเพงก่อนน๊า" : "▶ กดฟังเพงเรยจร้า"}
      </button>
      <p className="music-corner-note">
        *เดวนี้เบราว์เซอร์ม่ายยอมให้เพงเล่นเองอัตโนมัติแว้วจร้า ต้องกดปุ่มเองน๊า (เมย์ก้อคิดถุงตอนที่เพงมันเล่นเองด้ายเรยอ่ะ 555)
      </p>
      <p className="music-corner-title">📺 MV เพงโปรดของเม๋ย์ ชอบมว๊ากๆ เปิดวนทั้งวันเรย 📺</p>
      <iframe
        className="mv-embed"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/SeioAfpmHvg?si=oSBgASb3QzJ57cuS"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
