export async function explainConceptRequest(concept: string): Promise<{ article: string }> {
  const formData = new FormData();
  formData.append("concept", concept);

  const response = await fetch("/api/explain-concept", {
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