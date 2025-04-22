type Article = {
    id: string; // uuid
    title: string;
    summary: string; // One line summary
    content: string;
    keywords: string[];
}

// Sample stub data
export const sampleArticles: Article[] = [
  {
    id: "d9c8cfd6-7b79-4d36-9c38-48639b247a63",
    title: "Features of Sanskrit Grammar",
    summary: "An overview of what makes Sanskrit grammar unique.",
    content: "Sanskrit grammar is known for its precision, richness, and extensive use of inflection. It includes eight grammatical cases, three genders, and three numbers.",
    keywords: ["grammar", "features", "cases", "inflection"],
  },
  {
    id: "b22bcb3f-8f3a-4405-9a89-f9d93bb65528",
    title: "The Role of Verbs in Sanskrit",
    summary: "Understanding dhātus and how verbs function.",
    content: "Verbs in Sanskrit are derived from verbal roots called dhātus. They carry tense, mood, voice, number, and person information.",
    keywords: ["verbs", "dhātu", "conjugation", "tense"],
  },
  {
    id: "509df5c1-bd2b-4c49-8996-f41c9c1fd36d",
    title: "Nouns and Declensions",
    summary: "How nouns are formed and declined in Sanskrit.",
    content: "Sanskrit nouns are declined according to gender, number, and case. There are several declension patterns based on the ending of the stem.",
    keywords: ["nouns", "declension", "case", "gender"],
  },
  {
    id: "78e9c899-e6fa-4e5d-87dc-98f7b44cf321",
    title: "The Importance of Sandhi",
    summary: "A look into euphonic combinations in Sanskrit.",
    content: "Sandhi rules govern how sounds combine at word boundaries. They make the language fluid and phonetically elegant.",
    keywords: ["sandhi", "phonetics", "euphony"],
  },
  {
    id: "1d212b3b-d04d-4b10-bf69-d70db7d90eb0",
    title: "Introduction to Sanskrit Syntax",
    summary: "Basic word order and sentence structure.",
    content: "Although Sanskrit allows flexible word order due to its inflections, the typical structure follows Subject-Object-Verb (SOV).",
    keywords: ["syntax", "word order", "sentence structure"],
  },
];


async function getArticleById(id: string) {
  return sampleArticles.find(article => article.id === id) ?? null;
}

  export function getArticlesRepository() {
    return {
      getArticles: () => sampleArticles,
      getArticleById: async (id: string) => {
        return await getArticleById(id);
      },
    }
  }