import type {
  CommandDefinition,
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import type { CurationRepository } from "../stores/CurationRepository";
import { baseCommands } from "./baseCommands";
import { generateBaseActions } from "./generateBaseActions";

/**
 * Creates a namespaced command bus for a specific domain.
 *
 * @param domain - The namespace to prefix all command IDs (e.g., "nouns", "verbs").
 * @param repo - A CurationRepository for the object type.
 * @param generator - The content generator used to synthesize new entries.
 * @param reviewer - The review generator used to validate and patch entries.
 * @param options - Optional configuration for the command bus.
 * @param options.printObjectSummary - Function to print a summary of an object.
 * @param options.printObjectListRow - Function to print a row in the object list.
 * @returns An array of command definitions with actions.
 */
export function createCommandBus<T extends CurationObject>(
  domain: string,
  {
    repo,
    generator,
    reviewer,
  }: {
    repo: CurationRepository<T>;
    generator: ContentGenerator<Partial<T>, T>;
    reviewer: ReviewGenerator<T>;
  },
  options?: {
    printObjectSummary?: (entry: T) => void;
    printObjectListRow?: (entries: T) => void;
    customActions?: CommandDefinition[];
  }
): CommandDefinition[] {
  const baseActions = generateBaseActions(
    domain,
    {
      repo,
      generator,
      reviewer,
    },
    options
  );

  // combined the baseCommands with the baseActions to make a full command
  const combinedCommands = baseCommands.map((command) => {
    const action = baseActions.find((a) => a.id === command.id)?.action;
    if (!action) {
      throw new Error(
        `No action found for command ID "${command.id}". Please ensure the action is defined.`
      );
    }
    return {
      ...command,
      action,
    };
  });

  const customActions = options?.customActions ?? [];
  const allActions = [...combinedCommands, ...customActions];

  // validate custom actions
  for (const action of customActions) {
    if (allActions.filter((a) => a.id === action.id).length > 1) {
      throw new Error(
        `Duplicate action ID "${action.id}" found in custom actions.`
      );
    }
  }
  // validate base actions
  for (const action of baseActions) {
    if (allActions.filter((a) => a.id === action.id).length > 1) {
      throw new Error(
        `Duplicate action ID "${action.id}" found in base actions.`
      );
    }
  }

  return allActions.map((command) => ({
    ...command,
    action: async (args: any) => {
      const cleanArgs = Object.fromEntries(
        Object.entries(args).map(([k, v]) => [
          k,
          typeof v === "string" ? v.trim().toLowerCase() : v,
        ])
      ) as any;
      if (typeof command.action === "function") {
        await command.action(cleanArgs);
      }
    },
    meta: (command as any).meta ?? {},
  }));
}
