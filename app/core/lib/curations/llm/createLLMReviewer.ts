import type {
  CurationReview,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import type { CurationObject } from "~/core/lib/curations/types/curation";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is not set.");

const openai = new OpenAI({ apiKey });

export function createLLMReviewer<T extends CurationObject>({
  prompt,
  parse,
  model = "gpt-4o",
}: {
  prompt: (entry: T) => string;
  parse: (
    json: any,
    input: T
  ) => Omit<CurationReview<T>, "id" | "objectId" | "createdAt" | "status">;
  model?: string;
}): ReviewGenerator<T> {
  return {
    async review(entry: T): Promise<CurationReview<T>> {
      const promptText = prompt(entry);
      const result = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: promptText }],
        response_format: { type: "json_object" },
      });

      const content = result.choices[0].message?.content?.trim();
      if (!content) throw new Error("No content returned from LLM");

      const json = JSON.parse(content);
      const baseReview = parse(json, entry);

      return {
        ...baseReview,
        id: crypto.randomUUID(),
        objectId: entry.id,
        createdAt: new Date().toISOString(),
        status: "new",
      };
    },
  };
}
