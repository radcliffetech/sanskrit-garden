import chalk from "chalk";
import { getAllApprovedShabdas } from "~/core/lib/repositories/shabdaRepository";

async function main() {
  const shabdas = await getAllApprovedShabdas();
  if (!shabdas.length) {
    console.log("No approved shabdas found.");
    return;
  }

  console.log(chalk.bold("Approved Shabdas:\n"));

  for (const s of shabdas.slice(0, 25)) {
    const line = [
      chalk.cyan((s.root || "").padEnd(12)),
      chalk.gray((s.gender || "").padEnd(12)),
      chalk.gray((s.nounClass || "").padEnd(14)),
      chalk.yellow(s.devanagari || ""),
    ].join("  ");
    console.log(line);
  }

  if (shabdas.length > 25) {
    console.log(`\n...and ${shabdas.length - 25} more`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
