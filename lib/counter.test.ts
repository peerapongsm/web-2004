import { describe, it, expect } from "vitest";
import { formatHitCount, incrementHitCounter, START_COUNT, type CounterStorage } from "./counter";

function makeMemoryStorage(initial: Record<string, string> = {}): CounterStorage {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (key) => (store.has(key) ? store.get(key)! : null),
    setItem: (key, value) => {
      store.set(key, value);
    },
  };
}

describe("formatHitCount", () => {
  it("zero-pads to 6 digits", () => {
    expect(formatHitCount(0)).toBe("000000");
    expect(formatHitCount(42)).toBe("000042");
    expect(formatHitCount(4217)).toBe("004217");
  });

  it("does not truncate numbers longer than 6 digits", () => {
    expect(formatHitCount(1234567)).toBe("1234567");
  });
});

describe("incrementHitCounter", () => {
  it("starts at START_COUNT + 1 when storage is empty", () => {
    const storage = makeMemoryStorage();
    expect(incrementHitCounter(storage)).toBe(START_COUNT + 1);
  });

  it("increments an existing stored count by 1", () => {
    const storage = makeMemoryStorage({ "web2004-hit-counter": "5000" });
    expect(incrementHitCounter(storage)).toBe(5001);
  });

  it("persists the incremented value back into storage", () => {
    const storage = makeMemoryStorage();
    incrementHitCounter(storage);
    expect(incrementHitCounter(storage)).toBe(START_COUNT + 2);
  });

  it("falls back to START_COUNT when stored value is garbage", () => {
    const storage = makeMemoryStorage({ "web2004-hit-counter": "not-a-number" });
    expect(incrementHitCounter(storage)).toBe(START_COUNT + 1);
  });
});
