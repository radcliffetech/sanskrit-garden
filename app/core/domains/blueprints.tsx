import chalk from "chalk";
import type { CommandDefinition } from "~/core/lib/curations/toolkit";
import { modules } from "~/core/domains";
import fs from "fs";
import path from "path";
import tk, { type CurationObject } from "~/core/lib/curations/toolkit";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fileExample = fs.readFileSync(
  path.join(__dirname, "data/blueprint-example.ts.txt"),
  "utf8"
);
const NAMESPACE = "blueprints";

const FIRESTORE_CURATION = {
  collectionId: "blueprints",
  version: "1",
};

type CurationField = {
  name: string;
  label: string;
  type: string;
};

type CurationBlueprint = CurationObject & {
  namespace: string;
  label: string;
  description: string;
  typeDefinition: string;
  fields: CurationField[];
  inputs: CurationField[];
  exampleEntry?: Record<string, any>;
  qualification?: string;
};

type BlueprintInput = {
  namespace: string;
  label: string;
  description: string;
};

export const repo = tk.createRepoFromConfig<CurationBlueprint>(
  FIRESTORE_CURATION.collectionId,
  FIRESTORE_CURATION.version
);

const exampleEntry: Omit<
  CurationBlueprint,
  "id" | "status" | "createdAt" | "updatedAt"
> = {
  namespace: "jokes",
  label: "JokeEntry",
  description: "Curates dad jokes in structured format.",
  typeDefinition: `
type JokeEntry = CurationObject & {
  category: string;
  setup: string;
  punchline: string;
};
    `.trim(),
  fields: [
    { name: "category", label: "Category", type: "string" },
    { name: "setup", label: "Setup", type: "string" },
    { name: "punchline", label: "Punchline", type: "string" },
  ],
  inputs: [{ name: "category", label: "Category", type: "string" }],
  qualification: "Must be a dad joke.",
};

// Generator prompt - creates a blueprint entry
function generatePrompt({ namespace, label, description }: BlueprintInput) {
  return `
You are a Blueprint Generator.

Your task is to create a valid \`CurationBlueprint\` object using the inputs provided. A good blueprint:
- Describes a new domain for curated content.
- Defines a clear TypeScript \`typeDefinition\` that extends \`CurationObject\`.
- Lists well-named \`fields\` that match the type's properties.
- Provides \`inputs\` used for requesting or generating a new entry.
- Includes an \`exampleEntry\` that fully matches the defined type.

Inputs:
- namespace: "${namespace}"
- label: "${label}"
- description: "${description}"

Requirements:
- Output must be a pure JSON object, no markdown or explanation.
- Use creativity to define a type that matches the label and description.
- Fields should reflect real, structured data. Avoid overly abstract types.
- Inputs should reflect meaningful request parameters, not all fields.
- Do not repeat the same value for every field.

Guidelines on Generator Inputs:
- the number of inputs should be less than the number of fields, probably 1 or 2 inputs are enough.
- It should be enough to roughly describe an examplar of the blueprint category.
- if there are too many inputs, suggest a patch with a reduced number of inputs.

Example format:
${JSON.stringify(exampleEntry, null, 2)}
  `.trim();
}

// Reviewer prompt - verifies correctness and appropriateness of the blueprint
function generateReviewPrompt(entry: CurationBlueprint): string {
  return `You are a blueprint reviewer.
Your job is to verify that the candidate blueprint is accurate, complete, and well-structured, as well as to check the content quality.

Guidelines on Candidate Inputs:
- the inputs field is designed to be used for generating new entries for the blueprint. It should not be a copy of the fields, in fact it should encapsulate the essence of the fields.
- the number of inputs should be less than the number of fields, probably 1 or 2 inputs are enough.
- It should be enough to roughly describe an examplar of the blueprint category.
- if there are too many inputs, suggest a patch with a reduced number of inputs.

Guidelines on Candidate Qualification:
- the qualification field is designed to be used for generating new entries for the blueprint. It should not be a copy of the description, in fact it should encapsulate the essence of the description, 
and guide the generator to create a new entry that is an excellent example of the blueprint category.

Approval:
✔ If the blueprint is good, return:
- "approved": true
- "suggestions": []
- no patch
❌ If there are issues:
- "approved": false
- list specific issues in "suggestions"
- include a "patch" with corrections if possible
⚠ Do not make stylistic changes unrelated to the blueprint accuracy.
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

const generator = tk.createLLMGenerator<BlueprintInput, CurationBlueprint>({
  prompt: generatePrompt,
  parse: (json, input) => {
    const now = new Date().toISOString();
    const id = `${NAMESPACE}-${input.namespace}`;

    return {
      ...json,
      id,
      namespace: input.namespace || json.namespace,
      label: input.label || json.label,
      description: input.description || json.description,
      createdAt: now,
      updatedAt: now,
      source: "openai",
      status: "candidate",
    };
  },
});

const reviewer = tk.createLLMReviewer<CurationBlueprint>({
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

const blueprintConfig = tk.createCuration<CurationBlueprint>({
  namespace: NAMESPACE,
  repo,
  generator,
  reviewer,
  cli: {
    printSummary: (entry) => {
      console.log(
        `\n${chalk.cyan(entry.label)}: ${chalk.yellow(
          entry.description
        )}\n\nIn namespace: ${chalk.blue(entry.namespace)}\n`
      );
    },
    printRow: (entry) => {
      const line = [
        chalk.gray(entry.id || "").padEnd(16),
        chalk.gray(entry.status || "").padEnd(12),
        chalk.cyan((entry.label || "").padEnd(30)),
        chalk.yellow((entry.description || "").padEnd(50)),
        chalk.blue(entry.namespace || "").padEnd(12),
      ].join("  ");
      console.log(line);
    },
  },
  ui: {
    renderRow: (entry) => [
      <td>{entry.label}</td>,
      <td>{entry.description}</td>,
      <td>{entry.namespace}</td>,
      <td>{entry.status}</td>,
    ],
    renderDetail: (entry) => (
      <div>
        <h3>Label</h3>
        <p>{entry.label}</p>
        <h3>Description</h3>
        <p>{entry.description}</p>
        <h3>Namespace</h3>
        <p>{entry.namespace}</p>
      </div>
    ),
  },
  requiredActions: {
    generate: tk.createStandardGenerateAction<
      BlueprintInput,
      CurationBlueprint
    >({
      repo,
      generator,
      meta: {
        label: "Generate Blueprint",
        description: "Generate a new curation blueprint by provided inputs.",
      },
      inputParams: [
        {
          name: "namespace",
          type: "string",
          label: "The namespace for the blueprint",
          required: true,
        },
        {
          name: "label",
          type: "string",
          label: "The label for the blueprint",
          required: true,
        },
        {
          name: "description",
          type: "string",
          label: "The description for the blueprint",
          required: true,
        },
      ],
    }),
    request: tk.createStandardRequestAction<BlueprintInput, CurationBlueprint>({
      repo,
      meta: {
        label: "Create Blueprint Request",
        description: "Create a request to generate a new blueprint.",
      },
      inputParams: [
        {
          name: "namespace",
          type: "string",
          label: "The namespace for the blueprint",
          required: true,
        },
        {
          name: "label",
          type: "string",
          label: "The label for the blueprint",
          required: true,
        },
        {
          name: "description",
          type: "string",
          label: "The description for the blueprint",
          required: true,
        },
      ],
    }),
  },
  extraActions: [
    {
      id: "objects:generate-module",
      meta: {
        label: "Generate Module",
        description:
          "Generate a domain module from this blueprint and write it to tmp/",
        kind: "single",
        group: "Objects",
        params: [
          { name: "id", type: "string", label: "Blueprint ID", required: true },
        ],
      },
      action: async ({ id }) => {
        const blueprint = await repo.objects.getById(id);
        if (!blueprint) throw new Error("Blueprint not found");
        console.log(
          `Generating module for blueprint ${blueprint.id} (${blueprint.label})`
        );

        await generateModuleFromBlueprint({ blueprint });
      },
    },
    createSeedRequestGenerator(),
  ],
});

export default blueprintConfig;

type CurationModuleFile = CurationObject & {
  filename: string;
  code: string; // the full `.tsx` source
  documentation?: string;
  summary?: string;
};

const curationGenerator = tk.createLLMGenerator<
  CurationBlueprint,
  CurationModuleFile
>({
  prompt: (bp: CurationBlueprint) => {
    return `
You are a TypeScript system builder. Given a blueprint describing a curation domain,
generate a complete domain config file for use with \`createCuration()\`.

// Example Domain Module
${fileExample}
// End of Example Domain Module

Now, generate a complete domain module using the following blueprint.

-----------------------------
Generator Responsibilities:
- Generate meaningful content entries that match the blueprint's type definition, which are good examples of the domain.
- Ensure all generated fields are present and match the required types.
- Use only the provided input values to determine what to generate.
- Do not invent or assume any fields outside the blueprint.
- Adhere to any stated qualification criteria for content quality.

Reviewer Responsibilities:
- Verify the generated content matches the blueprint structure and types.
- Ensure the content is internally coherent and not AI hallucinated.
- Rate content quality against the qualification description.
- Suggest improvements if content is weak, vague, or poorly formatted.
- Output a structured review with a rating, suggestions, and a patch if needed.
-----------------------------

Rules:
- Use createRepoFromConfig(namespace, "1")
- Use createLLMGenerator and createLLMReviewer
- Include requiredActions.generate and .request using createStandardGenerateAction and createStandardRequestAction
- Export the result as \`export default createCuration<...>(...)\`
- Use the inputs to define the \`params\` for \`objects:generate\` and \`requests:create\`
- Inputs may not be the same as the fields on the final object
- Prompts should refer only to the input values, not fields that will be AI-generated
- Evaluate the generated domain against the following both correct code and content quality criteria as specified here: "${
      bp.qualification
    }"

Use the following blueprint:

Namespace: "${bp.namespace}"
Label: ${bp.label}
Description: ${bp.description}

Type Definition:
${bp.typeDefinition}

Inputs:
${bp.inputs.map((f) => `- ${f.name} (${f.label}) [${f.type}]`).join("\n")}

Fields:
${bp.fields.map((f) => `- ${f.name} (${f.label}) [${f.type}]`).join("\n")}

Qualification:
${bp.qualification}

Example Entry:
${JSON.stringify(bp.exampleEntry, null, 2)}

Return a JSON object like:
{
  "filename": "${bp.namespace}.tsx",
  "code": "<FULL .tsx source>",
  "documentation": "<Markdown description of this domain, including example usage, inputs, and review guidance>",
  "summary": "<Short summary of the purpose of this domain>"
}
`.trim();
  },
  parse: (json) => ({
    ...json,
    filename: json.filename,
    code: json.code,
    documentation: json.documentation,
    summary: json.summary,
  }),
});

async function generateModuleFromBlueprint({
  blueprint,
}: {
  blueprint: CurationBlueprint;
}) {
  const result = await curationGenerator.generate(blueprint);

  // Also write to tmp/ directory
  const tmpModulePath = path.join("tmp", result.filename);
  fs.writeFileSync(tmpModulePath, result.code);
  console.log(`🧪 Temp module written to: ${tmpModulePath}`);

  // Write documentation and summary to tmp/ directory if present
  const tmpDir = path.join("tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  if (result.documentation) {
    const docPath = path.join(tmpDir, `${blueprint.namespace}.md`);
    fs.writeFileSync(docPath, result.documentation);
    console.log(`📝 Documentation written to: ${docPath}`);
  }

  if (result.summary) {
    const summaryPath = path.join(tmpDir, `${blueprint.namespace}.summary.txt`);
    fs.writeFileSync(summaryPath, result.summary);
    console.log(`📝 Summary written to: ${summaryPath}`);
  }
}
export function createSeedRequestGenerator(): CommandDefinition {
  const generator = tk.createLLMGenerator<
    {
      blueprint: CurationBlueprint;
      numEntries?: number;
    },
    CurationObject & {
      suggestions: object[];
    }
  >({
    prompt: (input) => {
      const numEntries = input.numEntries || 10;
      return `
You are a domain seeder assistant. Your job is to suggest useful inputs for creating new entries for a structured content system.

Given the following blueprint:
- namespace: ${input.blueprint.namespace}
- description: ${input.blueprint.description}
- inputs: ${input.blueprint.inputs.map((i) => i.name).join(", ")}

Please suggest ${numEntries} useful input combinations for this domain.

- Only use the input fields to generate the suggestions. 
- If there is a namespace field as part of the inputs, do not use the namespace of the blueprint itself.

Respond with JSON in this format:

{ 
 "namespace": "${input.blueprint.namespace}",
 "suggestions":[
  { <input_field>: "Gayatri Mantra" },
  { <input_field>: "Mṛtyuñjaya Mantra" },
  { <input_field>: "Śānti Mantra" },
  ]
}
  
`.trim();
    },
    parse: (json, input) => {
      if (
        !json ||
        typeof json !== "object" ||
        !Array.isArray(json.suggestions)
      ) {
        throw new Error("Expected an object with a 'suggestions' array");
      }
      return {
        id: `${input.blueprint.namespace}-seed`,
        ...json,
        createdAt: new Date().toISOString(),
      };
    },
  });

  return {
    id: `requests:seed`,
    meta: {
      label: "Generate Seed Requests",
      description: "Generate a set of seed requests for this blueprint.",
      kind: "single",
      group: "Requests",
      params: [
        {
          name: "blueprintId",
          type: "string",
          label: "The ID of the blueprint to seed",
          required: true,
        },
        {
          name: "numEntries",
          type: "number",
          label: "The number of entries to generate",
          required: true,
        },
      ],
    },
    async action(args: Record<string, string>) {
      const { blueprintId, numEntries = 10 } = args;
      console.log(
        `Generating ${numEntries} seed requests for blueprint ${blueprintId}`
      );
      if (!blueprintId) {
        throw new Error("Blueprint ID is required");
      }
      if (isNaN(Number(numEntries))) {
        throw new Error("Number of entries must be a valid number");
      }
      const blueprint = await repo.objects.getById(blueprintId);

      if (!blueprint) {
        const allBlueprints = await repo.objects.getAll();
        throw new Error(
          "Blueprint not found. Available blueprints: " +
            allBlueprints.map((b) => b.id).join(", ")
        );
      }

      const output = await generator.generate({ blueprint });
      try {
        const blueprintRepo =
          modules[blueprint.namespace as keyof typeof modules].repo;
        if (!blueprintRepo) {
          throw new Error(
            `No repository found for namespace ${blueprint.namespace}`
          );
        }
        output.suggestions.forEach((suggestion) => {
          blueprintRepo.requests.add({
            id: crypto.randomUUID(),
            data: suggestion,
            requestedBy: "seed-script",
            reason: "seed",
            createdAt: new Date().toISOString(),
            status: "pending",
          });
        });
        console.log(
          `✅ Wrote ${output.suggestions.length} seed inputs to repository with id ${output.id}`
        );
      } catch (e) {
        console.error(
          `Error: ${e}. No repository found for namespace ${blueprint.namespace}`
        );
        return;
      }
    },
  };
}
