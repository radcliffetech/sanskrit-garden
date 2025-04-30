export const navigationConfig = [
  {
    label: "Alphabet (वर्णमाला)",
    dropdown: [
      { label: "Sanskrit Alphabet (संस्कृतवर्णमाला)", href: "/alphabet" },
      { label: "Lexical Treasury (अक्षरकोशः)", href: "/lexical-treasury" },
    ],
  },
  {
    label: "Learning Tools (अध्ययनोपकरणानि)",
    dropdown: [
      { label: "AI Explainer (यन्त्रविवचकः)", href: "/explain-concept" },
      { label: "AI Storyteller (यन्त्रकथकः)", href: "/storyteller" },
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
