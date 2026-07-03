"use client";

import { useState } from "react";
import { quizQuestions, scoreQuiz, getQuizResult, type QuizResult } from "@/lib/quiz";
import { MuseumInfoButton } from "./MuseumInfoButton";

export function FriendQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(quizQuestions.map(() => null));
  const [result, setResult] = useState<QuizResult | null>(null);

  const allAnswered = answers.every((a) => a !== null);

  function selectAnswer(qIndex: number, optionIndex: number) {
    setResult(null);
    setAnswers((prev) => prev.map((a, i) => (i === qIndex ? optionIndex : a)));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    const score = scoreQuiz(answers as number[]);
    setResult(getQuizResult(score));
  }

  function handleReset() {
    setAnswers(quizQuestions.map(() => null));
    setResult(null);
  }

  return (
    <div className="quiz-panel">
      <MuseumInfoButton id="friend-quiz" />
      <h2 className="section-title">💖 เทอเปงเพื่อนแท้ของเม๋ย์รึป่าววว?</h2>
      {quizQuestions.map((q, qIndex) => (
        <fieldset key={q.id} className="quiz-question">
          <legend>{q.question}</legend>
          {q.options.map((opt, optIndex) => (
            <button
              key={optIndex}
              type="button"
              className={`quiz-option${answers[qIndex] === optIndex ? " selected" : ""}`}
              aria-pressed={answers[qIndex] === optIndex}
              onClick={() => selectAnswer(qIndex, optIndex)}
            >
              {opt.text}
            </button>
          ))}
        </fieldset>
      ))}
      <div className="quiz-actions">
        <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!allAnswered}>
          ✅ ดูผลเรยจร้า
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={handleReset}>
          🔄 ทามใหม่น๊า
        </button>
      </div>
      {result && (
        <div className="quiz-result">
          <p className="quiz-result-tier">{result.tier}</p>
          <p className="quiz-result-message">{result.message}</p>
        </div>
      )}
    </div>
  );
}
