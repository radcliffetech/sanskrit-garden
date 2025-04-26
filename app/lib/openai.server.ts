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

export async function generateStory(prompt: string): Promise<{ title: string, story: string; questions: string[]; branches: string[], reference: string }> {
  console.log("[OpenAI] Requesting story for:", prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a wise and charismatic sage who tells engaging, clear stories based on the Puranas and related Sanskrit traditions.
For any prompt provided, respond strictly in the following JSON format:
{
  "title": "The title of the story",
  "story": "A story a few paragraphs long.",
  "questions": ["Question 1", "Question 2", "Question 3", "Question 4"],
  "branches": ["Short follow-up story for Question 1", "Short follow-up story for Question 2", "Short follow-up story for Question 3", "Short follow-up story for Question 4"]
  "reference": "Reference: [Text Name], [Chapter/Verse]"
}
The story should be in Markdown format.
Keep the storytelling vivid but the JSON structure strict.

The questions should be about story elements, character motivations, or moral lessons, with the intent of continuing the story in a meaningful way.

At the end, please include refrerences to the original Puranas or Sanskrit texts that inspired the story.
Make sure to include the references in the JSON response as well. The references should be in the format: "Reference: [Text Name], [Chapter/Verse]". For example, "Reference: Bhagavad Gita, Chapter 2, Verse 47".
`,
      },
      {
        role: "user",
        content: `Tell me a story about: ${prompt}`,
      },
    ],
    response_format: { type: "json_object" }, 
  });

  const result = response.choices[0]?.message?.content;
  if (!result) {
    throw new Error("No story response received from OpenAI.");
  }

  console.log("[OpenAI] Received storyteller response:", result);


  return JSON.parse(result);
}



export async function continueStory(baseStory: string, question: string, branchSegment: string): Promise<{
  title: string;
  story: string;
  questions: string[];
  branches: string[];
  reference: string;
}> {
  console.log("[OpenAI] Requesting story continuation for question:", question);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a wise and charismatic sage continuing an epic story based on the Puranas and related Sanskrit traditions. Expand upon a previous story segment while maintaining a vivid and engaging narrative style.`,
      },
      {
        role: "user",
        content: `Here is the base story:

${baseStory}

Here is a follow-up branch segment that should now be expanded:

${branchSegment}

Focus on answering the following question in the continuation:

"${question}"
You are a wise and charismatic sage who tells engaging, clear stories based on the Puranas and related Sanskrit traditions.
Write a vivid continuation about 2-3 paragraphs long, staying stylistically consistent with the earlier material.

The story should be in Markdown format.
The questions should be about story elements, character motivations, or moral lessons, with the intent of continuing the story in a meaningful way.

For any prompt provided, respond strictly in the following JSON format:
{
  "title": "The title of this section of the story",
  "story": "The new story - a few paragraphs long.",
  "questions": ["Question 1", "Question 2", "Question 3", "Question 4"],
  "branches": ["Short follow-up story for Question 1", "Short follow-up story for Question 2", "Short follow-up story for Question 3", "Short follow-up story for Question 4"]
  "reference": "Reference: [Text Name], [Chapter/Verse]"
}
Keep the storytelling vivid but the JSON structure strict.
`,
      },
    ],
    response_format: { type: "json_object" }, 
  });

  const result = response.choices[0]?.message?.content;
  if (!result) {
    throw new Error("No story continuation received from OpenAI.");
  }

  console.log("[OpenAI] Received continuation response:", result);
  return JSON.parse(result);
}