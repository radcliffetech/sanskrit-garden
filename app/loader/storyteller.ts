export async function storytellerRequest(prompt: string): Promise<{ title: string; story: string; questions: string[]; branches: string[]; reference: string }> {
  const formData = new FormData();
  formData.append("prompt", prompt);

  const response = await fetch("/api/ai-storyteller", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[Client] Server error:", text);
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}


export async function continueStoryRequest(baseStory: string, question: string, branchSegment: string): Promise<{
  title: string;
  story: string;
  questions: string[];
  branches: string[];
  reference: string;
}> {

  const formData = new FormData();
  formData.append("baseStory", baseStory);
  formData.append("question", question);
  formData.append("branchSegment", branchSegment);

  const response = await fetch("/api/ai-storyteller-continue", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[Client] Server error during continuation:", text);
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
