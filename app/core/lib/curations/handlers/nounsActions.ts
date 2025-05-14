import { confirmPrompt, promptUser } from "../helpers";

import type { CurationRequest } from "~/types/curation";
import type { ShabdaEntry } from "~/types";
import chalk from "chalk";
import { match } from "ts-pattern";
import { shabdaGenerator } from "~/core/lib/openai/generateShabda";
import { shabdaRepo } from "~/core/lib/repositories/shabdaRepository";
import { shabdaReviewer } from "~/core/lib/openai/reviewShabda";

type ShabdaRequest = CurationRequest<ShabdaEntry>;

export const nounsActions = [
  {
    id: "objects:delete",
    action: async (args: { objectId: string }) => {
      const objectId = args.objectId;
      const confirmed = await confirmPrompt(
        `Are you sure you want to delete object ${objectId}?`
      );
      if (!confirmed) {
        console.log("❌ Deletion cancelled.");
        return;
      }
      await shabdaRepo.objects.delete(objectId);

      console.log(chalk.green(`🗑️ Object deleted: ${objectId}`));
    },
  },
  {
    id: "objects:list-all",
    action: async () => {
      const objects = await shabdaRepo.objects.getAll();
      if (!objects.length) {
        console.log("No objects found.");
        return;
      }

      console.log(chalk.bold("Approved Objects:\n"));

      for (const s of objects) {
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
    id: "objects:deploy",
    action: async ({ objectId }: { objectId: string }) => {
      const entry = (await shabdaRepo.objects.getAll()).find(
        (s) => s.id === objectId
      );

      if (!entry) {
        console.log(`❌ Object not found: ${objectId}`);
        return;
      }

      // Confirm before proceeding
      const confirmed = await confirmPrompt(`Deploy ${entry.id}?`);
      if (!confirmed) {
        console.log("🚫 Deployment cancelled.");
        return;
      }

      if (entry.status === "approved") {
        console.log("✅ Object is already approved.");
        return;
      }

      if (entry.status !== "staged") {
        console.log(
          `⚠️ Object must be staged before deployment. Current status: ${entry.status}`
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

      console.log(`🚀 Object deployed: ${objectId}`);
    },
  },
  {
    id: "objects:deploy-all",
    action: async () => {
      const entries = await shabdaRepo.objects.getAll();
      const stagedEntries = entries.filter((s) => s.status === "staged");
      if (stagedEntries.length === 0) {
        console.log("No staged objects found.");
        return;
      }

      console.log("Staged objects to deploy:");
      stagedEntries.forEach((s) => console.log(`  - ${s.id}`));

      const confirmed = await confirmPrompt(
        "Are you sure you want to deploy all staged objects?"
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

      console.log(`🚀 All staged objects deployed.`);
    },
  },

  // ───────────────────────────────────────
  // 🟡 Review Management
  // ───────────────────────────────────────

  {
    id: "reviews:review-all",
    action: async () => {
      const allReviews = await shabdaRepo.reviews.getAll();
      const pending = allReviews.filter((r) => r.status === "new");

      if (pending.length === 0) {
        console.log("No unreviewed objects found.");
        return;
      }

      console.log(`📥 Loaded ${pending.length} unreviewed objects`);

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
            console.log("✅ Approved and moved to staging");
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
    id: "reviews:list-for-object",
    action: async (args: { objectId: string }) => {
      const objectId = args.objectId;
      const reviews = await shabdaRepo.reviews.getReviewsFor(objectId);
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
    id: "reviews:get",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      const r = await shabdaRepo.reviews.getReviewById(reviewId);
      if (!r) {
        console.log(chalk.red("❌ Review not found."));
        return;
      }
      console.log(chalk.bold(`\n🔍 Review ID: ${r.id}`));
      console.log(`${chalk.gray("Object ID:")} ${r.objectId}`);
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
    id: "reviews:delete",
    action: async (args: { reviewId: string }) => {
      const reviewId = args.reviewId;
      await shabdaRepo.reviews.deleteReviewById(reviewId);
      console.log(chalk.red(`🗑️ Review deleted: ${reviewId}`));
    },
  },
  {
    id: "reviews:flush",
    action: async () => {
      const confirmed = await confirmPrompt(
        "Are you sure you want to delete all reviews?"
      );
      if (!confirmed) {
        console.log("Flush cancelled.");
        return;
      }
      // Temporary batch delete using shabdaRepo
      await Promise.all(
        (
          await shabdaRepo.reviews.getAll()
        ).map((r) => shabdaRepo.reviews.deleteReviewById(r.id))
      );
      console.log(chalk.red("🗑️ All reviews flushed."));
    },
  },
  {
    id: "reviews:list-by-status",
    action: async ({ status = "all" }) => {
      const reviews = await shabdaRepo.reviews.getAll();
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

  // ───────────────────────────────────────
  // 🟢 Audit Logging
  // ───────────────────────────────────────
  {
    id: "audits:list",
    action: async ({ objectId }: { objectId: string }) => {
      const logs = await shabdaRepo.audits.getFor(objectId);
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
    id: "audits:flush",
    action: async () => {
      const confirm = await confirmPrompt(
        "Are you sure you want to delete all audit logs?"
      );
      if (!confirm) {
        console.log("Flush cancelled.");
        return;
      }
      await shabdaRepo.audits.flush();
      console.log(chalk.red("🧹 All audit logs deleted."));
    },
  },
  {
    id: "audits:list-all",
    action: async () => {
      // Use getFor(undefined) or implement getAll if available
      const logs = await shabdaRepo.audits.getFor(undefined as any);
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
    id: "requests:list",
    action: async () => {
      const requests = await shabdaRepo.requests.getByStatus("pending");
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
    id: "objects:generate",
    action: async ({
      root,
      gender,
      nounClass,
    }: {
      root: string;
      gender: "masculine" | "feminine" | "neuter";
      nounClass: string;
    }) => {
      const entry = await shabdaGenerator.generate({ root, gender, nounClass }); // updated to use shabdaGenerator.generate
      await shabdaRepo.objects.add(entry);
      console.log(chalk.green(`✅ Object generated and stored: ${entry.id}`));
    },
  },
  {
    id: "requests:create",
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
    id: "reviews:re-review",
    action: async ({ objectId }: { objectId: string }) => {
      const shabda = (
        await shabdaRepo.objects.filter({ status: "approved" })
      ).find((s) => s.id === objectId);
      if (!shabda) {
        console.log(`❌ Review not found: ${objectId}`);
        return;
      }

      const review = await shabdaReviewer.review(shabda);
      await shabdaRepo.reviews.addReview(review);
      console.log("🔁 Re-reviewed:", shabda.id);
    },
  },
  {
    id: "requests:process",
    action: async () => {
      const requests = await shabdaRepo.requests.getByStatus("pending");
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
          const entry = await shabdaGenerator.generate({
            root,
            gender,
            nounClass,
          });
          await shabdaRepo.objects.add(entry);
          await shabdaRepo.requests.update(req.id, {
            status: "generated",
            generatedObjectId: entry.id,
          });
          console.log(chalk.green(`✅ Object generated: ${entry.id}`));
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
  {
    id: "reviews:generate",
    action: async () => {
      const candidates = await shabdaRepo.objects.filter({
        status: "candidate",
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
          chalk.green("✅ All candidate objects already have reviews.")
        );
        return;
      }

      console.log(
        chalk.gray(`🧠 Reviewing ${pending.length} unreviewed objects...\n`)
      );

      for (const entry of pending) {
        const review = await shabdaReviewer.review(entry);
        await shabdaRepo.reviews.addReview(review);
        console.log(chalk.green(`✅ Object reviewed: ${entry.id}`));
      }

      console.log(chalk.green("\n🎉 Done."));
    },
  },
];
