import {
  flushReviews,
  getAllReviews,
  shabdaRepo,
} from "~/core/lib/repositories/shabdaRepository";

import type { CurationRequest } from "~/types/curation";
import type { ShabdaEntry } from "~/types";
import chalk from "chalk";
import { generateShabda } from "~/core/lib/openai/generateShabda";
import { match } from "ts-pattern";
import readline from "readline";
import { reviewShabda } from "~/core/lib/openai/reviewShabda";

type ShabdaRequest = CurationRequest<ShabdaEntry>;

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

// ───────────────────────────────────────
// 🔵 Shabda Management
// ───────────────────────────────────────
export const commandHandlers = [
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
      await shabdaRepo.objects.add(entry);
      console.log(chalk.green(`✅ Shabda generated and stored: ${entry.id}`));
    },
  },
  {
    id: "delete-shabda",
    action: async (args: { shabdaId: string }) => {
      const shabdaId = args.shabdaId;
      const confirmed = await confirmPrompt(
        `Are you sure you want to delete shabda ${shabdaId}?`
      );
      if (!confirmed) {
        console.log("❌ Deletion cancelled.");
        return;
      }
      await shabdaRepo.objects.delete(shabdaId);

      console.log(chalk.green(`🗑️ Shabda deleted: ${shabdaId}`));
    },
  },
  {
    id: "list-all",
    action: async () => {
      const shabdas = await shabdaRepo.objects.getAll();
      if (!shabdas.length) {
        console.log("No shabdas found.");
        return;
      }

      console.log(chalk.bold("Approved Shabdas:\n"));

      for (const s of shabdas) {
        const line = [
          chalk.gray(s.id || "").padEnd(12),
          chalk.gray(s.status || "").padEnd(12),
          chalk.cyan((s.root || "").padEnd(12)),
          chalk.gray((s.gender || "").padEnd(12)),
          chalk.gray((s.nounClass || "").padEnd(14)),
          chalk.yellow(s.devanagari || ""),
        ].join("  ");
        console.log(line);
      }
    },
  },
  {
    id: "deploy",
    action: async ({ shabdaId }: { shabdaId: string }) => {
      const entry = (await shabdaRepo.objects.getAll()).find(
        (s) => s.id === shabdaId
      );

      if (!entry) {
        console.log(`❌ Shabda not found: ${shabdaId}`);
        return;
      }

      // Confirm before proceeding
      const confirmed = await confirmPrompt(`Deploy ${entry.id}?`);
      if (!confirmed) {
        console.log("🚫 Deployment cancelled.");
        return;
      }

      if (entry.status === "approved") {
        console.log("✅ Shabda is already approved.");
        return;
      }

      if (entry.status !== "staged") {
        console.log(
          `⚠️ Shabda must be staged before deployment. Current status: ${entry.status}`
        );
        return;
      }

      await shabdaRepo.objects.update(entry.id, {
        status: "approved",
        validatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await shabdaRepo.audits.add({
        id: crypto.randomUUID(),
        objectId: entry.id,
        timestamp: new Date().toISOString(),
        action: "approved",
        performedBy: "cli",
      });

      console.log(`🚀 Shabda deployed: ${shabdaId}`);
    },
  },
  {
    id: "deploy-all",
    action: async () => {
      const entries = await shabdaRepo.objects.getAll();
      const stagedEntries = entries.filter((s) => s.status === "staged");
      if (stagedEntries.length === 0) {
        console.log("No staged shabdas found.");
        return;
      }

      console.log("Staged shabdas to deploy:");
      stagedEntries.forEach((s) => console.log(`  - ${s.id}`));

      const confirmed = await confirmPrompt(
        "Are you sure you want to deploy all staged shabdas?"
      );
      if (!confirmed) {
        console.log("🚫 Deployment cancelled.");
        return;
      }

      for (const entry of stagedEntries) {
        await shabdaRepo.objects.update(entry.id, {
          status: "approved",
          validatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        await shabdaRepo.audits.add({
          id: crypto.randomUUID(),
          objectId: entry.id,
          timestamp: new Date().toISOString(),
          action: "approved",
          performedBy: "cli",
        });
      }

      console.log(`🚀 All staged shabdas deployed.`);
    },
  },

  // ───────────────────────────────────────
  // 🟡 Review Management
  // ───────────────────────────────────────
  {
    id: "generate-reviews",
    action: async () => {
      const candidates = await shabdaRepo.reviews.filter({
        status: "new",
      });

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

      const reviews = await shabdaRepo.reviews.getAll();
      const reviewedIds = new Set(reviews.map((r) => r.objectId));
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
          const shabda = await shabdaRepo.objects.getById(entry.objectId);
          if (!shabda) {
            throw new Error(`Shabda not found: ${entry.objectId}`);
          }
          const review = await reviewShabda(shabda);
          await shabdaRepo.reviews.addReview(review);
          console.log(chalk.green(`✅ Reviewed: ${shabda.id}`));
        } catch (err) {
          console.error(chalk.red(`❌ Error reviewing ${entry.id}:`), err);
        }
      }

      console.log(chalk.green("\n🎉 Done."));
    },
  },
  {
    id: "review-all",
    action: async () => {
      const allReviews = await shabdaRepo.reviews.getAll();
      const pending = allReviews.filter((r) => r.status === "new");

      if (pending.length === 0) {
        console.log("No unreviewed shabdas found.");
        return;
      }

      console.log(`📥 Loaded ${pending.length} unreviewed reviews`);

      console.log("📦 Reviews to process:");
      pending.slice(0, 10).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.objectId}`);
      });
      if (pending.length > 10) {
        console.log(`  ...and ${pending.length - 10} more`);
      }

      const confirmStart = await promptUser("Start reviewing? (y/N) ");
      if (confirmStart !== "y") {
        console.log("❌ Aborted by user.");
        return;
      }

      const all = await shabdaRepo.objects.getAll(); // or use Promise.all with approved + candidates

      for (const review of pending) {
        const entry = all.find((c) => c.id === review.objectId);

        if (!entry) {
          console.log(`❌ Missing candidate for: ${review.objectId}`);
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
          review.suggestions.forEach((s: any, i: number) =>
            console.log(`  ${i + 1}. ${s}`)
          );
        }

        // Patch diff display logic
        if (review.patch) {
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
        const promptOptions =
          "[a]pprove  [r]reject  [s]skip  [p]atch+approve > ";
        const action = (await promptUser(promptOptions)) || "a";

        await match(action)
          .with("a", async () => {
            await shabdaRepo.objects.update(entry.id, {
              status: "staged",
              updatedAt: new Date().toISOString(),
            });
            await shabdaRepo.reviews.updateReview(review.id, {
              ...review,
              status: "applied",
            });
            await shabdaRepo.audits.add({
              id: crypto.randomUUID(),
              objectId: entry.id,
              timestamp: new Date().toISOString(),
              action: "approved",
              performedBy: "cli",
              reviewId: review.id,
            });
            console.log("✅ Approved and moved to validated shabdas");
          })
          .with("r", async () => {
            await shabdaRepo.reviews.updateReview(review.id, {
              ...review,
              status: "rejected",
            });
            await shabdaRepo.audits.add({
              id: crypto.randomUUID(),
              objectId: entry.id,
              timestamp: new Date().toISOString(),
              action: "rejected",
              performedBy: "cli",
              reviewId: review.id,
            });
            console.log("🗑️ Deleted from candidates");
          })
          .with("p", async () => {
            await shabdaRepo.objects.update(entry.id, {
              ...review.patch,
              status: "staged",
              updatedAt: new Date().toISOString(),
            });
            await shabdaRepo.reviews.updateReview(review.id, {
              ...review,
              status: "applied",
            });
            await shabdaRepo.audits.add({
              id: crypto.randomUUID(),
              objectId: entry.id,
              timestamp: new Date().toISOString(),
              action: "patch-applied",
              performedBy: "cli",
              reviewId: review.id,
              patch: review.patch,
            });
            console.log("🛠️ Applied patch and staged entry");
          })
          .otherwise(async () => {
            await shabdaRepo.reviews.updateReview(review.id, {
              ...review,
              status: "skipped",
            });
            console.log("⏭️ Skipped");
          });
      }

      console.log("🎉 Validation complete");
    },
  },
  {
    id: "list-reviews-for-shabda",
    action: async (args: { shabdaId: string }) => {
      const shabdaId = args.shabdaId;
      const reviews = await shabdaRepo.reviews.getReviewsFor(shabdaId);
      if (!reviews.length) {
        console.log(chalk.gray("No reviews found."));
        return;
      }
      for (const r of reviews) {
        console.log(
          `${chalk.gray(r.createdAt)} ${chalk.cyan(
            r.objectId ?? ""
          )} ${chalk.yellow(r.id)} ${chalk.greenBright(
            `${(r.confidence * 100).toFixed(1)}%`
          )} ${r.approved ? chalk.green("✔") : chalk.red("✘")} — ${r.summary}`
        );
      }
    },
  },
  {
    id: "get-review",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      const r = await shabdaRepo.reviews.getReviewById(reviewId);
      if (!r) {
        console.log(chalk.red("❌ Review not found."));
        return;
      }
      console.log(chalk.bold(`\n🔍 Review ID: ${r.id}`));
      console.log(`${chalk.gray("Shabda ID:")} ${r.objectId}`);
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
    id: "delete-review",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      await shabdaRepo.reviews.deleteReviewById(reviewId);
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
        .with("reviewed", () => reviews.filter((r) => r.status === "skipped"))
        .with("applied", () => reviews.filter((r) => r.status === "applied"))
        .with("all", () => reviews)
        .otherwise(() => reviews);

      for (const r of filtered) {
        console.log(`${r.createdAt} ${r.objectId} ${r.status}`);
      }
    },
  },
  {
    id: "re-review",
    action: async ({ shabdaId }: { shabdaId: string }) => {
      const { getAllApprovedShabdas } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );
      const shabda = (await getAllApprovedShabdas()).find(
        (s) => s.id === shabdaId
      );
      if (!shabda) {
        console.log(`❌ Shabda not found: ${shabdaId}`);
        return;
      }

      const review = await reviewShabda(shabda);
      await shabdaRepo.reviews.addReview(review);
      console.log("🔁 Re-reviewed:", shabda.id);
    },
  },

  // ───────────────────────────────────────
  // 🟢 Audit Logging
  // ───────────────────────────────────────
  {
    id: "list-audits",
    action: async ({ shabdaId }: { shabdaId: string }) => {
      const { getAuditLogsForShabda } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );
      const logs = await getAuditLogsForShabda(shabdaId);
      if (!logs.length) {
        console.log(chalk.gray("No audit logs found."));
        return;
      }
      for (const log of logs) {
        console.log(
          `${chalk.gray(log.timestamp)} ${chalk.cyan(
            log.action
          )} by ${chalk.yellow(log.performedBy)}${
            log.reviewId ? ` (review: ${log.reviewId})` : ""
          }`
        );
      }
    },
  },
  {
    id: "flush-audits",
    action: async () => {
      const { flushAuditLogs } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );
      const confirm = await confirmPrompt(
        "Are you sure you want to delete all audit logs?"
      );
      if (!confirm) {
        console.log("Flush cancelled.");
        return;
      }
      await flushAuditLogs();
      console.log(chalk.red("🧹 All audit logs deleted."));
    },
  },
  {
    id: "list-all-audits",
    action: async () => {
      const { getAuditLogs } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );
      const logs = await getAuditLogs();
      if (!logs.length) {
        console.log(chalk.gray("No audit logs found."));
        return;
      }
      for (const log of logs) {
        console.log(
          `${chalk.gray(log.timestamp)} ${chalk.cyan(
            log.action
          )} by ${chalk.yellow(log.performedBy)}${
            log.reviewId ? ` (review: ${log.reviewId})` : ""
          }`
        );
      }
    },
  },

  // ───────────────────────────────────────
  // 🟣 Generation Requests
  // ───────────────────────────────────────
  {
    id: "request-shabda",
    action: async (args: {
      stem: string;
      gender: string;
      nounClass: string;
      requestedBy?: string;
      reason?: string;
    }) => {
      const now = new Date().toISOString();
      const request: ShabdaRequest = {
        id: `${args.stem}-${args.gender}-${args.nounClass}`.toLowerCase(),
        data: {
          root: args.stem,
          gender: args.gender as "masculine" | "feminine" | "neuter",
          nounClass: args.nounClass,
        },
        reason: args.reason ?? "",
        requestedBy: args.requestedBy ?? "cli",
        status: "pending",
        createdAt: now,
      };
      await shabdaRepo.requests.add(request);
      console.log(
        chalk.green(`📥 Generation request submitted: ${request.id}`)
      );
    },
  },
  {
    id: "list-requests",
    action: async () => {
      const { getAllShabdaGenerationRequests } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );
      const requests = await getAllShabdaGenerationRequests();
      if (!requests.length) {
        console.log("No generation requests found.");
        return;
      }

      console.log(chalk.bold("Generation Requests:\n"));

      for (const r of requests) {
        const line = [
          chalk.gray(r.id || "").padEnd(12),
          chalk.gray(r.status || "").padEnd(12),
          chalk.cyan((r.data.root || "").padEnd(12)),
        ].join("  ");
        console.log(line);
      }
      console.log(chalk.gray("\nTotal requests: "), requests.length);
      console.log(
        chalk.gray("Pending requests: "),
        requests.filter((r) => r.status === "pending").length
      );
    },
  },
  {
    id: "generate-from-requests",
    action: async () => {
      const { getShabdaRequestsByStatus, updateShabdaRequest } = await import(
        "~/core/lib/repositories/shabdaRepository"
      );

      const requests: ShabdaRequest[] = await shabdaRepo.requests.getByStatus(
        "pending"
      );
      if (!requests.length) {
        console.log("No pending generation requests.");
        return;
      }

      console.log(`📥 Found ${requests.length} pending requests`);

      for (const req of requests) {
        console.log(`🧠 Generating: ${req.id}`);
        try {
          const root = req.data.root || "";
          const gender = req.data.gender || "";
          const nounClass = req.data.nounClass || "";

          if (!root || !gender || !nounClass) {
            console.log(chalk.red(`❌ Invalid request: ${req.id}`));
            await shabdaRepo.requests.update(req.id, {
              status: "error",
              errorMessage: "Invalid request data",
            });
            continue;
          }
          const entry = await generateShabda({
            stem: root,
            gender,
            nounClass,
          });
          await shabdaRepo.objects.add(entry);
          await shabdaRepo.requests.update(req.id, {
            status: "generated",
            generatedObjectId: entry.id,
          });
          console.log(chalk.green(`✅ Generated: ${entry.id}`));
        } catch (err) {
          await shabdaRepo.requests.update(req.id, {
            status: "error",
            errorMessage: (err as Error).message,
          });
          console.log(chalk.red(`❌ Error for ${req.id}:`), err);
        }
      }
    },
  },
];
