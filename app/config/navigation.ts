type NavigationItem = (
  | {
      label: string;
      dropdown: { label?: string; href?: string; separator?: boolean }[];
    }
  | {
      label: string;
      href: string;
    }
)[];

export const navigationConfig: NavigationItem = [
  {
    label: "Sanskrit (संस्कृतम्)",
    dropdown: [

      { label: "Alphabet (संस्कृतवर्णमाला)", href: "/alphabet" },
      { label: "Nouns (संज्ञाः)", href: "/nouns" },
      { label: "Verbs (धातवः)", href: "/verbs" },
    ],
  },
  {
    label: "Explore (अन्वेषणम्)",
    dropdown: [
      { label: "Phonetic Groupings (ध्वनिवर्गाः)", href: "/phonetic-groupings" },
      { label: "Dhatu Evolution (धातवः)", href: "/dhatu-tree" },
      { label: "Dhatu Categories (धातुगणाः)", href: "/dhatu-categories" },
      { separator: true },
      { label: "AI Explainer (यन्त्रविवचकः)", href: "/explain-concept" },
      { label: "AI Storyteller (यन्त्रकथकः)", href: "/storyteller" },
      { separator: true },
      { label: "Quiz (प्रश्नमाला)", href: "/quiz" },

    ],
  },
  {
    label: "Texts (ग्रन्थाः)",
    dropdown: [
      { label: "Texts Home (मुख्यपृष्ठम्)", href: "/texts/" },
      { separator: true },
      { label: "Ganesha Panchratnam (गणेशपञ्चरत्नम्)", href: "/texts/ganesha-panchratnam" },
      { label: "Nirvana Shaktam (निर्वाणषट्कम्)", href: "/texts/nirvana-shaktam" },
      {
        label: "Ribhu Gita – Chapter 26 (ऋभुगीता – षड्विंशोऽध्यायः)",
        href: "/texts/ribhu-gita/chapter-26",
      },
    ],
  },
  { label: "Articles (लेखाः)", href: "/articles" },
  { label: "About (विवरणम्)", href: "/about" },
];
