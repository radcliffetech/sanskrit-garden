export enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

export type QuizQuestion = {
  id: string; // UUUID
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: string;
};

export function getQuizQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [
    // easy
    {
      id: "1",
      difficulty: Difficulty.easy,
      question: "What script is primarily used to write Sanskrit today?",
      options: ["Latin", "Devanagari", "Tamil", "Greek"],
      answer: "Devanagari",
    },
    {
      id: "2",
      difficulty: Difficulty.easy,
      question: "How many vowels are there in the Sanskrit alphabet?",
      options: ["5", "10", "13", "16"],
      answer: "13",
    },
    {
      id: "3",
      difficulty: Difficulty.easy,
      question: "Which of the following is a classical Sanskrit text?",
      options: ["Mahabharata", "Quran", "Tao Te Ching", "Bible"],
      answer: "Mahabharata",
    },
    {
      id: "4",
      difficulty: Difficulty.easy,
      question: "What type of language is Sanskrit?",
      options: ["Romance", "Semitic", "Indo-Aryan", "Slavic"],
      answer: "Indo-Aryan",
    },
    {
      id: "5",
      difficulty: Difficulty.easy,
      question: "Which famous Indian epic is written in Sanskrit?",
      options: ["Odyssey", "Ramayana", "Iliad", "Gilgamesh"],
      answer: "Ramayana",
    },

    // medium
    {
      id: "6",
      difficulty: Difficulty.medium,
      question: "Which Sanskrit grammarian wrote the 'Ashtadhyayi'?",
      options: ["Valmiki", "Patanjali", "Panini", "Vyasa"],
      answer: "Panini",
    },
    {
      id: "7",
      difficulty: Difficulty.medium,
      question: "What is the term for a verbal root in Sanskrit grammar?",
      options: ["Pratyaya", "Sandhi", "Dhatu", "Vibhakti"],
      answer: "Dhatu",
    },
    {
      id: "8",
      difficulty: Difficulty.medium,
      question: "How many cases (vibhaktis) are there in Sanskrit grammar?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
    {
      id: "9",
      difficulty: Difficulty.medium,
      question: "Which of the following is NOT a Sanskrit meter (chandas)?",
      options: ["Anushtubh", "Gayatri", "Haiku", "Trishtubh"],
      answer: "Haiku",
    },
    {
      id: "10",
      difficulty: Difficulty.medium,
      question: "What does the term 'Sandhi' refer to in Sanskrit grammar?",
      options: ["A vowel", "A noun", "Euphonic combination", "A verb form"],
      answer: "Euphonic combination",
    },

    // hard
    {
      id: "11",
      difficulty: Difficulty.hard,
      question: "Which text by Panini describes Sanskrit grammar rules?",
      options: ["Mahabhashya", "Ashtadhyayi", "Vakyapadiya", "Nirukta"],
      answer: "Ashtadhyayi",
    },
    {
      id: "12",
      difficulty: Difficulty.hard,
      question: "What is the technical term for a suffix in Sanskrit grammar?",
      options: ["Upasarga", "Samasa", "Pratyaya", "Karaka"],
      answer: "Pratyaya",
    },
    {
      id: "13",
      difficulty: Difficulty.hard,
      question: "Which of these is a compound word (samasa) type in Sanskrit?",
      options: ["Tataka", "Bahuvrihi", "Avidya", "Jataka"],
      answer: "Bahuvrihi",
    },
    {
      id: "14",
      difficulty: Difficulty.hard,
      question: "What is the correct sequence of Panini's sutras known as?",
      options: ["Mahabhashya", "Astaka", "Dhatupatha", "Ashtadhyayi"],
      answer: "Ashtadhyayi",
    },
    {
      id: "15",
      difficulty: Difficulty.hard,
      question: "Which of the following is NOT a classical Sanskrit commentator?",
      options: ["Bhartrihari", "Katyayana", "Shankara", "Euclid"],
      answer: "Euclid",
    },
  ];

  return questions;
}