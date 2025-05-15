import { createMasterBus } from "../lib/curations/toolkit";
import jokes from "./jokes";
import nouns from "./nouns";
import verbs from "./verbs";

const bus = createMasterBus([nouns, jokes, verbs]);

export { bus };
