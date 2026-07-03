import { describe, it, expect } from "vitest";
import { annotations, validateAnnotations, getAnnotation } from "./annotations";

describe("annotations registry", () => {
  it("has at least 15 entries", () => {
    expect(annotations.length).toBeGreaterThanOrEqual(15);
  });

  it("has unique ids", () => {
    const ids = annotations.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("passes validateAnnotations with no errors", () => {
    expect(validateAnnotations(annotations)).toEqual([]);
  });

  it("every entry has non-empty title/what/why/whyItDied", () => {
    for (const a of annotations) {
      expect(a.title.trim().length).toBeGreaterThan(0);
      expect(a.what.trim().length).toBeGreaterThan(0);
      expect(a.why.trim().length).toBeGreaterThan(0);
      expect(a.whyItDied.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("validateAnnotations", () => {
  it("flags a duplicate id", () => {
    const errors = validateAnnotations([
      { id: "a", title: "t", what: "w", why: "y", whyItDied: "d" },
      { id: "a", title: "t2", what: "w2", why: "y2", whyItDied: "d2" },
    ]);
    expect(errors.some((e) => e.includes("duplicate"))).toBe(true);
  });

  it("flags a missing required field", () => {
    const errors = validateAnnotations([{ id: "a", title: "", what: "w", why: "y", whyItDied: "d" }]);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("returns no errors for a valid minimal entry", () => {
    const errors = validateAnnotations([{ id: "a", title: "t", what: "w", why: "y", whyItDied: "d" }]);
    expect(errors).toEqual([]);
  });
});

describe("getAnnotation", () => {
  it("finds a known entry by id", () => {
    const first = annotations[0];
    expect(getAnnotation(first.id)?.title).toBe(first.title);
  });

  it("returns undefined for an unknown id", () => {
    expect(getAnnotation("does-not-exist")).toBeUndefined();
  });
});
