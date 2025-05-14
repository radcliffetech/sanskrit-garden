import { CommandDefinition } from "./meta";
import { commandHandlers } from "./actions";
import { commandMeta } from "./meta";

export const commandBus: CommandDefinition[] = commandMeta.map((meta) => {
  const matchedHandler = commandHandlers.find((h) => h && h.id === meta.id);

  if (!matchedHandler) {
    throw new Error(`No handler found for command: ${meta.id}`);
  }

  return {
    ...meta,
    action: async (args) => {
      const cleanArgs = Object.fromEntries(
        Object.entries(args).map(([k, v]) => [
          k,
          typeof v === "string" ? v.trim().toLowerCase() : v,
        ])
      ) as any; // temp workaround for dynamic args

      await matchedHandler.action(cleanArgs);
    },
    handler: async () => {
      throw new Error(`Handler not found for command: ${meta.id}`);
    },
  };
});
