// app/core/lib/curations/modules.ts
import { nounsConfig } from "./domains/nouns";
// in the future: import { verbsConfig } from "./domains/verbs";

export const curationModules = {
  nouns: nounsConfig,
  // verbs: verbsConfig,
};

export type CurationModuleMap = typeof curationModules;
