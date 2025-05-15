import type { ShabdaEntry } from "~/types";
import chalk from "chalk";
import { createDomain } from "../helpers/createDomain";
import { shabdaGenerator } from "~/core/lib/openai/generateShabda";
import { shabdaRepo } from "~/core/lib/repositories/shabdaRepository";
import { shabdaReviewer } from "~/core/lib/openai/reviewShabda";

/**
 * Noun domain configuration for the Shabda curation process.
 * This configuration defines how to generate, review, and display noun entries.
 */
export const nounsConfig = createDomain<ShabdaEntry>({
  namespace: "nouns",
  repo: shabdaRepo,
  generator: shabdaGenerator,
  reviewer: shabdaReviewer,
  generateRequestId: (data) =>
    `${data.root}-${data.gender}-${data.nounClass}`.toLowerCase(),
  cli: {
    printSummary: (entry) => {
      console.log(`${entry.root} (${entry.gender}, ${entry.nounClass})`);
    },
    printRow: (entry) => {
      const line = [
        chalk.gray(entry.id || "").padEnd(16),
        chalk.gray(entry.status || "").padEnd(12),
        chalk.cyan((entry.root || "").padEnd(12)),
        chalk.yellow(entry.gender || "").padEnd(12),
        chalk.blue(entry.nounClass || "").padEnd(12),
        chalk.green(entry.meaning || "").padEnd(12),
      ].join("  ");
      console.log(line);
    },
  },
  ui: {
    renderRow: (entry) => [
      <td>{entry.root}</td>,
      <td>{entry.gender}</td>,
      <td>{entry.status}</td>,
    ],
    renderDetail: (entry) => <NounDetailView noun={entry} />,
  },
});

function NounDetailView({ noun }: { noun: ShabdaEntry }) {
  return (
    <div>
      <h2>{noun.root}</h2>
    </div>
  );
}
