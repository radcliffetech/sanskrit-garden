import { type ActionFunction } from "react-router";
import { explainConcept } from "~/core/lib/openai/openai.server"; // assuming your OpenAI server function is here

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const concept = formData.get("concept");

    if (!concept || typeof concept !== "string") {
      return Response.json({ article: "Invalid concept provided." }, { status: 400 });
    }

    const article = await explainConcept(concept);
    return Response.json({ article });
  } catch (error) {
    console.error("[Server] Error explaining concept:", error);
    return Response.json({ article: "An unexpected error occurred." }, { status: 500 });
  }
};
