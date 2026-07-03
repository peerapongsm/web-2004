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
      <p className="music-corner-title">🎵 เพลงประจำเว็บของเมย์ 🎵</p>
      <button type="button" className="btn btn-primary" onClick={playing ? handleStop : handlePlay}>
        {playing ? "⏸ หยุดเพลง" : "▶ กดเพื่อเล่นเพลง"}
      </button>
      <p className="music-corner-note">
        *สมัยนี้เว็บเบราว์เซอร์ไม่ยอมให้เพลงเล่นเองอัตโนมัติแล้วจ้า ต้องกดปุ่มเองนะ (เมย์ก็คิดถึงตอนที่เพลงมันเล่นเองได้เลยอ่ะ 555)
      </p>
    </div>
  );
}
