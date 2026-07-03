import { describe, it, expect } from "vitest";
import { quizQuestions, scoreQuiz, getQuizResult } from "./quiz";

describe("quizQuestions", () => {
  it("has at least 5 questions", () => {
    expect(quizQuestions.length).toBeGreaterThanOrEqual(5);
  });

  it("every question has at least 3 options", () => {
    for (const q of quizQuestions) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every question and option has non-empty Thai text", () => {
    for (const q of quizQuestions) {
      expect(q.question.trim().length).toBeGreaterThan(0);
      for (const opt of q.options) {
        expect(opt.text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("scoreQuiz", () => {
  it("sums the score of the selected option per question", () => {
    const answers = quizQuestions.map(() => 0);
    const expected = quizQuestions.reduce((sum, q) => sum + q.options[0].score, 0);
    expect(scoreQuiz(answers)).toBe(expected);
  });

  it("picks the highest-score option for every question when answered with the best choice", () => {
    const answers = quizQuestions.map((q) => {
      let bestIndex = 0;
      for (let i = 1; i < q.options.length; i++) {
        if (q.options[i].score > q.options[bestIndex].score) bestIndex = i;
      }
      return bestIndex;
    });
    const max = quizQuestions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
      0,
    );
    expect(scoreQuiz(answers)).toBe(max);
  });

  it("throws when answers length does not match question count", () => {
    expect(() => scoreQuiz([0])).toThrow();
  });

  it("throws when an answer index is out of range", () => {
    const answers = quizQuestions.map(() => 999);
    expect(() => scoreQuiz(answers)).toThrow();
  });
});

describe("getQuizResult", () => {
  it("returns the lowest tier for the minimum possible score", () => {
    const minScore = quizQuestions.reduce(
      (sum, q) => sum + Math.min(...q.options.map((o) => o.score)),
      0,
    );
    const result = getQuizResult(minScore);
    expect(result.tier).toBeTruthy();
    expect(result.message.trim().length).toBeGreaterThan(0);
  });

  it("returns the highest tier for the maximum possible score", () => {
    const maxScore = quizQuestions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
      0,
    );
    const result = getQuizResult(maxScore);
    expect(result.tier).toBeTruthy();
  });

  it("min and max score produce different tiers", () => {
    const minScore = quizQuestions.reduce(
      (sum, q) => sum + Math.min(...q.options.map((o) => o.score)),
      0,
    );
    const maxScore = quizQuestions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
      0,
    );
    expect(getQuizResult(minScore).tier).not.toBe(getQuizResult(maxScore).tier);
  });
});
