import type { AlphabetItem } from "~/types";
import { getAlphabetRepository } from "~/lib/repositories/alphabetRepository";

export function getAlphabet() {
    const repo = getAlphabetRepository()
    const data: AlphabetItem[] = repo.getAlphabet();
    return data;
}