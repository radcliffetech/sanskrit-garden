import { addCandidateShabda } from "~/core/lib/repositories/shabdaRepository";
import { generateShabda } from "~/core/lib/openai/generateShabda";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value] = arg.split("=");
    return [key, value];
  })
);

const { stem, gender, class: nounClass } = args;

if (!stem || !gender || !nounClass) {
  console.error(
    "Usage: tsx generateShabda.ts stem=<root> gender=<masculine|feminine|neuter> class=<a-stem|i-stem|...>"
  );
  process.exit(1);
}

async function main() {
  console.log("🧠 Generating declension for:", { stem, gender, nounClass });

  let fullEntry;
  try {
    fullEntry = await generateShabda({ stem, gender, nounClass });
  } catch (error) {
    console.error("❌ Error generating declension:", error);
    process.exit(1);
  }

  console.log("📤 Uploading to Firestore...");
  await addCandidateShabda(fullEntry);
  console.log("✅ Uploaded to Firestore");
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
