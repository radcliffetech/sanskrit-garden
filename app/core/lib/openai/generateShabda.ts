import type { ContentGenerator } from "~/core/lib/curations/interfaces";
import OpenAI from "openai";
import type { ShabdaEntry } from "~/types";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set.");
}

const openai = new OpenAI({ apiKey });
const exampleOutput = {
  root: "rāma",
  gender: "masculine",
  nounClass: "a-stem",
  iast: "rāma",
  devanagari: "राम",
  meaning: "Rama (a proper noun)",
  forms: {
    nominative_singular: {
      devanagari: "रामः",
      iast: "rāmaḥ",
      meaning: "Rama (subject)",
    },
    accusative_singular: {
      devanagari: "रामम्",
      iast: "rāmam",
      meaning: "Rama (object)",
    },
    instrumental_singular: {
      devanagari: "रामेण",
      iast: "rāmeṇa",
      meaning: "by/with Rama",
    },
    dative_singular: {
      devanagari: "रामाय",
      iast: "rāmāya",
      meaning: "to/for Rama",
    },
    ablative_singular: {
      devanagari: "रामात्",
      iast: "rāmāt",
      meaning: "from Rama",
    },
    genitive_singular: {
      devanagari: "रामस्य",
      iast: "rāmasya",
      meaning: "of Rama",
    },
    locative_singular: {
      devanagari: "रामे",
      iast: "rāme",
      meaning: "in/on Rama",
    },
    vocative_singular: {
      devanagari: "राम",
      iast: "rāma",
      meaning: "O Rama!",
    },
    nominative_dual: {
      devanagari: "रामौ",
      iast: "rāmau",
      meaning: "Two Ramas (subject)",
    },
    accusative_dual: {
      devanagari: "रामौ",
      iast: "rāmau",
      meaning: "Two Ramas (object)",
    },
    instrumental_dual: {
      devanagari: "रामाभ्याम्",
      iast: "rāmābhyām",
      meaning: "by/with two Ramas",
    },
    dative_dual: {
      devanagari: "रामाभ्याम्",
      iast: "rāmābhyām",
      meaning: "to/for two Ramas",
    },
    ablative_dual: {
      devanagari: "रामाभ्याम्",
      iast: "rāmābhyām",
      meaning: "from two Ramas",
    },
    genitive_dual: {
      devanagari: "रामयोः",
      iast: "rāmayoḥ",
      meaning: "of two Ramas",
    },
    locative_dual: {
      devanagari: "रामयोः",
      iast: "rāmayoḥ",
      meaning: "in/on two Ramas",
    },
    vocative_dual: {
      devanagari: "रामौ",
      iast: "rāmau",
      meaning: "O two Ramas!",
    },
    nominative_plural: {
      devanagari: "रामा:ः",
      iast: "rāmāḥ",
      meaning: "Ramas (subjects)",
    },
    accusative_plural: {
      devanagari: "रामान्",
      iast: "rāmān",
      meaning: "Ramas (objects)",
    },
    instrumental_plural: {
      devanagari: "रामैः",
      iast: "rāmaiḥ",
      meaning: "by/with Ramas",
    },
    dative_plural: {
      devanagari: "रामेभ्यः",
      iast: "rāmebhyaḥ",
      meaning: "to/for Ramas",
    },
    ablative_plural: {
      devanagari: "रामेभ्यः",
      iast: "rāmebhyaḥ",
      meaning: "from Ramas",
    },
    genitive_plural: {
      devanagari: "रामाणाम्",
      iast: "rāmāṇām",
      meaning: "of Ramas",
    },
    locative_plural: {
      devanagari: "रामेषु",
      iast: "rāmeṣu",
      meaning: "in/on Ramas",
    },
    vocative_plural: {
      devanagari: "रामा:ः",
      iast: "rāmāḥ",
      meaning: "O Ramas!",
    },
  },
};

export const shabdaGenerator: ContentGenerator<ShabdaEntry> = {
  async generate({
    root,
    gender,
    nounClass,
  }: Partial<ShabdaEntry>): Promise<ShabdaEntry> {
    const prompt = generatePrompt({ root, gender, nounClass });
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    if (result.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }
    const content = result.choices[0].message?.content?.trim();
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }
    const json = JSON.parse(content);
    console.log("Generated JSON:", json);
    const now = new Date().toISOString();
    const semanticId = `${json.root}-${gender}-${nounClass}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    const fullEntry: ShabdaEntry = {
      ...json,
      id: semanticId,
      gender,
      nounClass,
      createdAt: now,
      updatedAt: now,
      source: "openai",
      status: "candidate",
    };

    return fullEntry;
  },
};

function generatePrompt({ root, gender, nounClass }: Partial<ShabdaEntry>) {
  const prompt = `You are a Sanskrit grammar engine trained to generate full noun declension tables based on classical grammar rules.

Task:
Given a noun stem, gender, and stem class, return a JSON object with:
- "iast": transliterated stem
- "devanagari": Devanagari rendering
- "meaning": English meaning of the noun
- "forms": a map of 24 grammatical forms
- "root": the stem itself

Requirements:
- Include all 8 cases × 3 numbers = 24 forms
- Key format: "<case>_<number>", e.g. "dative_plural"
- Values are objects with "devanagari", "iast", and "meaning"
- Output must be pure JSON (no markdown or explanation)
- Do not include metadata like "gender", "stem", or "class"

Linguistic constraints:
- For neuter nouns: nominative == accusative
- For a-stem nouns: dative/ablative plural → "-ebhyaḥ"
- Use IAST conventions
- Preserve correct sandhi and accent

Example output:

${JSON.stringify(exampleOutput, null, 2)}

Input:
Stem: "${root}"  
Gender: "${gender}"  
Class: "${nounClass}"
`;
  return prompt.trim();
}
