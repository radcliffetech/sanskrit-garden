import { explainConcept } from "~/lib/openai.server";

export async function explainConceptRequest(concept: string): Promise<string> {
  // return
  // for now just return a dummy string

  // sleep for 1-4 seconds
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000 + 1000));
  // return `This is a dummy explanation for the concept: ${concept}.`;
  return `This is a dummy explanation for the concept: ${concept}.`;
}
