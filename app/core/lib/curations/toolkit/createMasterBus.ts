import type { CommandDefinition } from "../types/curation";
import type { CurationConfig } from "../types/config";

export function createMasterBus(
  configs: CurationConfig<any>[]
): Record<string, CommandDefinition[]> {
  return Object.fromEntries(
    configs.map((config) => {
      if (!config.namespace || typeof config.namespace !== "string") {
        throw new Error(`CurationConfig missing valid 'namespace'`);
      }

      if (!Array.isArray(config.commandBus)) {
        throw new Error(`Invalid commandBus for domain "${config.namespace}"`);
      }

      config.commandBus.forEach((cmd, index) => {
        if (!cmd.id || typeof cmd.id !== "string" || !cmd.action) {
          throw new Error(
            `Invalid command at index ${index} in domain "${config.namespace}"`
          );
        }
      });

      return [config.namespace, config.commandBus];
    })
  );
}
