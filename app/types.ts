export type QuizQuestion = {
  id: string; // UUUID
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: string;
};

export enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

export type AlphabetItem = {
    char: string;
    latin: string;
    pronunciation: string;
}

export type Article = {
    id: string; // uuid
    title: string;
    author: string;
    summary: string; // One line summary
    content: string;
    keywords: string[];
}

export type StorySegment = {
    title: string;
    content: string;
    reference?: string;
    followup?: string;
  };
  export type GitaChapter = {
    id: string;
    chapter: number;
    title: string;
    author: string;
    summary: string;
    commentary: string;
    analysis: string;
    verses: Verse[];
  };
  
  export type Shkloka = {
    id: string;
    title: string;
    author: string;
    summary: string;
    verses: Verse[];
   }
  
  
  export type Verse = {
    id: string;
    verse: number;
    sanskrit: string;
    transliteration: string;
    translation: string;
    commentary: string;
  };
  
  export type Shabda = {
    name: string;         // "रामः"
    stem: string;         // "राम"
    gender: string;       // "masculine" | "feminine" | "neuter";
   
    declensionClass: string; // "a-stem" | "ā-stem" | "i-stem" | etc.
   
    baseForm: string;     // "रामः" (nominative singular)
    meaning: string;      // "Rama"
  
    declension: {
      nominative: string[];
      accusative: string[];
      instrumental: string[];
      dative: string[];
      ablative: string[];
      genitive: string[];
      locative: string[];
      vocative: string[];
    };
  };