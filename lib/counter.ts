// Hit counter: the classic "004217 คนแล้วที่มาเยี่ยมชม" GeoCities/hi5-era widget.
// START_COUNT is the traditional inflated starting number (ธรรมเนียมโม้ยอดผู้เข้าชม).

export const STORAGE_KEY = "web2004-hit-counter";
export const START_COUNT = 4217;

export interface CounterStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Zero-pads to at least 6 digits; never truncates larger numbers. */
export function formatHitCount(n: number): string {
  return String(n).padStart(6, "0");
}

/** Reads the stored count (or START_COUNT if missing/invalid), adds 1, persists, returns it. */
export function incrementHitCounter(storage: CounterStorage): number {
  const raw = storage.getItem(STORAGE_KEY);
  const parsed = raw === null ? NaN : parseInt(raw, 10);
  const current = Number.isFinite(parsed) ? parsed : START_COUNT;
  const next = current + 1;
  storage.setItem(STORAGE_KEY, String(next));
  return next;
}
