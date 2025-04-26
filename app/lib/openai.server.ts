import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set.");
}

const openai = new OpenAI({ apiKey });

export async function explainConcept(concept: string): Promise<string> {
  console.log("[OpenAI] Requesting explanation for:", concept);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a Sanskrit scholar. Given a Sanskrit concept word, write a clear and short article (100–200 words) explaining its meaning to students. Keep the explanation friendly and simple.",
      },
      {
        role: "user",
        content: `Explain the concept: ${concept}`,
      },
    ],
  });

  const result = response.choices[0]?.message?.content;
  console.log("[OpenAI] Received response:", result);
  return result || "No explanation available.";
}
