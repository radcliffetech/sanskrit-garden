import type {
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import type { CurationConfig } from "../types/config";
import { CurationRepository } from "../stores/CurationRepository";
import { createCurationCommandBus } from "~/core/lib/curations/helpers/createCurationCommandBus";

interface CreateDomainParams<T extends CurationObject> {
  namespace: string;
  repo: CurationRepository<T>;
  generator: ContentGenerator<T>;
  reviewer: ReviewGenerator<T>;
  generateRequestId: (data: Partial<T>) => string;
  cli?: {
    printSummary?: (entry: T) => void;
    printRow?: (entry: T) => void;
  };
  ui?: {
    renderRow?: (entry: T) => React.ReactNode[];
    renderDetail?: (entry: T) => React.ReactNode;
  };
}

/**
 * Creates a full CurationConfig<T> object for a specific content domain.
 * Used to define CLI, UI, and processing behaviors in one place.
 */
export function createDomain<T extends CurationObject>(
  params: CreateDomainParams<T>
): CurationConfig<T> {
  const { namespace, repo, generator, reviewer } = params;
  const config = {
    namespace,
    repo,
    generator,
    reviewer,
    commandBus: createCurationCommandBus(
      namespace,
      {
        repo,
        generator,
        reviewer,
      },
      {
        printObjectSummary: params.cli?.printSummary,
        printObjectListRow: params.cli?.printRow,
        generateRequestId: params.generateRequestId,
      }
    ),
    cli: {
      printSummary: params.cli?.printSummary,
      printRow: params.cli?.printRow,
    },
    ui: {
      renderRow: params.ui?.renderRow,
      renderDetail: params.ui?.renderDetail,
    },
    generateRequestId: params.generateRequestId,
  };
  return config;
}
