import {
    getNirvanaShaktam,
    getRibhuGitaChapter
} from "~/lib/repositories/textsRepository";

export async function getNirvanaShaktamData() {
    const data = getNirvanaShaktam();
    return data;
}

export async function getRibhuGitaChapterData() {
    const data = getRibhuGitaChapter();
    return data;
}