export async function explainConceptRequest(concept: string): Promise<{ article: string }> {
  console.log("[Client] Sending concept to server:", concept);

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

  console.log("[Client] Server response status:", response.status);
  console.log("[Client] Server response headers:", response.headers);
  console.log("[Client] Server response URL:", response.url);

  const data = await response.json();
  console.log("[Client] Received data:", data);
  return data;
}