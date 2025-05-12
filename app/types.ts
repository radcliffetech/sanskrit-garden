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
};

export type Article = {
  id: string; // uuid
  slug: string; // slug for URL
  title: string;
  author: string;
  description: string; // One line description
  content: string;
  keywords: string[];
};

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
  description: string;
  commentary: string;
  analysis: string;
  verses: Verse[];
};

export type Shkloka = {
  id: string;
  title: string;
  author: string;
  description: string;
  verses: Verse[];
};

export type Verse = {
  id: string;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
};

export type Shabda = {
  name: string; // "रामः"
  stem: string; // "राम"
  gender: string; // "masculine" | "feminine" | "neuter";

  declensionClass: string; // "a-stem" | "ā-stem" | "i-stem" | etc.

  baseForm: string; // "रामः" (nominative singular)
  meaning: string; // "Rama"

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

export type VerbShabda = {
  root: string; // "गम्"
  baseForm: string; // "गच्छति"
  meaning: string; // "to go"
  tense: "present" | "past" | "future";
  voice: "active" | "middle" | "passive";
  conjugation: {
    [person: string]: [string, string, string]; // [singular, dual, plural]
  };
};

export type DhatuTree = {
  root: string; // "गम्"
  meaning: string; // "to go"
  class: number; // verb class, e.g., 1
  forms: {
    label: string;
    type: "verb" | "participle" | "noun" | "gerund";
    derivations: {
      form: string; // e.g. "गच्छति"
      transliteration: string; // e.g. "gacchati"
      path: string[]; // e.g. ["गम्", "+", "छ", "+", "ति"]
      pathIAST: string[]; // e.g. ["gam", "+", "cha", "+", "ti"]
      meanings?: string[];
    }[];
  }[];
};
export type DhatuCatalogEntry = {
  root: string; // e.g. "गम्"
  transliteration: string; // e.g. "gam"
  meaning: string; // e.g. "to go"
  class: number; // Paninian verb class (1–10)
  voice: "P" | "A" | "U"; // Parasmaipada, Atmanepada, Ubhayapadi
  transitivity?: "transitive" | "intransitive" | "both";
};

export interface FeatureBase {
  id: string; // Unique identifier for the item
  title: string;
  description: string;
  screenshots?: string[]; // Screenshots or gallery images
  keywords?: string[]; // Keywords for search and filtering
  commentary?: string; // Longer-form Markdown commentary
}

export interface Feature extends FeatureBase {
  live?: string;
  adminUrl?: string; // URL for admin controls, if applicable
  dashboardFeature?: boolean; // Whether this is a dashboard feature
  isActive?: boolean; // Whether the feature is active or inactive
  isPublic?: boolean; // Whether the feature is public or private
  parentFeature?: Feature; // ID of the parent feature, if applicable
}
