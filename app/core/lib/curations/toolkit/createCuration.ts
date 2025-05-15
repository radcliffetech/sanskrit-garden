import type {
  ContentGenerator,
  CurationObject,
  ReviewGenerator,
} from "~/core/lib/curations/types/curation";

import type { CommandDefinition } from "~/core/lib/curations/types/curation";
import type { CurationConfig } from "../types/config";
import { CurationRepository } from "../stores/CurationRepository";
import { createCommandBus } from "~/core/lib/curations/toolkit/createCommandBus";

interface CreateDomainParams<T extends CurationObject> {
  namespace: string;
  repo: CurationRepository<T>;
  generator: ContentGenerator<any, T>;
  reviewer: ReviewGenerator<T>;
  cli?: {
    printSummary?: (entry: T) => void;
    printRow?: (entry: T) => void;
  };
  ui?: {
    renderRow?: (entry: T) => React.ReactNode[];
    renderDetail?: (entry: T) => React.ReactNode;
  };
  requiredActions: {
    generate: CommandDefinition & { id: "objects:generate" };
    request: CommandDefinition & { id: "requests:create" };
  };
  extraActions?: CommandDefinition[];
}

/**
 * Creates a full CurationConfig<T> object for a specific content domain.
 * Used to define CLI, UI, and processing behaviors in one place.
 */
export function createCuration<T extends CurationObject>(
  params: CreateDomainParams<T>
): CurationConfig<T> {
  const { namespace, repo, generator, reviewer } = params;
  const config = {
    namespace,
    repo,
    generator,
    reviewer,
    commandBus: createCommandBus(
      namespace,
      {
        repo,
        generator,
        reviewer,
      },
      {
        printObjectSummary: params.cli?.printSummary,
        printObjectListRow: params.cli?.printRow,
        customActions: [
          params.requiredActions.generate,
          params.requiredActions.request,
          ...(params.extraActions ?? []),
        ],
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
  };
  return config;
}
