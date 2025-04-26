import { explainConcept } from "~/lib/openai.server";

export async function explainConceptRequest(concept: string): Promise<string> {

  // for now just return a dummy string
  return `This is a dummy explanation for the concept: ${concept}.`;
}
