import type { CommandDefinition } from "~/types";
import { coreCommands } from "./commands/coreCommands";
import { nounsCommands } from "./commands/nounsCommands";

export const commandMeta: Pick<CommandDefinition, "id" | "meta">[] = [
  ...coreCommands,
  ...nounsCommands,
];
