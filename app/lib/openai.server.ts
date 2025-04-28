import { defaultStoryProfileJson, sanskritTeacherProfileJson } from "./storyteller-profiles"

import OpenAI from "openai";

const apiKey = process.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_OPENAI_API_KEY is not set.");
}
const USE_STUBS = process.env.VITE_USE_STUBS;

const openai = new OpenAI({ apiKey });
type StorytellerProfile = {
  storytellerProfile: string;
  storyProfile: string;
  audienceProfile: string;
  languageProfile: string;
  commonGuidelines: string;
};

const defaultStoryProfile: StorytellerProfile = defaultStoryProfileJson;

export async function explainConcept(concept: string): Promise<string> {
  if (USE_STUBS === "true") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `### ${concept}\n\n**${concept}** is a profound Sanskrit concept representing deep philosophical ideas. It is highly revered and plays an important role in the tradition.`;
  }

  console.log("[OpenAI] Requesting explanation for:", concept);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:  `
  You are a Sanskrit scholar. Given a Sanskrit concept word, you are to deliver a clear and short lecture (200–300 words) explaining its meaning to your audience. 
  
  Keep the explanation friendly and simple. Offer orignal sanskrt spelling of the topic concept in sanskrit. 
  
  If the example has no relevence, please inform the user, and offer something related.
  
  Include an example from the Puranas or related Sanskrit traditions to illustrate the concept.
  Use a simple and clear language, avoiding jargon.

  - Do not offer any follow-up questions or suggestions. 
  - Do not start with "Certainly!" or "Sure!" or "Of course!" etc.
  - Keep the tone friendly and engaging, but not overly casual.

- Use correct transliteration for the Sanskrit terms (eg: Rāma).
  
  Return the results in Markdown format.
  `,
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

export async function generateStory(prompt: string, profile: StorytellerProfile = defaultStoryProfile): Promise<{ title: string, story: string; questions: string[]; branches: string[], reference: string }> {
  if (USE_STUBS === "true") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      title: `The Tale of ${prompt}`,
      story: `Once upon a time in the realm of ${prompt}, a great adventure began...`,
      questions: [
        "What happened next?",
        "Who was the hero?",
        "What was the lesson learned?"
      ],
      branches: [
        "The hero faced a mighty challenge.",
        "A mysterious stranger offered help.",
        "The journey led to unexpected places."
      ],
      reference: "Inspired by tales from the Mahabharata and local folklore."
    };
  }

  console.log("[OpenAI] Requesting story for:", prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are been asked to tell a story based on the Puranas and related Sanskrit traditions.

## Story
Here is the story you are telling:
${profile.storyProfile}

You are like this: 
${profile.storytellerProfile}

You are master storyteller, and are adjusting for your adience. Your audience is like this:
${profile.audienceProfile}

The language you use is like this:
${profile.languageProfile}

${profile.commonGuidelines}
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



export async function continueStory(baseStory: string, question: string, branchSegment: string, profile: StorytellerProfile = defaultStoryProfile): Promise<{
  title: string;
  story: string;
  questions: string[];
  branches: string[];
  reference: string;
}> {
  if (process.env.VITE_USE_STUBS === "true") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      title: `Continued Tale`,
      story: `${branchSegment} The story unfolds with new surprises and lessons.`,
      questions: [
        "What new challenges arise?",
        "How does the hero respond?",
        "What wisdom is gained?"
      ],
      branches: [
        "The hero discovers a hidden truth.",
        "An ally reveals their true intentions.",
        "The journey takes a mystical turn."
      ],
      reference: "Inspired by tales from the Mahabharata and local folklore."
    };
  }

  console.log("[OpenAI] Requesting story continuation for question:", question);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are in the process of telling a story. Here is the base story you are continuing from:

${baseStory}

You are now telling a new segment of the story, responding to the user's interested question:

"${question}"

You will begin your story starting with this text:

${branchSegment}

## Story Background
${profile.storyProfile}

You are like this: 
${profile.storytellerProfile}

You are a master storyteller, adjusting for your audience:
${profile.audienceProfile}

The language you use is like this:
${profile.languageProfile}

${profile.commonGuidelines}
`,
      },
      {
        role: "user",
        content: question,
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