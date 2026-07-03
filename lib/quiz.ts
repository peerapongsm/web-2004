// "คุณเป็นเพื่อนแท้ของเมย์รึเปล่า" — the classic hi5/GeoCities-era friend quiz widget.
// Every option carries a 0-3 "true friend" score; total score maps to a tier via getQuizResult.

export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "nickname",
    question: "เมย์ชื่อเล่นจริงๆ ว่าอะไร?",
    options: [
      { text: "เมย์เหมียว (ชื่อในเกม RO)", score: 3 },
      { text: "เมย์ (เดาไปงั้นๆ)", score: 1 },
      { text: "แคทลียา", score: 0 },
      { text: "ไม่รู้จักเมย์เลย มาจากลิงก์หลุด", score: 0 },
    ],
  },
  {
    id: "song",
    question: "เพลงประจำเว็บนี้แนวไหน?",
    options: [
      { text: "8-bit เพราะๆ ที่เมย์นั่งแต่งเองทั้งคืน", score: 3 },
      { text: "เพลงเกาหลีที่กำลังฮิต", score: 1 },
      { text: "ไม่ได้ยินเพราะไม่ได้กดปุ่มเล่น", score: 0 },
      { text: "มันมีเพลงด้วยเหรอ", score: 0 },
    ],
  },
  {
    id: "guestbook",
    question: "เจอ Guestbook ของเมย์แล้วทำไง?",
    options: [
      { text: "เขียนฝากข้อความยาวๆ พร้อมอีโมติคอน", score: 3 },
      { text: "เขียนสั้นๆ ว่า 'มาแล้วนะ'", score: 2 },
      { text: "อ่านของคนอื่นเฉยๆ ไม่เขียน", score: 1 },
      { text: "ไม่เห็น Guestbook เลยด้วยซ้ำ", score: 0 },
    ],
  },
  {
    id: "msn",
    question: "ถ้าเจอปุ่ม 'แอด MSN เมย์' จะทำไง?",
    options: [
      { text: "กดเลย รอคุยตอนดึกๆ", score: 3 },
      { text: "กด แต่ไม่รู้จะคุยอะไรดี", score: 2 },
      { text: "เก็บไว้ก่อน เดี๋ยวค่อยแอด", score: 1 },
      { text: "MSN คืออะไร", score: 0 },
    ],
  },
  {
    id: "underconstruction",
    question: "เห็นป้าย 'Under Construction' กะพริบแล้วคิดว่าไง?",
    options: [
      { text: "น่ารักดี เป็นเอกลักษณ์เว็บยุคนี้เลย", score: 3 },
      { text: "เก่าไปหน่อยแต่ก็โอเค", score: 2 },
      { text: "งงว่าทำไมยังสร้างไม่เสร็จสักที", score: 1 },
      { text: "ไม่ทันสังเกต", score: 0 },
    ],
  },
  {
    id: "horoscope",
    question: "อ่านมุมดวงของเมย์แล้วเชื่อแค่ไหน?",
    options: [
      { text: "เชื่อสุดใจ แชร์ต่อให้เพื่อนอ่านด้วย", score: 3 },
      { text: "อ่านขำๆ เผื่อโดนจริง", score: 2 },
      { text: "ข้ามไปเลย ไม่เชื่อหรอก", score: 1 },
      { text: "ไม่ได้อ่าน", score: 0 },
    ],
  },
];

/** Sums the score of the chosen option per question. Throws on shape mismatch. */
export function scoreQuiz(answerIndices: number[]): number {
  if (answerIndices.length !== quizQuestions.length) {
    throw new Error(`ต้องตอบให้ครบ ${quizQuestions.length} ข้อ ได้รับมา ${answerIndices.length} ข้อ`);
  }
  return quizQuestions.reduce((sum, q, i) => {
    const option = q.options[answerIndices[i]];
    if (!option) {
      throw new Error(`คำตอบข้อที่ ${i + 1} ไม่ถูกต้อง`);
    }
    return sum + option.score;
  }, 0);
}

export interface QuizResult {
  tier: string;
  message: string;
}

function minPossibleScore(): number {
  return quizQuestions.reduce((sum, q) => sum + Math.min(...q.options.map((o) => o.score)), 0);
}

function maxPossibleScore(): number {
  return quizQuestions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0);
}

/** Maps a total score to a friendship tier, scaled against the actual min/max of quizQuestions. */
export function getQuizResult(totalScore: number): QuizResult {
  const min = minPossibleScore();
  const max = maxPossibleScore();
  const ratio = max === min ? 1 : (totalScore - min) / (max - min);

  if (ratio >= 0.75) {
    return {
      tier: "เพื่อนแท้ระดับตำนาน",
      message: "เมย์ขอมอบตำแหน่ง 'เพื่อนซี้คู่ Guestbook' ให้เลยจ้า อิอิ เจอกันในเกมนะ",
    };
  }
  if (ratio >= 0.5) {
    return {
      tier: "เพื่อนสนิทตัวจริง",
      message: "ถือว่าสนิทกันประมาณนึงแล้วนะ แวะมาเขียน Guestbook บ่อยๆ ได้เลย",
    };
  }
  if (ratio >= 0.25) {
    return {
      tier: "รู้จักกันผิวเผิน",
      message: "ยังไม่ค่อยสนิทเท่าไหร่ ลองแอด MSN คุยกันดูก่อนนะ",
    };
  }
  return {
    tier: "คนแปลกหน้า???",
    message: "หลงเข้ามาจากลิงก์ไหนเนี่ย ยังไงก็ขอบคุณที่แวะมานะจ๊ะ",
  };
}
