import type { CommandDefinition } from "~/types";
import { commandMeta } from "./meta";
import { coreActions } from "./handlers/coreActions";
import { nounsActions } from "./handlers/nounsActions";

const commandHandlers = [...coreActions, ...nounsActions];

export const commandBus: CommandDefinition[] = commandMeta.map((meta) => {
  const id = meta.id;
  const matchedHandler = commandHandlers.find((h) => h.id === id);

  if (!matchedHandler) {
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
      await matchedHandler.action(cleanArgs);
    },
    handler: async () => {
      throw new Error(`Handler not found for command: ${id}`);
    },
  };
});
