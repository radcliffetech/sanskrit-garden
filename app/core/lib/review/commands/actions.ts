import {
  addCandidateShabda,
  approveCandidate,
  deleteCandidate,
  deleteReviewById,
  flushReviews,
  getAllCandidateShabdas,
  getReviewById,
  getReviewsByShabdaId,
  storeShabdaReview,
  updateReviewStatus,
} from "~/core/lib/repositories/shabdaRepository";

import chalk from "chalk";
import { generateShabda } from "../../openai/generateShabda";
import { getAllReviews } from "~/core/lib/repositories/shabdaRepository"; // Add this
import { match } from "ts-pattern";
import readline from "readline";
import { reviewShabda } from "~/core/lib/openai/reviewShabda";

function confirmPrompt(msg: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(msg + " (y/N) ", (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase() === "y");
    })
  );
}

function promptUser(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
}

export const commandHandlers = [
  {
    id: "review",
    action: async () => {
      const allReviews = await getAllReviews();
      const pending = allReviews.filter((r) => r.status === "new");

      if (pending.length === 0) {
        console.log("No unreviewed shabdas found.");
        return;
      }

      console.log(`📥 Loaded ${pending.length} unreviewed reviews`);

      console.log("📦 Reviews to process:");
      pending.slice(0, 10).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.shabdaId}`);
      });
      if (pending.length > 10) {
        console.log(`  ...and ${pending.length - 10} more`);
      }

      const confirmStart = await promptUser("Start reviewing? (y/N) ");
      if (confirmStart !== "y") {
        console.log("❌ Aborted by user.");
        return;
      }

      const candidates = await getAllCandidateShabdas();

      for (const review of pending) {
        const entry = candidates.find((c) => c.id === review.shabdaId);
        if (!entry) {
          console.log(`❌ Missing candidate for: ${review.shabdaId}`);
          continue;
        }

        console.log(
          chalk.blueBright(
            `\n🔍 Reviewing: ${entry.root} (${entry.gender}, ${entry.nounClass})`
          )
        );
        console.log(chalk.gray("--------------------------"));
        console.log(chalk.yellow(`📜 Devanagari:`), entry.devanagari);
        console.log(chalk.cyan(`📖 IAST:`), entry.iast);
        console.log(chalk.magenta(`🧠 Meaning:`), entry.meaning);

        // Show review details: confidence, summary, justification, suggestions
        console.log(
          chalk.greenBright(
            `🤖 Confidence: ${(review.confidence * 100).toFixed(1)}%`
          )
        );
        console.log(chalk.green(`📝 Summary: ${review.summary}`));
        if (review.justification) {
          console.log(chalk.gray(`📚 Justification: ${review.justification}`));
        }
        if (review.suggestions?.length) {
          console.log(chalk.yellow("💡 Suggestions:"));
          review.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
        }

        // Patch diff display logic
        if (review.patch) {
          console.log(chalk.gray(`📦 Raw patch data:`));
          console.log(chalk.gray(JSON.stringify(review.patch, null, 2)));
          console.log(chalk.blue("🧩 Patch available:"));
          for (const key of Object.keys(review.patch)) {
            const oldVal = (entry as any)[key];
            const newVal = (review.patch as any)[key];

            if (
              key === "forms" &&
              typeof oldVal === "object" &&
              typeof newVal === "object"
            ) {
              const formKeys = Object.keys(newVal);
              for (const formKey of formKeys) {
                const oldForm = oldVal[formKey];
                const newForm = newVal[formKey];
                if (
                  !oldForm ||
                  JSON.stringify(oldForm) !== JSON.stringify(newForm)
                ) {
                  console.log(chalk.blue(`  🔄 forms.${formKey}:`));
                  console.log(
                    chalk.red(
                      `    - OLD: ${JSON.stringify(
                        oldForm ?? "(missing)",
                        null,
                        2
                      )}`
                    )
                  );
                  console.log(
                    chalk.green(
                      `    + NEW: ${JSON.stringify(newForm, null, 2)}`
                    )
                  );
                }
              }
            } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
              console.log(chalk.blue(`  🔄 ${key}:`));
              console.log(
                chalk.red(`    - OLD: ${JSON.stringify(oldVal, null, 2)}`)
              );
              console.log(
                chalk.green(`    + NEW: ${JSON.stringify(newVal, null, 2)}`)
              );
            }
          }
        }
        const promptOptions = "[a]pprove  [d]elete  [s]kip  [p]atch+approve > ";
        const action = (await promptUser(promptOptions)) || "a";

        await match(action)
          .with("a", async () => {
            await approveCandidate(entry);
            await updateReviewStatus(review.id, "applied");
            console.log("✅ Approved and moved to validated shabdas");
          })
          .with("d", async () => {
            await deleteCandidate(entry.id);
            console.log("🗑️ Deleted from candidates");
          })
          .with("p", async () => {
            await approveCandidate(entry);
            await updateReviewStatus(review.id, "applied");
            console.log("🛠️ Applied patch and approved entry");
          })
          .otherwise(async () => {
            await updateReviewStatus(review.id, "reviewed");
            console.log("⏭️ Skipped");
          });
      }

      console.log("🎉 Validation complete");
    },
  },
  {
    id: "generate-reviews",
    action: async () => {
      const candidates = await getAllCandidateShabdas();

      console.log("📦 Candidates to review:");
      candidates.slice(0, 10).forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.id}`);
      });
      if (candidates.length > 10) {
        console.log(`  ...and ${candidates.length - 10} more`);
      }

      const confirmStart = await promptUser("Start reviewing? (y/N) ");
      if (confirmStart !== "y") {
        console.log("❌ Aborted by user.");
        return;
      }

      const reviews = await getAllReviews();
      const reviewedIds = new Set(reviews.map((r) => r.shabdaId));
      const pending = candidates.filter((entry) => !reviewedIds.has(entry.id));

      if (!pending.length) {
        console.log(
          chalk.green("✅ All candidate shabdas already have reviews.")
        );
        return;
      }

      console.log(
        chalk.gray(`🧠 Reviewing ${pending.length} unreviewed shabdas...\n`)
      );

      for (const entry of pending) {
        console.log(chalk.gray(`→ ${entry.id}`));
        try {
          const review = await reviewShabda(entry);
          await storeShabdaReview(review, entry.id);
          console.log(chalk.green(`✅ Reviewed: ${entry.id}`));
        } catch (err) {
          console.error(chalk.red(`❌ Error reviewing ${entry.id}:`), err);
        }
      }

      console.log(chalk.green("\n🎉 Done."));
    },
  },
  ,
  {
    id: "list",
    action: async (args: { shabdaId: string }) => {
      const shabdaId = args.shabdaId;
      const reviews = await getReviewsByShabdaId(shabdaId);
      if (!reviews.length) {
        console.log(chalk.gray("No reviews found."));
        return;
      }
      for (const r of reviews) {
        console.log(
          `${chalk.gray(r.createdAt)} ${chalk.cyan(
            r.shabdaId ?? ""
          )} ${chalk.yellow(r.id)} ${chalk.greenBright(
            `${(r.confidence * 100).toFixed(1)}%`
          )} ${r.approved ? chalk.green("✔") : chalk.red("✘")} — ${r.summary}`
        );
      }
    },
  },
  {
    id: "get",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      const r = await getReviewById(reviewId);
      if (!r) {
        console.log(chalk.red("❌ Review not found."));
        return;
      }
      console.log(chalk.bold(`\n🔍 Review ID: ${r.id}`));
      console.log(`${chalk.gray("Shabda ID:")} ${r.shabdaId}`);
      console.log(
        `${chalk.gray("Confidence:")} ${chalk.greenBright(
          `${(r.confidence * 100).toFixed(1)}%`
        )}`
      );
      console.log(
        `${chalk.gray("Approved:")} ${
          r.approved ? chalk.green("✔") : chalk.red("✘")
        }`
      );
      console.log(`${chalk.gray("Summary:")} ${r.summary}`);
      if (r.suggestions?.length) {
        console.log(chalk.yellow("\n💡 Suggestions:"));
        r.suggestions.forEach((s, i) => {
          console.log(`  ${i + 1}. ${s}`);
        });
      }
      if (r.patch) {
        console.log(chalk.blue("\n🧩 Patch:"));
        console.log(chalk.gray(JSON.stringify(r.patch, null, 2)));
      }
    },
  },
  {
    id: "delete",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      await deleteReviewById(reviewId);
      console.log(chalk.red(`🗑️ Review deleted: ${reviewId}`));
    },
  },
  {
    id: "flush-reviews",
    action: async () => {
      const confirmed = await confirmPrompt(
        "Are you sure you want to delete all reviews?"
      );
      if (!confirmed) {
        console.log("Flush cancelled.");
        return;
      }
      await flushReviews();
      console.log(chalk.red("🗑️ All reviews flushed."));
    },
  },
  {
    id: "list-reviews",
    action: async ({ status = "all" }) => {
      const reviews = await getAllReviews();
      const filtered = match(status)
        .with("new", () => reviews.filter((r) => r.status === "new"))
        .with("reviewed", () => reviews.filter((r) => r.status === "reviewed"))
        .with("applied", () => reviews.filter((r) => r.status === "applied"))
        .with("all", () => reviews)
        .otherwise(() => reviews);

      for (const r of filtered) {
        console.log(`${r.createdAt} ${r.shabdaId} ${r.status}`);
      }
    },
  },
  {
    id: "generate-shabda",
    action: async ({
      stem,
      gender,
      nounClass,
    }: {
      stem: string;
      gender: string;
      nounClass: string;
    }) => {
      const entry = await generateShabda({ stem, gender, nounClass }); // wrapped function
      await addCandidateShabda(entry);
      console.log(chalk.green(`✅ Shabda generated and stored: ${entry.id}`));
    },
  },
];
