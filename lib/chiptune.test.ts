import { describe, it, expect, vi } from "vitest";
import {
  melody,
  NOTE_FREQUENCIES,
  noteToFrequency,
  totalDuration,
  validateSequence,
  playChiptuneLoop,
  type ChiptuneStep,
  type ChiptuneAudioContext,
} from "./chiptune";

describe("melody data", () => {
  it("has a sane loop length (4-128 steps)", () => {
    expect(melody.length).toBeGreaterThanOrEqual(4);
    expect(melody.length).toBeLessThanOrEqual(128);
  });

  it("has a sane total duration (1-30 seconds)", () => {
    const total = totalDuration(melody);
    expect(total).toBeGreaterThan(1);
    expect(total).toBeLessThan(30);
  });

  it("passes validateSequence with no errors", () => {
    expect(validateSequence(melody)).toEqual([]);
  });

  it("every note is a known, audible-range note", () => {
    for (const step of melody) {
      if (step.note !== null) {
        const freq = noteToFrequency(step.note);
        expect(freq).toBeGreaterThan(80);
        expect(freq).toBeLessThan(2000);
      }
    }
  });
});

describe("noteToFrequency", () => {
  it("looks up a known note", () => {
    expect(noteToFrequency("C4")).toBe(NOTE_FREQUENCIES.C4);
  });

  it("throws on an unknown note", () => {
    // @ts-expect-error deliberately invalid note for the test
    expect(() => noteToFrequency("Z9")).toThrow();
  });
});

describe("validateSequence", () => {
  it("flags a sequence that is too short", () => {
    const seq: ChiptuneStep[] = [{ note: "C4", duration: 0.2 }];
    expect(validateSequence(seq).length).toBeGreaterThan(0);
  });

  it("flags a non-positive duration", () => {
    const seq: ChiptuneStep[] = Array.from({ length: 5 }, () => ({ note: "C4" as const, duration: 0 }));
    expect(validateSequence(seq).some((e) => e.includes("duration"))).toBe(true);
  });

  it("flags a total duration outside the sane loop range", () => {
    const seq: ChiptuneStep[] = Array.from({ length: 5 }, () => ({ note: "C4" as const, duration: 20 }));
    expect(validateSequence(seq).some((e) => e.includes("duration"))).toBe(true);
  });
});

describe("playChiptuneLoop", () => {
  function makeMockContext(): ChiptuneAudioContext {
    return {
      currentTime: 0,
      destination: {},
      createOscillator: vi.fn(() => ({
        type: "square" as const,
        frequency: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      })),
      createGain: vi.fn(() => ({
        gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
      })),
    };
  }

  it("creates one oscillator per non-rest step", () => {
    const ctx = makeMockContext();
    playChiptuneLoop(ctx, melody);
    const noteSteps = melody.filter((s) => s.note !== null).length;
    expect(ctx.createOscillator).toHaveBeenCalledTimes(noteSteps);
  });

  it("schedules nothing for an all-rest sequence", () => {
    const ctx = makeMockContext();
    playChiptuneLoop(ctx, [
      { note: null, duration: 0.2 },
      { note: null, duration: 0.2 },
    ]);
    expect(ctx.createOscillator).not.toHaveBeenCalled();
  });
});
