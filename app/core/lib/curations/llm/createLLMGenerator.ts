import type { ContentGenerator } from "~/core/lib/curations/types/curation";
import type { CurationObject } from "~/core/lib/curations/types/curation";
import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set.");
}

const openai = new OpenAI({ apiKey });

export function createLLMGenerator<Input, Output extends CurationObject>({
  prompt,
  parse,
  model = "gpt-4o",
}: {
  prompt: (input: Input) => string;
  parse: (json: any, input: Input) => Output;
  model?: string;
}): ContentGenerator<Input, Output> {
  return {
    async generate(input: Input): Promise<Output> {
      const userPrompt = prompt(input);
      const result = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: userPrompt }],
        response_format: { type: "json_object" },
      });

      const content = result.choices[0].message?.content?.trim();
      if (!content) throw new Error("No content returned from LLM");

      const json = JSON.parse(content);
      return parse(json, input);
    },
  };
}
