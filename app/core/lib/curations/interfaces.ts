import type { CurationObject, CurationReview } from "~/types/curation";

export interface ContentGenerator<T extends CurationObject> {
  generate(input: Partial<T>): Promise<T>;
}

export interface ReviewGenerator<T extends CurationObject> {
  review(entry: T): Promise<CurationReview<T>>;
}
