import type {
  CommandDefinition,
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import type { CurationRepository } from "../stores/CurationRepository";
import { baseCommands } from "./baseCommands";
import { generateBaseActions } from "../helpers/generateBaseActions";

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
 * @param options.generateRequestId - Function to generate a unique request ID.
 * @returns An array of command definitions with actions.
 */
export function createCurationCommandBus<T extends CurationObject>(
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

  return baseCommands.map((command) => {
    const action = baseActions.find((a) => a.id === command.id);

    if (!action) {
      throw new Error(`No action found for command: ${command.id}`);
    }

    return {
      ...command,
      action: async (args) => {
        const cleanArgs = Object.fromEntries(
          Object.entries(args).map(([k, v]) => [
            k,
            typeof v === "string" ? v.trim().toLowerCase() : v,
          ])
        ) as any;
        await action.action(cleanArgs);
      },
    };
  });
}
