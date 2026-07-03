// เพลงประจำเว็บ: a short 8-bit loop composed for this project (no copyrighted music),
// played back via Web Audio square-wave oscillators, gated behind a button
// (real browsers block un-requested autoplay audio — this is the playful jab at that).

export const NOTE_FREQUENCIES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
} as const;

export type NoteName = keyof typeof NOTE_FREQUENCIES;

export interface ChiptuneStep {
  /** null = rest (silence) */
  note: NoteName | null;
  /** seconds */
  duration: number;
}

/** A short, happy C-major-pentatonic loop — hand-composed for this project. */
export const melody: ChiptuneStep[] = [
  { note: "C4", duration: 0.2 },
  { note: "E4", duration: 0.2 },
  { note: "G4", duration: 0.2 },
  { note: "C5", duration: 0.2 },
  { note: "G4", duration: 0.2 },
  { note: "E4", duration: 0.2 },
  { note: "D4", duration: 0.2 },
  { note: null, duration: 0.15 },
  { note: "C4", duration: 0.2 },
  { note: "D4", duration: 0.2 },
  { note: "E4", duration: 0.2 },
  { note: "D4", duration: 0.2 },
  { note: "C4", duration: 0.2 },
  { note: null, duration: 0.15 },
  { note: "G4", duration: 0.2 },
  { note: "A4", duration: 0.2 },
  { note: "G4", duration: 0.2 },
  { note: "E4", duration: 0.2 },
  { note: "C4", duration: 0.3 },
];

export function noteToFrequency(note: NoteName): number {
  const freq = NOTE_FREQUENCIES[note];
  if (freq === undefined) {
    throw new Error(`unknown note: ${note}`);
  }
  return freq;
}

export function totalDuration(sequence: ChiptuneStep[]): number {
  return sequence.reduce((sum, step) => sum + step.duration, 0);
}

const MIN_STEPS = 4;
const MAX_STEPS = 128;
const MIN_TOTAL_SECONDS = 1;
const MAX_TOTAL_SECONDS = 30;
const MIN_FREQ_HZ = 80;
const MAX_FREQ_HZ = 2000;

/** Validates loop length, per-step durations/notes, and overall loop duration. Returns error strings. */
export function validateSequence(sequence: ChiptuneStep[]): string[] {
  const errors: string[] = [];

  if (sequence.length < MIN_STEPS) {
    errors.push(`sequence too short: ${sequence.length} steps (minimum ${MIN_STEPS})`);
  }
  if (sequence.length > MAX_STEPS) {
    errors.push(`sequence too long: ${sequence.length} steps (maximum ${MAX_STEPS})`);
  }

  sequence.forEach((step, i) => {
    if (!(step.duration > 0)) {
      errors.push(`step ${i}: duration must be positive, got ${step.duration}`);
    }
    if (step.note !== null) {
      const freq = NOTE_FREQUENCIES[step.note];
      if (freq === undefined) {
        errors.push(`step ${i}: unknown note "${step.note}"`);
      } else if (freq < MIN_FREQ_HZ || freq > MAX_FREQ_HZ) {
        errors.push(`step ${i}: note frequency ${freq}Hz out of range`);
      }
    }
  });

  const total = totalDuration(sequence);
  if (total < MIN_TOTAL_SECONDS || total > MAX_TOTAL_SECONDS) {
    errors.push(`total duration out of sane loop range: ${total}s`);
  }

  return errors;
}

// --- thin Web Audio playback wiring ---
// Minimal duck-typed interfaces so this stays unit-testable without a real AudioContext.

export interface ChiptuneOscillator {
  type: OscillatorType;
  frequency: { setValueAtTime(value: number, time: number): void };
  connect(destination: unknown): void;
  start(time?: number): void;
  stop(time?: number): void;
}

export interface ChiptuneGain {
  gain: {
    setValueAtTime(value: number, time: number): void;
    linearRampToValueAtTime(value: number, endTime: number): void;
  };
  connect(destination: unknown): void;
}

export interface ChiptuneAudioContext {
  currentTime: number;
  destination: unknown;
  createOscillator(): ChiptuneOscillator;
  createGain(): ChiptuneGain;
}

const PEAK_GAIN = 0.2;

/** Schedules the sequence as square-wave beeps starting at ctx.currentTime. Fire-and-forget. */
export function playChiptuneLoop(ctx: ChiptuneAudioContext, sequence: ChiptuneStep[] = melody): void {
  let t = ctx.currentTime;
  for (const step of sequence) {
    if (step.note !== null) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(noteToFrequency(step.note), t);
      gain.gain.setValueAtTime(PEAK_GAIN, t);
      gain.gain.linearRampToValueAtTime(0, t + step.duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + step.duration);
    }
    t += step.duration;
  }
}
