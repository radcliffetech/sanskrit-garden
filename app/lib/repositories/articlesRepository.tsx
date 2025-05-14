import type { Article } from "~/types";
import { db } from "~/lib/firebase/firebase.server";
import nexusConfig from "~/config/nexus.config";

const collectionId = nexusConfig.firestore.collections.articles;

export async function getAllArticles(): Promise<Article[]> {
  const snapshot = await db.collection(collectionId).get();
  const articles = snapshot.docs.map((doc) => doc.data() as Article);
  return articles.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const snapshot = await db
    .collection(collectionId)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Article;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const snapshot = await db
    .collection(collectionId)
    .where("id", "==", id)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Article;
}

export async function getArticlesByCategoryId(
  categoryId: string
): Promise<Article[]> {
  const snapshot = await db
    .collection(collectionId)
    .where("categoryId", "==", categoryId)
    .get();

  const articles = snapshot.docs.map((doc) => doc.data() as Article);
  return articles.sort((a, b) => a.title.localeCompare(b.title));
}
