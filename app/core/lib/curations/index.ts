import type { CommandDefinition } from "~/core/lib/curations/types/curation";
import { curationModules } from "./modules";

interface CommandBusInterface {
  nouns: CommandDefinition[];
}

export const commandBus: CommandBusInterface = {
  nouns: curationModules.nouns.commandBus,
};
