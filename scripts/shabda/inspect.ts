import chalk from "chalk";
import { getAllApprovedShabdas } from "~/core/lib/repositories/shabdaRepository";

const id = process.argv[2];

async function main() {
  if (!id) {
    console.log("Usage: pnpm tsx scripts/shabda/inspect.ts <shabda-id>");
    return;
  }

  const shabdas = await getAllApprovedShabdas();
  const match = shabdas.find((s) => s.id === id);

  if (!match) {
    console.log(`❌ Shabda not found with id: ${id}`);
    return;
  }

  console.log(chalk.bold(`\n🔎 Inspecting: ${match.root}`));
  console.log(`${chalk.gray("Gender:")} ${match.gender}`);
  console.log(`${chalk.gray("Class:")}  ${match.nounClass}`);
  console.log(`${chalk.gray("Devanagari:")} ${chalk.yellow(match.devanagari)}`);
  console.log(`${chalk.gray("Meaning:")} ${match.meaning}`);

  console.log(chalk.bold("\n📦 Forms:"));
  const entries = Object.entries(match.forms || {});
  for (const [key, val] of entries) {
    const label = key.padEnd(20);
    const form = `${val.devanagari} (${val.iast})`;
    console.log(
      `${chalk.cyan(label)} → ${chalk.white(form)} — ${chalk.gray(val.meaning)}`
    );
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
