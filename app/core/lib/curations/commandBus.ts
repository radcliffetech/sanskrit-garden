import type { CommandDefinition } from "~/types";
import { nounsActions } from "./handlers/nounsActions";
import { nounsCommands } from "./commands/nounsCommands";

export const commandMeta: Pick<CommandDefinition, "id" | "meta">[] = [
  ...nounsCommands,
];

const commandHandlers = [...nounsActions];

export const commandBus: CommandDefinition[] = commandMeta.map((meta) => {
  const id = meta.id;

  const handler = commandHandlers.find((h) => h.id === id);

  if (!handler) {
    throw new Error(`No handler found for command: ${id}`);
  }

  return {
    ...meta,
    id,
    action: async (args) => {
      const cleanArgs = Object.fromEntries(
        Object.entries(args).map(([k, v]) => [
          k,
          typeof v === "string" ? v.trim().toLowerCase() : v,
        ])
      ) as any;
      await handler.action(cleanArgs);
    },
    handler: async () => {
      throw new Error(`Handler not found for command: ${id}`);
    },
  };
});
