import type { ContentGenerator } from "~/core/lib/curations/types/curation";
import type { CurationObject } from "~/core/lib/curations/types/curation";
import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set.");
}

const openai = new OpenAI({ apiKey });

export function createLLMGenerator<T extends CurationObject>({
  prompt,
  parse,
  model = "gpt-4o",
}: {
  prompt: (input: Partial<T>) => string;
  parse: (json: any, input: Partial<T>) => T;
  model?: string;
}): ContentGenerator<T> {
  return {
    async generate(input: Partial<T>): Promise<T> {
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
