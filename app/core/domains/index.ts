import blueprints from "./blueprints";
import { createMasterBus } from "../lib/curations/toolkit";
import mantras from "./mantras";
import nouns from "./nouns";
import verbs from "./verbs";

const bus = createMasterBus([nouns, verbs, mantras, blueprints]);

const modules = {
  mantras,
  nouns,
  verbs,
  blueprints,
};

export { bus, modules };
