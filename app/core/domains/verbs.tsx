import {
  createCuration,
  createLLMGenerator,
  createLLMReviewer,
  createRepoFromConfig,
  createStandardGenerateAction,
  createStandardRequestAction,
} from "~/core/lib/curations/toolkit";

import chalk from "chalk";
import nexusConfig from "~/core/config/nexus.config";

type VerbEntry = {
  id: string;
  root: string;
  class: string;
  voice: "active" | "middle" | "passive";
  lakara: string;
  forms: Record<
    string,
    {
      devanagari: string;
      iast: string;
      meaning: string;
    }
  >;
  createdAt: string;
  updatedAt?: string;
  source?: string;
  status: "candidate" | "staged" | "approved";
};

const { collectionId, version } = nexusConfig.firestore.curations.verbs;

export const repo = createRepoFromConfig<VerbEntry>(collectionId, version);

function generatePrompt({
  root,
  class: gaṇa,
  voice,
  lakara,
}: Partial<VerbEntry>) {
  return `
You are a Sanskrit verb engine. Given a root, class, voice, and lakara, return a full conjugation chart for that combination.

Return JSON with:
- root, class, voice, lakara
- forms: an object with keys like "third_singular", "first_dual", etc.
- Each form should include devanagari, iast, and a brief meaning.

Only include present tense conjugations in the requested lakara.

Input:
root: ${root}
class: ${gaṇa}
voice: ${voice}
lakara: ${lakara}
`.trim();
}

function generateReviewPrompt(entry: VerbEntry) {
  return `
You are a Sanskrit grammar assistant reviewing a full verb conjugation.

Check whether all forms are correct based on the root, class, voice, and lakara. Each form includes devanagari, iast, and meaning.

Respond in JSON format with:
- confidence: number (0-1)
- summary: string
- approved: boolean
- suggestions: array of notes or corrections
- justification: string (optional)
- patch: partial correction (optional)

Input:
${JSON.stringify(entry, null, 2)}
`.trim();
}

const generator = createLLMGenerator<VerbEntry>({
  prompt: generatePrompt,
  parse: (json, input) => {
    const now = new Date().toISOString();
    const id =
      `verb-${input.root}-${input.voice}-${input.lakara}`.toLowerCase();
    return {
      ...json,
      id,
      class: input.class!,
      voice: input.voice!,
      lakara: input.lakara!,
      createdAt: now,
      updatedAt: now,
      status: "candidate",
      source: "openai",
    };
  },
});

const reviewer = createLLMReviewer<VerbEntry>({
  prompt: generateReviewPrompt,
  parse: (json) => {
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

const verbsConfig = createCuration<VerbEntry>({
  namespace: "verbs",
  repo,
  generator,
  reviewer,
  cli: {
    printSummary: (entry) => {
      console.log(`${entry.root} (${entry.voice}, ${entry.lakara})`);
    },
    printRow: (entry) => {
      const line = [
        chalk.gray(entry.id || "").padEnd(16),
        chalk.gray(entry.status || "").padEnd(12),
        chalk.cyan((entry.root || "").padEnd(12)),
        chalk.yellow(entry.class || "").padEnd(12),
        chalk.blue(entry.voice || "").padEnd(12),
        chalk.magenta(entry.lakara || "").padEnd(12),
      ].join("  ");
      console.log(line);
    },
  },
  requiredActions: {
    generate: createStandardGenerateAction({
      repo,
      generator,
      meta: {
        label: "Generate Object",
        description: "Generate a new verb entry from inputs.",
        group: "Objects",
        kind: "single",
        params: [
          { name: "root", label: "Root", type: "string", required: true },
          { name: "class", label: "Class", type: "string", required: true },
          { name: "voice", label: "Voice", type: "string", required: true },
          { name: "lakara", label: "Lakara", type: "string", required: true },
        ],
      },
    }),
    request: createStandardRequestAction({
      repo,
      getId: (data) =>
        `verb-${data.root}-${data.voice}-${data.lakara}`.toLowerCase(),
      meta: {
        label: "Create Generation Request",
        group: "Requests",
        description: "Create a request to generate a new verb entry.",
        kind: "single",
        params: [
          { name: "root", label: "Root", type: "string", required: true },
          { name: "class", label: "Class", type: "string", required: true },
          { name: "voice", label: "Voice", type: "string", required: true },
          { name: "lakara", label: "Lakara", type: "string", required: true },
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
      },
    }),
  },
});

export default verbsConfig;
