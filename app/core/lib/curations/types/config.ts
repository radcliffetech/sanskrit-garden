import type {
  CommandDefinition,
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import { CurationRepository } from "../stores/CurationRepository";

export type CurationConfig<T extends CurationObject> = {
  namespace: string;
  repo: CurationRepository<T>;
  generator: ContentGenerator<any, T>;
  reviewer: ReviewGenerator<T>;
  commandBus: CommandDefinition[];
  label?: string;
  description?: string;
  generateRequestId?: (data: Partial<T>) => string;
  cli?: {
    printSummary?: (entry: T) => void;
    printRow?: (entry: T) => void;
  };
  ui?: {
    renderRow?: (entry: T) => React.ReactNode[];
    renderDetail?: (entry: T) => React.ReactNode;
  };
};
