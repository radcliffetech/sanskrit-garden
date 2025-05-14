import { json, type ActionFunction } from "@remix-run/node";
import { generateStory } from "~/core/lib/openai/openai.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt");

    if (!prompt || typeof prompt !== "string") {
      return json({ error: "Invalid prompt provided." }, { status: 400 });
    }

    const { title, story, questions, branches, reference } =
      await generateStory(prompt);
    return json({ title, story, questions, branches, reference });
  } catch (error) {
    console.error("[Server] Error generating story:", error);
    return json({ error: "An unexpected error occurred." }, { status: 500 });
  }
};
