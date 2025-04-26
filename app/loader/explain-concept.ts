import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

export async function explainConcept(concept: string): Promise<string> {
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
  return result || "No explanation available.";
}