export const navigationConfig = [
  { label: "Alphabet", href: "/alphabet" },
  // {
    //   label: "अध्ययनम्",
    //   dropdown: [
      //     { label: "अध्ययन-पृष्ठः", href: "/learning/" },
      //   ],
      // },
      {
        label: "Learning Tools",
        dropdown: [
          { label: "AI Explainer", href: "/explain-concept" },
          { label: "AI Storyteller", href: "/storyteller" },
          { label: "Quiz", href: "/quiz" },
    ],
  },
  {
    label: "Texts",
    dropdown: [
      { label: "Texts Home", href: "/texts/" },
      { separator: true },
      { label: "Ganesha Panchratnam", href: "/texts/ganesha-panchratnam" },
      { label: "Nirvana Shaktam", href: "/texts/nirvana-shaktam" },
      { label: "Ribhu Gita – Chapter 26", href: "/texts/ribhu-gita/chapter-26" },
    ],
  },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
];