import { DhatuCatalogEntry } from "~/types";
import { isFiltered } from "../dhatuFilters";

const sample: DhatuCatalogEntry = {
  root: "कृ",
  transliteration: "kṛ",
  meaning: "to do",
  class: 8,
  voice: "P",
  transitivity: "transitive",
};

test("filters by class only", () => {
  expect(isFiltered(sample, { class: 8, voice: null, transitivity: null })).toBe(true);
  expect(isFiltered(sample, { class: 6, voice: null, transitivity: null })).toBe(false);
});

test("filters by multiple criteria", () => {
  expect(isFiltered(sample, { class: 8, voice: "P", transitivity: "transitive" })).toBe(true);
  expect(isFiltered(sample, { class: 8, voice: "A", transitivity: "transitive" })).toBe(false);
});