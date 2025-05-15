import type {
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";
import { confirmPrompt, promptUser } from "./cli";

import type { CurationRepository } from "../stores/CurationRepository";
import type { CurationRequest } from "~/core/lib/curations/types/curation";
import chalk from "chalk";
import { match } from "ts-pattern";

export function generateBaseActions<T extends CurationObject>(
  domain: string,
  {
    repo,
    generator,
    reviewer,
  }: {
    repo: CurationRepository<T>;
    generator: ContentGenerator<T>;
    reviewer: ReviewGenerator<T>;
  },
  options?: {
    printObjectSummary?: (entry: T) => void;
    printObjectListRow?: (entries: T) => void;
    generateRequestId?: (data: Partial<T>) => string;
  }
) {
  return [
    {
      id: "objects:delete",
      action: async (args: Record<string, string>) => {
        const { objectId } = args;
        const confirmed = await confirmPrompt(
          `Are you sure you want to delete object ${objectId}?`
        );
        if (!confirmed) {
          console.log("❌ Deletion cancelled.");
          return;
        }
        await repo.objects.delete(objectId);

        console.log(chalk.green(`🗑️ Object deleted: ${objectId}`));
      },
    },
    {
      id: "objects:list-all",
      action: async () => {
        const objects = await repo.objects.getAll();
        if (!objects.length) {
          console.log("No objects found.");
          return;
        }

        console.log(chalk.bold("Approved Objects:\n"));

        for (const s of objects) {
          if (options?.printObjectListRow) {
            options.printObjectListRow(s);
          } else {
            const line = [
              chalk.gray(s.id || "").padEnd(12),
              chalk.gray(s.status || "").padEnd(12),
            ].join("  ");
            console.log(line);
          }
        }
      },
    },
    {
      id: "objects:deploy",
      action: async ({ objectId }: { objectId: string }) => {
        const entry = (await repo.objects.getAll()).find(
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

        await repo.objects.update(entry.id, {
          status: "approved",
          validatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Partial<T>);
        await repo.audits.add({
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
        const entries = await repo.objects.getAll();
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
          await repo.objects.update(entry.id, {
            status: "approved",
            validatedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Partial<T>);
          await repo.audits.add({
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
        const allReviews = await repo.reviews.getAll();
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

        const all = await repo.objects.getAll(); // or use Promise.all with approved + candidates

        for (const review of pending) {
          const entry = all.find((c) => c.id === review.objectId);

          if (!entry) {
            console.log(`❌ Missing candidate for: ${review.objectId}`);
            continue;
          }

          if (options?.printObjectSummary) {
            options.printObjectSummary(entry);
          }

          // Show review details: confidence, summary, justification, suggestions
          console.log(
            chalk.greenBright(
              `🤖 Confidence: ${(review.confidence * 100).toFixed(1)}%`
            )
          );
          console.log(chalk.green(`📝 Summary: ${review.summary}`));
          if (review.justification) {
            console.log(
              chalk.gray(`📚 Justification: ${review.justification}`)
            );
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
              await repo.objects.update(entry.id, {
                status: "staged",
                updatedAt: new Date().toISOString(),
              } as Partial<T>);
              await repo.reviews.updateReview(review.id, {
                ...review,
                status: "applied",
              });
              await repo.audits.add({
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
              await repo.reviews.updateReview(review.id, {
                ...review,
                status: "rejected",
              });
              await repo.audits.add({
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
              await repo.objects.update(entry.id, {
                ...(review.patch as Partial<T>),
                status: "staged",
                updatedAt: new Date().toISOString(),
              });
              await repo.reviews.updateReview(review.id, {
                ...review,
                status: "applied",
              });
              await repo.audits.add({
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
              await repo.reviews.updateReview(review.id, {
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
      action: async (args: Record<string, string>) => {
        const { objectId } = args;
        const reviews = await repo.reviews.getReviewsFor(objectId);
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
      action: async (args: Record<string, string>) => {
        const { reviewId } = args;
        const r = await repo.reviews.getReviewById(reviewId);
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
      action: async (args: Record<string, string>) => {
        const { reviewId } = args;
        await repo.reviews.deleteReviewById(reviewId);
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
        // Temporary batch delete using repo
        await Promise.all(
          (
            await repo.reviews.getAll()
          ).map((r) => repo.reviews.deleteReviewById(r.id))
        );
        console.log(chalk.red("🗑️ All reviews flushed."));
      },
    },
    {
      id: "reviews:list-by-status",
      action: async ({ status = "all" }) => {
        const reviews = await repo.reviews.getAll();
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
      action: async (args: Record<string, string>) => {
        const { objectId } = args;
        const logs = await repo.audits.getFor(objectId);
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
        await repo.audits.flush();
        console.log(chalk.red("🧹 All audit logs deleted."));
      },
    },
    {
      id: "audits:list-all",
      action: async () => {
        // Use getFor(undefined) or implement getAll if available
        const logs = await repo.audits.getFor(undefined as any);
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
        const requests = await repo.requests.getByStatus("pending");
        if (!requests.length) {
          console.log("No generation requests found.");
          return;
        }

        console.log(chalk.bold("Generation Requests:\n"));

        for (const r of requests) {
          const line = [
            chalk.gray(r.id || "").padEnd(12),
            chalk.gray(r.status || "").padEnd(12),
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
      action: async (data: Partial<T>) => {
        const entry = await generator.generate(data);
        await repo.objects.add(entry);
        console.log(chalk.green(`✅ Object generated and stored: ${entry.id}`));
      },
    },
    {
      id: "requests:create",
      action: async (args: Record<string, string>) => {
        const { requestedBy, reason, ...data } = args;
        const now = new Date().toISOString();
        const id =
          options?.generateRequestId?.(data as Partial<T>) ??
          `request-${crypto.randomUUID()}`;
        const request: CurationRequest<T> = {
          id,
          data: data as Partial<T>,
          reason: reason ?? "",
          requestedBy: requestedBy ?? "cli",
          status: "pending",
          createdAt: now,
        };

        await repo.requests.add(request);
        console.log(
          chalk.green(`📥 Generation request submitted: ${request.id}`)
        );
      },
    },
    {
      id: "reviews:re-review",
      action: async ({ objectId }: { objectId: string }) => {
        const shabda = (
          await repo.objects.filter({ status: "approved" } as Partial<
            Record<keyof T, any>
          >)
        ).find((s) => s.id === objectId);
        if (!shabda) {
          console.log(`❌ Review not found: ${objectId}`);
          return;
        }

        const review = await reviewer.review(shabda);
        await repo.reviews.addReview(review);
        console.log("🔁 Re-reviewed:", shabda.id);
      },
    },
    {
      id: "requests:process",
      action: async () => {
        const requests = await repo.requests.getByStatus("pending");
        if (!requests.length) {
          console.log("No pending generation requests.");
          return;
        }

        console.log(`📥 Found ${requests.length} pending requests`);

        for (const req of requests) {
          console.log(`🧠 Generating: ${req.id}`);
          try {
            const entry = await generator.generate(req.data);

            await repo.objects.add(entry);
            await repo.requests.update(req.id, {
              status: "generated",
              generatedObjectId: entry.id,
            });
            console.log(chalk.green(`✅ Object generated: ${entry.id}`));
          } catch (err) {
            await repo.requests.update(req.id, {
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
        const candidates = await repo.objects.filter({
          status: "candidate",
        } as Partial<Record<keyof T, any>>);

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

        const reviews = await repo.reviews.getAll();
        const reviewedIds = new Set(reviews.map((r) => r.objectId));
        const pending = candidates.filter(
          (entry) => !reviewedIds.has(entry.id)
        );

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
          const review = await reviewer.review(entry);
          await repo.reviews.addReview(review);
          console.log(chalk.green(`✅ Object reviewed: ${entry.id}`));
        }

        console.log(chalk.green("\n🎉 Done."));
      },
    },
  ];
}
