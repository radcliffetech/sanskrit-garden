import type { CurationRequest } from "~/types/curation";
import type { ShabdaEntry } from "~/types";
import chalk from "chalk";
import { promptUser } from "../utils";
import { shabdaGenerator } from "~/core/lib/openai/generateShabda";
import { shabdaRepo } from "~/core/lib/repositories/shabdaRepository";
import { shabdaReviewer } from "~/core/lib/openai/reviewShabda";

type ShabdaRequest = CurationRequest<ShabdaEntry>;

export const nounsActions = [
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
