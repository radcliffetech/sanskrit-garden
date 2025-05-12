import type { Article } from "~/types";
import { getArticlesRepository } from "~/lib/repositories/articlesRepository";

export async function getArticles() {
    const repo = getArticlesRepository()
    const data: Article[] = repo.getArticles();
    return data;
}

export async function getArticleById(id: string): Promise<Article | null> {
    const repo = getArticlesRepository()
    return repo.getArticleById(id);
}