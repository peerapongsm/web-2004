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
    question: "เม๋ย์ชื่อเล่นจิงๆ ว่าไรอ่ะ?",
    options: [
      { text: "เมย์เหมียว (ชื่อในเกม RO จร้า)", score: 3 },
      { text: "เมย์ (เดาไปงั้นๆ แหละ)", score: 1 },
      { text: "แคทลียา", score: 0 },
      { text: "ม่ายรู้จักเมย์เรยอ่ะ มาจากลิงก์หลุดจร้า", score: 0 },
    ],
  },
  {
    id: "song",
    question: "เพงประจำเว็บนี้แนวไหนอ่ะ?",
    options: [
      { text: "8-bit เพราะๆ ที่เม๋ย์นั่งแต่งเองทั้งคืนเรย", score: 3 },
      { text: "เพงเกาหลีที่กำลังฮิตจร้า", score: 1 },
      { text: "ม่ายด้ายยินเพราะม่ายด้ายกดปุ่มเล่นอ่ะ", score: 0 },
      { text: "มันมีเพงด้วยหราาา", score: 0 },
    ],
  },
  {
    id: "guestbook",
    question: "เจอ Guestbook ของเม๋ย์แล้วทามไงอ่ะ?",
    options: [
      { text: "เขียนฝากข้อความยาวๆ พร้อมอีโมติคอนจร้า", score: 3 },
      { text: "เขียนสั้นๆ ว่า 'มาแว้วน๊า'", score: 2 },
      { text: "อ่านของคนอื่นเฉยๆ ม่ายเขียนอ่ะ", score: 1 },
      { text: "ม่ายเห็น Guestbook เรยด้วยซ้ำ", score: 0 },
    ],
  },
  {
    id: "msn",
    question: "ถ้าเจอปุ่ม 'แอด MSN เม๋ย์' จะทามไงจร้า?",
    options: [
      { text: "กดเรยยย รอคุยตอนดึกๆ จร้า", score: 3 },
      { text: "กดแหละ แต่ม่ายรู้จะคุยไรดีอ่ะ", score: 2 },
      { text: "เก็บไว้ก่อน เดวค่อยแอดน๊า", score: 1 },
      { text: "MSN คือไรอ่ะ", score: 0 },
    ],
  },
  {
    id: "underconstruction",
    question: "เห็นป้าย 'Under Construction' กะพริบแล้วคิดว่าไงอ่ะ?",
    options: [
      { text: "น่ารักดีอ่ะ เปงเอกลักษณ์เว็บยุคนี้เรย", score: 3 },
      { text: "เก่าไปหน่อยแต่ก้อโอเคน๊า", score: 2 },
      { text: "งงว่าทามมายยังสร้างม่ายเสร็จสักทีอ่ะ", score: 1 },
      { text: "ม่ายทันสังเกตเรย", score: 0 },
    ],
  },
  {
    id: "horoscope",
    question: "อ่านมุมดวงของเม๋ย์แล้วเชื่อแค่ไหนอ่ะ?",
    options: [
      { text: "เชื่อสุดจัยเรย แชร์ต่อให้เพื่อนอ่านด้วยจร้า", score: 3 },
      { text: "อ่านขำๆ เผื่อโดนจิง 555", score: 2 },
      { text: "ข้ามไปเรย ม่ายเชื่อหรอกอ่ะ", score: 1 },
      { text: "ม่ายด้ายอ่านจร้า", score: 0 },
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
      tier: "เพื่อนแท้ระดับตำนานจร้าาา",
      message: "เม๋ย์ขอมอบตำแหน่ง 'เพื่อนซี้คู่ Guestbook' ให้เรยจร้า อิอิ เจอกันในเกมน๊าา",
    };
  }
  if (ratio >= 0.5) {
    return {
      tier: "เพื่อนสนิทตัวจิง",
      message: "ถือว่าสนิทกันประมาณนึงแว้วน๊า แวะมาเขียน Guestbook บ่อยๆ ด้ายเรยจร้า",
    };
  }
  if (ratio >= 0.25) {
    return {
      tier: "รู้จักกันผิวเผินอ่ะ",
      message: "ยังม่ายค่อยสนิทเท่าไหร่เรย ลองแอด MSN คุยกันดูก่อนน๊า",
    };
  }
  return {
    tier: "คนแปลกหน้าหราาา???",
    message: "หลงเข้ามาจากลิงก์ไหนเนี่ยยย ยังไงก้อขอบจัยที่แวะมาน๊าจ๊ะ",
  };
}
