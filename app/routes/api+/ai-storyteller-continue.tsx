import { type ActionFunction } from "react-router";
import { continueStory } from "~/core/lib/openai/openai.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const baseStory = formData.get("baseStory");
    const question = formData.get("question");
    const branchSegment = formData.get("branchSegment");

    if (
      typeof baseStory !== "string" ||
      typeof question !== "string" ||
      typeof branchSegment !== "string"
    ) {
      return Response.json(
        { error: "Invalid input provided for story continuation." },
        { status: 400 }
      );
    }

    const { title, story, questions, branches, reference } =
      await continueStory(baseStory, question, branchSegment);

    return Response.json({ title, story, questions, branches, reference });
  } catch (error) {
    console.error("[Server] Error continuing story:", error);
    return Response.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
};
