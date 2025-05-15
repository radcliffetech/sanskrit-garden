import type {
  CommandDefinition,
  ContentGenerator,
  CurationObject,
  CurationRepository,
  CurationRequest,
} from "~/core/lib/curations/toolkit";

import chalk from "chalk";

export function createStandardGenerateAction<
  Input,
  Output extends CurationObject
>({
  inputParams,
  generator,
  repo,
  meta,
  getId,
}: {
  inputParams: CommandDefinition["meta"]["params"];
  generator: ContentGenerator<Input, Output>;
  repo: CurationRepository<Output>;
  meta: Omit<CommandDefinition["meta"], "params">;
  getId?: (data: Input) => string;
}): CommandDefinition & { id: "objects:generate" } {
  return {
    id: "objects:generate",
    meta: {
      ...meta,
      kind: "single",
      group: "Objects",
      params: inputParams,
    },
    async action(data) {
      const entry = await generator.generate(data as Input);
      if (getId) {
        entry.id = getId(data as Input);
      }
      await repo.objects.add(entry);
      console.log(chalk.green(`✅ Object generated and stored: ${entry.id}`));
    },
  };
}

export function createStandardRequestAction<
  Input,
  Output extends CurationObject
>({
  inputParams,
  meta,
  repo,
}: {
  inputParams: CommandDefinition["meta"]["params"];
  meta: Omit<CommandDefinition["meta"], "params">;
  repo: CurationRepository<Output>;
}): CommandDefinition & { id: "requests:create" } {
  return {
    id: "requests:create",
    meta: {
      ...meta,
      kind: "single",
      group: "Requests",
      params: inputParams,
    },
    async action(args: Record<string, string>) {
      const { requestedBy, reason, ...data } = args;
      const now = new Date().toISOString();
      const id = crypto.randomUUID();
      const request: CurationRequest<Output> = {
        id,
        data: data as Partial<Output>,
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
