import type {
  CommandDefinition,
  ContentGenerator,
  CurationField,
  CurationObject,
  CurationRepository,
  CurationRequest,
} from "~/core/lib/curations/toolkit";

import chalk from "chalk";

export function createStandardGenerateAction<T extends CurationObject>({
  meta,
  generator,
  repo,
}: {
  meta: CommandDefinition["meta"];
  generator: ContentGenerator<T>;
  repo: CurationRepository<T>;
}): CommandDefinition & { id: "objects:generate" } {
  return {
    id: "objects:generate",
    meta,
    async action(data) {
      const entry = await generator.generate(data as Partial<T>);
      await repo.objects.add(entry);
      console.log(chalk.green(`✅ Object generated and stored: ${entry.id}`));
    },
  };
}

export function createStandardRequestAction<T extends CurationObject>({
  meta,
  repo,
  getId,
}: {
  meta: CommandDefinition["meta"];
  repo: CurationRepository<T>;
  getId: (data: Record<string, string>) => string;
}): CommandDefinition & { id: "requests:create" } {
  return {
    id: "requests:create",
    meta,
    async action(args: Record<string, string>) {
      const { requestedBy, reason, ...data } = args;
      const now = new Date().toISOString();
      const id = getId(data);
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
  };
}
