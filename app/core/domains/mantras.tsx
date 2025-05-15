import chalk from "chalk";

import tk, { type CurationObject } from "~/core/lib/curations/toolkit";

const NAMESPACE = "mantras";
const FIRESTORE_CURATION = {
  collectionId: "mantras",
  version: "1",
};

type MantraEntry = CurationObject & {
  devanagari: string;
  iast: string;
  meaning: string;
};

type MantraInput = {
  title: string;
};

type MantraRequestInput = MantraInput & {
  requestedBy?: string;
  reason?: string;
};

export const repo = tk.createRepoFromConfig<MantraEntry>(
  FIRESTORE_CURATION.collectionId,
  FIRESTORE_CURATION.version
);

// Generator prompt - creates a mantra based on title
function generatePrompt({ title }: MantraInput) {
  const exampleEntry = {
    devanagari: "ॐ भूर्भुवः स्वः",
    iast: "oṃ bhūr bhuvaḥ svaḥ",
    meaning:
      "We meditate on the divine light of that adorable supreme divine reality.",
  };

  return `
You are a Sanskrit mantra generator.
Task:
Generate a Sanskrit mantra in JSON format with the following fields:
- "devanagari": the Devanagari script of the mantra
- "iast": the IAST transliteration of the mantra
- "meaning": the English meaning of the mantra
Requirements:
- Output must be pure JSON (no markdown or explanation)
- Mantra should be precise and uplifting
- Ensure correctness in transliteration and meaning.
Mantra format:
${JSON.stringify(exampleEntry, null, 2)}  
Input Title: "${title}"
`.trim();
}

// Reviewer prompt - verifies correctness and appropriateness of the mantra
function generateReviewPrompt(entry: MantraEntry): string {
  return `You are a Sanskrit mantra reviewer.
Your job is to verify that the mantra is accurate, appropriate, and conveys the intended meaning.
✔ If the mantra is good, return:
- "approved": true
- "suggestions": []
- no patch
❌ If there are issues:
- "approved": false
- list specific issues in "suggestions"
- include a "patch" with corrections if possible
⚠ Do not make stylistic changes unrelated to mantra quality.
Respond in JSON format with:
- confidence: 0–1 float
- summary: short assessment
- approved: true/false
- suggestions: array of issues or improvements (optional)
If you detect any errors or improvements, include a patch key that shows a partial corrected version of the input structure.
Here is the Entry to review:
${JSON.stringify(entry, null, 2)}
`.trim();
}

const generator = tk.createLLMGenerator<MantraInput, MantraEntry>({
  prompt: generatePrompt,
  parse: (json, input) => {
    const now = new Date().toISOString();
    const id = `${NAMESPACE}-${crypto.randomUUID()}`;
    return {
      ...json,
      id,
      createdAt: now,
      updatedAt: now,
      source: "openai",
      status: "candidate",
    };
  },
});

const reviewer = tk.createLLMReviewer<MantraEntry>({
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

const mantrasConfig = tk.createCuration<MantraEntry>({
  namespace: NAMESPACE,
  repo,
  generator,
  reviewer,
  cli: {
    printSummary: (entry) => {
      console.log(
        `\n${chalk.cyan(entry.devanagari)} - ${chalk.yellow(
          entry.iast
        )}\n\nmeaning: ${chalk.blue(entry.meaning)}\n`
      );
    },
    printRow: (entry) => {
      const line = [
        chalk.gray(entry.id || "").padEnd(16),
        chalk.gray(entry.status || "").padEnd(12),
        chalk.cyan((entry.devanagari || "").padEnd(30)),
        chalk.yellow((entry.iast || "").padEnd(30)),
        chalk.blue(entry.meaning || "").padEnd(12),
      ].join("  ");
      console.log(line);
    },
  },
  ui: {
    renderRow: (entry) => [
      <td>{entry.devanagari}</td>,
      <td>{entry.iast}</td>,
      <td>{entry.meaning}</td>,
      <td>{entry.status}</td>,
    ],
    renderDetail: (entry) => (
      <div>
        <h3>Devanagari</h3>
        <p>{entry.devanagari}</p>
        <h3>IAST</h3>
        <p>{entry.iast}</p>
        <h3>Meaning</h3>
        <p>{entry.meaning}</p>
      </div>
    ),
  },
  requiredActions: {
    generate: tk.createStandardGenerateAction<MantraInput, MantraEntry>({
      repo,
      generator,
      meta: {
        label: "Generate Mantra",
        description: "Generate a new Sanskrit mantra by title.",
      },
      inputParams: [
        {
          name: "title",
          type: "string",
          label: "Title for the mantra to generate",
          required: true,
        },
      ],
    }),
    request: tk.createStandardRequestAction<MantraRequestInput, MantraEntry>({
      repo,
      meta: {
        label: "Create Mantra Request",
        description: "Create a request to generate a new mantra.",
      },
      inputParams: [
        {
          name: "title",
          type: "string",
          label: "Title for the mantra to generate",
          required: true,
        },
        {
          name: "requestedBy",
          type: "string",
          label: "The person requesting the mantra",
        },
        {
          name: "reason",
          type: "string",
          label: "The reason for the request",
        },
      ],
    }),
  },
});

export default mantrasConfig;
