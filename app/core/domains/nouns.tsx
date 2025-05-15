import tk, { type CurationObject } from "~/core/lib/curations/toolkit";
import chalk from "chalk";

type ShabdaEntry = CurationObject & {
  root: string;
  gender: "masculine" | "feminine" | "neuter";
  nounClass: string;

  iast: string;
  devanagari: string;
  meaning: string;

  source?: "openai" | "manual" | "imported";
  validatedAt?: string;
  notes?: string;

  forms: {
    [key: string]: {
      devanagari: string;
      iast: string;
      meaning: string;
    };
  };
};

function NounDetailView({ noun }: { noun: ShabdaEntry }) {
  return (
    <div>
      <h2>{noun.root}</h2>
    </div>
  );
}

// Firestore collections
const { collectionId, version } = { collectionId: "nouns", version: "1" };

export const repo = tk.createRepoFromConfig<ShabdaEntry>(collectionId, version);

// Generator prompt - creates full noun declension tables based on stem, gender, class
function generatePrompt({ root, gender, nounClass }: Partial<ShabdaEntry>) {
  return `
You are a Sanskrit grammar engine trained to generate full noun declension tables based on classical grammar rules.
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
Input:
Stem: "${root}"  
Gender: "${gender}"  
Class: "${nounClass}"
`.trim();
}

// Reviewer prompt - verifies correctness of declined noun forms
function generateReviewPrompt(entry: ShabdaEntry): string {
  return `You are a Sanskrit grammar assistant reviewing a declined noun entry.
Your job is to verify that the noun is declined correctly based on its gender and stem class. The data includes 24 forms (8 cases × 3 numbers), each with Devanagari, IAST, and English meaning.
✔ If all forms are correct, return:
- "approved": true
- "suggestions": []
- no patch
❌ If there are errors:
- "approved": false
- list specific issues in "suggestions"
- include a "patch" with only the corrected keys
⚠ Do not make stylistic changes.
⚠ Do not suggest alternate correct spellings.
⚠ Do not suggest changes unless a form violates grammatical rules.
Respond in JSON format with:
- confidence: 0–1 float
- summary: short assessment
- approved: true/false
- suggestions: array of issues or improvements (optional)
If you detect any errors or improvements, include a patch key that shows a partial corrected version of the input structure.
If any field is incorrect (iast, devanagari, meaning), include all corrected fields in the patch. Do not leave incorrect parts untouched.
Here is the Entry to review:
${JSON.stringify(entry, null, 2)}
`.trim();
}

const generator = tk.createLLMGenerator<Partial<ShabdaEntry>, ShabdaEntry>({
  prompt: generatePrompt,
  parse: (json, input) => {
    const now = new Date().toISOString();
    const semanticId = `${json.root}-${input.gender}-${input.nounClass}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    return {
      ...json,
      id: semanticId,
      gender: input.gender!,
      nounClass: input.nounClass!,
      createdAt: now,
      updatedAt: now,
      source: "openai",
      status: "candidate",
    };
  },
});

const reviewer = tk.createLLMReviewer<ShabdaEntry>({
  prompt: generateReviewPrompt,
  parse: (json, input) => {
    if (Array.isArray(json.suggestions))
      json.suggestions = json.suggestions.map((s: any) =>
        typeof s === "string" ? s : JSON.stringify(s)
      );
    return {
      confidence: json.confidence,
      summary: json.summary,
      approved: json.approved,
      suggestions: json.suggestions ?? [],
      ...(json.justification ? { justification: json.justification } : {}),
      ...(json.patch ? { patch: json.patch } : {}),
    };
  },
});

const nounsConfig = tk.createCuration<ShabdaEntry>({
  namespace: "nouns",
  repo,
  generator,
  reviewer,
  cli: {
    printSummary: (entry) => {
      console.log(`${entry.root} (${entry.gender}, ${entry.nounClass})`);
    },
    printRow: (entry) => {
      const line = [
        chalk.gray(entry.id || "").padEnd(16),
        chalk.gray(entry.status || "").padEnd(12),
        chalk.cyan((entry.root || "").padEnd(12)),
        chalk.yellow(entry.gender || "").padEnd(12),
        chalk.blue(entry.nounClass || "").padEnd(12),
        chalk.green(entry.meaning || "").padEnd(12),
      ].join("  ");
      console.log(line);
    },
  },
  ui: {
    renderRow: (entry) => [
      <td>{entry.root}</td>,
      <td>{entry.gender}</td>,
      <td>{entry.status}</td>,
    ],
    renderDetail: (entry) => <NounDetailView noun={entry} />,
  },
  requiredActions: {
    generate: tk.createStandardGenerateAction({
      repo,
      generator,
      getId: (data) =>
        `${data.root}-${data.gender}-${data.nounClass}`.toLowerCase(),
      meta: {
        label: "Generate Object",
        description: "Generate a new object from inputs.",
      },
      inputParams: [
        { name: "root", label: "Root", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
      ],
    }),
    request: tk.createStandardRequestAction({
      repo,

      meta: {
        label: "Create Generation Request",
        description: "Create a request to generate a new object.",
      },
      inputParams: [
        { name: "root", label: "Root", type: "string", required: true },
        { name: "gender", label: "Gender", type: "string", required: true },
        { name: "nounClass", label: "Class", type: "string", required: true },
        {
          name: "requestedBy",
          label: "Requested By",
          type: "string",
          inputHint: "text",
        },
        {
          name: "reason",
          label: "Reason",
          type: "string",
          inputHint: "text",
        },
      ],
    }),
  },
});

export default nounsConfig;
